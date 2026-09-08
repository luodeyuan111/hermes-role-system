/**
 * Bubble-chat session store — module-level singleton.
 *
 * The plugin chunk loads exactly once (the host dedupes plugin <script>
 * URLs), while the page component mounts/unmounts with the /chat route.
 * Keeping the GatewayClient and the whole conversation state HERE — not in
 * component state — reproduces what the old persistent host in App.tsx
 * achieved with display:none: tab switches cost an unsubscribe only, the
 * WebSocket stays open, and an in-flight streaming turn keeps accumulating
 * into `messages` while the user is on another tab. Remounting re-reads
 * the snapshot, so generation resumes mid-stream visually.
 *
 * Lifecycle:
 *  - `attach(spec)` (page mount / spec change): records the desired session
 *    spec (profile + resume id + new-chat nonce). A changed spec tears down
 *    the per-session render state and, once the socket is open, runs the
 *    session lifecycle (history REST load + session.resume, or
 *    session.create).
 *  - Gateway events mutate the store directly; subscribers re-render.
 *  - Unmount never touches the store — there is deliberately no detach().
 *  - Reconnect: on socket close `startedKey` resets, so the next "open"
 *    re-runs the lifecycle for the attached spec (resume by URL id, else a
 *    fresh session.create) — same semantics as the old page effect whose
 *    deps included connState.
 */

import { api, type SessionMessage } from "./sdk";
import { lookupSessionProfile } from "./roles";
import {
  GatewayClient,
  type ConnectionState,
  type GatewayEvent,
} from "./gatewayClient";
import {
  decodeMessageContentParts,
  messageId,
  nowSeconds,
  type ChatMessage,
  type PendingPrompt,
  type TodoItem,
} from "./chat/types";

/** Result shapes for the gateway methods the store calls. */
interface SessionCreateResult {
  session_id: string;
}
interface SessionResumeResult {
  session_id: string;
  resumed?: string;
  running?: boolean;
}

