"""shengsuan-tools plugin — bundled, auto-loaded.

Registers the user's ShengsuanYun (胜算云) self-built scripts as first-class
tools in the ``shengsuan`` toolset (R2.3):

- ``vision_analyze_ss`` — local image understanding via
  ``scripts/tools/vision.py`` (distinct from the built-in URL-based
  ``vision_analyze``).
- ``image_generate_ss`` — image generation via
  ``scripts/tools/generate.py`` (distinct from the built-in
  ``image_generate``).

Both are gated by ``_check_shengsuan_available``: without a credential
(``SHENGSHUAN_API_KEY`` env or ``scripts/tools/api_keys.json``) the tools
stay registered and visible in ``hermes tools`` but their schemas are
withheld from the model. Keys are resolved at call time and injected into
the script subprocess env — nothing is hardcoded here.
"""

from __future__ import annotations

from .tools import (
    IMAGE_GENERATE_SS_SCHEMA,
    VISION_ANALYZE_SS_SCHEMA,
    _check_shengsuan_available,
    _handle_image_generate_ss,
    _handle_vision_analyze_ss,
)

_TOOLS = (
    ("vision_analyze_ss", VISION_ANALYZE_SS_SCHEMA, _handle_vision_analyze_ss, "👁"),
    ("image_generate_ss", IMAGE_GENERATE_SS_SCHEMA, _handle_image_generate_ss, "🎨"),
)


def register(ctx) -> None:
    """Register all ShengsuanYun tools. Called once by the plugin loader."""
    for name, schema, handler, emoji in _TOOLS:
        ctx.register_tool(
            name=name,
            toolset="shengsuan",
            schema=schema,
            handler=handler,
            check_fn=_check_shengsuan_available,
            emoji=emoji,
        )
