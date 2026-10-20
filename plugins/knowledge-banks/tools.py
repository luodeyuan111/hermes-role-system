"""Tools for querying and recording named Hindsight knowledge banks."""

from __future__ import annotations

import json
import os
from typing import Any
from urllib.parse import quote, urlparse

import requests

from hermes_constants import get_hermes_home
from tools.registry import tool_error

_CONFIG_NAME = "knowledge-banks.json"
_RESULT_FIELDS = (
    "id", "text", "type", "fact_type", "document_id", "metadata", "tags",
    "occurred_start", "occurred_end", "mentioned_at", "source_fact_ids", "scores",
)


def _load_config() -> dict[str, Any]:
    path = get_hermes_home() / _CONFIG_NAME
    if not path.is_file():
        return {}
    try:
        data = json.loads(path.read_text(encoding="utf-8"))
    except (OSError, json.JSONDecodeError):
        return {}
    return data if isinstance(data, dict) else {}


def _libraries() -> dict[str, Any]:
    libraries = _load_config().get("libraries")
    return libraries if isinstance(libraries, dict) else {}


def _check_knowledge_available() -> bool:
    config = _load_config()
    if not config.get("api_url"):
        return False
    for library in _libraries().values():
        if not isinstance(library, dict) or not library.get("bank_id"):
            continue
        if library.get("read", True) or library.get("write", False):
            return True
    return False


def _library(alias: Any, *, write: bool = False) -> tuple[str, dict[str, Any]]:
    name = str(alias or "").strip()
    libraries = _libraries()
    library = libraries.get(name)
    if not name or not isinstance(library, dict):
        available = ", ".join(sorted(libraries)) or "(none)"
        raise ValueError(f"Unknown knowledge library {name!r}; available: {available}")
    permission = "write" if write else "read"
    allowed = library.get(permission, False) if write else library.get(permission, True)
    if not allowed:
        raise PermissionError(f"Library {name!r} does not allow {permission}")
    bank_id = str(library.get("bank_id") or "").strip()
    if not bank_id:
        raise ValueError(f"Library {name!r} has no bank_id")
    return name, library


def _api_request(
    method: str,
    bank_id: str,
    endpoint: str,
    *,
    params: dict[str, Any] | None = None,
    payload: dict[str, Any] | None = None,
    timeout: int = 60,
) -> dict[str, Any]:
    config = _load_config()
    base_url = str(config.get("api_url") or "").rstrip("/")
    if not base_url:
        raise ValueError("knowledge-banks.json has no api_url")
    url = f"{base_url}/v1/default/banks/{quote(bank_id, safe='')}/{endpoint}"
    headers = {}
    key_env = str(config.get("api_key_env") or "").strip()
    if key_env and os.environ.get(key_env):
        headers["Authorization"] = f"Bearer {os.environ[key_env]}"
    try:
        with requests.Session() as session:
            if urlparse(base_url).hostname in {"127.0.0.1", "localhost", "::1"}:
                session.trust_env = False
            response = session.request(
                method, url, params=params, json=payload, headers=headers, timeout=timeout,
            )
    except requests.RequestException as exc:
        raise RuntimeError(f"Hindsight request failed: {exc}") from exc
    if response.status_code >= 400:
        try:
            detail = response.json().get("detail", response.text)
        except ValueError:
            detail = response.text
        raise RuntimeError(f"Hindsight HTTP {response.status_code}: {str(detail)[:1000]}")
    return response.json()


def _trim_result(item: dict[str, Any]) -> dict[str, Any]:
    return {key: item[key] for key in _RESULT_FIELDS if item.get(key) is not None}


def _metadata(raw: Any, library: str) -> dict[str, str]:
    if raw is None:
        raw = {}
    if not isinstance(raw, dict):
        raise ValueError("metadata must be an object")
    result = {}
    for key, value in raw.items():
        name = str(key).strip()
        if not name:
            continue
        if value is None:
            result[name] = ""
        elif isinstance(value, (str, int, float, bool)):
            result[name] = str(value)
        else:
            result[name] = json.dumps(value, ensure_ascii=False, separators=(",", ":"))
    result["library"] = library
    return result


