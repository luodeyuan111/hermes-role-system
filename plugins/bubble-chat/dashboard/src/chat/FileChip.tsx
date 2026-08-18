/**
 * Clickable chip for a gateway-local file path found in chat text.
 * Text-like files under 512 KB open in a preview modal (content via
 * /api/files/read, base64 data URL decoded client-side); images open the
 * full-screen zoom overlay; PDFs open in a modal with the browser's built-in
 * viewer (bytes fetched as a blob URL, sidestepping the download endpoint's
 * Content-Disposition: attachment); everything else opens with the host's
 * default application via /api/files/open (browser download as fallback).
 * Files that no longer exist grey out on first failed access.
 * `useFileOpener` exposes the same open logic for non-chip callers
 * (MessageBubble's intercepted Markdown links).
 */

import { useCallback, useState } from "react";
import { File, FileText, Image as ImageIcon, Loader2, X } from "lucide-react";

import { mediaKindForPath } from "./content";
import {
  downloadFile,
  fetchFileBlobUrl,
  openInSystemApp,
  resolveImageUrl,
} from "./fileAccess";
import { ZoomOverlay } from "./MediaInline";
import { api } from "../sdk";
import { cn } from "../sdk";

/** Extensions that open as text in the preview modal. */
const TEXT_EXTS = new Set([
  "md", "markdown", "txt", "json", "jsonl", "log", "csv", "tsv", "xml",
  "yaml", "yml", "toml", "ini", "cfg", "conf", "env", "sh", "bash", "zsh",
  "py", "pyi", "js", "jsx", "ts", "tsx", "mjs", "cjs", "css", "html", "htm",
  "sql", "rs", "go", "java", "c", "h", "cpp", "hpp", "cc", "vue", "svelte",
  "tex", "diff", "patch",
]);

/** Preview cap — bigger text-ish files go straight to download. */
const PREVIEW_MAX_BYTES = 512 * 1024;

