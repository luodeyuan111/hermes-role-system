"""bubble-chat dashboard plugin — backend API routes.

Mounted at /api/plugins/bubble-chat/ by the dashboard plugin system (see
``_mount_plugin_api_routes`` in hermes_cli/web_server.py). Declared via the
manifest's ``"api": "plugin_api.py"`` field.

Backs the sidebar's CherryStudio-style two-level role UI:

- ``GET  /roles``                role list (default profile + named profiles),
                                 display metadata parsed from each profile
                                 home's ROLE.md (first heading → display name,
                                 first paragraph → description).
- ``POST /roles``                create a role: hermes profile + ROLE.md
                                 (display name / description / prompt).
- ``GET  /roles/lookup``         which profile owns a session id (the resume
                                 path retries with it after "session not
                                 found" — role sessions live in their own
                                 profile's state.db).
- ``GET/PUT /roles/{name}/prompt``   read/write the role's ROLE.md (提示词) —
                                 the only file the role editor touches.
- ``GET /roles/default/base-files``  list the 全局底座 base files
                                 (SOUL.md / AGENTS.md / USER.md, whitelisted).
- ``GET/PUT /roles/default/base-file``   read/write one base file by name.
- ``GET/PUT /roles/{name}/memory``   read/write the role's
                                 memories/MEMORY.md (记忆, volatile layer);
                                 missing dir/file reads as "", writes mkdir.
- ``GET/PUT /roles/{name}/skills``   the role's enabled-skill list as text
                                 (one name per line). Named roles: the
                                 skills.whitelist file is the authoritative
                                 store (GET returns it verbatim, PUT writes
                                 it back trimming-only). Default role keeps
                                 the legacy blacklist (config.yaml
                                 skills.disabled) view.

Plugin HTTP routes go through the dashboard's session-token auth middleware
just like core API routes, so the frontend fetches them via the SDK's
authed ``fetchJSON``.
"""

from __future__ import annotations

import logging
from pathlib import Path
from typing import Any, Dict, List, Optional

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

router = APIRouter()
_log = logging.getLogger(__name__)


# ---------------------------------------------------------------------------
# Shared helpers
# ---------------------------------------------------------------------------

def _profiles_mod():
    # Private-import dance (same pattern as the library plugin): hermes_cli
    # is importable in the web-server process but is not a plugin-public
    # contract — do it lazily so loading this module elsewhere can't crash.
    from hermes_cli import profiles as profiles_mod

    return profiles_mod


def _parse_role_md(path: Path) -> "tuple[str, str]":
    """Extract ``(display_name, description)`` from a profile's ROLE.md.

    First markdown heading → display name; first non-heading paragraph →
    description (its first line). Any read trouble degrades to empty
    strings — a malformed ROLE.md must never break the role list.
    """
    display_name = ""
    description = ""
    try:
        lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
    except OSError as exc:
        if path.exists():
            _log.warning("bubble-chat roles: cannot read %s: %s", path, exc)
        return "", ""
    for raw in lines:
        line = raw.strip()
        if not line:
            continue
        if line.startswith("#"):
            if not display_name:
                display_name = line.lstrip("#").strip()
            continue
        # First non-heading content line = the description paragraph.
        description = line
        break
    return display_name, description


def _effective_skill_count(name: str, home: Path) -> int:
    """Enabled-skill count for the role card — same口径 as the role view's
    技能列表块 (``GET /roles/{name}/skills`` ``enabled`` length).

    Named role WITH skills.whitelist → parsed entry count (comments/blank
    lines excluded, deduped; unmatched names kept, matching the block's
    「启用 N 个技能」). Without a whitelist file (and for the default role)
    → the merged-view/blacklist enabled count. Reuses the skills-endpoint
    helpers — no duplicated logic.
    """
    if name != "default":
        wl = _whitelist_path(home)
        if wl.is_file():
            try:
                return len(
                    _parse_skill_lines(wl.read_text(encoding="utf-8", errors="replace"))
                )
            except OSError as exc:
                _log.warning("bubble-chat roles: cannot read %s: %s", wl, exc)
                # fall through to the merged-view count
    return len(_build_disabled_payload(name, home)["enabled"])


