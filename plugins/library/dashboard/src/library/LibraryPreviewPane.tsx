import { useCallback, useEffect, useState } from "react";
import { Check, Copy, ExternalLink, FolderOpen, Pencil, Scissors, Send, Trash2, X } from "lucide-react";
import { Spinner } from "../shared/Spinner";
import { cn } from "../sdk";
import { Markdown } from "../shared/Markdown";
import { downloadFile, openInSystemApp } from "../shared/fileAccess";
import {
  fetchLibraryText,
  libraryApi,
  resolveLibraryUrl,
  type LibraryFileEntry,
  type LibraryFileInfo,
} from "./api";
import {
  PREVIEW_KIND_LABEL,
  formatBytes,
  formatDateTime,
} from "./format";

interface LibraryPreviewPaneProps {
  file: LibraryFileEntry | null;
  /** bump 时重新拉取 file info 与预览 */
  refreshKey: number;
  /** 以下管理操作回调由页面层注入；不传则不渲染对应按钮 */
  onCopy?: () => void;
  onCut?: () => void;
  onRename?: () => void;
  onDelete?: () => void;
  onForward?: () => void;
}

/**
 * 右栏：文件信息 + 预览。
 * office 首次打开后端会做 LibreOffice 转换（5-30s），未缓存时显示转换占位，
 * iframe onLoad 后撤掉。
 */
