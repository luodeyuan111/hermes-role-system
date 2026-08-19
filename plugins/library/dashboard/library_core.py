"""资料馆 (Library) backend — read-only file indexing over enrolled source trees.

Plugin edition (plugins/library/dashboard/library_core.py): extracted from the
former ``hermes_cli/library.py`` so the dashboard plugin owns its backend.
Deliberately free of any ``hermes_cli`` imports (stdlib + yaml + lazy PIL
only); the FastAPI surface lives in ``plugin_api.py`` next to this file.

Source files are never written to. Conversion products (preview PDFs, image
thumbnails) live under the library home directory and are bound to their
source file through a SQLite table keyed by path + source mtime/size, so a
changed source invalidates its cache automatically.

Layout of the library home (created on first run)::

    <library_home>/
    ├── library.yaml      enrolment config (roots → branches → policy)
    ├── index.db          SQLite binding table (cache_entries)
    └── cache/<sha1(abs_path)[:16]>/
        ├── preview.pdf   LibreOffice conversion product (kind=pdf)
        └── thumb.jpg     PIL thumbnail (kind=thumb)

Branch policy semantics (per first-level directory under a root):
  enabled: false  → the whole branch is invisible (not listed, not accessible)
  preview: false  → files are browsable but cannot be previewed
  convert: false  → only direct-stream types (image/video/audio/pdf/text/md);
                    Office documents are not converted
  type: "feed"    → the branch is an information-source feed: dated markdown
                    items with YAML frontmatter (title/status/tags/...), one
                    subdirectory per source. It gets an aggregated item view
                    (see ``list_feed``) instead of the plain folder grid.
Branches not listed default to ``{preview: true, convert: true}``; a root not
listed in the config is not accessible at all.

Information-source (feed) roots — two equivalent ways to declare one:
  1. Branch-level ``type: feed`` policy (above), configured by hand. This is
     the only form that can carry a ``notes`` policy (条目笔记目录).
  2. Top-level ``feed_dirs`` list in library.yaml — absolute paths of ANY
     enrolled directory, marked/unmarked from the dashboard (``/feed/mark``,
     ``/feed/unmark``). Both forms are unioned when deciding whether a
     directory renders as an aggregated feed.
Inside a feed root, first-level subdirectories are sources and the markdown
files under them are items; ``.md`` files directly under the feed root are
collected too, under the fixed source name ``(root)``. Deeper nesting is
walked but still attributed to the first-level source. feed_dirs roots have
no notes configuration — the 条目笔记 button stays hidden for them.

Feed reading state (待读/在读/已读) is kept in the ``feed_state`` table keyed
by absolute path — source files stay read-only, so a state change never
touches the markdown the fetch scripts produced, and marking/unmarking a
feed dir never touches the recorded state either.
"""

from __future__ import annotations

import asyncio
import hashlib
import logging
import os
import re
import shutil
import sqlite3
import tempfile
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

import yaml

log = logging.getLogger(__name__)

# ---------------------------------------------------------------------------
# Locations
# ---------------------------------------------------------------------------

_DEFAULT_LIBRARY_HOME = str(Path.home() / ".hermes" / "library")


def library_home() -> Path:
    """Library working directory; overridable via HERMES_LIBRARY_HOME (tests)."""
    return Path(os.environ.get("HERMES_LIBRARY_HOME", _DEFAULT_LIBRARY_HOME))


def _config_path() -> Path:
    return library_home() / "library.yaml"


def _db_path() -> Path:
    return library_home() / "index.db"


def _cache_root() -> Path:
    return library_home() / "cache"


# Default enrolment for a brand-new install: no roots, no feeds. Existing
# deployments keep their own library.yaml under the library home; this only
# seeds the first-run config file.
_DEFAULT_CONFIG = {"roots": [], "feed_dirs": []}

# Policy defaults for branches not listed under an enrolled root.
_DEFAULT_BRANCH_POLICY = {
    "preview": True,
    "convert": True,
    "enabled": True,
    "type": "tree",
}


def ensure_layout() -> None:
    """Create the library home and write the default config on first run."""
    home = library_home()
    (home / "cache").mkdir(parents=True, exist_ok=True)
    cfg = _config_path()
    if not cfg.exists():
        cfg.write_text(
            yaml.safe_dump(_DEFAULT_CONFIG, allow_unicode=True, sort_keys=False),
            encoding="utf-8",
        )


def load_config() -> Dict[str, Any]:
    """Load library.yaml, normalising branch policies with defaults filled in."""
    ensure_layout()
    try:
        raw = yaml.safe_load(_config_path().read_text(encoding="utf-8")) or {}
    except (OSError, yaml.YAMLError):
        raw = {}
    roots: List[Dict[str, Any]] = []
    for entry in raw.get("roots") or []:
        path = entry.get("path")
        if not path:
            continue
        branches: Dict[str, Dict[str, Any]] = {}
        for name, pol in (entry.get("branches") or {}).items():
            pol = pol or {}
            notes = pol.get("notes")
            notes_dir = (notes or {}).get("dir") if isinstance(notes, dict) else None
            notes_tpl = (notes or {}).get("template") if isinstance(notes, dict) else None
            branches[str(name)] = {
                "preview": bool(pol.get("preview", True)),
                "convert": bool(pol.get("convert", True)),
                "enabled": bool(pol.get("enabled", True)),
                "type": str(pol.get("type", "tree")),
                "notes": (
                    {
                        "dir": str(Path(notes_dir).resolve()),
                        "template": str(Path(notes_tpl).resolve()) if notes_tpl else None,
                    }
                    if notes_dir else None
                ),
            }
        try:
            resolved = str(Path(path).resolve())
        except OSError:
            resolved = str(Path(path).absolute())
        roots.append({
            "path": resolved,
            "name": Path(resolved).name or resolved,
            "branches": branches,
        })
    feed_dirs: List[str] = []
    for entry in raw.get("feed_dirs") or []:
        if not isinstance(entry, str) or not entry.strip():
            continue
        try:
            resolved_dir = Path(entry).resolve()
        except (OSError, RuntimeError):
            log.warning("feed_dirs entry unresolvable, ignored: %r", entry)
            continue
        if str(resolved_dir) in feed_dirs:
            continue
        if not resolved_dir.is_dir():
            log.warning("feed_dirs entry is not a directory, ignored: %s", resolved_dir)
            continue
        # Must land inside an enabled enrolled root/branch (same confinement
        # as resolve_enrolled, but against the roots normalised above —
        # calling resolve_enrolled here would recurse into load_config).
        enrolled = False
        for root in roots:
            root_path = root["path"]
            s = str(resolved_dir)
            if s == root_path or s.startswith(root_path + os.sep):
                policy = branch_policy(root, _branch_of(root_path, resolved_dir))
                if policy["enabled"]:
                    enrolled = True
                break
        if not enrolled or _in_library_home(resolved_dir):
            log.warning(
                "feed_dirs entry is outside every enabled enrolled root, ignored: %s",
                resolved_dir,
            )
            continue
        feed_dirs.append(str(resolved_dir))
    return {"roots": roots, "feed_dirs": feed_dirs}


