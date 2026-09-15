"""Asset View (资产总览) dashboard plugin — backend API routes.

Mounted at /api/plugins/asset-view/ by the dashboard plugin system (see
``_mount_plugin_api_routes`` in hermes_cli/web_server.py).

Read-only endpoints backing the 资产总览 page's workflow 区块: the toolsets /
MCP / cron data comes from the host's own ``/api/tools/toolsets``,
``/api/mcp/servers`` and ``/api/cron/jobs`` endpoints; this module only adds
the pieces the host does not already expose — the ``scripts/tools/``
self-built script inventory (R2.2/R2.4, 展示不管理), the per-profile skill
概况 (``GET /skills``: whitelist 名单归属 + 本地/共享池计数 + 能力画像
capability.yaml) and the
角色资产申请单列表 (R1.3, ``GET /requests``, 审批仍走 CLI `hermes request`).
"""

from __future__ import annotations

import ast
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException

router = APIRouter()

_SCRIPT_SUFFIXES = {".py", ".sh"}


def _script_description(path: Path) -> str:
    """Best-effort one-line summary: module docstring first line, else the
    first ``#`` comment line, else empty. Never raises."""
    try:
        if path.suffix == ".py":
            tree = ast.parse(path.read_text(encoding="utf-8", errors="replace"))
            doc = ast.get_docstring(tree)
            if doc:
                return doc.strip().splitlines()[0][:200]
        for line in path.read_text(encoding="utf-8", errors="replace").splitlines()[:20]:
            stripped = line.strip()
            if stripped.startswith("#") and not stripped.startswith("#!"):
                return stripped.lstrip("#").strip()[:200]
            if stripped and not stripped.startswith("#!"):
                break
    except Exception:
        pass
    return ""


def _scan_scripts_dir(directory: Path, scope: str, profile: str) -> List[Dict[str, Any]]:
    entries: List[Dict[str, Any]] = []
    if not directory.is_dir():
        return entries
    for path in sorted(directory.iterdir()):
        if not path.is_file() or path.suffix not in _SCRIPT_SUFFIXES:
            continue
        if path.name.startswith("_") or path.name.startswith("."):
            continue
        entries.append(
            {
                "name": path.stem,
                "filename": path.name,
                "path": str(path),
                "description": _script_description(path),
                "scope": scope,
                "profile": profile,
            }
        )
    return entries


@router.get("/scripts")
def list_scripts(profile: Optional[str] = None) -> Dict[str, Any]:
    """List self-built scripts under ``scripts/tools/``.

    Always includes the shared (default-profile) ``~/.hermes/scripts/tools/``
    inventory. With ``?profile=<name>`` also includes that profile's own
    ``scripts/tools/`` directory; ``?profile=all`` scans every profile.
    Read-only: names, paths and one-line descriptions only.
    """
    from hermes_cli import profiles as profiles_mod

    scripts: List[Dict[str, Any]] = []

    default_home = profiles_mod._get_default_hermes_home()
    scripts.extend(
        _scan_scripts_dir(default_home / "scripts" / "tools", "shared", "default")
    )

    requested = (profile or "").strip()
    if requested:
        if requested.lower() == "all":
            names = [p.name for p in profiles_mod.list_profiles() if not p.is_default]
        else:
            names = [requested]
        for name in names:
            try:
                profile_dir = Path(profiles_mod.get_profile_dir(name))
            except Exception:
                continue
            # default 家的 scripts/tools/ 已作为 shared 扫过 —— ?profile=default
            # 时 get_profile_dir("default") 解析回同目录，不重复计入。
            if profile_dir.resolve() == Path(default_home).resolve():
                continue
            scripts.extend(
                _scan_scripts_dir(
                    profile_dir / "scripts" / "tools", "profile", name
                )
            )

    # Cron output root for the workflow 区块: where scheduled jobs drop their
    # artifacts (the fetch_arxiv.py 范式的「输出目录」一环).
    output_root = str(default_home / "cron" / "output")
    return {"scripts": scripts, "cron_output_root": output_root}


