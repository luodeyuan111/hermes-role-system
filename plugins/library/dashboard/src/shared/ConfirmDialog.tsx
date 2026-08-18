/**
 * ConfirmDialog — plugin-local stand-in for
 * ``@nous-research/ui/ui/components/confirm-dialog`` (not on the host SDK;
 * the DS original builds on radix-ui's AlertDialog, which the plugin bundle
 * avoids). Same layout and classes; open/close animations are dropped and
 * Esc/overlay-click cancel is re-implemented by hand, matching the other
 * hand-rolled dialogs in this plugin (rename / forward).
 */
import { useEffect } from "react";
import { cn } from "../sdk";

function WarningTriangle({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
    >
      <path d="m10.29 3.86-8.16 14a2 2 0 0 0 1.73 3h16.28a2 2 0 0 0 1.73-3l-8.16-14a2 2 0 0 0-3.46 0z" />
      <line x1="12" x2="12" y1="9" y2="13" />
      <line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
  );
}

export function ConfirmDialog({
  cancelLabel = "Cancel",
  confirmLabel = "Confirm",
  description,
  destructive = false,
  loading = false,
  onCancel,
  onConfirm,
  open,
  title,
}: ConfirmDialogProps) {
  // Esc 取消（与 radix AlertDialog 的默认行为一致）
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onCancel();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onCancel]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
      role="dialog"
      aria-label={title}
      onClick={onCancel}
    >
      <div
        className={cn(
          "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
          "w-[calc(100%-2rem)] max-w-md",
          "border border-midground/15 bg-background-base text-foreground-base shadow-lg outline-none",
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3 p-4 border-b border-midground/15">
          {destructive && (
            <div aria-hidden className="mt-0.5 shrink-0 text-destructive">
              <WarningTriangle className="h-4 w-4" />
            </div>
          )}
          <div className="flex-1 min-w-0 flex flex-col gap-1">
            <span className="font-expanded text-sm font-bold tracking-[0.08em] uppercase">
              {title}
            </span>
            {description && (
              <span className="font-mondwest text-xs text-midground/60 leading-relaxed">
                {description}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 p-3">
          <button
            type="button"
            disabled={loading}
            onClick={onCancel}
            className="rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={cn(
              "rounded-sm border px-2.5 py-1.5 text-sm disabled:opacity-50",
              destructive
                ? "border-destructive/40 bg-destructive/15 text-destructive hover:border-destructive/60"
                : "border-current/15 bg-midground/10 text-midground hover:border-current/30",
            )}
          >
            {loading ? "…" : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

interface ConfirmDialogProps {
  cancelLabel?: string;
  confirmLabel?: string;
  description?: string;
  destructive?: boolean;
  loading?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
  open: boolean;
  title: string;
}
