"""Human-readable failover / quota attribution notices (R5.4).

The fallback MECHANISM is intentionally silent for unattended cron jobs —
that part is correct and unchanged.  What was missing is observability:
when the primary provider fails and the chain activates, or when a 429/403
is really a dead plan / exhausted quota, the user should see one plain
sentence on their channel ("DeepSeek failed — switched to GLM metered"),
while cron sessions get the same line in the log only.

Both sinks are served by the same call: ``agent._emit_status`` delivers to
the gateway status callback when one is bound (interactive sessions), and
``logger.warning`` always lands in agent.log (cron's only channel — cron
agents run without a status callback, so nothing new reaches users there).
"""

from __future__ import annotations

import logging
from typing import Optional

from agent.error_classifier import FailoverReason

logger = logging.getLogger(__name__)


def describe_failover_cause(reason: "Optional[FailoverReason]") -> str:
    """Return a short human phrase for why the primary backend failed.

    Used inside fallback-switch notices; ``reason`` is None at call sites
    that activate the chain without a classified error (legacy paths).

    Matches on the enum VALUE (string), not member identity: the test
    suite contains module-reload tests that can produce a duplicate
    ``FailoverReason`` class, and identity-keyed lookups silently miss
    in that situation.
    """
    value = getattr(reason, "value", None)
    if not isinstance(value, str) or not value:
        return "request failed after retries"
    return {
        "rate_limit": "rate limit / quota throttling (HTTP 429)",
        "upstream_rate_limit": "upstream model rate-limited (HTTP 429)",
        "billing": "plan or credits exhausted (billing)",
        "auth": "credential rejected (HTTP 401/403)",
        "auth_permanent": "credential rejected (HTTP 401/403), refresh failed",
        "overloaded": "provider overloaded (HTTP 503/529)",
        "server_error": "provider server error (HTTP 5xx)",
        "timeout": "connection/read timeout",
        "model_not_found": "model not available (HTTP 404)",
        "context_overflow": "context overflow",
    }.get(value, "request failed after retries")


def provider_display_label(provider: str, base_url: str = "") -> str:
    """Return a display label that disambiguates multi-node providers.

    "zai" is the motivating case (R5.3/R5.4): the metered node and the
    Coding Plan node are different billing realms behind one provider id,
    so a fallback notice that just says "zai" still leaves the user
    guessing which node answered.  When the base URL matches a named
    Z.AI endpoint, append its label ("Z.AI / GLM (China (Coding Plan))").
    """
    try:
        from hermes_cli.providers import get_label

        label = get_label(provider) or (provider or "").strip() or "unknown provider"
    except Exception:
        label = (provider or "").strip() or "unknown provider"

    if (provider or "").strip().lower() == "zai" and base_url:
        try:
            from hermes_cli.auth import ZAI_ENDPOINT_BY_ID

            normalized = str(base_url).strip().rstrip("/").lower()
            for entry in ZAI_ENDPOINT_BY_ID.values():
                if entry["base_url"].rstrip("/").lower() == normalized:
                    return f"{label} ({entry['label']})"
        except Exception:
            pass
    return label


def emit_quota_attribution_once(agent, classified) -> bool:
    """Emit a one-shot channel-visible notice for durable quota/auth failures.

    Covers the 429/403 cases that are NOT transient blips (R5.4): a
    confirmed billing/quota exhaustion (``billing``) and a credential
    rejection that survived refresh (``auth_permanent``).  Transient rate
    limits that recover on retry stay silent by design.

    The notice is latched per (provider, reason) on the agent so a retry
    loop classifying the same condition ten times produces exactly one
    message; the latch clears on the next successful turn
    (``_clear_status_buffer``), so a NEW outage after a recovery notifies
    again.  Never raises — a notice must not break the retry loop.
    """
    try:
        reason = getattr(classified, "reason", None)
        if reason not in (FailoverReason.billing, FailoverReason.auth_permanent):
            return False
        latch = getattr(agent, "_quota_notice_latch", None)
        if latch is None:
            latch = set()
            agent._quota_notice_latch = latch
        provider = (getattr(agent, "provider", "") or "").strip()
        key = (provider.lower(), reason.value)
        if key in latch:
            return False
        latch.add(key)

        label = provider_display_label(provider, getattr(agent, "base_url", "") or "")
        status = getattr(classified, "status_code", None)
        status_txt = f"HTTP {status}" if status else ("HTTP 402/429" if reason is FailoverReason.billing else "HTTP 401/403")
        if reason is FailoverReason.billing:
            message = (
                f"⚠️ {label}: plan or quota exhausted ({status_txt}) — the "
                f"provider is rejecting requests for billing/quota reasons. "
                f"Check the subscription or top up."
            )
        else:
            message = (
                f"⚠️ {label}: credential rejected ({status_txt}) and could not "
                f"be refreshed — check the API key and plan quota "
                f"(e.g. weekly cap)."
            )
        # Log first: this is the ONLY sink for cron/unattended sessions.
        logger.warning("quota attribution: %s", message)
        emit = getattr(agent, "_emit_status", None)
        if callable(emit):
            emit(message)
        return True
    except Exception:
        logger.debug("emit_quota_attribution_once failed", exc_info=True)
        return False


def clear_quota_attribution_latch(agent) -> None:
    """Drop the one-shot latch — called on a successful turn so a fresh
    outage after recovery notifies again."""
    try:
        latch = getattr(agent, "_quota_notice_latch", None)
        if latch:
            latch.clear()
    except Exception:
        pass
