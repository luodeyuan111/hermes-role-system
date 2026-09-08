/**
 * RoleSidebar — CherryStudio-style two-level sidebar for the bubble chat.
 *
 * Level 1 (角色列表): the default profile plus every named profile as
 * selectable roles (display name / description / skill count from the
 * plugin's /roles endpoint), with a 新建角色 form (名称 + 显示名 + 描述 +
 * 提示词 → profile + ROLE.md).
 *
 * Level 2 (角色视图): tapping a role swaps the sidebar to that role's own
 * panel — header (← back to the role list, name, description), collapsible
 * editors for 提示词 (ROLE.md), 记忆 (MEMORY.md) and 技能列表 (enabled
 * skills as plain text, one name per line, with a read-only 可用技能参考
 * pick list) — all collapsed by default and lazily loaded on first expand —
 * a 新建小对话 button with an optional model dropdown, and the
 * role's own 小对话列表 (sessions of that profile only). New chats created
 * here inherit the role naturally — no picker dialog anywhere.
 *
 * The open level is kept in a module-level variable so tab-switch remounts
 * (the plugin route unmounts on tab switches) restore the same view.
 */

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  Bot,
  ChevronRight,
  ChevronDown,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";

import { Button, cn } from "./sdk";
import {
  createRole,
  fetchBaseFiles,
  fetchRoleMemory,
  fetchRolePrompt,
  fetchRoleSkills,
  fetchRoles,
  readBaseFile,
  writeBaseFile,
  writeRoleMemory,
  writeRolePrompt,
  writeRoleSkills,
  type RoleBaseFile,
  type RoleInfo,
  type RoleSkillsPayload,
} from "./roles";
import { setResumeParam } from "./router";
import { ChatSessionList } from "./ChatSessionList";
import { Spinner } from "./shared/Spinner";
import { bubbleChatStore as store, type ModelOptionsPayload } from "./store";

/** Survives page remounts (module singleton — same lifetime as the store). */
let persistedOpenRole: string | null = null;

interface RoleSidebarProps {
  /** Active resume target (the session currently open in the chat pane). */
  activeSessionId: string | null;
  className?: string;
  /** Fired after a row is picked (e.g. close the mobile drawer). */
  onPicked?: () => void;
  /** Fired after a session is deleted so the host can reset if it was active. */
  onSessionDeleted?: (id: string) => void;
  /** Desktop sidebar fold button (level 1 header only). */
  onCollapse?: () => void;
}

/* ------------------------------------------------------------------------ */
/*  Level 1: role list + 新建角色                                            */
/* ------------------------------------------------------------------------ */

interface RoleDraft {
  name: string;
  display_name: string;
  description: string;
  prompt: string;
}

const EMPTY_DRAFT: RoleDraft = {
  name: "",
  display_name: "",
  description: "",
  prompt: "",
};

