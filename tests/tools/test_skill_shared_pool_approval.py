"""Tests for the shared-pool in-place approval flow (user_approved) and the
post-change cross-profile integrity check.

Policy (洛 2026-09-18, 「事前少审批、事后必校验」):

- Named-profile writes to the shared default pool are refused by default.
- When the user explicitly approved the change in the current conversation,
  the caller retries with ``user_approved=True`` and the write lands in
  place — no profile switch, no new session, no request ticket.
- The autonomous background-review fork can never use ``user_approved``; it
  gets a fork-specific refusal that deliberately does NOT point at
  ``hermes request create`` (autonomous forks following that guidance were a
  ticket-spam source).
- Every successful write carries an ``integrity`` block in the result:
  which profiles' whitelists / cron jobs reference the skill and whether
  the name still resolves from their perspective.
"""

import contextlib
import json
import os

import pytest


_SKILL = (
    "---\nname: shared-skill\ndescription: A shared pool skill\nversion: 1.0.0\n---\n"
    "# Shared\nold guidance\n"
)


@contextlib.contextmanager
def _bg_origin():
    """Run the block as the autonomous background-review fork."""
    from tools.skill_provenance import (
        BACKGROUND_REVIEW,
        reset_current_write_origin,
        set_current_write_origin,
    )
    token = set_current_write_origin(BACKGROUND_REVIEW)
    try:
        yield
    finally:
        reset_current_write_origin(token)


@contextlib.contextmanager
def _as_profile(profile_home):
    """Bind the process to a named profile via the ContextVar override."""
    from hermes_constants import reset_hermes_home_override, set_hermes_home_override
    token = set_hermes_home_override(profile_home)
    try:
        yield
    finally:
        reset_hermes_home_override(token)


@pytest.fixture
def two_profile_home(tmp_path, monkeypatch):
    """default home + one named profile (writer), sharing the pool."""
    home = tmp_path / ".hermes"
    prof = home / "profiles" / "writer"
    (home / "skills").mkdir(parents=True)
    (prof / "skills").mkdir(parents=True)
    (home / "config.yaml").write_text("skills:\n  external_dirs: []\n")
    (prof / "config.yaml").write_text("skills:\n  external_dirs: []\n")
    monkeypatch.setenv("HERMES_HOME", str(home))
    return home, prof


def _make_shared_skill(home, name="shared-skill", body="old guidance"):
    skill_dir = home / "skills" / name
    skill_dir.mkdir(parents=True)
    (skill_dir / "SKILL.md").write_text(
        f"---\nname: {name}\ndescription: A shared pool skill\nversion: 1.0.0\n---\n"
        f"# Shared\n{body}\n"
    )
    return skill_dir


def test_named_profile_patch_shared_pool_blocked_without_approval(two_profile_home):
    home, prof = two_profile_home
    _make_shared_skill(home)
    import tools.skill_manager_tool as smt

    with _as_profile(prof):
        r = json.loads(smt.skill_manage(
            "patch", "shared-skill",
            old_string="old guidance", new_string="new guidance",
        ))
    assert r["success"] is False
    assert "user_approved" in r["error"]
    # The block message teaches the in-place flow, not the ticket flow.
    assert "不需要申请单" in r["error"]


def test_named_profile_patch_shared_pool_allowed_with_approval(two_profile_home):
    home, prof = two_profile_home
    skill_dir = _make_shared_skill(home)
    (prof / "skills.whitelist").write_text("shared-skill\n")
    import tools.skill_manager_tool as smt

    with _as_profile(prof):
        r = json.loads(smt.skill_manage(
            "patch", "shared-skill",
            old_string="old guidance", new_string="new guidance",
            user_approved=True,
        ))
    assert r["success"] is True, r
    assert "new guidance" in (skill_dir / "SKILL.md").read_text()
    # Post-write integrity check rides along: writer references the skill and
    # it still resolves from writer's perspective.
    integrity = r["integrity"]
    assert integrity["ok"] is True
    assert integrity["referenced_by"] == {"writer": "resolved"}
    assert integrity["frontmatter"] == "ok"


def test_background_review_shared_pool_blocked_with_fork_message(two_profile_home):
    home, prof = two_profile_home
    _make_shared_skill(home)
    import tools.skill_manager_tool as smt

    with _as_profile(prof):
        with _bg_origin():
            r = json.loads(smt.skill_manage(
                "patch", "shared-skill",
                old_string="old guidance", new_string="new guidance",
                user_approved=True,  # must NOT help an autonomous fork
            ))
    assert r["success"] is False
    assert "后台复盘" in r["error"]
    # The fork must not be guided toward filing request tickets.
    assert "不要为此创建 hermes request 申请单" in r["error"]


def test_delete_flags_dangling_whitelist_and_cron_refs(two_profile_home):
    home, prof = two_profile_home
    _make_shared_skill(home, name="doomed-skill")
    (prof / "skills.whitelist").write_text("doomed-skill\n")
    (prof / "cron").mkdir()
    (prof / "cron" / "jobs.json").write_text(json.dumps(
        [{"id": "j1", "name": "nightly", "skills": ["doomed-skill"]}]
    ))
    import tools.skill_manager_tool as smt

    # Delete from the default profile (its own pool — no approval needed).
    r = json.loads(smt.skill_manage("delete", "doomed-skill"))
    assert r["success"] is True, r
    integrity = r["integrity"]
    assert integrity["ok"] is False
    assert integrity["referenced_by"] == {"writer": "dangling"}
    assert integrity["cron_refs"] == {"writer": "dangling"}
    assert integrity["problems"]
    assert "fix_hint" in integrity


def test_user_approved_write_is_audited(two_profile_home):
    home, prof = two_profile_home
    _make_shared_skill(home)
    import tools.skill_manager_tool as smt

    with _as_profile(prof):
        r = json.loads(smt.skill_manage(
            "patch", "shared-skill",
            old_string="old guidance", new_string="new guidance",
            user_approved=True,
        ))
    assert r["success"] is True, r

    log_path = home / "logs" / "asset-changes.jsonl"
    records = [
        json.loads(line)
        for line in log_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    rec = records[-1]
    assert rec["skill"] == "shared-skill"
    assert rec["action"] == "patch"
    assert rec["profile"] == "writer"
    assert rec["user_approved"] is True


def test_named_profile_local_skill_needs_no_approval(two_profile_home):
    home, prof = two_profile_home
    local = prof / "skills" / "local-skill"
    local.mkdir(parents=True)
    (local / "SKILL.md").write_text(
        "---\nname: local-skill\ndescription: profile-local\nversion: 1.0.0\n---\n"
        "# Local\nold text\n"
    )
    import tools.skill_manager_tool as smt

    with _as_profile(prof):
        r = json.loads(smt.skill_manage(
            "patch", "local-skill",
            old_string="old text", new_string="new text",
        ))
    assert r["success"] is True, r
    assert "new text" in (local / "SKILL.md").read_text()


def test_schema_exposes_user_approved():
    import tools.skill_manager_tool as smt

    props = smt.SKILL_MANAGE_SCHEMA["parameters"]["properties"]
    assert "user_approved" in props
    assert props["user_approved"]["type"] == "boolean"
