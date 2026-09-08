"""R1.4 底座资产变更留痕测试 + R1.2 拦截文案流程指引测试。

覆盖：
  1. skill_manage 写动作成功后 JSONL 有记录（profile/action/skill/origin/staged）
  2. write_file / patch 的 cross_profile=True 放行写有记录；被拦截的写不留痕
  3. 拦截文案含 `hermes request create` 流程指引（R1.2）
"""
from __future__ import annotations

import json

import pytest


@pytest.fixture
def fake_hermes(tmp_path, monkeypatch):
    """两 profile 布局，活动 profile 是 hermes-security（对齐 test_cross_profile_guard）。"""
    root = tmp_path / "fake-hermes"
    (root / "skills" / "shared-skill").mkdir(parents=True)
    (root / "skills" / "shared-skill" / "SKILL.md").write_text(
        "---\nname: shared-skill\ndescription: default copy.\n---\nbody\n"
    )
    sec_home = root / "profiles" / "hermes-security"
    (sec_home / "skills").mkdir(parents=True)

    monkeypatch.setenv("HERMES_HOME", str(sec_home))

    import hermes_constants
    monkeypatch.setattr(hermes_constants, "get_default_hermes_root", lambda: root)

    import agent.file_safety as fs
    monkeypatch.setattr(fs, "_hermes_home_path", lambda: sec_home)
    monkeypatch.setattr(fs, "_hermes_root_path", lambda: root)

    return {"root": root, "sec_home": sec_home}


def _audit_records(root):
    from tools.asset_audit import read_asset_changes

    return read_asset_changes(limit=100)


# ---------------------------------------------------------------------------
# skill_manage 留痕
# ---------------------------------------------------------------------------


class TestSkillManageAudit:
    def test_create_leaves_audit_record(self, fake_hermes):
        from tools.skill_manager_tool import skill_manage

        result = json.loads(skill_manage(
            action="create", name="audit-target",
            content="---\nname: audit-target\ndescription: d\n---\nbody\n",
        ))
        assert result["success"], result

        records = _audit_records(fake_hermes["root"])
        assert len(records) == 1
        record = records[0]
        assert record["profile"] == "hermes-security"
        assert record["action"] == "create"
        assert record["skill"] == "audit-target"
        assert record["origin"] == "foreground"
        assert record["staged"] is False
        assert record["ts"]

    def test_failed_write_leaves_no_record(self, fake_hermes):
        from tools.skill_manager_tool import skill_manage

        result = json.loads(skill_manage(action="create", name="bad name!!", content="x"))
        assert not result["success"]
        assert _audit_records(fake_hermes["root"]) == []


# ---------------------------------------------------------------------------
# cross_profile 文件写留痕
# ---------------------------------------------------------------------------


class TestCrossProfileWriteAudit:
    def test_write_file_bypass_leaves_record(self, fake_hermes):
        from tools.file_tools import write_file_tool

        target = fake_hermes["root"] / "skills" / "shared-skill" / "SKILL.md"
        result = json.loads(write_file_tool(str(target), "override", cross_profile=True))
        assert not result.get("error"), result

        records = _audit_records(fake_hermes["root"])
        assert len(records) == 1
        assert records[0]["tool"] == "write_file"
        assert records[0]["profile"] == "hermes-security"
        assert str(target) in records[0]["path"]

    def test_blocked_write_leaves_no_record(self, fake_hermes):
        from tools.file_tools import write_file_tool

        target = fake_hermes["root"] / "skills" / "shared-skill" / "SKILL.md"
        result = json.loads(write_file_tool(str(target), "blocked"))
        assert result.get("error")
        assert _audit_records(fake_hermes["root"]) == []

    def test_patch_bypass_leaves_record(self, fake_hermes):
        from tools.file_tools import patch_tool

        target = fake_hermes["root"] / "skills" / "shared-skill" / "SKILL.md"
        result = json.loads(patch_tool(
            mode="replace", path=str(target), old_string="body",
            new_string="changed", cross_profile=True,
        ))
        assert not result.get("error"), result

        records = _audit_records(fake_hermes["root"])
        assert any(r["tool"] == "patch" and str(target) in r["path"] for r in records)

    def test_in_profile_write_leaves_no_cross_profile_record(self, fake_hermes):
        from tools.file_tools import write_file_tool

        target = fake_hermes["sec_home"] / "skills" / "own" / "SKILL.md"
        target.parent.mkdir(parents=True)
        result = json.loads(write_file_tool(str(target), "own"))
        assert not result.get("error"), result
        assert _audit_records(fake_hermes["root"]) == []


# ---------------------------------------------------------------------------
# R1.2 拦截文案含流程指引
# ---------------------------------------------------------------------------


class TestWarningGuidance:
    def test_cross_profile_warning_points_to_request_flow(self, fake_hermes):
        from agent.file_safety import get_cross_profile_warning

        warn = get_cross_profile_warning(
            str(fake_hermes["root"] / "skills" / "shared-skill" / "SKILL.md")
        )
        assert warn is not None
        assert "cross_profile=True" in warn  # 原有技术信息保留
        assert "hermes request create" in warn  # 新增流程指引

    def test_shared_pool_guard_points_to_request_flow(self, tmp_path):
        from unittest.mock import patch

        from tools.skill_manager_tool import _shared_pool_mutation_guard

        shared = tmp_path / "shared"
        (shared / "global-skill").mkdir(parents=True)
        with patch("agent.skill_utils.get_shared_skills_dirs", return_value=[shared.resolve()]):
            result = _shared_pool_mutation_guard(shared / "global-skill")
        assert result is not None
        assert "shared default-profile skills pool" in result["error"]  # 原有信息保留
        assert "hermes request create" in result["error"]  # 新增流程指引
