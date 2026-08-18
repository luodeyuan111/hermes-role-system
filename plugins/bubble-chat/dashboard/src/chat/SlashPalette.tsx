/**
 * Slash-command completion palette for the composer. Pops above the
 * textarea while the draft is a bare "/cmd" prefix; pure presentation —
 * keyboard navigation state lives in the Composer, which filters the item
 * list and forwards the active index.
 */

import { Sparkles, Terminal } from "lucide-react";

import { cn } from "../sdk";

export interface SlashItem {
  /** Command name without the leading slash. */
  name: string;
  description: string;
  /** "builtin" = gateway slash command, "skill" = enabled skill. */
  kind: "builtin" | "skill";
}

export function SlashPalette({
  items,
  activeIndex,
  onSelect,
  onHover,
}: {
  items: SlashItem[];
  activeIndex: number;
  onSelect: (item: SlashItem) => void;
  onHover: (index: number) => void;
}) {
  if (items.length === 0) return null;
  return (
    <div
      role="listbox"
      aria-label="斜杠命令补全"
      className={cn(
        "absolute bottom-full left-0 right-0 z-20 mb-1 max-h-64 overflow-y-auto",
        "rounded-xl border border-current/15 bg-background-base shadow-lg",
      )}
    >
      {items.map((item, i) => (
        <button
          key={`${item.kind}:${item.name}`}
          type="button"
          role="option"
          aria-selected={i === activeIndex}
          onMouseDown={(e) => {
            // mousedown so the textarea keeps focus through the click.
            e.preventDefault();
            onSelect(item);
          }}
          onMouseEnter={() => onHover(i)}
          className={cn(
            "flex w-full items-center gap-2 px-3 py-2 text-left",
            i === activeIndex ? "bg-muted/60" : "hover:bg-muted/30",
          )}
        >
          {item.kind === "skill" ? (
            <Sparkles className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
          ) : (
            <Terminal className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
          )}
          <span className="shrink-0 font-mono text-sm text-foreground">
            /{item.name}
          </span>
          <span className="min-w-0 flex-1 truncate text-xs text-text-tertiary">
            {item.description}
          </span>
          {item.kind === "skill" && (
            <span className="shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-text-tertiary">
              skill
            </span>
          )}
        </button>
      ))}
      <div className="border-t border-current/10 px-3 py-1 text-[10px] text-text-tertiary">
        ↑↓ 选择 · Tab/Enter 补全 · Esc 关闭
      </div>
    </div>
  );
}
