/**
 * Collapsible reasoning/thinking block shown above an assistant bubble.
 *
 * While reasoning is STREAMING the block auto-expands and follows the tail:
 * a collapsed block hides the whole thinking phase, which reads as a dead
 * bubble for 10-30s on hard questions (the model streams hundreds of
 * reasoning deltas before the first visible content token). The first
 * manual toggle wins and sticks for the rest of the message's life; an
 * untouched block folds itself back once the stream completes.
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
  const [touched, setTouched] = useState(false);
  const bodyRef = useRef<HTMLDivElement | null>(null);
  const effectiveOpen = touched ? open : !!streaming;

  // Follow the reasoning tail while auto-opened; never yank the scroll
  // position once the user has taken over the toggle.
  useEffect(() => {
    const el = bodyRef.current;
    if (el && streaming && !touched) el.scrollTop = el.scrollHeight;
  }, [text, streaming, touched]);

  if (!text.trim()) return null;

  return (
    <div className="rounded-md border border-current/10 bg-muted/40 text-xs">
      <button
        type="button"
        onClick={() => {
          setTouched(true);
          setOpen(!effectiveOpen);
        }}
        aria-expanded={effectiveOpen}
        className={cn(
          "flex w-full items-center gap-1.5 px-2.5 py-1.5",
          "text-text-tertiary hover:text-text-secondary",
          "cursor-pointer transition-colors",
        )}
      >
        {effectiveOpen ? (
          <ChevronDown className="h-3 w-3 shrink-0" />
        ) : (
          <ChevronRight className="h-3 w-3 shrink-0" />
        )}
        <span>{streaming ? "正在思考…" : "思考过程"}</span>
        {streaming && (
          <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
        )}
      </button>
      {effectiveOpen && (
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
