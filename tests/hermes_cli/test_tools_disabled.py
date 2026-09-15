"""Tests for the profile-local tools.disabled denylist (R2.1).

``<HERMES_HOME>/tools.disabled`` is a plain-text incremental blacklist of
toolset names, unioned with config.yaml's ``agent.disabled_toolsets`` at the
tail of ``_get_platform_tools``. Core toolsets (tools overlapping
``_HERMES_CORE_TOOLS``) listed there are protected — kept enabled with a
warning — while config.yaml entries stay unprotected (explicit user config
has final say).

The autouse ``_hermetic_environment`` fixture in tests/conftest.py points
HERMES_HOME at a per-test tempdir, so ``get_hermes_home()`` is the isolated
home throughout.
"""

import logging

import pytest

from hermes_cli.tools_config import (
    _filter_core_protected_toolsets,
    _get_platform_tools,
    _tools_disabled_cache_clear,
    get_tools_disabled,
)
from hermes_constants import get_hermes_home


@pytest.fixture(autouse=True)
def _fresh_tools_disabled_cache():
    _tools_disabled_cache_clear()
    yield
    _tools_disabled_cache_clear()


def _write_tools_disabled(text: str):
    path = get_hermes_home() / "tools.disabled"
    path.write_text(text, encoding="utf-8")
    return path


# ---------------------------------------------------------------------------
# Parsing (get_tools_disabled)
# ---------------------------------------------------------------------------


def test_missing_file_returns_empty_set():
    assert not (get_hermes_home() / "tools.disabled").exists()
    assert get_tools_disabled() == set()


def test_empty_file_returns_empty_set():
    _write_tools_disabled("")
    assert get_tools_disabled() == set()


def test_comments_and_blank_lines_skipped():
    _write_tools_disabled(
        "# per-profile trimming\n"
        "\n"
        "spotify\n"
        "   \n"
        "# another comment\n"
        "video_gen\n"
    )
    assert get_tools_disabled() == {"spotify", "video_gen"}


def test_malformed_lines_dropped_valid_kept():
    _write_tools_disabled(
        "spotify\n"
        "two words\n"          # whitespace
        "../escape\n"          # path separator
        "a/b\n"
        "back\\slash\n"
        "\tindented_ok\n"      # stripped -> valid
    )
    assert get_tools_disabled() == {"spotify", "indented_ok"}


def test_mid_process_edit_is_picked_up():
    """The fingerprint cache must not freeze the file for the process
    lifetime — the agent edits tools.disabled in-conversation."""
    _write_tools_disabled("spotify\n")
    assert get_tools_disabled() == {"spotify"}
    _write_tools_disabled("video_gen\n")
    assert get_tools_disabled() == {"video_gen"}
    (get_hermes_home() / "tools.disabled").unlink()
    assert get_tools_disabled() == set()


# ---------------------------------------------------------------------------
# Core protection filter
# ---------------------------------------------------------------------------


def test_core_toolsets_filtered_out():
    # browser/image_gen/terminal tools are all in _HERMES_CORE_TOOLS.
    assert _filter_core_protected_toolsets({"browser", "image_gen", "terminal"}) == set()


def test_non_core_and_unknown_names_pass_filter():
    # spotify/video_gen are real non-core toolsets; MCP server names and
    # plugin toolset keys have no static TOOLSETS entry and pass through.
    names = {"spotify", "video_gen", "some_mcp_server", "some_plugin_toolset"}
    assert _filter_core_protected_toolsets(names) == names


def test_core_protection_warns_once_per_name(caplog):
    with caplog.at_level(logging.WARNING):
        _filter_core_protected_toolsets({"browser"})
        _filter_core_protected_toolsets({"browser"})
    warnings = [r for r in caplog.records if "core toolset" in r.message]
    assert len(warnings) == 1
    assert "browser" in warnings[0].message


# ---------------------------------------------------------------------------
# Resolution (_get_platform_tools integration)
# ---------------------------------------------------------------------------


def test_tools_disabled_subtracts_mcp_server():
    """MCP server names land in the enabled set by default; a profile can
    trim one without touching the others."""
    config = {"mcp_servers": {"mcp_alpha": {}, "mcp_beta": {}}}
    _write_tools_disabled("mcp_alpha\n")

    enabled = _get_platform_tools(config, "cli")
    assert "mcp_alpha" not in enabled
    assert "mcp_beta" in enabled
    assert "browser" in enabled  # untouched default


