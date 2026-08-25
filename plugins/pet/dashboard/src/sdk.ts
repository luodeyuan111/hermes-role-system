/**
 * Host SDK access — everything the bubble-chat plugin takes from the
 * dashboard host arrives via ``window.__HERMES_PLUGIN_SDK__`` (see
 * web/src/plugins/registry.ts::exposePluginSDK). React itself reaches the
 * copied sources through the build-time shims in ``src/shims/`` (esbuild
 * alias); this module covers the non-React surface: fetch helpers, the
 * typed api client, ``cn``/``timeAgo``, ``useI18n``, and the host DS Button.
 */

export interface HermesPluginSDKShape {
  sdkVersion: string;
  React: any;
  hooks: Record<string, any>;
  api: any;
  fetchJSON: <T = unknown>(
    url: string,
    init?: RequestInit,
    options?: { allowUnauthorized?: boolean },
  ) => Promise<T>;
  authedFetch: (url: string, init?: RequestInit) => Promise<Response>;
  buildWsUrl: (path: string, params?: Record<string, string>) => Promise<string>;
  buildWsAuthParam: () => Promise<[string, string]>;
  components: Record<string, any>;
  utils: {
    cn: (...classes: Array<string | false | null | undefined>) => string;
    timeAgo: (ts: number) => string;
    isoTimeAgo: (iso: string) => string;
  };
  useI18n: () => any;
}

declare global {
  interface Window {
    __HERMES_PLUGIN_SDK__?: HermesPluginSDKShape;
    __HERMES_PLUGINS__?: {
      register(name: string, component: any): void;
      registerSlot(slot: string, name: string, component: any): void;
    };
    __HERMES_BASE_PATH__?: string;
    __HERMES_SESSION_TOKEN__?: string;
  }
}

function sdk(): HermesPluginSDKShape {
  const s = window.__HERMES_PLUGIN_SDK__;
  if (!s) throw new Error("hermes plugin SDK is not available");
  return s;
}

/** JSON fetch with the host's auth handling (session header / cookie). */
export const fetchJSON: HermesPluginSDKShape["fetchJSON"] = (url, init, options) =>
  sdk().fetchJSON(url, init, options);

/** Authenticated raw fetch for blob/text endpoints. */
export const authedFetch: HermesPluginSDKShape["authedFetch"] = (url, init) =>
  sdk().authedFetch(url, init);

/**
 * Typed host api client (getSessions / getSessionMessages / uploadFile / …).
 * Its profile-scoped methods default to the host's current management
 * profile (the api module tracks ProfileProvider state), so plugin calls
 * can pass the profile explicitly or omit it.
 */
export const api: any = new Proxy({} as any, {
  get: (_t, prop) => (sdk().api as any)[prop],
});

/** Resolve the [authParamName, authParamValue] pair for WebSocket auth. */
export const buildWsAuthParam: HermesPluginSDKShape["buildWsAuthParam"] = () =>
  sdk().buildWsAuthParam();

export const cn: HermesPluginSDKShape["utils"]["cn"] = (...classes) =>
  sdk().utils.cn(...classes);

export const timeAgo: HermesPluginSDKShape["utils"]["timeAgo"] = (ts) =>
  sdk().utils.timeAgo(ts);

export const useI18n: () => any = () => sdk().useI18n();

/**
 * Host DS Button — grabbed at chunk-eval time (module scope) so the
 * component identity is stable across renders. Safe for the same reason
 * shims/react.ts is: the host exposes the SDK before any plugin <script>
 * executes.
 */
export const Button: any = (window.__HERMES_PLUGIN_SDK__?.components ?? {}).Button;

/**
 * URL prefix the dashboard is served under ("" at root). Same derivation as
 * the host's web/src/lib/api.ts — the plugin bundle cannot import the host
 * module, so it re-reads the injected global.
 */
export const HERMES_BASE_PATH: string = (() => {
  const raw = window.__HERMES_BASE_PATH__ ?? "";
  if (!raw) return "";
  const withLead = raw.startsWith("/") ? raw : `/${raw}`;
  return withLead.replace(/\/+$/, "");
})();

/* ------------------------------------------------------------------ */
/*  Host api type shapes (compile-time only; see web/src/lib/api.ts)   */
/* ------------------------------------------------------------------ */

/** 会话列表条目（host api.getSessions 返回形状）。 */
export interface SessionInfo {
  id: string;
  source: string | null;
  title: string | null;
  /** Unix 秒 */
  last_active: number;
  message_count: number;
  preview: string | null;
}

export interface SessionSearchResult {
  session_id: string;
  snippet: string;
  source: string | null;
  session_started: number | null;
}

/** 历史消息行（host api.getSessionMessages 的 messages[] 元素）。 */
export interface SessionMessage {
  role: "user" | "assistant" | "system" | "tool";
  content: string | null;
  /** Thinking text persisted on assistant rows (all three spellings exist
   *  in the DB; mirror the desktop's precedence: reasoning →
   *  reasoning_content → reasoning_details). */
  reasoning?: string | null;
  reasoning_content?: string | null;
  reasoning_details?: string | null;
  tool_calls?: Array<{
    id: string;
    function: { name: string; arguments: string };
  }>;
  tool_name?: string;
  tool_call_id?: string;
  timestamp?: number;
}
