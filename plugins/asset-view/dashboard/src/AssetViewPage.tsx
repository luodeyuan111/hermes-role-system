/**
 * 资产总览（Asset View）— R2.2/R2.4 聚合视图页面。
 *
 * 一页看全当前 profile 的资产：
 *   ① toolsets 启停清单
 *   ② MCP servers
 *   ③ cron 列表（带 profile 标注）
 *   ④ workflow 区块：cron + scripts/tools 自建脚本结合展示
 *     （fetch_arxiv.py 范式：script + cron + 输出目录）
 *   ⑤ 资产申请区块：角色资产申请单列表（R1.3，跨 profile 共享，
 *     审批走 CLI `hermes request`）
 *
 * 只读展示，不做管理操作（管理仍走 CLI `hermes tools` / 设置页）。
 */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  fetchActiveProfile,
  fetchAssetRequests,
  fetchCronJobs,
  fetchMcpServers,
  fetchProfiles,
  fetchScripts,
  fetchToolsets,
  type AssetRequestInfo,
  type CronJobInfo,
  type McpServerInfo,
  type ProfileInfo,
  type ScriptInfo,
  type ToolsetInfo,
} from "./api";
import { cn } from "./sdk";

interface PageData {
  toolsets: ToolsetInfo[];
  mcpServers: McpServerInfo[];
  cronJobs: CronJobInfo[];
  scripts: ScriptInfo[];
  cronOutputRoot: string;
}

function Section(props: { title: string; count?: number; children: any }) {
  return (
    <section className="rounded-lg border border-midground/20 bg-background-base/40 p-4">
      <h2 className="mb-3 text-sm font-semibold text-text-primary">
        {props.title}
        {props.count !== undefined && (
          <span className="ml-2 text-xs font-normal text-text-secondary">({props.count})</span>
        )}
      </h2>
      {props.children}
    </section>
  );
}

function Badge(props: { on: boolean; onText: string; offText: string }) {
  return (
    <span
      className={cn(
        "inline-block rounded px-1.5 py-0.5 text-[11px] leading-none",
        props.on ? "bg-success/15 text-success" : "bg-midground/15 text-text-tertiary",
      )}
    >
      {props.on ? props.onText : props.offText}
    </span>
  );
}

function EmptyHint(props: { text: string }) {
  return <p className="text-xs text-text-tertiary">{props.text}</p>;
}

/** cron job 是否引用了某个脚本（workflow 关联：script 字段命中脚本文件名）。 */
function jobUsesScript(job: CronJobInfo, script: ScriptInfo): boolean {
  const ref = `${job.script ?? ""} ${job.prompt ?? ""}`;
  return ref.includes(script.filename) || ref.includes(script.path);
}

/** 申请单状态的中文展示。 */
const REQUEST_STATUS_LABEL: Record<string, string> = {
  pending: "待审批",
  approved: "已批准",
  rejected: "已拒绝",
  done: "已完成",
};

