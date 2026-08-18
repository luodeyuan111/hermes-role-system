import { useCallback, useEffect, useState } from "react";
import { Eye, PenLine, Save, X } from "lucide-react";
import { Spinner } from "../shared/Spinner";
import { cn } from "../sdk";
import { Markdown } from "../shared/Markdown";
import { libraryApi, type NoteLinksResponse } from "./api";

interface LibraryNoteEditorProps {
  /** 笔记绝对路径（须位于 feed 分支配置的 notes dir 内） */
  notePath: string;
  /** 点出链/反链跳到另一篇笔记（同一模态内切换） */
  onOpenNote: (path: string) => void;
  onClose: () => void;
  onToast: (message: string, kind: "success" | "error") => void;
}

/**
 * 条目笔记编辑模态：markdown 编辑/预览切换、Ctrl+S 保存、
 * 底部展示 [[wiki-link]] 出链与反链（保存后由后端重建索引）。
 */
export function LibraryNoteEditor({
  notePath,
  onOpenNote,
  onClose,
  onToast,
}: LibraryNoteEditorProps) {
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState("");
  const [links, setLinks] = useState<NoteLinksResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preview, setPreview] = useState(false);

  const dirty = content !== saved;
  const title = notePath.split("/").pop()?.replace(/\.md$/i, "") ?? notePath;

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setPreview(false);
    Promise.all([libraryApi.getNote(notePath), libraryApi.getNoteLinks(notePath)])
      .then(([note, noteLinks]) => {
        if (cancelled) return;
        setContent(note.content);
        setSaved(note.content);
        setLinks(noteLinks);
      })
      .catch((e) => {
        if (!cancelled) onToast(`加载笔记失败:${e}`, "error");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [notePath, onToast]);

  const save = useCallback(async () => {
    if (saving || !dirty) return;
    setSaving(true);
    try {
      await libraryApi.saveNote(notePath, content);
      setSaved(content);
      // 保存会重建 wiki-link 索引，重拉出链/反链
      setLinks(await libraryApi.getNoteLinks(notePath));
    } catch (e) {
      onToast(`保存笔记失败:${e}`, "error");
    } finally {
      setSaving(false);
    }
  }, [saving, dirty, notePath, content, onToast]);

  const requestClose = useCallback(() => {
    if (dirty && !window.confirm("有未保存的修改，确定关闭？")) return;
    onClose();
  }, [dirty, onClose]);

  // Ctrl/Cmd+S 保存；Esc 关闭
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        void save();
      } else if (e.key === "Escape") {
        e.preventDefault();
        requestClose();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [save, requestClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      role="dialog"
      aria-label={`笔记 ${title}`}
      onClick={requestClose}
    >
      <div
        className="flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-md border border-current/15 bg-background-base shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 标题栏 */}
        <div className="flex shrink-0 items-center gap-2 border-b border-current/10 px-3 py-2">
          <span
            className="min-w-0 flex-1 truncate text-sm font-medium"
            title={notePath}
          >
            {title}
            {dirty && <span className="ml-1 text-amber-400">●</span>}
          </span>
          <button
            type="button"
            onClick={() => setPreview((p) => !p)}
            title={preview ? "切换到编辑" : "切换到预览"}
            className="flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground"
          >
            {preview ? <PenLine className="size-3.5" /> : <Eye className="size-3.5" />}
            {preview ? "编辑" : "预览"}
          </button>
          <button
            type="button"
            onClick={() => void save()}
            disabled={saving || !dirty}
            title="保存（Ctrl+S）"
            className="flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
          >
            <Save className="size-3.5" />
            {saving ? "保存中…" : "保存"}
          </button>
          <button
            type="button"
            onClick={requestClose}
            aria-label="关闭"
            className="rounded-sm p-1 text-text-tertiary hover:text-midground"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* 编辑/预览区 */}
        <div className="min-h-0 flex-1">
          {loading ? (
            <div className="flex h-full items-center justify-center gap-2 text-sm text-text-secondary">
              <Spinner />
              <span>加载笔记…</span>
            </div>
          ) : preview ? (
            <div className="h-full overflow-y-auto p-4">
              <Markdown content={content} />
            </div>
          ) : (
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              spellCheck={false}
              className="h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed focus:outline-none"
            />
          )}
        </div>

        {/* 出链 / 反链 */}
        {!loading && links && (links.outlinks.length > 0 || links.backlinks.length > 0) && (
          <div className="shrink-0 space-y-1.5 border-t border-current/10 px-3 py-2 text-xs">
            {links.outlinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="shrink-0 text-text-tertiary">出链</span>
                {links.outlinks.map((o) =>
                  o.resolved_path ? (
                    <button
                      key={o.target}
                      type="button"
                      onClick={() => onOpenNote(o.resolved_path as string)}
                      title={o.resolved_path}
                      className="rounded-full border border-current/20 px-2 py-0.5 text-midground hover:border-current/40"
                    >
                      {o.target}
                    </button>
                  ) : (
                    <span
                      key={o.target}
                      title="尚未解析到笔记文件"
                      className="rounded-full border border-dashed border-current/15 px-2 py-0.5 text-text-tertiary"
                    >
                      {o.target}
                    </span>
                  ),
                )}
              </div>
            )}
            {links.backlinks.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="shrink-0 text-text-tertiary">反链</span>
                {links.backlinks.map((b) => (
                  <button
                    key={b.note_path}
                    type="button"
                    onClick={() => onOpenNote(b.note_path)}
                    title={b.note_path}
                    className={cn(
                      "rounded-full border border-current/20 px-2 py-0.5 text-midground hover:border-current/40",
                    )}
                  >
                    {b.title}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
