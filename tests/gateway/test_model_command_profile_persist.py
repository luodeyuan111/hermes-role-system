"""Multiplexed gateway: /model --global must persist to the SESSION's profile.

Bug (R5.2): ``_handle_model_command`` resolved its config target from the
module-level ``gateway.run._hermes_home`` (the gateway process's own home)
and slash-command dispatch never enters ``_profile_runtime_scope`` — only
agent turns do (``_run_agent``).  In a profile multiplexer, a scholar
session running ``/model X --global`` therefore read AND wrote the default
profile's ``config.yaml``:

  - scholar's config.yaml unchanged → next scholar session still resolves
    the old model ("fix doesn't persist" across sessions)
  - default's config.yaml polluted with scholar's model → the default
    profile's next sessions pick up a model that was never chosen for it
    ("cross-profile wire-crossing")

These tests pin the correct behavior: a session may only ever read/write
its OWN profile's config.yaml.
"""

import yaml
import pytest

from gateway.config import GatewayConfig, Platform, PlatformConfig
from gateway.platforms.base import MessageEvent, MessageType
from gateway.run import GatewayRunner
from gateway.session import SessionSource


def _make_runner():
    runner = object.__new__(GatewayRunner)
    runner.adapters = {}
    runner._voice_mode = {}
    runner._session_model_overrides = {}
    runner._running_agents = {}
    runner.config = GatewayConfig(
        platforms={Platform.TELEGRAM: PlatformConfig(enabled=True, token="tok")},
        multiplex_profiles=True,
    )
    return runner


def _make_event(text, profile=None):
    return MessageEvent(
        text=text,
        message_type=MessageType.TEXT,
        source=SessionSource(
            platform=Platform.TELEGRAM,
            chat_id="12345",
            chat_type="dm",
            profile=profile,
        ),
    )


def _fake_switch_result():
    from hermes_cli.model_switch import ModelSwitchResult

    return ModelSwitchResult(
        success=True,
        new_model="glm-5.5",
        target_provider="zai",
        provider_changed=True,
        api_key="sk-test",
        base_url="https://open.bigmodel.cn/api/paas/v4",
        api_mode="chat_completions",
        provider_label="Z.AI",
        is_global=True,
    )


def _setup_two_profile_home(tmp_path, monkeypatch):
    """Default profile = gateway process home; scholar = secondary profile."""
    import gateway.run as gateway_run

    default_home = tmp_path / ".hermes"
    scholar_home = default_home / "profiles" / "scholar"
    scholar_home.mkdir(parents=True)
    default_cfg = default_home / "config.yaml"
    scholar_cfg = scholar_home / "config.yaml"
    default_cfg.write_text(
        yaml.safe_dump({"model": {"default": "default-model", "provider": "deepseek"}}),
        encoding="utf-8",
    )
    scholar_cfg.write_text(
        yaml.safe_dump({"model": {"default": "scholar-model", "provider": "deepseek"}}),
        encoding="utf-8",
    )

    # Gateway process home = default profile; profile dirs anchor off
    # HERMES_HOME (hermes_constants.get_default_hermes_root).
    monkeypatch.setenv("HERMES_HOME", str(default_home))
    monkeypatch.setattr(gateway_run, "_hermes_home", default_home)
    monkeypatch.setattr("agent.models_dev.fetch_models_dev", lambda: {})
    monkeypatch.setattr(
        "hermes_cli.model_switch.switch_model",
        lambda **kw: _fake_switch_result(),
    )
    return default_cfg, scholar_cfg


@pytest.mark.asyncio
async def test_global_switch_writes_session_profile_not_process_home(tmp_path, monkeypatch):
    """scholar session: /model --global must write scholar/config.yaml ONLY."""
    default_cfg, scholar_cfg = _setup_two_profile_home(tmp_path, monkeypatch)

    result = await _make_runner()._handle_model_command(
        _make_event("/model glm-5.5 --global", profile="scholar")
    )

    assert result is not None
    assert "glm-5.5" in result

    scholar_written = yaml.safe_load(scholar_cfg.read_text(encoding="utf-8"))
    assert scholar_written["model"]["default"] == "glm-5.5", (
        "session profile config must receive the persisted default; got %r"
        % (scholar_written["model"],)
    )
    assert scholar_written["model"]["provider"] == "zai"

    default_written = yaml.safe_load(default_cfg.read_text(encoding="utf-8"))
    assert default_written["model"]["default"] == "default-model", (
        "gateway process home must NOT be polluted by another profile's "
        "session; got %r" % (default_written["model"],)
    )


@pytest.mark.asyncio
async def test_current_model_display_reads_session_profile(tmp_path, monkeypatch):
    """The 'current model' shown by /model must come from the session's
    profile config, not the gateway process home."""
    _setup_two_profile_home(tmp_path, monkeypatch)

    runner = _make_runner()
    # No-args /model prints the current-model list (no picker adapter here).
    result = await runner._handle_model_command(_make_event("/model", profile="scholar"))

    assert result is not None
    assert "scholar-model" in result, (
        "/model display must resolve the session profile's config; got:\n%s" % result
    )
    assert "default-model" not in result
