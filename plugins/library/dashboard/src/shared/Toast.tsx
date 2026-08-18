/**
 * Toast + useToast — plugin-local copies of
 * ``@nous-research/ui/ui/components/toast`` and
 * ``@nous-research/ui/hooks/use-toast`` (not exposed on the host SDK).
 * Same classes/behaviour as the DS originals; the only change is that the
 * toast renders inline instead of through a react-dom portal (the plugin
 * bundle has no react-dom) — the element is ``fixed`` positioned, so the
 * visual result is identical. The toast-in/toast-out keyframes come from
 * the host's index.css.
 */
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "../sdk";

export interface ToastMessage {
  message: string;
  type: "error" | "success";
}

export function Toast({ toast }: { toast: ToastMessage | null }) {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(toast);

  useEffect(() => {
    if (toast) {
      setCurrent(toast);
      setVisible(true);
    } else {
      setVisible(false);
      const timer = setTimeout(() => setCurrent(null), 200);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  if (!current) return null;

  return (
    <div
      aria-live="polite"
      className={cn(
        "fixed top-16 right-4 z-50 border px-4 py-2.5 font-courier text-xs tracking-wider uppercase backdrop-blur-sm",
        current.type === "success"
          ? "bg-success/15 text-success border-success/30"
          : "bg-destructive/15 text-destructive border-destructive/30",
      )}
      role="status"
      style={{
        animation: visible
          ? "toast-in 200ms ease-out forwards"
          : "toast-out 200ms ease-in forwards",
      }}
    >
      {current.message}
    </div>
  );
}

export function useToast(duration = 3000) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const showToast = useCallback(
    (message: string, type: "error" | "success") => {
      if (timerRef.current) clearTimeout(timerRef.current);
      setToast({ message, type });
      timerRef.current = setTimeout(() => setToast(null), duration);
    },
    [duration],
  );

  return { showToast, toast };
}
