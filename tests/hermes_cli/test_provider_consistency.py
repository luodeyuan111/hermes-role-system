"""Tests for the provider configuration consistency audit (R5.1 + R5.5).

The audit is pure static analysis over (profile config.yaml, profile .env)
dicts — no network.  These tests pin the findings contract, including the
acceptance case: a profile whose .env GLM_BASE_URL silently pins the
metered node while nothing in config.yaml says so MUST be flagged.
"""

from hermes_cli.provider_consistency import (
    Finding,
    audit_provider_config,
)

METERED_CN = "https://open.bigmodel.cn/api/paas/v4"
CODING_CN = "https://open.bigmodel.cn/api/coding/paas/v4"


def _levels(findings):
    return [f.level for f in findings]


def _find(findings, level, needle):
    return [f for f in findings if f.level == level and needle in f.text]


class TestModelRoutingAudit:
    def test_wire_cross_provider_base_url_mismatch_fails(self):
        """R5.1: configured DeepSeek but base_url points at Kimi → FAIL."""
        findings = audit_provider_config(
            {"model": {"provider": "deepseek", "base_url": "https://api.kimi.com/coding/v1"}},
            {},
        )
        fails = _find(findings, "fail", "wire-cross")
        assert fails, f"expected a wire-cross fail, got: {findings}"
        assert "api.kimi.com" in fails[0].text
        assert "deepseek" in fails[0].text
        assert fails[0].fix

    def test_coherent_routing_ok(self):
        findings = audit_provider_config(
            {"model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"}},
            {},
        )
        assert _find(findings, "ok", "hosts agree")
        assert "fail" not in _levels(findings)

    def test_zai_any_named_endpoint_is_coherent(self):
        """zai has four legitimate homes — the Coding Plan node must not
        be flagged as a wire-cross for provider 'zai'."""
        findings = audit_provider_config(
            {"model": {"provider": "zai", "base_url": CODING_CN}},
            {},
        )
        assert "fail" not in _levels(findings)

    def test_registry_default_when_no_base_url(self):
        findings = audit_provider_config({"model": {"provider": "deepseek"}}, {})
        assert _find(findings, "ok", "registry default")


class TestZaiThreeLayerAudit:
    def test_env_only_metered_pin_is_flagged(self):
        """THE acceptance case: GLM_BASE_URL in .env (metered) with no
        config-layer endpoint — the standing wire-cross — must warn."""
        findings = audit_provider_config(
            {"model": {"provider": "zai", "base_url": METERED_CN}},
            {"GLM_BASE_URL": METERED_CN},
        )
        warns = _find(findings, "warn", "invisible .env override")
        assert warns, f"expected the GLM_BASE_URL wire-cross warn, got: {findings}"
        assert "wire-cross" in warns[0].text
        assert warns[0].fix and "model.zai_endpoint" in warns[0].fix

    def test_config_endpoint_wins_over_disagreeing_env(self):
        findings = audit_provider_config(
            {"model": {"provider": "zai", "zai_endpoint": "coding-cn"}},
            {"GLM_BASE_URL": METERED_CN},
        )
        warns = _find(findings, "warn", "disagrees")
        assert warns
        assert "config value WINS" in warns[0].text

    def test_config_endpoint_aligned_with_env_ok(self):
        findings = audit_provider_config(
            {"model": {"provider": "zai", "zai_endpoint": "cn"}},
            {"GLM_BASE_URL": METERED_CN},
        )
        assert _find(findings, "ok", "pinned by config")
        assert not _find(findings, "warn", "disagrees")

    def test_unknown_endpoint_id_warns(self):
        findings = audit_provider_config(
            {"model": {"provider": "zai", "zai_endpoint": "coding-eu"}},
            {},
        )
        warns = _find(findings, "warn", "not a known endpoint id")
        assert warns and warns[0].fix

    def test_nothing_pinned_is_info(self):
        findings = audit_provider_config({"model": {"provider": "zai"}}, {})
        infos = _find(findings, "info", "auto-detected by probing")
        assert infos


class TestFallbackAudit:
    def test_fallback_present_is_explicit_info(self):
        findings = audit_provider_config(
            {
                "model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"},
                "fallback_model": {"provider": "zai", "model": "glm-5.3-flash", "base_url": METERED_CN},
            },
            {},
        )
        assert _find(findings, "info", "fallback_model configured")
        # And its routing is cross-checked too.
        assert "fail" not in _levels(findings)

    def test_fallback_wire_cross_fails(self):
        findings = audit_provider_config(
            {
                "model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"},
                "fallback_model": {"provider": "zai", "base_url": "https://api.kimi.com/coding/v1"},
            },
            {},
        )
        assert _find(findings, "fail", "fallback_model")

    def test_no_fallback_means_no_silent_switch(self):
        """R5.1: without explicit fallback config the agent never silently
        switches providers — doctor must SAY so."""
        findings = audit_provider_config(
            {"model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"}},
            {},
        )
        assert _find(findings, "ok", "never switches providers on its own")


class TestOverlayEnvAudit:
    def test_overlay_env_disagrees_with_model_base_url(self):
        findings = audit_provider_config(
            {"model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"}},
            {"DEEPSEEK_BASE_URL": "https://proxy.example.com/v1"},
        )
        warns = _find(findings, "warn", "DEEPSEEK_BASE_URL")
        assert warns and "different endpoints" in warns[0].text

    def test_overlay_env_aligned_is_silent(self):
        findings = audit_provider_config(
            {"model": {"provider": "deepseek", "base_url": "https://api.deepseek.com/v1"}},
            {"DEEPSEEK_BASE_URL": "https://api.deepseek.com/v1"},
        )
        assert not _find(findings, "warn", "DEEPSEEK_BASE_URL")


class TestRobustness:
    def test_empty_config_and_env(self):
        findings = audit_provider_config({}, {})
        assert findings  # at least the "not set" info lines
        assert all(isinstance(f, Finding) for f in findings)

    def test_flat_string_model_section(self):
        findings = audit_provider_config({"model": "glm-5"}, {})
        assert all(isinstance(f, Finding) for f in findings)