function fileName(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

function extOf(path: string): string {
  const name = fileName(path);
  const dot = name.lastIndexOf(".");
  return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
}

/** Decode a `data:<mime>;base64,…` payload to UTF-8 text. */
function dataUrlToText(dataUrl: string): string {
  const comma = dataUrl.indexOf(",");
  const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return new TextDecoder("utf-8").decode(bytes);
}

function PreviewModal({
  path,
  text,
  onClose,
}: {
  path: string;
  text: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={`预览 ${fileName(path)}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fade-in_0.15s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden",
          "rounded-xl border border-current/15 bg-background-base shadow-2xl",
        )}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-current/10 px-4 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{fileName(path)}</div>
            <div className="truncate text-[0.625rem] text-text-tertiary">{path}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            title="关闭"
            className="shrink-0 cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <pre className="min-h-0 flex-1 overflow-auto px-4 py-3 font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word text-text-secondary">
          {text}
        </pre>
      </div>
    </div>
  );
}

/**
 * PDF preview modal: the fetched blob URL feeds an <iframe>, so the
 * browser's native PDF viewer renders the file inline. Revoking the object
 * URL is the caller's job (onClose).
 */
function PdfPreviewModal({
  src,
  path,
  onClose,
}: {
  src: string;
  path: string;
  onClose: () => void;
}) {
  return (
    <div
      role="dialog"
      aria-label={`预览 ${fileName(path)}`}
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fade-in_0.15s_ease]"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden",
          "rounded-xl border border-current/15 bg-background-base shadow-2xl",
        )}
      >
        <div className="flex shrink-0 items-center gap-2 border-b border-current/10 px-4 py-2.5">
          <FileText className="h-4 w-4 shrink-0 text-primary" />
          <div className="min-w-0 flex-1">
            <div className="truncate text-sm font-medium">{fileName(path)}</div>
            <div className="truncate text-[0.625rem] text-text-tertiary">{path}</div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            title="关闭"
            className="shrink-0 cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <iframe
          src={src}
          title={fileName(path)}
          className="min-h-0 flex-1 border-0 bg-white"
        />
      </div>
    </div>
  );
}

/**
 * Shared "open a gateway-local path" logic: images zoom full-screen (the
 * same overlay MediaInline uses), previewable text opens the preview modal,
 * PDFs open the inline viewer modal, everything else opens with the host's
 * default application (download fallback). Rejects when the file is
 * inaccessible. Used by FileChip and by MessageBubble's local-link click
 * interception.
 */
export function useFileOpener() {
  const [textPreview, setTextPreview] = useState<{
    path: string;
    text: string;
  } | null>(null);
  const [imagePreview, setImagePreview] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [pdfPreview, setPdfPreview] = useState<{
    src: string;
    path: string;
  } | null>(null);

  const closePdfPreview = useCallback(() => {
    setPdfPreview((prev) => {
      if (prev) URL.revokeObjectURL(prev.src);
      return null;
    });
  }, []);

  const open = useCallback(async (path: string) => {
    const name = fileName(path);
    if (mediaKindForPath(path) === "image") {
      const src = await resolveImageUrl(path);
      setImagePreview({ src, alt: name });
      return;
    }
    if (extOf(path) === "pdf") {
      // Always the blob route, even in loopback mode: the direct download
      // URL carries Content-Disposition: attachment, which would turn the
      // "preview" into a download.
      const src = await fetchFileBlobUrl(path);
      setPdfPreview({ src, path });
      return;
    }
    if (TEXT_EXTS.has(extOf(path))) {
      const res = await api.readFile(path);
      if (res.size > PREVIEW_MAX_BYTES) {
        // Too big to preview comfortably — fall back to a download.
        await downloadFile(path, name);
        return;
      }
      setTextPreview({ path, text: dataUrlToText(res.data_url) });
      return;
    }
    // 冷门/不可预览格式：直接交给系统默认应用打开（服务端 xdg-open），
    // 宿主机没有打开器时退回浏览器下载。
    try {
      await openInSystemApp(path);
    } catch {
      await downloadFile(path, name);
    }
  }, []);
  const modal = (
    <>
      {textPreview && (
        <PreviewModal
          path={textPreview.path}
          text={textPreview.text}
          onClose={() => setTextPreview(null)}
        />
      )}
      {imagePreview && (
        <ZoomOverlay
          src={imagePreview.src}
          alt={imagePreview.alt}
          onClose={() => setImagePreview(null)}
        />
      )}
      {pdfPreview && (
        <PdfPreviewModal
          src={pdfPreview.src}
          path={pdfPreview.path}
          onClose={closePdfPreview}
        />
      )}
    </>
  );

  return { open, modal };
}

export function FileChip({ path }: { path: string }) {
  const [missing, setMissing] = useState(false);
  const [busy, setBusy] = useState(false);
  const { open, modal } = useFileOpener();

  const name = fileName(path);
  const isImage = mediaKindForPath(path) === "image";
  const previewable = isImage || extOf(path) === "pdf" || TEXT_EXTS.has(extOf(path));

  const handleClick = () => {
    if (missing || busy) return;
    setBusy(true);
    open(path)
      .catch(() => setMissing(true))
      .finally(() => setBusy(false));
  };

  const Icon = isImage ? ImageIcon : previewable ? FileText : File;

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={missing}
        title={missing ? "文件不存在或无法访问" : path}
        className={cn(
          "inline-flex max-w-full cursor-pointer items-center gap-1 rounded-md",
          "border border-current/10 bg-muted/40 px-1.5 py-0.5",
          "font-mono-ui text-xs text-primary hover:border-primary/40 hover:bg-muted/70",
          missing && "cursor-not-allowed text-text-tertiary opacity-60 hover:border-current/10 hover:bg-muted/40",
        )}
      >
        {busy ? (
          <Loader2 className="h-3 w-3 shrink-0 animate-spin" />
        ) : (
          <Icon className="h-3 w-3 shrink-0" />
        )}
        <span className="truncate">{name}</span>
        {missing && <span className="shrink-0">（不存在）</span>}
      </button>
      {modal}
    </>
  );
}
