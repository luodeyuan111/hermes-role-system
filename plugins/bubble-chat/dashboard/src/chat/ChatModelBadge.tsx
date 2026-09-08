/**
 * ChatModelBadge — header badge showing the LIVE session's current model,
 * sitting on the same row as the 个性化 button (to its left).
 *
 * The model name comes from the store's sessionModel state (session.info
 * events / creation-time pick). Clicking opens a picker listing the same
 * model.options catalog the role-view dropdown uses; picking one switches
 * ONLY this conversation via `/model --session` (slash.exec) — the profile
 * default is never written, matching the "旧会话中途换模型" use case.
 */

import { useEffect, useState, useSyncExternalStore } from "react";
import { Check, Cpu, X } from "lucide-react";

import { Button, cn } from "../sdk";
import {
  bubbleChatStore as store,
  type ModelOptionsPayload,
} from "../store";
import { Spinner } from "../shared/Spinner";

export function ChatModelBadge() {
  const state = useSyncExternalStore(store.subscribe, store.getSnapshot);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ModelOptionsPayload | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lazy-load the catalog on first open (cached server-side + store-side).
  useEffect(() => {
    if (!open || options) return;
    let live = true;
    store.getModelOptions().then((p) => {
      if (live && p) setOptions(p);
    });
    return () => {
      live = false;
    };
  }, [open, options]);

  const label = state.sessionModel || options?.model || "默认模型";

  const pick = async (model: string, provider: string) => {
    if (busy) return;
    setBusy(true);
    setError(null);
    const err = await store.setSessionModel(model, provider);
    setBusy(false);
    if (err) {
      setError(err);
    } else {
      setOpen(false);
    }
  };

  return (
    <div className="relative">
      <Button
        ghost
        size="sm"
        onClick={() => {
          setError(null);
          setOpen((o) => !o);
        }}
        prefix={<Cpu />}
        aria-label="当前模型"
        title={`当前对话模型：${label}（点击切换，仅本对话生效）`}
        className="max-w-48 text-text-secondary hover:text-foreground"
      >
        <span className="truncate">{label}</span>
      </Button>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full right-0 z-50 mt-1 flex max-h-96 w-64 flex-col gap-1 overflow-y-auto rounded-xl border border-current/15 bg-background-base p-2 shadow-xl">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-medium text-foreground">对话模型</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="关闭"
                title="关闭"
                className="cursor-pointer rounded p-0.5 text-text-tertiary hover:bg-midground/10 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <div className="px-1 pb-1 text-[0.625rem] text-text-tertiary">
              仅本对话生效（--session），不改角色默认
            </div>
            {!options ? (
              <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
                <Spinner /> 加载模型目录…
              </div>
            ) : (
              (options.providers ?? []).map((group) => (
                <div key={group.slug}>
                  <div className="px-1 pt-1 text-[0.625rem] font-medium text-text-tertiary">
                    {group.name || group.slug}
                  </div>
                  {(group.models ?? []).map((m) => {
                    const active = m === state.sessionModel;
                    return (
                      <button
                        key={`${group.slug}/${m}`}
                        type="button"
                        disabled={busy}
                        onClick={() => void pick(m, group.slug)}
                        className={cn(
                          "flex w-full cursor-pointer items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs",
                          "hover:bg-midground/10 disabled:opacity-50",
                          active ? "text-primary" : "text-text-secondary",
                        )}
                      >
                        <span className="min-w-0 flex-1 truncate">{m}</span>
                        {active && <Check className="h-3 w-3 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              ))
            )}
            {busy && (
              <div className="flex items-center gap-2 px-1 py-1 text-xs text-text-secondary">
                <Spinner /> 切换中…
              </div>
            )}
            {error && (
              <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
                {error}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
