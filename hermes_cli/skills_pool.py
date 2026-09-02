"""
Declarative skill pool management — `hermes skills pool <show|check|apply>`.

Three tiers, declared in ~/.hermes/config.yaml (all optional; absent = no
behavior change):

  skills:
    pools:
      common: [skill-a, skill-b]       # common pool: appears in the prompt index
      library_dirs: [/abs/path, ...]   # library pool: hidden from the index,
                                       # explicit-loadable (skill_view/--skills/cron)

  - common  — local skills ({HERMES_HOME}/skills) that appear in the index.
  - library — external dirs merged into the skill scan but skipped by the
              index builder (agent/prompt_builder.py). No disabled entry needed.
  - role    — each profile's own skills/ dir (~/.hermes/profiles/<name>/skills).

`apply` syncs skills.disabled so every LOCAL skill not in pools.common is
disabled (hidden from the index) and every common skill is enabled. Disabled
only hides a skill from the index — explicit loads still work — so this is a
declarative replacement for hand-maintained disable lists.

Non-interactive, plain output: these commands may run without a TTY.
"""

import shutil
import sys
from datetime import datetime
from pathlib import Path
from typing import List, Optional, Set, Tuple

from hermes_cli.config import get_config_path, load_config
from hermes_cli.skills_config import (
    _normalize_skill_names,
    get_disabled_skills,
    save_disabled_skills,
)


# ─── Pool declaration parsing ────────────────────────────────────────────────

def get_pool_config(config: dict) -> Tuple[Set[str], List[str]]:
    """Return (common skill names, raw library_dirs entries) from config.

    Missing/malformed ``skills.pools`` means empty pools — zero behavior
    change for configs that never declared them.
    """
    skills_cfg = config.get("skills")
    if not isinstance(skills_cfg, dict):
        return set(), []
    pools = skills_cfg.get("pools")
    if not isinstance(pools, dict):
        return set(), []
    common = _normalize_skill_names(pools.get("common"))
    raw_dirs = pools.get("library_dirs")
    if isinstance(raw_dirs, str):
        raw_dirs = [raw_dirs]
    library_dirs = [str(d) for d in raw_dirs] if isinstance(raw_dirs, list) else []
    return common, library_dirs


# ─── Skill scanning ──────────────────────────────────────────────────────────

def _scan_skills(root: Path) -> List[dict]:
    """Return one record per skill under *root*: {"name", "description", "path"}.

    The record name is the frontmatter ``name:`` (falling back to the
    directory name), matching how the index and disabled-set matching
    resolve skills. ``description`` is the frontmatter summary ("" when
    absent) — pool commands ignore it; UIs (e.g. the bubble-chat role
    editor) show it as a pick-list hint. Excluded dirs (.archive, .git, ...)
    are pruned by ``iter_skill_index_files``.
    """
    from agent.skill_utils import iter_skill_index_files, parse_frontmatter

    records: List[dict] = []
    if not root.is_dir():
        return records
    for skill_md in iter_skill_index_files(root, "SKILL.md"):
        try:
            fm, _ = parse_frontmatter(
                skill_md.read_text(encoding="utf-8")[:4000]
            )
        except Exception:
            fm = {}
        records.append({
            "name": str(fm.get("name") or skill_md.parent.name),
            "description": str(fm.get("description") or ""),
            "path": skill_md.parent,
        })
    return records


def _match_names(records: List[dict]) -> Set[str]:
    """All names a record set answers to: frontmatter name AND dir name.

    The index builder and disabled-set checks test both forms, so pool
    membership must too.
    """
    names = {r["name"] for r in records}
    names |= {r["path"].name for r in records}
    return names


def _local_skills() -> List[dict]:
    from hermes_constants import get_skills_dir

    return _scan_skills(get_skills_dir())


def _library_dirs(*, existing_only: bool = False) -> List[Path]:
    from agent.skill_utils import get_library_skills_dirs

    return get_library_skills_dirs(existing_only=existing_only)


def _all_known_names(local: List[dict], library_dirs: List[Path]) -> Set[str]:
    """Names resolvable anywhere: local skills + every existing library dir."""
    known = _match_names(local)
    for lib_dir in library_dirs:
        known |= _match_names(_scan_skills(lib_dir))
    return known


