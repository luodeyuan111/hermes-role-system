"""Library dashboard plugin — backend API routes.

Mounted at /api/plugins/library/ by the dashboard plugin system (see
``_mount_plugin_api_routes`` in hermes_cli/web_server.py).

Extracted from the inline ``/api/library/*`` section that used to live in
hermes_cli/web_server.py (the 资料馆 routes). The indexing/conversion core
lives in ``library_core.py`` next to this file and stays free of any
``hermes_cli`` imports; this module is the thin FastAPI surface on top.

Plugin HTTP routes go through the dashboard's session-token auth middleware
just like core API routes — every ``/api/plugins/...`` request must present
the session bearer token (or the session cookie set when you load the
dashboard HTML). Unlike the old inline version, ``/preview`` and ``/thumb``
are NOT in the ``?token=`` query-param whitelist (plugins cannot extend
``_QUERY_TOKEN_API_PATHS``), so the frontend fetches them via authedFetch and
hands out blob object URLs instead of direct <img>/<iframe> URLs.
"""

from __future__ import annotations

import importlib.util
import mimetypes
import sys
import time
from pathlib import Path
from typing import Any, Dict, List, Optional, Tuple

from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
from pydantic import BaseModel
from starlette.concurrency import run_in_threadpool

# The dashboard's plugin loader imports this file by path
# (``importlib.util.spec_from_file_location``), so this module is not part of
# an importable package and cannot ``import library_core`` directly — load
# the core module from the same directory the same way. Registered in
# sys.modules so the module namespace stays reachable by name.
_CORE_PATH = Path(__file__).resolve().parent / "library_core.py"
_core_spec = importlib.util.spec_from_file_location(
    "hermes_dashboard_plugin_library_core", _CORE_PATH
)
if _core_spec is None or _core_spec.loader is None:  # pragma: no cover
    raise ImportError(f"cannot load library core from {_CORE_PATH}")
_library = importlib.util.module_from_spec(_core_spec)
sys.modules[_core_spec.name] = _library
_core_spec.loader.exec_module(_library)

router = APIRouter()


def _library_resolve(path: str) -> Tuple[Path, Dict[str, Any], Dict[str, bool], Optional[str]]:
    try:
        return _library.resolve_enrolled(path)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))


def _library_resolve_file(path: str) -> Tuple[Path, Dict[str, bool]]:
    resolved, _root, policy, _branch = _library_resolve(path)
    if not resolved.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    return resolved, policy


@router.get("/config")
async def library_config():
    cfg = await run_in_threadpool(_library.load_config)
    return {"roots": cfg["roots"], "feed_dirs": cfg["feed_dirs"]}


@router.get("/tree")
async def library_tree(path: str):
    resolved, root, _policy, _branch = _library_resolve(path)
    if not resolved.is_dir():
        raise HTTPException(status_code=400, detail="Path is not a directory")
    return await run_in_threadpool(_library.list_tree, root, resolved)


@router.get("/file")
async def library_file(path: str):
    resolved, policy = _library_resolve_file(path)
    entry = await run_in_threadpool(_library.file_entry, resolved, policy)
    entry["mime"] = mimetypes.guess_type(resolved.name)[0] or "application/octet-stream"
    entry["preview_cached"] = await run_in_threadpool(_library.preview_cached, resolved)
    return entry


@router.get("/preview")
async def library_preview(path: str):
    resolved, policy = _library_resolve_file(path)
    kind = _library.preview_kind(resolved, policy)
    if kind == "none":
        raise HTTPException(status_code=403, detail="Preview not allowed for this file")

    if kind in _library.DIRECT_KINDS:
        mime_type = mimetypes.guess_type(resolved.name)[0] or "application/octet-stream"
        if kind == "md":
            mime_type = "text/markdown; charset=utf-8"
        elif kind == "text":
            mime_type = "text/plain; charset=utf-8"
        return FileResponse(path=str(resolved), media_type=mime_type)

    # office → convert to pdf, with mtime+size-bound cache
    try:
        st = resolved.stat()
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"Could not stat file: {exc}")
    cached = await run_in_threadpool(
        _library.cache_hit, resolved, "pdf", st, "preview.pdf"
    )
    if cached is not None:
        return FileResponse(path=str(cached), media_type="application/pdf")
    try:
        pdf_path = await _library.convert_to_pdf(resolved)
    except RuntimeError as exc:
        raise HTTPException(status_code=502, detail=str(exc))
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Conversion failed: {exc}")
    return FileResponse(path=str(pdf_path), media_type="application/pdf")


