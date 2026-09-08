/**
 * Host SDK access — everything the asset-view plugin takes from the dashboard
 * host arrives via ``window.__HERMES_PLUGIN_SDK__`` (see
 * web/src/plugins/registry.ts::exposePluginSDK). React itself reaches the
 * copied sources through the build-time shims in ``src/shims/`` (esbuild
 * alias); this module covers the non-React surface: fetch helpers, the
 * typed api client, ``cn``, and ``useI18n``.
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

/** Typed host api client (getSessions / searchSessions / …). */
export const api: any = new Proxy({} as any, {
  get: (_t, prop) => (sdk().api as any)[prop],
});

export const cn: HermesPluginSDKShape["utils"]["cn"] = (...classes) =>
  sdk().utils.cn(...classes);

export const useI18n: () => any = () => sdk().useI18n();

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