def _role_entry(name: str, home: Path, meta_description: str) -> Dict[str, Any]:
    # The default profile is special-cased as the 全局底座 (Velya/global
    # base): it has no ROLE.md of its own — its SOUL/AGENTS/USER files are
    # the shared foundation every named role builds on.
    if name == "default":
        return {
            "name": "default",
            "display_name": "Velya · 全局底座",
            "description": "所有角色共享的人格与规则底座，改动对所有角色生效",
            "skill_count": _effective_skill_count(name, home),
            "is_default": True,
            "is_base": True,
        }
    display_name, description = _parse_role_md(home / "ROLE.md")
    return {
        "name": name,
        "display_name": display_name or name,
        "description": description or meta_description,
        "skill_count": _effective_skill_count(name, home),
        "is_default": False,
        "is_base": False,
    }


def _build_roles() -> List[Dict[str, Any]]:
    profiles_mod = _profiles_mod()
    roles: List[Dict[str, Any]] = []
    try:
        infos = profiles_mod.list_profiles()
    except Exception as exc:
        _log.warning("bubble-chat roles: list_profiles failed: %s", exc)
        infos = []
    for info in infos:
        try:
            roles.append(
                _role_entry(
                    str(info.name),
                    Path(info.path),
                    str(getattr(info, "description", "") or ""),
                )
            )
        except Exception as exc:
            # Never 500 on one malformed profile — skip it with a warning.
            _log.warning(
                "bubble-chat roles: skipping profile %r: %s",
                getattr(info, "name", "?"),
                exc,
            )
    # Guarantee the default role exists even when list_profiles came back
    # empty (e.g. a partially broken profiles tree).
    if not any(r["name"] == "default" for r in roles):
        try:
            roles.insert(
                0, _role_entry("default", profiles_mod.get_profile_dir("default"), "")
            )
        except Exception as exc:
            _log.warning("bubble-chat roles: default profile fallback failed: %s", exc)
    return roles


def _profile_home_or_404(name: str) -> Path:
    """Validate a role path param and resolve its profile home."""
    profiles_mod = _profiles_mod()
    raw = (name or "").strip()
    try:
        canon = profiles_mod.normalize_profile_name(raw)
        profiles_mod.validate_profile_name(canon)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    if not profiles_mod.profile_exists(canon):
        raise HTTPException(status_code=404, detail=f"角色不存在：{canon}")
    return profiles_mod.get_profile_dir(canon)


# ---------------------------------------------------------------------------
# Role list + creation
# ---------------------------------------------------------------------------

@router.get("/roles")
async def list_roles() -> List[Dict[str, Any]]:
    """Role list for the sidebar: default profile + named profiles."""
    return await run_in_threadpool(_build_roles)


class RoleCreate(BaseModel):
    name: str
    display_name: str = ""
    description: str = ""
    prompt: str = ""


def _compose_role_md(display_name: str, description: str, prompt: str) -> str:
    parts = [f"# {display_name}"]
    if description:
        parts.append(description)
    if prompt:
        parts.append(prompt)
    return "\n\n".join(parts).rstrip() + "\n"


def _create_role(payload: RoleCreate) -> Dict[str, Any]:
    profiles_mod = _profiles_mod()
    raw = (payload.name or "").strip()
    try:
        canon = profiles_mod.normalize_profile_name(raw)
        profiles_mod.validate_profile_name(canon)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    if canon == "default":
        raise HTTPException(status_code=400, detail="default 是内置角色，不能创建")
    try:
        # no_alias: chat roles don't need a ~/.local/bin wrapper script.
        # no_skills: roles share the default home's skill pool by reference
        # (merged view — local skills win on name collision), so seeding a
        # full copy of the 72 bundled skills per role is pure duplication.
        # create_profile writes the .no-bundled-skills opt-out marker, which
        # also keeps `hermes update`'s all-profile sync out of this profile.
        home = profiles_mod.create_profile(
            name=canon,
            description=(payload.description or "").strip() or None,
            no_alias=True,
            no_skills=True,
        )
    except (ValueError, FileExistsError, FileNotFoundError) as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except Exception as exc:
        _log.exception("bubble-chat roles: create_profile failed")
        raise HTTPException(status_code=500, detail=str(exc))
    display = (payload.display_name or "").strip() or canon
    description = (payload.description or "").strip()
    prompt = (payload.prompt or "").strip()
    try:
        (home / "ROLE.md").write_text(
            _compose_role_md(display, description, prompt), encoding="utf-8"
        )
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"ROLE.md 写入失败：{exc}")
    return _role_entry(canon, home, description)