def _tags(raw: Any) -> list[str]:
    if raw is None:
        return []
    if isinstance(raw, str):
        return [part.strip() for part in raw.split(",") if part.strip()]
    if not isinstance(raw, list):
        raise ValueError("tags must be an array of strings")
    return [str(tag).strip() for tag in raw if str(tag).strip()]


def _entities(raw: Any) -> list[dict[str, str]]:
    if raw is None:
        return []
    if not isinstance(raw, list):
        raise ValueError("entities must be an array of objects")
    result = []
    for item in raw:
        if not isinstance(item, dict) or not str(item.get("text") or "").strip():
            raise ValueError("each entity needs a non-empty text")
        entity = {"text": str(item["text"]).strip()}
        if item.get("type"):
            entity["type"] = str(item["type"]).strip()
        result.append(entity)
    return result


def _handle_knowledge_query(args: dict[str, Any], **kwargs) -> str:
    try:
        name, library = _library(args.get("library"))
        query = str(args.get("query") or "").strip()
        if not query:
            raise ValueError("query is required")
        limit = max(1, min(int(args.get("limit") or 6), 20))
        payload: dict[str, Any] = {
            "query": query,
            "budget": library.get("recall_budget", "low"),
            "max_tokens": int(library.get("recall_max_tokens", 2500)),
            "prefer_observations": True,
        }
        if library.get("recall_types"):
            payload["types"] = library["recall_types"]
        include_sources = bool(args.get("include_source_facts"))
        if include_sources:
            payload["include"] = {"source_facts": {}}
        data = _api_request("POST", library["bank_id"], "memories/recall", payload=payload)
        results = [_trim_result(item) for item in (data.get("results") or [])[:limit]]
        result: dict[str, Any] = {
            "success": True, "library": name, "count": len(results), "results": results,
        }
        if include_sources:
            result["source_facts"] = data.get("source_facts") or {}
        return json.dumps(result, ensure_ascii=False)
    except Exception as exc:
        return tool_error(str(exc))


def _merge_document_metadata(
    bank_id: str, document_id: str, new_metadata: dict[str, str],
) -> dict[str, str]:
    """Hindsight append reuses the latest item's metadata for the document."""
    merged = {}
    try:
        data = _api_request(
            "GET", bank_id, "memories/list",
            params={"document_id": document_id, "limit": 100},
        )
    except Exception:
        data = {}
    for entry in reversed(data.get("items") or []):
        metadata = entry.get("metadata")
        if isinstance(metadata, dict):
            merged.update(metadata)
    merged.update(new_metadata)
    return merged


def _handle_knowledge_record(args: dict[str, Any], **kwargs) -> str:
    try:
        name, library = _library(args.get("library"), write=True)
        content = args.get("content")
        if not isinstance(content, str) or not content.strip():
            raise ValueError("content is required")
        item: dict[str, Any] = {
            "content": content,
            "metadata": _metadata(args.get("metadata"), name),
            "update_mode": args.get("update_mode") or "append",
        }
        for key in ("context", "document_id", "timestamp"):
            if args.get(key) is not None:
                item[key] = str(args[key])
        tags = _tags(args.get("tags"))
        if tags:
            item["tags"] = tags
        entities = _entities(args.get("entities"))
        if entities:
            # Caller-supplied aliases (中文原名/拼音/英文) must stay literal so
            # BM25 and the embedding context gain every surface form.
            item["entities"] = entities
            item["resolve_entities"] = False
        if item.get("document_id") and item["update_mode"] == "append":
            item["metadata"] = _merge_document_metadata(
                library["bank_id"], item["document_id"], item["metadata"],
            )
        data = _api_request(
            "POST", library["bank_id"], "memories",
            payload={"items": [item], "async": True},
        )
        return json.dumps({
            "success": bool(data.get("success", True)),
            "library": name,
            "items_count": data.get("items_count", 1),
            "operation_id": data.get("operation_id"),
            "async": True,
        }, ensure_ascii=False)
    except Exception as exc:
        return tool_error(str(exc))


