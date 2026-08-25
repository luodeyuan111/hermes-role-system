/**
 * Hermes desktop pet （桌宠） — dashboard settings plugin.
 *
 * Edits ~/.config/hermes-desktop-pet/config.json via /api/plugins/pet/config;
 * the pet's main process watches that file and hot-applies every change
 * (avatar, session binding, TTS, bubble TTL), so nothing here needs a pet
 * restart. Scoped under the .hermes-pet root class (build.mjs CSS scoping).
 */

import { useCallback, useEffect, useRef, useState } from "react";
import { fetchJSON, authedFetch, cn } from "./sdk";

interface PetConfig {
  sessionId?: string | null;
  avatarPath?: string | null;
  ttsEnabled?: boolean;
  bubbleTtlSec?: number;
  autoCollapse?: boolean;
  minimax?: {
    apiKey?: string;
    groupId?: string;
    voiceId?: string;
    model?: string;
    baseUrl?: string;
  };
}

interface SessionRow {
  id: string;
  source?: string | null;
  display_name?: string | null;
  title?: string | null;
  preview?: string | null;
  message_count?: number;
  started_at?: number;
  last_active?: number;
}

/** Human-readable session label: title → first-message preview → id. */
function sessionLabel(s: SessionRow): string {
  const title = s.title?.trim();
  if (title && title !== "Untitled") return title;
  const preview = s.preview?.trim().replace(/\s+/g, " ");
  if (preview) return preview.length > 24 ? `${preview.slice(0, 24)}…` : preview;
  return s.id;
}

