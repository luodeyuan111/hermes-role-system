"""Tests for hermes_cli/skills_pool.py — declarative skill pool management."""
import yaml


def _write_skill(root, name):
    skill_dir = root / name
    skill_dir.mkdir(parents=True, exist_ok=True)
    (skill_dir / "SKILL.md").write_text(
        f"---\nname: {name}\ndescription: A test skill.\n---\n",
        encoding="utf-8",
    )
    return skill_dir


def _setup_home(tmp_path, monkeypatch, config_text, local_skills=()):
    """Tmp HERMES_HOME with config.yaml + local skills; returns home."""
    from agent import skill_utils

    hermes_home = tmp_path / ".hermes"
    skills_dir = hermes_home / "skills"
    skills_dir.mkdir(parents=True)
    for name in local_skills:
        _write_skill(skills_dir, name)
    (hermes_home / "config.yaml").write_text(config_text, encoding="utf-8")
    monkeypatch.setenv("HERMES_HOME", str(hermes_home))
    skill_utils._external_dirs_cache_clear()
    return hermes_home


# ---------------------------------------------------------------------------
# get_pool_config
# ---------------------------------------------------------------------------

class TestGetPoolConfig:
    def test_empty_config(self):
        from hermes_cli.skills_pool import get_pool_config
        assert get_pool_config({}) == (set(), [])

    def test_null_skills_section(self):
        from hermes_cli.skills_pool import get_pool_config
        assert get_pool_config({"skills": None}) == (set(), [])

    def test_missing_pools_key(self):
        from hermes_cli.skills_pool import get_pool_config
        assert get_pool_config({"skills": {"disabled": ["a"]}}) == (set(), [])

    def test_reads_common_and_library_dirs(self):
        from hermes_cli.skills_pool import get_pool_config
        config = {"skills": {"pools": {
            "common": ["skill-a", "skill-b"],
            "library_dirs": ["/abs/lib", "~/lib2"],
        }}}
        common, library_dirs = get_pool_config(config)
        assert common == {"skill-a", "skill-b"}
        assert library_dirs == ["/abs/lib", "~/lib2"]

    def test_scalar_common_is_single_skill(self):
        from hermes_cli.skills_pool import get_pool_config
        common, _ = get_pool_config({"skills": {"pools": {"common": "my-skill"}}})
        assert common == {"my-skill"}

    def test_scalar_library_dir(self):
        from hermes_cli.skills_pool import get_pool_config
        _, library_dirs = get_pool_config(
            {"skills": {"pools": {"library_dirs": "/abs/lib"}}}
        )
        assert library_dirs == ["/abs/lib"]


# ---------------------------------------------------------------------------
# _compute_disabled_sync
# ---------------------------------------------------------------------------

class TestComputeDisabledSync:
    def test_disables_local_not_in_common(self):
        from hermes_cli.skills_pool import _compute_disabled_sync
        result = _compute_disabled_sync({"a", "b", "c"}, {"a"}, set())
        assert result == {"b", "c"}

    def test_enables_common_previously_disabled(self):
        from hermes_cli.skills_pool import _compute_disabled_sync
        result = _compute_disabled_sync({"a", "b"}, {"a"}, {"a"})
        assert result == {"b"}

    def test_preserves_non_local_disabled_entries(self):
        """Library/stale disabled entries apply doesn't own stay untouched."""
        from hermes_cli.skills_pool import _compute_disabled_sync
        result = _compute_disabled_sync({"a"}, {"a"}, {"stale-skill", "lib-skill"})
        assert result == {"stale-skill", "lib-skill"}


# ---------------------------------------------------------------------------
# pool check
# ---------------------------------------------------------------------------

