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

  // ../../../node_modules/lucide-react/dist/esm/icons/check.js
  var __iconNode = [["path", { d: "M20 6 9 17l-5-5", key: "1gmf2c" }]];
  var Check = createLucideIcon("check", __iconNode);

  // ../../../node_modules/lucide-react/dist/esm/icons/chevron-down.js
  var __iconNode2 = [["path", { d: "m6 9 6 6 6-6", key: "qrunsl" }]];
  var ChevronDown = createLucideIcon("chevron-down", __iconNode2);

  // ../../../node_modules/lucide-react/dist/esm/icons/chevron-right.js
  var __iconNode3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
  var ChevronRight = createLucideIcon("chevron-right", __iconNode3);

  // ../../../node_modules/lucide-react/dist/esm/icons/clipboard-paste.js
  var __iconNode4 = [
    ["path", { d: "M11 14h10", key: "1w8e9d" }],
    ["path", { d: "M16 4h2a2 2 0 0 1 2 2v1.344", key: "1e62lh" }],
    ["path", { d: "m17 18 4-4-4-4", key: "z2g111" }],
    ["path", { d: "M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 1.793-1.113", key: "bjbb7m" }],
    ["rect", { x: "8", y: "2", width: "8", height: "4", rx: "1", key: "ublpy" }]
  ];
  var ClipboardPaste = createLucideIcon("clipboard-paste", __iconNode4);

  // ../../../node_modules/lucide-react/dist/esm/icons/copy.js
  var __iconNode5 = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  var Copy = createLucideIcon("copy", __iconNode5);

  // ../../../node_modules/lucide-react/dist/esm/icons/external-link.js
  var __iconNode6 = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  var ExternalLink = createLucideIcon("external-link", __iconNode6);

  // ../../../node_modules/lucide-react/dist/esm/icons/eye.js
  var __iconNode7 = [
    [
      "path",
      {
        d: "M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0",
        key: "1nclc0"
      }
    ],
    ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }]
  ];
  var Eye = createLucideIcon("eye", __iconNode7);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-clock.js
  var __iconNode8 = [
    [
      "path",
      {
        d: "M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85",
        key: "ryk6xj"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M8 14v2.2l1.6 1", key: "6m4bie" }],
    ["circle", { cx: "8", cy: "16", r: "6", key: "10v15b" }]
  ];
  var FileClock = createLucideIcon("file-clock", __iconNode8);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-code.js
  var __iconNode9 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 12.5 8 15l2 2.5", key: "1tg20x" }],
    ["path", { d: "m14 12.5 2 2.5-2 2.5", key: "yinavb" }]
  ];
  var FileCode = createLucideIcon("file-code", __iconNode9);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-headphone.js
  var __iconNode10 = [
    [
      "path",
      {
        d: "M4 6.835V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-.343",
        key: "1vfytu"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    [
      "path",
      {
        d: "M2 19a2 2 0 0 1 4 0v1a2 2 0 0 1-4 0v-4a6 6 0 0 1 12 0v4a2 2 0 0 1-4 0v-1a2 2 0 0 1 4 0",
        key: "1etmh7"
      }
    ]
  ];
  var FileHeadphone = createLucideIcon("file-headphone", __iconNode10);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-image.js
  var __iconNode11 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["circle", { cx: "10", cy: "12", r: "2", key: "737tya" }],
    ["path", { d: "m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22", key: "wt3hpn" }]
  ];
  var FileImage = createLucideIcon("file-image", __iconNode11);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-play.js
  var __iconNode12 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    [
      "path",
      {
        d: "M15.033 13.44a.647.647 0 0 1 0 1.12l-4.065 2.352a.645.645 0 0 1-.968-.56v-4.704a.645.645 0 0 1 .967-.56z",
        key: "1tzo1f"
      }
    ]
  ];
  var FilePlay = createLucideIcon("file-play", __iconNode12);

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
  var File = createLucideIcon("file", __iconNode14);

  // ../../../node_modules/lucide-react/dist/esm/icons/folder-open.js
  var __iconNode15 = [
    [
      "path",
      {
        d: "m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2",
        key: "usdka0"
      }
    ]
  ];
  var FolderOpen = createLucideIcon("folder-open", __iconNode15);

  // ../../../node_modules/lucide-react/dist/esm/icons/folder-tree.js
  var __iconNode16 = [
    [
      "path",
      {
        d: "M20 10a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-2.5a1 1 0 0 1-.8-.4l-.9-1.2A1 1 0 0 0 15 3h-2a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
        key: "hod4my"
      }
    ],
    [
      "path",
      {
        d: "M20 21a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1h-2.9a1 1 0 0 1-.88-.55l-.42-.85a1 1 0 0 0-.92-.6H13a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1Z",
        key: "w4yl2u"
      }
    ],
    ["path", { d: "M3 5a2 2 0 0 0 2 2h3", key: "f2jnh7" }],
    ["path", { d: "M3 3v13a2 2 0 0 0 2 2h3", key: "k8epm1" }]
  ];
  var FolderTree = createLucideIcon("folder-tree", __iconNode16);

  // ../../../node_modules/lucide-react/dist/esm/icons/folder.js
  var __iconNode17 = [
    [
      "path",
      {
        d: "M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z",
        key: "1kt360"
      }
    ]
  ];
  var Folder = createLucideIcon("folder", __iconNode17);

  // ../../../node_modules/lucide-react/dist/esm/icons/hard-drive.js
  var __iconNode18 = [
    ["path", { d: "M10 16h.01", key: "1bzywj" }],
    [
      "path",
      {
        d: "M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z",
        key: "18tbho"
      }
    ],
    ["path", { d: "M21.946 12.013H2.054", key: "zqlbp7" }],
    ["path", { d: "M6 16h.01", key: "1pmjb7" }]
  ];
  var HardDrive = createLucideIcon("hard-drive", __iconNode18);

  // ../../../node_modules/lucide-react/dist/esm/icons/layout-grid.js
  var __iconNode19 = [
    ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
    ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
    ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
    ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
  ];
  var LayoutGrid = createLucideIcon("layout-grid", __iconNode19);

  // ../../../node_modules/lucide-react/dist/esm/icons/layout-dashboard.js
  var __iconNode20 = [
    ["rect", { width: "7", height: "9", x: "3", y: "3", rx: "1", key: "10lvy0" }],
    ["rect", { width: "7", height: "5", x: "14", y: "3", rx: "1", key: "16une8" }],
    ["rect", { width: "7", height: "9", x: "14", y: "12", rx: "1", key: "1hutg5" }],
    ["rect", { width: "7", height: "5", x: "3", y: "16", rx: "1", key: "ldoo1y" }]
  ];
  var LayoutDashboard = createLucideIcon("layout-dashboard", __iconNode20);

  // ../../../node_modules/lucide-react/dist/esm/icons/list.js
  var __iconNode21 = [
    ["path", { d: "M3 5h.01", key: "18ugdj" }],
    ["path", { d: "M3 12h.01", key: "nlz23k" }],
    ["path", { d: "M3 19h.01", key: "noohij" }],
    ["path", { d: "M8 5h13", key: "1pao27" }],
    ["path", { d: "M8 12h13", key: "1za7za" }],
    ["path", { d: "M8 19h13", key: "m83p4d" }]
  ];
  var List = createLucideIcon("list", __iconNode21);

  // ../../../node_modules/lucide-react/dist/esm/icons/notebook-pen.js
  var __iconNode22 = [
    ["path", { d: "M13.4 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7.4", key: "re6nr2" }],
    ["path", { d: "M2 6h4", key: "aawbzj" }],
    ["path", { d: "M2 10h4", key: "l0bgd4" }],
    ["path", { d: "M2 14h4", key: "1gsvsf" }],
    ["path", { d: "M2 18h4", key: "1bu2t1" }],
    [
      "path",
      {
        d: "M21.378 5.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z",
        key: "pqwjuv"
      }
    ]
  ];
  var NotebookPen = createLucideIcon("notebook-pen", __iconNode22);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-close.js
  var __iconNode23 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
  ];
  var PanelLeftClose = createLucideIcon("panel-left-close", __iconNode23);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-open.js
  var __iconNode24 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
  ];
  var PanelLeftOpen = createLucideIcon("panel-left-open", __iconNode24);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-right-close.js
  var __iconNode25 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }],
    ["path", { d: "m8 9 3 3-3 3", key: "12hl5m" }]
  ];
  var PanelRightClose = createLucideIcon("panel-right-close", __iconNode25);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-right-open.js
  var __iconNode26 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M15 3v18", key: "14nvp0" }],
    ["path", { d: "m10 15-3-3 3-3", key: "1pgupc" }]
  ];
  var PanelRightOpen = createLucideIcon("panel-right-open", __iconNode26);

  // ../../../node_modules/lucide-react/dist/esm/icons/pen-line.js
  var __iconNode27 = [
    ["path", { d: "M13 21h8", key: "1jsn5i" }],
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ]
  ];
  var PenLine = createLucideIcon("pen-line", __iconNode27);

  // ../../../node_modules/lucide-react/dist/esm/icons/pencil.js
  var __iconNode28 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  var Pencil = createLucideIcon("pencil", __iconNode28);

  // ../../../node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode29 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("refresh-cw", __iconNode29);

  // ../../../node_modules/lucide-react/dist/esm/icons/rss.js
  var __iconNode30 = [
    ["path", { d: "M4 11a9 9 0 0 1 9 9", key: "pv89mb" }],
    ["path", { d: "M4 4a16 16 0 0 1 16 16", key: "k0647b" }],
    ["circle", { cx: "5", cy: "19", r: "1", key: "bfqh0e" }]
  ];
  var Rss = createLucideIcon("rss", __iconNode30);

  // ../../../node_modules/lucide-react/dist/esm/icons/save.js
  var __iconNode31 = [
    [
      "path",
      {
        d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
        key: "1c8476"
      }
    ],
    ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
    ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
  ];
  var Save = createLucideIcon("save", __iconNode31);

  // ../../../node_modules/lucide-react/dist/esm/icons/scissors.js
  var __iconNode32 = [
    ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
    ["path", { d: "M8.12 8.12 12 12", key: "1alkpv" }],
    ["path", { d: "M20 4 8.12 15.88", key: "xgtan2" }],
    ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
    ["path", { d: "M14.8 14.8 20 20", key: "ptml3r" }]
  ];
  var Scissors = createLucideIcon("scissors", __iconNode32);

  // ../../../node_modules/lucide-react/dist/esm/icons/search.js
  var __iconNode33 = [
    ["path", { d: "m21 21-4.34-4.34", key: "14j7rj" }],
    ["circle", { cx: "11", cy: "11", r: "8", key: "4ej97u" }]
  ];
  var Search = createLucideIcon("search", __iconNode33);

  // ../../../node_modules/lucide-react/dist/esm/icons/send.js
  var __iconNode34 = [
    [
      "path",
      {
        d: "M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z",
        key: "1ffxy3"
      }
    ],
    ["path", { d: "m21.854 2.147-10.94 10.939", key: "12cjpa" }]
  ];
  var Send = createLucideIcon("send", __iconNode34);

  // ../../../node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode35 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode35);

  // ../../../node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode36 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode36);

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
  var cn = (...classes) => sdk().utils.cn(...classes);
  var useI18n = () => sdk().useI18n();
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

  // src/shared/Toast.tsx
  function Toast({ toast }) {
    const [visible, setVisible] = useState(false);
    const [current, setCurrent] = useState(toast);
    useEffect(() => {
      if (toast) {
        setCurrent(toast);
        setVisible(true);
      } else {
        setVisible(false);
        const timer = setTimeout(() => setCurrent(null), 200);
        return () => clearTimeout(timer);
      }
    }, [toast]);
    if (!current) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        "aria-live": "polite",
        className: cn(
          "fixed top-16 right-4 z-50 border px-4 py-2.5 font-courier text-xs tracking-wider uppercase backdrop-blur-sm",
          current.type === "success" ? "bg-success/15 text-success border-success/30" : "bg-destructive/15 text-destructive border-destructive/30"
        ),
        role: "status",
        style: {
          animation: visible ? "toast-in 200ms ease-out forwards" : "toast-out 200ms ease-in forwards"
        },
        children: current.message
      }
    );
  }
  function useToast(duration = 3e3) {
    const [toast, setToast] = useState(null);
    const timerRef = useRef(null);
    useEffect(() => {
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }, []);
    const showToast = useCallback(
      (message, type) => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setToast({ message, type });
        timerRef.current = setTimeout(() => setToast(null), duration);
      },
      [duration]
    );
    return { showToast, toast };
  }

  // src/shared/usePageHeader.ts
  function usePageHeader() {
    return {
      setTitle: () => {
      },
      setAfterTitle: () => {
      },
      setEnd: () => {
      }
    };
  }

  // src/router.ts
  function getLibraryPathParam() {
    return new URLSearchParams(window.location.search).get("path");
  }
  function replaceLibraryPathParam(path) {
    const url = `${HERMES_BASE_PATH}/library?path=${encodeURIComponent(path)}`;
    window.history.replaceState(null, "", url);
  }
  function navigateToChat(sessionId) {
    const url = `${HERMES_BASE_PATH}/chat?resume=${encodeURIComponent(sessionId)}`;
    window.history.pushState(null, "", url);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }

  // src/library/api.ts
  function feedItemToFileEntry(item) {
    return {
      name: item.name,
      path: item.path,
      size: item.size,
      mtime: item.mtime,
      ext: "md",
      preview_kind: "md"
    };
  }
  function feedBranchOf(roots, path) {
    if (!path) return null;
    for (const root of roots) {
      if (!path.startsWith(root.path + "/")) continue;
      const rel = path.slice(root.path.length + 1);
      if (rel.includes("/")) continue;
      const policy = root.branches[rel];
      if (policy?.type === "feed") return rel;
    }
    return null;
  }
  function feedDirOf(feedDirs, path) {
    if (!path) return null;
    const norm = path.replace(/\/+$/, "");
    return feedDirs.some((d) => d.replace(/\/+$/, "") === norm) ? path : null;
  }
  var libraryApi = {
    getConfig: () => fetchJSON(
      "/api/plugins/library/config"
    ),
    getTree: (path) => fetchJSON(
      `/api/plugins/library/tree?path=${encodeURIComponent(path)}`
    ),
    getFileInfo: (path) => fetchJSON(
      `/api/plugins/library/file?path=${encodeURIComponent(path)}`
    ),
    getOverview: () => fetchJSON("/api/plugins/library/overview"),
    search: (q, limit = 50) => fetchJSON(
      `/api/plugins/library/search?q=${encodeURIComponent(q)}&limit=${limit}`
    ),
    sync: () => fetchJSON("/api/plugins/library/sync", { method: "POST" }),
    getFeed: (path) => fetchJSON(
      `/api/plugins/library/feed?path=${encodeURIComponent(path)}`
    ),
    setFeedStatus: (path, status) => fetchJSON("/api/plugins/library/feed/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, status })
    }),
    markFeed: (path) => fetchJSON(
      "/api/plugins/library/feed/mark",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path })
      }
    ),
    unmarkFeed: (path) => fetchJSON(
      "/api/plugins/library/feed/unmark",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path })
      }
    ),
    createFeedNote: (path) => fetchJSON("/api/plugins/library/feed/note", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path })
    }),
    getNote: (path) => fetchJSON(
      `/api/plugins/library/note?path=${encodeURIComponent(path)}`
    ),
    saveNote: (path, content) => fetchJSON("/api/plugins/library/note/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, content })
    }),
    getNoteLinks: (path) => fetchJSON(
      `/api/plugins/library/note/links?path=${encodeURIComponent(path)}`
    ),
    // ── 文件管理（删除/重命名/粘贴/转发到对话） ──
    deleteEntries: (paths) => fetchJSON("/api/plugins/library/file/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths })
    }),
    renameEntry: (path, newName) => fetchJSON("/api/plugins/library/file/rename", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path, new_name: newName })
    }),
    pasteEntries: (paths, destDir, mode) => fetchJSON("/api/plugins/library/file/paste", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paths, dest_dir: destDir, mode })
    }),
    forwardToChat: (req) => fetchJSON("/api/plugins/library/file/forward", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        path: req.path,
        session_id: req.sessionId,
        note: req.note
      })
    })
  };
  async function fetchLibraryBlobUrl(endpoint, path, extra) {
    const qs = new URLSearchParams({ path, ...extra });
    const res = await authedFetch(`/api/plugins/library/${endpoint}?${qs.toString()}`);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return URL.createObjectURL(await res.blob());
  }
  async function resolveLibraryUrl(endpoint, path, extra) {
    return { url: await fetchLibraryBlobUrl(endpoint, path, extra), revoke: true };
  }
  async function fetchLibraryText(path) {
    const res = await authedFetch(
      `/api/plugins/library/preview?path=${encodeURIComponent(path)}`
    );
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res.text();
  }

  // src/library/format.ts
  function formatBytes(size) {
    if (size === null || size === void 0 || Number.isNaN(size)) return "-";
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(2)} GB`;
  }
  var DATE_TIME_FORMAT = new Intl.DateTimeFormat("zh-CN", {
    dateStyle: "medium",
    timeStyle: "short"
  });
  function formatDateTime(ts) {
    if (!ts) return "-";
    return DATE_TIME_FORMAT.format(new Date(ts * 1e3));
  }
  function formatTimeAgo(ts) {
    const delta = Date.now() / 1e3 - ts;
    if (delta < 60) return "\u521A\u521A";
    if (delta < 3600) return `${Math.floor(delta / 60)} \u5206\u949F\u524D`;
    if (delta < 86400) return `${Math.floor(delta / 3600)} \u5C0F\u65F6\u524D`;
    if (delta < 172800) return "\u6628\u5929";
    if (delta < 30 * 86400) return `${Math.floor(delta / 86400)} \u5929\u524D`;
    return formatDateTime(ts);
  }
  var PREVIEW_KIND_LABEL = {
    image: "\u56FE\u7247",
    video: "\u89C6\u9891",
    audio: "\u97F3\u9891",
    pdf: "PDF",
    office: "Office \u6587\u6863",
    text: "\u6587\u672C",
    md: "Markdown",
    none: "\u5176\u4ED6"
  };
  var PREVIEW_KIND_COLOR = {
    image: "text-emerald-400",
    video: "text-green-400",
    audio: "text-amber-400",
    pdf: "text-red-400",
    office: "text-blue-400",
    text: "text-zinc-400",
    md: "text-purple-400",
    none: "text-text-tertiary"
  };
  function parentDir(path) {
    const idx = path.lastIndexOf("/");
    return idx > 0 ? path.slice(0, idx) : "/";
  }

  // src/library/LibraryTree.tsx
  function LibraryTree({ roots, currentPath, refreshKey, onNavigate }) {
    const [children, setChildren] = useState({});
    const [expanded, setExpanded] = useState(/* @__PURE__ */ new Set());
    const [loading, setLoading] = useState(/* @__PURE__ */ new Set());
    const [error, setError] = useState(null);
    const childrenRef = useRef({});
    childrenRef.current = children;
    const revealedRef = useRef(null);
    const loadChildren = useCallback(async (path) => {
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
      (path) => {
        if (!childrenRef.current[path]) void loadChildren(path);
      },
      [loadChildren]
    );
    const toggle = useCallback(
      (path) => {
        setExpanded((prev) => {
          const next = new Set(prev);
          if (next.has(path)) next.delete(path);
          else next.add(path);
          return next;
        });
        ensureChildren(path);
      },
      [ensureChildren]
    );
    useEffect(() => {
      if (roots.length === 0) return;
      setExpanded((prev) => {
        const next = new Set(prev);
        for (const r of roots) next.add(r.path);
        return next;
      });
      for (const r of roots) ensureChildren(r.path);
    }, [roots, ensureChildren]);
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
    }, [refreshKey]);
    useEffect(() => {
      if (!currentPath || roots.length === 0) return;
      if (revealedRef.current === currentPath) return;
      revealedRef.current = currentPath;
      const root = roots.find(
        (r) => currentPath === r.path || currentPath.startsWith(r.path + "/")
      );
      if (!root) return;
      const ancestors = [root.path];
      if (currentPath !== root.path) {
        const rel = currentPath.slice(root.path.length + 1).split("/");
        let acc = root.path;
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
    const renderDir = (dir, depth) => {
      const isExpanded = expanded.has(dir.path);
      const isCurrent = currentPath === dir.path;
      const isLoading = loading.has(dir.path);
      const kids = children[dir.path];
      return /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "group flex min-w-0 items-center gap-1 rounded-sm py-1 pr-2 text-sm cursor-pointer",
              "hover:bg-midground/5",
              isCurrent && "bg-midground/10 text-midground"
            ),
            style: { paddingLeft: `${depth * 14 + 4}px` },
            children: [
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "aria-label": isExpanded ? "\u6536\u8D77" : "\u5C55\u5F00",
                  className: "shrink-0 p-0.5 text-text-tertiary hover:text-midground",
                  onClick: (e) => {
                    e.stopPropagation();
                    toggle(dir.path);
                  },
                  children: isExpanded ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" })
                }
              ),
              /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  className: "flex min-w-0 flex-1 items-center gap-1.5 text-left",
                  onClick: () => {
                    onNavigate(dir.path);
                    if (!isExpanded) toggle(dir.path);
                  },
                  title: dir.path,
                  children: [
                    isCurrent || isExpanded ? /* @__PURE__ */ jsx(FolderOpen, { className: "size-3.5 shrink-0 text-text-secondary" }) : /* @__PURE__ */ jsx(Folder, { className: "size-3.5 shrink-0 text-text-secondary" }),
                    /* @__PURE__ */ jsx("span", { className: "truncate", children: dir.name }),
                    isLoading && /* @__PURE__ */ jsx("span", { className: "ml-1 size-2 shrink-0 animate-pulse rounded-full bg-midground/40" })
                  ]
                }
              )
            ]
          }
        ),
        isExpanded && kids && kids.length > 0 && /* @__PURE__ */ jsx("ul", { children: kids.map((d) => renderDir(d, depth + 1)) })
      ] }, dir.path);
    };
    return /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "border-b border-current/10 px-3 py-2 text-xs font-medium uppercase tracking-wider text-text-tertiary", children: "\u76EE\u5F55" }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto py-1", children: [
        error && /* @__PURE__ */ jsxs("p", { className: "px-3 py-2 text-xs text-red-400", children: [
          "\u52A0\u8F7D\u5931\u8D25\uFF1A",
          error
        ] }),
        /* @__PURE__ */ jsx("ul", { className: "pb-2", children: roots.map((root) => {
          const isExpanded = expanded.has(root.path);
          const isCurrent = currentPath === root.path;
          const kids = children[root.path];
          return /* @__PURE__ */ jsxs("li", { children: [
            /* @__PURE__ */ jsxs(
              "div",
              {
                className: cn(
                  "flex min-w-0 items-center gap-1 rounded-sm py-1 pr-2 text-sm font-medium cursor-pointer",
                  "hover:bg-midground/5",
                  isCurrent && "bg-midground/10 text-midground"
                ),
                style: { paddingLeft: 4 },
                children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      "aria-label": isExpanded ? "\u6536\u8D77" : "\u5C55\u5F00",
                      className: "shrink-0 p-0.5 text-text-tertiary hover:text-midground",
                      onClick: () => toggle(root.path),
                      children: isExpanded ? /* @__PURE__ */ jsx(ChevronDown, { className: "size-3.5" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "size-3.5" })
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      className: "flex min-w-0 flex-1 items-center gap-1.5 text-left",
                      onClick: () => onNavigate(root.path),
                      title: root.path,
                      children: [
                        /* @__PURE__ */ jsx(HardDrive, { className: "size-3.5 shrink-0 text-text-secondary" }),
                        /* @__PURE__ */ jsx("span", { className: "truncate", children: root.name })
                      ]
                    }
                  )
                ]
              }
            ),
            isExpanded && kids && kids.length > 0 && /* @__PURE__ */ jsx("ul", { children: kids.map((d) => renderDir(d, 1)) }),
            isExpanded && kids && kids.length === 0 && /* @__PURE__ */ jsx(
              "p",
              {
                className: "py-1 text-xs text-text-tertiary",
                style: { paddingLeft: 4 + 14 + 18 },
                children: "\uFF08\u7A7A\uFF09"
              }
            )
          ] }, root.path);
        }) }),
        roots.length === 0 && !error && /* @__PURE__ */ jsx("p", { className: "px-3 py-4 text-xs text-text-tertiary", children: "\u5C1A\u672A\u914D\u7F6E\u8D44\u6599\u5E93\u6839\u76EE\u5F55\u3002" })
      ] })
    ] });
  }

  // src/library/LibraryFileArea.tsx
  var KIND_ICON = {
    image: FileImage,
    video: FilePlay,
    audio: FileHeadphone,
    pdf: FileText,
    office: FileText,
    text: FileText,
    md: FileCode,
    none: File
  };
  function LibraryThumb({ path, name }) {
    const [src, setSrc] = useState(null);
    const [failed, setFailed] = useState(false);
    useEffect(() => {
      if (src) return;
      let revoke = null;
      let cancelled = false;
      fetchLibraryBlobUrl("thumb", path, { size: "320" }).then((url) => {
        if (cancelled) {
          URL.revokeObjectURL(url);
          return;
        }
        revoke = url;
        setSrc(url);
      }).catch(() => {
        if (!cancelled) setFailed(true);
      });
      return () => {
        cancelled = true;
        if (revoke) URL.revokeObjectURL(revoke);
      };
    }, [path]);
    if (failed || !src) {
      return /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: failed ? /* @__PURE__ */ jsx(FileImage, { className: "size-8 text-text-tertiary" }) : /* @__PURE__ */ jsx(Spinner, {}) });
    }
    return /* @__PURE__ */ jsx(
      "img",
      {
        src,
        alt: name,
        loading: "lazy",
        className: "h-full w-full object-cover",
        onError: () => setFailed(true)
      }
    );
  }
  function LibraryFileArea({
    roots,
    listing,
    loading,
    error,
    displayMode,
    onDisplayModeChange,
    selectedPath,
    onSelectFile,
    onOpenFile,
    onNavigate,
    clipboard,
    onPaste,
    onMarkFeed,
    markBusy
  }) {
    const crumbs = (() => {
      const path = listing?.path;
      if (!path) return [];
      const root = roots.find(
        (r) => path === r.path || path.startsWith(r.path + "/")
      );
      if (!root) return [{ name: path, path }];
      const out = [{ name: root.name, path: root.path }];
      if (path !== root.path) {
        const rel = path.slice(root.path.length + 1).split("/");
        let acc = root.path;
        for (const part of rel) {
          acc += "/" + part;
          out.push({ name: part, path: acc });
        }
      }
      return out;
    })();
    const renderDirTile = (dir) => /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        onClick: () => onNavigate(dir.path),
        onDoubleClick: () => onNavigate(dir.path),
        className: cn(
          "flex min-w-0 flex-col items-center gap-2 rounded-md border border-current/10 p-3",
          "hover:border-current/25 hover:bg-midground/5 cursor-pointer text-center",
          "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground"
        ),
        title: dir.path,
        children: [
          /* @__PURE__ */ jsx(Folder, { className: "size-10 text-amber-300/80" }),
          /* @__PURE__ */ jsx("span", { className: "w-full truncate text-sm", children: dir.name }),
          /* @__PURE__ */ jsxs("span", { className: "text-xs text-text-tertiary", children: [
            dir.file_count,
            " \u4E2A\u6587\u4EF6 \xB7 ",
            formatBytes(dir.total_size)
          ] })
        ]
      },
      dir.path
    );
    const renderFileTile = (file) => {
      const Icon2 = KIND_ICON[file.preview_kind] ?? File;
      const selected = selectedPath === file.path;
      return /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => onSelectFile(file),
          onDoubleClick: () => onOpenFile(file),
          onKeyDown: (e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              onOpenFile(file);
            }
          },
          className: cn(
            "flex min-w-0 flex-col rounded-md border p-2 cursor-pointer",
            "hover:border-current/25 hover:bg-midground/5",
            "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground",
            selected ? "border-midground/60 bg-midground/10" : "border-current/10"
          ),
          title: file.path,
          children: [
            /* @__PURE__ */ jsx("div", { className: "mb-2 h-24 w-full overflow-hidden rounded-sm bg-black/20", children: file.preview_kind === "image" ? /* @__PURE__ */ jsx(LibraryThumb, { path: file.path, name: file.name }) : /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center", children: /* @__PURE__ */ jsx(Icon2, { className: cn("size-10", PREVIEW_KIND_COLOR[file.preview_kind]) }) }) }),
            /* @__PURE__ */ jsx(
              "span",
              {
                className: "line-clamp-2 w-full break-all text-left text-xs leading-tight",
                style: { overflowWrap: "anywhere" },
                children: file.name
              }
            ),
            /* @__PURE__ */ jsxs("span", { className: "mt-1 w-full truncate text-left text-[11px] text-text-tertiary", children: [
              formatBytes(file.size),
              " \xB7 ",
              formatDateTime(file.mtime)
            ] })
          ]
        },
        file.path
      );
    };
    const renderList = () => /* @__PURE__ */ jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { className: "border-b border-current/10 text-left text-xs text-text-tertiary", children: [
        /* @__PURE__ */ jsx("th", { className: "px-3 py-2 font-medium", children: "\u540D\u79F0" }),
        /* @__PURE__ */ jsx("th", { className: "w-28 px-3 py-2 font-medium", children: "\u5927\u5C0F" }),
        /* @__PURE__ */ jsx("th", { className: "w-44 px-3 py-2 font-medium", children: "\u4FEE\u6539\u65F6\u95F4" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        (listing?.dirs ?? []).map((dir) => /* @__PURE__ */ jsxs(
          "tr",
          {
            className: "cursor-pointer border-b border-current/5 hover:bg-midground/5",
            onClick: () => onNavigate(dir.path),
            onDoubleClick: () => onNavigate(dir.path),
            title: dir.path,
            children: [
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5", children: /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
                /* @__PURE__ */ jsx(Folder, { className: "size-4 shrink-0 text-amber-300/80" }),
                /* @__PURE__ */ jsx("span", { className: "truncate", children: dir.name }),
                /* @__PURE__ */ jsxs("span", { className: "shrink-0 text-xs text-text-tertiary", children: [
                  dir.file_count,
                  " \u4E2A\u6587\u4EF6"
                ] })
              ] }) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-text-secondary", children: formatBytes(dir.total_size) }),
              /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-text-secondary", children: "-" })
            ]
          },
          dir.path
        )),
        (listing?.files ?? []).map((file) => {
          const Icon2 = KIND_ICON[file.preview_kind] ?? File;
          const selected = selectedPath === file.path;
          return /* @__PURE__ */ jsxs(
            "tr",
            {
              tabIndex: 0,
              className: cn(
                "cursor-pointer border-b border-current/5 hover:bg-midground/5",
                "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-midground",
                selected && "bg-midground/10"
              ),
              onClick: () => onSelectFile(file),
              onDoubleClick: () => onOpenFile(file),
              onKeyDown: (e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  onOpenFile(file);
                }
              },
              title: file.path,
              children: [
                /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5", children: /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
                  /* @__PURE__ */ jsx(Icon2, { className: cn("size-4 shrink-0", PREVIEW_KIND_COLOR[file.preview_kind]) }),
                  /* @__PURE__ */ jsx("span", { className: "truncate", children: file.name })
                ] }) }),
                /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-text-secondary", children: formatBytes(file.size) }),
                /* @__PURE__ */ jsx("td", { className: "px-3 py-1.5 text-text-secondary", children: formatDateTime(file.mtime) })
              ]
            },
            file.path
          );
        })
      ] })
    ] });
    const isEmpty = listing && listing.dirs.length === 0 && listing.files.length === 0;
    const [pathCopied, setPathCopied] = useState(false);
    const copyCurrentDir = useCallback(async () => {
      const path = listing?.path;
      if (!path) return;
      try {
        await navigator.clipboard.writeText(path);
        setPathCopied(true);
        setTimeout(() => setPathCopied(false), 1500);
      } catch {
      }
    }, [listing?.path]);
    return /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex min-w-0 items-center gap-2 border-b border-current/10 px-3 py-2", children: [
        /* @__PURE__ */ jsx("nav", { className: "flex min-w-0 flex-1 items-center gap-1 overflow-x-auto text-sm [scrollbar-width:none]", children: crumbs.map((crumb, i) => /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-1", children: [
          i > 0 && /* @__PURE__ */ jsx("span", { className: "text-text-tertiary", children: "/" }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: () => onNavigate(crumb.path),
              className: cn(
                "max-w-48 truncate rounded-sm px-1 py-0.5 hover:bg-midground/10 hover:text-midground",
                i === crumbs.length - 1 ? "font-medium text-midground" : "text-text-secondary"
              ),
              children: crumb.name
            }
          )
        ] }, crumb.path)) }),
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: copyCurrentDir,
            disabled: !listing?.path,
            title: "\u590D\u5236\u5F53\u524D\u76EE\u5F55\u8DEF\u5F84",
            "aria-label": "\u590D\u5236\u5F53\u524D\u76EE\u5F55\u8DEF\u5F84",
            className: "flex shrink-0 items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
            children: pathCopied ? /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ jsx(Copy, { className: "size-3.5" })
          }
        ),
        onMarkFeed && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onMarkFeed,
            disabled: markBusy,
            title: "\u628A\u5F53\u524D\u76EE\u5F55\u805A\u5408\u4E3A\u4FE1\u606F\u6E90\uFF08\u5199\u5165 library.yaml \u7684 feed_dirs\uFF09",
            className: "flex shrink-0 items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
            children: [
              /* @__PURE__ */ jsx(Rss, { className: "size-3.5" }),
              "\u6807\u8BB0\u4E3A\u4FE1\u606F\u6E90"
            ]
          }
        ),
        onPaste && /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: onPaste,
            disabled: !clipboard,
            title: clipboard ? `\u7C98\u8D34 ${clipboard.paths.length} \u9879\u5230\u5F53\u524D\u76EE\u5F55` : "\u526A\u8D34\u677F\u4E3A\u7A7A",
            className: "flex shrink-0 items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50 disabled:hover:border-current/15 disabled:hover:text-text-secondary",
            children: [
              /* @__PURE__ */ jsx(ClipboardPaste, { className: "size-3.5" }),
              "\u7C98\u8D34",
              clipboard ? ` (${clipboard.paths.length})` : ""
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center rounded-sm border border-current/15", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u7F51\u683C\u89C6\u56FE",
              "aria-pressed": displayMode === "grid",
              onClick: () => onDisplayModeChange("grid"),
              className: cn(
                "p-1.5",
                displayMode === "grid" ? "bg-midground/10 text-midground" : "text-text-tertiary hover:text-midground"
              ),
              children: /* @__PURE__ */ jsx(LayoutGrid, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u5217\u8868\u89C6\u56FE",
              "aria-pressed": displayMode === "list",
              onClick: () => onDisplayModeChange("list"),
              className: cn(
                "p-1.5",
                displayMode === "list" ? "bg-midground/10 text-midground" : "text-text-tertiary hover:text-midground"
              ),
              children: /* @__PURE__ */ jsx(List, { className: "size-4" })
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto", children: [
        loading && /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center gap-2 text-sm text-text-secondary", children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          /* @__PURE__ */ jsx("span", { children: "\u52A0\u8F7D\u4E2D\u2026" })
        ] }),
        !loading && error && /* @__PURE__ */ jsxs("p", { className: "px-4 py-6 text-sm text-red-400", children: [
          "\u52A0\u8F7D\u5931\u8D25:",
          error
        ] }),
        !loading && !error && isEmpty && /* @__PURE__ */ jsx("p", { className: "px-4 py-10 text-center text-sm text-text-tertiary", children: "\u6B64\u76EE\u5F55\u4E3A\u7A7A" }),
        !loading && !error && listing && !isEmpty && displayMode === "grid" && /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-2 gap-3 p-3 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5", children: [
          listing.dirs.map(renderDirTile),
          listing.files.map(renderFileTile)
        ] }),
        !loading && !error && listing && !isEmpty && displayMode === "list" && renderList()
      ] })
    ] });
  }

  // src/shared/local-path.ts
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

  // src/shared/Markdown.tsx
  function Markdown({
    content,
    highlightTerms,
    streaming,
    localFileLinks
  }) {
    const blocks = useMemo(() => parseBlocks(content), [content]);
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
  function parseBlocks(text) {
    const lines = text.split("\n");
    const blocks = [];
    let i = 0;
    while (i < lines.length) {
      const line = lines[i];
      const fenceMatch = line.match(/^```(\w*)/);
      if (fenceMatch) {
        const lang = fenceMatch[1] || "";
        const codeLines = [];
        i++;
        while (i < lines.length && !lines[i].startsWith("```")) {
          codeLines.push(lines[i]);
          i++;
        }
        i++;
        blocks.push({ type: "code", lang, content: codeLines.join("\n") });
        continue;
      }
      const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
      if (headingMatch) {
        blocks.push({
          type: "heading",
          level: headingMatch[1].length,
          content: headingMatch[2]
        });
        i++;
        continue;
      }
      if (/^[-*_]{3,}\s*$/.test(line)) {
        blocks.push({ type: "hr" });
        i++;
        continue;
      }
      if (/^[-*+]\s/.test(line)) {
        const items = [];
        while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
          items.push(lines[i].replace(/^[-*+]\s/, ""));
          i++;
        }
        blocks.push({ type: "list", ordered: false, items });
        continue;
      }
      if (/^\d+[.)]\s/.test(line)) {
        const items = [];
        while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
          items.push(lines[i].replace(/^\d+[.)]\s/, ""));
          i++;
        }
        blocks.push({ type: "list", ordered: true, items });
        continue;
      }
      if (line.trim() === "") {
        i++;
        continue;
      }
      const paraLines = [];
      while (i < lines.length && lines[i].trim() !== "" && !lines[i].match(/^```/) && !lines[i].match(/^#{1,4}\s/) && !lines[i].match(/^[-*+]\s/) && !lines[i].match(/^\d+[.)]\s/) && !lines[i].match(/^[-*_]{3,}\s*$/)) {
        paraLines.push(lines[i]);
        i++;
      }
      if (paraLines.length > 0) {
        blocks.push({ type: "paragraph", content: paraLines.join("\n") });
      }
    }
    return blocks;
  }
  function Block({
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
  }
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

  // src/library/LibraryNoteEditor.tsx
  function LibraryNoteEditor({
    notePath,
    onOpenNote,
    onClose,
    onToast
  }) {
    const [content, setContent] = useState("");
    const [saved, setSaved] = useState("");
    const [links, setLinks] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [preview, setPreview] = useState(false);
    const dirty = content !== saved;
    const title = notePath.split("/").pop()?.replace(/\.md$/i, "") ?? notePath;
    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      setPreview(false);
      Promise.all([libraryApi.getNote(notePath), libraryApi.getNoteLinks(notePath)]).then(([note, noteLinks]) => {
        if (cancelled) return;
        setContent(note.content);
        setSaved(note.content);
        setLinks(noteLinks);
      }).catch((e) => {
        if (!cancelled) onToast(`\u52A0\u8F7D\u7B14\u8BB0\u5931\u8D25:${e}`, "error");
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [notePath, onToast]);
    const save = useCallback(async () => {
      if (saving || !dirty) return;
      setSaving(true);
      try {
        await libraryApi.saveNote(notePath, content);
        setSaved(content);
        setLinks(await libraryApi.getNoteLinks(notePath));
      } catch (e) {
        onToast(`\u4FDD\u5B58\u7B14\u8BB0\u5931\u8D25:${e}`, "error");
      } finally {
        setSaving(false);
      }
    }, [saving, dirty, notePath, content, onToast]);
    const requestClose = useCallback(() => {
      if (dirty && !window.confirm("\u6709\u672A\u4FDD\u5B58\u7684\u4FEE\u6539\uFF0C\u786E\u5B9A\u5173\u95ED\uFF1F")) return;
      onClose();
    }, [dirty, onClose]);
    useEffect(() => {
      const onKey = (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          void save();
        } else if (e.key === "Escape") {
          e.preventDefault();
          requestClose();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [save, requestClose]);
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
        role: "dialog",
        "aria-label": `\u7B14\u8BB0 ${title}`,
        onClick: requestClose,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex h-full max-h-[85vh] w-full max-w-3xl flex-col overflow-hidden rounded-md border border-current/15 bg-background-base shadow-xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-current/10 px-3 py-2", children: [
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: "min-w-0 flex-1 truncate text-sm font-medium",
                    title: notePath,
                    children: [
                      title,
                      dirty && /* @__PURE__ */ jsx("span", { className: "ml-1 text-amber-400", children: "\u25CF" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => setPreview((p) => !p),
                    title: preview ? "\u5207\u6362\u5230\u7F16\u8F91" : "\u5207\u6362\u5230\u9884\u89C8",
                    className: "flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                    children: [
                      preview ? /* @__PURE__ */ jsx(PenLine, { className: "size-3.5" }) : /* @__PURE__ */ jsx(Eye, { className: "size-3.5" }),
                      preview ? "\u7F16\u8F91" : "\u9884\u89C8"
                    ]
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => void save(),
                    disabled: saving || !dirty,
                    title: "\u4FDD\u5B58\uFF08Ctrl+S\uFF09",
                    className: "flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
                    children: [
                      /* @__PURE__ */ jsx(Save, { className: "size-3.5" }),
                      saving ? "\u4FDD\u5B58\u4E2D\u2026" : "\u4FDD\u5B58"
                    ]
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: requestClose,
                    "aria-label": "\u5173\u95ED",
                    className: "rounded-sm p-1 text-text-tertiary hover:text-midground",
                    children: /* @__PURE__ */ jsx(X, { className: "size-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1", children: loading ? /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center gap-2 text-sm text-text-secondary", children: [
                /* @__PURE__ */ jsx(Spinner, {}),
                /* @__PURE__ */ jsx("span", { children: "\u52A0\u8F7D\u7B14\u8BB0\u2026" })
              ] }) : preview ? /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-4", children: /* @__PURE__ */ jsx(Markdown, { content }) }) : /* @__PURE__ */ jsx(
                "textarea",
                {
                  value: content,
                  onChange: (e) => setContent(e.target.value),
                  spellCheck: false,
                  className: "h-full w-full resize-none bg-transparent p-4 font-mono text-sm leading-relaxed focus:outline-none"
                }
              ) }),
              !loading && links && (links.outlinks.length > 0 || links.backlinks.length > 0) && /* @__PURE__ */ jsxs("div", { className: "shrink-0 space-y-1.5 border-t border-current/10 px-3 py-2 text-xs", children: [
                links.outlinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 text-text-tertiary", children: "\u51FA\u94FE" }),
                  links.outlinks.map(
                    (o) => o.resolved_path ? /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => onOpenNote(o.resolved_path),
                        title: o.resolved_path,
                        className: "rounded-full border border-current/20 px-2 py-0.5 text-midground hover:border-current/40",
                        children: o.target
                      },
                      o.target
                    ) : /* @__PURE__ */ jsx(
                      "span",
                      {
                        title: "\u5C1A\u672A\u89E3\u6790\u5230\u7B14\u8BB0\u6587\u4EF6",
                        className: "rounded-full border border-dashed border-current/15 px-2 py-0.5 text-text-tertiary",
                        children: o.target
                      },
                      o.target
                    )
                  )
                ] }),
                links.backlinks.length > 0 && /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5", children: [
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 text-text-tertiary", children: "\u53CD\u94FE" }),
                  links.backlinks.map((b) => /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => onOpenNote(b.note_path),
                      title: b.note_path,
                      className: cn(
                        "rounded-full border border-current/20 px-2 py-0.5 text-midground hover:border-current/40"
                      ),
                      children: b.title
                    },
                    b.note_path
                  ))
                ] })
              ] })
            ]
          }
        )
      }
    );
  }

  // src/library/LibraryFeedView.tsx
  var STATUS_STYLE = {
    \u5F85\u8BFB: "border-current/20 text-text-secondary",
    \u5728\u8BFB: "border-amber-400/40 bg-amber-400/10 text-amber-400",
    \u5DF2\u8BFB: "border-emerald-400/40 bg-emerald-400/10 text-emerald-400"
  };
  function LibraryFeedView({
    path,
    refreshKey,
    selectedPath,
    onSelectFile,
    onOpenFile,
    onToast,
    onUnmarkFeed,
    unmarkOrigin,
    unmarkBusy
  }) {
    const [feed, setFeed] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState("\u5168\u90E8");
    const [sourceFilter, setSourceFilter] = useState("\u5168\u90E8");
    const [query, setQuery] = useState("");
    const [pendingStatus, setPendingStatus] = useState(null);
    const [pendingNote, setPendingNote] = useState(null);
    const [notePath, setNotePath] = useState(null);
    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);
      libraryApi.getFeed(path).then((res) => {
        if (!cancelled) setFeed(res);
      }).catch((e) => {
        if (!cancelled) {
          setFeed(null);
          setError(String(e));
        }
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [path, refreshKey]);
    const statuses = feed?.statuses ?? [];
    const sources = useMemo(
      () => Object.keys(feed?.stats.by_source ?? {}).sort(),
      [feed]
    );
    const filtered = useMemo(() => {
      const q = query.trim().toLowerCase();
      return (feed?.items ?? []).filter((it) => {
        if (statusFilter !== "\u5168\u90E8" && it.status !== statusFilter) return false;
        if (sourceFilter !== "\u5168\u90E8" && it.source !== sourceFilter) return false;
        if (q && !it.title.toLowerCase().includes(q) && !it.authors.toLowerCase().includes(q) && !it.tags.toLowerCase().includes(q))
          return false;
        return true;
      });
    }, [feed, statusFilter, sourceFilter, query]);
    const groups = useMemo(() => {
      const map = /* @__PURE__ */ new Map();
      for (const it of filtered) {
        const key = it.date || "\u672A\u6CE8\u660E\u65E5\u671F";
        const arr = map.get(key);
        if (arr) arr.push(it);
        else map.set(key, [it]);
      }
      return [...map.entries()];
    }, [filtered]);
    const cycleStatus = useCallback(
      async (item) => {
        if (pendingStatus || statuses.length === 0) return;
        const idx = statuses.indexOf(item.status);
        const next = statuses[(idx + 1) % statuses.length];
        setPendingStatus(item.path);
        try {
          await libraryApi.setFeedStatus(item.path, next);
          setFeed((prev) => {
            if (!prev) return prev;
            const items = prev.items.map(
              (it) => it.path === item.path ? { ...it, status: next } : it
            );
            const by_status = { ...prev.stats.by_status };
            by_status[item.status] = (by_status[item.status] ?? 1) - 1;
            if (by_status[item.status] <= 0) delete by_status[item.status];
            by_status[next] = (by_status[next] ?? 0) + 1;
            return { ...prev, items, stats: { ...prev.stats, by_status } };
          });
        } catch (e) {
          onToast(`\u66F4\u65B0\u9605\u8BFB\u72B6\u6001\u5931\u8D25:${e}`, "error");
        } finally {
          setPendingStatus(null);
        }
      },
      [pendingStatus, statuses, onToast]
    );
    const openNote = useCallback(
      async (item) => {
        if (pendingNote) return;
        if (item.note_path) {
          setNotePath(item.note_path);
          return;
        }
        setPendingNote(item.path);
        try {
          const res = await libraryApi.createFeedNote(item.path);
          setFeed(
            (prev) => prev ? {
              ...prev,
              items: prev.items.map(
                (it) => it.path === item.path ? { ...it, note_path: res.note_path } : it
              )
            } : prev
          );
          if (res.created) onToast("\u5DF2\u521B\u5EFA\u6761\u76EE\u7B14\u8BB0", "success");
          setNotePath(res.note_path);
        } catch (e) {
          onToast(`\u521B\u5EFA\u7B14\u8BB0\u5931\u8D25:${e}`, "error");
        } finally {
          setPendingNote(null);
        }
      },
      [pendingNote, onToast]
    );
    if (loading) {
      return /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center gap-2 text-sm text-text-secondary", children: [
        /* @__PURE__ */ jsx(Spinner, {}),
        /* @__PURE__ */ jsx("span", { children: "\u52A0\u8F7D\u4FE1\u606F\u6E90\u2026" })
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center px-4 text-center text-sm text-red-400", children: [
        "\u52A0\u8F7D\u4FE1\u606F\u6E90\u5931\u8D25:",
        error
      ] });
    }
    if (!feed) return null;
    const notesEnabled = feed.notes_enabled;
    return /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsx("div", { className: "shrink-0 space-y-2 border-b border-current/10 px-3 py-2", children: /* @__PURE__ */ jsxs("div", { className: "flex flex-wrap items-center gap-1.5 text-xs", children: [
        /* @__PURE__ */ jsxs("span", { className: "text-text-tertiary", children: [
          "\u5171 ",
          feed.stats.total,
          " \u7BC7 \xB7 \u7B5B\u9009\u540E ",
          filtered.length,
          " \u7BC7"
        ] }),
        onUnmarkFeed && /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            onClick: onUnmarkFeed,
            disabled: unmarkBusy,
            title: unmarkOrigin === "branch" ? "\u79FB\u9664 library.yaml \u4E2D\u8BE5\u5206\u652F\u7684 type:feed \u914D\u7F6E\uFF08notes \u7B49\u914D\u7F6E\u4FDD\u7559\uFF0C\u52A0\u56DE\u5373\u53EF\u6062\u590D\uFF1B\u9605\u8BFB\u72B6\u6001\u4FDD\u7559\uFF09" : "\u4ECE feed_dirs \u53D6\u6D88\u4FE1\u606F\u6E90\u6807\u8BB0\uFF08\u9605\u8BFB\u72B6\u6001\u4FDD\u7559\uFF09",
            className: "rounded-full border border-current/15 px-2 py-0.5 text-text-secondary hover:border-current/30 disabled:opacity-50",
            children: "\u53D6\u6D88\u4FE1\u606F\u6E90"
          }
        ),
        /* @__PURE__ */ jsx("span", { className: "mx-1 text-text-tertiary", children: "|" }),
        ["\u5168\u90E8", ...statuses].map((s) => /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-pressed": statusFilter === s,
            onClick: () => setStatusFilter(s),
            className: cn(
              "rounded-full border px-2 py-0.5",
              statusFilter === s ? "border-current/40 bg-midground/10 text-midground" : "border-current/15 text-text-secondary hover:border-current/30"
            ),
            children: [
              s,
              s !== "\u5168\u90E8" && feed.stats.by_status[s] ? ` ${feed.stats.by_status[s]}` : ""
            ]
          },
          s
        )),
        /* @__PURE__ */ jsx("span", { className: "mx-1 text-text-tertiary", children: "|" }),
        /* @__PURE__ */ jsxs(
          "select",
          {
            value: sourceFilter,
            onChange: (e) => setSourceFilter(e.target.value),
            className: "rounded-sm border border-current/15 bg-transparent px-1.5 py-0.5 text-xs text-text-secondary focus:border-current/30 focus:outline-none",
            children: [
              /* @__PURE__ */ jsx("option", { value: "\u5168\u90E8", children: "\u5168\u90E8\u6765\u6E90" }),
              sources.map((s) => /* @__PURE__ */ jsxs("option", { value: s, children: [
                s,
                "\uFF08",
                feed.stats.by_source[s],
                "\uFF09"
              ] }, s))
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "relative ml-auto min-w-32", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-1.5 top-1/2 size-3.5 -translate-y-1/2 text-text-tertiary" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: query,
              onChange: (e) => setQuery(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Escape") setQuery("");
              },
              placeholder: "\u7B5B\u9009\u6807\u9898/\u4F5C\u8005/\u6807\u7B7E\u2026",
              className: "w-full rounded-sm border border-current/15 bg-transparent py-0.5 pl-6 pr-6 text-xs placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
            }
          ),
          query && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u6E05\u7A7A\u7B5B\u9009",
              onClick: () => setQuery(""),
              className: "absolute right-1 top-1/2 -translate-y-1/2 p-0.5 text-text-tertiary hover:text-midground",
              children: /* @__PURE__ */ jsx(X, { className: "size-3" })
            }
          )
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto", children: [
        filtered.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-4 py-10 text-center text-sm text-text-tertiary", children: "\u6CA1\u6709\u5339\u914D\u7684\u6761\u76EE" }),
        groups.map(([date, items]) => /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("h3", { className: "sticky top-0 z-10 border-b border-current/10 bg-background-base/95 px-3 py-1.5 text-xs font-medium text-text-secondary backdrop-blur", children: [
            date,
            /* @__PURE__ */ jsxs("span", { className: "ml-2 text-text-tertiary", children: [
              items.length,
              " \u7BC7"
            ] })
          ] }),
          /* @__PURE__ */ jsx("ul", { className: "divide-y divide-current/5", children: items.map((it) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
            "div",
            {
              role: "button",
              tabIndex: 0,
              onClick: () => onSelectFile(feedItemToFileEntry(it)),
              onDoubleClick: () => onOpenFile(feedItemToFileEntry(it)),
              onKeyDown: (e) => {
                if (e.key === "Enter") onOpenFile(feedItemToFileEntry(it));
              },
              className: cn(
                "flex w-full min-w-0 cursor-pointer items-start gap-2.5 px-3 py-2 text-left hover:bg-midground/5",
                selectedPath === it.path && "bg-midground/10"
              ),
              children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    title: "\u70B9\u51FB\u5207\u6362\u9605\u8BFB\u72B6\u6001",
                    disabled: pendingStatus === it.path,
                    onClick: (e) => {
                      e.stopPropagation();
                      void cycleStatus(it);
                    },
                    className: cn(
                      "mt-0.5 shrink-0 rounded-full border px-2 py-0.5 text-xs disabled:opacity-50",
                      STATUS_STYLE[it.status] ?? STATUS_STYLE["\u5F85\u8BFB"]
                    ),
                    children: it.status
                  }
                ),
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                  /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: cn(
                          "min-w-0 truncate text-sm",
                          it.status === "\u5DF2\u8BFB" && "text-text-tertiary"
                        ),
                        title: it.title,
                        children: it.title
                      }
                    ),
                    it.link && /* @__PURE__ */ jsx(
                      "a",
                      {
                        href: it.link,
                        target: "_blank",
                        rel: "noreferrer",
                        "aria-label": "\u6253\u5F00\u539F\u6587\u94FE\u63A5",
                        title: it.link,
                        onClick: (e) => e.stopPropagation(),
                        className: "shrink-0 p-0.5 text-text-tertiary hover:text-midground",
                        children: /* @__PURE__ */ jsx(ExternalLink, { className: "size-3.5" })
                      }
                    ),
                    notesEnabled && /* @__PURE__ */ jsx(
                      "button",
                      {
                        type: "button",
                        "aria-label": it.note_path ? "\u6253\u5F00\u6761\u76EE\u7B14\u8BB0" : "\u521B\u5EFA\u6761\u76EE\u7B14\u8BB0",
                        title: it.note_path ? `\u7B14\u8BB0\uFF1A${it.note_path}` : "\u521B\u5EFA\u6761\u76EE\u7B14\u8BB0",
                        disabled: pendingNote === it.path,
                        onClick: (e) => {
                          e.stopPropagation();
                          void openNote(it);
                        },
                        className: cn(
                          "shrink-0 p-0.5 disabled:opacity-50",
                          it.note_path ? "text-midground hover:text-midground/70" : "text-text-tertiary hover:text-midground"
                        ),
                        children: /* @__PURE__ */ jsx(NotebookPen, { className: "size-3.5" })
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxs("span", { className: "mt-0.5 flex min-w-0 items-center gap-2 text-xs text-text-tertiary", children: [
                    /* @__PURE__ */ jsx("span", { className: "shrink-0 rounded-sm border border-current/10 px-1 py-px", children: it.source }),
                    it.category && it.category !== it.source && /* @__PURE__ */ jsx("span", { className: "shrink-0", children: it.category }),
                    it.authors && /* @__PURE__ */ jsx("span", { className: "min-w-0 truncate", title: it.authors, children: it.authors })
                  ] }),
                  it.tags && /* @__PURE__ */ jsx("span", { className: "mt-0.5 block truncate text-xs text-text-tertiary/80", children: it.tags })
                ] })
              ]
            }
          ) }, it.path)) })
        ] }, date))
      ] }),
      notePath && /* @__PURE__ */ jsx(
        LibraryNoteEditor,
        {
          notePath,
          onOpenNote: setNotePath,
          onClose: () => setNotePath(null),
          onToast
        }
      )
    ] });
  }

  // src/shared/fileAccess.ts
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

  // src/library/LibraryPreviewPane.tsx
  function LibraryPreviewPane({
    file,
    refreshKey,
    onCopy,
    onCut,
    onRename,
    onDelete,
    onForward
  }) {
    const [info, setInfo] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [textContent, setTextContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [forbidden, setForbidden] = useState(false);
    const [converting, setConverting] = useState(false);
    const [zoomed, setZoomed] = useState(false);
    const [copied, setCopied] = useState(false);
    const kind = info?.preview_kind ?? file?.preview_kind ?? "none";
    useEffect(() => {
      setZoomed(false);
      setCopied(false);
      setInfo(null);
      setPreviewUrl(null);
      setTextContent(null);
      setError(null);
      setForbidden(false);
      setConverting(false);
      if (!file) return;
      let cancelled = false;
      let revokeUrl = null;
      setLoading(true);
      (async () => {
        try {
          const detail = await libraryApi.getFileInfo(file.path);
          if (cancelled) return;
          setInfo(detail);
          const k = detail.preview_kind;
          if (k === "none") return;
          if (k === "md" || k === "text") {
            const text = await fetchLibraryText(file.path);
            if (cancelled) return;
            setTextContent(text);
            return;
          }
          if (k === "office" && !detail.preview_cached) setConverting(true);
          const { url, revoke } = await resolveLibraryUrl("preview", file.path);
          if (cancelled) {
            if (revoke) URL.revokeObjectURL(url);
            return;
          }
          revokeUrl = revoke ? url : null;
          setPreviewUrl(url);
          if (k === "image" || k === "video" || k === "audio") setConverting(false);
        } catch (e) {
          if (cancelled) return;
          const msg = String(e);
          if (msg.startsWith("Error: 403") || msg.includes("HTTP 403")) {
            setForbidden(true);
          } else {
            setError(msg);
          }
          setConverting(false);
        } finally {
          if (!cancelled) setLoading(false);
        }
      })();
      return () => {
        cancelled = true;
        if (revokeUrl) URL.revokeObjectURL(revokeUrl);
      };
    }, [file, refreshKey]);
    useEffect(() => {
      if (!zoomed) return;
      const onKey = (e) => {
        if (e.key === "Escape") setZoomed(false);
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [zoomed]);
    const openInSystem = useCallback(() => {
      if (!file) return;
      openInSystemApp(file.path).catch(
        () => downloadFile(file.path, file.name)
      );
    }, [file]);
    const revealInFolder = useCallback(() => {
      if (!file) return;
      openInSystemApp(file.path, true).catch(() => {
      });
    }, [file]);
    const copyPath = useCallback(async () => {
      if (!file) return;
      try {
        await navigator.clipboard.writeText(file.path);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      } catch {
      }
    }, [file]);
    if (!file) {
      return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary", children: "\u9009\u62E9\u4E00\u4E2A\u6587\u4EF6\u67E5\u770B\u8BE6\u60C5\u4E0E\u9884\u89C8" });
    }
    const renderPreview = () => {
      if (loading && !previewUrl && !textContent) {
        return /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center gap-2 text-sm text-text-secondary", children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          /* @__PURE__ */ jsx("span", { children: "\u52A0\u8F7D\u9884\u89C8\u2026" })
        ] });
      }
      if (forbidden) {
        return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary", children: "\u7B56\u7565\u7981\u6B62\u9884\u89C8\u6B64\u6587\u4EF6\uFF08403\uFF09" });
      }
      if (error) {
        return /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center px-4 text-center text-sm text-red-400", children: [
          "\u9884\u89C8\u5931\u8D25:",
          error
        ] });
      }
      if (kind === "none") {
        return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center px-4 text-center text-sm text-text-tertiary", children: "\u6B64\u7C7B\u578B\u4E0D\u652F\u6301\u9884\u89C8" });
      }
      if (kind === "md") {
        return textContent === null ? null : /* @__PURE__ */ jsx("div", { className: "h-full overflow-y-auto p-3", children: /* @__PURE__ */ jsx(Markdown, { content: textContent }) });
      }
      if (kind === "text") {
        return textContent === null ? null : /* @__PURE__ */ jsx("pre", { className: "h-full overflow-auto p-3 font-mono text-xs leading-relaxed whitespace-pre-wrap break-all", children: textContent });
      }
      if (!previewUrl) return null;
      if (kind === "image") {
        return /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            className: "flex h-full w-full items-center justify-center bg-black/20 p-1 cursor-zoom-in",
            onClick: () => setZoomed(true),
            title: "\u70B9\u51FB\u653E\u5927",
            children: /* @__PURE__ */ jsx(
              "img",
              {
                src: previewUrl,
                alt: file.name,
                className: "max-h-full max-w-full object-contain"
              }
            )
          }
        );
      }
      if (kind === "video") {
        return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center bg-black/30 p-1", children: /* @__PURE__ */ jsx("video", { src: previewUrl, controls: true, className: "max-h-full max-w-full" }) });
      }
      if (kind === "audio") {
        return /* @__PURE__ */ jsx("div", { className: "flex h-full items-center justify-center p-4", children: /* @__PURE__ */ jsx("audio", { src: previewUrl, controls: true, className: "w-full" }) });
      }
      return /* @__PURE__ */ jsxs("div", { className: "relative h-full", children: [
        converting && /* @__PURE__ */ jsxs("div", { className: "absolute inset-0 z-10 flex flex-col items-center justify-center gap-2 bg-background-base/90 text-sm text-text-secondary", children: [
          /* @__PURE__ */ jsx(Spinner, {}),
          /* @__PURE__ */ jsx("span", { children: "\u9996\u6B21\u8F6C\u6362\u4E2D\uFF0C\u8BF7\u7A0D\u5019\u2026" }),
          /* @__PURE__ */ jsx("span", { className: "text-xs text-text-tertiary", children: "Office \u6587\u6863\u9700\u7ECF LibreOffice \u8F6C\u6362\uFF0C\u53EF\u80FD\u9700\u8981 5-30 \u79D2" })
        ] }),
        /* @__PURE__ */ jsx(
          "iframe",
          {
            title: file.name,
            src: previewUrl,
            className: "h-full w-full border-0 bg-white [color-scheme:light]",
            onLoad: () => setConverting(false)
          }
        )
      ] });
    };
    return /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
      /* @__PURE__ */ jsxs("div", { className: "shrink-0 space-y-1.5 border-b border-current/10 px-3 py-2.5 text-sm", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-start justify-between gap-2", children: [
          /* @__PURE__ */ jsx("span", { className: "min-w-0 break-all font-medium leading-snug", children: file.name }),
          /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-1", children: [
            onCopy && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onCopy,
                title: "\u590D\u5236",
                "aria-label": "\u590D\u5236",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: /* @__PURE__ */ jsx(Copy, { className: "size-3.5" })
              }
            ),
            onCut && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onCut,
                title: "\u526A\u5207",
                "aria-label": "\u526A\u5207",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: /* @__PURE__ */ jsx(Scissors, { className: "size-3.5" })
              }
            ),
            onRename && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onRename,
                title: "\u91CD\u547D\u540D",
                "aria-label": "\u91CD\u547D\u540D",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: /* @__PURE__ */ jsx(Pencil, { className: "size-3.5" })
              }
            ),
            onDelete && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onDelete,
                title: "\u5220\u9664",
                "aria-label": "\u5220\u9664",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-red-400/50 hover:text-red-400",
                children: /* @__PURE__ */ jsx(Trash2, { className: "size-3.5" })
              }
            ),
            onForward && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: onForward,
                title: "\u8F6C\u53D1\u5230\u5BF9\u8BDD",
                "aria-label": "\u8F6C\u53D1\u5230\u5BF9\u8BDD",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: /* @__PURE__ */ jsx(Send, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: revealInFolder,
                title: "\u5728\u6587\u4EF6\u5939\u4E2D\u663E\u793A",
                "aria-label": "\u5728\u6587\u4EF6\u5939\u4E2D\u663E\u793A",
                className: "flex items-center rounded-sm border border-current/15 px-1.5 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: /* @__PURE__ */ jsx(FolderOpen, { className: "size-3.5" })
              }
            ),
            /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: openInSystem,
                className: "flex items-center gap-1 rounded-sm border border-current/15 px-2 py-1 text-xs text-text-secondary hover:border-current/30 hover:text-midground",
                children: [
                  /* @__PURE__ */ jsx(ExternalLink, { className: "size-3.5" }),
                  "\u5728\u7CFB\u7EDF\u91CC\u6253\u5F00"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxs("dl", { className: "space-y-1 text-xs text-text-secondary", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "w-16 shrink-0 text-text-tertiary", children: "\u7C7B\u578B" }),
            /* @__PURE__ */ jsxs("dd", { className: "min-w-0 truncate", children: [
              PREVIEW_KIND_LABEL[kind],
              file.ext && /* @__PURE__ */ jsxs("span", { className: "text-text-tertiary", children: [
                "\uFF08.",
                file.ext,
                "\uFF09"
              ] }),
              info?.mime && /* @__PURE__ */ jsxs("span", { className: "text-text-tertiary", children: [
                " \xB7 ",
                info.mime
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "w-16 shrink-0 text-text-tertiary", children: "\u5927\u5C0F" }),
            /* @__PURE__ */ jsx("dd", { children: formatBytes(file.size) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "w-16 shrink-0 text-text-tertiary", children: "\u4FEE\u6539\u65F6\u95F4" }),
            /* @__PURE__ */ jsx("dd", { children: formatDateTime(file.mtime) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "w-16 shrink-0 text-text-tertiary", children: "\u8DEF\u5F84" }),
            /* @__PURE__ */ jsxs("dd", { className: "flex min-w-0 items-center gap-1", children: [
              /* @__PURE__ */ jsx("span", { className: "min-w-0 break-all font-mono", children: file.path }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  onClick: copyPath,
                  "aria-label": "\u590D\u5236\u8DEF\u5F84",
                  className: "shrink-0 p-0.5 text-text-tertiary hover:text-midground",
                  children: copied ? /* @__PURE__ */ jsx(Check, { className: "size-3.5 text-emerald-400" }) : /* @__PURE__ */ jsx(Copy, { className: "size-3.5" })
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsx("dt", { className: "w-16 shrink-0 text-text-tertiary", children: "\u9884\u89C8\u7F13\u5B58" }),
            /* @__PURE__ */ jsx("dd", { children: kind === "none" ? /* @__PURE__ */ jsx("span", { className: "text-text-tertiary", children: "\u4E0D\u9002\u7528" }) : info ? info.preview_cached ? /* @__PURE__ */ jsx("span", { className: "text-emerald-400", children: "\u5DF2\u7F13\u5B58" }) : /* @__PURE__ */ jsx("span", { className: "text-text-tertiary", children: "\u672A\u7F13\u5B58" }) : "-" })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1", children: renderPreview() }),
      zoomed && previewUrl && /* @__PURE__ */ jsxs(
        "div",
        {
          className: "fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 cursor-zoom-out",
          onClick: () => setZoomed(false),
          role: "dialog",
          "aria-label": "\u56FE\u7247\u653E\u5927\u9884\u89C8",
          children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                "aria-label": "\u5173\u95ED",
                className: "absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white hover:bg-white/20",
                onClick: () => setZoomed(false),
                children: /* @__PURE__ */ jsx(X, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsx(
              "img",
              {
                src: previewUrl,
                alt: file.name,
                className: cn("max-h-full max-w-full object-contain"),
                onClick: (e) => e.stopPropagation()
              }
            )
          ]
        }
      )
    ] });
  }

  // src/library/LibraryForwardDialog.tsx
  function LibraryForwardDialog({
    open,
    file,
    onClose,
    onForwarded,
    onToast
  }) {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searching, setSearching] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [note, setNote] = useState("");
    const [forwarding, setForwarding] = useState(null);
    const reqRef = useRef(0);
    const sessionTitle = useCallback(
      (s) => s.title?.trim() || s.id.slice(0, 8),
      []
    );
    useEffect(() => {
      if (!open) return;
      setSearchInput("");
      setSearchResults(null);
      setSelectedId(null);
      setNote("");
      setForwarding(null);
      const myReq = ++reqRef.current;
      setLoading(true);
      api.getSessions(30, 0, void 0, "recent", { excludeSources: "cron" }).then((res) => {
        if (reqRef.current === myReq) setSessions(res.sessions);
      }).catch((e) => {
        if (reqRef.current === myReq) onToast(`\u52A0\u8F7D\u4F1A\u8BDD\u5217\u8868\u5931\u8D25:${e}`, "error");
      }).finally(() => {
        if (reqRef.current === myReq) setLoading(false);
      });
    }, [open]);
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onClose();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onClose]);
    useEffect(() => {
      if (!open) return;
      const q = searchInput.trim();
      if (!q) {
        setSearchResults(null);
        setSearching(false);
        return;
      }
      setSearching(true);
      const myReq = ++reqRef.current;
      const timer = setTimeout(() => {
        api.searchSessions(q).then((res) => {
          if (reqRef.current !== myReq) return;
          setSearchResults(
            res.results.map((r) => {
              const hit = sessions.find((s) => s.id === r.session_id);
              return {
                id: r.session_id,
                title: hit ? sessionTitle(hit) : r.session_id.slice(0, 8),
                preview: r.snippet || hit?.preview || null,
                time: hit?.last_active ?? r.session_started
              };
            })
          );
        }).catch(() => {
          if (reqRef.current === myReq) setSearchResults([]);
        }).finally(() => {
          if (reqRef.current === myReq) setSearching(false);
        });
      }, 300);
      return () => clearTimeout(timer);
    }, [searchInput, open]);
    const rows = useMemo(() => {
      if (searchResults) return searchResults;
      return sessions.map((s) => ({
        id: s.id,
        title: sessionTitle(s),
        preview: s.preview,
        time: s.last_active
      }));
    }, [sessions, searchResults, sessionTitle]);
    const forward = useCallback(
      async (openChat) => {
        if (!file || !selectedId || forwarding) return;
        const row = rows.find((r) => r.id === selectedId);
        setForwarding(openChat ? "open" : "forward");
        try {
          await libraryApi.forwardToChat({
            path: file.path,
            sessionId: selectedId,
            note: note.trim() || void 0
          });
          onForwarded(selectedId, row?.title ?? selectedId.slice(0, 8), openChat);
        } catch (e) {
          onToast(`\u8F6C\u53D1\u5931\u8D25:${e instanceof Error ? e.message : e}`, "error");
          setForwarding(null);
        }
      },
      [file, selectedId, forwarding, rows, note, onForwarded, onToast]
    );
    if (!open || !file) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
        role: "dialog",
        "aria-label": "\u8F6C\u53D1\u5230\u5BF9\u8BDD",
        onClick: onClose,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex max-h-[80vh] w-full max-w-lg flex-col overflow-hidden rounded-md border border-current/15 bg-background-base shadow-xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 items-center gap-2 border-b border-current/10 px-3 py-2", children: [
                /* @__PURE__ */ jsx(Send, { className: "size-4 shrink-0 text-text-secondary" }),
                /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1 truncate text-sm font-medium", title: file.path, children: [
                  "\u8F6C\u53D1\u300C",
                  file.name,
                  "\u300D\u5230\u5BF9\u8BDD"
                ] }),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onClose,
                    "aria-label": "\u5173\u95ED",
                    className: "rounded-sm p-1 text-text-tertiary hover:text-midground",
                    children: /* @__PURE__ */ jsx(X, { className: "size-4" })
                  }
                )
              ] }),
              /* @__PURE__ */ jsx("div", { className: "shrink-0 border-b border-current/10 px-3 py-2", children: /* @__PURE__ */ jsxs("div", { className: "relative", children: [
                /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" }),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    value: searchInput,
                    onChange: (e) => setSearchInput(e.target.value),
                    placeholder: "\u641C\u7D22\u4F1A\u8BDD\u2026",
                    className: "w-full rounded-sm border border-current/15 bg-transparent py-1.5 pl-8 pr-3 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
                  }
                )
              ] }) }),
              /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1 overflow-y-auto", children: loading || searching ? /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center gap-2 px-4 py-10 text-sm text-text-secondary", children: [
                /* @__PURE__ */ jsx(Spinner, {}),
                /* @__PURE__ */ jsx("span", { children: searching ? "\u641C\u7D22\u4E2D\u2026" : "\u52A0\u8F7D\u4F1A\u8BDD\u2026" })
              ] }) : rows.length === 0 ? /* @__PURE__ */ jsx("p", { className: "px-4 py-10 text-center text-sm text-text-tertiary", children: searchResults ? "\u6CA1\u6709\u5339\u914D\u7684\u4F1A\u8BDD" : "\u6682\u65E0\u4F1A\u8BDD" }) : /* @__PURE__ */ jsx("ul", { className: "divide-y divide-current/5", children: rows.map((row) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  onClick: () => setSelectedId(row.id),
                  className: cn(
                    "flex w-full min-w-0 flex-col gap-0.5 px-3 py-2 text-left hover:bg-midground/5",
                    selectedId === row.id && "bg-midground/10"
                  ),
                  children: [
                    /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-2", children: [
                      /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-sm", children: row.title }),
                      row.time && /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs text-text-tertiary", children: formatTimeAgo(row.time) })
                    ] }),
                    row.preview && /* @__PURE__ */ jsx("span", { className: "truncate text-xs text-text-tertiary", children: row.preview })
                  ]
                }
              ) }, row.id)) }) }),
              /* @__PURE__ */ jsxs("div", { className: "shrink-0 space-y-2 border-t border-current/10 px-3 py-2", children: [
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    value: note,
                    onChange: (e) => setNote(e.target.value),
                    rows: 2,
                    placeholder: "\u9644\u8A00\uFF08\u53EF\u9009\uFF0C\u968F\u6587\u4EF6\u4E00\u8D77\u53D1\u7ED9\u6A21\u578B\uFF09",
                    className: "w-full resize-none rounded-sm border border-current/15 bg-transparent px-2 py-1.5 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
                  }
                ),
                /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      type: "button",
                      onClick: onClose,
                      disabled: forwarding !== null,
                      className: "rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
                      children: "\u53D6\u6D88"
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => void forward(false),
                      disabled: !selectedId || forwarding !== null,
                      className: "flex items-center gap-1.5 rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
                      children: [
                        forwarding === "forward" ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsx(Send, { className: "size-3.5" }),
                        "\u8F6C\u53D1"
                      ]
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => void forward(true),
                      disabled: !selectedId || forwarding !== null,
                      className: "flex items-center gap-1.5 rounded-sm border border-current/15 bg-midground/10 px-2.5 py-1.5 text-sm text-midground hover:border-current/30 disabled:opacity-50",
                      children: [
                        forwarding === "open" ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsx(Send, { className: "size-3.5" }),
                        "\u8F6C\u53D1\u5E76\u6253\u5F00"
                      ]
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      }
    );
  }

  // src/library/LibraryOverview.tsx
  var TITLE_BAND_PX = 18;
  var PAD_PX = 2;
  function layoutSliceDice(nodes, x, y, w, h, out) {
    const total = nodes.reduce((s, n) => s + n.value, 0);
    if (total <= 0 || w <= 0 || h <= 0) return;
    const horizontal = nodes[0]?.depth % 2 === 0;
    let offset = 0;
    for (const node of nodes) {
      const frac = node.value / total;
      const rect = horizontal ? { x: x + offset * w, y, w: w * frac, h } : { x, y: y + offset * h, w, h: h * frac };
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
        ...rect
      });
      if (hasChildren && rect.w > 2 * PAD_PX + 8 && rect.h > TITLE_BAND_PX + PAD_PX + 8) {
        layoutSliceDice(
          node.children,
          rect.x + PAD_PX,
          rect.y + TITLE_BAND_PX,
          rect.w - PAD_PX * 2,
          rect.h - TITLE_BAND_PX - PAD_PX,
          out
        );
      }
    }
  }
  var EXT_COLORS = [
    "#60a5fa",
    "#f87171",
    "#34d399",
    "#fbbf24",
    "#a78bfa",
    "#f472b6",
    "#22d3ee",
    "#a3e635",
    "#fb923c",
    "#94a3b8"
  ];
  function LibraryOverview({ onOpenPath, onOpenFile, refreshKey }) {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
      let cancelled = false;
      setLoading(true);
      setError(null);
      libraryApi.getOverview().then((res) => {
        if (!cancelled) setData(res);
      }).catch((e) => {
        if (!cancelled) setError(String(e));
      }).finally(() => {
        if (!cancelled) setLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [refreshKey]);
    const treemapBoxRef = useRef(null);
    const [treemapBox, setTreemapBox] = useState(null);
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
    }, [loading]);
    const treemapItems = useMemo(() => {
      if (!data || !treemapBox) return [];
      const nodes = data.roots.filter((r) => r.total_size > 0).map((r, i) => ({
        key: r.path,
        label: r.name,
        sub: `${formatBytes(r.total_size)} \xB7 ${r.file_count} \u4E2A\u6587\u4EF6`,
        path: r.path,
        value: r.total_size,
        depth: 0,
        hue: i * 67 % 360,
        clickable: true,
        children: r.branches.filter((b) => b.size > 0).map((b) => ({
          key: `${r.path}/${b.name}`,
          label: b.name === "(root)" ? "\uFF08\u6839\u76EE\u5F55\u76F4\u5C5E\uFF09" : b.name,
          sub: formatBytes(b.size),
          path: b.name === "(root)" ? r.path : `${r.path}/${b.name}`,
          value: b.size,
          depth: 1,
          hue: i * 67 % 360,
          clickable: true
        }))
      }));
      const out = [];
      layoutSliceDice(nodes, 0, 0, treemapBox.w, treemapBox.h, out);
      return out;
    }, [data, treemapBox]);
    const extStatsPerRoot = useMemo(() => {
      if (!data) return [];
      return data.roots.map((root) => {
        const agg = {};
        for (const b of root.branches) {
          for (const [ext, count] of Object.entries(b.ext_stats)) {
            agg[ext] = (agg[ext] ?? 0) + count;
          }
        }
        const sorted = Object.entries(agg).sort((a, b) => b[1] - a[1]);
        const top = sorted.slice(0, 5);
        const rest = sorted.slice(5).reduce((s, [, c]) => s + c, 0);
        const entries = rest > 0 ? [...top, ["\u5176\u4ED6", rest]] : top;
        const total = entries.reduce((s, [, c]) => s + c, 0);
        return { root, entries, total };
      });
    }, [data]);
    if (loading) {
      return /* @__PURE__ */ jsxs("div", { className: "flex h-full items-center justify-center gap-2 text-sm text-text-secondary", children: [
        /* @__PURE__ */ jsx(Spinner, {}),
        /* @__PURE__ */ jsx("span", { children: "\u7EDF\u8BA1\u4E2D\uFF08\u5927\u76EE\u5F55\u9996\u6B21\u53EF\u80FD\u8F83\u6162\uFF09\u2026" })
      ] });
    }
    if (error) {
      return /* @__PURE__ */ jsxs("p", { className: "px-4 py-6 text-sm text-red-400", children: [
        "\u52A0\u8F7D\u5931\u8D25:",
        error
      ] });
    }
    if (!data || data.roots.length === 0) {
      return /* @__PURE__ */ jsx("p", { className: "px-4 py-10 text-center text-sm text-text-tertiary", children: "\u5C1A\u672A\u914D\u7F6E\u8D44\u6599\u5E93\u6839\u76EE\u5F55" });
    }
    return /* @__PURE__ */ jsxs("div", { className: "h-full space-y-6 overflow-y-auto p-4", children: [
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary", children: "\u7A7A\u95F4\u5206\u5E03" }),
        data.roots.every((r) => r.total_size <= 0) ? /* @__PURE__ */ jsx("p", { className: "text-sm text-text-tertiary", children: "\uFF08\u7A7A\u5E93\uFF09" }) : /* @__PURE__ */ jsx(
          "div",
          {
            ref: treemapBoxRef,
            className: "relative h-80 w-full overflow-hidden rounded-md border border-current/10",
            children: treemapItems.map((item) => {
              const showLabel = item.hasChildren ? item.w >= 48 && item.h >= TITLE_BAND_PX + 6 : item.w >= 48 && item.h >= 16;
              const showSub = !item.hasChildren && item.w >= 64 && item.h >= 32;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  disabled: !item.clickable,
                  onClick: () => onOpenPath(item.path),
                  title: `${item.label} \xB7 ${item.sub}`,
                  className: "absolute overflow-hidden border border-black/40 text-left transition-colors hover:brightness-125",
                  style: {
                    left: item.x,
                    top: item.y,
                    width: item.w,
                    height: item.h,
                    background: `hsl(${item.hue} 45% 45% / ${item.depth === 0 ? 0.18 : 0.32})`
                  },
                  children: [
                    showLabel && /* @__PURE__ */ jsx(
                      "span",
                      {
                        className: "block truncate px-1.5 text-xs font-medium text-text-primary",
                        style: item.hasChildren ? { height: TITLE_BAND_PX, lineHeight: `${TITLE_BAND_PX}px` } : { paddingTop: 2 },
                        children: item.label
                      }
                    ),
                    showSub && /* @__PURE__ */ jsx("span", { className: "block truncate px-1.5 text-[10px] text-text-secondary", children: item.sub })
                  ]
                },
                `${item.depth}:${item.key}`
              );
            })
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary", children: "\u7C7B\u578B\u7EDF\u8BA1" }),
        /* @__PURE__ */ jsx("div", { className: "space-y-3", children: extStatsPerRoot.map(
          ({ root, entries, total }) => total === 0 ? null : /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsxs("div", { className: "mb-1 flex items-baseline justify-between text-sm", children: [
              /* @__PURE__ */ jsx("span", { className: "font-medium", children: root.name }),
              /* @__PURE__ */ jsxs("span", { className: "text-xs text-text-tertiary", children: [
                root.file_count,
                " \u4E2A\u6587\u4EF6 \xB7 ",
                formatBytes(root.total_size)
              ] })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex h-3 w-full overflow-hidden rounded-sm", children: entries.map(([ext, count], i) => /* @__PURE__ */ jsx(
              "div",
              {
                title: `.${ext} \xB7 ${count} \u4E2A`,
                style: {
                  width: `${count / total * 100}%`,
                  background: EXT_COLORS[i % EXT_COLORS.length]
                }
              },
              ext
            )) }),
            /* @__PURE__ */ jsx("div", { className: "mt-1 flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-text-secondary", children: entries.map(([ext, count], i) => /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(
                "span",
                {
                  className: "inline-block size-2 rounded-full",
                  style: { background: EXT_COLORS[i % EXT_COLORS.length] }
                }
              ),
              ".",
              ext,
              "\uFF08",
              count,
              "\uFF09"
            ] }, ext)) })
          ] }, root.path)
        ) })
      ] }),
      /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h2", { className: "mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary", children: "\u6700\u8FD1\u53D8\u66F4" }),
        data.recent.length === 0 ? /* @__PURE__ */ jsx("p", { className: "text-sm text-text-tertiary", children: "\uFF08\u6682\u65E0\u6587\u4EF6\uFF09" }) : /* @__PURE__ */ jsx("ul", { className: "divide-y divide-current/5 rounded-md border border-current/10", children: data.recent.map((item) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            onClick: () => onOpenFile(item.path),
            title: item.path,
            className: "flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left hover:bg-midground/5",
            children: [
              /* @__PURE__ */ jsx(FileClock, { className: "size-4 shrink-0 text-text-tertiary" }),
              /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                /* @__PURE__ */ jsx("span", { className: "block truncate text-sm", children: item.name }),
                /* @__PURE__ */ jsx("span", { className: "block truncate text-xs text-text-tertiary", children: parentDir(item.path) })
              ] }),
              /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs text-text-secondary", children: formatBytes(item.size) }),
              /* @__PURE__ */ jsx("span", { className: "w-20 shrink-0 text-right text-xs text-text-tertiary", children: formatTimeAgo(item.mtime) })
            ]
          }
        ) }, item.path)) })
      ] })
    ] });
  }

  // src/shared/ConfirmDialog.tsx
  function WarningTriangle({ className }) {
    return /* @__PURE__ */ jsxs(
      "svg",
      {
        "aria-hidden": true,
        className,
        fill: "none",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeLinejoin: "round",
        strokeWidth: 2,
        viewBox: "0 0 24 24",
        children: [
          /* @__PURE__ */ jsx("path", { d: "m10.29 3.86-8.16 14a2 2 0 0 0 1.73 3h16.28a2 2 0 0 0 1.73-3l-8.16-14a2 2 0 0 0-3.46 0z" }),
          /* @__PURE__ */ jsx("line", { x1: "12", x2: "12", y1: "9", y2: "13" }),
          /* @__PURE__ */ jsx("line", { x1: "12", x2: "12.01", y1: "17", y2: "17" })
        ]
      }
    );
  }
  function ConfirmDialog({
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    description,
    destructive = false,
    loading = false,
    onCancel,
    onConfirm,
    open,
    title
  }) {
    useEffect(() => {
      if (!open) return;
      const onKey = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [open, onCancel]);
    if (!open) return null;
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm",
        role: "dialog",
        "aria-label": title,
        onClick: onCancel,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: cn(
              "fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
              "w-[calc(100%-2rem)] max-w-md",
              "border border-midground/15 bg-background-base text-foreground-base shadow-lg outline-none"
            ),
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsxs("div", { className: "flex items-start gap-3 p-4 border-b border-midground/15", children: [
                destructive && /* @__PURE__ */ jsx("div", { "aria-hidden": true, className: "mt-0.5 shrink-0 text-destructive", children: /* @__PURE__ */ jsx(WarningTriangle, { className: "h-4 w-4" }) }),
                /* @__PURE__ */ jsxs("div", { className: "flex-1 min-w-0 flex flex-col gap-1", children: [
                  /* @__PURE__ */ jsx("span", { className: "font-expanded text-sm font-bold tracking-[0.08em] uppercase", children: title }),
                  description && /* @__PURE__ */ jsx("span", { className: "font-mondwest text-xs text-midground/60 leading-relaxed", children: description })
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 p-3", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    disabled: loading,
                    onClick: onCancel,
                    className: "rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
                    children: cancelLabel
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    disabled: loading,
                    onClick: onConfirm,
                    className: cn(
                      "rounded-sm border px-2.5 py-1.5 text-sm disabled:opacity-50",
                      destructive ? "border-destructive/40 bg-destructive/15 text-destructive hover:border-destructive/60" : "border-current/15 bg-midground/10 text-midground hover:border-current/30"
                    ),
                    children: loading ? "\u2026" : confirmLabel
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }

  // src/shared/DeleteConfirmDialog.tsx
  function DeleteConfirmDialog({
    cancelLabel,
    confirmLabel,
    description,
    loading,
    onCancel,
    onConfirm,
    open,
    title
  }) {
    const { t } = useI18n();
    return /* @__PURE__ */ jsx(
      ConfirmDialog,
      {
        open,
        onCancel,
        onConfirm,
        title,
        description,
        loading,
        destructive: true,
        confirmLabel: confirmLabel ?? t.common.delete,
        cancelLabel: cancelLabel ?? t.common.cancel
      }
    );
  }

  // src/LibraryPage.tsx
  function LibraryRenameDialog({
    file,
    loading,
    onCancel,
    onSubmit
  }) {
    const [value, setValue] = useState(file.name);
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onCancel();
        }
      };
      document.addEventListener("keydown", onKey);
      return () => document.removeEventListener("keydown", onKey);
    }, [onCancel]);
    const submit = () => {
      const name = value.trim();
      if (!name || name === file.name || loading) return;
      onSubmit(name);
    };
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: "fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4",
        role: "dialog",
        "aria-label": "\u91CD\u547D\u540D",
        onClick: onCancel,
        children: /* @__PURE__ */ jsxs(
          "div",
          {
            className: "w-full max-w-md rounded-md border border-current/15 bg-background-base shadow-xl",
            onClick: (e) => e.stopPropagation(),
            children: [
              /* @__PURE__ */ jsx("div", { className: "border-b border-current/10 px-3 py-2 text-sm font-medium", children: "\u91CD\u547D\u540D" }),
              /* @__PURE__ */ jsx("div", { className: "px-3 py-3", children: /* @__PURE__ */ jsx(
                "input",
                {
                  type: "text",
                  value,
                  autoFocus: true,
                  onChange: (e) => setValue(e.target.value),
                  onKeyDown: (e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      submit();
                    }
                  },
                  className: "w-full rounded-sm border border-current/15 bg-transparent px-2 py-1.5 text-sm focus:border-current/30 focus:outline-none"
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-end gap-2 border-t border-current/10 px-3 py-2", children: [
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: onCancel,
                    disabled: loading,
                    className: "rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
                    children: "\u53D6\u6D88"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "button",
                  {
                    type: "button",
                    onClick: submit,
                    disabled: loading || !value.trim() || value.trim() === file.name,
                    className: "rounded-sm border border-current/15 bg-midground/10 px-2.5 py-1.5 text-sm text-midground hover:border-current/30 disabled:opacity-50",
                    children: loading ? "\u91CD\u547D\u540D\u4E2D\u2026" : "\u786E\u5B9A"
                  }
                )
              ] })
            ]
          }
        )
      }
    );
  }
  function LibraryPage() {
    const { toast, showToast } = useToast();
    const { setTitle } = usePageHeader();
    const [roots, setRoots] = useState([]);
    const [feedDirs, setFeedDirs] = useState([]);
    const [rootsLoaded, setRootsLoaded] = useState(false);
    const [currentPath, setCurrentPath] = useState(
      () => getLibraryPathParam()
    );
    const [listing, setListing] = useState(null);
    const [listingLoading, setListingLoading] = useState(false);
    const [listingError, setListingError] = useState(null);
    const [selected, setSelected] = useState(null);
    const [view, setView] = useState("browse");
    const [displayMode, setDisplayMode] = useState("grid");
    const [treeCollapsed, setTreeCollapsed] = useState(false);
    const [paneCollapsed, setPaneCollapsed] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const [searchInput, setSearchInput] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState(null);
    const [searchLoading, setSearchLoading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [clipboard, setClipboard] = useState(null);
    const [pendingDelete, setPendingDelete] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [renameTarget, setRenameTarget] = useState(null);
    const [renaming, setRenaming] = useState(false);
    const [forwardOpen, setForwardOpen] = useState(false);
    const [feedMarking, setFeedMarking] = useState(false);
    const pendingSelectRef = useRef(null);
    useLayoutEffect(() => {
      setTitle("\u8D44\u6599\u9986");
      return () => setTitle(null);
    }, [setTitle]);
    const reloadConfig = useCallback(async () => {
      try {
        const res = await libraryApi.getConfig();
        setRoots(res.roots);
        setFeedDirs(res.feed_dirs);
        setRootsLoaded(true);
        setCurrentPath((prev) => prev ?? res.roots[0]?.path ?? null);
      } catch (e) {
        setRootsLoaded(true);
        showToast(`\u52A0\u8F7D\u8D44\u6599\u9986\u914D\u7F6E\u5931\u8D25:${e}`, "error");
      }
    }, [showToast]);
    useEffect(() => {
      void reloadConfig();
    }, []);
    useEffect(() => {
      if (!currentPath || view !== "browse") return;
      if (feedBranchOf(roots, currentPath) || feedDirOf(feedDirs, currentPath)) {
        setListing(null);
        setSelected(null);
        setListingLoading(false);
        setListingError(null);
        return;
      }
      let cancelled = false;
      setListingLoading(true);
      setListingError(null);
      libraryApi.getTree(currentPath).then((res) => {
        if (cancelled) return;
        setListing(res);
        const pending = pendingSelectRef.current;
        if (pending) {
          pendingSelectRef.current = null;
          const hit = res.files.find((f) => f.path === pending);
          if (hit) {
            setSelected(hit);
            setPaneCollapsed(false);
            return;
          }
        }
        setSelected(null);
      }).catch((e) => {
        if (!cancelled) {
          setListing(null);
          setSelected(null);
          setListingError(String(e));
        }
      }).finally(() => {
        if (!cancelled) setListingLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [currentPath, view, refreshKey, roots, feedDirs]);
    useEffect(() => {
      const timer = setTimeout(() => setSearchQuery(searchInput.trim()), 300);
      return () => clearTimeout(timer);
    }, [searchInput]);
    useEffect(() => {
      if (!searchQuery) {
        setSearchResults(null);
        return;
      }
      let cancelled = false;
      setSearchLoading(true);
      libraryApi.search(searchQuery).then((res) => {
        if (!cancelled) setSearchResults(res.results);
      }).catch((e) => {
        if (!cancelled) {
          setSearchResults([]);
          showToast(`\u641C\u7D22\u5931\u8D25:${e}`, "error");
        }
      }).finally(() => {
        if (!cancelled) setSearchLoading(false);
      });
      return () => {
        cancelled = true;
      };
    }, [searchQuery]);
    const navigate = useCallback(
      (path) => {
        setCurrentPath(path);
        setView("browse");
        setSearchInput("");
        setSearchQuery("");
        setSearchResults(null);
        replaceLibraryPathParam(path);
      },
      []
    );
    const handleRefresh = useCallback(() => {
      setRefreshKey((k) => k + 1);
      if (currentPath && view === "browse") {
      }
    }, [currentPath, view]);
    const handleSync = useCallback(async () => {
      if (syncing) return;
      setSyncing(true);
      try {
        const res = await libraryApi.sync();
        showToast(
          `\u540C\u6B65\u5B8C\u6210\uFF1A\u6E05\u7406 ${res.removed_orphans} \u4E2A\u5931\u6548\u7D22\u5F15\u3001${res.evicted} \u4E2A\u7F13\u5B58\u6587\u4EF6\uFF0C\u5F53\u524D\u7F13\u5B58 ${formatBytes(res.cache_bytes)}`,
          "success"
        );
        setRefreshKey((k) => k + 1);
      } catch (e) {
        showToast(`\u540C\u6B65\u5931\u8D25:${e}`, "error");
      } finally {
        setSyncing(false);
      }
    }, [syncing, showToast]);
    const openFileLocation = useCallback(
      (filePath) => {
        pendingSelectRef.current = filePath;
        navigate(parentDir(filePath));
      },
      [navigate]
    );
    const handleSelectFile = useCallback((file) => {
      setSelected(file);
    }, []);
    const handleOpenFile = useCallback((file) => {
      setSelected(file);
      setPaneCollapsed(false);
    }, []);
    const handleCopy = useCallback(() => {
      if (!selected) return;
      setClipboard({ paths: [selected.path], mode: "copy" });
      showToast("\u5DF2\u590D\u5236 1 \u9879", "success");
    }, [selected, showToast]);
    const handleCut = useCallback(() => {
      if (!selected) return;
      setClipboard({ paths: [selected.path], mode: "cut" });
      showToast("\u5DF2\u526A\u5207 1 \u9879", "success");
    }, [selected, showToast]);
    const handlePaste = useCallback(async () => {
      if (!clipboard || !currentPath) return;
      try {
        const res = await libraryApi.pasteEntries(
          clipboard.paths,
          currentPath,
          clipboard.mode
        );
        showToast(`\u5DF2\u7C98\u8D34 ${res.pasted} \u9879`, "success");
        if (clipboard.mode === "cut") {
          if (selected && clipboard.paths.includes(selected.path)) {
            setSelected(null);
          }
          setClipboard(null);
        }
        setRefreshKey((k) => k + 1);
      } catch (e) {
        showToast(`\u7C98\u8D34\u5931\u8D25:${e instanceof Error ? e.message : e}`, "error");
      }
    }, [clipboard, currentPath, selected, showToast]);
    const handleDelete = useCallback(() => {
      if (!selected) return;
      setPendingDelete(selected);
    }, [selected]);
    const confirmDelete = useCallback(async () => {
      if (!pendingDelete) return;
      setDeleting(true);
      try {
        await libraryApi.deleteEntries([pendingDelete.path]);
        showToast("\u5DF2\u5220\u9664", "success");
        if (selected?.path === pendingDelete.path) setSelected(null);
        setClipboard(
          (prev) => prev && prev.paths.includes(pendingDelete.path) ? null : prev
        );
        setPendingDelete(null);
        setRefreshKey((k) => k + 1);
      } catch (e) {
        showToast(`\u5220\u9664\u5931\u8D25:${e instanceof Error ? e.message : e}`, "error");
      } finally {
        setDeleting(false);
      }
    }, [pendingDelete, selected, showToast]);
    const handleRename = useCallback(() => {
      if (!selected) return;
      setRenameTarget(selected);
    }, [selected]);
    const submitRename = useCallback(
      async (newName) => {
        if (!renameTarget) return;
        setRenaming(true);
        try {
          const res = await libraryApi.renameEntry(renameTarget.path, newName);
          showToast("\u5DF2\u91CD\u547D\u540D", "success");
          if (selected?.path === renameTarget.path) {
            setSelected({ ...selected, path: res.renamed, name: newName });
          }
          setRenameTarget(null);
          setRefreshKey((k) => k + 1);
        } catch (e) {
          showToast(`\u91CD\u547D\u540D\u5931\u8D25:${e instanceof Error ? e.message : e}`, "error");
        } finally {
          setRenaming(false);
        }
      },
      [renameTarget, selected, showToast]
    );
    const handleForward = useCallback(() => {
      if (!selected) return;
      setForwardOpen(true);
    }, [selected]);
    const handleForwarded = useCallback(
      (sessionId, sessionTitle, openChat) => {
        setForwardOpen(false);
        showToast(`\u5DF2\u8F6C\u53D1\u5230 ${sessionTitle}`, "success");
        if (openChat) {
          navigateToChat(sessionId);
        }
      },
      [showToast]
    );
    const handleFeedMark = useCallback(
      async (mark) => {
        if (!currentPath || feedMarking) return;
        setFeedMarking(true);
        try {
          if (mark) {
            await libraryApi.markFeed(currentPath);
            showToast("\u5DF2\u6807\u8BB0\u4E3A\u4FE1\u606F\u6E90", "success");
          } else {
            await libraryApi.unmarkFeed(currentPath);
            showToast("\u5DF2\u53D6\u6D88\u4FE1\u606F\u6E90\u6807\u8BB0\uFF08\u9605\u8BFB\u72B6\u6001\u4FDD\u7559\uFF09", "success");
          }
          await reloadConfig();
          setRefreshKey((k) => k + 1);
        } catch (e) {
          showToast(
            `${mark ? "\u6807\u8BB0" : "\u53D6\u6D88"}\u5931\u8D25:${e instanceof Error ? e.message : e}`,
            "error"
          );
        } finally {
          setFeedMarking(false);
        }
      },
      [currentPath, feedMarking, reloadConfig, showToast]
    );
    const searching = searchQuery.length > 0;
    const feedBranch = feedBranchOf(roots, currentPath);
    const feedDir = feedDirOf(feedDirs, currentPath);
    const isFeed = feedBranch !== null || feedDir !== null;
    return /* @__PURE__ */ jsxs("div", { className: "hermes-library flex min-h-0 w-full min-w-0 flex-1 flex-col pt-1 sm:pt-2", children: [
      /* @__PURE__ */ jsx(Toast, { toast }),
      /* @__PURE__ */ jsxs("div", { className: "flex shrink-0 flex-wrap items-center gap-2 border-b border-current/10 pb-2", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex items-center rounded-sm border border-current/15", children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-pressed": view === "browse",
              onClick: () => setView("browse"),
              className: cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-sm",
                view === "browse" ? "bg-midground/10 text-midground" : "text-text-secondary hover:text-midground"
              ),
              children: [
                /* @__PURE__ */ jsx(FolderTree, { className: "size-4" }),
                "\u6D4F\u89C8"
              ]
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-pressed": view === "overview",
              onClick: () => setView("overview"),
              className: cn(
                "flex items-center gap-1.5 px-2.5 py-1.5 text-sm",
                view === "overview" ? "bg-midground/10 text-midground" : "text-text-secondary hover:text-midground"
              ),
              children: [
                /* @__PURE__ */ jsx(LayoutDashboard, { className: "size-4" }),
                "\u603B\u89C8"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "relative min-w-40 flex-1 sm:max-w-sm", children: [
          /* @__PURE__ */ jsx(Search, { className: "pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-text-tertiary" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              value: searchInput,
              onChange: (e) => setSearchInput(e.target.value),
              onKeyDown: (e) => {
                if (e.key === "Escape") {
                  setSearchInput("");
                  setSearchQuery("");
                  setSearchResults(null);
                }
              },
              placeholder: "\u641C\u7D22\u6587\u4EF6\u540D\u2026",
              className: "w-full rounded-sm border border-current/15 bg-transparent py-1.5 pl-8 pr-8 text-sm placeholder:text-text-tertiary focus:border-current/30 focus:outline-none"
            }
          ),
          searchInput && /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u6E05\u7A7A\u641C\u7D22",
              onClick: () => {
                setSearchInput("");
                setSearchQuery("");
                setSearchResults(null);
              },
              className: "absolute right-1.5 top-1/2 -translate-y-1/2 p-0.5 text-text-tertiary hover:text-midground",
              children: /* @__PURE__ */ jsx(X, { className: "size-4" })
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-1", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              title: "\u5237\u65B0",
              className: "rounded-sm border border-current/15 p-1.5 text-text-secondary hover:border-current/30 hover:text-midground",
              children: /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" })
            }
          ),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => void handleSync(),
              disabled: syncing,
              className: "flex items-center gap-1.5 rounded-sm border border-current/15 px-2.5 py-1.5 text-sm text-text-secondary hover:border-current/30 hover:text-midground disabled:opacity-50",
              children: [
                syncing ? /* @__PURE__ */ jsx(Spinner, {}) : /* @__PURE__ */ jsx(RefreshCw, { className: "size-4" }),
                "\u540C\u6B65\u7F13\u5B58"
              ]
            }
          )
        ] })
      ] }),
      view === "overview" ? /* @__PURE__ */ jsx("div", { className: "min-h-0 flex-1", children: /* @__PURE__ */ jsx(
        LibraryOverview,
        {
          onOpenPath: navigate,
          onOpenFile: openFileLocation,
          refreshKey
        }
      ) }) : /* @__PURE__ */ jsxs("div", { className: "flex min-h-0 min-w-0 flex-1 overflow-hidden", children: [
        treeCollapsed ? /* @__PURE__ */ jsx("div", { className: "flex w-8 shrink-0 flex-col items-center border-r border-current/10 pt-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "\u5C55\u5F00\u76EE\u5F55\u6811",
            title: "\u5C55\u5F00\u76EE\u5F55\u6811",
            onClick: () => setTreeCollapsed(false),
            className: "p-1 text-text-tertiary hover:text-midground",
            children: /* @__PURE__ */ jsx(PanelLeftOpen, { className: "size-4" })
          }
        ) }) : /* @__PURE__ */ jsx("aside", { className: "flex w-60 shrink-0 flex-col border-r border-current/10", children: /* @__PURE__ */ jsx("div", { className: "flex min-h-0 flex-1 flex-col", children: /* @__PURE__ */ jsxs("div", { className: "relative min-h-0 flex-1", children: [
          /* @__PURE__ */ jsx(
            LibraryTree,
            {
              roots,
              currentPath,
              refreshKey,
              onNavigate: navigate
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u6536\u8D77\u76EE\u5F55\u6811",
              title: "\u6536\u8D77\u76EE\u5F55\u6811",
              onClick: () => setTreeCollapsed(true),
              className: "absolute right-1 top-1.5 p-1 text-text-tertiary hover:text-midground",
              children: /* @__PURE__ */ jsx(PanelLeftClose, { className: "size-3.5" })
            }
          )
        ] }) }) }),
        /* @__PURE__ */ jsx("main", { className: "min-w-0 flex-1", children: searching ? /* @__PURE__ */ jsxs("div", { className: "flex h-full min-h-0 flex-col", children: [
          /* @__PURE__ */ jsx("div", { className: "border-b border-current/10 px-3 py-2 text-sm text-text-secondary", children: searchLoading ? /* @__PURE__ */ jsxs("span", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            " \u641C\u7D22\u300C",
            searchQuery,
            "\u300D\u2026"
          ] }) : /* @__PURE__ */ jsxs(Fragment2, { children: [
            "\u300C",
            searchQuery,
            "\u300D\u7684\u641C\u7D22\u7ED3\u679C\uFF08",
            searchResults?.length ?? 0,
            "\uFF09\xB7 Esc \u6216\u6E05\u7A7A\u8FD4\u56DE\u6D4F\u89C8"
          ] }) }),
          /* @__PURE__ */ jsxs("div", { className: "min-h-0 flex-1 overflow-y-auto", children: [
            !searchLoading && searchResults?.length === 0 && /* @__PURE__ */ jsx("p", { className: "px-4 py-10 text-center text-sm text-text-tertiary", children: "\u6CA1\u6709\u5339\u914D\u7684\u6587\u4EF6" }),
            /* @__PURE__ */ jsx("ul", { className: "divide-y divide-current/5", children: (searchResults ?? []).map((file) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs(
              "button",
              {
                type: "button",
                onClick: () => openFileLocation(file.path),
                title: file.path,
                className: "flex w-full min-w-0 items-center gap-3 px-3 py-2 text-left hover:bg-midground/5",
                children: [
                  /* @__PURE__ */ jsxs("span", { className: "min-w-0 flex-1", children: [
                    /* @__PURE__ */ jsx("span", { className: "block truncate text-sm", children: file.name }),
                    /* @__PURE__ */ jsx("span", { className: "block truncate text-xs text-text-tertiary", children: parentDir(file.path) })
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 text-xs text-text-secondary", children: formatBytes(file.size) })
                ]
              }
            ) }, file.path)) })
          ] })
        ] }) : isFeed && currentPath ? /* @__PURE__ */ jsx(
          LibraryFeedView,
          {
            path: currentPath,
            refreshKey,
            selectedPath: selected?.path ?? null,
            onSelectFile: handleSelectFile,
            onOpenFile: handleOpenFile,
            onToast: showToast,
            onUnmarkFeed: feedBranch || feedDir ? () => void handleFeedMark(false) : void 0,
            unmarkOrigin: feedBranch ? "branch" : "dir",
            unmarkBusy: feedMarking
          }
        ) : /* @__PURE__ */ jsx(
          LibraryFileArea,
          {
            roots,
            listing,
            loading: listingLoading || !rootsLoaded,
            error: listingError,
            displayMode,
            onDisplayModeChange: setDisplayMode,
            selectedPath: selected?.path ?? null,
            onSelectFile: handleSelectFile,
            onOpenFile: handleOpenFile,
            onNavigate: navigate,
            clipboard,
            onPaste: () => void handlePaste(),
            onMarkFeed: currentPath ? () => void handleFeedMark(true) : void 0,
            markBusy: feedMarking
          }
        ) }),
        paneCollapsed ? /* @__PURE__ */ jsx("div", { className: "flex w-8 shrink-0 flex-col items-center border-l border-current/10 pt-2", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            "aria-label": "\u5C55\u5F00\u9884\u89C8\u9762\u677F",
            title: "\u5C55\u5F00\u9884\u89C8\u9762\u677F",
            onClick: () => setPaneCollapsed(false),
            className: "p-1 text-text-tertiary hover:text-midground",
            children: /* @__PURE__ */ jsx(PanelRightOpen, { className: "size-4" })
          }
        ) }) : /* @__PURE__ */ jsxs("aside", { className: "relative w-100 max-w-[45vw] shrink-0 border-l border-current/10 max-lg:hidden", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-label": "\u6536\u8D77\u9884\u89C8\u9762\u677F",
              title: "\u6536\u8D77\u9884\u89C8\u9762\u677F",
              onClick: () => setPaneCollapsed(true),
              className: "absolute left-1 top-1.5 z-10 p-1 text-text-tertiary hover:text-midground",
              children: /* @__PURE__ */ jsx(PanelRightClose, { className: "size-3.5" })
            }
          ),
          /* @__PURE__ */ jsx(
            LibraryPreviewPane,
            {
              file: selected,
              refreshKey,
              onCopy: isFeed ? void 0 : handleCopy,
              onCut: isFeed ? void 0 : handleCut,
              onRename: isFeed ? void 0 : handleRename,
              onDelete: isFeed ? void 0 : handleDelete,
              onForward: isFeed ? void 0 : handleForward
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        DeleteConfirmDialog,
        {
          open: pendingDelete !== null,
          title: "\u5220\u9664\u6587\u4EF6",
          description: `\u786E\u5B9A\u5220\u9664\u300C${pendingDelete?.name ?? ""}\u300D\u5417\uFF1F\u6B64\u64CD\u4F5C\u4E0D\u53EF\u6062\u590D\u3002`,
          confirmLabel: "\u5220\u9664",
          loading: deleting,
          onConfirm: () => void confirmDelete(),
          onCancel: () => setPendingDelete(null)
        }
      ),
      renameTarget && /* @__PURE__ */ jsx(
        LibraryRenameDialog,
        {
          file: renameTarget,
          loading: renaming,
          onCancel: () => setRenameTarget(null),
          onSubmit: (name) => void submitRename(name)
        }
      ),
      /* @__PURE__ */ jsx(
        LibraryForwardDialog,
        {
          open: forwardOpen,
          file: selected,
          onClose: () => setForwardOpen(false),
          onForwarded: handleForwarded,
          onToast: showToast
        }
      )
    ] });
  }

  // src/index.tsx
  var registry = window.__HERMES_PLUGINS__;
  if (!registry) {
    console.warn("[library] plugin registry is not available \u2014 not registering");
  } else {
    registry.register("library", LibraryPage);
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
lucide-react/dist/esm/icons/check.js:
lucide-react/dist/esm/icons/chevron-down.js:
lucide-react/dist/esm/icons/chevron-right.js:
lucide-react/dist/esm/icons/clipboard-paste.js:
lucide-react/dist/esm/icons/copy.js:
lucide-react/dist/esm/icons/external-link.js:
lucide-react/dist/esm/icons/eye.js:
lucide-react/dist/esm/icons/file-clock.js:
lucide-react/dist/esm/icons/file-code.js:
lucide-react/dist/esm/icons/file-headphone.js:
lucide-react/dist/esm/icons/file-image.js:
lucide-react/dist/esm/icons/file-play.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/file.js:
lucide-react/dist/esm/icons/folder-open.js:
lucide-react/dist/esm/icons/folder-tree.js:
lucide-react/dist/esm/icons/folder.js:
lucide-react/dist/esm/icons/hard-drive.js:
lucide-react/dist/esm/icons/layout-grid.js:
lucide-react/dist/esm/icons/layout-dashboard.js:
lucide-react/dist/esm/icons/list.js:
lucide-react/dist/esm/icons/notebook-pen.js:
lucide-react/dist/esm/icons/panel-left-close.js:
lucide-react/dist/esm/icons/panel-left-open.js:
lucide-react/dist/esm/icons/panel-right-close.js:
lucide-react/dist/esm/icons/panel-right-open.js:
lucide-react/dist/esm/icons/pen-line.js:
lucide-react/dist/esm/icons/pencil.js:
lucide-react/dist/esm/icons/refresh-cw.js:
lucide-react/dist/esm/icons/rss.js:
lucide-react/dist/esm/icons/save.js:
lucide-react/dist/esm/icons/scissors.js:
lucide-react/dist/esm/icons/search.js:
lucide-react/dist/esm/icons/send.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v0.577.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
