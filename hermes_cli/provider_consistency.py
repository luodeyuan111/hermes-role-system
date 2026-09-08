"""Provider configuration consistency audit (R5.1 + R5.5).

Pure static analysis across the three layers that decide where model
requests actually go:

  1. profile config.yaml  — ``model.provider`` / ``model.base_url`` /
     ``model.zai_endpoint`` / ``fallback_model.*``
  2. profile .env         — base-url overlay vars (``GLM_BASE_URL``,
     ``DEEPSEEK_BASE_URL``, ...) — invisible at the config layer
  3. provider overlay     — the registry's canonical inference base URL
     for the configured provider (hermes_cli.auth.PROVIDER_REGISTRY)

No network I/O: findings come from comparing the layers, not from probing
endpoints.  ``hermes doctor`` renders the findings; tests drive
:func:`audit_provider_config` directly with fixture dicts.
"""

from __future__ import annotations

from dataclasses import dataclass
from typing import Any, Dict, List, Optional
from urllib.parse import urlsplit


@dataclass
class Finding:
    """One audit result.  level: ok / info / warn / fail."""

    level: str
    text: str
    fix: Optional[str] = None


def _host(url: str) -> str:
    try:
        return urlsplit(str(url or "").strip()).netloc.lower()
    except Exception:
        return ""


def _normalize_url(url: str) -> str:
    return str(url or "").strip().rstrip("/").lower()


def _zai_endpoint_label_for_url(url: str) -> str:
    """Return the named Z.AI endpoint label for a base URL ('' if no match)."""
    try:
        from hermes_cli.auth import ZAI_ENDPOINT_BY_ID
    except Exception:
        return ""
    normalized = _normalize_url(url)
    for entry in ZAI_ENDPOINT_BY_ID.values():
        if _normalize_url(entry["base_url"]) == normalized:
            return entry["label"]
    return ""


def _expected_hosts_for_provider(provider_id: str) -> set:
    """Canonical inference hosts for a registry provider.

    Z.AI is special: four named endpoints (metered/Coding Plan × global/CN)
    are ALL legitimate homes for a ``zai`` model entry, so a base URL on any
    of them is coherent with ``provider: zai``.
    """
    hosts = set()
    try:
        from hermes_cli.auth import PROVIDER_REGISTRY

        pconfig = PROVIDER_REGISTRY.get(provider_id)
        if pconfig is not None:
            host = _host(getattr(pconfig, "inference_base_url", ""))
            if host:
                hosts.add(host)
    except Exception:
        pass
    if provider_id == "zai":
        try:
            from hermes_cli.auth import ZAI_ENDPOINT_BY_ID

            for entry in ZAI_ENDPOINT_BY_ID.values():
                host = _host(entry["base_url"])
                if host:
                    hosts.add(host)
        except Exception:
            pass
    return hosts


def _audit_model_routing(
    section: str,
    model_cfg: Dict[str, Any],
    findings: List[Finding],
) -> None:
    """R5.1: a session configured for provider X must route to X's hosts."""
    provider = str(model_cfg.get("provider") or "").strip()
    base_url = str(model_cfg.get("base_url") or "").strip()
    if not provider:
        return
    if provider.lower() in ("custom", "moa"):
        findings.append(Finding(
            "info",
            f"{section}: provider '{provider}' routes through user-defined "
            "endpoints — verify each endpoint belongs to the vendor you intend.",
        ))
        return
    if not base_url:
        findings.append(Finding(
            "ok",
            f"{section}: provider '{provider}' uses its registry default endpoint.",
        ))
        return
    expected = _expected_hosts_for_provider(provider)
    if not expected:
        findings.append(Finding(
            "info",
            f"{section}: provider '{provider}' is not in the registry — "
            f"base_url {base_url} cannot be cross-checked.",
        ))
        return
    actual = _host(base_url)
    if actual and actual not in expected:
        findings.append(Finding(
            "fail",
            f"{section}: provider is '{provider}' but base_url points at "
            f"{actual} — requests will go to {actual}, NOT {provider}. "
            f"This is a provider wire-cross.",
            fix=(
                f"Align {section} in config.yaml: either set provider to the "
                f"vendor that owns {actual}, or point base_url at "
                f"{sorted(expected)[0]}."
            ),
        ))
    else:
        findings.append(Finding(
            "ok",
            f"{section}: provider '{provider}' @ {base_url} — hosts agree.",
        ))


