"""Tests for the knowledge-banks plugin (no live HTTP)."""

import importlib.util
import json
import sys
from pathlib import Path

import pytest

_PLUGIN_DIR = Path(__file__).resolve().parents[2] / "plugins" / "knowledge-banks"


def _config(*, write: bool = True) -> dict:
    return {
        "api_url": "http://127.0.0.1:9100",
        "libraries": {
            "papers": {
                "bank_id": "researcher-papers",
                "read": True,
                "write": write,
                "recall_budget": "low",
                "recall_max_tokens": 1234,
            }
        },
    }


def _load_tools(tmp_path, monkeypatch, config=None):
    name = "hermes_plugin_tests_knowledge_tools"
    sys.modules.pop(name, None)
    spec = importlib.util.spec_from_file_location(name, _PLUGIN_DIR / "tools.py")
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod
    spec.loader.exec_module(mod)
    monkeypatch.setattr(mod, "get_hermes_home", lambda: tmp_path)
    if config is not None:
        (tmp_path / "knowledge-banks.json").write_text(json.dumps(config), encoding="utf-8")
    return mod


def test_register_exposes_three_knowledge_tools():
    init_path = _PLUGIN_DIR / "__init__.py"
    spec = importlib.util.spec_from_file_location(
        "hermes_plugin_tests_knowledge_init",
        init_path,
        submodule_search_locations=[str(_PLUGIN_DIR)],
    )
    mod = importlib.util.module_from_spec(spec)
    mod.__package__ = spec.name
    mod.__path__ = [str(_PLUGIN_DIR)]
    sys.modules[spec.name] = mod
    spec.loader.exec_module(mod)
    registered = []

    class FakeCtx:
        def register_tool(self, **kwargs):
            registered.append(kwargs)

    mod.register(FakeCtx())
    by_name = {entry["name"]: entry for entry in registered}
    assert set(by_name) == {"knowledge_query", "knowledge_record", "knowledge_list"}
    for entry in registered:
        assert entry["toolset"] == "knowledge"
        assert entry["schema"]["name"] == entry["name"]
        assert entry["check_fn"] is mod._check_knowledge_available


def test_availability_requires_config(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch)
    assert mod._check_knowledge_available() is False
    (tmp_path / "knowledge-banks.json").write_text(json.dumps(_config()), encoding="utf-8")
    assert mod._check_knowledge_available() is True


def test_query_uses_registered_bank_and_returns_metadata(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch, _config())
    calls = []

    def fake_api(method, bank_id, endpoint, **kwargs):
        calls.append((method, bank_id, endpoint, kwargs))
        return {
            "results": [
                {"id": "1", "text": "DreamerV3 note", "type": "world", "metadata": {"source": "arxiv"}},
                {"id": "2", "text": "trimmed", "type": "world"},
            ],
            "source_facts": {"1": {"id": "1", "text": "raw"}},
        }

    monkeypatch.setattr(mod, "_api_request", fake_api)
    result = json.loads(mod._handle_knowledge_query({
        "library": "papers", "query": "DreamerV3", "limit": 1, "include_source_facts": True,
    }))

    assert result["success"] is True
    assert result["count"] == 1
    assert result["results"][0]["metadata"]["source"] == "arxiv"
    assert result["source_facts"]["1"]["text"] == "raw"
    method, bank_id, endpoint, kwargs = calls[0]
    assert (method, bank_id, endpoint) == ("POST", "researcher-papers", "memories/recall")
    assert kwargs["payload"]["query"] == "DreamerV3"
    assert kwargs["payload"]["prefer_observations"] is True
    assert kwargs["payload"]["max_tokens"] == 1234
    assert kwargs["payload"]["include"] == {"source_facts": {}}


def test_unknown_library_is_rejected_before_http(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch, _config())
    monkeypatch.setattr(mod, "_api_request", lambda *args, **kwargs: pytest.fail("unexpected HTTP"))
    result = json.loads(mod._handle_knowledge_query({"library": "../../other", "query": "x"}))
    assert "error" in result
    assert "available: papers" in result["error"]


def test_record_defaults_to_append_and_merges_document_metadata(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch, _config())
    calls = []

    def fake_api(method, bank_id, endpoint, **kwargs):
        if method == "GET":
            assert kwargs["params"]["document_id"] == "paper:arxiv:2301.04104"
            return {"items": [{"metadata": {"title": "Existing title", "source": "arxiv", "year": "2022"}}]}
        calls.append(kwargs["payload"])
        return {"success": True, "items_count": 1, "operation_id": "op-1", "async": True}

    monkeypatch.setattr(mod, "_api_request", fake_api)
    result = json.loads(mod._handle_knowledge_record({
        "library": "papers",
        "content": "DreamerV3 trains in imagination.",
        "document_id": "paper:arxiv:2301.04104",
        "metadata": {"year": 2023, "authors": ["Hafner"]},
        "tags": ["paper", "world-model"],
    }))

    assert result["success"] is True
    assert result["operation_id"] == "op-1"
    payload = calls[0]
    assert payload["async"] is True
    item = payload["items"][0]
    assert item["update_mode"] == "append"
    assert item["metadata"]["title"] == "Existing title"
    assert item["metadata"]["source"] == "arxiv"
    assert item["metadata"]["year"] == "2023"
    assert item["metadata"]["authors"] == '["Hafner"]'
    assert item["metadata"]["library"] == "papers"
    assert item["tags"] == ["paper", "world-model"]


def test_record_requires_write_permission(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch, _config(write=False))
    monkeypatch.setattr(mod, "_api_request", lambda *args, **kwargs: pytest.fail("unexpected HTTP"))
    result = json.loads(mod._handle_knowledge_record({"library": "papers", "content": "x"}))
    assert "error" in result
    assert "does not allow write" in result["error"]


def test_list_passes_filters_and_pagination(tmp_path, monkeypatch):
    mod = _load_tools(tmp_path, monkeypatch, _config())
    calls = []

    def fake_api(method, bank_id, endpoint, **kwargs):
        calls.append((method, bank_id, endpoint, kwargs))
        return {"items": [{"id": "1", "text": "note", "fact_type": "world"}], "total": 9}

    monkeypatch.setattr(mod, "_api_request", fake_api)
    result = json.loads(mod._handle_knowledge_list({
        "library": "papers", "query": "dreamer", "fact_type": "world", "limit": 5, "offset": 10,
    }))

    assert result["total"] == 9
    assert result["count"] == 1
    method, bank_id, endpoint, kwargs = calls[0]
    assert (method, bank_id, endpoint) == ("GET", "researcher-papers", "memories/list")
    assert kwargs["params"] == {"limit": 5, "offset": 10, "q": "dreamer", "type": "world"}
