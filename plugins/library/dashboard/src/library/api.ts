/**
 * 资料馆前端契约（插件版，/api/plugins/library/*）。
 *
 * 认证：
 *  - JSON 请求走 SDK 的 fetchJSON（自动带 token header / cookie）。
 *  - 插件无法登记后端的 ?token= 白名单（_QUERY_TOKEN_API_PATHS 是
 *    web_server 的私有常量），所以 preview/thumb 一律 authedFetch 拉
 *    blob 换 object URL（调用方负责 revoke），与 gated 模式的旧兜底
 *    路径一致。
 */

import { authedFetch, fetchJSON } from "../sdk";

export type PreviewKind =
  | "image"
  | "video"
  | "audio"
  | "pdf"
  | "office"
  | "text"
  | "md"
  | "none";

/** feed 分支的笔记目录配置（notes.dir 为绝对路径）。 */
export interface LibraryBranchNotes {
  dir: string;
  template: string | null;
}

export interface LibraryBranchPolicy {
  preview: boolean;
  convert: boolean;
  enabled: boolean;
  /** "tree"（普通目录）| "feed"（信息源聚合视图） */
  type: string;
  /** feed 分支才有：条目笔记目录 */
  notes?: LibraryBranchNotes | null;
}

export interface LibraryRoot {
  path: string;
  name: string;
  branches: Record<string, LibraryBranchPolicy>;
}

export interface LibraryDirEntry {
  name: string;
  path: string;
  file_count: number;
  total_size: number;
  dominant_ext: string | null;
}

export interface LibraryFileEntry {
  name: string;
  path: string;
  size: number;
  mtime: number;
  ext: string;
  preview_kind: PreviewKind;
}

export interface LibraryTreeResponse {
  path: string;
  parent: string | null;
  dirs: LibraryDirEntry[];
  files: LibraryFileEntry[];
}

export interface LibraryFileInfo extends LibraryFileEntry {
  mime: string;
  preview_cached: boolean;
}

export interface OverviewBranch {
  name: string;
  size: number;
  file_count: number;
  ext_stats: Record<string, number>;
}

export interface OverviewRoot {
  name: string;
  path: string;
  total_size: number;
  file_count: number;
  branches: OverviewBranch[];
}

export interface OverviewRecent {
  name: string;
  path: string;
  mtime: number;
  size: number;
}

export interface LibraryOverviewResponse {
  roots: OverviewRoot[];
  recent: OverviewRecent[];
}

export interface LibrarySearchResponse {
  results: LibraryFileEntry[];
}

export interface LibrarySyncResponse {
  removed_orphans: number;
  evicted: number;
  cache_bytes: number;
}

/** type: feed 分支（信息源）的聚合条目——来自 md frontmatter + feed_state 覆盖。 */
export interface FeedItem {
  name: string;
  path: string;
  size: number;
  mtime: number;
  source: string;
  title: string;
  authors: string;
  category: string;
  link: string;
  /** YYYY-MM-DD（文件名前缀优先），可能为空串 */
  date: string;
  status: string;
  tags: string;
  /** 条目笔记路径；null 表示尚未创建 */
  note_path: string | null;
}

export interface LibraryFeedResponse {
  path: string;
  branch: string;
  statuses: string[];
  items: FeedItem[];
  stats: {
    total: number;
    by_status: Record<string, number>;
    by_source: Record<string, number>;
  };
}

/** 条目笔记创建/查找结果（created=false 表示复用已有绑定）。 */
export interface FeedNoteResponse {
  note_path: string;
  created: boolean;
}

export interface NoteReadResponse {
  path: string;
  content: string;
}

/** 笔记出链（[[wiki-link]] 目标；resolved_path 为 null 表示未解析到文件）。 */
export interface NoteOutlink {
  target: string;
  resolved_path: string | null;
}

export interface NoteSaveResponse {
  ok: boolean;
  outlinks: NoteOutlink[];
}

/** 反链：链向当前笔记的其他笔记。 */
export interface NoteBacklink {
  note_path: string;
  title: string;
}

export interface NoteLinksResponse {
  outlinks: NoteOutlink[];
  backlinks: NoteBacklink[];
}

/** 把 FeedItem 适配成通用文件条目，供选中/预览面板复用。 */
export function feedItemToFileEntry(item: FeedItem): LibraryFileEntry {
  return {
    name: item.name,
    path: item.path,
    size: item.size,
    mtime: item.mtime,
    ext: "md",
    preview_kind: "md",
  };
}

