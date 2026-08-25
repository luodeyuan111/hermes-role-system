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
  var authedFetch = (url, init) => sdk().authedFetch(url, init);
  var api = new Proxy({}, {
    get: (_t, prop) => sdk().api[prop]
  });
  var Button = (window.__HERMES_PLUGIN_SDK__?.components ?? {}).Button;
  var HERMES_BASE_PATH = (() => {
    const raw = window.__HERMES_BASE_PATH__ ?? "";
    if (!raw) return "";
    const withLead = raw.startsWith("/") ? raw : `/${raw}`;
    return withLead.replace(/\/+$/, "");
  })();

  // src/shims/jsx-runtime.ts
  var React2 = window.__HERMES_PLUGIN_SDK__?.React;
  var Fragment2 = React2.Fragment;
  function jsx(type, props, key) {
    return key === void 0 || key === null ? React2.createElement(type, props) : React2.createElement(type, { ...props, key });
  }
  var jsxs = jsx;

  // src/index.tsx
  function sessionLabel(s) {
    const title = s.title?.trim();
    if (title && title !== "Untitled") return title;
    const preview = s.preview?.trim().replace(/\s+/g, " ");
    if (preview) return preview.length > 24 ? `${preview.slice(0, 24)}\u2026` : preview;
    return s.id;
  }
  function PetSettingsPage() {
    const [cfg, setCfg] = useState(null);
    const [sessions, setSessions] = useState([]);
    const [savedFlash, setSavedFlash] = useState(false);
    const [error, setError] = useState(null);
    const saveTimer = useRef(0);
    useEffect(() => {
      fetchJSON("/api/plugins/pet/config").then(setCfg).catch((e) => setError(e.message));
      fetchJSON("/api/sessions").then(
        (r) => setSessions(
          r.sessions.filter((s) => s.source !== "cron").sort((a, b) => (b.last_active ?? b.started_at ?? 0) - (a.last_active ?? a.started_at ?? 0)).slice(0, 30)
        )
      ).catch(() => {
      });
    }, []);
    const save = useCallback((patch) => {
      setCfg((prev) => {
        if (!prev) return prev;
        const next = {
          ...prev,
          ...patch,
          minimax: { ...prev.minimax, ...patch.minimax ?? {} }
        };
        window.clearTimeout(saveTimer.current);
        saveTimer.current = window.setTimeout(() => {
          fetchJSON("/api/plugins/pet/config", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(patch)
          }).then(() => {
            setSavedFlash(true);
            setTimeout(() => setSavedFlash(false), 1200);
          }).catch((e) => setError(e.message));
        }, 400);
        return next;
      });
    }, []);
    const uploadAvatar = useCallback(
      (file) => {
        const reader = new FileReader();
        reader.onload = () => {
          void authedFetch("/api/chat/image-upload", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data_url: reader.result, filename: file.name })
          }).then((r) => r.json()).then((res) => {
            if (res.path) save({ avatarPath: res.path });
          }).catch((e) => setError(e.message));
        };
        reader.readAsDataURL(file);
      },
      [save]
    );
    if (!cfg) {
      return /* @__PURE__ */ jsx("div", { className: "hermes-pet flex h-full items-center justify-center text-sm text-text-tertiary", children: error ? `\u52A0\u8F7D\u5931\u8D25\uFF1A${error}` : "\u52A0\u8F7D\u4E2D\u2026" });
    }
    const mm = cfg.minimax ?? {};
    return /* @__PURE__ */ jsxs("div", { className: "hermes-pet mx-auto flex h-full w-full max-w-lg flex-col gap-5 overflow-y-auto p-6 text-sm", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsx("h1", { className: "text-lg font-semibold", children: "\u684C\u5BA0\u8BBE\u7F6E" }),
        savedFlash && /* @__PURE__ */ jsx("span", { className: "text-xs text-emerald-400", children: "\u5DF2\u4FDD\u5B58\uFF0C\u684C\u5BA0\u5373\u65F6\u751F\u6548" })
      ] }),
      error && /* @__PURE__ */ jsx("div", { className: "rounded border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: error }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium text-text-tertiary", children: "\u7ED1\u5B9A\u5BF9\u8BDD" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            className: "rounded-md border border-current/15 bg-transparent px-2 py-1.5",
            value: cfg.sessionId ?? "",
            onChange: (e) => save({ sessionId: e.target.value || null }),
            children: [
              /* @__PURE__ */ jsx("option", { value: "", children: "\uFF08\u6BCF\u6B21\u542F\u52A8\u65B0\u5EFA\u5BF9\u8BDD\uFF09" }),
              sessions.map((s) => /* @__PURE__ */ jsxs("option", { value: s.id, children: [
                sessionLabel(s),
                "\uFF08",
                s.message_count ?? 0,
                " \u6761\uFF09"
              ] }, s.id))
            ]
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium text-text-tertiary", children: "\u5934\u50CF" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxs("label", { className: "cursor-pointer rounded-md border border-current/15 px-3 py-1.5 hover:border-current/30", children: [
            "\u4E0A\u4F20\u56FE\u7247\u2026",
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) uploadAvatar(f);
                  e.target.value = "";
                }
              }
            )
          ] }),
          cfg.avatarPath && /* @__PURE__ */ jsxs(Fragment2, { children: [
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-xs text-text-tertiary", children: cfg.avatarPath }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "text-xs text-text-tertiary hover:text-foreground",
                onClick: () => save({ avatarPath: null }),
                children: "\u6062\u590D\u9ED8\u8BA4"
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium text-text-tertiary", children: "\u8BED\u97F3\u5408\u6210\uFF08MiniMax\uFF09" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: cfg.ttsEnabled ?? false,
              onChange: (e) => save({ ttsEnabled: e.target.checked })
            }
          ),
          "\u5F00\u542F\u56DE\u590D\u8BED\u97F3\uFF08\u6309\u53E5\u4F2A\u6D41\u5F0F\u5408\u6210\u5E76\u81EA\u52A8\u64AD\u653E\uFF09"
        ] }),
        [
          ["apiKey", "API Key", "password", ""],
          ["groupId", "GroupId\uFF08\u53EF\u9009\uFF09", "text", ""],
          ["voiceId", "Voice ID", "text", "English_expressive_narrator"],
          ["model", "\u6A21\u578B", "text", "speech-02-hd"],
          ["baseUrl", "\u63A5\u53E3\u5730\u5740", "text", "https://api.minimaxi.com/v1/t2a_v2"]
        ].map(([key, label, type, ph]) => /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 text-xs text-text-secondary", children: [
          label,
          /* @__PURE__ */ jsx(
            "input",
            {
              type,
              defaultValue: mm[key] ?? "",
              placeholder: ph,
              onBlur: (e) => save({ minimax: { [key]: e.target.value } }),
              className: "rounded-md border border-current/15 bg-transparent px-2 py-1.5"
            }
          )
        ] }, key))
      ] }),
      /* @__PURE__ */ jsxs("section", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-xs font-medium text-text-tertiary", children: "\u6C14\u6CE1" }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs text-text-secondary", children: [
          "\u505C\u7559\u79D2\u6570",
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "number",
              min: 3,
              max: 120,
              defaultValue: cfg.bubbleTtlSec ?? 10,
              onBlur: (e) => save({ bubbleTtlSec: Number(e.target.value) || 10 }),
              className: "w-20 rounded-md border border-current/15 bg-transparent px-2 py-1.5"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs text-text-secondary", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "checkbox",
              checked: cfg.autoCollapse !== false,
              onChange: (e) => save({ autoCollapse: e.target.checked })
            }
          ),
          "\u53D1\u9001\u540E\u81EA\u52A8\u6536\u8D77\u8F93\u5165\u9762\u677F"
        ] })
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs leading-relaxed text-text-tertiary", children: [
        "\u914D\u7F6E\u5199\u5165 ",
        /* @__PURE__ */ jsx("code", { children: "~/.config/hermes-desktop-pet/config.json" }),
        "\uFF0C\u684C\u5BA0\u76D1\u542C\u8BE5\u6587\u4EF6\uFF0C \u4FDD\u5B58\u540E\u65E0\u9700\u91CD\u542F\u5373\u65F6\u751F\u6548\u3002"
      ] })
    ] });
  }
  var registry = window.__HERMES_PLUGINS__;
  if (!registry) {
    console.warn("[pet] plugin registry is not available \u2014 not registering");
  } else {
    registry.register("pet", PetSettingsPage);
  }
})();
