"""胜算云 (ShengsuanYun) self-built script tools — schemas, handlers, gating.

Wraps the user's scripts under ``scripts/tools/`` (``vision.py`` for local
image understanding, ``generate.py`` for image generation via
doubao-seedream-4.0 / gpt-image-2) as first-class registered tools
(R2.3 — plugin form, no core toolsets.py change).

Naming: the ``_ss`` suffix keeps these distinct from the built-in
``vision_analyze`` (URL-based, configured-provider) and ``image_generate``
(core image_gen toolset) tools.

Credential resolution never hardcodes keys: ``SHENGSHUAN_API_KEY`` env var
first, then ``api_keys.json`` next to the scripts
(``shengsuanyun.api_key``). The resolved key is passed to the script
subprocess via env so the scripts themselves stay key-free.

Script location: profile-local ``$HERMES_HOME/scripts/tools/`` wins when
present; otherwise the shared default-profile ``~/.hermes/scripts/tools/``.
"""

from __future__ import annotations

import json
import os
import subprocess
import sys
from pathlib import Path
from typing import Any, Optional

from tools.registry import tool_error, tool_result

VISION_SCRIPT = "vision.py"
GENERATE_SCRIPT = "generate.py"

# Image generation is slow (task submit + poll); vision calls are quicker.
_VISION_TIMEOUT = 120
_GENERATE_TIMEOUT = 300


def _script_dir_candidates() -> list[Path]:
    """Candidate ``scripts/tools`` directories, most specific first."""
    candidates: list[Path] = []
    try:
        from hermes_constants import get_hermes_home

        candidates.append(get_hermes_home() / "scripts" / "tools")
    except Exception:
        pass
    try:
        from hermes_cli.profiles import _get_default_hermes_home

        candidates.append(_get_default_hermes_home() / "scripts" / "tools")
    except Exception:
        pass
    # De-dupe while preserving order (default profile: both are the same).
    seen: set[str] = set()
    unique: list[Path] = []
    for c in candidates:
        key = str(c)
        if key not in seen:
            seen.add(key)
            unique.append(c)
    return unique


def _find_script(filename: str) -> Optional[Path]:
    for directory in _script_dir_candidates():
        path = directory / filename
        if path.is_file():
            return path
    return None


def _load_api_key() -> str:
    """Resolve the ShengsuanYun key: env first, then api_keys.json."""
    val = os.environ.get("SHENGSHUAN_API_KEY", "").strip()
    if val:
        return val
    for directory in _script_dir_candidates():
        keys_file = directory / "api_keys.json"
        if not keys_file.is_file():
            continue
        try:
            data = json.loads(keys_file.read_text(encoding="utf-8"))
            key = str((data.get("shengsuanyun") or {}).get("api_key") or "").strip()
            if key:
                return key
        except Exception:
            continue
    return ""


def _check_shengsuan_available() -> bool:
    """check_fn gate: tools stay registered (visible in `hermes tools`) but
    the schema is withheld from the model when no credential is configured."""
    return bool(_load_api_key())


def _run_script(filename: str, argv: list[str], timeout: int) -> dict:
    """Run a scripts/tools script as a subprocess and parse its JSON stdout."""
    script = _find_script(filename)
    if script is None:
        return {"error": f"未找到脚本 {filename}（已查找 scripts/tools/ 候选目录）"}
    key = _load_api_key()
    if not key:
        return {
            "error": "缺少胜算云 API key：请设置 SHENGSHUAN_API_KEY 环境变量，"
            "或在 scripts/tools/api_keys.json 配置 shengsuanyun.api_key"
        }
    env = {
        **os.environ,
        "SHENGSHUAN_API_KEY": key,
        # vision.py honors VISION_API_KEY as an alias.
        "VISION_API_KEY": key,
    }
    try:
        proc = subprocess.run(
            [sys.executable, str(script), *argv],
            capture_output=True,
            text=True,
            timeout=timeout,
            env=env,
        )
    except subprocess.TimeoutExpired:
        return {"error": f"脚本 {filename} 执行超时（{timeout}s）"}
    except Exception as exc:
        return {"error": f"脚本 {filename} 启动失败: {exc}"}

    stdout = (proc.stdout or "").strip()
    try:
        result = json.loads(stdout) if stdout else {}
    except json.JSONDecodeError:
        result = {"output": stdout[:4000]}
    if proc.returncode != 0 and "error" not in result:
        result = {
            "error": (proc.stderr or "").strip()[:1000]
            or f"脚本 {filename} 退出码 {proc.returncode}",
            **({"output": stdout[:2000]} if stdout else {}),
        }
    return result


VISION_ANALYZE_SS_SCHEMA = {
    "name": "vision_analyze_ss",
    "description": (
        "Analyze a LOCAL image file with the ShengsuanYun multimodal model "
        "(scripts/tools/vision.py). Use this for files on disk; for image "
        "URLs use the built-in vision_analyze instead."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "image_path": {
                "type": "string",
                "description": "Absolute path to the local image file (png/jpg/gif/webp/bmp).",
            },
            "prompt": {
                "type": "string",
                "description": "What to ask about the image.",
            },
        },
        "required": ["image_path"],
    },
}

IMAGE_GENERATE_SS_SCHEMA = {
    "name": "image_generate_ss",
    "description": (
        "Generate an image via ShengsuanYun (scripts/tools/generate.py): "
        "model 'doubao' = bytedance/doubao-seedream-4.0, 'image2' = "
        "openai/gpt-image-2. Returns the generated image URL/path."
    ),
    "parameters": {
        "type": "object",
        "properties": {
            "prompt": {
                "type": "string",
                "description": "Text prompt describing the image to generate.",
            },
            "model": {
                "type": "string",
                "enum": ["doubao", "image2"],
                "description": "Backend model route (default: doubao).",
            },
            "size": {
                "type": "string",
                "description": "Image size, e.g. '1024x1024' (default per model).",
            },
        },
        "required": ["prompt"],
    },
}


def _handle_vision_analyze_ss(args: dict, **kw: Any) -> str:
    image_path = str(args.get("image_path") or "").strip()
    if not image_path:
        return tool_error("image_path is required")
    prompt = str(args.get("prompt") or "描述这张图片里有什么，用中文")
    result = _run_script(VISION_SCRIPT, [image_path, prompt], _VISION_TIMEOUT)
    if "error" in result:
        return tool_error(str(result["error"]))
    return tool_result(result)


def _handle_image_generate_ss(args: dict, **kw: Any) -> str:
    prompt = str(args.get("prompt") or "").strip()
    if not prompt:
        return tool_error("prompt is required")
    model = str(args.get("model") or "doubao").strip()
    argv = ["--model", model, prompt]
    size = str(args.get("size") or "").strip()
    if size:
        argv.append(size)
    result = _run_script(GENERATE_SCRIPT, argv, _GENERATE_TIMEOUT)
    if "error" in result:
        return tool_error(str(result["error"]))
    return tool_result(result)
