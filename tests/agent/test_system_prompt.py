"""Tests for agent/system_prompt.py — context-file cwd wiring."""

from types import SimpleNamespace
from unittest.mock import patch

from agent.system_prompt import build_system_prompt_parts


def _make_agent(**overrides):
    base = dict(
        load_soul_identity=False,
        skip_context_files=False,
        valid_tool_names=[],
        _task_completion_guidance=False,
        _tool_use_enforcement=False,
        _environment_probe=False,
        _kanban_worker_guidance="",
        _memory_store=None,
        _memory_manager=None,
        model="",
        provider="",
        platform="",
        pass_session_id=False,
        session_id="",
    )
    base.update(overrides)
    return SimpleNamespace(**base)


def _captured_context_cwd(agent):
    """The cwd build_system_prompt_parts hands to build_context_files_prompt."""
    captured = {}

    def fake_context_files(cwd=None, skip_soul=False, context_length=None):
        captured["cwd"] = cwd
        return ""

    with (
        patch("run_agent.load_soul_md", return_value=""),
        patch("run_agent.build_nous_subscription_prompt", return_value=""),
        patch("run_agent.build_environment_hints", return_value=""),
        patch("run_agent.build_context_files_prompt", side_effect=fake_context_files),
    ):
        build_system_prompt_parts(agent)
    return captured["cwd"]


class TestContextFileCwd:
    def test_none_when_terminal_cwd_unset(self, monkeypatch):
        # Unset → None, so discovery falls back to the launch dir inside
        # build_context_files_prompt (the local-CLI #19242 contract).
        monkeypatch.delenv("TERMINAL_CWD", raising=False)
        assert _captured_context_cwd(_make_agent()) is None

    def test_configured_dir_when_terminal_cwd_set(self, monkeypatch, tmp_path):
        monkeypatch.setenv("TERMINAL_CWD", str(tmp_path))
        assert _captured_context_cwd(_make_agent()) == tmp_path


def _stable_prompt(agent):
    with (
        patch("run_agent.load_soul_md", return_value=""),
        patch("run_agent.build_nous_subscription_prompt", return_value=""),
        patch("run_agent.build_environment_hints", return_value=""),
        patch("run_agent.build_context_files_prompt", return_value=""),
    ):
        return build_system_prompt_parts(agent)["stable"]


def _init_code_repo(path):
    """A git repo that actually holds code — the coding posture requires a source
    file (or manifest), not a bare ``.git`` (a prose/notes repo stays general)."""
    import subprocess

    subprocess.run(["git", "-C", str(path), "init", "-q"], check=True)
    (path / "main.py").write_text("print('hi')\n")


class TestCodingContextBlock:
    def test_injected_when_active(self, monkeypatch, tmp_path):
        _init_code_repo(tmp_path)
        monkeypatch.setenv("TERMINAL_CWD", str(tmp_path))
        agent = _make_agent(valid_tool_names=["read_file"], platform="cli")
        stable = _stable_prompt(agent)
        assert "coding agent" in stable
        assert "Workspace" in stable

    def test_absent_when_off(self, monkeypatch, tmp_path):
        _init_code_repo(tmp_path)
        monkeypatch.setenv("TERMINAL_CWD", str(tmp_path))
        agent = _make_agent(valid_tool_names=["read_file"], platform="cli")
        # Drive the real path: force the resolved mode to "off" via config.
        with patch("agent.coding_context._coding_mode", return_value="off"):
            stable = _stable_prompt(agent)
        assert "coding agent" not in stable

    def test_absent_without_tools(self, monkeypatch, tmp_path):
        _init_code_repo(tmp_path)
        monkeypatch.setenv("TERMINAL_CWD", str(tmp_path))
        agent = _make_agent(valid_tool_names=[], platform="cli")
        assert "coding agent" not in _stable_prompt(agent)


class TestTelegramRichMessagesHint:
    """Verify that TELEGRAM_RICH_MESSAGES_HINT is conditionally included."""

    def test_base_hint_without_rich_messages(self, monkeypatch):
        """When rich_messages is False (default), only the base hint is used."""
        agent = _make_agent(platform="telegram")
        # Mock config to return rich_messages: false (default)
        with patch("hermes_cli.config.load_config_readonly") as mock_cfg:
            mock_cfg.return_value = {
                "platforms": {"telegram": {"extra": {"rich_messages": False}}}
            }
            stable = _stable_prompt(agent)
        # Base hint should be present
        assert "Standard Markdown is automatically converted" in stable
        # Rich-messages extension should NOT be present
        assert "lean into it" not in stable
        assert "task lists" not in stable

    def test_rich_hint_with_rich_messages_enabled(self, monkeypatch):
        """When rich_messages is True, the rich-messages extension is appended."""
        agent = _make_agent(platform="telegram")
        with patch("hermes_cli.config.load_config_readonly") as mock_cfg:
            mock_cfg.return_value = {
                "platforms": {"telegram": {"extra": {"rich_messages": True}}}
            }
            stable = _stable_prompt(agent)
        # Base hint should be present
        assert "Standard Markdown is automatically converted" in stable
        # Rich-messages extension should be present
        assert "lean into it" in stable
        assert "task lists" in stable
        assert "math/formulas" in stable

    def test_base_hint_without_config(self, monkeypatch):
        """When config has no telegram section, only base hint is used."""
        agent = _make_agent(platform="telegram")
        with patch("hermes_cli.config.load_config_readonly") as mock_cfg:
            mock_cfg.return_value = {}
            stable = _stable_prompt(agent)
        assert "Standard Markdown is automatically converted" in stable
        assert "lean into it" not in stable


