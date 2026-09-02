"""Tests for external skill directories (skills.external_dirs config)."""

import json
import os
from unittest.mock import patch

import pytest


@pytest.fixture
def external_skills_dir(tmp_path):
    """Create a temp dir with a sample external skill."""
    ext_dir = tmp_path / "external-skills"
    skill_dir = ext_dir / "my-external-skill"
    skill_dir.mkdir(parents=True)
    (skill_dir / "SKILL.md").write_text(
        "---\nname: my-external-skill\ndescription: A skill from an external directory\n---\n\n# My External Skill\n\nDo external things.\n"
    )
    return ext_dir


@pytest.fixture
def hermes_home(tmp_path):
    """Create a minimal HERMES_HOME with config."""
    home = tmp_path / ".hermes"
    home.mkdir()
    (home / "skills").mkdir()
    return home


class TestGetExternalSkillsDirs:
    def test_empty_config(self, hermes_home):
        (hermes_home / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert result == []

    def test_nonexistent_dir_skipped(self, hermes_home):
        (hermes_home / "config.yaml").write_text(
            "skills:\n  external_dirs:\n    - /nonexistent/path\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert result == []

    def test_valid_dir_returned(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert len(result) == 1
        assert result[0] == external_skills_dir.resolve()

    def test_duplicate_dirs_deduplicated(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n    - {external_skills_dir}\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert len(result) == 1

    def test_local_skills_dir_excluded(self, hermes_home):
        local_skills = hermes_home / "skills"
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {local_skills}\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert result == []

    def test_no_config_file(self, hermes_home):
        # No config.yaml at all
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert result == []

    def test_string_value_converted_to_list(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs: {external_skills_dir}\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_external_skills_dirs
            result = get_external_skills_dirs()
        assert len(result) == 1


class TestGetAllSkillsDirs:
    def test_local_always_first(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}):
            from agent.skill_utils import get_all_skills_dirs
            result = get_all_skills_dirs()
        assert result[0] == hermes_home / "skills"
        assert result[1] == external_skills_dir.resolve()


class TestExternalSkillsInFindAll:
    def test_external_skills_found(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        local_skills = hermes_home / "skills"
        with (
            patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}),
            patch("tools.skills_tool.SKILLS_DIR", local_skills),
        ):
            from tools.skills_tool import _find_all_skills
            skills = _find_all_skills()
        names = [s["name"] for s in skills]
        assert "my-external-skill" in names

    def test_local_takes_precedence(self, hermes_home, external_skills_dir):
        """If the same skill name exists locally and externally, local wins."""
        local_skills = hermes_home / "skills"
        local_skill = local_skills / "my-external-skill"
        local_skill.mkdir(parents=True)
        (local_skill / "SKILL.md").write_text(
            "---\nname: my-external-skill\ndescription: Local version\n---\n\nLocal.\n"
        )
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        with (
            patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}),
            patch("tools.skills_tool.SKILLS_DIR", local_skills),
        ):
            from tools.skills_tool import _find_all_skills
            skills = _find_all_skills()
        matching = [s for s in skills if s["name"] == "my-external-skill"]
        assert len(matching) == 1
        assert matching[0]["description"] == "Local version"


class TestExternalSkillView:
    def test_skill_view_finds_external(self, hermes_home, external_skills_dir):
        (hermes_home / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        local_skills = hermes_home / "skills"
        with (
            patch.dict(os.environ, {"HERMES_HOME": str(hermes_home)}),
            patch("tools.skills_tool.SKILLS_DIR", local_skills),
        ):
            from tools.skills_tool import skill_view
            result = json.loads(skill_view("my-external-skill"))
        assert result["success"] is True
        assert "external things" in result["content"]


class TestSharedProfileSkillsPool:
    """Named profiles scan the default home's skills/ as a shared, by-reference
    pool: local first (local wins on name conflicts), shared second,
    external_dirs last. Default profile behavior is unchanged."""

    def _layout(self, tmp_path):
        home = tmp_path / ".hermes"
        prof = home / "profiles" / "writer"
        (home / "skills").mkdir(parents=True)
        (prof / "skills").mkdir(parents=True)
        (home / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        (prof / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        return home, prof

    def test_default_profile_has_no_shared_pool(self, tmp_path):
        home, _prof = self._layout(tmp_path)
        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            from agent.skill_utils import get_all_skills_dirs, get_shared_skills_dirs
            assert get_shared_skills_dirs() == []
            assert get_all_skills_dirs() == [home / "skills"]

    def test_named_profile_order_local_shared_external(self, tmp_path, external_skills_dir):
        home, prof = self._layout(tmp_path)
        (prof / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {external_skills_dir}\n"
        )
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            token = set_hermes_home_override(prof)
            try:
                from agent.skill_utils import (
                    get_all_skills_dirs,
                    get_shared_skills_dirs,
                    is_shared_skills_path,
                )
                assert get_shared_skills_dirs() == [(home / "skills").resolve()]
                dirs = [d.resolve() for d in get_all_skills_dirs()]
                assert dirs == [
                    (prof / "skills").resolve(),
                    (home / "skills").resolve(),
                    external_skills_dir.resolve(),
                ]
                assert is_shared_skills_path(home / "skills")
                assert not is_shared_skills_path(prof / "skills")
            finally:
                reset_hermes_home_override(token)

    def test_default_home_in_external_dirs_is_deduped(self, tmp_path):
        home, prof = self._layout(tmp_path)
        (prof / "config.yaml").write_text(
            f"skills:\n  external_dirs:\n    - {home / 'skills'}\n"
        )
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )
        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            token = set_hermes_home_override(prof)
            try:
                from agent.skill_utils import get_all_skills_dirs, get_external_skills_dirs
                # Auto-included as the shared pool — not scanned a second time
                # via the config declaration.
                assert get_external_skills_dirs() == []
                assert [d.resolve() for d in get_all_skills_dirs()] == [
                    (prof / "skills").resolve(),
                    (home / "skills").resolve(),
                ]
            finally:
                reset_hermes_home_override(token)

    def test_prompt_index_includes_shared_and_local_wins(self, tmp_path):
        home, prof = self._layout(tmp_path)
        for base, name, desc in (
            (home / "skills", "global-skill", "GLOBAL ONLY"),
            (home / "skills", "shared-name", "GLOBAL VER"),
            (prof / "skills", "local-skill", "LOCAL ONLY"),
            (prof / "skills", "shared-name", "LOCAL VER"),
        ):
            d = base / name
            d.mkdir(parents=True, exist_ok=True)
            (d / "SKILL.md").write_text(f"---\nname: {name}\ndescription: {desc}\n---\nbody\n")
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )
        from agent.prompt_builder import build_skills_system_prompt

        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            token = set_hermes_home_override(prof)
            try:
                idx = build_skills_system_prompt()
            finally:
                reset_hermes_home_override(token)
            # Named profile: global pool + local skills, local wins conflicts.
            assert "global-skill" in idx
            assert "local-skill" in idx
            assert "shared-name" in idx
            assert "LOCAL VER" in idx
            assert "GLOBAL VER" not in idx
            # Default home (override reset): no shared-pool leakage either way.
            idx_default = build_skills_system_prompt()
            assert "global-skill" in idx_default
            assert "local-skill" not in idx_default


class TestSkillsWhitelistIndex:
    """Whitelist-first skills index: when <home>/skills.whitelist exists, the
    index contains ONLY the listed names (resolved across local -> shared
    pool -> external dirs); absent file -> legacy disabled behavior."""

    def _layout(self, tmp_path):
        home = tmp_path / ".hermes"
        prof = home / "profiles" / "writer"
        (home / "skills").mkdir(parents=True)
        (prof / "skills").mkdir(parents=True)
        (home / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        (prof / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        return home, prof

    def _mk(self, base, name, desc=None, fm_name=None):
        d = base / "skills" / name
        d.mkdir(parents=True, exist_ok=True)
        (d / "SKILL.md").write_text(
            f"---\nname: {fm_name or name}\ndescription: {desc or name}\n---\nbody\n"
        )

    def _build_in_scope(self, home, prof):
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )
        from agent.prompt_builder import build_skills_system_prompt

        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            token = set_hermes_home_override(prof)
            try:
                return build_skills_system_prompt()
            finally:
                reset_hermes_home_override(token)

    def test_index_only_contains_whitelisted_names(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(home, "global-a")
        self._mk(home, "global-b")
        self._mk(prof, "local-a")
        self._mk(prof, "local-b")
        (prof / "skills.whitelist").write_text("# comment\n\nglobal-a\nlocal-a\n")

        idx = self._build_in_scope(home, prof)
        # Listed names resolve from BOTH the shared pool and the local dir.
        assert "global-a" in idx
        assert "local-a" in idx
        assert "global-b" not in idx
        assert "local-b" not in idx

    def test_new_global_skill_does_not_leak(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(home, "global-a")
        (prof / "skills.whitelist").write_text("global-a\n")
        assert "global-a" in self._build_in_scope(home, prof)
        # A skill added to the shared pool afterwards stays out of the
        # whitelisted profile's index (the blacklist-mode leak this fixes).
        self._mk(home, "global-new")
        idx = self._build_in_scope(home, prof)
        assert "global-new" not in idx
        assert "global-a" in idx

    def test_dir_name_matches_frontmatter_alias(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(prof, "dir-name", fm_name="fancy-name")
        (prof / "skills.whitelist").write_text("dir-name\n")
        idx = self._build_in_scope(home, prof)
        assert "fancy-name" in idx

    def test_whitelisted_skill_in_disabled_still_shows(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(prof, "local-a")
        self._mk(prof, "local-b")
        (prof / "config.yaml").write_text(
            "skills:\n  external_dirs: []\n  disabled:\n    - local-a\n"
        )
        (prof / "skills.whitelist").write_text("local-a\n")
        idx = self._build_in_scope(home, prof)
        # The whitelist is authoritative — membership wins over disabled.
        assert "local-a" in idx
        assert "local-b" not in idx

    def test_whitelist_edit_invalidates_cache(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(prof, "local-a")
        self._mk(prof, "local-b")
        (prof / "skills.whitelist").write_text("local-a\n")
        idx1 = self._build_in_scope(home, prof)
        assert "local-b" not in idx1
        (prof / "skills.whitelist").write_text("local-a\nlocal-b\n")
        idx2 = self._build_in_scope(home, prof)
        assert "local-b" in idx2

    def test_absent_whitelist_keeps_disabled_behavior(self, tmp_path):
        home, prof = self._layout(tmp_path)
        self._mk(prof, "local-a")
        self._mk(prof, "local-b")
        (prof / "config.yaml").write_text(
            "skills:\n  external_dirs: []\n  disabled:\n    - local-b\n"
        )
        idx = self._build_in_scope(home, prof)
        assert "local-a" in idx
        assert "local-b" not in idx


class TestWhitelistLibraryPromotion:
    """Whitelist mode promotes LISTED library_dirs skills into the index.

    Blacklist mode keeps library dirs fully hidden (unchanged). Promotion
    goes through the same _index_allowed membership check as every other
    dir, and scan order keeps local > shared > external > library.
    """

    def _layout(self, tmp_path):
        home = tmp_path / ".hermes"
        prof = home / "profiles" / "writer"
        (home / "skills").mkdir(parents=True)
        (prof / "skills").mkdir(parents=True)
        (home / "config.yaml").write_text("skills:\n  external_dirs: []\n")
        lib = tmp_path / "library"
        lib.mkdir()
        (prof / "config.yaml").write_text(
            f"skills:\n  pools:\n    library_dirs:\n      - {lib}\n"
        )
        return home, prof, lib

    def _mk_lib(self, lib, name, desc):
        d = lib / name
        d.mkdir(parents=True, exist_ok=True)
        (d / "SKILL.md").write_text(f"---\nname: {name}\ndescription: {desc}\n---\nbody\n")

    def _mk_local(self, prof, name, desc):
        d = prof / "skills" / name
        d.mkdir(parents=True, exist_ok=True)
        (d / "SKILL.md").write_text(f"---\nname: {name}\ndescription: {desc}\n---\nbody\n")

    def _build_in_scope(self, home, prof):
        from hermes_constants import (
            reset_hermes_home_override,
            set_hermes_home_override,
        )
        from agent.prompt_builder import build_skills_system_prompt

        with patch.dict(os.environ, {"HERMES_HOME": str(home)}):
            token = set_hermes_home_override(prof)
            try:
                return build_skills_system_prompt()
            finally:
                reset_hermes_home_override(token)

    def test_whitelisted_library_skill_promoted_unlisted_stays_hidden(self, tmp_path):
        home, prof, lib = self._layout(tmp_path)
        self._mk_lib(lib, "arxiv", "ARXIV LIB")
        self._mk_lib(lib, "other-lib", "OTHER LIB")
        (prof / "skills.whitelist").write_text("arxiv\n")

        idx = self._build_in_scope(home, prof)
        assert "arxiv" in idx
        assert "other-lib" not in idx

    def test_blacklist_mode_library_fully_hidden(self, tmp_path):
        home, prof, lib = self._layout(tmp_path)
        self._mk_lib(lib, "arxiv", "ARXIV LIB")

        idx = self._build_in_scope(home, prof)
        assert "arxiv" not in idx

    def test_local_wins_over_promoted_library_skill(self, tmp_path):
        home, prof, lib = self._layout(tmp_path)
        self._mk_lib(lib, "arxiv", "LIB VERSION")
        self._mk_local(prof, "arxiv", "LOCAL VERSION")
        (prof / "skills.whitelist").write_text("arxiv\n")

        idx = self._build_in_scope(home, prof)
        assert "LOCAL VERSION" in idx
        assert "LIB VERSION" not in idx

    def test_shared_pool_wins_over_promoted_library_skill(self, tmp_path):
        home, prof, lib = self._layout(tmp_path)
        self._mk_lib(lib, "arxiv", "LIB VERSION")
        shared = home / "skills" / "arxiv"
        shared.mkdir()
        (shared / "SKILL.md").write_text(
            "---\nname: arxiv\ndescription: SHARED VERSION\n---\nbody\n"
        )
        (prof / "skills.whitelist").write_text("arxiv\n")

        idx = self._build_in_scope(home, prof)
        assert "SHARED VERSION" in idx
        assert "LIB VERSION" not in idx
