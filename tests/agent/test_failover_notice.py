"""Tests for failover / quota attribution notices (R5.4).

The fallback mechanism itself is unchanged — these tests pin the
OBSERVABILITY layer on top of it:

- the one-shot fallback-switch notice names the failing provider AND the
  human-readable cause, and disambiguates multi-node providers
  (GLM metered vs Coding Plan) so "switched to GLM" is never ambiguous
- durable quota/auth conditions (billing, auth_permanent — the 429/403
  cases that mean "plan dead", not "slow down") emit exactly one
  channel-visible line per condition, re-armed after a successful turn
- transient reasons (plain rate_limit) stay silent unless they escalate
- an agent without a status callback (cron/unattended) gets the log line
  only, and the notice path never raises into the retry loop
"""

import logging
from types import SimpleNamespace
from unittest.mock import MagicMock, patch

import pytest

from agent.error_classifier import ClassifiedError, FailoverReason
from agent.failover_notice import (
    clear_quota_attribution_latch,
    describe_failover_cause,
    emit_quota_attribution_once,
    provider_display_label,
)


class TestDescribeFailoverCause:
    def test_rate_limit_mentions_429(self):
        assert "429" in describe_failover_cause(FailoverReason.rate_limit)

    def test_billing_mentions_billing(self):
        assert "billing" in describe_failover_cause(FailoverReason.billing).lower()

    def test_auth_mentions_401_403(self):
        text = describe_failover_cause(FailoverReason.auth_permanent)
        assert "401" in text and "403" in text

    def test_none_reason_is_generic(self):
        assert describe_failover_cause(None) == "request failed after retries"

    def test_unknown_reason_falls_back(self):
        assert describe_failover_cause(FailoverReason.unknown) == "request failed after retries"


class TestProviderDisplayLabel:
    def test_zai_metered_vs_coding_disambiguated(self):
        metered = provider_display_label("zai", "https://open.bigmodel.cn/api/paas/v4")
        coding = provider_display_label("zai", "https://open.bigmodel.cn/api/coding/paas/v4")
        assert metered != coding
        assert "Coding Plan" in coding
        assert "Coding Plan" not in metered

    def test_zai_unknown_base_url_keeps_plain_label(self):
        label = provider_display_label("zai", "https://proxy.example.com/v1")
        assert "Coding Plan" not in label

    def test_non_zai_provider_unaffected_by_base_url(self):
        assert provider_display_label("deepseek", "https://api.deepseek.com/v1") == provider_display_label("deepseek")

    def test_empty_provider_is_human(self):
        assert provider_display_label("") == "unknown provider"


def _agent_stub(provider="deepseek", base_url="https://api.deepseek.com/v1"):
    agent = SimpleNamespace()
    agent.provider = provider
    agent.base_url = base_url
    agent._emit_status = MagicMock()
    return agent


def _classified(reason, status_code=None):
    return ClassifiedError(reason=reason, status_code=status_code)


class TestQuotaAttribution:
    def test_billing_emits_once_with_plan_language(self, caplog):
        agent = _agent_stub(provider="zai", base_url="https://open.bigmodel.cn/api/paas/v4")
        with caplog.at_level(logging.WARNING, logger="agent.failover_notice"):
            assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing, 429)) is True
            assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing, 429)) is False
        # Channel side: exactly one _emit_status, naming provider + quota.
        assert agent._emit_status.call_count == 1
        text = agent._emit_status.call_args[0][0]
        assert "quota" in text.lower() and "429" in text
        assert "China" in text  # metered node disambiguated, not just "zai"
        # Log side (cron's only channel) got the same line.
        assert any("quota attribution" in r.message for r in caplog.records)

    def test_auth_permanent_emits_credential_language(self):
        agent = _agent_stub(provider="kimi-for-coding")
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.auth_permanent, 403)) is True
        text = agent._emit_status.call_args[0][0]
        assert "credential rejected" in text and "403" in text

    def test_transient_rate_limit_stays_silent(self):
        agent = _agent_stub()
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.rate_limit, 429)) is False
        agent._emit_status.assert_not_called()

    def test_distinct_conditions_each_notify(self):
        agent = _agent_stub()
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing)) is True
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.auth_permanent)) is True
        assert agent._emit_status.call_count == 2

    def test_latch_clear_rearms(self):
        agent = _agent_stub()
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing)) is True
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing)) is False
        clear_quota_attribution_latch(agent)
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing)) is True

    def test_cron_agent_without_status_callback_logs_only(self, caplog):
        """Cron sessions: no _emit_status wired → log only, never raises."""
        agent = SimpleNamespace()
        agent.provider = "deepseek"
        agent.base_url = "https://api.deepseek.com/v1"
        agent._emit_status = None  # cron shape: attribute exists but unwired
        with caplog.at_level(logging.WARNING, logger="agent.failover_notice"):
            assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing, 402)) is True
        assert any("plan or quota exhausted" in r.message for r in caplog.records)

    def test_notice_path_never_raises(self):
        agent = SimpleNamespace()  # no provider/base_url/_emit_status at all
        assert emit_quota_attribution_once(agent, _classified(FailoverReason.billing)) in (True, False)


class TestFallbackSwitchNoticeText:
    """The one-shot notice recorded by try_activate_fallback must name the
    failing provider, the cause, and the disambiguated fallback target."""

    def _make_agent(self, fallback_model):
        from run_agent import AIAgent

        with (
            patch("run_agent.get_tool_definitions", return_value=[]),
            patch("run_agent.check_toolset_requirements", return_value={}),
            patch("run_agent.OpenAI"),
        ):
            agent = AIAgent(
                api_key="test-key",
                base_url="https://api.deepseek.com/v1",
                provider="deepseek",
                model="deepseek-v4-flash",
                quiet_mode=True,
                skip_context_files=True,
                skip_memory=True,
                fallback_model=fallback_model,
            )
            agent.client = MagicMock()
            return agent

    def test_notice_names_cause_and_disambiguated_target(self):
        agent = self._make_agent(
            fallback_model=[{
                "provider": "zai",
                "model": "glm-5.3-flash",
                "base_url": "https://open.bigmodel.cn/api/paas/v4",
            }]
        )
        mock_client = MagicMock()
        mock_client.base_url = "https://open.bigmodel.cn/api/paas/v4"
        mock_client.api_key = "fb-key"
        mock_client._custom_headers = {}
        with patch(
            "agent.auxiliary_client.resolve_provider_client",
            return_value=(mock_client, "glm-5.3-flash"),
        ):
            assert agent._try_activate_fallback(reason=FailoverReason.rate_limit) is True

        notice = agent._pending_fallback_notice
        assert notice is not None
        assert "429" in notice  # the cause is human-readable, not an enum name
        assert "glm-5.3-flash" in notice
        assert "China" in notice  # metered GLM node named, not bare "zai"