@router.get("/thumb")
async def library_thumb(path: str, size: int = 320):
    resolved, policy = _library_resolve_file(path)
    kind = _library.preview_kind(resolved, policy)
    if kind != "image":
        raise HTTPException(status_code=403, detail="Thumbnails are only available for images")
    size = max(16, min(size, 2048))
    thumb_name = "thumb.jpg" if size == 320 else f"thumb_{size}.jpg"
    try:
        st = resolved.stat()
    except OSError as exc:
        raise HTTPException(status_code=500, detail=f"Could not stat file: {exc}")
    cached = await run_in_threadpool(
        _library.cache_hit, resolved, "thumb", st, thumb_name
    )
    if cached is not None:
        return FileResponse(path=str(cached), media_type="image/jpeg")
    try:
        thumb_path = await run_in_threadpool(_library.make_thumbnail, resolved, size)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Thumbnail failed: {exc}")
    return FileResponse(path=str(thumb_path), media_type="image/jpeg")


@router.get("/overview")
async def library_overview():
    return await run_in_threadpool(_library.build_overview)


@router.get("/search")
async def library_search(q: str, limit: int = 50):
    if not q.strip():
        return {"results": []}
    limit = max(1, min(limit, 200))
    results = await run_in_threadpool(_library.search_files, q, limit)
    return {"results": results}


@router.post("/sync")
async def library_sync():
    return await run_in_threadpool(_library.sync_cache)


@router.get("/feed")
async def library_feed(path: str):
    """Aggregated item view of an information-source root (信息源).

    A feed root is either a branch-level ``type: feed`` branch root or any
    directory listed in the top-level ``feed_dirs`` (see /feed/mark).
    """
    resolved, root, policy, branch = _library_resolve(path)
    if not resolved.is_dir():
        raise HTTPException(status_code=400, detail="Path is not a directory")
    info = await run_in_threadpool(
        _library.feed_root_of, resolved, root, policy, branch
    )
    if info is None:
        raise HTTPException(status_code=400, detail="Not a feed root")
    return await run_in_threadpool(
        _library.list_feed, resolved, info["branch"], info["notes_enabled"]
    )


class FeedMark(BaseModel):
    path: str


@router.post("/feed/mark")
async def library_feed_mark(payload: FeedMark):
    """Mark an enrolled directory as an information-source root (feed_dirs)."""
    try:
        return await run_in_threadpool(_library.mark_feed_dir, payload.path)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.post("/feed/unmark")
async def library_feed_unmark(payload: FeedMark):
    """Cancel a path's information-source mark (keeps recorded reading state).

    Works for both origins (reported as ``origin`` in the response): a
    ``feed_dirs`` entry is removed from the list; a branch-level
    ``type: feed`` root loses just the ``type`` key in library.yaml (its
    ``notes`` etc. are preserved — re-add ``type: feed`` to restore).
    """
    try:
        return await run_in_threadpool(_library.unmark_feed, payload.path)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))


class FeedStatusUpdate(BaseModel):
    path: str
    status: str


@router.post("/feed/status")
async def library_feed_status(payload: FeedStatusUpdate):
    """Set the reading state of a feed item (index.db only; source read-only)."""
    resolved, _root, _policy, _branch = _library_resolve(payload.path)
    if not resolved.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    inside = await run_in_threadpool(_library.feed_root_containing, resolved)
    if inside is None:
        raise HTTPException(status_code=400, detail="Not inside a feed root")
    try:
        return await run_in_threadpool(
            _library.set_feed_status, resolved, payload.status
        )
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