# ─── show ────────────────────────────────────────────────────────────────────

def _pool_show(config: dict) -> int:
    common, _ = get_pool_config(config)
    disabled = get_disabled_skills(config)
    local = _local_skills()
    local_names = _match_names(local)
    library_dirs = _library_dirs(existing_only=False)
    known = _all_known_names(local, library_dirs)

    print("Skill pools")
    print()

    # ── Common tier ──
    common_on_disk = sorted(n for n in common if n in known)
    common_missing = sorted(n for n in common if n not in known)
    print(f"Common pool ({len(common)} declared, in the prompt index):")
    for name in common_on_disk:
        marker = "" if name in local_names else "  (via library dir)"
        print(f"  {name}{marker}")
    for name in common_missing:
        print(f"  {name}  (declared, NOT FOUND on disk)")
    if not common:
        print("  (none declared)")
    print()

    # ── Library tier ──
    print("Library pool (hidden from index, explicit-load only):")
    if not library_dirs:
        print("  (no library_dirs declared)")
    for lib_dir in library_dirs:
        if not lib_dir.is_dir():
            print(f"  {lib_dir}  (NOT FOUND)")
            continue
        skills = _scan_skills(lib_dir)
        print(f"  {lib_dir}  ({len(skills)} skills):")
        for rec in sorted(skills, key=lambda r: r["name"]):
            print(f"    {rec['name']}")
    print()

    # ── Role pools (per-profile skills/) ──
    print("Role pools (per-profile skills/):")
    try:
        from hermes_cli.profiles import list_profiles

        profiles = [p for p in list_profiles() if not p.is_default]
    except Exception as e:
        profiles = []
        print(f"  (could not list profiles: {e})")
    if not profiles:
        print("  (no named profiles)")
    shared_names: Set[str] = set()
    if profiles:
        # Named profiles also resolve the default home's skills/ by reference
        # (shared global pool, local wins on name conflicts) — show how many
        # additional skills that gives each role.
        try:
            from hermes_cli.profiles import get_profile_dir

            shared_names = _match_names(_scan_skills(get_profile_dir("default") / "skills"))
        except Exception:
            shared_names = set()
    for profile in profiles:
        skills = _scan_skills(Path(profile.path) / "skills")
        names = ", ".join(sorted(r["name"] for r in skills)) or "(empty)"
        shared_extra = len(shared_names - _match_names(skills))
        suffix = f", 另共享全局 {shared_extra} 个" if shared_extra else ""
        # Whitelist-first homes (skills.whitelist): the index only shows the
        # listed names — surface the list size so a bare role dir isn't
        # mistaken for an empty skill set.
        whitelist_note = ""
        try:
            _wl_path = Path(profile.path) / "skills.whitelist"
            if _wl_path.is_file():
                _wl_count = sum(
                    1
                    for line in _wl_path.read_text(encoding="utf-8").splitlines()
                    if line.strip() and not line.strip().startswith("#")
                )
                whitelist_note = f", 白名单 {_wl_count} 个"
        except Exception:
            whitelist_note = ""
        print(f"  {profile.name}: {len(skills)} skills — {names}{suffix}{whitelist_note}")
    print()

    # ── Unclassified ──
    unclassified = sorted(
        r["name"] for r in local
        if r["name"] not in common and r["path"].name not in common
        and r["name"] not in disabled and r["path"].name not in disabled
    )
    print(f"Unclassified local skills (not in pools.common, not disabled): {len(unclassified)}")
    for name in unclassified:
        print(f"  {name}")
    return 0


# ─── check ───────────────────────────────────────────────────────────────────

