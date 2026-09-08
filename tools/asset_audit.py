"""底座资产变更留痕（R1.4）—— JSONL 追加日志。

底座资产（default profile 的 skills 等）的每次变更追加一条 JSONL 到
``<default root>/logs/asset-changes.jsonl``，回答「谁改的、何时、改了
什么」。与申请单目录同理：所有 profile 写同一个 default root 下的文件，
路径从 ``hermes_constants.get_default_hermes_root()`` 推导。

留痕是 best-effort：日志写失败只记 warning，绝不阻断工具调用。
查询入口是 CLI `hermes request audit [--limit N]`。
"""

from __future__ import annotations

import json
import logging
from datetime import datetime
from pathlib import Path
from typing import Any, Dict, List

logger = logging.getLogger(__name__)


def audit_log_path() -> Path:
    from hermes_constants import get_default_hermes_root

    return get_default_hermes_root() / "logs" / "asset-changes.jsonl"


def _active_profile() -> str:
    try:
        from agent.file_safety import _resolve_active_profile_name

        return _resolve_active_profile_name()
    except Exception:
        return "default"


def append_asset_change(**fields: Any) -> None:
    """追加一条变更记录（自动补 ts/profile）。Best-effort，绝不抛出。"""
    try:
        record = {
            "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
            "profile": _active_profile(),
            **fields,
        }
        path = audit_log_path()
        path.parent.mkdir(parents=True, exist_ok=True)
        with path.open("a", encoding="utf-8") as f:
            f.write(json.dumps(record, ensure_ascii=False) + "\n")
    except Exception:
        logger.warning("asset audit append failed", exc_info=True)


def read_asset_changes(limit: int = 50) -> List[Dict[str, Any]]:
    """读最近 ``limit`` 条变更记录（新的在前）。坏行跳过。"""
    path = audit_log_path()
    if not path.is_file():
        return []
    records: List[Dict[str, Any]] = []
    try:
        for line in path.read_text(encoding="utf-8").splitlines():
            line = line.strip()
            if not line:
                continue
            try:
                records.append(json.loads(line))
            except ValueError:
                continue
    except OSError:
        return []
    records.reverse()
    return records[:limit]
