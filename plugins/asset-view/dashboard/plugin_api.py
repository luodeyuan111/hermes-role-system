"""Asset View (资产总览) dashboard plugin — backend API routes.

Mounted at /api/plugins/asset-view/ by the dashboard plugin system (see
``_mount_plugin_api_routes`` in hermes_cli/web_server.py).

Read-only endpoints backing the 资产总览 page's workflow 区块: the toolsets /
MCP / cron data comes from the host's own ``/api/tools/toolsets``,
``/api/mcp/servers`` and ``/api/cron/jobs`` endpoints; this module only adds
the one piece the host does not already expose — the ``scripts/tools/``
self-built script inventory (R2.2/R2.4, 展示不管理).
"""

from __future__ import annotations

import ast
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter

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
                profile_dir = profiles_mod.get_profile_dir(name)
            except Exception:
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
