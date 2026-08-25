/**
 * Chat composer for the bubble chat: auto-growing textarea with
 * Enter-to-send / Shift+Enter newline, per-session drafts persisted to
 * localStorage, and a send button that turns into a stop button while a
 * turn is generating.
 *
 * Phase 3 additions:
 *  - Image/file paste (Ctrl+V) and drag-and-drop: images upload via
 *    /api/chat/image-upload (chatImagePaste.uploadChatImage), other files
 *    via /api/files/upload-stream (api.uploadFile). Pending attachments
 *    render in the AttachmentBar above the textarea.
 *  - On send, images are attached server-side (image.attach, via the
 *    onAttachImage callback) before prompt.submit and their paths ride
 *    along to onSend so the local echo bubble shows the user's own
 *    pictures; file paths are appended to the prompt text as
 *    ``已上传文件：<path>`` lines. Copied/dropped directories never
 *    upload (the browser exposes them as zero-byte Files); they attach
 *    by reference and ride along as ``文件夹路径：<path>`` lines.
 *  - Slash palette: while the draft is a bare "/cmd" prefix, a completion
 *    panel (built-in gateway commands + enabled skills from /api/skills)
 *    opens above the textarea with ↑↓/Tab/Enter/Esc navigation.
 *
 * Drafts persist only the text; attachments live in memory and are dropped
 * on refresh or conversation switch.
 */

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type ClipboardEvent,
  type DragEvent,
  type KeyboardEvent,
} from "react";
import { Paperclip, SendHorizontal, Square } from "lucide-react";
import { Button } from "../sdk";
import { Spinner } from "../shared/Spinner";

import {
  AttachmentBar,
  type PendingFile,
  type PendingImage,
} from "./AttachmentBar";
import { SlashPalette, type SlashItem } from "./SlashPalette";
import { api } from "../sdk";
import {
  clipboardSourcePaths,
  describeTransfer,
  splitTransfer,
  uploadChatImage,
  type TransferDirectory,
} from "../chatImagePaste";
import { cn } from "../sdk";

const MAX_TEXTAREA_HEIGHT = 200;
const DRAFT_KEY_PREFIX = "hermes.bubblechat.draft.";
const MAX_PALETTE_ITEMS = 9;

/**
 * Built-in gateway slash commands worth completing in chat. Verified
 * against hermes_cli/commands.py COMMAND_REGISTRY (all non-cli_only,
 * non-gateway_only). `/image` is deliberately absent — it is cli_only;
 * the bubble chat attaches images via the gateway's image.attach instead.
 */
const BUILTIN_COMMANDS: SlashItem[] = [
  { name: "new", description: "开始新会话", kind: "builtin" },
  { name: "retry", description: "重试上一条消息", kind: "builtin" },
  { name: "undo", description: "回退 N 轮用户消息（默认 1）", kind: "builtin" },
  { name: "compress", description: "压缩对话上下文", kind: "builtin" },
  { name: "title", description: "设置会话标题", kind: "builtin" },
  { name: "branch", description: "从当前会话创建分支", kind: "builtin" },
  { name: "queue", description: "排队一条消息，下一轮发送", kind: "builtin" },
  { name: "steer", description: "在下一个工具调用后插入消息", kind: "builtin" },
  { name: "model", description: "切换模型", kind: "builtin" },
  { name: "status", description: "查看会话 / 模型 / token 状态", kind: "builtin" },
];

function readDraft(key: string): string {
  try {
    return localStorage.getItem(DRAFT_KEY_PREFIX + key) ?? "";
  } catch {
    return "";
  }
}

function writeDraft(key: string, value: string): void {
  try {
    if (value) {
      localStorage.setItem(DRAFT_KEY_PREFIX + key, value);
    } else {
      localStorage.removeItem(DRAFT_KEY_PREFIX + key);
    }
  } catch {
    /* localStorage may be unavailable in private browsing */
  }
}

/** True when a drag/paste payload carries any file (not only images). */
function transferHasFiles(data: DataTransfer | null): boolean {
  if (!data) return false;
  if (data.items?.length) {
    for (let i = 0; i < data.items.length; i++) {
      if (data.items[i].kind === "file") return true;
    }
    return false;
  }
  return (data.files?.length ?? 0) > 0;
}

