/**
 * BubbleChatPage — a native QQ/WeChat-style chat surface that talks to the
 * tui_gateway over the JSON-RPC WebSocket (/api/ws) directly. Shipped as the
 * `bubble-chat` dashboard plugin; its manifest `tab.override: "/chat"`
 * replaces the built-in terminal page on the /chat route.
 *
 * Lifecycle (plugin edition): all session state — the GatewayClient, the
 * live session id, the message list, streaming state — lives in the
 * module-level singleton `./store`. Plugin routes unmount on tab switches,
 * so this component only SUBSCRIBES on mount and unsubscribes on unmount;
 * the WebSocket and any in-flight turn keep running in the store, and a
 * remount restores the full view (including a still-streaming bubble).
 *
 *  - Mount: `attach({profile, resume})` records the desired conversation;
 *    the store connects the socket on first attach and runs the session
 *    lifecycle (history REST load + session.resume, or session.create).
 *  - `?resume=<id>` and `?profile=` are read from the URL via history-API
 *    helpers (`./router`) — the plugin bundle has no react-router context.
 */

import { useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { AlertCircle, PanelLeft, PanelLeftOpen, RefreshCw } from "lucide-react";

import { ChatSessionList } from "./ChatSessionList";
import {
  ChatBackgroundPicker,
  useAgentAvatar,
  useChatBackground,
} from "./chat/ChatBackground";
import { Composer } from "./chat/Composer";
import { MessageList } from "./chat/MessageList";
import { PendingPromptCard } from "./chat/PendingPromptCard";
import type { ChatMessage } from "./chat/types";
import { setResumeParam, useLocationSearch } from "./router";
import { Button, cn } from "./sdk";
import { Spinner } from "./shared/Spinner";
import { bubbleChatStore as store } from "./store";

export default function BubbleChatPage() {
  const searchParams = useLocationSearch();
  const resumeParam = searchParams.get("resume");
  // The management profile reaches the plugin through the `?profile=` URL
  // projection (ProfileProvider re-asserts it after every navigation, and
  // profile switches remount the route tree via ProfileKeyedRoutes).
  const scopedProfile = searchParams.get("profile") ?? "";

  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);

  /** Composer text injection (edit-refill, /undo prefill) — ephemeral UI
   *  state, deliberately NOT in the store. */
  const [inject, setInject] = useState<{ text: string; nonce: number }>();
  /** Mobile (<lg) session-list drawer. */
  const [drawerOpen, setDrawerOpen] = useState(false);
  /** Desktop (lg+) session-list sidebar fold, persisted browser-locally. */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("hermes.bubblechat.sidebarCollapsed") === "1",
  );
  /** Chat background setting (localStorage-backed, see ChatBackground). */
  const chatBg = useChatBackground();
  /** Custom assistant avatar (localStorage-backed, same pattern). */
  const agentAvatar = useAgentAvatar();

  /* ---------------------------------------------------------------- */
  /*  Attach: mount / conversation switch / profile switch / 新对话     */
  /* ---------------------------------------------------------------- */

  // Re-attaching the same key is a store-side no-op, so tab-switch remounts
  // keep the live session; a changed key starts the new session's lifecycle.
  // The store owns the socket — there is no cleanup here on purpose.
  useEffect(() => {
    store.attach({ profile: scopedProfile, resume: resumeParam });
  }, [scopedProfile, resumeParam, state.newChatNonce]);

  /* ---------------------------------------------------------------- */
  /*  Page-local actions (URL + composer injection glue)               */
  /* ---------------------------------------------------------------- */

  const startNewChat = useCallback(() => {
    setResumeParam(null);
    store.bumpNewChatNonce();
  }, []);

  const onPrefill = useCallback(
    (message: string) => setInject({ text: message, nonce: Date.now() }),
    [],
  );

  const send = useCallback(
    (text: string, images?: string[]) =>
      store.send(text, images, { onNew: startNewChat, onPrefill }),
    [startNewChat, onPrefill],
  );

  const retryMessage = useCallback(
    (msg: ChatMessage) =>
      store.retryMessage(msg, { onNew: startNewChat, onPrefill }),
    [startNewChat, onPrefill],
  );

  /** Bubble "edit": refill the composer with the message text. */
  const editMessage = useCallback((msg: ChatMessage) => {
    if (!msg.text) return;
    setInject({ text: msg.text, nonce: Date.now() });
  }, []);

  /** Session deleted from the side list: if it was the open conversation,
   * fall back to a fresh chat. */
  const handleSessionDeleted = useCallback(
    (id: string) => {
      if (id === resumeParam) startNewChat();
    },
    [resumeParam, startNewChat],
  );

  // Stable ref so the memoized ChatSessionList in the drawer can bail out.
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  /** Fold/unfold the desktop session sidebar (persists in localStorage). */
  const toggleSidebar = useCallback(() => {
    setSidebarCollapsed((v) => {
      const next = !v;
      try {
        localStorage.setItem("hermes.bubblechat.sidebarCollapsed", next ? "1" : "0");
      } catch {
        /* storage may be unavailable — session-only then */
      }
      return next;
    });
  }, []);

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const connected = state.connState === "open";
  const composerDisabled = !connected || !state.sessionReady;
  const draftKey = resumeParam ?? "new";

  return (
    // `hermes-bubble-chat` is the CSS scope anchor: build.mjs prefixes every
    // emitted plugin rule with it so plugin utilities can never restyle host
    // chrome (see the scopeCss comment in build.mjs).
    <div className="hermes-bubble-chat flex min-h-0 flex-1 gap-2 pb-2">
      {/* Conversation switcher — desktop only (mobile uses the drawer below). */}
      {sidebarCollapsed ? (
        <div
          className={cn(
            "hidden lg:flex w-10 shrink-0 min-h-0 flex-col items-center",
            "rounded-xl border border-current/10 py-2",
          )}
        >
          <Button
            ghost
            size="icon"
            onClick={toggleSidebar}
            aria-label="展开会话列表"
            title="展开会话列表"
            className="text-text-secondary hover:text-foreground"
          >
            <PanelLeftOpen />
          </Button>
        </div>
      ) : (
        <div
          className={cn(
            "hidden lg:flex w-60 shrink-0 min-h-0 flex-col",
            "rounded-xl border border-current/10 py-2",
          )}
        >
          <ChatSessionList
            activeSessionId={resumeParam}
            profile={scopedProfile}
            onNewChat={startNewChat}
            manageable
            onSessionDeleted={handleSessionDeleted}
            onCollapse={toggleSidebar}
          />
        </div>
      )}

      {/* Mobile session-list drawer (<lg). */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            aria-hidden
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-current/10 bg-background-base py-2 shadow-xl">
            <ChatSessionList
              activeSessionId={resumeParam}
              profile={scopedProfile}
              onNewChat={startNewChat}
              onPicked={closeDrawer}
              manageable
              onSessionDeleted={handleSessionDeleted}
            />
          </div>
        </div>
      )}

      <div className="flex min-w-0 min-h-0 flex-1 flex-col gap-2">
        {/* Header row: mobile drawer toggle (lg hides it) + 背景 picker. */}
        <div className="flex shrink-0 items-center">
          <span className="lg:hidden">
            <Button
              ghost
              size="icon"
              onClick={() => setDrawerOpen(true)}
              aria-label="会话列表"
              title="会话列表"
            >
              <PanelLeft />
            </Button>
          </span>
          <span className="ml-auto">
            <ChatBackgroundPicker bg={chatBg} profile={scopedProfile} avatar={agentAvatar} />
          </span>
        </div>

        {state.error && (
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 flex-1 wrap-break-word">{state.error}</span>
            <Button
              ghost
              size="icon"
              onClick={store.connectGateway}
              aria-label="重新连接"
              title="重新连接"
            >
              <RefreshCw />
            </Button>
          </div>
        )}

        {!connected && !state.error && (
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-current/10 bg-muted/40 px-3 py-2 text-xs text-text-secondary">
            <Spinner />
            {state.connState === "connecting" ? "正在连接网关…" : "连接已断开"}
            {state.connState === "closed" && (
              <Button ghost size="sm" onClick={store.connectGateway} prefix={<RefreshCw />}>
                重新连接
              </Button>
            )}
          </div>
        )}

        {/* Message area — the chat background applies here (bubbles keep
            their own backgrounds for readability); the dim overlay sits
            above the background but below the content. */}
        <div
          className="relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl"
          style={chatBg.style}
        >
          {chatBg.dim > 0 && (
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{ backgroundColor: `rgba(0, 0, 0, ${chatBg.dim / 100})` }}
            />
          )}
          {state.loadingHistory ? (
            <div className="flex min-h-0 flex-1 items-center justify-center gap-2 text-sm text-text-secondary">
              <Spinner /> 加载聊天记录…
            </div>
          ) : (
            <MessageList
              messages={state.messages}
              emptyHint={
                resumeParam ? "这个会话还没有消息" : "开始新的对话吧"
              }
              onRetry={retryMessage}
              onEdit={editMessage}
              agentAvatarUrl={agentAvatar.url}
            />
          )}
        </div>

        {state.statusText && (
          <div className="flex shrink-0 items-center gap-2 px-1 text-xs text-text-tertiary">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
            <span className="truncate">{state.statusText}</span>
          </div>
        )}

        {state.pendingPrompt && (
          <PendingPromptCard
            prompt={state.pendingPrompt}
            busy={state.promptBusy}
            onClarify={store.answerClarify}
            onApproval={store.answerApproval}
          />
        )}

        <Composer
          draftKey={draftKey}
          disabled={composerDisabled}
          generating={state.generating}
          busy={state.slashBusy}
          profile={scopedProfile}
          inject={inject}
          onSend={send}
          onInterrupt={store.interrupt}
          onAttachImage={store.attachImage}
        />
      </div>
    </div>
  );
}
