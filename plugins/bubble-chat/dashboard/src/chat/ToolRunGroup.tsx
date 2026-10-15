/**
 * Collapsed-by-default group for a run of consecutive tool-call cards.
 *
 * Frequent tool/subagent use used to stack one full ToolCard per call and
 * squeeze the actual reply text out of the viewport. Runs of 2+ consecutive
 * tool messages now render as a single summary row (call count, aggregated
 * tool names, live status) that expands to the individual cards on click;
 * single calls still render as a plain ToolCard (see MessageList).
 */

import { useMemo, useState } from "react";
import { AlertCircle, Check, ChevronDown, ChevronRight, Wrench } from "lucide-react";

import { Spinner } from "../shared/Spinner";
import { formatDuration, ToolCard } from "./ToolCard";
import type { ChatMessage } from "./types";
import { cn } from "../sdk";

/** Tool names shown in the summary before collapsing into "等 N 种". */
const MAX_NAMES = 3;

export function ToolRunGroup({ msgs }: { msgs: ChatMessage[] }) {
  const [open, setOpen] = useState(false);

  // Per-tool call counts in first-seen order, total duration, error count,
  // and the currently running call (the last one flagged running).
  const summary = useMemo(() => {
    const counts = new Map<string, number>();
    let duration = 0;
    let hasDuration = false;
    let errors = 0;
    let running: ChatMessage | null = null;
    for (const m of msgs) {
      const name = m.toolName ?? "tool";
      counts.set(name, (counts.get(name) ?? 0) + 1);
      if (m.toolDuration != null) {
        duration += m.toolDuration;
        hasDuration = true;
      }
      if (m.toolError) errors += 1;
      if (m.toolRunning) running = m;
    }
    return { counts, duration, hasDuration, errors, running };
  }, [msgs]);

  const namesText = useMemo(() => {
    const parts = [...summary.counts.entries()].map(([name, n]) =>
      n > 1 ? `${name}×${n}` : name,
    );
    if (parts.length <= MAX_NAMES) return parts.join(" · ");
    const head = parts.slice(0, MAX_NAMES).join(" · ");
    return `${head} · 等 ${summary.counts.size} 种`;
  }, [summary.counts]);

  const status = summary.running ? (
    <span className="flex min-w-0 items-center gap-1 text-warning">
      <Spinner />
      <span className="truncate">
        执行中 {summary.running.toolName ?? "tool"}
        {summary.running.toolContext ? ` ${summary.running.toolContext}` : ""}…
      </span>
    </span>
  ) : summary.errors > 0 ? (
    <span className="flex shrink-0 items-center gap-1 text-destructive">
      <AlertCircle className="h-3.5 w-3.5" />
      {summary.errors} 出错
    </span>
  ) : (
    <span className="flex shrink-0 items-center gap-1 text-success">
      <Check className="h-3.5 w-3.5" />
      完成{summary.hasDuration ? ` ${formatDuration(summary.duration)}` : ""}
    </span>
  );

  return (
    // Same outer alignment as a standalone ToolCard (it owns the ml itself,
    // so expanded children render nested without re-indenting).
    <div className="flex justify-start px-2 sm:ml-10">
      <div
        className={cn(
          "w-full max-w-[75%] overflow-hidden rounded-md sm:max-w-[560px]",
          "border border-current/10 bg-midground/5 text-xs",
        )}
      >
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5 text-left"
        >
          {open ? (
            <ChevronDown className="h-3 w-3 shrink-0 text-text-tertiary" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0 text-text-tertiary" />
          )}
          <Wrench className="h-3.5 w-3.5 shrink-0 text-warning" />
          <span className="shrink-0 font-medium text-primary">
            {msgs.length} 次工具调用
          </span>
          <span className="min-w-0 flex-1 truncate text-text-tertiary">
            {namesText}
          </span>
          <span className="ml-auto flex min-w-0 shrink-0">{status}</span>
        </button>

        {open && (
          <div className="flex flex-col gap-1.5 border-t border-current/10 px-1.5 py-1.5">
            {msgs.map((m) => (
              <ToolCard key={m.id} msg={m} nested />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
