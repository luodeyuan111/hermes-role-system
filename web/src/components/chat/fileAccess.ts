/**
 * URL helpers for rendering gateway-local files in the browser.
 *
 * Auth mirrors the rest of the dashboard:
 *  - loopback / --insecure: the injected ``window.__HERMES_SESSION_TOKEN__``
 *    doubles as a ``?token=`` query credential, which ``/api/files/download``
 *    explicitly accepts (web_server.py ``_QUERY_TOKEN_API_PATHS``) — so media
 *    tags and browser downloads can use a plain direct URL.
 *  - gated OAuth: no session token exists and media elements can't ride the
 *    cookie via ``credentials: 'include'``, so we fetch the bytes with
 *    :func:`authedFetch` and hand out a blob object URL instead.
 */

import { authedFetch, fetchJSON, HERMES_BASE_PATH } from "@/lib/api";

/** Direct ``/api/files/download`` URL in loopback mode, else ``null``. */
export function directFileUrl(path: string): string | null {
  const token = window.__HERMES_SESSION_TOKEN__;
  if (!token) return null;
  return (
    `${HERMES_BASE_PATH}/api/files/download` +
    `?path=${encodeURIComponent(path)}&token=${encodeURIComponent(token)}`
  );
}

/** Gated-mode fallback: fetch the file bytes, return a blob object URL. */
export async function fetchFileBlobUrl(path: string): Promise<string> {
  const res = await authedFetch(
    `/api/files/download?path=${encodeURIComponent(path)}`,
  );
  if (!res.ok) throw new Error(`下载失败：HTTP ${res.status}`);
  return URL.createObjectURL(await res.blob());
}

/** URL usable as ``<audio>/<video> src`` for a gateway-local file. */
export async function resolveFileUrl(path: string): Promise<string> {
  return directFileUrl(path) ?? fetchFileBlobUrl(path);
}

/**
 * Image bytes as a data URL via ``/api/media`` (confined to the gateway's
 * media roots). Falls back to the managed-files download endpoint for
 * images that live outside those roots.
 */
export async function resolveImageUrl(path: string): Promise<string> {
  try {
    const res = await fetchJSON<{ data_url: string }>(
      `/api/media?path=${encodeURIComponent(path)}`,
    );
    return res.data_url;
  } catch {
    return resolveFileUrl(path);
  }
}

/**
 * Open a gateway-local file with the HOST's default application via
 * /api/files/open (xdg-open server-side). The dashboard normally runs on
 * the same machine as the files, so this is the real "在系统里打开" —
 * unlike a browser download. `reveal` opens the containing folder instead
 * (file-manager management). Rejects when the host has no opener or the
 * path is inaccessible.
 */
export async function openInSystemApp(path: string, reveal = false): Promise<void> {
  const res = await authedFetch("/api/files/open", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ path, reveal }),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(text || `HTTP ${res.status}`);
  }
}

/** Trigger a browser download for a gateway-local file. */export async function downloadFile(path: string, name: string): Promise<void> {
  const direct = directFileUrl(path);
  if (direct) {
    // <a download> click instead of window.open: window.open from an async
    // (post-await) callback is routinely popup-blocked, and the endpoint
    // already sends Content-Disposition: attachment so this stays a download.
    const a = document.createElement("a");
    a.href = direct;
    a.download = name;
    a.rel = "noopener";
    document.body.appendChild(a);
    a.click();
    a.remove();
    return;
  }
  const blobUrl = await fetchFileBlobUrl(path);
  const a = document.createElement("a");
  a.href = blobUrl;
  a.download = name;
  a.click();
  // Give the navigation a moment before revoking.
  setTimeout(() => URL.revokeObjectURL(blobUrl), 10_000);
}
