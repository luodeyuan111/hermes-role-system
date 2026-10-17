"""Named knowledge-bank tools backed by Hindsight."""

from .tools import (
    KNOWLEDGE_LIST_SCHEMA,
    KNOWLEDGE_QUERY_SCHEMA,
    KNOWLEDGE_RECORD_SCHEMA,
    _check_knowledge_available,
    _handle_knowledge_list,
    _handle_knowledge_query,
    _handle_knowledge_record,
)

_TOOLS = (
    ("knowledge_query", KNOWLEDGE_QUERY_SCHEMA, _handle_knowledge_query, "🔎"),
    ("knowledge_record", KNOWLEDGE_RECORD_SCHEMA, _handle_knowledge_record, "📝"),
    ("knowledge_list", KNOWLEDGE_LIST_SCHEMA, _handle_knowledge_list, "📚"),
)


def register(ctx) -> None:
    for name, schema, handler, emoji in _TOOLS:
        ctx.register_tool(
            name=name,
            toolset="knowledge",
            schema=schema,
            handler=handler,
            check_fn=_check_knowledge_available,
            emoji=emoji,
        )
