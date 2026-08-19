import { useEffect, useState } from "react";
import {
  ClipboardPaste,
  File,
  Rss,
  FileAudio,
  FileCode,
  FileImage,
  FileText,
  FileVideo,
  Folder,
  LayoutGrid,
  List,
} from "lucide-react";
import { Spinner } from "../shared/Spinner";
import { cn } from "../sdk";
import {
  fetchLibraryBlobUrl,
  type LibraryDirEntry,
  type LibraryFileEntry,
  type LibraryRoot,
  type LibraryTreeResponse,
  type PreviewKind,
} from "./api";
import {
  PREVIEW_KIND_COLOR,
  formatBytes,
  formatDateTime,
} from "./format";

const KIND_ICON: Record<PreviewKind, typeof File> = {
  image: FileImage,
  video: FileVideo,
  audio: FileAudio,
  pdf: FileText,
  office: FileText,
  text: FileText,
  md: FileCode,
  none: File,
};

/** 网格缩略图：authedFetch 换 blob（插件无 ?token= 白名单，见 api.ts）。 */
function LibraryThumb({ path, name }: { path: string; name: string }) {
  const [src, setSrc] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (src) return;
    let revoke: string | null = null;
    let cancelled = false;
    fetchLibraryBlobUrl("thumb", path, { size: "320" })
      .then((url) => {
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        revoke = url;
        setSrc(url);
      })
      .catch(() => {
        if (!cancelled) setFailed(true);
      });
    return () => {
      cancelled = true;
      if (revoke) URL.revokeObjectURL(revoke);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [path]);

  if (failed || !src) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        {failed ? (
          <FileImage className="size-8 text-text-tertiary" />
        ) : (
          <Spinner />
        )}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={name}
      loading="lazy"
      className="h-full w-full object-cover"
      onError={() => setFailed(true)}
    />
  );
}

interface LibraryFileAreaProps {
  roots: LibraryRoot[];
  listing: LibraryTreeResponse | null;
  loading: boolean;
  error: string | null;
  displayMode: "grid" | "list";
  onDisplayModeChange: (mode: "grid" | "list") => void;
  selectedPath: string | null;
  onSelectFile: (file: LibraryFileEntry) => void;
  /** 双击/回车：文件 → 预览，目录 → 进入 */
  onOpenFile: (file: LibraryFileEntry) => void;
  onNavigate: (path: string) => void;
  /** 剪贴板（复制/剪切暂存）；null 时粘贴按钮 disabled。不传则不渲染粘贴按钮 */
  clipboard?: { paths: string[]; mode: "copy" | "cut" } | null;
  onPaste?: () => void;
  /** 提供则在面包屑行显示「标记为信息源」（当前目录不是任何信息源根时） */
  onMarkFeed?: () => void;
  markBusy?: boolean;
}

