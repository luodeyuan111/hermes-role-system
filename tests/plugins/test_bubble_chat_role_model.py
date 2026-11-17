"""PUT /roles/{name}/model — role default model from the bubble-chat role UI.

The role view's model dropdown used to only stage a model for the next new
chat; there was no way to change a role's default model from the role UI,
so "换完刷新还是旧模型" (the writes never happened). The endpoint persists
``model.default``/``model.provider`` into the role's own config.yaml via the
same ``_write_profile_model`` the dashboard's profile editor uses.
"""

import importlib.util
from pathlib import Path

import yaml
from fastapi import FastAPI
from fastapi.testclient import TestClient

_PLUGIN_API = (
    Path(__file__).resolve().parents[2]
    / "plugins"
    / "bubble-chat"
    / "dashboard"
    / "plugin_api.py"
)


def _load_plugin_api():
    spec = importlib.util.spec_from_file_location(
        "bubble_chat_plugin_api_test", _PLUGIN_API
    )
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def _client(tmp_path, monkeypatch):
    module = _load_plugin_api()
    home = tmp_path / "writer"
    home.mkdir()
    (home / "config.yaml").write_text(
        "model:\n  default: k3-256k\n  provider: kimi\n"
        "  base_url: https://api.kimi.com/coding/v1\n",
        encoding="utf-8",
    )
    monkeypatch.setattr(module, "_profile_home_or_404", lambda name: home)
    app = FastAPI()
    app.include_router(module.router, prefix="/api/plugins/bubble-chat")
    return TestClient(app), home


def test_set_role_default_model(tmp_path, monkeypatch):
    client, home = _client(tmp_path, monkeypatch)
    res = client.put(
        "/api/plugins/bubble-chat/roles/writer/model",
        json={"provider": "kimi-coding", "model": "kimi-k3.1-pro"},
    )
    assert res.status_code == 200, res.text
    body = res.json()
    assert body["ok"] is True
    assert body["model"] == "kimi-k3.1-pro"
    assert body["provider"] == "kimi-coding"
    saved = yaml.safe_load((home / "config.yaml").read_text(encoding="utf-8"))
    assert saved["model"]["default"] == "kimi-k3.1-pro"
    assert saved["model"]["provider"] == "kimi-coding"


def test_set_role_default_model_requires_both_fields(tmp_path, monkeypatch):
    client, home = _client(tmp_path, monkeypatch)
    res = client.put(
        "/api/plugins/bubble-chat/roles/writer/model",
        json={"provider": "", "model": "kimi-k3.1-pro"},
    )
    assert res.status_code == 400
    saved = yaml.safe_load((home / "config.yaml").read_text(encoding="utf-8"))
    assert saved["model"]["default"] == "k3-256k"