function RoleListView({
  roles,
  loading,
  error,
  onReload,
  onOpen,
  onCreated,
  onCollapse,
}: {
  roles: RoleInfo[] | null;
  loading: boolean;
  error: string | null;
  onReload: () => void;
  onOpen: (name: string) => void;
  /** After a successful create: parent refreshes the list; we open the role. */
  onCreated: (name: string) => void;
  onCollapse?: () => void;
}) {
  const [formOpen, setFormOpen] = useState(false);
  const [draft, setDraft] = useState<RoleDraft>(EMPTY_DRAFT);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const submit = useCallback(async () => {
    const name = draft.name.trim();
    if (!name) {
      setFormError("请填写角色标识（小写字母/数字/-/_)");
      return;
    }
    setSaving(true);
    setFormError(null);
    try {
      const role = await createRole({
        name,
        display_name: draft.display_name.trim(),
        description: draft.description.trim(),
        prompt: draft.prompt.trim(),
      });
      setFormOpen(false);
      setDraft(EMPTY_DRAFT);
      onCreated(role.name);
    } catch (e) {
      setFormError(e instanceof Error ? e.message : "创建失败");
    } finally {
      setSaving(false);
    }
  }, [draft, onCreated]);

  const field =
    "w-full rounded-lg border border-current/15 bg-background-base px-2.5 py-1.5 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none";

  return (
    <>
      <div className="flex items-center justify-between gap-2 px-2 pb-2">
        <span className="text-display text-xs tracking-wider text-text-tertiary">
          角色
        </span>
        <span className="flex items-center gap-0.5">
          <Button
            ghost
            size="icon"
            onClick={onReload}
            aria-label="刷新"
            title="刷新"
            className="text-text-secondary hover:text-foreground"
          >
            <RefreshCw className={cn(loading && "animate-spin")} />
          </Button>
          {onCollapse && (
            <Button
              ghost
              size="icon"
              onClick={onCollapse}
              aria-label="折叠会话列表"
              title="折叠会话列表"
              className="text-text-secondary hover:text-foreground"
            >
              <X />
            </Button>
          )}
        </span>
      </div>

      <Button
        outlined
        size="sm"
        onClick={() => {
          setFormError(null);
          setFormOpen((v) => !v);
        }}
        prefix={<Plus />}
        className="mx-2 mb-2 justify-center"
      >
        新建角色
      </Button>

      {formOpen && (
        <div className="mx-2 mb-2 flex flex-col gap-1.5 rounded-lg border border-current/10 p-2.5">
          <input
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            placeholder="标识（如 writer，小写字母/数字/-/_）"
            aria-label="角色标识"
            className={field}
          />
          <input
            value={draft.display_name}
            onChange={(e) => setDraft({ ...draft, display_name: e.target.value })}
            placeholder="显示名（如 写作助手，留空用标识）"
            aria-label="显示名"
            className={field}
          />
          <input
            value={draft.description}
            onChange={(e) => setDraft({ ...draft, description: e.target.value })}
            placeholder="一句话描述（可选）"
            aria-label="描述"
            className={field}
          />
          <textarea
            value={draft.prompt}
            onChange={(e) => setDraft({ ...draft, prompt: e.target.value })}
            placeholder="提示词（写入 ROLE.md，注入该角色的系统提示）"
            aria-label="提示词"
            rows={4}
            className={cn(field, "resize-y")}
          />
          {formError && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
              {formError}
            </div>
          )}
          <div className="flex justify-end gap-1.5">
            <Button ghost size="sm" onClick={() => setFormOpen(false)}>
              取消
            </Button>
            <Button size="sm" disabled={saving} onClick={() => void submit()}>
              {saving ? "创建中…" : "创建"}
            </Button>
          </div>
        </div>
      )}

      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1 pb-1">
        {loading && roles === null ? (
          <div className="flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary">
            <Spinner /> 加载角色…
          </div>
        ) : error ? (
          <div className="flex flex-col items-start gap-2 px-2 py-4 text-xs">
            <span className="text-destructive wrap-break-word">{error}</span>
            <Button size="sm" outlined onClick={onReload} prefix={<RefreshCw />}>
              重试
            </Button>
          </div>
        ) : !roles || roles.length === 0 ? (
          <div className="px-2 py-6 text-center text-xs text-text-secondary">
            还没有角色
          </div>
        ) : (
          <div className="flex flex-col gap-0.5">
            {roles.map((r) => (
              <button
                key={r.name}
                type="button"
                onClick={() => onOpen(r.name)}
                className={cn(
                  "group flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left",
                  "text-text-secondary hover:bg-midground/5 hover:text-foreground",
                )}
              >
                <Bot className="h-4 w-4 shrink-0 text-text-tertiary group-hover:text-foreground" />
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-1.5 text-sm font-medium">
                    <span className="truncate">{r.display_name}</span>
                    {r.is_default && (
                      <span className="shrink-0 rounded bg-primary/10 px-1 py-px text-[0.625rem] text-primary">
                        {r.is_base ? "底座" : "默认"}
                      </span>
                    )}
                  </span>
                  {r.description && (
                    <span className="block truncate text-[0.6875rem] text-text-tertiary">
                      {r.description}
                    </span>
                  )}
                </span>
                {r.skill_count > 0 && (
                  <span className="shrink-0 rounded bg-midground/10 px-1.5 py-0.5 text-[0.625rem] text-text-tertiary">
                    {r.skill_count} 技能
                  </span>
                )}
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-text-tertiary" />
              </button>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ------------------------------------------------------------------------ */
/*  Level 2: role view (header + 文件区 + 小对话列表)                          */
/* ------------------------------------------------------------------------ */

/** Resolve a model id to its provider slug via the model.options payload —
 *  session.create needs both, else the gateway resolves the model against
 *  the profile's DEFAULT provider (the "智谱 API 没有找到" bug). */
function providerForModel(
  payload: ModelOptionsPayload | null,
  model: string,
): string {
  for (const p of payload?.providers ?? []) {
    if ((p.models ?? []).includes(model)) return p.slug;
  }
  return "";
}

/**
 * 底座文件区（仅 default = 全局底座角色）：SOUL.md / AGENTS.md / USER.md
 * 三个可展开编辑器行，交互与提示词块一致（textarea、dirty 才可保存）。
 */
function BaseFilesSection() {
  const [files, setFiles] = useState<RoleBaseFile[] | null>(null);
  const [listError, setListError] = useState<string | null>(null);
  const [openName, setOpenName] = useState<string | null>(null);
  const [editor, setEditor] = useState<{
    name: string;
    text: string;
    dirty: boolean;
    busy: boolean;
    error: string | null;
  } | null>(null);

  const loadList = useCallback(() => {
    setListError(null);
    fetchBaseFiles()
      .then(setFiles)
      .catch((e: Error) => setListError(e.message || "读取失败"));
  }, []);

  useEffect(() => {
    loadList();
  }, [loadList]);

  const toggle = useCallback(
    (name: string) => {
      if (openName === name) {
        setOpenName(null);
        setEditor(null);
        return;
      }
      setOpenName(name);
      setEditor({ name, text: "", dirty: false, busy: true, error: null });
      readBaseFile(name)
        .then((res) =>
          setEditor({ name, text: res.content, dirty: false, busy: false, error: null }),
        )
        .catch((e: Error) =>
          setEditor({
            name,
            text: "",
            dirty: false,
            busy: false,
            error: e.message || "读取失败",
          }),
        );
    },
    [openName],
  );

  const save = useCallback(async () => {
    if (!editor) return;
    setEditor({ ...editor, busy: true, error: null });
    try {
      await writeBaseFile(editor.name, editor.text);
      setEditor({ ...editor, dirty: false, busy: false, error: null });
      loadList(); // refresh exists/size
    } catch (e) {
      setEditor({
        ...editor,
        busy: false,
        error: e instanceof Error ? e.message : "保存失败",
      });
    }
  }, [editor, loadList]);

  return (
    <div className="mx-2 mb-2 rounded-lg border border-current/10 p-2">
      <div className="pb-1.5">
        <div className="text-xs font-medium">底座文件</div>
        <div className="text-[0.625rem] text-text-tertiary">
          这些文件对所有角色生效
        </div>
      </div>
      {listError ? (
        <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
          {listError}
        </div>
      ) : !files ? (
        <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
          <Spinner /> 加载底座文件…
        </div>
      ) : (
        <div className="flex flex-col">
          {files.map((f) => {
            const open = openName === f.name;
            return (
              <div key={f.name}>
                <button
                  type="button"
                  onClick={() => toggle(f.name)}
                  aria-expanded={open}
                  className="flex w-full cursor-pointer items-center gap-1.5 rounded px-1 py-1 text-xs text-text-secondary hover:text-foreground"
                >
                  <ChevronDown
                    className={cn(
                      "h-3 w-3 shrink-0 transition-transform",
                      !open && "-rotate-90",
                    )}
                  />
                  <span className="font-mono">{f.name}</span>
                  {!f.exists && (
                    <span className="rounded bg-midground/10 px-1 py-px text-[0.625rem] text-text-tertiary">
                      未创建
                    </span>
                  )}
                </button>
                {open && editor && editor.name === f.name && (
                  <div className="flex flex-col gap-1.5 px-1 pb-1.5">
                    {editor.busy && !editor.text ? (
                      <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
                        <Spinner /> 读取中…
                      </div>
                    ) : (
                      <textarea
                        value={editor.text}
                        onChange={(e) =>
                          setEditor({ ...editor, text: e.target.value, dirty: true })
                        }
                        aria-label={`编辑 ${f.name}`}
                        rows={8}
                        className={cn(
                          "w-full resize-y rounded-lg border border-current/15 bg-background-base",
                          "px-2 py-1.5 font-mono text-xs focus:border-current/30 focus:outline-none",
                        )}
                      />
                    )}
                    {editor.error && (
                      <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
                        {editor.error}
                      </div>
                    )}
                    <div className="flex justify-end">
                      <Button
                        size="sm"
                        disabled={editor.busy || !editor.dirty}
                        onClick={() => void save()}
                      >
                        {editor.busy ? "保存中…" : "保存"}
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

/**
 * 可折叠区块壳：头部常驻（chevron + 标题 + 右侧操作），内容仅在展开时渲染。
 * 角色视图的提示词/记忆/技能列表量大，默认折叠省位置；头部保留保存按钮，
 * 折叠时通过小圆点提示有未保存修改。
 */
function CollapsibleSection({
  title,
  badge,
  open,
  onToggle,
  dirty,
  actions,
  children,
}: {
  title: string;
  badge?: string;
  open: boolean;
  onToggle: () => void;
  dirty?: boolean;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-2 mb-2 rounded-lg border border-current/10 p-2">
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-xs font-medium text-text-secondary hover:text-foreground"
        >
          <ChevronDown
            className={cn(
              "h-3 w-3 shrink-0 transition-transform",
              !open && "-rotate-90",
            )}
          />
          <span className="shrink-0">{title}</span>
          {badge && (
            <span className="truncate text-[0.625rem] font-normal text-text-tertiary">
              {badge}
            </span>
          )}
          {dirty && (
            <span
              className="h-1.5 w-1.5 shrink-0 rounded-full bg-warning"
              title="有未保存的修改"
            />
          )}
        </button>
        {actions && (
          <span className="flex shrink-0 items-center gap-1.5">{actions}</span>
        )}
      </div>
      {open && <div className="pt-1.5">{children}</div>}
    </div>
  );
}

function RoleView({
  role,
  roles,
  onBack,
  onRolesChanged,
  activeSessionId,
  onPicked,
  onSessionDeleted,
}: {
  role: string;
  roles: RoleInfo[] | null;
  onBack: () => void;
  /** ROLE.md was edited / role metadata may have changed → refetch list. */
  onRolesChanged: () => void;
  activeSessionId: string | null;
  onPicked?: () => void;
  onSessionDeleted?: (id: string) => void;
}) {
  const info = roles?.find((r) => r.name === role);
  const displayName = info?.display_name ?? role;
  const isDefault = role === "default";
  /** Profile id passed to session.create / session lists ("" = default). */
  const profileId = isDefault ? "" : role;

  /* ---------------- 提示词（ROLE.md，折叠 + 首次展开才加载） ---------------- */
  const [prompt, setPrompt] = useState<{ text: string; dirty: boolean } | null>(null);
  const [promptBusy, setPromptBusy] = useState(false);
  const [promptError, setPromptError] = useState<string | null>(null);
  const [promptOpen, setPromptOpen] = useState(false);
  const promptLoadedRef = useRef(false);

  /* ---------------- 技能列表（启用技能，纯文本） ---------------- */
  const [skills, setSkills] = useState<RoleSkillsPayload | null>(null);
  const [skillsText, setSkillsText] = useState<string | null>(null);
  const [skillsDirty, setSkillsDirty] = useState(false);
  const [skillsBusy, setSkillsBusy] = useState(false);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [skillsUnmatched, setSkillsUnmatched] = useState<string[]>([]);
  const [refOpen, setRefOpen] = useState(false);
  const [skillsOpen, setSkillsOpen] = useState(false);
  const skillsLoadedRef = useRef(false);

  /* ---------------- 记忆（memories/MEMORY.md，volatile 层） ---------------- */
  const [memory, setMemory] = useState<{ text: string; dirty: boolean } | null>(null);
  const [memoryBusy, setMemoryBusy] = useState(false);
  const [memoryError, setMemoryError] = useState<string | null>(null);
  const [memoryOpen, setMemoryOpen] = useState(false);
  const memoryLoadedRef = useRef(false);

  // 切换角色：三个折叠区全部收起并清空，下次展开时重新拉取。
  useEffect(() => {
    setPrompt(null);
    setPromptError(null);
    setPromptOpen(false);
    promptLoadedRef.current = false;
    setSkills(null);
    setSkillsText(null);
    setSkillsDirty(false);
    setSkillsError(null);
    setSkillsUnmatched([]);
    setRefOpen(false);
    setSkillsOpen(false);
    skillsLoadedRef.current = false;
    setMemory(null);
    setMemoryError(null);
    setMemoryOpen(false);
    memoryLoadedRef.current = false;
  }, [role]);

  const togglePrompt = useCallback(() => {
    const open = !promptOpen;
    setPromptOpen(open);
    if (open && !promptLoadedRef.current) {
      promptLoadedRef.current = true;
      fetchRolePrompt(role)
        .then((res) => setPrompt({ text: res.content, dirty: false }))
        .catch((e: Error) => setPromptError(e.message || "读取失败"));
    }
  }, [promptOpen, role]);

  const toggleSkills = useCallback(() => {
    const open = !skillsOpen;
    setSkillsOpen(open);
    if (open && !skillsLoadedRef.current) {
      skillsLoadedRef.current = true;
      fetchRoleSkills(role)
        .then((payload) => {
          setSkills(payload);
          // Whitelist mode: show the raw file (comments preserved). Legacy
          // disabled mode: one enabled name per line.
          setSkillsText(payload.content ?? payload.enabled.join("\n"));
          setSkillsUnmatched(payload.unmatched ?? []);
        })
        .catch((e: Error) => setSkillsError(e.message || "读取失败"));
    }
  }, [skillsOpen, role]);

  const toggleMemory = useCallback(() => {
    const open = !memoryOpen;
    setMemoryOpen(open);
    if (open && !memoryLoadedRef.current) {
      memoryLoadedRef.current = true;
      fetchRoleMemory(role)
        .then((res) => setMemory({ text: res.content, dirty: false }))
        .catch((e: Error) => setMemoryError(e.message || "读取失败"));
    }
  }, [memoryOpen, role]);

  const savePrompt = useCallback(async () => {
    if (!prompt) return;
    setPromptBusy(true);
    setPromptError(null);
    try {
      await writeRolePrompt(role, prompt.text);
      setPrompt({ text: prompt.text, dirty: false });
      onRolesChanged();
    } catch (e) {
      setPromptError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setPromptBusy(false);
    }
  }, [prompt, role, onRolesChanged]);

  /* ---------------- 记忆保存 ---------------- */
  const saveMemory = useCallback(async () => {
    if (!memory) return;
    setMemoryBusy(true);
    setMemoryError(null);
    try {
      await writeRoleMemory(role, memory.text);
      setMemory({ text: memory.text, dirty: false });
    } catch (e) {
      setMemoryError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setMemoryBusy(false);
    }
  }, [memory, role]);

  const saveSkills = useCallback(async () => {
    if (skillsText === null) return;
    setSkillsBusy(true);
    setSkillsError(null);
    setSkillsUnmatched([]);
    try {
      const res = await writeRoleSkills(role, skillsText);
      setSkills(res);
      // Reflect back what actually landed — the whitelist file verbatim
      // (comments preserved, trimming-only normalization), or the
      // canonical enabled list in legacy disabled mode.
      setSkillsText(res.content ?? res.enabled.join("\n"));
      setSkillsDirty(false);
      setSkillsUnmatched(res.unmatched ?? []);
    } catch (e) {
      setSkillsError(e instanceof Error ? e.message : "保存失败");
    } finally {
      setSkillsBusy(false);
    }
  }, [skillsText, role]);

  /* ---------------- 新建小对话（角色继承 + 模型下拉） ---------------- */
  const [modelOptions, setModelOptions] = useState<ModelOptionsPayload | null>(null);
  const [model, setModel] = useState("");

  useEffect(() => {
    let live = true;
    store.getModelOptions().then((payload) => {
      if (live && payload) setModelOptions(payload);
    });
    return () => {
      live = false;
    };
  }, []);

  const modelGroups = useMemo(() => {
    const groups: { label: string; models: string[] }[] = [];
    for (const p of modelOptions?.providers ?? []) {
      const models = (p.models ?? []).filter((m) => typeof m === "string" && !!m);
      if (models.length > 0) groups.push({ label: p.name || p.slug, models });
    }
    return groups;
  }, [modelOptions]);

  /** 新建小对话：直接以该角色创建，无任何选择器。 */
  const createInRole = useCallback(() => {
    onPicked?.();
    const provider = model ? providerForModel(modelOptions, model) : "";
    setResumeParam(null);
    store.startNewChatInRole(profileId, model, provider);
  }, [onPicked, model, modelOptions, profileId]);

  /* ---------------- 渲染 ---------------- */

  const textareaCls = cn(
    "w-full resize-y rounded-lg border border-current/15 bg-background-base",
    "px-2 py-1.5 font-mono text-xs focus:border-current/30 focus:outline-none",
  );

  return (
    <>
      {/* 角色头部：返回 + 名称/描述 */}
      <div className="flex items-start gap-1 px-2 pb-2">
        <Button
          ghost
          size="icon"
          onClick={onBack}
          aria-label="返回角色列表"
          title="返回角色列表"
          className="mt-0.5 shrink-0 text-text-secondary hover:text-foreground"
        >
          <ArrowLeft />
        </Button>
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-1.5 text-sm font-medium">
            <span className="truncate">{displayName}</span>
            {isDefault && (
              <span className="shrink-0 rounded bg-primary/10 px-1 py-px text-[0.625rem] text-primary">
                底座
              </span>
            )}
          </span>
          {info?.description && (
            <span className="mt-0.5 block text-[0.6875rem] text-text-tertiary wrap-break-word">
              {info.description}
            </span>
          )}
        </span>
      </div>

      {/* default = 全局底座：底座文件区替代提示词块（它没有自己的 ROLE.md） */}
      {isDefault ? (
        <BaseFilesSection />
      ) : (
      /* 提示词（ROLE.md） */
      <CollapsibleSection
        title="提示词"
        badge="ROLE.md"
        open={promptOpen}
        onToggle={togglePrompt}
        dirty={prompt?.dirty}
        actions={
          <Button
            size="sm"
            disabled={!prompt?.dirty || promptBusy}
            onClick={() => void savePrompt()}
          >
            {promptBusy ? "保存中…" : "保存"}
          </Button>
        }
      >
        {prompt === null ? (
          <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
            <Spinner /> 加载提示词…
          </div>
        ) : (
          <textarea
            value={prompt.text}
            onChange={(e) => setPrompt({ text: e.target.value, dirty: true })}
            aria-label="提示词（ROLE.md）"
            placeholder="# 角色名&#10;&#10;描述与提示词…"
            rows={6}
            className={textareaCls}
          />
        )}
        {promptError && (
          <div className="mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
            {promptError}
          </div>
        )}
      </CollapsibleSection>
      )}

      {/* 记忆（memories/MEMORY.md，volatile 层） */}
      <CollapsibleSection
        title="记忆"
        badge="MEMORY.md"
        open={memoryOpen}
        onToggle={toggleMemory}
        dirty={memory?.dirty}
        actions={
          <Button
            size="sm"
            disabled={!memory?.dirty || memoryBusy}
            onClick={() => void saveMemory()}
          >
            {memoryBusy ? "保存中…" : "保存"}
          </Button>
        }
      >
        {memory === null ? (
          <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
            <Spinner /> 加载记忆…
          </div>
        ) : (
          <textarea
            value={memory.text}
            onChange={(e) => setMemory({ text: e.target.value, dirty: true })}
            aria-label="记忆（MEMORY.md）"
            placeholder="该角色的长期记忆…"
            rows={5}
            className={textareaCls}
          />
        )}
        {memoryError && (
          <div className="mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
            {memoryError}
          </div>
        )}
      </CollapsibleSection>

      {/* 技能列表（启用技能，每行一个；# 为注释） */}
      <CollapsibleSection
        title="技能列表"
        badge={
          skills
            ? `启用 ${skills.enabled.length} 个技能${
                skills.mode === "whitelist" && skills.whitelist_file === false
                  ? "（名单文件未建，保存后创建）"
                  : ""
              }`
            : "启用技能名单"
        }
        open={skillsOpen}
        onToggle={toggleSkills}
        dirty={skillsDirty}
        actions={
          <Button
            size="sm"
            disabled={!skillsDirty || skillsBusy}
            onClick={() => void saveSkills()}
          >
            {skillsBusy ? "保存中…" : "保存"}
          </Button>
        }
      >
        {skillsText === null ? (
          <div className="flex items-center gap-2 px-1 py-2 text-xs text-text-secondary">
            <Spinner /> 加载技能…
          </div>
        ) : (
          <textarea
            value={skillsText}
            onChange={(e) => {
              setSkillsText(e.target.value);
              setSkillsDirty(true);
            }}
            aria-label="启用的技能列表"
            placeholder={"每行一个技能名\n# 井号开头为注释"}
            rows={5}
            className={textareaCls}
          />
        )}
        {skillsUnmatched.length > 0 && (
          <div className="mt-1.5 rounded-lg border border-warning/30 bg-warning/10 px-2 py-1 text-xs text-warning wrap-break-word">
            未匹配（已忽略）：{skillsUnmatched.join("、")}
          </div>
        )}
        {skillsError && (
          <div className="mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word">
            {skillsError}
          </div>
        )}

        {/* 可用技能参考（只读）：抄名字进上面的编辑框 */}
        {skills && skills.available.length > 0 && (
          <div className="mt-1.5">
            <button
              type="button"
              onClick={() => setRefOpen((v) => !v)}
              aria-expanded={refOpen}
              className="flex w-full cursor-pointer items-center gap-1 rounded px-1 py-1 text-[0.6875rem] text-text-tertiary hover:text-foreground"
            >
              <ChevronDown
                className={cn("h-3 w-3 shrink-0 transition-transform", !refOpen && "-rotate-90")}
              />
              可用技能参考（{skills.available.length}）
            </button>
            {refOpen && (
              <div className="max-h-40 overflow-y-auto rounded-lg border border-current/10 py-0.5">
                {skills.available.map((s) => (
                  <div
                    key={`${s.source}:${s.name}`}
                    className="truncate px-2 py-0.5 text-[0.6875rem] text-text-secondary"
                    title={s.description ? `${s.name} — ${s.description}` : s.name}
                  >
                    {s.name}
                    {s.source !== "role" && (
                      <span className="ml-1 rounded bg-midground/10 px-1 py-px text-[0.625rem] text-text-tertiary">
                        {s.source === "shared" ? "全局" : "大库"}
                      </span>
                    )}
                    {s.description && (
                      <span className="text-text-tertiary">
                        {" — "}
                        {s.description.length > 60
                          ? `${s.description.slice(0, 60)}…`
                          : s.description}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CollapsibleSection>

      {/* 模型下拉（可选，默认 = 当前配置；仅作用于下一次新建小对话） */}
      <div className="mx-2 mb-2">
        <select
          value={model}
          onChange={(e) => setModel(e.target.value)}
          onFocus={() => {
            if (!modelOptions) {
              store.getModelOptions().then((p) => p && setModelOptions(p));
            }
          }}
          aria-label="新对话模型"
          title="新对话使用的模型（默认 = 当前配置）"
          className={cn(
            "w-full rounded-lg border border-current/15 bg-background-base",
            "px-2.5 py-1.5 text-xs text-text-secondary focus:border-current/30 focus:outline-none",
          )}
        >
          <option value="">模型：默认（当前配置）</option>
          {modelGroups.map((g) => (
            <optgroup key={g.label} label={g.label}>
              {g.models.map((m) => (
                <option key={`${g.label}/${m}`} value={m}>
                  {m}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
      </div>

      {/* 该角色的小对话列表（新建小对话按钮在列表头部，走 createInRole） */}
      <ChatSessionList
        activeSessionId={activeSessionId}
        profile={profileId}
        onNewChat={createInRole}
        onPickSession={() => store.bindResumeRole(profileId)}
        onPicked={onPicked}
        manageable
        onSessionDeleted={onSessionDeleted}
        className="min-h-0 flex-1"
      />
    </>
  );
}

/* ------------------------------------------------------------------------ */
/*  Sidebar root: level switch                                               */
/* ------------------------------------------------------------------------ */

export function RoleSidebarImpl({
  activeSessionId,
  className,
  onPicked,
  onSessionDeleted,
  onCollapse,
}: RoleSidebarProps) {
  const [openRole, setOpenRoleState] = useState<string | null>(() => persistedOpenRole);
  const [roles, setRoles] = useState<RoleInfo[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [reloadNonce, setReloadNonce] = useState(0);

  const setOpenRole = useCallback((name: string | null) => {
    persistedOpenRole = name;
    setOpenRoleState(name);
  }, []);

  useEffect(() => {
    let live = true;
    setLoading(true);
    setError(null);
    fetchRoles()
      .then((list) => {
        if (live) setRoles(list);
      })
      .catch(() => {
        if (live) setError("角色列表加载失败");
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [reloadNonce]);

  const reload = useCallback(() => setReloadNonce((n) => n + 1), []);

  const onCreated = useCallback(
    (name: string) => {
      reload();
      setOpenRole(name);
    },
    [reload, setOpenRole],
  );

  const onBack = useCallback(() => setOpenRole(null), [setOpenRole]);

  return (
    <aside
      className={cn(
        "flex h-full w-full min-w-0 shrink-0 flex-col overflow-hidden",
        className,
      )}
    >
      {openRole === null ? (
        <RoleListView
          roles={roles}
          loading={loading}
          error={error}
          onReload={reload}
          onOpen={setOpenRole}
          onCreated={onCreated}
          onCollapse={onCollapse}
        />
      ) : (
        <RoleView
          role={openRole}
          roles={roles}
          onBack={onBack}
          onRolesChanged={reload}
          activeSessionId={activeSessionId}
          onPicked={onPicked}
          onSessionDeleted={onSessionDeleted}
        />
      )}
    </aside>
  );
}

// Memoized: the bubble-chat store emits per streaming delta (20-50/s),
// re-rendering the whole page each time; the sidebar's props are all
// stable references, so it can skip those renders entirely.
export const RoleSidebar = memo(RoleSidebarImpl);