# ---------------------------------------------------------------------------
# Path policy
# ---------------------------------------------------------------------------

class LibraryAccessError(Exception):
    """Raised when a path is outside every enabled enrolled root/branch."""


def _branch_of(root_path: str, resolved: Path) -> Optional[str]:
    """First path component under the root, or None for the root itself."""
    rel = os.path.relpath(str(resolved), root_path)
    if rel in (".", os.pardir) or rel.startswith(os.pardir + os.sep):
        return None
    return rel.split(os.sep, 1)[0] if os.sep in rel else (rel if rel else None)


def branch_policy(root: Dict[str, Any], branch: Optional[str]) -> Dict[str, Any]:
    if branch is None:
        return dict(_DEFAULT_BRANCH_POLICY)
    return dict(root["branches"].get(branch, _DEFAULT_BRANCH_POLICY))


def _in_library_home(resolved: Path) -> bool:
    """True if the path is the library's own working dir or inside it.

    The library home (index.db, cache/) lives under an enrolled root in the
    default config; it must not be indexed, searched, or served.
    """
    try:
        home = library_home().resolve()
    except OSError:
        return False
    s = str(resolved)
    return s == str(home) or s.startswith(str(home) + os.sep)


def resolve_enrolled(path: str) -> Tuple[Path, Dict[str, Any], Dict[str, Any], Optional[str]]:
    """Resolve ``path`` and verify it lands inside an enabled enrolled root.

    Returns ``(resolved_path, root_cfg, policy, branch)``. Raises
    ``LibraryAccessError`` for anything outside the enrolled trees, inside an
    ``enabled: false`` branch, or otherwise unresolvable — callers map this to
    HTTP 403.
    """
    if not path:
        raise LibraryAccessError("empty path")
    try:
        resolved = Path(path).resolve()
    except (OSError, RuntimeError) as exc:
        raise LibraryAccessError(f"unresolvable path: {exc}")
    if _in_library_home(resolved):
        raise LibraryAccessError("library working directory is not part of the index")
    for root in load_config()["roots"]:
        root_path = root["path"]
        resolved_str = str(resolved)
        if resolved_str == root_path or resolved_str.startswith(root_path + os.sep):
            branch = _branch_of(root_path, resolved)
            policy = branch_policy(root, branch)
            if not policy["enabled"]:
                raise LibraryAccessError("branch is disabled")
            return resolved, root, policy, branch
    raise LibraryAccessError("path is outside all enrolled roots")


# ---------------------------------------------------------------------------
# Type classification
# ---------------------------------------------------------------------------

_IMAGE_EXTS = {"png", "jpg", "jpeg", "gif", "webp", "bmp", "tif", "tiff", "svg", "heic", "avif"}
_VIDEO_EXTS = {"mp4", "mkv", "mov", "avi", "webm", "m4v", "flv", "wmv"}
_AUDIO_EXTS = {"mp3", "wav", "flac", "aac", "ogg", "m4a", "opus", "wma"}
_OFFICE_EXTS = {"docx", "pptx", "xlsx", "ppt", "doc", "xls"}
_TEXT_EXTS = {
    "txt", "log", "csv", "tsv", "json", "yaml", "yml", "xml", "ini", "cfg",
    "toml", "py", "js", "ts", "sh", "html", "htm", "css", "sql", "tex",
}
_MD_EXTS = {"md", "markdown"}

# Kinds served straight from the source file, no conversion needed.
DIRECT_KINDS = {"image", "video", "audio", "pdf", "text", "md"}


def ext_of(path: Path) -> str:
    return path.suffix.lower().lstrip(".")


def base_preview_kind(path: Path) -> str:
    """Policy-independent kind for a file extension."""
    ext = ext_of(path)
    if ext in _IMAGE_EXTS:
        return "image"
    if ext in _VIDEO_EXTS:
        return "video"
    if ext in _AUDIO_EXTS:
        return "audio"
    if ext == "pdf":
        return "pdf"
    if ext in _OFFICE_EXTS:
        return "office"
    if ext in _TEXT_EXTS:
        return "text"
    if ext in _MD_EXTS:
        return "md"
    return "none"


def preview_kind(path: Path, policy: Dict[str, bool]) -> str:
    """Kind after applying the branch policy (may degrade to ``none``)."""
    if not policy.get("preview", True):
        return "none"
    kind = base_preview_kind(path)
    if kind == "office" and not policy.get("convert", True):
        return "none"
    return kind


# ---------------------------------------------------------------------------
# SQLite binding table
# ---------------------------------------------------------------------------

_SCHEMA = """
CREATE TABLE IF NOT EXISTS cache_entries (
    rel_path TEXT PRIMARY KEY,
    abs_path TEXT,
    source_mtime REAL,
    source_size INTEGER,
    kind TEXT,
    cache_path TEXT,
    created_at REAL,
    last_used REAL
);
CREATE INDEX IF NOT EXISTS idx_cache_entries_abs ON cache_entries(abs_path);
CREATE TABLE IF NOT EXISTS feed_state (
    abs_path TEXT PRIMARY KEY,
    status TEXT,
    updated_at REAL
);
CREATE TABLE IF NOT EXISTS feed_notes (
    abs_path TEXT PRIMARY KEY,
    note_path TEXT UNIQUE,
    created_at REAL
);
CREATE TABLE IF NOT EXISTS note_links (
    note_path TEXT,
    target TEXT,
    resolved_path TEXT,
    PRIMARY KEY (note_path, target)
);
"""


def _connect() -> sqlite3.Connection:
    ensure_layout()
    conn = sqlite3.connect(str(_db_path()))
    conn.row_factory = sqlite3.Row
    conn.executescript(_SCHEMA)
    return conn


def cache_dir_for(abs_path: Path) -> Path:
    digest = hashlib.sha1(str(abs_path).encode("utf-8")).hexdigest()[:16]
    return _cache_root() / digest


def get_entry(abs_path: Path, kind: str) -> Optional[sqlite3.Row]:
    with _connect() as conn:
        return conn.execute(
            "SELECT * FROM cache_entries WHERE abs_path = ? AND kind = ?",
            (str(abs_path), kind),
        ).fetchone()


def _rel_path(abs_path: Path) -> str:
    for root in load_config()["roots"]:
        if str(abs_path) == root["path"] or str(abs_path).startswith(root["path"] + os.sep):
            return os.path.relpath(str(abs_path), root["path"])
    return str(abs_path)


