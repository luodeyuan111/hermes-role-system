/**
 * Live subagent block for the bubble chat (delegate_task children).
 *
 * The gateway relays subagent.start/tool/thinking/progress/complete events on
 * the PARENT session; before this component existed they fell through to the
 * store's default case and flooded the transcript with grey [subagent.*]
 * hints. Each child now gets its own card: a header (goal + status), a
 * capped auto-scrolling activity feed (滚动播报: tool calls + batched
 * progress + latest thinking line) visible while the child runs, and the
 * final summary once it completes. Expanding a finished block re-shows the
 * full (capped) activity history.
 *
 * Live-only: subagent turns are separate sessions in the DB, not rows in the
 * parent history, so a reload leaves just the delegate_task ToolCard.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import {
  AlertCircle,
  Bot,
  Check,
  ChevronDown,
  ChevronRight,
  CircleOff,
  Wrench,
} from "lucide-react";

import { Spinner } from "../shared/Spinner";
import { formatDuration } from "./ToolCard";
import type { ChatMessage } from "./types";
import { cn } from "../sdk";

/** Summary bodies longer than this collapse behind an expand toggle. */
const SUMMARY_TRUNCATE_AT = 500;

function statusOf(msg: ChatMessage): {
  kind: "running" | "error" | "interrupted" | "done";
  label: string;
} {
  if (msg.subagentRunning) {
    const n = msg.subagentToolCount;
    return { kind: "running", label: n ? `执行中 · ${n} 次工具` : "执行中" };
  }
  const s = (msg.subagentStatus ?? "").toLowerCase();
  const dur =
    msg.subagentDuration != null ? ` ${formatDuration(msg.subagentDuration)}` : "";
  if (/error|fail|exception/.test(s)) return { kind: "error", label: `出错${dur}` };
  if (/interrupt|cancel|abort|timeout/.test(s))
    return { kind: "interrupted", label: `中断${dur}` };
  return { kind: "done", label: `完成${dur}` };
}

export function SubagentBlock({ msg }: { msg: ChatMessage }) {
  const [expanded, setExpanded] = useState(false);
  const [fullSummary, setFullSummary] = useState(false);
  const feedRef = useRef<HTMLDivElement | null>(null);

  const activity = useMemo(() => msg.subagentActivity ?? [], [msg.subagentActivity]);
  const status = statusOf(msg);
  const running = status.kind === "running";
  const showFeed = running || expanded;

  // 滚动播报：活动在块内自滚到底，不牵动整页消息列表。
  useEffect(() => {
    const el = feedRef.current;
    if (showFeed && el) el.scrollTop = el.scrollHeight;
  }, [showFeed, activity.length, msg.subagentThinking]);

  const summary = msg.subagentSummary ?? "";
  const summaryLong = summary.length > SUMMARY_TRUNCATE_AT;

  return (
    <div className="flex justify-start px-2 sm:ml-10">
      <div
        className={cn(
          "w-full max-w-[75%] overflow-hidden rounded-md sm:max-w-[560px]",
          "border border-current/10 bg-midground/5 text-xs",
        )}
      >
        <button
          type="button"
          onClick={() => setExpanded((e) => !e)}
          className="flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5 text-left"
        >
          {expanded ? (
            <ChevronDown className="h-3 w-3 shrink-0 text-text-tertiary" />
          ) : (
            <ChevronRight className="h-3 w-3 shrink-0 text-text-tertiary" />
          )}
          <Bot className="h-3.5 w-3.5 shrink-0 text-primary" />
          <span className="shrink-0 font-medium text-primary">子代理</span>
          {msg.subagentGoal && (
            <span className="min-w-0 flex-1 truncate text-text-tertiary">
              {msg.subagentGoal}
            </span>
          )}
          <span
            className={cn(
              "ml-auto flex shrink-0 items-center gap-1",
              status.kind === "running" && "text-warning",
              status.kind === "error" && "text-destructive",
              status.kind === "interrupted" && "text-text-tertiary",
              status.kind === "done" && "text-success",
            )}
          >
            {status.kind === "running" && <Spinner />}
            {status.kind === "error" && <AlertCircle className="h-3.5 w-3.5" />}
            {status.kind === "interrupted" && <CircleOff className="h-3.5 w-3.5" />}
            {status.kind === "done" && <Check className="h-3.5 w-3.5" />}
            {status.label}
          </span>
        </button>

        {showFeed && (
          <div
            ref={feedRef}
            className={cn(
              "max-h-36 overflow-y-auto border-t border-current/10 px-2.5 py-1.5",
              "flex flex-col gap-0.5 font-mono-ui text-[0.6875rem] leading-relaxed",
            )}
          >
            {activity.length === 0 && !msg.subagentThinking && (
              <span className="text-text-tertiary">启动中…</span>
            )}
            {activity.map((item, i) =>
              item.kind === "tool" ? (
                <span key={i} className="flex items-baseline gap-1.5 text-text-secondary">
                  <Wrench className="h-2.5 w-2.5 shrink-0 translate-y-px text-warning" />
                  <span className="min-w-0 truncate">{item.text}</span>
                </span>
              ) : (
                <span key={i} className="truncate text-text-tertiary italic">
                  {item.text}
                </span>
              ),
            )}
            {msg.subagentThinking && (
              <span className="truncate text-text-tertiary">
                💭 {msg.subagentThinking}
              </span>
            )}
          </div>
        )}

        {!running && summary && (
          <div className="border-t border-current/10 px-2.5 py-1.5">
            <div className="text-xs leading-relaxed whitespace-pre-wrap wrap-break-word text-text-secondary">
              {fullSummary || !summaryLong
                ? summary
                : `${summary.slice(0, SUMMARY_TRUNCATE_AT)}…`}
            </div>
            {summaryLong && (
              <button
                type="button"
                onClick={() => setFullSummary((e) => !e)}
                className="mt-0.5 cursor-pointer text-[0.625rem] text-primary hover:underline"
              >
                {fullSummary ? "收起" : `展开全部（${summary.length} 字符）`}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