export function LibraryPreviewPane({
  file,
  refreshKey,
  onCopy,
  onCut,
  onRename,
  onDelete,
  onForward,
}: LibraryPreviewPaneProps) {
  const [info, setInfo] = useState<LibraryFileInfo | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [textContent, setTextContent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [forbidden, setForbidden] = useState(false);
  const [converting, setConverting] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [copied, setCopied] = useState(false);

  const kind = info?.preview_kind ?? file?.preview_kind ?? "none";

  useEffect(() => {
    setZoomed(false);
    setCopied(false);
    setInfo(null);
    setPreviewUrl(null);
    setTextContent(null);
    setError(null);
    setForbidden(false);
    setConverting(false);
    if (!file) return;

    let cancelled = false;
    let revokeUrl: string | null = null;
    setLoading(true);

    (async () => {
      try {
        const detail = await libraryApi.getFileInfo(file.path);
        if (cancelled) return;
        setInfo(detail);
        const k = detail.preview_kind;
        if (k === "none") return;
        if (k === "md" || k === "text") {
          const text = await fetchLibraryText(file.path);
          if (cancelled) return;
          setTextContent(text);
          return;
        }
        // office 未缓存 → 后端边转边等，给出占位提示
        if (k === "office" && !detail.preview_cached) setConverting(true);
        const { url, revoke } = await resolveLibraryUrl("preview", file.path);
        if (cancelled) {
          if (revoke) URL.revokeObjectURL(url);
          return;
        }
        revokeUrl = revoke ? url : null;
        setPreviewUrl(url);
        // 非 iframe 类型到这里就已经就绪
        if (k === "image" || k === "video" || k === "audio") setConverting(false);
      } catch (e) {
        if (cancelled) return;
        const msg = String(e);
        if (msg.startsWith("Error: 403") || msg.includes("HTTP 403")) {
          setForbidden(true);
        } else {
          setError(msg);
        }
        setConverting(false);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();

    return () => {
      cancelled = true;
      if (revokeUrl) URL.revokeObjectURL(revokeUrl);
    };
  }, [file, refreshKey]);

  // Esc 关闭图片放大遮罩
  useEffect(() => {
    if (!zoomed) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setZoomed(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [zoomed]);

  // 真正调系统默认应用打开（服务端 xdg-open）；打开器不可用时退回下载。
  const openInSystem = useCallback(() => {
    if (!file) return;
    openInSystemApp(file.path).catch(() =>
      downloadFile(file.path, file.name),
    );
  }, [file]);

  // 在系统文件管理器中显示所在目录。
  const revealInFolder = useCallback(() => {
    if (!file) return;
    openInSystemApp(file.path, true).catch(() => {
      /* 宿主机无打开器时静默——无文件管理器可开 */
    });
  }, [file]);

  const copyPath = useCallback(async () => {
    if (!file) return;
    try {
      await navigator.clipboard.writeText(file.path);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* 剪贴板不可用（非安全上下文等） */
    }
  }, [file]);

  if (!file) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary">
        选择一个文件查看详情与预览
      </div>
    );
  }

  const renderPreview = () => {
    if (loading && !previewUrl && !textContent) {
      return (
        <div className="flex h-full items-center justify-center gap-2 text-sm text-text-secondary">
          <Spinner />
          <span>加载预览…</span>
        </div>
      );
    }
    if (forbidden) {
      return (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary">
          策略禁止预览此文件（403）
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-red-400">
          预览失败:{error}
        </div>
      );
    }
    if (kind === "none") {
      return (
        <div className="flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary">
          此类型不支持预览
        </div>
      );
    }
    if (kind === "md") {
      return textContent === null ? null : (
        <div className="h-full overflow-y-auto p-3">
          <Markdown content={textContent} />
        </div>
      );
    }
    if (kind === "text") {
      return textContent === null ? null : (
        <pre className="h-full overflow-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all">
          {textContent}
        </pre>
      );
    }
    if (!previewUrl) return null;
    if (kind === "image") {
      return (
        <button
          type="button"
          className="flex h-full w-full items-center justify-center bg-black/20 p-1 cursor-zoom-in"
          onClick={() => setZoomed(true)}
          title="点击放大"
        >
          <img
            src={previewUrl}
            alt={file.name}
            className="max-h-full max-w-full object-contain"
          />
        </button>
      );
    }
    if (kind === "video") {
      return (
        <div className="flex h-full items-center justify-center bg-black/30 p-1">
          <video src={previewUrl} controls className="max-h-full max-w-full" />
        </div>
      );
    }
    if (kind === "audio") {
      return (
        <div className="flex h-full items-center justify-center p-4">
          <audio src={previewUrl} controls className="w-full" />
        </div>
      );
    }
    // pdf / office → iframe（office 由后端转成 pdf 返回）
    return (
      <div className="relative h-full">
        {converting && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background-base/90 text-sm text-text-secondary">
            <Spinner />
            <span>首次转换中，请稍候…</span>
            <span className="text-xs text-text-tertiary">
              Office 文档需经 LibreOffice 转换，可能需要 5-30 秒
            </span>
          </div>
        )}
        <iframe
          title={file.name}
          src={previewUrl}
          className="h-full w-full border-0 bg-white [color-scheme:light]"
          onLoad={() => setConverting(false)}
        />
      </div>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 信息区 */}
      <div className="shrink-0 space-y-1.5 border-b border-current/10 px-3 py-2.5 text-sm">
        <div className="flex items-start justify-between gap-2">
          <span className="min-w-0 break-all font-medium leading-snug">
            {file.name}
          </span>
          <span className="flex shrink-0 items-center gap-1">
            {onCopy && (
              <button
                type="button"
                onClick={onCopy}
                title="复制"
                aria-label="复制"
                className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
              >
                <Copy className="size-3.5" />
              </button>
            )}
            {onCut && (
              <button
                type="button"
                onClick={onCut}
                title="剪切"
                aria-label="剪切"
                className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
              >
                <Scissors className="size-3.5" />
              </button>
            )}
            {onRename && (
              <button
                type="button"
                onClick={onRename}
                title="重命名"
                aria-label="重命名"
                className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
              >
                <Pencil className="size-3.5" />
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                title="删除"
                aria-label="删除"
                className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-red-400/50 hover:text-red-400"
              >
                <Trash2 className="size-3.5" />
              </button>
            )}
            {onForward && (
              <button
                type="button"
                onClick={onForward}
                title="转发到对话"
                aria-label="转发到对话"
                className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
              >
                <Send className="size-3.5" />
              </button>
            )}
            <button
              type="button"
              onClick={revealInFolder}
              title="在文件夹中显示"
              aria-label="在文件夹中显示"
              className="flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
            >
              <FolderOpen className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={openInSystem}
              className="flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
            >
              <ExternalLink className="size-3.5" />
              在系统里打开
            </button>
          </span>
        </div>
        <dl className="space-y-1 text-xs text-text-secondary">
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-text-tertiary">类型</dt>
            <dd className="min-w-0 truncate">
              {PREVIEW_KIND_LABEL[kind]}
              {file.ext && <span className="text-text-tertiary">（.{file.ext}）</span>}
              {info?.mime && (
                <span className="text-text-tertiary"> · {info.mime}</span>
              )}
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-text-tertiary">大小</dt>
            <dd>{formatBytes(file.size)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-text-tertiary">修改时间</dt>
            <dd>{formatDateTime(file.mtime)}</dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-text-tertiary">路径</dt>
            <dd className="flex min-w-0 items-center gap-1">
              <span className="min-w-0 break-all font-mono">{file.path}</span>
              <button
                type="button"
                onClick={copyPath}
                aria-label="复制路径"
                className="shrink-0 p-0.5 text-text-tertiary hover:text-midground"
              >
                {copied ? (
                  <Check className="size-3.5 text-emerald-400" />
                ) : (
                  <Copy className="size-3.5" />
                )}
              </button>
            </dd>
          </div>
          <div className="flex gap-2">
            <dt className="w-16 shrink-0 text-text-tertiary">预览缓存</dt>
            <dd>
              {kind === "none" ? (
                <span className="text-text-tertiary">不适用</span>
              ) : info ? (
                info.preview_cached ? (
                  <span className="text-emerald-400">已缓存</span>
                ) : (
                  <span className="text-text-tertiary">未缓存</span>
                )
              ) : (
                "-"
              )}
            </dd>
          </div>
        </dl>
      </div>

      {/* 预览区 */}
      <div className="min-h-0 flex-1">{renderPreview()}</div>

      {/* 图片放大遮罩 */}
      {zoomed && previewUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
          role="dialog"
          aria-label="图片放大预览"
        >
          <button
            type="button"
            aria-label="关闭"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20"
            onClick={() => setZoomed(false)}
          >
            <X className="size-5" />
          </button>
          <img
            src={previewUrl}
            alt={file.name}
            className={cn("max-h-full max-w-full object-contain")}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}