def put_entry(abs_path: Path, kind: str, cache_path: Path, st: os.stat_result) -> None:
    now = time.time()
    with _connect() as conn:
        # rel_path is the PRIMARY KEY, so a file keeps at most one binding row;
        # in practice kinds never mix (office→pdf, image→thumb).
        conn.execute(
            "DELETE FROM cache_entries WHERE abs_path = ?", (str(abs_path),)
        )
        conn.execute(
            "INSERT INTO cache_entries"
            " (rel_path, abs_path, source_mtime, source_size, kind, cache_path,"
            "  created_at, last_used) VALUES (?,?,?,?,?,?,?,?)",
            (_rel_path(abs_path), str(abs_path), st.st_mtime, st.st_size,
             kind, str(cache_path), now, now),
        )


def touch_entry(abs_path: Path, kind: str) -> None:
    with _connect() as conn:
        conn.execute(
            "UPDATE cache_entries SET last_used = ? WHERE abs_path = ? AND kind = ?",
            (time.time(), str(abs_path), kind),
        )


def cache_hit(abs_path: Path, kind: str, st: os.stat_result,
              expect_name: Optional[str] = None) -> Optional[Path]:
    """Return the cached product path iff the binding matches the live source."""
    row = get_entry(abs_path, kind)
    if row is None:
        return None
    if row["source_mtime"] != st.st_mtime or row["source_size"] != st.st_size:
        return None
    cache_path = Path(row["cache_path"])
    if expect_name is not None and cache_path.name != expect_name:
        return None
    if not cache_path.is_file():
        return None
    touch_entry(abs_path, kind)
    return cache_path


# ---------------------------------------------------------------------------
# Conversion (LibreOffice) and thumbnails (PIL)
# ---------------------------------------------------------------------------

_CONVERT_TIMEOUT_S = 120
_convert_semaphore: Optional[asyncio.Semaphore] = None


def _semaphore() -> asyncio.Semaphore:
    global _convert_semaphore
    if _convert_semaphore is None:
        _convert_semaphore = asyncio.Semaphore(1)
    return _convert_semaphore


async def convert_to_pdf(src: Path) -> Path:
    """Convert an Office document to PDF via headless LibreOffice.

    Single-flight (module semaphore = 1) so a slow conversion never stacks up
    parallel soffice processes. Returns the bound cache path; raises
    ``RuntimeError`` on failure.
    """
    cache_dir = cache_dir_for(src)
    cache_dir.mkdir(parents=True, exist_ok=True)
    target = cache_dir / "preview.pdf"
    profile = Path(tempfile.mkdtemp(prefix="lo_profile_", dir=str(cache_dir)))
    try:
        async with _semaphore():
            proc = await asyncio.create_subprocess_exec(
                "soffice", "--headless", "--norestore",
                f"-env:UserInstallation=file://{profile}",
                "--convert-to", "pdf", "--outdir", str(cache_dir), str(src),
                stdout=asyncio.subprocess.PIPE,
                stderr=asyncio.subprocess.PIPE,
            )
            try:
                stdout, stderr = await asyncio.wait_for(
                    proc.communicate(), timeout=_CONVERT_TIMEOUT_S
                )
            except asyncio.TimeoutError:
                proc.kill()
                await proc.wait()
                raise RuntimeError(f"conversion timed out after {_CONVERT_TIMEOUT_S}s")
            if proc.returncode != 0:
                detail = (stderr or stdout).decode("utf-8", errors="replace").strip()
                raise RuntimeError(f"soffice exited {proc.returncode}: {detail[:500]}")
        produced = cache_dir / (src.stem + ".pdf")
        if not produced.is_file():
            raise RuntimeError("soffice produced no output pdf")
        if produced != target:
            os.replace(produced, target)
    finally:
        shutil.rmtree(profile, ignore_errors=True)
    st = src.stat()
    put_entry(src, "pdf", target, st)
    return target


def make_thumbnail(src: Path, size: int) -> Path:
    """Render a JPEG thumbnail (longest edge = ``size``, quality 80) via PIL."""
    from PIL import Image

    cache_dir = cache_dir_for(src)
    cache_dir.mkdir(parents=True, exist_ok=True)
    target = cache_dir / ("thumb.jpg" if size == 320 else f"thumb_{size}.jpg")
    with Image.open(src) as img:
        img = img.convert("RGB")
        img.thumbnail((size, size))
        img.save(target, "JPEG", quality=80)
    st = src.stat()
    put_entry(src, "thumb", target, st)
    return target


# ---------------------------------------------------------------------------
# Sync / GC
# ---------------------------------------------------------------------------

CACHE_BUDGET_BYTES = 2 * 1024 * 1024 * 1024  # 2 GiB


def _dir_bytes(path: Path) -> int:
    total = 0
    for dirpath, _dirnames, filenames in os.walk(path):
        for name in filenames:
            try:
                total += os.path.getsize(os.path.join(dirpath, name))
            except OSError:
                continue
    return total


def sync_cache() -> Dict[str, int]:
    """Reconcile the binding table with reality.

    - Entries whose source file disappeared: drop the cache dir + row.
    - If the cache exceeds the 2 GiB budget, evict least-recently-used entries
      until back under budget.
    """
    removed_orphans = 0
    evicted = 0
    with _connect() as conn:
        rows = conn.execute("SELECT * FROM cache_entries").fetchall()
        for row in rows:
            if not Path(row["abs_path"]).is_file():
                cache_dir = Path(row["cache_path"]).parent
                if cache_dir.parent == _cache_root():
                    shutil.rmtree(cache_dir, ignore_errors=True)
                else:
                    Path(row["cache_path"]).unlink(missing_ok=True)
                conn.execute("DELETE FROM cache_entries WHERE rel_path = ?",
                             (row["rel_path"],))
                removed_orphans += 1

        cache_bytes = _dir_bytes(_cache_root()) if _cache_root().is_dir() else 0
        if cache_bytes > CACHE_BUDGET_BYTES:
            rows = conn.execute(
                "SELECT * FROM cache_entries ORDER BY last_used ASC"
            ).fetchall()
            for row in rows:
                if cache_bytes <= CACHE_BUDGET_BYTES:
                    break
                cache_path = Path(row["cache_path"])
                cache_dir = cache_path.parent
                freed = _dir_bytes(cache_dir) if cache_dir.is_dir() else 0
                if cache_dir.parent == _cache_root():
                    shutil.rmtree(cache_dir, ignore_errors=True)
                else:
                    cache_path.unlink(missing_ok=True)
                conn.execute("DELETE FROM cache_entries WHERE rel_path = ?",
                             (row["rel_path"],))
                cache_bytes -= freed
                evicted += 1

        # Feed reading-state rows whose source markdown disappeared.
        feed_rows = conn.execute("SELECT abs_path FROM feed_state").fetchall()
        for row in feed_rows:
            if not Path(row["abs_path"]).is_file():
                conn.execute("DELETE FROM feed_state WHERE abs_path = ?",
                             (row["abs_path"],))
                removed_orphans += 1

        # Feed-note bindings whose source item or note file disappeared.
        note_rows = conn.execute("SELECT abs_path, note_path FROM feed_notes").fetchall()
        for row in note_rows:
            if (not Path(row["abs_path"]).is_file()
                    or not Path(row["note_path"]).is_file()):
                conn.execute("DELETE FROM feed_notes WHERE abs_path = ?",
                             (row["abs_path"],))
                removed_orphans += 1

        # Wiki-link rows whose owning note file disappeared.
        link_rows = conn.execute("SELECT DISTINCT note_path FROM note_links").fetchall()
        for row in link_rows:
            if not Path(row["note_path"]).is_file():
                conn.execute("DELETE FROM note_links WHERE note_path = ?",
                             (row["note_path"],))
                removed_orphans += 1

    cache_bytes = _dir_bytes(_cache_root()) if _cache_root().is_dir() else 0
    return {
        "removed_orphans": removed_orphans,
        "evicted": evicted,
        "cache_bytes": cache_bytes,
    }


