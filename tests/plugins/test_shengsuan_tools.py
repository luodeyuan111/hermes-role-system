"""Tests for the shengsuan-tools plugin (R2.3).

Covers: tool registration (names/toolset/schemas/check_fn), handler argv
assembly and credential env injection (subprocess mocked — no network, no
real script execution), and check_fn credential gating.
"""

import importlib.util
import json
import sys
from pathlib import Path
from unittest.mock import patch

import pytest

_PLUGIN_DIR = (
    Path(__file__).resolve().parents[2] / "plugins" / "shengsuan-tools"
)


def _load_tools_module(tmp_path, monkeypatch, scripts_dir: Path | None = None):
    """Load plugins/shengsuan-tools/tools.py as a fresh module (mirrors the
    plugin loader's slug-based import of hyphenated plugin dirs) and point
    its script-dir candidates at a tmp directory."""
    module_name = "hermes_plugin_tests_shengsuan_tools"
    sys.modules.pop(module_name, None)
    spec = importlib.util.spec_from_file_location(
        module_name, _PLUGIN_DIR / "tools.py"
    )
    mod = importlib.util.module_from_spec(spec)
    sys.modules[module_name] = mod
    spec.loader.exec_module(mod)
    if scripts_dir is None:
        scripts_dir = tmp_path / "scripts" / "tools"
        scripts_dir.mkdir(parents=True)
    monkeypatch.setattr(mod, "_script_dir_candidates", lambda: [scripts_dir])
    return mod, scripts_dir


def _write_keys(scripts_dir: Path, key: str = "test-key") -> None:
    (scripts_dir / "api_keys.json").write_text(
        json.dumps({"shengsuanyun": {"api_key": key}}), encoding="utf-8"
    )