def _handle_knowledge_list(args: dict[str, Any], **kwargs) -> str:
    try:
        name, library = _library(args.get("library"))
        limit = max(1, min(int(args.get("limit") or 20), 100))
        offset = max(0, int(args.get("offset") or 0))
        params: dict[str, Any] = {"limit": limit, "offset": offset}
        if args.get("query"):
            params["q"] = str(args["query"])
        if args.get("fact_type"):
            params["type"] = str(args["fact_type"])
        data = _api_request(
            "GET", library["bank_id"], "memories/list", params=params,
        )
        items = [_trim_result(item) for item in (data.get("items") or [])]
        return json.dumps({
            "success": True,
            "library": name,
            "total": data.get("total", len(items)),
            "count": len(items),
            "items": items,
        }, ensure_ascii=False)
    except Exception as exc:
        return tool_error(str(exc))


KNOWLEDGE_QUERY_SCHEMA = {
    "name": "knowledge_query",
    "description": "Search a named knowledge library such as papers and return relevant records with source metadata. Use papers for literature, never as a general chat memory.",
    "parameters": {
        "type": "object",
        "properties": {
            "library": {"type": "string", "description": "Registered library alias, e.g. papers."},
            "query": {"type": "string", "description": "Concept, question, title, author, or keyword to search."},
            "limit": {"type": "integer", "description": "Maximum records to return (1-20, default 6)."},
            "include_source_facts": {"type": "boolean", "description": "Also include the raw facts behind consolidated observations."},
        },
        "required": ["library", "query"],
    },
}

KNOWLEDGE_RECORD_SCHEMA = {
    "name": "knowledge_record",
    "description": "Record a curated note into a named knowledge library. For papers include paper_id, title, authors, year, source URL/path, and page/section metadata when known.",
    "parameters": {
        "type": "object",
        "properties": {
            "library": {"type": "string", "description": "Registered library alias with write permission, e.g. papers."},
            "content": {"type": "string", "description": "Curated note or source content to retain."},
            "context": {"type": "string", "description": "Short context for the note."},
            "metadata": {"type": "object", "description": "Evidence metadata such as paper_id, title, authors, year, source, locator."},
            "tags": {"type": "array", "items": {"type": "string"}, "description": "Optional tags for filtering."},
            "entities": {"type": "array", "items": {"type": "object", "properties": {"text": {"type": "string"}, "type": {"type": "string"}}, "required": ["text"]}, "description": "Explicit entities/aliases. For Chinese names include original, pinyin and English forms; passed literally with resolve_entities=false."},
            "document_id": {"type": "string", "description": "Stable source document ID; reuse it for notes on the same document."},
            "update_mode": {"type": "string", "enum": ["append", "replace"], "description": "Append by default and merge existing document metadata; replace only when intentionally rebuilding a document."},
            "timestamp": {"type": "string", "description": "Optional ISO timestamp or 'unset' for timeless reference material."},
        },
        "required": ["library", "content"],
    },
}

KNOWLEDGE_LIST_SCHEMA = {
    "name": "knowledge_list",
    "description": "Inspect records in a named knowledge library, optionally filtered by full-text query or fact type.",
    "parameters": {
        "type": "object",
        "properties": {
            "library": {"type": "string", "description": "Registered library alias, e.g. papers."},
            "query": {"type": "string", "description": "Optional full-text filter."},
            "fact_type": {"type": "string", "enum": ["world", "experience", "observation"]},
            "limit": {"type": "integer", "description": "Maximum records (1-100, default 20)."},
            "offset": {"type": "integer", "description": "Pagination offset (default 0)."},
        },
        "required": ["library"],
    },
}
