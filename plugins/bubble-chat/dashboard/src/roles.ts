/**
 * Role APIs for the sidebar's two-level role UI — backed by the plugin's
 * backend routes under ``/api/plugins/bubble-chat/`` (see plugin_api.py).
 * A role is a hermes profile: the default profile plus each named profile,
 * with display metadata parsed server-side from the profile home's ROLE.md.
 *
 * The role list is cached module-level for the page's lifetime; a failed
 * fetch is NOT cached so the next open retries, and ``invalidateRoles``
 * drops the cache after role creation / ROLE.md edits.
 */

import { fetchJSON, HERMES_BASE_PATH } from "./sdk";

export interface RoleInfo {
  /** Profile id; "default" for the root profile. */
  name: string;
  display_name: string;
  description: string;
  skill_count: number;
  is_default: boolean;
  /** True only for the default profile — the 全局底座 every role builds on. */
  is_base?: boolean;
}

export interface RoleBaseFile {
  /** One of SOUL.md / AGENTS.md / USER.md. */
  name: string;
  path: string;
  exists: boolean;
  size: number;
}

export interface RoleSkillsPayload {
  /** Storage mode: named roles use the skills.whitelist file (白名单),
   *  the default role keeps the legacy config.yaml blacklist. */
  mode?: "whitelist" | "disabled";
  /** Whitelist mode only: whether skills.whitelist exists yet. */
  whitelist_file?: boolean;
  /** Whitelist mode only: raw file text (comments preserved) — the
   *  textarea shows and saves this verbatim. */
  content?: string;
  /** Enabled skill names (whitelist: parsed list as written; disabled
   *  mode: canonical frontmatter names of enabled pooled skills). */
  enabled: string[];
  /** All pooled skills, for the read-only 可用技能参考 list. Named roles
   *  see the merged pool: own skills ("role") ∪ shared from the default
   *  home ("shared") ∪ the config's library_dirs 大库 ("library");
   *  higher tiers shadow same-named lower ones. */
  available: {
    name: string;
    description: string;
    source: "role" | "shared" | "library";
  }[];
  disabled_count: number;
  /** Listed names that match no pooled skill. */
  unmatched?: string[];
  changed?: boolean;
  backup?: string | null;
}

const BASE = `${HERMES_BASE_PATH}/api/plugins/bubble-chat`;

let rolesPromise: Promise<RoleInfo[]> | null = null;

export function fetchRoles(): Promise<RoleInfo[]> {
  if (!rolesPromise) {
    rolesPromise = fetchJSON<RoleInfo[]>(`${BASE}/roles`)
      .then((list) => (Array.isArray(list) ? list : []))
      .catch(() => {
        // Do not cache failures — the next open should retry.
        rolesPromise = null;
        return [] as RoleInfo[];
      });
  }
  return rolesPromise;
}

/** Drop the cached role list (after create / ROLE.md save). */
export function invalidateRoles(): void {
  rolesPromise = null;
}

export async function createRole(payload: {
  name: string;
  display_name: string;
  description: string;
  prompt: string;
}): Promise<RoleInfo> {
  const role = await fetchJSON<RoleInfo>(`${BASE}/roles`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  invalidateRoles();
  return role;
}

export function fetchRolePrompt(
  name: string,
): Promise<{ path: string; content: string }> {
  return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/prompt`);
}

export async function writeRolePrompt(
  name: string,
  content: string,
): Promise<void> {
  await fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/prompt`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
  // ROLE.md drives the role's display name / description.
  invalidateRoles();
}

export function fetchRoleMemory(
  name: string,
): Promise<{ path: string; content: string }> {
  return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/memory`);
}

/* ---------------- 底座文件（default = 全局底座） ---------------- */

export function fetchBaseFiles(): Promise<RoleBaseFile[]> {
  return fetchJSON(`${BASE}/roles/default/base-files`);
}

export function readBaseFile(
  name: string,
): Promise<{ name: string; content: string }> {
  return fetchJSON(
    `${BASE}/roles/default/base-file?name=${encodeURIComponent(name)}`,
  );
}

export async function writeBaseFile(
  name: string,
  content: string,
): Promise<void> {
  await fetchJSON(
    `${BASE}/roles/default/base-file?name=${encodeURIComponent(name)}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    },
  );
}
export async function writeRoleMemory(
  name: string,
  content: string,
): Promise<void> {
  await fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/memory`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content }),
  });
}

export function fetchRoleSkills(name: string): Promise<RoleSkillsPayload> {
  return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/skills`);
}

/** Save the enabled-skill list (raw textarea text: one name per line,
 *  ``#`` comments and blank lines allowed). Response carries the refreshed
 *  payload plus ``unmatched`` names that matched no local skill. */
export function writeRoleSkills(
  name: string,
  text: string,
): Promise<RoleSkillsPayload> {
  return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/skills`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text }),
  });
}

/** Which profile owns a session id (null = unknown). Used by the store's
 *  resume retry after a "session not found" — role sessions live in their
 *  own profile's state.db. */
export async function lookupSessionProfile(
  sessionId: string,
): Promise<string | null> {
  try {
    const res = await fetchJSON<{ profile: string | null }>(
      `${BASE}/roles/lookup?session_id=${encodeURIComponent(sessionId)}`,
    );
    return res?.profile ?? null;
  } catch {
    return null;
  }
}
