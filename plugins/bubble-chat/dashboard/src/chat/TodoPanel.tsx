/**
 * TodoPanel — the agent's per-session task list, docked above the composer.
 *
 * Slim collapsible bar: one line with the in-progress count and a chevron;
 * expanded shows the full list with status icons. Renders only while the
 * session has any todos. Data comes from the bubble-chat store (todo
 * tool.complete events live, latest stored result on resume).
 */

import { useState } from "react";
import { CheckCircle2, ChevronDown, ChevronRight, Circle, CircleSlash, ListTodo, Loader2 } from "lucide-react";

import type { TodoItem } from "./types";
import { cn } from "../sdk";

const STATUS_ORDER = ["in_progress", "pending", "completed", "cancelled"];

function StatusIcon({ status }: { status: string }) {
  switch (status) {
    case "in_progress":
      return <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin text-amber-400" />;
    case "completed":
      return <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />;
    case "cancelled":
      return <CircleSlash className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />;
    default:
      return <Circle className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />;
  }
}

export function TodoPanel({ todos }: { todos: TodoItem[] }) {
  const [open, setOpen] = useState(false);
  if (todos.length === 0) return null;

  const inProgress = todos.filter((t) => t.status === "in_progress");
  const pending = todos.filter((t) => t.status === "pending").length;
  const done = todos.filter((t) => t.status === "completed" || t.status === "cancelled").length;
  const sorted = [...todos].sort(
    (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status),
  );

  return (
    <div
      className={cn(
        "shrink-0 rounded-xl border border-current/10",
        "bg-muted/40 text-xs",
      )}
    >
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className={cn(
          "flex w-full cursor-pointer items-center gap-1.5 px-2.5 py-1.5",
          "text-text-tertiary hover:text-text-secondary transition-colors",
        )}
      >
        {open ? (
          <ChevronDown className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0" />
        )}
        <ListTodo className="h-3.5 w-3.5 shrink-0" />
        <span className="font-medium text-text-secondary">任务</span>
        <span className="text-text-tertiary">
          {inProgress.length > 0 && `${inProgress.length} 进行中 · `}
          {pending} 待办 · {done} 完成
        </span>
      </button>
      {open && (
        <ul className="max-h-40 space-y-1 overflow-y-auto border-t border-current/10 px-2.5 py-2">
          {sorted.map((t) => (
            <li key={t.id} className="flex items-start gap-1.5">
              <StatusIcon status={t.status} />
              <span
                className={cn(
                  "min-w-0 flex-1 break-words leading-snug",
                  t.status === "completed" && "text-text-tertiary line-through",
                  t.status === "cancelled" && "text-text-tertiary line-through opacity-70",
                  t.status === "in_progress" && "text-foreground",
                  t.status === "pending" && "text-text-secondary",
                )}
              >
                {t.content}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