function PetSettingsPage() {
  const [cfg, setCfg] = useState<PetConfig | null>(null);
  const [sessions, setSessions] = useState<SessionRow[]>([]);
  const [savedFlash, setSavedFlash] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const saveTimer = useRef(0);

  useEffect(() => {
    fetchJSON<PetConfig>("/api/plugins/pet/config")
      .then(setCfg)
      .catch((e: Error) => setError(e.message));
    fetchJSON<{ sessions: SessionRow[] }>("/api/sessions")
      .then((r) =>
        setSessions(
          r.sessions
            .filter((s) => s.source !== "cron")
            .sort((a, b) => (b.last_active ?? b.started_at ?? 0) - (a.last_active ?? a.started_at ?? 0))
            .slice(0, 30),
        ),
      )
      .catch(() => {});
  }, []);

  /** Debounced auto-save: every edit lands in the pet's config file. */
  const save = useCallback((patch: Partial<PetConfig>) => {
    setCfg((prev) => {
      if (!prev) return prev;
      const next: PetConfig = {
        ...prev,
        ...patch,
        minimax: { ...prev.minimax, ...(patch.minimax ?? {}) },
      };
      window.clearTimeout(saveTimer.current);
      saveTimer.current = window.setTimeout(() => {
        fetchJSON("/api/plugins/pet/config", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(patch),
        })
          .then(() => {
            setSavedFlash(true);
            setTimeout(() => setSavedFlash(false), 1200);
          })
          .catch((e: Error) => setError(e.message));
      }, 400);
      return next;
    });
  }, []);

  const uploadAvatar = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        void authedFetch("/api/chat/image-upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ data_url: reader.result, filename: file.name }),
        })
          .then((r) => r.json())
          .then((res: { path?: string }) => {
            if (res.path) save({ avatarPath: res.path });
          })
          .catch((e: Error) => setError(e.message));
      };
      reader.readAsDataURL(file);
    },
    [save],
  );

  if (!cfg) {
    return (
      <div className="hermes-pet flex h-full items-center justify-center text-sm text-text-tertiary">
        {error ? `加载失败：${error}` : "加载中…"}
      </div>
    );
  }

  const mm = cfg.minimax ?? {};

  return (
    <div className="hermes-pet mx-auto flex h-full w-full max-w-lg flex-col gap-5 overflow-y-auto p-6 text-sm">
      <div className="flex items-center justify-between">
        <h1 className="text-lg font-semibold">桌宠设置</h1>
        {savedFlash && <span className="text-xs text-emerald-400">已保存，桌宠即时生效</span>}
      </div>

      {error && (
        <div className="rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive">
          {error}
        </div>
      )}

      {/* 绑定对话 */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-text-tertiary">绑定对话</h2>
        <select
          className="rounded-md border border-current/15 bg-transparent px-2 py-1.5"
          value={cfg.sessionId ?? ""}
          onChange={(e) => save({ sessionId: e.target.value || null })}
        >
          <option value="">（每次启动新建对话）</option>
          {sessions.map((s) => (
            <option key={s.id} value={s.id}>
              {sessionLabel(s)}（{s.message_count ?? 0} 条）
            </option>
          ))}
        </select>
      </section>

      {/* 头像 */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-text-tertiary">头像</h2>
        <div className="flex items-center gap-3">
          <label className="cursor-pointer rounded-md border border-current/15 px-3 py-1.5 hover:border-current/30">
            上传图片…
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) uploadAvatar(f);
                e.target.value = "";
              }}
            />
          </label>
          {cfg.avatarPath && (
            <>
              <span className="min-w-0 flex-1 truncate text-xs text-text-tertiary">
                {cfg.avatarPath}
              </span>
              <button
                type="button"
                className="text-xs text-text-tertiary hover:text-foreground"
                onClick={() => save({ avatarPath: null })}
              >
                恢复默认
              </button>
            </>
          )}
        </div>
      </section>

      {/* 语音合成 */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-text-tertiary">语音合成（MiniMax）</h2>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={cfg.ttsEnabled ?? false}
            onChange={(e) => save({ ttsEnabled: e.target.checked })}
          />
          开启回复语音（按句伪流式合成并自动播放）
        </label>
        {(
          [
            ["apiKey", "API Key", "password", ""],
            ["groupId", "GroupId（可选）", "text", ""],
            ["voiceId", "Voice ID", "text", "English_expressive_narrator"],
            ["model", "模型", "text", "speech-02-hd"],
            ["baseUrl", "接口地址", "text", "https://api.minimaxi.com/v1/t2a_v2"],
          ] as const
        ).map(([key, label, type, ph]) => (
          <label key={key} className="flex flex-col gap-1 text-xs text-text-secondary">
            {label}
            <input
              type={type}
              defaultValue={mm[key] ?? ""}
              placeholder={ph}
              onBlur={(e) => save({ minimax: { [key]: e.target.value } })}
              className="rounded-md border border-current/15 bg-transparent px-2 py-1.5"
            />
          </label>
        ))}
      </section>

      {/* 气泡 */}
      <section className="flex flex-col gap-2">
        <h2 className="text-xs font-medium text-text-tertiary">气泡</h2>
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          停留秒数
          <input
            type="number"
            min={3}
            max={120}
            defaultValue={cfg.bubbleTtlSec ?? 10}
            onBlur={(e) => save({ bubbleTtlSec: Number(e.target.value) || 10 })}
            className="w-20 rounded-md border border-current/15 bg-transparent px-2 py-1.5"
          />
        </label>
        <label className="flex items-center gap-2 text-xs text-text-secondary">
          <input
            type="checkbox"
            checked={cfg.autoCollapse !== false}
            onChange={(e) => save({ autoCollapse: e.target.checked })}
          />
          发送后自动收起输入面板
        </label>
      </section>

      <p className="text-xs leading-relaxed text-text-tertiary">
        配置写入 <code>~/.config/hermes-desktop-pet/config.json</code>，桌宠监听该文件，
        保存后无需重启即时生效。
      </p>
    </div>
  );
}

const registry = window.__HERMES_PLUGINS__;
if (!registry) {
  console.warn("[pet] plugin registry is not available — not registering");
} else {
  registry.register("pet", PetSettingsPage);
}
