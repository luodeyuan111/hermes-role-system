/**
 * BubbleChatPage — a native QQ/WeChat-style chat surface that talks to the
 * tui_gateway over the JSON-RPC WebSocket (/api/ws) directly, replacing the
 * PTY + xterm.js terminal as the dashboard's /chat view.
 *
 * Lifecycle:
 *  - Mount: one page-level GatewayClient connects (loopback token or gated
 *    ticket, handled inside gatewayClient.connect).
 *  - `?resume=<id>` present → history loads from REST
 *    (/api/sessions/{id}/messages, `\x00json:` content decoded) and the
 *    session is resumed over WS so follow-up prompts continue the same
 *    conversation. Absent → `session.create` opens a fresh live session.
 *  - Streaming: message.start opens an assistant bubble, message.delta
 *    appends, message.complete finalises; reasoning/thinking deltas fold
 *    into a collapsible ReasoningBlock; tool.start/complete render compact
 *    tool cards; unknown event types degrade to grey system hints.
 *
 * Rendered by App.tsx as a persistent host (outside <Routes>, toggled with
 * display:none) so the WebSocket and live session survive tab switches.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { AlertCircle, PanelLeft, PanelLeftOpen, RefreshCw } from "lucide-react";
import { Button } from "@nous-research/ui/ui/components/button";
import { Spinner } from "@nous-research/ui/ui/components/spinner";

import { ChatSessionList } from "@/components/ChatSessionList";
import {
  ChatBackgroundPicker,
  useChatBackground,
} from "@/components/chat/ChatBackground";
import { Composer } from "@/components/chat/Composer";
import { MessageList } from "@/components/chat/MessageList";
import { PendingPromptCard } from "@/components/chat/PendingPromptCard";
import {
  decodeMessageContentParts,
  messageId,
  nowSeconds,
  type ChatMessage,
  type PendingPrompt,
} from "@/components/chat/types";
import { useProfileScope } from "@/contexts/useProfileScope";
import { api, type SessionMessage } from "@/lib/api";
import {
  GatewayClient,
  type ConnectionState,
  type GatewayEvent,
} from "@/lib/gatewayClient";
import { cn } from "@/lib/utils";

/** Result shapes for the gateway methods this page calls. */
interface SessionCreateResult {
  session_id: string;
}
interface SessionResumeResult {
  session_id: string;
  resumed?: string;
  running?: boolean;
}

/** Plain slash.exec worker result (see tui_gateway server.py @method slash.exec). */
interface SlashOutputResult {
  output?: string;
  warning?: string;
}

/** slash.exec routes skill/bundle/pending-input commands through
 * command.dispatch internally, so its response may be a typed directive
 * instead of {output} — same contract the Ink TUI handles in
 * createSlashHandler.ts (plus `prefill`, returned by /undo). */
type SlashDirective =
  | { type: "exec" | "plugin"; output?: string }
  | { type: "alias"; target: string }
  | { type: "skill"; name: string; message?: string }
  | { type: "send"; message: string; notice?: string }
  | { type: "prefill"; message?: string; notice?: string };

function asSlashDirective(raw: unknown): SlashDirective | null {
  if (!raw || typeof raw !== "object") return null;
  const r = raw as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v : undefined);
  switch (r.type) {
    case "exec":
    case "plugin":
      return { type: r.type, output: str(r.output) };
    case "alias":
      return typeof r.target === "string"
        ? { type: "alias", target: r.target }
        : null;
    case "skill":
      return typeof r.name === "string"
        ? { type: "skill", name: r.name, message: str(r.message) }
        : null;
    case "send":
      return typeof r.message === "string"
        ? { type: "send", message: r.message, notice: str(r.notice) }
        : null;
    case "prefill":
      return { type: "prefill", message: str(r.message), notice: str(r.notice) };
    default:
      return null;
  }
}

// Event types we deliberately consume or silently ignore — anything else
// degrades to a grey system hint instead of crashing the stream.
const IGNORED_EVENT_TYPES = new Set([
  "gateway.ready",
  "session.info",
  "tool.progress",
  "skin.changed",
]);

/** Parse a history tool_calls `arguments` JSON string for the card body. */
function parseToolArgs(raw: string | undefined): unknown {
  if (!raw) return undefined;
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
}

