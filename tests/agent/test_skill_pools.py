"""Tests for declarative skill pools (skills.pools in config.yaml).

Covers the B1 core behavior: library_dirs merge into the external-dirs scan
and library skills being hidden from the prompt index while remaining
explicit-loadable via skill_view().
"""

import json

from agent import skill_utils
from agent.skill_utils import (
    get_all_skills_dirs,
    get_external_skills_dirs,
    get_library_skills_dirs,
)


def _write_skill(root, name, description="A test skill."):
    skill_dir = root / name
    skill_dir.mkdir(parents=True, exist_ok=True)
    (skill_dir / "SKILL.md").write_text(
        f"---\nname: {name}\ndescription: {description}\n---\n",
        encoding="utf-8",
    )
    return skill_dir


def _setup_home(tmp_path, monkeypatch, config_text):
    hermes_home = tmp_path / ".hermes"
    (hermes_home / "skills").mkdir(parents=True)
    (hermes_home / "config.yaml").write_text(config_text, encoding="utf-8")
    monkeypatch.setenv("HERMES_HOME", str(hermes_home))
    skill_utils._external_dirs_cache_clear()
    return hermes_home


class TestLibraryDirsConfig:
    def test_absent_pools_is_zero_behavior_change(self, tmp_path, monkeypatch):
        external = tmp_path / "external-skills"
        external.mkdir()
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  external_dirs:\n    - {external}\n",
        )
        assert get_external_skills_dirs() == [external.resolve()]
        assert get_library_skills_dirs() == []

    def test_library_dirs_merge_into_external_dirs(self, tmp_path, monkeypatch):
        external = tmp_path / "external-skills"
        external.mkdir()
        library = tmp_path / "big-library"
        library.mkdir()
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n"
            f"  external_dirs:\n    - {external}\n"
            f"  pools:\n    library_dirs:\n      - {library}\n",
        )
        assert get_library_skills_dirs() == [library.resolve()]
        assert get_external_skills_dirs() == [external.resolve(), library.resolve()]
        # get_all_skills_dirs: local first, then merged external + library.
        all_dirs = get_all_skills_dirs()
        assert all_dirs[0] == (tmp_path / ".hermes" / "skills")
        assert all_dirs[1:] == [external.resolve(), library.resolve()]

    def test_duplicate_dir_in_both_lists_appears_once(self, tmp_path, monkeypatch):
        shared = tmp_path / "shared"
        shared.mkdir()
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n"
            f"  external_dirs:\n    - {shared}\n"
            f"  pools:\n    library_dirs:\n      - {shared}\n",
        )
        assert get_external_skills_dirs() == [shared.resolve()]
        assert get_library_skills_dirs() == [shared.resolve()]

    def test_missing_library_dir_skipped_by_default(self, tmp_path, monkeypatch):
        missing = tmp_path / "does-not-exist"
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  pools:\n    library_dirs:\n      - {missing}\n",
        )
        assert get_library_skills_dirs() == []
        assert get_external_skills_dirs() == []
        # ... but check/apply flows can see the declared path.
        assert get_library_skills_dirs(existing_only=False) == [missing.resolve()]

    def test_scalar_library_dirs_value(self, tmp_path, monkeypatch):
        library = tmp_path / "big-library"
        library.mkdir()
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  pools:\n    library_dirs: {library}\n",
        )
        assert get_library_skills_dirs() == [library.resolve()]


class TestLibrarySkillsIndexHiding:
    def test_library_skill_hidden_from_index_but_local_visible(
        self, tmp_path, monkeypatch
    ):
        from agent.prompt_builder import build_skills_system_prompt

        library = tmp_path / "big-library"
        library.mkdir()
        hermes_home = _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  pools:\n    library_dirs:\n      - {library}\n",
        )
        _write_skill(hermes_home / "skills", "local-skill")
        _write_skill(library, "library-skill")

        result = build_skills_system_prompt()

        assert "local-skill" in result
        assert "library-skill" not in result

    def test_library_skill_still_explicit_loadable(self, tmp_path, monkeypatch):
        from tools.skills_tool import skill_view

        library = tmp_path / "big-library"
        library.mkdir()
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  pools:\n    library_dirs:\n      - {library}\n",
        )
        _write_skill(library, "library-skill", description="Library only.")

        # skill_view resolves by scanning the skill dirs directly and does
        # not consult any index/disabled filter — library skills load.
        result = json.loads(skill_view("library-skill", preprocess=False))

        assert result["success"] is True
        assert result["name"] == "library-skill"