def test_tools_disabled_subtracts_explicitly_enabled_optional_toolset():
    """spotify is non-core and off by default; once the user enables it,
    tools.disabled can still trim it for this profile."""
    config = {"platform_toolsets": {"cli": ["hermes-cli", "spotify"]}}
    assert "spotify" in _get_platform_tools(config, "cli")

    _write_tools_disabled("spotify\n")
    enabled = _get_platform_tools(config, "cli")
    assert "spotify" not in enabled
    assert "terminal" in enabled  # core survives


def test_union_with_config_disabled_toolsets():
    """config.yaml's agent.disabled_toolsets and tools.disabled compose as
    a union — each removes its own entries."""
    config = {
        "agent": {"disabled_toolsets": ["memory"]},
        "mcp_servers": {"mcp_alpha": {}},
    }
    _write_tools_disabled("mcp_alpha\n")

    enabled = _get_platform_tools(config, "cli")
    assert "memory" not in enabled       # from config
    assert "mcp_alpha" not in enabled    # from tools.disabled
    assert "browser" in enabled


def test_empty_file_is_noop():
    config = {"mcp_servers": {"mcp_alpha": {}}}
    _write_tools_disabled("")
    assert _get_platform_tools(config, "cli") == _get_platform_tools(config, "cli")


def test_core_toolset_in_tools_disabled_stays_enabled(caplog):
    """browser + image_gen are core — listing them logs a warning and keeps
    them enabled, so an agent cannot trim its own base capabilities."""
    _write_tools_disabled("browser\nimage_gen\n")

    with caplog.at_level(logging.WARNING):
        enabled = _get_platform_tools({}, "cli")
    assert "browser" in enabled
    assert "image_gen" in enabled
    assert any("core toolset" in r.message for r in caplog.records)


def test_config_disabled_toolsets_not_core_protected():
    """Explicit user config has final say: agent.disabled_toolsets CAN
    disable a core toolset (no protection on the config path)."""
    config = {"agent": {"disabled_toolsets": ["browser"]}}
    assert "browser" not in _get_platform_tools(config, "cli")


def test_per_profile_isolation(monkeypatch, tmp_path):
    """Two homes with different tools.disabled files trim independently."""
    home_a = tmp_path / "profile_a"
    home_b = tmp_path / "profile_b"
    home_a.mkdir()
    home_b.mkdir()
    (home_a / "tools.disabled").write_text("mcp_alpha\n", encoding="utf-8")
    # home_b has no file.

    config = {"mcp_servers": {"mcp_alpha": {}, "mcp_beta": {}}}

    monkeypatch.setenv("HERMES_HOME", str(home_a))
    enabled_a = _get_platform_tools(config, "cli")
    assert "mcp_alpha" not in enabled_a
    assert "mcp_beta" in enabled_a

    monkeypatch.setenv("HERMES_HOME", str(home_b))
    enabled_b = _get_platform_tools(config, "cli")
    assert "mcp_alpha" in enabled_b
    assert "mcp_beta" in enabled_b


def test_unknown_names_do_not_break_resolution():
    _write_tools_disabled("nonexistent_toolset_xyz\n")
    enabled = _get_platform_tools({}, "cli")
    assert "terminal" in enabled
    assert "browser" in enabled


# ---------------------------------------------------------------------------
# config.yaml path: deep-merge incremental semantics
# ---------------------------------------------------------------------------


def test_deep_merge_preserves_user_disabled_toolsets():
    """DEFAULT_CONFIG ships agent.disabled_toolsets = []; a user list must
    survive the deep-merge (defaults never clobber user entries)."""
    from hermes_cli.config import DEFAULT_CONFIG, _deep_merge

    merged = _deep_merge(DEFAULT_CONFIG, {"agent": {"disabled_toolsets": ["memory"]}})
    assert merged["agent"]["disabled_toolsets"] == ["memory"]
    # Sibling agent defaults survive the merge.
    assert merged["agent"]["image_input_mode"] == DEFAULT_CONFIG["agent"]["image_input_mode"]


def test_load_config_end_to_end_disabled_toolsets():
    """A profile config.yaml with agent.disabled_toolsets flows through
    load_config() into _get_platform_tools."""
    from hermes_cli.config import load_config

    (get_hermes_home() / "config.yaml").write_text(
        "agent:\n  disabled_toolsets:\n    - memory\n",
        encoding="utf-8",
    )
    config = load_config()
    assert config["agent"]["disabled_toolsets"] == ["memory"]
    assert "memory" not in _get_platform_tools(config, "cli")