@router.post("/roles", status_code=201)
async def create_role(payload: RoleCreate) -> Dict[str, Any]:
    """Create a role: a fresh hermes profile plus its ROLE.md (名称/描述/提示词)."""
    return await run_in_threadpool(_create_role, payload)


# ---------------------------------------------------------------------------
# Session → owning profile lookup (resume retry after "session not found")
# ---------------------------------------------------------------------------

def _lookup_session_profile(session_id: str) -> Optional[str]:
    """Return the name of the profile whose state.db contains the session."""
    profiles_mod = _profiles_mod()
    from hermes_state import SessionDB

    try:
        infos = profiles_mod.list_profiles()
        targets = [(str(i.name), Path(i.path)) for i in infos]
    except Exception as exc:
        _log.warning("bubble-chat roles: lookup list_profiles failed: %s", exc)
        targets = [("default", profiles_mod.get_profile_dir("default"))]
    for name, home in targets:
        db_path = home / "state.db"
        if not db_path.exists():
            continue
        db = None
        try:
            # Read-only: never write-lock another profile's live DB.
            db = SessionDB(db_path=db_path, read_only=True)
            if db.resolve_session_id(session_id):
                return name
        except Exception as exc:
            _log.debug("bubble-chat roles: lookup skip %s: %s", name, exc)
        finally:
            if db is not None:
                try:
                    db.close()
                except Exception:
                    pass
    return None


@router.get("/roles/lookup")
async def lookup_session(session_id: str) -> Dict[str, Any]:
    """Which profile owns ``session_id`` (``{"profile": null}`` when unknown)."""
    sid = (session_id or "").strip()
    if not sid:
        return {"profile": None}
    owner = await run_in_threadpool(_lookup_session_profile, sid)
    return {"profile": owner}


# ---------------------------------------------------------------------------
# ROLE.md (提示词) read/write — the only file the role editor touches.
# ---------------------------------------------------------------------------

_MAX_PROMPT_BYTES = 512 * 1024


@router.get("/roles/{name}/prompt")
async def role_prompt_read(name: str) -> Dict[str, Any]:
    """Read the role's ROLE.md (missing file → empty content)."""
    home = await run_in_threadpool(_profile_home_or_404, name)
    role_md = home / "ROLE.md"
    try:
        if not role_md.is_file():
            return {"path": "ROLE.md", "content": ""}
        if role_md.stat().st_size > _MAX_PROMPT_BYTES:
            raise HTTPException(status_code=413, detail="ROLE.md 过大，不予编辑")
        content = role_md.read_text(encoding="utf-8", errors="replace")
    except HTTPException:
        raise
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"path": "ROLE.md", "content": content}


class RolePromptSave(BaseModel):
    content: str


@router.put("/roles/{name}/prompt")
async def role_prompt_write(name: str, payload: RolePromptSave) -> Dict[str, Any]:
    """Write the role's ROLE.md (display name / description / prompt)."""
    home = await run_in_threadpool(_profile_home_or_404, name)
    if len(payload.content.encode("utf-8", errors="replace")) > _MAX_PROMPT_BYTES:
        raise HTTPException(status_code=413, detail="内容过大")
    try:
        (home / "ROLE.md").write_text(payload.content, encoding="utf-8")
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"path": "ROLE.md", "ok": True}


# ---------------------------------------------------------------------------
# 底座文件 (base files) — the default profile IS the 全局底座: SOUL.md /
# AGENTS.md / USER.md at the default home root, shared by every role.
# Whitelisted to exactly these three names; anything else is rejected.
# ---------------------------------------------------------------------------

_BASE_FILES = ("SOUL.md", "AGENTS.md", "USER.md")


def _base_file_or_400(name: str) -> str:
    if name not in _BASE_FILES:
        raise HTTPException(
            status_code=400,
            detail=f"非法底座文件：{name!r}（仅 {', '.join(_BASE_FILES)}）",
        )
    return name


