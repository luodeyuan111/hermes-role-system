import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, ChevronRight, Folder, FolderOpen, HardDrive } from "lucide-react";
import { cn } from "../sdk";
import { libraryApi, type LibraryDirEntry, type LibraryRoot } from "./api";

interface LibraryTreeProps {
  roots: LibraryRoot[];
  currentPath: string | null;
  /** bump 以强制重新加载已展开的节点 */
  refreshKey: number;
  onNavigate: (path: string) => void;
}

/**
 * 左侧目录树：从 config roots 开始逐级懒加载。
 * children 缓存以目录绝对路径为键；展开时若无缓存则请求 /api/plugins/library/tree。
 */
export function LibraryTree({ roots, currentPath, refreshKey, onNavigate }: LibraryTreeProps) {
  const [children, setChildren] = useState<Record<string, LibraryDirEntry[]>>({});
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState<Set<string>>(new Set());
  const [error, setError] = useState<string | null>(null);
  // children 的同步镜像，供事件回调/副作用做缓存命中判断（避免在
  // setState updater 里发请求 —— StrictMode 会双调 updater）
  const childrenRef = useRef<Record<string, LibraryDirEntry[]>>({});
  childrenRef.current = children;
  const revealedRef = useRef<string | null>(null);

  const loadChildren = useCallback(async (path: string) => {
    setLoading((prev) => new Set(prev).add(path));
    try {
      const res = await libraryApi.getTree(path);
      setChildren((prev) => ({ ...prev, [path]: res.dirs }));
      setError(null);
    } catch (e) {
      setError(String(e));
    } finally {
      setLoading((prev) => {
        const next = new Set(prev);
        next.delete(path);
        return next;
      });
    }
  }, []);

  const ensureChildren = useCallback(
    (path: string) => {
      if (!childrenRef.current[path]) void loadChildren(path);
    },
    [loadChildren],
  );

  const toggle = useCallback(
    (path: string) => {
      setExpanded((prev) => {
        const next = new Set(prev);
        if (next.has(path)) next.delete(path);
        else next.add(path);
        return next;
      });
      ensureChildren(path);
    },
    [ensureChildren],
  );

  // 初次：展开所有 root 并加载其直接子目录
  useEffect(() => {
    if (roots.length === 0) return;
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const r of roots) next.add(r.path);
      return next;
    });
    for (const r of roots) ensureChildren(r.path);
  }, [roots, ensureChildren]);

  // 手动刷新：清缓存，重新加载所有已展开节点
  const firstRefresh = useRef(true);
  useEffect(() => {
    if (firstRefresh.current) {
      firstRefresh.current = false;
      return;
    }
    setChildren({});
    childrenRef.current = {};
    revealedRef.current = null;
    for (const p of Array.from(expanded)) void loadChildren(p);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshKey]);

  // 当前路径变化时，自动展开沿途祖先（各级路径已知，可并行加载）
  useEffect(() => {
    if (!currentPath || roots.length === 0) return;
    if (revealedRef.current === currentPath) return;
    revealedRef.current = currentPath;
    const root = roots.find(
      (r) => currentPath === r.path || currentPath.startsWith(r.path + "/"),
    );
    if (!root) return;
    const ancestors: string[] = [root.path];
    if (currentPath !== root.path) {
      const rel = currentPath.slice(root.path.length + 1).split("/");
      let acc = root.path;
      // 不含 currentPath 本身（它是被高亮的节点，不是必须展开的祖先）
      for (let i = 0; i < rel.length - 1; i++) {
        acc += "/" + rel[i];
        ancestors.push(acc);
      }
    }
    setExpanded((prev) => {
      const next = new Set(prev);
      for (const p of ancestors) next.add(p);
      return next;
    });
    for (const p of ancestors) ensureChildren(p);
  }, [currentPath, roots, ensureChildren]);

  const renderDir = (dir: LibraryDirEntry, depth: number) => {
    const isExpanded = expanded.has(dir.path);
    const isCurrent = currentPath === dir.path;
    const isLoading = loading.has(dir.path);
    const kids = children[dir.path];
    return (
      <li key={dir.path}>
        <div
          className={cn(
            "group flex min-w-0 items-center gap-1 rounded-sm py-1 pr-2 text-sm cursor-pointer",
            "hover:bg-midground/5",
            isCurrent && "bg-midground/10 text-midground",
          )}
          style={{ paddingLeft: `${depth * 14 + 4}px` }}
        >
          <button
            type="button"
            aria-label={isExpanded ? "收起" : "展开"}
            className="shrink-0 p-0.5 text-text-tertiary hover:text-midground"
            onClick={(e) => {
              e.stopPropagation();
              toggle(dir.path);
            }}
          >
            {isExpanded ? (
              <ChevronDown className="size-3.5" />
            ) : (
              <ChevronRight className="size-3.5" />
            )}
          </button>
          <button
            type="button"
            className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
            onClick={() => {
              onNavigate(dir.path);
              if (!isExpanded) toggle(dir.path);
            }}
            title={dir.path}
          >
            {isCurrent || isExpanded ? (
              <FolderOpen className="size-3.5 shrink-0 text-text-secondary" />
            ) : (
              <Folder className="size-3.5 shrink-0 text-text-secondary" />
            )}
            <span className="truncate">{dir.name}</span>
            {isLoading && (
              <span className="ml-1 size-2 shrink-0 animate-pulse rounded-full bg-midground/40" />
            )}
          </button>
        </div>
        {isExpanded && kids && kids.length > 0 && (
          <ul>{kids.map((d) => renderDir(d, depth + 1))}</ul>
        )}
      </li>
    );
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="border-b border-current/10 px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
        目录
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        {error && (
          <p className="px-3 py-2 text-xs text-red-400">加载失败：{error}</p>
        )}
        <ul className="pb-2">
          {roots.map((root) => {
            const isExpanded = expanded.has(root.path);
            const isCurrent = currentPath === root.path;
            const kids = children[root.path];
            return (
              <li key={root.path}>
                <div
                  className={cn(
                    "flex min-w-0 items-center gap-1 rounded-sm py-1 pr-2 text-sm font-medium cursor-pointer",
                    "hover:bg-midground/5",
                    isCurrent && "bg-midground/10 text-midground",
                  )}
                  style={{ paddingLeft: 4 }}
                >
                  <button
                    type="button"
                    aria-label={isExpanded ? "收起" : "展开"}
                    className="shrink-0 p-0.5 text-text-tertiary hover:text-midground"
                    onClick={() => toggle(root.path)}
                  >
                    {isExpanded ? (
                      <ChevronDown className="size-3.5" />
                    ) : (
                      <ChevronRight className="size-3.5" />
                    )}
                  </button>
                  <button
                    type="button"
                    className="flex min-w-0 flex-1 items-center gap-1.5 text-left"
                    onClick={() => onNavigate(root.path)}
                    title={root.path}
                  >
                    <HardDrive className="size-3.5 shrink-0 text-text-secondary" />
                    <span className="truncate">{root.name}</span>
                  </button>
                </div>
                {isExpanded && kids && kids.length > 0 && (
                  <ul>{kids.map((d) => renderDir(d, 1))}</ul>
                )}
                {isExpanded && kids && kids.length === 0 && (
                  <p
                    className="py-1 text-xs text-text-tertiary"
                    style={{ paddingLeft: 4 + 14 + 18 }}
                  >
                    （空）
                  </p>
                )}
              </li>
            );
          })}
        </ul>
        {roots.length === 0 && !error && (
          <p className="px-3 py-4 text-xs text-text-tertiary">
            尚未配置资料库根目录。
          </p>
        )}
      </div>
    </div>
  );
}
