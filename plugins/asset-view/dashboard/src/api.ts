/**
 * 资产总览 — 数据访问层。
 *
 * toolsets / MCP / cron / skills 直接打宿主的现成聚合 API（均支持
 * ?profile= 投影），自建脚本清单与 skill 概况走本插件的后端
 * /api/plugins/asset-view/scripts|skills。
 */

import { fetchJSON, HERMES_BASE_PATH } from "./sdk";

export interface ToolsetInfo {
  name: string;
  label: string;
  description: string;
  enabled: boolean;
  configured: boolean;
  tools: string[];
}

export interface McpServerInfo {
  name: string;
  transport: string;
  url: string | null;
  command: string | null;
  enabled: boolean;
  tools: string[] | null;
}

export interface CronJobInfo {
  id: string;
  name: string;
  prompt?: string;
  script?: string;
  schedule_display?: string;
  state?: string;
  enabled?: boolean;
  next_run?: string | null;
  profile?: string;
}

export interface ScriptInfo {
  name: string;
  filename: string;
  path: string;
  description: string;
  scope: "shared" | "profile";
  profile: string;
}

/** 宿主 /api/skills?profile= 的单条 skill（字段子集，够用即可）。 */
export interface SkillInfo {
  name: string;
  description?: string;
  enabled?: boolean;
  provenance?: string;
}

export interface SkillWhitelistEntry {
  name: string;
  /** 归属：本地池（profile 家 skills/）/ 共享池（default 家）/ 未匹配。 */
  origin: "local" | "shared" | "unmatched";
}

/** 角色能力画像（capability.yaml，hermes-orchestration O1）。字段全部可选，缺省即不适用。 */
export interface CapabilityProfile {
  mission?: string;
  good_at?: string[];
  not_for?: string[];
  io?: string;
  tools_note?: string;
  cost_hint?: string;
}

/** 本插件 /skills 端点的 profile skill 概况。 */
export interface SkillOverview {
  profile: string;
  is_default: boolean;
  whitelist_exists: boolean;
  whitelist: SkillWhitelistEntry[];
  local_pool: { name: string; description: string }[];
  shared_refs: number;
  shared_pool_size: number;
  /** 能力画像；文件不存在/解析失败为 null。 */
  capability: CapabilityProfile | null;
}

export interface ProfileInfo {
  name: string;
  is_default: boolean;
  description: string;
}

export function fetchToolsets(profile: string): Promise<ToolsetInfo[]> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/tools/toolsets?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchMcpServers(profile: string): Promise<{ servers: McpServerInfo[] }> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/mcp/servers?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchCronJobs(profile: string): Promise<CronJobInfo[]> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/cron/jobs?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchScripts(profile: string): Promise<{ scripts: ScriptInfo[]; cron_output_root: string }> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/plugins/asset-view/scripts?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchSkills(profile: string): Promise<SkillInfo[]> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/skills?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchSkillOverview(profile: string): Promise<SkillOverview> {
  return fetchJSON(
    `${HERMES_BASE_PATH}/api/plugins/asset-view/skills?profile=${encodeURIComponent(profile)}`,
  );
}

export function fetchProfiles(): Promise<{ profiles: ProfileInfo[] }> {
  return fetchJSON(`${HERMES_BASE_PATH}/api/profiles`);
}

export function fetchActiveProfile(): Promise<{ active: string; current: string }> {
  return fetchJSON(`${HERMES_BASE_PATH}/api/profiles/active`);
}

export interface AssetRequestInfo {
  id: string;
  profile: string;
  kind: "skill" | "tool" | "mcp" | "other";
  title: string;
  status: "pending" | "approved" | "rejected" | "done";
  created_at: string;
  updated_at: string;
  body?: string;
}

export function fetchAssetRequests(status?: string): Promise<{ requests: AssetRequestInfo[] }> {
  const query = status ? `?status=${encodeURIComponent(status)}` : "";
  return fetchJSON(`${HERMES_BASE_PATH}/api/plugins/asset-view/requests${query}`);
}
