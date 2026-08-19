import { useCallback, useEffect, useMemo, useState } from "react";
import { ExternalLink, NotebookPen, Search, X } from "lucide-react";
import { Spinner } from "../shared/Spinner";
import { cn } from "../sdk";
import { LibraryNoteEditor } from "./LibraryNoteEditor";
import {
  feedItemToFileEntry,
  libraryApi,
  type FeedItem,
  type LibraryFeedResponse,
  type LibraryFileEntry,
} from "./api";

interface LibraryFeedViewProps {
  /** feed 分支根路径（信息源目录） */
  path: string;
  /** bump 时重新拉取 */
  refreshKey: number;
  selectedPath: string | null;
  onSelectFile: (file: LibraryFileEntry) => void;
  onOpenFile: (file: LibraryFileEntry) => void;
  onToast: (message: string, kind: "success" | "error") => void;
  /** 仅 feed_dirs 标记的信息源传入（分支级 type:feed 是手工配置，不可在此取消） */
  onUnmarkFeed?: () => void;
  unmarkBusy?: boolean;
}

const STATUS_STYLE: Record<string, string> = {
  待读: "border-current/20 text-text-secondary",
  在读: "border-amber-400/40 bg-amber-400/10 text-amber-400",
  已读: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400",
};

/**
 * type: feed 分支（信息源）的聚合视图：跨源列出全部条目，
 * 按日期分组，支持状态/来源/标题筛选，点击状态徽标轮转阅读状态
 * （状态只写 index.db，源文件保持只读）。
 */