@router.get("/roles/default/base-files")
async def base_files_list() -> List[Dict[str, Any]]:
    """List the three base files with existence/size (missing → exists=false)."""
    home = await run_in_threadpool(_profile_home_or_404, "default")
    out: List[Dict[str, Any]] = []
    for fn in _BASE_FILES:
        f = home / fn
        exists = f.is_file()
        size = 0
        if exists:
            try:
                size = f.stat().st_size
            except OSError:
                size = 0
        out.append({"name": fn, "path": fn, "exists": exists, "size": size})
    return out


@router.get("/roles/default/base-file")
async def base_file_read(name: str) -> Dict[str, Any]:
    """Read one base file (missing → empty content)."""
    home = await run_in_threadpool(_profile_home_or_404, "default")
    fn = _base_file_or_400(name)
    f = home / fn
    try:
        if not f.is_file():
            return {"name": fn, "content": ""}
        if f.stat().st_size > _MAX_PROMPT_BYTES:
            raise HTTPException(status_code=413, detail=f"{fn} 过大，不予编辑")
        content = f.read_text(encoding="utf-8", errors="replace")
    except HTTPException:
        raise
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"name": fn, "content": content}


class BaseFileSave(BaseModel):
    content: str


@router.put("/roles/default/base-file")
async def base_file_write(name: str, payload: BaseFileSave) -> Dict[str, Any]:
    """Write one base file (created when missing)."""
    home = await run_in_threadpool(_profile_home_or_404, "default")
    fn = _base_file_or_400(name)
    if len(payload.content.encode("utf-8", errors="replace")) > _MAX_PROMPT_BYTES:
        raise HTTPException(status_code=413, detail="内容过大")
    try:
        (home / fn).write_text(payload.content, encoding="utf-8")
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"name": fn, "ok": True}


# ---------------------------------------------------------------------------
# MEMORY.md (记忆) read/write — <profile_home>/memories/MEMORY.md, injected
# into the volatile layer. The memories/ dir may not exist yet: reads
# degrade to an empty string, writes create it (mkdir parents).
# ---------------------------------------------------------------------------

def _memory_path(home: Path) -> Path:
    return home / "memories" / "MEMORY.md"


@router.get("/roles/{name}/memory")
async def role_memory_read(name: str) -> Dict[str, Any]:
    """Read the role's memories/MEMORY.md (missing file/dir → empty content)."""
    home = await run_in_threadpool(_profile_home_or_404, name)
    mem = _memory_path(home)
    try:
        if not mem.is_file():
            return {"path": "memories/MEMORY.md", "content": ""}
        if mem.stat().st_size > _MAX_PROMPT_BYTES:
            raise HTTPException(status_code=413, detail="MEMORY.md 过大，不予编辑")
        content = mem.read_text(encoding="utf-8", errors="replace")
    except HTTPException:
        raise
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"path": "memories/MEMORY.md", "content": content}


class RoleMemorySave(BaseModel):
    content: str


@router.put("/roles/{name}/memory")
async def role_memory_write(name: str, payload: RoleMemorySave) -> Dict[str, Any]:
    """Write the role's memories/MEMORY.md (creates memories/ if missing)."""
    home = await run_in_threadpool(_profile_home_or_404, name)
    if len(payload.content.encode("utf-8", errors="replace")) > _MAX_PROMPT_BYTES:
        raise HTTPException(status_code=413, detail="内容过大")
    mem = _memory_path(home)
    try:
        mem.parent.mkdir(parents=True, exist_ok=True)
        mem.write_text(payload.content, encoding="utf-8")
    except OSError as exc:
        raise HTTPException(status_code=500, detail=str(exc))
    return {"path": "memories/MEMORY.md", "ok": True}