/** Stringify a tool.complete `result` payload for display. */
function stringifyToolResult(result: unknown): string | undefined {
  if (result == null) return undefined;
  if (typeof result === "string") return result;
  try {
    return JSON.stringify(result, null, 2);
  } catch {
    return String(result);
  }
}

/** Heuristic error detection on a tool.complete `result` payload. */
function isErrorResult(result: unknown): boolean {
  if (typeof result === "string") {
    return /^\s*(error[:\s]|错误[:：]|failed[:\s])/i.test(result);
  }
  if (result && typeof result === "object") {
    const err = (result as Record<string, unknown>).error;
    return typeof err === "string" ? err.trim().length > 0 : Boolean(err);
  }
  return false;
}

/** Map one stored history row to zero or more render messages. */
function historyToChatMessages(msg: SessionMessage, index: number): ChatMessage[] {
  const base = {
    timestamp: msg.timestamp ?? 0,
  };
  const out: ChatMessage[] = [];
  const { text, images } = decodeMessageContentParts(msg.content);

  if (msg.role === "tool") {
    // The row's content IS the tool result text.
    out.push({
      ...base,
      id: `h${index}`,
      role: "tool",
      text: "",
      toolName: msg.tool_name ?? "tool",
      toolRunning: false,
      toolCallId: msg.tool_call_id,
      toolResult: text || undefined,
    });
    return out;
  }

  out.push({
    ...base,
    id: `h${index}`,
    role: msg.role,
    text,
    images: images.length > 0 ? images : undefined,
  });

  // Assistant turns that issued tool calls get cards carrying the call
  // arguments; mergeToolCards below folds the matching role=tool result
  // rows into them so each call shows as one card.
  if (msg.role === "assistant" && msg.tool_calls) {
    msg.tool_calls.forEach((tc, i) => {
      out.push({
        ...base,
        id: `h${index}t${i}`,
        role: "tool",
        text: "",
        toolName: tc.function?.name ?? "tool",
        toolRunning: false,
        toolCallId: tc.id,
        toolArgs: parseToolArgs(tc.function?.arguments),
      });
    });
  }

  return out;
}

/**
 * Fold role=tool result rows into the assistant tool_call card sharing
 * their tool_call_id, so history renders one card per call instead of an
 * args-only card followed by a result-only card. Result rows without a
 * matching call card (older transcripts) pass through unchanged.
 */
function mergeToolCards(messages: ChatMessage[]): ChatMessage[] {
  const byCallId = new Map<string, ChatMessage>();
  const out: ChatMessage[] = [];
  for (const m of messages) {
    if (m.role === "tool" && m.toolCallId) {
      const existing = byCallId.get(m.toolCallId);
      if (existing) {
        existing.toolResult = m.toolResult ?? existing.toolResult;
        existing.toolArgs = existing.toolArgs ?? m.toolArgs;
        continue;
      }
      byCallId.set(m.toolCallId, m);
    }
    out.push(m);
  }
  return out;
}

function systemMessage(text: string): ChatMessage {
  return { id: messageId(), role: "system", text, timestamp: nowSeconds() };
}

/** approval.respond choice → 中文标签（also used for the answered record). */
const APPROVAL_CHOICE_LABELS: Record<string, string> = {
  once: "允许一次",
  session: "本次会话内允许",
  always: "永久允许",
  deny: "拒绝",
};