# ---------------------------------------------------------------------------
# Listing / overview / search (read-only walks over enrolled trees)
# ---------------------------------------------------------------------------

def file_entry(path: Path, policy: Dict[str, bool]) -> Dict[str, Any]:
    st = path.stat()
    return {
        "name": path.name,
        "path": str(path),
        "size": st.st_size,
        "mtime": st.st_mtime,
        "ext": ext_of(path),
        "preview_kind": preview_kind(path, policy),
    }


def preview_cached(path: Path) -> bool:
    """True iff a fresh binding (pdf or thumb) exists for this source file."""
    kind = "pdf" if base_preview_kind(path) == "office" else "thumb"
    try:
        st = path.stat()
    except OSError:
        return False
    row = get_entry(path, kind)
    if row is None:
        return False
    return (
        row["source_mtime"] == st.st_mtime
        and row["source_size"] == st.st_size
        and Path(row["cache_path"]).is_file()
    )


def _is_hidden(name: str) -> bool:
    """Dot-prefixed entries (LibreOffice lock files, .DS_Store, VCS dirs…)."""
    return name.startswith(".")


# Recursive per-directory stats are expensive on large trees (and the roots
# may live on a slow external disk), so listings share this short-lived
# cache — the same 60s staleness window the overview walk already accepts.
_dir_stats_cache: Dict[str, Tuple[float, int, int, Dict[str, int]]] = {}
_DIR_STATS_TTL_S = 60.0


def _dir_stats(path: Path) -> Tuple[int, int, Dict[str, int]]:
    """Recursive (file_count, total_bytes, ext_counts) for a directory.

    Only direct-file stats used to be reported here, which showed 0 B for
    any folder whose content sits in subfolders. Hidden entries and the
    library's own working dir are excluded, matching the overview walk.
    """
    key = str(path)
    now = time.time()
    cached = _dir_stats_cache.get(key)
    if cached and now - cached[0] < _DIR_STATS_TTL_S:
        return cached[1], cached[2], cached[3]
    count = 0
    total = 0
    ext_counts: Dict[str, int] = {}
    for dirpath, dirnames, filenames in os.walk(key):
        dirnames[:] = [
            d for d in dirnames
            if not _is_hidden(d) and not _in_library_home(Path(dirpath) / d)
        ]
        for name in filenames:
            if _is_hidden(name):
                continue
            try:
                size = os.lstat(os.path.join(dirpath, name)).st_size
            except OSError:
                continue
            count += 1
            total += size
            ext = ext_of(Path(name))
            if ext:
                ext_counts[ext] = ext_counts.get(ext, 0) + 1
    _dir_stats_cache[key] = (now, count, total, ext_counts)
    return count, total, ext_counts


def list_tree(root: Dict[str, Any], target: Path) -> Dict[str, Any]:
    """Direct children of ``target``: dirs with recursive stats + files."""
    root_path = Path(root["path"])
    dirs: List[Dict[str, Any]] = []
    files: List[Dict[str, Any]] = []
    with os.scandir(target) as scan:
        for entry in scan:
            if _is_hidden(entry.name):
                continue
            try:
                if entry.is_dir(follow_symlinks=False):
                    child = Path(entry.path)
                    if _in_library_home(child):
                        continue
                    branch = _branch_of(root["path"], child)
                    if not branch_policy(root, branch)["enabled"]:
                        continue
                    count, total, ext_counts = _dir_stats(child)
                    dominant = max(ext_counts, key=ext_counts.get) if ext_counts else None
                    dirs.append({
                        "name": entry.name,
                        "path": str(child),
                        "file_count": count,
                        "total_size": total,
                        "dominant_ext": dominant,
                    })
                elif entry.is_file(follow_symlinks=False):
                    child = Path(entry.path)
                    branch = _branch_of(root["path"], child)
                    files.append(file_entry(child, branch_policy(root, branch)))
            except OSError:
                continue
    dirs.sort(key=lambda d: d["name"].lower())
    files.sort(key=lambda f: f["name"].lower())
    parent = None
    if target != root_path:
        parent = str(target.parent)
    return {"path": str(target), "parent": parent, "dirs": dirs, "files": files}


_overview_cache: Dict[str, Any] = {"at": 0.0, "data": None}
_OVERVIEW_TTL_S = 60.0


def build_overview() -> Dict[str, Any]:
    """Recursive per-root stats + 20 most recently modified files.

    Cached in memory for 60s — the full walk over multi-GB trees is only
    acceptable occasionally.
    """
    now = time.time()
    if _overview_cache["data"] is not None and now - _overview_cache["at"] < _OVERVIEW_TTL_S:
        return _overview_cache["data"]

    roots_out: List[Dict[str, Any]] = []
    recent: List[Dict[str, Any]] = []  # min-heap of (mtime, idx, entry), size ≤ 20
    import heapq

    for root in load_config()["roots"]:
        root_path = Path(root["path"])
        if not root_path.is_dir():
            roots_out.append({
                "name": root["name"], "path": root["path"],
                "total_size": 0, "file_count": 0, "branches": [],
            })
            continue
        branch_stats: Dict[str, Dict[str, Any]] = {}
        total_size = 0
        file_count = 0
        for dirpath, dirnames, filenames in os.walk(root_path):
            # Never descend into the library's own working dir (index/cache)
            # or hidden directories.
            dirnames[:] = [
                d for d in dirnames
                if not _is_hidden(d)
                and not _in_library_home(Path(dirpath) / d)
            ]
            # Prune disabled branches at the top level.
            if Path(dirpath) == root_path:
                dirnames[:] = [
                    d for d in dirnames
                    if branch_policy(root, d)["enabled"]
                ]
            for name in filenames:
                if _is_hidden(name):
                    continue
                full = Path(dirpath) / name
                try:
                    st = full.stat()
                except OSError:
                    continue
                total_size += st.st_size
                file_count += 1
                rel = os.path.relpath(dirpath, root["path"])
                branch = rel.split(os.sep, 1)[0] if rel != "." else "(root)"
                bs = branch_stats.setdefault(branch, {
                    "name": branch, "size": 0, "file_count": 0, "ext_stats": {},
                })
                bs["size"] += st.st_size
                bs["file_count"] += 1
                ext = ext_of(full)
                if ext:
                    bs["ext_stats"][ext] = bs["ext_stats"].get(ext, 0) + 1
                item = (st.st_mtime, file_count, {
                    "name": name, "path": str(full),
                    "mtime": st.st_mtime, "size": st.st_size,
                })
                if len(recent) < 20:
                    heapq.heappush(recent, item)
                elif item[0] > recent[0][0]:
                    heapq.heapreplace(recent, item)
        roots_out.append({
            "name": root["name"],
            "path": root["path"],
            "total_size": total_size,
            "file_count": file_count,
            "branches": sorted(branch_stats.values(),
                               key=lambda b: b["size"], reverse=True),
        })

    data = {
        "roots": roots_out,
        "recent": [entry for _mtime, _i, entry in
                   sorted(recent, key=lambda t: t[0], reverse=True)],
    }
    _overview_cache["at"] = now
    _overview_cache["data"] = data
    return data