export function LibraryFileArea({
  roots,
  listing,
  loading,
  error,
  displayMode,
  onDisplayModeChange,
  selectedPath,
  onSelectFile,
  onOpenFile,
  onNavigate,
  clipboard,
  onPaste,
  onMarkFeed,
  markBusy,
}: LibraryFileAreaProps) {
  // 面包屑：匹配到 root 后从 root 名开始，否则退化为完整路径段
  const crumbs = (() => {
    const path = listing?.path;
    if (!path) return [];
    const root = roots.find(
      (r) => path === r.path || path.startsWith(r.path + "/"),
    );
    if (!root) return [{ name: path, path }];
    const out = [{ name: root.name, path: root.path }];
    if (path !== root.path) {
      const rel = path.slice(root.path.length + 1).split("/");
      let acc = root.path;
      for (const part of rel) {
        acc += "/" + part;
        out.push({ name: part, path: acc });
      }
    }
    return out;
  })();

  const renderDirTile = (dir: LibraryDirEntry) => (
    <button
      key={dir.path}
      type="button"
      onClick={() => onNavigate(dir.path)}
      onDoubleClick={() => onNavigate(dir.path)}
      className={cn(
        "flex min-w-0 flex-col items-center gap-2 rounded-md border border-current/10 p-3",
        "hover:border-current/25 hover:bg-midground/5 cursor-pointer text-center",
        "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground",
      )}
      title={dir.path}
    >
      <Folder className="size-10 text-amber-300/80" />
      <span className="w-full truncate text-sm">{dir.name}</span>
      <span className="text-xs text-text-tertiary">
        {dir.file_count} 个文件 · {formatBytes(dir.total_size)}
      </span>
    </button>
  );

  const renderFileTile = (file: LibraryFileEntry) => {
    const Icon = KIND_ICON[file.preview_kind] ?? File;
    const selected = selectedPath === file.path;
    return (
      <button
        key={file.path}
        type="button"
        onClick={() => onSelectFile(file)}
        onDoubleClick={() => onOpenFile(file)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            onOpenFile(file);
          }
        }}
        className={cn(
          "flex min-w-0 flex-col rounded-md border p-2 cursor-pointer",
          "hover:border-current/25 hover:bg-midground/5",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground",
          selected
            ? "border-midground/60 bg-midground/10"
            : "border-current/10",
        )}
        title={file.path}
      >
        <div className="mb-2 h-24 w-full overflow-hidden rounded-sm bg-black/20">
          {file.preview_kind === "image" ? (
            <LibraryThumb path={file.path} name={file.name} />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Icon className={cn("size-10", PREVIEW_KIND_COLOR[file.preview_kind])} />
            </div>
          )}
        </div>
        <span
          className="line-clamp-2 w-full break-all text-left text-xs leading-tight"
          style={{ overflowWrap: "anywhere" }}
        >
          {file.name}
        </span>
        <span className="mt-1 w-full truncate text-left text-[11px] text-text-tertiary">
          {formatBytes(file.size)} · {formatDateTime(file.mtime)}
        </span>
      </button>
    );
  };

  const renderList = () => (
    <table className="w-full text-sm">
      <thead>
        <tr className="border-b border-current/10 text-left text-xs text-text-tertiary">
          <th className="px-3 py-2 font-medium">名称</th>
          <th className="w-28 px-3 py-2 font-medium">大小</th>
          <th className="w-44 px-3 py-2 font-medium">修改时间</th>
        </tr>
      </thead>
      <tbody>
        {(listing?.dirs ?? []).map((dir) => (
          <tr
            key={dir.path}
            className="cursor-pointer border-b border-current/5 hover:bg-midground/5"
            onClick={() => onNavigate(dir.path)}
            onDoubleClick={() => onNavigate(dir.path)}
            title={dir.path}
          >
            <td className="px-3 py-1.5">
              <span className="flex min-w-0 items-center gap-2">
                <Folder className="size-4 shrink-0 text-amber-300/80" />
                <span className="truncate">{dir.name}</span>
                <span className="shrink-0 text-xs text-text-tertiary">
                  {dir.file_count} 个文件
                </span>
              </span>
            </td>
            <td className="px-3 py-1.5 text-text-secondary">{formatBytes(dir.total_size)}</td>
            <td className="px-3 py-1.5 text-text-secondary">-</td>
          </tr>
        ))}
        {(listing?.files ?? []).map((file) => {
          const Icon = KIND_ICON[file.preview_kind] ?? File;
          const selected = selectedPath === file.path;
          return (
            <tr
              key={file.path}
              tabIndex={0}
              className={cn(
                "cursor-pointer border-b border-current/5 hover:bg-midground/5",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground",
                selected && "bg-midground/10",
              )}
              onClick={() => onSelectFile(file)}
              onDoubleClick={() => onOpenFile(file)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onOpenFile(file);
                }
              }}
              title={file.path}
            >
              <td className="px-3 py-1.5">
                <span className="flex min-w-0 items-center gap-2">
                  <Icon className={cn("size-4 shrink-0", PREVIEW_KIND_COLOR[file.preview_kind])} />
                  <span className="truncate">{file.name}</span>
                </span>
              </td>
              <td className="px-3 py-1.5 text-text-secondary">{formatBytes(file.size)}</td>
              <td className="px-3 py-1.5 text-text-secondary">{formatDateTime(file.mtime)}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );

  const isEmpty =
    listing && listing.dirs.length === 0 && listing.files.length === 0;

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex min-w-0 items-center gap-2 border-b border-current/10 px-3 py-2">
        <nav className="flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm [scrollbar-width:none]">
          {crumbs.map((crumb, i) => (
            <span key={crumb.path} className="flex shrink-0 items-center gap-1">
              {i > 0 && <span className="text-text-tertiary">/</span>}
              <button
                type="button"
                onClick={() => onNavigate(crumb.path)}
                className={cn(
                  "max-w-48 truncate rounded-sm px-1 py-0.5 hover:bg-midground/10 hover:text-midground",
                  i === crumbs.length - 1
                    ? "font-medium text-midground"
                    : "text-text-secondary",
                )}
              >
                {crumb.name}
              </button>
            </span>
          ))}
        </nav>
        {onMarkFeed && (
          <button
            type="button"
            onClick={onMarkFeed}
            disabled={markBusy}
            title="把当前目录聚合为信息源（写入 library.yaml 的 feed_dirs）"
            className="flex shrink-0 items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
          >
            <Rss className="size-3.5" />
            标记为信息源
          </button>
        )}
        {onPaste && (
          <button
            type="button"
            onClick={onPaste}
            disabled={!clipboard}
            title={clipboard ? `粘贴 ${clipboard.paths.length} 项到当前目录` : "剪贴板为空"}
            className="flex shrink-0 items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50 disabled:hover:border-current/15 disabled:hover:text-text-secondary"
          >
            <ClipboardPaste className="size-3.5" />
            粘贴{clipboard ? ` (${clipboard.paths.length})` : ""}
          </button>
        )}
        <div className="flex shrink-0 items-center rounded-sm border border-current/15">
          <button
            type="button"
            aria-label="网格视图"
            aria-pressed={displayMode === "grid"}
            onClick={() => onDisplayModeChange("grid")}
            className={cn(
              "p-1.5",
              displayMode === "grid"
                ? "bg-midground/10 text-midground"
                : "text-text-tertiary hover:text-midground",
            )}
          >
            <LayoutGrid className="size-4" />
          </button>
          <button
            type="button"
            aria-label="列表视图"
            aria-pressed={displayMode === "list"}
            onClick={() => onDisplayModeChange("list")}
            className={cn(
              "p-1.5",
              displayMode === "list"
                ? "bg-midground/10 text-midground"
                : "text-text-tertiary hover:text-midground",
            )}
          >
            <List className="size-4" />
          </button>
        </div>
      </div>

      <div className="min-h-0 flex-1 overflow-y-auto">
        {loading && (
          <div className="flex h-full items-center justify-center gap-2 text-sm text-text-secondary">
            <Spinner />
            <span>加载中…</span>
          </div>
        )}
        {!loading && error && (
          <p className="px-4 py-6 text-sm text-red-400">加载失败:{error}</p>
        )}
        {!loading && !error && isEmpty && (
          <p className="px-4 py-10 text-center text-sm text-text-tertiary">
            此目录为空
          </p>
        )}
        {!loading && !error && listing && !isEmpty && displayMode === "grid" && (
          <div className="grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {listing.dirs.map(renderDirTile)}
            {listing.files.map(renderFileTile)}
          </div>
        )}
        {!loading && !error && listing && !isEmpty && displayMode === "list" && (
          renderList()
        )}
      </div>
    </div>
  );
}
