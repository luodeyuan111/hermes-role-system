"""Gateway session-model sync must persist the PRIMARY identity while a
provider fallback is covering the turn.

``GatewayRunner._sync_session_model_from_agent`` mirrors the runtime model
into the session row so session lists and resume report the backend that
answered the latest turn. It used to persist ``agent.model`` verbatim — so
during a transient fallback (429/quota on the primary) the durable row
recorded the fallback model, and resume turned it into a hard
``model_override`` that pinned the chat to the fallback provider for good.
"""

import json
import types

from gateway.run import GatewayRunner


class _FakeDB:
    def __init__(self, row):
        self._row = dict(row)
        self.writes = []

    def get_session(self, session_id):
        return dict(self._row)

    def update_session_meta(self, session_id, config_json, model=None):
        self.writes.append((json.loads(config_json), model))
        self._row["model_config"] = config_json
        self._row["model"] = model


def _runner(db):
    return types.SimpleNamespace(_session_db=types.SimpleNamespace(_db=db))


def _agent(*, fallback_active: bool) -> types.SimpleNamespace:
    return types.SimpleNamespace(
        model="glm-5.3-flash",
        provider="zai",
        base_url="https://open.bigmodel.cn/api/paas/v4",
        api_mode="chat_completions",
        _fallback_activated=fallback_active,
        _primary_runtime={
            "model": "kimi-k3.1-pro",
            "provider": "kimi-coding",
            "base_url": "https://api.kimi.com/coding/v1",
            "api_mode": "chat_completions",
        },
    )


def test_sync_persists_primary_during_fallback():
    db = _FakeDB({"model": "kimi-k3.1-pro", "model_config": "{}"})
    GatewayRunner._sync_session_model_from_agent(
        _runner(db), "sess-1", _agent(fallback_active=True)
    )
    assert len(db.writes) == 1
    config, model = db.writes[0]
    # Durable model stays the primary; the fallback is only flagged.
    assert model == "kimi-k3.1-pro"
    assert config["gateway_runtime"]["provider"] == "kimi-coding"
    assert config["gateway_runtime"]["fallback_active"] is True


def test_sync_persists_live_model_when_no_fallback():
    db = _FakeDB({"model": "kimi-k3.1-pro", "model_config": "{}"})
    GatewayRunner._sync_session_model_from_agent(
        _runner(db), "sess-1", _agent(fallback_active=False)
    )
    assert len(db.writes) == 1
    config, model = db.writes[0]
    assert model == "glm-5.3-flash"
    assert config["gateway_runtime"]["fallback_active"] is False


def test_sync_fallback_without_primary_runtime_keeps_live_model():
    agent = _agent(fallback_active=True)
    agent._primary_runtime = None
    db = _FakeDB({"model": "kimi-k3.1-pro", "model_config": "{}"})
    GatewayRunner._sync_session_model_from_agent(_runner(db), "sess-1", agent)
    assert len(db.writes) == 1
    _, model = db.writes[0]
    assert model == "glm-5.3-flash"


def test_sync_noop_when_row_already_current():
    agent = _agent(fallback_active=False)
    db = _FakeDB(
        {
            "model": "glm-5.3-flash",
            "model_config": json.dumps(
                {
                    "gateway_runtime": {
                        "provider": "zai",
                        "base_url": "https://open.bigmodel.cn/api/paas/v4",
                        "api_mode": "chat_completions",
                        "fallback_active": False,
                    }
                }
            ),
        }
    )
    GatewayRunner._sync_session_model_from_agent(_runner(db), "sess-1", agent)
    assert db.writes == []
