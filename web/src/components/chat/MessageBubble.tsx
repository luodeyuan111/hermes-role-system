/**
 * QQ/WeChat-style message bubble: user right-aligned, assistant left-aligned,
 * with a round avatar, a timestamp, and a hover-revealed copy button.
 * System rows render as centred muted hints; tool calls as collapsible
 * ToolCards. Media refs (MEDIA: lines, media paths, history image parts)
 * render below the text via MediaInline; leftover file paths become FileChips.
 */

import { useMemo, useState, type MouseEvent } from "react";
import { Check, Copy, Pencil, RotateCcw, Sparkles } from "lucide-react";

import { Markdown } from "@/components/Markdown";
import {
  extractFilePaths,
  extractMediaFromText,
  normalizeLocalPath,
  type MediaRef,
} from "@/components/chat/content";
import { FileChip, useFileOpener } from "@/components/chat/FileChip";
import { MediaInline } from "@/components/chat/MediaInline";
import { ReasoningBlock } from "@/components/chat/ReasoningBlock";
import { ToolCard } from "@/components/chat/ToolCard";
import { formatBubbleTime, type ChatMessage } from "@/components/chat/types";
import { cn } from "@/lib/utils";

const actionButtonClass = cn(
  "shrink-0 cursor-pointer self-end rounded p-1",
  "text-text-tertiary hover:text-text-secondary hover:bg-midground/10",
  "opacity-0 transition-opacity group-hover/bubble:opacity-100",
  "focus-visible:opacity-100 focus-visible:outline-none",
);

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  if (!text) return null;

  const copy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      })
      .catch(() => {
        /* clipboard may be unavailable (permissions, non-secure context) */
      });
  };

  return (
    <button
      type="button"
      onClick={copy}
      aria-label="复制"
      title="复制"
      className={actionButtonClass}
    >
      {copied ? (
        <Check className="h-3.5 w-3.5 text-success" />
      ) : (
        <Copy className="h-3.5 w-3.5" />
      )}
    </button>
  );
}

function Avatar({ role }: { role: "user" | "assistant" }) {
  return (
    <div
      aria-hidden
      className={cn(
        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
        role === "user"
          ? "bg-primary/15 text-primary"
          : "bg-success/15 text-success",
      )}
    >
      {role === "user" ? "我" : <Sparkles className="h-4 w-4" />}
    </div>
  );
}

export function MessageBubble({
  msg,
  onRetry,
  onEdit,
}: {
  msg: ChatMessage;
  /** Resubmit this message's text (user) or the prompting user text
   * (assistant). Only supplied for eligible messages. */
  onRetry?: (msg: ChatMessage) => void;
  /** Refill the composer with this message's text for editing. */
  onEdit?: (msg: ChatMessage) => void;
}) {
  // Hooks run unconditionally (system/tool rows return early below).
  const { text, media } = useMemo(() => extractMediaFromText(msg.text), [msg.text]);
  const filePaths = useMemo(() => extractFilePaths(text), [text]);
  const historyImages = useMemo<MediaRef[]>(
    () =>
      (msg.images ?? []).flatMap((ref): MediaRef[] => {
        if (ref.startsWith("data:")) return [{ kind: "image", dataUrl: ref }];
        const localPath = normalizeLocalPath(ref);
        return localPath ? [{ kind: "image", path: localPath }] : [];
      }),
    [msg.images],
  );
  // Shared file-open logic for the intercepted local-path links below.
  const { open: openFilePath, modal: fileModal } = useFileOpener();

  // Centred system hint (errors, unknown gateway events, notices).
  if (msg.role === "system") {
    return (
      <div className="flex justify-center px-4 py-0.5">
        <span className="max-w-[85%] rounded bg-muted px-2.5 py-1 text-center text-xs text-muted-foreground">
          {msg.text}
        </span>
      </div>
    );
  }

  // Tool calls render as collapsible cards with args/result/progress.
  if (msg.role === "tool") {
    return <ToolCard msg={msg} />;
  }

  const isUser = msg.role === "user";
  const allMedia = historyImages.concat(media);
  // Media paths are stripped from the text for MediaInline — render a
  // FileChip for each as well so every file path keeps a clickable entry.
  const mediaPaths = [
    ...new Set(allMedia.map((m) => m.path).filter((p): p is string => Boolean(p))),
  ];
  const chipPaths = mediaPaths.concat(filePaths);
  const showText = text.length > 0 || msg.streaming === true;

  // Intercept clicks on local-file links inside the Markdown body and open
  // them via the FileChip logic instead of navigating (which would 404).
  const handleContentClick = (e: MouseEvent) => {
    const anchor = (e.target as HTMLElement).closest("a");
    if (!anchor) return;
    const href = anchor.getAttribute("href") ?? "";
    const localPath = normalizeLocalPath(href);
    if (!localPath) return;
    e.preventDefault();
    void openFilePath(localPath).catch(() => {
      /* inaccessible file: leave the link inert, chips grey out the same way */
    });
  };

  return (
    <div
      className={cn(
        "group/bubble flex items-end gap-2 px-2",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      <Avatar role={isUser ? "user" : "assistant"} />

      <div
        className={cn(
          "flex max-w-[75%] min-w-0 flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        {showText && (
          <div
            onClick={isUser ? undefined : handleContentClick}
            className={cn(
              "min-w-0 rounded-2xl px-3.5 py-2",
              isUser
                ? "rounded-br-sm bg-primary/15 text-foreground"
                : "rounded-bl-sm bg-midground/8 border border-current/10",
            )}
          >
            {isUser ? (
              <div className="text-sm leading-relaxed whitespace-pre-wrap wrap-break-word">
                {text}
              </div>
            ) : (
              <Markdown content={text} streaming={msg.streaming} localFileLinks />
            )}
          </div>
        )}

        {!isUser && msg.reasoning && (
          <ReasoningBlock text={msg.reasoning} streaming={msg.streaming} />
        )}

        {allMedia.map((m, i) => (
          <MediaInline key={m.path ?? `img-${i}`} media={m} />
        ))}

        {chipPaths.length > 0 && (
          <div className="flex max-w-full flex-wrap gap-1">
            {chipPaths.map((p) => (
              <FileChip key={p} path={p} />
            ))}
          </div>
        )}

        <span className="px-1 text-[0.625rem] text-text-tertiary">
          {formatBubbleTime(msg.timestamp)}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <CopyButton text={msg.text} />
        {onRetry && (
          <button
            type="button"
            onClick={() => onRetry(msg)}
            aria-label="重试"
            title="重试"
            className={actionButtonClass}
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        )}
        {onEdit && (
          <button
            type="button"
            onClick={() => onEdit(msg)}
            aria-label="编辑"
            title="编辑"
            className={actionButtonClass}
          >
            <Pencil className="h-3.5 w-3.5" />
          </button>
        )}
      </div>
      {fileModal}
    </div>
  );
}
