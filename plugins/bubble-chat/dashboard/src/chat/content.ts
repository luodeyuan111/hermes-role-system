/**
 * Rich-content extraction for bubble-chat messages: pulls local media refs
 * (MEDIA: lines, standalone media paths, inline image paths) and clickable
 * file paths out of message / tool-result text before Markdown rendering.
 *
 * Matching is deliberately conservative — a token must start with `/` or
 * `~/`, contain no whitespace, and end in a known extension before it is
 * treated as a file. False negatives beat false positives here.
 */

export type MediaKind = "image" | "audio" | "video";

export interface MediaRef {
  kind: MediaKind;
  /** Absolute gateway-local path (fetched via /api/media or /api/files/download). */
  path?: string;
  /** Ready-to-use data URL (history multimodal parts). */
  dataUrl?: string;
}

// Same convention as the TUI (ui-tui/src/components/markdown.tsx).
const MEDIA_LINE_RE = /^\s*[`"']?MEDIA:\s*(\S+?)[`"']?\s*$/;

const IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|bmp|svg|ico)$/i;
const AUDIO_EXT_RE = /\.(mp3|wav|ogg|aac|flac|m4a|wma)$/i;
const VIDEO_EXT_RE = /\.(mp4|webm|avi|mov|mkv|flv)$/i;
/** Any "looks like a file" extension for FileChip candidates. */
const FILE_EXT_RE = /\.[A-Za-z0-9]{1,10}$/;

// Fresh instance per use — a shared /g regex carries lastIndex across
// .replace()/.matchAll() calls and silently drops matches.
function absPathTokenRe(): RegExp {
  return /(?:https?:\/\/|~\/|\/)[^\s"'`<>|(){}[\]]+/g;
}

export function mediaKindForPath(path: string): MediaKind | null {
  if (IMAGE_EXT_RE.test(path)) return "image";
  if (AUDIO_EXT_RE.test(path)) return "audio";
  if (VIDEO_EXT_RE.test(path)) return "video";
  return null;
}

function isStandalonePathLine(line: string): string | null {
  const trimmed = line.trim().replace(/^[`"']|[`"']$/g, "");
  // Allow URL forms here; normalizeLocalPath below rejects external URLs.
  return /^(?:~\/|\/|(?:https?:)?\/\/)\S+$/.test(trimmed) ? trimmed : null;
}

/** Trailing sentence punctuation that clings to paths in prose. */
function stripTrailingPunct(token: string): string {
  return token.replace(/[.,;:!?'")\]*。，、；：！？）】」』》]+$/, "");
}

/**
 * Legacy standalone-WebChat URL scheme the agent still emits from old habits
 * (it used to serve files from `http://localhost:9117/files/<abs path>`):
 *   http(s)://localhost[:port]/files/<abs path>   → /<abs path>
 *   //localhost[:port]/files/<abs path>           → /<abs path>
 *   /files/<abs path>                             → /<abs path>
 * Loopback hosts only — real external URLs stay untouched.
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

/**
 * Split media out of message text. Returns the remaining text (MEDIA: lines,
 * standalone media-path lines and inline image-path tokens removed) plus the
 * media refs to render below it. When nothing was extracted the original
 * text is returned untouched.
 */
export function extractMediaFromText(text: string): {
  text: string;
  media: MediaRef[];
} {
  const media: MediaRef[] = [];
  if (!text) return { text, media };

  const keptLines: string[] = [];
  for (const line of text.split("\n")) {
    const directive = line.match(MEDIA_LINE_RE)?.[1];
    const candidate = directive ?? isStandalonePathLine(line);
    const localPath = candidate ? normalizeLocalPath(candidate) : null;
    const kind = localPath ? mediaKindForPath(localPath) : null;
    if (localPath && kind) {
      media.push({ kind, path: localPath });
      continue;
    }
    keptLines.push(line);
  }

  // Inline absolute image paths inside prose (audio/video stay line-only —
  // an in-sentence match there is more likely prose than a real file).
  let rest = keptLines.join("\n");
  rest = rest.replace(absPathTokenRe(), (token) => {
    const localPath = normalizeLocalPath(token);
    if (localPath && mediaKindForPath(localPath) === "image") {
      media.push({ kind: "image", path: localPath });
      return "";
    }
    return token;
  });

  if (media.length === 0) return { text, media };
  return { text: rest.replace(/\n{3,}/g, "\n\n").trim(), media };
}

/**
 * Conservative non-media file paths in text, for FileChip rendering. Only
 * tokens ending in a file-like extension qualify; media extensions are
 * excluded (those render via MediaInline). Deduped, capped at `limit`.
 */
export function extractFilePaths(text: string, limit = 6): string[] {
  if (!text) return [];
  const seen = new Set<string>();
  const out: string[] = [];
  for (const m of text.matchAll(absPathTokenRe())) {
    const p = normalizeLocalPath(m[0]);
    if (!p || p.length < 6) continue;
    if (mediaKindForPath(p)) continue;
    if (!FILE_EXT_RE.test(p)) continue;
    if (seen.has(p)) continue;
    seen.add(p);
    out.push(p);
    if (out.length >= limit) break;
  }
  return out;
}
