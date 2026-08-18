/**
 * Inline media renderer for bubble-chat messages: images (thumbnail +
 * click-to-zoom overlay), audio and video elements fed by gateway-local
 * file paths. Path → URL resolution lives in ./fileAccess (loopback token
 * direct links, gated-mode blob fallback).
 */

import { useEffect, useState } from "react";
import { ImageOff } from "lucide-react";
import { Spinner } from "@nous-research/ui/ui/components/spinner";

import {
  resolveFileUrl,
  resolveImageUrl,
} from "@/components/chat/fileAccess";
import type { MediaRef } from "@/components/chat/content";
import { cn } from "@/lib/utils";

function fileName(path: string): string {
  return path.split("/").filter(Boolean).pop() ?? path;
}

function MediaError({ label }: { label: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border border-current/10",
        "bg-muted/40 px-2 py-1 text-xs text-text-tertiary",
      )}
    >
      <ImageOff className="h-3.5 w-3.5 shrink-0" />
      {label}
    </span>
  );
}

/** Full-screen zoom overlay for images (click anywhere to dismiss).
 * Exported so FileChip can reuse it for image-file previews. */
export function ZoomOverlay({ src, alt, onClose }: { src: string; alt: string; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      role="dialog"
      aria-label="查看图片"
      onClick={onClose}
      className="fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 animate-[fade-in_0.2s_ease]"
    >
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[90vh] max-w-[90vw] cursor-default rounded-lg shadow-2xl"
      />
    </div>
  );
}

function InlineImage({ media }: { media: MediaRef }) {
  const [src, setSrc] = useState<string | null>(media.dataUrl ?? null);
  const [failed, setFailed] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const alt = media.path ? fileName(media.path) : "图片";

  useEffect(() => {
    if (media.dataUrl || !media.path) return;
    let cancelled = false;
    let blobUrl: string | null = null;
    resolveImageUrl(media.path)
      .then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [media.path, media.dataUrl]);

  if (failed) return <MediaError label={`图片加载失败：${alt}`} />;
  if (!src) {
    return (
      <span className="flex h-24 w-40 items-center justify-center rounded-md border border-current/10 bg-muted/40 text-text-tertiary">
        <Spinner />
      </span>
    );
  }

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onClick={() => setZoomed(true)}
        onError={() => setFailed(true)}
        className={cn(
          "max-h-[420px] max-w-full cursor-zoom-in rounded-md",
          "border border-current/10 hover:border-current/25",
        )}
      />
      {zoomed && <ZoomOverlay src={src} alt={alt} onClose={() => setZoomed(false)} />}
    </>
  );
}

function InlineAv({ media }: { media: MediaRef }) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);
  const label = media.path ? fileName(media.path) : "媒体";

  useEffect(() => {
    if (!media.path) return;
    let cancelled = false;
    let blobUrl: string | null = null;
    resolveFileUrl(media.path)
      .then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [media.path]);

  if (failed) return <MediaError label={`媒体加载失败：${label}`} />;
  if (!src) {
    return (
      <span className="flex h-10 w-64 items-center justify-center rounded-md border border-current/10 bg-muted/40 text-text-tertiary">
        <Spinner />
      </span>
    );
  }

  if (media.kind === "audio") {
    return <audio controls preload="metadata" src={src} className="w-full max-w-md" />;
  }
  return (
    <video
      controls
      preload="metadata"
      src={src}
      className="max-h-[420px] max-w-full rounded-md border border-current/10"
    />
  );
}

export function MediaInline({ media }: { media: MediaRef }) {
  return (
    <div className="max-w-full">
      {media.kind === "image" ? <InlineImage media={media} /> : <InlineAv media={media} />}
    </div>
  );
}
