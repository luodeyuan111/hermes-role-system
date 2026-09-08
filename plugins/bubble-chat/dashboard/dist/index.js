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

  // ../../../node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // ../../../node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // ../../../node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  // ../../../node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // ../../../node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // ../../../node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // ../../../node_modules/lucide-react/dist/esm/Icon.js
  var Icon = forwardRef(
    ({
      color = "currentColor",
      size = 24,
      strokeWidth = 2,
      absoluteStrokeWidth,
      className = "",
      children,
      iconNode,
      ...rest
    }, ref) => createElement(
      "svg",
      {
        ref,
        ...defaultAttributes,
        width: size,
        height: size,
        stroke: color,
        strokeWidth: absoluteStrokeWidth ? Number(strokeWidth) * 24 / Number(size) : strokeWidth,
        className: mergeClasses("lucide", className),
        ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
        ...rest
      },
      [
        ...iconNode.map(([tag, attrs]) => createElement(tag, attrs)),
        ...Array.isArray(children) ? children : [children]
      ]
    )
  );

  // ../../../node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = forwardRef(
      ({ className, ...props }, ref) => createElement(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // ../../../node_modules/lucide-react/dist/esm/icons/arrow-down.js
  var __iconNode = [
    ["path", { d: "M12 5v14", key: "s699le" }],
    ["path", { d: "m19 12-7 7-7-7", key: "1idqje" }]
  ];
  var ArrowDown = createLucideIcon("arrow-down", __iconNode);

  // ../../../node_modules/lucide-react/dist/esm/icons/arrow-left.js
  var __iconNode2 = [
    ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
    ["path", { d: "M19 12H5", key: "x3x0zl" }]
  ];
  var ArrowLeft = createLucideIcon("arrow-left", __iconNode2);

  // ../../../node_modules/lucide-react/dist/esm/icons/bot.js
  var __iconNode3 = [
    ["path", { d: "M12 8V4H8", key: "hb8ula" }],
    ["rect", { width: "16", height: "12", x: "4", y: "8", rx: "2", key: "enze0r" }],
    ["path", { d: "M2 14h2", key: "vft8re" }],
    ["path", { d: "M20 14h2", key: "4cs60a" }],
    ["path", { d: "M15 13v2", key: "1xurst" }],
    ["path", { d: "M9 13v2", key: "rq6x2g" }]
  ];
  var Bot = createLucideIcon("bot", __iconNode3);

  // ../../../node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode4 = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode4);

  // ../../../node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode5 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode5);

  // ../../../node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode6 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode6);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-alert.js
  var __iconNode7 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
    ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
  ];
  var CircleAlert = createLucideIcon("circle-alert", __iconNode7);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-check.js
  var __iconNode8 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "m9 12 2 2 4-4", key: "dzmm74" }]
  ];
  var CircleCheck = createLucideIcon("circle-check", __iconNode8);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-question-mark.js
  var __iconNode9 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode9);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-slash.js
  var __iconNode10 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "9", x2: "15", y1: "15", y2: "9", key: "1dfufj" }]
  ];
  var CircleSlash = createLucideIcon("circle-slash", __iconNode10);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle.js
  var __iconNode11 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
  var Circle = createLucideIcon("circle", __iconNode11);

  // ../../../node_modules/lucide-react/dist/esm/icons/copy.js
  var __iconNode12 = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  var Copy = createLucideIcon("copy", __iconNode12);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-text.js
  var __iconNode13 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  var FileText = createLucideIcon("file-text", __iconNode13);

  // ../../../node_modules/lucide-react/dist/esm/icons/file.js
  var __iconNode14 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
  ];
  var File2 = createLucideIcon("file", __iconNode14);

  // ../../../node_modules/lucide-react/dist/esm/icons/folder.js
  var __iconNode15 = [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360"
      }
    ]
  ];
  var Folder = createLucideIcon("folder", __iconNode15);

  // ../../../node_modules/lucide-react/dist/esm/icons/image-off.js
  var __iconNode16 = [
    ["line", { x1: "2", x2: "22", y1: "2", y2: "22", key: "a6p6uj" }],
    ["path", { d: "M10.41 10.41a2 2 0 1 1-2.83-2.83", key: "1bzlo9" }],
    ["line", { x1: "13.5", x2: "6", y1: "13.5", y2: "21", key: "1q0aeu" }],
    ["line", { x1: "18", x2: "21", y1: "12", y2: "15", key: "5mozeu" }],
    [
      "path",
      {
        d: "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59",
        key: "mmje98"
      }
    ],
    ["path", { d: "M21 15V5a2 2 0 0 0-2-2H9", key: "43el77" }]
  ];
  var ImageOff = createLucideIcon("image-off", __iconNode16);

  // ../../../node_modules/lucide-react/dist/esm/icons/image-plus.js
  var __iconNode17 = [
    ["path", { d: "M16 5h6", key: "1vod17" }],
    ["path", { d: "M19 2v6", key: "4bpg5p" }],
    ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
  ];
  var ImagePlus = createLucideIcon("image-plus", __iconNode17);

  // ../../../node_modules/lucide-react/dist/esm/icons/image.js
  var __iconNode18 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  var Image = createLucideIcon("image", __iconNode18);

  // ../../../node_modules/lucide-react/dist/esm/icons/list-checks.js
  var __iconNode19 = [
    ["path", { d: "M13 5h8", key: "a7qcls" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }]
  ];
  var ListChecks = createLucideIcon("list-checks", __iconNode19);

  // ../../../node_modules/lucide-react/dist/esm/icons/list-todo.js
  var __iconNode20 = [
    ["path", { d: "M13 5h8", key: "a7qcls" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
  ];
  var ListTodo = createLucideIcon("list-todo", __iconNode20);

  // ../../../node_modules/lucide-react/dist/esm/icons/loader-circle.js
  var __iconNode21 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  var LoaderCircle = createLucideIcon("loader-circle", __iconNode21);

  // ../../../node_modules/lucide-react/dist/esm/icons/message-square-plus.js
  var __iconNode22 = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ],
    ["path", { d: "M12 8v6", key: "1ib9pf" }],
    ["path", { d: "M9 11h6", key: "1fldmi" }]
  ];
  var MessageSquarePlus = createLucideIcon("message-square-plus", __iconNode22);

  // ../../../node_modules/lucide-react/dist/esm/icons/message-square.js
  var __iconNode23 = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ];
  var MessageSquare = createLucideIcon("message-square", __iconNode23);

  // ../../../node_modules/lucide-react/dist/esm/icons/music.js
  var __iconNode24 = [
    ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
    ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
    ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
  ];
  var Music = createLucideIcon("music", __iconNode24);

  // ../../../node_modules/lucide-react/dist/esm/icons/palette.js
  var __iconNode25 = [
    [
      "path",
      {
        d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
        key: "e79jfc"
      }
    ],
    ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
    ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
    ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
    ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
  ];
  var Palette = createLucideIcon("palette", __iconNode25);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-close.js
  var __iconNode26 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
  ];
  var PanelLeftClose = createLucideIcon("panel-left-close", __iconNode26);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-open.js
  var __iconNode27 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
  ];
  var PanelLeftOpen = createLucideIcon("panel-left-open", __iconNode27);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left.js
  var __iconNode28 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }]
  ];
  var PanelLeft = createLucideIcon("panel-left", __iconNode28);

  // ../../../node_modules/lucide-react/dist/esm/icons/paperclip.js
  var __iconNode29 = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ];
  var Paperclip = createLucideIcon("paperclip", __iconNode29);

  // ../../../node_modules/lucide-react/dist/esm/icons/pencil.js
  var __iconNode30 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  var Pencil = createLucideIcon("pencil", __iconNode30);

  // ../../../node_modules/lucide-react/dist/esm/icons/plus.js
  var __iconNode31 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode31);

  // ../../../node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode32 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("refresh-cw", __iconNode32);

  // ../../../node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
  var __iconNode33 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ];
  var RotateCcw = createLucideIcon("rotate-ccw", __iconNode33);

  // ../../../node_modules/lucide-react/dist/esm/icons/send-horizontal.js
  var __iconNode34 = [
    [
      "path",
      {
        d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
        key: "117uat"
      }
    ],
    ["path", { d: "M6 12h16", key: "s4cdu5" }]
  ];
  var SendHorizontal = createLucideIcon("send-horizontal", __iconNode34);

  // ../../../node_modules/lucide-react/dist/esm/icons/shield-alert.js
  var __iconNode35 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ],
    ["path", { d: "M12 8v4", key: "1got3b" }],
    ["path", { d: "M12 16h.01", key: "1drbdi" }]
  ];
  var ShieldAlert = createLucideIcon("shield-alert", __iconNode35);

  // ../../../node_modules/lucide-react/dist/esm/icons/sparkles.js
  var __iconNode36 = [
    [
      "path",
      {
        d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
        key: "1s2grr"
      }
    ],
    ["path", { d: "M20 2v4", key: "1rf3ol" }],
    ["path", { d: "M22 4h-4", key: "gwowj6" }],
    ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
  ];
  var Sparkles = createLucideIcon("sparkles", __iconNode36);

  // ../../../node_modules/lucide-react/dist/esm/icons/square.js
  var __iconNode37 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
  ];
  var Square = createLucideIcon("square", __iconNode37);

  // ../../../node_modules/lucide-react/dist/esm/icons/star.js
  var __iconNode38 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  var Star = createLucideIcon("star", __iconNode38);

  // ../../../node_modules/lucide-react/dist/esm/icons/terminal.js
  var __iconNode39 = [
    ["path", { d: "M12 19h8", key: "baeox8" }],
    ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
  ];
  var Terminal = createLucideIcon("terminal", __iconNode39);

  // ../../../node_modules/lucide-react/dist/esm/icons/timer.js
  var __iconNode40 = [
    ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
    ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
    ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
  ];
  var Timer = createLucideIcon("timer", __iconNode40);

  // ../../../node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode41 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode41);

  // ../../../node_modules/lucide-react/dist/esm/icons/wrench.js
  var __iconNode42 = [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
        key: "1ngwbx"
      }
    ]
  ];
  var Wrench = createLucideIcon("wrench", __iconNode42);

  // ../../../node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode43 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode43);

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
  var buildWsAuthParam = () => sdk().buildWsAuthParam();
  var cn = (...classes) => sdk().utils.cn(...classes);
  var timeAgo = (ts) => sdk().utils.timeAgo(ts);
  var useI18n = () => sdk().useI18n();
  var Button = (window.__HERMES_PLUGIN_SDK__?.components ?? {}).Button;
  var HERMES_BASE_PATH = (() => {
    const raw = window.__HERMES_BASE_PATH__ ?? "";
    if (!raw) return "";
    const withLead = raw.startsWith("/") ? raw : `/${raw}`;
    return withLead.replace(/\/+$/, "");
  })();

  // src/chat/fileAccess.ts
  function directFileUrl(path) {
    const token = window.__HERMES_SESSION_TOKEN__;
    if (!token) return null;
    return `${HERMES_BASE_PATH}/api/files/download?path=${encodeURIComponent(path)}&token=${encodeURIComponent(token)}`;
  }
  async function fetchFileBlobUrl(path) {
    const res = await authedFetch(
      `/api/files/download?path=${encodeURIComponent(path)}`
    );
    if (!res.ok) throw new Error(`\u4E0B\u8F7D\u5931\u8D25\uFF1AHTTP ${res.status}`);
    return URL.createObjectURL(await res.blob());
  }
  async function resolveFileUrl(path) {
    return directFileUrl(path) ?? fetchFileBlobUrl(path);
  }
  async function resolveImageUrl(path) {
    try {
      const res = await fetchJSON(
        `/api/media?path=${encodeURIComponent(path)}`
      );
      return res.data_url;
    } catch {
      return resolveFileUrl(path);
    }
  }
  async function openInSystemApp(path, reveal = false) {
    const res = await authedFetch("/api/files/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, reveal })
    });
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(text || `HTTP ${res.status}`);
    }
  }
  async function downloadFile(path, name) {
    const direct = directFileUrl(path);
    if (direct) {
      const a2 = document.createElement("a");
      a2.href = direct;
      a2.download = name;
      a2.rel = "noopener";
      document.body.appendChild(a2);
      a2.click();
      a2.remove();
      return;
    }
    const blobUrl = await fetchFileBlobUrl(path);
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = name;
    a.click();
    setTimeout(() => URL.revokeObjectURL(blobUrl), 1e4);
  }

  // src/chatImagePaste.ts
  var IMAGE_MIME_EXT = {
    "image/png": "png",
    "image/jpeg": "jpg",
    "image/gif": "gif",
    "image/webp": "webp",
    "image/bmp": "bmp"
  };
  var MAX_IMAGE_BYTES = 25 * 1024 * 1024;
  function imageFileKey(file) {
    return `${file.name}\0${file.type}\0${file.size}\0${file.lastModified}`;
  }
  function parsePathLines(raw) {
    const out = [];
    for (const line of raw.split(/\r?\n/)) {
      const s = line.trim();
      if (!s || s.startsWith("#")) continue;
      if (s === "copy" || s === "cut") continue;
      if (s.startsWith("file://")) {
        try {
          out.push(decodeURIComponent(new URL(s).pathname).replace(/\/+$/, ""));
        } catch {
        }
      } else if (s.startsWith("/")) {
        out.push(s.replace(/\/+$/, ""));
      }
    }
    return out;
  }
  function transferSourcePaths(data) {
    const chunks = [];
    for (const type of [
      "text/uri-list",
      "x-special/gnome-copied-files",
      "application/vnd.gnome.copied-files",
      "text/plain"
    ]) {
      try {
        const v = data.getData(type);
        if (v) chunks.push(v);
      } catch {
      }
    }
    return [...new Set(parsePathLines(chunks.join("\n")))];
  }
  function describeTransfer(data) {
    const out = {};
    if (!data) return out;
    for (const type of Array.from(data.types ?? [])) {
      try {
        const v = data.getData(type);
        out[type] = v.length > 300 ? `${v.slice(0, 300)}\u2026` : v;
      } catch {
        out[type] = "<unreadable>";
      }
    }
    return out;
  }
  async function clipboardSourcePaths() {
    if (!navigator.clipboard?.read) return [];
    try {
      const items = await navigator.clipboard.read();
      const chunks = [];
      for (const item of items) {
        for (const type of item.types) {
          if (!/text|uri|gnome|special/i.test(type)) continue;
          try {
            chunks.push(await (await item.getType(type)).text());
          } catch {
          }
        }
      }
      return [...new Set(parsePathLines(chunks.join("\n")))];
    } catch {
      return [];
    }
  }
  function itemIsDirectory(item, file) {
    if (item) {
      try {
        const entry = item.webkitGetAsEntry?.();
        if (entry) return entry.isDirectory;
      } catch {
      }
    }
    return file.type === "" && file.size === 0;
  }
  function splitTransfer(data) {
    const files = [];
    const dirs = [];
    if (!data) return { files, dirs };
    const seen = /* @__PURE__ */ new Set();
    const uriPaths = transferSourcePaths(data);
    const claimed = /* @__PURE__ */ new Set();
    const resolveDirPath = (file) => {
      const byName = uriPaths.find(
        (p) => !claimed.has(p) && p.split("/").pop() === file.name
      );
      const hit = byName ?? (dirs.length < uriPaths.length && !claimed.has(uriPaths[dirs.length]) ? uriPaths[dirs.length] : void 0) ?? null;
      if (hit) claimed.add(hit);
      return hit;
    };
    const add = (item, file) => {
      if (!file) return;
      const key = imageFileKey(file);
      if (seen.has(key)) return;
      seen.add(key);
      if (itemIsDirectory(item, file)) {
        dirs.push({ name: file.name, path: resolveDirPath(file) });
      } else {
        files.push(file);
      }
    };
    if (data.items?.length) {
      for (let i = 0; i < data.items.length; i++) {
        const item = data.items[i];
        if (item.kind === "file") add(item, item.getAsFile());
      }
    }
    if (data.files?.length) {
      for (let i = 0; i < data.files.length; i++) {
        add(null, data.files[i]);
      }
    }
    return { files, dirs };
  }
  function fileToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(reader.error ?? new Error("image read failed"));
      reader.onload = () => {
        const result = reader.result;
        if (typeof result === "string") {
          resolve(result);
        } else {
          reject(new Error("image read failed"));
        }
      };
      reader.readAsDataURL(file);
    });
  }
  async function uploadChatImage(blob, profile = "") {
    if (blob.size === 0) throw new Error("clipboard image is empty");
    if (blob.size > MAX_IMAGE_BYTES) {
      const mb = Math.round(MAX_IMAGE_BYTES / (1024 * 1024));
      throw new Error(`image too large (max ${mb} MB)`);
    }
    const mime = blob.type || "image/png";
    const ext = IMAGE_MIME_EXT[mime] || "png";
    const filename = blob instanceof File && blob.name ? blob.name : `clipboard.${ext}`;
    const file = blob instanceof File ? blob : new File([blob], filename, { type: mime });
    const dataUrl = await fileToDataUrl(file);
    const qs = profile ? `?profile=${encodeURIComponent(profile)}` : "";
    const res = await authedFetch(`/api/chat/image-upload${qs}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data_url: dataUrl,
        filename
      })
    });
    if (!res.ok) {
      const text = await res.text().catch(() => res.statusText);
      throw new Error(text || `HTTP ${res.status}`);
    }
    const uploaded = await res.json();
    if (!uploaded?.path) {
      throw new Error("image upload did not return a path");
    }
    return uploaded;
  }

  // src/shims/jsx-runtime.ts
  var React2 = window.__HERMES_PLUGIN_SDK__?.React;
  var Fragment2 = React2.Fragment;
  function jsx(type, props, key) {
    return key === void 0 || key === null ? React2.createElement(type, props) : React2.createElement(type, { ...props, key });
  }
  var jsxs = jsx;

  // src/chat/ChatBackground.tsx
  var CHAT_BACKGROUND_KEY = "hermes.bubblechat.background";
  var PRESETS = [
    { id: "", label: "\u9ED8\u8BA4", css: "" },
    { id: "slate", label: "\u77F3\u58A8", css: "linear-gradient(160deg, #1b1d23 0%, #282b33 100%)" },
    { id: "ocean", label: "\u6DF1\u6D77", css: "linear-gradient(160deg, #10222b 0%, #1d3a44 60%, #24505e 100%)" },
    { id: "grape", label: "\u8461\u591C", css: "linear-gradient(160deg, #221a2e 0%, #372a49 100%)" },
    { id: "forest", label: "\u58A8\u7EFF", css: "linear-gradient(160deg, #15211b 0%, #243a2d 100%)" },
    { id: "ember", label: "\u6696\u68D5", css: "linear-gradient(160deg, #241d17 0%, #3a2c21 100%)" }
  ];
  var DEFAULT_IMAGE_DIM = 30;
  function loadSetting() {
    try {
      const raw = localStorage.getItem(CHAT_BACKGROUND_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw);
      if (!parsed || typeof parsed !== "object") return null;
      if (!["preset", "color", "image"].includes(parsed.type)) return null;
      if (typeof parsed.value !== "string") return null;
      return parsed;
    } catch {
      return null;
    }
  }
  function useChatBackground() {
    const [setting, setSetting] = useState(loadSetting);
    const [imageUrl, setImageUrl] = useState(null);
    const apply = useCallback((next) => {
      setSetting(next);
      try {
        if (next) localStorage.setItem(CHAT_BACKGROUND_KEY, JSON.stringify(next));
        else localStorage.removeItem(CHAT_BACKGROUND_KEY);
      } catch {
      }
    }, []);
    const settingType = setting?.type;
    const settingValue = setting?.value;
    useEffect(() => {
      if (settingType !== "image" || !settingValue) {
        setImageUrl(null);
        return;
      }
      let cancelled = false;
      let blobUrl = null;
      resolveImageUrl(settingValue).then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setImageUrl(url);
      }).catch(() => {
        if (!cancelled) setImageUrl(null);
      });
      return () => {
        cancelled = true;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }, [settingType, settingValue]);
    const style = useMemo(() => {
      if (!setting) return {};
      if (setting.type === "preset") {
        const css = PRESETS.find((p) => p.id === setting.value)?.css;
        return css ? { background: css } : {};
      }
      if (setting.type === "color") return { background: setting.value };
      if (setting.type === "image" && imageUrl) {
        return {
          backgroundImage: `url("${imageUrl}")`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        };
      }
      return {};
    }, [setting, imageUrl]);
    const dim = setting?.type === "image" ? Math.min(60, Math.max(0, setting.dim ?? DEFAULT_IMAGE_DIM)) : 0;
    return { setting, apply, style, dim };
  }
  var AGENT_AVATAR_KEY = "hermes.bubblechat.agentAvatar";
  function useAgentAvatar() {
    const [path, setPath] = useState(() => {
      try {
        return localStorage.getItem(AGENT_AVATAR_KEY);
      } catch {
        return null;
      }
    });
    const [url, setUrl] = useState(null);
    const apply = useCallback((next) => {
      setPath(next);
      try {
        if (next) localStorage.setItem(AGENT_AVATAR_KEY, next);
        else localStorage.removeItem(AGENT_AVATAR_KEY);
      } catch {
      }
    }, []);
    useEffect(() => {
      if (!path) {
        setUrl(null);
        return;
      }
      let cancelled = false;
      let blobUrl = null;
      resolveImageUrl(path).then((u) => {
        if (cancelled) {
          if (u.startsWith("blob:")) URL.revokeObjectURL(u);
          return;
        }
        if (u.startsWith("blob:")) blobUrl = u;
        setUrl(u);
      }).catch(() => {
        if (!cancelled) setUrl(null);
      });
      return () => {
        cancelled = true;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }, [path]);
    return { path, url, apply };
  }
  function ChatBackgroundPicker({
    bg,
    profile,
    avatar
  }) {
    const [open, setOpen] = useState(false);
    const [busy, setBusy] = useState(false);
    const [avatarBusy, setAvatarBusy] = useState(false);
    const [error, setError] = useState(null);
    const fileRef = useRef(null);
    const avatarFileRef = useRef(null);
    const { setting, apply, dim } = bg;
    const currentPreset = setting?.type === "preset" ? setting.value : null;
    const currentColor = setting?.type === "color" ? setting.value : "#282b33";
    const upload = async (file) => {
      setBusy(true);
      setError(null);
      try {
        const res = await uploadChatImage(file, profile ?? "");
        apply({ type: "image", value: res.path, dim: dim || DEFAULT_IMAGE_DIM });
      } catch (e) {
        setError(e instanceof Error ? e.message : "\u56FE\u7247\u4E0A\u4F20\u5931\u8D25");
      } finally {
        setBusy(false);
      }
    };
    const uploadAvatar = async (file) => {
      if (!avatar) return;
      setAvatarBusy(true);
      setError(null);
      try {
        const res = await uploadChatImage(file, profile ?? "");
        avatar.apply(res.path);
      } catch (e) {
        setError(e instanceof Error ? e.message : "\u5934\u50CF\u4E0A\u4F20\u5931\u8D25");
      } finally {
        setAvatarBusy(false);
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          ghost: true,
          size: "sm",
          onClick: () => setOpen((o) => !o),
          prefix: /* @__PURE__ */ jsx(Palette, {}),
          "aria-label": "\u4E2A\u6027\u5316",
          title: "\u4E2A\u6027\u5316\uFF08\u80CC\u666F / \u52A9\u624B\u5934\u50CF\uFF09",
          className: "text-text-secondary hover:text-foreground",
          children: "\u4E2A\u6027\u5316"
        }
      ),
      open && /* @__PURE__ */ jsxs(Fragment2, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "fixed inset-0 z-40",
            onClick: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-full right-0 z-50 mt-1 flex w-64 flex-col gap-2.5 rounded-xl border border-current/15 bg-background-base p-3 shadow-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "\u804A\u5929\u80CC\u666F" }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setOpen(false),
                "aria-label": "\u5173\u95ED",
                title: "\u5173\u95ED",
                className: "cursor-pointer rounded p-0.5 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                children: /* @__PURE__ */ jsx(X, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "grid grid-cols-3 gap-1.5", children: PRESETS.map((p) => {
            const active = p.id === "" ? setting === null : currentPreset === p.id;
            return /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => apply(p.id ? { type: "preset", value: p.id } : null),
                "aria-pressed": active,
                className: cn(
                  "flex h-10 cursor-pointer items-end justify-center rounded-md border p-0.5",
                  "text-[0.625rem] text-text-secondary",
                  active ? "border-primary" : "border-current/15 hover:border-current/30"
                ),
                style: p.css ? { background: p.css } : void 0,
                children: /* @__PURE__ */ jsx("span", { className: "rounded bg-black/40 px-1", children: p.label })
              },
              p.id || "default"
            );
          }) }),
          /* @__PURE__ */ jsxs("label", { className: "flex items-center gap-2 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "\u81EA\u5B9A\u4E49\u989C\u8272" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "color",
                value: currentColor,
                onChange: (e) => apply({ type: "color", value: e.target.value }),
                "aria-label": "\u81EA\u5B9A\u4E49\u989C\u8272",
                className: "h-7 w-full cursor-pointer rounded border border-current/15 bg-transparent"
              }
            )
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              outlined: true,
              size: "sm",
              disabled: busy,
              onClick: () => fileRef.current?.click(),
              prefix: busy ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsx(ImagePlus, {}),
              className: "justify-center",
              children: busy ? "\u4E0A\u4F20\u4E2D\u2026" : "\u4E0A\u4F20\u56FE\u7247"
            }
          ),
          /* @__PURE__ */ jsx(
            "input",
            {
              ref: fileRef,
              type: "file",
              accept: "image/*",
              className: "hidden",
              onChange: (e) => {
                const f = e.target.files?.[0];
                if (f) void upload(f);
                e.target.value = "";
              }
            }
          ),
          setting?.type === "image" && /* @__PURE__ */ jsxs("label", { className: "flex flex-col gap-1 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsxs("span", { children: [
              "\u56FE\u7247\u6697\u5316 ",
              dim,
              "%"
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "range",
                min: 0,
                max: 60,
                step: 5,
                value: dim,
                onChange: (e) => apply({
                  type: "image",
                  value: setting.value,
                  dim: Number(e.target.value)
                }),
                "aria-label": "\u56FE\u7247\u6697\u5316",
                className: "w-full cursor-pointer accent-primary"
              }
            )
          ] }),
          error && /* @__PURE__ */ jsx("div", { className: "rounded border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive", children: error }),
          avatar && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 border-t border-current/10 pt-2.5", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "\u52A9\u624B\u5934\u50CF" }),
            /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsx("span", { className: "flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-success/15 text-success", children: avatar.url ? /* @__PURE__ */ jsx(
                "img",
                {
                  src: avatar.url,
                  alt: "\u52A9\u624B\u5934\u50CF",
                  className: "h-full w-full object-cover"
                }
              ) : /* @__PURE__ */ jsx(Sparkles, { className: "h-4 w-4" }) }),
              /* @__PURE__ */ jsx(
                Button,
                {
                  outlined: true,
                  size: "sm",
                  disabled: avatarBusy,
                  onClick: () => avatarFileRef.current?.click(),
                  prefix: avatarBusy ? /* @__PURE__ */ jsx(LoaderCircle, { className: "animate-spin" }) : /* @__PURE__ */ jsx(ImagePlus, {}),
                  children: avatarBusy ? "\u4E0A\u4F20\u4E2D\u2026" : "\u4E0A\u4F20\u5934\u50CF"
                }
              ),
              avatar.path && /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: () => avatar.apply(null),
                  title: "\u6062\u590D\u9ED8\u8BA4\u5934\u50CF",
                  className: "cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                  children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx(
              "input",
              {
                ref: avatarFileRef,
                type: "file",
                accept: "image/*",
                className: "hidden",
                onChange: (e) => {
                  const f = e.target.files?.[0];
                  if (f) void uploadAvatar(f);
                  e.target.value = "";
                }
              }
            )
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => apply(null),
              disabled: setting === null,
              className: cn(
                "flex cursor-pointer items-center justify-center gap-1 rounded-md",
                "border border-current/15 px-2 py-1 text-xs text-text-secondary",
                "hover:bg-midground/10 hover:text-foreground",
                "disabled:cursor-not-allowed disabled:opacity-50"
              ),
              children: [
                /* @__PURE__ */ jsx(RotateCcw, { className: "h-3 w-3" }),
                "\u91CD\u7F6E\u4E3A\u9ED8\u8BA4"
              ]
            }
          ),
          /* @__PURE__ */ jsx("p", { className: "text-[0.625rem] leading-relaxed text-text-tertiary", children: "\u80CC\u666F\u4E0E\u5934\u50CF\u8BBE\u7F6E\u4EC5\u4FDD\u5B58\u5728\u5F53\u524D\u6D4F\u89C8\u5668\uFF08localStorage\uFF09\uFF0C\u4E0D\u4F1A\u5F71\u54CD\u5176\u4ED6\u8BBE\u5907\u3002" })
        ] })
      ] })
    ] });
  }

  // src/shared/Spinner.tsx
  var BRAILLE_FRAMES = ["\u280B", "\u2819", "\u2839", "\u2838", "\u283C", "\u2834", "\u2826", "\u2827", "\u2807", "\u280F"];
  var INTERVAL_MS = 80;
  function Spinner({
    className,
    ...props
  }) {
    const [frame, setFrame] = useState(0);
    useEffect(() => {
      const id = setInterval(
        () => setFrame((f) => (f + 1) % BRAILLE_FRAMES.length),
        INTERVAL_MS
      );
      return () => clearInterval(id);
    }, []);
    return /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": props["aria-label"] ? void 0 : true,
        "aria-label": props["aria-label"],
        className: cn(
          "font-mono inline-block leading-none tabular-nums",
          className
        ),
        children: BRAILLE_FRAMES[frame]
      }
    );
  }

  // src/chat/content.ts
  var MEDIA_LINE_RE = /^\s*[`"']?MEDIA:\s*(\S+?)[`"']?\s*$/;
  var IMAGE_EXT_RE = /\.(png|jpe?g|gif|webp|bmp|svg|ico)$/i;
  var AUDIO_EXT_RE = /\.(mp3|wav|ogg|aac|flac|m4a|wma)$/i;
  var VIDEO_EXT_RE = /\.(mp4|webm|avi|mov|mkv|flv)$/i;
  var FILE_EXT_RE = /\.[A-Za-z0-9]{1,10}$/;
  function absPathTokenRe() {
    return /(?:https?:\/\/|~\/|\/)[^\s"'`<>|(){}[\]]+/g;
  }
  function mediaKindForPath(path) {
    if (IMAGE_EXT_RE.test(path)) return "image";
    if (AUDIO_EXT_RE.test(path)) return "audio";
    if (VIDEO_EXT_RE.test(path)) return "video";
    return null;
  }
  function isStandalonePathLine(line) {
    const trimmed = line.trim().replace(/^[`"']|[`"']$/g, "");
    return /^(?:~\/|\/|(?:https?:)?\/\/)\S+$/.test(trimmed) ? trimmed : null;
  }
  function stripTrailingPunct(token) {
    return token.replace(/[.,;:!?'")\]*。，、；：！？）】」』》]+$/, "");
  }
  var LEGACY_FILES_URL_RE = /^(?:https?:)?\/\/(?:localhost|127\.0\.0\.1|\[::1\])(?::\d+)?\/files\/(\S+)$/i;
  function normalizeLocalPath(token) {
    let p = token.trim().replace(/^[`"']+|[`"']+$/g, "");
    p = stripTrailingPunct(p);
    const legacyUrl = p.match(LEGACY_FILES_URL_RE);
    if (legacyUrl) {
      p = `/${legacyUrl[1]}`;
    } else if (/^\/files\/\S/.test(p)) {
      p = p.slice("/files".length);
    } else if (p.includes("://") || p.startsWith("//")) {
      return null;
    }
    p = stripTrailingPunct(p);
    if (p.includes("%")) {
      try {
        p = decodeURIComponent(p);
      } catch {
      }
    }
    if (p.startsWith("/api/")) return null;
    if (!p.startsWith("/") && !p.startsWith("~/")) return null;
    if (p.startsWith("//")) return null;
    return p;
  }
  function isLocalFileRef(href) {
    return normalizeLocalPath(href) !== null;
  }
  function extractMediaFromText(text) {
    const media = [];
    if (!text) return { text, media };
    const keptLines = [];
    for (const line of text.split("\n")) {
      const directive = line.match(MEDIA_LINE_RE)?.[1];
      const candidate = directive ?? isStandalonePathLine(line);
      const localPath = candidate ? normalizeLocalPath(candidate) : null;
      const kind = localPath ? mediaKindForPath(localPath) : null;
      if (localPath && kind) {
        media.push({ kind, path: localPath });
        continue;
      }
      keptLines.push(line);
    }
    let rest = keptLines.join("\n");
    rest = rest.replace(absPathTokenRe(), (token) => {
      const localPath = normalizeLocalPath(token);
      if (localPath && mediaKindForPath(localPath) === "image") {
        media.push({ kind: "image", path: localPath });
        return "";
      }
      return token;
    });
    if (media.length === 0) return { text, media };
    return { text: rest.replace(/\n{3,}/g, "\n\n").trim(), media };
  }
  function extractFilePaths(text, limit = 6) {
    if (!text) return [];
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const m of text.matchAll(absPathTokenRe())) {
      const p = normalizeLocalPath(m[0]);
      if (!p || p.length < 6) continue;
      if (mediaKindForPath(p)) continue;
      if (!FILE_EXT_RE.test(p)) continue;
      if (seen.has(p)) continue;
      seen.add(p);
      out.push(p);
      if (out.length >= limit) break;
    }
    return out;
  }

  // src/chat/AttachmentBar.tsx
  function formatBytes(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  function ImageThumb({ image, onRemove }) {
    const [src, setSrc] = useState(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
      if (image.uploading) return;
      let cancelled = false;
      let blobUrl = null;
      resolveImageUrl(image.path).then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setSrc(url);
      }).catch(() => {
        if (!cancelled) setFailed(true);
      });
      return () => {
        cancelled = true;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }, [image.path, image.uploading]);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "group relative h-14 w-14 shrink-0 overflow-hidden rounded-md",
          "border border-current/10 bg-muted/40"
        ),
        title: image.name,
        children: [
          image.uploading ? /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center text-text-tertiary", children: /* @__PURE__ */ jsx(Spinner, {}) }) : failed ? /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center text-text-tertiary", children: /* @__PURE__ */ jsx(ImageOff, { className: "h-4 w-4" }) }) : src ? /* @__PURE__ */ jsx("img", { src, alt: image.name, className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx("span", { className: "flex h-full w-full items-center justify-center text-text-tertiary", children: /* @__PURE__ */ jsx(Spinner, {}) }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onRemove,
              "aria-label": `\u79FB\u9664\u56FE\u7247 ${image.name}`,
              title: "\u79FB\u9664",
              className: cn(
                "absolute right-0.5 top-0.5 rounded-full bg-black/60 p-0.5 text-white",
                "opacity-0 transition-opacity group-hover:opacity-100 focus:opacity-100"
              ),
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ]
      }
    );
  }
  function FileChip({ file, onRemove }) {
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: cn(
          "inline-flex h-14 max-w-48 items-center gap-2 rounded-md px-2.5",
          "border border-current/10 bg-muted/40"
        ),
        title: file.path,
        children: [
          file.uploading ? /* @__PURE__ */ jsx(Spinner, {}) : file.dir ? /* @__PURE__ */ jsx(Folder, { className: "h-4 w-4 shrink-0 text-text-secondary" }) : mediaKindForPath(file.name) === "audio" ? /* @__PURE__ */ jsx(Music, { className: "h-4 w-4 shrink-0 text-text-secondary" }) : /* @__PURE__ */ jsx(File2, { className: "h-4 w-4 shrink-0 text-text-secondary" }),
          /* @__PURE__ */ jsxs("span", { className: "min-w-0", children: [
            /* @__PURE__ */ jsx("span", { className: "block truncate text-xs text-foreground", children: file.name }),
            /* @__PURE__ */ jsx("span", { className: "block text-[10px] text-text-tertiary", children: file.uploading ? "\u4E0A\u4F20\u4E2D\u2026" : file.dir ? "\u6587\u4EF6\u5939\uFF08\u6309\u8DEF\u5F84\u5F15\u7528\uFF09" : formatBytes(file.size) })
          ] }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: onRemove,
              "aria-label": `\u79FB\u9664\u6587\u4EF6 ${file.name}`,
              title: "\u79FB\u9664",
              className: "shrink-0 rounded-full p-0.5 text-text-tertiary hover:text-foreground",
              children: /* @__PURE__ */ jsx(X, { className: "h-3 w-3" })
            }
          )
        ]
      }
    );
  }
  function AttachmentBar({
    images,
    files,
    onRemoveImage,
    onRemoveFile
  }) {
    if (images.length === 0 && files.length === 0) return null;
    return /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-2 px-1 pb-2", children: [
      images.map((img) => /* @__PURE__ */ jsx(ImageThumb, { image: img, onRemove: () => onRemoveImage(img.id) }, img.id)),
      files.map((f) => /* @__PURE__ */ jsx(FileChip, { file: f, onRemove: () => onRemoveFile(f.id) }, f.id))
    ] });
  }

  // src/chat/SlashPalette.tsx
  function SlashPalette({
    items,
    activeIndex,
    onSelect,
    onHover
  }) {
    if (items.length === 0) return null;
    return /* @__PURE__ */ jsxs(
      "div",
      {
        role: "listbox",
        "aria-label": "\u659C\u6760\u547D\u4EE4\u8865\u5168",
        className: cn(
          "absolute bottom-full left-0 right-0 z-20 mb-1 max-h-64 overflow-y-auto",
          "rounded-xl border border-current/15 bg-background-base shadow-lg"
        ),
        children: [
          items.map((item, i) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": i === activeIndex,
              onMouseDown: (e) => {
                e.preventDefault();
                onSelect(item);
              },
              onMouseEnter: () => onHover(i),
              className: cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left",
                i === activeIndex ? "bg-muted/60" : "hover:bg-muted/30"
              ),
              children: [
                item.kind === "skill" ? /* @__PURE__ */ jsx(Sparkles, { className: "h-3.5 w-3.5 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx(Terminal, { className: "h-3.5 w-3.5 shrink-0 text-text-tertiary" }),
                /* @__PURE__ */ jsxs("span", { className: "shrink-0 font-mono text-sm text-foreground", children: [
                  "/",
                  item.name
                ] }),
                /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-xs text-text-tertiary", children: item.description }),
                item.kind === "skill" && /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded bg-muted/60 px-1.5 py-0.5 text-[10px] text-text-tertiary", children: "skill" })
              ]
            },
            `${item.kind}:${item.name}`
          )),
          /* @__PURE__ */ jsx("div", { className: "border-t border-current/10 px-3 py-1 text-[10px] text-text-tertiary", children: "\u2191\u2193 \u9009\u62E9 \xB7 Tab/Enter \u8865\u5168 \xB7 Esc \u5173\u95ED" })
        ]
      }
    );
  }

  // src/chat/Composer.tsx
  var MAX_TEXTAREA_HEIGHT = 200;
  var DRAFT_KEY_PREFIX = "hermes.bubblechat.draft.";
  var MAX_PALETTE_ITEMS = 9;
  var BUILTIN_COMMANDS = [
    { name: "new", description: "\u5F00\u59CB\u65B0\u4F1A\u8BDD", kind: "builtin" },
    { name: "retry", description: "\u91CD\u8BD5\u4E0A\u4E00\u6761\u6D88\u606F", kind: "builtin" },
    { name: "undo", description: "\u56DE\u9000 N \u8F6E\u7528\u6237\u6D88\u606F\uFF08\u9ED8\u8BA4 1\uFF09", kind: "builtin" },
    { name: "compress", description: "\u538B\u7F29\u5BF9\u8BDD\u4E0A\u4E0B\u6587", kind: "builtin" },
    { name: "title", description: "\u8BBE\u7F6E\u4F1A\u8BDD\u6807\u9898", kind: "builtin" },
    { name: "branch", description: "\u4ECE\u5F53\u524D\u4F1A\u8BDD\u521B\u5EFA\u5206\u652F", kind: "builtin" },
    { name: "queue", description: "\u6392\u961F\u4E00\u6761\u6D88\u606F\uFF0C\u4E0B\u4E00\u8F6E\u53D1\u9001", kind: "builtin" },
    { name: "steer", description: "\u5728\u4E0B\u4E00\u4E2A\u5DE5\u5177\u8C03\u7528\u540E\u63D2\u5165\u6D88\u606F", kind: "builtin" },
    { name: "model", description: "\u5207\u6362\u6A21\u578B", kind: "builtin" },
    { name: "status", description: "\u67E5\u770B\u4F1A\u8BDD / \u6A21\u578B / token \u72B6\u6001", kind: "builtin" }
  ];
  function readDraft(key) {
    try {
      return localStorage.getItem(DRAFT_KEY_PREFIX + key) ?? "";
    } catch {
      return "";
    }
  }
  function writeDraft(key, value) {
    try {
      if (value) {
        localStorage.setItem(DRAFT_KEY_PREFIX + key, value);
      } else {
        localStorage.removeItem(DRAFT_KEY_PREFIX + key);
      }
    } catch {
    }
  }
  function transferHasFiles(data) {
    if (!data) return false;
    if (data.items?.length) {
      for (let i = 0; i < data.items.length; i++) {
        if (data.items[i].kind === "file") return true;
      }
      return false;
    }
    return (data.files?.length ?? 0) > 0;
  }
  function slashQueryOf(text) {
    const m = /^\/(\S*)$/.exec(text);
    return m && !m[1].includes("/") ? m[1] : null;
  }
  function sanitizeFileName(name) {
    const cleaned = name.replace(/[^A-Za-z0-9_.\-一-龥]+/g, "_").replace(/^\.+/, "");
    return cleaned || "file";
  }
  function timestamp() {
    const d = /* @__PURE__ */ new Date();
    const p = (n) => String(n).padStart(2, "0");
    return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}_${p(d.getHours())}${p(d.getMinutes())}${p(d.getSeconds())}`;
  }
  function ComposerImpl({
    draftKey,
    disabled,
    generating,
    busy = false,
    profile = "",
    inject,
    onSend,
    onInterrupt,
    onAttachImage
  }) {
    const [value, setValue] = useState(() => readDraft(draftKey));
    const [images, setImages] = useState([]);
    const [files, setFiles] = useState([]);
    const [uploadError, setUploadError] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [skills, setSkills] = useState([]);
    const [paletteIndex, setPaletteIndex] = useState(0);
    const [paletteDismissed, setPaletteDismissed] = useState(false);
    const textareaRef = useRef(null);
    const fileInputRef = useRef(null);
    const idCounterRef = useRef(0);
    const dragDepthRef = useRef(0);
    const sendingRef = useRef(false);
    const skillsLoadedRef = useRef(false);
    const uploadBaseRef = useRef(null);
    const nextId = () => `att-${++idCounterRef.current}`;
    useEffect(() => {
      setValue(readDraft(draftKey));
      setImages([]);
      setFiles([]);
      setUploadError(null);
      setPaletteDismissed(false);
    }, [draftKey]);
    const lastInjectNonceRef = useRef(0);
    useEffect(() => {
      if (!inject || inject.nonce === lastInjectNonceRef.current) return;
      lastInjectNonceRef.current = inject.nonce;
      setValue(inject.text);
      writeDraft(draftKey, inject.text);
      setPaletteDismissed(false);
      textareaRef.current?.focus();
    }, [inject, draftKey]);
    useEffect(() => {
      const el = textareaRef.current;
      if (!el) return;
      el.style.height = "auto";
      el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
    }, [value]);
    const addImages = useCallback(
      (batch) => {
        if (disabled || batch.length === 0) return;
        for (const file of batch) {
          const id = nextId();
          setImages((prev) => [
            ...prev,
            { id, path: "", name: file.name || "\u7C98\u8D34\u7684\u56FE\u7247", uploading: true }
          ]);
          uploadChatImage(file, profile).then((res) => {
            setImages(
              (prev) => prev.map(
                (img) => img.id === id ? { id, path: res.path, name: res.name } : img
              )
            );
          }).catch((e) => {
            setImages((prev) => prev.filter((img) => img.id !== id));
            setUploadError(`\u56FE\u7247\u4E0A\u4F20\u5931\u8D25\uFF1A${e.message || "\u672A\u77E5\u9519\u8BEF"}`);
          });
        }
      },
      [disabled, profile]
    );
    const getUploadBase = useCallback(() => {
      if (!uploadBaseRef.current) {
        uploadBaseRef.current = api.listFiles().then((res) => res.path.replace(/\/+$/, "")).catch((e) => {
          uploadBaseRef.current = null;
          throw e;
        });
      }
      return uploadBaseRef.current;
    }, []);
    const addFiles = useCallback(
      (batch) => {
        if (disabled || batch.length === 0) return;
        for (const file of batch) {
          const id = nextId();
          setFiles((prev) => [
            ...prev,
            { id, path: "", name: file.name, size: file.size, uploading: true }
          ]);
          (async () => {
            const base = await getUploadBase();
            const target = `${base}/.hermes/chat-uploads/${timestamp()}_${sanitizeFileName(file.name)}`;
            const res = await api.uploadFile(target, file, true);
            const path = res.entry?.path || res.path;
            setFiles(
              (prev) => prev.map((f) => f.id === id ? { ...f, path, uploading: false } : f)
            );
          })().catch((e) => {
            setFiles((prev) => prev.filter((f) => f.id !== id));
            setUploadError(`\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF1A${e.message || "\u672A\u77E5\u9519\u8BEF"}`);
          });
        }
      },
      [disabled, getUploadBase]
    );
    const addBatch = useCallback(
      (batch) => {
        const imgs = [];
        const rest = [];
        for (const f of batch) {
          (f.type.startsWith("image/") ? imgs : rest).push(f);
        }
        addImages(imgs);
        addFiles(rest);
      },
      [addImages, addFiles]
    );
    const addDirRefs = useCallback(
      (dirs) => {
        if (disabled || dirs.length === 0) return;
        for (const d of dirs) {
          if (!d.path) {
            setUploadError(`\u65E0\u6CD5\u83B7\u53D6\u6587\u4EF6\u5939\u300C${d.name}\u300D\u7684\u8DEF\u5F84\uFF0C\u8BF7\u624B\u52A8\u8F93\u5165`);
            continue;
          }
          setFiles((prev) => [
            ...prev,
            { id: nextId(), path: d.path, name: d.name, size: 0, dir: true }
          ]);
        }
      },
      [disabled]
    );
    const onPaste = useCallback(
      (e) => {
        const { files: batch, dirs } = splitTransfer(e.clipboardData);
        if (batch.length === 0 && dirs.length === 0) return;
        e.preventDefault();
        addBatch(batch);
        const unresolved = dirs.filter((d) => !d.path);
        if (unresolved.length === 0) {
          addDirRefs(dirs);
          return;
        }
        console.debug(
          "[bubble-chat] \u76EE\u5F55\u8DEF\u5F84\u672A\u4ECE\u7C98\u8D34\u4E8B\u4EF6\u89E3\u6790\uFF0C\u526A\u8D34\u677F\u5FEB\u7167\uFF1A",
          describeTransfer(e.clipboardData)
        );
        void (async () => {
          const paths = await clipboardSourcePaths();
          for (const d of unresolved) {
            d.path = paths.find((p) => p.split("/").pop() === d.name) ?? null;
          }
          addDirRefs(dirs);
        })();
      },
      [addBatch, addDirRefs]
    );
    const onDragEnter = useCallback((e) => {
      if (!transferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
      dragDepthRef.current += 1;
      setDragActive(true);
    }, []);
    const onDragOver = useCallback((e) => {
      if (!transferHasFiles(e.dataTransfer)) return;
      e.preventDefault();
    }, []);
    const onDragLeave = useCallback((e) => {
      if (!transferHasFiles(e.dataTransfer)) return;
      dragDepthRef.current = Math.max(0, dragDepthRef.current - 1);
      if (dragDepthRef.current === 0) setDragActive(false);
    }, []);
    const onDrop = useCallback(
      (e) => {
        if (!transferHasFiles(e.dataTransfer)) return;
        e.preventDefault();
        dragDepthRef.current = 0;
        setDragActive(false);
        const { files: batch, dirs } = splitTransfer(e.dataTransfer);
        addBatch(batch);
        addDirRefs(dirs);
      },
      [addBatch, addDirRefs]
    );
    const onFilePicked = useCallback(
      (e) => {
        const picked = e.target.files ? Array.from(e.target.files) : [];
        e.target.value = "";
        addBatch(picked);
      },
      [addBatch]
    );
    const slashQuery = slashQueryOf(value);
    const paletteOpen = slashQuery !== null && !paletteDismissed;
    useEffect(() => {
      if (!paletteOpen || skillsLoadedRef.current) return;
      skillsLoadedRef.current = true;
      api.getSkills(profile || void 0).then((list) => {
        setSkills(
          list.filter((s) => s.enabled).map((s) => ({
            name: s.name,
            description: s.description || "skill",
            kind: "skill"
          }))
        );
      }).catch(() => {
      });
    }, [paletteOpen, profile]);
    const paletteItems = useMemo(() => {
      if (slashQuery === null) return [];
      const q = slashQuery.toLowerCase();
      const matches = (item) => item.name.toLowerCase().startsWith(q);
      return [...BUILTIN_COMMANDS.filter(matches), ...skills.filter(matches)].slice(
        0,
        MAX_PALETTE_ITEMS
      );
    }, [slashQuery, skills]);
    useEffect(() => {
      setPaletteIndex(0);
    }, [slashQuery]);
    const applyCompletion = useCallback(
      (item) => {
        const next = `/${item.name} `;
        setValue(next);
        writeDraft(draftKey, next);
        textareaRef.current?.focus();
      },
      [draftKey]
    );
    const uploading = images.some((i) => i.uploading) || files.some((f) => f.uploading);
    const send = useCallback(async () => {
      const text = value.trim();
      if (disabled || generating || busy || uploading || sendingRef.current) return;
      if (!text && images.length === 0 && files.length === 0) return;
      sendingRef.current = true;
      try {
        if (images.length > 0 && onAttachImage) {
          for (const img of images) {
            await onAttachImage(img.path);
          }
        }
        let out = text;
        if (!out && images.length > 0) {
          out = images.map((i) => `[User attached image: ${i.name}]`).join("\n");
        }
        for (const f of files) {
          out += `${out ? "\n" : ""}${f.dir ? "\u6587\u4EF6\u5939\u8DEF\u5F84" : "\u5DF2\u4E0A\u4F20\u6587\u4EF6"}\uFF1A${f.path}`;
        }
        onSend(out, images.map((i) => i.path).filter(Boolean));
        setValue("");
        writeDraft(draftKey, "");
        setImages([]);
        setFiles([]);
        setUploadError(null);
      } catch (e) {
        setUploadError(
          `\u56FE\u7247\u9644\u52A0\u5931\u8D25\uFF1A${e instanceof Error ? e.message : "\u672A\u77E5\u9519\u8BEF"}`
        );
      } finally {
        sendingRef.current = false;
      }
    }, [value, disabled, generating, busy, uploading, images, files, onAttachImage, onSend, draftKey]);
    const onKeyDown = useCallback(
      (e) => {
        if (e.nativeEvent.isComposing) return;
        if (paletteOpen && paletteItems.length > 0) {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setPaletteIndex((i) => (i + 1) % paletteItems.length);
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setPaletteIndex(
              (i) => (i - 1 + paletteItems.length) % paletteItems.length
            );
            return;
          }
          if (e.key === "Tab" || e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            applyCompletion(paletteItems[Math.min(paletteIndex, paletteItems.length - 1)]);
            return;
          }
          if (e.key === "Escape") {
            e.preventDefault();
            setPaletteDismissed(true);
            return;
          }
        }
        if (e.key !== "Enter" || e.shiftKey) return;
        e.preventDefault();
        void send();
      },
      [paletteOpen, paletteItems, paletteIndex, applyCompletion, send]
    );
    const canSend = !disabled && !busy && !uploading && (value.trim() || images.length > 0 || files.length > 0);
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: "flex shrink-0 flex-col pb-[env(safe-area-inset-bottom)]",
        onDragEnter,
        onDragOver,
        onDragLeave,
        onDrop,
        children: [
          /* @__PURE__ */ jsx(
            AttachmentBar,
            {
              images,
              files,
              onRemoveImage: (id) => setImages((prev) => prev.filter((i) => i.id !== id)),
              onRemoveFile: (id) => setFiles((prev) => prev.filter((f) => f.id !== id))
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            paletteOpen && /* @__PURE__ */ jsx(
              SlashPalette,
              {
                items: paletteItems,
                activeIndex: Math.min(paletteIndex, Math.max(0, paletteItems.length - 1)),
                onSelect: applyCompletion,
                onHover: setPaletteIndex
              }
            ),
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "flex items-end gap-2 rounded-xl border border-current/15",
                  "bg-background-base px-3 py-2",
                  "focus-within:border-current/30 transition-colors",
                  dragActive && "border-current/50 bg-muted/30"
                ),
                children: [
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      ref: fileInputRef,
                      type: "file",
                      multiple: true,
                      className: "hidden",
                      onChange: onFilePicked
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "icon",
                      ghost: true,
                      disabled,
                      onClick: () => fileInputRef.current?.click(),
                      "aria-label": "\u6DFB\u52A0\u9644\u4EF6",
                      title: "\u6DFB\u52A0\u9644\u4EF6\uFF08\u56FE\u7247\u6216\u6587\u4EF6\uFF09",
                      children: /* @__PURE__ */ jsx(Paperclip, {})
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "textarea",
                    {
                      ref: textareaRef,
                      rows: 1,
                      value,
                      disabled,
                      onChange: (e) => {
                        setValue(e.target.value);
                        writeDraft(draftKey, e.target.value);
                        setPaletteDismissed(false);
                      },
                      onKeyDown,
                      onPaste,
                      placeholder: disabled ? "\u6B63\u5728\u8FDE\u63A5\u2026" : "\u8F93\u5165\u6D88\u606F\uFF0CEnter \u53D1\u9001\uFF1B\u53EF\u7C98\u8D34/\u62D6\u62FD\u56FE\u7247\u6216\u6587\u4EF6\uFF0C\u8F93\u5165 / \u8865\u5168\u547D\u4EE4",
                      "aria-label": "\u6D88\u606F\u8F93\u5165\u6846",
                      className: cn(
                        "min-h-[1.5rem] max-h-[200px] min-w-0 flex-1 resize-none bg-transparent",
                        "text-sm leading-relaxed text-foreground placeholder:text-text-tertiary",
                        "focus:outline-none disabled:opacity-50"
                      )
                    }
                  ),
                  generating ? /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "icon",
                      outlined: true,
                      onClick: onInterrupt,
                      "aria-label": "\u505C\u6B62\u751F\u6210",
                      title: "\u505C\u6B62\u751F\u6210",
                      children: /* @__PURE__ */ jsx(Square, {})
                    }
                  ) : /* @__PURE__ */ jsx(
                    Button,
                    {
                      size: "icon",
                      onClick: () => void send(),
                      disabled: !canSend,
                      "aria-label": "\u53D1\u9001",
                      title: busy ? "\u547D\u4EE4\u6267\u884C\u4E2D\u2026" : uploading ? "\u7B49\u5F85\u9644\u4EF6\u4E0A\u4F20\u5B8C\u6210\u2026" : "\u53D1\u9001",
                      children: busy ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsx(SendHorizontal, {})
                    }
                  )
                ]
              }
            )
          ] }),
          uploadError && /* @__PURE__ */ jsx("div", { className: "px-1 pt-1 text-xs text-destructive", children: uploadError })
        ]
      }
    );
  }
  var Composer = memo(ComposerImpl);

  // src/Markdown.tsx
  function Markdown({
    content,
    highlightTerms,
    streaming,
    localFileLinks
  }) {
    const blocks = useIncrementalBlocks(content, streaming);
    const caret = streaming ? /* @__PURE__ */ jsx(StreamingCaret, {}) : null;
    return /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground leading-relaxed space-y-2", children: [
      blocks.map((block, i) => /* @__PURE__ */ jsx(
        Block,
        {
          block,
          highlightTerms,
          localFileLinks,
          caret: caret && i === blocks.length - 1 ? caret : null
        },
        i
      )),
      blocks.length === 0 && caret
    ] });
  }
  function StreamingCaret() {
    return /* @__PURE__ */ jsx(
      "span",
      {
        "aria-hidden": true,
        className: "inline-block w-[0.5em] h-[1em] ml-0.5 align-[-0.15em] bg-foreground/50 animate-pulse"
      }
    );
  }
  function parseBlockSpans(text) {
    const lines = text.split("\n");
    const lineStarts = new Array(lines.length);
    let offset = 0;
    for (let k = 0; k < lines.length; k++) {
      lineStarts[k] = offset;
      offset += lines[k].length + 1;
    }
    const spans = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const fenceMatch = line.match(/^```(\w*)/);
      if (fenceMatch) {
        const start2 = lineStarts[i];
        const lang = fenceMatch[1] || "";
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++;
        spans.push({
          start: start2,
          node: { type: "code", lang, content: codeLines.join("\n") }
        });
        continue;
      }
      const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
      if (headingMatch) {
        spans.push({
          start: lineStarts[i],
          node: {
            type: "heading",
            level: headingMatch[1].length,
            content: headingMatch[2]
          }
        });
        i++;
        continue;
      }
      if (/^[-*_]{3,}\s*$/.test(line)) {
        spans.push({ start: lineStarts[i], node: { type: "hr" } });
        i++;
        continue;
      }
      if (/^[-*+]\s/.test(line)) {
        const start2 = lineStarts[i];
        const items = [];
        while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
          items.push(lines[i].replace(/^[-*+]\s/, ""));
          i++;
        }
        spans.push({ start: start2, node: { type: "list", ordered: false, items } });
        continue;
      }
      if (/^\d+[.)]\s/.test(line)) {
        const start2 = lineStarts[i];
        const items = [];
        while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
          items.push(lines[i].replace(/^\d+[.)]\s/, ""));
          i++;
        }
        spans.push({ start: start2, node: { type: "list", ordered: true, items } });
        continue;
      }
      if (line.trim() === "") {
        i++;
        continue;
      }
      const start = lineStarts[i];
      const paraLines = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^```/) && !lines[i].match(/^#{1,4}\s/) && !lines[i].match(/^[-*+]\s/) && !lines[i].match(/^\d+[.)]\s/) && !lines[i].match(/^[-*_]{3,}\s*$/)) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        spans.push({
          start,
          node: { type: "paragraph", content: paraLines.join("\n") }
        });
      } else {
        spans.push({ start, node: { type: "paragraph", content: line } });
        i++;
      }
    }
    return spans;
  }
  function useIncrementalBlocks(content, streaming) {
    const cacheRef = useRef({
      prefix: "",
      blocks: []
    });
    return useMemo(() => {
      let cache = cacheRef.current;
      if (!streaming || !content.startsWith(cache.prefix)) {
        cache = { prefix: "", blocks: [] };
      }
      const tail = content.slice(cache.prefix.length);
      const tailSpans = parseBlockSpans(tail);
      const blocks = cache.blocks.concat(tailSpans.map((s) => s.node));
      if (streaming && tailSpans.length > 1) {
        let stable = 0;
        for (let k = 1; k < tailSpans.length; k++) {
          if (hasBlankLineBefore(tail, tailSpans[k].start)) stable = k;
        }
        cacheRef.current = stable > 0 ? {
          prefix: cache.prefix + tail.slice(0, tailSpans[stable].start),
          blocks: cache.blocks.concat(
            tailSpans.slice(0, stable).map((s) => s.node)
          )
        } : cache;
      } else {
        cacheRef.current = streaming ? cache : { prefix: "", blocks: [] };
      }
      return blocks;
    }, [content, streaming]);
  }
  function hasBlankLineBefore(text, start) {
    if (start < 1 || text[start - 1] !== "\n") return false;
    return start === 1 || text[start - 2] === "\n";
  }
  var Block = memo(function Block2({
    block,
    highlightTerms,
    localFileLinks,
    caret
  }) {
    switch (block.type) {
      case "code":
        return /* @__PURE__ */ jsx("pre", { className: "bg-secondary/60 border border-border px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto", children: /* @__PURE__ */ jsxs("code", { children: [
          block.content,
          caret
        ] }) });
      case "heading": {
        const Tag = `h${Math.min(block.level, 4)}`;
        const sizes = {
          h1: "text-base font-bold",
          h2: "text-sm font-bold",
          h3: "text-sm font-semibold",
          h4: "text-sm font-medium"
        };
        return /* @__PURE__ */ jsxs(Tag, { className: sizes[Tag], children: [
          /* @__PURE__ */ jsx(
            InlineContent,
            {
              text: block.content,
              highlightTerms,
              localFileLinks
            }
          ),
          caret
        ] });
      }
      case "hr":
        return /* @__PURE__ */ jsxs(Fragment2, { children: [
          /* @__PURE__ */ jsx("hr", { className: "border-border" }),
          caret
        ] });
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        const last = block.items.length - 1;
        return /* @__PURE__ */ jsx(
          Tag,
          {
            className: `space-y-0.5 ${block.ordered ? "list-decimal" : "list-disc"} pl-5 text-sm`,
            children: block.items.map((item, i) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(
                InlineContent,
                {
                  text: item,
                  highlightTerms,
                  localFileLinks
                }
              ),
              i === last ? caret : null
            ] }, i))
          }
        );
      }
      case "paragraph":
        return /* @__PURE__ */ jsxs("p", { children: [
          /* @__PURE__ */ jsx(
            InlineContent,
            {
              text: block.content,
              highlightTerms,
              localFileLinks
            }
          ),
          caret
        ] });
    }
  });
  function parseInline(text) {
    const nodes = [];
    const pattern = /(`[^`]+`)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\bhttps?:\/\/[^\s<>)\]]+)|(\n)/g;
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text)) !== null) {
      if (match.index > lastIndex) {
        nodes.push({ type: "text", content: text.slice(lastIndex, match.index) });
      }
      if (match[1]) {
        nodes.push({ type: "code", content: match[1].slice(1, -1) });
      } else if (match[2]) {
        nodes.push({ type: "link", text: match[3], href: match[4] });
      } else if (match[5]) {
        nodes.push({ type: "bold", content: match[6] });
      } else if (match[7]) {
        nodes.push({ type: "italic", content: match[8] });
      } else if (match[9]) {
        nodes.push({ type: "link", text: match[9], href: match[9] });
      } else if (match[10]) {
        nodes.push({ type: "br" });
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      nodes.push({ type: "text", content: text.slice(lastIndex) });
    }
    return nodes;
  }
  function InlineContent({
    text,
    highlightTerms,
    localFileLinks
  }) {
    const nodes = useMemo(() => parseInline(text), [text]);
    return /* @__PURE__ */ jsx(Fragment2, { children: nodes.map((node, i) => {
      switch (node.type) {
        case "text":
          return /* @__PURE__ */ jsx(
            HighlightedText,
            {
              text: node.content,
              terms: highlightTerms
            },
            i
          );
        case "code":
          return /* @__PURE__ */ jsx(
            "code",
            {
              className: "bg-secondary/60 px-1.5 py-0.5 text-xs font-mono text-primary/90",
              children: node.content
            },
            i
          );
        case "bold":
          return /* @__PURE__ */ jsx("strong", { className: "font-semibold", children: /* @__PURE__ */ jsx(HighlightedText, { text: node.content, terms: highlightTerms }) }, i);
        case "italic":
          return /* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsx(HighlightedText, { text: node.content, terms: highlightTerms }) }, i);
        case "link": {
          const href = node.href.trim();
          const isLocalFile = localFileLinks === true && isLocalFileRef(href);
          if (!/^(https?:|mailto:)/i.test(href) && !isLocalFile) {
            return /* @__PURE__ */ jsx(
              HighlightedText,
              {
                text: node.text,
                terms: highlightTerms
              },
              i
            );
          }
          if (isLocalFile) {
            return /* @__PURE__ */ jsx(
              "a",
              {
                href,
                className: "text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-colors",
                children: node.text
              },
              i
            );
          }
          return /* @__PURE__ */ jsx(
            "a",
            {
              href,
              target: "_blank",
              rel: "noreferrer",
              className: "text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-colors",
              children: node.text
            },
            i
          );
        }
        case "br":
          return /* @__PURE__ */ jsx("br", {}, i);
      }
    }) });
  }
  function HighlightedText({ text, terms }) {
    if (!terms || terms.length === 0) return /* @__PURE__ */ jsx(Fragment2, { children: text });
    const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text.split(regex);
    return /* @__PURE__ */ jsx(Fragment2, { children: parts.map(
      (part, i) => regex.test(part) ? /* @__PURE__ */ jsx("mark", { className: "bg-warning/30 text-warning px-0.5", children: part }, i) : /* @__PURE__ */ jsx("span", { children: part }, i)
    ) });
  }

  // src/chat/MediaInline.tsx
  function fileName(path) {
    return path.split("/").filter(Boolean).pop() ?? path;
  }
  function MediaError({ label }) {
    return /* @__PURE__ */ jsxs(
      "span",
      {
        className: cn(
          "inline-flex items-center gap-1.5 rounded-md border border-current/10",
          "bg-muted/40 px-2 py-1 text-xs text-text-tertiary"
        ),
        children: [
          /* @__PURE__ */ jsx(ImageOff, { className: "h-3.5 w-3.5 shrink-0" }),
          label
        ]
      }
    );
  }
  function ZoomOverlay({ src, alt, onClose }) {
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "Escape") onClose();
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }, [onClose]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": "\u67E5\u770B\u56FE\u7247",
        onClick: onClose,
        className: "fixed inset-0 z-50 flex cursor-zoom-out items-center justify-center bg-black/85 animate-[fade-in_0.2s_ease]",
        children: /* @__PURE__ */ jsx(
          "img",
          {
            src,
            alt,
            onClick: (e) => e.stopPropagation(),
            className: "max-h-[90vh] max-w-[90vw] cursor-default rounded-lg shadow-2xl"
          }
        )
      }
    );
  }
  function InlineImage({ media }) {
    const [src, setSrc] = useState(media.dataUrl ?? null);
    const [failed, setFailed] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const alt = media.path ? fileName(media.path) : "\u56FE\u7247";
    useEffect(() => {
      if (media.dataUrl || !media.path) return;
      let cancelled = false;
      let blobUrl = null;
      resolveImageUrl(media.path).then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setSrc(url);
      }).catch(() => {
        if (!cancelled) setFailed(true);
      });
      return () => {
        cancelled = true;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }, [media.path, media.dataUrl]);
    if (failed) return /* @__PURE__ */ jsx(MediaError, { label: `\u56FE\u7247\u52A0\u8F7D\u5931\u8D25\uFF1A${alt}` });
    if (!src) {
      return /* @__PURE__ */ jsx("span", { className: "flex h-24 w-40 items-center justify-center rounded-md border border-current/10 bg-muted/40 text-text-tertiary", children: /* @__PURE__ */ jsx(Spinner, {}) });
    }
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src,
          alt,
          loading: "lazy",
          onClick: () => setZoomed(true),
          onError: () => setFailed(true),
          className: cn(
            "max-h-[420px] max-w-full cursor-zoom-in rounded-md",
            "border border-current/10 hover:border-current/25"
          )
        }
      ),
      zoomed && /* @__PURE__ */ jsx(ZoomOverlay, { src, alt, onClose: () => setZoomed(false) })
    ] });
  }
  function InlineAv({ media }) {
    const [src, setSrc] = useState(null);
    const [failed, setFailed] = useState(false);
    const label = media.path ? fileName(media.path) : "\u5A92\u4F53";
    useEffect(() => {
      if (!media.path) return;
      let cancelled = false;
      let blobUrl = null;
      resolveFileUrl(media.path).then((url) => {
        if (cancelled) {
          if (url.startsWith("blob:")) URL.revokeObjectURL(url);
          return;
        }
        if (url.startsWith("blob:")) blobUrl = url;
        setSrc(url);
      }).catch(() => {
        if (!cancelled) setFailed(true);
      });
      return () => {
        cancelled = true;
        if (blobUrl) URL.revokeObjectURL(blobUrl);
      };
    }, [media.path]);
    if (failed) return /* @__PURE__ */ jsx(MediaError, { label: `\u5A92\u4F53\u52A0\u8F7D\u5931\u8D25\uFF1A${label}` });
    if (!src) {
      return /* @__PURE__ */ jsx("span", { className: "flex h-10 w-64 items-center justify-center rounded-md border border-current/10 bg-muted/40 text-text-tertiary", children: /* @__PURE__ */ jsx(Spinner, {}) });
    }
    if (media.kind === "audio") {
      return /* @__PURE__ */ jsx("audio", { controls: true, preload: "metadata", src, className: "w-full max-w-md" });
    }
    return /* @__PURE__ */ jsx(
      "video",
      {
        controls: true,
        preload: "metadata",
        src,
        className: "max-h-[420px] max-w-full rounded-md border border-current/10"
      }
    );
  }
  function MediaInline({ media }) {
    return /* @__PURE__ */ jsx("div", { className: "max-w-full", children: media.kind === "image" ? /* @__PURE__ */ jsx(InlineImage, { media }) : /* @__PURE__ */ jsx(InlineAv, { media }) });
  }

  // src/chat/FileChip.tsx
  var TEXT_EXTS = /* @__PURE__ */ new Set([
    "md",
    "markdown",
    "txt",
    "json",
    "jsonl",
    "log",
    "csv",
    "tsv",
    "xml",
    "yaml",
    "yml",
    "toml",
    "ini",
    "cfg",
    "conf",
    "env",
    "sh",
    "bash",
    "zsh",
    "py",
    "pyi",
    "js",
    "jsx",
    "ts",
    "tsx",
    "mjs",
    "cjs",
    "css",
    "html",
    "htm",
    "sql",
    "rs",
    "go",
    "java",
    "c",
    "h",
    "cpp",
    "hpp",
    "cc",
    "vue",
    "svelte",
    "tex",
    "diff",
    "patch"
  ]);
  var PREVIEW_MAX_BYTES = 512 * 1024;
  function fileName2(path) {
    return path.split("/").filter(Boolean).pop() ?? path;
  }
  function extOf(path) {
    const name = fileName2(path);
    const dot = name.lastIndexOf(".");
    return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
  }
  function dataUrlToText(dataUrl) {
    const comma = dataUrl.indexOf(",");
    const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
    const bin = atob(b64);
    const bytes = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
    return new TextDecoder("utf-8").decode(bytes);
  }
  function PreviewModal({
    path,
    text,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u9884\u89C8 ${fileName2(path)}`,
        onClick: onClose,
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fade-in_0.15s_ease]",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            className: cn(
              "flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden",
              "rounded-xl border border-current/15 bg-background-base shadow-2xl"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-current/10 px-4 py-2.5", children: [
                /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "\u5173\u95ED",
                    title: "\u5173\u95ED",
                    className: "shrink-0 cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("pre", { className: "min-h-0 flex-1 overflow-auto px-4 py-3 font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word text-text-secondary", children: text })
            ]
          }
        )
      }
    );
  }
  function PdfPreviewModal({
    src,
    path,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u9884\u89C8 ${fileName2(path)}`,
        onClick: onClose,
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fade-in_0.15s_ease]",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            className: cn(
              "flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden",
              "rounded-xl border border-current/15 bg-background-base shadow-2xl"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-current/10 px-4 py-2.5", children: [
                /* @__PURE__ */ jsx(FileText, { className: "h-4 w-4 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "\u5173\u95ED",
                    title: "\u5173\u95ED",
                    className: "shrink-0 cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "iframe",
                {
                  src,
                  title: fileName2(path),
                  className: "min-h-0 flex-1 border-0 bg-white"
                }
              )
            ]
          }
        )
      }
    );
  }
  function AudioPreviewModal({
    src,
    path,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u64AD\u653E ${fileName2(path)}`,
        onClick: onClose,
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-[fade-in_0.15s_ease]",
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            onClick: (e) => e.stopPropagation(),
            className: cn(
              "flex w-full max-w-md flex-col overflow-hidden",
              "rounded-xl border border-current/15 bg-background-base shadow-2xl"
            ),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-current/10 px-4 py-2.5", children: [
                /* @__PURE__ */ jsx(Music, { className: "h-4 w-4 shrink-0 text-primary" }),
                /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path })
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "\u5173\u95ED",
                    title: "\u5173\u95ED",
                    className: "shrink-0 cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "px-4 py-4", children: /* @__PURE__ */ jsx("audio", { controls: true, autoPlay: true, src, className: "w-full" }) })
            ]
          }
        )
      }
    );
  }
  function useFileOpener() {
    const [textPreview, setTextPreview] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [pdfPreview, setPdfPreview] = useState(null);
    const [audioPreview, setAudioPreview] = useState(null);
    const closePdfPreview = useCallback(() => {
      setPdfPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev.src);
        return null;
      });
    }, []);
    const closeAudioPreview = useCallback(() => {
      setAudioPreview((prev) => {
        if (prev) URL.revokeObjectURL(prev.src);
        return null;
      });
    }, []);
    const open = useCallback(async (path) => {
      const name = fileName2(path);
      const mediaKind = mediaKindForPath(path);
      if (mediaKind === "image") {
        const src = await resolveImageUrl(path);
        setImagePreview({ src, alt: name });
        return;
      }
      if (extOf(path) === "pdf") {
        const src = await fetchFileBlobUrl(path);
        setPdfPreview({ src, path });
        return;
      }
      if (mediaKind === "audio") {
        const src = await fetchFileBlobUrl(path);
        setAudioPreview({ src, path });
        return;
      }
      if (TEXT_EXTS.has(extOf(path))) {
        const res = await api.readFile(path);
        if (res.size > PREVIEW_MAX_BYTES) {
          await downloadFile(path, name);
          return;
        }
        setTextPreview({ path, text: dataUrlToText(res.data_url) });
        return;
      }
      try {
        await openInSystemApp(path);
      } catch {
        await downloadFile(path, name);
      }
    }, []);
    const modal = /* @__PURE__ */ jsxs(Fragment2, { children: [
      textPreview && /* @__PURE__ */ jsx(
        PreviewModal,
        {
          path: textPreview.path,
          text: textPreview.text,
          onClose: () => setTextPreview(null)
        }
      ),
      imagePreview && /* @__PURE__ */ jsx(
        ZoomOverlay,
        {
          src: imagePreview.src,
          alt: imagePreview.alt,
          onClose: () => setImagePreview(null)
        }
      ),
      pdfPreview && /* @__PURE__ */ jsx(
        PdfPreviewModal,
        {
          src: pdfPreview.src,
          path: pdfPreview.path,
          onClose: closePdfPreview
        }
      ),
      audioPreview && /* @__PURE__ */ jsx(
        AudioPreviewModal,
        {
          src: audioPreview.src,
          path: audioPreview.path,
          onClose: closeAudioPreview
        }
      )
    ] });
    return { open, modal };
  }
  function FileChip2({ path }) {
    const [missing, setMissing] = useState(false);
    const [busy, setBusy] = useState(false);
    const { open, modal } = useFileOpener();
    const name = fileName2(path);
    const mediaKind = mediaKindForPath(path);
    const isImage = mediaKind === "image";
    const isAudio = mediaKind === "audio";
    const previewable = isImage || isAudio || extOf(path) === "pdf" || TEXT_EXTS.has(extOf(path));
    const handleClick = () => {
      if (missing || busy) return;
      setBusy(true);
      open(path).catch(() => setMissing(true)).finally(() => setBusy(false));
    };
    const Icon2 = isImage ? Image : isAudio ? Music : previewable ? FileText : File2;
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleClick,
          disabled: missing,
          title: missing ? "\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u65E0\u6CD5\u8BBF\u95EE" : path,
          className: cn(
            "inline-flex max-w-full cursor-pointer items-center gap-1 rounded-md",
            "border border-current/10 bg-muted/40 px-1.5 py-0.5",
            "font-mono-ui text-xs text-primary hover:border-primary/40 hover:bg-muted/70",
            missing && "cursor-not-allowed text-text-tertiary opacity-60 hover:border-current/10 hover:bg-muted/40"
          ),
          children: [
            busy ? /* @__PURE__ */ jsx(LoaderCircle, { className: "h-3 w-3 shrink-0 animate-spin" }) : /* @__PURE__ */ jsx(Icon2, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: name }),
            missing && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: "\uFF08\u4E0D\u5B58\u5728\uFF09" })
          ]
        }
      ),
      modal
    ] });
  }

  // src/chat/ReasoningBlock.tsx
  function ReasoningBlock({
    text,
    streaming
  }) {
    const [open, setOpen] = useState(false);
    const bodyRef = useRef(null);
    useEffect(() => {
      const el = bodyRef.current;
      if (el && streaming && open) el.scrollTop = el.scrollHeight;
    }, [text, streaming, open]);
    if (!text.trim()) return null;
    return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-current/10 bg-muted/40 text-xs", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen(!open),
          "aria-expanded": open,
          className: cn(
            "flex w-full items-center gap-1.5 px-2.5 py-1.5",
            "text-text-tertiary hover:text-text-secondary",
            "cursor-pointer transition-colors"
          ),
          children: [
            open ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: streaming ? "\u6B63\u5728\u601D\u8003\u2026" : "\u601D\u8003\u8FC7\u7A0B" }),
            streaming && /* @__PURE__ */ jsx("span", { className: "ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" })
          ]
        }
      ),
      open && /* @__PURE__ */ jsx(
        "div",
        {
          ref: bodyRef,
          className: "max-h-64 overflow-y-auto border-t border-current/10 px-2.5 py-2 whitespace-pre-wrap text-text-secondary",
          children: text
        }
      )
    ] });
  }

  // src/chat/ToolCard.tsx
  var TRUNCATE_AT = 2e3;
  function prettyArgs(args) {
    if (args == null) return "";
    if (typeof args === "string") return args;
    try {
      return JSON.stringify(args, null, 2);
    } catch {
      return String(args);
    }
  }
  function formatDuration(seconds) {
    if (seconds < 10) return `${seconds.toFixed(1)}s`;
    if (seconds < 60) return `${Math.round(seconds)}s`;
    const mins = Math.floor(seconds / 60);
    const secs = Math.round(seconds % 60);
    return secs ? `${mins}m ${secs}s` : `${mins}m`;
  }
  function Truncated({ text, label }) {
    const [expanded, setExpanded] = useState(false);
    const long = text.length > TRUNCATE_AT;
    return /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "mb-0.5 text-[0.625rem] text-text-tertiary", children: label }),
      /* @__PURE__ */ jsx(
        "pre",
        {
          className: cn(
            "max-h-60 overflow-auto rounded bg-midground/5 px-2 py-1.5",
            "font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word",
            "text-text-secondary"
          ),
          children: expanded || !long ? text : `${text.slice(0, TRUNCATE_AT)}\u2026`
        }
      ),
      long && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setExpanded((e) => !e),
          className: "mt-0.5 cursor-pointer text-[0.625rem] text-primary hover:underline",
          children: expanded ? "\u6536\u8D77" : `\u5C55\u5F00\u5168\u90E8\uFF08${text.length} \u5B57\u7B26\uFF09`
        }
      )
    ] });
  }
  function ToolCard({ msg }) {
    const [open, setOpen] = useState(false);
    const argsText = useMemo(() => prettyArgs(msg.toolArgs), [msg.toolArgs]);
    const { text: resultText, media } = useMemo(
      () => extractMediaFromText(msg.toolResult ?? ""),
      [msg.toolResult]
    );
    const filePaths = useMemo(() => extractFilePaths(resultText), [resultText]);
    const running = msg.toolRunning === true;
    const failed = msg.toolError === true;
    const hasBody = argsText.length > 0 || resultText.length > 0 || media.length > 0;
    const status = running ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-warning", children: [
      /* @__PURE__ */ jsx(Spinner, {}),
      " \u6267\u884C\u4E2D\u2026"
    ] }) : failed ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-destructive", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
      " \u51FA\u9519"
    ] }) : /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1 text-success", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
      "\u5B8C\u6210",
      msg.toolDuration != null ? ` ${formatDuration(msg.toolDuration)}` : ""
    ] });
    return (
      // ml-10 aligns the card with the assistant bubble text (avatar 2rem +
      // gap 0.5rem); dropped on narrow screens where space is scarce.
      /* @__PURE__ */ jsx("div", { className: "flex justify-start px-2 sm:ml-10", children: /* @__PURE__ */ jsxs(
        "div",
        {
          className: cn(
            "w-full max-w-[75%] overflow-hidden rounded-md sm:max-w-[560px]",
            "border border-current/10 bg-midground/5 text-xs"
          ),
          children: [
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => hasBody && setOpen((o) => !o),
                className: cn(
                  "flex w-full items-center gap-2 px-2.5 py-1.5 text-left",
                  hasBody ? "cursor-pointer" : "cursor-default"
                ),
                children: [
                  hasBody ? open ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx("span", { className: "w-3 shrink-0" }),
                  /* @__PURE__ */ jsx(Wrench, { className: "h-3.5 w-3.5 shrink-0 text-warning" }),
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 font-medium text-primary", children: msg.toolName ?? "tool" }),
                  msg.toolContext && /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-text-tertiary", children: msg.toolContext }),
                  /* @__PURE__ */ jsx("span", { className: "ml-auto shrink-0", children: status })
                ]
              }
            ),
            open && hasBody && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 border-t border-current/10 px-2.5 py-2", children: [
              argsText && /* @__PURE__ */ jsx(Truncated, { text: argsText, label: "\u53C2\u6570" }),
              resultText && /* @__PURE__ */ jsx(Truncated, { text: resultText, label: "\u7ED3\u679C" }),
              media.map((m, i) => /* @__PURE__ */ jsx(MediaInline, { media: m }, i)),
              (() => {
                const mediaPaths = [
                  ...new Set(
                    media.map((m) => m.path).filter((p) => Boolean(p))
                  )
                ];
                const chips = mediaPaths.concat(filePaths);
                return chips.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1", children: chips.map((p) => /* @__PURE__ */ jsx(FileChip2, { path: p }, p)) });
              })()
            ] }),
            /* @__PURE__ */ jsx("div", { className: "h-0.5 w-full overflow-hidden bg-current/10", children: /* @__PURE__ */ jsx(
              "div",
              {
                className: cn(
                  "h-full",
                  running && "w-1/4 bg-primary animate-[tool-card-indeterminate_1.2s_ease-in-out_infinite]",
                  !running && !failed && "w-full bg-success",
                  failed && "w-full bg-destructive"
                )
              }
            ) })
          ]
        }
      ) })
    );
  }

  // src/chat/types.ts
  var nextMessageId = 0;
  function messageId() {
    nextMessageId += 1;
    return `m${nextMessageId}`;
  }
  function nowSeconds() {
    return Date.now() / 1e3;
  }
  function formatBubbleTime(ts) {
    const d = new Date(ts * 1e3);
    const hh = String(d.getHours()).padStart(2, "0");
    const mm = String(d.getMinutes()).padStart(2, "0");
    return `${hh}:${mm}`;
  }
  var CONTENT_JSON_PREFIX = "\0json:";
  function contentPartsOf(content) {
    if (Array.isArray(content)) return content;
    if (typeof content !== "string") return null;
    if (!content.startsWith(CONTENT_JSON_PREFIX)) return null;
    try {
      const parts = JSON.parse(content.slice(CONTENT_JSON_PREFIX.length));
      return Array.isArray(parts) ? parts : null;
    } catch {
      return null;
    }
  }
  function imagePartUrl(part) {
    const raw = part.image_url;
    if (typeof raw === "string") return raw;
    if (raw && typeof raw === "object") {
      const url = raw.url;
      if (typeof url === "string") return url;
    }
    return null;
  }
  function decodeMessageContentParts(content) {
    if (!content) return { text: "", images: [] };
    const parts = contentPartsOf(content);
    if (parts === null) {
      return typeof content === "string" ? { text: content, images: [] } : { text: String(content), images: [] };
    }
    const out = [];
    const images = [];
    for (const part of parts) {
      if (part == null || typeof part !== "object") continue;
      const p = part;
      if (p.type === "text" && typeof p.text === "string") {
        out.push(p.text);
      } else if (p.type === "image_url") {
        const url = imagePartUrl(p);
        if (url) images.push(url);
      }
    }
    return { text: out.filter(Boolean).join("\n"), images };
  }

  // src/chat/MessageBubble.tsx
  var actionButtonClass = cn(
    "shrink-0 cursor-pointer self-end rounded p-1",
    "text-text-tertiary hover:text-text-secondary hover:bg-midground/10",
    "opacity-0 transition-opacity group-hover/bubble:opacity-100",
    "focus-visible:opacity-100 focus-visible:outline-none"
  );
  function CopyButton({ text }) {
    const [copied, setCopied] = useState(false);
    if (!text) return null;
    const copy = () => {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }).catch(() => {
      });
    };
    return /* @__PURE__ */ jsx(
      "button",
      {
        type: "button",
        onClick: copy,
        "aria-label": "\u590D\u5236",
        title: "\u590D\u5236",
        className: actionButtonClass,
        children: copied ? /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5 text-success" }) : /* @__PURE__ */ jsx(Copy, { className: "h-3.5 w-3.5" })
      }
    );
  }
  function Avatar({
    role,
    src
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        "aria-hidden": true,
        className: cn(
          "flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full text-xs font-medium",
          role === "user" ? "bg-primary/15 text-primary" : "bg-success/15 text-success"
        ),
        children: role === "user" ? "\u6211" : src ? /* @__PURE__ */ jsx("img", { src, alt: "", className: "h-full w-full object-cover" }) : /* @__PURE__ */ jsx(Sparkles, { className: "h-5 w-5" })
      }
    );
  }
  var MessageBubble = memo(function MessageBubble2({
    msg,
    onRetry,
    onEdit,
    agentAvatarUrl
  }) {
    const { text, media } = useMemo(() => extractMediaFromText(msg.text), [msg.text]);
    const filePaths = useMemo(() => extractFilePaths(text), [text]);
    const historyImages = useMemo(
      () => (msg.images ?? []).flatMap((ref) => {
        if (ref.startsWith("data:")) return [{ kind: "image", dataUrl: ref }];
        const localPath = normalizeLocalPath(ref);
        return localPath ? [{ kind: "image", path: localPath }] : [];
      }),
      [msg.images]
    );
    const { open: openFilePath, modal: fileModal } = useFileOpener();
    if (msg.role === "system") {
      return /* @__PURE__ */ jsx("div", { className: "flex justify-center px-4 py-0.5", children: /* @__PURE__ */ jsx("span", { className: "max-w-[85%] rounded bg-muted px-2.5 py-1 text-center text-xs text-muted-foreground", children: msg.text }) });
    }
    if (msg.role === "tool") {
      return /* @__PURE__ */ jsx(ToolCard, { msg });
    }
    const isUser = msg.role === "user";
    const allMedia = historyImages.concat(media);
    const mediaPaths = [
      ...new Set(allMedia.map((m) => m.path).filter((p) => Boolean(p)))
    ];
    const chipPaths = mediaPaths.concat(filePaths);
    const showText = text.length > 0 || msg.streaming === true;
    const handleContentClick = (e) => {
      const anchor = e.target.closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href") ?? "";
      const localPath = normalizeLocalPath(href);
      if (!localPath) return;
      e.preventDefault();
      void openFilePath(localPath).catch(() => {
      });
    };
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "group/bubble flex items-end gap-2 px-2",
          isUser ? "flex-row-reverse" : "flex-row"
        ),
        children: [
          /* @__PURE__ */ jsx(Avatar, { role: isUser ? "user" : "assistant", src: agentAvatarUrl }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: cn(
                "flex max-w-[75%] min-w-0 flex-col gap-1",
                isUser ? "items-end" : "items-start"
              ),
              children: [
                showText && /* @__PURE__ */ jsx(
                  "div",
                  {
                    onClick: isUser ? void 0 : handleContentClick,
                    className: cn(
                      "min-w-0 rounded-2xl px-3.5 py-2",
                      isUser ? "rounded-br-sm bg-primary/15 text-foreground" : "rounded-bl-sm bg-midground/8 border border-current/10"
                    ),
                    children: isUser ? /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed whitespace-pre-wrap wrap-break-word", children: text }) : /* @__PURE__ */ jsx(Markdown, { content: text, streaming: msg.streaming, localFileLinks: true })
                  }
                ),
                !isUser && msg.reasoning && /* @__PURE__ */ jsx(ReasoningBlock, { text: msg.reasoning, streaming: msg.streaming }),
                allMedia.map((m, i) => /* @__PURE__ */ jsx(MediaInline, { media: m }, m.path ?? `img-${i}`)),
                chipPaths.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex max-w-full flex-wrap gap-1", children: chipPaths.map((p) => /* @__PURE__ */ jsx(FileChip2, { path: p }, p)) }),
                /* @__PURE__ */ jsx("span", { className: "px-1 text-[0.625rem] text-text-tertiary", children: formatBubbleTime(msg.timestamp) })
              ]
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-0.5", children: [
            /* @__PURE__ */ jsx(CopyButton, { text: msg.text }),
            onRetry && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onRetry(msg),
                "aria-label": "\u91CD\u8BD5",
                title: "\u91CD\u8BD5",
                className: actionButtonClass,
                children: /* @__PURE__ */ jsx(RotateCcw, { className: "h-3.5 w-3.5" })
              }
            ),
            onEdit && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => onEdit(msg),
                "aria-label": "\u7F16\u8F91",
                title: "\u7F16\u8F91",
                className: actionButtonClass,
                children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
              }
            )
          ] }),
          fileModal
        ]
      }
    );
  });

  // src/chat/MessageList.tsx
  var AT_BOTTOM_THRESHOLD = 80;
  var RENDER_WINDOW = 50;
  function MessageList({
    messages,
    emptyHint,
    onRetry,
    onEdit,
    agentAvatarUrl
  }) {
    const containerRef = useRef(null);
    const atBottomRef = useRef(true);
    const [atBottom, setAtBottom] = useState(true);
    const scrollToBottom = useCallback((smooth = false) => {
      const el = containerRef.current;
      if (!el) return;
      el.scrollTo({ top: el.scrollHeight, behavior: smooth ? "smooth" : "auto" });
    }, []);
    const onScroll = useCallback(() => {
      const el = containerRef.current;
      if (!el) return;
      const at = el.scrollHeight - el.scrollTop - el.clientHeight < AT_BOTTOM_THRESHOLD;
      atBottomRef.current = at;
      setAtBottom(at);
    }, []);
    const scrollRafRef = useRef(0);
    useEffect(() => {
      if (!atBottomRef.current || scrollRafRef.current) return;
      scrollRafRef.current = requestAnimationFrame(() => {
        scrollRafRef.current = 0;
        scrollToBottom();
      });
    }, [messages, scrollToBottom]);
    useEffect(
      () => () => cancelAnimationFrame(scrollRafRef.current),
      []
    );
    const lastAssistantId = useMemo(() => {
      for (let i = messages.length - 1; i >= 0; i--) {
        if (messages[i].role === "assistant") return messages[i].id;
      }
      return null;
    }, [messages]);
    const [windowSize, setWindowSize] = useState(RENDER_WINDOW);
    const hiddenCount = Math.max(0, messages.length - windowSize);
    const visibleMessages = hiddenCount > 0 ? messages.slice(hiddenCount) : messages;
    const prependAnchorRef = useRef(null);
    const loadEarlier = useCallback(() => {
      const el = containerRef.current;
      if (el) prependAnchorRef.current = el.scrollHeight - el.scrollTop;
      setWindowSize((n) => n + RENDER_WINDOW);
    }, []);
    useLayoutEffect(() => {
      const el = containerRef.current;
      if (!el || prependAnchorRef.current == null) return;
      el.scrollTop = el.scrollHeight - prependAnchorRef.current;
      prependAnchorRef.current = null;
    }, [windowSize]);
    return /* @__PURE__ */ jsxs("div", { className: "relative min-h-0 flex-1", children: [
      /* @__PURE__ */ jsx(
        "div",
        {
          ref: containerRef,
          onScroll,
          className: "flex h-full flex-col gap-3 overflow-y-auto overflow-x-hidden py-3",
          children: messages.length === 0 ? /* @__PURE__ */ jsx("div", { className: "flex flex-1 items-center justify-center px-4 text-center text-sm text-text-tertiary", children: emptyHint ?? "\u5F00\u59CB\u65B0\u7684\u5BF9\u8BDD\u5427" }) : /* @__PURE__ */ jsxs(Fragment2, { children: [
            hiddenCount > 0 && /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: loadEarlier,
                className: cn(
                  "rounded-full border border-current/15 bg-background-base px-3 py-1",
                  "text-xs text-text-secondary shadow-sm",
                  "cursor-pointer hover:text-foreground transition-colors"
                ),
                children: [
                  "\u52A0\u8F7D\u66F4\u65E9\u6D88\u606F\uFF08\u8FD8\u6709 ",
                  hiddenCount,
                  " \u6761\uFF09"
                ]
              }
            ) }),
            visibleMessages.map((m) => /* @__PURE__ */ jsx(
              MessageBubble,
              {
                msg: m,
                agentAvatarUrl,
                onRetry: onRetry && (m.role === "user" || m.id === lastAssistantId) ? onRetry : void 0,
                onEdit: onEdit && m.role === "user" ? onEdit : void 0
              },
              m.id
            ))
          ] })
        }
      ),
      !atBottom && /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => scrollToBottom(true),
          className: cn(
            "absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full",
            "border border-current/15 bg-background-base px-3 py-1.5",
            "text-xs text-text-secondary shadow-md",
            "cursor-pointer hover:text-foreground transition-colors"
          ),
          children: [
            /* @__PURE__ */ jsx(ArrowDown, { className: "h-3.5 w-3.5" }),
            "\u56DE\u5230\u5E95\u90E8"
          ]
        }
      )
    ] });
  }

  // src/chat/PendingPromptCard.tsx
  var APPROVAL_OPTIONS = [
    { value: "once", label: "\u5141\u8BB8\u4E00\u6B21" },
    { value: "session", label: "\u672C\u6B21\u4F1A\u8BDD\u5185\u5141\u8BB8" },
    { value: "always", label: "\u6C38\u4E45\u5141\u8BB8" },
    { value: "deny", label: "\u62D2\u7EDD", danger: true }
  ];
  var optionClass = (danger) => cn(
    "cursor-pointer rounded-lg border px-3 py-1.5 text-xs transition-colors",
    "disabled:cursor-not-allowed disabled:opacity-50",
    danger ? "border-destructive/40 text-destructive hover:bg-destructive/10" : "border-current/15 text-foreground hover:bg-midground/10"
  );
  function PendingPromptCard({
    prompt,
    busy,
    onClarify,
    onApproval
  }) {
    const [custom, setCustom] = useState("");
    const submitCustom = () => {
      const text = custom.trim();
      if (!text || busy) return;
      onClarify(text);
    };
    return /* @__PURE__ */ jsx("div", { className: "shrink-0 rounded-xl border border-primary/30 bg-background-base px-3 py-2.5 shadow-md", children: prompt.kind === "clarify" ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(CircleQuestionMark, { className: "mt-0.5 h-4 w-4 shrink-0 text-primary" }),
        /* @__PURE__ */ jsx("div", { className: "min-w-0 flex-1 text-sm whitespace-pre-wrap wrap-break-word", children: prompt.question })
      ] }),
      prompt.choices && prompt.choices.length > 0 && /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5 pl-6", children: prompt.choices.map((c) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled: busy,
          onClick: () => onClarify(c),
          className: optionClass(),
          children: c
        },
        c
      )) }),
      /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 pl-6", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: custom,
            onChange: (e) => setCustom(e.target.value),
            onKeyDown: (e) => {
              if (e.key === "Enter" && !e.nativeEvent.isComposing) {
                e.preventDefault();
                submitCustom();
              }
            },
            placeholder: prompt.choices?.length ? "\u5176\u4ED6\u56DE\u7B54\u2026" : "\u8F93\u5165\u56DE\u7B54\u2026",
            disabled: busy,
            className: cn(
              "min-w-0 flex-1 rounded-lg border border-current/15 bg-transparent",
              "px-2.5 py-1.5 text-xs outline-none focus:border-primary/50"
            )
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: busy || !custom.trim(),
            onClick: submitCustom,
            className: optionClass(),
            children: "\u53D1\u9001"
          }
        ),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            disabled: busy,
            onClick: () => onClarify(""),
            title: "\u4E0D\u56DE\u7B54\uFF0C\u8BA9\u6A21\u578B\u81EA\u884C\u51B3\u5B9A",
            className: optionClass(true),
            children: "\u8DF3\u8FC7"
          }
        )
      ] })
    ] }) : /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2", children: [
        /* @__PURE__ */ jsx(ShieldAlert, { className: "mt-0.5 h-4 w-4 shrink-0 text-amber-500" }),
        /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("div", { className: "text-sm font-medium", children: [
            "\u5DE5\u5177\u5BA1\u6279",
            prompt.smartDenied ? "\uFF08\u667A\u80FD\u5BA1\u6279\u5DF2\u62D2\u7EDD\uFF0C\u9700\u4EBA\u5DE5\u786E\u8BA4\uFF09" : ""
          ] }),
          /* @__PURE__ */ jsx("div", { className: "mt-0.5 text-xs text-text-secondary whitespace-pre-wrap wrap-break-word", children: prompt.description })
        ] })
      ] }),
      prompt.command && /* @__PURE__ */ jsx(
        "pre",
        {
          className: cn(
            "max-h-40 overflow-auto rounded bg-midground/5 px-2 py-1.5",
            "font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word",
            "text-text-secondary"
          ),
          children: prompt.command
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "flex flex-wrap gap-1.5", children: APPROVAL_OPTIONS.filter(
        (o) => (
          // Smart-DENY override is one-operation only; tirith content
          // warnings hide the permanent-allow option (backend rules).
          (!prompt.smartDenied || o.value === "once" || o.value === "deny") && (prompt.allowPermanent || o.value !== "always")
        )
      ).map((o) => /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          disabled: busy,
          onClick: () => onApproval(o.value),
          className: optionClass(o.danger),
          children: o.label
        },
        o.value
      )) })
    ] }) });
  }

  // src/chat/TodoPanel.tsx
  var STATUS_ORDER = ["in_progress", "pending", "completed", "cancelled"];
  function StatusIcon({ status }) {
    switch (status) {
      case "in_progress":
        return /* @__PURE__ */ jsx(LoaderCircle, { className: "h-3.5 w-3.5 shrink-0 animate-spin text-amber-400" });
      case "completed":
        return /* @__PURE__ */ jsx(CircleCheck, { className: "h-3.5 w-3.5 shrink-0 text-emerald-400" });
      case "cancelled":
        return /* @__PURE__ */ jsx(CircleSlash, { className: "h-3.5 w-3.5 shrink-0 text-text-tertiary" });
      default:
        return /* @__PURE__ */ jsx(Circle, { className: "h-3.5 w-3.5 shrink-0 text-text-tertiary" });
    }
  }
  function TodoPanel({ todos }) {
    const [open, setOpen] = useState(false);
    if (todos.length === 0) return null;
    const inProgress = todos.filter((t) => t.status === "in_progress");
    const pending = todos.filter((t) => t.status === "pending").length;
    const done = todos.filter((t) => t.status === "completed" || t.status === "cancelled").length;
    const sorted = [...todos].sort(
      (a, b) => STATUS_ORDER.indexOf(a.status) - STATUS_ORDER.indexOf(b.status)
    );
    return /* @__PURE__ */ jsxs(
      "div",
      {
        className: cn(
          "shrink-0 rounded-xl border border-current/10",
          "bg-muted/40 text-xs"
        ),
        children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => setOpen((v) => !v),
              "aria-expanded": open,
              className: cn(
                "flex w-full cursor-pointer items-center gap-1.5 px-2.5 py-1.5",
                "text-text-tertiary hover:text-text-secondary transition-colors"
              ),
              children: [
                open ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0" }),
                /* @__PURE__ */ jsx(ListTodo, { className: "h-3.5 w-3.5 shrink-0" }),
                /* @__PURE__ */ jsx("span", { className: "font-medium text-text-secondary", children: "\u4EFB\u52A1" }),
                /* @__PURE__ */ jsxs("span", { className: "text-text-tertiary", children: [
                  inProgress.length > 0 && `${inProgress.length} \u8FDB\u884C\u4E2D \xB7 `,
                  pending,
                  " \u5F85\u529E \xB7 ",
                  done,
                  " \u5B8C\u6210"
                ] })
              ]
            }
          ),
          open && /* @__PURE__ */ jsx("ul", { className: "max-h-40 space-y-1 overflow-y-auto border-t border-current/10 px-2.5 py-2", children: sorted.map((t) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5", children: [
            /* @__PURE__ */ jsx(StatusIcon, { status: t.status }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: cn(
                  "min-w-0 flex-1 break-words leading-snug",
                  t.status === "completed" && "text-text-tertiary line-through",
                  t.status === "cancelled" && "text-text-tertiary line-through opacity-70",
                  t.status === "in_progress" && "text-foreground",
                  t.status === "pending" && "text-text-secondary"
                ),
                children: t.content
              }
            )
          ] }, t.id)) })
        ]
      }
    );
  }

  // src/roles.ts
  var BASE = `${HERMES_BASE_PATH}/api/plugins/bubble-chat`;
  var rolesPromise = null;
  function fetchRoles() {
    if (!rolesPromise) {
      rolesPromise = fetchJSON(`${BASE}/roles`).then((list) => Array.isArray(list) ? list : []).catch(() => {
        rolesPromise = null;
        return [];
      });
    }
    return rolesPromise;
  }
  function invalidateRoles() {
    rolesPromise = null;
  }
  async function createRole(payload) {
    const role = await fetchJSON(`${BASE}/roles`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    invalidateRoles();
    return role;
  }
  function fetchRolePrompt(name) {
    return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/prompt`);
  }
  async function writeRolePrompt(name, content) {
    await fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/prompt`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
    invalidateRoles();
  }
  function fetchRoleMemory(name) {
    return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/memory`);
  }
  function fetchBaseFiles() {
    return fetchJSON(`${BASE}/roles/default/base-files`);
  }
  function readBaseFile(name) {
    return fetchJSON(
      `${BASE}/roles/default/base-file?name=${encodeURIComponent(name)}`
    );
  }
  async function writeBaseFile(name, content) {
    await fetchJSON(
      `${BASE}/roles/default/base-file?name=${encodeURIComponent(name)}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content })
      }
    );
  }
  async function writeRoleMemory(name, content) {
    await fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/memory`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content })
    });
  }
  function fetchRoleSkills(name) {
    return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/skills`);
  }
  function writeRoleSkills(name, text) {
    return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/skills`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text })
    });
  }
  async function lookupSessionProfile(sessionId) {
    try {
      const res = await fetchJSON(
        `${BASE}/roles/lookup?session_id=${encodeURIComponent(sessionId)}`
      );
      return res?.profile ?? null;
    } catch {
      return null;
    }
  }

  // src/router.ts
  function subscribeToLocation(onChange) {
    window.addEventListener("popstate", onChange);
    return () => window.removeEventListener("popstate", onChange);
  }
  function useLocationSearch() {
    const search = useSyncExternalStore(
      subscribeToLocation,
      () => window.location.search,
      () => ""
    );
    return useMemo(() => new URLSearchParams(search), [search]);
  }
  function setResumeParam(id) {
    const next = new URLSearchParams(window.location.search);
    if (id) next.set("resume", id);
    else next.delete("resume");
    const qs = next.toString();
    const url = `${HERMES_BASE_PATH}/chat${qs ? `?${qs}` : ""}`;
    window.history.pushState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // src/shared/ListItem.tsx
  var ListItem = forwardRef(
    function ListItem2({ active = false, children, className, type = "button", ...props }, ref) {
      return /* @__PURE__ */ jsx(
        "button",
        {
          className: cn(
            "group relative flex w-full items-center gap-2 px-3 py-2 text-left",
            "font-courier text-sm transition-colors cursor-pointer",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground/30",
            "disabled:cursor-not-allowed disabled:text-text-disabled",
            active ? "bg-midground/10 text-midground" : "text-text-secondary hover:text-midground hover:bg-midground/5",
            className
          ),
          "data-active": active || void 0,
          ref,
          type,
          ...props,
          children
        }
      );
    }
  );

  // src/ChatSessionList.tsx
  var SESSION_LIMIT = 30;
  var FAVORITES_KEY_PREFIX = "hermes.bubblechat.favorites.";
  function readFavorites(scope) {
    try {
      const raw = localStorage.getItem(FAVORITES_KEY_PREFIX + scope);
      const arr = raw ? JSON.parse(raw) : [];
      return new Set(
        Array.isArray(arr) ? arr.filter((x) => typeof x === "string") : []
      );
    } catch {
      return /* @__PURE__ */ new Set();
    }
  }
  function writeFavorites(scope, favs) {
    try {
      localStorage.setItem(FAVORITES_KEY_PREFIX + scope, JSON.stringify([...favs]));
    } catch {
    }
  }
  function rowLabel(session, untitled) {
    const title = session.title?.trim();
    if (title && title !== "Untitled") return title;
    const preview = session.preview?.trim();
    if (preview) return preview;
    return untitled;
  }
  var SOURCE_BADGES = {
    pet: "\u{1F43E}",
    tui: "\u2328\uFE0F",
    qqbot: "\u{1F427}",
    cron: "\u23F0"
  };
  function sourceBadge(source) {
    if (!source || source === "dashboard") return null;
    return SOURCE_BADGES[source] ?? null;
  }
  function ChatSessionListImpl({
    activeSessionId,
    profile,
    className,
    onPicked,
    onPickSession,
    onNewChat,
    manageable = false,
    onSessionDeleted,
    onCollapse
  }) {
    const { t } = useI18n();
    const [sessions, setSessions] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reloadNonce, setReloadNonce] = useState(0);
    const [query, setQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [renamingId, setRenamingId] = useState(null);
    const [renameValue, setRenameValue] = useState("");
    const [renameSaving, setRenameSaving] = useState(false);
    const [actionError, setActionError] = useState(null);
    const [selectMode, setSelectMode] = useState(false);
    const [selected, setSelected] = useState(/* @__PURE__ */ new Set());
    const [bulkBusy, setBulkBusy] = useState(false);
    const [showCron, setShowCron] = useState(false);
    const scopeKey = profile ?? "";
    const [favorites, setFavorites] = useState(
      () => manageable ? readFavorites(scopeKey) : /* @__PURE__ */ new Set()
    );
    useEffect(() => {
      setFavorites(manageable ? readFavorites(scopeKey) : /* @__PURE__ */ new Set());
    }, [manageable, scopeKey]);
    const toggleFavorite = useCallback(
      (id) => {
        setFavorites((prev) => {
          const next = new Set(prev);
          if (next.has(id)) next.delete(id);
          else next.add(id);
          writeFavorites(scopeKey, next);
          return next;
        });
      },
      [scopeKey]
    );
    const unstarMany = useCallback(
      (ids) => {
        setFavorites((prev) => {
          const next = new Set(prev);
          let changed = false;
          for (const id of ids) {
            if (next.delete(id)) changed = true;
          }
          if (changed) writeFavorites(scopeKey, next);
          return changed ? next : prev;
        });
      },
      [scopeKey]
    );
    const reqRef = useRef(0);
    const load = useCallback(() => {
      const myReq = ++reqRef.current;
      setLoading(true);
      setError(null);
      api.getSessions(
        SESSION_LIMIT,
        0,
        scopeKey,
        "recent",
        manageable ? showCron ? { source: "cron" } : { excludeSources: "cron" } : void 0
      ).then((res) => {
        if (reqRef.current !== myReq) return;
        setSessions(res.sessions);
      }).catch((e) => {
        if (reqRef.current !== myReq) return;
        setError(e.message || "failed to load sessions");
      }).finally(() => {
        if (reqRef.current === myReq) setLoading(false);
      });
    }, [scopeKey, manageable, showCron]);
    useEffect(() => {
      load();
    }, [load, reloadNonce]);
    const reload = useCallback(() => setReloadNonce((n) => n + 1), []);
    const searchReqRef = useRef(0);
    useEffect(() => {
      if (!manageable) return;
      const q = query.trim();
      if (!q) {
        setSearchResults(null);
        setSearching(false);
        return;
      }
      setSearching(true);
      const myReq = ++searchReqRef.current;
      const timer = setTimeout(() => {
        api.searchSessions(q, scopeKey).then((res) => {
          if (searchReqRef.current === myReq) setSearchResults(res.results);
        }).catch(() => {
          if (searchReqRef.current === myReq) setSearchResults([]);
        }).finally(() => {
          if (searchReqRef.current === myReq) setSearching(false);
        });
      }, 300);
      return () => clearTimeout(timer);
    }, [query, manageable, scopeKey]);
    const submitRename = useCallback(
      async (s) => {
        const value = renameValue.trim();
        setRenamingId(null);
        if (!value || value === (s.title ?? "").trim()) return;
        setRenameSaving(true);
        setActionError(null);
        try {
          await api.renameSession(s.id, value, scopeKey);
          setSessions(
            (prev) => prev?.map((it) => it.id === s.id ? { ...it, title: value } : it) ?? prev
          );
        } catch (e) {
          setActionError(e instanceof Error ? e.message : "\u91CD\u547D\u540D\u5931\u8D25");
        } finally {
          setRenameSaving(false);
        }
      },
      [renameValue, scopeKey]
    );
    const removeSession = useCallback(
      async (s) => {
        const label = rowLabel(s, t.sessions.untitledSession);
        if (!window.confirm(
          `${t.sessions.confirmDeleteTitle}
${label}
${t.sessions.confirmDeleteMessage}`
        )) {
          return;
        }
        setActionError(null);
        try {
          await api.deleteSession(s.id, scopeKey);
          setSessions((prev) => prev?.filter((it) => it.id !== s.id) ?? prev);
          unstarMany([s.id]);
          onSessionDeleted?.(s.id);
        } catch (e) {
          setActionError(
            e instanceof Error ? e.message : t.sessions.failedToDelete
          );
        }
      },
      [onSessionDeleted, scopeKey, t, unstarMany]
    );
    const exitSelectMode = useCallback(() => {
      setSelectMode(false);
      setSelected(/* @__PURE__ */ new Set());
    }, []);
    const toggleSelect = useCallback((id) => {
      setSelected((prev) => {
        const next = new Set(prev);
        if (next.has(id)) next.delete(id);
        else next.add(id);
        return next;
      });
    }, []);
    const allSelected = sessions != null && sessions.length > 0 && sessions.every((s) => selected.has(s.id));
    const toggleAll = useCallback(() => {
      setSelected((prev) => {
        const list = sessions ?? [];
        if (list.length > 0 && list.every((s) => prev.has(s.id))) return /* @__PURE__ */ new Set();
        return new Set(list.map((s) => s.id));
      });
    }, [sessions]);
    const bulkDelete = useCallback(async () => {
      const ids = [...selected];
      if (ids.length === 0 || bulkBusy) return;
      if (!window.confirm(
        `\u786E\u5B9A\u5220\u9664\u9009\u4E2D\u7684 ${ids.length} \u4E2A\u4F1A\u8BDD\uFF1F
\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002`
      )) {
        return;
      }
      setBulkBusy(true);
      setActionError(null);
      try {
        await api.bulkDeleteSessions(ids, scopeKey);
        setSessions(
          (prev) => prev?.filter((it) => !selected.has(it.id)) ?? prev
        );
        unstarMany(ids);
        ids.forEach((id) => onSessionDeleted?.(id));
        exitSelectMode();
        reload();
      } catch (e) {
        setActionError(e instanceof Error ? e.message : "\u6279\u91CF\u5220\u9664\u5931\u8D25");
      } finally {
        setBulkBusy(false);
      }
    }, [selected, bulkBusy, scopeKey, onSessionDeleted, exitSelectMode, reload, unstarMany]);
    const pick = useCallback(
      (id) => {
        onPicked?.();
        if (id === activeSessionId) return;
        onPickSession?.(id);
        setResumeParam(id);
      },
      [activeSessionId, onPicked, onPickSession]
    );
    const startNew = useCallback(() => {
      onPicked?.();
      if (onNewChat) {
        onNewChat();
        return;
      }
      setResumeParam(null);
    }, [onNewChat, onPicked]);
    const sortedSessions = useMemo(() => {
      if (!sessions) return sessions;
      return [...sessions].sort(
        (a, b) => Number(favorites.has(b.id)) - Number(favorites.has(a.id))
      );
    }, [sessions, favorites]);
    const visibleSearchResults = useMemo(() => {
      if (!manageable || !searchResults) return searchResults;
      return searchResults.filter(
        (r) => showCron ? r.source === "cron" : r.source !== "cron"
      );
    }, [manageable, searchResults, showCron]);
    const content = useMemo(() => {
      if (manageable && query.trim()) {
        if (searching && visibleSearchResults === null) {
          return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            " ",
            t.common.loading
          ] });
        }
        if (!visibleSearchResults || visibleSearchResults.length === 0) {
          return /* @__PURE__ */ jsx("div", { className: "px-2 py-6 text-center text-xs text-text-secondary", children: t.sessions.noMatch });
        }
        return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5", children: visibleSearchResults.map((r, i) => /* @__PURE__ */ jsxs(
          ListItem,
          {
            onClick: () => pick(r.session_id),
            "aria-current": r.session_id === activeSessionId ? "true" : void 0,
            className: cn(
              "flex-col items-start gap-0.5 rounded px-2 py-1.5",
              "normal-case tracking-normal",
              r.session_id === activeSessionId ? "bg-primary/10 text-foreground border-l-2 border-primary" : "text-text-secondary hover:bg-midground/5 hover:text-foreground"
            ),
            children: [
              /* @__PURE__ */ jsx("span", { className: "w-full truncate text-sm font-medium", children: r.snippet.replace(/\s+/g, " ").trim() || r.session_id }),
              /* @__PURE__ */ jsxs("span", { className: "flex w-full items-center gap-1.5 text-[0.6875rem] text-text-tertiary", children: [
                r.session_started != null && /* @__PURE__ */ jsx("span", { children: timeAgo(r.session_started) }),
                r.source && /* @__PURE__ */ jsxs(Fragment2, { children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "\xB7" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: r.source })
                ] })
              ] })
            ]
          },
          `${r.session_id}-${i}`
        )) });
      }
      if (loading && sessions === null) {
        return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary", children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          " ",
          t.common.loading
        ] });
      }
      if (error) {
        return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2 px-2 py-4 text-xs", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-2 text-destructive", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "mt-0.5 h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "wrap-break-word", children: error })
          ] }),
          /* @__PURE__ */ jsx(Button, { size: "sm", outlined: true, onClick: reload, prefix: /* @__PURE__ */ jsx(RefreshCw, {}), children: t.common.retry })
        ] });
      }
      if (!sessions || sessions.length === 0) {
        return /* @__PURE__ */ jsx("div", { className: "px-2 py-6 text-center text-xs text-text-secondary", children: t.sessions.noSessions });
      }
      return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5", children: (sortedSessions ?? []).map((s) => {
        const isActive = s.id === activeSessionId;
        const isFav = favorites.has(s.id);
        return /* @__PURE__ */ jsxs(
          ListItem,
          {
            onClick: () => selectMode ? toggleSelect(s.id) : pick(s.id),
            "aria-current": isActive ? "true" : void 0,
            className: cn(
              "group flex-col items-start gap-0.5 rounded px-2 py-1.5",
              "normal-case tracking-normal",
              isActive ? "bg-primary/10 text-foreground border-l-2 border-primary" : "text-text-secondary hover:bg-midground/5 hover:text-foreground"
            ),
            children: [
              manageable && renamingId === s.id ? /* @__PURE__ */ jsx(
                "input",
                {
                  autoFocus: true,
                  value: renameValue,
                  disabled: renameSaving,
                  "aria-label": "\u91CD\u547D\u540D",
                  onClick: (e) => e.stopPropagation(),
                  onChange: (e) => setRenameValue(e.target.value),
                  onKeyDown: (e) => {
                    e.stopPropagation();
                    if (e.key === "Enter") void submitRename(s);
                    if (e.key === "Escape") setRenamingId(null);
                  },
                  onBlur: () => setRenamingId(null),
                  className: "w-full rounded border border-current/20 bg-background-base px-1.5 py-0.5 text-sm focus:outline-none"
                }
              ) : /* @__PURE__ */ jsxs("span", { className: "flex w-full items-center gap-1.5", children: [
                manageable && selectMode && /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "checkbox",
                    checked: selected.has(s.id),
                    onChange: () => toggleSelect(s.id),
                    onClick: (e) => e.stopPropagation(),
                    "aria-label": `\u9009\u62E9 ${rowLabel(s, t.sessions.untitledSession)}`,
                    className: "h-3.5 w-3.5 shrink-0 cursor-pointer accent-primary"
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1 truncate text-sm font-medium", children: [
                  manageable && isFav && /* @__PURE__ */ jsx(
                    Star,
                    {
                      "aria-hidden": true,
                      className: "mr-1 inline h-3 w-3 fill-warning align-[-0.1em] text-warning"
                    }
                  ),
                  sourceBadge(s.source) && /* @__PURE__ */ jsx("span", { className: "mr-1", title: `\u6765\u6E90\uFF1A${s.source}`, children: sourceBadge(s.source) }),
                  rowLabel(s, t.sessions.untitledSession)
                ] }),
                manageable && !selectMode && /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: cn(
                      "flex shrink-0 items-center gap-0.5",
                      "opacity-0 transition-opacity group-hover:opacity-100",
                      "focus-within:opacity-100"
                    ),
                    children: [
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          "aria-label": isFav ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF",
                          title: isFav ? "\u53D6\u6D88\u6536\u85CF" : "\u6536\u85CF",
                          className: "cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-warning",
                          onClick: (e) => {
                            e.stopPropagation();
                            toggleFavorite(s.id);
                          },
                          children: /* @__PURE__ */ jsx(
                            Star,
                            {
                              className: cn(
                                "h-3.5 w-3.5",
                                isFav && "fill-warning text-warning"
                              )
                            }
                          )
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          "aria-label": "\u91CD\u547D\u540D",
                          title: "\u91CD\u547D\u540D",
                          className: "cursor-pointer rounded p-1 text-text-tertiary hover:bg-midground/10 hover:text-foreground",
                          onClick: (e) => {
                            e.stopPropagation();
                            setRenameValue(s.title?.trim() || "");
                            setRenamingId(s.id);
                          },
                          children: /* @__PURE__ */ jsx(Pencil, { className: "h-3.5 w-3.5" })
                        }
                      ),
                      /* @__PURE__ */ jsx(
                        "button",
                        {
                          type: "button",
                          "aria-label": t.common.delete,
                          title: t.common.delete,
                          className: "cursor-pointer rounded p-1 text-text-tertiary hover:bg-destructive/10 hover:text-destructive",
                          onClick: (e) => {
                            e.stopPropagation();
                            void removeSession(s);
                          },
                          children: /* @__PURE__ */ jsx(Trash2, { className: "h-3.5 w-3.5" })
                        }
                      )
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("span", { className: "flex w-full items-center gap-1.5 text-[0.6875rem] text-text-tertiary", children: [
                /* @__PURE__ */ jsx("span", { children: timeAgo(s.last_active) }),
                s.message_count > 0 && /* @__PURE__ */ jsxs(Fragment2, { children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "\xB7" }),
                  /* @__PURE__ */ jsxs("span", { children: [
                    s.message_count,
                    " msgs"
                  ] })
                ] }),
                s.source && s.source !== "cli" && /* @__PURE__ */ jsxs(Fragment2, { children: [
                  /* @__PURE__ */ jsx("span", { "aria-hidden": true, children: "\xB7" }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: s.source })
                ] })
              ] })
            ]
          },
          s.id
        );
      }) });
    }, [
      activeSessionId,
      error,
      favorites,
      loading,
      manageable,
      pick,
      query,
      reload,
      renameSaving,
      renameValue,
      renamingId,
      removeSession,
      searchResults,
      searching,
      selectMode,
      selected,
      sessions,
      sortedSessions,
      submitRename,
      t,
      toggleFavorite,
      toggleSelect,
      visibleSearchResults
    ]);
    return /* @__PURE__ */ jsxs(
      "aside",
      {
        className: cn(
          "flex h-full w-full min-w-0 shrink-0 flex-col overflow-hidden",
          className
        ),
        children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 px-2 pb-2", children: [
            /* @__PURE__ */ jsx("span", { className: "text-display text-xs tracking-wider text-text-tertiary", children: t.sessions.title }),
            /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
              manageable && !selectMode && sessions != null && sessions.length > 0 && /* @__PURE__ */ jsx(
                Button,
                {
                  ghost: true,
                  size: "icon",
                  onClick: () => setSelectMode(true),
                  "aria-label": "\u591A\u9009",
                  title: "\u591A\u9009",
                  className: "text-text-secondary hover:text-foreground",
                  children: /* @__PURE__ */ jsx(ListChecks, {})
                }
              ),
              /* @__PURE__ */ jsx(
                Button,
                {
                  ghost: true,
                  size: "icon",
                  onClick: reload,
                  "aria-label": t.common.refresh,
                  title: t.common.refresh,
                  className: "text-text-secondary hover:text-foreground",
                  children: /* @__PURE__ */ jsx(RefreshCw, { className: cn(loading && "animate-spin") })
                }
              ),
              onCollapse && /* @__PURE__ */ jsx(
                Button,
                {
                  ghost: true,
                  size: "icon",
                  onClick: onCollapse,
                  "aria-label": "\u6298\u53E0\u4F1A\u8BDD\u5217\u8868",
                  title: "\u6298\u53E0\u4F1A\u8BDD\u5217\u8868",
                  className: "text-text-secondary hover:text-foreground",
                  children: /* @__PURE__ */ jsx(PanelLeftClose, {})
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsx(
            Button,
            {
              outlined: true,
              size: "sm",
              onClick: startNew,
              prefix: /* @__PURE__ */ jsx(MessageSquarePlus, {}),
              className: "mx-2 mb-2 justify-center",
              children: t.sessions.newChat
            }
          ),
          manageable && /* @__PURE__ */ jsx(
            "div",
            {
              role: "tablist",
              "aria-label": "\u4F1A\u8BDD\u7C7B\u578B",
              className: "mx-2 mb-2 flex rounded-lg border border-current/15 text-xs",
              children: [
                { key: false, label: "\u5BF9\u8BDD", icon: MessageSquare },
                { key: true, label: "\u5B9A\u65F6", icon: Timer }
              ].map(({ key, label, icon: Icon2 }) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": showCron === key,
                  onClick: () => {
                    if (showCron === key) return;
                    exitSelectMode();
                    setShowCron(key);
                  },
                  className: cn(
                    "flex flex-1 cursor-pointer items-center justify-center gap-1 py-1.5",
                    "first:rounded-l-[0.45rem] last:rounded-r-[0.45rem]",
                    showCron === key ? "bg-primary/10 text-foreground" : "text-text-secondary hover:bg-midground/5 hover:text-foreground"
                  ),
                  children: [
                    /* @__PURE__ */ jsx(Icon2, { className: "h-3.5 w-3.5" }),
                    label
                  ]
                },
                label
              ))
            }
          ),
          manageable && /* @__PURE__ */ jsx("div", { className: "px-2 pb-2", children: /* @__PURE__ */ jsx(
            "input",
            {
              value: query,
              onChange: (e) => setQuery(e.target.value),
              placeholder: t.sessions.searchPlaceholder,
              "aria-label": t.common.search,
              className: cn(
                "w-full rounded-lg border border-current/15 bg-background-base",
                "px-2.5 py-1.5 text-sm placeholder:text-text-tertiary",
                "focus:border-current/30 focus:outline-none"
              )
            }
          ) }),
          manageable && selectMode && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1.5 px-2 pb-2 text-xs", children: [
            /* @__PURE__ */ jsxs("label", { className: "flex cursor-pointer items-center gap-1 text-text-secondary hover:text-foreground", children: [
              /* @__PURE__ */ jsx(
                "input",
                {
                  type: "checkbox",
                  checked: allSelected,
                  onChange: toggleAll,
                  "aria-label": "\u5168\u9009",
                  className: "h-3.5 w-3.5 cursor-pointer accent-primary"
                }
              ),
              "\u5168\u9009"
            ] }),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                disabled: selected.size === 0 || bulkBusy,
                onClick: () => void bulkDelete(),
                className: cn(
                  "cursor-pointer rounded px-1.5 py-0.5 text-destructive",
                  "hover:bg-destructive/10 disabled:cursor-not-allowed disabled:opacity-50"
                ),
                children: bulkBusy ? "\u5220\u9664\u4E2D\u2026" : `\u5220\u9664\u6240\u9009\uFF08${selected.size}\uFF09`
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: exitSelectMode,
                className: "ml-auto cursor-pointer rounded px-1.5 py-0.5 text-text-secondary hover:bg-midground/10 hover:text-foreground",
                children: "\u53D6\u6D88"
              }
            )
          ] }),
          actionError && /* @__PURE__ */ jsx("div", { className: "mx-2 mb-2 rounded-lg border border-destructive/30 bg-destructive/10 px-2.5 py-1.5 text-xs text-destructive wrap-break-word", children: actionError }),
          /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1 pb-1", children: content })
        ]
      }
    );
  }
  var ChatSessionList = memo(ChatSessionListImpl);

  // ../../../apps/shared/src/json-rpc-gateway.ts
  var ANY = "*";
  var DEFAULT_REQUEST_TIMEOUT_MS = 12e4;
  var DEFAULT_CONNECT_TIMEOUT_MS = 15e3;
  var JsonRpcGatewayClient = class {
    nextId = 0;
    pending = /* @__PURE__ */ new Map();
    socket = null;
    state = "idle";
    eventHandlers = /* @__PURE__ */ new Map();
    stateHandlers = /* @__PURE__ */ new Set();
    options;
    constructor(options = {}) {
      this.options = {
        closedErrorMessage: options.closedErrorMessage ?? "WebSocket closed",
        connectErrorMessage: options.connectErrorMessage ?? "WebSocket connection failed",
        connectTimeoutMs: options.connectTimeoutMs ?? DEFAULT_CONNECT_TIMEOUT_MS,
        createRequestId: options.createRequestId ?? ((nextId) => `${options.requestIdPrefix ?? "r"}${nextId}`),
        notConnectedErrorMessage: options.notConnectedErrorMessage ?? "gateway not connected",
        requestIdPrefix: options.requestIdPrefix ?? "r",
        requestTimeoutMs: options.requestTimeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS,
        socketFactory: options.socketFactory
      };
    }
    get connectionState() {
      return this.state;
    }
    async connect(wsUrl) {
      if (this.socket?.readyState === WebSocket.OPEN || this.state === "connecting") {
        return;
      }
      this.setState("connecting");
      const socket = this.options.socketFactory?.(wsUrl) ?? new WebSocket(wsUrl);
      this.socket = socket;
      socket.addEventListener("message", (message) => {
        if (this.socket !== socket) {
          return;
        }
        this.handleMessage(message.data);
      });
      socket.addEventListener("close", () => {
        if (this.socket !== socket) {
          return;
        }
        this.socket = null;
        this.setState("closed");
        this.rejectAllPending(new Error(this.options.closedErrorMessage));
      });
      await new Promise((resolve, reject) => {
        let settled = false;
        let timer;
        const cleanup = () => {
          if (timer !== void 0) {
            clearTimeout(timer);
          }
          socket.removeEventListener("open", onOpen);
          socket.removeEventListener("error", onError);
        };
        const onOpen = () => {
          if (settled || this.socket !== socket) {
            return;
          }
          settled = true;
          cleanup();
          this.setState("open");
          resolve();
        };
        const onError = () => {
          if (settled || this.socket !== socket) {
            return;
          }
          settled = true;
          cleanup();
          this.setState("error");
          reject(new Error(this.options.connectErrorMessage));
        };
        socket.addEventListener("open", onOpen, { once: true });
        socket.addEventListener("error", onError, { once: true });
        if (this.options.connectTimeoutMs > 0) {
          timer = setTimeout(() => {
            if (settled) {
              return;
            }
            settled = true;
            cleanup();
            if (this.socket === socket) {
              try {
                socket.close();
              } catch {
              }
              this.socket = null;
            }
            this.setState("error");
            reject(new Error(this.options.connectErrorMessage));
          }, this.options.connectTimeoutMs);
        }
      });
    }
    close() {
      const socket = this.socket;
      if (!socket) {
        return;
      }
      try {
        socket.close();
      } finally {
        this.socket = null;
        this.setState("closed");
        this.rejectAllPending(new Error(this.options.closedErrorMessage));
      }
    }
    on(type, handler) {
      let handlers = this.eventHandlers.get(type);
      if (!handlers) {
        handlers = /* @__PURE__ */ new Set();
        this.eventHandlers.set(type, handlers);
      }
      handlers.add(handler);
      return () => handlers?.delete(handler);
    }
    onAny(handler) {
      return this.on(ANY, handler);
    }
    onEvent(handler) {
      return this.onAny(handler);
    }
    onState(handler) {
      this.stateHandlers.add(handler);
      handler(this.state);
      return () => this.stateHandlers.delete(handler);
    }
    request(method, params = {}, timeoutMs = this.options.requestTimeoutMs, signal) {
      const socket = this.socket;
      if (!socket || socket.readyState !== WebSocket.OPEN) {
        return Promise.reject(new Error(this.options.notConnectedErrorMessage));
      }
      if (signal?.aborted) {
        return Promise.reject(new DOMException("Aborted", "AbortError"));
      }
      const id = this.options.createRequestId(++this.nextId);
      return new Promise((resolve, reject) => {
        let onAbort;
        const detach = () => {
          if (onAbort && signal) {
            signal.removeEventListener("abort", onAbort);
          }
        };
        const pending = {
          resolve: (value) => {
            detach();
            resolve(value);
          },
          reject: (error) => {
            detach();
            reject(error);
          }
        };
        if (timeoutMs > 0) {
          pending.timer = setTimeout(() => {
            if (this.pending.delete(id)) {
              detach();
              reject(new Error(`request timed out: ${method}`));
            }
          }, timeoutMs);
        }
        if (signal) {
          onAbort = () => {
            const call = this.pending.get(id);
            if (call?.timer) {
              clearTimeout(call.timer);
            }
            this.pending.delete(id);
            detach();
            reject(new DOMException("Aborted", "AbortError"));
          };
          signal.addEventListener("abort", onAbort, { once: true });
        }
        this.pending.set(id, pending);
        try {
          socket.send(
            JSON.stringify({
              jsonrpc: "2.0",
              id,
              method,
              params
            })
          );
        } catch (error) {
          this.clearPending(id);
          detach();
          reject(error instanceof Error ? error : new Error(String(error)));
        }
      });
    }
    handleMessage(raw) {
      const text = typeof raw === "string" ? raw : String(raw);
      let frame;
      try {
        frame = JSON.parse(text);
      } catch {
        return;
      }
      if (frame.id !== void 0 && frame.id !== null) {
        const call = this.pending.get(frame.id);
        if (!call) {
          return;
        }
        this.clearPending(frame.id);
        if (frame.error) {
          call.reject(new Error(frame.error.message || "Hermes RPC failed"));
        } else {
          call.resolve(frame.result);
        }
        return;
      }
      if (frame.method === "event" && frame.params?.type) {
        this.dispatchEvent(frame.params);
      }
    }
    clearPending(id) {
      const call = this.pending.get(id);
      if (call?.timer) {
        clearTimeout(call.timer);
      }
      this.pending.delete(id);
    }
    dispatchEvent(event) {
      for (const handler of this.eventHandlers.get(event.type) ?? []) {
        handler(event);
      }
      for (const handler of this.eventHandlers.get(ANY) ?? []) {
        handler(event);
      }
    }
    rejectAllPending(error) {
      for (const [id, call] of this.pending) {
        if (call.timer) {
          clearTimeout(call.timer);
        }
        call.reject(error);
        this.pending.delete(id);
      }
    }
    setState(state) {
      if (this.state === state) {
        return;
      }
      this.state = state;
      for (const handler of this.stateHandlers) {
        handler(state);
      }
    }
  };

  // ../../../apps/shared/src/websocket-url.ts
  function readWindowLocation() {
    if (typeof window === "undefined") {
      return { host: "", protocol: "http:" };
    }
    return { host: window.location.host, protocol: window.location.protocol };
  }
  function normalizeBasePath(basePath) {
    if (!basePath) {
      return "";
    }
    const withLead = basePath.startsWith("/") ? basePath : `/${basePath}`;
    return withLead.replace(/\/+$/, "");
  }
  function normalizeEndpointPath(path) {
    return path.startsWith("/") ? path : `/${path}`;
  }
  function buildHermesWebSocketUrl(options) {
    const loc = readWindowLocation();
    const protocol = options.protocol ?? loc.protocol;
    const host = options.host ?? loc.host;
    const wsScheme = protocol === "https:" || protocol === "wss:" ? "wss:" : "ws:";
    const qs = new URLSearchParams(options.params ?? {});
    if (options.authParam) {
      const [name, value] = options.authParam;
      qs.set(name, value);
    }
    const query = qs.toString();
    const suffix = query ? `?${query}` : "";
    return `${wsScheme}//${host}${normalizeBasePath(options.basePath)}${normalizeEndpointPath(options.path)}${suffix}`;
  }

  // src/gatewayClient.ts
  var GatewayClient = class extends JsonRpcGatewayClient {
    constructor() {
      super({
        closedErrorMessage: "WebSocket closed",
        connectErrorMessage: "WebSocket connection failed",
        notConnectedErrorMessage: "gateway not connected",
        requestIdPrefix: "w"
      });
    }
    async connect(token) {
      if (this.connectionState === "open" || this.connectionState === "connecting") {
        return;
      }
      const authParam = token ? ["token", token] : await buildWsAuthParam();
      if (!authParam[1]) {
        throw new Error(
          "Session token not available \u2014 page must be served by the Hermes dashboard server"
        );
      }
      await super.connect(
        buildHermesWebSocketUrl({
          authParam,
          basePath: HERMES_BASE_PATH,
          path: "/api/ws"
        })
      );
    }
  };

  // src/store.ts
  function asSlashDirective(raw) {
    if (!raw || typeof raw !== "object") return null;
    const r = raw;
    const str = (v) => typeof v === "string" ? v : void 0;
    switch (r.type) {
      case "exec":
      case "plugin":
        return { type: r.type, output: str(r.output) };
      case "alias":
        return typeof r.target === "string" ? { type: "alias", target: r.target } : null;
      case "skill":
        return typeof r.name === "string" ? { type: "skill", name: r.name, message: str(r.message) } : null;
      case "send":
        return typeof r.message === "string" ? { type: "send", message: r.message, notice: str(r.notice) } : null;
      case "prefill":
        return { type: "prefill", message: str(r.message), notice: str(r.notice) };
      default:
        return null;
    }
  }
  var IGNORED_EVENT_TYPES = /* @__PURE__ */ new Set([
    "gateway.ready",
    "session.info",
    "tool.progress",
    "skin.changed"
  ]);
  function parseToolArgs(raw) {
    if (!raw) return void 0;
    try {
      return JSON.parse(raw);
    } catch {
      return raw;
    }
  }
  function parseTodoList(raw) {
    let data = raw;
    if (typeof raw === "string") {
      try {
        data = JSON.parse(raw);
      } catch {
        return null;
      }
    }
    if (!data || typeof data !== "object") return null;
    const todos = data.todos;
    if (!Array.isArray(todos)) return null;
    return todos.filter((t) => !!t && typeof t === "object").map((t) => ({
      id: String(t.id ?? ""),
      content: String(t.content ?? ""),
      status: String(t.status ?? "pending")
    }));
  }
  function latestTodosFromHistory(messages) {
    for (let i = messages.length - 1; i >= 0; i--) {
      const m = messages[i];
      if (m.role === "tool" && m.tool_name === "todo") {
        const todos = parseTodoList(m.content);
        if (todos) return todos;
      }
    }
    return null;
  }
  function stringifyToolResult(result) {
    if (result == null) return void 0;
    if (typeof result === "string") return result;
    try {
      return JSON.stringify(result, null, 2);
    } catch {
      return String(result);
    }
  }
  function isErrorResult(result) {
    if (typeof result === "string") {
      return /^\s*(error[:\s]|错误[:：]|failed[:\s])/i.test(result);
    }
    if (result && typeof result === "object") {
      const err = result.error;
      return typeof err === "string" ? err.trim().length > 0 : Boolean(err);
    }
    return false;
  }
  function historyToChatMessages(msg, index) {
    const base = {
      timestamp: msg.timestamp ?? 0
    };
    const out = [];
    const { text, images } = decodeMessageContentParts(msg.content);
    if (msg.role === "tool") {
      out.push({
        ...base,
        id: `h${index}`,
        role: "tool",
        text: "",
        toolName: msg.tool_name ?? "tool",
        toolRunning: false,
        toolCallId: msg.tool_call_id,
        toolResult: text || void 0
      });
      return out;
    }
    const reasoning = msg.reasoning || msg.reasoning_content || msg.reasoning_details || void 0;
    out.push({
      ...base,
      id: `h${index}`,
      role: msg.role,
      text,
      reasoning: msg.role === "assistant" ? reasoning : void 0,
      images: images.length > 0 ? images : void 0
    });
    if (msg.role === "assistant" && msg.tool_calls) {
      msg.tool_calls.forEach((tc, i) => {
        out.push({
          ...base,
          id: `h${index}t${i}`,
          role: "tool",
          text: "",
          toolName: tc.function?.name ?? "tool",
          toolRunning: false,
          toolCallId: tc.id,
          toolArgs: parseToolArgs(tc.function?.arguments)
        });
      });
    }
    return out;
  }
  function mergeToolCards(messages) {
    const byCallId = /* @__PURE__ */ new Map();
    const out = [];
    for (const m of messages) {
      if (m.role === "tool" && m.toolCallId) {
        const existing = byCallId.get(m.toolCallId);
        if (existing) {
          existing.toolResult = m.toolResult ?? existing.toolResult;
          existing.toolArgs = existing.toolArgs ?? m.toolArgs;
          continue;
        }
        byCallId.set(m.toolCallId, m);
      }
      out.push(m);
    }
    return out;
  }
  function systemMessage(text) {
    return { id: messageId(), role: "system", text, timestamp: nowSeconds() };
  }
  var APPROVAL_CHOICE_LABELS = {
    once: "\u5141\u8BB8\u4E00\u6B21",
    session: "\u672C\u6B21\u4F1A\u8BDD\u5185\u5141\u8BB8",
    always: "\u6C38\u4E45\u5141\u8BB8",
    deny: "\u62D2\u7EDD"
  };
  var INITIAL_STATE = {
    connState: "idle",
    error: null,
    newChatNonce: 0,
    sessionReady: false,
    loadingHistory: false,
    generating: false,
    statusText: null,
    slashBusy: false,
    pendingPrompt: null,
    promptBusy: false,
    todos: [],
    messages: []
  };
  var BubbleChatStore = class _BubbleChatStore {
    state = INITIAL_STATE;
    listeners = /* @__PURE__ */ new Set();
    gw = null;
    /** Live gateway session id (session.create/resume result) — events and
     *  prompt.submit/interrupt all key on this, NOT the stored resume id. */
    liveSid = null;
    /** Spec the page last attached, and the spec the lifecycle last started
     *  for. Both serialise to the same key shape. */
    attachedKey = null;
    startedKey = null;
    attachedSpec = null;
    /** Monotonic token: only the latest session lifecycle run may commit. */
    sessionReq = 0;
    /** Assistant bubble currently receiving deltas. */
    streamingMsgId = null;
    /** tool_call_id → rendered tool-card message id. */
    toolCards = /* @__PURE__ */ new Map();
    /** Streaming delta 合帧：delta 以 20-50/s 到达，逐条 emit 会让订阅方
     *  （页面根组件）同频重渲染，长对话下足以触发 Firefox 的「此网页拖慢了
     *  您的 Firefox」警告。message.delta / reasoning.delta 的文本累积同步
     *  进 state（后续 delta 和 message.complete 读到的都是最新全文），但
     *  订阅通知合并到每个时间片最多一次，中间帧直接丢弃。 */
    streamFlushTimer = null;
    streamDirty = false;
    static STREAM_FLUSH_MS = 33;
    /* ---------------------------------------------------------------- */
    /*  Role context (sidebar two-level role UI)                         */
    /* ---------------------------------------------------------------- */
    /** Role the NEXT new chat is created under (a profile id; "" = default).
     *  Staged by the role view's 新建小对话 button, read by the create branch
     *  of the session lifecycle. Creation-time only — never applied to a
     *  live/resumed session (prompt caching is sacred). */
    newChatRole = "";
    /** Optional per-chat model pick from the role view's dropdown, with the
     *  provider slug resolved from the model.options payload (sending model
     *  without its provider makes the gateway resolve the model against the
     *  profile's DEFAULT provider → "API 没有找到" for foreign model ids). */
    newChatModel = "";
    newChatProvider = "";
    /** Role that owns the session being RESUMED ("" = default/management).
     *  Set when the user picks a row inside a role view; role sessions live
     *  in their own profile's state.db, so resume must bind that profile. */
    resumeRole = "";
    /** 新建小对话 (role view): stage the creation context and force the
     *  attach effect to spawn a fresh session. The page clears ?resume. */
    startNewChatInRole = (role, model = "", provider = "") => {
      this.newChatRole = role;
      this.newChatModel = model;
      this.newChatProvider = provider;
      this.emit({ newChatNonce: this.state.newChatNonce + 1 });
    };
    /** A plain fresh chat keeps the last staged role context (the role view
     *  the user is standing in) — same as picking 新建小对话 without
     *  touching the model dropdown. */
    bumpNewChatNonce = () => {
      this.emit({ newChatNonce: this.state.newChatNonce + 1 });
    };
    /** Session picked inside a role view: bind that role for the resume. */
    bindResumeRole = (role) => {
      this.resumeRole = role;
    };
    /** model.options RPC for the role view's model dropdown; null when the
     *  socket isn't open or the call fails (dropdown degrades to 默认 only).
     *  Cached for the page's lifetime — the catalog is disk-cached server
     *  side, and a failed fetch is not cached so the next open retries. */
    modelOptionsPromise = null;
    getModelOptions = () => {
      if (!this.modelOptionsPromise) {
        this.modelOptionsPromise = this.fetchModelOptions().catch(() => {
          this.modelOptionsPromise = null;
          return null;
        });
      }
      return this.modelOptionsPromise;
    };
    fetchModelOptions = async () => {
      const gw = this.gw;
      if (!gw || this.state.connState !== "open") return null;
      try {
        return await gw.request("model.options", {});
      } catch {
        return null;
      }
    };
    /* ---------------------------------------------------------------- */
    /*  Subscription (useSyncExternalStore contract)                     */
    /* ---------------------------------------------------------------- */
    subscribe = (fn) => {
      this.listeners.add(fn);
      return () => this.listeners.delete(fn);
    };
    getSnapshot = () => this.state;
    /** Watchdog: while generating, any silence longer than this surfaces a
     *  status hint instead of looking like the turn vanished (429 storms,
     *  dead turns with no terminal event — seen in production). */
    watchdogTimer = null;
    static WATCHDOG_MS = 45e3;
    armWatchdog() {
      if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
      this.watchdogTimer = setTimeout(() => {
        this.watchdogTimer = null;
        if (!this.state.generating) return;
        this.emit({
          statusText: "\u7B49\u5F85\u54CD\u5E94\u65F6\u95F4\u8F83\u957F\u2014\u2014\u53EF\u80FD\u88AB\u9650\u6D41\u6216\u56DE\u5408\u5F02\u5E38\uFF0C\u53EF\u70B9\u6D88\u606F\u7684\u91CD\u8BD5"
        });
      }, _BubbleChatStore.WATCHDOG_MS);
    }
    disarmWatchdog() {
      if (this.watchdogTimer) clearTimeout(this.watchdogTimer);
      this.watchdogTimer = null;
    }
    emit(partial) {
      this.state = { ...this.state, ...partial };
      if (partial.generating === true) this.armWatchdog();
      if (partial.generating === false) this.disarmWatchdog();
      for (const fn of this.listeners) {
        try {
          fn();
        } catch {
        }
      }
    }
    patchMessages(patch) {
      this.emit({ messages: patch(this.state.messages) });
    }
    patchStreamingBubble(patch) {
      const id = this.streamingMsgId;
      if (!id) return;
      this.patchMessages((prev) => prev.map((m) => m.id === id ? patch(m) : m));
    }
    /** 同步累积 streaming 气泡内容，但不立即通知订阅者——通知由合帧
     *  定时器按 STREAM_FLUSH_MS 节奏发出（见字段注释）。 */
    patchStreamingBubbleDeferred(patch) {
      const id = this.streamingMsgId;
      if (!id) return;
      this.state = {
        ...this.state,
        messages: this.state.messages.map((m) => m.id === id ? patch(m) : m)
      };
      this.streamDirty = true;
      if (!this.streamFlushTimer) {
        this.streamFlushTimer = setTimeout(() => {
          this.streamFlushTimer = null;
          if (!this.streamDirty) return;
          this.streamDirty = false;
          this.emit({});
        }, _BubbleChatStore.STREAM_FLUSH_MS);
      }
    }
    /** 回合收尾（complete/error）前调用：丢弃挂起的合帧通知——紧随其后
     *  的常规 emit 已携带最终累积状态。 */
    cancelStreamFlush() {
      if (this.streamFlushTimer) clearTimeout(this.streamFlushTimer);
      this.streamFlushTimer = null;
      this.streamDirty = false;
    }
    /* ---------------------------------------------------------------- */
    /*  Gateway lifecycle (connect once, reconnect on demand)            */
    /* ---------------------------------------------------------------- */
    ensureGateway() {
      if (!this.gw) {
        const gw = new GatewayClient();
        this.gw = gw;
        gw.onState((connState) => {
          this.emit({ connState });
          if (connState === "open") {
            this.maybeStartSession();
          } else if (connState === "closed" || connState === "error") {
            this.startedKey = null;
          }
        });
        gw.onAny((ev) => this.handleEvent(ev));
        queueMicrotask(() => this.connectGateway());
      }
      return this.gw;
    }
    /** (Re)connect the socket — also the error banner's 重新连接 action. */
    connectGateway = () => {
      const gw = this.ensureGateway();
      this.emit({ error: null });
      gw.connect().catch((e) => {
        this.emit({ error: e.message || "WebSocket \u8FDE\u63A5\u5931\u8D25" });
      });
    };
    /* ---------------------------------------------------------------- */
    /*  Session attach + lifecycle                                       */
    /* ---------------------------------------------------------------- */
    static keyOf(spec, nonce) {
      return `${spec.profile}${spec.resume ?? ""}${nonce}`;
    }
    /**
     * Attach the page to a conversation spec. Idempotent: re-attaching the
     * same key (e.g. a tab-switch remount) is a no-op, so the live session
     * and its messages survive. A changed key resets the per-session render
     * state and starts the lifecycle once the socket is open.
     */
    attach = (spec) => {
      this.ensureGateway();
      const key = _BubbleChatStore.keyOf(spec, this.state.newChatNonce);
      if (key === this.attachedKey) return;
      this.attachedKey = key;
      this.attachedSpec = spec;
      this.sessionReq += 1;
      this.liveSid = null;
      this.streamingMsgId = null;
      this.toolCards.clear();
      this.emit({
        sessionReady: false,
        loadingHistory: false,
        generating: false,
        statusText: null,
        pendingPrompt: null,
        promptBusy: false,
        todos: [],
        messages: []
      });
      this.maybeStartSession();
    };
    /** Run the session lifecycle when the socket is open and the attached
     *  spec hasn't been started yet. */
    maybeStartSession() {
      const spec = this.attachedSpec;
      if (!spec || this.state.connState !== "open") return;
      const key = this.attachedKey;
      if (!key || key === this.startedKey) return;
      this.startedKey = key;
      const gw = this.gw;
      if (!gw) return;
      const myReq = ++this.sessionReq;
      const isCurrent = () => this.sessionReq === myReq;
      this.liveSid = null;
      this.streamingMsgId = null;
      this.toolCards.clear();
      this.emit({
        sessionReady: false,
        generating: false,
        statusText: null,
        pendingPrompt: null,
        promptBusy: false,
        todos: [],
        messages: []
      });
      if (spec.resume) {
        void this.runResumeLifecycle(gw, spec, spec.resume, isCurrent);
      } else {
        const createProfile = spec.profile || this.newChatRole;
        gw.request("session.create", {
          source: "dashboard",
          ...createProfile ? { profile: createProfile } : {},
          ...this.newChatModel ? {
            model: this.newChatModel,
            ...this.newChatProvider ? { provider: this.newChatProvider } : {}
          } : {}
        }).then((res) => {
          if (!isCurrent()) return;
          this.liveSid = res.session_id;
          this.emit({ sessionReady: true });
        }).catch((e) => {
          if (!isCurrent()) return;
          this.emit({ error: e.message || "\u4F1A\u8BDD\u521B\u5EFA\u5931\u8D25" });
        });
      }
    }
    /** History REST load + live session.resume, binding the owning profile.
     *  Role sessions live in their own profile's state.db, so a resume that
     *  binds the wrong profile comes back "session not found" — look up the
     *  owner via the plugin backend and retry once (also covers a page
     *  reload, where the in-memory role binding is gone). */
    async runResumeLifecycle(gw, spec, resumeId, isCurrent) {
      this.emit({ loadingHistory: true });
      const attempt = async (profile) => {
        const [hist, resumed] = await Promise.all([
          api.getSessionMessages(resumeId, profile),
          gw.request("session.resume", {
            session_id: resumeId,
            ...profile ? { profile } : {}
          })
        ]);
        return { hist, resumed, profile };
      };
      try {
        let result;
        const firstProfile = this.resumeRole || spec.profile;
        try {
          result = await attempt(firstProfile);
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (!/session not found/i.test(msg)) throw e;
          const owner = await lookupSessionProfile(resumeId);
          const ownerProfile = owner === "default" ? "" : owner ?? "";
          if (!owner || ownerProfile === firstProfile) throw e;
          result = await attempt(ownerProfile);
        }
        if (!isCurrent()) return;
        this.resumeRole = result.profile;
        this.liveSid = result.resumed.session_id;
        this.emit({
          messages: mergeToolCards(
            result.hist.messages.flatMap(historyToChatMessages)
          ),
          // Hydrate the todo panel from the latest todo tool row (stored
          // results carry the full list as JSON).
          todos: latestTodosFromHistory(result.hist.messages) ?? [],
          // A session resumed mid-turn keeps its busy indicator.
          generating: result.resumed.running === true,
          sessionReady: true
        });
      } catch (e) {
        if (!isCurrent()) return;
        const msg = e instanceof Error ? e.message : String(e);
        this.emit({ error: msg || "\u4F1A\u8BDD\u6062\u590D\u5931\u8D25" });
      } finally {
        if (isCurrent()) this.emit({ loadingHistory: false });
      }
    }
    /* ---------------------------------------------------------------- */
    /*  Gateway event handling                                           */
    /* ---------------------------------------------------------------- */
    handleEvent(ev) {
      if (ev.session_id !== this.liveSid) return;
      if (this.state.generating) this.armWatchdog();
      const payload = ev.payload ?? {};
      switch (ev.type) {
        case "message.start": {
          const id = messageId();
          this.streamingMsgId = id;
          this.patchMessages((prev) => [
            ...prev,
            { id, role: "assistant", text: "", timestamp: nowSeconds(), streaming: true }
          ]);
          this.emit({ generating: true });
          break;
        }
        case "message.delta": {
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text) break;
          if (!this.streamingMsgId) {
            const id = messageId();
            this.streamingMsgId = id;
            this.patchMessages((prev) => [
              ...prev,
              { id, role: "assistant", text, timestamp: nowSeconds(), streaming: true }
            ]);
            break;
          }
          this.patchStreamingBubbleDeferred((m) => ({ ...m, text: m.text + text }));
          break;
        }
        case "reasoning.delta":
        case "thinking.delta": {
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text || !this.streamingMsgId) break;
          this.patchStreamingBubbleDeferred((m) => ({
            ...m,
            reasoning: (m.reasoning ?? "") + text
          }));
          break;
        }
        case "reasoning.available": {
          const text = typeof payload.text === "string" ? payload.text : "";
          if (!text) break;
          const fill = (m) => m.reasoning ? m : { ...m, reasoning: text };
          if (this.streamingMsgId) {
            this.patchStreamingBubble(fill);
            break;
          }
          this.patchMessages((prev) => {
            for (let i = prev.length - 1; i >= 0; i--) {
              if (prev[i].role === "assistant") {
                return prev.map((m, j) => j === i ? fill(m) : m);
              }
            }
            return prev;
          });
          break;
        }
        case "message.complete": {
          const finalText = typeof payload.text === "string" ? payload.text : null;
          this.cancelStreamFlush();
          this.patchStreamingBubble((m) => ({
            ...m,
            // The complete payload is authoritative; keep accumulated
            // deltas when the final text is empty (e.g. interrupted turn).
            text: finalText ? finalText : m.text,
            streaming: false
          }));
          this.streamingMsgId = null;
          this.emit({ generating: false, statusText: null });
          break;
        }
        case "tool.start": {
          const toolId = typeof payload.tool_id === "string" ? payload.tool_id : "";
          const name = typeof payload.name === "string" ? payload.name : "tool";
          const context = typeof payload.context === "string" && payload.context ? payload.context : void 0;
          const preview = typeof payload.preview === "string" && payload.preview ? payload.preview : void 0;
          const id = messageId();
          if (toolId) this.toolCards.set(toolId, id);
          this.patchMessages((prev) => [
            ...prev,
            {
              id,
              role: "tool",
              text: "",
              toolName: name,
              toolRunning: true,
              toolCallId: toolId || void 0,
              toolContext: context,
              toolResult: preview,
              timestamp: nowSeconds()
            }
          ]);
          break;
        }
        case "tool.complete": {
          const toolId = typeof payload.tool_id === "string" ? payload.tool_id : "";
          const name = typeof payload.name === "string" ? payload.name : "";
          if (name === "todo") {
            const todos = parseTodoList(payload.todos ?? payload.result);
            if (todos) this.emit({ todos });
          }
          const mid = this.toolCards.get(toolId);
          if (mid) {
            const resultText = stringifyToolResult(payload.result);
            const failed = isErrorResult(payload.result);
            const duration = typeof payload.duration_s === "number" ? payload.duration_s : void 0;
            const args = payload.args;
            this.patchMessages(
              (prev) => prev.map(
                (m) => m.id === mid ? {
                  ...m,
                  toolRunning: false,
                  toolArgs: args ?? m.toolArgs,
                  toolResult: resultText ?? m.toolResult,
                  toolError: failed,
                  toolDuration: duration
                } : m
              )
            );
            this.toolCards.delete(toolId);
          }
          break;
        }
        case "tool.generating": {
          const name = typeof payload.name === "string" ? payload.name : "tool";
          this.emit({ statusText: `\u6B63\u5728\u8C03\u7528 ${name}\u2026` });
          break;
        }
        case "status.update": {
          const text = typeof payload.text === "string" ? payload.text.trim() : "";
          this.emit({ statusText: text || null });
          break;
        }
        case "error": {
          const message = typeof payload.message === "string" ? payload.message : "\u672A\u77E5\u9519\u8BEF";
          this.cancelStreamFlush();
          this.patchStreamingBubble((m) => ({ ...m, streaming: false }));
          this.streamingMsgId = null;
          this.patchMessages((prev) => [...prev, systemMessage(`\u9519\u8BEF\uFF1A${message}`)]);
          this.emit({ generating: false, statusText: null });
          break;
        }
        case "approval.request": {
          this.emit({
            pendingPrompt: {
              kind: "approval",
              command: typeof payload.command === "string" ? payload.command : "",
              description: typeof payload.description === "string" && payload.description ? payload.description : "\u5371\u9669\u64CD\u4F5C",
              allowPermanent: payload.allow_permanent !== false,
              smartDenied: payload.smart_denied === true
            },
            statusText: "\u7B49\u5F85\u5BA1\u6279\u2026"
          });
          break;
        }
        case "clarify.request": {
          const requestId = typeof payload.request_id === "string" ? payload.request_id : "";
          if (!requestId) break;
          this.emit({
            pendingPrompt: {
              kind: "clarify",
              requestId,
              question: typeof payload.question === "string" ? payload.question : "",
              choices: Array.isArray(payload.choices) ? payload.choices.filter((c) => typeof c === "string") : null
            },
            statusText: "\u7B49\u5F85\u4F60\u7684\u56DE\u7B54\u2026"
          });
          break;
        }
        default: {
          if (IGNORED_EVENT_TYPES.has(ev.type)) break;
          this.patchMessages((prev) => [...prev, systemMessage(`[${ev.type}]`)]);
        }
      }
    }
    /* ---------------------------------------------------------------- */
    /*  Actions                                                          */
    /* ---------------------------------------------------------------- */
    sys(text) {
      this.patchMessages((prev) => [...prev, systemMessage(text)]);
    }
    /** Plain prompt.submit path: user bubble + generating state. */
    submitPrompt(text, images) {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid || !text) return;
      this.patchMessages((prev) => [
        ...prev,
        {
          id: messageId(),
          role: "user",
          text,
          // Echo the just-attached images in the user's own bubble (the
          // gateway's image.attach emits no event, so nothing else would
          // show them until a history reload).
          images: images && images.length > 0 ? images : void 0,
          timestamp: nowSeconds()
        }
      ]);
      this.emit({ generating: true });
      gw.request("prompt.submit", { session_id: sid, text }).catch((e) => {
        this.emit({ generating: false });
        this.sys(`\u53D1\u9001\u5931\u8D25\uFF1A${e.message || "\u672A\u77E5\u9519\u8BEF"}`);
      });
    }
    /**
     * Slash command path. prompt.submit does NOT parse leading slashes (the
     * text would reach the LLM verbatim), so "/..." messages go to slash.exec
     * instead. The response is either {output, warning?} (rendered as a
     * system bubble) or a command.dispatch directive: exec/plugin render
     * output, send/skill submit `message` as a normal turn (the turn's
     * message.start/… events arrive on their own), prefill (/undo) refills
     * the composer, alias re-executes the target.
     *
     * `/new` is handled by the PAGE (it owns the URL/nonce); the store only
     * sees commands that execute over the wire. `onPrefill` refills the
     * composer (page-local UI state).
     */
    async runSlash(text, onPrefill, depth = 0) {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) return;
      const m = /^\/(\S*)\s*(.*)$/.exec(text);
      const name = (m?.[1] ?? "").toLowerCase();
      const arg = (m?.[2] ?? "").trim();
      if (!name) {
        this.sys("\u7A7A\u547D\u4EE4");
        return;
      }
      this.emit({ slashBusy: true });
      try {
        const raw = await gw.request("slash.exec", {
          session_id: sid,
          command: text
        });
        const d = asSlashDirective(raw);
        if (!d) {
          const r = raw ?? {};
          const body = r.output?.trim() ? r.output : `/${name}\uFF1A\u65E0\u8F93\u51FA`;
          this.sys(r.warning ? `\u8B66\u544A\uFF1A${r.warning}
${body}` : body);
          return;
        }
        switch (d.type) {
          case "exec":
          case "plugin":
            this.sys(d.output?.trim() ? d.output : "(\u65E0\u8F93\u51FA)");
            break;
          case "alias":
            if (depth >= 3) {
              this.sys("\u547D\u4EE4\u522B\u540D\u5D4C\u5957\u8FC7\u6DF1");
              break;
            }
            await this.runSlash(`/${d.target}${arg ? ` ${arg}` : ""}`, onPrefill, depth + 1);
            break;
          case "skill": {
            const msgText = d.message?.trim() ?? "";
            if (!msgText) {
              this.sys(`/${name}\uFF1A\u6280\u80FD\u8F7D\u8377\u7F3A\u5C11\u6D88\u606F\u5185\u5BB9`);
              break;
            }
            this.sys(`\u26A1 \u52A0\u8F7D\u6280\u80FD\uFF1A${d.name}`);
            this.submitPrompt(msgText);
            break;
          }
          case "send": {
            if (d.notice?.trim()) this.sys(d.notice);
            const msgText = d.message.trim();
            if (!msgText) {
              this.sys(`/${name}\uFF1A\u7A7A\u6D88\u606F`);
              break;
            }
            this.submitPrompt(msgText);
            break;
          }
          case "prefill":
            if (d.notice?.trim()) this.sys(d.notice);
            if (d.message) onPrefill(d.message);
            break;
        }
      } catch (e) {
        this.sys(`\u547D\u4EE4\u5931\u8D25\uFF1A${e instanceof Error ? e.message : String(e)}`);
      } finally {
        this.emit({ slashBusy: false });
      }
    }
    /** Composer send. `onNew` handles /new client-side (page owns the URL);
     *  `onPrefill` refills the composer for /undo. */
    send = (text, images, hooks) => {
      if (!this.gw || !this.liveSid || !text) return;
      const firstToken = text.split(/\s/, 1)[0];
      const isSlashCommand = firstToken.startsWith("/") && !firstToken.slice(1).includes("/");
      if (isSlashCommand) {
        this.patchMessages((prev) => [
          ...prev,
          {
            id: messageId(),
            role: "user",
            text,
            images: images && images.length > 0 ? images : void 0,
            timestamp: nowSeconds()
          }
        ]);
        if (/^\/new(?:\s|$)/.test(text)) {
          hooks.onNew();
          return;
        }
        void this.runSlash(text, hooks.onPrefill);
        return;
      }
      this.submitPrompt(text, images);
    };
    interrupt = () => {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) return;
      this.emit({ pendingPrompt: null, statusText: null });
      gw.request("session.interrupt", { session_id: sid }).catch(() => {
      });
    };
    /** PendingPromptCard answer: clarify — empty answer means "skip". */
    answerClarify = (answer) => {
      const gw = this.gw;
      const cur = this.state.pendingPrompt;
      if (!gw || !cur || cur.kind !== "clarify") return;
      this.emit({ pendingPrompt: null, statusText: null, promptBusy: true });
      gw.request("clarify.respond", { request_id: cur.requestId, answer }).then(
        () => this.sys(
          answer ? `\u2753 ${cur.question}
\u2705 ${answer}` : `\u2753 ${cur.question}
\uFF08\u5DF2\u8DF3\u8FC7\uFF09`
        )
      ).catch((e) => this.sys(`\u56DE\u7B54\u63D0\u4EA4\u5931\u8D25\uFF1A${e.message || "\u672A\u77E5\u9519\u8BEF"}`)).finally(() => this.emit({ promptBusy: false }));
    };
    /** PendingPromptCard answer: approval — choice ∈ once|session|always|deny. */
    answerApproval = (choice) => {
      const gw = this.gw;
      const sid = this.liveSid;
      const cur = this.state.pendingPrompt;
      if (!gw || !sid || !cur || cur.kind !== "approval") return;
      this.emit({ pendingPrompt: null, statusText: null, promptBusy: true });
      gw.request("approval.respond", { session_id: sid, choice }).then(
        () => this.sys(
          `\u{1F6E1}\uFE0F \u5BA1\u6279\uFF1A${cur.description} \u2192 ${APPROVAL_CHOICE_LABELS[choice] ?? choice}`
        )
      ).catch((e) => this.sys(`\u5BA1\u6279\u63D0\u4EA4\u5931\u8D25\uFF1A${e.message || "\u672A\u77E5\u9519\u8BEF"}`)).finally(() => this.emit({ promptBusy: false }));
    };
    /** Bubble "retry": resubmit a user message's text (for the latest
     * assistant reply, the user text that prompted it). Interrupts the
     * current turn first when one is still streaming. */
    retryMessage = (msg, hooks) => {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) return;
      const messages = this.state.messages;
      let text = msg.role === "user" ? msg.text : "";
      if (msg.role !== "user") {
        const idx = messages.findIndex((m) => m.id === msg.id);
        for (let i = idx - 1; i >= 0; i--) {
          if (messages[i].role === "user" && messages[i].text.trim()) {
            text = messages[i].text;
            break;
          }
        }
      }
      text = text.trim();
      if (!text) {
        this.sys("\u6CA1\u6709\u53EF\u91CD\u8BD5\u7684\u7528\u6237\u6D88\u606F");
        return;
      }
      void (async () => {
        if (this.state.generating) {
          await gw.request("session.interrupt", { session_id: sid }).catch(() => {
          });
        }
        this.send(text, void 0, hooks);
      })();
    };
    /** Attach an already-uploaded image to the live session. The gateway
     *  queues it in session.attached_images and the next prompt.submit turn
     *  picks it up (this is the same path the TUI's /image command uses). */
    attachImage = async (path) => {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) throw new Error("\u4F1A\u8BDD\u672A\u5C31\u7EEA");
      await gw.request("image.attach", { session_id: sid, path });
    };
  };
  var bubbleChatStore = new BubbleChatStore();

  // src/RoleSidebar.tsx
  var persistedOpenRole = null;
  var EMPTY_DRAFT = {
    name: "",
    display_name: "",
    description: "",
    prompt: ""
  };
  function RoleListView({
    roles,
    loading,
    error,
    onReload,
    onOpen,
    onCreated,
    onCollapse
  }) {
    const [formOpen, setFormOpen] = useState(false);
    const [draft, setDraft] = useState(EMPTY_DRAFT);
    const [saving, setSaving] = useState(false);
    const [formError, setFormError] = useState(null);
    const submit = useCallback(async () => {
      const name = draft.name.trim();
      if (!name) {
        setFormError("\u8BF7\u586B\u5199\u89D2\u8272\u6807\u8BC6\uFF08\u5C0F\u5199\u5B57\u6BCD/\u6570\u5B57/-/_)");
        return;
      }
      setSaving(true);
      setFormError(null);
      try {
        const role = await createRole({
          name,
          display_name: draft.display_name.trim(),
          description: draft.description.trim(),
          prompt: draft.prompt.trim()
        });
        setFormOpen(false);
        setDraft(EMPTY_DRAFT);
        onCreated(role.name);
      } catch (e) {
        setFormError(e instanceof Error ? e.message : "\u521B\u5EFA\u5931\u8D25");
      } finally {
        setSaving(false);
      }
    }, [draft, onCreated]);
    const field = "w-full rounded-lg border border-current/15 bg-background-base px-2.5 py-1.5 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none";
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2 px-2 pb-2", children: [
        /* @__PURE__ */ jsx("span", { className: "text-display text-xs tracking-wider text-text-tertiary", children: "\u89D2\u8272" }),
        /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-0.5", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              size: "icon",
              onClick: onReload,
              "aria-label": "\u5237\u65B0",
              title: "\u5237\u65B0",
              className: "text-text-secondary hover:text-foreground",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: cn(loading && "animate-spin") })
            }
          ),
          onCollapse && /* @__PURE__ */ jsx(
            Button,
            {
              ghost: true,
              size: "icon",
              onClick: onCollapse,
              "aria-label": "\u6298\u53E0\u4F1A\u8BDD\u5217\u8868",
              title: "\u6298\u53E0\u4F1A\u8BDD\u5217\u8868",
              className: "text-text-secondary hover:text-foreground",
              children: /* @__PURE__ */ jsx(X, {})
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        Button,
        {
          outlined: true,
          size: "sm",
          onClick: () => {
            setFormError(null);
            setFormOpen((v) => !v);
          },
          prefix: /* @__PURE__ */ jsx(Plus, {}),
          className: "mx-2 mb-2 justify-center",
          children: "\u65B0\u5EFA\u89D2\u8272"
        }
      ),
      formOpen && /* @__PURE__ */ jsxs("div", { className: "mx-2 mb-2 flex flex-col gap-1.5 rounded-lg border border-current/10 p-2.5", children: [
        /* @__PURE__ */ jsx(
          "input",
          {
            value: draft.name,
            onChange: (e) => setDraft({ ...draft, name: e.target.value }),
            placeholder: "\u6807\u8BC6\uFF08\u5982 writer\uFF0C\u5C0F\u5199\u5B57\u6BCD/\u6570\u5B57/-/_\uFF09",
            "aria-label": "\u89D2\u8272\u6807\u8BC6",
            className: field
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: draft.display_name,
            onChange: (e) => setDraft({ ...draft, display_name: e.target.value }),
            placeholder: "\u663E\u793A\u540D\uFF08\u5982 \u5199\u4F5C\u52A9\u624B\uFF0C\u7559\u7A7A\u7528\u6807\u8BC6\uFF09",
            "aria-label": "\u663E\u793A\u540D",
            className: field
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            value: draft.description,
            onChange: (e) => setDraft({ ...draft, description: e.target.value }),
            placeholder: "\u4E00\u53E5\u8BDD\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09",
            "aria-label": "\u63CF\u8FF0",
            className: field
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            value: draft.prompt,
            onChange: (e) => setDraft({ ...draft, prompt: e.target.value }),
            placeholder: "\u63D0\u793A\u8BCD\uFF08\u5199\u5165 ROLE.md\uFF0C\u6CE8\u5165\u8BE5\u89D2\u8272\u7684\u7CFB\u7EDF\u63D0\u793A\uFF09",
            "aria-label": "\u63D0\u793A\u8BCD",
            rows: 4,
            className: cn(field, "resize-y")
          }
        ),
        formError && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: formError }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-end gap-1.5", children: [
          /* @__PURE__ */ jsx(Button, { ghost: true, size: "sm", onClick: () => setFormOpen(false), children: "\u53D6\u6D88" }),
          /* @__PURE__ */ jsx(Button, { size: "sm", disabled: saving, onClick: () => void submit(), children: saving ? "\u521B\u5EFA\u4E2D\u2026" : "\u521B\u5EFA" })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-1 pb-1", children: loading && roles === null ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 px-2 py-6 text-xs text-text-secondary", children: [
        /* @__PURE__ */ jsx(Spinner, {}),
        " \u52A0\u8F7D\u89D2\u8272\u2026"
      ] }) : error ? /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-start gap-2 px-2 py-4 text-xs", children: [
        /* @__PURE__ */ jsx("span", { className: "text-destructive wrap-break-word", children: error }),
        /* @__PURE__ */ jsx(Button, { size: "sm", outlined: true, onClick: onReload, prefix: /* @__PURE__ */ jsx(RefreshCw, {}), children: "\u91CD\u8BD5" })
      ] }) : !roles || roles.length === 0 ? /* @__PURE__ */ jsx("div", { className: "px-2 py-6 text-center text-xs text-text-secondary", children: "\u8FD8\u6CA1\u6709\u89D2\u8272" }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5", children: roles.map((r) => /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onOpen(r.name),
          className: cn(
            "group flex cursor-pointer items-center gap-2 rounded px-2 py-1.5 text-left",
            "text-text-secondary hover:bg-midground/5 hover:text-foreground"
          ),
          children: [
            /* @__PURE__ */ jsx(Bot, { className: "h-4 w-4 shrink-0 text-text-tertiary group-hover:text-foreground" }),
            /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
              /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-sm font-medium", children: [
                /* @__PURE__ */ jsx("span", { className: "truncate", children: r.display_name }),
                r.is_default && /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded bg-primary/10 px-1 py-px text-[0.625rem] text-primary", children: r.is_base ? "\u5E95\u5EA7" : "\u9ED8\u8BA4" })
              ] }),
              r.description && /* @__PURE__ */ jsx("span", { className: "block truncate text-[0.6875rem] text-text-tertiary", children: r.description })
            ] }),
            r.skill_count > 0 && /* @__PURE__ */ jsxs("span", { className: "shrink-0 rounded bg-midground/10 px-1.5 py-0.5 text-[0.625rem] text-text-tertiary", children: [
              r.skill_count,
              " \u6280\u80FD"
            ] }),
            /* @__PURE__ */ jsx(ChevronRight, { className: "h-3.5 w-3.5 shrink-0 text-text-tertiary" })
          ]
        },
        r.name
      )) }) })
    ] });
  }
  function providerForModel(payload, model) {
    for (const p of payload?.providers ?? []) {
      if ((p.models ?? []).includes(model)) return p.slug;
    }
    return "";
  }
  function BaseFilesSection() {
    const [files, setFiles] = useState(null);
    const [listError, setListError] = useState(null);
    const [openName, setOpenName] = useState(null);
    const [editor, setEditor] = useState(null);
    const loadList = useCallback(() => {
      setListError(null);
      fetchBaseFiles().then(setFiles).catch((e) => setListError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
    }, []);
    useEffect(() => {
      loadList();
    }, [loadList]);
    const toggle = useCallback(
      (name) => {
        if (openName === name) {
          setOpenName(null);
          setEditor(null);
          return;
        }
        setOpenName(name);
        setEditor({ name, text: "", dirty: false, busy: true, error: null });
        readBaseFile(name).then(
          (res) => setEditor({ name, text: res.content, dirty: false, busy: false, error: null })
        ).catch(
          (e) => setEditor({
            name,
            text: "",
            dirty: false,
            busy: false,
            error: e.message || "\u8BFB\u53D6\u5931\u8D25"
          })
        );
      },
      [openName]
    );
    const save = useCallback(async () => {
      if (!editor) return;
      setEditor({ ...editor, busy: true, error: null });
      try {
        await writeBaseFile(editor.name, editor.text);
        setEditor({ ...editor, dirty: false, busy: false, error: null });
        loadList();
      } catch (e) {
        setEditor({
          ...editor,
          busy: false,
          error: e instanceof Error ? e.message : "\u4FDD\u5B58\u5931\u8D25"
        });
      }
    }, [editor, loadList]);
    return /* @__PURE__ */ jsxs("div", { className: "mx-2 mb-2 rounded-lg border border-current/10 p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "pb-1.5", children: [
        /* @__PURE__ */ jsx("div", { className: "text-xs font-medium", children: "\u5E95\u5EA7\u6587\u4EF6" }),
        /* @__PURE__ */ jsx("div", { className: "text-[0.625rem] text-text-tertiary", children: "\u8FD9\u4E9B\u6587\u4EF6\u5BF9\u6240\u6709\u89D2\u8272\u751F\u6548" })
      ] }),
      listError ? /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: listError }) : !files ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
        /* @__PURE__ */ jsx(Spinner, {}),
        " \u52A0\u8F7D\u5E95\u5EA7\u6587\u4EF6\u2026"
      ] }) : /* @__PURE__ */ jsx("div", { className: "flex flex-col", children: files.map((f) => {
        const open = openName === f.name;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle(f.name),
              "aria-expanded": open,
              className: "flex w-full cursor-pointer items-center gap-1.5 rounded px-1 py-1 text-xs text-text-secondary hover:text-foreground",
              children: [
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "h-3 w-3 shrink-0 transition-transform",
                      !open && "-rotate-90"
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-mono", children: f.name }),
                !f.exists && /* @__PURE__ */ jsx("span", { className: "rounded bg-midground/10 px-1 py-px text-[0.625rem] text-text-tertiary", children: "\u672A\u521B\u5EFA" })
              ]
            }
          ),
          open && editor && editor.name === f.name && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 px-1 pb-1.5", children: [
            editor.busy && !editor.text ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
              /* @__PURE__ */ jsx(Spinner, {}),
              " \u8BFB\u53D6\u4E2D\u2026"
            ] }) : /* @__PURE__ */ jsx(
              "textarea",
              {
                value: editor.text,
                onChange: (e) => setEditor({ ...editor, text: e.target.value, dirty: true }),
                "aria-label": `\u7F16\u8F91 ${f.name}`,
                rows: 8,
                className: cn(
                  "w-full resize-y rounded-lg border border-current/15 bg-background-base",
                  "px-2 py-1.5 font-mono text-xs focus:border-current/30 focus:outline-none"
                )
              }
            ),
            editor.error && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: editor.error }),
            /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                disabled: editor.busy || !editor.dirty,
                onClick: () => void save(),
                children: editor.busy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
              }
            ) })
          ] })
        ] }, f.name);
      }) })
    ] });
  }
  function CollapsibleSection({
    title,
    badge,
    open,
    onToggle,
    dirty,
    actions,
    children
  }) {
    return /* @__PURE__ */ jsxs("div", { className: "mx-2 mb-2 rounded-lg border border-current/10 p-2", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onToggle,
            "aria-expanded": open,
            className: "flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-xs font-medium text-text-secondary hover:text-foreground",
            children: [
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: cn(
                    "h-3 w-3 shrink-0 transition-transform",
                    !open && "-rotate-90"
                  )
                }
              ),
              /* @__PURE__ */ jsx("span", { className: "shrink-0", children: title }),
              badge && /* @__PURE__ */ jsx("span", { className: "truncate text-[0.625rem] font-normal text-text-tertiary", children: badge }),
              dirty && /* @__PURE__ */ jsx(
                "span",
                {
                  className: "h-1.5 w-1.5 shrink-0 rounded-full bg-warning",
                  title: "\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539"
                }
              )
            ]
          }
        ),
        actions && /* @__PURE__ */ jsx("span", { className: "flex shrink-0 items-center gap-1.5", children: actions })
      ] }),
      open && /* @__PURE__ */ jsx("div", { className: "pt-1.5", children })
    ] });
  }
  function RoleView({
    role,
    roles,
    onBack,
    onRolesChanged,
    activeSessionId,
    onPicked,
    onSessionDeleted
  }) {
    const info = roles?.find((r) => r.name === role);
    const displayName = info?.display_name ?? role;
    const isDefault = role === "default";
    const profileId = isDefault ? "" : role;
    const [prompt, setPrompt] = useState(null);
    const [promptBusy, setPromptBusy] = useState(false);
    const [promptError, setPromptError] = useState(null);
    const [promptOpen, setPromptOpen] = useState(false);
    const promptLoadedRef = useRef(false);
    const [skills, setSkills] = useState(null);
    const [skillsText, setSkillsText] = useState(null);
    const [skillsDirty, setSkillsDirty] = useState(false);
    const [skillsBusy, setSkillsBusy] = useState(false);
    const [skillsError, setSkillsError] = useState(null);
    const [skillsUnmatched, setSkillsUnmatched] = useState([]);
    const [refOpen, setRefOpen] = useState(false);
    const [skillsOpen, setSkillsOpen] = useState(false);
    const skillsLoadedRef = useRef(false);
    const [memory, setMemory] = useState(null);
    const [memoryBusy, setMemoryBusy] = useState(false);
    const [memoryError, setMemoryError] = useState(null);
    const [memoryOpen, setMemoryOpen] = useState(false);
    const memoryLoadedRef = useRef(false);
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
        fetchRolePrompt(role).then((res) => setPrompt({ text: res.content, dirty: false })).catch((e) => setPromptError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
      }
    }, [promptOpen, role]);
    const toggleSkills = useCallback(() => {
      const open = !skillsOpen;
      setSkillsOpen(open);
      if (open && !skillsLoadedRef.current) {
        skillsLoadedRef.current = true;
        fetchRoleSkills(role).then((payload) => {
          setSkills(payload);
          setSkillsText(payload.content ?? payload.enabled.join("\n"));
          setSkillsUnmatched(payload.unmatched ?? []);
        }).catch((e) => setSkillsError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
      }
    }, [skillsOpen, role]);
    const toggleMemory = useCallback(() => {
      const open = !memoryOpen;
      setMemoryOpen(open);
      if (open && !memoryLoadedRef.current) {
        memoryLoadedRef.current = true;
        fetchRoleMemory(role).then((res) => setMemory({ text: res.content, dirty: false })).catch((e) => setMemoryError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
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
        setPromptError(e instanceof Error ? e.message : "\u4FDD\u5B58\u5931\u8D25");
      } finally {
        setPromptBusy(false);
      }
    }, [prompt, role, onRolesChanged]);
    const saveMemory = useCallback(async () => {
      if (!memory) return;
      setMemoryBusy(true);
      setMemoryError(null);
      try {
        await writeRoleMemory(role, memory.text);
        setMemory({ text: memory.text, dirty: false });
      } catch (e) {
        setMemoryError(e instanceof Error ? e.message : "\u4FDD\u5B58\u5931\u8D25");
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
        setSkillsText(res.content ?? res.enabled.join("\n"));
        setSkillsDirty(false);
        setSkillsUnmatched(res.unmatched ?? []);
      } catch (e) {
        setSkillsError(e instanceof Error ? e.message : "\u4FDD\u5B58\u5931\u8D25");
      } finally {
        setSkillsBusy(false);
      }
    }, [skillsText, role]);
    const [modelOptions, setModelOptions] = useState(null);
    const [model, setModel] = useState("");
    useEffect(() => {
      let live = true;
      bubbleChatStore.getModelOptions().then((payload) => {
        if (live && payload) setModelOptions(payload);
      });
      return () => {
        live = false;
      };
    }, []);
    const modelGroups = useMemo(() => {
      const groups = [];
      for (const p of modelOptions?.providers ?? []) {
        const models = (p.models ?? []).filter((m) => typeof m === "string" && !!m);
        if (models.length > 0) groups.push({ label: p.name || p.slug, models });
      }
      return groups;
    }, [modelOptions]);
    const createInRole = useCallback(() => {
      onPicked?.();
      const provider = model ? providerForModel(modelOptions, model) : "";
      setResumeParam(null);
      bubbleChatStore.startNewChatInRole(profileId, model, provider);
    }, [onPicked, model, modelOptions, profileId]);
    const textareaCls = cn(
      "w-full resize-y rounded-lg border border-current/15 bg-background-base",
      "px-2 py-1.5 font-mono text-xs focus:border-current/30 focus:outline-none"
    );
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-1 px-2 pb-2", children: [
        /* @__PURE__ */ jsx(
          Button,
          {
            ghost: true,
            size: "icon",
            onClick: onBack,
            "aria-label": "\u8FD4\u56DE\u89D2\u8272\u5217\u8868",
            title: "\u8FD4\u56DE\u89D2\u8272\u5217\u8868",
            className: "mt-0.5 shrink-0 text-text-secondary hover:text-foreground",
            children: /* @__PURE__ */ jsx(ArrowLeft, {})
          }
        ),
        /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
          /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5 text-sm font-medium", children: [
            /* @__PURE__ */ jsx("span", { className: "truncate", children: displayName }),
            isDefault && /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded bg-primary/10 px-1 py-px text-[0.625rem] text-primary", children: "\u5E95\u5EA7" })
          ] }),
          info?.description && /* @__PURE__ */ jsx("span", { className: "mt-0.5 block text-[0.6875rem] text-text-tertiary wrap-break-word", children: info.description })
        ] })
      ] }),
      isDefault ? /* @__PURE__ */ jsx(BaseFilesSection, {}) : (
        /* 提示词（ROLE.md） */
        /* @__PURE__ */ jsxs(
          CollapsibleSection,
          {
            title: "\u63D0\u793A\u8BCD",
            badge: "ROLE.md",
            open: promptOpen,
            onToggle: togglePrompt,
            dirty: prompt?.dirty,
            actions: /* @__PURE__ */ jsx(
              Button,
              {
                size: "sm",
                disabled: !prompt?.dirty || promptBusy,
                onClick: () => void savePrompt(),
                children: promptBusy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
              }
            ),
            children: [
              prompt === null ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
                /* @__PURE__ */ jsx(Spinner, {}),
                " \u52A0\u8F7D\u63D0\u793A\u8BCD\u2026"
              ] }) : /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: prompt.text,
                  onChange: (e) => setPrompt({ text: e.target.value, dirty: true }),
                  "aria-label": "\u63D0\u793A\u8BCD\uFF08ROLE.md\uFF09",
                  placeholder: "# \u89D2\u8272\u540D\n\n\u63CF\u8FF0\u4E0E\u63D0\u793A\u8BCD\u2026",
                  rows: 6,
                  className: textareaCls
                }
              ),
              promptError && /* @__PURE__ */ jsx("div", { className: "mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: promptError })
            ]
          }
        )
      ),
      /* @__PURE__ */ jsxs(
        CollapsibleSection,
        {
          title: "\u8BB0\u5FC6",
          badge: "MEMORY.md",
          open: memoryOpen,
          onToggle: toggleMemory,
          dirty: memory?.dirty,
          actions: /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              disabled: !memory?.dirty || memoryBusy,
              onClick: () => void saveMemory(),
              children: memoryBusy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
            }
          ),
          children: [
            memory === null ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
              /* @__PURE__ */ jsx(Spinner, {}),
              " \u52A0\u8F7D\u8BB0\u5FC6\u2026"
            ] }) : /* @__PURE__ */ jsx(
              "textarea",
              {
                value: memory.text,
                onChange: (e) => setMemory({ text: e.target.value, dirty: true }),
                "aria-label": "\u8BB0\u5FC6\uFF08MEMORY.md\uFF09",
                placeholder: "\u8BE5\u89D2\u8272\u7684\u957F\u671F\u8BB0\u5FC6\u2026",
                rows: 5,
                className: textareaCls
              }
            ),
            memoryError && /* @__PURE__ */ jsx("div", { className: "mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: memoryError })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        CollapsibleSection,
        {
          title: "\u6280\u80FD\u5217\u8868",
          badge: skills ? `\u542F\u7528 ${skills.enabled.length} \u4E2A\u6280\u80FD${skills.mode === "whitelist" && skills.whitelist_file === false ? "\uFF08\u540D\u5355\u6587\u4EF6\u672A\u5EFA\uFF0C\u4FDD\u5B58\u540E\u521B\u5EFA\uFF09" : ""}` : "\u542F\u7528\u6280\u80FD\u540D\u5355",
          open: skillsOpen,
          onToggle: toggleSkills,
          dirty: skillsDirty,
          actions: /* @__PURE__ */ jsx(
            Button,
            {
              size: "sm",
              disabled: !skillsDirty || skillsBusy,
              onClick: () => void saveSkills(),
              children: skillsBusy ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
            }
          ),
          children: [
            skillsText === null ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
              /* @__PURE__ */ jsx(Spinner, {}),
              " \u52A0\u8F7D\u6280\u80FD\u2026"
            ] }) : /* @__PURE__ */ jsx(
              "textarea",
              {
                value: skillsText,
                onChange: (e) => {
                  setSkillsText(e.target.value);
                  setSkillsDirty(true);
                },
                "aria-label": "\u542F\u7528\u7684\u6280\u80FD\u5217\u8868",
                placeholder: "\u6BCF\u884C\u4E00\u4E2A\u6280\u80FD\u540D\n# \u4E95\u53F7\u5F00\u5934\u4E3A\u6CE8\u91CA",
                rows: 5,
                className: textareaCls
              }
            ),
            skillsUnmatched.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-1.5 rounded-lg border border-warning/30 bg-warning/10 px-2 py-1 text-xs text-warning wrap-break-word", children: [
              "\u672A\u5339\u914D\uFF08\u5DF2\u5FFD\u7565\uFF09\uFF1A",
              skillsUnmatched.join("\u3001")
            ] }),
            skillsError && /* @__PURE__ */ jsx("div", { className: "mt-1.5 rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: skillsError }),
            skills && skills.available.length > 0 && /* @__PURE__ */ jsxs("div", { className: "mt-1.5", children: [
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setRefOpen((v) => !v),
                  "aria-expanded": refOpen,
                  className: "flex w-full cursor-pointer items-center gap-1 rounded px-1 py-1 text-[0.6875rem] text-text-tertiary hover:text-foreground",
                  children: [
                    /* @__PURE__ */ jsx(
                      ChevronDown,
                      {
                        className: cn("h-3 w-3 shrink-0 transition-transform", !refOpen && "-rotate-90")
                      }
                    ),
                    "\u53EF\u7528\u6280\u80FD\u53C2\u8003\uFF08",
                    skills.available.length,
                    "\uFF09"
                  ]
                }
              ),
              refOpen && /* @__PURE__ */ jsx("div", { className: "max-h-40 overflow-y-auto rounded-lg border border-current/10 py-0.5", children: skills.available.map((s) => /* @__PURE__ */ jsxs(
                "div",
                {
                  className: "truncate px-2 py-0.5 text-[0.6875rem] text-text-secondary",
                  title: s.description ? `${s.name} \u2014 ${s.description}` : s.name,
                  children: [
                    s.name,
                    s.source !== "role" && /* @__PURE__ */ jsx("span", { className: "ml-1 rounded bg-midground/10 px-1 py-px text-[0.625rem] text-text-tertiary", children: s.source === "shared" ? "\u5168\u5C40" : "\u5927\u5E93" }),
                    s.description && /* @__PURE__ */ jsxs("span", { className: "text-text-tertiary", children: [
                      " \u2014 ",
                      s.description.length > 60 ? `${s.description.slice(0, 60)}\u2026` : s.description
                    ] })
                  ]
                },
                `${s.source}:${s.name}`
              )) })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "mx-2 mb-2", children: /* @__PURE__ */ jsxs(
        "select",
        {
          value: model,
          onChange: (e) => setModel(e.target.value),
          onFocus: () => {
            if (!modelOptions) {
              bubbleChatStore.getModelOptions().then((p) => p && setModelOptions(p));
            }
          },
          "aria-label": "\u65B0\u5BF9\u8BDD\u6A21\u578B",
          title: "\u65B0\u5BF9\u8BDD\u4F7F\u7528\u7684\u6A21\u578B\uFF08\u9ED8\u8BA4 = \u5F53\u524D\u914D\u7F6E\uFF09",
          className: cn(
            "w-full rounded-lg border border-current/15 bg-background-base",
            "px-2.5 py-1.5 text-xs text-text-secondary focus:border-current/30 focus:outline-none"
          ),
          children: [
            /* @__PURE__ */ jsx("option", { value: "", children: "\u6A21\u578B\uFF1A\u9ED8\u8BA4\uFF08\u5F53\u524D\u914D\u7F6E\uFF09" }),
            modelGroups.map((g) => /* @__PURE__ */ jsx("optgroup", { label: g.label, children: g.models.map((m) => /* @__PURE__ */ jsx("option", { value: m, children: m }, `${g.label}/${m}`)) }, g.label))
          ]
        }
      ) }),
      /* @__PURE__ */ jsx(
        ChatSessionList,
        {
          activeSessionId,
          profile: profileId,
          onNewChat: createInRole,
          onPickSession: () => bubbleChatStore.bindResumeRole(profileId),
          onPicked,
          manageable: true,
          onSessionDeleted,
          className: "min-h-0 flex-1"
        }
      )
    ] });
  }
  function RoleSidebarImpl({
    activeSessionId,
    className,
    onPicked,
    onSessionDeleted,
    onCollapse
  }) {
    const [openRole, setOpenRoleState] = useState(() => persistedOpenRole);
    const [roles, setRoles] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [reloadNonce, setReloadNonce] = useState(0);
    const setOpenRole = useCallback((name) => {
      persistedOpenRole = name;
      setOpenRoleState(name);
    }, []);
    useEffect(() => {
      let live = true;
      setLoading(true);
      setError(null);
      fetchRoles().then((list) => {
        if (live) setRoles(list);
      }).catch(() => {
        if (live) setError("\u89D2\u8272\u5217\u8868\u52A0\u8F7D\u5931\u8D25");
      }).finally(() => {
        if (live) setLoading(false);
      });
      return () => {
        live = false;
      };
    }, [reloadNonce]);
    const reload = useCallback(() => setReloadNonce((n) => n + 1), []);
    const onCreated = useCallback(
      (name) => {
        reload();
        setOpenRole(name);
      },
      [reload, setOpenRole]
    );
    const onBack = useCallback(() => setOpenRole(null), [setOpenRole]);
    return /* @__PURE__ */ jsx(
      "aside",
      {
        className: cn(
          "flex h-full w-full min-w-0 shrink-0 flex-col overflow-hidden",
          className
        ),
        children: openRole === null ? /* @__PURE__ */ jsx(
          RoleListView,
          {
            roles,
            loading,
            error,
            onReload: reload,
            onOpen: setOpenRole,
            onCreated,
            onCollapse
          }
        ) : /* @__PURE__ */ jsx(
          RoleView,
          {
            role: openRole,
            roles,
            onBack,
            onRolesChanged: reload,
            activeSessionId,
            onPicked,
            onSessionDeleted
          }
        )
      }
    );
  }
  var RoleSidebar = memo(RoleSidebarImpl);

  // src/BubbleChatPage.tsx
  function BubbleChatPage() {
    const searchParams = useLocationSearch();
    const resumeParam = searchParams.get("resume");
    const scopedProfile = searchParams.get("profile") ?? "";
    const state = useSyncExternalStore(bubbleChatStore.subscribe, bubbleChatStore.getSnapshot);
    const [inject, setInject] = useState();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [sidebarCollapsed, setSidebarCollapsed] = useState(
      () => localStorage.getItem("hermes.bubblechat.sidebarCollapsed") === "1"
    );
    const chatBg = useChatBackground();
    const agentAvatar = useAgentAvatar();
    useEffect(() => {
      bubbleChatStore.attach({ profile: scopedProfile, resume: resumeParam });
    }, [scopedProfile, resumeParam, state.newChatNonce]);
    const startNewChat = useCallback(() => {
      setResumeParam(null);
      bubbleChatStore.bumpNewChatNonce();
    }, []);
    const onPrefill = useCallback(
      (message) => setInject({ text: message, nonce: Date.now() }),
      []
    );
    const send = useCallback(
      (text, images) => bubbleChatStore.send(text, images, { onNew: startNewChat, onPrefill }),
      [startNewChat, onPrefill]
    );
    const retryMessage = useCallback(
      (msg) => bubbleChatStore.retryMessage(msg, { onNew: startNewChat, onPrefill }),
      [startNewChat, onPrefill]
    );
    const editMessage = useCallback((msg) => {
      if (!msg.text) return;
      setInject({ text: msg.text, nonce: Date.now() });
    }, []);
    const handleSessionDeleted = useCallback(
      (id) => {
        if (id === resumeParam) startNewChat();
      },
      [resumeParam, startNewChat]
    );
    const closeDrawer = useCallback(() => setDrawerOpen(false), []);
    const toggleSidebar = useCallback(() => {
      setSidebarCollapsed((v) => {
        const next = !v;
        try {
          localStorage.setItem("hermes.bubblechat.sidebarCollapsed", next ? "1" : "0");
        } catch {
        }
        return next;
      });
    }, []);
    const connected = state.connState === "open";
    const composerDisabled = !connected || !state.sessionReady;
    const draftKey = resumeParam ?? "new";
    return (
      // `hermes-bubble-chat` is the CSS scope anchor: build.mjs prefixes every
      // emitted plugin rule with it so plugin utilities can never restyle host
      // chrome (see the scopeCss comment in build.mjs).
      /* @__PURE__ */ jsxs("div", { className: "hermes-bubble-chat flex min-h-0 flex-1 gap-2 pb-2", children: [
        sidebarCollapsed ? /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "hidden lg:flex w-10 shrink-0 min-h-0 flex-col items-center",
              "rounded-xl border border-current/10 py-2"
            ),
            children: /* @__PURE__ */ jsx(
              Button,
              {
                ghost: true,
                size: "icon",
                onClick: toggleSidebar,
                "aria-label": "\u5C55\u5F00\u4F1A\u8BDD\u5217\u8868",
                title: "\u5C55\u5F00\u4F1A\u8BDD\u5217\u8868",
                className: "text-text-secondary hover:text-foreground",
                children: /* @__PURE__ */ jsx(PanelLeftOpen, {})
              }
            )
          }
        ) : /* @__PURE__ */ jsx(
          "div",
          {
            className: cn(
              "hidden lg:flex w-60 shrink-0 min-h-0 flex-col",
              "rounded-xl border border-current/10 py-2"
            ),
            children: /* @__PURE__ */ jsx(
              RoleSidebar,
              {
                activeSessionId: resumeParam,
                onSessionDeleted: handleSessionDeleted,
                onCollapse: toggleSidebar
              }
            )
          }
        ),
        drawerOpen && /* @__PURE__ */ jsxs("div", { className: "fixed inset-0 z-50 lg:hidden", children: [
          /* @__PURE__ */ jsx(
            "div",
            {
              className: "absolute inset-0 bg-black/50",
              "aria-hidden": true,
              onClick: () => setDrawerOpen(false)
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex w-72 max-w-[85vw] flex-col border-r border-current/10 bg-background-base py-2 shadow-xl", children: /* @__PURE__ */ jsx(
            RoleSidebar,
            {
              activeSessionId: resumeParam,
              onPicked: closeDrawer,
              onSessionDeleted: handleSessionDeleted
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 min-h-0 flex-1 flex-col gap-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center", children: [
            /* @__PURE__ */ jsx("span", { className: "lg:hidden", children: /* @__PURE__ */ jsx(
              Button,
              {
                ghost: true,
                size: "icon",
                onClick: () => setDrawerOpen(true),
                "aria-label": "\u4F1A\u8BDD\u5217\u8868",
                title: "\u4F1A\u8BDD\u5217\u8868",
                children: /* @__PURE__ */ jsx(PanelLeft, {})
              }
            ) }),
            /* @__PURE__ */ jsx("span", { className: "ml-auto", children: /* @__PURE__ */ jsx(ChatBackgroundPicker, { bg: chatBg, profile: scopedProfile, avatar: agentAvatar }) })
          ] }),
          state.error && /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-xs text-destructive", children: [
            /* @__PURE__ */ jsx(CircleAlert, { className: "h-3.5 w-3.5 shrink-0" }),
            /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 wrap-break-word", children: state.error }),
            /* @__PURE__ */ jsx(
              Button,
              {
                ghost: true,
                size: "icon",
                onClick: bubbleChatStore.connectGateway,
                "aria-label": "\u91CD\u65B0\u8FDE\u63A5",
                title: "\u91CD\u65B0\u8FDE\u63A5",
                children: /* @__PURE__ */ jsx(RefreshCw, {})
              }
            )
          ] }),
          !connected && !state.error && /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 rounded-lg border border-current/10 bg-muted/40 px-3 py-2 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            state.connState === "connecting" ? "\u6B63\u5728\u8FDE\u63A5\u7F51\u5173\u2026" : "\u8FDE\u63A5\u5DF2\u65AD\u5F00",
            state.connState === "closed" && /* @__PURE__ */ jsx(Button, { ghost: true, size: "sm", onClick: bubbleChatStore.connectGateway, prefix: /* @__PURE__ */ jsx(RefreshCw, {}), children: "\u91CD\u65B0\u8FDE\u63A5" })
          ] }),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "relative flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl",
              style: chatBg.style,
              children: [
                chatBg.dim > 0 && /* @__PURE__ */ jsx(
                  "div",
                  {
                    "aria-hidden": true,
                    className: "pointer-events-none absolute inset-0",
                    style: { backgroundColor: `rgba(0, 0, 0, ${chatBg.dim / 100})` }
                  }
                ),
                state.loadingHistory ? /* @__PURE__ */ jsxs("div", { className: "flex min-h-0 flex-1 items-center justify-center gap-2 text-sm text-text-secondary", children: [
                  /* @__PURE__ */ jsx(Spinner, {}),
                  " \u52A0\u8F7D\u804A\u5929\u8BB0\u5F55\u2026"
                ] }) : /* @__PURE__ */ jsx(
                  MessageList,
                  {
                    messages: state.messages,
                    emptyHint: resumeParam ? "\u8FD9\u4E2A\u4F1A\u8BDD\u8FD8\u6CA1\u6709\u6D88\u606F" : "\u5F00\u59CB\u65B0\u7684\u5BF9\u8BDD\u5427",
                    onRetry: retryMessage,
                    onEdit: editMessage,
                    agentAvatarUrl: agentAvatar.url
                  }
                )
              ]
            }
          ),
          state.statusText && /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 px-1 text-xs text-text-tertiary", children: [
            /* @__PURE__ */ jsx("span", { className: "inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" }),
            /* @__PURE__ */ jsx("span", { className: "truncate", children: state.statusText })
          ] }),
          state.todos.length > 0 && /* @__PURE__ */ jsx(TodoPanel, { todos: state.todos }),
          state.pendingPrompt && /* @__PURE__ */ jsx(
            PendingPromptCard,
            {
              prompt: state.pendingPrompt,
              busy: state.promptBusy,
              onClarify: bubbleChatStore.answerClarify,
              onApproval: bubbleChatStore.answerApproval
            }
          ),
          /* @__PURE__ */ jsx(
            Composer,
            {
              draftKey,
              disabled: composerDisabled,
              generating: state.generating,
              busy: state.slashBusy,
              profile: scopedProfile,
              inject,
              onSend: send,
              onInterrupt: bubbleChatStore.interrupt,
              onAttachImage: bubbleChatStore.attachImage
            }
          )
        ] })
      ] })
    );
  }

  // src/index.tsx
  var registry = window.__HERMES_PLUGINS__;
  if (!registry) {
    console.warn("[bubble-chat] plugin registry is not available \u2014 not registering");
  } else {
    registry.register("bubble-chat", BubbleChatPage);
  }
})();
/*! Bundled license information:

lucide-react/dist/esm/shared/src/utils/mergeClasses.js:
lucide-react/dist/esm/shared/src/utils/toKebabCase.js:
lucide-react/dist/esm/shared/src/utils/toCamelCase.js:
lucide-react/dist/esm/shared/src/utils/toPascalCase.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/arrow-down.js:
lucide-react/dist/esm/icons/arrow-left.js:
lucide-react/dist/esm/icons/bot.js:
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/circle-alert.js:
lucide-react/dist/esm/icons/circle-check.js:
lucide-react/dist/esm/icons/circle-question-mark.js:
lucide-react/dist/esm/icons/circle-slash.js:
lucide-react/dist/esm/icons/circle.js:
lucide-react/dist/esm/icons/copy.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/file.js:
lucide-react/dist/esm/icons/folder.js:
lucide-react/dist/esm/icons/image-off.js:
lucide-react/dist/esm/icons/image-plus.js:
lucide-react/dist/esm/icons/image.js:
lucide-react/dist/esm/icons/list-checks.js:
lucide-react/dist/esm/icons/list-todo.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/message-square-plus.js:
lucide-react/dist/esm/icons/message-square.js:
lucide-react/dist/esm/icons/music.js:
lucide-react/dist/esm/icons/palette.js:
lucide-react/dist/esm/icons/panel-left-close.js:
lucide-react/dist/esm/icons/panel-left-open.js:
lucide-react/dist/esm/icons/panel-left.js:
lucide-react/dist/esm/icons/paperclip.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/rotate-ccw.js:
lucide-react/dist/esm/icons/send-horizontal.js:
lucide-react/dist/esm/icons/shield-alert.js:
lucide-react/dist/esm/icons/sparkles.js:
lucide-react/dist/esm/icons/square.js:
lucide-react/dist/esm/icons/star.js:
lucide-react/dist/esm/icons/terminal.js:
lucide-react/dist/esm/icons/timer.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/wrench.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.577.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
