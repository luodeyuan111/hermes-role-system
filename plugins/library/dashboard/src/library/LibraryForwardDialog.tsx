/**
 * 转发到对话对话框：选一个会话，把当前文件（可附说明）提交给该会话生成一轮。
 * 转发由后端后台直发，前端提交成功即完成。
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, Send, X } from "lucide-react";
import { Spinner } from "../shared/Spinner";
import { cn, api, type SessionInfo } from "../sdk";
import { libraryApi, type LibraryFileEntry } from "./api";
import { formatTimeAgo } from "./format";

/** 列表行模型：普通列表与搜索结果统一成这个形状渲染。 */
interface SessionRow {
  id: string;
  title: string;
  preview: string | null;
  /** Unix 秒；null 表示未知（搜索结果可能缺） */
  time: number | null;
}

interface LibraryForwardDialogProps {
  open: boolean;
  file: LibraryFileEntry | null;
  onClose: () => void;
  /** 转发成功后由页面层 toast / 跳转；openChat=true 表示「转发并打开」 */
  onForwarded: (sessionId: string, sessionTitle: string, openChat: boolean) => void;
  onToast: (message: string, type: "error" | "success") => void;
}

export function LibraryForwardDialog({
  open,
  file,
  onClose,
  onForwarded,
  onToast,
}: LibraryForwardDialogProps) {
  const [sessions, setSessions] = useState<SessionInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState<SessionRow[] | null>(null);
  const [searching, setSearching] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [forwarding, setForwarding] = useState<"forward" | "open" | null>(null);
  const reqRef = useRef(0);

  const sessionTitle = useCallback(
    (s: SessionInfo) => s.title?.trim() || s.id.slice(0, 8),
    [],
  );

  // 打开时加载最近会话（排除 cron），并重置交互状态
  useEffect(() => {
    if (!open) return;
    setSearchInput("");
    setSearchResults(null);
    setSelectedId(null);
    setNote("");
    setForwarding(null);
    const myReq = ++reqRef.current;
    setLoading(true);
    api
      .getSessions(30, 0, undefined, "recent", { excludeSources: "cron" })
      .then((res) => {
        if (reqRef.current === myReq) setSessions(res.sessions);
      })
      .catch((e) => {
        if (reqRef.current === myReq) onToast(`加载会话列表失败:${e}`, "error");
      })
      .finally(() => {
        if (reqRef.current === myReq) setLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Esc 关闭
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // 搜索防抖（300ms）；空查询回退到最近会话列表
  useEffect(() => {
    if (!open) return;
    const q = searchInput.trim();
    if (!q) {
      setSearchResults(null);
      setSearching(false);
      return;
    }
    setSearching(true);
    const myReq = ++reqRef.current;
    const timer = setTimeout(() => {
      api
        .searchSessions(q)
        .then((res) => {
          if (reqRef.current !== myReq) return;
          // 搜索结果只有 id/snippet，标题与时间在已加载列表里兜底
          setSearchResults(
            res.results.map((r) => {
              const hit = sessions.find((s) => s.id === r.session_id);
              return {
                id: r.session_id,
                title: hit
                  ? sessionTitle(hit)
                  : r.session_id.slice(0, 8),
                preview: r.snippet || hit?.preview || null,
                time: hit?.last_active ?? r.session_started,
              };
            }),
          );
        })
        .catch(() => {
          if (reqRef.current === myReq) setSearchResults([]);
        })
        .finally(() => {
          if (reqRef.current === myReq) setSearching(false);
        });
    }, 300);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput, open]);

  const rows: SessionRow[] = useMemo(() => {
    if (searchResults) return searchResults;
    return sessions.map((s) => ({
      id: s.id,
      title: sessionTitle(s),
      preview: s.preview,
      time: s.last_active,
    }));
  }, [sessions, searchResults, sessionTitle]);

  const forward = useCallback(
    async (openChat: boolean) => {
      if (!file || !selectedId || forwarding) return;
      const row = rows.find((r) => r.id === selectedId);
      setForwarding(openChat ? "open" : "forward");
      try {
        await libraryApi.forwardToChat({
          path: file.path,
          sessionId: selectedId,
          note: note.trim() || undefined,
        });
        onForwarded(selectedId, row?.title ?? selectedId.slice(0, 8), openChat);
      } catch (e) {
        onToast(`转发失败:${e instanceof Error ? e.message : e}`, "error");
        setForwarding(null);
      }
    },
    [file, selectedId, forwarding, rows, note, onForwarded, onToast],
  );

  if (!open || !file) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-label="转发到对话"
      onClick={onClose}
    >
      <div
        className="flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-current/15 bg-background-base shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="flex shrink-0 items-center gap-2 border-b border-current/10 px-3 py-2">
          <Send className="size-4 shrink-0 text-text-secondary" />
          <span className="min-w-0 flex-1 truncate text-sm font-medium" title={file.path}>
            转发「{file.name}」到对话
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="关闭"
            className="rounded-sm p-1 text-text-tertiary hover:text-midground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 搜索 */}
        <div className="shrink-0 border-b border-current/10 px-3 py-2">
          <div className="relative">
            <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" />
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="搜索会话…"
              className="w-full rounded-sm border border-current/15 bg-transparent py-1.5 pl-8 pr-3 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
            />
          </div>
        </div>

        {/* 会话列表 */}
        <div className="min-h-0 flex-1 overflow-y-auto">
          {loading || searching ? (
            <div className="flex items-center justify-center gap-2 px-4 py-10 text-sm text-text-secondary">
              <Spinner />
              <span>{searching ? "搜索中…" : "加载会话…"}</span>
            </div>
          ) : rows.length === 0 ? (
            <p className="px-4 py-10 text-center text-sm text-text-tertiary">
              {searchResults ? "没有匹配的会话" : "暂无会话"}
            </p>
          ) : (
            <ul className="divide-y divide-current/5">
              {rows.map((row) => (
                <li key={row.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(row.id)}
                    className={cn(
                      "flex w-full min-w-0 flex-col gap-0.5 px-3 py-2 text-left hover:bg-midground/5",
                      selectedId === row.id && "bg-midground/10",
                    )}
                  >
                    <span className="flex min-w-0 items-center gap-2">
                      <span className="min-w-0 flex-1 truncate text-sm">{row.title}</span>
                      {row.time && (
                        <span className="shrink-0 text-xs text-text-tertiary">
                          {formatTimeAgo(row.time)}
                        </span>
                      )}
                    </span>
                    {row.preview && (
                      <span className="truncate text-xs text-text-tertiary">
                        {row.preview}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 附言 + 操作 */}
        <div className="shrink-0 space-y-2 border-t border-current/10 px-3 py-2">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            rows={2}
            placeholder="附言（可选，随文件一起发给模型）"
            className="w-full resize-none rounded-sm border border-current/15 bg-transparent px-2 py-1.5 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
          />
          <div className="flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={forwarding !== null}
              className="rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
            >
              取消
            </button>
            <button
              type="button"
              onClick={() => void forward(false)}
              disabled={!selectedId || forwarding !== null}
              className="flex items-center gap-1.5 rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
            >
              {forwarding === "forward" ? <Spinner /> : <Send className="size-3.5" />}
              转发
            </button>
            <button
              type="button"
              onClick={() => void forward(true)}
              disabled={!selectedId || forwarding !== null}
              className="flex items-center gap-1.5 rounded-sm border border-current/15 bg-midground/10 px-2.5 py-1.5 text-sm text-midground hover:border-current/30 disabled:opacity-50"
            >
              {forwarding === "open" ? <Spinner /> : <Send className="size-3.5" />}
              转发并打开
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
