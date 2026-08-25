"""
Pet plugin backend — read/write the hermes-desktop-pet config file.

The pet (a standalone Electron app) and this page share one source of truth:
~/.config/hermes-desktop-pet/config.json. The pet's main process watches the
file and hot-applies changes, so edits here take effect without a restart.
"""

import json
import os
import tempfile
from typing import Any, Dict, Optional

from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

CONFIG_DIR = os.path.expanduser("~/.config/hermes-desktop-pet")
CONFIG_PATH = os.path.join(CONFIG_DIR, "config.json")


def _read() -> Dict[str, Any]:
    try:
        with open(CONFIG_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)
        return data if isinstance(data, dict) else {}
    except Exception:
        return {}


def _write(cfg: Dict[str, Any]) -> None:
    os.makedirs(CONFIG_DIR, exist_ok=True)
    fd, tmp = tempfile.mkstemp(dir=CONFIG_DIR, prefix=".config.", suffix=".tmp")
    try:
        with os.fdopen(fd, "w", encoding="utf-8") as f:
            json.dump(cfg, f, ensure_ascii=False, indent=2)
        os.replace(tmp, CONFIG_PATH)
    except Exception:
        try:
            os.unlink(tmp)
        except OSError:
            pass
        raise


class PetConfigPatch(BaseModel):
    sessionId: Optional[str] = None
    avatarPath: Optional[str] = None
    ttsEnabled: Optional[bool] = None
    bubbleTtlSec: Optional[int] = None
    autoCollapse: Optional[bool] = None
    minimax: Optional[Dict[str, Optional[str]]] = None


@router.get("/config")
def get_config() -> Dict[str, Any]:
    return _read()


@router.put("/config")
def put_config(patch: PetConfigPatch) -> Dict[str, Any]:
    """Merge a (top-level) patch into the config; `minimax` merges per-key."""
    cfg = _read()
    data = patch.model_dump(exclude_unset=True)
    for key, value in data.items():
        if key == "minimax" and isinstance(value, dict):
            mm = dict(cfg.get("minimax") or {})
            for mk, mv in value.items():
                if mv is None:
                    mm.pop(mk, None)
                else:
                    mm[mk] = mv
            cfg["minimax"] = mm
        elif value is None:
            cfg.pop(key, None)
        else:
            cfg[key] = value
    _write(cfg)
    return cfg
