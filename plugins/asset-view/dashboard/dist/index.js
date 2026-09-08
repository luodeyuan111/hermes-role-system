(() => {
  // src/shims/react.ts
  var React = window.__HERMES_PLUGIN_SDK__?.React;
  var Children = React.Children;
  var Fragment = React.Fragment;
  var StrictMode = React.StrictMode;
  var cloneElement = React.cloneElement;
  var createContext = React.createContext;
  var createElement = React.createElement;
  var createRef = React.createRef;
  var forwardRef = React.forwardRef;
  var isValidElement = React.isValidElement;
  var memo = React.memo;
  var startTransition = React.startTransition;
  var use = React.use;
  var useCallback = React.useCallback;
  var useContext = React.useContext;
  var useDebugValue = React.useDebugValue;
  var useDeferredValue = React.useDeferredValue;
  var useEffect = React.useEffect;
  var useId = React.useId;
  var useImperativeHandle = React.useImperativeHandle;
  var useInsertionEffect = React.useInsertionEffect;
  var useLayoutEffect = React.useLayoutEffect;
  var useMemo = React.useMemo;
  var useOptimistic = React.useOptimistic;
  var useReducer = React.useReducer;
  var useRef = React.useRef;
  var useState = React.useState;
  var useSyncExternalStore = React.useSyncExternalStore;
  var useTransition = React.useTransition;

  // src/sdk.ts
  function sdk() {
    const s = window.__HERMES_PLUGIN_SDK__;
    if (!s) throw new Error("hermes plugin SDK is not available");
    return s;
  }
  var fetchJSON = (url, init, options) => sdk().fetchJSON(url, init, options);
  var api = new Proxy({}, {
    get: (_t, prop) => sdk().api[prop]
  });
  var cn = (...classes) => sdk().utils.cn(...classes);
  var HERMES_BASE_PATH = (() => {
    const raw = window.__HERMES_BASE_PATH__ ?? "";
    if (!raw) return "";
    const withLead = raw.startsWith("/") ? raw : `/${raw}`;
    return withLead.replace(/\/+$/, "");
  })();

  // src/api.ts
  function fetchToolsets(profile) {
    return fetchJSON(
      `${HERMES_BASE_PATH}/api/tools/toolsets?profile=${encodeURIComponent(profile)}`
    );
  }
  function fetchMcpServers(profile) {
    return fetchJSON(
      `${HERMES_BASE_PATH}/api/mcp/servers?profile=${encodeURIComponent(profile)}`
    );
  }
  function fetchCronJobs(profile) {
    return fetchJSON(
      `${HERMES_BASE_PATH}/api/cron/jobs?profile=${encodeURIComponent(profile)}`
    );
  }
  function fetchScripts(profile) {
    return fetchJSON(
      `${HERMES_BASE_PATH}/api/plugins/asset-view/scripts?profile=${encodeURIComponent(profile)}`
    );
  }
  function fetchProfiles() {
    return fetchJSON(`${HERMES_BASE_PATH}/api/profiles`);
  }
  function fetchActiveProfile() {
    return fetchJSON(`${HERMES_BASE_PATH}/api/profiles/active`);
  }

  // src/shims/jsx-runtime.ts
  var React2 = window.__HERMES_PLUGIN_SDK__?.React;
  var Fragment2 = React2.Fragment;
  function jsx(type, props, key) {
    return key === void 0 || key === null ? React2.createElement(type, props) : React2.createElement(type, { ...props, key });
  }
  var jsxs = jsx;

  // src/AssetViewPage.tsx
  function Section(props) {
    return /* @__PURE__ */ jsxs("section", { className: "rounded-lg border border-midground/20 bg-background-base/40 p-4", children: [
      /* @__PURE__ */ jsxs("h2", { className: "mb-3 text-sm font-semibold text-text-primary", children: [
        props.title,
        props.count !== void 0 && /* @__PURE__ */ jsxs("span", { className: "ml-2 text-xs font-normal text-text-secondary", children: [
          "(",
          props.count,
          ")"
        ] })
      ] }),
      props.children
    ] });
  }
  function Badge(props) {
    return /* @__PURE__ */ jsx(
      "span",
      {
        className: cn(
          "inline-block rounded px-1.5 py-0.5 text-[11px] leading-none",
          props.on ? "bg-success/15 text-success" : "bg-midground/15 text-text-tertiary"
        ),
        children: props.on ? props.onText : props.offText
      }
    );
  }
  function EmptyHint(props) {
    return /* @__PURE__ */ jsx("p", { className: "text-xs text-text-tertiary", children: props.text });
  }
  function jobUsesScript(job, script) {
    const ref = `${job.script ?? ""} ${job.prompt ?? ""}`;
    return ref.includes(script.filename) || ref.includes(script.path);
  }
  function AssetViewPage() {
    const [profiles, setProfiles] = useState([]);
    const [selectedProfile, setSelectedProfile] = useState("");
    const [data, setData] = useState(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      Promise.all([fetchProfiles(), fetchActiveProfile()]).then(([plist, active]) => {
        setProfiles(plist.profiles || []);
        setSelectedProfile(active.current || active.active || "default");
      }).catch((e) => setError(`\u52A0\u8F7D profile \u5217\u8868\u5931\u8D25\uFF1A${e}`));
    }, []);
    const load = useCallback((profile) => {
      if (!profile) return;
      setLoading(true);
      setError("");
      Promise.all([
        fetchToolsets(profile),
        fetchMcpServers(profile),
        fetchCronJobs("all"),
        fetchScripts(profile)
      ]).then(([toolsets, mcp, jobs, scripts]) => {
        setData({
          toolsets: Array.isArray(toolsets) ? toolsets : [],
          mcpServers: mcp.servers || [],
          cronJobs: Array.isArray(jobs) ? jobs : [],
          scripts: scripts.scripts || [],
          cronOutputRoot: scripts.cron_output_root || ""
        });
      }).catch((e) => setError(`\u52A0\u8F7D\u8D44\u4EA7\u6570\u636E\u5931\u8D25\uFF1A${e}`)).finally(() => setLoading(false));
    }, []);
    useEffect(() => load(selectedProfile), [selectedProfile, load]);
    const workflows = useMemo(() => {
      if (!data) return [];
      return data.scripts.map((script) => ({
        script,
        jobs: data.cronJobs.filter((j) => jobUsesScript(j, script))
      }));
    }, [data]);
    const enabledToolsets = useMemo(
      () => data ? data.toolsets.filter((t) => t.enabled) : [],
      [data]
    );
    const disabledToolsets = useMemo(
      () => data ? data.toolsets.filter((t) => !t.enabled) : [],
      [data]
    );
    return /* @__PURE__ */ jsxs("div", { className: "hermes-asset-view mx-auto w-full max-w-5xl space-y-4 p-6", children: [
      /* @__PURE__ */ jsxs("header", { className: "flex flex-wrap items-center gap-3", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold text-text-primary", children: "\u8D44\u4EA7\u603B\u89C8" }),
          /* @__PURE__ */ jsx("p", { className: "text-xs text-text-secondary", children: "\u5F53\u524D profile \u7684 tools / MCP / workflow \u53EA\u8BFB\u6E05\u5355\uFF1B\u7BA1\u7406\u8BF7\u7528 CLI `hermes tools` \u6216\u8BBE\u7F6E\u9875" })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "ml-auto flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx("label", { className: "text-text-secondary", htmlFor: "asset-view-profile", children: "Profile" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "asset-view-profile",
              className: "rounded border border-midground/30 bg-background px-2 py-1 text-sm text-text-primary",
              value: selectedProfile,
              onChange: (e) => setSelectedProfile(e.target.value),
              children: [
                profiles.length === 0 && /* @__PURE__ */ jsx("option", { value: selectedProfile, children: selectedProfile }),
                profiles.map((p) => /* @__PURE__ */ jsxs("option", { value: p.name, children: [
                  p.name,
                  p.is_default ? "\uFF08\u9ED8\u8BA4\uFF09" : ""
                ] }, p.name))
              ]
            }
          )
        ] })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive", children: error }),
      loading && /* @__PURE__ */ jsx("p", { className: "text-sm text-text-secondary", children: "\u52A0\u8F7D\u4E2D\u2026" }),
      data && !loading && /* @__PURE__ */ jsxs(Fragment2, { children: [
        /* @__PURE__ */ jsx(Section, { title: "Toolsets", count: data.toolsets.length, children: /* @__PURE__ */ jsxs("div", { className: "space-y-1", children: [
          enabledToolsets.map((ts) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
            /* @__PURE__ */ jsx(Badge, { on: true, onText: "\u542F\u7528", offText: "\u505C\u7528" }),
            /* @__PURE__ */ jsx("span", { className: "font-medium text-text-primary", children: ts.label || ts.name }),
            /* @__PURE__ */ jsx("span", { className: "text-xs text-text-tertiary", children: ts.name }),
            /* @__PURE__ */ jsx("span", { className: "truncate text-xs text-text-secondary", children: ts.description })
          ] }, ts.name)),
          disabledToolsets.length > 0 && /* @__PURE__ */ jsxs("details", { className: "pt-1 text-sm", children: [
            /* @__PURE__ */ jsxs("summary", { className: "cursor-pointer text-xs text-text-tertiary", children: [
              "\u5DF2\u505C\u7528\uFF08",
              disabledToolsets.length,
              "\uFF09"
            ] }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 space-y-1", children: disabledToolsets.map((ts) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
              /* @__PURE__ */ jsx(Badge, { on: false, onText: "\u542F\u7528", offText: "\u505C\u7528" }),
              /* @__PURE__ */ jsx("span", { className: "text-text-secondary", children: ts.label || ts.name }),
              /* @__PURE__ */ jsx("span", { className: "text-xs text-text-tertiary", children: ts.name })
            ] }, ts.name)) })
          ] }),
          data.toolsets.length === 0 && /* @__PURE__ */ jsx(EmptyHint, { text: "\u8BE5 profile \u4E0B\u6CA1\u6709\u53EF\u89C1\u7684 toolset" })
        ] }) }),
        /* @__PURE__ */ jsx(Section, { title: "MCP Servers", count: data.mcpServers.length, children: data.mcpServers.length === 0 ? /* @__PURE__ */ jsx(EmptyHint, { text: "\u8BE5 profile \u672A\u914D\u7F6E MCP server" }) : /* @__PURE__ */ jsx("div", { className: "space-y-1", children: data.mcpServers.map((s) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(Badge, { on: s.enabled, onText: "\u542F\u7528", offText: "\u505C\u7528" }),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-text-primary", children: s.name }),
          /* @__PURE__ */ jsx("span", { className: "rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary", children: s.transport }),
          /* @__PURE__ */ jsx("span", { className: "truncate text-xs text-text-tertiary", children: s.url || s.command || "" })
        ] }, s.name)) }) }),
        /* @__PURE__ */ jsx(Section, { title: "Cron \u4EFB\u52A1", count: data.cronJobs.length, children: data.cronJobs.length === 0 ? /* @__PURE__ */ jsx(EmptyHint, { text: "\u6CA1\u6709\u4EFB\u4F55 profile \u7684 cron \u4EFB\u52A1" }) : /* @__PURE__ */ jsx("div", { className: "space-y-1", children: data.cronJobs.map((job) => /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsx(
            Badge,
            {
              on: job.enabled !== false && job.state !== "paused",
              onText: job.state || "\u542F\u7528",
              offText: "\u6682\u505C"
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "font-medium text-text-primary", children: job.name }),
          /* @__PURE__ */ jsx("span", { className: "rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary", children: job.profile || "default" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-text-secondary", children: job.schedule_display || "" }),
          job.script && /* @__PURE__ */ jsx("span", { className: "truncate font-mono text-xs text-text-tertiary", children: job.script })
        ] }, `${job.profile}-${job.id}`)) }) }),
        /* @__PURE__ */ jsxs(Section, { title: "Workflows\uFF08script + cron + \u8F93\u51FA\u76EE\u5F55\uFF09", count: workflows.length, children: [
          data.cronOutputRoot && /* @__PURE__ */ jsxs("p", { className: "mb-2 text-xs text-text-tertiary", children: [
            "cron \u8F93\u51FA\u76EE\u5F55\uFF1A",
            /* @__PURE__ */ jsx("span", { className: "font-mono", children: data.cronOutputRoot })
          ] }),
          workflows.length === 0 ? /* @__PURE__ */ jsx(EmptyHint, { text: "scripts/tools/ \u4E0B\u6CA1\u6709\u81EA\u5EFA\u811A\u672C" }) : /* @__PURE__ */ jsx("div", { className: "space-y-2", children: workflows.map(({ script, jobs }) => /* @__PURE__ */ jsxs(
            "div",
            {
              className: "rounded border border-midground/15 px-3 py-2",
              children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 text-sm", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-mono font-medium text-text-primary", children: script.filename }),
                  /* @__PURE__ */ jsx("span", { className: "rounded bg-midground/15 px-1.5 py-0.5 text-[11px] text-text-secondary", children: script.scope === "shared" ? "\u5171\u4EAB" : script.profile }),
                  /* @__PURE__ */ jsx("span", { className: "truncate text-xs text-text-secondary", children: script.description })
                ] }),
                /* @__PURE__ */ jsx("div", { className: "mt-1 pl-2 text-xs text-text-tertiary", children: jobs.length === 0 ? /* @__PURE__ */ jsx("span", { children: "\u65E0\u5173\u8054 cron\uFF08\u672A\u7EB3\u5165\u8C03\u5EA6\uFF09" }) : jobs.map((j) => /* @__PURE__ */ jsxs("div", { children: [
                  "\u23F1 ",
                  j.name,
                  " \xB7 ",
                  j.schedule_display || "",
                  " \xB7 ",
                  j.profile || "default"
                ] }, `${j.profile}-${j.id}`)) })
              ]
            },
            `${script.scope}-${script.profile}-${script.filename}`
          )) })
        ] })
      ] })
    ] });
  }

  // src/index.tsx
  var registry = window.__HERMES_PLUGINS__;
  if (!registry) {
    console.warn("[asset-view] plugin registry is not available \u2014 not registering");
  } else {
    registry.register("asset-view", AssetViewPage);
  }
})();
