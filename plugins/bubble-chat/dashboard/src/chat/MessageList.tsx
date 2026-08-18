/**
 * Scrollable message area for the bubble chat.
 *
 * Auto-scrolls to the bottom on new content only while the user is already
 * at (or near) the bottom; once they scroll up, a "回到底部" pill appears
 * instead of yanking the view around.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "./types";
import { cn } from "../sdk";

// Distance from the bottom (px) that still counts as "at the bottom".
const AT_BOTTOM_THRESHOLD = 80;

export function MessageList({
  messages,
  emptyHint,
  onRetry,
  onEdit,
}: {
  messages: ChatMessage[];
  emptyHint?: string;
  /** Bubble action: resubmit (user messages + the latest assistant reply). */
  onRetry?: (msg: ChatMessage) => void;
  /** Bubble action: refill the composer for editing (user messages). */
  onEdit?: (msg: ChatMessage) => void;
}) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const atBottomRef = useRef(true);
  const [atBottom, setAtBottom] = useState(true);

  const scrollToBottom = useCallback((smooth = false) => {
    const el = containerRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
  }, []);

  const onScroll = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const at =
      el.scrollHeight - el.scrollTop - el.clientHeight < AT_BOTTOM_THRESHOLD;
    atBottomRef.current = at;
    setAtBottom(at);
  }, []);

  // New message (or streaming growth): follow the tail only when the user
  // hasn't scrolled up into the backlog.
  useEffect(() => {
    if (atBottomRef.current) scrollToBottom();
  }, [messages, scrollToBottom]);

  // Retry is offered on every user message and on the latest assistant
  // reply (which resubmits the user text that prompted it).
  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].id;
    }
    return null;
  }, [messages]);

  return (
    <div className="relative min-h-0 flex-1">
      <div
        ref={containerRef}
        onScroll={onScroll}
        className="flex h-full flex-col gap-3 overflow-y-auto overflow-x-hidden py-3"
      >
        {messages.length === 0 ? (
          <div className="flex flex-1 items-center justify-center px-4 text-center text-sm text-text-tertiary">
            {emptyHint ?? "开始新的对话吧"}
          </div>
        ) : (
          messages.map((m) => (
            <MessageBubble
              key={m.id}
              msg={m}
              onRetry={
                onRetry && (m.role === "user" || m.id === lastAssistantId)
                  ? onRetry
                  : undefined
              }
              onEdit={onEdit && m.role === "user" ? onEdit : undefined}
            />
          ))
        )}
      </div>

      {!atBottom && (
        <button
          type="button"
          onClick={() => scrollToBottom(true)}
          className={cn(
            "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full",
            "border border-current/15 bg-background-base px-3 py-1.5",
            "text-xs text-text-secondary shadow-md",
            "cursor-pointer hover:text-foreground transition-colors",
          )}
        >
          <ArrowDown className="h-3.5 w-3.5" />
          回到底部
        </button>
      )}
    </div>
  );
}
