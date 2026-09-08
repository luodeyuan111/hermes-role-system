"""
hermes request — 角色资产申请（R1.3）+ 底座资产变更留痕查询（R1.4）。

命名 profile 的角色在会话内经 terminal 调用 `hermes request create`
提出申请；洛在 CLI 或 dashboard（资产总览页）看到待审列表并审批。
批准后不自动执行——由洛或 skillsmith 人工执行，执行完 `hermes request
done` 闭环。

Subcommands:
  hermes request create --kind skill --title "..." [--body "..."]
  hermes request list [--status pending]
  hermes request show <id>
  hermes request approve <id> / reject <id> / done <id>
  hermes request audit [--limit N]   底座资产变更留痕（JSONL）

存储：``<default root>/asset-requests/*.md``（markdown frontmatter，
所有 profile 共享一个目录）。非 TTY 友好：缺参数 argparse 直接报错给
usage，绝无交互式 prompt。
"""
from __future__ import annotations

import sys
from typing import Any, Dict, List


def _resolve_caller_profile() -> str:
    """申请方 profile：从当前 HERMES_HOME 解析（default root → default）。"""
    try:
        from agent.file_safety import _resolve_active_profile_name

        return _resolve_active_profile_name()
    except Exception:
        return "default"


def _print(entry: Dict[str, Any]) -> None:
    print(
        f"{entry.get('id')}  [{entry.get('status')}]  {entry.get('kind')}  "
        f"{entry.get('profile')}  {entry.get('title')}"
    )


def _cmd_create(args: Any) -> int:
    from hermes_cli.asset_requests import create_request

    profile = _resolve_caller_profile()
    try:
        entry = create_request(
            profile=profile,
            kind=args.kind,
            title=args.title,
            body=args.body or "",
        )
    except ValueError as e:
        print(f"错误：{e}", file=sys.stderr)
        return 2
    print(f"申请单已创建：{entry['id']}")
    print(f"  状态：pending（等待审批，洛可用 `hermes request approve {entry['id']}` 批准）")
    print(f"  文件：{entry['path']}")
    return 0


def _cmd_list(args: Any) -> int:
    from hermes_cli.asset_requests import list_requests

    entries = list_requests(status=args.status)
    if not entries:
        scope = f"状态 {args.status!r} 的" if args.status else ""
        print(f"没有{scope}申请单。")
        return 0
    for entry in entries:
        _print(entry)
    return 0


def _cmd_show(args: Any) -> int:
    from hermes_cli.asset_requests import get_request

    entry = get_request(args.id)
    if entry is None:
        print(f"错误：找不到申请单 {args.id!r}（`hermes request list` 查看全部）", file=sys.stderr)
        return 1
    for key in ("id", "profile", "kind", "title", "status", "created_at", "updated_at"):
        print(f"{key}: {entry.get(key)}")
    print(f"path: {entry.get('path')}")
    print()
    print(entry.get("body", ""))
    return 0


def _cmd_transition(args: Any, action: str) -> int:
    from hermes_cli.asset_requests import transition

    try:
        entry = transition(args.id, action)
    except KeyError:
        print(f"错误：找不到申请单 {args.id!r}（`hermes request list` 查看全部）", file=sys.stderr)
        return 1
    except ValueError as e:
        print(f"错误：{e}", file=sys.stderr)
        return 1
    hints = {
        "approve": "已批准。由洛或 skillsmith 人工执行，执行完后 `hermes request done` 闭环。",
        "reject": "已拒绝。",
        "done": "已标记完成，申请闭环。",
    }
    print(f"{entry['id']}：{hints[action]}")
    return 0


def _cmd_audit(args: Any) -> int:
    from tools.asset_audit import audit_log_path, read_asset_changes

    records: List[Dict[str, Any]] = read_asset_changes(limit=args.limit)
    if not records:
        print(f"没有变更留痕记录（{audit_log_path()}）。")
        return 0
    for record in records:
        if "skill" in record:
            detail = f"skill={record.get('skill')} action={record.get('action')}"
            if record.get("summary"):
                detail += f" — {record['summary']}"
        else:
            detail = f"tool={record.get('tool')} path={record.get('path')}"
        origin = record.get("origin")
        origin_part = f" origin={origin}" if origin else ""
        print(f"{record.get('ts')}  [{record.get('profile')}]{origin_part}  {detail}")
    return 0


def cmd_request(args: Any) -> int:
    sub = getattr(args, "request_command", None)
    if sub == "create":
        return _cmd_create(args)
    if sub in ("list", "ls"):
        return _cmd_list(args)
    if sub == "show":
        return _cmd_show(args)
    if sub == "approve":
        return _cmd_transition(args, "approve")
    if sub == "reject":
        return _cmd_transition(args, "reject")
    if sub == "done":
        return _cmd_transition(args, "done")
    if sub == "audit":
        return _cmd_audit(args)
    print("用法：hermes request {create,list,show,approve,reject,done,audit}", file=sys.stderr)
    return 2
