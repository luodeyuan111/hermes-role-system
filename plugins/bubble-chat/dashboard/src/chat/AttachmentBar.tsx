/**
 * Attachment strip shown above the composer textarea: thumbnails for
 * uploaded images (data_url via /api/media, same resolution path as
 * MediaInline) and chips for uploaded non-image files. Every item can be
 * removed individually; items still uploading show a spinner.
 */

import { useEffect, useState } from "react";
import { File as FileIcon, Folder, ImageOff, Music, X } from "lucide-react";
import { Spinner } from "../shared/Spinner";

import { mediaKindForPath } from "./content";
import { resolveImageUrl } from "./fileAccess";
import { cn } from "../sdk";

export interface PendingImage {
  id: string;
  /** Absolute gateway path returned by /api/chat/image-upload. */
  path: string;
  name: string;
  uploading?: boolean;
}

export interface PendingFile {
  id: string;
  /** Absolute path: upload target for regular files, the original
   *  location for directory references (no upload happens for those). */
  path: string;
  name: string;
  size: number;
  uploading?: boolean;
  /** Directory reference (attached by path, never uploaded). */
  dir?: boolean;
}

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function ImageThumb({ image, onRemove }: { image: PendingImage; onRemove: () => void }) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (image.uploading) return;
    let cancelled = false;
    let blobUrl: string | null = null;
    resolveImageUrl(image.path)
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
  }, [image.path, image.uploading]);

  return (
    <div
      className={cn(
        "group relative h-14 w-14 shrink-0 overflow-hidden rounded-md",
        "border border-current/10 bg-muted/40",
      )}
      title={image.name}
    >
      {image.uploading ? (
        <span className="flex h-full w-full items-center justify-center text-text-tertiary">
          <Spinner />
        </span>
      ) : failed ? (
        <span className="flex h-full w-full items-center justify-center text-text-tertiary">
          <ImageOff className="h-4 w-4" />
        </span>
      ) : src ? (
        <img src={src} alt={image.name} className="h-full w-full object-cover" />
      ) : (
        <span className="flex h-full w-full items-center justify-center text-text-tertiary">
          <Spinner />
        </span>
      )}
      <button
        type="button"
        onClick={onRemove}
        aria-label={`移除图片 ${image.name}`}
        title="移除"
        className={cn(
          "absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white",
          "opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100",
        )}
      >
        <X className="h-3 w-3" />
      </button>
    </div>
  );
}

function FileChip({ file, onRemove }: { file: PendingFile; onRemove: () => void }) {
  return (
    <span
      className={cn(
        "inline-flex h-14 max-w-48 items-center gap-2 rounded-md px-2.5",
        "border border-current/10 bg-muted/40",
      )}
      title={file.path}
    >
      {file.uploading ? (
        <Spinner />
      ) : file.dir ? (
        <Folder className="h-4 w-4 shrink-0 text-text-secondary" />
      ) : mediaKindForPath(file.name) === "audio" ? (
        <Music className="h-4 w-4 shrink-0 text-text-secondary" />
      ) : (
        <FileIcon className="h-4 w-4 shrink-0 text-text-secondary" />
      )}
      <span className="min-w-0">
        <span className="block truncate text-xs text-foreground">{file.name}</span>
        <span className="block text-[10px] text-text-tertiary">
          {file.uploading ? "上传中…" : file.dir ? "文件夹（按路径引用）" : formatBytes(file.size)}
        </span>
      </span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`移除文件 ${file.name}`}
        title="移除"
        className="shrink-0 rounded-full p-0.5 text-text-tertiary hover:text-foreground"
      >
        <X className="h-3 w-3" />
      </button>
    </span>
  );
}

export function AttachmentBar({
  images,
  files,
  onRemoveImage,
  onRemoveFile,
}: {
  images: PendingImage[];
  files: PendingFile[];
  onRemoveImage: (id: string) => void;
  onRemoveFile: (id: string) => void;
}) {
  if (images.length === 0 && files.length === 0) return null;
  return (
    <div className="flex flex-wrap items-center gap-2 px-1 pb-2">
      {images.map((img) => (
        <ImageThumb key={img.id} image={img} onRemove={() => onRemoveImage(img.id)} />
      ))}
      {files.map((f) => (
        <FileChip key={f.id} file={f} onRemove={() => onRemoveFile(f.id)} />
      ))}
    </div>
  );
}