def search_files(query: str, limit: int = 50) -> List[Dict[str, Any]]:
    """Case-insensitive filename substring search across enabled roots."""
    needle = query.lower()
    results: List[Dict[str, Any]] = []
    for root in load_config()["roots"]:
        root_path = Path(root["path"])
        if not root_path.is_dir():
            continue
        for dirpath, dirnames, filenames in os.walk(root_path):
            # Never descend into the library's own working dir (index/cache)
            # or hidden directories.
            dirnames[:] = [
                d for d in dirnames
                if not _is_hidden(d)
                and not _in_library_home(Path(dirpath) / d)
            ]
            if Path(dirpath) == root_path:
                dirnames[:] = [
                    d for d in dirnames
                    if branch_policy(root, d)["enabled"]
                ]
            for name in filenames:
                if _is_hidden(name) or needle not in name.lower():
                    continue
                full = Path(dirpath) / name
                try:
                    branch = _branch_of(root["path"], full)
                    results.append(file_entry(full, branch_policy(root, branch)))
                except OSError:
                    continue
                if len(results) >= limit:
                    return results
    return results


# ---------------------------------------------------------------------------
# Feed roots (信息源) — aggregated view over information-source trees
# ---------------------------------------------------------------------------
#
# A feed root holds one subdirectory per source (e.g. ``arxiv-cs.AI``),
# each filled with dated markdown items carrying YAML frontmatter
# (title/authors/link/pub_date/status/tags); ``.md`` files directly under the
# feed root are collected under the fixed source name ``(root)``.
# ``list_feed`` walks the root, parses just the frontmatter block of every
# item, and overlays the reading state kept in ``feed_state`` — the source
# files themselves are never modified, so the fetch scripts stay the single
# writer.
#
# A directory becomes a feed root either via a branch-level ``type: feed``
# policy (hand-written in library.yaml; the only form that can carry a
# ``notes`` policy) or via the top-level ``feed_dirs`` list (marked from the
# dashboard; no notes). ``feed_root_of`` is the single predicate both the
# routes and the note/status handlers use, so the two forms never drift.

FEED_STATUSES = ("待读", "在读", "已读")

# Only the frontmatter block is parsed; items never need a full read.
_FEED_HEAD_BYTES = 4096

# Frontmatter walks re-read hundreds of small files; keep a short-lived
# per-branch cache (bumped TTL matches the other listing caches).
_feed_cache: Dict[str, Tuple[float, Dict[str, Any]]] = {}
_FEED_CACHE_TTL_S = 30.0


def _parse_feed_frontmatter(path: Path) -> Dict[str, Any]:
    """YAML frontmatter of a feed item, or {} when absent/unparseable."""
    try:
        with open(path, "r", encoding="utf-8", errors="replace") as fh:
            head = fh.read(_FEED_HEAD_BYTES)
    except OSError:
        return {}
    if not head.startswith("---"):
        return {}
    end = head.find("\n---", 3)
    if end == -1:
        return {}
    try:
        data = yaml.safe_load(head[3:end])
    except yaml.YAMLError:
        return {}
    return data if isinstance(data, dict) else {}


def _feed_date(name: str, meta: Dict[str, Any]) -> str:
    """Item date: ``YYYY-MM-DD`` filename prefix wins, else created/pub_date."""
    if len(name) >= 10 and name[4] == "-" and name[7] == "-":
        return name[:10]
    for key in ("created", "pub_date"):
        raw = str(meta.get(key) or "")
        if len(raw) >= 10 and raw[4] == "-" and raw[7] == "-":
            return raw[:10]
    return ""


def _feed_state_map() -> Dict[str, str]:
    with _connect() as conn:
        rows = conn.execute("SELECT abs_path, status FROM feed_state").fetchall()
    return {row["abs_path"]: row["status"] for row in rows}


def _feed_note_map() -> Dict[str, str]:
    """feed item abs_path → bound note path (only when the note still exists)."""
    with _connect() as conn:
        rows = conn.execute("SELECT abs_path, note_path FROM feed_notes").fetchall()
    return {
        row["abs_path"]: row["note_path"]
        for row in rows
        if Path(row["note_path"]).is_file()
    }


def feed_root_of(
    resolved: Path,
    root: Dict[str, Any],
    policy: Dict[str, Any],
    branch: Optional[str],
) -> Optional[Dict[str, Any]]:
    """Feed-root descriptor when ``resolved`` IS an information-source root.

    ``root``/``policy``/``branch`` come from ``resolve_enrolled``. Returns
    ``{"path", "origin", "branch", "root", "policy", "notes_enabled"}`` or
    None. Two origins, unioned:

      * ``branch`` — the path is exactly a branch root whose policy is
        ``type: feed`` (notes come from the branch policy);
      * ``dir``   — the path is listed in the top-level ``feed_dirs``
        (never has notes).
    """
    if branch is not None and policy.get("type") == "feed":
        if resolved == Path(root["path"]) / branch:
            return {
                "path": str(resolved),
                "origin": "branch",
                "branch": branch,
                "root": root,
                "policy": policy,
                "notes_enabled": bool(policy.get("notes")),
            }
    if str(resolved) in load_config()["feed_dirs"]:
        return {
            "path": str(resolved),
            "origin": "dir",
            "branch": None,
            "root": root,
            "policy": policy,
            "notes_enabled": False,
        }
    return None


