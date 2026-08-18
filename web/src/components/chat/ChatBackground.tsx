/**
 * Bubble-chat background customization ("🎨 背景" button + settings panel).
 *
 * Three kinds: a soft dark-friendly preset gradient, a custom solid color,
 * or an uploaded image (sent to the gateway via uploadChatImage, displayed
 * through resolveImageUrl) with a dim overlay slider so text stays readable.
 *
 * The setting persists in localStorage under "hermes.bubblechat.background"
 * as `{type, value, dim}` — browser-local only. Image settings store just
 * the server path, never the (huge) data URL; the URL is re-resolved on
 * load. Applied by BubbleChatPage to the MessageList wrapper; bubbles keep
 * their own backgrounds for readability.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { ImagePlus, Loader2, Palette, RotateCcw, X } from "lucide-react";
import { Button } from "@nous-research/ui/ui/components/button";

import { resolveImageUrl } from "@/components/chat/fileAccess";
import { uploadChatImage } from "@/lib/chatImagePaste";
import { cn } from "@/lib/utils";

export const CHAT_BACKGROUND_KEY = "hermes.bubblechat.background";

export interface ChatBackgroundSetting {
  type: "preset" | "color" | "image";
  /** Preset id, hex color, or gateway-local image path (never a data URL). */
  value: string;
  /** Image dim overlay, 0–60 (%). */
  dim?: number;
}

/** Preset backgrounds — `id: ""` is "default" (no background, stored as null). */
const PRESETS: { id: string; label: string; css: string }[] = [
  { id: "", label: "默认", css: "" },
  { id: "slate", label: "石墨", css: "linear-gradient(160deg, #1b1d23 0%, #282b33 100%)" },
  { id: "ocean", label: "深海", css: "linear-gradient(160deg, #10222b 0%, #1d3a44 60%, #24505e 100%)" },
  { id: "grape", label: "葡夜", css: "linear-gradient(160deg, #221a2e 0%, #372a49 100%)" },
  { id: "forest", label: "墨绿", css: "linear-gradient(160deg, #15211b 0%, #243a2d 100%)" },
  { id: "ember", label: "暖棕", css: "linear-gradient(160deg, #241d17 0%, #3a2c21 100%)" },
];

const DEFAULT_IMAGE_DIM = 30;

