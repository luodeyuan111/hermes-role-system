import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import {
  FolderTree,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PanelRightClose,
  PanelRightOpen,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { Spinner } from "./shared/Spinner";
import { Toast, useToast } from "./shared/Toast";
import { cn } from "./sdk";
import { usePageHeader } from "./shared/usePageHeader";
import {
  getLibraryPathParam,
  navigateToChat,
  replaceLibraryPathParam,
} from "./router";
import {
  feedBranchOf,
  feedDirOf,
  libraryApi,
  type LibraryFileEntry,
  type LibraryRoot,
  type LibraryTreeResponse,
} from "./library/api";
import { formatBytes, parentDir } from "./library/format";
import { LibraryTree } from "./library/LibraryTree";
import { LibraryFileArea } from "./library/LibraryFileArea";
import { LibraryFeedView } from "./library/LibraryFeedView";
import { LibraryPreviewPane } from "./library/LibraryPreviewPane";
import { LibraryForwardDialog } from "./library/LibraryForwardDialog";
import { LibraryOverview } from "./library/LibraryOverview";
import { DeleteConfirmDialog } from "./shared/DeleteConfirmDialog";

type ViewMode = "browse" | "overview";

/** 复制/剪切剪贴板（单选，paths 当前恒为 1 项）。 */
interface LibraryClipboard {
  paths: string[];
  mode: "copy" | "cut";
}

/** 重命名对话框：受控 input 预填当前文件名，Enter 确认 / Esc 取消。 */
function LibraryRenameDialog({
  file,
  loading,
  onCancel,
  onSubmit,
}: {
  file: LibraryFileEntry;
  loading: boolean;
  onCancel: () => void;
  onSubmit: (newName: string) => void;
}) {
  const [value, setValue] = useState(file.name);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onCancel]);

  const submit = () => {
    const name = value.trim();
    if (!name || name === file.name || loading) return;
    onSubmit(name);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-label="重命名"
      onClick={onCancel}
    >
      <div
        className="w-full max-w-md rounded-md border border-current/15 bg-background-base shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-current/10 px-3 py-2 text-sm font-medium">
          重命名
        </div>
        <div className="px-3 py-3">
          <input
            type="text"
            value={value}
            autoFocus
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submit();
              }
            }}
            className="w-full rounded-sm border border-current/15 bg-transparent px-2 py-1.5 text-sm focus:border-current/30 focus:outline-none"
          />
        </div>
        <div className="flex items-center justify-end gap-2 border-t border-current/10 px-3 py-2">
          <button
            type="button"
            onClick={onCancel}
            disabled={loading}
            className="rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
          >
            取消
          </button>
          <button
            type="button"
            onClick={submit}
            disabled={loading || !value.trim() || value.trim() === file.name}
            className="rounded-sm border border-current/15 bg-midground/10 px-2.5 py-1.5 text-sm text-midground hover:border-current/30 disabled:opacity-50"
          >
            {loading ? "重命名中…" : "确定"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function LibraryPage() {
  const { toast, showToast } = useToast();
  const { setTitle } = usePageHeader();

  const [roots, setRoots] = useState<LibraryRoot[]>([]);
  const [feedDirs, setFeedDirs] = useState<string[]>([]);
  const [rootsLoaded, setRootsLoaded] = useState(false);
  const [currentPath, setCurrentPath] = useState<string | null>(
    () => getLibraryPathParam(),
  );
  const [listing, setListing] = useState<LibraryTreeResponse | null>(null);
  const [listingLoading, setListingLoading] = useState(false);
  const [listingError, setListingError] = useState<string | null>(null);
  const [selected, setSelected] = useState<LibraryFileEntry | null>(null);
  const [view, setView] = useState<ViewMode>("browse");
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");
  const [treeCollapsed, setTreeCollapsed] = useState(false);
  const [paneCollapsed, setPaneCollapsed] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<LibraryFileEntry[] | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);

  // 文件管理：剪贴板 / 删除 / 重命名 / 转发到对话
  const [clipboard, setClipboard] = useState<LibraryClipboard | null>(null);
  const [pendingDelete, setPendingDelete] = useState<LibraryFileEntry | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [renameTarget, setRenameTarget] = useState<LibraryFileEntry | null>(null);
  const [renaming, setRenaming] = useState(false);
  const [forwardOpen, setForwardOpen] = useState(false);
  const [feedMarking, setFeedMarking] = useState(false);

  // 目录加载完成后要选中的文件（搜索结果/最近变更跳转用）
  const pendingSelectRef = useRef<string | null>(null);

  useLayoutEffect(() => {
    setTitle("资料馆");
    return () => setTitle(null);
  }, [setTitle]);

  // 根目录配置 + feed_dirs（标记/取消信息源后需重拉）
  const reloadConfig = useCallback(async () => {
    try {
      const res = await libraryApi.getConfig();
      setRoots(res.roots);
      setFeedDirs(res.feed_dirs);
      setRootsLoaded(true);
      setCurrentPath((prev) => prev ?? res.roots[0]?.path ?? null);
    } catch (e) {
      setRootsLoaded(true);
      showToast(`加载资料馆配置失败:${e}`, "error");
    }
  }, [showToast]);

  useEffect(() => {
    void reloadConfig();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 当前目录列表
  useEffect(() => {
    if (!currentPath || view !== "browse") return;
    if (feedBranchOf(roots, currentPath) || feedDirOf(feedDirs, currentPath)) {
      // 信息源根走聚合视图，不需要目录列表
      setListing(null);
      setSelected(null);
      setListingLoading(false);
      setListingError(null);
      return;
    }
    let cancelled = false;
    setListingLoading(true);
    setListingError(null);
    libraryApi
      .getTree(currentPath)
      .then((res) => {
        if (cancelled) return;
        setListing(res);
        const pending = pendingSelectRef.current;
        if (pending) {
          pendingSelectRef.current = null;
          const hit = res.files.find((f) => f.path === pending);
          if (hit) {
            setSelected(hit);
            setPaneCollapsed(false);
            return;
          }
        }
        setSelected(null);
      })
      .catch((e) => {
        if (!cancelled) {
          setListing(null);
          setSelected(null);
          setListingError(String(e));
        }
      })
      .finally(() => {
        if (!cancelled) setListingLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [currentPath, view, refreshKey, roots, feedDirs]);

  // 搜索防抖（300ms）
  useEffect(() => {
    const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // 文件名搜索
  useEffect(() => {
    if (!searchQuery) {
      setSearchResults(null);
      return;
    }
    let cancelled = false;
    setSearchLoading(true);
    libraryApi
      .search(searchQuery)
      .then((res) => {
        if (!cancelled) setSearchResults(res.results);
      })
      .catch((e) => {
        if (!cancelled) {
          setSearchResults([]);
          showToast(`搜索失败:${e}`, "error");
        }
      })
      .finally(() => {
        if (!cancelled) setSearchLoading(false);
      });
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  const navigate = useCallback(
    (path: string) => {
      setCurrentPath(path);
      setView("browse");
      // 清空搜索，回到普通浏览
      setSearchInput("");
      setSearchQuery("");
      setSearchResults(null);
      replaceLibraryPathParam(path);
    },
    [],
  );

  const handleRefresh = useCallback(() => {
    setRefreshKey((k) => k + 1);
    if (currentPath && view === "browse") {
      // tree 列表由 currentPath 效应随 refreshKey 重拉
    }
  }, [currentPath, view]);

  const handleSync = useCallback(async () => {
    if (syncing) return;
    setSyncing(true);
    try {
      const res = await libraryApi.sync();
      showToast(
        `同步完成：清理 ${res.removed_orphans} 个失效索引、${res.evicted} 个缓存文件，当前缓存 ${formatBytes(res.cache_bytes)}`,
        "success",
      );
      setRefreshKey((k) => k + 1);
    } catch (e) {
      showToast(`同步失败:${e}`, "error");
    } finally {
      setSyncing(false);
    }
  }, [syncing, showToast]);

  const openFileLocation = useCallback(
    (filePath: string) => {
      pendingSelectRef.current = filePath;
      navigate(parentDir(filePath));
    },
    [navigate],
  );

  const handleSelectFile = useCallback((file: LibraryFileEntry) => {
    setSelected(file);
  }, []);

  const handleOpenFile = useCallback((file: LibraryFileEntry) => {
    // 双击/回车：选中并在右栏打开预览（收起状态则展开）
    setSelected(file);
    setPaneCollapsed(false);
  }, []);

  // ── 文件管理操作（仅普通浏览视图的单选文件） ──

  const handleCopy = useCallback(() => {
    if (!selected) return;
    setClipboard({ paths: [selected.path], mode: "copy" });
    showToast("已复制 1 项", "success");
  }, [selected, showToast]);

  const handleCut = useCallback(() => {
    if (!selected) return;
    setClipboard({ paths: [selected.path], mode: "cut" });
    showToast("已剪切 1 项", "success");
  }, [selected, showToast]);

  const handlePaste = useCallback(async () => {
    if (!clipboard || !currentPath) return;
    try {
      const res = await libraryApi.pasteEntries(
        clipboard.paths,
        currentPath,
        clipboard.mode,
      );
      showToast(`已粘贴 ${res.pasted} 项`, "success");
      if (clipboard.mode === "cut") {
        // 移动后源路径失效：清剪贴板，选中项被移走则清选中
        if (selected && clipboard.paths.includes(selected.path)) {
          setSelected(null);
        }
        setClipboard(null);
      }
      setRefreshKey((k) => k + 1);
    } catch (e) {
      showToast(`粘贴失败:${e instanceof Error ? e.message : e}`, "error");
    }
  }, [clipboard, currentPath, selected, showToast]);

  const handleDelete = useCallback(() => {
    if (!selected) return;
    setPendingDelete(selected);
  }, [selected]);

  const confirmDelete = useCallback(async () => {
    if (!pendingDelete) return;
    setDeleting(true);
    try {
      await libraryApi.deleteEntries([pendingDelete.path]);
      showToast("已删除", "success");
      if (selected?.path === pendingDelete.path) setSelected(null);
      // 剪贴板指向已删除路径时一并清空
      setClipboard((prev) =>
        prev && prev.paths.includes(pendingDelete.path) ? null : prev,
      );
      setPendingDelete(null);
      setRefreshKey((k) => k + 1);
    } catch (e) {
      showToast(`删除失败:${e instanceof Error ? e.message : e}`, "error");
    } finally {
      setDeleting(false);
    }
  }, [pendingDelete, selected, showToast]);

  const handleRename = useCallback(() => {
    if (!selected) return;
    setRenameTarget(selected);
  }, [selected]);

  const submitRename = useCallback(
    async (newName: string) => {
      if (!renameTarget) return;
      setRenaming(true);
      try {
        const res = await libraryApi.renameEntry(renameTarget.path, newName);
        showToast("已重命名", "success");
        // renamed 是重命名后的新路径，同步更新选中项
        if (selected?.path === renameTarget.path) {
          setSelected({ ...selected, path: res.renamed, name: newName });
        }
        setRenameTarget(null);
        setRefreshKey((k) => k + 1);
      } catch (e) {
        showToast(`重命名失败:${e instanceof Error ? e.message : e}`, "error");
      } finally {
        setRenaming(false);
      }
    },
    [renameTarget, selected, showToast],
  );

  const handleForward = useCallback(() => {
    if (!selected) return;
    setForwardOpen(true);
  }, [selected]);

  const handleForwarded = useCallback(
    (sessionId: string, sessionTitle: string, openChat: boolean) => {
      setForwardOpen(false);
      showToast(`已转发到 ${sessionTitle}`, "success");
      if (openChat) {
        navigateToChat(sessionId);
      }
    },
    [showToast],
  );

  // 标记/取消信息源（feed_dirs；分支级 type:feed 是 yaml 手工配置，不在此管理）
  const handleFeedMark = useCallback(
    async (mark: boolean) => {
      if (!currentPath || feedMarking) return;
      setFeedMarking(true);
      try {
        if (mark) {
          await libraryApi.markFeed(currentPath);
          showToast("已标记为信息源", "success");
        } else {
          await libraryApi.unmarkFeed(currentPath);
          showToast("已取消信息源标记（阅读状态保留）", "success");
        }
        await reloadConfig();
        setRefreshKey((k) => k + 1);
      } catch (e) {
        showToast(
          `${mark ? "标记" : "取消"}失败:${e instanceof Error ? e.message : e}`,
          "error",
        );
      } finally {
        setFeedMarking(false);
      }
    },
    [currentPath, feedMarking, reloadConfig, showToast],
  );

  const searching = searchQuery.length > 0;
  // 当前路径是信息源根（分支级 type:feed 或 feed_dirs 标记）时切换为聚合视图
  const feedBranch = feedBranchOf(roots, currentPath);
  const feedDir = feedDirOf(feedDirs, currentPath);
  const isFeed = feedBranch !== null || feedDir !== null;

  return (
    <div className="hermes-library flex min-h-0 w-full min-w-0 flex-1 flex-col pt-1 sm:pt-2">
      <Toast toast={toast} />

      {/* 顶部工具栏 */}
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-current/10 pb-2">
        <div className="flex items-center rounded-sm border border-current/15">
          <button
            type="button"
            aria-pressed={view === "browse"}
            onClick={() => setView("browse")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 text-sm",
              view === "browse"
                ? "bg-midground/10 text-midground"
                : "text-text-secondary hover:text-midground",
            )}
          >
            <FolderTree className="size-4" />
            浏览
          </button>
          <button
            type="button"
            aria-pressed={view === "overview"}
            onClick={() => setView("overview")}
            className={cn(
              "flex items-center gap-1.5 px-2.5 py-1.5 text-sm",
              view === "overview"
                ? "bg-midground/10 text-midground"
                : "text-text-secondary hover:text-midground",
            )}
          >
            <LayoutDashboard className="size-4" />
            总览
          </button>
        </div>

        <div className="relative min-w-40 flex-1 sm:max-w-sm">
          <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                setSearchInput("");
                setSearchQuery("");
                setSearchResults(null);
              }
            }}
            placeholder="搜索文件名…"
            className="w-full rounded-sm border border-current/15 bg-transparent py-1.5 pl-8 pr-8 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
          />
          {searchInput && (
            <button
              type="button"
              aria-label="清空搜索"
              onClick={() => {
                setSearchInput("");
                setSearchQuery("");
                setSearchResults(null);
              }}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-text-tertiary hover:text-midground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={handleRefresh}
            title="刷新"
            className="rounded-sm border border-current/15 p-1.5 text-text-secondary hover:border-current/30 hover:text-midground"
          >
            <RefreshCw className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => void handleSync()}
            disabled={syncing}
            className="flex items-center gap-1.5 rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
          >
            {syncing ? <Spinner /> : <RefreshCw className="size-4" />}
            同步缓存
          </button>
        </div>
      </div>

      {view === "overview" ? (
        <div className="min-h-0 flex-1">
          <LibraryOverview
            onOpenPath={navigate}
            onOpenFile={openFileLocation}
            refreshKey={refreshKey}
          />
        </div>
      ) : (
        <div className="flex min-h-0 min-w-0 flex-1 overflow-hidden">
          {/* 左：目录树 */}
          {treeCollapsed ? (
            <div className="flex w-8 shrink-0 flex-col items-center border-r border-current/10 pt-2">
              <button
                type="button"
                aria-label="展开目录树"
                title="展开目录树"
                onClick={() => setTreeCollapsed(false)}
                className="p-1 text-text-tertiary hover:text-midground"
              >
                <PanelLeftOpen className="size-4" />
              </button>
            </div>
          ) : (
            <aside className="flex w-60 shrink-0 flex-col border-r border-current/10">
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="relative min-h-0 flex-1">
                  <LibraryTree
                    roots={roots}
                    currentPath={currentPath}
                    refreshKey={refreshKey}
                    onNavigate={navigate}
                  />
                  <button
                    type="button"
                    aria-label="收起目录树"
                    title="收起目录树"
                    onClick={() => setTreeCollapsed(true)}
                    className="absolute right-1 top-1.5 p-1 text-text-tertiary hover:text-midground"
                  >
                    <PanelLeftClose className="size-3.5" />
                  </button>
                </div>
              </div>
            </aside>
          )}

          {/* 中：文件区 / 搜索结果 */}
          <main className="min-w-0 flex-1">
            {searching ? (
              <div className="flex h-full min-h-0 flex-col">
                <div className="border-b border-current/10 px-3 py-2 text-sm text-text-secondary">
                  {searchLoading ? (
                    <span className="flex items-center gap-2">
                      <Spinner /> 搜索「{searchQuery}」…
                    </span>
                  ) : (
                    <>
                      「{searchQuery}」的搜索结果（{searchResults?.length ?? 0}
                      ）· Esc 或清空返回浏览
                    </>
                  )}
                </div>
                <div className="min-h-0 flex-1 overflow-y-auto">
                  {!searchLoading && searchResults?.length === 0 && (
                    <p className="px-4 py-10 text-center text-sm text-text-tertiary">
                      没有匹配的文件
                    </p>
                  )}
                  <ul className="divide-y divide-current/5">
                    {(searchResults ?? []).map((file) => (
                      <li key={file.path}>
                        <button
                          type="button"
                          onClick={() => openFileLocation(file.path)}
                          title={file.path}
                          className="flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left hover:bg-midground/5"
                        >
                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm">{file.name}</span>
                            <span className="block truncate text-xs text-text-tertiary">
                              {parentDir(file.path)}
                            </span>
                          </span>
                          <span className="shrink-0 text-xs text-text-secondary">
                            {formatBytes(file.size)}
                          </span>
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : isFeed && currentPath ? (
              <LibraryFeedView
                path={currentPath}
                refreshKey={refreshKey}
                selectedPath={selected?.path ?? null}
                onSelectFile={handleSelectFile}
                onOpenFile={handleOpenFile}
                onToast={showToast}
                onUnmarkFeed={
                  feedBranch || feedDir ? () => void handleFeedMark(false) : undefined
                }
                unmarkOrigin={feedBranch ? "branch" : "dir"}
                unmarkBusy={feedMarking}
              />
            ) : (
              <LibraryFileArea
                roots={roots}
                listing={listing}
                loading={listingLoading || !rootsLoaded}
                error={listingError}
                displayMode={displayMode}
                onDisplayModeChange={setDisplayMode}
                selectedPath={selected?.path ?? null}
                onSelectFile={handleSelectFile}
                onOpenFile={handleOpenFile}
                onNavigate={navigate}
                clipboard={clipboard}
                onPaste={() => void handlePaste()}
                onMarkFeed={currentPath ? () => void handleFeedMark(true) : undefined}
                markBusy={feedMarking}
              />
            )}
          </main>

          {/* 右：预览 + 信息 */}
          {paneCollapsed ? (
            <div className="flex w-8 shrink-0 flex-col items-center border-l border-current/10 pt-2">
              <button
                type="button"
                aria-label="展开预览面板"
                title="展开预览面板"
                onClick={() => setPaneCollapsed(false)}
                className="p-1 text-text-tertiary hover:text-midground"
              >
                <PanelRightOpen className="size-4" />
              </button>
            </div>
          ) : (
            <aside className="relative w-100 max-w-[45vw] shrink-0 border-l border-current/10 max-lg:hidden">
              <button
                type="button"
                aria-label="收起预览面板"
                title="收起预览面板"
                onClick={() => setPaneCollapsed(true)}
                className="absolute left-1 top-1.5 z-10 p-1 text-text-tertiary hover:text-midground"
              >
                <PanelRightClose className="size-3.5" />
              </button>
              {/* feed 聚合视图不提供文件管理操作 */}
              <LibraryPreviewPane
                file={selected}
                refreshKey={refreshKey}
                onCopy={isFeed ? undefined : handleCopy}
                onCut={isFeed ? undefined : handleCut}
                onRename={isFeed ? undefined : handleRename}
                onDelete={isFeed ? undefined : handleDelete}
                onForward={isFeed ? undefined : handleForward}
              />
            </aside>
          )}
        </div>
      )}

      {/* 删除确认（目录递归删除） */}
      <DeleteConfirmDialog
        open={pendingDelete !== null}
        title="删除文件"
        description={`确定删除「${pendingDelete?.name ?? ""}」吗？此操作不可恢复。`}
        confirmLabel="删除"
        loading={deleting}
        onConfirm={() => void confirmDelete()}
        onCancel={() => setPendingDelete(null)}
      />

      {/* 重命名 */}
      {renameTarget && (
        <LibraryRenameDialog
          file={renameTarget}
          loading={renaming}
          onCancel={() => setRenameTarget(null)}
          onSubmit={(name) => void submitRename(name)}
        />
      )}

      {/* 转发到对话 */}
      <LibraryForwardDialog
        open={forwardOpen}
        file={selected}
        onClose={() => setForwardOpen(false)}
        onForwarded={handleForwarded}
        onToast={showToast}
      />
    </div>
  );
}