def feed_root_containing(resolved: Path) -> Optional[str]:
    """The feed root whose tree contains ``resolved`` (itself included).

    Used by the status/note write paths: an item's reading state may change
    wherever it sits inside ANY feed root (branch-level or feed_dirs).
    """
    s = str(resolved)
    cfg = load_config()
    for feed_dir in cfg["feed_dirs"]:
        if s == feed_dir or s.startswith(feed_dir + os.sep):
            return feed_dir
    for root in cfg["roots"]:
        for name, policy in root["branches"].items():
            if policy.get("type") != "feed":
                continue
            branch_path = root["path"] + os.sep + name
            if s == branch_path or s.startswith(branch_path + os.sep):
                return branch_path
    return None


def list_feed(feed_path: Path, branch: Optional[str] = None,
              notes_enabled: bool = False) -> Dict[str, Any]:
    """Aggregated item list for a feed root, plus per-source/status stats.

    Every ``.md`` file under the root becomes an item; its source is the
    first-level subdirectory name (``(root)`` for files directly under the
    feed root). Items are sorted by date desc, then title. ``branch`` is the
    branch name for branch-level feeds (None for feed_dirs feeds) and
    ``notes_enabled`` tells the frontend whether to offer 条目笔记.
    """
    cache_key = str(feed_path)
    now = time.time()
    cached = _feed_cache.get(cache_key)
    if cached and now - cached[0] < _FEED_CACHE_TTL_S:
        return cached[1]

    states = _feed_state_map()
    notes = _feed_note_map()
    items: List[Dict[str, Any]] = []
    for dirpath, dirnames, filenames in os.walk(feed_path):
        dirnames[:] = [d for d in dirnames if not _is_hidden(d)]
        rel = os.path.relpath(dirpath, str(feed_path))
        source = rel.split(os.sep, 1)[0] if rel != "." else "(root)"
        for name in filenames:
            if _is_hidden(name) or ext_of(Path(name)) not in _MD_EXTS:
                continue
            full = Path(dirpath) / name
            try:
                st = full.stat()
            except OSError:
                continue
            meta = _parse_feed_frontmatter(full)
            status = states.get(str(full)) or str(meta.get("status") or "") or "待读"
            items.append({
                "name": name,
                "path": str(full),
                "size": st.st_size,
                "mtime": st.st_mtime,
                "source": source,
                "title": str(meta.get("title") or Path(name).stem),
                "authors": str(meta.get("authors") or ""),
                "category": str(meta.get("category") or ""),
                "link": str(meta.get("link") or ""),
                "date": _feed_date(name, meta),
                "status": status,
                "tags": str(meta.get("tags") or ""),
                "note_path": notes.get(str(full)),
            })
    items.sort(key=lambda it: (it["date"], it["title"].lower()), reverse=True)

    status_stats: Dict[str, int] = {}
    source_stats: Dict[str, int] = {}
    for it in items:
        status_stats[it["status"]] = status_stats.get(it["status"], 0) + 1
        source_stats[it["source"]] = source_stats.get(it["source"], 0) + 1

    data = {
        "path": str(feed_path),
        "branch": branch,
        "notes_enabled": notes_enabled,
        "statuses": list(FEED_STATUSES),
        "items": items,
        "stats": {
            "total": len(items),
            "by_status": status_stats,
            "by_source": source_stats,
        },
    }
    _feed_cache[cache_key] = (now, data)
    return data


def set_feed_status(abs_path: Path, status: str) -> Dict[str, Any]:
    """Record the reading state of one feed item (index.db only, never the
    source file). Bumps the feed cache so the next listing reflects it."""
    if status not in FEED_STATUSES:
        raise ValueError(f"unknown feed status: {status}")
    with _connect() as conn:
        conn.execute(
            "INSERT INTO feed_state (abs_path, status, updated_at) VALUES (?,?,?)"
            " ON CONFLICT(abs_path) DO UPDATE SET status = excluded.status,"
            " updated_at = excluded.updated_at",
            (str(abs_path), status, time.time()),
        )
    for key, (at, data) in list(_feed_cache.items()):
        for it in data["items"]:
            if it["path"] == str(abs_path):
                old = it["status"]
                it["status"] = status
                by_status = data["stats"]["by_status"]
                by_status[old] = by_status.get(old, 1) - 1
                if by_status[old] <= 0:
                    by_status.pop(old, None)
                by_status[status] = by_status.get(status, 0) + 1
                break
        _feed_cache[key] = (at, data)
    return {"path": str(abs_path), "status": status}


# ---------------------------------------------------------------------------
# feed_dirs — marking enrolled directories as information sources
# ---------------------------------------------------------------------------

def _read_raw_config() -> Dict[str, Any]:
    """Raw library.yaml as a dict (unlike ``load_config``, un-normalised —
    unknown top-level keys are preserved on write)."""
    ensure_layout()
    try:
        raw = yaml.safe_load(_config_path().read_text(encoding="utf-8"))
    except (OSError, yaml.YAMLError):
        raw = None
    return raw if isinstance(raw, dict) else {}


def _write_config(raw: Dict[str, Any]) -> None:
    """Atomically rewrite library.yaml (temp file + rename in the same dir)."""
    cfg = _config_path()
    tmp = cfg.with_name(cfg.name + ".tmp")
    tmp.write_text(
        yaml.safe_dump(raw, allow_unicode=True, sort_keys=False),
        encoding="utf-8",
    )
    os.replace(tmp, cfg)


def mark_feed_dir(path: str) -> Dict[str, Any]:
    """Mark an enrolled directory as an information-source root (feed_dirs).

    The path must resolve inside an enabled enrolled root (LibraryAccessError
    → 403) and be a directory (ValueError → 400). Idempotent: already-listed
    paths report ``marked: False``. A branch-level ``type: feed`` root needs
    no mark — marking one is a ValueError.
    """
    resolved, root, policy, branch = resolve_enrolled(path)
    if not resolved.is_dir():
        raise ValueError(f"not a directory: {resolved}")
    if (branch is not None and policy.get("type") == "feed"
            and resolved == Path(root["path"]) / branch):
        raise ValueError("path is already a feed via its branch policy")
    raw = _read_raw_config()
    feed_dirs = raw.get("feed_dirs")
    if not isinstance(feed_dirs, list):
        feed_dirs = []
    key = str(resolved)
    if key in feed_dirs:
        return {"marked": False, "path": key, "feed_dirs": feed_dirs}
    feed_dirs.append(key)
    raw["feed_dirs"] = feed_dirs
    _write_config(raw)
    _invalidate_list_caches()
    return {"marked": True, "path": key, "feed_dirs": feed_dirs}


def unmark_feed_dir(path: str) -> Dict[str, Any]:
    """Remove a directory from ``feed_dirs`` (idempotent).

    Never touches the recorded reading state — ``feed_state`` rows are keyed
    by absolute path and survive unmarking, so re-marking restores them.
    """
    resolved, _root, _policy, _branch = resolve_enrolled(path)
    raw = _read_raw_config()
    feed_dirs = raw.get("feed_dirs")
    if not isinstance(feed_dirs, list):
        feed_dirs = []
    key = str(resolved)
    if key not in feed_dirs:
        return {"unmarked": False, "path": key, "feed_dirs": feed_dirs}
    feed_dirs.remove(key)
    raw["feed_dirs"] = feed_dirs
    _write_config(raw)
    _invalidate_list_caches()
    return {"unmarked": True, "path": key, "feed_dirs": feed_dirs}



