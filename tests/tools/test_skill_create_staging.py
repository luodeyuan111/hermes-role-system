"""Tests for the skill creation quarantine (skills.create_staging).

When ``skills.create_staging`` is on, ``skill_manage(action='create')``
writes new skills to ``<skills>/staging/<name>/`` — an excluded discovery
root — so agent-generated skills stay invisible until a curator promotes
them. Staged skills remain mutable (write_file/edit/patch/delete) and are
marked created_by=agent for the curator.
"""

import importlib
import json
import os
import shutil
import tempfile

import pytest


@pytest.fixture
def hermes_home(monkeypatch):
    d = tempfile.mkdtemp(prefix="hermes_staging_test_")
    home = os.path.join(d, ".hermes")
    os.makedirs(home)
    monkeypatch.setenv("HERMES_HOME", home)
    yield home
    shutil.rmtree(d, ignore_errors=True)


def _set_staging(enabled):
    import hermes_cli.config as cfg
    c = cfg.load_config()
    c.setdefault("skills", {})["create_staging"] = enabled
    cfg.save_config(c)


def _fresh_smt():
    """Reload skill_manager_tool so SKILLS_DIR binds to this test's home."""
    import tools.skill_manager_tool as smt
    importlib.reload(smt)
    return smt


_SKILL = (
    "---\nname: test-skill\ndescription: A test skill\nversion: 1.0.0\n---\n"
    "# Test\nbody\n"
)


# ---------------------------------------------------------------------------
# Routing
# ---------------------------------------------------------------------------

def test_staging_off_creates_in_pool(hermes_home):
    smt = _fresh_smt()
    r = json.loads(smt.skill_manage("create", "pool-skill", content=_SKILL))
    assert r["success"] is True
    assert "_staged" not in r
    assert r["path"] == "pool-skill"
    assert smt._find_skill("pool-skill") is not None


def test_staging_on_routes_create_to_staging(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    r = json.loads(smt.skill_manage("create", "qq-skill", content=_SKILL))
    assert r["success"] is True
    assert r.get("_staged") is True
    assert r["path"] == os.path.join("staging", "qq-skill")
    assert "staging" in r["message"]
    # On disk under staging/.
    assert (smt._skills_dir() / "staging" / "qq-skill" / "SKILL.md").is_file()


def test_staged_skill_invisible_to_discovery(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    json.loads(smt.skill_manage("create", "hidden-skill", content=_SKILL))
    # Discovery (offer index / skills_list / skill_view all ride _find_skill
    # and is_excluded_skill_path) must not see the quarantined skill.
    assert smt._find_skill("hidden-skill") is None
    from agent.skill_utils import is_excluded_skill_path
    staged_md = smt._skills_dir() / "staging" / "hidden-skill" / "SKILL.md"
    assert is_excluded_skill_path(staged_md) is True


def test_staged_skill_stays_mutable(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    json.loads(smt.skill_manage("create", "author-skill", content=_SKILL))
    # Authoring continues while quarantined: supporting files land.
    w = json.loads(smt.skill_manage(
        "write_file", "author-skill",
        file_path="references/notes.md", file_content="hello",
    ))
    assert w["success"] is True, w
    staged = smt._skills_dir() / "staging" / "author-skill"
    assert (staged / "references" / "notes.md").read_text() == "hello"
    # Patch works too.
    p = json.loads(smt.skill_manage(
        "patch", "author-skill", old_string="# Test", new_string="# Better",
    ))
    assert p["success"] is True, p
    assert "# Better" in (staged / "SKILL.md").read_text()


def test_staged_skill_deletable(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    json.loads(smt.skill_manage("create", "reject-skill", content=_SKILL))
    d = json.loads(smt.skill_manage("delete", "reject-skill"))
    assert d["success"] is True, d
    assert not (smt._skills_dir() / "staging" / "reject-skill").exists()


def test_staged_name_collision_refused(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    json.loads(smt.skill_manage("create", "dup-skill", content=_SKILL))
    r = json.loads(smt.skill_manage("create", "dup-skill", content=_SKILL))
    assert r["success"] is False
    assert "staging" in r["error"]


def test_staged_create_marks_agent_created(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    json.loads(smt.skill_manage("create", "marked-skill", content=_SKILL))
    usage = json.loads(
        (smt._skills_dir() / ".usage.json").read_text(encoding="utf-8")
    )
    assert usage["marked-skill"]["created_by"] == "agent"


def test_staging_on_with_category_ignores_category_dir(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    r = json.loads(smt.skill_manage(
        "create", "cat-skill", content=_SKILL, category="productivity",
    ))
    assert r["success"] is True
    assert r["path"] == os.path.join("staging", "cat-skill")
    assert not (smt._skills_dir() / "productivity" / "cat-skill").exists()


# ---------------------------------------------------------------------------
# Interaction with the approval gate
# ---------------------------------------------------------------------------

def test_gate_then_approve_lands_in_staging(hermes_home):
    smt = _fresh_smt()
    _set_staging(True)
    from tools import write_approval as wa
    import hermes_cli.config as cfg
    c = cfg.load_config()
    c.setdefault("skills", {})["write_approval"] = True
    cfg.save_config(c)

    r = json.loads(smt.skill_manage("create", "gated-skill", content=_SKILL))
    assert r.get("staged") is True  # staged for APPROVAL (pending store)
    rec = wa.get_pending("skills", r["pending_id"])
    res = json.loads(smt.apply_skill_pending(rec["payload"]))
    assert res["success"] is True
    # …and the approved create lands in the staging/ quarantine, not the pool.
    assert res.get("_staged") is True
    assert (smt._skills_dir() / "staging" / "gated-skill" / "SKILL.md").is_file()
    assert smt._find_skill("gated-skill") is None