# ---------------------------------------------------------------------------
# Skill list (启用技能) — text form, one skill name per line.
#
# Two storage modes:
# - Named roles: WHITELIST. The authoritative store is the plain-text file
#   ``profiles/<name>/skills.whitelist`` (one skill name per line, ``#``
#   comments and blank lines ignored, frontmatter or dir name) — the same
#   file the core's index filter reads. GET returns the raw file content
#   (comments preserved) plus the parsed list; PUT writes the file back
#   with trimming-only normalization. No config.yaml involvement at all.
# - Default role: BLACKLIST (legacy). Its home is "目录即名单" — the
#   enabled set stays derived from config.yaml skills.disabled, and PUT
#   keeps syncing that list (backup + re-parse verify). No whitelist file
#   is ever written for it.
#
# The visible pool for matching/reference is the MERGED view of three
# tiers — the role's own skills/ > the default home's ~/.hermes/skills/
# shared by reference > the role config's skills.pools.library_dirs 大库 —
# deduped by name form with the higher tier winning; the default role
# keeps the local-only view. A name counts as resolvable when EITHER its
# frontmatter name OR its directory name matches a pooled skill — the same
# matching the index builder uses (skills_pool._match_names). Reuses
# skills_pool._scan_skills / _match_names / _compute_disabled_sync /
# get_pool_config (no copied logic); library scans are TTL-cached.
# ---------------------------------------------------------------------------

def _load_role_config(home: Path) -> Dict[str, Any]:
    import yaml

    cfg_path = home / "config.yaml"
    if not cfg_path.is_file():
        return {}
    try:
        loaded = yaml.safe_load(cfg_path.read_text(encoding="utf-8"))
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"config.yaml 解析失败：{exc}")
    return loaded if isinstance(loaded, dict) else {}


def _load_role_config_lenient(home: Path) -> Dict[str, Any]:
    """_load_role_config that degrades to {} with a warning — used where a
    malformed config must not take the whole endpoint down (library_dirs
    discovery for the skills GET)."""
    try:
        return _load_role_config(home)
    except HTTPException as exc:
        _log.warning("bubble-chat roles: %s", exc.detail)
        return {}


def _scan_role_skills(home: Path) -> List[Dict[str, Any]]:
    from hermes_cli.skills_pool import _scan_skills

    return _scan_skills(home / "skills")


# Short-TTL cache for library_dirs scans — a library dir can hold hundreds
# of SKILL.md files (frontmatter-parsed each), far too expensive to rescan
# on every request. Keyed by resolved dir path.
_LIBRARY_SCAN_TTL_S = 5.0
_library_scan_cache: Dict[str, "tuple[float, List[Dict[str, Any]]]"] = {}


def _scan_library_records(home: Path) -> List[Dict[str, Any]]:
    """Skills visible through the role config's ``skills.pools.library_dirs``
    (the 大库 pool). Missing config field / nonexistent dirs are tolerated."""
    import time

    from hermes_cli.skills_pool import _scan_skills, get_pool_config

    _common, lib_dirs = get_pool_config(_load_role_config_lenient(home))
    records: List[Dict[str, Any]] = []
    for raw in lib_dirs:
        try:
            d = Path(raw).expanduser()
        except Exception:
            continue
        if not d.is_dir():
            continue
        key = str(d)
        now = time.monotonic()
        hit = _library_scan_cache.get(key)
        if hit is not None and now - hit[0] < _LIBRARY_SCAN_TTL_S:
            records.extend(hit[1])
            continue
        try:
            recs = _scan_skills(d)
        except Exception as exc:
            _log.warning("bubble-chat roles: library scan failed for %s: %s", d, exc)
            recs = []
        _library_scan_cache[key] = (now, recs)
        records.extend(recs)
    return records

def _scan_merged_skills(name: str, home: Path) -> List[Dict[str, Any]]:
    """The role's effective skill pool, tagged with ``source``.

    Named roles see three tiers, deduped by name forms (frontmatter OR dir)
    with the higher tier winning on collision:
      1. their own ``skills/`` (``source="role"``),
      2. the default home's ``~/.hermes/skills/`` shared by reference
         (``source="shared"``),
      3. the role config's ``skills.pools.library_dirs`` 大库 pool
         (``source="library"``).
    The default role keeps the legacy local-only view.
    """
    from hermes_cli.skills_pool import _match_names

    records = [dict(rec, source="role") for rec in _scan_role_skills(home)]
    if name == "default":
        return records
    seen = _match_names(records)

    def _tier(recs: List[Dict[str, Any]], source: str) -> None:
        for rec in recs:
            if rec["name"] in seen or rec["path"].name in seen:
                continue  # shadowed by a higher tier
            records.append(dict(rec, source=source))
            seen.add(rec["name"])
            seen.add(rec["path"].name)

    default_home = _profiles_mod().get_profile_dir("default")
    _tier(_scan_role_skills(default_home), "shared")
    _tier(_scan_library_records(home), "library")
    return records