# ---------------------------------------------------------------------------
# Paper notes — the library's single writable area
# ---------------------------------------------------------------------------
#
# Feed branches may declare a ``notes`` policy (dir + template). Notes are the
# only files the library ever writes: source feed items stay read-only, the
# binding between an item and its note lives in ``feed_notes``, and the
# ``[[wiki-link]]`` graph extracted on every save lives in ``note_links``.

# [[target]] wiki-links inside note bodies.
_WIKILINK_RE = re.compile(r"\[\[([^\[\]\n]+)\]\]")

# Characters that must never reach a note filename (path separators, Windows
# reserved characters, control characters).
_BAD_NOTE_NAME_RE = re.compile(r'[/\\:*?"<>|\x00-\x1f]')

_NOTE_NAME_MAX_CHARS = 80


def _notes_dirs() -> List[Path]:
    """All configured notes dirs across every root/branch, resolved + deduped."""
    dirs: List[Path] = []
    seen = set()
    for root in load_config()["roots"]:
        for policy in root["branches"].values():
            notes = policy.get("notes")
            if not notes or not notes.get("dir"):
                continue
            d = str(Path(notes["dir"]).resolve())
            if d not in seen:
                seen.add(d)
                dirs.append(Path(d))
    return dirs


def _notes_dir_of(resolved: Path) -> Optional[Path]:
    """The configured notes dir containing ``resolved``, or None."""
    s = str(resolved)
    for d in _notes_dirs():
        if s.startswith(str(d) + os.sep):
            return d
    return None


def _require_notes_file(path) -> Path:
    """Resolve ``path`` and confine it to a configured notes dir (``.md`` only).

    Raises ``LibraryAccessError`` for anything outside a notes dir or not a
    markdown file — callers map this to HTTP 403.
    """
    try:
        resolved = Path(path).resolve()
    except (OSError, RuntimeError) as exc:
        raise LibraryAccessError(f"unresolvable path: {exc}")
    if resolved.suffix.lower() != ".md":
        raise LibraryAccessError("not a markdown note")
    if _notes_dir_of(resolved) is None:
        raise LibraryAccessError("path is outside all notes directories")
    return resolved


def _feed_year(name: str, meta: Dict[str, Any]) -> str:
    """4-digit year: ``pub_date`` frontmatter wins, else the filename prefix."""
    for raw in (str(meta.get("pub_date") or ""), name):
        if len(raw) >= 4 and raw[:4].isdigit():
            return raw[:4]
    return ""


def _note_stem(title: str) -> str:
    """Filesystem-safe note filename stem derived from the item title."""
    stem = _BAD_NOTE_NAME_RE.sub("", title).strip()
    stem = stem[:_NOTE_NAME_MAX_CHARS].strip()
    return stem or "未命名"


def create_feed_note(abs_path: Path) -> Dict[str, Any]:
    """Create (or look up) the paper note bound to a feed item.

    The item's branch must be ``type: feed`` with a ``notes`` policy, otherwise
    ``ValueError``. An existing binding whose note file is still present is
    returned unchanged (``created: False``); a new note is rendered from the
    branch template with the item's frontmatter, bound in ``feed_notes``, and
    the feed cache is bumped so the next listing carries ``note_path``.
    """
    resolved, root, policy, branch = resolve_enrolled(str(abs_path))
    if branch is None or policy.get("type") != "feed":
        raise ValueError("not a feed branch")
    notes_cfg = policy.get("notes")
    if not notes_cfg:
        raise ValueError("feed branch has no notes directory configured")
    template_path = notes_cfg.get("template")
    if not template_path or not Path(template_path).is_file():
        raise ValueError("notes template is not configured or missing")

    key = str(resolved)
    with _connect() as conn:
        row = conn.execute(
            "SELECT note_path FROM feed_notes WHERE abs_path = ?", (key,)
        ).fetchone()
    if row is not None and Path(row["note_path"]).is_file():
        return {"note_path": row["note_path"], "created": False}

    meta = _parse_feed_frontmatter(resolved)
    title = str(meta.get("title") or resolved.stem)
    authors = meta.get("authors")
    if isinstance(authors, list):
        authors_str = "、".join(str(a) for a in authors)
    else:
        authors_str = str(authors or "")
    branch_path = Path(root["path"]) / branch
    rel = os.path.relpath(str(resolved.parent), str(branch_path))
    source = rel.split(os.sep, 1)[0] if rel != "." else "(root)"

    body = Path(template_path).read_text(encoding="utf-8")
    for placeholder, value in (
        ("title", title),
        ("authors", authors_str),
        ("source", source),
        ("link", str(meta.get("link") or "")),
        ("year", _feed_year(resolved.name, meta)),
    ):
        body = body.replace("{{" + placeholder + "}}", value)

    notes_dir = Path(notes_cfg["dir"])
    notes_dir.mkdir(parents=True, exist_ok=True)
    stem = _note_stem(title)
    with _connect() as conn:
        taken = {
            r["note_path"]
            for r in conn.execute("SELECT note_path FROM feed_notes").fetchall()
        }
    candidate = notes_dir / f"{stem}.md"
    suffix = 2
    while candidate.exists() or str(candidate) in taken:
        candidate = notes_dir / f"{stem}-{suffix}.md"
        suffix += 1
    candidate.write_text(body, encoding="utf-8")

    with _connect() as conn:
        conn.execute(
            "INSERT INTO feed_notes (abs_path, note_path, created_at) VALUES (?,?,?)"
            " ON CONFLICT(abs_path) DO UPDATE SET note_path = excluded.note_path",
            (key, str(candidate), time.time()),
        )
    # Same in-place bump style as set_feed_status: patch cached items.
    for cache_key, (at, data) in list(_feed_cache.items()):
        for it in data["items"]:
            if it["path"] == key:
                it["note_path"] = str(candidate)
                break
        _feed_cache[cache_key] = (at, data)
    return {"note_path": str(candidate), "created": True}


def read_note(note_path) -> Dict[str, Any]:
    """Read a note's raw markdown (confined to a notes dir)."""
    resolved = _require_notes_file(note_path)
    if not resolved.is_file():
        raise FileNotFoundError(str(resolved))
    return {"path": str(resolved), "content": resolved.read_text(encoding="utf-8")}


def _resolve_link_target(notes_dir: Path, target: str) -> Optional[str]:
    candidate = notes_dir / f"{target}.md"
    return str(candidate) if candidate.is_file() else None


