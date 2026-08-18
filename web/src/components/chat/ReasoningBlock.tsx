/**
 * Collapsible reasoning/thinking block shown above an assistant bubble.
 * Default-collapsed — reasoning streams can be long, so they stay out of
 * the way unless the user explicitly opens them.
 */

import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export function ReasoningBlock({
  text,
  streaming,
}: {
  text: string;
  streaming?: boolean;
}) {
  const [open, setOpen] = useState(false);
  if (!text.trim()) return null;

  return (
    <div className="rounded-md border border-current/10 bg-muted/40 text-xs">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
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
        <span>思考过程</span>
        {streaming && (
          <span className="ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" />
        )}
      </button>
      {open && (
        <div className="max-h-64 overflow-y-auto border-t border-current/10 px-2.5 py-2 whitespace-pre-wrap text-text-secondary">
          {text}
        </div>
      )}
    </div>
  );
}
