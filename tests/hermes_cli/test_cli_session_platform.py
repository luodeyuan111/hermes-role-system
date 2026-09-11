"""Tests for cli_session_platform — HERMES_PLATFORM conversation-type override.

Launchers such as scripts/call_role.py set HERMES_PLATFORM to tag a CLI
session as a different conversation type (parallel to qqbot/cli/dashboard)
so config.yaml ``platform_hints.<type>`` applies in the stable prompt layer.
"""

from hermes_cli.cli_agent_setup_mixin import cli_session_platform


class TestCliSessionPlatform:
    def test_defaults_to_cli(self, monkeypatch):
        monkeypatch.delenv("HERMES_PLATFORM", raising=False)
        assert cli_session_platform() == "cli"

    def test_env_override(self, monkeypatch):
        monkeypatch.setenv("HERMES_PLATFORM", "call_role")
        assert cli_session_platform() == "call_role"

    def test_empty_env_falls_back_to_cli(self, monkeypatch):
        monkeypatch.setenv("HERMES_PLATFORM", "")
        assert cli_session_platform() == "cli"