class FeedNoteCreate(BaseModel):
    path: str


@router.post("/feed/note")
async def library_feed_note(payload: FeedNoteCreate):
    """Create (or look up) the paper note bound to a feed item.

    Only branch-level ``type: feed`` roots can carry a notes configuration;
    feed_dirs-marked roots get a plain 400 (the frontend hides the button).
    """
    resolved, root, policy, branch = _library_resolve(payload.path)
    if not resolved.is_file():
        raise HTTPException(status_code=404, detail="File not found")
    if branch is None or policy.get("type") != "feed":
        raise HTTPException(
            status_code=400,
            detail="Feed root has no notes directory configured",
        )
    try:
        return await run_in_threadpool(_library.create_feed_note, resolved)
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))


@router.get("/note")
async def library_note_read(path: str):
    """Read a paper note (confined to a configured notes dir)."""
    _library_resolve(path)
    try:
        return await run_in_threadpool(_library.read_note, path)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Note not found")


class NoteSave(BaseModel):
    path: str
    content: str


@router.post("/note/save")
async def library_note_save(payload: NoteSave):
    """Overwrite a paper note and rebuild its wiki-link index rows."""
    _library_resolve(payload.path)
    try:
        return await run_in_threadpool(
            _library.save_note, payload.path, payload.content
        )
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))


@router.get("/note/links")
async def library_note_links(path: str):
    """Outgoing + incoming wiki-links of a paper note."""
    _library_resolve(path)
    try:
        return await run_in_threadpool(_library.note_links_for, path)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Note not found")


# ---------------------------------------------------------------------------
# 资料馆文件管理（写路径）：删除 / 重命名 / 粘贴 / 转发到对话。
# 与上面的读路径同一套约束——每个路径都先过 resolve_enrolled（越界 403），
# ValueError → 400、FileNotFoundError → 404。
# ---------------------------------------------------------------------------

class LibraryDelete(BaseModel):
    paths: List[str]


class LibraryRename(BaseModel):
    path: str
    new_name: str


class LibraryPaste(BaseModel):
    paths: List[str]
    dest_dir: str
    mode: str


class LibraryForward(BaseModel):
    path: str
    session_id: str
    note: str = ""


@router.post("/file/delete")
async def library_file_delete(payload: LibraryDelete):
    """删除若干文件/目录（目录递归），并回收其 index 行与缓存产物。"""
    try:
        return await run_in_threadpool(_library.delete_entries, payload.paths)
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/file/rename")
async def library_file_rename(payload: LibraryRename):
    """重命名单个条目（只改名字、不跨目录）。"""
    try:
        return await run_in_threadpool(
            _library.rename_entry, payload.path, payload.new_name
        )
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


@router.post("/file/paste")
async def library_file_paste(payload: LibraryPaste):
    """把若干条目复制（copy）/ 移动（cut）到目标目录，重名自动加 -N 后缀。"""
    try:
        return await run_in_threadpool(
            _library.paste_entries, payload.paths, payload.dest_dir, payload.mode
        )
    except _library.LibraryAccessError as exc:
        raise HTTPException(status_code=403, detail=str(exc))
    except ValueError as exc:
        raise HTTPException(status_code=400, detail=str(exc))
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))


# 转发时走 image.attach 的扩展名（与 cli._IMAGE_EXTENSIONS 的常用子集一致）
_FORWARD_IMAGE_EXTS = frozenset({"png", "jpg", "jpeg", "gif", "webp", "bmp"})


class _SinkTransport:
    """转发调用的捕获型 transport。

    事件帧没有真正的 WS 客户端可投递，存下来只为读回 session.resume 的
    响应——resume 返回的是**活会话 id**（与 DB 里的 session_key 不同），
    后续 image.attach / prompt.submit 必须用它，否则 4001 session not found。
    """

    def __init__(self) -> None:
        self.frames: List[dict] = []

    def write(self, obj: dict) -> bool:
        self.frames.append(obj)
        return True

    def close(self) -> None:
        return None


