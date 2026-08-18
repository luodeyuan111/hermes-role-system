/**
 * Local-path helpers — copied from web/src/components/chat/content.ts
 * (only what the Markdown component's ``localFileLinks`` mode needs).
 */

/** Trailing sentence punctuation that clings to paths in prose. */
function stripTrailingPunct(token: string): string {
  return token.replace(/[.,;:!?'")\]*。，、；：！？）】」』》]+$/, "");
}

/**
 * Legacy standalone-WebChat URL scheme (it used to serve files from
 * ``http://localhost:9117/files/<abs path>``). Loopback hosts only — real
 * external URLs stay untouched.
 */
const LEGACY_FILES_URL_RE =
  /^(?:https?:)?\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\/files\/(\S+)$/i;

/**
 * Normalise a candidate token to a real gateway-local absolute path, or null
 * when it isn't one. Handles legacy /files/ URLs, clinging punctuation and
 * percent-encoded hrefs.
 */
export function normalizeLocalPath(token: string): string | null {
  let p = token.trim().replace(/^[`"']+|[`"']+$/g, "");
  p = stripTrailingPunct(p);

  const legacyUrl = p.match(LEGACY_FILES_URL_RE);
  if (legacyUrl) {
    p = `/${legacyUrl[1]}`;
  } else if (/^\/files\/\S/.test(p)) {
    p = p.slice("/files".length);
  } else if (p.includes("://") || p.startsWith("//")) {
    return null; // external URL, not a local path
  }

  p = stripTrailingPunct(p);
  // Percent-encoded paths (e.g. Chinese filenames inside hrefs).
  if (p.includes("%")) {
    try {
      p = decodeURIComponent(p);
    } catch {
      /* malformed escape sequence — keep the raw form */
    }
  }
  if (p.startsWith("/api/")) return null; // dashboard route, not a file
  if (!p.startsWith("/") && !p.startsWith("~/")) return null;
  if (p.startsWith("//")) return null;
  return p;
}

/** True when a Markdown href / text token refers to a gateway-local file. */
export function isLocalFileRef(href: string): boolean {
  return normalizeLocalPath(href) !== null;
}
