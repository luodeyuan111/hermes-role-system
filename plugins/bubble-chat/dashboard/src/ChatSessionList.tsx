/**
 * ChatSessionList — a ChatGPT-style conversation switcher beside the bubble
 * chat (plugin-local copy of web/src/components/ChatSessionList.tsx; the
 * web original stays for the legacy terminal ChatPage at /chat-legacy).
 *
 * It lists the most recent sessions for the active management profile and
 * lets the user swap between them without leaving the Chat page. Selecting
 * a row sets `/chat?resume=<id>` (history API + popstate — see ./router);
 * the bubble-chat store treats the resume target as the session spec, so
 * the change tears down the current render state and resumes that
 * conversation over the gateway WebSocket. The "New session" action clears
 * the resume param, which spawns a fresh session.
 *
 * Best-effort: a failed fetch surfaces a small inline error with a retry
 * affordance and the chat pane keeps working.
 */

import { memo } from "react";
import { Button, useI18n, api, cn, timeAgo } from "./sdk";
import type { SessionInfo, SessionSearchResult } from "./sdk";
import { ListItem } from "./shared/ListItem";
import { Spinner } from "./shared/Spinner";
import { setResumeParam } from "./router";
import {
  AlertCircle,
  ListChecks,
  MessageSquare,
  MessageSquarePlus,
  PanelLeftClose,
  Pencil,
  RefreshCw,
  Star,
  Timer,
  Trash2,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const SESSION_LIMIT = 30;
/** localStorage key prefix for starred sessions, per management profile. */
const FAVORITES_KEY_PREFIX = "hermes.bubblechat.favorites.";

function readFavorites(scope: string): Set<string> {
  try {
    const raw = localStorage.getItem(FAVORITES_KEY_PREFIX + scope);
    const arr: unknown = raw ? JSON.parse(raw) : [];
    return new Set(
      Array.isArray(arr) ? arr.filter((x): x is string => typeof x === "string") : [],
    );
  } catch {
    return new Set();
  }
}

function writeFavorites(scope: string, favs: ReadonlySet<string>): void {
  try {
    localStorage.setItem(FAVORITES_KEY_PREFIX + scope, JSON.stringify([...favs]));
  } catch {
    /* localStorage may be unavailable in private browsing */
  }
}

interface ChatSessionListProps {
  /** Active resume target (the session currently shown in the terminal). */
  activeSessionId: string | null;
  /** Management profile from the dashboard switcher — scopes the listing. */
  profile?: string;
  className?: string;
  /** Optional callback fired after a row is picked (e.g. close mobile sheet). */
  onPicked?: () => void;
  /** Fired with the session id when a row is picked — the role sidebar uses
   *  it to bind the owning role for the resume (role sessions live in their
   *  own profile's state.db). */
  onPickSession?: (id: string) => void;
  /**
   * Starts a fresh chat. ChatPage supplies its `startFreshDashboardChat`,
   * which clears `?resume` AND bumps the reconnect nonce so a brand-new PTY
   * spawns even when the user is already on an unsaved fresh session. When
   * omitted, we fall back to clearing the resume param ourselves.
   */
  onNewChat?: () => void;
  /**
   * Bubble-chat opt-in: adds a search box plus per-row rename/delete hover
   * actions. Default off — the legacy ChatPage keeps the read-only switcher
   * (full management lives on the Sessions page there).
   */
  manageable?: boolean;
  /** Fired after a session is deleted so the host can reset if it was active. */
  onSessionDeleted?: (id: string) => void;
  /**
   * When supplied, a collapse button shows in the header (desktop sidebar
   * fold). The host owns the collapsed layout; omit in drawers.
   */
  onCollapse?: () => void;
}

function rowLabel(session: SessionInfo, untitled: string): string {
  const title = session.title?.trim();
  if (title && title !== "Untitled") return title;
  const preview = session.preview?.trim();
  if (preview) return preview;
  return untitled;
}

/** Source badge shown before the row label for non-dashboard sessions, so
 *  pet/TUI/QQ-originated conversations are recognizable at a glance. */
const SOURCE_BADGES: Record<string, string> = {
  pet: "🐾",
  tui: "⌨️",
  qqbot: "🐧",
  cron: "⏰",
};

function sourceBadge(source: string | null): string | null {
  if (!source || source === "dashboard") return null;
  return SOURCE_BADGES[source] ?? null;
}

export function ChatSessionListImpl({
  activeSessionId,
  profile,
  className,
  onPicked,
  onPickSession,
  onNewChat,
  manageable = false,
  onSessionDeleted,
  onCollapse,
}: ChatSessionListProps) {
  const { t } = useI18n();
  const [sessions, setSessions] = useState<SessionInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // Bumped to force a refetch (after switching, on Refresh, on mount).
  const [reloadNonce, setReloadNonce] = useState(0);
  // Manageable mode (bubble chat): search + rename/delete state.
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SessionSearchResult[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [renameSaving, setRenameSaving] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);
  // Manageable multi-select mode (bulk delete).
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState<ReadonlySet<string>>(new Set());
  const [bulkBusy, setBulkBusy] = useState(false);
  // Manageable 模式：cron 会话从普通对话里筛出，点「定时」才单独显示。
  const [showCron, setShowCron] = useState(false);

  // `profile` is read inside the fetch; it's part of the scope key so a
  // profile switch refetches. The empty-string fallback keeps the dep
  // stable when no profile is selected (default profile).
  const scopeKey = profile ?? "";

  // Starred sessions (manageable mode): pinned to the top of the list,
  // persisted per profile in localStorage.
  const [favorites, setFavorites] = useState<ReadonlySet<string>>(() =>
    manageable ? readFavorites(scopeKey) : new Set<string>(),
  );
  useEffect(() => {
    setFavorites(manageable ? readFavorites(scopeKey) : new Set<string>());
  }, [manageable, scopeKey]);

  const toggleFavorite = useCallback(
    (id: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        writeFavorites(scopeKey, next);
        return next;
      });
    },
    [scopeKey],
  );

  const unstarMany = useCallback(
    (ids: Iterable<string>) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        let changed = false;
        for (const id of ids) {
          if (next.delete(id)) changed = true;
        }
        if (changed) writeFavorites(scopeKey, next);
        return changed ? next : prev;
      });
    },
    [scopeKey],
  );

  // Monotonic request token: only the most recent fetch is allowed to
  // commit state, so a fast profile switch (or Refresh spam) can't land a
  // stale list out of order.
  const reqRef = useRef(0);

  const load = useCallback(() => {
    const myReq = ++reqRef.current;
    setLoading(true);
    setError(null);
    api
      .getSessions(
        SESSION_LIMIT,
        0,
        scopeKey,
        "recent",
        manageable
          ? showCron
            ? { source: "cron" }
            : { excludeSources: "cron" }
          : undefined,
      )
      .then((res) => {
        if (reqRef.current !== myReq) return;
        setSessions(res.sessions);
      })
      .catch((e: Error) => {
        if (reqRef.current !== myReq) return;
        setError(e.message || "failed to load sessions");
      })
      .finally(() => {
        if (reqRef.current === myReq) setLoading(false);
      });
  }, [scopeKey, manageable, showCron]);

  useEffect(() => {
    // Dashboard data surfaces fetch from an effect on mount + scope change;
    // keep this local and explicit until the shared lint profile is updated
    // for async loaders (matches FilesPage).
    // eslint-disable-next-line react-hooks/set-state-in-effect
    load();
    // `reloadNonce` is a manual refetch trigger (Refresh button / row pick).
  }, [load, reloadNonce]);

  const reload = useCallback(() => setReloadNonce((n) => n + 1), []);

  /* ---------------------------------------------------------------- */
  /*  Manageable mode: search / rename / delete (bubble chat opt-in)   */
  /* ---------------------------------------------------------------- */

  // Debounced full-text search (FTS5, /api/sessions/search). An empty
  // query falls back to the normal recent-sessions list.
  const searchReqRef = useRef(0);
  useEffect(() => {
    if (!manageable) return;
    const q = query.trim();
    if (!q) {
      setSearchResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    const myReq = ++searchReqRef.current;
    const timer = setTimeout(() => {
      api
        .searchSessions(q, scopeKey)
        .then((res) => {
          if (searchReqRef.current === myReq) setSearchResults(res.results);
        })
        .catch(() => {
          if (searchReqRef.current === myReq) setSearchResults([]);
        })
        .finally(() => {
          if (searchReqRef.current === myReq) setSearching(false);
        });
    }, 300);
    return () => clearTimeout(timer);
  }, [query, manageable, scopeKey]);

  const submitRename = useCallback(
    async (s: SessionInfo) => {
      const value = renameValue.trim();
      setRenamingId(null);
      if (!value || value === (s.title ?? "").trim()) return;
      setRenameSaving(true);
      setActionError(null);
      try {
        await api.renameSession(s.id, value, scopeKey);
        // Patch the row in place — a full refetch would reorder the list
        // (order=recent) while the user is looking at it.
        setSessions(
          (prev) =>
            prev?.map((it) => (it.id === s.id ? { ...it, title: value } : it)) ??
            prev,
        );
      } catch (e) {
        setActionError(e instanceof Error ? e.message : "重命名失败");
      } finally {
        setRenameSaving(false);
      }
    },
    [renameValue, scopeKey],
  );

  const removeSession = useCallback(
    async (s: SessionInfo) => {
      const label = rowLabel(s, t.sessions.untitledSession);
      if (
        !window.confirm(
          `${t.sessions.confirmDeleteTitle}\n${label}\n${t.sessions.confirmDeleteMessage}`,
        )
      ) {
        return;
      }
      setActionError(null);
      try {
        await api.deleteSession(s.id, scopeKey);
        setSessions((prev) => prev?.filter((it) => it.id !== s.id) ?? prev);
        unstarMany([s.id]);
        onSessionDeleted?.(s.id);
      } catch (e) {
        setActionError(
          e instanceof Error ? e.message : t.sessions.failedToDelete,
        );
      }
    },
    [onSessionDeleted, scopeKey, t, unstarMany],
  );

  /* ---------------------------------------------------------------- */
  /*  Manageable multi-select: bulk delete (POST sessions/bulk-delete) */
  /* ---------------------------------------------------------------- */

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    setSelected(new Set());
  }, []);

  const toggleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const allSelected =
    sessions != null &&
    sessions.length > 0 &&
    sessions.every((s) => selected.has(s.id));

  const toggleAll = useCallback(() => {
    setSelected((prev) => {
      const list = sessions ?? [];
      if (list.length > 0 && list.every((s) => prev.has(s.id))) return new Set();
      return new Set(list.map((s) => s.id));
    });
  }, [sessions]);

  const bulkDelete = useCallback(async () => {
    const ids = [...selected];
    if (ids.length === 0 || bulkBusy) return;
    if (
      !window.confirm(
        `确定删除选中的 ${ids.length} 个会话？\n此操作不可恢复。`,
      )
    ) {
      return;
    }
    setBulkBusy(true);
    setActionError(null);
    try {
      await api.bulkDeleteSessions(ids, scopeKey);
      setSessions(
        (prev) => prev?.filter((it) => !selected.has(it.id)) ?? prev,
      );
      unstarMany(ids);
      // Notify the host per deleted id (it resets when the active one went).
      ids.forEach((id) => onSessionDeleted?.(id));
      exitSelectMode();
      reload();
    } catch (e) {
      setActionError(e instanceof Error ? e.message : "批量删除失败");
    } finally {
      setBulkBusy(false);
    }
  }, [selected, bulkBusy, scopeKey, onSessionDeleted, exitSelectMode, reload, unstarMany]);

  // Picking a row sets `/chat?resume=<id>` (history API — the plugin bundle
  // has no react-router; setResumeParam preserves the other params and
  // notifies the host router via popstate). Re-picking the open conversation
  // is a no-op (avoids a needless session reload).
  const pick = useCallback(
    (id: string) => {
      onPicked?.();
      if (id === activeSessionId) return;
      onPickSession?.(id);
      setResumeParam(id);
    },
    [activeSessionId, onPicked, onPickSession],
  );

  // "New chat" prefers the host page's handler (clears resume AND bumps the
  // store nonce so a fresh gateway session spawns even from an already-fresh
  // conversation). Fallback: clear the resume param ourselves. Session
  // management (delete/rename/export) lives on the Sessions page; this panel
  // only switches and starts conversations.
  const startNew = useCallback(() => {
    onPicked?.();
    if (onNewChat) {
      onNewChat();
      return;
    }
    setResumeParam(null);
  }, [onNewChat, onPicked]);

  // Starred sessions pin to the top; Array.prototype.sort is stable in JS,
  // so the server order (order=recent) is preserved within each group.
  const sortedSessions = useMemo(() => {
    if (!sessions) return sessions;
    return [...sessions].sort(
      (a, b) => Number(favorites.has(b.id)) - Number(favorites.has(a.id)),
    );
  }, [sessions, favorites]);

  // 搜索走全局 FTS 不带 source 过滤，这里按当前模式过滤：
  // 平时排除 cron 会话，「定时」模式下只看 cron 会话。
  const visibleSearchResults = useMemo(() => {
    if (!manageable || !searchResults) return searchResults;
    return searchResults.filter((r) =>
      showCron ? r.source === "cron" : r.source !== "cron",
    );
  }, [manageable, searchResults, showCron]);

  const content = useMemo(() => {
    // Search mode (manageable only): results replace the recent list while
    // the query is non-empty. Rows show the matched snippet; picking one
    // resumes that session like a normal row.
    if (manageable && query.trim()) {
      if (searching && visibleSearchResults === null) {
        return (
          <div className="flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary">
            <Spinner /> {t.common.loading}
          </div>
        );
      }
      if (!visibleSearchResults || visibleSearchResults.length === 0) {
        return (
          <div className="px-2 py-6 text-center text-xs text-text-secondary">
            {t.sessions.noMatch}
          </div>
        );
      }
      return (
        <div className="flex flex-col gap-0.5">
          {visibleSearchResults.map((r, i) => (
            <ListItem
              key={`${r.session_id}-${i}`}
              onClick={() => pick(r.session_id)}
              aria-current={r.session_id === activeSessionId ? "true" : undefined}
              className={cn(
                "flex-col items-start gap-0.5 rounded px-2 py-1.5",
                "normal-case tracking-normal",
                r.session_id === activeSessionId
                  ? "bg-primary/10 text-foreground border-l-2 border-primary"
                  : "text-text-secondary hover:bg-midground/5 hover:text-foreground",
              )}
            >
              <span className="w-full truncate text-sm font-medium">
                {r.snippet.replace(/\s+/g, " ").trim() || r.session_id}
              </span>
              <span className="flex w-full items-center gap-1.5 text-[0.6875rem] text-text-tertiary">
                {r.session_started != null && <span>{timeAgo(r.session_started)}</span>}
                {r.source && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="truncate">{r.source}</span>
                  </>
                )}
              </span>
            </ListItem>
          ))}
        </div>
      );
    }

    if (loading && sessions === null) {
      return (
        <div className="flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary">
          <Spinner /> {t.common.loading}
        </div>
      );
    }
    if (error) {
      return (
        <div className="flex flex-col items-start gap-2 px-2 py-4 text-xs">
          <div className="flex items-start gap-2 text-destructive">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span className="wrap-break-word">{error}</span>
          </div>
          <Button size="sm" outlined onClick={reload} prefix={<RefreshCw />}>
            {t.common.retry}
          </Button>
        </div>
      );
    }
    if (!sessions || sessions.length === 0) {
      return (
        <div className="px-2 py-6 text-center text-xs text-text-secondary">
          {t.sessions.noSessions}
        </div>
      );
    }
    return (
      <div className="flex flex-col gap-0.5">
        {(sortedSessions ?? []).map((s) => {
          const isActive = s.id === activeSessionId;
          const isFav = favorites.has(s.id);
          return (
            <ListItem
              key={s.id}
              onClick={() => (selectMode ? toggleSelect(s.id) : pick(s.id))}
              aria-current={isActive ? "true" : undefined}
              className={cn(
                "group flex-col items-start gap-0.5 rounded px-2 py-1.5",
                "normal-case tracking-normal",
                isActive
                  ? "bg-primary/10 text-foreground border-l-2 border-primary"
                  : "text-text-secondary hover:bg-midground/5 hover:text-foreground",
              )}
            >
              {manageable && renamingId === s.id ? (
                <input
                  autoFocus
                  value={renameValue}
                  disabled={renameSaving}
                  aria-label="重命名"
                  onClick={(e) => e.stopPropagation()}
                  onChange={(e) => setRenameValue(e.target.value)}
                  onKeyDown={(e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") void submitRename(s);
                    if (e.key === "Escape") setRenamingId(null);
                  }}
                  onBlur={() => setRenamingId(null)}
                  className="w-full rounded border border-current/20 bg-background-base px-1.5 py-0.5 text-sm focus:outline-none"
                />
              ) : (
                <span className="flex w-full items-center gap-1.5">
                  {manageable && selectMode && (
                    <input
                      type="checkbox"
                      checked={selected.has(s.id)}
                      onChange={() => toggleSelect(s.id)}
                      onClick={(e) => e.stopPropagation()}
                      aria-label={`选择 ${rowLabel(s, t.sessions.untitledSession)}`}
                      className="h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary"
                    />
                  )}
                  <span className="min-w-0 flex-1 truncate text-sm font-medium">
                    {manageable && isFav && (
                      <Star
                        aria-hidden
                        className="mr-1 inline h-3 w-3 fill-warning align-[-0.1em] text-warning"
                      />
                    )}
                    {sourceBadge(s.source) && (
                      <span className="mr-1" title={`来源：${s.source}`}>
                        {sourceBadge(s.source)}
                      </span>
                    )}
                    {rowLabel(s, t.sessions.untitledSession)}
                  </span>
                  {manageable && !selectMode && (
                    <span
                      className={cn(
                        "flex shrink-0 items-center gap-0.5",
                        "opacity-0 transition-opacity group-hover:opacity-100",
                        "focus-within:opacity-100",
                      )}
                    >
                      <button
                        type="button"
                        aria-label={isFav ? "取消收藏" : "收藏"}
                        title={isFav ? "取消收藏" : "收藏"}
                        className="cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-warning"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleFavorite(s.id);
                        }}
                      >
                        <Star
                          className={cn(
                            "h-3.5 w-3.5",
                            isFav && "fill-warning text-warning",
                          )}
                        />
                      </button>
                      <button
                        type="button"
                        aria-label="重命名"
                        title="重命名"
                        className="cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground"
                        onClick={(e) => {
                          e.stopPropagation();
                          setRenameValue(s.title?.trim() || "");
                          setRenamingId(s.id);
                        }}
                      >
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button
                        type="button"
                        aria-label={t.common.delete}
                        title={t.common.delete}
                        className="cursor-pointer rounded p-1 text-text-tertiary hover:bg-destructive/10 hover:text-destructive"
                        onClick={(e) => {
                          e.stopPropagation();
                          void removeSession(s);
                        }}
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </span>
                  )}
                </span>
              )}
              <span className="flex w-full items-center gap-1.5 text-[0.6875rem] text-text-tertiary">
                <span>{timeAgo(s.last_active)}</span>
                {s.message_count > 0 && (
                  <>
                    <span aria-hidden>·</span>
                    <span>{s.message_count} msgs</span>
                  </>
                )}
                {s.source && s.source !== "cli" && (
                  <>
                    <span aria-hidden>·</span>
                    <span className="truncate">{s.source}</span>
                  </>
                )}
              </span>
            </ListItem>
          );
        })}
      </div>
    );
  }, [
    activeSessionId,
    error,
    favorites,
    loading,
    manageable,
    pick,
    query,
    reload,
    renameSaving,
    renameValue,
    renamingId,
    removeSession,
    searchResults,
    searching,
    selectMode,
    selected,
    sessions,
    sortedSessions,
    submitRename,
    t,
    toggleFavorite,
    toggleSelect,
    visibleSearchResults,
  ]);

  return (
    <aside
      className={cn(
        "flex h-full w-full min-w-0 shrink-0 flex-col overflow-hidden",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-2 px-2 pb-2">
        <span className="text-display text-xs tracking-wider text-text-tertiary">
          {t.sessions.title}
        </span>
        <span className="flex items-center gap-0.5">
          {manageable && !selectMode && sessions != null && sessions.length > 0 && (
            <Button
              ghost
              size="icon"
              onClick={() => setSelectMode(true)}
              aria-label="多选"
              title="多选"
              className="text-text-secondary hover:text-foreground"
            >
              <ListChecks />
            </Button>
          )}
          <Button
            ghost
            size="icon"
            onClick={reload}
            aria-label={t.common.refresh}
            title={t.common.refresh}
            className="text-text-secondary hover:text-foreground"
          >
            <RefreshCw className={cn(loading && "animate-spin")} />
          </Button>
          {onCollapse && (
            <Button
              ghost
              size="icon"
              onClick={onCollapse}
              aria-label="折叠会话列表"
              title="折叠会话列表"
              className="text-text-secondary hover:text-foreground"
            >
              <PanelLeftClose />
            </Button>
          )}
        </span>
      </div>

      <Button
        outlined
        size="sm"
        onClick={startNew}
        prefix={<MessageSquarePlus />}
        className="mx-2 mb-2 justify-center"
      >
        {t.sessions.newChat}
      </Button>

      {manageable && (
        <div
          role="tablist"
          aria-label="会话类型"
          className="mx-2 mb-2 flex rounded-lg border border-current/15 text-xs"
        >
          {(
            [
              { key: false, label: "对话", icon: MessageSquare },
              { key: true, label: "定时", icon: Timer },
            ] as const
          ).map(({ key, label, icon: Icon }) => (
            <button
              key={label}
              type="button"
              role="tab"
              aria-selected={showCron === key}
              onClick={() => {
                if (showCron === key) return;
                exitSelectMode();
                setShowCron(key);
              }}
              className={cn(
                "flex flex-1 cursor-pointer items-center justify-center gap-1 py-1.5",
                "first:rounded-l-[0.45rem] last:rounded-r-[0.45rem]",
                showCron === key
                  ? "bg-primary/10 text-foreground"
                  : "text-text-secondary hover:bg-midground/5 hover:text-foreground",
              )}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </button>
          ))}
        </div>
      )}

      {manageable && (
        <div className="px-2 pb-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={t.sessions.searchPlaceholder}
            aria-label={t.common.search}
            className={cn(
              "w-full rounded-lg border border-current/15 bg-background-base",
              "px-2.5 py-1.5 text-sm placeholder:text-text-tertiary",
              "focus:border-current/30 focus:outline-none",
            )}
          />
        </div>
      )}

      {manageable && selectMode && (
        <div className="flex items-center gap-1.5 px-2 pb-2 text-xs">
          <label className="flex cursor-pointer items-center gap-1 text-text-secondary hover:text-foreground">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={toggleAll}
              aria-label="全选"
              className="h-3.5 w-3.5 cursor-pointer accent-primary"
            />
            全选
          </label>
          <button
            type="button"
            disabled={selected.size === 0 || bulkBusy}
            onClick={() => void bulkDelete()}
            className={cn(
              "cursor-pointer rounded px-1.5 py-0.5 text-destructive",
              "hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {bulkBusy ? "删除中…" : `删除所选（${selected.size}）`}
          </button>
          <button
            type="button"
            onClick={exitSelectMode}
            className="ml-auto cursor-pointer rounded px-1.5 py-0.5 text-text-secondary hover:bg-midground/10 hover:text-foreground"
          >
            取消
          </button>
        </div>
      )}

      {actionError && (
        <div className="mx-2 mb-2 rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive wrap-break-word">
          {actionError}
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1 pb-1">
        {content}
      </div>
    </aside>
  );
}

// Memoized: the bubble-chat store emits per streaming delta (20-50/s),
// re-rendering the whole page each time; the sidebar's props are all
// stable references, so it can skip those renders entirely.
export const ChatSessionList = memo(ChatSessionListImpl);
