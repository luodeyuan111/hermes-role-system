/**
 * Collapsible reasoning/thinking block shown above an assistant bubble.
 *
 * The block stays COLLAPSED while reasoning streams: auto-expanding meant
 * every reasoning.delta re-rendered the full thinking text and forced a
 * synchronous scroll layout — on hard questions the model streams hundreds
 * of deltas before the first content token, which was a main-thread cost
 * big enough to trip Firefox's "this page is slowing down" warning. The
 * header still shows a live 正在思考… indicator, and the user can expand
 * manually at any time (the toggle is sticky for the message's life).
 */

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "../sdk";

export function ReasoningBlock({
  text,
  streaming,
}: {
  text: string;
  streaming?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);

  // Follow the reasoning tail only while the user has manually expanded
  // the block mid-stream (the max-h-64 container keeps layout bounded);
  // a collapsed block never touches scroll position.
  useEffect(() => {
    const el = bodyRef.current;
    if (el && streaming && open) el.scrollTop = el.scrollHeight;
  }, [text, streaming, open]);

  if (!text.trim()) return null;

  return (
    <div className="rounded-md border border-current/10 bg-muted/40 text-xs">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center gap-1.5 px-2.5 py-1.5",
          "text-text-tertiary hover:text-text-secondary",
          "cursor-pointer transition-colors",
        )}
      >
        {open ? (
          <ChevronDown className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0" />
        )}
        <span>{streaming ? "正在思考…" : "思考过程"}</span>
        {streaming && (
          <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
        )}
      </button>
      {open && (
        <div
          ref={bodyRef}
          className="max-h-64 overflow-y-auto border-t border-current/10 px-2.5 py-2 whitespace-pre-wrap text-text-secondary"
        >
          {text}
        </div>
      )}
    </div>
  );
}