def _available_entries(records: List[Dict[str, Any]]) -> List[Dict[str, str]]:
    available = [
        {
            "name": rec["name"],
            "description": rec.get("description", ""),
            "source": rec["source"],
        }
        for rec in records
    ]
    available.sort(key=lambda a: a["name"].lower())
    return available


def _build_disabled_payload(name: str, home: Path) -> Dict[str, Any]:
    """Default-role blacklist view: pool minus config.yaml skills.disabled."""
    from hermes_cli.skills_config import get_disabled_skills

    records = _scan_merged_skills(name, home)
    disabled = get_disabled_skills(_load_role_config(home))
    enabled: List[str] = []
    seen: set = set()
    disabled_count = 0
    for rec in records:
        # Disabled when either name form is listed (index-builder matching).
        is_disabled = rec["name"] in disabled or rec["path"].name in disabled
        if is_disabled:
            disabled_count += 1
        elif rec["name"] not in seen:
            seen.add(rec["name"])
            enabled.append(rec["name"])
    return {
        "mode": "disabled",
        "enabled": enabled,
        "available": _available_entries(records),
        "disabled_count": disabled_count,
    }


def _whitelist_path(home: Path) -> Path:
    return home / "skills.whitelist"


def _build_whitelist_payload(name: str, home: Path) -> Dict[str, Any]:
    """Named-role whitelist view: skills.whitelist is the enabled set."""
    from hermes_cli.skills_pool import _match_names

    records = _scan_merged_skills(name, home)
    merged_names = _match_names(records)
    wl = _whitelist_path(home)
    exists = wl.is_file()
    raw = ""
    if exists:
        try:
            raw = wl.read_text(encoding="utf-8", errors="replace")
        except OSError as exc:
            raise HTTPException(status_code=500, detail=f"skills.whitelist 读取失败：{exc}")
    names = _parse_skill_lines(raw)
    unmatched = [n for n in names if n not in merged_names]
    return {
        "mode": "whitelist",
        "whitelist_file": exists,
        # Raw file text — the textarea shows/saves it verbatim so user
        # comments survive a round-trip.
        "content": raw,
        "enabled": names,
        "unmatched": unmatched,
        "available": _available_entries(records),
    }


def _build_skills_payload(name: str, home: Path) -> Dict[str, Any]:
    if name == "default":
        return _build_disabled_payload(name, home)
    return _build_whitelist_payload(name, home)


@router.get("/roles/{name}/skills")
async def role_skills_read(name: str) -> Dict[str, Any]:
    home = await run_in_threadpool(_profile_home_or_404, name)
    return await run_in_threadpool(_build_skills_payload, name, home)


class RoleSkillsSave(BaseModel):
    """Raw textarea content: one skill name per line; blank lines and
    ``#`` comment lines are ignored."""

    text: str


def _parse_skill_lines(text: str) -> List[str]:
    names: List[str] = []
    seen: set = set()
    for raw in (text or "").splitlines():
        line = raw.strip()
        if not line or line.startswith("#"):
            continue
        if line not in seen:
            seen.add(line)
            names.append(line)
    return names