/** model.options RPC payload (subset the new-chat picker reads). */
export interface ModelOptionsPayload {
  /** Current/default model id (preselected by the picker). */
  model?: string;
  provider?: string;
  providers?: Array<{
    slug: string;
    name: string;
    is_current?: boolean;
    models?: string[];
  }>;
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

/** Parse a todo list from a tool.complete payload value or a stored
 *  result JSON string ({"todos": [...]}). Returns null when not parseable. */
function parseTodoList(raw: unknown): TodoItem[] | null {
  let data: unknown = raw;
  if (typeof raw === "string") {
    try {
      data = JSON.parse(raw);
    } catch {
      return null;
    }
  }
  if (!data || typeof data !== "object") return null;
  const todos = (data as Record<string, unknown>).todos;
  if (!Array.isArray(todos)) return null;
  return todos
    .filter((t): t is Record<string, unknown> => !!t && typeof t === "object")
    .map((t) => ({
      id: String(t.id ?? ""),
      content: String(t.content ?? ""),
      status: String(t.status ?? "pending"),
    }));
}

/** Latest todo list among a session's stored tool-result rows, or null. */
function latestTodosFromHistory(messages: SessionMessage[]): TodoItem[] | null {
  for (let i = messages.length - 1; i >= 0; i--) {
    const m = messages[i];
    if (m.role === "tool" && m.tool_name === "todo") {
      const todos = parseTodoList(m.content);
      if (todos) return todos;
    }
  }
  return null;
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

  // Persisted thinking (assistant rows): restored into the collapsible
  // reasoning block so a refresh no longer drops the chain of thought.
  // Precedence mirrors the desktop client.
  const reasoning =
    msg.reasoning || msg.reasoning_content || msg.reasoning_details || undefined;

  out.push({
    ...base,
    id: `h${index}`,
    role: msg.role,
    text,
    reasoning: msg.role === "assistant" ? reasoning : undefined,
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

/** The conversation the page wants to be attached to. */
export interface SessionSpec {
  /** Management profile (from the `?profile=` URL projection). */
  profile: string;
  /** `?resume=` conversation id, null for a fresh chat. */
  resume: string | null;
}

export interface BubbleChatState {
  connState: ConnectionState;
  error: string | null;
  /** Bumped by 新对话 so a fresh session spawns even when ?resume was
   *  already empty (mirrors ChatPage's reconnect-nonce pattern). */
  newChatNonce: number;
  sessionReady: boolean;
  loadingHistory: boolean;
  generating: boolean;
  statusText: string | null;
  /** A slash command is awaiting its slash.exec response. */
  slashBusy: boolean;
  /** Interactive gateway prompt (clarify/approval) awaiting an answer. */
  pendingPrompt: PendingPrompt | null;
  /** A clarify.respond/approval.respond call is in flight. */
  promptBusy: boolean;
  /** The agent's per-session todo list (latest write wins). */
  todos: TodoItem[];
  messages: ChatMessage[];
}

const INITIAL_STATE: BubbleChatState = {
  connState: "idle",
  error: null,
  newChatNonce: 0,
  sessionReady: false,
  loadingHistory: false,
  generating: false,
  statusText: null,
  slashBusy: false,
  pendingPrompt: null,
  promptBusy: false,
  todos: [],
  messages: [],
};

class BubbleChatStore {
  private state: BubbleChatState = INITIAL_STATE;
  private readonly listeners = new Set<() => void>();

  private gw: GatewayClient | null = null;
  /** Live gateway session id (session.create/resume result) — events and
   *  prompt.submit/interrupt all key on this, NOT the stored resume id. */
  private liveSid: string | null = null;
  /** Spec the page last attached, and the spec the lifecycle last started
   *  for. Both serialise to the same key shape. */
  private attachedKey: string | null = null;
  private startedKey: string | null = null;
  private attachedSpec: SessionSpec | null = null;
  /** Monotonic token: only the latest session lifecycle run may commit. */
  private sessionReq = 0;
  /** Assistant bubble currently receiving deltas. */
  private streamingMsgId: string | null = null;
  /** tool_call_id → rendered tool-card message id. */
  private readonly toolCards = new Map<string, string>();
  /** Streaming delta 合帧：delta 以 20-50/s 到达，逐条 emit 会让订阅方
   *  （页面根组件）同频重渲染，长对话下足以触发 Firefox 的「此网页拖慢了
   *  您的 Firefox」警告。message.delta / reasoning.delta 的文本累积同步
   *  进 state（后续 delta 和 message.complete 读到的都是最新全文），但
   *  订阅通知合并到每个时间片最多一次，中间帧直接丢弃。 */
  private streamFlushTimer: ReturnType<typeof setTimeout> | null = null;
  private streamDirty = false;
  private static readonly STREAM_FLUSH_MS = 33;

  /* ---------------------------------------------------------------- */
  /*  Role context (sidebar two-level role UI)                         */
  /* ---------------------------------------------------------------- */

  /** Role the NEXT new chat is created under (a profile id; "" = default).
   *  Staged by the role view's 新建小对话 button, read by the create branch
   *  of the session lifecycle. Creation-time only — never applied to a
   *  live/resumed session (prompt caching is sacred). */
  private newChatRole = "";
  /** Optional per-chat model pick from the role view's dropdown, with the
   *  provider slug resolved from the model.options payload (sending model
   *  without its provider makes the gateway resolve the model against the
   *  profile's DEFAULT provider → "API 没有找到" for foreign model ids). */
  private newChatModel = "";
  private newChatProvider = "";
  /** Role that owns the session being RESUMED ("" = default/management).
   *  Set when the user picks a row inside a role view; role sessions live
   *  in their own profile's state.db, so resume must bind that profile. */
  private resumeRole = "";

  /** 新建小对话 (role view): stage the creation context and force the
   *  attach effect to spawn a fresh session. The page clears ?resume. */
  startNewChatInRole = (role: string, model = "", provider = ""): void => {
    this.newChatRole = role;
    this.newChatModel = model;
    this.newChatProvider = provider;
    this.emit({ newChatNonce: this.state.newChatNonce + 1 });
  };

  /** A plain fresh chat keeps the last staged role context (the role view
   *  the user is standing in) — same as picking 新建小对话 without
   *  touching the model dropdown. */
  bumpNewChatNonce = (): void => {
    this.emit({ newChatNonce: this.state.newChatNonce + 1 });
  };

  /** Session picked inside a role view: bind that role for the resume. */
  bindResumeRole = (role: string): void => {
    this.resumeRole = role;
  };

  /** model.options RPC for the role view's model dropdown; null when the
   *  socket isn't open or the call fails (dropdown degrades to 默认 only).
   *  Cached for the page's lifetime — the catalog is disk-cached server
   *  side, and a failed fetch is not cached so the next open retries. */
  private modelOptionsPromise: Promise<ModelOptionsPayload | null> | null = null;

  getModelOptions = (): Promise<ModelOptionsPayload | null> => {
    if (!this.modelOptionsPromise) {
      this.modelOptionsPromise = this.fetchModelOptions().catch(() => {
        this.modelOptionsPromise = null;
        return null;
      });
    }
    return this.modelOptionsPromise;
  };

  fetchModelOptions = async (): Promise<ModelOptionsPayload | null> => {
    const gw = this.gw;
    if (!gw || this.state.connState !== "open") return null;
    try {
      return await gw.request<ModelOptionsPayload>("model.options", {});
    } catch {
      return null;
    }
  };

  /* ---------------------------------------------------------------- */
  /*  Subscription (useSyncExternalStore contract)                     */
  /* ---------------------------------------------------------------- */

  subscribe = (fn: () => void): (() => void) => {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  };

  getSnapshot = (): BubbleChatState => this.state;

  /** Watchdog: while generating, any silence longer than this surfaces a
   *  status hint instead of looking like the turn vanished (429 storms,
   *  dead turns with no terminal event — seen in production). */
  private watchdogTimer: ReturnType<typeof setTimeout> | null = null;
  private static readonly WATCHDOG_MS = 45_000;

  private armWatchdog(): void {
    if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
    this.watchdogTimer = setTimeout(() => {
      this.watchdogTimer = null;
      if (!this.state.generating) return;
      this.emit({
        statusText: "等待响应时间较长——可能被限流或回合异常，可点消息的重试",
      });
    }, BubbleChatStore.WATCHDOG_MS);
  }

  private disarmWatchdog(): void {
    if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
    this.watchdogTimer = null;
  }

  private emit(partial: Partial<BubbleChatState>): void {
    this.state = { ...this.state, ...partial };
    // Watchdog follows the generating flag — armed on any turn start,
    // disarmed when the turn settles (any path).
    if (partial.generating === true) this.armWatchdog();
    if (partial.generating === false) this.disarmWatchdog();
    for (const fn of this.listeners) {
      try {
        fn();
      } catch {
        /* a broken subscriber must not take the store down */
      }
    }
  }

  private patchMessages(patch: (prev: ChatMessage[]) => ChatMessage[]): void {
    this.emit({ messages: patch(this.state.messages) });
  }

  private patchStreamingBubble(patch: (m: ChatMessage) => ChatMessage): void {
    const id = this.streamingMsgId;
    if (!id) return;
    this.patchMessages((prev) => prev.map((m) => (m.id === id ? patch(m) : m)));
  }

  /** 同步累积 streaming 气泡内容，但不立即通知订阅者——通知由合帧
   *  定时器按 STREAM_FLUSH_MS 节奏发出（见字段注释）。 */
  private patchStreamingBubbleDeferred(
    patch: (m: ChatMessage) => ChatMessage,
  ): void {
    const id = this.streamingMsgId;
    if (!id) return;
    this.state = {
      ...this.state,
      messages: this.state.messages.map((m) => (m.id === id ? patch(m) : m)),
    };
    this.streamDirty = true;
    if (!this.streamFlushTimer) {
      this.streamFlushTimer = setTimeout(() => {
        this.streamFlushTimer = null;
        if (!this.streamDirty) return;
        this.streamDirty = false;
        // state 已是最新累积文本，这里只补一次订阅通知。
        this.emit({});
      }, BubbleChatStore.STREAM_FLUSH_MS);
    }
  }

  /** 回合收尾（complete/error）前调用：丢弃挂起的合帧通知——紧随其后
   *  的常规 emit 已携带最终累积状态。 */
  private cancelStreamFlush(): void {
    if (this.streamFlushTimer) clearTimeout(this.streamFlushTimer);
    this.streamFlushTimer = null;
    this.streamDirty = false;
  }

  /* ---------------------------------------------------------------- */
  /*  Gateway lifecycle (connect once, reconnect on demand)            */
  /* ---------------------------------------------------------------- */

  private ensureGateway(): GatewayClient {
    if (!this.gw) {
      const gw = new GatewayClient();
      this.gw = gw;
      gw.onState((connState) => {
        this.emit({ connState });
        if (connState === "open") {
          // (Re)connected: run the session lifecycle for the attached spec.
          this.maybeStartSession();
        } else if (connState === "closed" || connState === "error") {
          // Force a fresh lifecycle on the next "open".
          this.startedKey = null;
        }
      });
      gw.onAny((ev) => this.handleEvent(ev));
      // First attach kicks the initial connection (retries afterwards go
      // through connectGateway, the error banner's 重新连接 action).
      queueMicrotask(() => this.connectGateway());
    }
    return this.gw;
  }

  /** (Re)connect the socket — also the error banner's 重新连接 action. */
  connectGateway = (): void => {
    const gw = this.ensureGateway();
    this.emit({ error: null });
    gw.connect().catch((e: Error) => {
      this.emit({ error: e.message || "WebSocket 连接失败" });
    });
  };

  /* ---------------------------------------------------------------- */
  /*  Session attach + lifecycle                                       */
  /* ---------------------------------------------------------------- */

  private static keyOf(spec: SessionSpec, nonce: number): string {
    return `${spec.profile}${spec.resume ?? ""}${nonce}`;
  }

  /**
   * Attach the page to a conversation spec. Idempotent: re-attaching the
   * same key (e.g. a tab-switch remount) is a no-op, so the live session
   * and its messages survive. A changed key resets the per-session render
   * state and starts the lifecycle once the socket is open.
   */
  attach = (spec: SessionSpec): void => {
    this.ensureGateway();
    const key = BubbleChatStore.keyOf(spec, this.state.newChatNonce);
    if (key === this.attachedKey) return;
    this.attachedKey = key;
    this.attachedSpec = spec;
    this.sessionReq += 1;
    this.liveSid = null;
    this.streamingMsgId = null;
    this.toolCards.clear();
    this.emit({
      sessionReady: false,
      loadingHistory: false,
      generating: false,
      statusText: null,
      pendingPrompt: null,
      promptBusy: false,
      todos: [],
      messages: [],
    });
    this.maybeStartSession();
  };

  /** Run the session lifecycle when the socket is open and the attached
   *  spec hasn't been started yet. */
  private maybeStartSession(): void {
    const spec = this.attachedSpec;
    if (!spec || this.state.connState !== "open") return;
    const key = this.attachedKey;
    if (!key || key === this.startedKey) return;
    this.startedKey = key;

    const gw = this.gw;
    if (!gw) return;
    const myReq = ++this.sessionReq;
    const isCurrent = () => this.sessionReq === myReq;

    // Reset the per-session render state. attach() already did this on a
    // spec change, but this path also runs on RECONNECT (socket reopened
    // under an unchanged spec), where the old page's connState-dependent
    // effect likewise wiped the view before reloading.
    this.liveSid = null;
    this.streamingMsgId = null;
    this.toolCards.clear();
    this.emit({
      sessionReady: false,
      generating: false,
      statusText: null,
      pendingPrompt: null,
      promptBusy: false,
      todos: [],
      messages: [],
    });

    if (spec.resume) {
      void this.runResumeLifecycle(gw, spec, spec.resume, isCurrent);
    } else {
      // Creation-time overrides only: the role is a profile id staged by
      // the role view's 新建小对话 (the management profile scope wins when
      // both are set); the model carries its provider slug resolved from
      // model.options — sending a bare model id made the gateway resolve
      // it against the profile's DEFAULT provider, so a kimi model went to
      // 智谱 and the agent build died with "API 没有找到". Neither override
      // is ever sent for a live/resumed session — swapping role/model mid-
      // conversation would rebuild the system prompt and kill the cache.
      const createProfile = spec.profile || this.newChatRole;
      gw
        .request<SessionCreateResult>("session.create", {
          source: "dashboard",
          ...(createProfile ? { profile: createProfile } : {}),
          ...(this.newChatModel
            ? {
                model: this.newChatModel,
                ...(this.newChatProvider
                  ? { provider: this.newChatProvider }
                  : {}),
              }
            : {}),
        })
        .then((res) => {
          if (!isCurrent()) return;
          this.liveSid = res.session_id;
          this.emit({ sessionReady: true });
        })
        .catch((e: Error) => {
          if (!isCurrent()) return;
          this.emit({ error: e.message || "会话创建失败" });
        });
    }
  }

  /** History REST load + live session.resume, binding the owning profile.
   *  Role sessions live in their own profile's state.db, so a resume that
   *  binds the wrong profile comes back "session not found" — look up the
   *  owner via the plugin backend and retry once (also covers a page
   *  reload, where the in-memory role binding is gone). */
  private async runResumeLifecycle(
    gw: GatewayClient,
    spec: SessionSpec,
    resumeId: string,
    isCurrent: () => boolean,
  ): Promise<void> {
    this.emit({ loadingHistory: true });
    const attempt = async (profile: string) => {
      const [hist, resumed] = await Promise.all([
        api.getSessionMessages(resumeId, profile),
        gw.request<SessionResumeResult>("session.resume", {
          session_id: resumeId,
          ...(profile ? { profile } : {}),
        }),
      ]);
      return { hist, resumed, profile };
    };
    try {
      let result;
      const firstProfile = this.resumeRole || spec.profile;
      try {
        result = await attempt(firstProfile);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        if (!/session not found/i.test(msg)) throw e;
        const owner = await lookupSessionProfile(resumeId);
        const ownerProfile = owner === "default" ? "" : (owner ?? "");
        if (!owner || ownerProfile === firstProfile) throw e;
        result = await attempt(ownerProfile);
      }
      if (!isCurrent()) return;
      // Remember the resolved owner so later resumes of this conversation
      // (and the role badge context) bind correctly.
      this.resumeRole = result.profile;
      this.liveSid = result.resumed.session_id;
      this.emit({
        messages: mergeToolCards(
          result.hist.messages.flatMap(historyToChatMessages),
        ),
        // Hydrate the todo panel from the latest todo tool row (stored
        // results carry the full list as JSON).
        todos: latestTodosFromHistory(result.hist.messages) ?? [],
        // A session resumed mid-turn keeps its busy indicator.
        generating: result.resumed.running === true,
        sessionReady: true,
      });
    } catch (e) {
      if (!isCurrent()) return;
      const msg = e instanceof Error ? e.message : String(e);
      this.emit({ error: msg || "会话恢复失败" });
    } finally {
      if (isCurrent()) this.emit({ loadingHistory: false });
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Gateway event handling                                           */
  /* ---------------------------------------------------------------- */

  private handleEvent(ev: GatewayEvent): void {
    // Drop events for other sessions (background tasks, other tabs).
    if (ev.session_id !== this.liveSid) return;
    // Any event is proof of life — reset the silence watchdog.
    if (this.state.generating) this.armWatchdog();
    const payload = (ev.payload ?? {}) as Record<string, unknown>;

    switch (ev.type) {
      case "message.start": {
        const id = messageId();
        this.streamingMsgId = id;
        this.patchMessages((prev) => [
          ...prev,
          { id, role: "assistant", text: "", timestamp: nowSeconds(), streaming: true },
        ]);
        this.emit({ generating: true });
        break;
      }

      case "message.delta": {
        const text = typeof payload.text === "string" ? payload.text : "";
        if (!text) break;
        // Tolerate a delta without a preceding message.start.
        if (!this.streamingMsgId) {
          const id = messageId();
          this.streamingMsgId = id;
          this.patchMessages((prev) => [
            ...prev,
            { id, role: "assistant", text, timestamp: nowSeconds(), streaming: true },
          ]);
          break;
        }
        this.patchStreamingBubbleDeferred((m) => ({ ...m, text: m.text + text }));
        break;
      }

      case "reasoning.delta":
      case "thinking.delta": {
        const text = typeof payload.text === "string" ? payload.text : "";
        if (!text || !this.streamingMsgId) break;
        this.patchStreamingBubbleDeferred((m) => ({
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
        if (this.streamingMsgId) {
          this.patchStreamingBubble(fill);
          break;
        }
        this.patchMessages((prev) => {
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
        // 最终状态必须立刻 emit（含合帧窗口内尚未通知的累积文本）。
        this.cancelStreamFlush();
        this.patchStreamingBubble((m) => ({
          ...m,
          // The complete payload is authoritative; keep accumulated
          // deltas when the final text is empty (e.g. interrupted turn).
          text: finalText ? finalText : m.text,
          streaming: false,
        }));
        this.streamingMsgId = null;
        this.emit({ generating: false, statusText: null });
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
        if (toolId) this.toolCards.set(toolId, id);
        this.patchMessages((prev) => [
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
        const name = typeof payload.name === "string" ? payload.name : "";
        // The todo tool's full list rides the tool.complete payload (server
        // side already normalised it) — latest write wins, drives the panel.
        if (name === "todo") {
          const todos = parseTodoList(payload.todos ?? payload.result);
          if (todos) this.emit({ todos });
        }
        const mid = this.toolCards.get(toolId);
        if (mid) {
          const resultText = stringifyToolResult(payload.result);
          const failed = isErrorResult(payload.result);
          const duration =
            typeof payload.duration_s === "number" ? payload.duration_s : undefined;
          const args = payload.args as unknown;
          this.patchMessages((prev) =>
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
          this.toolCards.delete(toolId);
        }
        break;
      }

      case "tool.generating": {
        const name = typeof payload.name === "string" ? payload.name : "tool";
        this.emit({ statusText: `正在调用 ${name}…` });
        break;
      }

      case "status.update": {
        const text = typeof payload.text === "string" ? payload.text.trim() : "";
        this.emit({ statusText: text || null });
        break;
      }

      case "error": {
        const message =
          typeof payload.message === "string" ? payload.message : "未知错误";
        this.cancelStreamFlush();
        this.patchStreamingBubble((m) => ({ ...m, streaming: false }));
        this.streamingMsgId = null;
        this.patchMessages((prev) => [...prev, systemMessage(`错误：${message}`)]);
        this.emit({ generating: false, statusText: null });
        break;
      }

      case "approval.request": {
        // Dock an inline approve/deny card above the composer (answered
        // via approval.respond; choice ∈ once|session|always|deny).
        this.emit({
          pendingPrompt: {
            kind: "approval",
            command: typeof payload.command === "string" ? payload.command : "",
            description:
              typeof payload.description === "string" && payload.description
                ? payload.description
                : "危险操作",
            allowPermanent: payload.allow_permanent !== false,
            smartDenied: payload.smart_denied === true,
          },
          statusText: "等待审批…",
        });
        break;
      }

      case "clarify.request": {
        // Dock an inline question card (answered via clarify.respond).
        const requestId =
          typeof payload.request_id === "string" ? payload.request_id : "";
        if (!requestId) break;
        this.emit({
          pendingPrompt: {
            kind: "clarify",
            requestId,
            question: typeof payload.question === "string" ? payload.question : "",
            choices: Array.isArray(payload.choices)
              ? payload.choices.filter((c): c is string => typeof c === "string")
              : null,
          },
          statusText: "等待你的回答…",
        });
        break;
      }

      default: {
        if (IGNORED_EVENT_TYPES.has(ev.type)) break;
        this.patchMessages((prev) => [...prev, systemMessage(`[${ev.type}]`)]);
      }
    }
  }

  /* ---------------------------------------------------------------- */
  /*  Actions                                                          */
  /* ---------------------------------------------------------------- */

  private sys(text: string): void {
    this.patchMessages((prev) => [...prev, systemMessage(text)]);
  }

  /** Plain prompt.submit path: user bubble + generating state. */
  private submitPrompt(text: string, images?: string[]): void {
    const gw = this.gw;
    const sid = this.liveSid;
    if (!gw || !sid || !text) return;
    this.patchMessages((prev) => [
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
    this.emit({ generating: true });
    gw.request("prompt.submit", { session_id: sid, text }).catch((e: Error) => {
      this.emit({ generating: false });
      this.sys(`发送失败：${e.message || "未知错误"}`);
    });
  }

  /**
   * Slash command path. prompt.submit does NOT parse leading slashes (the
   * text would reach the LLM verbatim), so "/..." messages go to slash.exec
   * instead. The response is either {output, warning?} (rendered as a
   * system bubble) or a command.dispatch directive: exec/plugin render
   * output, send/skill submit `message` as a normal turn (the turn's
   * message.start/… events arrive on their own), prefill (/undo) refills
   * the composer, alias re-executes the target.
   *
   * `/new` is handled by the PAGE (it owns the URL/nonce); the store only
   * sees commands that execute over the wire. `onPrefill` refills the
   * composer (page-local UI state).
   */
  private async runSlash(
    text: string,
    onPrefill: (message: string) => void,
    depth = 0,
  ): Promise<void> {
    const gw = this.gw;
    const sid = this.liveSid;
    if (!gw || !sid) return;
    const m = /^\/(\S*)\s*(.*)$/.exec(text);
    const name = (m?.[1] ?? "").toLowerCase();
    const arg = (m?.[2] ?? "").trim();
    if (!name) {
      this.sys("空命令");
      return;
    }
    this.emit({ slashBusy: true });
    try {
      const raw = await gw.request<unknown>("slash.exec", {
        session_id: sid,
        command: text,
      });
      const d = asSlashDirective(raw);
      if (!d) {
        const r = (raw ?? {}) as SlashOutputResult;
        const body = r.output?.trim() ? r.output : `/${name}：无输出`;
        this.sys(r.warning ? `警告：${r.warning}\n${body}` : body);
        return;
      }
      switch (d.type) {
        case "exec":
        case "plugin":
          this.sys(d.output?.trim() ? d.output : "(无输出)");
          break;
        case "alias":
          if (depth >= 3) {
            this.sys("命令别名嵌套过深");
            break;
          }
          await this.runSlash(`/${d.target}${arg ? ` ${arg}` : ""}`, onPrefill, depth + 1);
          break;
        case "skill": {
          const msgText = d.message?.trim() ?? "";
          if (!msgText) {
            this.sys(`/${name}：技能载荷缺少消息内容`);
            break;
          }
          this.sys(`⚡ 加载技能：${d.name}`);
          this.submitPrompt(msgText);
          break;
        }
        case "send": {
          if (d.notice?.trim()) this.sys(d.notice);
          const msgText = d.message.trim();
          if (!msgText) {
            this.sys(`/${name}：空消息`);
            break;
          }
          this.submitPrompt(msgText);
          break;
        }
        case "prefill":
          if (d.notice?.trim()) this.sys(d.notice);
          if (d.message) onPrefill(d.message);
          break;
      }
    } catch (e) {
      this.sys(`命令失败：${e instanceof Error ? e.message : String(e)}`);
    } finally {
      this.emit({ slashBusy: false });
    }
  }

  /** Composer send. `onNew` handles /new client-side (page owns the URL);
   *  `onPrefill` refills the composer for /undo. */
  send = (
    text: string,
    images: string[] | undefined,
    hooks: { onNew: () => void; onPrefill: (message: string) => void },
  ): void => {
    if (!this.gw || !this.liveSid || !text) return;
    // Leading-"/" routes to slash.exec only when the first token is a
    // plausible command name (no further "/"). An absolute path pasted
    // from a file manager ("/home/velya/…") is plain text for the agent —
    // sending it to the slash worker would just die as "unknown command".
    const firstToken = text.split(/\s/, 1)[0];
    const isSlashCommand =
      firstToken.startsWith("/") && !firstToken.slice(1).includes("/");
    if (isSlashCommand) {
      // Echo the command as a user bubble, then execute it.
      this.patchMessages((prev) => [
        ...prev,
        {
          id: messageId(),
          role: "user",
          text,
          images: images && images.length > 0 ? images : undefined,
          timestamp: nowSeconds(),
        },
      ]);
      // /new must spawn a fresh gateway session — the slash worker runs in
      // a subprocess and can't rekey the live session, so handle it
      // client-side via the normal new-chat flow.
      if (/^\/new(?:\s|$)/.test(text)) {
        hooks.onNew();
        return;
      }
      void this.runSlash(text, hooks.onPrefill);
      return;
    }
    this.submitPrompt(text, images);
  };

  interrupt = (): void => {
    const gw = this.gw;
    const sid = this.liveSid;
    if (!gw || !sid) return;
    // Interrupting server-side cancels pending clarify/approval prompts
    // (approval resolves as deny), so drop the card locally too.
    this.emit({ pendingPrompt: null, statusText: null });
    gw.request("session.interrupt", { session_id: sid }).catch(() => {
      /* interrupt is best-effort; the turn end event settles the UI */
    });
  };

  /** PendingPromptCard answer: clarify — empty answer means "skip". */
  answerClarify = (answer: string): void => {
    const gw = this.gw;
    const cur = this.state.pendingPrompt;
    if (!gw || !cur || cur.kind !== "clarify") return;
    this.emit({ pendingPrompt: null, statusText: null, promptBusy: true });
    gw.request("clarify.respond", { request_id: cur.requestId, answer })
      .then(() =>
        this.sys(
          answer
            ? `❓ ${cur.question}\n✅ ${answer}`
            : `❓ ${cur.question}\n（已跳过）`,
        ),
      )
      .catch((e: Error) => this.sys(`回答提交失败：${e.message || "未知错误"}`))
      .finally(() => this.emit({ promptBusy: false }));
  };

  /** PendingPromptCard answer: approval — choice ∈ once|session|always|deny. */
  answerApproval = (choice: string): void => {
    const gw = this.gw;
    const sid = this.liveSid;
    const cur = this.state.pendingPrompt;
    if (!gw || !sid || !cur || cur.kind !== "approval") return;
    this.emit({ pendingPrompt: null, statusText: null, promptBusy: true });
    gw.request("approval.respond", { session_id: sid, choice })
      .then(() =>
        this.sys(
          `🛡️ 审批：${cur.description} → ${APPROVAL_CHOICE_LABELS[choice] ?? choice}`,
        ),
      )
      .catch((e: Error) => this.sys(`审批提交失败：${e.message || "未知错误"}`))
      .finally(() => this.emit({ promptBusy: false }));
  };

  /** Bubble "retry": resubmit a user message's text (for the latest
   * assistant reply, the user text that prompted it). Interrupts the
   * current turn first when one is still streaming. */
  retryMessage = (
    msg: ChatMessage,
    hooks: { onNew: () => void; onPrefill: (message: string) => void },
  ): void => {
    const gw = this.gw;
    const sid = this.liveSid;
    if (!gw || !sid) return;
    const messages = this.state.messages;
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
      this.sys("没有可重试的用户消息");
      return;
    }
    void (async () => {
      if (this.state.generating) {
        await gw.request("session.interrupt", { session_id: sid }).catch(() => {});
      }
      // Goes through send() so slash-command messages re-execute instead
      // of being submitted as plain text.
      this.send(text, undefined, hooks);
    })();
  };

  /** Attach an already-uploaded image to the live session. The gateway
   *  queues it in session.attached_images and the next prompt.submit turn
   *  picks it up (this is the same path the TUI's /image command uses). */
  attachImage = async (path: string): Promise<void> => {
    const gw = this.gw;
    const sid = this.liveSid;
    if (!gw || !sid) throw new Error("会话未就绪");
    await gw.request("image.attach", { session_id: sid, path });
  };
}

/**
 * THE singleton. Module scope is the point: the plugin chunk is evaluated
 * once per page load, so this store (and its WebSocket) survives every
 * mount/unmount of the /chat route.
 */
export const bubbleChatStore = new BubbleChatStore();