def _pool_check(config: dict) -> int:
    """Diff declaration vs disk. Returns non-zero when problems are found."""
    common, _ = get_pool_config(config)
    disabled = get_disabled_skills(config)
    local = _local_skills()
    library_dirs = _library_dirs(existing_only=False)
    known = _all_known_names(local, library_dirs)

    problems: List[str] = []

    for name in sorted(common):
        if name not in known:
            problems.append(f"pools.common declares '{name}' but it exists nowhere on disk")

    for lib_dir in library_dirs:
        if not lib_dir.is_dir():
            problems.append(f"pools.library_dirs entry does not exist: {lib_dir}")

    unclassified = sorted(
        r["name"] for r in local
        if r["name"] not in common and r["path"].name not in common
        and r["name"] not in disabled and r["path"].name not in disabled
    )
    for name in unclassified:
        problems.append(
            f"local skill '{name}' is not covered by any declaration "
            "(pools.common, skills.disabled, or a library dir)"
        )

    if problems:
        print(f"Pool check: {len(problems)} problem(s):")
        for problem in problems:
            print(f"  - {problem}")
        return 1
    print("Pool check: OK — declaration matches disk.")
    return 0


# ─── apply ───────────────────────────────────────────────────────────────────

def _compute_disabled_sync(
    local_names: Set[str], common: Set[str], current_disabled: Set[str]
) -> Set[str]:
    """Desired skills.disabled after a pool apply.

    Every LOCAL skill not in pools.common is disabled; every common skill is
    enabled (removed from disabled). Disabled entries for skills that are not
    local (library skills, stale names) are preserved untouched — apply only
    manages the local tier.
    """
    return (current_disabled - common) | (local_names - common)


def _pool_apply(config: dict) -> int:
    common, _ = get_pool_config(config)
    local = _local_skills()
    local_names = _match_names(local)
    library_dirs = _library_dirs(existing_only=False)
    known = _all_known_names(local, library_dirs)

    # Declared-but-missing common skills: warn, don't fail.
    for name in sorted(common):
        if name not in known:
            print(
                f"Warning: pools.common declares '{name}' but it exists "
                "nowhere on disk — leaving it declared.",
                file=sys.stderr,
            )

    current_disabled = get_disabled_skills(config)
    new_disabled = _compute_disabled_sync(local_names, common, current_disabled)

    if new_disabled == current_disabled:
        print(f"Pool apply: already in sync ({len(new_disabled)} local skills disabled).")
        return 0

    enabled = sorted(current_disabled & common)
    newly_disabled = sorted(new_disabled - current_disabled)

    # Back up config.yaml before writing (project convention, cf. setup.py).
    config_path = get_config_path()
    backup_path: Optional[Path] = None
    if config_path.exists():
        backup_path = config_path.with_suffix(
            f".yaml.bak.{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        )
        try:
            shutil.copy2(config_path, backup_path)
        except Exception as e:
            print(f"Error: could not back up {config_path}: {e}", file=sys.stderr)
            return 1

    save_disabled_skills(config, new_disabled)

    # Re-parse the written file to verify the change landed.
    import yaml

    try:
        written = yaml.safe_load(config_path.read_text(encoding="utf-8")) or {}
    except Exception as e:
        print(f"Error: wrote {config_path} but re-parse failed: {e}", file=sys.stderr)
        return 1
    written_disabled = (written.get("skills") or {}).get("disabled") or []
    if sorted(str(n) for n in written_disabled) != sorted(new_disabled):
        print(
            f"Error: verification failed — {config_path} skills.disabled "
            "does not match the intended pool sync.",
            file=sys.stderr,
        )
        return 1

    print("Pool apply: synced skills.disabled")
    if backup_path is not None:
        print(f"  backup: {backup_path}")
    print(f"  newly disabled ({len(newly_disabled)}): {', '.join(newly_disabled) or '-'}")
    print(f"  enabled ({len(enabled)}): {', '.join(enabled) or '-'}")
    print(f"  total disabled now: {len(new_disabled)}")
    return 0


# ─── Entry point ─────────────────────────────────────────────────────────────

def pool_command(args) -> int:
    """Entry point for `hermes skills pool <show|check|apply>`."""
    action = getattr(args, "pool_action", None) or "show"
    config = load_config()
    if action == "show":
        return _pool_show(config)
    if action == "check":
        return _pool_check(config)
    if action == "apply":
        return _pool_apply(config)
    print(f"Unknown pool action: {action}", file=sys.stderr)
    return 2