export function LibraryFeedView({
  path,
  refreshKey,
  selectedPath,
  onSelectFile,
  onOpenFile,
  onToast,
  onUnmarkFeed,
  unmarkBusy,
}: LibraryFeedViewProps) {
  const [feed, setFeed] = useState<LibraryFeedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("全部");
  const [sourceFilter, setSourceFilter] = useState<string>("全部");
  const [query, setQuery] = useState("");
  const [pendingStatus, setPendingStatus] = useState<string | null>(null);
  const [pendingNote, setPendingNote] = useState<string | null>(null);
  const [notePath, setNotePath] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    libraryApi
      .getFeed(path)
      .then((res) => {
        if (!cancelled) setFeed(res);
      })
      .catch((e) => {
        if (!cancelled) {
          setFeed(null);
          setError(String(e));
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [path, refreshKey]);

  const statuses = feed?.statuses ?? [];
  const sources = useMemo(
    () => Object.keys(feed?.stats.by_source ?? {}).sort(),
    [feed],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return (feed?.items ?? []).filter((it) => {
      if (statusFilter !== "全部" && it.status !== statusFilter) return false;
      if (sourceFilter !== "全部" && it.source !== sourceFilter) return false;
      if (
        q &&
        !it.title.toLowerCase().includes(q) &&
        !it.authors.toLowerCase().includes(q) &&
        !it.tags.toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [feed, statusFilter, sourceFilter, query]);

  const groups = useMemo(() => {
    const map = new Map<string, FeedItem[]>();
    for (const it of filtered) {
      const key = it.date || "未注明日期";
      const arr = map.get(key);
      if (arr) arr.push(it);
      else map.set(key, [it]);
    }
    return [...map.entries()];
  }, [filtered]);

  const cycleStatus = useCallback(
    async (item: FeedItem) => {
      if (pendingStatus || statuses.length === 0) return;
      const idx = statuses.indexOf(item.status);
      const next = statuses[(idx + 1) % statuses.length];
      setPendingStatus(item.path);
      try {
        await libraryApi.setFeedStatus(item.path, next);
        setFeed((prev) => {
          if (!prev) return prev;
          const items = prev.items.map((it) =>
            it.path === item.path ? { ...it, status: next } : it,
          );
          const by_status = { ...prev.stats.by_status };
          by_status[item.status] = (by_status[item.status] ?? 1) - 1;
          if (by_status[item.status] <= 0) delete by_status[item.status];
          by_status[next] = (by_status[next] ?? 0) + 1;
          return { ...prev, items, stats: { ...prev.stats, by_status } };
        });
      } catch (e) {
        onToast(`更新阅读状态失败:${e}`, "error");
      } finally {
        setPendingStatus(null);
      }
    },
    [pendingStatus, statuses, onToast],
  );

  // 打开条目笔记：无绑定先创建（模板渲染 + feed_notes 绑定），再弹编辑模态
  const openNote = useCallback(
    async (item: FeedItem) => {
      if (pendingNote) return;
      if (item.note_path) {
        setNotePath(item.note_path);
        return;
      }
      setPendingNote(item.path);
      try {
        const res = await libraryApi.createFeedNote(item.path);
        setFeed((prev) =>
          prev
            ? {
                ...prev,
                items: prev.items.map((it) =>
                  it.path === item.path ? { ...it, note_path: res.note_path } : it,
                ),
              }
            : prev,
        );
        if (res.created) onToast("已创建条目笔记", "success");
        setNotePath(res.note_path);
      } catch (e) {
        onToast(`创建笔记失败:${e}`, "error");
      } finally {
        setPendingNote(null);
      }
    },
    [pendingNote, onToast],
  );

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-sm text-text-secondary">
        <Spinner />
        <span>加载信息源…</span>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-full items-center justify-center px-4 text-center text-sm text-red-400">
        加载信息源失败:{error}
      </div>
    );
  }
  if (!feed) return null;

  // feed_dirs 标记的信息源没有 notes 配置——隐藏条目笔记按钮
  const notesEnabled = feed.notes_enabled;

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* 筛选栏 */}
      <div className="shrink-0 space-y-2 border-b border-current/10 px-3 py-2">
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-text-tertiary">
            共 {feed.stats.total} 篇 · 筛选后 {filtered.length} 篇
          </span>
          {onUnmarkFeed && (
            <button
              type="button"
              onClick={onUnmarkFeed}
              disabled={unmarkBusy}
              title="从 feed_dirs 取消信息源标记（阅读状态保留）"
              className="rounded-full border border-current/15 px-2 py-0.5 text-text-secondary hover:border-current/30 disabled:opacity-50"
            >
              取消信息源
            </button>
          )}
          <span className="mx-1 text-text-tertiary">|</span>
          {["全部", ...statuses].map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={statusFilter === s}
              onClick={() => setStatusFilter(s)}
              className={cn(
                "rounded-full border px-2 py-0.5",
                statusFilter === s
                  ? "border-current/40 bg-midground/10 text-midground"
                  : "border-current/15 text-text-secondary hover:border-current/30",
              )}
            >
              {s}
              {s !== "全部" && feed.stats.by_status[s]
                ? ` ${feed.stats.by_status[s]}`
                : ""}
            </button>
          ))}
          <span className="mx-1 text-text-tertiary">|</span>
          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-sm border border-current/15 bg-transparent px-1.5 py-0.5 text-xs text-text-secondary focus:border-current/30 focus:outline-none"
          >
            <option value="全部">全部来源</option>
            {sources.map((s) => (
              <option key={s} value={s}>
                {s}（{feed.stats.by_source[s]}）
              </option>
            ))}
          </select>
          <div className="relative ml-auto min-w-32">
            <Search className="pointer-events-none absolute left-1.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Escape") setQuery("");
              }}
              placeholder="筛选标题/作者/标签…"
              className="w-full rounded-sm border border-current/15 bg-transparent py-0.5 pl-6 pr-6 text-xs placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
            />
            {query && (
              <button
                type="button"
                aria-label="清空筛选"
                onClick={() => setQuery("")}
                className="absolute right-1 top-1/2 -translate-y-1/2 p-0.5 text-text-tertiary hover:text-midground"
              >
                <X className="size-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 条目列表（按日期分组） */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        {filtered.length === 0 && (
          <p className="px-4 py-10 text-center text-sm text-text-tertiary">
            没有匹配的条目
          </p>
        )}
        {groups.map(([date, items]) => (
          <section key={date}>
            <h3 className="sticky top-0 z-10 border-b border-current/10 bg-background-base/95 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur">
              {date}
              <span className="ml-2 text-text-tertiary">{items.length} 篇</span>
            </h3>
            <ul className="divide-y divide-current/5">
              {items.map((it) => (
                <li key={it.path}>
                  <div
                    role="button"
                    tabIndex={0}
                    onClick={() => onSelectFile(feedItemToFileEntry(it))}
                    onDoubleClick={() => onOpenFile(feedItemToFileEntry(it))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") onOpenFile(feedItemToFileEntry(it));
                    }}
                    className={cn(
                      "flex w-full min-w-0 cursor-pointer items-start gap-2.5 px-3 py-2 text-left hover:bg-midground/5",
                      selectedPath === it.path && "bg-midground/10",
                    )}
                  >
                    <button
                      type="button"
                      title="点击切换阅读状态"
                      disabled={pendingStatus === it.path}
                      onClick={(e) => {
                        e.stopPropagation();
                        void cycleStatus(it);
                      }}
                      className={cn(
                        "mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-xs disabled:opacity-50",
                        STATUS_STYLE[it.status] ?? STATUS_STYLE["待读"],
                      )}
                    >
                      {it.status}
                    </button>
                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "min-w-0 truncate text-sm",
                            it.status === "已读" && "text-text-tertiary",
                          )}
                          title={it.title}
                        >
                          {it.title}
                        </span>
                        {it.link && (
                          <a
                            href={it.link}
                            target="_blank"
                            rel="noreferrer"
                            aria-label="打开原文链接"
                            title={it.link}
                            onClick={(e) => e.stopPropagation()}
                            className="shrink-0 p-0.5 text-text-tertiary hover:text-midground"
                          >
                            <ExternalLink className="size-3.5" />
                          </a>
                        )}
                        {notesEnabled && (
                          <button
                            type="button"
                            aria-label={it.note_path ? "打开条目笔记" : "创建条目笔记"}
                            title={
                              it.note_path ? `笔记：${it.note_path}` : "创建条目笔记"
                            }
                            disabled={pendingNote === it.path}
                            onClick={(e) => {
                              e.stopPropagation();
                              void openNote(it);
                            }}
                            className={cn(
                              "shrink-0 p-0.5 disabled:opacity-50",
                              it.note_path
                                ? "text-midground hover:text-midground/70"
                                : "text-text-tertiary hover:text-midground",
                            )}
                          >
                            <NotebookPen className="size-3.5" />
                          </button>
                        )}
                      </span>
                      <span className="mt-0.5 flex min-w-0 items-center gap-2 text-xs text-text-tertiary">
                        <span className="shrink-0 rounded-sm border border-current/10 px-1 py-px">
                          {it.source}
                        </span>
                        {it.category && it.category !== it.source && (
                          <span className="shrink-0">{it.category}</span>
                        )}
                        {it.authors && (
                          <span className="min-w-0 truncate" title={it.authors}>
                            {it.authors}
                          </span>
                        )}
                      </span>
                      {it.tags && (
                        <span className="mt-0.5 block truncate text-xs text-text-tertiary/80">
                          {it.tags}
                        </span>
                      )}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      {/* 条目笔记编辑模态 */}
      {notePath && (
        <LibraryNoteEditor
          notePath={notePath}
          onOpenNote={setNotePath}
          onClose={() => setNotePath(null)}
          onToast={onToast}
        />
      )}
    </div>
  );
}
