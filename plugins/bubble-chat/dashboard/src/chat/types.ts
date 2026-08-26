/**
 * Shared types for the bubble-chat UI (BubbleChatPage + components/chat/*).
 *
 * `ChatMessage` is the page's render model: history rows (REST
 * /api/sessions/{id}/messages) and live gateway events are both normalised
 * into it before they hit the list.
 */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system" | "tool";
  /** Plain text body — `\x00json:` multimodal content is already decoded. */
  text: string;
  /** Accumulated reasoning/thinking deltas for assistant messages. */
  reasoning?: string;
  /** Epoch seconds. */
  timestamp: number;
  /** Assistant bubble still receiving message.delta frames. */
  streaming?: boolean;
  /** Tool card: tool display name + whether the call is still running. */
  toolName?: string;
  toolRunning?: boolean;
  /** Tool card: gateway tool_call_id (tool.start/complete, history rows). */
  toolCallId?: string;
  /** Tool card: short human label from the tool.start payload's `context`. */
  toolContext?: string;
  /** Tool card: call arguments (tool.complete `args`, history tool_calls). */
  toolArgs?: unknown;
  /** Tool card: result body, already stringified for display. */
  toolResult?: string;
  /** Tool card: result looked like an error payload. */
  toolError?: boolean;
  /** Tool card: seconds, from tool.complete `duration_s`. */
  toolDuration?: number;
  /** History multimodal image refs — `data:` URLs or absolute file paths. */
  images?: string[];
}

/**
 * Interactive gateway prompt awaiting the user's answer, docked above the
 * composer (see PendingPromptCard). Both kinds arrive as gateway events and
 * are answered over the same JSON-RPC channel:
 *  - `clarify.request` → `clarify.respond {request_id, answer}`
 *    (empty answer = skip; `choices` null = free-text expected);
 *  - `approval.request` → `approval.respond {session_id, choice}`
 *    (choice ∈ once|session|always|deny).
 */
/** One item of the agent's per-session todo list (tools/todo_tool.py). */
export interface TodoItem {
  id: string;
  content: string;
  /** pending | in_progress | completed | cancelled */
  status: string;
}

export type PendingPrompt =
  | {
      kind: "clarify";
      /** `_block` request id — clarify.respond keys on this. */
      requestId: string;
      question: string;
      choices: string[] | null;
    }
  | {
      kind: "approval";
      command: string;
      description: string;
      /** false hides 永久允许 (tirith content warnings). */
      allowPermanent: boolean;
      /** true = owner override of a Smart DENY: only 允许一次/拒绝 offered. */
      smartDenied: boolean;
    };

let nextMessageId = 0;
export function messageId(): string {
  nextMessageId += 1;
  return `m${nextMessageId}`;
}

export function nowSeconds(): number {
  return Date.now() / 1000;
}

/** `HH:MM` bubble timestamp (24h, locale-neutral). */
export function formatBubbleTime(ts: number): string {
  const d = new Date(ts * 1000);
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

// Sentinel the session DB prefixes JSON-encoded multimodal content with
// (mirrors SessionDB._CONTENT_JSON_PREFIX in hermes_state.py).
const CONTENT_JSON_PREFIX = "\x00json:";

/**
 * Normalise a stored message `content` field to a parts array.
 *
 * Two storage encodings exist in the wild:
 *  - the sentinel-prefixed JSON string (SessionDB._CONTENT_JSON_PREFIX);
 *  - an ALREADY-PARSED parts array (older/edge rows serialise the list
 *    itself — the REST layer then returns it as a JSON list, and calling
 *    ``startsWith`` on it throws "e.startsWith is not a function").
 * Returns null for plain-string content (no parts to decode).
 */
function contentPartsOf(content: unknown): unknown[] | null {
  if (Array.isArray(content)) return content;
  if (typeof content !== "string") return null;
  if (!content.startsWith(CONTENT_JSON_PREFIX)) return null;
  try {
    const parts: unknown = JSON.parse(content.slice(CONTENT_JSON_PREFIX.length));
    return Array.isArray(parts) ? parts : null;
  } catch {
    return null;
  }
}

/**
 * Decode a stored message `content` field to displayable text. Multimodal
 * rows render image parts as a "[图片]" placeholder here (legacy text-only
 * behaviour — new code should use :func:`decodeMessageContentParts` to get
 * the image refs instead).
 */
export function decodeMessageContent(content: string | null): string {
  if (!content) return "";
  const parts = contentPartsOf(content);
  if (parts === null) return typeof content === "string" ? content : String(content);
  const out: string[] = [];
  for (const part of parts) {
    if (part == null || typeof part !== "object") continue;
    const p = part as Record<string, unknown>;
    if (p.type === "text" && typeof p.text === "string") {
      out.push(p.text);
    } else if (p.type === "image_url") {
      out.push("[图片]");
    }
  }
  return out.filter(Boolean).join("\n");
}

export interface DecodedContent {
  text: string;
  /** Image refs from `image_url` parts — `data:` URLs or absolute paths. */
  images: string[];
}

/** Pull the URL out of an OpenAI-style `image_url` part (string or {url}). */
function imagePartUrl(part: Record<string, unknown>): string | null {
  const raw = part.image_url;
  if (typeof raw === "string") return raw;
  if (raw && typeof raw === "object") {
    const url = (raw as Record<string, unknown>).url;
    if (typeof url === "string") return url;
  }
  return null;
}

/**
 * Structured variant of :func:`decodeMessageContent`: image parts are
 * returned as refs (data URLs used directly, file paths via /api/media)
 * instead of "[图片]" placeholders, so history messages can render inline
 * images. Plain-string content passes through unchanged; already-parsed
 * parts arrays (see :func:`contentPartsOf`) are handled too.
 */
export function decodeMessageContentParts(content: unknown): DecodedContent {
  if (!content) return { text: "", images: [] };
  const parts = contentPartsOf(content);
  if (parts === null) {
    return typeof content === "string"
      ? { text: content, images: [] }
      : { text: String(content), images: [] };
  }
  const out: string[] = [];
  const images: string[] = [];
  for (const part of parts) {
    if (part == null || typeof part !== "object") continue;
    const p = part as Record<string, unknown>;
    if (p.type === "text" && typeof p.text === "string") {
      out.push(p.text);
    } else if (p.type === "image_url") {
      const url = imagePartUrl(p);
      if (url) images.push(url);
    }
  }
  return { text: out.filter(Boolean).join("\n"), images };
}