def _audit_zai_layers(
    model_cfg: Dict[str, Any],
    env: Dict[str, str],
    findings: List[Finding],
) -> None:
    """R5.5: the GLM three-layer audit (config / .env / overlay).

    Catches the standing wire-cross: ``GLM_BASE_URL`` in .env silently
    pinning the metered node while the user believes they are on the
    Coding Plan (or vice versa).
    """
    from hermes_cli.auth import (
        ZAI_ENDPOINT_BY_ID,
        resolve_zai_endpoint_base_url,
    )

    endpoint_id = str(model_cfg.get("zai_endpoint") or "").strip().lower()
    glm_env = str(env.get("GLM_BASE_URL") or "").strip()
    valid_ids = ", ".join(sorted(ZAI_ENDPOINT_BY_ID))

    if endpoint_id and endpoint_id not in ZAI_ENDPOINT_BY_ID:
        findings.append(Finding(
            "warn",
            f"model.zai_endpoint='{endpoint_id}' is not a known endpoint id "
            f"({valid_ids}) — it is IGNORED at runtime.",
            fix=f"hermes config set model.zai_endpoint <{valid_ids.replace(', ', '|')}>",
        ))
        endpoint_id = ""

    if endpoint_id:
        mapped = resolve_zai_endpoint_base_url(endpoint_id)
        label = ZAI_ENDPOINT_BY_ID[endpoint_id]["label"]
        if glm_env and _normalize_url(glm_env) != _normalize_url(mapped):
            env_label = _zai_endpoint_label_for_url(glm_env) or "custom URL"
            findings.append(Finding(
                "warn",
                f"GLM_BASE_URL in .env ({glm_env} — {env_label}) disagrees with "
                f"model.zai_endpoint='{endpoint_id}' ({mapped} — {label}). "
                f"The config value WINS; the .env override is dead weight and "
                f"misleading.",
                fix="Remove GLM_BASE_URL from the profile .env (or align it with model.zai_endpoint).",
            ))
        else:
            findings.append(Finding(
                "ok",
                f"Z.AI endpoint pinned by config: '{endpoint_id}' ({mapped} — {label}).",
            ))
        return

    if glm_env:
        env_label = _zai_endpoint_label_for_url(glm_env)
        if env_label:
            detail = f"the named '{env_label}' endpoint"
        else:
            detail = "a custom URL"
        findings.append(Finding(
            "warn",
            f"GLM_BASE_URL in .env pins Z.AI to {glm_env} ({detail}) — an "
            f"invisible .env override. If you believe you are on a DIFFERENT "
            f"node (e.g. Coding Plan), this is the wire-cross: the .env value "
            f"wins over the runtime probe and over what the config shows.",
            fix=(
                "Pin the node explicitly: hermes config set model.zai_endpoint "
                f"<{valid_ids.replace(', ', '|')}> — then remove GLM_BASE_URL "
                "from .env."
            ),
        ))
        return

    findings.append(Finding(
        "info",
        "Z.AI endpoint is not pinned — it is auto-detected by probing at "
        "runtime (metered endpoint probed first, result cached in auth.json). "
        "Pin model.zai_endpoint to make the node explicit and skip the probe.",
    ))


def _audit_overlay_env(
    model_cfg: Dict[str, Any],
    env: Dict[str, str],
    findings: List[Finding],
) -> None:
    """.env base-url overlay vs model.base_url for the ACTIVE provider.

    The main model follows config.yaml's model.base_url, but auxiliary and
    fallback clients resolve through the overlay env var — when the two
    disagree, different code paths talk to different vendors for what the
    user thinks is one provider.
    """
    provider = str(model_cfg.get("provider") or "").strip()
    base_url = str(model_cfg.get("base_url") or "").strip()
    if not provider or not base_url:
        return
    try:
        from hermes_cli.auth import PROVIDER_REGISTRY

        pconfig = PROVIDER_REGISTRY.get(provider)
        overlay_var = getattr(pconfig, "base_url_env_var", None) if pconfig else None
    except Exception:
        overlay_var = None
    if not overlay_var:
        return
    overlay_val = str(env.get(overlay_var) or "").strip()
    if not overlay_val:
        return
    if _normalize_url(overlay_val) != _normalize_url(base_url):
        findings.append(Finding(
            "warn",
            f"{overlay_var} in .env ({overlay_val}) disagrees with "
            f"model.base_url ({base_url}): the main model follows config.yaml, "
            f"but auxiliary/fallback clients resolve through the .env overlay — "
            f"different code paths will talk to different endpoints for "
            f"provider '{provider}'.",
            fix=f"Align {overlay_var} in .env with model.base_url, or remove it.",
        ))


def audit_provider_config(
    config: Dict[str, Any],
    env: Dict[str, str],
) -> List[Finding]:
    """Audit one profile's provider configuration across the three layers.

    ``config`` is the profile's config.yaml (loaded dict); ``env`` is the
    profile's .env as a dict.  Both are plain data so the audit is fully
    deterministic and network-free.
    """
    findings: List[Finding] = []
    model_cfg = (config or {}).get("model")
    if not isinstance(model_cfg, dict):
        model_cfg = {}

    # R5.1 routing audit — main model.
    if model_cfg.get("provider") or model_cfg.get("base_url"):
        _audit_model_routing("model", model_cfg, findings)
    else:
        findings.append(Finding(
            "info", "model.provider is not set — the CLI/setup default chain decides routing.",
        ))

    # R5.1 silent-switch audit — fallback is only ever explicit config.
    fallback = (config or {}).get("fallback_model")
    if isinstance(fallback, dict) and (fallback.get("provider") or fallback.get("model")):
        findings.append(Finding(
            "info",
            f"fallback_model configured ({fallback.get('provider', '?')}/"
            f"{fallback.get('model', 'config default')}) — on primary failure "
            f"the agent degrades to it. This switch is explicit config, never "
            f"silent; channel-side notices announce it (R5.4).",
        ))
        _audit_model_routing("fallback_model", fallback, findings)
    else:
        findings.append(Finding(
            "ok",
            "No fallback_model configured — the agent never switches providers on its own.",
        ))

    # R5.5 GLM three-layer audit + active-provider overlay audit.
    try:
        _audit_zai_layers(model_cfg, env or {}, findings)
    except Exception as exc:
        findings.append(Finding("warn", f"Z.AI layer audit failed: {exc}"))
    try:
        _audit_overlay_env(model_cfg, env or {}, findings)
    except Exception as exc:
        findings.append(Finding("warn", f"overlay env audit failed: {exc}"))

    return findings