/** Draft is a bare "/cmd" prefix (no whitespace yet) → return the query.
 *  An absolute path ("/home/…") is NOT a command prefix — no palette. */
function slashQueryOf(text: string): string | null {
  const m = /^\/(\S*)$/.exec(text);
  return m && !m[1].includes("/") ? m[1] : null;
}

function sanitizeFileName(name: string): string {
  const cleaned = name.replace(/[^A-Za-z0-9_.\-一-龥]+/g, "_").replace(/^\.+/, "");
  return cleaned || "file";
}

function timestamp(): string {
  const d = new Date();
  const p = (n: number) => String(n).padStart(2, "0");
  return (
    `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}` +
    `_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`
  );
}

function ComposerImpl({
  draftKey,
  disabled,
  generating,
  busy = false,
  profile = "",
  inject,
  onSend,
  onInterrupt,
  onAttachImage,
}: {
  /** Drafts are stored per conversation (resume id, or "new"). */
  draftKey: string;
  /** Gateway/session not ready — input is shown but inert. */
  disabled: boolean;
  /** A turn is streaming: send becomes stop. */
  generating: boolean;
  /** A slash command is executing — input stays enabled, send is paused. */
  busy?: boolean;
  /** Management profile scope for skill listing + image upload. */
  profile?: string;
  /** Externally injected text (edit-refill, /undo prefill). Applied whenever
   * `nonce` changes; replaces the current draft and focuses the textarea. */
  inject?: { text: string; nonce: number };
  onSend: (text: string, images?: string[]) => void;
  onInterrupt: () => void;
  /** Attach an uploaded image to the live session (image.attach). */
  onAttachImage?: (path: string) => Promise<void>;
}) {
  const [value, setValue] = useState(() => readDraft(draftKey));
  const [images, setImages] = useState<PendingImage[]>([]);
  const [files, setFiles] = useState<PendingFile[]>([]);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [skills, setSkills] = useState<SlashItem[]>([]);
  const [paletteIndex, setPaletteIndex] = useState(0);
  const [paletteDismissed, setPaletteDismissed] = useState(false);

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const idCounterRef = useRef(0);
  const dragDepthRef = useRef(0);
  const sendingRef = useRef(false);
  const skillsLoadedRef = useRef(false);
  /** Cached promise for the managed-files default path (upload base). */
  const uploadBaseRef = useRef<Promise<string> | null>(null);

  const nextId = () => `att-${++idCounterRef.current}`;

  // Swap drafts when the conversation changes; attachments are in-memory
  // only and do not follow the user across conversations.
  useEffect(() => {
    setValue(readDraft(draftKey));
    setImages([]);
    setFiles([]);
    setUploadError(null);
    setPaletteDismissed(false);
  }, [draftKey]);

  // External text injection (message "edit" refill, /undo prefill): replace
  // the draft and refocus. Keyed on the nonce so repeat injects of identical
  // text still apply, and conversation switches don't replay stale injects.
  const lastInjectNonceRef = useRef(0);
  useEffect(() => {
    if (!inject || inject.nonce === lastInjectNonceRef.current) return;
    lastInjectNonceRef.current = inject.nonce;
    setValue(inject.text);
    writeDraft(draftKey, inject.text);
    setPaletteDismissed(false);
    textareaRef.current?.focus();
  }, [inject, draftKey]);

  // Auto-grow up to MAX_TEXTAREA_HEIGHT, then let the textarea scroll.
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [value]);

  /* ---------------------------------------------------------------- */
  /*  Uploads                                                          */
  /* ---------------------------------------------------------------- */

  const addImages = useCallback(
    (batch: File[]) => {
      if (disabled || batch.length === 0) return;
      for (const file of batch) {
        const id = nextId();
        setImages((prev) => [
          ...prev,
          { id, path: "", name: file.name || "粘贴的图片", uploading: true },
        ]);
        uploadChatImage(file, profile)
          .then((res) => {
            setImages((prev) =>
              prev.map((img) =>
                img.id === id
                  ? { id, path: res.path, name: res.name }
                  : img,
              ),
            );
          })
          .catch((e: Error) => {
            setImages((prev) => prev.filter((img) => img.id !== id));
            setUploadError(`图片上传失败：${e.message || "未知错误"}`);
          });
      }
    },
    [disabled, profile],
  );

  const getUploadBase = useCallback((): Promise<string> => {
    if (!uploadBaseRef.current) {
      uploadBaseRef.current = api
        .listFiles()
        .then((res) => res.path.replace(/\/+$/, ""))
        .catch((e: unknown) => {
          uploadBaseRef.current = null;
          throw e;
        });
    }
    return uploadBaseRef.current;
  }, []);

  const addFiles = useCallback(
    (batch: File[]) => {
      if (disabled || batch.length === 0) return;
      for (const file of batch) {
        const id = nextId();
        setFiles((prev) => [
          ...prev,
          { id, path: "", name: file.name, size: file.size, uploading: true },
        ]);
        (async () => {
          const base = await getUploadBase();
          const target = `${base}/.hermes/chat-uploads/${timestamp()}_${sanitizeFileName(file.name)}`;
          const res = await api.uploadFile(target, file, true);
          const path = res.entry?.path || res.path;
          setFiles((prev) =>
            prev.map((f) => (f.id === id ? { ...f, path, uploading: false } : f)),
          );
        })().catch((e: Error) => {
          setFiles((prev) => prev.filter((f) => f.id !== id));
          setUploadError(`文件上传失败：${e.message || "未知错误"}`);
        });
      }
    },
    [disabled, getUploadBase],
  );

  /** Route a mixed file batch: images to the image pipeline, rest to files. */
  const addBatch = useCallback(
    (batch: File[]) => {
      const imgs: File[] = [];
      const rest: File[] = [];
      for (const f of batch) {
        (f.type.startsWith("image/") ? imgs : rest).push(f);
      }
      addImages(imgs);
      addFiles(rest);
    },
    [addImages, addFiles],
  );

  /** Attach directories by reference: the browser hands a copied/dropped
   *  folder over as a zero-byte File, so uploading it would produce an
   *  empty file that points nowhere. The chip carries the real source
   *  path (from text/uri-list) and send() cites it as 文件夹路径. */
  const addDirRefs = useCallback(
    (dirs: TransferDirectory[]) => {
      if (disabled || dirs.length === 0) return;
      for (const d of dirs) {
        if (!d.path) {
          setUploadError(`无法获取文件夹「${d.name}」的路径，请手动输入`);
          continue;
        }
        setFiles((prev) => [
          ...prev,
          { id: nextId(), path: d.path!, name: d.name, size: 0, dir: true },
        ]);
      }
    },
    [disabled],
  );

  /* ---------------------------------------------------------------- */
  /*  Paste / drag-and-drop / file picker                              */
  /* ---------------------------------------------------------------- */

  const onPaste = useCallback(
    (e: ClipboardEvent<HTMLTextAreaElement>) => {
      // Any file in the clipboard (image OR pdf/doc/…) becomes an
      // attachment; only a file-less paste falls through to plain text
      // (a pasted absolute path now survives send(): the slash router
      // only fires for command-shaped text). A copied DIRECTORY also
      // shows up as a file-kind item (zero bytes, empty MIME) — split it
      // out and attach it by path reference instead of uploading an
      // empty file the agent cannot do anything with.
      const { files: batch, dirs } = splitTransfer(e.clipboardData);
      if (batch.length === 0 && dirs.length === 0) return;
      e.preventDefault();
      addBatch(batch);
      const unresolved = dirs.filter((d) => !d.path);
      if (unresolved.length === 0) {
        addDirRefs(dirs);
        return;
      }
      // The paste event's DataTransfer exposed no path payload (seen with
      // Firefox + Nautilus). Log what WAS there for diagnosis, and try the
      // async Clipboard API as a last resort before erroring out.
      console.debug(
        "[bubble-chat] 目录路径未从粘贴事件解析，剪贴板快照：",
        describeTransfer(e.clipboardData),
      );
      void (async () => {
        const paths = await clipboardSourcePaths();
        for (const d of unresolved) {
          d.path =
            paths.find((p) => p.split("/").pop() === d.name) ?? null;
        }
        addDirRefs(dirs);
      })();
    },
    [addBatch, addDirRefs],
  );

  const onDragEnter = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (!transferHasFiles(e.dataTransfer)) return;
    e.preventDefault();
    dragDepthRef.current += 1;
    setDragActive(true);
  }, []);

  const onDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (!transferHasFiles(e.dataTransfer)) return;
    e.preventDefault();
  }, []);

  const onDragLeave = useCallback((e: DragEvent<HTMLDivElement>) => {
    if (!transferHasFiles(e.dataTransfer)) return;
    dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
    if (dragDepthRef.current === 0) setDragActive(false);
  }, []);

  const onDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      if (!transferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      dragDepthRef.current = 0;
      setDragActive(false);
      const { files: batch, dirs } = splitTransfer(e.dataTransfer);
      addBatch(batch);
      addDirRefs(dirs);
    },
    [addBatch, addDirRefs],
  );

  const onFilePicked = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const picked = e.target.files ? Array.from(e.target.files) : [];
      e.target.value = ""; // allow re-picking the same file
      addBatch(picked);
    },
    [addBatch],
  );

  /* ---------------------------------------------------------------- */
  /*  Slash palette                                                    */
  /* ---------------------------------------------------------------- */

  const slashQuery = slashQueryOf(value);
  const paletteOpen = slashQuery !== null && !paletteDismissed;

  // Lazy-load enabled skills the first time the palette opens.
  useEffect(() => {
    if (!paletteOpen || skillsLoadedRef.current) return;
    skillsLoadedRef.current = true;
    api
      .getSkills(profile || undefined)
      .then((list) => {
        setSkills(
          list
            .filter((s) => s.enabled)
            .map((s) => ({
              name: s.name,
              description: s.description || "skill",
              kind: "skill" as const,
            })),
        );
      })
      .catch(() => {
        /* palette works with built-ins alone */
      });
  }, [paletteOpen, profile]);

  const paletteItems = useMemo(() => {
    if (slashQuery === null) return [];
    const q = slashQuery.toLowerCase();
    const matches = (item: SlashItem) => item.name.toLowerCase().startsWith(q);
    return [...BUILTIN_COMMANDS.filter(matches), ...skills.filter(matches)].slice(
      0,
      MAX_PALETTE_ITEMS,
    );
  }, [slashQuery, skills]);

  // Keep the active row inside the filtered list.
  useEffect(() => {
    setPaletteIndex(0);
  }, [slashQuery]);

  const applyCompletion = useCallback(
    (item: SlashItem) => {
      const next = `/${item.name} `;
      setValue(next);
      writeDraft(draftKey, next);
      textareaRef.current?.focus();
    },
    [draftKey],
  );

  /* ---------------------------------------------------------------- */
  /*  Send                                                             */
  /* ---------------------------------------------------------------- */

  const uploading =
    images.some((i) => i.uploading) || files.some((f) => f.uploading);

  const send = useCallback(async () => {
    const text = value.trim();
    if (disabled || generating || busy || uploading || sendingRef.current) return;
    if (!text && images.length === 0 && files.length === 0) return;
    sendingRef.current = true;
    try {
      if (images.length > 0 && onAttachImage) {
        for (const img of images) {
          await onAttachImage(img.path);
        }
      }
      let out = text;
      if (!out && images.length > 0) {
        // Mirrors the gateway's own fallback text for a bare image attach.
        out = images.map((i) => `[User attached image: ${i.name}]`).join("\n");
      }
      for (const f of files) {
        out += `${out ? "\n" : ""}${f.dir ? "文件夹路径" : "已上传文件"}：${f.path}`;
      }
      // Hand the uploaded image paths along so the local echo bubble can
      // render the user's own pictures (image.attach itself is silent).
      onSend(out, images.map((i) => i.path).filter(Boolean));
      setValue("");
      writeDraft(draftKey, "");
      setImages([]);
      setFiles([]);
      setUploadError(null);
    } catch (e) {
      setUploadError(
        `图片附加失败：${e instanceof Error ? e.message : "未知错误"}`,
      );
    } finally {
      sendingRef.current = false;
    }
  }, [value, disabled, generating, busy, uploading, images, files, onAttachImage, onSend, draftKey]);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLTextAreaElement>) => {
      // isComposing guards IME input (拼音 composition ends with an Enter
      // that must NOT send / complete).
      if (e.nativeEvent.isComposing) return;

      if (paletteOpen && paletteItems.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setPaletteIndex((i) => (i + 1) % paletteItems.length);
          return;
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setPaletteIndex(
            (i) => (i - 1 + paletteItems.length) % paletteItems.length,
          );
          return;
        }
        if (e.key === "Tab" || (e.key === "Enter" && !e.shiftKey)) {
          e.preventDefault();
          applyCompletion(paletteItems[Math.min(paletteIndex, paletteItems.length - 1)]);
          return;
        }
        if (e.key === "Escape") {
          e.preventDefault();
          setPaletteDismissed(true);
          return;
        }
      }

      // Enter sends, Shift+Enter inserts a newline.
      if (e.key !== "Enter" || e.shiftKey) return;
      e.preventDefault();
      void send();
    },
    [paletteOpen, paletteItems, paletteIndex, applyCompletion, send],
  );

  /* ---------------------------------------------------------------- */
  /*  Render                                                           */
  /* ---------------------------------------------------------------- */

  const canSend =
    !disabled &&
    !busy &&
    !uploading &&
    (value.trim() || images.length > 0 || files.length > 0);

  return (
    <div
      className="flex shrink-0 flex-col pb-[env(safe-area-inset-bottom)]"
      onDragEnter={onDragEnter}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <AttachmentBar
        images={images}
        files={files}
        onRemoveImage={(id) => setImages((prev) => prev.filter((i) => i.id !== id))}
        onRemoveFile={(id) => setFiles((prev) => prev.filter((f) => f.id !== id))}
      />

      <div className="relative">
        {paletteOpen && (
          <SlashPalette
            items={paletteItems}
            activeIndex={Math.min(paletteIndex, Math.max(0, paletteItems.length - 1))}
            onSelect={applyCompletion}
            onHover={setPaletteIndex}
          />
        )}

        <div
          className={cn(
            "flex items-end gap-2 rounded-xl border border-current/15",
            "bg-background-base px-3 py-2",
            "focus-within:border-current/30 transition-colors",
            dragActive && "border-current/50 bg-muted/30",
          )}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={onFilePicked}
          />
          <Button
            size="icon"
            ghost
            disabled={disabled}
            onClick={() => fileInputRef.current?.click()}
            aria-label="添加附件"
            title="添加附件（图片或文件）"
          >
            <Paperclip />
          </Button>

          <textarea
            ref={textareaRef}
            rows={1}
            value={value}
            disabled={disabled}
            onChange={(e) => {
              setValue(e.target.value);
              writeDraft(draftKey, e.target.value);
              setPaletteDismissed(false);
            }}
            onKeyDown={onKeyDown}
            onPaste={onPaste}
            placeholder={
              disabled
                ? "正在连接…"
                : "输入消息，Enter 发送；可粘贴/拖拽图片或文件，输入 / 补全命令"
            }
            aria-label="消息输入框"
            className={cn(
              "min-h-[1.5rem] max-h-[200px] min-w-0 flex-1 resize-none bg-transparent",
              "text-sm leading-relaxed text-foreground placeholder:text-text-tertiary",
              "focus:outline-none disabled:opacity-50",
            )}
          />

          {generating ? (
            <Button
              size="icon"
              outlined
              onClick={onInterrupt}
              aria-label="停止生成"
              title="停止生成"
            >
              <Square />
            </Button>
          ) : (
            <Button
              size="icon"
              onClick={() => void send()}
              disabled={!canSend}
              aria-label="发送"
              title={busy ? "命令执行中…" : uploading ? "等待附件上传完成…" : "发送"}
            >
              {busy ? <Spinner /> : <SendHorizontal />}
            </Button>
          )}
        </div>
      </div>

      {uploadError && (
        <div className="px-1 pt-1 text-xs text-destructive">{uploadError}</div>
      )}
    </div>
  );
}

// Memoized: the store emits per streaming delta (20-50/s) and the page
// re-renders on each; the composer's props are stable references, so it
// only needs to re-render for its own local state (typing, attachments).
export const Composer = memo(ComposerImpl);
