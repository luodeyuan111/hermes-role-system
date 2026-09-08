"""Tests for the named Z.AI endpoint config (``model.zai_endpoint``, R5.3).

Z.AI/GLM has two billing realms (Coding Plan vs metered) across two regions,
and the previous behavior (200-probe with the metered endpoint probed first,
plus a sticky ``GLM_BASE_URL`` env override) made it impossible to tell —
or control — which node a profile actually talks to.  The config key makes
the node an explicit, named choice:

- when set to a known endpoint id, the mapped base URL is used directly and
  the network probe is skipped entirely
- it beats a stale ``GLM_BASE_URL`` in .env (config.yaml is authoritative
  for non-secret behavioral settings); ``hermes doctor`` flags the conflict
- unknown ids warn and fall through to the legacy chain unchanged
"""

import os
from pathlib import Path

import pytest
import yaml

from hermes_cli.auth import (
    ZAI_ENDPOINT_BY_ID,
    _resolve_zai_base_url,
    get_configured_zai_endpoint_id,
    resolve_zai_endpoint_base_url,
)

DEFAULT_URL = "https://api.z.ai/api/paas/v4"
METERED_CN = "https://open.bigmodel.cn/api/paas/v4"
CODING_CN = "https://open.bigmodel.cn/api/coding/paas/v4"


def _write_config(model_cfg: dict) -> None:
    home = Path(os.environ["HERMES_HOME"])
    (home / "config.yaml").write_text(
        yaml.safe_dump({"model": model_cfg}), encoding="utf-8"
    )


def _probe_must_not_run(*_a, **_kw):
    raise AssertionError("detect_zai_endpoint must not run when model.zai_endpoint is set")


class TestConfiguredEndpointId:
    def test_unset_returns_empty(self):
        assert get_configured_zai_endpoint_id() == ""

    def test_reads_model_zai_endpoint(self):
        _write_config({"default": "glm-5", "provider": "zai", "zai_endpoint": "coding-cn"})
        assert get_configured_zai_endpoint_id() == "coding-cn"

    def test_flat_string_model_section_returns_empty(self):
        home = Path(os.environ["HERMES_HOME"])
        (home / "config.yaml").write_text("model: glm-5\n", encoding="utf-8")
        assert get_configured_zai_endpoint_id() == ""

    def test_resolve_base_url_mapping(self):
        assert resolve_zai_endpoint_base_url("coding-cn") == CODING_CN
        assert resolve_zai_endpoint_base_url("global") == DEFAULT_URL
        assert resolve_zai_endpoint_base_url("bogus") == ""
        # ids normalize case/whitespace
        assert resolve_zai_endpoint_base_url(" Coding-Global ") == ZAI_ENDPOINT_BY_ID["coding-global"]["base_url"]


class TestResolveZaiBaseUrl:
    def test_named_endpoint_wins_and_skips_probe(self, monkeypatch):
        _write_config({"zai_endpoint": "coding-cn"})
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)
        assert _resolve_zai_base_url("glm-key", DEFAULT_URL, "") == CODING_CN

    def test_named_endpoint_beats_stale_env_override(self, monkeypatch):
        """A stale GLM_BASE_URL pointing at the metered node must NOT veto an
        explicit Coding Plan selection — that silent veto IS the wire-crossing."""
        _write_config({"zai_endpoint": "coding-cn"})
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)
        assert _resolve_zai_base_url("glm-key", DEFAULT_URL, METERED_CN) == CODING_CN

    def test_env_override_wins_when_unset(self, monkeypatch):
        """Legacy behavior preserved: no config key → GLM_BASE_URL always wins."""
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)
        assert _resolve_zai_base_url("glm-key", DEFAULT_URL, METERED_CN) == METERED_CN

    def test_probe_fallback_when_unset_and_no_env(self, monkeypatch):
        monkeypatch.setattr(
            "hermes_cli.auth.detect_zai_endpoint",
            lambda *a, **kw: {"id": "cn", "base_url": METERED_CN, "model": "glm-5", "label": "China"},
        )
        assert _resolve_zai_base_url("glm-key", DEFAULT_URL, "") == METERED_CN

    def test_unknown_id_warns_and_falls_through(self, monkeypatch, caplog):
        _write_config({"zai_endpoint": "coding-eu"})
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)
        with caplog.at_level("WARNING", logger="hermes_cli.auth"):
            assert _resolve_zai_base_url("glm-key", DEFAULT_URL, METERED_CN) == METERED_CN
        assert any("coding-eu" in r.message for r in caplog.records)

    def test_no_key_no_probe_returns_default(self, monkeypatch):
        """Pre-existing guard: empty key must not fire probes."""
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)
        assert _resolve_zai_base_url("", DEFAULT_URL, "") == DEFAULT_URL


class TestCredentialResolutionE2E:
    def test_resolve_credentials_uses_named_endpoint(self, monkeypatch):
        """resolve_api_key_provider_credentials surfaces the Coding Plan node
        when model.zai_endpoint names it — no probe, env override ignored."""
        from hermes_cli.auth import resolve_api_key_provider_credentials

        _write_config({"zai_endpoint": "coding-global"})
        monkeypatch.setenv("GLM_API_KEY", "glm-secret-key")
        monkeypatch.setenv("GLM_BASE_URL", METERED_CN)  # stale metered override
        monkeypatch.setattr("hermes_cli.auth.detect_zai_endpoint", _probe_must_not_run)

        creds = resolve_api_key_provider_credentials("zai")
        assert creds["base_url"] == ZAI_ENDPOINT_BY_ID["coding-global"]["base_url"]