class TestPoolCheck:
    def test_ok_when_declaration_matches_disk(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_check

        library = tmp_path / "big-library"
        library.mkdir()
        _write_skill(library, "lib-skill")
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n"
            f"  disabled: [beta]\n"
            f"  pools:\n"
            f"    common: [alpha]\n"
            f"    library_dirs:\n      - {library}\n",
            local_skills=("alpha", "beta"),
        )
        config = {"skills": {
            "disabled": ["beta"],
            "pools": {"common": ["alpha"], "library_dirs": [str(library)]},
        }}
        assert _pool_check(config) == 0
        assert "OK" in capsys.readouterr().out

    def test_unclassified_local_skill_fails(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_check

        _setup_home(
            tmp_path, monkeypatch,
            "skills:\n  pools:\n    common: [alpha]\n",
            local_skills=("alpha", "stray"),
        )
        config = {"skills": {"pools": {"common": ["alpha"]}}}
        assert _pool_check(config) == 1
        assert "stray" in capsys.readouterr().out

    def test_missing_library_dir_fails(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_check

        missing = tmp_path / "nope"
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n  pools:\n    library_dirs:\n      - {missing}\n",
        )
        config = {"skills": {"pools": {"library_dirs": [str(missing)]}}}
        assert _pool_check(config) == 1
        assert "does not exist" in capsys.readouterr().out

    def test_ghost_common_entry_fails(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_check

        _setup_home(
            tmp_path, monkeypatch,
            "skills:\n  pools:\n    common: [ghost]\n",
        )
        config = {"skills": {"pools": {"common": ["ghost"]}}}
        assert _pool_check(config) == 1
        assert "ghost" in capsys.readouterr().out


# ---------------------------------------------------------------------------
# pool apply
# ---------------------------------------------------------------------------

class TestPoolApply:
    def test_apply_syncs_disabled_with_backup(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_apply

        hermes_home = _setup_home(
            tmp_path, monkeypatch,
            "skills:\n"
            "  disabled: [gamma, stale-skill]\n"
            "  pools:\n"
            "    common: [alpha]\n",
            local_skills=("alpha", "beta", "gamma"),
        )
        config = {"skills": {
            "disabled": ["gamma", "stale-skill"],
            "pools": {"common": ["alpha"]},
        }}

        assert _pool_apply(config) == 0

        # config.yaml on disk re-parses and carries the synced list:
        # beta+gamma newly disabled, stale-skill preserved, alpha enabled.
        written = yaml.safe_load(
            (hermes_home / "config.yaml").read_text(encoding="utf-8")
        )
        assert written["skills"]["disabled"] == ["beta", "gamma", "stale-skill"]
        # pools declaration survives the save.
        assert written["skills"]["pools"]["common"] == ["alpha"]

        # Timestamped backup of the pre-apply config exists.
        backups = list(hermes_home.glob("config.yaml.bak.*"))
        assert len(backups) == 1
        assert "stale-skill" in backups[0].read_text(encoding="utf-8")

        out = capsys.readouterr().out
        assert "newly disabled" in out and "beta" in out

    def test_apply_enables_common_skill(self, tmp_path, monkeypatch):
        from hermes_cli.skills_pool import _pool_apply

        hermes_home = _setup_home(
            tmp_path, monkeypatch,
            "skills:\n"
            "  disabled: [alpha]\n"
            "  pools:\n"
            "    common: [alpha]\n",
            local_skills=("alpha",),
        )
        config = {"skills": {
            "disabled": ["alpha"],
            "pools": {"common": ["alpha"]},
        }}
        assert _pool_apply(config) == 0
        written = yaml.safe_load(
            (hermes_home / "config.yaml").read_text(encoding="utf-8")
        )
        assert written["skills"].get("disabled") in (None, [])

    def test_apply_is_idempotent(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_apply

        _setup_home(
            tmp_path, monkeypatch,
            "skills:\n  pools:\n    common: [alpha]\n",
            local_skills=("alpha", "beta"),
        )
        config = {"skills": {"pools": {"common": ["alpha"]}}}
        assert _pool_apply(config) == 0
        assert _pool_apply(config) == 0
        assert "already in sync" in capsys.readouterr().out

    def test_apply_warns_on_ghost_common_but_succeeds(
        self, tmp_path, monkeypatch, capsys
    ):
        from hermes_cli.skills_pool import _pool_apply

        _setup_home(
            tmp_path, monkeypatch,
            "skills:\n  pools:\n    common: [alpha, ghost]\n",
            local_skills=("alpha",),
        )
        config = {"skills": {"pools": {"common": ["alpha", "ghost"]}}}
        assert _pool_apply(config) == 0
        assert "ghost" in capsys.readouterr().err


# ---------------------------------------------------------------------------
# pool show
# ---------------------------------------------------------------------------

class TestPoolShow:
    def test_show_prints_all_tiers(self, tmp_path, monkeypatch, capsys):
        from hermes_cli.skills_pool import _pool_show

        library = tmp_path / "big-library"
        library.mkdir()
        _write_skill(library, "lib-skill")
        _setup_home(
            tmp_path, monkeypatch,
            f"skills:\n"
            f"  disabled: [beta]\n"
            f"  pools:\n"
            f"    common: [alpha]\n"
            f"    library_dirs:\n      - {library}\n",
            local_skills=("alpha", "beta", "stray"),
        )
        config = {"skills": {
            "disabled": ["beta"],
            "pools": {"common": ["alpha"], "library_dirs": [str(library)]},
        }}
        assert _pool_show(config) == 0
        out = capsys.readouterr().out
        assert "Common pool" in out and "alpha" in out
        assert "Library pool" in out and "lib-skill" in out
        assert "Role pools" in out
        assert "Unclassified" in out and "stray" in out
        # disabled skills are classified, not unclassified
        assert "\n  beta\n" not in out
