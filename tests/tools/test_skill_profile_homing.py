"""R3.1 acceptance tests: role skills home to the role's own profile directory.

Verifies the per-profile skill resolution contract that the role-asset
governance rules rely on (requirements-v1 方向三):

  * ``skill_manage create`` under a named profile lands in
    ``profiles/<name>/skills/`` — never in the shared default pool.
  * A same-named local create overrides a shared-pool skill (local wins).
  * Shared-pool skills stay visible (read intact) but refuse mutation from
    a named profile (read-only by reference).
"""

import importlib
import json
import os
import shutil
import tempfile

import pytest


@pytest.fixture
def profile_env(monkeypatch):
    d = tempfile.mkdtemp(prefix="hermes_homing_test_")
    root = os.path.join(d, ".hermes")
    shared = os.path.join(root, "skills")
    profile_home = os.path.join(root, "profiles", "coder")
    os.makedirs(shared)
    os.makedirs(profile_home)
    monkeypatch.setenv("HERMES_HOME", profile_home)
    yield root, shared, profile_home
    shutil.rmtree(d, ignore_errors=True)


def _fresh_smt():
    import tools.skill_manager_tool as smt
    importlib.reload(smt)
    return smt


_SKILL = (
    "---\nname: %s\ndescription: test skill\nversion: 1.0.0\n---\n"
    "# %s\nbody\n"
)


def _write_shared_skill(shared, name, description="shared pool copy"):
    skill_dir = os.path.join(shared, "software-development", name)
    os.makedirs(skill_dir, exist_ok=True)
    with open(os.path.join(skill_dir, "SKILL.md"), "w", encoding="utf-8") as f:
        f.write(
            f"---\nname: {name}\ndescription: {description}\n---\n\n# {name}\n"
        )
    return skill_dir


def test_create_under_named_profile_lands_local(profile_env):
    """R3.1 core: new role skills must NOT land in the shared pool root."""
    _root, shared, profile_home = profile_env
    smt = _fresh_smt()
    r = json.loads(smt.skill_manage("create", "role-skill", content=_SKILL % ("role-skill", "role-skill")))
    assert r["success"] is True, r
    assert os.path.isfile(
        os.path.join(profile_home, "skills", "role-skill", "SKILL.md")
    )
    # Nothing leaked into the shared default pool.
    assert not os.path.isfile(
        os.path.join(shared, "role-skill", "SKILL.md")
    )
    for category in os.listdir(shared):
        assert not os.path.isdir(os.path.join(shared, category, "role-skill"))


def test_same_name_local_create_overrides_shared(profile_env):
    """A shared-pool skill does not block a same-named local create; the
    local copy wins resolution (the override mechanism role assets use)."""
    _root, shared, profile_home = profile_env
    _write_shared_skill(shared, "dup-skill")
    smt = _fresh_smt()
    r = json.loads(smt.skill_manage("create", "dup-skill", content=_SKILL % ("dup-skill", "dup-skill")))
    assert r["success"] is True, r
    found = smt._find_skill("dup-skill")
    assert found is not None
    assert str(found["path"]).startswith(profile_home), found


def test_shared_pool_visible_but_read_only(profile_env):
    """R1.1 + R3 boundary: shared skills resolve from a named profile
    (read intact), but mutating them is refused."""
    _root, shared, _profile_home = profile_env
    _write_shared_skill(shared, "global-skill")
    smt = _fresh_smt()
    found = smt._find_skill("global-skill")
    assert found is not None
    assert str(found["path"]).startswith(shared), found
    r = json.loads(smt.skill_manage(
        "patch", "global-skill", old_string="# global-skill", new_string="# hijacked",
    ))
    assert r["success"] is False
    assert "read-only" in r["error"]