def save_note(note_path, content: str) -> Dict[str, Any]:
    """Overwrite a note and rebuild its wiki-link rows in ``note_links``.

    Targets are resolved against the notes dir holding the note
    (``<target>.md``); unresolved links keep ``resolved_path = NULL``.
    """
    resolved = _require_notes_file(note_path)
    resolved.write_text(content or "", encoding="utf-8")
    notes_dir = _notes_dir_of(resolved) or resolved.parent
    targets = [m.strip() for m in _WIKILINK_RE.findall(content or "") if m.strip()]
    outlinks = [
        {"target": t, "resolved_path": _resolve_link_target(notes_dir, t)}
        for t in dict.fromkeys(targets)
    ]
    with _connect() as conn:
        conn.execute("DELETE FROM note_links WHERE note_path = ?", (str(resolved),))
        conn.executemany(
            "INSERT INTO note_links (note_path, target, resolved_path) VALUES (?,?,?)",
            [(str(resolved), o["target"], o["resolved_path"]) for o in outlinks],
        )
    return {"ok": True, "outlinks": outlinks}


def note_links_for(path) -> Dict[str, Any]:
    """Outgoing and incoming wiki-links of a note.

    Outlinks come straight from the note's ``note_links`` rows; backlinks are
    every row whose ``resolved_path`` points at this note, titled by the
    linking note's filename stem.
    """
    resolved = _require_notes_file(path)
    if not resolved.is_file():
        raise FileNotFoundError(str(resolved))
    key = str(resolved)
    with _connect() as conn:
        out_rows = conn.execute(
            "SELECT target, resolved_path FROM note_links WHERE note_path = ?"
            " ORDER BY target",
            (key,),
        ).fetchall()
        back_rows = conn.execute(
            "SELECT note_path FROM note_links WHERE resolved_path = ?"
            " AND note_path != ? ORDER BY note_path",
            (key, key),
        ).fetchall()
    return {
        "outlinks": [
            {"target": r["target"], "resolved_path": r["resolved_path"]}
            for r in out_rows
        ],
        "backlinks": [
            {"note_path": r["note_path"], "title": Path(r["note_path"]).stem}
            for r in back_rows
        ],
    }


# ---------------------------------------------------------------------------
# File management (delete / rename / paste) — 写路径，全部过 resolve_enrolled
# ---------------------------------------------------------------------------

def _invalidate_list_caches() -> None:
    """清空目录统计 / 概览 / feed 的模块级缓存（每次写操作后调用）。"""
    _dir_stats_cache.clear()
    _overview_cache["at"] = 0.0
    _overview_cache["data"] = None
    _feed_cache.clear()


def _unique_dest(dest_dir: Path, name: str) -> Path:
    """目标目录内的不重名落点：重名时依次追加 ``-2``/``-3``/... 后缀。"""
    candidate = dest_dir / name
    if not candidate.exists():
        return candidate
    stem, suffix = os.path.splitext(name)
    n = 2
    while True:
        candidate = dest_dir / f"{stem}-{n}{suffix}"
        if not candidate.exists():
            return candidate
        n += 1


def _purge_index_rows(abs_path: Path) -> None:
    """删除某路径对应的 index 行与缓存产物。

    文件只清自身一行；目录连同子树一起清（``abs_path = ? OR LIKE 'p/%'``）。
    ``feed_notes`` 只删绑定行——笔记 md 本体不在被删路径下，保持不动。
    """
    key = str(abs_path)
    with _connect() as conn:
        rows = conn.execute(
            "SELECT rel_path, cache_path FROM cache_entries"
            " WHERE abs_path = ? OR abs_path LIKE ?",
            (key, key + "/%"),
        ).fetchall()
        for row in rows:
            # 与 sync_cache 同一写法：cache/<digest>/ 整目录回收；非常规
            # 位置（旧库遗留）只删产物文件本身，避免误删别人的目录。
            cache_dir = Path(row["cache_path"]).parent
            if cache_dir.parent == _cache_root():
                shutil.rmtree(cache_dir, ignore_errors=True)
            else:
                Path(row["cache_path"]).unlink(missing_ok=True)
        conn.execute(
            "DELETE FROM cache_entries WHERE abs_path = ? OR abs_path LIKE ?",
            (key, key + "/%"),
        )
        conn.execute(
            "DELETE FROM feed_state WHERE abs_path = ? OR abs_path LIKE ?",
            (key, key + "/%"),
        )
        conn.execute(
            "DELETE FROM feed_notes WHERE abs_path = ? OR abs_path LIKE ?",
            (key, key + "/%"),
        )


def delete_entries(paths: List[str]) -> Dict[str, Any]:
    """删除若干文件/目录（目录递归），并清理对应 index 行与缓存产物。"""
    deleted = 0
    for path in paths:
        resolved, _root, _policy, _branch = resolve_enrolled(path)
        if not resolved.exists():
            raise FileNotFoundError(str(resolved))
        if resolved.is_dir():
            shutil.rmtree(resolved)
        else:
            resolved.unlink()
        _purge_index_rows(resolved)
        deleted += 1
    _invalidate_list_caches()
    return {"deleted": deleted}


def rename_entry(path: str, new_name: str) -> Dict[str, Any]:
    """重命名（只改名字、不跨目录）。非法名或目标已存在 → ValueError。"""
    if (not new_name or "/" in new_name or new_name in {".", ".."}
            or new_name.startswith(".")):
        raise ValueError(f"invalid name: {new_name!r}")
    resolved, _root, _policy, _branch = resolve_enrolled(path)
    if not resolved.exists():
        raise FileNotFoundError(str(resolved))
    new_path = resolved.parent / new_name
    if new_path.exists():
        raise ValueError(f"target already exists: {new_path}")
    os.rename(resolved, new_path)
    _purge_index_rows(resolved)
    _invalidate_list_caches()
    return {"renamed": str(new_path)}


def paste_entries(paths: List[str], dest_dir: str, mode: str) -> Dict[str, Any]:
    """复制（copy）/ 移动（cut）若干条目到目标目录；重名自动加 ``-N`` 后缀。"""
    if mode not in ("copy", "cut"):
        raise ValueError(f"invalid mode: {mode!r}")
    dest, _root, _policy, _branch = resolve_enrolled(dest_dir)
    if not dest.is_dir():
        raise ValueError(f"destination is not a directory: {dest}")
    pasted = 0
    for path in paths:
        src, _r, _p, _b = resolve_enrolled(path)
        if not src.exists():
            raise FileNotFoundError(str(src))
        # 拒绝把目录放进自身或自己的子目录里（无限递归/自我覆盖）
        if dest == src or src in dest.parents:
            raise ValueError(f"cannot paste a directory into itself: {src}")
        target = _unique_dest(dest, src.name)
        if mode == "copy":
            if src.is_dir():
                shutil.copytree(src, target)
            else:
                shutil.copy2(src, target)
        else:
            shutil.move(str(src), str(target))
            _purge_index_rows(src)
        pasted += 1
    _invalidate_list_caches()
    return {"pasted": pasted}
