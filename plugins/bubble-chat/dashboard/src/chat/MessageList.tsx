/**
 * Scrollable message area for the bubble chat.
 *
 * Auto-scrolls to the bottom on new content only while the user is already
 * at (or near) the bottom; once they scroll up, a "回到底部" pill appears
 * instead of yanking the view around.
 */

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";

import { MessageBubble } from "./MessageBubble";
import type { ChatMessage } from "./types";
import { cn } from "../sdk";

// Distance from the bottom (px) that still counts as "at the bottom".
const AT_BOTTOM_THRESHOLD = 80;

// 渲染窗口：只挂载最近 N 条消息，更早的折叠到顶部「加载更早消息」按钮
// 后面——长对话全量挂载的 DOM 规模本身就会拖慢每一帧的布局/绘制。
const RENDER_WINDOW = 50;

export function MessageList({
  messages,
  emptyHint,
  onRetry,
  onEdit,
  agentAvatarUrl,
}: {
  messages: ChatMessage[];
  emptyHint?: string;
  /** Bubble action: resubmit (user messages + the latest assistant reply). */
  onRetry?: (msg: ChatMessage) => void;
  /** Bubble action: refill the composer for editing (user messages). */
  onEdit?: (msg: ChatMessage) => void;
  /** Custom assistant avatar URL (个性化设置), null/undefined = default icon. */
  agentAvatarUrl?: string | null;
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
  // hasn't scrolled up into the backlog. rAF-coalesced: scrollTo forces a
  // synchronous layout of the whole list, so even with the store's delta
  // batching (STREAM_FLUSH_MS) the follow-scroll stays at most one per frame.
  const scrollRafRef = useRef(0);
  useEffect(() => {
    if (!atBottomRef.current || scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      scrollRafRef.current = 0;
      scrollToBottom();
    });
  }, [messages, scrollToBottom]);
  useEffect(
    () => () => cancelAnimationFrame(scrollRafRef.current),
    [],
  );

  // Retry is offered on every user message and on the latest assistant
  // reply (which resubmits the user text that prompted it). Computed over
  // the FULL list — windowing below only limits what gets mounted.
  const lastAssistantId = useMemo(() => {
    for (let i = messages.length - 1; i >= 0; i--) {
      if (messages[i].role === "assistant") return messages[i].id;
    }
    return null;
  }, [messages]);

  // 窗口化：只渲染最近 windowSize 条；派生计算（上面的 lastAssistantId、
  // 空态判断）仍基于全量 messages。
  const [windowSize, setWindowSize] = useState(RENDER_WINDOW);
  const hiddenCount = Math.max(0, messages.length - windowSize);
  const visibleMessages =
    hiddenCount > 0 ? messages.slice(hiddenCount) : messages;

  // 向上扩展窗口前记录滚动锚点，渲染后把视口钉回原先读到的位置，
  // 避免 prepend 的更早消息把当前阅读位置顶跑。
  const prependAnchorRef = useRef<number | null>(null);
  const loadEarlier = useCallback(() => {
    const el = containerRef.current;
    if (el) prependAnchorRef.current = el.scrollHeight - el.scrollTop;
    setWindowSize((n) => n + RENDER_WINDOW);
  }, []);
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || prependAnchorRef.current == null) return;
    el.scrollTop = el.scrollHeight - prependAnchorRef.current;
    prependAnchorRef.current = null;
  }, [windowSize]);

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
          <>
            {hiddenCount > 0 && (
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={loadEarlier}
                  className={cn(
                    "rounded-full border border-current/15 bg-background-base px-3 py-1",
                    "text-xs text-text-secondary shadow-sm",
                    "cursor-pointer hover:text-foreground transition-colors",
                  )}
                >
                  加载更早消息（还有 {hiddenCount} 条）
                </button>
              </div>
            )}
            {visibleMessages.map((m) => (
              <MessageBubble
                key={m.id}
                msg={m}
                agentAvatarUrl={agentAvatarUrl}
                onRetry={
                  onRetry && (m.role === "user" || m.id === lastAssistantId)
                    ? onRetry
                    : undefined
                }
                onEdit={onEdit && m.role === "user" ? onEdit : undefined}
              />
            ))}
          </>
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