def _library_forward_dispatch(session_id: str, resolved: Path, text: str) -> None:
    """把文件经 JSON-RPC 转发进 TUI 会话：resume → (image.attach) → prompt.submit。

    session.resume 是长 handler，dispatch 同步返回 None，响应由 worker 异步
    写进 sink；轮询取回活会话 id 后再提交 prompt。

    注意：``tui_gateway.server.dispatch`` 是进程内私有契约（gateway 并非
    插件公开 API）——hermes 升级时需复查该函数签名与此处的帧格式假设。
    """
    from tui_gateway import server as _gw

    sink = _SinkTransport()
    _gw.dispatch(
        {
            "jsonrpc": "2.0",
            "id": "lib-fwd-resume",
            "method": "session.resume",
            "params": {"session_id": session_id},
        },
        sink,
    )
    live_sid: Optional[str] = None
    deadline = time.monotonic() + 30.0
    while time.monotonic() < deadline:
        for frame in sink.frames:
            if frame.get("id") != "lib-fwd-resume":
                continue
            if "error" in frame:
                raise FileNotFoundError(f"session not found: {session_id}")
            live_sid = (frame.get("result") or {}).get("session_id")
            break
        if live_sid:
            break
        time.sleep(0.1)
    if not live_sid:
        raise FileNotFoundError(f"session not found: {session_id}")
    if _library.ext_of(resolved) in _FORWARD_IMAGE_EXTS:
        _gw.dispatch(
            {
                "jsonrpc": "2.0",
                "id": "lib-fwd-image",
                "method": "image.attach",
                "params": {"session_id": live_sid, "path": str(resolved)},
            },
            sink,
        )
    resp = _gw.dispatch(
        {
            "jsonrpc": "2.0",
            "id": "lib-fwd-prompt",
            "method": "prompt.submit",
            "params": {"session_id": live_sid, "text": text},
        },
        sink,
    )
    if isinstance(resp, dict) and "error" in resp:
        raise RuntimeError(str(resp["error"]))


@router.post("/file/forward")
async def library_file_forward(payload: LibraryForward):
    """把资料馆文件转发到某个对话会话：附路径文本（图片附带 image.attach）。"""
    resolved, _policy = _library_resolve_file(payload.path)
    # 会话存在性预检（与 /api/sessions/{id} 同一套 SessionDB 路径），
    # 不存在直接 404，不进 dispatch。
    #
    # 注意：``_open_session_db_for_profile`` 是 hermes_cli.web_server 的
    # 私有函数，并非插件公开契约——延迟 import 以免插件在 web_server
    # 之外的环境加载即崩，hermes 升级时需复查该私有契约是否仍成立。
    from hermes_cli import web_server as _ws

    # 上游 v0.20+ 给该函数加了必选关键字参数 read_only；旧版（含本仓库
    # 基线）没有。按运行环境的实际签名自适应，保证插件在新旧 hermes
    # 上都能跑。此处只做会话存在性预检（纯读），故传 read_only=True。
    import inspect as _inspect

    _open_db = _ws._open_session_db_for_profile
    if "read_only" in _inspect.signature(_open_db).parameters:
        db = _open_db(None, read_only=True)
    else:
        db = _open_db(None)
    try:
        sid = db.resolve_session_id(payload.session_id)
        session = db.get_session(sid) if sid else None
        if not session:
            raise HTTPException(status_code=404, detail="Session not found")
    finally:
        db.close()
    parts = []
    note = payload.note.strip()
    if note:
        parts.append(note)
    parts.append(f"已上传文件：{resolved}")
    text = "\n".join(parts)
    try:
        await run_in_threadpool(_library_forward_dispatch, sid, resolved, text)
    except FileNotFoundError as exc:
        raise HTTPException(status_code=404, detail=str(exc))
    return {"status": "submitted", "session_id": sid}