def test_register_registers_both_tools_into_shengsuan_toolset():
    """register(ctx) wires both tools into the 'shengsuan' toolset with
    schemas and the shared check_fn."""
    init_path = _PLUGIN_DIR / "__init__.py"
    spec = importlib.util.spec_from_file_location(
        "hermes_plugin_tests_shengsuan_init",
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

    by_name = {r["name"]: r for r in registered}
    assert set(by_name) == {"vision_analyze_ss", "image_generate_ss"}
    for entry in registered:
        assert entry["toolset"] == "shengsuan"
        assert entry["schema"]["name"] == entry["name"]
        assert entry["schema"]["description"]
        assert entry["check_fn"] is mod._check_shengsuan_available
        assert callable(entry["handler"])


def test_check_fn_false_without_credentials(tmp_path, monkeypatch):
    mod, _ = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.delenv("SHENGSHUAN_API_KEY", raising=False)
    assert mod._check_shengsuan_available() is False


def test_check_fn_true_with_api_keys_json(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.delenv("SHENGSHUAN_API_KEY", raising=False)
    _write_keys(scripts_dir)
    assert mod._check_shengsuan_available() is True


def test_check_fn_true_with_env_var(tmp_path, monkeypatch):
    mod, _ = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.setenv("SHENGSHUAN_API_KEY", "env-key")
    assert mod._check_shengsuan_available() is True


def test_check_fn_false_with_empty_api_keys_json(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.delenv("SHENGSHUAN_API_KEY", raising=False)
    _write_keys(scripts_dir, key="")
    assert mod._check_shengsuan_available() is False


def _fake_completed(stdout: str, returncode: int = 0, stderr: str = ""):
    import subprocess as sp

    return sp.CompletedProcess(args=[], returncode=returncode, stdout=stdout, stderr=stderr)


def test_vision_handler_argv_and_env(tmp_path, monkeypatch):
    """vision handler runs vision.py with [image_path, prompt] and injects
    the resolved key into the subprocess env."""
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.delenv("SHENGSHUAN_API_KEY", raising=False)
    _write_keys(scripts_dir, key="secret-key")
    (scripts_dir / "vision.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed(
            json.dumps({"content": "一只猫", "model": "ali/qwen-vl-plus"})
        )
        out = mod._handle_vision_analyze_ss(
            {"image_path": "/tmp/cat.png", "prompt": "图里有什么"}
        )

    result = json.loads(out)
    assert result["content"] == "一只猫"

    args, kwargs = mock_run.call_args
    cmd = args[0]
    assert cmd[0] == sys.executable
    assert cmd[1].endswith("vision.py")
    assert cmd[2:] == ["/tmp/cat.png", "图里有什么"]
    assert kwargs["env"]["SHENGSHUAN_API_KEY"] == "secret-key"
    assert kwargs["env"]["VISION_API_KEY"] == "secret-key"
    assert kwargs["timeout"] == mod._VISION_TIMEOUT


def test_vision_handler_default_prompt(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    (scripts_dir / "vision.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed(json.dumps({"content": "ok"}))
        mod._handle_vision_analyze_ss({"image_path": "/tmp/x.png"})

    cmd = mock_run.call_args.args[0]
    assert cmd[2] == "/tmp/x.png"
    assert cmd[3]  # default prompt filled in


def test_vision_handler_requires_image_path(tmp_path, monkeypatch):
    mod, _ = _load_tools_module(tmp_path, monkeypatch)
    out = json.loads(mod._handle_vision_analyze_ss({}))
    assert "error" in out
    assert "image_path" in out["error"]


def test_generate_handler_argv(tmp_path, monkeypatch):
    """image_generate_ss assembles generate.py argv per its CLI:
    [--model <model> <prompt> [size]]."""
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    (scripts_dir / "generate.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed(json.dumps({"url": "https://img"}))
        out = mod._handle_image_generate_ss(
            {"prompt": "星空下的猫", "model": "image2", "size": "1024x1024"}
        )

    assert json.loads(out)["url"] == "https://img"
    cmd = mock_run.call_args.args[0]
    assert cmd[1].endswith("generate.py")
    assert cmd[2:] == ["--model", "image2", "星空下的猫", "1024x1024"]
    assert mock_run.call_args.kwargs["timeout"] == mod._GENERATE_TIMEOUT


def test_generate_handler_defaults(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    (scripts_dir / "generate.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed(json.dumps({"ok": True}))
        mod._handle_image_generate_ss({"prompt": "test"})

    cmd = mock_run.call_args.args[0]
    # default model doubao, no size arg appended
    assert cmd[2:] == ["--model", "doubao", "test"]


def test_handler_missing_credential_returns_error(tmp_path, monkeypatch):
    """Without any credential the handler fails fast (no subprocess spawn)."""
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    monkeypatch.delenv("SHENGSHUAN_API_KEY", raising=False)
    (scripts_dir / "vision.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        out = json.loads(mod._handle_vision_analyze_ss({"image_path": "/x.png"}))

    assert "error" in out
    assert "SHENGSHUAN_API_KEY" in out["error"]
    mock_run.assert_not_called()


def test_handler_missing_script_returns_error(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    # no vision.py written

    out = json.loads(mod._handle_vision_analyze_ss({"image_path": "/x.png"}))
    assert "error" in out
    assert "vision.py" in out["error"]


def test_handler_script_error_propagates(tmp_path, monkeypatch):
    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    (scripts_dir / "vision.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed(
            json.dumps({"error": "文件不存在: /x.png"}), returncode=0
        )
        out = json.loads(mod._handle_vision_analyze_ss({"image_path": "/x.png"}))
    assert out["error"] == "文件不存在: /x.png"

    with patch.object(mod.subprocess, "run") as mock_run:
        mock_run.return_value = _fake_completed("", returncode=2, stderr="boom")
        out = json.loads(mod._handle_vision_analyze_ss({"image_path": "/x.png"}))
    assert out["error"] == "boom"


def test_handler_timeout_returns_error(tmp_path, monkeypatch):
    import subprocess as sp

    mod, scripts_dir = _load_tools_module(tmp_path, monkeypatch)
    _write_keys(scripts_dir)
    (scripts_dir / "generate.py").write_text("# stub", encoding="utf-8")

    with patch.object(mod.subprocess, "run", side_effect=sp.TimeoutExpired("cmd", 1)):
        out = json.loads(mod._handle_image_generate_ss({"prompt": "x"}))
    assert "超时" in out["error"]
