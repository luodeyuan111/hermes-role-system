"""Role asset requests (角色资产申请) — markdown 申请单存储（R1.3）。

命名 profile 对底座（default profile）资产只有读权限；想在底座加
skill / tool / MCP 时，通过 `hermes request create` 生成一张申请单，
落盘到 **default root 共享的** ``<root>/asset-requests/`` 目录（所有
profile 写同一个目录，洛在一处审批）。批准闭环：

    pending --approve--> approved --done--> done
    pending --reject--> rejected

批准后由洛或 skillsmith 人工执行，执行完标 done —— 机制只负责申请、
查阅与状态流转，不负责自动执行。申请单是 markdown 落盘，不搞数据库
（YAGNI）；软护栏之外的正向通道，不构成安全边界。
"""

from __future__ import annotations

import re
import uuid
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List, Optional

import yaml

VALID_KINDS = ("skill", "tool", "mcp", "other")
VALID_STATUSES = ("pending", "approved", "rejected", "done")

# 允许的状态流转，构成批准闭环。
_TRANSITIONS = {
    "approve": ("pending", "approved"),
    "reject": ("pending", "rejected"),
    "done": ("approved", "done"),
}


def requests_dir() -> Path:
    """申请单目录：default root 下的 asset-requests/，所有 profile 共享。

    命名 profile 的 HERMES_HOME 是 ``<root>/profiles/<name>``，所以这里
    必须从 default root 推导，不能用 get_hermes_home()。
    """
    from hermes_constants import get_default_hermes_root

    return get_default_hermes_root() / "asset-requests"


def _now_iso() -> str:
    return datetime.now().astimezone().isoformat(timespec="seconds")


def _slugify(title: str) -> str:
    slug = re.sub(r"[^a-z0-9]+", "-", title.lower()).strip("-")[:40].strip("-")
    return slug or f"req-{uuid.uuid4().hex[:6]}"


def _serialize(frontmatter: Dict[str, Any], body: str) -> str:
    fm = yaml.safe_dump(frontmatter, sort_keys=False, allow_unicode=True).strip()
    text = f"---\n{fm}\n---\n\n## 申请理由与需求描述\n\n{body.strip() or '（未填写）'}\n"
    return text


def _parse(path: Path) -> Optional[Dict[str, Any]]:
    """解析一张申请单，返回 frontmatter dict + body + path。坏文件跳过。"""
    try:
        text = path.read_text(encoding="utf-8")
        if not text.startswith("---"):
            return None
        end = text.index("\n---", 3)
        fm = yaml.safe_load(text[3:end]) or {}
        if not isinstance(fm, dict) or "id" not in fm:
            return None
        body = text[end + 4:].strip()
        return {**fm, "body": body, "path": str(path)}
    except (OSError, ValueError):
        return None


def create_request(profile: str, kind: str, title: str, body: str = "") -> Dict[str, Any]:
    """创建申请单并落盘，返回解析后的申请单 dict。"""
    if kind not in VALID_KINDS:
        raise ValueError(f"kind 必须是 {'/'.join(VALID_KINDS)} 之一，收到: {kind!r}")
    title = title.strip()
    if not title:
        raise ValueError("title 不能为空")

    directory = requests_dir()
    directory.mkdir(parents=True, exist_ok=True)

    now = _now_iso()
    date = datetime.now().strftime("%Y%m%d")
    slug = _slugify(title)
    request_id = f"{date}-{profile}-{slug}"
    path = directory / f"{request_id}.md"
    n = 2
    while path.exists():
        request_id = f"{date}-{profile}-{slug}-{n}"
        path = directory / f"{request_id}.md"
        n += 1

    frontmatter = {
        "id": request_id,
        "profile": profile,
        "kind": kind,
        "title": title,
        "status": "pending",
        "created_at": now,
        "updated_at": now,
    }
    path.write_text(_serialize(frontmatter, body), encoding="utf-8")
    return {**frontmatter, "body": body.strip(), "path": str(path)}


def list_requests(status: Optional[str] = None) -> List[Dict[str, Any]]:
    """列出申请单（新的在前）。``status`` 过滤，如 ``pending``。"""
    directory = requests_dir()
    entries: List[Dict[str, Any]] = []
    if directory.is_dir():
        for path in sorted(directory.glob("*.md")):
            parsed = _parse(path)
            if parsed is None:
                continue
            if status and parsed.get("status") != status:
                continue
            entries.append(parsed)
    entries.sort(key=lambda e: str(e.get("created_at", "")), reverse=True)
    return entries


def get_request(request_id: str) -> Optional[Dict[str, Any]]:
    """按 id 取申请单（精确匹配 frontmatter id 或文件名 stem）。"""
    request_id = request_id.strip()
    if request_id.endswith(".md"):
        request_id = request_id[:-3]
    for entry in list_requests():
        if entry.get("id") == request_id or Path(entry["path"]).stem == request_id:
            return entry
    return None


def transition(request_id: str, action: str) -> Dict[str, Any]:
    """状态流转（approve/reject/done），改 frontmatter status + updated_at。

    非法流转抛 ValueError；找不到申请单抛 KeyError。
    """
    from_status, to_status = _TRANSITIONS[action]
    entry = get_request(request_id)
    if entry is None:
        raise KeyError(request_id)
    if entry.get("status") != from_status:
        raise ValueError(
            f"申请单 {entry['id']} 当前状态是 {entry.get('status')!r}，"
            f"只有 {from_status!r} 状态可以 {action}"
        )

    path = Path(entry["path"])
    frontmatter = {
        key: entry[key]
        for key in ("id", "profile", "kind", "title", "status", "created_at", "updated_at")
        if key in entry
    }
    frontmatter["status"] = to_status
    frontmatter["updated_at"] = _now_iso()
    # 正文保留原文（含「## 申请理由与需求描述」标题之下用户写的内容）。
    body = entry.get("body", "")
    body = re.sub(r"^## 申请理由与需求描述\s*", "", body).strip()
    path.write_text(_serialize(frontmatter, body), encoding="utf-8")
    return {**frontmatter, "body": body, "path": str(path)}
