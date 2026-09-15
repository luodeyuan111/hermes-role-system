"""Tests for the CLI /model --global persistence tier.

``cli._persist_model_switch_config()`` must write the full
default/provider/base_url triple (mirroring the gateway's
``_persist_model_switch_as_profile_default``): a cross-provider switch that
leaves the old ``model.base_url`` behind misroutes the new model at the
stale host after a restart.
"""

import logging

import pytest
import yaml

from hermes_cli.model_switch import ModelSwitchResult


def _result(**overrides):
    base = dict(
        success=True,
        new_model="deepseek-chat",
        target_provider="deepseek",
        provider_changed=True,
        api_key="",
        base_url="",
        api_mode="chat_completions",
        warning_message="",
        provider_label="DeepSeek",
        resolved_via_alias=False,
        capabilities=None,
        model_info=None,
        is_global=True,
    )
    base.update(overrides)
    return ModelSwitchResult(**base)


class TestPersistModelSwitchConfig:
    @pytest.fixture
    def config_env(self, tmp_path, monkeypatch):
        hermes_home = tmp_path / ".hermes"
        hermes_home.mkdir()
        config_path = hermes_home / "config.yaml"
        config_path.write_text(yaml.dump({
            "model": {
                "default": "old-model",
                "provider": "custom",
                "base_url": "https://old-custom.example.com/v1",
                "api_key": "sk-old",
                "api_mode": "chat_completions",
            },
        }))
        monkeypatch.setattr("cli._hermes_home", hermes_home)
        return config_path

    def test_cross_provider_switch_removes_stale_base_url(self, config_env):
        from cli import _persist_model_switch_config

        _persist_model_switch_config(_result())

        cfg = yaml.safe_load(config_env.read_text())
        assert cfg["model"]["default"] == "deepseek-chat"
        assert cfg["model"]["provider"] == "deepseek"
        assert "base_url" not in cfg["model"]
        # Stale inline endpoint credentials go too.
        assert "api_key" not in cfg["model"]
        assert "api_mode" not in cfg["model"]

    def test_switch_with_base_url_writes_it(self, config_env):
        from cli import _persist_model_switch_config

        _persist_model_switch_config(_result(
            target_provider="openrouter",
            base_url="https://openrouter.ai/api/v1",
        ))

        cfg = yaml.safe_load(config_env.read_text())
        assert cfg["model"]["base_url"] == "https://openrouter.ai/api/v1"
        assert "api_key" not in cfg["model"]

    def test_custom_provider_keeps_inline_credentials(self, config_env):
        from cli import _persist_model_switch_config

        _persist_model_switch_config(_result(
            target_provider="custom",
            base_url="https://new-custom.example.com/v1",
        ))

        cfg = yaml.safe_load(config_env.read_text())
        assert cfg["model"]["base_url"] == "https://new-custom.example.com/v1"
        assert cfg["model"]["api_key"] == "sk-old"


class TestConfigWriteTrace:
    @pytest.fixture
    def config_env(self, tmp_path, monkeypatch):
        hermes_home = tmp_path / ".hermes"
        hermes_home.mkdir()
        (hermes_home / "config.yaml").write_text(yaml.dump({"model": {"default": "m"}}))
        monkeypatch.setattr("cli._hermes_home", hermes_home)
        return hermes_home / "config.yaml"

    def test_save_config_value_logs_key_value_and_caller(self, config_env, caplog):
        from cli import save_config_value

        with caplog.at_level(logging.INFO, logger="cli"):
            save_config_value("display.skin", "mono")

        messages = [r.getMessage() for r in caplog.records]
        line = next((m for m in messages if "config set display.skin" in m), "")
        assert "mono" in line
        assert "from test_model_switch_persist_config.py:" in line

    def test_delete_config_value_logs_removal(self, config_env, caplog):
        from cli import delete_config_value

        with caplog.at_level(logging.INFO, logger="cli"):
            assert delete_config_value("model.default") is True
            assert delete_config_value("model.default") is False  # already gone

        messages = [r.getMessage() for r in caplog.records]
        assert any("config delete model.default" in m for m in messages)
        assert yaml.safe_load(config_env.read_text()) == {"model": {}}


class TestHermesCliConfigWriteTrace:
    """The gateway-side write paths (hermes_cli/config.py) trace too."""

    def test_save_config_logs_write(self, caplog):
        from hermes_cli.config import save_config

        with caplog.at_level(logging.INFO, logger="utils"):
            save_config({"model": {"provider": "deepseek", "default": "deepseek-chat"}})

        messages = [r.getMessage() for r in caplog.records]
        line = next((m for m in messages if "config write" in m and "config.yaml" in m), "")
        assert "from test_model_switch_persist_config.py:" in line

    def test_set_config_value_logs_key_and_caller(self, caplog):
        from hermes_cli.config import set_config_value

        with caplog.at_level(logging.INFO, logger="utils"):
            set_config_value("display.skin", "mono")

        messages = [r.getMessage() for r in caplog.records]
        line = next((m for m in messages if "config set display.skin" in m), "")
        assert "mono" in line
        assert "from test_model_switch_persist_config.py:" in line

    def test_atomic_config_write_logs_write(self, tmp_path, caplog):
        from hermes_cli.config import atomic_config_write

        with caplog.at_level(logging.INFO, logger="utils"):
            atomic_config_write(tmp_path / "config.yaml", {"model": {"provider": "openrouter"}})

        messages = [r.getMessage() for r in caplog.records]
        assert any("config write" in m and "config.yaml" in m for m in messages)
