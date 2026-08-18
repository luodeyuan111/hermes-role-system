/**
 * Inline card for the gateway's interactive prompts (clarify.request /
 * approval.request), docked above the composer while an answer is pending.
 * Answers go back over the same JSON-RPC channel (clarify.respond /
 * approval.respond) — before this card existed both prompts degraded to a
 * "go to /chat-legacy" system hint and the turn hung until the backend
 * timeout.
 */

import { useState } from "react";
import { HelpCircle, ShieldAlert } from "lucide-react";

import type { PendingPrompt } from "@/components/chat/types";
import { cn } from "@/lib/utils";

const APPROVAL_OPTIONS: Array<{ value: string; label: string; danger?: boolean }> = [
  { value: "once", label: "允许一次" },
  { value: "session", label: "本次会话内允许" },
  { value: "always", label: "永久允许" },
  { value: "deny", label: "拒绝", danger: true },
];

const optionClass = (danger?: boolean) =>
  cn(
    "cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    danger
      ? "border-destructive/40 text-destructive hover:bg-destructive/10"
      : "border-current/15 text-foreground hover:bg-midground/10",
  );

export function PendingPromptCard({
  prompt,
  busy,
  onClarify,
  onApproval,
}: {
  prompt: PendingPrompt;
  /** A respond call is in flight — freeze the buttons against double-send. */
  busy: boolean;
  onClarify: (answer: string) => void;
  onApproval: (choice: string) => void;
}) {
  const [custom, setCustom] = useState("");

  const submitCustom = () => {
    const text = custom.trim();
    if (!text || busy) return;
    onClarify(text);
  };

  return (
    <div className="shrink-0 rounded-xl border border-primary/30 bg-background-base px-3 py-2.5 shadow-md">
      {prompt.kind === "clarify" ? (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <HelpCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <div className="min-w-0 flex-1 text-sm whitespace-pre-wrap wrap-break-word">
              {prompt.question}
            </div>
          </div>
          {prompt.choices && prompt.choices.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pl-6">
              {prompt.choices.map((c) => (
                <button
                  key={c}
                  type="button"
                  disabled={busy}
                  onClick={() => onClarify(c)}
                  className={optionClass()}
                >
                  {c}
                </button>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1.5 pl-6">
            <input
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                  e.preventDefault();
                  submitCustom();
                }
              }}
              placeholder={prompt.choices?.length ? "其他回答…" : "输入回答…"}
              disabled={busy}
              className={cn(
                "min-w-0 flex-1 rounded-lg border border-current/15 bg-transparent",
                "px-2.5 py-1.5 text-xs outline-none focus:border-primary/50",
              )}
            />
            <button
              type="button"
              disabled={busy || !custom.trim()}
              onClick={submitCustom}
              className={optionClass()}
            >
              发送
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => onClarify("")}
              title="不回答，让模型自行决定"
              className={optionClass(true)}
            >
              跳过
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-2">
            <ShieldAlert className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
            <div className="min-w-0 flex-1">
              <div className="text-sm font-medium">
                工具审批{prompt.smartDenied ? "（智能审批已拒绝，需人工确认）" : ""}
              </div>
              <div className="mt-0.5 text-xs text-text-secondary whitespace-pre-wrap wrap-break-word">
                {prompt.description}
              </div>
            </div>
          </div>
          {prompt.command && (
            <pre
              className={cn(
                "max-h-40 overflow-auto rounded bg-midground/5 px-2 py-1.5",
                "font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word",
                "text-text-secondary",
              )}
            >
              {prompt.command}
            </pre>
          )}
          <div className="flex flex-wrap gap-1.5">
            {APPROVAL_OPTIONS.filter(
              (o) =>
                // Smart-DENY override is one-operation only; tirith content
                // warnings hide the permanent-allow option (backend rules).
                (!prompt.smartDenied || o.value === "once" || o.value === "deny") &&
                (prompt.allowPermanent || o.value !== "always"),
            ).map((o) => (
              <button
                key={o.value}
                type="button"
                disabled={busy}
                onClick={() => onApproval(o.value)}
                className={optionClass(o.danger)}
              >
                {o.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
