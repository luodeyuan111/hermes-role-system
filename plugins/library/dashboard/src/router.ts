/**
 * Router helpers — the plugin bundle cannot use react-router hooks (the
 * host's Router context lives in the host bundle, and bundling a second
 * react-router copy would not share it). These cover exactly what the
 * library page needs: the ``?path=`` deep-link param and the
 * 「转发并打开」 jump to ``/chat?resume=<id>``.
 */

import { HERMES_BASE_PATH } from "./sdk";

/** Initial ``?path=`` of the page URL (deep link into a directory). */
export function getLibraryPathParam(): string | null {
  return new URLSearchParams(window.location.search).get("path");
}

/** Reflect the current directory in the URL (no history entry, no reload). */
export function replaceLibraryPathParam(path: string): void {
  const url = `${HERMES_BASE_PATH}/library?path=${encodeURIComponent(path)}`;
  window.history.replaceState(null, "", url);
}

/**
 * SPA-navigate to the chat tab. react-router only listens to ``popstate``,
 * so after pushState we dispatch a synthetic event to make the host router
 * re-read the location (established micro-frontend pattern).
 */
export function navigateToChat(sessionId: string): void {
  const url = `${HERMES_BASE_PATH}/chat?resume=${encodeURIComponent(sessionId)}`;
  window.history.pushState(null, "", url);
  window.dispatchEvent(new PopStateEvent("popstate"));
}
