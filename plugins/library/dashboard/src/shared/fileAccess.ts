/**
 * File access helpers — copied from web/src/components/chat/fileAccess.ts,
 * trimmed to what the library preview pane uses (``openInSystemApp`` +
 * ``downloadFile`` and their direct-URL fallback). ``/api/files/download``
 * and ``/api/files/open`` are core dashboard endpoints (the download
 * endpoint is on the host's ``?token=`` whitelist), so these work unchanged
 * from a plugin bundle.
 */
import { authedFetch, HERMES_BASE_PATH } from "../sdk";

/** Direct ``/api/files/download`` URL in loopback mode, else ``null``. */
function directFileUrl(path: string): string | null {
  const token = (window as any).__HERMES_SESSION_TOKEN__;
  if (!token) return null;
  return (
    `${HERMES_BASE_PATH}/api/files/download` +
    `?path=${encodeURIComponent(path)}&token=${encodeURIComponent(token)}`
  );
}

/** Gated-mode fallback: fetch the file bytes, return a blob object URL. */
async function fetchFileBlobUrl(path: string): Promise<string> {
  const res = await authedFetch(
    `/api/files/download?path=${encodeURIComponent(path)}`,
  );
  if (!res.ok) throw new Error(`下载失败：HTTP ${res.status}`);
  return URL.createObjectURL(await res.blob());
}

/**
 * Open a gateway-local file with the HOST's default application via
 * /api/files/open (xdg-open server-side). `reveal` opens the containing
 * folder instead. Rejects when the host has no opener or the path is
 * inaccessible.
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

/** Trigger a browser download for a gateway-local file. */
export async function downloadFile(path: string, name: string): Promise<void> {
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
