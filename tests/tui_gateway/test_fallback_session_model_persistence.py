"""Fallback must not become the durable session model.

Provider fallback is turn-scoped: ``restore_primary_runtime`` retries the
primary at the next turn. But ``_runtime_model_config`` persisted the live
``agent.model`` verbatim, so while a fallback was covering (e.g. a transient
429 on the primary) the session row recorded the FALLBACK model. On resume,
``_stored_session_runtime_overrides`` turned that stored model into a hard
``model_override`` — which also opts the session out of
``_sync_agent_model_with_config`` — pinning the conversation to the fallback
provider for good.

Fix: while ``agent._fallback_activated`` is set, persist the PRIMARY
runtime's identity instead.
"""

import types

from tui_gateway.server import (
    _runtime_model_config,
    _stored_session_runtime_overrides,
)


def _agent(*, fallback_active: bool) -> types.SimpleNamespace:
    return types.SimpleNamespace(
        # Live runtime = the fallback currently covering the turn.
        model="glm-5.3-flash",
        provider="zai",
        base_url="https://open.bigmodel.cn/api/paas/v4",
        api_mode="chat_completions",
        reasoning_config={"effort": "low"},
        service_tier="",
        _fallback_activated=fallback_active,
        _primary_runtime={
            "model": "kimi-k3.1-pro",
            "provider": "kimi-coding",
            "base_url": "https://api.kimi.com/coding/v1",
            "api_mode": "chat_completions",
            "reasoning_config": {"effort": "medium"},
        },
    )


def test_persists_primary_identity_while_fallback_active():
    config = _runtime_model_config(_agent(fallback_active=True))
    assert config["model"] == "kimi-k3.1-pro"
    assert config["provider"] == "kimi-coding"
    assert config["base_url"] == "https://api.kimi.com/coding/v1"
    assert config["reasoning_config"] == {"effort": "medium"}


def test_persists_live_identity_when_no_fallback():
    config = _runtime_model_config(_agent(fallback_active=False))
    assert config["model"] == "glm-5.3-flash"
    assert config["provider"] == "zai"


def test_fallback_active_without_primary_runtime_keeps_live_identity():
    agent = _agent(fallback_active=True)
    agent._primary_runtime = None
    config = _runtime_model_config(agent)
    assert config["model"] == "glm-5.3-flash"


def test_resume_roundtrip_restores_primary_not_fallback():
    """A row persisted during fallback must resume as the primary — and as a
    routable override, not a pin to the fallback provider."""
    persisted = _runtime_model_config(_agent(fallback_active=True))
    row = {
        "model": persisted["model"],
        "model_config": persisted,
        "billing_provider": "",
    }
    overrides = _stored_session_runtime_overrides(row)
    assert overrides["model_override"]["model"] == "kimi-k3.1-pro"
    assert overrides["model_override"]["provider"] == "kimi-coding"