class TestRoleLayerInjection:
    """ROLE.md in the active profile's home dir is injected into the stable tier."""

    def _stable_with_profile_home(self, agent, profile_home, profile_name="default"):
        with (
            patch(
                "agent.file_safety._resolve_active_profile_name",
                return_value=profile_name,
            ),
            patch("hermes_cli.profiles.get_profile_dir", return_value=profile_home),
        ):
            return _stable_prompt(agent)

    def test_role_block_injected_when_role_md_present(self, tmp_path):
        (tmp_path / "ROLE.md").write_text("You are a security reviewer.\n")
        agent = _make_agent()
        stable = self._stable_with_profile_home(agent, tmp_path)
        assert "ROLE.md" in stable
        assert "You are a security reviewer." in stable

    def test_role_block_for_named_profile(self, tmp_path):
        (tmp_path / "ROLE.md").write_text("You are a release engineer.\n")
        agent = _make_agent()
        stable = self._stable_with_profile_home(agent, tmp_path, profile_name="work")
        assert "You are a release engineer." in stable

    def test_absent_role_md_leaves_prompt_unchanged(self, tmp_path):
        agent = _make_agent()
        without_role = self._stable_with_profile_home(agent, tmp_path)
        assert "ROLE.md" not in without_role
        (tmp_path / "ROLE.md").write_text("You are a security reviewer.\n")
        with_role = self._stable_with_profile_home(agent, tmp_path)
        assert with_role != without_role
        assert without_role in with_role

    def test_empty_role_md_adds_nothing(self, tmp_path):
        (tmp_path / "ROLE.md").write_text("   \n")
        agent = _make_agent()
        stable = self._stable_with_profile_home(agent, tmp_path)
        assert "ROLE.md" not in stable


class TestRootSoulPriority:
    """Named profiles share the ROOT SOUL.md as the universal identity base.

    Resolution chain for a named profile: root ~/.hermes/SOUL.md first, the
    profile's own seeded SOUL.md copy only when the root has none, then
    DEFAULT_AGENT_IDENTITY.  Default profile behavior is unchanged.
    """

    def _stable(self, agent, *, profile_name, profile_home, root_home):
        def _profile_dir(name):
            return root_home if name == "default" else profile_home

        with (
            # Real load_soul_md, but hermes home resolution redirected to the
            # temp profile home, and ensure_hermes_home neutralized so the
            # live ~/.hermes is never touched.
            patch("agent.prompt_builder.get_hermes_home", return_value=profile_home),
            patch("hermes_cli.config.ensure_hermes_home", lambda: None),
            patch(
                "agent.file_safety._resolve_active_profile_name",
                return_value=profile_name,
            ),
            patch("hermes_cli.profiles.get_profile_dir", side_effect=_profile_dir),
            patch("run_agent.build_nous_subscription_prompt", return_value=""),
            patch("run_agent.build_environment_hints", return_value=""),
            patch("run_agent.build_context_files_prompt", return_value=""),
        ):
            return build_system_prompt_parts(agent)["stable"]

    def test_named_profile_prefers_root_soul(self, tmp_path):
        root = tmp_path / "root"
        prof = tmp_path / "prof"
        root.mkdir()
        prof.mkdir()
        (root / "SOUL.md").write_text("ROOT UNIVERSAL SOUL\n")
        (prof / "SOUL.md").write_text("PROFILE COPY SOUL\n")
        stable = self._stable(
            _make_agent(), profile_name="work", profile_home=prof, root_home=root
        )
        assert "ROOT UNIVERSAL SOUL" in stable
        assert "PROFILE COPY SOUL" not in stable

    def test_named_profile_falls_back_to_own_soul(self, tmp_path):
        root = tmp_path / "root"
        prof = tmp_path / "prof"
        root.mkdir()
        prof.mkdir()
        (prof / "SOUL.md").write_text("PROFILE COPY SOUL\n")
        stable = self._stable(
            _make_agent(), profile_name="work", profile_home=prof, root_home=root
        )
        assert "PROFILE COPY SOUL" in stable

    def test_named_profile_without_any_soul_gets_default_identity(self, tmp_path):
        root = tmp_path / "root"
        prof = tmp_path / "prof"
        root.mkdir()
        prof.mkdir()
        stable = self._stable(
            _make_agent(), profile_name="work", profile_home=prof, root_home=root
        )
        assert "ROOT UNIVERSAL SOUL" not in stable
        assert "PROFILE COPY SOUL" not in stable
        # Hardcoded identity fallback still fires.
        assert "Hermes" in stable

    def test_default_profile_reads_own_home(self, tmp_path):
        root = tmp_path / "root"
        root.mkdir()
        (root / "SOUL.md").write_text("ROOT UNIVERSAL SOUL\n")
        stable = self._stable(
            _make_agent(), profile_name="default", profile_home=root, root_home=root
        )
        assert "ROOT UNIVERSAL SOUL" in stable

    def test_root_soul_precedes_role_block(self, tmp_path):
        root = tmp_path / "root"
        prof = tmp_path / "prof"
        root.mkdir()
        prof.mkdir()
        (root / "SOUL.md").write_text("ROOT UNIVERSAL SOUL\n")
        (prof / "ROLE.md").write_text("You are a release engineer.\n")
        stable = self._stable(
            _make_agent(), profile_name="work", profile_home=prof, root_home=root
        )
        assert "ROOT UNIVERSAL SOUL" in stable
        assert "You are a release engineer." in stable
        # Universal base first, role layer stacked after it.
        assert stable.index("ROOT UNIVERSAL SOUL") < stable.index(
            "You are a release engineer."
        )