export default function AssetViewPage() {
  const [profiles, setProfiles] = useState<ProfileInfo[]>([]);
  const [selectedProfile, setSelectedProfile] = useState<string>("");
  const [data, setData] = useState<PageData | null>(null);
  const [requests, setRequests] = useState<AssetRequestInfo[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  // 初始化：profile 列表 + 默认选中当前活动 profile。
  // 资产申请单是跨 profile 共享的（落盘在 default root），只加载一次。
  useEffect(() => {
    Promise.all([fetchProfiles(), fetchActiveProfile()])
      .then(([plist, active]) => {
        setProfiles(plist.profiles || []);
        setSelectedProfile(active.current || active.active || "default");
      })
      .catch((e) => setError(`加载 profile 列表失败：${e}`));
    fetchAssetRequests()
      .then((r) => setRequests(r.requests || []))
      .catch(() => setRequests([]));
  }, []);

  const load = useCallback((profile: string) => {
    if (!profile) return;
    setLoading(true);
    setError("");
    // cron 用 all 聚合（带 profile 标注），其余按选中 profile 投影。
    Promise.all([
      fetchToolsets(profile),
      fetchMcpServers(profile),
      fetchCronJobs("all"),
      fetchScripts(profile),
    ])
      .then(([toolsets, mcp, jobs, scripts]) => {
        setData({
          toolsets: Array.isArray(toolsets) ? toolsets : [],
          mcpServers: mcp.servers || [],
          cronJobs: Array.isArray(jobs) ? jobs : [],
          scripts: scripts.scripts || [],
          cronOutputRoot: scripts.cron_output_root || "",
        });
      })
      .catch((e) => setError(`加载资产数据失败：${e}`))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => load(selectedProfile), [selectedProfile, load]);

  // workflow 区块：把引用了自建脚本的 cron job 与脚本配对。
  const workflows = useMemo(() => {
    if (!data) return [];
    return data.scripts.map((script) => ({
      script,
      jobs: data.cronJobs.filter((j) => jobUsesScript(j, script)),
    }));
  }, [data]);

  const enabledToolsets = useMemo(
    () => (data ? data.toolsets.filter((t) => t.enabled) : []),
    [data],
  );
  const disabledToolsets = useMemo(
    () => (data ? data.toolsets.filter((t) => !t.enabled) : []),
    [data],
  );

  return (
    <div className="hermes-asset-view mx-auto w-full max-w-5xl space-y-4 p-6">
      <header className="flex flex-wrap items-center gap-3">
        <div>
          <h1 className="text-lg font-semibold text-text-primary">资产总览</h1>
          <p className="text-xs text-text-secondary">
            当前 profile 的 tools / MCP / workflow 只读清单；管理请用 CLI `hermes tools` 或设置页
          </p>
        </div>
        <div className="ml-auto flex items-center gap-2 text-sm">
          <label className="text-text-secondary" htmlFor="asset-view-profile">
            Profile
          </label>
          <select
            id="asset-view-profile"
            className="rounded border border-midground/30 bg-background px-2 py-1 text-sm text-text-primary"
            value={selectedProfile}
            onChange={(e) => setSelectedProfile(e.target.value)}
          >
            {profiles.length === 0 && <option value={selectedProfile}>{selectedProfile}</option>}
            {profiles.map((p) => (
              <option key={p.name} value={p.name}>
                {p.name}
                {p.is_default ? "（默认）" : ""}
              </option>
            ))}
          </select>
        </div>
      </header>

      {error && (
        <div className="rounded border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          {error}
        </div>
      )}
      {loading && <p className="text-sm text-text-secondary">加载中…</p>}

      {data && !loading && (
        <>
          {/* ① Toolsets 启停清单 */}
          <Section title="Toolsets" count={data.toolsets.length}>
            <div className="space-y-1">
              {enabledToolsets.map((ts) => (
                <div key={ts.name} className="flex items-center gap-2 text-sm">
                  <Badge on onText="启用" offText="停用" />
                  <span className="font-medium text-text-primary">{ts.label || ts.name}</span>
                  <span className="text-xs text-text-tertiary">{ts.name}</span>
                  <span className="truncate text-xs text-text-secondary">{ts.description}</span>
                </div>
              ))}
              {disabledToolsets.length > 0 && (
                <details className="pt-1 text-sm">
                  <summary className="cursor-pointer text-xs text-text-tertiary">
                    已停用（{disabledToolsets.length}）
                  </summary>
                  <div className="mt-1 space-y-1">
                    {disabledToolsets.map((ts) => (
                      <div key={ts.name} className="flex items-center gap-2 text-sm">
                        <Badge on={false} onText="启用" offText="停用" />
                        <span className="text-text-secondary">{ts.label || ts.name}</span>
                        <span className="text-xs text-text-tertiary">{ts.name}</span>
                      </div>
                    ))}
                  </div>
                </details>
              )}
              {data.toolsets.length === 0 && <EmptyHint text="该 profile 下没有可见的 toolset" />}
            </div>
          </Section>

          {/* ② MCP servers */}
          <Section title="MCP Servers" count={data.mcpServers.length}>
            {data.mcpServers.length === 0 ? (
              <EmptyHint text="该 profile 未配置 MCP server" />
            ) : (
              <div className="space-y-1">
                {data.mcpServers.map((s) => (
                  <div key={s.name} className="flex items-center gap-2 text-sm">
                    <Badge on={s.enabled} onText="启用" offText="停用" />
                    <span className="font-medium text-text-primary">{s.name}</span>
                    <span className="rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary">
                      {s.transport}
                    </span>
                    <span className="truncate text-xs text-text-tertiary">
                      {s.url || s.command || ""}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ③ Cron 列表（跨 profile 聚合，带 profile 标注） */}
          <Section title="Cron 任务" count={data.cronJobs.length}>
            {data.cronJobs.length === 0 ? (
              <EmptyHint text="没有任何 profile 的 cron 任务" />
            ) : (
              <div className="space-y-1">
                {data.cronJobs.map((job) => (
                  <div key={`${job.profile}-${job.id}`} className="flex items-center gap-2 text-sm">
                    <Badge
                      on={job.enabled !== false && job.state !== "paused"}
                      onText={job.state || "启用"}
                      offText="暂停"
                    />
                    <span className="font-medium text-text-primary">{job.name}</span>
                    <span className="rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary">
                      {job.profile || "default"}
                    </span>
                    <span className="text-xs text-text-secondary">{job.schedule_display || ""}</span>
                    {job.script && (
                      <span className="truncate font-mono text-xs text-text-tertiary">{job.script}</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </Section>

          {/* ④ Workflow 区块：脚本 + 关联 cron + 输出目录 */}
          <Section title="Workflows（script + cron + 输出目录）" count={workflows.length}>
            {data.cronOutputRoot && (
              <p className="mb-2 text-xs text-text-tertiary">
                cron 输出目录：<span className="font-mono">{data.cronOutputRoot}</span>
              </p>
            )}
            {workflows.length === 0 ? (
              <EmptyHint text="scripts/tools/ 下没有自建脚本" />
            ) : (
              <div className="space-y-2">
                {workflows.map(({ script, jobs }) => (
                  <div
                    key={`${script.scope}-${script.profile}-${script.filename}`}
                    className="rounded border border-midground/15 px-3 py-2"
                  >
                    <div className="flex items-center gap-2 text-sm">
                      <span className="font-mono font-medium text-text-primary">{script.filename}</span>
                      <span className="rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary">
                        {script.scope === "shared" ? "共享" : script.profile}
                      </span>
                      <span className="truncate text-xs text-text-secondary">{script.description}</span>
                    </div>
                    <div className="mt-1 pl-2 text-xs text-text-tertiary">
                      {jobs.length === 0 ? (
                        <span>无关联 cron（未纳入调度）</span>
                      ) : (
                        jobs.map((j) => (
                          <div key={`${j.profile}-${j.id}`}>
                            ⏱ {j.name} · {j.schedule_display || ""} · {j.profile || "default"}
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Section>
        </>
      )}

      {/* ⑤ 资产申请（R1.3）：跨 profile 共享的申请单列表，只读；审批走 CLI */}
      <Section title="资产申请" count={requests.length}>
        {requests.length === 0 ? (
          <EmptyHint text="没有资产申请单（角色可通过 `hermes request create` 提交）" />
        ) : (
          <div className="space-y-1">
            {requests.map((r) => (
              <div key={r.id} className="flex items-center gap-2 text-sm">
                <span
                  className={cn(
                    "inline-block rounded px-1.5 py-0.5 text-[11px] leading-none",
                    r.status === "pending"
                      ? "bg-warning/15 text-warning"
                      : r.status === "approved"
                        ? "bg-success/15 text-success"
                        : "bg-midground/15 text-text-tertiary",
                  )}
                >
                  {REQUEST_STATUS_LABEL[r.status] || r.status}
                </span>
                <span className="rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary">
                  {r.kind}
                </span>
                <span className="font-medium text-text-primary">{r.title}</span>
                <span className="text-xs text-text-secondary">{r.profile}</span>
                <span className="text-xs text-text-tertiary">{(r.created_at || "").slice(0, 10)}</span>
              </div>
            ))}
            <p className="pt-1 text-xs text-text-tertiary">
              审批：`hermes request approve &lt;id&gt;` / `reject &lt;id&gt;` / `done &lt;id&gt;`
            </p>
          </div>
        )}
      </Section>
    </div>
  );
}
