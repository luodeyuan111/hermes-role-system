import { useEffect, useMemo, useRef, useState } from "react";
import { FileClock } from "lucide-react";
import { Spinner } from "../shared/Spinner";
import {
  libraryApi,
  type LibraryOverviewResponse,
  type OverviewRoot,
} from "./api";
import { formatBytes, formatTimeAgo, parentDir } from "./format";

interface LibraryOverviewProps {
  /** 点击 treemap 分支 → 跳入浏览视图对应目录 */
  onOpenPath: (path: string) => void;
  /** 点击最近变更 → 跳文件所在目录并选中该文件 */
  onOpenFile: (filePath: string) => void;
  refreshKey: number;
}

interface TreemapItem {
  key: string;
  label: string;
  sub: string;
  path: string;
  x: number;
  y: number;
  w: number;
  h: number;
  depth: number;
  hue: number;
  clickable: boolean;
  hasChildren: boolean;
}

interface SliceNode {
  key: string;
  label: string;
  sub: string;
  path: string;
  value: number;
  depth: number;
  hue: number;
  clickable: boolean;
  children?: SliceNode[];
}

/**
 * 简单 slice-and-dice：按值比例切分，偶数层横切（列）、奇数层纵切（行）。
 * 全部在像素空间布局（容器尺寸由 ResizeObserver 实测），标题带/间距也是
 * 固定像素——之前用百分比做标题带，带高（7% ≈ 22px）容不下两行文字，
 * 父节点第二行会溢出压到第一个子块上，造成文字错位重叠。
 */
const TITLE_BAND_PX = 18;
const PAD_PX = 2;

function layoutSliceDice(
  nodes: SliceNode[],
  x: number,
  y: number,
  w: number,
  h: number,
  out: TreemapItem[],
): void {
  const total = nodes.reduce((s, n) => s + n.value, 0);
  if (total <= 0 || w <= 0 || h <= 0) return;
  const horizontal = nodes[0]?.depth % 2 === 0;
  let offset = 0;
  for (const node of nodes) {
    const frac = node.value / total;
    const rect = horizontal
      ? { x: x + offset * w, y, w: w * frac, h }
      : { x, y: y + offset * h, w, h: h * frac };
    offset += frac;
    const hasChildren = Boolean(node.children && node.children.length > 0);
    out.push({
      key: node.key,
      label: node.label,
      sub: node.sub,
      path: node.path,
      depth: node.depth,
      hue: node.hue,
      clickable: node.clickable,
      hasChildren,
      ...rect,
    });
    if (hasChildren && rect.w > 2 * PAD_PX + 8 && rect.h > TITLE_BAND_PX + PAD_PX + 8) {
      // 留一条标题带后递归子节点
      layoutSliceDice(
        node.children!,
        rect.x + PAD_PX,
        rect.y + TITLE_BAND_PX,
        rect.w - PAD_PX * 2,
        rect.h - TITLE_BAND_PX - PAD_PX,
        out,
      );
    }
  }
}

const EXT_COLORS = [
  "#60a5fa", "#f87171", "#34d399", "#fbbf24", "#a78bfa",
  "#f472b6", "#22d3ee", "#a3e635", "#fb923c", "#94a3b8",
];

