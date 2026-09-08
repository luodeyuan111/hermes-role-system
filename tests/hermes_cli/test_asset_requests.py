"""R1.3 角色资产申请机制测试：申请单存储 + hermes request CLI 闭环。

覆盖：
  1. create 落盘到 default root 共享目录（命名 profile 下也一样）
  2. create → list → show → approve → done 批准闭环 + reject 分支
  3. 非法状态流转 / 未知 id 的报错
  4. CLI 层 cmd_request 各子命令（非 TTY，缺参数由 argparse 拦）
"""
from __future__ import annotations

import types

import pytest
import yaml


@pytest.fixture
def fake_hermes(tmp_path, monkeypatch):
    """两 profile 布局，HERMES_HOME 指向命名 profile coder。

    申请单必须落盘到 root/asset-requests/（default root 共享目录），
    而不是 coder 自己的 HERMES_HOME 下。
    """
    root = tmp_path / "fake-hermes"
    coder_home = root / "profiles" / "coder"
    coder_home.mkdir(parents=True)

    monkeypatch.setenv("HERMES_HOME", str(coder_home))

    import hermes_constants
    monkeypatch.setattr(hermes_constants, "get_default_hermes_root", lambda: root)

    import agent.file_safety as fs
    monkeypatch.setattr(fs, "_hermes_home_path", lambda: coder_home)
    monkeypatch.setattr(fs, "_hermes_root_path", lambda: root)

    return {"root": root, "coder_home": coder_home}


def _read_frontmatter(path):
    text = path.read_text(encoding="utf-8")
    end = text.index("\n---", 3)
    return yaml.safe_load(text[3:end])


# ---------------------------------------------------------------------------
# 存储层
# ---------------------------------------------------------------------------


class TestCreateRequest:
    def test_create_lands_in_default_root(self, fake_hermes):
        from hermes_cli.asset_requests import create_request, requests_dir

        entry = create_request("coder", "skill", "新增翻译 skill", "需要翻译工作流")
        assert requests_dir() == fake_hermes["root"] / "asset-requests"
        assert entry["path"].startswith(str(fake_hermes["root"] / "asset-requests"))
        assert entry["status"] == "pending"
        assert entry["profile"] == "coder"

        fm = _read_frontmatter(fake_hermes["root"] / "asset-requests" / f"{entry['id']}.md")
        for key in ("id", "profile", "kind", "title", "status", "created_at", "updated_at"):
            assert key in fm
        assert fm["kind"] == "skill"

    def test_create_same_title_twice_gets_unique_ids(self, fake_hermes):
        from hermes_cli.asset_requests import create_request

        first = create_request("coder", "tool", "同一个标题")
        second = create_request("coder", "tool", "同一个标题")
        assert first["id"] != second["id"]

    def test_create_rejects_bad_kind_and_empty_title(self, fake_hermes):
        from hermes_cli.asset_requests import create_request

        with pytest.raises(ValueError):
            create_request("coder", "nonsense", "x")
        with pytest.raises(ValueError):
            create_request("coder", "skill", "   ")


class TestApprovalLoop:
    def test_full_cycle_create_list_approve_done(self, fake_hermes):
        from hermes_cli.asset_requests import (
            create_request,
            get_request,
            list_requests,
            transition,
        )

        entry = create_request("coder", "mcp", "接入 notion MCP")
        assert [e["id"] for e in list_requests(status="pending")] == [entry["id"]]

        approved = transition(entry["id"], "approve")
        assert approved["status"] == "approved"
        assert list_requests(status="pending") == []
        assert approved["updated_at"] >= entry["created_at"]

        done = transition(entry["id"], "done")
        assert done["status"] == "done"
        shown = get_request(entry["id"])
        assert shown["status"] == "done"
        # 正文在状态流转后保留。
        assert "申请理由与需求描述" in shown["body"]

    def test_reject_branch(self, fake_hermes):
        from hermes_cli.asset_requests import create_request, transition

        entry = create_request("scholar", "other", "调整 cron 时区")
        rejected = transition(entry["id"], "reject")
        assert rejected["status"] == "rejected"

    def test_illegal_transitions(self, fake_hermes):
        from hermes_cli.asset_requests import create_request, transition

        entry = create_request("coder", "skill", "x")
        with pytest.raises(ValueError):
            transition(entry["id"], "done")  # 只有 approved 才能 done
        transition(entry["id"], "approve")
        with pytest.raises(ValueError):
            transition(entry["id"], "approve")  # 重复 approve
        with pytest.raises(KeyError):
            transition("no-such-id", "approve")


# ---------------------------------------------------------------------------
# CLI 层
# ---------------------------------------------------------------------------


def _args(**kw):
    return types.SimpleNamespace(**kw)


class TestRequestCmd:
    def test_create_via_cmd_uses_active_profile(self, fake_hermes, capsys):
        from hermes_cli.request_cmd import cmd_request

        rc = cmd_request(_args(request_command="create", kind="skill",
                               title="会话内申请", body="理由"))
        assert rc == 0
        out = capsys.readouterr().out
        assert "申请单已创建" in out

        from hermes_cli.asset_requests import list_requests
        entries = list_requests()
        assert len(entries) == 1
        assert entries[0]["profile"] == "coder"  # 从 HERMES_HOME 解析

    def test_list_show_approve_done_via_cmd(self, fake_hermes, capsys):
        from hermes_cli.asset_requests import create_request
        from hermes_cli.request_cmd import cmd_request

        entry = create_request("coder", "tool", "注册 vision 工具")
        assert cmd_request(_args(request_command="list", status=None)) == 0
        assert entry["id"] in capsys.readouterr().out
        assert cmd_request(_args(request_command="show", id=entry["id"])) == 0
        assert "注册 vision 工具" in capsys.readouterr().out
        assert cmd_request(_args(request_command="approve", id=entry["id"])) == 0
        assert cmd_request(_args(request_command="done", id=entry["id"])) == 0

        from hermes_cli.asset_requests import get_request
        assert get_request(entry["id"])["status"] == "done"

    def test_unknown_id_and_bad_transition_return_nonzero(self, fake_hermes, capsys):
        from hermes_cli.asset_requests import create_request
        from hermes_cli.request_cmd import cmd_request

        assert cmd_request(_args(request_command="approve", id="nope")) == 1
        assert "找不到申请单" in capsys.readouterr().err
        entry = create_request("coder", "skill", "x")
        assert cmd_request(_args(request_command="done", id=entry["id"])) == 1
        assert "pending" in capsys.readouterr().err

    def test_audit_empty(self, fake_hermes, capsys):
        from hermes_cli.request_cmd import cmd_request

        assert cmd_request(_args(request_command="audit", limit=10)) == 0
        assert "没有变更留痕记录" in capsys.readouterr().out

    def test_audit_reads_jsonl(self, fake_hermes, capsys):
        from tools.asset_audit import append_asset_change
        from hermes_cli.request_cmd import cmd_request

        append_asset_change(kind="skill_change", action="create",
                            skill="demo", origin="foreground", staged=False, summary="s")
        assert cmd_request(_args(request_command="audit", limit=10)) == 0
        out = capsys.readouterr().out
        assert "skill=demo" in out and "coder" in out