/** currentPath 若正好是某个 root 的 feed 分支根，返回该分支名，否则 null。 */
export function feedBranchOf(
  roots: LibraryRoot[],
  path: string | null,
): string | null {
  if (!path) return null;
  for (const root of roots) {
    if (!path.startsWith(root.path + "/")) continue;
    const rel = path.slice(root.path.length + 1);
    if (rel.includes("/")) continue; // 分支的更深层，走普通视图
    const policy = root.branches[rel];
    if (policy?.type === "feed") return rel;
  }
  return null;
}

/** 转发到对话的请求体（sessionId → 后端 session_id）。 */
export interface LibraryForwardRequest {
  path: string;
  sessionId: string;
  note?: string;
}

export const libraryApi = {
  getConfig: () => fetchJSON<{ roots: LibraryRoot[] }>("/api/plugins/library/config"),
  getTree: (path: string) =>
    fetchJSON<LibraryTreeResponse>(
      `/api/plugins/library/tree?path=${encodeURIComponent(path)}`,
    ),
  getFileInfo: (path: string) =>
    fetchJSON<LibraryFileInfo>(
      `/api/plugins/library/file?path=${encodeURIComponent(path)}`,
    ),
  getOverview: () => fetchJSON<LibraryOverviewResponse>("/api/plugins/library/overview"),
  search: (q: string, limit = 50) =>
    fetchJSON<LibrarySearchResponse>(
      `/api/plugins/library/search?q=${encodeURIComponent(q)}&limit=${limit}`,
    ),
  sync: () => fetchJSON<LibrarySyncResponse>("/api/plugins/library/sync", { method: "POST" }),
  getFeed: (path: string) =>
    fetchJSON<LibraryFeedResponse>(
      `/api/plugins/library/feed?path=${encodeURIComponent(path)}`,
    ),
  setFeedStatus: (path: string, status: string) =>
    fetchJSON<{ path: string; status: string }>("/api/plugins/library/feed/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, status }),
    }),
  createFeedNote: (path: string) =>
    fetchJSON<FeedNoteResponse>("/api/plugins/library/feed/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path }),
    }),
  getNote: (path: string) =>
    fetchJSON<NoteReadResponse>(
      `/api/plugins/library/note?path=${encodeURIComponent(path)}`,
    ),
  saveNote: (path: string, content: string) =>
    fetchJSON<NoteSaveResponse>("/api/plugins/library/note/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, content }),
    }),
  getNoteLinks: (path: string) =>
    fetchJSON<NoteLinksResponse>(
      `/api/plugins/library/note/links?path=${encodeURIComponent(path)}`,
    ),
  // ── 文件管理（删除/重命名/粘贴/转发到对话） ──
  deleteEntries: (paths: string[]) =>
    fetchJSON<{ deleted: number }>("/api/plugins/library/file/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths }),
    }),
  renameEntry: (path: string, newName: string) =>
    fetchJSON<{ renamed: string }>("/api/plugins/library/file/rename", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, new_name: newName }),
    }),
  pasteEntries: (paths: string[], destDir: string, mode: "copy" | "cut") =>
    fetchJSON<{ pasted: number }>("/api/plugins/library/file/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, dest_dir: destDir, mode }),
    }),
  forwardToChat: (req: LibraryForwardRequest) =>
    fetchJSON<{ status: string; session_id: string }>("/api/plugins/library/file/forward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: req.path,
        session_id: req.sessionId,
        note: req.note,
      }),
    }),
};

/** authedFetch 拉字节换 blob object URL（调用方负责 revoke）。 */
export async function fetchLibraryBlobUrl(
  endpoint: "preview" | "thumb",
  path: string,
  extra?: Record<string, string>,
): Promise<string> {
  const qs = new URLSearchParams({ path, ...extra });
  const res = await authedFetch(`/api/plugins/library/${endpoint}?${qs.toString()}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return URL.createObjectURL(await res.blob());
}

/** preview/thumb URL：一律 blob object URL（revoke: true，调用方负责释放）。 */
export async function resolveLibraryUrl(
  endpoint: "preview" | "thumb",
  path: string,
  extra?: Record<string, string>,
): Promise<{ url: string; revoke: boolean }> {
  return { url: await fetchLibraryBlobUrl(endpoint, path, extra), revoke: true };
}

/** 经 authedFetch 读取 preview 文本（md/text 渲染用）。 */
export async function fetchLibraryText(path: string): Promise<string> {
  const res = await authedFetch(
    `/api/plugins/library/preview?path=${encodeURIComponent(path)}`,
  );
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.text();
}
