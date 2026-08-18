/**
 * Collapsible tool-call card for the bubble chat (replaces the Phase 1
 * placeholder in MessageBubble).
 *
 * Layout mirrors scripts/webchat's .tool-card: a header row (icon, tool
 * name, context label, status), a collapsible body with the call arguments
 * and the result body (each truncated at 2000 chars behind an 展开全部
 * toggle), inline media / file chips detected in the result, and a thin
 * progress bar at the bottom (indeterminate while running, green on
 * success, red on error).
 */

import { useMemo, useState } from "react";
import { AlertCircle, Check, ChevronDown, ChevronRight, Wrench } from "lucide-react";
import { Spinner } from "@nous-research/ui/ui/components/spinner";

import {
  extractFilePaths,
  extractMediaFromText,
} from "@/components/chat/content";
import { FileChip } from "@/components/chat/FileChip";
import { MediaInline } from "@/components/chat/MediaInline";
import type { ChatMessage } from "@/components/chat/types";
import { cn } from "@/lib/utils";

const TRUNCATE_AT = 2000;

function prettyArgs(args: unknown): string {
  if (args == null) return "";
  if (typeof args === "string") return args;
  try {
    return JSON.stringify(args, null, 2);
  } catch {
    return String(args);
  }
}

function formatDuration(seconds: number): string {
  if (seconds < 10) return `${seconds.toFixed(1)}s`;
  if (seconds < 60) return `${Math.round(seconds)}s`;
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  return secs ? `${mins}m ${secs}s` : `${mins}m`;
}

/** Mono text block truncated behind an expand toggle. */
function Truncated({ text, label }: { text: string; label: string }) {
  const [expanded, setExpanded] = useState(false);
  const long = text.length > TRUNCATE_AT;
  return (
    <div>
      <div className="mb-0.5 text-[0.625rem] text-text-tertiary">{label}</div>
      <pre
        className={cn(
          "max-h-60 overflow-auto rounded bg-midground/5 px-2 py-1.5",
          "font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word",
          "text-text-secondary",
        )}
      >
        {expanded || !long ? text : `${text.slice(0, TRUNCATE_AT)}…`}
      </pre>
      {long && (
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="mt-0.5 cursor-pointer text-[0.625rem] text-primary hover:underline"
        >
          {expanded ? "收起" : `展开全部（${text.length} 字符）`}
        </button>
      )}
    </div>
  );
}

export function ToolCard({ msg }: { msg: ChatMessage }) {
  const [open, setOpen] = useState(false);

  const argsText = useMemo(() => prettyArgs(msg.toolArgs), [msg.toolArgs]);
  // Split media / file paths out of the result so they render rich instead
  // of as raw path text.
  const { text: resultText, media } = useMemo(
    () => extractMediaFromText(msg.toolResult ?? ""),
    [msg.toolResult],
  );
  const filePaths = useMemo(() => extractFilePaths(resultText), [resultText]);

  const running = msg.toolRunning === true;
  const failed = msg.toolError === true;
  const hasBody = argsText.length > 0 || resultText.length > 0 || media.length > 0;

  const status = running ? (
    <span className="flex items-center gap-1 text-warning">
      <Spinner /> 执行中…
    </span>
  ) : failed ? (
    <span className="flex items-center gap-1 text-destructive">
      <AlertCircle className="h-3.5 w-3.5" /> 出错
    </span>
  ) : (
    <span className="flex items-center gap-1 text-success">
      <Check className="h-3.5 w-3.5" />
      完成{msg.toolDuration != null ? ` ${formatDuration(msg.toolDuration)}` : ""}
    </span>
  );

  return (
    // ml-10 aligns the card with the assistant bubble text (avatar 2rem +
    // gap 0.5rem); dropped on narrow screens where space is scarce.
    <div className="flex justify-start px-2 sm:ml-10">
      <div
        className={cn(
          "w-full max-w-[75%] overflow-hidden rounded-md sm:max-w-[560px]",
          "border border-current/10 bg-midground/5 text-xs",
        )}
      >
        <button
          type="button"
          onClick={() => hasBody && setOpen((o) => !o)}
          className={cn(
            "flex w-full items-center gap-2 px-2.5 py-1.5 text-left",
            hasBody ? "cursor-pointer" : "cursor-default",
          )}
        >
          {hasBody ? (
            open ? (
              <ChevronDown className="h-3 w-3 shrink-0 text-text-tertiary" />
            ) : (
              <ChevronRight className="h-3 w-3 shrink-0 text-text-tertiary" />
            )
          ) : (
            <span className="w-3 shrink-0" />
          )}
          <Wrench className="h-3.5 w-3.5 shrink-0 text-warning" />
          <span className="shrink-0 font-medium text-primary">
            {msg.toolName ?? "tool"}
          </span>
          {msg.toolContext && (
            <span className="min-w-0 flex-1 truncate text-text-tertiary">
              {msg.toolContext}
            </span>
          )}
          <span className="ml-auto shrink-0">{status}</span>
        </button>

        {open && hasBody && (
          <div className="flex flex-col gap-2 border-t border-current/10 px-2.5 py-2">
            {argsText && <Truncated text={argsText} label="参数" />}
            {resultText && <Truncated text={resultText} label="结果" />}
            {media.map((m, i) => (
              <MediaInline key={i} media={m} />
            ))}
            {(() => {
              // Media paths stripped for MediaInline also get a FileChip so
              // they keep a clickable open/download entry.
              const mediaPaths = [
                ...new Set(
                  media.map((m) => m.path).filter((p): p is string => Boolean(p)),
                ),
              ];
              const chips = mediaPaths.concat(filePaths);
              return (
                chips.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {chips.map((p) => (
                      <FileChip key={p} path={p} />
                    ))}
                  </div>
                )
              );
            })()}
          </div>
        )}

        {/* Bottom progress bar — indeterminate while running. */}
        <div className="h-0.5 w-full overflow-hidden bg-current/10">
          <div
            className={cn(
              "h-full",
              running &&
                "w-1/4 bg-primary animate-[tool-card-indeterminate_1.2s_ease-in-out_infinite]",
              !running && !failed && "w-full bg-success",
              failed && "w-full bg-destructive",
            )}
          />
        </div>
      </div>
    </div>
  );
}
