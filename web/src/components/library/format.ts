/** 资料馆页面的展示格式化工具（中文文案）。 */

import type { PreviewKind } from "./api";

export function formatBytes(size: number | null | undefined): string {
  if (size === null || size === undefined || Number.isNaN(size)) return "-";
  if (size < 1024) return `${size} B`;
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
  if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}

const DATE_TIME_FORMAT = new Intl.DateTimeFormat("zh-CN", {
  dateStyle: "medium",
  timeStyle: "short",
});

/** Unix 秒 → 本地化日期时间。 */
export function formatDateTime(ts: number | null | undefined): string {
  if (!ts) return "-";
  return DATE_TIME_FORMAT.format(new Date(ts * 1000));
}

/** Unix 秒 → 中文相对时间。 */
export function formatTimeAgo(ts: number): string {
  const delta = Date.now() / 1000 - ts;
  if (delta < 60) return "刚刚";
  if (delta < 3600) return `${Math.floor(delta / 60)} 分钟前`;
  if (delta < 86400) return `${Math.floor(delta / 3600)} 小时前`;
  if (delta < 172800) return "昨天";
  if (delta < 30 * 86400) return `${Math.floor(delta / 86400)} 天前`;
  return formatDateTime(ts);
}

export const PREVIEW_KIND_LABEL: Record<PreviewKind, string> = {
  image: "图片",
  video: "视频",
  audio: "音频",
  pdf: "PDF",
  office: "Office 文档",
  text: "文本",
  md: "Markdown",
  none: "其他",
};

/** 按 preview_kind 的着色（Tailwind 文本色），网格图标与徽标共用。 */
export const PREVIEW_KIND_COLOR: Record<PreviewKind, string> = {
  image: "text-emerald-400",
  video: "text-green-400",
  audio: "text-amber-400",
  pdf: "text-red-400",
  office: "text-blue-400",
  text: "text-zinc-400",
  md: "text-purple-400",
  none: "text-text-tertiary",
};

/** 从绝对路径拆面包屑段（POSIX 路径；服务器在 Linux 上）。 */
export function pathSegments(path: string): { name: string; path: string }[] {
  const parts = path.split("/").filter(Boolean);
  const segs: { name: string; path: string }[] = [];
  let acc = "";
  for (const part of parts) {
    acc += "/" + part;
    segs.push({ name: part, path: acc });
  }
  return segs;
}

/** 文件的父目录。 */
export function parentDir(path: string): string {
  const idx = path.lastIndexOf("/");
  return idx > 0 ? path.slice(0, idx) : "/";
}