@router.get("/requests")
def list_asset_requests(status: Optional[str] = None) -> Dict[str, Any]:
    """角色资产申请单列表（R1.3，只读展示；审批走 CLI `hermes request`）。

    申请单落盘在 default root 共享的 ``asset-requests/`` 目录，dashboard
    展示全量（跨 profile），``?status=pending`` 过滤待审。body 截断到
    500 字符，全文用 `hermes request show <id>` 看。
    """
    from hermes_cli import asset_requests

    entries = asset_requests.list_requests(status=status or None)
    for entry in entries:
        body = entry.get("body") or ""
        entry["body"] = body[:500]
        # path 是宿主机绝对路径，对网页端没有意义且泄露目录结构。
        entry.pop("path", None)
    return {"requests": entries}


def _read_capability(home: Path) -> Optional[Dict[str, Any]]:
    """角色能力画像（``capability.yaml``，hermes-orchestration O1）。

    字段全部可选（mission/good_at/not_for/io/tools_note/cost_hint）。
    文件不存在、解析失败或顶层不是 mapping 一律返回 None，绝不拖垮端点。
    """
    path = home / "capability.yaml"
    if not path.is_file():
        return None
    try:
        import yaml

        data = yaml.safe_load(path.read_text(encoding="utf-8", errors="replace"))
    except Exception:
        return None
    return data if isinstance(data, dict) else None


def _parse_whitelist_names(text: str) -> List[str]:
    """skills.whitelist 的名单行：忽略空行/# 注释与畸形行（含空白或路径
    分隔符的行 core 的 get_skill_whitelist 也会跳过），去重并保持文件顺序。"""
    names: List[str] = []
    seen = set()
    for raw in (text or "").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if any(ch.isspace() for ch in line) or "/" in line or "\\" in line:
            continue
        if line not in seen:
            seen.add(line)
            names.append(line)
    return names


@router.get("/skills")
def skill_overview(profile: Optional[str] = None) -> Dict[str, Any]:
    """Skills 区块的 profile 概况（只读）。

    - ``whitelist``：skills.whitelist 名单（该角色的 offer 面），逐条标注
      归属 —— 本地池（profile 家 skills/）/ 共享池（default 家 skills/，
      即 core get_shared_skills_dirs 的 by-reference 全局池）/ 未匹配。
      名单口径与 agent.skill_utils.get_skill_whitelist 一致；文件不存在时
      ``whitelist_exists=False``，该 profile 走默认全量池。
    - ``local_pool``：profile 家 skills/ 下的本地 skill（名称 + 一行描述）。
    - ``shared_refs`` / ``shared_pool_size``：whitelist 里命中共享池的条数
      与共享池总量（default profile 自己就是共享池，两者恒为 0）。
    - ``capability``：能力画像（capability.yaml，O1）；不存在/解析失败为 None。
    """
    from hermes_cli import profiles as profiles_mod
    from hermes_cli.skills_pool import _match_names, _scan_skills

    requested = (profile or "").strip() or "default"
    try:
        canon = profiles_mod.normalize_profile_name(requested)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    if not profiles_mod.profile_exists(canon):
        raise HTTPException(status_code=404, detail=f"profile 不存在：{canon}")
    home = Path(profiles_mod.get_profile_dir(canon))
    is_default = canon == "default"

    local_records = _scan_skills(home / "skills")
    local_names = _match_names(local_records)
    shared_records = (
        [] if is_default else _scan_skills(profiles_mod.get_profile_dir("default") / "skills")
    )
    shared_names = _match_names(shared_records)

    whitelist_exists = False
    whitelist: List[Dict[str, Any]] = []
    wl_path = home / "skills.whitelist"
    try:
        if wl_path.is_file():
            whitelist_exists = True
            for name in _parse_whitelist_names(
                wl_path.read_text(encoding="utf-8", errors="replace")
            ):
                origin = (
                    "local"
                    if name in local_names
                    else "shared"
                    if name in shared_names
                    else "unmatched"
                )
                whitelist.append({"name": name, "origin": origin})
    except OSError:
        # 读失败按无白名单处理（与 core 读失败回退全量的行为一致）。
        whitelist_exists = False
        whitelist = []

    return {
        "profile": canon,
        "is_default": is_default,
        "whitelist_exists": whitelist_exists,
        "whitelist": whitelist,
        "local_pool": [
            {"name": r["name"], "description": r["description"]}
            for r in local_records
        ],
        "shared_refs": sum(1 for w in whitelist if w["origin"] == "shared"),
        "shared_pool_size": len(shared_records),
        "capability": _read_capability(home),
    }