function loadSetting(): ChatBackgroundSetting | null {
  try {
    const raw = localStorage.getItem(CHAT_BACKGROUND_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as ChatBackgroundSetting;
    if (!parsed || typeof parsed !== "object") return null;
    if (!["preset", "color", "image"].includes(parsed.type)) return null;
    if (typeof parsed.value !== "string") return null;
    return parsed;
  } catch {
    return null;
  }
}

export function useChatBackground() {
  const [setting, setSetting] = useState<ChatBackgroundSetting | null>(loadSetting);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const apply = useCallback((next: ChatBackgroundSetting | null) => {
    setSetting(next);
    try {
      if (next) localStorage.setItem(CHAT_BACKGROUND_KEY, JSON.stringify(next));
      else localStorage.removeItem(CHAT_BACKGROUND_KEY);
    } catch {
      /* storage may be unavailable (private mode) — session-only then */
    }
  }, []);

  // Resolve the stored server path to a usable URL for display only.
  const settingType = setting?.type;
  const settingValue = setting?.value;
  useEffect(() => {
    if (settingType !== "image" || !settingValue) {
      setImageUrl(null);
      return;
    }
    let cancelled = false;
    let blobUrl: string | null = null;
    resolveImageUrl(settingValue)
      .then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setImageUrl(url);
      })
      .catch(() => {
        if (!cancelled) setImageUrl(null);
      });
    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [settingType, settingValue]);

  const style = useMemo<CSSProperties>(() => {
    if (!setting) return {};
    if (setting.type === "preset") {
      const css = PRESETS.find((p) => p.id === setting.value)?.css;
      return css ? { background: css } : {};
    }
    if (setting.type === "color") return { background: setting.value };
    if (setting.type === "image" && imageUrl) {
      return {
        backgroundImage: `url("${imageUrl}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  }, [setting, imageUrl]);

  const dim =
    setting?.type === "image"
      ? Math.min(60, Math.max(0, setting.dim ?? DEFAULT_IMAGE_DIM))
      : 0;

  return { setting, apply, style, dim };
}

export function ChatBackgroundPicker({
  bg,
  profile,
}: {
  bg: ReturnType<typeof useChatBackground>;
  /** Management profile scope for the image upload. */
  profile?: string;
}) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { setting, apply, dim } = bg;

  const currentPreset = setting?.type === "preset" ? setting.value : null;
  const currentColor = setting?.type === "color" ? setting.value : "#282b33";

  const upload = async (file: File) => {
    setBusy(true);
    setError(null);
    try {
      const res = await uploadChatImage(file, profile ?? "");
      apply({ type: "image", value: res.path, dim: dim || DEFAULT_IMAGE_DIM });
    } catch (e) {
      setError(e instanceof Error ? e.message : "图片上传失败");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="relative">
      <Button
        ghost
        size="sm"
        onClick={() => setOpen((o) => !o)}
        prefix={<Palette />}
        aria-label="聊天背景"
        title="聊天背景"
        className="text-text-secondary hover:text-foreground"
      >
        背景
      </Button>

      {open && (
        <>
          <div
            aria-hidden
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute top-full right-0 z-50 mt-1 flex w-64 flex-col gap-2.5 rounded-xl border border-current/15 bg-background-base p-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-foreground">聊天背景</span>
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

            {/* Presets: default (none) + soft dark-friendly gradients. */}
            <div className="grid grid-cols-3 gap-1.5">
              {PRESETS.map((p) => {
                const active =
                  p.id === "" ? setting === null : currentPreset === p.id;
                return (
                  <button
                    key={p.id || "default"}
                    type="button"
                    onClick={() =>
                      apply(p.id ? { type: "preset", value: p.id } : null)
                    }
                    aria-pressed={active}
                    className={cn(
                      "flex h-10 cursor-pointer items-end justify-center rounded-md border p-0.5",
                      "text-[0.625rem] text-text-secondary",
                      active
                        ? "border-primary"
                        : "border-current/15 hover:border-current/30",
                    )}
                    style={p.css ? { background: p.css } : undefined}
                  >
                    <span className="rounded bg-black/40 px-1">{p.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Custom solid color. */}
            <label className="flex items-center gap-2 text-xs text-text-secondary">
              <span className="shrink-0">自定义颜色</span>
              <input
                type="color"
                value={currentColor}
                onChange={(e) => apply({ type: "color", value: e.target.value })}
                aria-label="自定义颜色"
                className="h-7 w-full cursor-pointer rounded border border-current/15 bg-transparent"
              />
            </label>

            {/* Custom image upload (path persisted, URL re-resolved). */}
            <Button
              outlined
              size="sm"
              disabled={busy}
              onClick={() => fileRef.current?.click()}
              prefix={busy ? <Loader2 className="animate-spin" /> : <ImagePlus />}
              className="justify-center"
            >
              {busy ? "上传中…" : "上传图片"}
            </Button>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = "";
              }}
            />

            {setting?.type === "image" && (
              <label className="flex flex-col gap-1 text-xs text-text-secondary">
                <span>图片暗化 {dim}%</span>
                <input
                  type="range"
                  min={0}
                  max={60}
                  step={5}
                  value={dim}
                  onChange={(e) =>
                    apply({
                      type: "image",
                      value: setting.value,
                      dim: Number(e.target.value),
                    })
                  }
                  aria-label="图片暗化"
                  className="w-full cursor-pointer accent-primary"
                />
              </label>
            )}

            {error && (
              <div className="rounded border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive">
                {error}
              </div>
            )}

            <button
              type="button"
              onClick={() => apply(null)}
              disabled={setting === null}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-1 rounded-md",
                "border border-current/15 px-2 py-1 text-xs text-text-secondary",
                "hover:bg-midground/10 hover:text-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50",
              )}
            >
              <RotateCcw className="h-3 w-3" />
              重置为默认
            </button>

            <p className="text-[0.625rem] leading-relaxed text-text-tertiary">
              背景设置仅保存在当前浏览器（localStorage），不会影响其他设备。
            </p>
          </div>
        </>
      )}
    </div>
  );
}