class TestProfileScopeOverride:
    """In-process profile scoping (dashboard/tui_gateway path).

    With env HERMES_HOME at the default root and a ContextVar override
    pointing at a named profile — exactly what ``set_hermes_home_override``
    installs per agent build/turn — the whole prompt build must resolve
    against the profile: the ROLE.md layer, the shared root SOUL base, and
    the profile's own skills index.  Without the override, launch-home
    behavior is unchanged.  Uses the REAL resolvers (no patching of
    _resolve_active_profile_name / get_profile_dir / skills dirs).
    """

    def _layout(self, tmp_path):
        root = tmp_path / "root"
        prof = root / "profiles" / "writer"
        (root / "skills" / "root-skill-0").mkdir(parents=True)
        (prof / "skills" / "prof-skill-0").mkdir(parents=True)
        (root / "SOUL.md").write_text("ROOT UNIVERSAL SOUL\n")
        (prof / "SOUL.md").write_text("PROFILE COPY SOUL\n")
        (prof / "ROLE.md").write_text("ROLE LAYER MARKER\n")
        (root / "skills" / "root-skill-0" / "SKILL.md").write_text(
            "---\nname: root-skill-0\ndescription: root\n---\nbody\n"
        )
        (prof / "skills" / "prof-skill-0" / "SKILL.md").write_text(
            "---\nname: prof-skill-0\ndescription: prof\n---\nbody\n"
        )
        return root, prof

    def _stable(self, agent):
        # Real load_soul_md / build_skills_system_prompt / resolvers — only
        # the unrelated prompt builders and the live-home guard are stubbed.
        with (
            patch("run_agent.build_nous_subscription_prompt", return_value=""),
            patch("run_agent.build_environment_hints", return_value=""),
            patch("run_agent.build_context_files_prompt", return_value=""),
            patch("hermes_cli.config.ensure_hermes_home", lambda: None),
        ):
            return build_system_prompt_parts(agent)["stable"]

    def test_override_scopes_whole_prompt_build(self, monkeypatch, tmp_path):
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )

        root, prof = self._layout(tmp_path)
        monkeypatch.setenv("HERMES_HOME", str(root))
        agent = _make_agent(valid_tool_names=["skills_list"])
        token = set_hermes_home_override(str(prof))
        try:
            stable = self._stable(agent)
        finally:
            reset_hermes_home_override(token)
        # ROLE.md layer from the profile, stacked after the shared base.
        assert "ROLE LAYER MARKER" in stable
        # Universal identity base from the ROOT, not the profile's seeded copy.
        assert "ROOT UNIVERSAL SOUL" in stable
        assert "PROFILE COPY SOUL" not in stable
        assert stable.index("ROOT UNIVERSAL SOUL") < stable.index(
            "ROLE LAYER MARKER"
        )
        # Skills index: profile's own skills plus the shared default-home
        # pool (by reference — profiles no longer carry private copies).
        assert "prof-skill-0" in stable
        assert "root-skill-0" in stable
        # Profile hint names the active profile.
        assert "Active Hermes profile: writer" in stable

    def test_no_override_keeps_launch_home_behavior(self, monkeypatch, tmp_path):
        root, prof = self._layout(tmp_path)
        monkeypatch.setenv("HERMES_HOME", str(root))
        agent = _make_agent(valid_tool_names=["skills_list"])
        stable = self._stable(agent)
        assert "ROLE LAYER MARKER" not in stable
        assert "ROOT UNIVERSAL SOUL" in stable
        assert "root-skill-0" in stable
        assert "prof-skill-0" not in stable
        assert "Active Hermes profile: default" in stable
