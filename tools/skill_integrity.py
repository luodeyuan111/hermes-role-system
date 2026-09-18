"""技能变更后的跨角色完整性自检（事后校验代替事前审批）。

skill_manage 每次成功写入后调用 :func:`audit_skill_change`，回答一个问题：
「这次改动之后，各角色引用这个 skill 的配置路径还正确吗？」

检查项（确定性、只读、亚秒级）：

1. **白名单引用** — 哪些角色的 ``skills.whitelist`` 引用了该 skill；从每个
   引用方视角（角色本地 → 共享池 → bundled/optional，同真实解析顺序）
   名字是否仍可解析。delete/改名后直接暴露悬挂引用——这正是「改共享池
   之前要知道影响谁」的事后形态。
2. **cron 引用** — 各 profile ``cron/jobs.json`` 的 ``skills`` 字段引用
   是否仍可解析。
3. **frontmatter** — 变更后 SKILL.md 的 name/description 是否完好
   （delete 跳过）。

结果挂在 skill_manage 返回 JSON 的 ``integrity`` 键下，让发起修改的模型
当场看到影响面并就地修复（例如 delete 后把某角色白名单行改指伞名）。
周期性全量漂移审计仍由 ``~/.hermes/scripts/skill_pool_audit.py`` 负责；
本模块只做变更点触发的 scoped 检查。所有异常吞掉返回 None——自检
绝不阻断工具。
"""

from __future__ import annotations

import json
import re
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

# 与 skill_pool_audit.py / agent.skill_utils.EXCLUDED_SKILL_DIRS 同语义：
# 这些目录里的 SKILL.md 不参与名字解析。
_EXCLUDED_DIR_NAMES = {"staging", ".archive", ".hub", "__pycache__"}


def _repo_root() -> Path:
    """hermes-agent 源码根（tools/skill_integrity.py 的上一级）。"""
    return Path(__file__).resolve().parents[1]


def _iter_skills(root: Path) -> Dict[str, Path]:
    """{dir_name: SKILL.md path}，跳过隔离/归档目录。"""
    out: Dict[str, Path] = {}
    if not root.is_dir():
        return out
    try:
        for skill_md in root.rglob("SKILL.md"):
            if _EXCLUDED_DIR_NAMES & set(skill_md.parts):
                continue
            out.setdefault(skill_md.parent.name, skill_md)
    except OSError:
        pass
    return out


def _profile_homes(default_root: Path) -> List[Tuple[str, Path]]:
    """[("default", root), ("writer", root/profiles/writer), ...]"""
    homes = [("default", default_root)]
    profiles = default_root / "profiles"
    if profiles.is_dir():
        try:
            for entry in sorted(profiles.iterdir()):
                if entry.is_dir():
                    homes.append((entry.name, entry))
        except OSError:
            pass
    return homes


def _resolution_roots(profile_home: Path, default_root: Path) -> List[Path]:
    """某角色的 skill 名字可见域：本地 → 共享池 → 仓库 bundled/optional。"""
    roots = [profile_home / "skills"]
    shared = default_root / "skills"
    if shared != roots[0]:
        roots.append(shared)
    repo = _repo_root()
    roots.append(repo / "skills")
    roots.append(repo / "optional-skills")
    return roots


def _whitelist_names(home: Path) -> List[str]:
    try:
        lines = (home / "skills.whitelist").read_text(encoding="utf-8").splitlines()
    except OSError:
        return []
    return [
        line.strip()
        for line in lines
        if line.strip() and not line.strip().startswith("#")
    ]


def _cron_skill_refs(home: Path) -> List[str]:
    try:
        raw = json.loads((home / "cron" / "jobs.json").read_text(encoding="utf-8"))
    except (OSError, ValueError):
        return []
    jobs = raw if isinstance(raw, list) else (raw.get("jobs", raw) if isinstance(raw, dict) else [])
    items = jobs.values() if isinstance(jobs, dict) else jobs
    refs: List[str] = []
    for job in items or []:
        if not isinstance(job, dict):
            continue
        for s in job.get("skills") or []:
            s = str(s).split("/")[-1].strip()
            if s:
                refs.append(s)
    return refs


def _frontmatter_status(skill_md: Optional[Path]) -> Optional[str]:
    """'ok' 或问题描述；skill 已不存在（delete）时由调用方传 None。"""
    if skill_md is None:
        return None
    try:
        head = skill_md.read_text(encoding="utf-8", errors="ignore")[:4000]
    except OSError as e:
        return f"SKILL.md 读取失败: {e}"
    missing = [
        field
        for field in ("name", "description")
        if not re.search(rf"^{field}:\s*\S", head, re.M)
    ]
    if missing:
        return f"frontmatter 缺字段: {', '.join(missing)}"
    return "ok"


def _audit(skill_name: str, action: str) -> Dict[str, Any]:
    from hermes_constants import get_default_hermes_root, get_hermes_home

    default_root = get_default_hermes_root()
    homes = _profile_homes(default_root)

    # 每个候选解析根扫一次，各角色视角复用。
    names_by_root: Dict[str, Dict[str, Path]] = {}

    def skills_at(root: Path) -> Dict[str, Path]:
        key = str(root)
        if key not in names_by_root:
            names_by_root[key] = _iter_skills(root)
        return names_by_root[key]

    def resolvable_from(profile_home: Path) -> bool:
        return any(
            skill_name in skills_at(r)
            for r in _resolution_roots(profile_home, default_root)
        )

    problems: List[str] = []
    referenced_by: Dict[str, str] = {}
    cron_refs: Dict[str, str] = {}

    for profile, home in homes:
        if skill_name in _whitelist_names(home):
            status = "resolved" if resolvable_from(home) else "dangling"
            referenced_by[profile] = status
            if status == "dangling":
                problems.append(
                    f"角色 '{profile}' 的 skills.whitelist 引用了 '{skill_name}'，"
                    f"但从它的视角已解析不到（{home}/skills.whitelist）"
                )
        if skill_name in _cron_skill_refs(home):
            status = "resolved" if resolvable_from(home) else "dangling"
            cron_refs[profile] = status
            if status == "dangling":
                problems.append(
                    f"角色 '{profile}' 的 cron 任务引用了 '{skill_name}'，"
                    f"但它已解析不到（{home}/cron/jobs.json）"
                )

    fm: Optional[str] = None
    if action != "delete":
        active_home = get_hermes_home()
        skill_md: Optional[Path] = None
        for r in _resolution_roots(active_home, default_root):
            skill_md = skills_at(r).get(skill_name)
            if skill_md is not None:
                break
        fm = _frontmatter_status(skill_md)
        if fm and fm != "ok":
            problems.append(fm)

    result: Dict[str, Any] = {
        "skill": skill_name,
        "action": action,
        "ok": not problems,
        "problems": problems,
    }
    if referenced_by:
        result["referenced_by"] = referenced_by
    if cron_refs:
        result["cron_refs"] = cron_refs
    if fm is not None:
        result["frontmatter"] = fm
    if problems:
        result["fix_hint"] = (
            "请在本次会话内就地修复上述引用（白名单/cron 里改指新名或删除该行）"
            "——这属于本次已同意变更的收尾部分；改其他角色的配置文件时"
            "file 工具需带 cross_profile=True。"
        )
    return result


def audit_skill_change(skill_name: str, action: str) -> Optional[Dict[str, Any]]:
    """变更后完整性自检入口。失败返回 None，绝不抛出。"""
    try:
        if not skill_name:
            return None
        return _audit(skill_name, action)
    except Exception:
        return None