def _save_role_disabled(name: str, home: Path, text: str) -> Dict[str, Any]:
    import shutil
    from datetime import datetime

    import yaml

    from hermes_cli.skills_config import get_disabled_skills
    from hermes_cli.skills_pool import _compute_disabled_sync, _match_names

    # Merged pool (role-local ∪ shared-from-default) — the disabled sync
    # covers the whole merged set: anything not listed gets its name forms
    # written into THIS role's config.yaml skills.disabled (shared skills
    # only ever get named in the role's own config; the default home's
    # files and config are never touched).
    records = _scan_merged_skills(name, home)
    merged_names = _match_names(records)
    wanted = _parse_skill_lines(text)
    wanted_set = set(wanted)
    unmatched = [n for n in wanted if n not in merged_names]

    config = _load_role_config(home)
    current_disabled = get_disabled_skills(config)
    # The wanted list is exactly the enabled set. A listed name enables its
    # skill under BOTH name forms (frontmatter AND dir) — otherwise pool
    # semantics would write the skill's other form into skills.disabled and
    # the index-builder matching (either form listed = disabled) would hide
    # the very skill the user just enabled. Every pooled skill not enabled
    # goes to skills.disabled under all its forms; non-pool stale entries
    # are preserved — same semantics as `hermes skills pool apply`.
    enabled_forms: set = set()
    for rec in records:
        if rec["name"] in wanted_set or rec["path"].name in wanted_set:
            enabled_forms.add(rec["name"])
            enabled_forms.add(rec["path"].name)
    new_disabled = _compute_disabled_sync(
        merged_names, enabled_forms, current_disabled
    )

    changed = new_disabled != current_disabled
    backup_path: Optional[Path] = None
    if changed:
        cfg_path = home / "config.yaml"
        # Back up before writing (project convention, cf. skills_pool/setup).
        if cfg_path.exists():
            backup_path = cfg_path.with_suffix(
                f".yaml.bak.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
            )
            try:
                shutil.copy2(cfg_path, backup_path)
            except OSError as exc:
                raise HTTPException(
                    status_code=500, detail=f"config.yaml 备份失败：{exc}"
                )
        config.setdefault("skills", {})
        if not isinstance(config["skills"], dict):
            config["skills"] = {}
        config["skills"]["disabled"] = sorted(new_disabled)
        try:
            cfg_path.write_text(
                yaml.safe_dump(config, sort_keys=False, allow_unicode=True),
                encoding="utf-8",
            )
        except OSError as exc:
            raise HTTPException(status_code=500, detail=f"config.yaml 写入失败：{exc}")
        # Re-parse the written file to verify the change landed.
        try:
            written = yaml.safe_load(cfg_path.read_text(encoding="utf-8")) or {}
        except Exception as exc:
            raise HTTPException(
                status_code=500, detail=f"config.yaml 写入后校验失败：{exc}"
            )
        written_disabled = (written.get("skills") or {}).get("disabled") or []
        if sorted(str(n) for n in written_disabled) != sorted(new_disabled):
            raise HTTPException(
                status_code=500, detail="config.yaml 写入后校验失败：skills.disabled 不一致"
            )

    payload = _build_disabled_payload(name, home)
    payload.update(
        {
            "unmatched": unmatched,
            "changed": changed,
            "backup": str(backup_path) if backup_path else None,
        }
    )
    return payload


def _normalize_whitelist_text(text: str) -> str:
    """Trimming-only normalization: unify EOLs, rstrip each line, drop
    leading/trailing blank lines, end with a single newline. Comments,
    interior blank lines and entry order are preserved verbatim — the user
    edits this file as text, so a save must not rewrite their annotations."""
    lines = [
        ln.rstrip()
        for ln in (text or "").replace("\r\n", "\n").replace("\r", "\n").split("\n")
    ]
    while lines and not lines[0]:
        lines.pop(0)
    while lines and not lines[-1]:
        lines.pop()
    return "\n".join(lines) + "\n" if lines else ""


def _save_role_whitelist(name: str, home: Path, text: str) -> Dict[str, Any]:
    """Write the role's skills.whitelist verbatim (trimming only). Plain
    text, agent-editable — no config.yaml, no backup ceremony."""
    wl = _whitelist_path(home)
    try:
        wl.write_text(_normalize_whitelist_text(text), encoding="utf-8")
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"skills.whitelist 写入失败：{exc}")
    payload = _build_whitelist_payload(name, home)
    payload["changed"] = True
    return payload


@router.put("/roles/{name}/skills")
async def role_skills_write(name: str, payload: RoleSkillsSave) -> Dict[str, Any]:
    home = await run_in_threadpool(_profile_home_or_404, name)
    if name == "default":
        return await run_in_threadpool(_save_role_disabled, name, home, payload.text)
    return await run_in_threadpool(_save_role_whitelist, name, home, payload.text)