export default function BubbleChatPage({ isActive = true }: { isActive?: boolean }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { profile: scopedProfile } = useProfileScope();
  const resumeParam = searchParams.get("resume");

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [connState, setConnState] = useState<ConnectionState>("idle");
  const [sessionReady, setSessionReady] = useState(false);
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  /** A slash command is awaiting its slash.exec response. */
  const [slashBusy, setSlashBusy] = useState(false);
  /** Interactive gateway prompt (clarify/approval) awaiting an answer. */
  const [pendingPrompt, setPendingPrompt] = useState<PendingPrompt | null>(null);
  /** A clarify.respond/approval.respond call is in flight. */
  const [promptBusy, setPromptBusy] = useState(false);
  /** Composer text injection (edit-refill, /undo prefill). */
  const [inject, setInject] = useState<{ text: string; nonce: number }>();
  /** Mobile (<lg) session-list drawer. */
  const [drawerOpen, setDrawerOpen] = useState(false);
  /** Desktop (lg+) session-list sidebar fold, persisted browser-locally. */
  const [sidebarCollapsed, setSidebarCollapsed] = useState(
    () => localStorage.getItem("hermes.bubblechat.sidebarCollapsed") === "1",
  );
  /** Chat background setting (localStorage-backed, see ChatBackground). */
  const chatBg = useChatBackground();
  // Bumped by "新对话" so a fresh session spawns even when ?resume was
  // already empty (mirrors ChatPage's reconnect-nonce pattern).
  const [newChatNonce, setNewChatNonce] = useState(0);

  const gwRef = useRef<GatewayClient | null>(null);
  /** Live gateway session id (session.create/resume result) — events and
   *  prompt.submit/interrupt all key on this, NOT the stored resume id. */
  const liveSidRef = useRef<string | null>(null);
  /** Monotonic token: only the latest session lifecycle run may commit. */
  const sessionReqRef = useRef(0);
  /** Assistant bubble currently receiving deltas. */
  const streamingMsgRef = useRef<string | null>(null);
  /** tool_call_id → rendered tool-card message id. */
  const toolCardsRef = useRef<Map<string, string>>(new Map());

  /* ---------------------------------------------------------------- */
  /*  Gateway event handling                                           */
  /* ---------------------------------------------------------------- */

  const patchStreamingBubble = useCallback(
    (patch: (m: ChatMessage) => ChatMessage) => {
      const id = streamingMsgRef.current;
      if (!id) return;
      setMessages((prev) => prev.map((m) => (m.id === id ? patch(m) : m)));
    },
    [],
  );

  const handleEvent = useCallback(
    (ev: GatewayEvent) => {
      // Drop events for other sessions (background tasks, other tabs).
      if (ev.session_id !== liveSidRef.current) return;
      const payload = (ev.payload ?? {}) as Record<string, unknown>;

      switch (ev.type) {
        case "message.start": {
          const id = messageId();
          streamingMsgRef.current = id;
          setGenerating(true);
          setMessages((prev) => [
            ...prev,
            { id, role: "assistant", text: "", timestamp: nowSeconds(), streaming: true },
          ]);
          break;
        }

        case "message.delta": {
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text) break;
          // Tolerate a delta without a preceding message.start.
          if (!streamingMsgRef.current) {
            const id = messageId();
            streamingMsgRef.current = id;
            setMessages((prev) => [
              ...prev,
              { id, role: "assistant", text, timestamp: nowSeconds(), streaming: true },
            ]);
            break;
          }
          patchStreamingBubble((m) => ({ ...m, text: m.text + text }));
          break;
        }

        case "reasoning.delta":
        case "thinking.delta": {
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text || !streamingMsgRef.current) break;
          patchStreamingBubble((m) => ({
            ...m,
            reasoning: (m.reasoning ?? "") + text,
          }));
          break;
        }

        case "reasoning.available": {
          // Post-turn reasoning fallback (the TUI handles this the same
          // way). On tool-call turns content streaming is suppressed
          // server-side, so reasoning.delta never fires and this event
          // carries the turn's whole thinking text — ignoring it means the
          // 思考过程 block never appears on exactly the turns that do real
          // work. It can arrive before or after message.complete, so patch
          // the streaming bubble when one is open, else the latest
          // assistant bubble; streamed deltas always win.
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text) break;
          const fill = (m: ChatMessage): ChatMessage =>
            m.reasoning ? m : { ...m, reasoning: text };
          if (streamingMsgRef.current) {
            patchStreamingBubble(fill);
            break;
          }
          setMessages((prev) => {
            for (let i = prev.length - 1; i >= 0; i--) {
              if (prev[i].role === "assistant") {
                return prev.map((m, j) => (j === i ? fill(m) : m));
              }
            }
            return prev;
          });
          break;
        }

        case "message.complete": {
          const finalText = typeof payload.text === "string" ? payload.text : null;
          patchStreamingBubble((m) => ({
            ...m,
            // The complete payload is authoritative; keep accumulated
            // deltas when the final text is empty (e.g. interrupted turn).
            text: finalText ? finalText : m.text,
            streaming: false,
          }));
          streamingMsgRef.current = null;
          setGenerating(false);
          setStatusText(null);
          break;
        }

        case "tool.start": {
          const toolId = typeof payload.tool_id === "string" ? payload.tool_id : "";
          const name = typeof payload.name === "string" ? payload.name : "tool";
          const context =
            typeof payload.context === "string" && payload.context
              ? payload.context
              : undefined;
          // Subagent-mirror cards ship a live preview instead of a result.
          const preview =
            typeof payload.preview === "string" && payload.preview
              ? payload.preview
              : undefined;
          const id = messageId();
          if (toolId) toolCardsRef.current.set(toolId, id);
          setMessages((prev) => [
            ...prev,
            {
              id,
              role: "tool",
              text: "",
              toolName: name,
              toolRunning: true,
              toolCallId: toolId || undefined,
              toolContext: context,
              toolResult: preview,
              timestamp: nowSeconds(),
            },
          ]);
          break;
        }

        case "tool.complete": {
          const toolId = typeof payload.tool_id === "string" ? payload.tool_id : "";
          const mid = toolCardsRef.current.get(toolId);
          if (mid) {
            const resultText = stringifyToolResult(payload.result);
            const failed = isErrorResult(payload.result);
            const duration =
              typeof payload.duration_s === "number" ? payload.duration_s : undefined;
            const args = payload.args as unknown;
            setMessages((prev) =>
              prev.map((m) =>
                m.id === mid
                  ? {
                      ...m,
                      toolRunning: false,
                      toolArgs: args ?? m.toolArgs,
                      toolResult: resultText ?? m.toolResult,
                      toolError: failed,
                      toolDuration: duration,
                    }
                  : m,
              ),
            );
            toolCardsRef.current.delete(toolId);
          }
          break;
        }

        case "tool.generating": {
          const name = typeof payload.name === "string" ? payload.name : "tool";
          setStatusText(`正在调用 ${name}…`);
          break;
        }

        case "status.update": {
          const text = typeof payload.text === "string" ? payload.text.trim() : "";
          setStatusText(text || null);
          break;
        }

        case "error": {
          const message =
            typeof payload.message === "string" ? payload.message : "未知错误";
          patchStreamingBubble((m) => ({ ...m, streaming: false }));
          streamingMsgRef.current = null;
          setGenerating(false);
          setStatusText(null);
          setMessages((prev) => [...prev, systemMessage(`错误：${message}`)]);
          break;
        }

        case "approval.request": {
          // Dock an inline approve/deny card above the composer (answered
          // via approval.respond; choice ∈ once|session|always|deny).
          setPendingPrompt({
            kind: "approval",
            command: typeof payload.command === "string" ? payload.command : "",
            description:
              typeof payload.description === "string" && payload.description
                ? payload.description
                : "危险操作",
            allowPermanent: payload.allow_permanent !== false,
            smartDenied: payload.smart_denied === true,
          });
          setStatusText("等待审批…");
          break;
        }

        case "clarify.request": {
          // Dock an inline question card (answered via clarify.respond).
          const requestId =
            typeof payload.request_id === "string" ? payload.request_id : "";
          if (!requestId) break;
          setPendingPrompt({
            kind: "clarify",
            requestId,
            question: typeof payload.question === "string" ? payload.question : "",
            choices: Array.isArray(payload.choices)
              ? payload.choices.filter((c): c is string => typeof c === "string")
              : null,
          });
          setStatusText("等待你的回答…");
          break;
        }

        default: {
          if (IGNORED_EVENT_TYPES.has(ev.type)) break;
          setMessages((prev) => [...prev, systemMessage(`[${ev.type}]`)]);
        }
      }
    },
    [patchStreamingBubble],
  );

  /* ---------------------------------------------------------------- */
  /*  WebSocket lifecycle (once per page mount — the host persists)    */
  /* ---------------------------------------------------------------- */

  const connectGateway = useCallback(() => {
    const gw = gwRef.current;
    if (!gw) return;
    setError(null);
    gw.connect().catch((e: Error) => {
      setError(e.message || "WebSocket 连接失败");
    });
  }, []);

  useEffect(() => {
    const gw = new GatewayClient();
    gwRef.current = gw;
    const offState = gw.onState(setConnState);
    const offEvent = gw.onAny(handleEvent);
    gw.connect().catch((e: Error) => {
      setError(e.message || "WebSocket 连接失败");
    });
    return () => {
      offState();
      offEvent();
      gw.close();
      gwRef.current = null;
      liveSidRef.current = null;
    };
  }, [handleEvent]);

  /* ---------------------------------------------------------------- */
  /*  Session lifecycle: create fresh or resume + load history         */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (connState !== "open") return;
    const gw = gwRef.current;
    if (!gw) return;

    const myReq = ++sessionReqRef.current;
    const isCurrent = () => sessionReqRef.current === myReq;
    setSessionReady(false);
    setGenerating(false);
    setStatusText(null);
    setPendingPrompt(null);
    setPromptBusy(false);
    streamingMsgRef.current = null;
    toolCardsRef.current.clear();
    liveSidRef.current = null;
    const profileParam = scopedProfile ? { profile: scopedProfile } : {};

    if (resumeParam) {
      // History from REST (display truth) + live resume over WS, in parallel.
      setLoadingHistory(true);
      setMessages([]);
      Promise.all([
        api.getSessionMessages(resumeParam, scopedProfile),
        gw.request<SessionResumeResult>("session.resume", {
          session_id: resumeParam,
          ...profileParam,
        }),
      ])
        .then(([hist, resumed]) => {
          if (!isCurrent()) return;
          liveSidRef.current = resumed.session_id;
          setMessages(mergeToolCards(hist.messages.flatMap(historyToChatMessages)));
          // A session resumed mid-turn keeps its busy indicator.
          setGenerating(resumed.running === true);
          setSessionReady(true);
        })
        .catch((e: Error) => {
          if (!isCurrent()) return;
          setError(e.message || "会话恢复失败");
        })
        .finally(() => {
          if (isCurrent()) setLoadingHistory(false);
        });
    } else {
      setMessages([]);
      gw
        .request<SessionCreateResult>("session.create", {
          source: "dashboard",
          ...profileParam,
        })
        .then((res) => {
          if (!isCurrent()) return;
          liveSidRef.current = res.session_id;
          setSessionReady(true);
        })
        .catch((e: Error) => {
          if (!isCurrent()) return;
          setError(e.message || "会话创建失败");
        });
    }
  }, [connState, resumeParam, scopedProfile, newChatNonce]);

  /* ---------------------------------------------------------------- */
  /*  Actions                                                          */
  /* ---------------------------------------------------------------- */

  const sys = useCallback((text: string) => {
    setMessages((prev) => [...prev, systemMessage(text)]);
  }, []);

  /** Plain prompt.submit path: user bubble + generating state. */
  const submitPrompt = useCallback(
    (text: string, images?: string[]) => {
      const gw = gwRef.current;
      const sid = liveSidRef.current;
      if (!gw || !sid || !text) return;
      setMessages((prev) => [
        ...prev,
        {
          id: messageId(),
          role: "user",
          text,
          // Echo the just-attached images in the user's own bubble (the
          // gateway's image.attach emits no event, so nothing else would
          // show them until a history reload).
          images: images && images.length > 0 ? images : undefined,
          timestamp: nowSeconds(),
        },
      ]);
      setGenerating(true);
      gw.request("prompt.submit", { session_id: sid, text }).catch((e: Error) => {
        setGenerating(false);
        sys(`发送失败：${e.message || "未知错误"}`);
      });
    },
    [sys],
  );

  const startNewChat = useCallback(() => {
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete("resume");
        return next;
      },
      { replace: false },
    );
    setNewChatNonce((n) => n + 1);
  }, [setSearchParams]);

  /**
   * Slash command path. prompt.submit does NOT parse leading slashes (the
   * text would reach the LLM verbatim), so "/..." messages go to slash.exec
   * instead. The response is either {output, warning?} (rendered as a
   * system bubble) or a command.dispatch directive: exec/plugin render
   * output, send/skill submit `message` as a normal turn (the turn's
   * message.start/… events arrive on their own), prefill (/undo) refills
   * the composer, alias re-executes the target.
   */
  const runSlash = useCallback(
    async (text: string, depth = 0): Promise<void> => {
      const gw = gwRef.current;
      const sid = liveSidRef.current;
      if (!gw || !sid) return;
      const m = /^\/(\S*)\s*(.*)$/.exec(text);
      const name = (m?.[1] ?? "").toLowerCase();
      const arg = (m?.[2] ?? "").trim();
      if (!name) {
        sys("空命令");
        return;
      }
      // /new must spawn a fresh gateway session — the slash worker runs in
      // a subprocess and can't rekey the live session, so handle it
      // client-side via the normal new-chat flow.
      if (name === "new") {
        startNewChat();
        return;
      }
      setSlashBusy(true);
      try {
        const raw = await gw.request<unknown>("slash.exec", {
          session_id: sid,
          command: text,
        });
        const d = asSlashDirective(raw);
        if (!d) {
          const r = (raw ?? {}) as SlashOutputResult;
          const body = r.output?.trim() ? r.output : `/${name}：无输出`;
          sys(r.warning ? `警告：${r.warning}\n${body}` : body);
          return;
        }
        switch (d.type) {
          case "exec":
          case "plugin":
            sys(d.output?.trim() ? d.output : "(无输出)");
            break;
          case "alias":
            if (depth >= 3) {
              sys("命令别名嵌套过深");
              break;
            }
            await runSlash(`/${d.target}${arg ? ` ${arg}` : ""}`, depth + 1);
            break;
          case "skill": {
            const msgText = d.message?.trim() ?? "";
            if (!msgText) {
              sys(`/${name}：技能载荷缺少消息内容`);
              break;
            }
            sys(`⚡ 加载技能：${d.name}`);
            submitPrompt(msgText);
            break;
          }
          case "send": {
            if (d.notice?.trim()) sys(d.notice);
            const msgText = d.message.trim();
            if (!msgText) {
              sys(`/${name}：空消息`);
              break;
            }
            submitPrompt(msgText);
            break;
          }
          case "prefill":
            if (d.notice?.trim()) sys(d.notice);
            if (d.message) setInject({ text: d.message, nonce: Date.now() });
            break;
        }
      } catch (e) {
        sys(`命令失败：${e instanceof Error ? e.message : String(e)}`);
      } finally {
        setSlashBusy(false);
      }
    },
    [sys, submitPrompt, startNewChat],
  );

  const send = useCallback(
    (text: string, images?: string[]) => {
      const gw = gwRef.current;
      const sid = liveSidRef.current;
      if (!gw || !sid || !text) return;
      if (text.startsWith("/")) {
        // Echo the command as a user bubble, then execute it.
        setMessages((prev) => [
          ...prev,
          {
            id: messageId(),
            role: "user",
            text,
            images: images && images.length > 0 ? images : undefined,
            timestamp: nowSeconds(),
          },
        ]);
        void runSlash(text);
        return;
      }
      submitPrompt(text, images);
    },
    [runSlash, submitPrompt],
  );

  const interrupt = useCallback(() => {
    const gw = gwRef.current;
    const sid = liveSidRef.current;
    if (!gw || !sid) return;
    // Interrupting server-side cancels pending clarify/approval prompts
    // (approval resolves as deny), so drop the card locally too.
    setPendingPrompt(null);
    setStatusText(null);
    gw.request("session.interrupt", { session_id: sid }).catch(() => {
      /* interrupt is best-effort; the turn end event settles the UI */
    });
  }, []);

  /** PendingPromptCard answer: clarify — empty answer means "skip". */
  const answerClarify = useCallback(
    (answer: string) => {
      const gw = gwRef.current;
      const cur = pendingPrompt;
      if (!gw || !cur || cur.kind !== "clarify") return;
      setPendingPrompt(null);
      setStatusText(null);
      setPromptBusy(true);
      gw.request("clarify.respond", { request_id: cur.requestId, answer })
        .then(() =>
          sys(
            answer
              ? `❓ ${cur.question}\n✅ ${answer}`
              : `❓ ${cur.question}\n（已跳过）`,
          ),
        )
        .catch((e: Error) =>
          sys(`回答提交失败：${e.message || "未知错误"}`),
        )
        .finally(() => setPromptBusy(false));
    },
    [pendingPrompt, sys],
  );

  /** PendingPromptCard answer: approval — choice ∈ once|session|always|deny. */
  const answerApproval = useCallback(
    (choice: string) => {
      const gw = gwRef.current;
      const sid = liveSidRef.current;
      const cur = pendingPrompt;
      if (!gw || !sid || !cur || cur.kind !== "approval") return;
      setPendingPrompt(null);
      setStatusText(null);
      setPromptBusy(true);
      gw.request("approval.respond", { session_id: sid, choice })
        .then(() =>
          sys(
            `🛡️ 审批：${cur.description} → ${APPROVAL_CHOICE_LABELS[choice] ?? choice}`,
          ),
        )
        .catch((e: Error) =>
          sys(`审批提交失败：${e.message || "未知错误"}`),
        )
        .finally(() => setPromptBusy(false));
    },
    [pendingPrompt, sys],
  );

  /** Bubble "retry": resubmit a user message's text (for the latest
   * assistant reply, the user text that prompted it). Interrupts the
   * current turn first when one is still streaming. */
  const retryMessage = useCallback(
    (msg: ChatMessage) => {
      const gw = gwRef.current;
      const sid = liveSidRef.current;
      if (!gw || !sid) return;
      let text = msg.role === "user" ? msg.text : "";
      if (msg.role !== "user") {
        const idx = messages.findIndex((m) => m.id === msg.id);
        for (let i = idx - 1; i >= 0; i--) {
          if (messages[i].role === "user" && messages[i].text.trim()) {
            text = messages[i].text;
            break;
          }
        }
      }
      text = text.trim();
      if (!text) {
        sys("没有可重试的用户消息");
        return;
      }
      void (async () => {
        if (generating) {
          await gw
            .request("session.interrupt", { session_id: sid })
            .catch(() => {});
        }
        // Goes through send() so slash-command messages re-execute instead
        // of being submitted as plain text.
        send(text);
      })();
    },
    [messages, generating, send, sys],
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

  // Attach an already-uploaded image to the live session. The gateway
  // queues it in session.attached_images and the next prompt.submit turn
  // picks it up (this is the same path the TUI's /image command uses).
  const attachImage = useCallback(async (path: string) => {
    const gw = gwRef.current;
    const sid = liveSidRef.current;
    if (!gw || !sid) throw new Error("会话未就绪");
    await gw.request("image.attach", { session_id: sid, path });
  }, []);

  // Focus nothing when hidden; the persistent host keeps state alive.
  void isActive;

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const connected = connState === "open";
  const composerDisabled = !connected || !sessionReady;
  const draftKey = resumeParam ?? "new";

  return (
    <div className="flex min-h-0 flex-1 gap-2 pb-2">
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
              onPicked={() => setDrawerOpen(false)}
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
            <ChatBackgroundPicker bg={chatBg} profile={scopedProfile} />
          </span>
        </div>

        {error && (
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="min-w-0 flex-1 wrap-break-word">{error}</span>
            <Button
              ghost
              size="icon"
              onClick={connectGateway}
              aria-label="重新连接"
              title="重新连接"
            >
              <RefreshCw />
            </Button>
          </div>
        )}

        {!connected && !error && (
          <div className="flex shrink-0 items-center gap-2 rounded-lg border border-current/10 bg-muted/40 px-3 py-2 text-xs text-text-secondary">
            <Spinner />
            {connState === "connecting" ? "正在连接网关…" : "连接已断开"}
            {connState === "closed" && (
              <Button ghost size="sm" onClick={connectGateway} prefix={<RefreshCw />}>
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
          {loadingHistory ? (
            <div className="flex min-h-0 flex-1 items-center justify-center gap-2 text-sm text-text-secondary">
              <Spinner /> 加载聊天记录…
            </div>
          ) : (
            <MessageList
              messages={messages}
              emptyHint={
                resumeParam ? "这个会话还没有消息" : "开始新的对话吧"
              }
              onRetry={retryMessage}
              onEdit={editMessage}
            />
          )}
        </div>

        {statusText && (
          <div className="flex shrink-0 items-center gap-2 px-1 text-xs text-text-tertiary">
            <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
            <span className="truncate">{statusText}</span>
          </div>
        )}

        {pendingPrompt && (
          <PendingPromptCard
            prompt={pendingPrompt}
            busy={promptBusy}
            onClarify={answerClarify}
            onApproval={answerApproval}
          />
        )}

        <Composer
          draftKey={draftKey}
          disabled={composerDisabled}
          generating={generating}
          busy={slashBusy}
          profile={scopedProfile}
          inject={inject}
          onSend={send}
          onInterrupt={interrupt}
          onAttachImage={attachImage}
        />
      </div>
    </div>
  );
}