export function LibraryOverview({ onOpenPath, onOpenFile, refreshKey }: LibraryOverviewProps) {
  const [data, setData] = useState<LibraryOverviewResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    libraryApi
      .getOverview()
      .then((res) => {
        if (!cancelled) setData(res);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const treemapBoxRef = useRef<HTMLDivElement | null>(null);
  const [treemapBox, setTreemapBox] = useState<{ w: number; h: number } | null>(null);

  // Treemap lays out in pixels (fixed-px title bands keep labels from
  // spilling onto child blocks), so it needs the container's real size.
  useEffect(() => {
    const el = treemapBoxRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const rect = entries[0]?.contentRect;
      if (rect && rect.width > 0 && rect.height > 0) {
        setTreemapBox({ w: rect.width, h: rect.height });
      }
    });
    ro.observe(el);
    return () => ro.disconnect();
    // 容器在 loading 结束后才挂载，依赖 loading 以便届时再挂 observer。
  }, [loading]);

  const treemapItems = useMemo(() => {
    if (!data || !treemapBox) return [];
    const nodes: SliceNode[] = data.roots
      .filter((r) => r.total_size > 0)
      .map((r, i) => ({
        key: r.path,
        label: r.name,
        sub: `${formatBytes(r.total_size)} · ${r.file_count} 个文件`,
        path: r.path,
        value: r.total_size,
        depth: 0,
        hue: (i * 67) % 360,
        clickable: true,
        children: r.branches
          .filter((b) => b.size > 0)
          .map((b) => ({
            key: `${r.path}/${b.name}`,
            label: b.name === "(root)" ? "（根目录直属）" : b.name,
            sub: formatBytes(b.size),
            path: b.name === "(root)" ? r.path : `${r.path}/${b.name}`,
            value: b.size,
            depth: 1,
            hue: (i * 67) % 360,
            clickable: true,
          })),
      }));
    const out: TreemapItem[] = [];
    layoutSliceDice(nodes, 0, 0, treemapBox.w, treemapBox.h, out);
    return out;
  }, [data, treemapBox]);

  const extStatsPerRoot = useMemo(() => {
    if (!data) return [];
    return data.roots.map((root: OverviewRoot) => {
      const agg: Record<string, number> = {};
      for (const b of root.branches) {
        for (const [ext, count] of Object.entries(b.ext_stats)) {
          agg[ext] = (agg[ext] ?? 0) + count;
        }
      }
      const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1]);
      const top = sorted.slice(0, 5);
      const rest = sorted.slice(5).reduce((s, [, c]) => s + c, 0);
      const entries = rest > 0 ? [...top, ["其他", rest] as [string, number]] : top;
      const total = entries.reduce((s, [, c]) => s + c, 0);
      return { root, entries, total };
    });
  }, [data]);

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center gap-2 text-sm text-text-secondary">
        <Spinner />
        <span>统计中（大目录首次可能较慢）…</span>
      </div>
    );
  }
  if (error) {
    return <p className="px-4 py-6 text-sm text-red-400">加载失败:{error}</p>;
  }
  if (!data || data.roots.length === 0) {
    return (
      <p className="px-4 py-10 text-center text-sm text-text-tertiary">
        尚未配置资料库根目录
      </p>
    );
  }

  return (
    <div className="h-full space-y-6 overflow-y-auto p-4">
      {/* 空间分布 Treemap */}
      <section>
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
          空间分布
        </h2>
        {data.roots.every((r) => r.total_size <= 0) ? (
          <p className="text-sm text-text-tertiary">（空库）</p>
        ) : (
          <div
            ref={treemapBoxRef}
            className="relative h-80 w-full overflow-hidden rounded-md border border-current/10"
          >
            {treemapItems.map((item) => {
              // 父块：标签只放进标题带（单行），大小信息留在 title 里；
              // 叶子块：空间够才显示标签/大小，不够就只剩色块 + title。
              const showLabel = item.hasChildren
                ? item.w >= 48 && item.h >= TITLE_BAND_PX + 6
                : item.w >= 48 && item.h >= 16;
              const showSub =
                !item.hasChildren && item.w >= 64 && item.h >= 32;
              return (
                <button
                  key={`${item.depth}:${item.key}`}
                  type="button"
                  disabled={!item.clickable}
                  onClick={() => onOpenPath(item.path)}
                  title={`${item.label} · ${item.sub}`}
                  className="absolute overflow-hidden border border-black/40 text-left transition-colors hover:brightness-125"
                  style={{
                    left: item.x,
                    top: item.y,
                    width: item.w,
                    height: item.h,
                    background: `hsl(${item.hue} 45% 45% / ${item.depth === 0 ? 0.18 : 0.32})`,
                  }}
                >
                  {showLabel && (
                    <span
                      className="block truncate px-1.5 text-xs font-medium text-text-primary"
                      style={
                        item.hasChildren
                          ? { height: TITLE_BAND_PX, lineHeight: `${TITLE_BAND_PX}px` }
                          : { paddingTop: 2 }
                      }
                    >
                      {item.label}
                    </span>
                  )}
                  {showSub && (
                    <span className="block truncate px-1.5 text-[10px] text-text-secondary">
                      {item.sub}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* 类型统计 */}
      <section>
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
          类型统计
        </h2>
        <div className="space-y-3">
          {extStatsPerRoot.map(({ root, entries, total }) =>
            total === 0 ? null : (
              <div key={root.path}>
                <div className="mb-1 flex items-baseline justify-between text-sm">
                  <span className="font-medium">{root.name}</span>
                  <span className="text-xs text-text-tertiary">
                    {root.file_count} 个文件 · {formatBytes(root.total_size)}
                  </span>
                </div>
                <div className="flex h-3 w-full overflow-hidden rounded-sm">
                  {entries.map(([ext, count], i) => (
                    <div
                      key={ext}
                      title={`.${ext} · ${count} 个`}
                      style={{
                        width: `${(count / total) * 100}%`,
                        background: EXT_COLORS[i % EXT_COLORS.length],
                      }}
                    />
                  ))}
                </div>
                <div className="mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-text-secondary">
                  {entries.map(([ext, count], i) => (
                    <span key={ext} className="flex items-center gap-1">
                      <span
                        className="inline-block size-2 rounded-full"
                        style={{ background: EXT_COLORS[i % EXT_COLORS.length] }}
                      />
                      .{ext}（{count}）
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </section>

      {/* 最近变更 */}
      <section>
        <h2 className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
          最近变更
        </h2>
        {data.recent.length === 0 ? (
          <p className="text-sm text-text-tertiary">（暂无文件）</p>
        ) : (
          <ul className="divide-y divide-current/5 rounded-md border border-current/10">
            {data.recent.map((item) => (
              <li key={item.path}>
                <button
                  type="button"
                  onClick={() => onOpenFile(item.path)}
                  title={item.path}
                  className="flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left hover:bg-midground/5"
                >
                  <FileClock className="size-4 shrink-0 text-text-tertiary" />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm">{item.name}</span>
                    <span className="block truncate text-xs text-text-tertiary">
                      {parentDir(item.path)}
                    </span>
                  </span>
                  <span className="shrink-0 text-xs text-text-secondary">
                    {formatBytes(item.size)}
                  </span>
                  <span className="w-20 shrink-0 text-right text-xs text-text-tertiary">
                    {formatTimeAgo(item.mtime)}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
