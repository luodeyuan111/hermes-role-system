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

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-off.js
  var __iconNode9 = [
    ["path", { d: "m2 2 20 20", key: "1ooewy" }],
    ["path", { d: "M8.35 2.69A10 10 0 0 1 21.3 15.65", key: "1pfsoa" }],
    ["path", { d: "M19.08 19.08A10 10 0 1 1 4.92 4.92", key: "1ablyi" }]
  ];
  var CircleOff = createLucideIcon("circle-off", __iconNode9);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-question-mark.js
  var __iconNode10 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
    ["path", { d: "M12 17h.01", key: "p32p05" }]
  ];
  var CircleQuestionMark = createLucideIcon("circle-question-mark", __iconNode10);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle-slash.js
  var __iconNode11 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["line", { x1: "9", x2: "15", y1: "15", y2: "9", key: "1dfufj" }]
  ];
  var CircleSlash = createLucideIcon("circle-slash", __iconNode11);

  // ../../../node_modules/lucide-react/dist/esm/icons/circle.js
  var __iconNode12 = [["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }]];
  var Circle = createLucideIcon("circle", __iconNode12);

  // ../../../node_modules/lucide-react/dist/esm/icons/copy.js
  var __iconNode13 = [
    ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
    ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
  ];
  var Copy = createLucideIcon("copy", __iconNode13);

  // ../../../node_modules/lucide-react/dist/esm/icons/cpu.js
  var __iconNode14 = [
    ["path", { d: "M12 20v2", key: "1lh1kg" }],
    ["path", { d: "M12 2v2", key: "tus03m" }],
    ["path", { d: "M17 20v2", key: "1rnc9c" }],
    ["path", { d: "M17 2v2", key: "11trls" }],
    ["path", { d: "M2 12h2", key: "1t8f8n" }],
    ["path", { d: "M2 17h2", key: "7oei6x" }],
    ["path", { d: "M2 7h2", key: "asdhe0" }],
    ["path", { d: "M20 12h2", key: "1q8mjw" }],
    ["path", { d: "M20 17h2", key: "1fpfkl" }],
    ["path", { d: "M20 7h2", key: "1o8tra" }],
    ["path", { d: "M7 20v2", key: "4gnj0m" }],
    ["path", { d: "M7 2v2", key: "1i4yhu" }],
    ["rect", { x: "4", y: "4", width: "16", height: "16", rx: "2", key: "1vbyd7" }],
    ["rect", { x: "8", y: "8", width: "8", height: "8", rx: "1", key: "z9xiuo" }]
  ];
  var Cpu = createLucideIcon("cpu", __iconNode14);

  // ../../../node_modules/lucide-react/dist/esm/icons/file-text.js
  var __iconNode15 = [
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
  var FileText = createLucideIcon("file-text", __iconNode15);

  // ../../../node_modules/lucide-react/dist/esm/icons/file.js
  var __iconNode16 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }]
  ];
  var File2 = createLucideIcon("file", __iconNode16);

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

  // ../../../node_modules/lucide-react/dist/esm/icons/image-off.js
  var __iconNode18 = [
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
  var ImageOff = createLucideIcon("image-off", __iconNode18);

  // ../../../node_modules/lucide-react/dist/esm/icons/image-plus.js
  var __iconNode19 = [
    ["path", { d: "M16 5h6", key: "1vod17" }],
    ["path", { d: "M19 2v6", key: "4bpg5p" }],
    ["path", { d: "M21 11.5V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7.5", key: "1ue2ih" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }]
  ];
  var ImagePlus = createLucideIcon("image-plus", __iconNode19);

  // ../../../node_modules/lucide-react/dist/esm/icons/image.js
  var __iconNode20 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  var Image = createLucideIcon("image", __iconNode20);

  // ../../../node_modules/lucide-react/dist/esm/icons/list-checks.js
  var __iconNode21 = [
    ["path", { d: "M13 5h8", key: "a7qcls" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["path", { d: "m3 7 2 2 4-4", key: "1obspn" }]
  ];
  var ListChecks = createLucideIcon("list-checks", __iconNode21);

  // ../../../node_modules/lucide-react/dist/esm/icons/list-todo.js
  var __iconNode22 = [
    ["path", { d: "M13 5h8", key: "a7qcls" }],
    ["path", { d: "M13 12h8", key: "h98zly" }],
    ["path", { d: "M13 19h8", key: "c3s6r1" }],
    ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
    ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
  ];
  var ListTodo = createLucideIcon("list-todo", __iconNode22);

  // ../../../node_modules/lucide-react/dist/esm/icons/loader-circle.js
  var __iconNode23 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  var LoaderCircle = createLucideIcon("loader-circle", __iconNode23);

  // ../../../node_modules/lucide-react/dist/esm/icons/message-square-plus.js
  var __iconNode24 = [
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
  var MessageSquarePlus = createLucideIcon("message-square-plus", __iconNode24);

  // ../../../node_modules/lucide-react/dist/esm/icons/message-square.js
  var __iconNode25 = [
    [
      "path",
      {
        d: "M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",
        key: "18887p"
      }
    ]
  ];
  var MessageSquare = createLucideIcon("message-square", __iconNode25);

  // ../../../node_modules/lucide-react/dist/esm/icons/music.js
  var __iconNode26 = [
    ["path", { d: "M9 18V5l12-2v13", key: "1jmyc2" }],
    ["circle", { cx: "6", cy: "18", r: "3", key: "fqmcym" }],
    ["circle", { cx: "18", cy: "16", r: "3", key: "1hluhg" }]
  ];
  var Music = createLucideIcon("music", __iconNode26);

  // ../../../node_modules/lucide-react/dist/esm/icons/palette.js
  var __iconNode27 = [
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
  var Palette = createLucideIcon("palette", __iconNode27);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-close.js
  var __iconNode28 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m16 15-3-3 3-3", key: "14y99z" }]
  ];
  var PanelLeftClose = createLucideIcon("panel-left-close", __iconNode28);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left-open.js
  var __iconNode29 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }],
    ["path", { d: "m14 9 3 3-3 3", key: "8010ee" }]
  ];
  var PanelLeftOpen = createLucideIcon("panel-left-open", __iconNode29);

  // ../../../node_modules/lucide-react/dist/esm/icons/panel-left.js
  var __iconNode30 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }],
    ["path", { d: "M9 3v18", key: "fh3hqa" }]
  ];
  var PanelLeft = createLucideIcon("panel-left", __iconNode30);

  // ../../../node_modules/lucide-react/dist/esm/icons/paperclip.js
  var __iconNode31 = [
    [
      "path",
      {
        d: "m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551",
        key: "1miecu"
      }
    ]
  ];
  var Paperclip = createLucideIcon("paperclip", __iconNode31);

  // ../../../node_modules/lucide-react/dist/esm/icons/pencil.js
  var __iconNode32 = [
    [
      "path",
      {
        d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
        key: "1a8usu"
      }
    ],
    ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
  ];
  var Pencil = createLucideIcon("pencil", __iconNode32);

  // ../../../node_modules/lucide-react/dist/esm/icons/phone-call.js
  var __iconNode33 = [
    ["path", { d: "M13 2a9 9 0 0 1 9 9", key: "1itnx2" }],
    ["path", { d: "M13 6a5 5 0 0 1 5 5", key: "11nki7" }],
    [
      "path",
      {
        d: "M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384",
        key: "9njp5v"
      }
    ]
  ];
  var PhoneCall = createLucideIcon("phone-call", __iconNode33);

  // ../../../node_modules/lucide-react/dist/esm/icons/plus.js
  var __iconNode34 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode34);

  // ../../../node_modules/lucide-react/dist/esm/icons/refresh-cw.js
  var __iconNode35 = [
    ["path", { d: "M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8", key: "v9h5vc" }],
    ["path", { d: "M21 3v5h-5", key: "1q7to0" }],
    ["path", { d: "M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16", key: "3uifl3" }],
    ["path", { d: "M8 16H3v5", key: "1cv678" }]
  ];
  var RefreshCw = createLucideIcon("refresh-cw", __iconNode35);

  // ../../../node_modules/lucide-react/dist/esm/icons/rotate-ccw.js
  var __iconNode36 = [
    ["path", { d: "M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8", key: "1357e3" }],
    ["path", { d: "M3 3v5h5", key: "1xhq8a" }]
  ];
  var RotateCcw = createLucideIcon("rotate-ccw", __iconNode36);

  // ../../../node_modules/lucide-react/dist/esm/icons/send-horizontal.js
  var __iconNode37 = [
    [
      "path",
      {
        d: "M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z",
        key: "117uat"
      }
    ],
    ["path", { d: "M6 12h16", key: "s4cdu5" }]
  ];
  var SendHorizontal = createLucideIcon("send-horizontal", __iconNode37);

  // ../../../node_modules/lucide-react/dist/esm/icons/shield-alert.js
  var __iconNode38 = [
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
  var ShieldAlert = createLucideIcon("shield-alert", __iconNode38);

  // ../../../node_modules/lucide-react/dist/esm/icons/sparkles.js
  var __iconNode39 = [
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
  var Sparkles = createLucideIcon("sparkles", __iconNode39);

  // ../../../node_modules/lucide-react/dist/esm/icons/square.js
  var __iconNode40 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
  ];
  var Square = createLucideIcon("square", __iconNode40);

  // ../../../node_modules/lucide-react/dist/esm/icons/star.js
  var __iconNode41 = [
    [
      "path",
      {
        d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
        key: "r04s7s"
      }
    ]
  ];
  var Star = createLucideIcon("star", __iconNode41);

  // ../../../node_modules/lucide-react/dist/esm/icons/terminal.js
  var __iconNode42 = [
    ["path", { d: "M12 19h8", key: "baeox8" }],
    ["path", { d: "m4 17 6-6-6-6", key: "1yngyt" }]
  ];
  var Terminal = createLucideIcon("terminal", __iconNode42);

  // ../../../node_modules/lucide-react/dist/esm/icons/timer.js
  var __iconNode43 = [
    ["line", { x1: "10", x2: "14", y1: "2", y2: "2", key: "14vaq8" }],
    ["line", { x1: "12", x2: "15", y1: "14", y2: "11", key: "17fdiu" }],
    ["circle", { cx: "12", cy: "14", r: "8", key: "1e1u0o" }]
  ];
  var Timer = createLucideIcon("timer", __iconNode43);

  // ../../../node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode44 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode44);

  // ../../../node_modules/lucide-react/dist/esm/icons/wrench.js
  var __iconNode45 = [
    [
      "path",
      {
        d: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.106-3.105c.32-.322.863-.22.983.218a6 6 0 0 1-8.259 7.057l-7.91 7.91a1 1 0 0 1-2.999-3l7.91-7.91a6 6 0 0 1 7.057-8.259c.438.12.54.662.219.984z",
        key: "1ngwbx"
      }
    ]
  ];
  var Wrench = createLucideIcon("wrench", __iconNode45);

  // ../../../node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode46 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode46);

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
  function directFileUrl(path2) {
    const token = window.__HERMES_SESSION_TOKEN__;
    if (!token) return null;
    return `${HERMES_BASE_PATH}/api/files/download?path=${encodeURIComponent(path2)}&token=${encodeURIComponent(token)}`;
  }
  async function fetchFileBlobUrl(path2) {
    const res = await authedFetch(
      `/api/files/download?path=${encodeURIComponent(path2)}`
    );
    if (!res.ok) throw new Error(`\u4E0B\u8F7D\u5931\u8D25\uFF1AHTTP ${res.status}`);
    return URL.createObjectURL(await res.blob());
  }
  async function resolveFileUrl(path2) {
    return directFileUrl(path2) ?? fetchFileBlobUrl(path2);
  }
  async function resolveImageUrl(path2) {
    try {
      const res = await fetchJSON(
        `/api/media?path=${encodeURIComponent(path2)}`
      );
      return res.data_url;
    } catch {
      return resolveFileUrl(path2);
    }
  }
  async function openInSystemApp(path2, reveal = false) {
    const res = await authedFetch("/api/files/open", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ path: path2, reveal })
    });
    if (!res.ok) {
      const text2 = await res.text().catch(() => "");
      throw new Error(text2 || `HTTP ${res.status}`);
    }
  }
  async function downloadFile(path2, name) {
    const direct = directFileUrl(path2);
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
    const blobUrl = await fetchFileBlobUrl(path2);
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
      for (let i2 = 0; i2 < data.items.length; i2++) {
        const item = data.items[i2];
        if (item.kind === "file") add(item, item.getAsFile());
      }
    }
    if (data.files?.length) {
      for (let i2 = 0; i2 < data.files.length; i2++) {
        add(null, data.files[i2]);
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
      const text2 = await res.text().catch(() => res.statusText);
      throw new Error(text2 || `HTTP ${res.status}`);
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
    const [path2, setPath] = useState(() => {
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
      if (!path2) {
        setUrl(null);
        return;
      }
      let cancelled = false;
      let blobUrl = null;
      resolveImageUrl(path2).then((u) => {
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
    }, [path2]);
    return { path: path2, url, apply };
  }
  function ChatBackgroundPicker({
    bg,
    profile,
    avatar
  }) {
    const [open2, setOpen] = useState(false);
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
      open2 && /* @__PURE__ */ jsxs(Fragment2, { children: [
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
  function writeRoleSkills(name, text2) {
    return fetchJSON(`${BASE}/roles/${encodeURIComponent(name)}/skills`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: text2 })
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
      const text2 = typeof raw === "string" ? raw : String(raw);
      let frame;
      try {
        frame = JSON.parse(text2);
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
  function normalizeEndpointPath(path2) {
    return path2.startsWith("/") ? path2 : `/${path2}`;
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
    for (let i2 = messages.length - 1; i2 >= 0; i2--) {
      const m = messages[i2];
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
    const { text: text2, images } = decodeMessageContentParts(msg.content);
    if (msg.role === "tool") {
      out.push({
        ...base,
        id: `h${index}`,
        role: "tool",
        text: "",
        toolName: msg.tool_name ?? "tool",
        toolRunning: false,
        toolCallId: msg.tool_call_id,
        toolResult: text2 || void 0
      });
      return out;
    }
    const reasoning = msg.reasoning || msg.reasoning_content || msg.reasoning_details || void 0;
    out.push({
      ...base,
      id: `h${index}`,
      role: msg.role,
      text: text2,
      reasoning: msg.role === "assistant" ? reasoning : void 0,
      images: images.length > 0 ? images : void 0
    });
    if (msg.role === "assistant" && msg.tool_calls) {
      msg.tool_calls.forEach((tc, i2) => {
        out.push({
          ...base,
          id: `h${index}t${i2}`,
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
  function systemMessage(text2) {
    return { id: messageId(), role: "system", text: text2, timestamp: nowSeconds() };
  }
  var SUBAGENT_ACTIVITY_CAP = 60;
  function appendSubagentActivity(list, item) {
    const next = [...list ?? [], item];
    return next.length > SUBAGENT_ACTIVITY_CAP ? next.slice(next.length - SUBAGENT_ACTIVITY_CAP) : next;
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
    messages: [],
    sessionModel: "",
    sessionProvider: ""
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
    /** subagent_id → rendered subagent-block message id (subagent.* 事件). */
    subagentBlocks = /* @__PURE__ */ new Map();
    /** subagent.thinking 的合帧定时器（逐 delta 高频事件，节流逻辑同
     *  streamFlushTimer，见 patchSubagentThinking）。 */
    subagentFlushTimer = null;
    subagentDirty = false;
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
      this.invalidateModelOptions();
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
    /**
     * Switch the LIVE session's model via `/model --session` (slash.exec).
     * Session-scoped only — never writes the profile default. Returns null on
     * success (the badge updates immediately; session.info confirms), or an
     * error string to show in the picker (unknown model, agent busy, …).
     */
    setSessionModel = async (model, provider) => {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) return "\u7F51\u5173\u672A\u8FDE\u63A5";
      try {
        const raw = await gw.request("slash.exec", {
          session_id: sid,
          command: `/model --session ${model}`
        });
        const output = (raw ?? {}).output ?? "";
        if (/agent is running|未知|unknown model|not found|无法|失败/i.test(output)) {
          return output.trim() || "\u5207\u6362\u5931\u8D25";
        }
        this.invalidateModelOptions();
        this.emit({
          sessionModel: model,
          sessionProvider: provider,
          statusText: null
        });
        return null;
      } catch (e) {
        return e instanceof Error ? e.message : String(e);
      }
    };
    /** model.options RPC for the role view's model dropdown; null when the
     *  socket isn't open or the call fails (dropdown degrades to 默认 only).
     *  Cached per scope — a live session id wins (the agent's own state is
     *  authoritative), otherwise the role/profile whose config the picker
     *  should reflect (a named role's config.yaml model.default differs from
     *  the gateway's global one). A failed fetch is not cached so the next
     *  open retries. */
    modelOptionsPromises = /* @__PURE__ */ new Map();
    /** Drop the cached options: role switch, /model switch and session.create
     *  all change what "当前配置" resolves to, so stale entries must go. */
    invalidateModelOptions() {
      this.modelOptionsPromises.clear();
    }
    getModelOptions = (profile = "") => {
      const sid = this.liveSid;
      const key = sid ? `sid:${sid}` : `profile:${profile}`;
      let cached = this.modelOptionsPromises.get(key);
      if (!cached) {
        cached = this.fetchModelOptions(profile).catch(() => {
          this.modelOptionsPromises.delete(key);
          return null;
        });
        this.modelOptionsPromises.set(key, cached);
      }
      return cached;
    };
    fetchModelOptions = async (profile = "") => {
      const gw = this.gw;
      if (!gw || this.state.connState !== "open") return null;
      try {
        const sid = this.liveSid;
        return await gw.request(
          "model.options",
          sid ? { session_id: sid } : profile ? { profile } : {}
        );
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
    /** subagent_id → block message id（无 subagent_id 或块不存在 → null）。 */
    subagentBlockId(payload) {
      const subId = typeof payload.subagent_id === "string" ? payload.subagent_id : "";
      return subId ? this.subagentBlocks.get(subId) ?? null : null;
    }
    /** subagent.thinking 是逐 delta 的高频事件：只把滚动尾部写进 state，
     *  订阅通知按 STREAM_FLUSH_MS 合帧（与 streaming 气泡同一个理由）。 */
    patchSubagentThinking(id, text2) {
      this.state = {
        ...this.state,
        messages: this.state.messages.map(
          (m) => m.id === id ? {
            ...m,
            subagentThinking: ((m.subagentThinking ?? "") + text2).slice(-240)
          } : m
        )
      };
      this.subagentDirty = true;
      if (!this.subagentFlushTimer) {
        this.subagentFlushTimer = setTimeout(() => {
          this.subagentFlushTimer = null;
          if (!this.subagentDirty) return;
          this.subagentDirty = false;
          this.emit({});
        }, _BubbleChatStore.STREAM_FLUSH_MS);
      }
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
      this.subagentBlocks.clear();
      this.emit({
        sessionReady: false,
        loadingHistory: false,
        generating: false,
        statusText: null,
        pendingPrompt: null,
        promptBusy: false,
        todos: [],
        messages: [],
        sessionModel: "",
        sessionProvider: ""
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
      this.subagentBlocks.clear();
      this.emit({
        sessionReady: false,
        generating: false,
        statusText: null,
        pendingPrompt: null,
        promptBusy: false,
        todos: [],
        messages: [],
        sessionModel: "",
        sessionProvider: ""
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
          const pickedModel = this.newChatModel;
          const pickedProvider = this.newChatProvider;
          this.newChatModel = "";
          this.newChatProvider = "";
          this.invalidateModelOptions();
          this.emit({
            sessionReady: true,
            sessionModel: pickedModel,
            sessionProvider: pickedProvider
          });
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
        const info = result.resumed.info;
        this.emit({
          messages: mergeToolCards(
            result.hist.messages.flatMap(historyToChatMessages)
          ),
          // Hydrate the todo panel from the latest todo tool row (stored
          // results carry the full list as JSON).
          todos: latestTodosFromHistory(result.hist.messages) ?? [],
          // A session resumed mid-turn keeps its busy indicator.
          generating: result.resumed.running === true,
          sessionReady: true,
          // Hydrate the model badge from the resume snapshot — the live-reuse
          // path never emits session.info, so without this the badge stayed
          // at "默认模型" after switching back to a live session.
          ...info && (info.model || info.provider) ? {
            sessionModel: info.model || "",
            sessionProvider: info.provider || ""
          } : {}
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
          const text2 = typeof payload.text === "string" ? payload.text : "";
          if (!text2) break;
          if (!this.streamingMsgId) {
            const id = messageId();
            this.streamingMsgId = id;
            this.patchMessages((prev) => [
              ...prev,
              { id, role: "assistant", text: text2, timestamp: nowSeconds(), streaming: true }
            ]);
            break;
          }
          this.patchStreamingBubbleDeferred((m) => ({ ...m, text: m.text + text2 }));
          break;
        }
        case "reasoning.delta":
        case "thinking.delta": {
          const text2 = typeof payload.text === "string" ? payload.text : "";
          if (!text2 || !this.streamingMsgId) break;
          this.patchStreamingBubbleDeferred((m) => ({
            ...m,
            reasoning: (m.reasoning ?? "") + text2
          }));
          break;
        }
        case "reasoning.available": {
          const text2 = typeof payload.text === "string" ? payload.text : "";
          if (!text2) break;
          const fill = (m) => m.reasoning ? m : { ...m, reasoning: text2 };
          if (this.streamingMsgId) {
            this.patchStreamingBubble(fill);
            break;
          }
          this.patchMessages((prev) => {
            for (let i2 = prev.length - 1; i2 >= 0; i2--) {
              if (prev[i2].role === "assistant") {
                return prev.map((m, j) => j === i2 ? fill(m) : m);
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
        /* -------- subagent.*：delegate_task 子代理的独立活动块 -------- */
        case "subagent.start": {
          const subId = typeof payload.subagent_id === "string" ? payload.subagent_id : "";
          if (!subId) break;
          const goal = typeof payload.goal === "string" && payload.goal ? payload.goal : typeof payload.text === "string" ? payload.text : "";
          const id = messageId();
          this.subagentBlocks.set(subId, id);
          this.patchMessages((prev) => [
            ...prev,
            {
              id,
              role: "subagent",
              text: "",
              timestamp: nowSeconds(),
              subagentId: subId,
              subagentGoal: goal,
              subagentRunning: true,
              subagentModel: typeof payload.model === "string" && payload.model ? payload.model : void 0,
              subagentActivity: []
            }
          ]);
          break;
        }
        case "subagent.tool": {
          const mid = this.subagentBlockId(payload);
          if (!mid) break;
          const name = typeof payload.tool_name === "string" && payload.tool_name ? payload.tool_name : "tool";
          const preview = typeof payload.tool_preview === "string" && payload.tool_preview ? payload.tool_preview : typeof payload.text === "string" ? payload.text : "";
          const toolCount = typeof payload.tool_count === "number" ? payload.tool_count : void 0;
          this.patchMessages(
            (prev) => prev.map(
              (m) => m.id === mid ? {
                ...m,
                subagentToolCount: toolCount ?? m.subagentToolCount,
                subagentActivity: appendSubagentActivity(m.subagentActivity, {
                  kind: "tool",
                  text: preview ? `${name}  ${preview}` : name,
                  timestamp: nowSeconds()
                })
              } : m
            )
          );
          break;
        }
        case "subagent.progress": {
          const mid = this.subagentBlockId(payload);
          const text2 = typeof payload.text === "string" ? payload.text : "";
          if (!mid || !text2) break;
          this.patchMessages(
            (prev) => prev.map(
              (m) => m.id === mid ? {
                ...m,
                subagentActivity: appendSubagentActivity(m.subagentActivity, {
                  kind: "progress",
                  text: text2,
                  timestamp: nowSeconds()
                })
              } : m
            )
          );
          break;
        }
        case "subagent.thinking": {
          const mid = this.subagentBlockId(payload);
          const text2 = typeof payload.text === "string" ? payload.text : "";
          if (!mid || !text2) break;
          this.patchSubagentThinking(mid, text2);
          break;
        }
        case "subagent.complete": {
          const subId = typeof payload.subagent_id === "string" ? payload.subagent_id : "";
          const mid = this.subagentBlockId(payload);
          if (!mid) break;
          if (subId) this.subagentBlocks.delete(subId);
          const summary = typeof payload.summary === "string" && payload.summary ? payload.summary : typeof payload.text === "string" ? payload.text : "";
          const status = typeof payload.status === "string" ? payload.status : void 0;
          const duration = typeof payload.duration_seconds === "number" ? payload.duration_seconds : void 0;
          const toolCount = typeof payload.tool_count === "number" ? payload.tool_count : void 0;
          this.patchMessages(
            (prev) => prev.map(
              (m) => m.id === mid ? {
                ...m,
                subagentRunning: false,
                subagentStatus: status,
                subagentSummary: summary || void 0,
                subagentDuration: duration,
                subagentToolCount: toolCount ?? m.subagentToolCount
              } : m
            )
          );
          break;
        }
        case "status.update": {
          const text2 = typeof payload.text === "string" ? payload.text.trim() : "";
          this.emit({ statusText: text2 || null });
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
        case "session.info": {
          const model = typeof payload.model === "string" ? payload.model : "";
          const provider = typeof payload.provider === "string" ? payload.provider : "";
          if (!model && !provider) break;
          if (model === this.state.sessionModel && provider === this.state.sessionProvider)
            break;
          this.emit({ sessionModel: model, sessionProvider: provider });
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
    sys(text2) {
      this.patchMessages((prev) => [...prev, systemMessage(text2)]);
    }
    /** Plain prompt.submit path: user bubble + generating state. */
    submitPrompt(text2, images) {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid || !text2) return;
      this.patchMessages((prev) => [
        ...prev,
        {
          id: messageId(),
          role: "user",
          text: text2,
          // Echo the just-attached images in the user's own bubble (the
          // gateway's image.attach emits no event, so nothing else would
          // show them until a history reload).
          images: images && images.length > 0 ? images : void 0,
          timestamp: nowSeconds()
        }
      ]);
      this.emit({ generating: true });
      gw.request("prompt.submit", { session_id: sid, text: text2 }).catch((e) => {
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
    async runSlash(text2, onPrefill, depth = 0) {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) return;
      const m = /^\/(\S*)\s*(.*)$/.exec(text2);
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
          command: text2
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
    send = (text2, images, hooks) => {
      if (!this.gw || !this.liveSid || !text2) return;
      const firstToken = text2.split(/\s/, 1)[0];
      const isSlashCommand = firstToken.startsWith("/") && !firstToken.slice(1).includes("/");
      if (isSlashCommand) {
        this.patchMessages((prev) => [
          ...prev,
          {
            id: messageId(),
            role: "user",
            text: text2,
            images: images && images.length > 0 ? images : void 0,
            timestamp: nowSeconds()
          }
        ]);
        if (/^\/new(?:\s|$)/.test(text2)) {
          hooks.onNew();
          return;
        }
        void this.runSlash(text2, hooks.onPrefill);
        return;
      }
      this.submitPrompt(text2, images);
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
      let text2 = msg.role === "user" ? msg.text : "";
      if (msg.role !== "user") {
        const idx = messages.findIndex((m) => m.id === msg.id);
        for (let i2 = idx - 1; i2 >= 0; i2--) {
          if (messages[i2].role === "user" && messages[i2].text.trim()) {
            text2 = messages[i2].text;
            break;
          }
        }
      }
      text2 = text2.trim();
      if (!text2) {
        this.sys("\u6CA1\u6709\u53EF\u91CD\u8BD5\u7684\u7528\u6237\u6D88\u606F");
        return;
      }
      void (async () => {
        if (this.state.generating) {
          await gw.request("session.interrupt", { session_id: sid }).catch(() => {
          });
        }
        this.send(text2, void 0, hooks);
      })();
    };
    /** Attach an already-uploaded image to the live session. The gateway
     *  queues it in session.attached_images and the next prompt.submit turn
     *  picks it up (this is the same path the TUI's /image command uses). */
    attachImage = async (path2) => {
      const gw = this.gw;
      const sid = this.liveSid;
      if (!gw || !sid) throw new Error("\u4F1A\u8BDD\u672A\u5C31\u7EEA");
      await gw.request("image.attach", { session_id: sid, path: path2 });
    };
  };
  var bubbleChatStore = new BubbleChatStore();

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

  // src/chat/ChatModelBadge.tsx
  function ChatModelBadge() {
    const state = useSyncExternalStore(bubbleChatStore.subscribe, bubbleChatStore.getSnapshot);
    const [open2, setOpen] = useState(false);
    const [options, setOptions] = useState(null);
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
      if (!open2 || options) return;
      let live = true;
      bubbleChatStore.getModelOptions().then((p) => {
        if (live && p) setOptions(p);
      });
      return () => {
        live = false;
      };
    }, [open2, options]);
    const label = state.sessionModel || options?.model || "\u9ED8\u8BA4\u6A21\u578B";
    const pick = async (model, provider) => {
      if (busy) return;
      setBusy(true);
      setError(null);
      const err = await bubbleChatStore.setSessionModel(model, provider);
      setBusy(false);
      if (err) {
        setError(err);
      } else {
        setOpen(false);
      }
    };
    return /* @__PURE__ */ jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsx(
        Button,
        {
          ghost: true,
          size: "sm",
          onClick: () => {
            setError(null);
            setOpen((o) => !o);
          },
          prefix: /* @__PURE__ */ jsx(Cpu, {}),
          "aria-label": "\u5F53\u524D\u6A21\u578B",
          title: `\u5F53\u524D\u5BF9\u8BDD\u6A21\u578B\uFF1A${label}\uFF08\u70B9\u51FB\u5207\u6362\uFF0C\u4EC5\u672C\u5BF9\u8BDD\u751F\u6548\uFF09`,
          className: "max-w-48 text-text-secondary hover:text-foreground",
          children: /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
        }
      ),
      open2 && /* @__PURE__ */ jsxs(Fragment2, { children: [
        /* @__PURE__ */ jsx(
          "div",
          {
            "aria-hidden": true,
            className: "fixed inset-0 z-40",
            onClick: () => setOpen(false)
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "absolute top-full right-0 z-50 mt-1 flex max-h-96 w-64 flex-col gap-1 overflow-y-auto rounded-xl border border-current/15 bg-background-base p-2 shadow-xl", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between px-1", children: [
            /* @__PURE__ */ jsx("span", { className: "text-xs font-medium text-foreground", children: "\u5BF9\u8BDD\u6A21\u578B" }),
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
          /* @__PURE__ */ jsx("div", { className: "px-1 pb-1 text-[0.625rem] text-text-tertiary", children: "\u4EC5\u672C\u5BF9\u8BDD\u751F\u6548\uFF08--session\uFF09\uFF0C\u4E0D\u6539\u89D2\u8272\u9ED8\u8BA4" }),
          !options ? /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-2 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            " \u52A0\u8F7D\u6A21\u578B\u76EE\u5F55\u2026"
          ] }) : (options.providers ?? []).map((group) => /* @__PURE__ */ jsxs("div", { children: [
            /* @__PURE__ */ jsx("div", { className: "px-1 pt-1 text-[0.625rem] font-medium text-text-tertiary", children: group.name || group.slug }),
            (group.models ?? []).map((m) => {
              const active = m === state.sessionModel;
              return /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  disabled: busy,
                  onClick: () => void pick(m, group.slug),
                  className: cn(
                    "flex w-full cursor-pointer items-center gap-1.5 rounded px-1.5 py-1 text-left text-xs",
                    "hover:bg-midground/10 disabled:opacity-50",
                    active ? "text-primary" : "text-text-secondary"
                  ),
                  children: [
                    /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate", children: m }),
                    active && /* @__PURE__ */ jsx(Check, { className: "h-3 w-3 shrink-0" })
                  ]
                },
                `${group.slug}/${m}`
              );
            })
          ] }, group.slug)),
          busy && /* @__PURE__ */ jsxs("div", { className: "flex items-center gap-2 px-1 py-1 text-xs text-text-secondary", children: [
            /* @__PURE__ */ jsx(Spinner, {}),
            " \u5207\u6362\u4E2D\u2026"
          ] }),
          error && /* @__PURE__ */ jsx("div", { className: "rounded-lg border border-destructive/30 bg-destructive/10 px-2 py-1 text-xs text-destructive wrap-break-word", children: error })
        ] })
      ] })
    ] });
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
  function mediaKindForPath(path2) {
    if (IMAGE_EXT_RE.test(path2)) return "image";
    if (AUDIO_EXT_RE.test(path2)) return "audio";
    if (VIDEO_EXT_RE.test(path2)) return "video";
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
  function extractMediaFromText(text2) {
    const media = [];
    if (!text2) return { text: text2, media };
    const keptLines = [];
    for (const line of text2.split("\n")) {
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
    if (media.length === 0) return { text: text2, media };
    return { text: rest.replace(/\n{3,}/g, "\n\n").trim(), media };
  }
  function extractFilePaths(text2, limit = 6) {
    if (!text2) return [];
    const seen = /* @__PURE__ */ new Set();
    const out = [];
    for (const m of text2.matchAll(absPathTokenRe())) {
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
          items.map((item, i2) => /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": i2 === activeIndex,
              onMouseDown: (e) => {
                e.preventDefault();
                onSelect(item);
              },
              onMouseEnter: () => onHover(i2),
              className: cn(
                "flex w-full items-center gap-2 px-3 py-2 text-left",
                i2 === activeIndex ? "bg-muted/60" : "hover:bg-muted/30"
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
      for (let i2 = 0; i2 < data.items.length; i2++) {
        if (data.items[i2].kind === "file") return true;
      }
      return false;
    }
    return (data.files?.length ?? 0) > 0;
  }
  function slashQueryOf(text2) {
    const m = /^\/(\S*)$/.exec(text2);
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
            const path2 = res.entry?.path || res.path;
            setFiles(
              (prev) => prev.map((f) => f.id === id ? { ...f, path: path2, uploading: false } : f)
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
    const uploading = images.some((i2) => i2.uploading) || files.some((f) => f.uploading);
    const send = useCallback(async () => {
      const text2 = value.trim();
      if (disabled || generating || busy || uploading || sendingRef.current) return;
      if (!text2 && images.length === 0 && files.length === 0) return;
      sendingRef.current = true;
      try {
        if (images.length > 0 && onAttachImage) {
          for (const img of images) {
            await onAttachImage(img.path);
          }
        }
        let out = text2;
        if (!out && images.length > 0) {
          out = images.map((i2) => `[User attached image: ${i2.name}]`).join("\n");
        }
        for (const f of files) {
          out += `${out ? "\n" : ""}${f.dir ? "\u6587\u4EF6\u5939\u8DEF\u5F84" : "\u5DF2\u4E0A\u4F20\u6587\u4EF6"}\uFF1A${f.path}`;
        }
        onSend(out, images.map((i2) => i2.path).filter(Boolean));
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
            setPaletteIndex((i2) => (i2 + 1) % paletteItems.length);
            return;
          }
          if (e.key === "ArrowUp") {
            e.preventDefault();
            setPaletteIndex(
              (i2) => (i2 - 1 + paletteItems.length) % paletteItems.length
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
              onRemoveImage: (id) => setImages((prev) => prev.filter((i2) => i2.id !== id)),
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

  // vendor/katex/katex.mjs
  var SourceLocation = class _SourceLocation {
    // The + prefix indicates that these fields aren't writeable
    // Lexer holding the input string.
    // Start offset, zero-based inclusive.
    // End offset, zero-based exclusive.
    constructor(lexer, start, end) {
      this.lexer = void 0;
      this.start = void 0;
      this.end = void 0;
      this.lexer = lexer;
      this.start = start;
      this.end = end;
    }
    /**
     * Merges two `SourceLocation`s from location providers, given they are
     * provided in order of appearance.
     * - Returns the first one's location if only the first is provided.
     * - Returns a merged range of the first and the last if both are provided
     *   and their lexers match.
     * - Otherwise, returns null.
     */
    static range(first, second) {
      if (!second) {
        return first && first.loc;
      } else if (!first || !first.loc || !second.loc || first.loc.lexer !== second.loc.lexer) {
        return null;
      } else {
        return new _SourceLocation(first.loc.lexer, first.loc.start, second.loc.end);
      }
    }
  };
  var Token = class _Token {
    // don't expand the token
    // used in \noexpand
    constructor(text2, loc) {
      this.text = void 0;
      this.loc = void 0;
      this.noexpand = void 0;
      this.treatAsRelax = void 0;
      this.text = text2;
      this.loc = loc;
    }
    /**
     * Given a pair of tokens (this and endToken), compute a `Token` encompassing
     * the whole input range enclosed by these two.
     */
    range(endToken, text2) {
      return new _Token(text2, SourceLocation.range(this, endToken));
    }
  };
  var ParseError = class _ParseError {
    // Error start position based on passed-in Token or ParseNode.
    // Length of affected text based on passed-in Token or ParseNode.
    // The underlying error message without any context added.
    constructor(message, token) {
      this.name = void 0;
      this.position = void 0;
      this.length = void 0;
      this.rawMessage = void 0;
      var error = "KaTeX parse error: " + message;
      var start;
      var end;
      var loc = token && token.loc;
      if (loc && loc.start <= loc.end) {
        var input = loc.lexer.input;
        start = loc.start;
        end = loc.end;
        if (start === input.length) {
          error += " at end of input: ";
        } else {
          error += " at position " + (start + 1) + ": ";
        }
        var underlined = input.slice(start, end).replace(/[^]/g, "$&\u0332");
        var left;
        if (start > 15) {
          left = "\u2026" + input.slice(start - 15, start);
        } else {
          left = input.slice(0, start);
        }
        var right;
        if (end + 15 < input.length) {
          right = input.slice(end, end + 15) + "\u2026";
        } else {
          right = input.slice(end);
        }
        error += left + underlined + right;
      }
      var self = new Error(error);
      self.name = "ParseError";
      self.__proto__ = _ParseError.prototype;
      self.position = start;
      if (start != null && end != null) {
        self.length = end - start;
      }
      self.rawMessage = message;
      return self;
    }
  };
  ParseError.prototype.__proto__ = Error.prototype;
  var deflt = function deflt2(setting, defaultIfUndefined) {
    return setting === void 0 ? defaultIfUndefined : setting;
  };
  var uppercase = /([A-Z])/g;
  var hyphenate = function hyphenate2(str) {
    return str.replace(uppercase, "-$1").toLowerCase();
  };
  var ESCAPE_LOOKUP = {
    "&": "&amp;",
    ">": "&gt;",
    "<": "&lt;",
    '"': "&quot;",
    "'": "&#x27;"
  };
  var ESCAPE_REGEX = /[&><"']/g;
  function escape(text2) {
    return String(text2).replace(ESCAPE_REGEX, (match) => ESCAPE_LOOKUP[match]);
  }
  var getBaseElem = function getBaseElem2(group) {
    if (group.type === "ordgroup") {
      if (group.body.length === 1) {
        return getBaseElem2(group.body[0]);
      } else {
        return group;
      }
    } else if (group.type === "color") {
      if (group.body.length === 1) {
        return getBaseElem2(group.body[0]);
      } else {
        return group;
      }
    } else if (group.type === "font") {
      return getBaseElem2(group.body);
    } else {
      return group;
    }
  };
  var isCharacterBox = function isCharacterBox2(group) {
    var baseElem = getBaseElem(group);
    return baseElem.type === "mathord" || baseElem.type === "textord" || baseElem.type === "atom";
  };
  var assert = function assert2(value) {
    if (!value) {
      throw new Error("Expected non-null, but got " + String(value));
    }
    return value;
  };
  var protocolFromUrl = function protocolFromUrl2(url) {
    var protocol = /^[\x00-\x20]*([^\\/#?]*?)(:|&#0*58|&#x0*3a|&colon)/i.exec(url);
    if (!protocol) {
      return "_relative";
    }
    if (protocol[2] !== ":") {
      return null;
    }
    if (!/^[a-zA-Z][a-zA-Z0-9+\-.]*$/.test(protocol[1])) {
      return null;
    }
    return protocol[1].toLowerCase();
  };
  var utils = {
    deflt,
    escape,
    hyphenate,
    getBaseElem,
    isCharacterBox,
    protocolFromUrl
  };
  var SETTINGS_SCHEMA = {
    displayMode: {
      type: "boolean",
      description: "Render math in display mode, which puts the math in display style (so \\int and \\sum are large, for example), and centers the math on the page on its own line.",
      cli: "-d, --display-mode"
    },
    output: {
      type: {
        enum: ["htmlAndMathml", "html", "mathml"]
      },
      description: "Determines the markup language of the output.",
      cli: "-F, --format <type>"
    },
    leqno: {
      type: "boolean",
      description: "Render display math in leqno style (left-justified tags)."
    },
    fleqn: {
      type: "boolean",
      description: "Render display math flush left."
    },
    throwOnError: {
      type: "boolean",
      default: true,
      cli: "-t, --no-throw-on-error",
      cliDescription: "Render errors (in the color given by --error-color) instead of throwing a ParseError exception when encountering an error."
    },
    errorColor: {
      type: "string",
      default: "#cc0000",
      cli: "-c, --error-color <color>",
      cliDescription: "A color string given in the format 'rgb' or 'rrggbb' (no #). This option determines the color of errors rendered by the -t option.",
      cliProcessor: (color) => "#" + color
    },
    macros: {
      type: "object",
      cli: "-m, --macro <def>",
      cliDescription: "Define custom macro of the form '\\foo:expansion' (use multiple -m arguments for multiple macros).",
      cliDefault: [],
      cliProcessor: (def, defs) => {
        defs.push(def);
        return defs;
      }
    },
    minRuleThickness: {
      type: "number",
      description: "Specifies a minimum thickness, in ems, for fraction lines, `\\sqrt` top lines, `{array}` vertical lines, `\\hline`, `\\hdashline`, `\\underline`, `\\overline`, and the borders of `\\fbox`, `\\boxed`, and `\\fcolorbox`.",
      processor: (t) => Math.max(0, t),
      cli: "--min-rule-thickness <size>",
      cliProcessor: parseFloat
    },
    colorIsTextColor: {
      type: "boolean",
      description: "Makes \\color behave like LaTeX's 2-argument \\textcolor, instead of LaTeX's one-argument \\color mode change.",
      cli: "-b, --color-is-text-color"
    },
    strict: {
      type: [{
        enum: ["warn", "ignore", "error"]
      }, "boolean", "function"],
      description: "Turn on strict / LaTeX faithfulness mode, which throws an error if the input uses features that are not supported by LaTeX.",
      cli: "-S, --strict",
      cliDefault: false
    },
    trust: {
      type: ["boolean", "function"],
      description: "Trust the input, enabling all HTML features such as \\url.",
      cli: "-T, --trust"
    },
    maxSize: {
      type: "number",
      default: Infinity,
      description: "If non-zero, all user-specified sizes, e.g. in \\rule{500em}{500em}, will be capped to maxSize ems. Otherwise, elements and spaces can be arbitrarily large",
      processor: (s) => Math.max(0, s),
      cli: "-s, --max-size <n>",
      cliProcessor: parseInt
    },
    maxExpand: {
      type: "number",
      default: 1e3,
      description: "Limit the number of macro expansions to the specified number, to prevent e.g. infinite macro loops. If set to Infinity, the macro expander will try to fully expand as in LaTeX.",
      processor: (n) => Math.max(0, n),
      cli: "-e, --max-expand <n>",
      cliProcessor: (n) => n === "Infinity" ? Infinity : parseInt(n)
    },
    globalGroup: {
      type: "boolean",
      cli: false
    }
  };
  function getDefaultValue(schema) {
    if (schema.default) {
      return schema.default;
    }
    var type = schema.type;
    var defaultType = Array.isArray(type) ? type[0] : type;
    if (typeof defaultType !== "string") {
      return defaultType.enum[0];
    }
    switch (defaultType) {
      case "boolean":
        return false;
      case "string":
        return "";
      case "number":
        return 0;
      case "object":
        return {};
    }
  }
  var Settings = class {
    constructor(options) {
      this.displayMode = void 0;
      this.output = void 0;
      this.leqno = void 0;
      this.fleqn = void 0;
      this.throwOnError = void 0;
      this.errorColor = void 0;
      this.macros = void 0;
      this.minRuleThickness = void 0;
      this.colorIsTextColor = void 0;
      this.strict = void 0;
      this.trust = void 0;
      this.maxSize = void 0;
      this.maxExpand = void 0;
      this.globalGroup = void 0;
      options = options || {};
      for (var prop in SETTINGS_SCHEMA) {
        if (SETTINGS_SCHEMA.hasOwnProperty(prop)) {
          var schema = SETTINGS_SCHEMA[prop];
          this[prop] = options[prop] !== void 0 ? schema.processor ? schema.processor(options[prop]) : options[prop] : getDefaultValue(schema);
        }
      }
    }
    /**
     * Report nonstrict (non-LaTeX-compatible) input.
     * Can safely not be called if `this.strict` is false in JavaScript.
     */
    reportNonstrict(errorCode, errorMsg, token) {
      var strict = this.strict;
      if (typeof strict === "function") {
        strict = strict(errorCode, errorMsg, token);
      }
      if (!strict || strict === "ignore") {
        return;
      } else if (strict === true || strict === "error") {
        throw new ParseError("LaTeX-incompatible input and strict mode is set to 'error': " + (errorMsg + " [" + errorCode + "]"), token);
      } else if (strict === "warn") {
        typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
      } else {
        typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
      }
    }
    /**
     * Check whether to apply strict (LaTeX-adhering) behavior for unusual
     * input (like `\\`).  Unlike `nonstrict`, will not throw an error;
     * instead, "error" translates to a return value of `true`, while "ignore"
     * translates to a return value of `false`.  May still print a warning:
     * "warn" prints a warning and returns `false`.
     * This is for the second category of `errorCode`s listed in the README.
     */
    useStrictBehavior(errorCode, errorMsg, token) {
      var strict = this.strict;
      if (typeof strict === "function") {
        try {
          strict = strict(errorCode, errorMsg, token);
        } catch (error) {
          strict = "error";
        }
      }
      if (!strict || strict === "ignore") {
        return false;
      } else if (strict === true || strict === "error") {
        return true;
      } else if (strict === "warn") {
        typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to 'warn': " + (errorMsg + " [" + errorCode + "]"));
        return false;
      } else {
        typeof console !== "undefined" && console.warn("LaTeX-incompatible input and strict mode is set to " + ("unrecognized '" + strict + "': " + errorMsg + " [" + errorCode + "]"));
        return false;
      }
    }
    /**
     * Check whether to test potentially dangerous input, and return
     * `true` (trusted) or `false` (untrusted).  The sole argument `context`
     * should be an object with `command` field specifying the relevant LaTeX
     * command (as a string starting with `\`), and any other arguments, etc.
     * If `context` has a `url` field, a `protocol` field will automatically
     * get added by this function (changing the specified object).
     */
    isTrusted(context) {
      if (context.url && !context.protocol) {
        var protocol = utils.protocolFromUrl(context.url);
        if (protocol == null) {
          return false;
        }
        context.protocol = protocol;
      }
      var trust = typeof this.trust === "function" ? this.trust(context) : this.trust;
      return Boolean(trust);
    }
  };
  var Style = class {
    constructor(id, size, cramped) {
      this.id = void 0;
      this.size = void 0;
      this.cramped = void 0;
      this.id = id;
      this.size = size;
      this.cramped = cramped;
    }
    /**
     * Get the style of a superscript given a base in the current style.
     */
    sup() {
      return styles[sup[this.id]];
    }
    /**
     * Get the style of a subscript given a base in the current style.
     */
    sub() {
      return styles[sub[this.id]];
    }
    /**
     * Get the style of a fraction numerator given the fraction in the current
     * style.
     */
    fracNum() {
      return styles[fracNum[this.id]];
    }
    /**
     * Get the style of a fraction denominator given the fraction in the current
     * style.
     */
    fracDen() {
      return styles[fracDen[this.id]];
    }
    /**
     * Get the cramped version of a style (in particular, cramping a cramped style
     * doesn't change the style).
     */
    cramp() {
      return styles[cramp[this.id]];
    }
    /**
     * Get a text or display version of this style.
     */
    text() {
      return styles[text$1[this.id]];
    }
    /**
     * Return true if this style is tightly spaced (scriptstyle/scriptscriptstyle)
     */
    isTight() {
      return this.size >= 2;
    }
  };
  var D = 0;
  var Dc = 1;
  var T = 2;
  var Tc = 3;
  var S = 4;
  var Sc = 5;
  var SS = 6;
  var SSc = 7;
  var styles = [new Style(D, 0, false), new Style(Dc, 0, true), new Style(T, 1, false), new Style(Tc, 1, true), new Style(S, 2, false), new Style(Sc, 2, true), new Style(SS, 3, false), new Style(SSc, 3, true)];
  var sup = [S, Sc, S, Sc, SS, SSc, SS, SSc];
  var sub = [Sc, Sc, Sc, Sc, SSc, SSc, SSc, SSc];
  var fracNum = [T, Tc, S, Sc, SS, SSc, SS, SSc];
  var fracDen = [Tc, Tc, Sc, Sc, SSc, SSc, SSc, SSc];
  var cramp = [Dc, Dc, Tc, Tc, Sc, Sc, SSc, SSc];
  var text$1 = [D, Dc, T, Tc, T, Tc, T, Tc];
  var Style$1 = {
    DISPLAY: styles[D],
    TEXT: styles[T],
    SCRIPT: styles[S],
    SCRIPTSCRIPT: styles[SS]
  };
  var scriptData = [{
    // Latin characters beyond the Latin-1 characters we have metrics for.
    // Needed for Czech, Hungarian and Turkish text, for example.
    name: "latin",
    blocks: [
      [256, 591],
      // Latin Extended-A and Latin Extended-B
      [768, 879]
      // Combining Diacritical marks
    ]
  }, {
    // The Cyrillic script used by Russian and related languages.
    // A Cyrillic subset used to be supported as explicitly defined
    // symbols in symbols.js
    name: "cyrillic",
    blocks: [[1024, 1279]]
  }, {
    // Armenian
    name: "armenian",
    blocks: [[1328, 1423]]
  }, {
    // The Brahmic scripts of South and Southeast Asia
    // Devanagari (0900–097F)
    // Bengali (0980–09FF)
    // Gurmukhi (0A00–0A7F)
    // Gujarati (0A80–0AFF)
    // Oriya (0B00–0B7F)
    // Tamil (0B80–0BFF)
    // Telugu (0C00–0C7F)
    // Kannada (0C80–0CFF)
    // Malayalam (0D00–0D7F)
    // Sinhala (0D80–0DFF)
    // Thai (0E00–0E7F)
    // Lao (0E80–0EFF)
    // Tibetan (0F00–0FFF)
    // Myanmar (1000–109F)
    name: "brahmic",
    blocks: [[2304, 4255]]
  }, {
    name: "georgian",
    blocks: [[4256, 4351]]
  }, {
    // Chinese and Japanese.
    // The "k" in cjk is for Korean, but we've separated Korean out
    name: "cjk",
    blocks: [
      [12288, 12543],
      // CJK symbols and punctuation, Hiragana, Katakana
      [19968, 40879],
      // CJK ideograms
      [65280, 65376]
      // Fullwidth punctuation
      // TODO: add halfwidth Katakana and Romanji glyphs
    ]
  }, {
    // Korean
    name: "hangul",
    blocks: [[44032, 55215]]
  }];
  function scriptFromCodepoint(codepoint) {
    for (var i2 = 0; i2 < scriptData.length; i2++) {
      var script = scriptData[i2];
      for (var _i6 = 0; _i6 < script.blocks.length; _i6++) {
        var block = script.blocks[_i6];
        if (codepoint >= block[0] && codepoint <= block[1]) {
          return script.name;
        }
      }
    }
    return null;
  }
  var allBlocks = [];
  scriptData.forEach((s) => s.blocks.forEach((b) => allBlocks.push(...b)));
  function supportedCodepoint(codepoint) {
    for (var i2 = 0; i2 < allBlocks.length; i2 += 2) {
      if (codepoint >= allBlocks[i2] && codepoint <= allBlocks[i2 + 1]) {
        return true;
      }
    }
    return false;
  }
  var hLinePad = 80;
  var sqrtMain = function sqrtMain2(extraVinculum, hLinePad2) {
    return "M95," + (622 + extraVinculum + hLinePad2) + "\nc-2.7,0,-7.17,-2.7,-13.5,-8c-5.8,-5.3,-9.5,-10,-9.5,-14\nc0,-2,0.3,-3.3,1,-4c1.3,-2.7,23.83,-20.7,67.5,-54\nc44.2,-33.3,65.8,-50.3,66.5,-51c1.3,-1.3,3,-2,5,-2c4.7,0,8.7,3.3,12,10\ns173,378,173,378c0.7,0,35.3,-71,104,-213c68.7,-142,137.5,-285,206.5,-429\nc69,-144,104.5,-217.7,106.5,-221\nl" + extraVinculum / 2.075 + " -" + extraVinculum + "\nc5.3,-9.3,12,-14,20,-14\nH400000v" + (40 + extraVinculum) + "H845.2724\ns-225.272,467,-225.272,467s-235,486,-235,486c-2.7,4.7,-9,7,-19,7\nc-6,0,-10,-1,-12,-3s-194,-422,-194,-422s-65,47,-65,47z\nM" + (834 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
  };
  var sqrtSize1 = function sqrtSize12(extraVinculum, hLinePad2) {
    return "M263," + (601 + extraVinculum + hLinePad2) + "c0.7,0,18,39.7,52,119\nc34,79.3,68.167,158.7,102.5,238c34.3,79.3,51.8,119.3,52.5,120\nc340,-704.7,510.7,-1060.3,512,-1067\nl" + extraVinculum / 2.084 + " -" + extraVinculum + "\nc4.7,-7.3,11,-11,19,-11\nH40000v" + (40 + extraVinculum) + "H1012.3\ns-271.3,567,-271.3,567c-38.7,80.7,-84,175,-136,283c-52,108,-89.167,185.3,-111.5,232\nc-22.3,46.7,-33.8,70.3,-34.5,71c-4.7,4.7,-12.3,7,-23,7s-12,-1,-12,-1\ns-109,-253,-109,-253c-72.7,-168,-109.3,-252,-110,-252c-10.7,8,-22,16.7,-34,26\nc-22,17.3,-33.3,26,-34,26s-26,-26,-26,-26s76,-59,76,-59s76,-60,76,-60z\nM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
  };
  var sqrtSize2 = function sqrtSize22(extraVinculum, hLinePad2) {
    return "M983 " + (10 + extraVinculum + hLinePad2) + "\nl" + extraVinculum / 3.13 + " -" + extraVinculum + "\nc4,-6.7,10,-10,18,-10 H400000v" + (40 + extraVinculum) + "\nH1013.1s-83.4,268,-264.1,840c-180.7,572,-277,876.3,-289,913c-4.7,4.7,-12.7,7,-24,7\ns-12,0,-12,0c-1.3,-3.3,-3.7,-11.7,-7,-25c-35.3,-125.3,-106.7,-373.3,-214,-744\nc-10,12,-21,25,-33,39s-32,39,-32,39c-6,-5.3,-15,-14,-27,-26s25,-30,25,-30\nc26.7,-32.7,52,-63,76,-91s52,-60,52,-60s208,722,208,722\nc56,-175.3,126.3,-397.3,211,-666c84.7,-268.7,153.8,-488.2,207.5,-658.5\nc53.7,-170.3,84.5,-266.8,92.5,-289.5z\nM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "h-400000z";
  };
  var sqrtSize3 = function sqrtSize32(extraVinculum, hLinePad2) {
    return "M424," + (2398 + extraVinculum + hLinePad2) + "\nc-1.3,-0.7,-38.5,-172,-111.5,-514c-73,-342,-109.8,-513.3,-110.5,-514\nc0,-2,-10.7,14.3,-32,49c-4.7,7.3,-9.8,15.7,-15.5,25c-5.7,9.3,-9.8,16,-12.5,20\ns-5,7,-5,7c-4,-3.3,-8.3,-7.7,-13,-13s-13,-13,-13,-13s76,-122,76,-122s77,-121,77,-121\ns209,968,209,968c0,-2,84.7,-361.7,254,-1079c169.3,-717.3,254.7,-1077.7,256,-1081\nl" + extraVinculum / 4.223 + " -" + extraVinculum + "c4,-6.7,10,-10,18,-10 H400000\nv" + (40 + extraVinculum) + "H1014.6\ns-87.3,378.7,-272.6,1166c-185.3,787.3,-279.3,1182.3,-282,1185\nc-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2z M" + (1001 + extraVinculum) + " " + hLinePad2 + "\nh400000v" + (40 + extraVinculum) + "h-400000z";
  };
  var sqrtSize4 = function sqrtSize42(extraVinculum, hLinePad2) {
    return "M473," + (2713 + extraVinculum + hLinePad2) + "\nc339.3,-1799.3,509.3,-2700,510,-2702 l" + extraVinculum / 5.298 + " -" + extraVinculum + "\nc3.3,-7.3,9.3,-11,18,-11 H400000v" + (40 + extraVinculum) + "H1017.7\ns-90.5,478,-276.2,1466c-185.7,988,-279.5,1483,-281.5,1485c-2,6,-10,9,-24,9\nc-8,0,-12,-0.7,-12,-2c0,-1.3,-5.3,-32,-16,-92c-50.7,-293.3,-119.7,-693.3,-207,-1200\nc0,-1.3,-5.3,8.7,-16,30c-10.7,21.3,-21.3,42.7,-32,64s-16,33,-16,33s-26,-26,-26,-26\ns76,-153,76,-153s77,-151,77,-151c0.7,0.7,35.7,202,105,604c67.3,400.7,102,602.7,104,\n606zM" + (1001 + extraVinculum) + " " + hLinePad2 + "h400000v" + (40 + extraVinculum) + "H1017.7z";
  };
  var phasePath = function phasePath2(y) {
    var x = y / 2;
    return "M400000 " + y + " H0 L" + x + " 0 l65 45 L145 " + (y - 80) + " H400000z";
  };
  var sqrtTall = function sqrtTall2(extraVinculum, hLinePad2, viewBoxHeight) {
    var vertSegment = viewBoxHeight - 54 - hLinePad2 - extraVinculum;
    return "M702 " + (extraVinculum + hLinePad2) + "H400000" + (40 + extraVinculum) + "\nH742v" + vertSegment + "l-4 4-4 4c-.667.7 -2 1.5-4 2.5s-4.167 1.833-6.5 2.5-5.5 1-9.5 1\nh-12l-28-84c-16.667-52-96.667 -294.333-240-727l-212 -643 -85 170\nc-4-3.333-8.333-7.667-13 -13l-13-13l77-155 77-156c66 199.333 139 419.667\n219 661 l218 661zM702 " + hLinePad2 + "H400000v" + (40 + extraVinculum) + "H742z";
  };
  var sqrtPath = function sqrtPath2(size, extraVinculum, viewBoxHeight) {
    extraVinculum = 1e3 * extraVinculum;
    var path2 = "";
    switch (size) {
      case "sqrtMain":
        path2 = sqrtMain(extraVinculum, hLinePad);
        break;
      case "sqrtSize1":
        path2 = sqrtSize1(extraVinculum, hLinePad);
        break;
      case "sqrtSize2":
        path2 = sqrtSize2(extraVinculum, hLinePad);
        break;
      case "sqrtSize3":
        path2 = sqrtSize3(extraVinculum, hLinePad);
        break;
      case "sqrtSize4":
        path2 = sqrtSize4(extraVinculum, hLinePad);
        break;
      case "sqrtTall":
        path2 = sqrtTall(extraVinculum, hLinePad, viewBoxHeight);
    }
    return path2;
  };
  var innerPath = function innerPath2(name, height) {
    switch (name) {
      case "\u239C":
        return "M291 0 H417 V" + height + " H291z M291 0 H417 V" + height + " H291z";
      case "\u2223":
        return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z";
      case "\u2225":
        return "M145 0 H188 V" + height + " H145z M145 0 H188 V" + height + " H145z" + ("M367 0 H410 V" + height + " H367z M367 0 H410 V" + height + " H367z");
      case "\u239F":
        return "M457 0 H583 V" + height + " H457z M457 0 H583 V" + height + " H457z";
      case "\u23A2":
        return "M319 0 H403 V" + height + " H319z M319 0 H403 V" + height + " H319z";
      case "\u23A5":
        return "M263 0 H347 V" + height + " H263z M263 0 H347 V" + height + " H263z";
      case "\u23AA":
        return "M384 0 H504 V" + height + " H384z M384 0 H504 V" + height + " H384z";
      case "\u23D0":
        return "M312 0 H355 V" + height + " H312z M312 0 H355 V" + height + " H312z";
      case "\u2016":
        return "M257 0 H300 V" + height + " H257z M257 0 H300 V" + height + " H257z" + ("M478 0 H521 V" + height + " H478z M478 0 H521 V" + height + " H478z");
      default:
        return "";
    }
  };
  var path = {
    // The doubleleftarrow geometry is from glyph U+21D0 in the font KaTeX Main
    doubleleftarrow: "M262 157\nl10-10c34-36 62.7-77 86-123 3.3-8 5-13.3 5-16 0-5.3-6.7-8-20-8-7.3\n 0-12.2.5-14.5 1.5-2.3 1-4.8 4.5-7.5 10.5-49.3 97.3-121.7 169.3-217 216-28\n 14-57.3 25-88 33-6.7 2-11 3.8-13 5.5-2 1.7-3 4.2-3 7.5s1 5.8 3 7.5\nc2 1.7 6.3 3.5 13 5.5 68 17.3 128.2 47.8 180.5 91.5 52.3 43.7 93.8 96.2 124.5\n 157.5 9.3 8 15.3 12.3 18 13h6c12-.7 18-4 18-10 0-2-1.7-7-5-15-23.3-46-52-87\n-86-123l-10-10h399738v-40H218c328 0 0 0 0 0l-10-8c-26.7-20-65.7-43-117-69 2.7\n-2 6-3.7 10-5 36.7-16 72.3-37.3 107-64l10-8h399782v-40z\nm8 0v40h399730v-40zm0 194v40h399730v-40z",
    // doublerightarrow is from glyph U+21D2 in font KaTeX Main
    doublerightarrow: "M399738 392l\n-10 10c-34 36-62.7 77-86 123-3.3 8-5 13.3-5 16 0 5.3 6.7 8 20 8 7.3 0 12.2-.5\n 14.5-1.5 2.3-1 4.8-4.5 7.5-10.5 49.3-97.3 121.7-169.3 217-216 28-14 57.3-25 88\n-33 6.7-2 11-3.8 13-5.5 2-1.7 3-4.2 3-7.5s-1-5.8-3-7.5c-2-1.7-6.3-3.5-13-5.5-68\n-17.3-128.2-47.8-180.5-91.5-52.3-43.7-93.8-96.2-124.5-157.5-9.3-8-15.3-12.3-18\n-13h-6c-12 .7-18 4-18 10 0 2 1.7 7 5 15 23.3 46 52 87 86 123l10 10H0v40h399782\nc-328 0 0 0 0 0l10 8c26.7 20 65.7 43 117 69-2.7 2-6 3.7-10 5-36.7 16-72.3 37.3\n-107 64l-10 8H0v40zM0 157v40h399730v-40zm0 194v40h399730v-40z",
    // leftarrow is from glyph U+2190 in font KaTeX Main
    leftarrow: "M400000 241H110l3-3c68.7-52.7 113.7-120\n 135-202 4-14.7 6-23 6-25 0-7.3-7-11-21-11-8 0-13.2.8-15.5 2.5-2.3 1.7-4.2 5.8\n-5.5 12.5-1.3 4.7-2.7 10.3-4 17-12 48.7-34.8 92-68.5 130S65.3 228.3 18 247\nc-10 4-16 7.7-18 11 0 8.7 6 14.3 18 17 47.3 18.7 87.8 47 121.5 85S196 441.3 208\n 490c.7 2 1.3 5 2 9s1.2 6.7 1.5 8c.3 1.3 1 3.3 2 6s2.2 4.5 3.5 5.5c1.3 1 3.3\n 1.8 6 2.5s6 1 10 1c14 0 21-3.7 21-11 0-2-2-10.3-6-25-20-79.3-65-146.7-135-202\n l-3-3h399890zM100 241v40h399900v-40z",
    // overbrace is from glyphs U+23A9/23A8/23A7 in font KaTeX_Size4-Regular
    leftbrace: "M6 548l-6-6v-35l6-11c56-104 135.3-181.3 238-232 57.3-28.7 117\n-45 179-50h399577v120H403c-43.3 7-81 15-113 26-100.7 33-179.7 91-237 174-2.7\n 5-6 9-10 13-.7 1-7.3 1-20 1H6z",
    leftbraceunder: "M0 6l6-6h17c12.688 0 19.313.3 20 1 4 4 7.313 8.3 10 13\n 35.313 51.3 80.813 93.8 136.5 127.5 55.688 33.7 117.188 55.8 184.5 66.5.688\n 0 2 .3 4 1 18.688 2.7 76 4.3 172 5h399450v120H429l-6-1c-124.688-8-235-61.7\n-331-161C60.687 138.7 32.312 99.3 7 54L0 41V6z",
    // overgroup is from the MnSymbol package (public domain)
    leftgroup: "M400000 80\nH435C64 80 168.3 229.4 21 260c-5.9 1.2-18 0-18 0-2 0-3-1-3-3v-38C76 61 257 0\n 435 0h399565z",
    leftgroupunder: "M400000 262\nH435C64 262 168.3 112.6 21 82c-5.9-1.2-18 0-18 0-2 0-3 1-3 3v38c76 158 257 219\n 435 219h399565z",
    // Harpoons are from glyph U+21BD in font KaTeX Main
    leftharpoon: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3\n-3.3 10.2-9.5 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5\n-18.3 3-21-1.3-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7\n-196 228-6.7 4.7-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40z",
    leftharpoonplus: "M0 267c.7 5.3 3 10 7 14h399993v-40H93c3.3-3.3 10.2-9.5\n 20.5-18.5s17.8-15.8 22.5-20.5c50.7-52 88-110.3 112-175 4-11.3 5-18.3 3-21-1.3\n-4-7.3-6-18-6-8 0-13 .7-15 2s-4.7 6.7-8 16c-42 98.7-107.3 174.7-196 228-6.7 4.7\n-10.7 8-12 10-1.3 2-2 5.7-2 11zm100-26v40h399900v-40zM0 435v40h400000v-40z\nm0 0v40h400000v-40z",
    leftharpoondown: "M7 241c-4 4-6.333 8.667-7 14 0 5.333.667 9 2 11s5.333\n 5.333 12 10c90.667 54 156 130 196 228 3.333 10.667 6.333 16.333 9 17 2 .667 5\n 1 9 1h5c10.667 0 16.667-2 18-6 2-2.667 1-9.667-3-21-32-87.333-82.667-157.667\n-152-211l-3-3h399907v-40zM93 281 H400000 v-40L7 241z",
    leftharpoondownplus: "M7 435c-4 4-6.3 8.7-7 14 0 5.3.7 9 2 11s5.3 5.3 12\n 10c90.7 54 156 130 196 228 3.3 10.7 6.3 16.3 9 17 2 .7 5 1 9 1h5c10.7 0 16.7\n-2 18-6 2-2.7 1-9.7-3-21-32-87.3-82.7-157.7-152-211l-3-3h399907v-40H7zm93 0\nv40h399900v-40zM0 241v40h399900v-40zm0 0v40h399900v-40z",
    // hook is from glyph U+21A9 in font KaTeX Main
    lefthook: "M400000 281 H103s-33-11.2-61-33.5S0 197.3 0 164s14.2-61.2 42.5\n-83.5C70.8 58.2 104 47 142 47 c16.7 0 25 6.7 25 20 0 12-8.7 18.7-26 20-40 3.3\n-68.7 15.7-86 37-10 12-15 25.3-15 40 0 22.7 9.8 40.7 29.5 54 19.7 13.3 43.5 21\n 71.5 23h399859zM103 281v-40h399897v40z",
    leftlinesegment: "M40 281 V428 H0 V94 H40 V241 H400000 v40z\nM40 281 V428 H0 V94 H40 V241 H400000 v40z",
    leftmapsto: "M40 281 V448H0V74H40V241H400000v40z\nM40 281 V448H0V74H40V241H400000v40z",
    // tofrom is from glyph U+21C4 in font KaTeX AMS Regular
    leftToFrom: "M0 147h400000v40H0zm0 214c68 40 115.7 95.7 143 167h22c15.3 0 23\n-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69-70-101l-7-8h399905v-40H95l7-8\nc28.7-32 52-65.7 70-101 10.7-23.3 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 265.3\n 68 321 0 361zm0-174v-40h399900v40zm100 154v40h399900v-40z",
    longequal: "M0 50 h400000 v40H0z m0 194h40000v40H0z\nM0 50 h400000 v40H0z m0 194h40000v40H0z",
    midbrace: "M200428 334\nc-100.7-8.3-195.3-44-280-108-55.3-42-101.7-93-139-153l-9-14c-2.7 4-5.7 8.7-9 14\n-53.3 86.7-123.7 153-211 199-66.7 36-137.3 56.3-212 62H0V214h199568c178.3-11.7\n 311.7-78.3 403-201 6-8 9.7-12 11-12 .7-.7 6.7-1 18-1s17.3.3 18 1c1.3 0 5 4 11\n 12 44.7 59.3 101.3 106.3 170 141s145.3 54.3 229 60h199572v120z",
    midbraceunder: "M199572 214\nc100.7 8.3 195.3 44 280 108 55.3 42 101.7 93 139 153l9 14c2.7-4 5.7-8.7 9-14\n 53.3-86.7 123.7-153 211-199 66.7-36 137.3-56.3 212-62h199568v120H200432c-178.3\n 11.7-311.7 78.3-403 201-6 8-9.7 12-11 12-.7.7-6.7 1-18 1s-17.3-.3-18-1c-1.3 0\n-5-4-11-12-44.7-59.3-101.3-106.3-170-141s-145.3-54.3-229-60H0V214z",
    oiintSize1: "M512.6 71.6c272.6 0 320.3 106.8 320.3 178.2 0 70.8-47.7 177.6\n-320.3 177.6S193.1 320.6 193.1 249.8c0-71.4 46.9-178.2 319.5-178.2z\nm368.1 178.2c0-86.4-60.9-215.4-368.1-215.4-306.4 0-367.3 129-367.3 215.4 0 85.8\n60.9 214.8 367.3 214.8 307.2 0 368.1-129 368.1-214.8z",
    oiintSize2: "M757.8 100.1c384.7 0 451.1 137.6 451.1 230 0 91.3-66.4 228.8\n-451.1 228.8-386.3 0-452.7-137.5-452.7-228.8 0-92.4 66.4-230 452.7-230z\nm502.4 230c0-111.2-82.4-277.2-502.4-277.2s-504 166-504 277.2\nc0 110 84 276 504 276s502.4-166 502.4-276z",
    oiiintSize1: "M681.4 71.6c408.9 0 480.5 106.8 480.5 178.2 0 70.8-71.6 177.6\n-480.5 177.6S202.1 320.6 202.1 249.8c0-71.4 70.5-178.2 479.3-178.2z\nm525.8 178.2c0-86.4-86.8-215.4-525.7-215.4-437.9 0-524.7 129-524.7 215.4 0\n85.8 86.8 214.8 524.7 214.8 438.9 0 525.7-129 525.7-214.8z",
    oiiintSize2: "M1021.2 53c603.6 0 707.8 165.8 707.8 277.2 0 110-104.2 275.8\n-707.8 275.8-606 0-710.2-165.8-710.2-275.8C311 218.8 415.2 53 1021.2 53z\nm770.4 277.1c0-131.2-126.4-327.6-770.5-327.6S248.4 198.9 248.4 330.1\nc0 130 128.8 326.4 772.7 326.4s770.5-196.4 770.5-326.4z",
    rightarrow: "M0 241v40h399891c-47.3 35.3-84 78-110 128\n-16.7 32-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20\n 11 8 0 13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7\n 39-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85\n-40.5-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n 151.7 139 205zm0 0v40h399900v-40z",
    rightbrace: "M400000 542l\n-6 6h-17c-12.7 0-19.3-.3-20-1-4-4-7.3-8.3-10-13-35.3-51.3-80.8-93.8-136.5-127.5\ns-117.2-55.8-184.5-66.5c-.7 0-2-.3-4-1-18.7-2.7-76-4.3-172-5H0V214h399571l6 1\nc124.7 8 235 61.7 331 161 31.3 33.3 59.7 72.7 85 118l7 13v35z",
    rightbraceunder: "M399994 0l6 6v35l-6 11c-56 104-135.3 181.3-238 232-57.3\n 28.7-117 45-179 50H-300V214h399897c43.3-7 81-15 113-26 100.7-33 179.7-91 237\n-174 2.7-5 6-9 10-13 .7-1 7.3-1 20-1h17z",
    rightgroup: "M0 80h399565c371 0 266.7 149.4 414 180 5.9 1.2 18 0 18 0 2 0\n 3-1 3-3v-38c-76-158-257-219-435-219H0z",
    rightgroupunder: "M0 262h399565c371 0 266.7-149.4 414-180 5.9-1.2 18 0 18\n 0 2 0 3 1 3 3v38c-76 158-257 219-435 219H0z",
    rightharpoon: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3\n-3.7-15.3-11-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2\n-10.7 0-16.7 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58\n 69.2 92 94.5zm0 0v40h399900v-40z",
    rightharpoonplus: "M0 241v40h399993c4.7-4.7 7-9.3 7-14 0-9.3-3.7-15.3-11\n-18-92.7-56.7-159-133.7-199-231-3.3-9.3-6-14.7-8-16-2-1.3-7-2-15-2-10.7 0-16.7\n 2-18 6-2 2.7-1 9.7 3 21 15.3 42 36.7 81.8 64 119.5 27.3 37.7 58 69.2 92 94.5z\nm0 0v40h399900v-40z m100 194v40h399900v-40zm0 0v40h399900v-40z",
    rightharpoondown: "M399747 511c0 7.3 6.7 11 20 11 8 0 13-.8 15-2.5s4.7-6.8\n 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3 8.5-5.8 9.5\n-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3-64.7 57-92 95\n-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 241v40h399900v-40z",
    rightharpoondownplus: "M399747 705c0 7.3 6.7 11 20 11 8 0 13-.8\n 15-2.5s4.7-6.8 8-15.5c40-94 99.3-166.3 178-217 13.3-8 20.3-12.3 21-13 5.3-3.3\n 8.5-5.8 9.5-7.5 1-1.7 1.5-5.2 1.5-10.5s-2.3-10.3-7-15H0v40h399908c-34 25.3\n-64.7 57-92 95-27.3 38-48.7 77.7-64 119-3.3 8.7-5 14-5 16zM0 435v40h399900v-40z\nm0-194v40h400000v-40zm0 0v40h400000v-40z",
    righthook: "M399859 241c-764 0 0 0 0 0 40-3.3 68.7-15.7 86-37 10-12 15-25.3\n 15-40 0-22.7-9.8-40.7-29.5-54-19.7-13.3-43.5-21-71.5-23-17.3-1.3-26-8-26-20 0\n-13.3 8.7-20 26-20 38 0 71 11.2 99 33.5 0 0 7 5.6 21 16.7 14 11.2 21 33.5 21\n 66.8s-14 61.2-42 83.5c-28 22.3-61 33.5-99 33.5L0 241z M0 281v-40h399859v40z",
    rightlinesegment: "M399960 241 V94 h40 V428 h-40 V281 H0 v-40z\nM399960 241 V94 h40 V428 h-40 V281 H0 v-40z",
    rightToFrom: "M400000 167c-70.7-42-118-97.7-142-167h-23c-15.3 0-23 .3-23\n 1 0 1.3 5.3 13.7 16 37 18 35.3 41.3 69 70 101l7 8H0v40h399905l-7 8c-28.7 32\n-52 65.7-70 101-10.7 23.3-16 35.7-16 37 0 .7 7.7 1 23 1h23c24-69.3 71.3-125 142\n-167z M100 147v40h399900v-40zM0 341v40h399900v-40z",
    // twoheadleftarrow is from glyph U+219E in font KaTeX AMS Regular
    twoheadleftarrow: "M0 167c68 40\n 115.7 95.7 143 167h22c15.3 0 23-.3 23-1 0-1.3-5.3-13.7-16-37-18-35.3-41.3-69\n-70-101l-7-8h125l9 7c50.7 39.3 85 86 103 140h46c0-4.7-6.3-18.7-19-42-18-35.3\n-40-67.3-66-96l-9-9h399716v-40H284l9-9c26-28.7 48-60.7 66-96 12.7-23.333 19\n-37.333 19-42h-46c-18 54-52.3 100.7-103 140l-9 7H95l7-8c28.7-32 52-65.7 70-101\n 10.7-23.333 16-35.7 16-37 0-.7-7.7-1-23-1h-22C115.7 71.3 68 127 0 167z",
    twoheadrightarrow: "M400000 167\nc-68-40-115.7-95.7-143-167h-22c-15.3 0-23 .3-23 1 0 1.3 5.3 13.7 16 37 18 35.3\n 41.3 69 70 101l7 8h-125l-9-7c-50.7-39.3-85-86-103-140h-46c0 4.7 6.3 18.7 19 42\n 18 35.3 40 67.3 66 96l9 9H0v40h399716l-9 9c-26 28.7-48 60.7-66 96-12.7 23.333\n-19 37.333-19 42h46c18-54 52.3-100.7 103-140l9-7h125l-7 8c-28.7 32-52 65.7-70\n 101-10.7 23.333-16 35.7-16 37 0 .7 7.7 1 23 1h22c27.3-71.3 75-127 143-167z",
    // tilde1 is a modified version of a glyph from the MnSymbol package
    tilde1: "M200 55.538c-77 0-168 73.953-177 73.953-3 0-7\n-2.175-9-5.437L2 97c-1-2-2-4-2-6 0-4 2-7 5-9l20-12C116 12 171 0 207 0c86 0\n 114 68 191 68 78 0 168-68 177-68 4 0 7 2 9 5l12 19c1 2.175 2 4.35 2 6.525 0\n 4.35-2 7.613-5 9.788l-19 13.05c-92 63.077-116.937 75.308-183 76.128\n-68.267.847-113-73.952-191-73.952z",
    // ditto tilde2, tilde3, & tilde4
    tilde2: "M344 55.266c-142 0-300.638 81.316-311.5 86.418\n-8.01 3.762-22.5 10.91-23.5 5.562L1 120c-1-2-1-3-1-4 0-5 3-9 8-10l18.4-9C160.9\n 31.9 283 0 358 0c148 0 188 122 331 122s314-97 326-97c4 0 8 2 10 7l7 21.114\nc1 2.14 1 3.21 1 4.28 0 5.347-3 9.626-7 10.696l-22.3 12.622C852.6 158.372 751\n 181.476 676 181.476c-149 0-189-126.21-332-126.21z",
    tilde3: "M786 59C457 59 32 175.242 13 175.242c-6 0-10-3.457\n-11-10.37L.15 138c-1-7 3-12 10-13l19.2-6.4C378.4 40.7 634.3 0 804.3 0c337 0\n 411.8 157 746.8 157 328 0 754-112 773-112 5 0 10 3 11 9l1 14.075c1 8.066-.697\n 16.595-6.697 17.492l-21.052 7.31c-367.9 98.146-609.15 122.696-778.15 122.696\n -338 0-409-156.573-744-156.573z",
    tilde4: "M786 58C457 58 32 177.487 13 177.487c-6 0-10-3.345\n-11-10.035L.15 143c-1-7 3-12 10-13l22-6.7C381.2 35 637.15 0 807.15 0c337 0 409\n 177 744 177 328 0 754-127 773-127 5 0 10 3 11 9l1 14.794c1 7.805-3 13.38-9\n 14.495l-20.7 5.574c-366.85 99.79-607.3 139.372-776.3 139.372-338 0-409\n -175.236-744-175.236z",
    // vec is from glyph U+20D7 in font KaTeX Main
    vec: "M377 20c0-5.333 1.833-10 5.5-14S391 0 397 0c4.667 0 8.667 1.667 12 5\n3.333 2.667 6.667 9 10 19 6.667 24.667 20.333 43.667 41 57 7.333 4.667 11\n10.667 11 18 0 6-1 10-3 12s-6.667 5-14 9c-28.667 14.667-53.667 35.667-75 63\n-1.333 1.333-3.167 3.5-5.5 6.5s-4 4.833-5 5.5c-1 .667-2.5 1.333-4.5 2s-4.333 1\n-7 1c-4.667 0-9.167-1.833-13.5-5.5S337 184 337 178c0-12.667 15.667-32.333 47-59\nH213l-171-1c-8.667-6-13-12.333-13-19 0-4.667 4.333-11.333 13-20h359\nc-16-25.333-24-45-24-59z",
    // widehat1 is a modified version of a glyph from the MnSymbol package
    widehat1: "M529 0h5l519 115c5 1 9 5 9 10 0 1-1 2-1 3l-4 22\nc-1 5-5 9-11 9h-2L532 67 19 159h-2c-5 0-9-4-11-9l-5-22c-1-6 2-12 8-13z",
    // ditto widehat2, widehat3, & widehat4
    widehat2: "M1181 0h2l1171 176c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 220h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
    widehat3: "M1181 0h2l1171 236c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 280h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
    widehat4: "M1181 0h2l1171 296c6 0 10 5 10 11l-2 23c-1 6-5 10\n-11 10h-1L1182 67 15 340h-1c-6 0-10-4-11-10l-2-23c-1-6 4-11 10-11z",
    // widecheck paths are all inverted versions of widehat
    widecheck1: "M529,159h5l519,-115c5,-1,9,-5,9,-10c0,-1,-1,-2,-1,-3l-4,-22c-1,\n-5,-5,-9,-11,-9h-2l-512,92l-513,-92h-2c-5,0,-9,4,-11,9l-5,22c-1,6,2,12,8,13z",
    widecheck2: "M1181,220h2l1171,-176c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,153l-1167,-153h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
    widecheck3: "M1181,280h2l1171,-236c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,213l-1167,-213h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
    widecheck4: "M1181,340h2l1171,-296c6,0,10,-5,10,-11l-2,-23c-1,-6,-5,-10,\n-11,-10h-1l-1168,273l-1167,-273h-1c-6,0,-10,4,-11,10l-2,23c-1,6,4,11,10,11z",
    // The next ten paths support reaction arrows from the mhchem package.
    // Arrows for \ce{<-->} are offset from xAxis by 0.22ex, per mhchem in LaTeX
    // baraboveleftarrow is mostly from glyph U+2190 in font KaTeX Main
    baraboveleftarrow: "M400000 620h-399890l3 -3c68.7 -52.7 113.7 -120 135 -202\nc4 -14.7 6 -23 6 -25c0 -7.3 -7 -11 -21 -11c-8 0 -13.2 0.8 -15.5 2.5\nc-2.3 1.7 -4.2 5.8 -5.5 12.5c-1.3 4.7 -2.7 10.3 -4 17c-12 48.7 -34.8 92 -68.5 130\ns-74.2 66.3 -121.5 85c-10 4 -16 7.7 -18 11c0 8.7 6 14.3 18 17c47.3 18.7 87.8 47\n121.5 85s56.5 81.3 68.5 130c0.7 2 1.3 5 2 9s1.2 6.7 1.5 8c0.3 1.3 1 3.3 2 6\ns2.2 4.5 3.5 5.5c1.3 1 3.3 1.8 6 2.5s6 1 10 1c14 0 21 -3.7 21 -11\nc0 -2 -2 -10.3 -6 -25c-20 -79.3 -65 -146.7 -135 -202l-3 -3h399890z\nM100 620v40h399900v-40z M0 241v40h399900v-40zM0 241v40h399900v-40z",
    // rightarrowabovebar is mostly from glyph U+2192, KaTeX Main
    rightarrowabovebar: "M0 241v40h399891c-47.3 35.3-84 78-110 128-16.7 32\n-27.7 63.7-33 95 0 1.3-.2 2.7-.5 4-.3 1.3-.5 2.3-.5 3 0 7.3 6.7 11 20 11 8 0\n13.2-.8 15.5-2.5 2.3-1.7 4.2-5.5 5.5-11.5 2-13.3 5.7-27 11-41 14.7-44.7 39\n-84.5 73-119.5s73.7-60.2 119-75.5c6-2 9-5.7 9-11s-3-9-9-11c-45.3-15.3-85-40.5\n-119-75.5s-58.3-74.8-73-119.5c-4.7-14-8.3-27.3-11-40-1.3-6.7-3.2-10.8-5.5\n-12.5-2.3-1.7-7.5-2.5-15.5-2.5-14 0-21 3.7-21 11 0 2 2 10.3 6 25 20.7 83.3 67\n151.7 139 205zm96 379h399894v40H0zm0 0h399904v40H0z",
    // The short left harpoon has 0.5em (i.e. 500 units) kern on the left end.
    // Ref from mhchem.sty: \rlap{\raisebox{-.22ex}{$\kern0.5em
    baraboveshortleftharpoon: "M507,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17\nc2,0.7,5,1,9,1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21\nc-32,-87.3,-82.7,-157.7,-152,-211c0,0,-3,-3,-3,-3l399351,0l0,-40\nc-398570,0,-399437,0,-399437,0z M593 435 v40 H399500 v-40z\nM0 281 v-40 H399908 v40z M0 281 v-40 H399908 v40z",
    rightharpoonaboveshortbar: "M0,241 l0,40c399126,0,399993,0,399993,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM0 241 v40 H399908 v-40z M0 475 v-40 H399500 v40z M0 475 v-40 H399500 v40z",
    shortbaraboveleftharpoon: "M7,435c-4,4,-6.3,8.7,-7,14c0,5.3,0.7,9,2,11\nc1.3,2,5.3,5.3,12,10c90.7,54,156,130,196,228c3.3,10.7,6.3,16.3,9,17c2,0.7,5,1,9,\n1c0,0,5,0,5,0c10.7,0,16.7,-2,18,-6c2,-2.7,1,-9.7,-3,-21c-32,-87.3,-82.7,-157.7,\n-152,-211c0,0,-3,-3,-3,-3l399907,0l0,-40c-399126,0,-399993,0,-399993,0z\nM93 435 v40 H400000 v-40z M500 241 v40 H400000 v-40z M500 241 v40 H400000 v-40z",
    shortrightharpoonabovebar: "M53,241l0,40c398570,0,399437,0,399437,0\nc4.7,-4.7,7,-9.3,7,-14c0,-9.3,-3.7,-15.3,-11,-18c-92.7,-56.7,-159,-133.7,-199,\n-231c-3.3,-9.3,-6,-14.7,-8,-16c-2,-1.3,-7,-2,-15,-2c-10.7,0,-16.7,2,-18,6\nc-2,2.7,-1,9.7,3,21c15.3,42,36.7,81.8,64,119.5c27.3,37.7,58,69.2,92,94.5z\nM500 241 v40 H399408 v-40z M500 435 v40 H400000 v-40z"
  };
  var tallDelim = function tallDelim2(label, midHeight) {
    switch (label) {
      case "lbrack":
        return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v1759 h347 v-84\nH403z M403 1759 V0 H319 V1759 v" + midHeight + " v1759 h84z";
      case "rbrack":
        return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v1759 H0 v84 H347z\nM347 1759 V0 H263 V1759 v" + midHeight + " v1759 h84z";
      case "vert":
        return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z";
      case "doublevert":
        return "M145 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M188 15 H145 v585 v" + midHeight + " v585 h43z\nM367 15 v585 v" + midHeight + " v585 c2.667,10,9.667,15,21,15\nc10,0,16.667,-5,20,-15 v-585 v" + -midHeight + " v-585 c-2.667,-10,-9.667,-15,-21,-15\nc-10,0,-16.667,5,-20,15z M410 15 H367 v585 v" + midHeight + " v585 h43z";
      case "lfloor":
        return "M319 602 V0 H403 V602 v" + midHeight + " v1715 h263 v84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
      case "rfloor":
        return "M319 602 V0 H403 V602 v" + midHeight + " v1799 H0 v-84 H319z\nMM319 602 V0 H403 V602 v" + midHeight + " v1715 H319z";
      case "lceil":
        return "M403 1759 V84 H666 V0 H319 V1759 v" + midHeight + " v602 h84z\nM403 1759 V0 H319 V1759 v" + midHeight + " v602 h84z";
      case "rceil":
        return "M347 1759 V0 H0 V84 H263 V1759 v" + midHeight + " v602 h84z\nM347 1759 V0 h-84 V1759 v" + midHeight + " v602 h84z";
      case "lparen":
        return "M863,9c0,-2,-2,-5,-6,-9c0,0,-17,0,-17,0c-12.7,0,-19.3,0.3,-20,1\nc-5.3,5.3,-10.3,11,-15,17c-242.7,294.7,-395.3,682,-458,1162c-21.3,163.3,-33.3,349,\n-36,557 l0," + (midHeight + 84) + "c0.2,6,0,26,0,60c2,159.3,10,310.7,24,454c53.3,528,210,\n949.7,470,1265c4.7,6,9.7,11.7,15,17c0.7,0.7,7,1,19,1c0,0,18,0,18,0c4,-4,6,-7,6,-9\nc0,-2.7,-3.3,-8.7,-10,-18c-135.3,-192.7,-235.5,-414.3,-300.5,-665c-65,-250.7,-102.5,\n-544.7,-112.5,-882c-2,-104,-3,-167,-3,-189\nl0,-" + (midHeight + 92) + "c0,-162.7,5.7,-314,17,-454c20.7,-272,63.7,-513,129,-723c65.3,\n-210,155.3,-396.3,270,-559c6.7,-9.3,10,-15.3,10,-18z";
      case "rparen":
        return "M76,0c-16.7,0,-25,3,-25,9c0,2,2,6.3,6,13c21.3,28.7,42.3,60.3,\n63,95c96.7,156.7,172.8,332.5,228.5,527.5c55.7,195,92.8,416.5,111.5,664.5\nc11.3,139.3,17,290.7,17,454c0,28,1.7,43,3.3,45l0," + (midHeight + 9) + "\nc-3,4,-3.3,16.7,-3.3,38c0,162,-5.7,313.7,-17,455c-18.7,248,-55.8,469.3,-111.5,664\nc-55.7,194.7,-131.8,370.3,-228.5,527c-20.7,34.7,-41.7,66.3,-63,95c-2,3.3,-4,7,-6,11\nc0,7.3,5.7,11,17,11c0,0,11,0,11,0c9.3,0,14.3,-0.3,15,-1c5.3,-5.3,10.3,-11,15,-17\nc242.7,-294.7,395.3,-681.7,458,-1161c21.3,-164.7,33.3,-350.7,36,-558\nl0,-" + (midHeight + 144) + "c-2,-159.3,-10,-310.7,-24,-454c-53.3,-528,-210,-949.7,\n-470,-1265c-4.7,-6,-9.7,-11.7,-15,-17c-0.7,-0.7,-6.7,-1,-18,-1z";
      default:
        throw new Error("Unknown stretchy delimiter.");
    }
  };
  var DocumentFragment = class {
    // Never used; needed for satisfying interface.
    constructor(children) {
      this.children = void 0;
      this.classes = void 0;
      this.height = void 0;
      this.depth = void 0;
      this.maxFontSize = void 0;
      this.style = void 0;
      this.children = children;
      this.classes = [];
      this.height = 0;
      this.depth = 0;
      this.maxFontSize = 0;
      this.style = {};
    }
    hasClass(className) {
      return this.classes.includes(className);
    }
    /** Convert the fragment into a node. */
    toNode() {
      var frag = document.createDocumentFragment();
      for (var i2 = 0; i2 < this.children.length; i2++) {
        frag.appendChild(this.children[i2].toNode());
      }
      return frag;
    }
    /** Convert the fragment into HTML markup. */
    toMarkup() {
      var markup = "";
      for (var i2 = 0; i2 < this.children.length; i2++) {
        markup += this.children[i2].toMarkup();
      }
      return markup;
    }
    /**
     * Converts the math node into a string, similar to innerText. Applies to
     * MathDomNode's only.
     */
    toText() {
      var toText = (child) => child.toText();
      return this.children.map(toText).join("");
    }
  };
  var fontMetricsData = {
    "AMS-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "65": [0, 0.68889, 0, 0, 0.72222],
      "66": [0, 0.68889, 0, 0, 0.66667],
      "67": [0, 0.68889, 0, 0, 0.72222],
      "68": [0, 0.68889, 0, 0, 0.72222],
      "69": [0, 0.68889, 0, 0, 0.66667],
      "70": [0, 0.68889, 0, 0, 0.61111],
      "71": [0, 0.68889, 0, 0, 0.77778],
      "72": [0, 0.68889, 0, 0, 0.77778],
      "73": [0, 0.68889, 0, 0, 0.38889],
      "74": [0.16667, 0.68889, 0, 0, 0.5],
      "75": [0, 0.68889, 0, 0, 0.77778],
      "76": [0, 0.68889, 0, 0, 0.66667],
      "77": [0, 0.68889, 0, 0, 0.94445],
      "78": [0, 0.68889, 0, 0, 0.72222],
      "79": [0.16667, 0.68889, 0, 0, 0.77778],
      "80": [0, 0.68889, 0, 0, 0.61111],
      "81": [0.16667, 0.68889, 0, 0, 0.77778],
      "82": [0, 0.68889, 0, 0, 0.72222],
      "83": [0, 0.68889, 0, 0, 0.55556],
      "84": [0, 0.68889, 0, 0, 0.66667],
      "85": [0, 0.68889, 0, 0, 0.72222],
      "86": [0, 0.68889, 0, 0, 0.72222],
      "87": [0, 0.68889, 0, 0, 1],
      "88": [0, 0.68889, 0, 0, 0.72222],
      "89": [0, 0.68889, 0, 0, 0.72222],
      "90": [0, 0.68889, 0, 0, 0.66667],
      "107": [0, 0.68889, 0, 0, 0.55556],
      "160": [0, 0, 0, 0, 0.25],
      "165": [0, 0.675, 0.025, 0, 0.75],
      "174": [0.15559, 0.69224, 0, 0, 0.94666],
      "240": [0, 0.68889, 0, 0, 0.55556],
      "295": [0, 0.68889, 0, 0, 0.54028],
      "710": [0, 0.825, 0, 0, 2.33334],
      "732": [0, 0.9, 0, 0, 2.33334],
      "770": [0, 0.825, 0, 0, 2.33334],
      "771": [0, 0.9, 0, 0, 2.33334],
      "989": [0.08167, 0.58167, 0, 0, 0.77778],
      "1008": [0, 0.43056, 0.04028, 0, 0.66667],
      "8245": [0, 0.54986, 0, 0, 0.275],
      "8463": [0, 0.68889, 0, 0, 0.54028],
      "8487": [0, 0.68889, 0, 0, 0.72222],
      "8498": [0, 0.68889, 0, 0, 0.55556],
      "8502": [0, 0.68889, 0, 0, 0.66667],
      "8503": [0, 0.68889, 0, 0, 0.44445],
      "8504": [0, 0.68889, 0, 0, 0.66667],
      "8513": [0, 0.68889, 0, 0, 0.63889],
      "8592": [-0.03598, 0.46402, 0, 0, 0.5],
      "8594": [-0.03598, 0.46402, 0, 0, 0.5],
      "8602": [-0.13313, 0.36687, 0, 0, 1],
      "8603": [-0.13313, 0.36687, 0, 0, 1],
      "8606": [0.01354, 0.52239, 0, 0, 1],
      "8608": [0.01354, 0.52239, 0, 0, 1],
      "8610": [0.01354, 0.52239, 0, 0, 1.11111],
      "8611": [0.01354, 0.52239, 0, 0, 1.11111],
      "8619": [0, 0.54986, 0, 0, 1],
      "8620": [0, 0.54986, 0, 0, 1],
      "8621": [-0.13313, 0.37788, 0, 0, 1.38889],
      "8622": [-0.13313, 0.36687, 0, 0, 1],
      "8624": [0, 0.69224, 0, 0, 0.5],
      "8625": [0, 0.69224, 0, 0, 0.5],
      "8630": [0, 0.43056, 0, 0, 1],
      "8631": [0, 0.43056, 0, 0, 1],
      "8634": [0.08198, 0.58198, 0, 0, 0.77778],
      "8635": [0.08198, 0.58198, 0, 0, 0.77778],
      "8638": [0.19444, 0.69224, 0, 0, 0.41667],
      "8639": [0.19444, 0.69224, 0, 0, 0.41667],
      "8642": [0.19444, 0.69224, 0, 0, 0.41667],
      "8643": [0.19444, 0.69224, 0, 0, 0.41667],
      "8644": [0.1808, 0.675, 0, 0, 1],
      "8646": [0.1808, 0.675, 0, 0, 1],
      "8647": [0.1808, 0.675, 0, 0, 1],
      "8648": [0.19444, 0.69224, 0, 0, 0.83334],
      "8649": [0.1808, 0.675, 0, 0, 1],
      "8650": [0.19444, 0.69224, 0, 0, 0.83334],
      "8651": [0.01354, 0.52239, 0, 0, 1],
      "8652": [0.01354, 0.52239, 0, 0, 1],
      "8653": [-0.13313, 0.36687, 0, 0, 1],
      "8654": [-0.13313, 0.36687, 0, 0, 1],
      "8655": [-0.13313, 0.36687, 0, 0, 1],
      "8666": [0.13667, 0.63667, 0, 0, 1],
      "8667": [0.13667, 0.63667, 0, 0, 1],
      "8669": [-0.13313, 0.37788, 0, 0, 1],
      "8672": [-0.064, 0.437, 0, 0, 1.334],
      "8674": [-0.064, 0.437, 0, 0, 1.334],
      "8705": [0, 0.825, 0, 0, 0.5],
      "8708": [0, 0.68889, 0, 0, 0.55556],
      "8709": [0.08167, 0.58167, 0, 0, 0.77778],
      "8717": [0, 0.43056, 0, 0, 0.42917],
      "8722": [-0.03598, 0.46402, 0, 0, 0.5],
      "8724": [0.08198, 0.69224, 0, 0, 0.77778],
      "8726": [0.08167, 0.58167, 0, 0, 0.77778],
      "8733": [0, 0.69224, 0, 0, 0.77778],
      "8736": [0, 0.69224, 0, 0, 0.72222],
      "8737": [0, 0.69224, 0, 0, 0.72222],
      "8738": [0.03517, 0.52239, 0, 0, 0.72222],
      "8739": [0.08167, 0.58167, 0, 0, 0.22222],
      "8740": [0.25142, 0.74111, 0, 0, 0.27778],
      "8741": [0.08167, 0.58167, 0, 0, 0.38889],
      "8742": [0.25142, 0.74111, 0, 0, 0.5],
      "8756": [0, 0.69224, 0, 0, 0.66667],
      "8757": [0, 0.69224, 0, 0, 0.66667],
      "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
      "8765": [-0.13313, 0.37788, 0, 0, 0.77778],
      "8769": [-0.13313, 0.36687, 0, 0, 0.77778],
      "8770": [-0.03625, 0.46375, 0, 0, 0.77778],
      "8774": [0.30274, 0.79383, 0, 0, 0.77778],
      "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
      "8778": [0.08167, 0.58167, 0, 0, 0.77778],
      "8782": [0.06062, 0.54986, 0, 0, 0.77778],
      "8783": [0.06062, 0.54986, 0, 0, 0.77778],
      "8785": [0.08198, 0.58198, 0, 0, 0.77778],
      "8786": [0.08198, 0.58198, 0, 0, 0.77778],
      "8787": [0.08198, 0.58198, 0, 0, 0.77778],
      "8790": [0, 0.69224, 0, 0, 0.77778],
      "8791": [0.22958, 0.72958, 0, 0, 0.77778],
      "8796": [0.08198, 0.91667, 0, 0, 0.77778],
      "8806": [0.25583, 0.75583, 0, 0, 0.77778],
      "8807": [0.25583, 0.75583, 0, 0, 0.77778],
      "8808": [0.25142, 0.75726, 0, 0, 0.77778],
      "8809": [0.25142, 0.75726, 0, 0, 0.77778],
      "8812": [0.25583, 0.75583, 0, 0, 0.5],
      "8814": [0.20576, 0.70576, 0, 0, 0.77778],
      "8815": [0.20576, 0.70576, 0, 0, 0.77778],
      "8816": [0.30274, 0.79383, 0, 0, 0.77778],
      "8817": [0.30274, 0.79383, 0, 0, 0.77778],
      "8818": [0.22958, 0.72958, 0, 0, 0.77778],
      "8819": [0.22958, 0.72958, 0, 0, 0.77778],
      "8822": [0.1808, 0.675, 0, 0, 0.77778],
      "8823": [0.1808, 0.675, 0, 0, 0.77778],
      "8828": [0.13667, 0.63667, 0, 0, 0.77778],
      "8829": [0.13667, 0.63667, 0, 0, 0.77778],
      "8830": [0.22958, 0.72958, 0, 0, 0.77778],
      "8831": [0.22958, 0.72958, 0, 0, 0.77778],
      "8832": [0.20576, 0.70576, 0, 0, 0.77778],
      "8833": [0.20576, 0.70576, 0, 0, 0.77778],
      "8840": [0.30274, 0.79383, 0, 0, 0.77778],
      "8841": [0.30274, 0.79383, 0, 0, 0.77778],
      "8842": [0.13597, 0.63597, 0, 0, 0.77778],
      "8843": [0.13597, 0.63597, 0, 0, 0.77778],
      "8847": [0.03517, 0.54986, 0, 0, 0.77778],
      "8848": [0.03517, 0.54986, 0, 0, 0.77778],
      "8858": [0.08198, 0.58198, 0, 0, 0.77778],
      "8859": [0.08198, 0.58198, 0, 0, 0.77778],
      "8861": [0.08198, 0.58198, 0, 0, 0.77778],
      "8862": [0, 0.675, 0, 0, 0.77778],
      "8863": [0, 0.675, 0, 0, 0.77778],
      "8864": [0, 0.675, 0, 0, 0.77778],
      "8865": [0, 0.675, 0, 0, 0.77778],
      "8872": [0, 0.69224, 0, 0, 0.61111],
      "8873": [0, 0.69224, 0, 0, 0.72222],
      "8874": [0, 0.69224, 0, 0, 0.88889],
      "8876": [0, 0.68889, 0, 0, 0.61111],
      "8877": [0, 0.68889, 0, 0, 0.61111],
      "8878": [0, 0.68889, 0, 0, 0.72222],
      "8879": [0, 0.68889, 0, 0, 0.72222],
      "8882": [0.03517, 0.54986, 0, 0, 0.77778],
      "8883": [0.03517, 0.54986, 0, 0, 0.77778],
      "8884": [0.13667, 0.63667, 0, 0, 0.77778],
      "8885": [0.13667, 0.63667, 0, 0, 0.77778],
      "8888": [0, 0.54986, 0, 0, 1.11111],
      "8890": [0.19444, 0.43056, 0, 0, 0.55556],
      "8891": [0.19444, 0.69224, 0, 0, 0.61111],
      "8892": [0.19444, 0.69224, 0, 0, 0.61111],
      "8901": [0, 0.54986, 0, 0, 0.27778],
      "8903": [0.08167, 0.58167, 0, 0, 0.77778],
      "8905": [0.08167, 0.58167, 0, 0, 0.77778],
      "8906": [0.08167, 0.58167, 0, 0, 0.77778],
      "8907": [0, 0.69224, 0, 0, 0.77778],
      "8908": [0, 0.69224, 0, 0, 0.77778],
      "8909": [-0.03598, 0.46402, 0, 0, 0.77778],
      "8910": [0, 0.54986, 0, 0, 0.76042],
      "8911": [0, 0.54986, 0, 0, 0.76042],
      "8912": [0.03517, 0.54986, 0, 0, 0.77778],
      "8913": [0.03517, 0.54986, 0, 0, 0.77778],
      "8914": [0, 0.54986, 0, 0, 0.66667],
      "8915": [0, 0.54986, 0, 0, 0.66667],
      "8916": [0, 0.69224, 0, 0, 0.66667],
      "8918": [0.0391, 0.5391, 0, 0, 0.77778],
      "8919": [0.0391, 0.5391, 0, 0, 0.77778],
      "8920": [0.03517, 0.54986, 0, 0, 1.33334],
      "8921": [0.03517, 0.54986, 0, 0, 1.33334],
      "8922": [0.38569, 0.88569, 0, 0, 0.77778],
      "8923": [0.38569, 0.88569, 0, 0, 0.77778],
      "8926": [0.13667, 0.63667, 0, 0, 0.77778],
      "8927": [0.13667, 0.63667, 0, 0, 0.77778],
      "8928": [0.30274, 0.79383, 0, 0, 0.77778],
      "8929": [0.30274, 0.79383, 0, 0, 0.77778],
      "8934": [0.23222, 0.74111, 0, 0, 0.77778],
      "8935": [0.23222, 0.74111, 0, 0, 0.77778],
      "8936": [0.23222, 0.74111, 0, 0, 0.77778],
      "8937": [0.23222, 0.74111, 0, 0, 0.77778],
      "8938": [0.20576, 0.70576, 0, 0, 0.77778],
      "8939": [0.20576, 0.70576, 0, 0, 0.77778],
      "8940": [0.30274, 0.79383, 0, 0, 0.77778],
      "8941": [0.30274, 0.79383, 0, 0, 0.77778],
      "8994": [0.19444, 0.69224, 0, 0, 0.77778],
      "8995": [0.19444, 0.69224, 0, 0, 0.77778],
      "9416": [0.15559, 0.69224, 0, 0, 0.90222],
      "9484": [0, 0.69224, 0, 0, 0.5],
      "9488": [0, 0.69224, 0, 0, 0.5],
      "9492": [0, 0.37788, 0, 0, 0.5],
      "9496": [0, 0.37788, 0, 0, 0.5],
      "9585": [0.19444, 0.68889, 0, 0, 0.88889],
      "9586": [0.19444, 0.74111, 0, 0, 0.88889],
      "9632": [0, 0.675, 0, 0, 0.77778],
      "9633": [0, 0.675, 0, 0, 0.77778],
      "9650": [0, 0.54986, 0, 0, 0.72222],
      "9651": [0, 0.54986, 0, 0, 0.72222],
      "9654": [0.03517, 0.54986, 0, 0, 0.77778],
      "9660": [0, 0.54986, 0, 0, 0.72222],
      "9661": [0, 0.54986, 0, 0, 0.72222],
      "9664": [0.03517, 0.54986, 0, 0, 0.77778],
      "9674": [0.11111, 0.69224, 0, 0, 0.66667],
      "9733": [0.19444, 0.69224, 0, 0, 0.94445],
      "10003": [0, 0.69224, 0, 0, 0.83334],
      "10016": [0, 0.69224, 0, 0, 0.83334],
      "10731": [0.11111, 0.69224, 0, 0, 0.66667],
      "10846": [0.19444, 0.75583, 0, 0, 0.61111],
      "10877": [0.13667, 0.63667, 0, 0, 0.77778],
      "10878": [0.13667, 0.63667, 0, 0, 0.77778],
      "10885": [0.25583, 0.75583, 0, 0, 0.77778],
      "10886": [0.25583, 0.75583, 0, 0, 0.77778],
      "10887": [0.13597, 0.63597, 0, 0, 0.77778],
      "10888": [0.13597, 0.63597, 0, 0, 0.77778],
      "10889": [0.26167, 0.75726, 0, 0, 0.77778],
      "10890": [0.26167, 0.75726, 0, 0, 0.77778],
      "10891": [0.48256, 0.98256, 0, 0, 0.77778],
      "10892": [0.48256, 0.98256, 0, 0, 0.77778],
      "10901": [0.13667, 0.63667, 0, 0, 0.77778],
      "10902": [0.13667, 0.63667, 0, 0, 0.77778],
      "10933": [0.25142, 0.75726, 0, 0, 0.77778],
      "10934": [0.25142, 0.75726, 0, 0, 0.77778],
      "10935": [0.26167, 0.75726, 0, 0, 0.77778],
      "10936": [0.26167, 0.75726, 0, 0, 0.77778],
      "10937": [0.26167, 0.75726, 0, 0, 0.77778],
      "10938": [0.26167, 0.75726, 0, 0, 0.77778],
      "10949": [0.25583, 0.75583, 0, 0, 0.77778],
      "10950": [0.25583, 0.75583, 0, 0, 0.77778],
      "10955": [0.28481, 0.79383, 0, 0, 0.77778],
      "10956": [0.28481, 0.79383, 0, 0, 0.77778],
      "57350": [0.08167, 0.58167, 0, 0, 0.22222],
      "57351": [0.08167, 0.58167, 0, 0, 0.38889],
      "57352": [0.08167, 0.58167, 0, 0, 0.77778],
      "57353": [0, 0.43056, 0.04028, 0, 0.66667],
      "57356": [0.25142, 0.75726, 0, 0, 0.77778],
      "57357": [0.25142, 0.75726, 0, 0, 0.77778],
      "57358": [0.41951, 0.91951, 0, 0, 0.77778],
      "57359": [0.30274, 0.79383, 0, 0, 0.77778],
      "57360": [0.30274, 0.79383, 0, 0, 0.77778],
      "57361": [0.41951, 0.91951, 0, 0, 0.77778],
      "57366": [0.25142, 0.75726, 0, 0, 0.77778],
      "57367": [0.25142, 0.75726, 0, 0, 0.77778],
      "57368": [0.25142, 0.75726, 0, 0, 0.77778],
      "57369": [0.25142, 0.75726, 0, 0, 0.77778],
      "57370": [0.13597, 0.63597, 0, 0, 0.77778],
      "57371": [0.13597, 0.63597, 0, 0, 0.77778]
    },
    "Caligraphic-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "65": [0, 0.68333, 0, 0.19445, 0.79847],
      "66": [0, 0.68333, 0.03041, 0.13889, 0.65681],
      "67": [0, 0.68333, 0.05834, 0.13889, 0.52653],
      "68": [0, 0.68333, 0.02778, 0.08334, 0.77139],
      "69": [0, 0.68333, 0.08944, 0.11111, 0.52778],
      "70": [0, 0.68333, 0.09931, 0.11111, 0.71875],
      "71": [0.09722, 0.68333, 0.0593, 0.11111, 0.59487],
      "72": [0, 0.68333, 965e-5, 0.11111, 0.84452],
      "73": [0, 0.68333, 0.07382, 0, 0.54452],
      "74": [0.09722, 0.68333, 0.18472, 0.16667, 0.67778],
      "75": [0, 0.68333, 0.01445, 0.05556, 0.76195],
      "76": [0, 0.68333, 0, 0.13889, 0.68972],
      "77": [0, 0.68333, 0, 0.13889, 1.2009],
      "78": [0, 0.68333, 0.14736, 0.08334, 0.82049],
      "79": [0, 0.68333, 0.02778, 0.11111, 0.79611],
      "80": [0, 0.68333, 0.08222, 0.08334, 0.69556],
      "81": [0.09722, 0.68333, 0, 0.11111, 0.81667],
      "82": [0, 0.68333, 0, 0.08334, 0.8475],
      "83": [0, 0.68333, 0.075, 0.13889, 0.60556],
      "84": [0, 0.68333, 0.25417, 0, 0.54464],
      "85": [0, 0.68333, 0.09931, 0.08334, 0.62583],
      "86": [0, 0.68333, 0.08222, 0, 0.61278],
      "87": [0, 0.68333, 0.08222, 0.08334, 0.98778],
      "88": [0, 0.68333, 0.14643, 0.13889, 0.7133],
      "89": [0.09722, 0.68333, 0.08222, 0.08334, 0.66834],
      "90": [0, 0.68333, 0.07944, 0.13889, 0.72473],
      "160": [0, 0, 0, 0, 0.25]
    },
    "Fraktur-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69141, 0, 0, 0.29574],
      "34": [0, 0.69141, 0, 0, 0.21471],
      "38": [0, 0.69141, 0, 0, 0.73786],
      "39": [0, 0.69141, 0, 0, 0.21201],
      "40": [0.24982, 0.74947, 0, 0, 0.38865],
      "41": [0.24982, 0.74947, 0, 0, 0.38865],
      "42": [0, 0.62119, 0, 0, 0.27764],
      "43": [0.08319, 0.58283, 0, 0, 0.75623],
      "44": [0, 0.10803, 0, 0, 0.27764],
      "45": [0.08319, 0.58283, 0, 0, 0.75623],
      "46": [0, 0.10803, 0, 0, 0.27764],
      "47": [0.24982, 0.74947, 0, 0, 0.50181],
      "48": [0, 0.47534, 0, 0, 0.50181],
      "49": [0, 0.47534, 0, 0, 0.50181],
      "50": [0, 0.47534, 0, 0, 0.50181],
      "51": [0.18906, 0.47534, 0, 0, 0.50181],
      "52": [0.18906, 0.47534, 0, 0, 0.50181],
      "53": [0.18906, 0.47534, 0, 0, 0.50181],
      "54": [0, 0.69141, 0, 0, 0.50181],
      "55": [0.18906, 0.47534, 0, 0, 0.50181],
      "56": [0, 0.69141, 0, 0, 0.50181],
      "57": [0.18906, 0.47534, 0, 0, 0.50181],
      "58": [0, 0.47534, 0, 0, 0.21606],
      "59": [0.12604, 0.47534, 0, 0, 0.21606],
      "61": [-0.13099, 0.36866, 0, 0, 0.75623],
      "63": [0, 0.69141, 0, 0, 0.36245],
      "65": [0, 0.69141, 0, 0, 0.7176],
      "66": [0, 0.69141, 0, 0, 0.88397],
      "67": [0, 0.69141, 0, 0, 0.61254],
      "68": [0, 0.69141, 0, 0, 0.83158],
      "69": [0, 0.69141, 0, 0, 0.66278],
      "70": [0.12604, 0.69141, 0, 0, 0.61119],
      "71": [0, 0.69141, 0, 0, 0.78539],
      "72": [0.06302, 0.69141, 0, 0, 0.7203],
      "73": [0, 0.69141, 0, 0, 0.55448],
      "74": [0.12604, 0.69141, 0, 0, 0.55231],
      "75": [0, 0.69141, 0, 0, 0.66845],
      "76": [0, 0.69141, 0, 0, 0.66602],
      "77": [0, 0.69141, 0, 0, 1.04953],
      "78": [0, 0.69141, 0, 0, 0.83212],
      "79": [0, 0.69141, 0, 0, 0.82699],
      "80": [0.18906, 0.69141, 0, 0, 0.82753],
      "81": [0.03781, 0.69141, 0, 0, 0.82699],
      "82": [0, 0.69141, 0, 0, 0.82807],
      "83": [0, 0.69141, 0, 0, 0.82861],
      "84": [0, 0.69141, 0, 0, 0.66899],
      "85": [0, 0.69141, 0, 0, 0.64576],
      "86": [0, 0.69141, 0, 0, 0.83131],
      "87": [0, 0.69141, 0, 0, 1.04602],
      "88": [0, 0.69141, 0, 0, 0.71922],
      "89": [0.18906, 0.69141, 0, 0, 0.83293],
      "90": [0.12604, 0.69141, 0, 0, 0.60201],
      "91": [0.24982, 0.74947, 0, 0, 0.27764],
      "93": [0.24982, 0.74947, 0, 0, 0.27764],
      "94": [0, 0.69141, 0, 0, 0.49965],
      "97": [0, 0.47534, 0, 0, 0.50046],
      "98": [0, 0.69141, 0, 0, 0.51315],
      "99": [0, 0.47534, 0, 0, 0.38946],
      "100": [0, 0.62119, 0, 0, 0.49857],
      "101": [0, 0.47534, 0, 0, 0.40053],
      "102": [0.18906, 0.69141, 0, 0, 0.32626],
      "103": [0.18906, 0.47534, 0, 0, 0.5037],
      "104": [0.18906, 0.69141, 0, 0, 0.52126],
      "105": [0, 0.69141, 0, 0, 0.27899],
      "106": [0, 0.69141, 0, 0, 0.28088],
      "107": [0, 0.69141, 0, 0, 0.38946],
      "108": [0, 0.69141, 0, 0, 0.27953],
      "109": [0, 0.47534, 0, 0, 0.76676],
      "110": [0, 0.47534, 0, 0, 0.52666],
      "111": [0, 0.47534, 0, 0, 0.48885],
      "112": [0.18906, 0.52396, 0, 0, 0.50046],
      "113": [0.18906, 0.47534, 0, 0, 0.48912],
      "114": [0, 0.47534, 0, 0, 0.38919],
      "115": [0, 0.47534, 0, 0, 0.44266],
      "116": [0, 0.62119, 0, 0, 0.33301],
      "117": [0, 0.47534, 0, 0, 0.5172],
      "118": [0, 0.52396, 0, 0, 0.5118],
      "119": [0, 0.52396, 0, 0, 0.77351],
      "120": [0.18906, 0.47534, 0, 0, 0.38865],
      "121": [0.18906, 0.47534, 0, 0, 0.49884],
      "122": [0.18906, 0.47534, 0, 0, 0.39054],
      "160": [0, 0, 0, 0, 0.25],
      "8216": [0, 0.69141, 0, 0, 0.21471],
      "8217": [0, 0.69141, 0, 0, 0.21471],
      "58112": [0, 0.62119, 0, 0, 0.49749],
      "58113": [0, 0.62119, 0, 0, 0.4983],
      "58114": [0.18906, 0.69141, 0, 0, 0.33328],
      "58115": [0.18906, 0.69141, 0, 0, 0.32923],
      "58116": [0.18906, 0.47534, 0, 0, 0.50343],
      "58117": [0, 0.69141, 0, 0, 0.33301],
      "58118": [0, 0.62119, 0, 0, 0.33409],
      "58119": [0, 0.47534, 0, 0, 0.50073]
    },
    "Main-Bold": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0, 0, 0.35],
      "34": [0, 0.69444, 0, 0, 0.60278],
      "35": [0.19444, 0.69444, 0, 0, 0.95833],
      "36": [0.05556, 0.75, 0, 0, 0.575],
      "37": [0.05556, 0.75, 0, 0, 0.95833],
      "38": [0, 0.69444, 0, 0, 0.89444],
      "39": [0, 0.69444, 0, 0, 0.31944],
      "40": [0.25, 0.75, 0, 0, 0.44722],
      "41": [0.25, 0.75, 0, 0, 0.44722],
      "42": [0, 0.75, 0, 0, 0.575],
      "43": [0.13333, 0.63333, 0, 0, 0.89444],
      "44": [0.19444, 0.15556, 0, 0, 0.31944],
      "45": [0, 0.44444, 0, 0, 0.38333],
      "46": [0, 0.15556, 0, 0, 0.31944],
      "47": [0.25, 0.75, 0, 0, 0.575],
      "48": [0, 0.64444, 0, 0, 0.575],
      "49": [0, 0.64444, 0, 0, 0.575],
      "50": [0, 0.64444, 0, 0, 0.575],
      "51": [0, 0.64444, 0, 0, 0.575],
      "52": [0, 0.64444, 0, 0, 0.575],
      "53": [0, 0.64444, 0, 0, 0.575],
      "54": [0, 0.64444, 0, 0, 0.575],
      "55": [0, 0.64444, 0, 0, 0.575],
      "56": [0, 0.64444, 0, 0, 0.575],
      "57": [0, 0.64444, 0, 0, 0.575],
      "58": [0, 0.44444, 0, 0, 0.31944],
      "59": [0.19444, 0.44444, 0, 0, 0.31944],
      "60": [0.08556, 0.58556, 0, 0, 0.89444],
      "61": [-0.10889, 0.39111, 0, 0, 0.89444],
      "62": [0.08556, 0.58556, 0, 0, 0.89444],
      "63": [0, 0.69444, 0, 0, 0.54305],
      "64": [0, 0.69444, 0, 0, 0.89444],
      "65": [0, 0.68611, 0, 0, 0.86944],
      "66": [0, 0.68611, 0, 0, 0.81805],
      "67": [0, 0.68611, 0, 0, 0.83055],
      "68": [0, 0.68611, 0, 0, 0.88194],
      "69": [0, 0.68611, 0, 0, 0.75555],
      "70": [0, 0.68611, 0, 0, 0.72361],
      "71": [0, 0.68611, 0, 0, 0.90416],
      "72": [0, 0.68611, 0, 0, 0.9],
      "73": [0, 0.68611, 0, 0, 0.43611],
      "74": [0, 0.68611, 0, 0, 0.59444],
      "75": [0, 0.68611, 0, 0, 0.90138],
      "76": [0, 0.68611, 0, 0, 0.69166],
      "77": [0, 0.68611, 0, 0, 1.09166],
      "78": [0, 0.68611, 0, 0, 0.9],
      "79": [0, 0.68611, 0, 0, 0.86388],
      "80": [0, 0.68611, 0, 0, 0.78611],
      "81": [0.19444, 0.68611, 0, 0, 0.86388],
      "82": [0, 0.68611, 0, 0, 0.8625],
      "83": [0, 0.68611, 0, 0, 0.63889],
      "84": [0, 0.68611, 0, 0, 0.8],
      "85": [0, 0.68611, 0, 0, 0.88472],
      "86": [0, 0.68611, 0.01597, 0, 0.86944],
      "87": [0, 0.68611, 0.01597, 0, 1.18888],
      "88": [0, 0.68611, 0, 0, 0.86944],
      "89": [0, 0.68611, 0.02875, 0, 0.86944],
      "90": [0, 0.68611, 0, 0, 0.70277],
      "91": [0.25, 0.75, 0, 0, 0.31944],
      "92": [0.25, 0.75, 0, 0, 0.575],
      "93": [0.25, 0.75, 0, 0, 0.31944],
      "94": [0, 0.69444, 0, 0, 0.575],
      "95": [0.31, 0.13444, 0.03194, 0, 0.575],
      "97": [0, 0.44444, 0, 0, 0.55902],
      "98": [0, 0.69444, 0, 0, 0.63889],
      "99": [0, 0.44444, 0, 0, 0.51111],
      "100": [0, 0.69444, 0, 0, 0.63889],
      "101": [0, 0.44444, 0, 0, 0.52708],
      "102": [0, 0.69444, 0.10903, 0, 0.35139],
      "103": [0.19444, 0.44444, 0.01597, 0, 0.575],
      "104": [0, 0.69444, 0, 0, 0.63889],
      "105": [0, 0.69444, 0, 0, 0.31944],
      "106": [0.19444, 0.69444, 0, 0, 0.35139],
      "107": [0, 0.69444, 0, 0, 0.60694],
      "108": [0, 0.69444, 0, 0, 0.31944],
      "109": [0, 0.44444, 0, 0, 0.95833],
      "110": [0, 0.44444, 0, 0, 0.63889],
      "111": [0, 0.44444, 0, 0, 0.575],
      "112": [0.19444, 0.44444, 0, 0, 0.63889],
      "113": [0.19444, 0.44444, 0, 0, 0.60694],
      "114": [0, 0.44444, 0, 0, 0.47361],
      "115": [0, 0.44444, 0, 0, 0.45361],
      "116": [0, 0.63492, 0, 0, 0.44722],
      "117": [0, 0.44444, 0, 0, 0.63889],
      "118": [0, 0.44444, 0.01597, 0, 0.60694],
      "119": [0, 0.44444, 0.01597, 0, 0.83055],
      "120": [0, 0.44444, 0, 0, 0.60694],
      "121": [0.19444, 0.44444, 0.01597, 0, 0.60694],
      "122": [0, 0.44444, 0, 0, 0.51111],
      "123": [0.25, 0.75, 0, 0, 0.575],
      "124": [0.25, 0.75, 0, 0, 0.31944],
      "125": [0.25, 0.75, 0, 0, 0.575],
      "126": [0.35, 0.34444, 0, 0, 0.575],
      "160": [0, 0, 0, 0, 0.25],
      "163": [0, 0.69444, 0, 0, 0.86853],
      "168": [0, 0.69444, 0, 0, 0.575],
      "172": [0, 0.44444, 0, 0, 0.76666],
      "176": [0, 0.69444, 0, 0, 0.86944],
      "177": [0.13333, 0.63333, 0, 0, 0.89444],
      "184": [0.17014, 0, 0, 0, 0.51111],
      "198": [0, 0.68611, 0, 0, 1.04166],
      "215": [0.13333, 0.63333, 0, 0, 0.89444],
      "216": [0.04861, 0.73472, 0, 0, 0.89444],
      "223": [0, 0.69444, 0, 0, 0.59722],
      "230": [0, 0.44444, 0, 0, 0.83055],
      "247": [0.13333, 0.63333, 0, 0, 0.89444],
      "248": [0.09722, 0.54167, 0, 0, 0.575],
      "305": [0, 0.44444, 0, 0, 0.31944],
      "338": [0, 0.68611, 0, 0, 1.16944],
      "339": [0, 0.44444, 0, 0, 0.89444],
      "567": [0.19444, 0.44444, 0, 0, 0.35139],
      "710": [0, 0.69444, 0, 0, 0.575],
      "711": [0, 0.63194, 0, 0, 0.575],
      "713": [0, 0.59611, 0, 0, 0.575],
      "714": [0, 0.69444, 0, 0, 0.575],
      "715": [0, 0.69444, 0, 0, 0.575],
      "728": [0, 0.69444, 0, 0, 0.575],
      "729": [0, 0.69444, 0, 0, 0.31944],
      "730": [0, 0.69444, 0, 0, 0.86944],
      "732": [0, 0.69444, 0, 0, 0.575],
      "733": [0, 0.69444, 0, 0, 0.575],
      "915": [0, 0.68611, 0, 0, 0.69166],
      "916": [0, 0.68611, 0, 0, 0.95833],
      "920": [0, 0.68611, 0, 0, 0.89444],
      "923": [0, 0.68611, 0, 0, 0.80555],
      "926": [0, 0.68611, 0, 0, 0.76666],
      "928": [0, 0.68611, 0, 0, 0.9],
      "931": [0, 0.68611, 0, 0, 0.83055],
      "933": [0, 0.68611, 0, 0, 0.89444],
      "934": [0, 0.68611, 0, 0, 0.83055],
      "936": [0, 0.68611, 0, 0, 0.89444],
      "937": [0, 0.68611, 0, 0, 0.83055],
      "8211": [0, 0.44444, 0.03194, 0, 0.575],
      "8212": [0, 0.44444, 0.03194, 0, 1.14999],
      "8216": [0, 0.69444, 0, 0, 0.31944],
      "8217": [0, 0.69444, 0, 0, 0.31944],
      "8220": [0, 0.69444, 0, 0, 0.60278],
      "8221": [0, 0.69444, 0, 0, 0.60278],
      "8224": [0.19444, 0.69444, 0, 0, 0.51111],
      "8225": [0.19444, 0.69444, 0, 0, 0.51111],
      "8242": [0, 0.55556, 0, 0, 0.34444],
      "8407": [0, 0.72444, 0.15486, 0, 0.575],
      "8463": [0, 0.69444, 0, 0, 0.66759],
      "8465": [0, 0.69444, 0, 0, 0.83055],
      "8467": [0, 0.69444, 0, 0, 0.47361],
      "8472": [0.19444, 0.44444, 0, 0, 0.74027],
      "8476": [0, 0.69444, 0, 0, 0.83055],
      "8501": [0, 0.69444, 0, 0, 0.70277],
      "8592": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8593": [0.19444, 0.69444, 0, 0, 0.575],
      "8594": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8595": [0.19444, 0.69444, 0, 0, 0.575],
      "8596": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8597": [0.25, 0.75, 0, 0, 0.575],
      "8598": [0.19444, 0.69444, 0, 0, 1.14999],
      "8599": [0.19444, 0.69444, 0, 0, 1.14999],
      "8600": [0.19444, 0.69444, 0, 0, 1.14999],
      "8601": [0.19444, 0.69444, 0, 0, 1.14999],
      "8636": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8637": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8640": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8641": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8656": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8657": [0.19444, 0.69444, 0, 0, 0.70277],
      "8658": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8659": [0.19444, 0.69444, 0, 0, 0.70277],
      "8660": [-0.10889, 0.39111, 0, 0, 1.14999],
      "8661": [0.25, 0.75, 0, 0, 0.70277],
      "8704": [0, 0.69444, 0, 0, 0.63889],
      "8706": [0, 0.69444, 0.06389, 0, 0.62847],
      "8707": [0, 0.69444, 0, 0, 0.63889],
      "8709": [0.05556, 0.75, 0, 0, 0.575],
      "8711": [0, 0.68611, 0, 0, 0.95833],
      "8712": [0.08556, 0.58556, 0, 0, 0.76666],
      "8715": [0.08556, 0.58556, 0, 0, 0.76666],
      "8722": [0.13333, 0.63333, 0, 0, 0.89444],
      "8723": [0.13333, 0.63333, 0, 0, 0.89444],
      "8725": [0.25, 0.75, 0, 0, 0.575],
      "8726": [0.25, 0.75, 0, 0, 0.575],
      "8727": [-0.02778, 0.47222, 0, 0, 0.575],
      "8728": [-0.02639, 0.47361, 0, 0, 0.575],
      "8729": [-0.02639, 0.47361, 0, 0, 0.575],
      "8730": [0.18, 0.82, 0, 0, 0.95833],
      "8733": [0, 0.44444, 0, 0, 0.89444],
      "8734": [0, 0.44444, 0, 0, 1.14999],
      "8736": [0, 0.69224, 0, 0, 0.72222],
      "8739": [0.25, 0.75, 0, 0, 0.31944],
      "8741": [0.25, 0.75, 0, 0, 0.575],
      "8743": [0, 0.55556, 0, 0, 0.76666],
      "8744": [0, 0.55556, 0, 0, 0.76666],
      "8745": [0, 0.55556, 0, 0, 0.76666],
      "8746": [0, 0.55556, 0, 0, 0.76666],
      "8747": [0.19444, 0.69444, 0.12778, 0, 0.56875],
      "8764": [-0.10889, 0.39111, 0, 0, 0.89444],
      "8768": [0.19444, 0.69444, 0, 0, 0.31944],
      "8771": [222e-5, 0.50222, 0, 0, 0.89444],
      "8773": [0.027, 0.638, 0, 0, 0.894],
      "8776": [0.02444, 0.52444, 0, 0, 0.89444],
      "8781": [222e-5, 0.50222, 0, 0, 0.89444],
      "8801": [222e-5, 0.50222, 0, 0, 0.89444],
      "8804": [0.19667, 0.69667, 0, 0, 0.89444],
      "8805": [0.19667, 0.69667, 0, 0, 0.89444],
      "8810": [0.08556, 0.58556, 0, 0, 1.14999],
      "8811": [0.08556, 0.58556, 0, 0, 1.14999],
      "8826": [0.08556, 0.58556, 0, 0, 0.89444],
      "8827": [0.08556, 0.58556, 0, 0, 0.89444],
      "8834": [0.08556, 0.58556, 0, 0, 0.89444],
      "8835": [0.08556, 0.58556, 0, 0, 0.89444],
      "8838": [0.19667, 0.69667, 0, 0, 0.89444],
      "8839": [0.19667, 0.69667, 0, 0, 0.89444],
      "8846": [0, 0.55556, 0, 0, 0.76666],
      "8849": [0.19667, 0.69667, 0, 0, 0.89444],
      "8850": [0.19667, 0.69667, 0, 0, 0.89444],
      "8851": [0, 0.55556, 0, 0, 0.76666],
      "8852": [0, 0.55556, 0, 0, 0.76666],
      "8853": [0.13333, 0.63333, 0, 0, 0.89444],
      "8854": [0.13333, 0.63333, 0, 0, 0.89444],
      "8855": [0.13333, 0.63333, 0, 0, 0.89444],
      "8856": [0.13333, 0.63333, 0, 0, 0.89444],
      "8857": [0.13333, 0.63333, 0, 0, 0.89444],
      "8866": [0, 0.69444, 0, 0, 0.70277],
      "8867": [0, 0.69444, 0, 0, 0.70277],
      "8868": [0, 0.69444, 0, 0, 0.89444],
      "8869": [0, 0.69444, 0, 0, 0.89444],
      "8900": [-0.02639, 0.47361, 0, 0, 0.575],
      "8901": [-0.02639, 0.47361, 0, 0, 0.31944],
      "8902": [-0.02778, 0.47222, 0, 0, 0.575],
      "8968": [0.25, 0.75, 0, 0, 0.51111],
      "8969": [0.25, 0.75, 0, 0, 0.51111],
      "8970": [0.25, 0.75, 0, 0, 0.51111],
      "8971": [0.25, 0.75, 0, 0, 0.51111],
      "8994": [-0.13889, 0.36111, 0, 0, 1.14999],
      "8995": [-0.13889, 0.36111, 0, 0, 1.14999],
      "9651": [0.19444, 0.69444, 0, 0, 1.02222],
      "9657": [-0.02778, 0.47222, 0, 0, 0.575],
      "9661": [0.19444, 0.69444, 0, 0, 1.02222],
      "9667": [-0.02778, 0.47222, 0, 0, 0.575],
      "9711": [0.19444, 0.69444, 0, 0, 1.14999],
      "9824": [0.12963, 0.69444, 0, 0, 0.89444],
      "9825": [0.12963, 0.69444, 0, 0, 0.89444],
      "9826": [0.12963, 0.69444, 0, 0, 0.89444],
      "9827": [0.12963, 0.69444, 0, 0, 0.89444],
      "9837": [0, 0.75, 0, 0, 0.44722],
      "9838": [0.19444, 0.69444, 0, 0, 0.44722],
      "9839": [0.19444, 0.69444, 0, 0, 0.44722],
      "10216": [0.25, 0.75, 0, 0, 0.44722],
      "10217": [0.25, 0.75, 0, 0, 0.44722],
      "10815": [0, 0.68611, 0, 0, 0.9],
      "10927": [0.19667, 0.69667, 0, 0, 0.89444],
      "10928": [0.19667, 0.69667, 0, 0, 0.89444],
      "57376": [0.19444, 0.69444, 0, 0, 0]
    },
    "Main-BoldItalic": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0.11417, 0, 0.38611],
      "34": [0, 0.69444, 0.07939, 0, 0.62055],
      "35": [0.19444, 0.69444, 0.06833, 0, 0.94444],
      "37": [0.05556, 0.75, 0.12861, 0, 0.94444],
      "38": [0, 0.69444, 0.08528, 0, 0.88555],
      "39": [0, 0.69444, 0.12945, 0, 0.35555],
      "40": [0.25, 0.75, 0.15806, 0, 0.47333],
      "41": [0.25, 0.75, 0.03306, 0, 0.47333],
      "42": [0, 0.75, 0.14333, 0, 0.59111],
      "43": [0.10333, 0.60333, 0.03306, 0, 0.88555],
      "44": [0.19444, 0.14722, 0, 0, 0.35555],
      "45": [0, 0.44444, 0.02611, 0, 0.41444],
      "46": [0, 0.14722, 0, 0, 0.35555],
      "47": [0.25, 0.75, 0.15806, 0, 0.59111],
      "48": [0, 0.64444, 0.13167, 0, 0.59111],
      "49": [0, 0.64444, 0.13167, 0, 0.59111],
      "50": [0, 0.64444, 0.13167, 0, 0.59111],
      "51": [0, 0.64444, 0.13167, 0, 0.59111],
      "52": [0.19444, 0.64444, 0.13167, 0, 0.59111],
      "53": [0, 0.64444, 0.13167, 0, 0.59111],
      "54": [0, 0.64444, 0.13167, 0, 0.59111],
      "55": [0.19444, 0.64444, 0.13167, 0, 0.59111],
      "56": [0, 0.64444, 0.13167, 0, 0.59111],
      "57": [0, 0.64444, 0.13167, 0, 0.59111],
      "58": [0, 0.44444, 0.06695, 0, 0.35555],
      "59": [0.19444, 0.44444, 0.06695, 0, 0.35555],
      "61": [-0.10889, 0.39111, 0.06833, 0, 0.88555],
      "63": [0, 0.69444, 0.11472, 0, 0.59111],
      "64": [0, 0.69444, 0.09208, 0, 0.88555],
      "65": [0, 0.68611, 0, 0, 0.86555],
      "66": [0, 0.68611, 0.0992, 0, 0.81666],
      "67": [0, 0.68611, 0.14208, 0, 0.82666],
      "68": [0, 0.68611, 0.09062, 0, 0.87555],
      "69": [0, 0.68611, 0.11431, 0, 0.75666],
      "70": [0, 0.68611, 0.12903, 0, 0.72722],
      "71": [0, 0.68611, 0.07347, 0, 0.89527],
      "72": [0, 0.68611, 0.17208, 0, 0.8961],
      "73": [0, 0.68611, 0.15681, 0, 0.47166],
      "74": [0, 0.68611, 0.145, 0, 0.61055],
      "75": [0, 0.68611, 0.14208, 0, 0.89499],
      "76": [0, 0.68611, 0, 0, 0.69777],
      "77": [0, 0.68611, 0.17208, 0, 1.07277],
      "78": [0, 0.68611, 0.17208, 0, 0.8961],
      "79": [0, 0.68611, 0.09062, 0, 0.85499],
      "80": [0, 0.68611, 0.0992, 0, 0.78721],
      "81": [0.19444, 0.68611, 0.09062, 0, 0.85499],
      "82": [0, 0.68611, 0.02559, 0, 0.85944],
      "83": [0, 0.68611, 0.11264, 0, 0.64999],
      "84": [0, 0.68611, 0.12903, 0, 0.7961],
      "85": [0, 0.68611, 0.17208, 0, 0.88083],
      "86": [0, 0.68611, 0.18625, 0, 0.86555],
      "87": [0, 0.68611, 0.18625, 0, 1.15999],
      "88": [0, 0.68611, 0.15681, 0, 0.86555],
      "89": [0, 0.68611, 0.19803, 0, 0.86555],
      "90": [0, 0.68611, 0.14208, 0, 0.70888],
      "91": [0.25, 0.75, 0.1875, 0, 0.35611],
      "93": [0.25, 0.75, 0.09972, 0, 0.35611],
      "94": [0, 0.69444, 0.06709, 0, 0.59111],
      "95": [0.31, 0.13444, 0.09811, 0, 0.59111],
      "97": [0, 0.44444, 0.09426, 0, 0.59111],
      "98": [0, 0.69444, 0.07861, 0, 0.53222],
      "99": [0, 0.44444, 0.05222, 0, 0.53222],
      "100": [0, 0.69444, 0.10861, 0, 0.59111],
      "101": [0, 0.44444, 0.085, 0, 0.53222],
      "102": [0.19444, 0.69444, 0.21778, 0, 0.4],
      "103": [0.19444, 0.44444, 0.105, 0, 0.53222],
      "104": [0, 0.69444, 0.09426, 0, 0.59111],
      "105": [0, 0.69326, 0.11387, 0, 0.35555],
      "106": [0.19444, 0.69326, 0.1672, 0, 0.35555],
      "107": [0, 0.69444, 0.11111, 0, 0.53222],
      "108": [0, 0.69444, 0.10861, 0, 0.29666],
      "109": [0, 0.44444, 0.09426, 0, 0.94444],
      "110": [0, 0.44444, 0.09426, 0, 0.64999],
      "111": [0, 0.44444, 0.07861, 0, 0.59111],
      "112": [0.19444, 0.44444, 0.07861, 0, 0.59111],
      "113": [0.19444, 0.44444, 0.105, 0, 0.53222],
      "114": [0, 0.44444, 0.11111, 0, 0.50167],
      "115": [0, 0.44444, 0.08167, 0, 0.48694],
      "116": [0, 0.63492, 0.09639, 0, 0.385],
      "117": [0, 0.44444, 0.09426, 0, 0.62055],
      "118": [0, 0.44444, 0.11111, 0, 0.53222],
      "119": [0, 0.44444, 0.11111, 0, 0.76777],
      "120": [0, 0.44444, 0.12583, 0, 0.56055],
      "121": [0.19444, 0.44444, 0.105, 0, 0.56166],
      "122": [0, 0.44444, 0.13889, 0, 0.49055],
      "126": [0.35, 0.34444, 0.11472, 0, 0.59111],
      "160": [0, 0, 0, 0, 0.25],
      "168": [0, 0.69444, 0.11473, 0, 0.59111],
      "176": [0, 0.69444, 0, 0, 0.94888],
      "184": [0.17014, 0, 0, 0, 0.53222],
      "198": [0, 0.68611, 0.11431, 0, 1.02277],
      "216": [0.04861, 0.73472, 0.09062, 0, 0.88555],
      "223": [0.19444, 0.69444, 0.09736, 0, 0.665],
      "230": [0, 0.44444, 0.085, 0, 0.82666],
      "248": [0.09722, 0.54167, 0.09458, 0, 0.59111],
      "305": [0, 0.44444, 0.09426, 0, 0.35555],
      "338": [0, 0.68611, 0.11431, 0, 1.14054],
      "339": [0, 0.44444, 0.085, 0, 0.82666],
      "567": [0.19444, 0.44444, 0.04611, 0, 0.385],
      "710": [0, 0.69444, 0.06709, 0, 0.59111],
      "711": [0, 0.63194, 0.08271, 0, 0.59111],
      "713": [0, 0.59444, 0.10444, 0, 0.59111],
      "714": [0, 0.69444, 0.08528, 0, 0.59111],
      "715": [0, 0.69444, 0, 0, 0.59111],
      "728": [0, 0.69444, 0.10333, 0, 0.59111],
      "729": [0, 0.69444, 0.12945, 0, 0.35555],
      "730": [0, 0.69444, 0, 0, 0.94888],
      "732": [0, 0.69444, 0.11472, 0, 0.59111],
      "733": [0, 0.69444, 0.11472, 0, 0.59111],
      "915": [0, 0.68611, 0.12903, 0, 0.69777],
      "916": [0, 0.68611, 0, 0, 0.94444],
      "920": [0, 0.68611, 0.09062, 0, 0.88555],
      "923": [0, 0.68611, 0, 0, 0.80666],
      "926": [0, 0.68611, 0.15092, 0, 0.76777],
      "928": [0, 0.68611, 0.17208, 0, 0.8961],
      "931": [0, 0.68611, 0.11431, 0, 0.82666],
      "933": [0, 0.68611, 0.10778, 0, 0.88555],
      "934": [0, 0.68611, 0.05632, 0, 0.82666],
      "936": [0, 0.68611, 0.10778, 0, 0.88555],
      "937": [0, 0.68611, 0.0992, 0, 0.82666],
      "8211": [0, 0.44444, 0.09811, 0, 0.59111],
      "8212": [0, 0.44444, 0.09811, 0, 1.18221],
      "8216": [0, 0.69444, 0.12945, 0, 0.35555],
      "8217": [0, 0.69444, 0.12945, 0, 0.35555],
      "8220": [0, 0.69444, 0.16772, 0, 0.62055],
      "8221": [0, 0.69444, 0.07939, 0, 0.62055]
    },
    "Main-Italic": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0.12417, 0, 0.30667],
      "34": [0, 0.69444, 0.06961, 0, 0.51444],
      "35": [0.19444, 0.69444, 0.06616, 0, 0.81777],
      "37": [0.05556, 0.75, 0.13639, 0, 0.81777],
      "38": [0, 0.69444, 0.09694, 0, 0.76666],
      "39": [0, 0.69444, 0.12417, 0, 0.30667],
      "40": [0.25, 0.75, 0.16194, 0, 0.40889],
      "41": [0.25, 0.75, 0.03694, 0, 0.40889],
      "42": [0, 0.75, 0.14917, 0, 0.51111],
      "43": [0.05667, 0.56167, 0.03694, 0, 0.76666],
      "44": [0.19444, 0.10556, 0, 0, 0.30667],
      "45": [0, 0.43056, 0.02826, 0, 0.35778],
      "46": [0, 0.10556, 0, 0, 0.30667],
      "47": [0.25, 0.75, 0.16194, 0, 0.51111],
      "48": [0, 0.64444, 0.13556, 0, 0.51111],
      "49": [0, 0.64444, 0.13556, 0, 0.51111],
      "50": [0, 0.64444, 0.13556, 0, 0.51111],
      "51": [0, 0.64444, 0.13556, 0, 0.51111],
      "52": [0.19444, 0.64444, 0.13556, 0, 0.51111],
      "53": [0, 0.64444, 0.13556, 0, 0.51111],
      "54": [0, 0.64444, 0.13556, 0, 0.51111],
      "55": [0.19444, 0.64444, 0.13556, 0, 0.51111],
      "56": [0, 0.64444, 0.13556, 0, 0.51111],
      "57": [0, 0.64444, 0.13556, 0, 0.51111],
      "58": [0, 0.43056, 0.0582, 0, 0.30667],
      "59": [0.19444, 0.43056, 0.0582, 0, 0.30667],
      "61": [-0.13313, 0.36687, 0.06616, 0, 0.76666],
      "63": [0, 0.69444, 0.1225, 0, 0.51111],
      "64": [0, 0.69444, 0.09597, 0, 0.76666],
      "65": [0, 0.68333, 0, 0, 0.74333],
      "66": [0, 0.68333, 0.10257, 0, 0.70389],
      "67": [0, 0.68333, 0.14528, 0, 0.71555],
      "68": [0, 0.68333, 0.09403, 0, 0.755],
      "69": [0, 0.68333, 0.12028, 0, 0.67833],
      "70": [0, 0.68333, 0.13305, 0, 0.65277],
      "71": [0, 0.68333, 0.08722, 0, 0.77361],
      "72": [0, 0.68333, 0.16389, 0, 0.74333],
      "73": [0, 0.68333, 0.15806, 0, 0.38555],
      "74": [0, 0.68333, 0.14028, 0, 0.525],
      "75": [0, 0.68333, 0.14528, 0, 0.76888],
      "76": [0, 0.68333, 0, 0, 0.62722],
      "77": [0, 0.68333, 0.16389, 0, 0.89666],
      "78": [0, 0.68333, 0.16389, 0, 0.74333],
      "79": [0, 0.68333, 0.09403, 0, 0.76666],
      "80": [0, 0.68333, 0.10257, 0, 0.67833],
      "81": [0.19444, 0.68333, 0.09403, 0, 0.76666],
      "82": [0, 0.68333, 0.03868, 0, 0.72944],
      "83": [0, 0.68333, 0.11972, 0, 0.56222],
      "84": [0, 0.68333, 0.13305, 0, 0.71555],
      "85": [0, 0.68333, 0.16389, 0, 0.74333],
      "86": [0, 0.68333, 0.18361, 0, 0.74333],
      "87": [0, 0.68333, 0.18361, 0, 0.99888],
      "88": [0, 0.68333, 0.15806, 0, 0.74333],
      "89": [0, 0.68333, 0.19383, 0, 0.74333],
      "90": [0, 0.68333, 0.14528, 0, 0.61333],
      "91": [0.25, 0.75, 0.1875, 0, 0.30667],
      "93": [0.25, 0.75, 0.10528, 0, 0.30667],
      "94": [0, 0.69444, 0.06646, 0, 0.51111],
      "95": [0.31, 0.12056, 0.09208, 0, 0.51111],
      "97": [0, 0.43056, 0.07671, 0, 0.51111],
      "98": [0, 0.69444, 0.06312, 0, 0.46],
      "99": [0, 0.43056, 0.05653, 0, 0.46],
      "100": [0, 0.69444, 0.10333, 0, 0.51111],
      "101": [0, 0.43056, 0.07514, 0, 0.46],
      "102": [0.19444, 0.69444, 0.21194, 0, 0.30667],
      "103": [0.19444, 0.43056, 0.08847, 0, 0.46],
      "104": [0, 0.69444, 0.07671, 0, 0.51111],
      "105": [0, 0.65536, 0.1019, 0, 0.30667],
      "106": [0.19444, 0.65536, 0.14467, 0, 0.30667],
      "107": [0, 0.69444, 0.10764, 0, 0.46],
      "108": [0, 0.69444, 0.10333, 0, 0.25555],
      "109": [0, 0.43056, 0.07671, 0, 0.81777],
      "110": [0, 0.43056, 0.07671, 0, 0.56222],
      "111": [0, 0.43056, 0.06312, 0, 0.51111],
      "112": [0.19444, 0.43056, 0.06312, 0, 0.51111],
      "113": [0.19444, 0.43056, 0.08847, 0, 0.46],
      "114": [0, 0.43056, 0.10764, 0, 0.42166],
      "115": [0, 0.43056, 0.08208, 0, 0.40889],
      "116": [0, 0.61508, 0.09486, 0, 0.33222],
      "117": [0, 0.43056, 0.07671, 0, 0.53666],
      "118": [0, 0.43056, 0.10764, 0, 0.46],
      "119": [0, 0.43056, 0.10764, 0, 0.66444],
      "120": [0, 0.43056, 0.12042, 0, 0.46389],
      "121": [0.19444, 0.43056, 0.08847, 0, 0.48555],
      "122": [0, 0.43056, 0.12292, 0, 0.40889],
      "126": [0.35, 0.31786, 0.11585, 0, 0.51111],
      "160": [0, 0, 0, 0, 0.25],
      "168": [0, 0.66786, 0.10474, 0, 0.51111],
      "176": [0, 0.69444, 0, 0, 0.83129],
      "184": [0.17014, 0, 0, 0, 0.46],
      "198": [0, 0.68333, 0.12028, 0, 0.88277],
      "216": [0.04861, 0.73194, 0.09403, 0, 0.76666],
      "223": [0.19444, 0.69444, 0.10514, 0, 0.53666],
      "230": [0, 0.43056, 0.07514, 0, 0.71555],
      "248": [0.09722, 0.52778, 0.09194, 0, 0.51111],
      "338": [0, 0.68333, 0.12028, 0, 0.98499],
      "339": [0, 0.43056, 0.07514, 0, 0.71555],
      "710": [0, 0.69444, 0.06646, 0, 0.51111],
      "711": [0, 0.62847, 0.08295, 0, 0.51111],
      "713": [0, 0.56167, 0.10333, 0, 0.51111],
      "714": [0, 0.69444, 0.09694, 0, 0.51111],
      "715": [0, 0.69444, 0, 0, 0.51111],
      "728": [0, 0.69444, 0.10806, 0, 0.51111],
      "729": [0, 0.66786, 0.11752, 0, 0.30667],
      "730": [0, 0.69444, 0, 0, 0.83129],
      "732": [0, 0.66786, 0.11585, 0, 0.51111],
      "733": [0, 0.69444, 0.1225, 0, 0.51111],
      "915": [0, 0.68333, 0.13305, 0, 0.62722],
      "916": [0, 0.68333, 0, 0, 0.81777],
      "920": [0, 0.68333, 0.09403, 0, 0.76666],
      "923": [0, 0.68333, 0, 0, 0.69222],
      "926": [0, 0.68333, 0.15294, 0, 0.66444],
      "928": [0, 0.68333, 0.16389, 0, 0.74333],
      "931": [0, 0.68333, 0.12028, 0, 0.71555],
      "933": [0, 0.68333, 0.11111, 0, 0.76666],
      "934": [0, 0.68333, 0.05986, 0, 0.71555],
      "936": [0, 0.68333, 0.11111, 0, 0.76666],
      "937": [0, 0.68333, 0.10257, 0, 0.71555],
      "8211": [0, 0.43056, 0.09208, 0, 0.51111],
      "8212": [0, 0.43056, 0.09208, 0, 1.02222],
      "8216": [0, 0.69444, 0.12417, 0, 0.30667],
      "8217": [0, 0.69444, 0.12417, 0, 0.30667],
      "8220": [0, 0.69444, 0.1685, 0, 0.51444],
      "8221": [0, 0.69444, 0.06961, 0, 0.51444],
      "8463": [0, 0.68889, 0, 0, 0.54028]
    },
    "Main-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0, 0, 0.27778],
      "34": [0, 0.69444, 0, 0, 0.5],
      "35": [0.19444, 0.69444, 0, 0, 0.83334],
      "36": [0.05556, 0.75, 0, 0, 0.5],
      "37": [0.05556, 0.75, 0, 0, 0.83334],
      "38": [0, 0.69444, 0, 0, 0.77778],
      "39": [0, 0.69444, 0, 0, 0.27778],
      "40": [0.25, 0.75, 0, 0, 0.38889],
      "41": [0.25, 0.75, 0, 0, 0.38889],
      "42": [0, 0.75, 0, 0, 0.5],
      "43": [0.08333, 0.58333, 0, 0, 0.77778],
      "44": [0.19444, 0.10556, 0, 0, 0.27778],
      "45": [0, 0.43056, 0, 0, 0.33333],
      "46": [0, 0.10556, 0, 0, 0.27778],
      "47": [0.25, 0.75, 0, 0, 0.5],
      "48": [0, 0.64444, 0, 0, 0.5],
      "49": [0, 0.64444, 0, 0, 0.5],
      "50": [0, 0.64444, 0, 0, 0.5],
      "51": [0, 0.64444, 0, 0, 0.5],
      "52": [0, 0.64444, 0, 0, 0.5],
      "53": [0, 0.64444, 0, 0, 0.5],
      "54": [0, 0.64444, 0, 0, 0.5],
      "55": [0, 0.64444, 0, 0, 0.5],
      "56": [0, 0.64444, 0, 0, 0.5],
      "57": [0, 0.64444, 0, 0, 0.5],
      "58": [0, 0.43056, 0, 0, 0.27778],
      "59": [0.19444, 0.43056, 0, 0, 0.27778],
      "60": [0.0391, 0.5391, 0, 0, 0.77778],
      "61": [-0.13313, 0.36687, 0, 0, 0.77778],
      "62": [0.0391, 0.5391, 0, 0, 0.77778],
      "63": [0, 0.69444, 0, 0, 0.47222],
      "64": [0, 0.69444, 0, 0, 0.77778],
      "65": [0, 0.68333, 0, 0, 0.75],
      "66": [0, 0.68333, 0, 0, 0.70834],
      "67": [0, 0.68333, 0, 0, 0.72222],
      "68": [0, 0.68333, 0, 0, 0.76389],
      "69": [0, 0.68333, 0, 0, 0.68056],
      "70": [0, 0.68333, 0, 0, 0.65278],
      "71": [0, 0.68333, 0, 0, 0.78472],
      "72": [0, 0.68333, 0, 0, 0.75],
      "73": [0, 0.68333, 0, 0, 0.36111],
      "74": [0, 0.68333, 0, 0, 0.51389],
      "75": [0, 0.68333, 0, 0, 0.77778],
      "76": [0, 0.68333, 0, 0, 0.625],
      "77": [0, 0.68333, 0, 0, 0.91667],
      "78": [0, 0.68333, 0, 0, 0.75],
      "79": [0, 0.68333, 0, 0, 0.77778],
      "80": [0, 0.68333, 0, 0, 0.68056],
      "81": [0.19444, 0.68333, 0, 0, 0.77778],
      "82": [0, 0.68333, 0, 0, 0.73611],
      "83": [0, 0.68333, 0, 0, 0.55556],
      "84": [0, 0.68333, 0, 0, 0.72222],
      "85": [0, 0.68333, 0, 0, 0.75],
      "86": [0, 0.68333, 0.01389, 0, 0.75],
      "87": [0, 0.68333, 0.01389, 0, 1.02778],
      "88": [0, 0.68333, 0, 0, 0.75],
      "89": [0, 0.68333, 0.025, 0, 0.75],
      "90": [0, 0.68333, 0, 0, 0.61111],
      "91": [0.25, 0.75, 0, 0, 0.27778],
      "92": [0.25, 0.75, 0, 0, 0.5],
      "93": [0.25, 0.75, 0, 0, 0.27778],
      "94": [0, 0.69444, 0, 0, 0.5],
      "95": [0.31, 0.12056, 0.02778, 0, 0.5],
      "97": [0, 0.43056, 0, 0, 0.5],
      "98": [0, 0.69444, 0, 0, 0.55556],
      "99": [0, 0.43056, 0, 0, 0.44445],
      "100": [0, 0.69444, 0, 0, 0.55556],
      "101": [0, 0.43056, 0, 0, 0.44445],
      "102": [0, 0.69444, 0.07778, 0, 0.30556],
      "103": [0.19444, 0.43056, 0.01389, 0, 0.5],
      "104": [0, 0.69444, 0, 0, 0.55556],
      "105": [0, 0.66786, 0, 0, 0.27778],
      "106": [0.19444, 0.66786, 0, 0, 0.30556],
      "107": [0, 0.69444, 0, 0, 0.52778],
      "108": [0, 0.69444, 0, 0, 0.27778],
      "109": [0, 0.43056, 0, 0, 0.83334],
      "110": [0, 0.43056, 0, 0, 0.55556],
      "111": [0, 0.43056, 0, 0, 0.5],
      "112": [0.19444, 0.43056, 0, 0, 0.55556],
      "113": [0.19444, 0.43056, 0, 0, 0.52778],
      "114": [0, 0.43056, 0, 0, 0.39167],
      "115": [0, 0.43056, 0, 0, 0.39445],
      "116": [0, 0.61508, 0, 0, 0.38889],
      "117": [0, 0.43056, 0, 0, 0.55556],
      "118": [0, 0.43056, 0.01389, 0, 0.52778],
      "119": [0, 0.43056, 0.01389, 0, 0.72222],
      "120": [0, 0.43056, 0, 0, 0.52778],
      "121": [0.19444, 0.43056, 0.01389, 0, 0.52778],
      "122": [0, 0.43056, 0, 0, 0.44445],
      "123": [0.25, 0.75, 0, 0, 0.5],
      "124": [0.25, 0.75, 0, 0, 0.27778],
      "125": [0.25, 0.75, 0, 0, 0.5],
      "126": [0.35, 0.31786, 0, 0, 0.5],
      "160": [0, 0, 0, 0, 0.25],
      "163": [0, 0.69444, 0, 0, 0.76909],
      "167": [0.19444, 0.69444, 0, 0, 0.44445],
      "168": [0, 0.66786, 0, 0, 0.5],
      "172": [0, 0.43056, 0, 0, 0.66667],
      "176": [0, 0.69444, 0, 0, 0.75],
      "177": [0.08333, 0.58333, 0, 0, 0.77778],
      "182": [0.19444, 0.69444, 0, 0, 0.61111],
      "184": [0.17014, 0, 0, 0, 0.44445],
      "198": [0, 0.68333, 0, 0, 0.90278],
      "215": [0.08333, 0.58333, 0, 0, 0.77778],
      "216": [0.04861, 0.73194, 0, 0, 0.77778],
      "223": [0, 0.69444, 0, 0, 0.5],
      "230": [0, 0.43056, 0, 0, 0.72222],
      "247": [0.08333, 0.58333, 0, 0, 0.77778],
      "248": [0.09722, 0.52778, 0, 0, 0.5],
      "305": [0, 0.43056, 0, 0, 0.27778],
      "338": [0, 0.68333, 0, 0, 1.01389],
      "339": [0, 0.43056, 0, 0, 0.77778],
      "567": [0.19444, 0.43056, 0, 0, 0.30556],
      "710": [0, 0.69444, 0, 0, 0.5],
      "711": [0, 0.62847, 0, 0, 0.5],
      "713": [0, 0.56778, 0, 0, 0.5],
      "714": [0, 0.69444, 0, 0, 0.5],
      "715": [0, 0.69444, 0, 0, 0.5],
      "728": [0, 0.69444, 0, 0, 0.5],
      "729": [0, 0.66786, 0, 0, 0.27778],
      "730": [0, 0.69444, 0, 0, 0.75],
      "732": [0, 0.66786, 0, 0, 0.5],
      "733": [0, 0.69444, 0, 0, 0.5],
      "915": [0, 0.68333, 0, 0, 0.625],
      "916": [0, 0.68333, 0, 0, 0.83334],
      "920": [0, 0.68333, 0, 0, 0.77778],
      "923": [0, 0.68333, 0, 0, 0.69445],
      "926": [0, 0.68333, 0, 0, 0.66667],
      "928": [0, 0.68333, 0, 0, 0.75],
      "931": [0, 0.68333, 0, 0, 0.72222],
      "933": [0, 0.68333, 0, 0, 0.77778],
      "934": [0, 0.68333, 0, 0, 0.72222],
      "936": [0, 0.68333, 0, 0, 0.77778],
      "937": [0, 0.68333, 0, 0, 0.72222],
      "8211": [0, 0.43056, 0.02778, 0, 0.5],
      "8212": [0, 0.43056, 0.02778, 0, 1],
      "8216": [0, 0.69444, 0, 0, 0.27778],
      "8217": [0, 0.69444, 0, 0, 0.27778],
      "8220": [0, 0.69444, 0, 0, 0.5],
      "8221": [0, 0.69444, 0, 0, 0.5],
      "8224": [0.19444, 0.69444, 0, 0, 0.44445],
      "8225": [0.19444, 0.69444, 0, 0, 0.44445],
      "8230": [0, 0.123, 0, 0, 1.172],
      "8242": [0, 0.55556, 0, 0, 0.275],
      "8407": [0, 0.71444, 0.15382, 0, 0.5],
      "8463": [0, 0.68889, 0, 0, 0.54028],
      "8465": [0, 0.69444, 0, 0, 0.72222],
      "8467": [0, 0.69444, 0, 0.11111, 0.41667],
      "8472": [0.19444, 0.43056, 0, 0.11111, 0.63646],
      "8476": [0, 0.69444, 0, 0, 0.72222],
      "8501": [0, 0.69444, 0, 0, 0.61111],
      "8592": [-0.13313, 0.36687, 0, 0, 1],
      "8593": [0.19444, 0.69444, 0, 0, 0.5],
      "8594": [-0.13313, 0.36687, 0, 0, 1],
      "8595": [0.19444, 0.69444, 0, 0, 0.5],
      "8596": [-0.13313, 0.36687, 0, 0, 1],
      "8597": [0.25, 0.75, 0, 0, 0.5],
      "8598": [0.19444, 0.69444, 0, 0, 1],
      "8599": [0.19444, 0.69444, 0, 0, 1],
      "8600": [0.19444, 0.69444, 0, 0, 1],
      "8601": [0.19444, 0.69444, 0, 0, 1],
      "8614": [0.011, 0.511, 0, 0, 1],
      "8617": [0.011, 0.511, 0, 0, 1.126],
      "8618": [0.011, 0.511, 0, 0, 1.126],
      "8636": [-0.13313, 0.36687, 0, 0, 1],
      "8637": [-0.13313, 0.36687, 0, 0, 1],
      "8640": [-0.13313, 0.36687, 0, 0, 1],
      "8641": [-0.13313, 0.36687, 0, 0, 1],
      "8652": [0.011, 0.671, 0, 0, 1],
      "8656": [-0.13313, 0.36687, 0, 0, 1],
      "8657": [0.19444, 0.69444, 0, 0, 0.61111],
      "8658": [-0.13313, 0.36687, 0, 0, 1],
      "8659": [0.19444, 0.69444, 0, 0, 0.61111],
      "8660": [-0.13313, 0.36687, 0, 0, 1],
      "8661": [0.25, 0.75, 0, 0, 0.61111],
      "8704": [0, 0.69444, 0, 0, 0.55556],
      "8706": [0, 0.69444, 0.05556, 0.08334, 0.5309],
      "8707": [0, 0.69444, 0, 0, 0.55556],
      "8709": [0.05556, 0.75, 0, 0, 0.5],
      "8711": [0, 0.68333, 0, 0, 0.83334],
      "8712": [0.0391, 0.5391, 0, 0, 0.66667],
      "8715": [0.0391, 0.5391, 0, 0, 0.66667],
      "8722": [0.08333, 0.58333, 0, 0, 0.77778],
      "8723": [0.08333, 0.58333, 0, 0, 0.77778],
      "8725": [0.25, 0.75, 0, 0, 0.5],
      "8726": [0.25, 0.75, 0, 0, 0.5],
      "8727": [-0.03472, 0.46528, 0, 0, 0.5],
      "8728": [-0.05555, 0.44445, 0, 0, 0.5],
      "8729": [-0.05555, 0.44445, 0, 0, 0.5],
      "8730": [0.2, 0.8, 0, 0, 0.83334],
      "8733": [0, 0.43056, 0, 0, 0.77778],
      "8734": [0, 0.43056, 0, 0, 1],
      "8736": [0, 0.69224, 0, 0, 0.72222],
      "8739": [0.25, 0.75, 0, 0, 0.27778],
      "8741": [0.25, 0.75, 0, 0, 0.5],
      "8743": [0, 0.55556, 0, 0, 0.66667],
      "8744": [0, 0.55556, 0, 0, 0.66667],
      "8745": [0, 0.55556, 0, 0, 0.66667],
      "8746": [0, 0.55556, 0, 0, 0.66667],
      "8747": [0.19444, 0.69444, 0.11111, 0, 0.41667],
      "8764": [-0.13313, 0.36687, 0, 0, 0.77778],
      "8768": [0.19444, 0.69444, 0, 0, 0.27778],
      "8771": [-0.03625, 0.46375, 0, 0, 0.77778],
      "8773": [-0.022, 0.589, 0, 0, 0.778],
      "8776": [-0.01688, 0.48312, 0, 0, 0.77778],
      "8781": [-0.03625, 0.46375, 0, 0, 0.77778],
      "8784": [-0.133, 0.673, 0, 0, 0.778],
      "8801": [-0.03625, 0.46375, 0, 0, 0.77778],
      "8804": [0.13597, 0.63597, 0, 0, 0.77778],
      "8805": [0.13597, 0.63597, 0, 0, 0.77778],
      "8810": [0.0391, 0.5391, 0, 0, 1],
      "8811": [0.0391, 0.5391, 0, 0, 1],
      "8826": [0.0391, 0.5391, 0, 0, 0.77778],
      "8827": [0.0391, 0.5391, 0, 0, 0.77778],
      "8834": [0.0391, 0.5391, 0, 0, 0.77778],
      "8835": [0.0391, 0.5391, 0, 0, 0.77778],
      "8838": [0.13597, 0.63597, 0, 0, 0.77778],
      "8839": [0.13597, 0.63597, 0, 0, 0.77778],
      "8846": [0, 0.55556, 0, 0, 0.66667],
      "8849": [0.13597, 0.63597, 0, 0, 0.77778],
      "8850": [0.13597, 0.63597, 0, 0, 0.77778],
      "8851": [0, 0.55556, 0, 0, 0.66667],
      "8852": [0, 0.55556, 0, 0, 0.66667],
      "8853": [0.08333, 0.58333, 0, 0, 0.77778],
      "8854": [0.08333, 0.58333, 0, 0, 0.77778],
      "8855": [0.08333, 0.58333, 0, 0, 0.77778],
      "8856": [0.08333, 0.58333, 0, 0, 0.77778],
      "8857": [0.08333, 0.58333, 0, 0, 0.77778],
      "8866": [0, 0.69444, 0, 0, 0.61111],
      "8867": [0, 0.69444, 0, 0, 0.61111],
      "8868": [0, 0.69444, 0, 0, 0.77778],
      "8869": [0, 0.69444, 0, 0, 0.77778],
      "8872": [0.249, 0.75, 0, 0, 0.867],
      "8900": [-0.05555, 0.44445, 0, 0, 0.5],
      "8901": [-0.05555, 0.44445, 0, 0, 0.27778],
      "8902": [-0.03472, 0.46528, 0, 0, 0.5],
      "8904": [5e-3, 0.505, 0, 0, 0.9],
      "8942": [0.03, 0.903, 0, 0, 0.278],
      "8943": [-0.19, 0.313, 0, 0, 1.172],
      "8945": [-0.1, 0.823, 0, 0, 1.282],
      "8968": [0.25, 0.75, 0, 0, 0.44445],
      "8969": [0.25, 0.75, 0, 0, 0.44445],
      "8970": [0.25, 0.75, 0, 0, 0.44445],
      "8971": [0.25, 0.75, 0, 0, 0.44445],
      "8994": [-0.14236, 0.35764, 0, 0, 1],
      "8995": [-0.14236, 0.35764, 0, 0, 1],
      "9136": [0.244, 0.744, 0, 0, 0.412],
      "9137": [0.244, 0.745, 0, 0, 0.412],
      "9651": [0.19444, 0.69444, 0, 0, 0.88889],
      "9657": [-0.03472, 0.46528, 0, 0, 0.5],
      "9661": [0.19444, 0.69444, 0, 0, 0.88889],
      "9667": [-0.03472, 0.46528, 0, 0, 0.5],
      "9711": [0.19444, 0.69444, 0, 0, 1],
      "9824": [0.12963, 0.69444, 0, 0, 0.77778],
      "9825": [0.12963, 0.69444, 0, 0, 0.77778],
      "9826": [0.12963, 0.69444, 0, 0, 0.77778],
      "9827": [0.12963, 0.69444, 0, 0, 0.77778],
      "9837": [0, 0.75, 0, 0, 0.38889],
      "9838": [0.19444, 0.69444, 0, 0, 0.38889],
      "9839": [0.19444, 0.69444, 0, 0, 0.38889],
      "10216": [0.25, 0.75, 0, 0, 0.38889],
      "10217": [0.25, 0.75, 0, 0, 0.38889],
      "10222": [0.244, 0.744, 0, 0, 0.412],
      "10223": [0.244, 0.745, 0, 0, 0.412],
      "10229": [0.011, 0.511, 0, 0, 1.609],
      "10230": [0.011, 0.511, 0, 0, 1.638],
      "10231": [0.011, 0.511, 0, 0, 1.859],
      "10232": [0.024, 0.525, 0, 0, 1.609],
      "10233": [0.024, 0.525, 0, 0, 1.638],
      "10234": [0.024, 0.525, 0, 0, 1.858],
      "10236": [0.011, 0.511, 0, 0, 1.638],
      "10815": [0, 0.68333, 0, 0, 0.75],
      "10927": [0.13597, 0.63597, 0, 0, 0.77778],
      "10928": [0.13597, 0.63597, 0, 0, 0.77778],
      "57376": [0.19444, 0.69444, 0, 0, 0]
    },
    "Math-BoldItalic": {
      "32": [0, 0, 0, 0, 0.25],
      "48": [0, 0.44444, 0, 0, 0.575],
      "49": [0, 0.44444, 0, 0, 0.575],
      "50": [0, 0.44444, 0, 0, 0.575],
      "51": [0.19444, 0.44444, 0, 0, 0.575],
      "52": [0.19444, 0.44444, 0, 0, 0.575],
      "53": [0.19444, 0.44444, 0, 0, 0.575],
      "54": [0, 0.64444, 0, 0, 0.575],
      "55": [0.19444, 0.44444, 0, 0, 0.575],
      "56": [0, 0.64444, 0, 0, 0.575],
      "57": [0.19444, 0.44444, 0, 0, 0.575],
      "65": [0, 0.68611, 0, 0, 0.86944],
      "66": [0, 0.68611, 0.04835, 0, 0.8664],
      "67": [0, 0.68611, 0.06979, 0, 0.81694],
      "68": [0, 0.68611, 0.03194, 0, 0.93812],
      "69": [0, 0.68611, 0.05451, 0, 0.81007],
      "70": [0, 0.68611, 0.15972, 0, 0.68889],
      "71": [0, 0.68611, 0, 0, 0.88673],
      "72": [0, 0.68611, 0.08229, 0, 0.98229],
      "73": [0, 0.68611, 0.07778, 0, 0.51111],
      "74": [0, 0.68611, 0.10069, 0, 0.63125],
      "75": [0, 0.68611, 0.06979, 0, 0.97118],
      "76": [0, 0.68611, 0, 0, 0.75555],
      "77": [0, 0.68611, 0.11424, 0, 1.14201],
      "78": [0, 0.68611, 0.11424, 0, 0.95034],
      "79": [0, 0.68611, 0.03194, 0, 0.83666],
      "80": [0, 0.68611, 0.15972, 0, 0.72309],
      "81": [0.19444, 0.68611, 0, 0, 0.86861],
      "82": [0, 0.68611, 421e-5, 0, 0.87235],
      "83": [0, 0.68611, 0.05382, 0, 0.69271],
      "84": [0, 0.68611, 0.15972, 0, 0.63663],
      "85": [0, 0.68611, 0.11424, 0, 0.80027],
      "86": [0, 0.68611, 0.25555, 0, 0.67778],
      "87": [0, 0.68611, 0.15972, 0, 1.09305],
      "88": [0, 0.68611, 0.07778, 0, 0.94722],
      "89": [0, 0.68611, 0.25555, 0, 0.67458],
      "90": [0, 0.68611, 0.06979, 0, 0.77257],
      "97": [0, 0.44444, 0, 0, 0.63287],
      "98": [0, 0.69444, 0, 0, 0.52083],
      "99": [0, 0.44444, 0, 0, 0.51342],
      "100": [0, 0.69444, 0, 0, 0.60972],
      "101": [0, 0.44444, 0, 0, 0.55361],
      "102": [0.19444, 0.69444, 0.11042, 0, 0.56806],
      "103": [0.19444, 0.44444, 0.03704, 0, 0.5449],
      "104": [0, 0.69444, 0, 0, 0.66759],
      "105": [0, 0.69326, 0, 0, 0.4048],
      "106": [0.19444, 0.69326, 0.0622, 0, 0.47083],
      "107": [0, 0.69444, 0.01852, 0, 0.6037],
      "108": [0, 0.69444, 88e-4, 0, 0.34815],
      "109": [0, 0.44444, 0, 0, 1.0324],
      "110": [0, 0.44444, 0, 0, 0.71296],
      "111": [0, 0.44444, 0, 0, 0.58472],
      "112": [0.19444, 0.44444, 0, 0, 0.60092],
      "113": [0.19444, 0.44444, 0.03704, 0, 0.54213],
      "114": [0, 0.44444, 0.03194, 0, 0.5287],
      "115": [0, 0.44444, 0, 0, 0.53125],
      "116": [0, 0.63492, 0, 0, 0.41528],
      "117": [0, 0.44444, 0, 0, 0.68102],
      "118": [0, 0.44444, 0.03704, 0, 0.56666],
      "119": [0, 0.44444, 0.02778, 0, 0.83148],
      "120": [0, 0.44444, 0, 0, 0.65903],
      "121": [0.19444, 0.44444, 0.03704, 0, 0.59028],
      "122": [0, 0.44444, 0.04213, 0, 0.55509],
      "160": [0, 0, 0, 0, 0.25],
      "915": [0, 0.68611, 0.15972, 0, 0.65694],
      "916": [0, 0.68611, 0, 0, 0.95833],
      "920": [0, 0.68611, 0.03194, 0, 0.86722],
      "923": [0, 0.68611, 0, 0, 0.80555],
      "926": [0, 0.68611, 0.07458, 0, 0.84125],
      "928": [0, 0.68611, 0.08229, 0, 0.98229],
      "931": [0, 0.68611, 0.05451, 0, 0.88507],
      "933": [0, 0.68611, 0.15972, 0, 0.67083],
      "934": [0, 0.68611, 0, 0, 0.76666],
      "936": [0, 0.68611, 0.11653, 0, 0.71402],
      "937": [0, 0.68611, 0.04835, 0, 0.8789],
      "945": [0, 0.44444, 0, 0, 0.76064],
      "946": [0.19444, 0.69444, 0.03403, 0, 0.65972],
      "947": [0.19444, 0.44444, 0.06389, 0, 0.59003],
      "948": [0, 0.69444, 0.03819, 0, 0.52222],
      "949": [0, 0.44444, 0, 0, 0.52882],
      "950": [0.19444, 0.69444, 0.06215, 0, 0.50833],
      "951": [0.19444, 0.44444, 0.03704, 0, 0.6],
      "952": [0, 0.69444, 0.03194, 0, 0.5618],
      "953": [0, 0.44444, 0, 0, 0.41204],
      "954": [0, 0.44444, 0, 0, 0.66759],
      "955": [0, 0.69444, 0, 0, 0.67083],
      "956": [0.19444, 0.44444, 0, 0, 0.70787],
      "957": [0, 0.44444, 0.06898, 0, 0.57685],
      "958": [0.19444, 0.69444, 0.03021, 0, 0.50833],
      "959": [0, 0.44444, 0, 0, 0.58472],
      "960": [0, 0.44444, 0.03704, 0, 0.68241],
      "961": [0.19444, 0.44444, 0, 0, 0.6118],
      "962": [0.09722, 0.44444, 0.07917, 0, 0.42361],
      "963": [0, 0.44444, 0.03704, 0, 0.68588],
      "964": [0, 0.44444, 0.13472, 0, 0.52083],
      "965": [0, 0.44444, 0.03704, 0, 0.63055],
      "966": [0.19444, 0.44444, 0, 0, 0.74722],
      "967": [0.19444, 0.44444, 0, 0, 0.71805],
      "968": [0.19444, 0.69444, 0.03704, 0, 0.75833],
      "969": [0, 0.44444, 0.03704, 0, 0.71782],
      "977": [0, 0.69444, 0, 0, 0.69155],
      "981": [0.19444, 0.69444, 0, 0, 0.7125],
      "982": [0, 0.44444, 0.03194, 0, 0.975],
      "1009": [0.19444, 0.44444, 0, 0, 0.6118],
      "1013": [0, 0.44444, 0, 0, 0.48333],
      "57649": [0, 0.44444, 0, 0, 0.39352],
      "57911": [0.19444, 0.44444, 0, 0, 0.43889]
    },
    "Math-Italic": {
      "32": [0, 0, 0, 0, 0.25],
      "48": [0, 0.43056, 0, 0, 0.5],
      "49": [0, 0.43056, 0, 0, 0.5],
      "50": [0, 0.43056, 0, 0, 0.5],
      "51": [0.19444, 0.43056, 0, 0, 0.5],
      "52": [0.19444, 0.43056, 0, 0, 0.5],
      "53": [0.19444, 0.43056, 0, 0, 0.5],
      "54": [0, 0.64444, 0, 0, 0.5],
      "55": [0.19444, 0.43056, 0, 0, 0.5],
      "56": [0, 0.64444, 0, 0, 0.5],
      "57": [0.19444, 0.43056, 0, 0, 0.5],
      "65": [0, 0.68333, 0, 0.13889, 0.75],
      "66": [0, 0.68333, 0.05017, 0.08334, 0.75851],
      "67": [0, 0.68333, 0.07153, 0.08334, 0.71472],
      "68": [0, 0.68333, 0.02778, 0.05556, 0.82792],
      "69": [0, 0.68333, 0.05764, 0.08334, 0.7382],
      "70": [0, 0.68333, 0.13889, 0.08334, 0.64306],
      "71": [0, 0.68333, 0, 0.08334, 0.78625],
      "72": [0, 0.68333, 0.08125, 0.05556, 0.83125],
      "73": [0, 0.68333, 0.07847, 0.11111, 0.43958],
      "74": [0, 0.68333, 0.09618, 0.16667, 0.55451],
      "75": [0, 0.68333, 0.07153, 0.05556, 0.84931],
      "76": [0, 0.68333, 0, 0.02778, 0.68056],
      "77": [0, 0.68333, 0.10903, 0.08334, 0.97014],
      "78": [0, 0.68333, 0.10903, 0.08334, 0.80347],
      "79": [0, 0.68333, 0.02778, 0.08334, 0.76278],
      "80": [0, 0.68333, 0.13889, 0.08334, 0.64201],
      "81": [0.19444, 0.68333, 0, 0.08334, 0.79056],
      "82": [0, 0.68333, 773e-5, 0.08334, 0.75929],
      "83": [0, 0.68333, 0.05764, 0.08334, 0.6132],
      "84": [0, 0.68333, 0.13889, 0.08334, 0.58438],
      "85": [0, 0.68333, 0.10903, 0.02778, 0.68278],
      "86": [0, 0.68333, 0.22222, 0, 0.58333],
      "87": [0, 0.68333, 0.13889, 0, 0.94445],
      "88": [0, 0.68333, 0.07847, 0.08334, 0.82847],
      "89": [0, 0.68333, 0.22222, 0, 0.58056],
      "90": [0, 0.68333, 0.07153, 0.08334, 0.68264],
      "97": [0, 0.43056, 0, 0, 0.52859],
      "98": [0, 0.69444, 0, 0, 0.42917],
      "99": [0, 0.43056, 0, 0.05556, 0.43276],
      "100": [0, 0.69444, 0, 0.16667, 0.52049],
      "101": [0, 0.43056, 0, 0.05556, 0.46563],
      "102": [0.19444, 0.69444, 0.10764, 0.16667, 0.48959],
      "103": [0.19444, 0.43056, 0.03588, 0.02778, 0.47697],
      "104": [0, 0.69444, 0, 0, 0.57616],
      "105": [0, 0.65952, 0, 0, 0.34451],
      "106": [0.19444, 0.65952, 0.05724, 0, 0.41181],
      "107": [0, 0.69444, 0.03148, 0, 0.5206],
      "108": [0, 0.69444, 0.01968, 0.08334, 0.29838],
      "109": [0, 0.43056, 0, 0, 0.87801],
      "110": [0, 0.43056, 0, 0, 0.60023],
      "111": [0, 0.43056, 0, 0.05556, 0.48472],
      "112": [0.19444, 0.43056, 0, 0.08334, 0.50313],
      "113": [0.19444, 0.43056, 0.03588, 0.08334, 0.44641],
      "114": [0, 0.43056, 0.02778, 0.05556, 0.45116],
      "115": [0, 0.43056, 0, 0.05556, 0.46875],
      "116": [0, 0.61508, 0, 0.08334, 0.36111],
      "117": [0, 0.43056, 0, 0.02778, 0.57246],
      "118": [0, 0.43056, 0.03588, 0.02778, 0.48472],
      "119": [0, 0.43056, 0.02691, 0.08334, 0.71592],
      "120": [0, 0.43056, 0, 0.02778, 0.57153],
      "121": [0.19444, 0.43056, 0.03588, 0.05556, 0.49028],
      "122": [0, 0.43056, 0.04398, 0.05556, 0.46505],
      "160": [0, 0, 0, 0, 0.25],
      "915": [0, 0.68333, 0.13889, 0.08334, 0.61528],
      "916": [0, 0.68333, 0, 0.16667, 0.83334],
      "920": [0, 0.68333, 0.02778, 0.08334, 0.76278],
      "923": [0, 0.68333, 0, 0.16667, 0.69445],
      "926": [0, 0.68333, 0.07569, 0.08334, 0.74236],
      "928": [0, 0.68333, 0.08125, 0.05556, 0.83125],
      "931": [0, 0.68333, 0.05764, 0.08334, 0.77986],
      "933": [0, 0.68333, 0.13889, 0.05556, 0.58333],
      "934": [0, 0.68333, 0, 0.08334, 0.66667],
      "936": [0, 0.68333, 0.11, 0.05556, 0.61222],
      "937": [0, 0.68333, 0.05017, 0.08334, 0.7724],
      "945": [0, 0.43056, 37e-4, 0.02778, 0.6397],
      "946": [0.19444, 0.69444, 0.05278, 0.08334, 0.56563],
      "947": [0.19444, 0.43056, 0.05556, 0, 0.51773],
      "948": [0, 0.69444, 0.03785, 0.05556, 0.44444],
      "949": [0, 0.43056, 0, 0.08334, 0.46632],
      "950": [0.19444, 0.69444, 0.07378, 0.08334, 0.4375],
      "951": [0.19444, 0.43056, 0.03588, 0.05556, 0.49653],
      "952": [0, 0.69444, 0.02778, 0.08334, 0.46944],
      "953": [0, 0.43056, 0, 0.05556, 0.35394],
      "954": [0, 0.43056, 0, 0, 0.57616],
      "955": [0, 0.69444, 0, 0, 0.58334],
      "956": [0.19444, 0.43056, 0, 0.02778, 0.60255],
      "957": [0, 0.43056, 0.06366, 0.02778, 0.49398],
      "958": [0.19444, 0.69444, 0.04601, 0.11111, 0.4375],
      "959": [0, 0.43056, 0, 0.05556, 0.48472],
      "960": [0, 0.43056, 0.03588, 0, 0.57003],
      "961": [0.19444, 0.43056, 0, 0.08334, 0.51702],
      "962": [0.09722, 0.43056, 0.07986, 0.08334, 0.36285],
      "963": [0, 0.43056, 0.03588, 0, 0.57141],
      "964": [0, 0.43056, 0.1132, 0.02778, 0.43715],
      "965": [0, 0.43056, 0.03588, 0.02778, 0.54028],
      "966": [0.19444, 0.43056, 0, 0.08334, 0.65417],
      "967": [0.19444, 0.43056, 0, 0.05556, 0.62569],
      "968": [0.19444, 0.69444, 0.03588, 0.11111, 0.65139],
      "969": [0, 0.43056, 0.03588, 0, 0.62245],
      "977": [0, 0.69444, 0, 0.08334, 0.59144],
      "981": [0.19444, 0.69444, 0, 0.08334, 0.59583],
      "982": [0, 0.43056, 0.02778, 0, 0.82813],
      "1009": [0.19444, 0.43056, 0, 0.08334, 0.51702],
      "1013": [0, 0.43056, 0, 0.05556, 0.4059],
      "57649": [0, 0.43056, 0, 0.02778, 0.32246],
      "57911": [0.19444, 0.43056, 0, 0.08334, 0.38403]
    },
    "SansSerif-Bold": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0, 0, 0.36667],
      "34": [0, 0.69444, 0, 0, 0.55834],
      "35": [0.19444, 0.69444, 0, 0, 0.91667],
      "36": [0.05556, 0.75, 0, 0, 0.55],
      "37": [0.05556, 0.75, 0, 0, 1.02912],
      "38": [0, 0.69444, 0, 0, 0.83056],
      "39": [0, 0.69444, 0, 0, 0.30556],
      "40": [0.25, 0.75, 0, 0, 0.42778],
      "41": [0.25, 0.75, 0, 0, 0.42778],
      "42": [0, 0.75, 0, 0, 0.55],
      "43": [0.11667, 0.61667, 0, 0, 0.85556],
      "44": [0.10556, 0.13056, 0, 0, 0.30556],
      "45": [0, 0.45833, 0, 0, 0.36667],
      "46": [0, 0.13056, 0, 0, 0.30556],
      "47": [0.25, 0.75, 0, 0, 0.55],
      "48": [0, 0.69444, 0, 0, 0.55],
      "49": [0, 0.69444, 0, 0, 0.55],
      "50": [0, 0.69444, 0, 0, 0.55],
      "51": [0, 0.69444, 0, 0, 0.55],
      "52": [0, 0.69444, 0, 0, 0.55],
      "53": [0, 0.69444, 0, 0, 0.55],
      "54": [0, 0.69444, 0, 0, 0.55],
      "55": [0, 0.69444, 0, 0, 0.55],
      "56": [0, 0.69444, 0, 0, 0.55],
      "57": [0, 0.69444, 0, 0, 0.55],
      "58": [0, 0.45833, 0, 0, 0.30556],
      "59": [0.10556, 0.45833, 0, 0, 0.30556],
      "61": [-0.09375, 0.40625, 0, 0, 0.85556],
      "63": [0, 0.69444, 0, 0, 0.51945],
      "64": [0, 0.69444, 0, 0, 0.73334],
      "65": [0, 0.69444, 0, 0, 0.73334],
      "66": [0, 0.69444, 0, 0, 0.73334],
      "67": [0, 0.69444, 0, 0, 0.70278],
      "68": [0, 0.69444, 0, 0, 0.79445],
      "69": [0, 0.69444, 0, 0, 0.64167],
      "70": [0, 0.69444, 0, 0, 0.61111],
      "71": [0, 0.69444, 0, 0, 0.73334],
      "72": [0, 0.69444, 0, 0, 0.79445],
      "73": [0, 0.69444, 0, 0, 0.33056],
      "74": [0, 0.69444, 0, 0, 0.51945],
      "75": [0, 0.69444, 0, 0, 0.76389],
      "76": [0, 0.69444, 0, 0, 0.58056],
      "77": [0, 0.69444, 0, 0, 0.97778],
      "78": [0, 0.69444, 0, 0, 0.79445],
      "79": [0, 0.69444, 0, 0, 0.79445],
      "80": [0, 0.69444, 0, 0, 0.70278],
      "81": [0.10556, 0.69444, 0, 0, 0.79445],
      "82": [0, 0.69444, 0, 0, 0.70278],
      "83": [0, 0.69444, 0, 0, 0.61111],
      "84": [0, 0.69444, 0, 0, 0.73334],
      "85": [0, 0.69444, 0, 0, 0.76389],
      "86": [0, 0.69444, 0.01528, 0, 0.73334],
      "87": [0, 0.69444, 0.01528, 0, 1.03889],
      "88": [0, 0.69444, 0, 0, 0.73334],
      "89": [0, 0.69444, 0.0275, 0, 0.73334],
      "90": [0, 0.69444, 0, 0, 0.67223],
      "91": [0.25, 0.75, 0, 0, 0.34306],
      "93": [0.25, 0.75, 0, 0, 0.34306],
      "94": [0, 0.69444, 0, 0, 0.55],
      "95": [0.35, 0.10833, 0.03056, 0, 0.55],
      "97": [0, 0.45833, 0, 0, 0.525],
      "98": [0, 0.69444, 0, 0, 0.56111],
      "99": [0, 0.45833, 0, 0, 0.48889],
      "100": [0, 0.69444, 0, 0, 0.56111],
      "101": [0, 0.45833, 0, 0, 0.51111],
      "102": [0, 0.69444, 0.07639, 0, 0.33611],
      "103": [0.19444, 0.45833, 0.01528, 0, 0.55],
      "104": [0, 0.69444, 0, 0, 0.56111],
      "105": [0, 0.69444, 0, 0, 0.25556],
      "106": [0.19444, 0.69444, 0, 0, 0.28611],
      "107": [0, 0.69444, 0, 0, 0.53056],
      "108": [0, 0.69444, 0, 0, 0.25556],
      "109": [0, 0.45833, 0, 0, 0.86667],
      "110": [0, 0.45833, 0, 0, 0.56111],
      "111": [0, 0.45833, 0, 0, 0.55],
      "112": [0.19444, 0.45833, 0, 0, 0.56111],
      "113": [0.19444, 0.45833, 0, 0, 0.56111],
      "114": [0, 0.45833, 0.01528, 0, 0.37222],
      "115": [0, 0.45833, 0, 0, 0.42167],
      "116": [0, 0.58929, 0, 0, 0.40417],
      "117": [0, 0.45833, 0, 0, 0.56111],
      "118": [0, 0.45833, 0.01528, 0, 0.5],
      "119": [0, 0.45833, 0.01528, 0, 0.74445],
      "120": [0, 0.45833, 0, 0, 0.5],
      "121": [0.19444, 0.45833, 0.01528, 0, 0.5],
      "122": [0, 0.45833, 0, 0, 0.47639],
      "126": [0.35, 0.34444, 0, 0, 0.55],
      "160": [0, 0, 0, 0, 0.25],
      "168": [0, 0.69444, 0, 0, 0.55],
      "176": [0, 0.69444, 0, 0, 0.73334],
      "180": [0, 0.69444, 0, 0, 0.55],
      "184": [0.17014, 0, 0, 0, 0.48889],
      "305": [0, 0.45833, 0, 0, 0.25556],
      "567": [0.19444, 0.45833, 0, 0, 0.28611],
      "710": [0, 0.69444, 0, 0, 0.55],
      "711": [0, 0.63542, 0, 0, 0.55],
      "713": [0, 0.63778, 0, 0, 0.55],
      "728": [0, 0.69444, 0, 0, 0.55],
      "729": [0, 0.69444, 0, 0, 0.30556],
      "730": [0, 0.69444, 0, 0, 0.73334],
      "732": [0, 0.69444, 0, 0, 0.55],
      "733": [0, 0.69444, 0, 0, 0.55],
      "915": [0, 0.69444, 0, 0, 0.58056],
      "916": [0, 0.69444, 0, 0, 0.91667],
      "920": [0, 0.69444, 0, 0, 0.85556],
      "923": [0, 0.69444, 0, 0, 0.67223],
      "926": [0, 0.69444, 0, 0, 0.73334],
      "928": [0, 0.69444, 0, 0, 0.79445],
      "931": [0, 0.69444, 0, 0, 0.79445],
      "933": [0, 0.69444, 0, 0, 0.85556],
      "934": [0, 0.69444, 0, 0, 0.79445],
      "936": [0, 0.69444, 0, 0, 0.85556],
      "937": [0, 0.69444, 0, 0, 0.79445],
      "8211": [0, 0.45833, 0.03056, 0, 0.55],
      "8212": [0, 0.45833, 0.03056, 0, 1.10001],
      "8216": [0, 0.69444, 0, 0, 0.30556],
      "8217": [0, 0.69444, 0, 0, 0.30556],
      "8220": [0, 0.69444, 0, 0, 0.55834],
      "8221": [0, 0.69444, 0, 0, 0.55834]
    },
    "SansSerif-Italic": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0.05733, 0, 0.31945],
      "34": [0, 0.69444, 316e-5, 0, 0.5],
      "35": [0.19444, 0.69444, 0.05087, 0, 0.83334],
      "36": [0.05556, 0.75, 0.11156, 0, 0.5],
      "37": [0.05556, 0.75, 0.03126, 0, 0.83334],
      "38": [0, 0.69444, 0.03058, 0, 0.75834],
      "39": [0, 0.69444, 0.07816, 0, 0.27778],
      "40": [0.25, 0.75, 0.13164, 0, 0.38889],
      "41": [0.25, 0.75, 0.02536, 0, 0.38889],
      "42": [0, 0.75, 0.11775, 0, 0.5],
      "43": [0.08333, 0.58333, 0.02536, 0, 0.77778],
      "44": [0.125, 0.08333, 0, 0, 0.27778],
      "45": [0, 0.44444, 0.01946, 0, 0.33333],
      "46": [0, 0.08333, 0, 0, 0.27778],
      "47": [0.25, 0.75, 0.13164, 0, 0.5],
      "48": [0, 0.65556, 0.11156, 0, 0.5],
      "49": [0, 0.65556, 0.11156, 0, 0.5],
      "50": [0, 0.65556, 0.11156, 0, 0.5],
      "51": [0, 0.65556, 0.11156, 0, 0.5],
      "52": [0, 0.65556, 0.11156, 0, 0.5],
      "53": [0, 0.65556, 0.11156, 0, 0.5],
      "54": [0, 0.65556, 0.11156, 0, 0.5],
      "55": [0, 0.65556, 0.11156, 0, 0.5],
      "56": [0, 0.65556, 0.11156, 0, 0.5],
      "57": [0, 0.65556, 0.11156, 0, 0.5],
      "58": [0, 0.44444, 0.02502, 0, 0.27778],
      "59": [0.125, 0.44444, 0.02502, 0, 0.27778],
      "61": [-0.13, 0.37, 0.05087, 0, 0.77778],
      "63": [0, 0.69444, 0.11809, 0, 0.47222],
      "64": [0, 0.69444, 0.07555, 0, 0.66667],
      "65": [0, 0.69444, 0, 0, 0.66667],
      "66": [0, 0.69444, 0.08293, 0, 0.66667],
      "67": [0, 0.69444, 0.11983, 0, 0.63889],
      "68": [0, 0.69444, 0.07555, 0, 0.72223],
      "69": [0, 0.69444, 0.11983, 0, 0.59722],
      "70": [0, 0.69444, 0.13372, 0, 0.56945],
      "71": [0, 0.69444, 0.11983, 0, 0.66667],
      "72": [0, 0.69444, 0.08094, 0, 0.70834],
      "73": [0, 0.69444, 0.13372, 0, 0.27778],
      "74": [0, 0.69444, 0.08094, 0, 0.47222],
      "75": [0, 0.69444, 0.11983, 0, 0.69445],
      "76": [0, 0.69444, 0, 0, 0.54167],
      "77": [0, 0.69444, 0.08094, 0, 0.875],
      "78": [0, 0.69444, 0.08094, 0, 0.70834],
      "79": [0, 0.69444, 0.07555, 0, 0.73611],
      "80": [0, 0.69444, 0.08293, 0, 0.63889],
      "81": [0.125, 0.69444, 0.07555, 0, 0.73611],
      "82": [0, 0.69444, 0.08293, 0, 0.64584],
      "83": [0, 0.69444, 0.09205, 0, 0.55556],
      "84": [0, 0.69444, 0.13372, 0, 0.68056],
      "85": [0, 0.69444, 0.08094, 0, 0.6875],
      "86": [0, 0.69444, 0.1615, 0, 0.66667],
      "87": [0, 0.69444, 0.1615, 0, 0.94445],
      "88": [0, 0.69444, 0.13372, 0, 0.66667],
      "89": [0, 0.69444, 0.17261, 0, 0.66667],
      "90": [0, 0.69444, 0.11983, 0, 0.61111],
      "91": [0.25, 0.75, 0.15942, 0, 0.28889],
      "93": [0.25, 0.75, 0.08719, 0, 0.28889],
      "94": [0, 0.69444, 0.0799, 0, 0.5],
      "95": [0.35, 0.09444, 0.08616, 0, 0.5],
      "97": [0, 0.44444, 981e-5, 0, 0.48056],
      "98": [0, 0.69444, 0.03057, 0, 0.51667],
      "99": [0, 0.44444, 0.08336, 0, 0.44445],
      "100": [0, 0.69444, 0.09483, 0, 0.51667],
      "101": [0, 0.44444, 0.06778, 0, 0.44445],
      "102": [0, 0.69444, 0.21705, 0, 0.30556],
      "103": [0.19444, 0.44444, 0.10836, 0, 0.5],
      "104": [0, 0.69444, 0.01778, 0, 0.51667],
      "105": [0, 0.67937, 0.09718, 0, 0.23889],
      "106": [0.19444, 0.67937, 0.09162, 0, 0.26667],
      "107": [0, 0.69444, 0.08336, 0, 0.48889],
      "108": [0, 0.69444, 0.09483, 0, 0.23889],
      "109": [0, 0.44444, 0.01778, 0, 0.79445],
      "110": [0, 0.44444, 0.01778, 0, 0.51667],
      "111": [0, 0.44444, 0.06613, 0, 0.5],
      "112": [0.19444, 0.44444, 0.0389, 0, 0.51667],
      "113": [0.19444, 0.44444, 0.04169, 0, 0.51667],
      "114": [0, 0.44444, 0.10836, 0, 0.34167],
      "115": [0, 0.44444, 0.0778, 0, 0.38333],
      "116": [0, 0.57143, 0.07225, 0, 0.36111],
      "117": [0, 0.44444, 0.04169, 0, 0.51667],
      "118": [0, 0.44444, 0.10836, 0, 0.46111],
      "119": [0, 0.44444, 0.10836, 0, 0.68334],
      "120": [0, 0.44444, 0.09169, 0, 0.46111],
      "121": [0.19444, 0.44444, 0.10836, 0, 0.46111],
      "122": [0, 0.44444, 0.08752, 0, 0.43472],
      "126": [0.35, 0.32659, 0.08826, 0, 0.5],
      "160": [0, 0, 0, 0, 0.25],
      "168": [0, 0.67937, 0.06385, 0, 0.5],
      "176": [0, 0.69444, 0, 0, 0.73752],
      "184": [0.17014, 0, 0, 0, 0.44445],
      "305": [0, 0.44444, 0.04169, 0, 0.23889],
      "567": [0.19444, 0.44444, 0.04169, 0, 0.26667],
      "710": [0, 0.69444, 0.0799, 0, 0.5],
      "711": [0, 0.63194, 0.08432, 0, 0.5],
      "713": [0, 0.60889, 0.08776, 0, 0.5],
      "714": [0, 0.69444, 0.09205, 0, 0.5],
      "715": [0, 0.69444, 0, 0, 0.5],
      "728": [0, 0.69444, 0.09483, 0, 0.5],
      "729": [0, 0.67937, 0.07774, 0, 0.27778],
      "730": [0, 0.69444, 0, 0, 0.73752],
      "732": [0, 0.67659, 0.08826, 0, 0.5],
      "733": [0, 0.69444, 0.09205, 0, 0.5],
      "915": [0, 0.69444, 0.13372, 0, 0.54167],
      "916": [0, 0.69444, 0, 0, 0.83334],
      "920": [0, 0.69444, 0.07555, 0, 0.77778],
      "923": [0, 0.69444, 0, 0, 0.61111],
      "926": [0, 0.69444, 0.12816, 0, 0.66667],
      "928": [0, 0.69444, 0.08094, 0, 0.70834],
      "931": [0, 0.69444, 0.11983, 0, 0.72222],
      "933": [0, 0.69444, 0.09031, 0, 0.77778],
      "934": [0, 0.69444, 0.04603, 0, 0.72222],
      "936": [0, 0.69444, 0.09031, 0, 0.77778],
      "937": [0, 0.69444, 0.08293, 0, 0.72222],
      "8211": [0, 0.44444, 0.08616, 0, 0.5],
      "8212": [0, 0.44444, 0.08616, 0, 1],
      "8216": [0, 0.69444, 0.07816, 0, 0.27778],
      "8217": [0, 0.69444, 0.07816, 0, 0.27778],
      "8220": [0, 0.69444, 0.14205, 0, 0.5],
      "8221": [0, 0.69444, 316e-5, 0, 0.5]
    },
    "SansSerif-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "33": [0, 0.69444, 0, 0, 0.31945],
      "34": [0, 0.69444, 0, 0, 0.5],
      "35": [0.19444, 0.69444, 0, 0, 0.83334],
      "36": [0.05556, 0.75, 0, 0, 0.5],
      "37": [0.05556, 0.75, 0, 0, 0.83334],
      "38": [0, 0.69444, 0, 0, 0.75834],
      "39": [0, 0.69444, 0, 0, 0.27778],
      "40": [0.25, 0.75, 0, 0, 0.38889],
      "41": [0.25, 0.75, 0, 0, 0.38889],
      "42": [0, 0.75, 0, 0, 0.5],
      "43": [0.08333, 0.58333, 0, 0, 0.77778],
      "44": [0.125, 0.08333, 0, 0, 0.27778],
      "45": [0, 0.44444, 0, 0, 0.33333],
      "46": [0, 0.08333, 0, 0, 0.27778],
      "47": [0.25, 0.75, 0, 0, 0.5],
      "48": [0, 0.65556, 0, 0, 0.5],
      "49": [0, 0.65556, 0, 0, 0.5],
      "50": [0, 0.65556, 0, 0, 0.5],
      "51": [0, 0.65556, 0, 0, 0.5],
      "52": [0, 0.65556, 0, 0, 0.5],
      "53": [0, 0.65556, 0, 0, 0.5],
      "54": [0, 0.65556, 0, 0, 0.5],
      "55": [0, 0.65556, 0, 0, 0.5],
      "56": [0, 0.65556, 0, 0, 0.5],
      "57": [0, 0.65556, 0, 0, 0.5],
      "58": [0, 0.44444, 0, 0, 0.27778],
      "59": [0.125, 0.44444, 0, 0, 0.27778],
      "61": [-0.13, 0.37, 0, 0, 0.77778],
      "63": [0, 0.69444, 0, 0, 0.47222],
      "64": [0, 0.69444, 0, 0, 0.66667],
      "65": [0, 0.69444, 0, 0, 0.66667],
      "66": [0, 0.69444, 0, 0, 0.66667],
      "67": [0, 0.69444, 0, 0, 0.63889],
      "68": [0, 0.69444, 0, 0, 0.72223],
      "69": [0, 0.69444, 0, 0, 0.59722],
      "70": [0, 0.69444, 0, 0, 0.56945],
      "71": [0, 0.69444, 0, 0, 0.66667],
      "72": [0, 0.69444, 0, 0, 0.70834],
      "73": [0, 0.69444, 0, 0, 0.27778],
      "74": [0, 0.69444, 0, 0, 0.47222],
      "75": [0, 0.69444, 0, 0, 0.69445],
      "76": [0, 0.69444, 0, 0, 0.54167],
      "77": [0, 0.69444, 0, 0, 0.875],
      "78": [0, 0.69444, 0, 0, 0.70834],
      "79": [0, 0.69444, 0, 0, 0.73611],
      "80": [0, 0.69444, 0, 0, 0.63889],
      "81": [0.125, 0.69444, 0, 0, 0.73611],
      "82": [0, 0.69444, 0, 0, 0.64584],
      "83": [0, 0.69444, 0, 0, 0.55556],
      "84": [0, 0.69444, 0, 0, 0.68056],
      "85": [0, 0.69444, 0, 0, 0.6875],
      "86": [0, 0.69444, 0.01389, 0, 0.66667],
      "87": [0, 0.69444, 0.01389, 0, 0.94445],
      "88": [0, 0.69444, 0, 0, 0.66667],
      "89": [0, 0.69444, 0.025, 0, 0.66667],
      "90": [0, 0.69444, 0, 0, 0.61111],
      "91": [0.25, 0.75, 0, 0, 0.28889],
      "93": [0.25, 0.75, 0, 0, 0.28889],
      "94": [0, 0.69444, 0, 0, 0.5],
      "95": [0.35, 0.09444, 0.02778, 0, 0.5],
      "97": [0, 0.44444, 0, 0, 0.48056],
      "98": [0, 0.69444, 0, 0, 0.51667],
      "99": [0, 0.44444, 0, 0, 0.44445],
      "100": [0, 0.69444, 0, 0, 0.51667],
      "101": [0, 0.44444, 0, 0, 0.44445],
      "102": [0, 0.69444, 0.06944, 0, 0.30556],
      "103": [0.19444, 0.44444, 0.01389, 0, 0.5],
      "104": [0, 0.69444, 0, 0, 0.51667],
      "105": [0, 0.67937, 0, 0, 0.23889],
      "106": [0.19444, 0.67937, 0, 0, 0.26667],
      "107": [0, 0.69444, 0, 0, 0.48889],
      "108": [0, 0.69444, 0, 0, 0.23889],
      "109": [0, 0.44444, 0, 0, 0.79445],
      "110": [0, 0.44444, 0, 0, 0.51667],
      "111": [0, 0.44444, 0, 0, 0.5],
      "112": [0.19444, 0.44444, 0, 0, 0.51667],
      "113": [0.19444, 0.44444, 0, 0, 0.51667],
      "114": [0, 0.44444, 0.01389, 0, 0.34167],
      "115": [0, 0.44444, 0, 0, 0.38333],
      "116": [0, 0.57143, 0, 0, 0.36111],
      "117": [0, 0.44444, 0, 0, 0.51667],
      "118": [0, 0.44444, 0.01389, 0, 0.46111],
      "119": [0, 0.44444, 0.01389, 0, 0.68334],
      "120": [0, 0.44444, 0, 0, 0.46111],
      "121": [0.19444, 0.44444, 0.01389, 0, 0.46111],
      "122": [0, 0.44444, 0, 0, 0.43472],
      "126": [0.35, 0.32659, 0, 0, 0.5],
      "160": [0, 0, 0, 0, 0.25],
      "168": [0, 0.67937, 0, 0, 0.5],
      "176": [0, 0.69444, 0, 0, 0.66667],
      "184": [0.17014, 0, 0, 0, 0.44445],
      "305": [0, 0.44444, 0, 0, 0.23889],
      "567": [0.19444, 0.44444, 0, 0, 0.26667],
      "710": [0, 0.69444, 0, 0, 0.5],
      "711": [0, 0.63194, 0, 0, 0.5],
      "713": [0, 0.60889, 0, 0, 0.5],
      "714": [0, 0.69444, 0, 0, 0.5],
      "715": [0, 0.69444, 0, 0, 0.5],
      "728": [0, 0.69444, 0, 0, 0.5],
      "729": [0, 0.67937, 0, 0, 0.27778],
      "730": [0, 0.69444, 0, 0, 0.66667],
      "732": [0, 0.67659, 0, 0, 0.5],
      "733": [0, 0.69444, 0, 0, 0.5],
      "915": [0, 0.69444, 0, 0, 0.54167],
      "916": [0, 0.69444, 0, 0, 0.83334],
      "920": [0, 0.69444, 0, 0, 0.77778],
      "923": [0, 0.69444, 0, 0, 0.61111],
      "926": [0, 0.69444, 0, 0, 0.66667],
      "928": [0, 0.69444, 0, 0, 0.70834],
      "931": [0, 0.69444, 0, 0, 0.72222],
      "933": [0, 0.69444, 0, 0, 0.77778],
      "934": [0, 0.69444, 0, 0, 0.72222],
      "936": [0, 0.69444, 0, 0, 0.77778],
      "937": [0, 0.69444, 0, 0, 0.72222],
      "8211": [0, 0.44444, 0.02778, 0, 0.5],
      "8212": [0, 0.44444, 0.02778, 0, 1],
      "8216": [0, 0.69444, 0, 0, 0.27778],
      "8217": [0, 0.69444, 0, 0, 0.27778],
      "8220": [0, 0.69444, 0, 0, 0.5],
      "8221": [0, 0.69444, 0, 0, 0.5]
    },
    "Script-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "65": [0, 0.7, 0.22925, 0, 0.80253],
      "66": [0, 0.7, 0.04087, 0, 0.90757],
      "67": [0, 0.7, 0.1689, 0, 0.66619],
      "68": [0, 0.7, 0.09371, 0, 0.77443],
      "69": [0, 0.7, 0.18583, 0, 0.56162],
      "70": [0, 0.7, 0.13634, 0, 0.89544],
      "71": [0, 0.7, 0.17322, 0, 0.60961],
      "72": [0, 0.7, 0.29694, 0, 0.96919],
      "73": [0, 0.7, 0.19189, 0, 0.80907],
      "74": [0.27778, 0.7, 0.19189, 0, 1.05159],
      "75": [0, 0.7, 0.31259, 0, 0.91364],
      "76": [0, 0.7, 0.19189, 0, 0.87373],
      "77": [0, 0.7, 0.15981, 0, 1.08031],
      "78": [0, 0.7, 0.3525, 0, 0.9015],
      "79": [0, 0.7, 0.08078, 0, 0.73787],
      "80": [0, 0.7, 0.08078, 0, 1.01262],
      "81": [0, 0.7, 0.03305, 0, 0.88282],
      "82": [0, 0.7, 0.06259, 0, 0.85],
      "83": [0, 0.7, 0.19189, 0, 0.86767],
      "84": [0, 0.7, 0.29087, 0, 0.74697],
      "85": [0, 0.7, 0.25815, 0, 0.79996],
      "86": [0, 0.7, 0.27523, 0, 0.62204],
      "87": [0, 0.7, 0.27523, 0, 0.80532],
      "88": [0, 0.7, 0.26006, 0, 0.94445],
      "89": [0, 0.7, 0.2939, 0, 0.70961],
      "90": [0, 0.7, 0.24037, 0, 0.8212],
      "160": [0, 0, 0, 0, 0.25]
    },
    "Size1-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "40": [0.35001, 0.85, 0, 0, 0.45834],
      "41": [0.35001, 0.85, 0, 0, 0.45834],
      "47": [0.35001, 0.85, 0, 0, 0.57778],
      "91": [0.35001, 0.85, 0, 0, 0.41667],
      "92": [0.35001, 0.85, 0, 0, 0.57778],
      "93": [0.35001, 0.85, 0, 0, 0.41667],
      "123": [0.35001, 0.85, 0, 0, 0.58334],
      "125": [0.35001, 0.85, 0, 0, 0.58334],
      "160": [0, 0, 0, 0, 0.25],
      "710": [0, 0.72222, 0, 0, 0.55556],
      "732": [0, 0.72222, 0, 0, 0.55556],
      "770": [0, 0.72222, 0, 0, 0.55556],
      "771": [0, 0.72222, 0, 0, 0.55556],
      "8214": [-99e-5, 0.601, 0, 0, 0.77778],
      "8593": [1e-5, 0.6, 0, 0, 0.66667],
      "8595": [1e-5, 0.6, 0, 0, 0.66667],
      "8657": [1e-5, 0.6, 0, 0, 0.77778],
      "8659": [1e-5, 0.6, 0, 0, 0.77778],
      "8719": [0.25001, 0.75, 0, 0, 0.94445],
      "8720": [0.25001, 0.75, 0, 0, 0.94445],
      "8721": [0.25001, 0.75, 0, 0, 1.05556],
      "8730": [0.35001, 0.85, 0, 0, 1],
      "8739": [-599e-5, 0.606, 0, 0, 0.33333],
      "8741": [-599e-5, 0.606, 0, 0, 0.55556],
      "8747": [0.30612, 0.805, 0.19445, 0, 0.47222],
      "8748": [0.306, 0.805, 0.19445, 0, 0.47222],
      "8749": [0.306, 0.805, 0.19445, 0, 0.47222],
      "8750": [0.30612, 0.805, 0.19445, 0, 0.47222],
      "8896": [0.25001, 0.75, 0, 0, 0.83334],
      "8897": [0.25001, 0.75, 0, 0, 0.83334],
      "8898": [0.25001, 0.75, 0, 0, 0.83334],
      "8899": [0.25001, 0.75, 0, 0, 0.83334],
      "8968": [0.35001, 0.85, 0, 0, 0.47222],
      "8969": [0.35001, 0.85, 0, 0, 0.47222],
      "8970": [0.35001, 0.85, 0, 0, 0.47222],
      "8971": [0.35001, 0.85, 0, 0, 0.47222],
      "9168": [-99e-5, 0.601, 0, 0, 0.66667],
      "10216": [0.35001, 0.85, 0, 0, 0.47222],
      "10217": [0.35001, 0.85, 0, 0, 0.47222],
      "10752": [0.25001, 0.75, 0, 0, 1.11111],
      "10753": [0.25001, 0.75, 0, 0, 1.11111],
      "10754": [0.25001, 0.75, 0, 0, 1.11111],
      "10756": [0.25001, 0.75, 0, 0, 0.83334],
      "10758": [0.25001, 0.75, 0, 0, 0.83334]
    },
    "Size2-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "40": [0.65002, 1.15, 0, 0, 0.59722],
      "41": [0.65002, 1.15, 0, 0, 0.59722],
      "47": [0.65002, 1.15, 0, 0, 0.81111],
      "91": [0.65002, 1.15, 0, 0, 0.47222],
      "92": [0.65002, 1.15, 0, 0, 0.81111],
      "93": [0.65002, 1.15, 0, 0, 0.47222],
      "123": [0.65002, 1.15, 0, 0, 0.66667],
      "125": [0.65002, 1.15, 0, 0, 0.66667],
      "160": [0, 0, 0, 0, 0.25],
      "710": [0, 0.75, 0, 0, 1],
      "732": [0, 0.75, 0, 0, 1],
      "770": [0, 0.75, 0, 0, 1],
      "771": [0, 0.75, 0, 0, 1],
      "8719": [0.55001, 1.05, 0, 0, 1.27778],
      "8720": [0.55001, 1.05, 0, 0, 1.27778],
      "8721": [0.55001, 1.05, 0, 0, 1.44445],
      "8730": [0.65002, 1.15, 0, 0, 1],
      "8747": [0.86225, 1.36, 0.44445, 0, 0.55556],
      "8748": [0.862, 1.36, 0.44445, 0, 0.55556],
      "8749": [0.862, 1.36, 0.44445, 0, 0.55556],
      "8750": [0.86225, 1.36, 0.44445, 0, 0.55556],
      "8896": [0.55001, 1.05, 0, 0, 1.11111],
      "8897": [0.55001, 1.05, 0, 0, 1.11111],
      "8898": [0.55001, 1.05, 0, 0, 1.11111],
      "8899": [0.55001, 1.05, 0, 0, 1.11111],
      "8968": [0.65002, 1.15, 0, 0, 0.52778],
      "8969": [0.65002, 1.15, 0, 0, 0.52778],
      "8970": [0.65002, 1.15, 0, 0, 0.52778],
      "8971": [0.65002, 1.15, 0, 0, 0.52778],
      "10216": [0.65002, 1.15, 0, 0, 0.61111],
      "10217": [0.65002, 1.15, 0, 0, 0.61111],
      "10752": [0.55001, 1.05, 0, 0, 1.51112],
      "10753": [0.55001, 1.05, 0, 0, 1.51112],
      "10754": [0.55001, 1.05, 0, 0, 1.51112],
      "10756": [0.55001, 1.05, 0, 0, 1.11111],
      "10758": [0.55001, 1.05, 0, 0, 1.11111]
    },
    "Size3-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "40": [0.95003, 1.45, 0, 0, 0.73611],
      "41": [0.95003, 1.45, 0, 0, 0.73611],
      "47": [0.95003, 1.45, 0, 0, 1.04445],
      "91": [0.95003, 1.45, 0, 0, 0.52778],
      "92": [0.95003, 1.45, 0, 0, 1.04445],
      "93": [0.95003, 1.45, 0, 0, 0.52778],
      "123": [0.95003, 1.45, 0, 0, 0.75],
      "125": [0.95003, 1.45, 0, 0, 0.75],
      "160": [0, 0, 0, 0, 0.25],
      "710": [0, 0.75, 0, 0, 1.44445],
      "732": [0, 0.75, 0, 0, 1.44445],
      "770": [0, 0.75, 0, 0, 1.44445],
      "771": [0, 0.75, 0, 0, 1.44445],
      "8730": [0.95003, 1.45, 0, 0, 1],
      "8968": [0.95003, 1.45, 0, 0, 0.58334],
      "8969": [0.95003, 1.45, 0, 0, 0.58334],
      "8970": [0.95003, 1.45, 0, 0, 0.58334],
      "8971": [0.95003, 1.45, 0, 0, 0.58334],
      "10216": [0.95003, 1.45, 0, 0, 0.75],
      "10217": [0.95003, 1.45, 0, 0, 0.75]
    },
    "Size4-Regular": {
      "32": [0, 0, 0, 0, 0.25],
      "40": [1.25003, 1.75, 0, 0, 0.79167],
      "41": [1.25003, 1.75, 0, 0, 0.79167],
      "47": [1.25003, 1.75, 0, 0, 1.27778],
      "91": [1.25003, 1.75, 0, 0, 0.58334],
      "92": [1.25003, 1.75, 0, 0, 1.27778],
      "93": [1.25003, 1.75, 0, 0, 0.58334],
      "123": [1.25003, 1.75, 0, 0, 0.80556],
      "125": [1.25003, 1.75, 0, 0, 0.80556],
      "160": [0, 0, 0, 0, 0.25],
      "710": [0, 0.825, 0, 0, 1.8889],
      "732": [0, 0.825, 0, 0, 1.8889],
      "770": [0, 0.825, 0, 0, 1.8889],
      "771": [0, 0.825, 0, 0, 1.8889],
      "8730": [1.25003, 1.75, 0, 0, 1],
      "8968": [1.25003, 1.75, 0, 0, 0.63889],
      "8969": [1.25003, 1.75, 0, 0, 0.63889],
      "8970": [1.25003, 1.75, 0, 0, 0.63889],
      "8971": [1.25003, 1.75, 0, 0, 0.63889],
      "9115": [0.64502, 1.155, 0, 0, 0.875],
      "9116": [1e-5, 0.6, 0, 0, 0.875],
      "9117": [0.64502, 1.155, 0, 0, 0.875],
      "9118": [0.64502, 1.155, 0, 0, 0.875],
      "9119": [1e-5, 0.6, 0, 0, 0.875],
      "9120": [0.64502, 1.155, 0, 0, 0.875],
      "9121": [0.64502, 1.155, 0, 0, 0.66667],
      "9122": [-99e-5, 0.601, 0, 0, 0.66667],
      "9123": [0.64502, 1.155, 0, 0, 0.66667],
      "9124": [0.64502, 1.155, 0, 0, 0.66667],
      "9125": [-99e-5, 0.601, 0, 0, 0.66667],
      "9126": [0.64502, 1.155, 0, 0, 0.66667],
      "9127": [1e-5, 0.9, 0, 0, 0.88889],
      "9128": [0.65002, 1.15, 0, 0, 0.88889],
      "9129": [0.90001, 0, 0, 0, 0.88889],
      "9130": [0, 0.3, 0, 0, 0.88889],
      "9131": [1e-5, 0.9, 0, 0, 0.88889],
      "9132": [0.65002, 1.15, 0, 0, 0.88889],
      "9133": [0.90001, 0, 0, 0, 0.88889],
      "9143": [0.88502, 0.915, 0, 0, 1.05556],
      "10216": [1.25003, 1.75, 0, 0, 0.80556],
      "10217": [1.25003, 1.75, 0, 0, 0.80556],
      "57344": [-499e-5, 0.605, 0, 0, 1.05556],
      "57345": [-499e-5, 0.605, 0, 0, 1.05556],
      "57680": [0, 0.12, 0, 0, 0.45],
      "57681": [0, 0.12, 0, 0, 0.45],
      "57682": [0, 0.12, 0, 0, 0.45],
      "57683": [0, 0.12, 0, 0, 0.45]
    },
    "Typewriter-Regular": {
      "32": [0, 0, 0, 0, 0.525],
      "33": [0, 0.61111, 0, 0, 0.525],
      "34": [0, 0.61111, 0, 0, 0.525],
      "35": [0, 0.61111, 0, 0, 0.525],
      "36": [0.08333, 0.69444, 0, 0, 0.525],
      "37": [0.08333, 0.69444, 0, 0, 0.525],
      "38": [0, 0.61111, 0, 0, 0.525],
      "39": [0, 0.61111, 0, 0, 0.525],
      "40": [0.08333, 0.69444, 0, 0, 0.525],
      "41": [0.08333, 0.69444, 0, 0, 0.525],
      "42": [0, 0.52083, 0, 0, 0.525],
      "43": [-0.08056, 0.53055, 0, 0, 0.525],
      "44": [0.13889, 0.125, 0, 0, 0.525],
      "45": [-0.08056, 0.53055, 0, 0, 0.525],
      "46": [0, 0.125, 0, 0, 0.525],
      "47": [0.08333, 0.69444, 0, 0, 0.525],
      "48": [0, 0.61111, 0, 0, 0.525],
      "49": [0, 0.61111, 0, 0, 0.525],
      "50": [0, 0.61111, 0, 0, 0.525],
      "51": [0, 0.61111, 0, 0, 0.525],
      "52": [0, 0.61111, 0, 0, 0.525],
      "53": [0, 0.61111, 0, 0, 0.525],
      "54": [0, 0.61111, 0, 0, 0.525],
      "55": [0, 0.61111, 0, 0, 0.525],
      "56": [0, 0.61111, 0, 0, 0.525],
      "57": [0, 0.61111, 0, 0, 0.525],
      "58": [0, 0.43056, 0, 0, 0.525],
      "59": [0.13889, 0.43056, 0, 0, 0.525],
      "60": [-0.05556, 0.55556, 0, 0, 0.525],
      "61": [-0.19549, 0.41562, 0, 0, 0.525],
      "62": [-0.05556, 0.55556, 0, 0, 0.525],
      "63": [0, 0.61111, 0, 0, 0.525],
      "64": [0, 0.61111, 0, 0, 0.525],
      "65": [0, 0.61111, 0, 0, 0.525],
      "66": [0, 0.61111, 0, 0, 0.525],
      "67": [0, 0.61111, 0, 0, 0.525],
      "68": [0, 0.61111, 0, 0, 0.525],
      "69": [0, 0.61111, 0, 0, 0.525],
      "70": [0, 0.61111, 0, 0, 0.525],
      "71": [0, 0.61111, 0, 0, 0.525],
      "72": [0, 0.61111, 0, 0, 0.525],
      "73": [0, 0.61111, 0, 0, 0.525],
      "74": [0, 0.61111, 0, 0, 0.525],
      "75": [0, 0.61111, 0, 0, 0.525],
      "76": [0, 0.61111, 0, 0, 0.525],
      "77": [0, 0.61111, 0, 0, 0.525],
      "78": [0, 0.61111, 0, 0, 0.525],
      "79": [0, 0.61111, 0, 0, 0.525],
      "80": [0, 0.61111, 0, 0, 0.525],
      "81": [0.13889, 0.61111, 0, 0, 0.525],
      "82": [0, 0.61111, 0, 0, 0.525],
      "83": [0, 0.61111, 0, 0, 0.525],
      "84": [0, 0.61111, 0, 0, 0.525],
      "85": [0, 0.61111, 0, 0, 0.525],
      "86": [0, 0.61111, 0, 0, 0.525],
      "87": [0, 0.61111, 0, 0, 0.525],
      "88": [0, 0.61111, 0, 0, 0.525],
      "89": [0, 0.61111, 0, 0, 0.525],
      "90": [0, 0.61111, 0, 0, 0.525],
      "91": [0.08333, 0.69444, 0, 0, 0.525],
      "92": [0.08333, 0.69444, 0, 0, 0.525],
      "93": [0.08333, 0.69444, 0, 0, 0.525],
      "94": [0, 0.61111, 0, 0, 0.525],
      "95": [0.09514, 0, 0, 0, 0.525],
      "96": [0, 0.61111, 0, 0, 0.525],
      "97": [0, 0.43056, 0, 0, 0.525],
      "98": [0, 0.61111, 0, 0, 0.525],
      "99": [0, 0.43056, 0, 0, 0.525],
      "100": [0, 0.61111, 0, 0, 0.525],
      "101": [0, 0.43056, 0, 0, 0.525],
      "102": [0, 0.61111, 0, 0, 0.525],
      "103": [0.22222, 0.43056, 0, 0, 0.525],
      "104": [0, 0.61111, 0, 0, 0.525],
      "105": [0, 0.61111, 0, 0, 0.525],
      "106": [0.22222, 0.61111, 0, 0, 0.525],
      "107": [0, 0.61111, 0, 0, 0.525],
      "108": [0, 0.61111, 0, 0, 0.525],
      "109": [0, 0.43056, 0, 0, 0.525],
      "110": [0, 0.43056, 0, 0, 0.525],
      "111": [0, 0.43056, 0, 0, 0.525],
      "112": [0.22222, 0.43056, 0, 0, 0.525],
      "113": [0.22222, 0.43056, 0, 0, 0.525],
      "114": [0, 0.43056, 0, 0, 0.525],
      "115": [0, 0.43056, 0, 0, 0.525],
      "116": [0, 0.55358, 0, 0, 0.525],
      "117": [0, 0.43056, 0, 0, 0.525],
      "118": [0, 0.43056, 0, 0, 0.525],
      "119": [0, 0.43056, 0, 0, 0.525],
      "120": [0, 0.43056, 0, 0, 0.525],
      "121": [0.22222, 0.43056, 0, 0, 0.525],
      "122": [0, 0.43056, 0, 0, 0.525],
      "123": [0.08333, 0.69444, 0, 0, 0.525],
      "124": [0.08333, 0.69444, 0, 0, 0.525],
      "125": [0.08333, 0.69444, 0, 0, 0.525],
      "126": [0, 0.61111, 0, 0, 0.525],
      "127": [0, 0.61111, 0, 0, 0.525],
      "160": [0, 0, 0, 0, 0.525],
      "176": [0, 0.61111, 0, 0, 0.525],
      "184": [0.19445, 0, 0, 0, 0.525],
      "305": [0, 0.43056, 0, 0, 0.525],
      "567": [0.22222, 0.43056, 0, 0, 0.525],
      "711": [0, 0.56597, 0, 0, 0.525],
      "713": [0, 0.56555, 0, 0, 0.525],
      "714": [0, 0.61111, 0, 0, 0.525],
      "715": [0, 0.61111, 0, 0, 0.525],
      "728": [0, 0.61111, 0, 0, 0.525],
      "730": [0, 0.61111, 0, 0, 0.525],
      "770": [0, 0.61111, 0, 0, 0.525],
      "771": [0, 0.61111, 0, 0, 0.525],
      "776": [0, 0.61111, 0, 0, 0.525],
      "915": [0, 0.61111, 0, 0, 0.525],
      "916": [0, 0.61111, 0, 0, 0.525],
      "920": [0, 0.61111, 0, 0, 0.525],
      "923": [0, 0.61111, 0, 0, 0.525],
      "926": [0, 0.61111, 0, 0, 0.525],
      "928": [0, 0.61111, 0, 0, 0.525],
      "931": [0, 0.61111, 0, 0, 0.525],
      "933": [0, 0.61111, 0, 0, 0.525],
      "934": [0, 0.61111, 0, 0, 0.525],
      "936": [0, 0.61111, 0, 0, 0.525],
      "937": [0, 0.61111, 0, 0, 0.525],
      "8216": [0, 0.61111, 0, 0, 0.525],
      "8217": [0, 0.61111, 0, 0, 0.525],
      "8242": [0, 0.61111, 0, 0, 0.525],
      "9251": [0.11111, 0.21944, 0, 0, 0.525]
    }
  };
  var sigmasAndXis = {
    slant: [0.25, 0.25, 0.25],
    // sigma1
    space: [0, 0, 0],
    // sigma2
    stretch: [0, 0, 0],
    // sigma3
    shrink: [0, 0, 0],
    // sigma4
    xHeight: [0.431, 0.431, 0.431],
    // sigma5
    quad: [1, 1.171, 1.472],
    // sigma6
    extraSpace: [0, 0, 0],
    // sigma7
    num1: [0.677, 0.732, 0.925],
    // sigma8
    num2: [0.394, 0.384, 0.387],
    // sigma9
    num3: [0.444, 0.471, 0.504],
    // sigma10
    denom1: [0.686, 0.752, 1.025],
    // sigma11
    denom2: [0.345, 0.344, 0.532],
    // sigma12
    sup1: [0.413, 0.503, 0.504],
    // sigma13
    sup2: [0.363, 0.431, 0.404],
    // sigma14
    sup3: [0.289, 0.286, 0.294],
    // sigma15
    sub1: [0.15, 0.143, 0.2],
    // sigma16
    sub2: [0.247, 0.286, 0.4],
    // sigma17
    supDrop: [0.386, 0.353, 0.494],
    // sigma18
    subDrop: [0.05, 0.071, 0.1],
    // sigma19
    delim1: [2.39, 1.7, 1.98],
    // sigma20
    delim2: [1.01, 1.157, 1.42],
    // sigma21
    axisHeight: [0.25, 0.25, 0.25],
    // sigma22
    // These font metrics are extracted from TeX by using tftopl on cmex10.tfm;
    // they correspond to the font parameters of the extension fonts (family 3).
    // See the TeXbook, page 441. In AMSTeX, the extension fonts scale; to
    // match cmex7, we'd use cmex7.tfm values for script and scriptscript
    // values.
    defaultRuleThickness: [0.04, 0.049, 0.049],
    // xi8; cmex7: 0.049
    bigOpSpacing1: [0.111, 0.111, 0.111],
    // xi9
    bigOpSpacing2: [0.166, 0.166, 0.166],
    // xi10
    bigOpSpacing3: [0.2, 0.2, 0.2],
    // xi11
    bigOpSpacing4: [0.6, 0.611, 0.611],
    // xi12; cmex7: 0.611
    bigOpSpacing5: [0.1, 0.143, 0.143],
    // xi13; cmex7: 0.143
    // The \sqrt rule width is taken from the height of the surd character.
    // Since we use the same font at all sizes, this thickness doesn't scale.
    sqrtRuleThickness: [0.04, 0.04, 0.04],
    // This value determines how large a pt is, for metrics which are defined
    // in terms of pts.
    // This value is also used in katex.scss; if you change it make sure the
    // values match.
    ptPerEm: [10, 10, 10],
    // The space between adjacent `|` columns in an array definition. From
    // `\showthe\doublerulesep` in LaTeX. Equals 2.0 / ptPerEm.
    doubleRuleSep: [0.2, 0.2, 0.2],
    // The width of separator lines in {array} environments. From
    // `\showthe\arrayrulewidth` in LaTeX. Equals 0.4 / ptPerEm.
    arrayRuleWidth: [0.04, 0.04, 0.04],
    // Two values from LaTeX source2e:
    fboxsep: [0.3, 0.3, 0.3],
    //        3 pt / ptPerEm
    fboxrule: [0.04, 0.04, 0.04]
    // 0.4 pt / ptPerEm
  };
  var extraCharacterMap = {
    // Latin-1
    "\xC5": "A",
    "\xD0": "D",
    "\xDE": "o",
    "\xE5": "a",
    "\xF0": "d",
    "\xFE": "o",
    // Cyrillic
    "\u0410": "A",
    "\u0411": "B",
    "\u0412": "B",
    "\u0413": "F",
    "\u0414": "A",
    "\u0415": "E",
    "\u0416": "K",
    "\u0417": "3",
    "\u0418": "N",
    "\u0419": "N",
    "\u041A": "K",
    "\u041B": "N",
    "\u041C": "M",
    "\u041D": "H",
    "\u041E": "O",
    "\u041F": "N",
    "\u0420": "P",
    "\u0421": "C",
    "\u0422": "T",
    "\u0423": "y",
    "\u0424": "O",
    "\u0425": "X",
    "\u0426": "U",
    "\u0427": "h",
    "\u0428": "W",
    "\u0429": "W",
    "\u042A": "B",
    "\u042B": "X",
    "\u042C": "B",
    "\u042D": "3",
    "\u042E": "X",
    "\u042F": "R",
    "\u0430": "a",
    "\u0431": "b",
    "\u0432": "a",
    "\u0433": "r",
    "\u0434": "y",
    "\u0435": "e",
    "\u0436": "m",
    "\u0437": "e",
    "\u0438": "n",
    "\u0439": "n",
    "\u043A": "n",
    "\u043B": "n",
    "\u043C": "m",
    "\u043D": "n",
    "\u043E": "o",
    "\u043F": "n",
    "\u0440": "p",
    "\u0441": "c",
    "\u0442": "o",
    "\u0443": "y",
    "\u0444": "b",
    "\u0445": "x",
    "\u0446": "n",
    "\u0447": "n",
    "\u0448": "w",
    "\u0449": "w",
    "\u044A": "a",
    "\u044B": "m",
    "\u044C": "a",
    "\u044D": "e",
    "\u044E": "m",
    "\u044F": "r"
  };
  function setFontMetrics(fontName, metrics) {
    fontMetricsData[fontName] = metrics;
  }
  function getCharacterMetrics(character, font, mode) {
    if (!fontMetricsData[font]) {
      throw new Error("Font metrics not found for font: " + font + ".");
    }
    var ch2 = character.charCodeAt(0);
    var metrics = fontMetricsData[font][ch2];
    if (!metrics && character[0] in extraCharacterMap) {
      ch2 = extraCharacterMap[character[0]].charCodeAt(0);
      metrics = fontMetricsData[font][ch2];
    }
    if (!metrics && mode === "text") {
      if (supportedCodepoint(ch2)) {
        metrics = fontMetricsData[font][77];
      }
    }
    if (metrics) {
      return {
        depth: metrics[0],
        height: metrics[1],
        italic: metrics[2],
        skew: metrics[3],
        width: metrics[4]
      };
    }
  }
  var fontMetricsBySizeIndex = {};
  function getGlobalMetrics(size) {
    var sizeIndex;
    if (size >= 5) {
      sizeIndex = 0;
    } else if (size >= 3) {
      sizeIndex = 1;
    } else {
      sizeIndex = 2;
    }
    if (!fontMetricsBySizeIndex[sizeIndex]) {
      var metrics = fontMetricsBySizeIndex[sizeIndex] = {
        cssEmPerMu: sigmasAndXis.quad[sizeIndex] / 18
      };
      for (var key in sigmasAndXis) {
        if (sigmasAndXis.hasOwnProperty(key)) {
          metrics[key] = sigmasAndXis[key][sizeIndex];
        }
      }
    }
    return fontMetricsBySizeIndex[sizeIndex];
  }
  var sizeStyleMap = [
    // Each element contains [textsize, scriptsize, scriptscriptsize].
    // The size mappings are taken from TeX with \normalsize=10pt.
    [1, 1, 1],
    // size1: [5, 5, 5]              \tiny
    [2, 1, 1],
    // size2: [6, 5, 5]
    [3, 1, 1],
    // size3: [7, 5, 5]              \scriptsize
    [4, 2, 1],
    // size4: [8, 6, 5]              \footnotesize
    [5, 2, 1],
    // size5: [9, 6, 5]              \small
    [6, 3, 1],
    // size6: [10, 7, 5]             \normalsize
    [7, 4, 2],
    // size7: [12, 8, 6]             \large
    [8, 6, 3],
    // size8: [14.4, 10, 7]          \Large
    [9, 7, 6],
    // size9: [17.28, 12, 10]        \LARGE
    [10, 8, 7],
    // size10: [20.74, 14.4, 12]     \huge
    [11, 10, 9]
    // size11: [24.88, 20.74, 17.28] \HUGE
  ];
  var sizeMultipliers = [
    // fontMetrics.js:getGlobalMetrics also uses size indexes, so if
    // you change size indexes, change that function.
    0.5,
    0.6,
    0.7,
    0.8,
    0.9,
    1,
    1.2,
    1.44,
    1.728,
    2.074,
    2.488
  ];
  var sizeAtStyle = function sizeAtStyle2(size, style) {
    return style.size < 2 ? size : sizeStyleMap[size - 1][style.size - 1];
  };
  var Options = class _Options {
    // A font family applies to a group of fonts (i.e. SansSerif), while a font
    // represents a specific font (i.e. SansSerif Bold).
    // See: https://tex.stackexchange.com/questions/22350/difference-between-textrm-and-mathrm
    /**
     * The base size index.
     */
    constructor(data) {
      this.style = void 0;
      this.color = void 0;
      this.size = void 0;
      this.textSize = void 0;
      this.phantom = void 0;
      this.font = void 0;
      this.fontFamily = void 0;
      this.fontWeight = void 0;
      this.fontShape = void 0;
      this.sizeMultiplier = void 0;
      this.maxSize = void 0;
      this.minRuleThickness = void 0;
      this._fontMetrics = void 0;
      this.style = data.style;
      this.color = data.color;
      this.size = data.size || _Options.BASESIZE;
      this.textSize = data.textSize || this.size;
      this.phantom = !!data.phantom;
      this.font = data.font || "";
      this.fontFamily = data.fontFamily || "";
      this.fontWeight = data.fontWeight || "";
      this.fontShape = data.fontShape || "";
      this.sizeMultiplier = sizeMultipliers[this.size - 1];
      this.maxSize = data.maxSize;
      this.minRuleThickness = data.minRuleThickness;
      this._fontMetrics = void 0;
    }
    /**
     * Returns a new options object with the same properties as "this".  Properties
     * from "extension" will be copied to the new options object.
     */
    extend(extension) {
      var data = {
        style: this.style,
        size: this.size,
        textSize: this.textSize,
        color: this.color,
        phantom: this.phantom,
        font: this.font,
        fontFamily: this.fontFamily,
        fontWeight: this.fontWeight,
        fontShape: this.fontShape,
        maxSize: this.maxSize,
        minRuleThickness: this.minRuleThickness
      };
      for (var key in extension) {
        if (extension.hasOwnProperty(key)) {
          data[key] = extension[key];
        }
      }
      return new _Options(data);
    }
    /**
     * Return an options object with the given style. If `this.style === style`,
     * returns `this`.
     */
    havingStyle(style) {
      if (this.style === style) {
        return this;
      } else {
        return this.extend({
          style,
          size: sizeAtStyle(this.textSize, style)
        });
      }
    }
    /**
     * Return an options object with a cramped version of the current style. If
     * the current style is cramped, returns `this`.
     */
    havingCrampedStyle() {
      return this.havingStyle(this.style.cramp());
    }
    /**
     * Return an options object with the given size and in at least `\textstyle`.
     * Returns `this` if appropriate.
     */
    havingSize(size) {
      if (this.size === size && this.textSize === size) {
        return this;
      } else {
        return this.extend({
          style: this.style.text(),
          size,
          textSize: size,
          sizeMultiplier: sizeMultipliers[size - 1]
        });
      }
    }
    /**
     * Like `this.havingSize(BASESIZE).havingStyle(style)`. If `style` is omitted,
     * changes to at least `\textstyle`.
     */
    havingBaseStyle(style) {
      style = style || this.style.text();
      var wantSize = sizeAtStyle(_Options.BASESIZE, style);
      if (this.size === wantSize && this.textSize === _Options.BASESIZE && this.style === style) {
        return this;
      } else {
        return this.extend({
          style,
          size: wantSize
        });
      }
    }
    /**
     * Remove the effect of sizing changes such as \Huge.
     * Keep the effect of the current style, such as \scriptstyle.
     */
    havingBaseSizing() {
      var size;
      switch (this.style.id) {
        case 4:
        case 5:
          size = 3;
          break;
        case 6:
        case 7:
          size = 1;
          break;
        default:
          size = 6;
      }
      return this.extend({
        style: this.style.text(),
        size
      });
    }
    /**
     * Create a new options object with the given color.
     */
    withColor(color) {
      return this.extend({
        color
      });
    }
    /**
     * Create a new options object with "phantom" set to true.
     */
    withPhantom() {
      return this.extend({
        phantom: true
      });
    }
    /**
     * Creates a new options object with the given math font or old text font.
     * @type {[type]}
     */
    withFont(font) {
      return this.extend({
        font
      });
    }
    /**
     * Create a new options objects with the given fontFamily.
     */
    withTextFontFamily(fontFamily) {
      return this.extend({
        fontFamily,
        font: ""
      });
    }
    /**
     * Creates a new options object with the given font weight
     */
    withTextFontWeight(fontWeight) {
      return this.extend({
        fontWeight,
        font: ""
      });
    }
    /**
     * Creates a new options object with the given font weight
     */
    withTextFontShape(fontShape) {
      return this.extend({
        fontShape,
        font: ""
      });
    }
    /**
     * Return the CSS sizing classes required to switch from enclosing options
     * `oldOptions` to `this`. Returns an array of classes.
     */
    sizingClasses(oldOptions) {
      if (oldOptions.size !== this.size) {
        return ["sizing", "reset-size" + oldOptions.size, "size" + this.size];
      } else {
        return [];
      }
    }
    /**
     * Return the CSS sizing classes required to switch to the base size. Like
     * `this.havingSize(BASESIZE).sizingClasses(this)`.
     */
    baseSizingClasses() {
      if (this.size !== _Options.BASESIZE) {
        return ["sizing", "reset-size" + this.size, "size" + _Options.BASESIZE];
      } else {
        return [];
      }
    }
    /**
     * Return the font metrics for this size.
     */
    fontMetrics() {
      if (!this._fontMetrics) {
        this._fontMetrics = getGlobalMetrics(this.size);
      }
      return this._fontMetrics;
    }
    /**
     * Gets the CSS color of the current options object
     */
    getColor() {
      if (this.phantom) {
        return "transparent";
      } else {
        return this.color;
      }
    }
  };
  Options.BASESIZE = 6;
  var ptPerUnit = {
    // https://en.wikibooks.org/wiki/LaTeX/Lengths and
    // https://tex.stackexchange.com/a/8263
    "pt": 1,
    // TeX point
    "mm": 7227 / 2540,
    // millimeter
    "cm": 7227 / 254,
    // centimeter
    "in": 72.27,
    // inch
    "bp": 803 / 800,
    // big (PostScript) points
    "pc": 12,
    // pica
    "dd": 1238 / 1157,
    // didot
    "cc": 14856 / 1157,
    // cicero (12 didot)
    "nd": 685 / 642,
    // new didot
    "nc": 1370 / 107,
    // new cicero (12 new didot)
    "sp": 1 / 65536,
    // scaled point (TeX's internal smallest unit)
    // https://tex.stackexchange.com/a/41371
    "px": 803 / 800
    // \pdfpxdimen defaults to 1 bp in pdfTeX and LuaTeX
  };
  var relativeUnit = {
    "ex": true,
    "em": true,
    "mu": true
  };
  var validUnit = function validUnit2(unit) {
    if (typeof unit !== "string") {
      unit = unit.unit;
    }
    return unit in ptPerUnit || unit in relativeUnit || unit === "ex";
  };
  var calculateSize = function calculateSize2(sizeValue, options) {
    var scale;
    if (sizeValue.unit in ptPerUnit) {
      scale = ptPerUnit[sizeValue.unit] / options.fontMetrics().ptPerEm / options.sizeMultiplier;
    } else if (sizeValue.unit === "mu") {
      scale = options.fontMetrics().cssEmPerMu;
    } else {
      var unitOptions;
      if (options.style.isTight()) {
        unitOptions = options.havingStyle(options.style.text());
      } else {
        unitOptions = options;
      }
      if (sizeValue.unit === "ex") {
        scale = unitOptions.fontMetrics().xHeight;
      } else if (sizeValue.unit === "em") {
        scale = unitOptions.fontMetrics().quad;
      } else {
        throw new ParseError("Invalid unit: '" + sizeValue.unit + "'");
      }
      if (unitOptions !== options) {
        scale *= unitOptions.sizeMultiplier / options.sizeMultiplier;
      }
    }
    return Math.min(sizeValue.number * scale, options.maxSize);
  };
  var makeEm = function makeEm2(n) {
    return +n.toFixed(4) + "em";
  };
  var createClass = function createClass2(classes) {
    return classes.filter((cls) => cls).join(" ");
  };
  var initNode = function initNode2(classes, options, style) {
    this.classes = classes || [];
    this.attributes = {};
    this.height = 0;
    this.depth = 0;
    this.maxFontSize = 0;
    this.style = style || {};
    if (options) {
      if (options.style.isTight()) {
        this.classes.push("mtight");
      }
      var color = options.getColor();
      if (color) {
        this.style.color = color;
      }
    }
  };
  var toNode = function toNode2(tagName) {
    var node = document.createElement(tagName);
    node.className = createClass(this.classes);
    for (var style in this.style) {
      if (this.style.hasOwnProperty(style)) {
        node.style[style] = this.style[style];
      }
    }
    for (var attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        node.setAttribute(attr, this.attributes[attr]);
      }
    }
    for (var i2 = 0; i2 < this.children.length; i2++) {
      node.appendChild(this.children[i2].toNode());
    }
    return node;
  };
  var invalidAttributeNameRegex = /[\s"'>/=\x00-\x1f]/;
  var toMarkup = function toMarkup2(tagName) {
    var markup = "<" + tagName;
    if (this.classes.length) {
      markup += ' class="' + utils.escape(createClass(this.classes)) + '"';
    }
    var styles2 = "";
    for (var style in this.style) {
      if (this.style.hasOwnProperty(style)) {
        styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
      }
    }
    if (styles2) {
      markup += ' style="' + utils.escape(styles2) + '"';
    }
    for (var attr in this.attributes) {
      if (this.attributes.hasOwnProperty(attr)) {
        if (invalidAttributeNameRegex.test(attr)) {
          throw new ParseError("Invalid attribute name '" + attr + "'");
        }
        markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
      }
    }
    markup += ">";
    for (var i2 = 0; i2 < this.children.length; i2++) {
      markup += this.children[i2].toMarkup();
    }
    markup += "</" + tagName + ">";
    return markup;
  };
  var Span = class {
    constructor(classes, children, options, style) {
      this.children = void 0;
      this.attributes = void 0;
      this.classes = void 0;
      this.height = void 0;
      this.depth = void 0;
      this.width = void 0;
      this.maxFontSize = void 0;
      this.style = void 0;
      initNode.call(this, classes, options, style);
      this.children = children || [];
    }
    /**
     * Sets an arbitrary attribute on the span. Warning: use this wisely. Not
     * all browsers support attributes the same, and having too many custom
     * attributes is probably bad.
     */
    setAttribute(attribute, value) {
      this.attributes[attribute] = value;
    }
    hasClass(className) {
      return this.classes.includes(className);
    }
    toNode() {
      return toNode.call(this, "span");
    }
    toMarkup() {
      return toMarkup.call(this, "span");
    }
  };
  var Anchor = class {
    constructor(href, classes, children, options) {
      this.children = void 0;
      this.attributes = void 0;
      this.classes = void 0;
      this.height = void 0;
      this.depth = void 0;
      this.maxFontSize = void 0;
      this.style = void 0;
      initNode.call(this, classes, options);
      this.children = children || [];
      this.setAttribute("href", href);
    }
    setAttribute(attribute, value) {
      this.attributes[attribute] = value;
    }
    hasClass(className) {
      return this.classes.includes(className);
    }
    toNode() {
      return toNode.call(this, "a");
    }
    toMarkup() {
      return toMarkup.call(this, "a");
    }
  };
  var Img = class {
    constructor(src, alt, style) {
      this.src = void 0;
      this.alt = void 0;
      this.classes = void 0;
      this.height = void 0;
      this.depth = void 0;
      this.maxFontSize = void 0;
      this.style = void 0;
      this.alt = alt;
      this.src = src;
      this.classes = ["mord"];
      this.style = style;
    }
    hasClass(className) {
      return this.classes.includes(className);
    }
    toNode() {
      var node = document.createElement("img");
      node.src = this.src;
      node.alt = this.alt;
      node.className = "mord";
      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          node.style[style] = this.style[style];
        }
      }
      return node;
    }
    toMarkup() {
      var markup = '<img src="' + utils.escape(this.src) + '"' + (' alt="' + utils.escape(this.alt) + '"');
      var styles2 = "";
      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
      }
      if (styles2) {
        markup += ' style="' + utils.escape(styles2) + '"';
      }
      markup += "'/>";
      return markup;
    }
  };
  var iCombinations = {
    "\xEE": "\u0131\u0302",
    "\xEF": "\u0131\u0308",
    "\xED": "\u0131\u0301",
    // 'ī': '\u0131\u0304', // enable when we add Extended Latin
    "\xEC": "\u0131\u0300"
  };
  var SymbolNode = class {
    constructor(text2, height, depth, italic, skew, width, classes, style) {
      this.text = void 0;
      this.height = void 0;
      this.depth = void 0;
      this.italic = void 0;
      this.skew = void 0;
      this.width = void 0;
      this.maxFontSize = void 0;
      this.classes = void 0;
      this.style = void 0;
      this.text = text2;
      this.height = height || 0;
      this.depth = depth || 0;
      this.italic = italic || 0;
      this.skew = skew || 0;
      this.width = width || 0;
      this.classes = classes || [];
      this.style = style || {};
      this.maxFontSize = 0;
      var script = scriptFromCodepoint(this.text.charCodeAt(0));
      if (script) {
        this.classes.push(script + "_fallback");
      }
      if (/[îïíì]/.test(this.text)) {
        this.text = iCombinations[this.text];
      }
    }
    hasClass(className) {
      return this.classes.includes(className);
    }
    /**
     * Creates a text node or span from a symbol node. Note that a span is only
     * created if it is needed.
     */
    toNode() {
      var node = document.createTextNode(this.text);
      var span = null;
      if (this.italic > 0) {
        span = document.createElement("span");
        span.style.marginRight = makeEm(this.italic);
      }
      if (this.classes.length > 0) {
        span = span || document.createElement("span");
        span.className = createClass(this.classes);
      }
      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          span = span || document.createElement("span");
          span.style[style] = this.style[style];
        }
      }
      if (span) {
        span.appendChild(node);
        return span;
      } else {
        return node;
      }
    }
    /**
     * Creates markup for a symbol node.
     */
    toMarkup() {
      var needsSpan = false;
      var markup = "<span";
      if (this.classes.length) {
        needsSpan = true;
        markup += ' class="';
        markup += utils.escape(createClass(this.classes));
        markup += '"';
      }
      var styles2 = "";
      if (this.italic > 0) {
        styles2 += "margin-right:" + this.italic + "em;";
      }
      for (var style in this.style) {
        if (this.style.hasOwnProperty(style)) {
          styles2 += utils.hyphenate(style) + ":" + this.style[style] + ";";
        }
      }
      if (styles2) {
        needsSpan = true;
        markup += ' style="' + utils.escape(styles2) + '"';
      }
      var escaped = utils.escape(this.text);
      if (needsSpan) {
        markup += ">";
        markup += escaped;
        markup += "</span>";
        return markup;
      } else {
        return escaped;
      }
    }
  };
  var SvgNode = class {
    constructor(children, attributes) {
      this.children = void 0;
      this.attributes = void 0;
      this.children = children || [];
      this.attributes = attributes || {};
    }
    toNode() {
      var svgNS = "http://www.w3.org/2000/svg";
      var node = document.createElementNS(svgNS, "svg");
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          node.setAttribute(attr, this.attributes[attr]);
        }
      }
      for (var i2 = 0; i2 < this.children.length; i2++) {
        node.appendChild(this.children[i2].toNode());
      }
      return node;
    }
    toMarkup() {
      var markup = '<svg xmlns="http://www.w3.org/2000/svg"';
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
        }
      }
      markup += ">";
      for (var i2 = 0; i2 < this.children.length; i2++) {
        markup += this.children[i2].toMarkup();
      }
      markup += "</svg>";
      return markup;
    }
  };
  var PathNode = class {
    constructor(pathName, alternate) {
      this.pathName = void 0;
      this.alternate = void 0;
      this.pathName = pathName;
      this.alternate = alternate;
    }
    toNode() {
      var svgNS = "http://www.w3.org/2000/svg";
      var node = document.createElementNS(svgNS, "path");
      if (this.alternate) {
        node.setAttribute("d", this.alternate);
      } else {
        node.setAttribute("d", path[this.pathName]);
      }
      return node;
    }
    toMarkup() {
      if (this.alternate) {
        return '<path d="' + utils.escape(this.alternate) + '"/>';
      } else {
        return '<path d="' + utils.escape(path[this.pathName]) + '"/>';
      }
    }
  };
  var LineNode = class {
    constructor(attributes) {
      this.attributes = void 0;
      this.attributes = attributes || {};
    }
    toNode() {
      var svgNS = "http://www.w3.org/2000/svg";
      var node = document.createElementNS(svgNS, "line");
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          node.setAttribute(attr, this.attributes[attr]);
        }
      }
      return node;
    }
    toMarkup() {
      var markup = "<line";
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          markup += " " + attr + '="' + utils.escape(this.attributes[attr]) + '"';
        }
      }
      markup += "/>";
      return markup;
    }
  };
  function assertSymbolDomNode(group) {
    if (group instanceof SymbolNode) {
      return group;
    } else {
      throw new Error("Expected symbolNode but got " + String(group) + ".");
    }
  }
  function assertSpan(group) {
    if (group instanceof Span) {
      return group;
    } else {
      throw new Error("Expected span<HtmlDomNode> but got " + String(group) + ".");
    }
  }
  var ATOMS = {
    "bin": 1,
    "close": 1,
    "inner": 1,
    "open": 1,
    "punct": 1,
    "rel": 1
  };
  var NON_ATOMS = {
    "accent-token": 1,
    "mathord": 1,
    "op-token": 1,
    "spacing": 1,
    "textord": 1
  };
  var symbols = {
    "math": {},
    "text": {}
  };
  function defineSymbol(mode, font, group, replace, name, acceptUnicodeChar) {
    symbols[mode][name] = {
      font,
      group,
      replace
    };
    if (acceptUnicodeChar && replace) {
      symbols[mode][replace] = symbols[mode][name];
    }
  }
  var math = "math";
  var text = "text";
  var main = "main";
  var ams = "ams";
  var accent = "accent-token";
  var bin = "bin";
  var close = "close";
  var inner = "inner";
  var mathord = "mathord";
  var op = "op-token";
  var open = "open";
  var punct = "punct";
  var rel = "rel";
  var spacing = "spacing";
  var textord = "textord";
  defineSymbol(math, main, rel, "\u2261", "\\equiv", true);
  defineSymbol(math, main, rel, "\u227A", "\\prec", true);
  defineSymbol(math, main, rel, "\u227B", "\\succ", true);
  defineSymbol(math, main, rel, "\u223C", "\\sim", true);
  defineSymbol(math, main, rel, "\u22A5", "\\perp");
  defineSymbol(math, main, rel, "\u2AAF", "\\preceq", true);
  defineSymbol(math, main, rel, "\u2AB0", "\\succeq", true);
  defineSymbol(math, main, rel, "\u2243", "\\simeq", true);
  defineSymbol(math, main, rel, "\u2223", "\\mid", true);
  defineSymbol(math, main, rel, "\u226A", "\\ll", true);
  defineSymbol(math, main, rel, "\u226B", "\\gg", true);
  defineSymbol(math, main, rel, "\u224D", "\\asymp", true);
  defineSymbol(math, main, rel, "\u2225", "\\parallel");
  defineSymbol(math, main, rel, "\u22C8", "\\bowtie", true);
  defineSymbol(math, main, rel, "\u2323", "\\smile", true);
  defineSymbol(math, main, rel, "\u2291", "\\sqsubseteq", true);
  defineSymbol(math, main, rel, "\u2292", "\\sqsupseteq", true);
  defineSymbol(math, main, rel, "\u2250", "\\doteq", true);
  defineSymbol(math, main, rel, "\u2322", "\\frown", true);
  defineSymbol(math, main, rel, "\u220B", "\\ni", true);
  defineSymbol(math, main, rel, "\u221D", "\\propto", true);
  defineSymbol(math, main, rel, "\u22A2", "\\vdash", true);
  defineSymbol(math, main, rel, "\u22A3", "\\dashv", true);
  defineSymbol(math, main, rel, "\u220B", "\\owns");
  defineSymbol(math, main, punct, ".", "\\ldotp");
  defineSymbol(math, main, punct, "\u22C5", "\\cdotp");
  defineSymbol(math, main, textord, "#", "\\#");
  defineSymbol(text, main, textord, "#", "\\#");
  defineSymbol(math, main, textord, "&", "\\&");
  defineSymbol(text, main, textord, "&", "\\&");
  defineSymbol(math, main, textord, "\u2135", "\\aleph", true);
  defineSymbol(math, main, textord, "\u2200", "\\forall", true);
  defineSymbol(math, main, textord, "\u210F", "\\hbar", true);
  defineSymbol(math, main, textord, "\u2203", "\\exists", true);
  defineSymbol(math, main, textord, "\u2207", "\\nabla", true);
  defineSymbol(math, main, textord, "\u266D", "\\flat", true);
  defineSymbol(math, main, textord, "\u2113", "\\ell", true);
  defineSymbol(math, main, textord, "\u266E", "\\natural", true);
  defineSymbol(math, main, textord, "\u2663", "\\clubsuit", true);
  defineSymbol(math, main, textord, "\u2118", "\\wp", true);
  defineSymbol(math, main, textord, "\u266F", "\\sharp", true);
  defineSymbol(math, main, textord, "\u2662", "\\diamondsuit", true);
  defineSymbol(math, main, textord, "\u211C", "\\Re", true);
  defineSymbol(math, main, textord, "\u2661", "\\heartsuit", true);
  defineSymbol(math, main, textord, "\u2111", "\\Im", true);
  defineSymbol(math, main, textord, "\u2660", "\\spadesuit", true);
  defineSymbol(math, main, textord, "\xA7", "\\S", true);
  defineSymbol(text, main, textord, "\xA7", "\\S");
  defineSymbol(math, main, textord, "\xB6", "\\P", true);
  defineSymbol(text, main, textord, "\xB6", "\\P");
  defineSymbol(math, main, textord, "\u2020", "\\dag");
  defineSymbol(text, main, textord, "\u2020", "\\dag");
  defineSymbol(text, main, textord, "\u2020", "\\textdagger");
  defineSymbol(math, main, textord, "\u2021", "\\ddag");
  defineSymbol(text, main, textord, "\u2021", "\\ddag");
  defineSymbol(text, main, textord, "\u2021", "\\textdaggerdbl");
  defineSymbol(math, main, close, "\u23B1", "\\rmoustache", true);
  defineSymbol(math, main, open, "\u23B0", "\\lmoustache", true);
  defineSymbol(math, main, close, "\u27EF", "\\rgroup", true);
  defineSymbol(math, main, open, "\u27EE", "\\lgroup", true);
  defineSymbol(math, main, bin, "\u2213", "\\mp", true);
  defineSymbol(math, main, bin, "\u2296", "\\ominus", true);
  defineSymbol(math, main, bin, "\u228E", "\\uplus", true);
  defineSymbol(math, main, bin, "\u2293", "\\sqcap", true);
  defineSymbol(math, main, bin, "\u2217", "\\ast");
  defineSymbol(math, main, bin, "\u2294", "\\sqcup", true);
  defineSymbol(math, main, bin, "\u25EF", "\\bigcirc", true);
  defineSymbol(math, main, bin, "\u2219", "\\bullet", true);
  defineSymbol(math, main, bin, "\u2021", "\\ddagger");
  defineSymbol(math, main, bin, "\u2240", "\\wr", true);
  defineSymbol(math, main, bin, "\u2A3F", "\\amalg");
  defineSymbol(math, main, bin, "&", "\\And");
  defineSymbol(math, main, rel, "\u27F5", "\\longleftarrow", true);
  defineSymbol(math, main, rel, "\u21D0", "\\Leftarrow", true);
  defineSymbol(math, main, rel, "\u27F8", "\\Longleftarrow", true);
  defineSymbol(math, main, rel, "\u27F6", "\\longrightarrow", true);
  defineSymbol(math, main, rel, "\u21D2", "\\Rightarrow", true);
  defineSymbol(math, main, rel, "\u27F9", "\\Longrightarrow", true);
  defineSymbol(math, main, rel, "\u2194", "\\leftrightarrow", true);
  defineSymbol(math, main, rel, "\u27F7", "\\longleftrightarrow", true);
  defineSymbol(math, main, rel, "\u21D4", "\\Leftrightarrow", true);
  defineSymbol(math, main, rel, "\u27FA", "\\Longleftrightarrow", true);
  defineSymbol(math, main, rel, "\u21A6", "\\mapsto", true);
  defineSymbol(math, main, rel, "\u27FC", "\\longmapsto", true);
  defineSymbol(math, main, rel, "\u2197", "\\nearrow", true);
  defineSymbol(math, main, rel, "\u21A9", "\\hookleftarrow", true);
  defineSymbol(math, main, rel, "\u21AA", "\\hookrightarrow", true);
  defineSymbol(math, main, rel, "\u2198", "\\searrow", true);
  defineSymbol(math, main, rel, "\u21BC", "\\leftharpoonup", true);
  defineSymbol(math, main, rel, "\u21C0", "\\rightharpoonup", true);
  defineSymbol(math, main, rel, "\u2199", "\\swarrow", true);
  defineSymbol(math, main, rel, "\u21BD", "\\leftharpoondown", true);
  defineSymbol(math, main, rel, "\u21C1", "\\rightharpoondown", true);
  defineSymbol(math, main, rel, "\u2196", "\\nwarrow", true);
  defineSymbol(math, main, rel, "\u21CC", "\\rightleftharpoons", true);
  defineSymbol(math, ams, rel, "\u226E", "\\nless", true);
  defineSymbol(math, ams, rel, "\uE010", "\\@nleqslant");
  defineSymbol(math, ams, rel, "\uE011", "\\@nleqq");
  defineSymbol(math, ams, rel, "\u2A87", "\\lneq", true);
  defineSymbol(math, ams, rel, "\u2268", "\\lneqq", true);
  defineSymbol(math, ams, rel, "\uE00C", "\\@lvertneqq");
  defineSymbol(math, ams, rel, "\u22E6", "\\lnsim", true);
  defineSymbol(math, ams, rel, "\u2A89", "\\lnapprox", true);
  defineSymbol(math, ams, rel, "\u2280", "\\nprec", true);
  defineSymbol(math, ams, rel, "\u22E0", "\\npreceq", true);
  defineSymbol(math, ams, rel, "\u22E8", "\\precnsim", true);
  defineSymbol(math, ams, rel, "\u2AB9", "\\precnapprox", true);
  defineSymbol(math, ams, rel, "\u2241", "\\nsim", true);
  defineSymbol(math, ams, rel, "\uE006", "\\@nshortmid");
  defineSymbol(math, ams, rel, "\u2224", "\\nmid", true);
  defineSymbol(math, ams, rel, "\u22AC", "\\nvdash", true);
  defineSymbol(math, ams, rel, "\u22AD", "\\nvDash", true);
  defineSymbol(math, ams, rel, "\u22EA", "\\ntriangleleft");
  defineSymbol(math, ams, rel, "\u22EC", "\\ntrianglelefteq", true);
  defineSymbol(math, ams, rel, "\u228A", "\\subsetneq", true);
  defineSymbol(math, ams, rel, "\uE01A", "\\@varsubsetneq");
  defineSymbol(math, ams, rel, "\u2ACB", "\\subsetneqq", true);
  defineSymbol(math, ams, rel, "\uE017", "\\@varsubsetneqq");
  defineSymbol(math, ams, rel, "\u226F", "\\ngtr", true);
  defineSymbol(math, ams, rel, "\uE00F", "\\@ngeqslant");
  defineSymbol(math, ams, rel, "\uE00E", "\\@ngeqq");
  defineSymbol(math, ams, rel, "\u2A88", "\\gneq", true);
  defineSymbol(math, ams, rel, "\u2269", "\\gneqq", true);
  defineSymbol(math, ams, rel, "\uE00D", "\\@gvertneqq");
  defineSymbol(math, ams, rel, "\u22E7", "\\gnsim", true);
  defineSymbol(math, ams, rel, "\u2A8A", "\\gnapprox", true);
  defineSymbol(math, ams, rel, "\u2281", "\\nsucc", true);
  defineSymbol(math, ams, rel, "\u22E1", "\\nsucceq", true);
  defineSymbol(math, ams, rel, "\u22E9", "\\succnsim", true);
  defineSymbol(math, ams, rel, "\u2ABA", "\\succnapprox", true);
  defineSymbol(math, ams, rel, "\u2246", "\\ncong", true);
  defineSymbol(math, ams, rel, "\uE007", "\\@nshortparallel");
  defineSymbol(math, ams, rel, "\u2226", "\\nparallel", true);
  defineSymbol(math, ams, rel, "\u22AF", "\\nVDash", true);
  defineSymbol(math, ams, rel, "\u22EB", "\\ntriangleright");
  defineSymbol(math, ams, rel, "\u22ED", "\\ntrianglerighteq", true);
  defineSymbol(math, ams, rel, "\uE018", "\\@nsupseteqq");
  defineSymbol(math, ams, rel, "\u228B", "\\supsetneq", true);
  defineSymbol(math, ams, rel, "\uE01B", "\\@varsupsetneq");
  defineSymbol(math, ams, rel, "\u2ACC", "\\supsetneqq", true);
  defineSymbol(math, ams, rel, "\uE019", "\\@varsupsetneqq");
  defineSymbol(math, ams, rel, "\u22AE", "\\nVdash", true);
  defineSymbol(math, ams, rel, "\u2AB5", "\\precneqq", true);
  defineSymbol(math, ams, rel, "\u2AB6", "\\succneqq", true);
  defineSymbol(math, ams, rel, "\uE016", "\\@nsubseteqq");
  defineSymbol(math, ams, bin, "\u22B4", "\\unlhd");
  defineSymbol(math, ams, bin, "\u22B5", "\\unrhd");
  defineSymbol(math, ams, rel, "\u219A", "\\nleftarrow", true);
  defineSymbol(math, ams, rel, "\u219B", "\\nrightarrow", true);
  defineSymbol(math, ams, rel, "\u21CD", "\\nLeftarrow", true);
  defineSymbol(math, ams, rel, "\u21CF", "\\nRightarrow", true);
  defineSymbol(math, ams, rel, "\u21AE", "\\nleftrightarrow", true);
  defineSymbol(math, ams, rel, "\u21CE", "\\nLeftrightarrow", true);
  defineSymbol(math, ams, rel, "\u25B3", "\\vartriangle");
  defineSymbol(math, ams, textord, "\u210F", "\\hslash");
  defineSymbol(math, ams, textord, "\u25BD", "\\triangledown");
  defineSymbol(math, ams, textord, "\u25CA", "\\lozenge");
  defineSymbol(math, ams, textord, "\u24C8", "\\circledS");
  defineSymbol(math, ams, textord, "\xAE", "\\circledR");
  defineSymbol(text, ams, textord, "\xAE", "\\circledR");
  defineSymbol(math, ams, textord, "\u2221", "\\measuredangle", true);
  defineSymbol(math, ams, textord, "\u2204", "\\nexists");
  defineSymbol(math, ams, textord, "\u2127", "\\mho");
  defineSymbol(math, ams, textord, "\u2132", "\\Finv", true);
  defineSymbol(math, ams, textord, "\u2141", "\\Game", true);
  defineSymbol(math, ams, textord, "\u2035", "\\backprime");
  defineSymbol(math, ams, textord, "\u25B2", "\\blacktriangle");
  defineSymbol(math, ams, textord, "\u25BC", "\\blacktriangledown");
  defineSymbol(math, ams, textord, "\u25A0", "\\blacksquare");
  defineSymbol(math, ams, textord, "\u29EB", "\\blacklozenge");
  defineSymbol(math, ams, textord, "\u2605", "\\bigstar");
  defineSymbol(math, ams, textord, "\u2222", "\\sphericalangle", true);
  defineSymbol(math, ams, textord, "\u2201", "\\complement", true);
  defineSymbol(math, ams, textord, "\xF0", "\\eth", true);
  defineSymbol(text, main, textord, "\xF0", "\xF0");
  defineSymbol(math, ams, textord, "\u2571", "\\diagup");
  defineSymbol(math, ams, textord, "\u2572", "\\diagdown");
  defineSymbol(math, ams, textord, "\u25A1", "\\square");
  defineSymbol(math, ams, textord, "\u25A1", "\\Box");
  defineSymbol(math, ams, textord, "\u25CA", "\\Diamond");
  defineSymbol(math, ams, textord, "\xA5", "\\yen", true);
  defineSymbol(text, ams, textord, "\xA5", "\\yen", true);
  defineSymbol(math, ams, textord, "\u2713", "\\checkmark", true);
  defineSymbol(text, ams, textord, "\u2713", "\\checkmark");
  defineSymbol(math, ams, textord, "\u2136", "\\beth", true);
  defineSymbol(math, ams, textord, "\u2138", "\\daleth", true);
  defineSymbol(math, ams, textord, "\u2137", "\\gimel", true);
  defineSymbol(math, ams, textord, "\u03DD", "\\digamma", true);
  defineSymbol(math, ams, textord, "\u03F0", "\\varkappa");
  defineSymbol(math, ams, open, "\u250C", "\\@ulcorner", true);
  defineSymbol(math, ams, close, "\u2510", "\\@urcorner", true);
  defineSymbol(math, ams, open, "\u2514", "\\@llcorner", true);
  defineSymbol(math, ams, close, "\u2518", "\\@lrcorner", true);
  defineSymbol(math, ams, rel, "\u2266", "\\leqq", true);
  defineSymbol(math, ams, rel, "\u2A7D", "\\leqslant", true);
  defineSymbol(math, ams, rel, "\u2A95", "\\eqslantless", true);
  defineSymbol(math, ams, rel, "\u2272", "\\lesssim", true);
  defineSymbol(math, ams, rel, "\u2A85", "\\lessapprox", true);
  defineSymbol(math, ams, rel, "\u224A", "\\approxeq", true);
  defineSymbol(math, ams, bin, "\u22D6", "\\lessdot");
  defineSymbol(math, ams, rel, "\u22D8", "\\lll", true);
  defineSymbol(math, ams, rel, "\u2276", "\\lessgtr", true);
  defineSymbol(math, ams, rel, "\u22DA", "\\lesseqgtr", true);
  defineSymbol(math, ams, rel, "\u2A8B", "\\lesseqqgtr", true);
  defineSymbol(math, ams, rel, "\u2251", "\\doteqdot");
  defineSymbol(math, ams, rel, "\u2253", "\\risingdotseq", true);
  defineSymbol(math, ams, rel, "\u2252", "\\fallingdotseq", true);
  defineSymbol(math, ams, rel, "\u223D", "\\backsim", true);
  defineSymbol(math, ams, rel, "\u22CD", "\\backsimeq", true);
  defineSymbol(math, ams, rel, "\u2AC5", "\\subseteqq", true);
  defineSymbol(math, ams, rel, "\u22D0", "\\Subset", true);
  defineSymbol(math, ams, rel, "\u228F", "\\sqsubset", true);
  defineSymbol(math, ams, rel, "\u227C", "\\preccurlyeq", true);
  defineSymbol(math, ams, rel, "\u22DE", "\\curlyeqprec", true);
  defineSymbol(math, ams, rel, "\u227E", "\\precsim", true);
  defineSymbol(math, ams, rel, "\u2AB7", "\\precapprox", true);
  defineSymbol(math, ams, rel, "\u22B2", "\\vartriangleleft");
  defineSymbol(math, ams, rel, "\u22B4", "\\trianglelefteq");
  defineSymbol(math, ams, rel, "\u22A8", "\\vDash", true);
  defineSymbol(math, ams, rel, "\u22AA", "\\Vvdash", true);
  defineSymbol(math, ams, rel, "\u2323", "\\smallsmile");
  defineSymbol(math, ams, rel, "\u2322", "\\smallfrown");
  defineSymbol(math, ams, rel, "\u224F", "\\bumpeq", true);
  defineSymbol(math, ams, rel, "\u224E", "\\Bumpeq", true);
  defineSymbol(math, ams, rel, "\u2267", "\\geqq", true);
  defineSymbol(math, ams, rel, "\u2A7E", "\\geqslant", true);
  defineSymbol(math, ams, rel, "\u2A96", "\\eqslantgtr", true);
  defineSymbol(math, ams, rel, "\u2273", "\\gtrsim", true);
  defineSymbol(math, ams, rel, "\u2A86", "\\gtrapprox", true);
  defineSymbol(math, ams, bin, "\u22D7", "\\gtrdot");
  defineSymbol(math, ams, rel, "\u22D9", "\\ggg", true);
  defineSymbol(math, ams, rel, "\u2277", "\\gtrless", true);
  defineSymbol(math, ams, rel, "\u22DB", "\\gtreqless", true);
  defineSymbol(math, ams, rel, "\u2A8C", "\\gtreqqless", true);
  defineSymbol(math, ams, rel, "\u2256", "\\eqcirc", true);
  defineSymbol(math, ams, rel, "\u2257", "\\circeq", true);
  defineSymbol(math, ams, rel, "\u225C", "\\triangleq", true);
  defineSymbol(math, ams, rel, "\u223C", "\\thicksim");
  defineSymbol(math, ams, rel, "\u2248", "\\thickapprox");
  defineSymbol(math, ams, rel, "\u2AC6", "\\supseteqq", true);
  defineSymbol(math, ams, rel, "\u22D1", "\\Supset", true);
  defineSymbol(math, ams, rel, "\u2290", "\\sqsupset", true);
  defineSymbol(math, ams, rel, "\u227D", "\\succcurlyeq", true);
  defineSymbol(math, ams, rel, "\u22DF", "\\curlyeqsucc", true);
  defineSymbol(math, ams, rel, "\u227F", "\\succsim", true);
  defineSymbol(math, ams, rel, "\u2AB8", "\\succapprox", true);
  defineSymbol(math, ams, rel, "\u22B3", "\\vartriangleright");
  defineSymbol(math, ams, rel, "\u22B5", "\\trianglerighteq");
  defineSymbol(math, ams, rel, "\u22A9", "\\Vdash", true);
  defineSymbol(math, ams, rel, "\u2223", "\\shortmid");
  defineSymbol(math, ams, rel, "\u2225", "\\shortparallel");
  defineSymbol(math, ams, rel, "\u226C", "\\between", true);
  defineSymbol(math, ams, rel, "\u22D4", "\\pitchfork", true);
  defineSymbol(math, ams, rel, "\u221D", "\\varpropto");
  defineSymbol(math, ams, rel, "\u25C0", "\\blacktriangleleft");
  defineSymbol(math, ams, rel, "\u2234", "\\therefore", true);
  defineSymbol(math, ams, rel, "\u220D", "\\backepsilon");
  defineSymbol(math, ams, rel, "\u25B6", "\\blacktriangleright");
  defineSymbol(math, ams, rel, "\u2235", "\\because", true);
  defineSymbol(math, ams, rel, "\u22D8", "\\llless");
  defineSymbol(math, ams, rel, "\u22D9", "\\gggtr");
  defineSymbol(math, ams, bin, "\u22B2", "\\lhd");
  defineSymbol(math, ams, bin, "\u22B3", "\\rhd");
  defineSymbol(math, ams, rel, "\u2242", "\\eqsim", true);
  defineSymbol(math, main, rel, "\u22C8", "\\Join");
  defineSymbol(math, ams, rel, "\u2251", "\\Doteq", true);
  defineSymbol(math, ams, bin, "\u2214", "\\dotplus", true);
  defineSymbol(math, ams, bin, "\u2216", "\\smallsetminus");
  defineSymbol(math, ams, bin, "\u22D2", "\\Cap", true);
  defineSymbol(math, ams, bin, "\u22D3", "\\Cup", true);
  defineSymbol(math, ams, bin, "\u2A5E", "\\doublebarwedge", true);
  defineSymbol(math, ams, bin, "\u229F", "\\boxminus", true);
  defineSymbol(math, ams, bin, "\u229E", "\\boxplus", true);
  defineSymbol(math, ams, bin, "\u22C7", "\\divideontimes", true);
  defineSymbol(math, ams, bin, "\u22C9", "\\ltimes", true);
  defineSymbol(math, ams, bin, "\u22CA", "\\rtimes", true);
  defineSymbol(math, ams, bin, "\u22CB", "\\leftthreetimes", true);
  defineSymbol(math, ams, bin, "\u22CC", "\\rightthreetimes", true);
  defineSymbol(math, ams, bin, "\u22CF", "\\curlywedge", true);
  defineSymbol(math, ams, bin, "\u22CE", "\\curlyvee", true);
  defineSymbol(math, ams, bin, "\u229D", "\\circleddash", true);
  defineSymbol(math, ams, bin, "\u229B", "\\circledast", true);
  defineSymbol(math, ams, bin, "\u22C5", "\\centerdot");
  defineSymbol(math, ams, bin, "\u22BA", "\\intercal", true);
  defineSymbol(math, ams, bin, "\u22D2", "\\doublecap");
  defineSymbol(math, ams, bin, "\u22D3", "\\doublecup");
  defineSymbol(math, ams, bin, "\u22A0", "\\boxtimes", true);
  defineSymbol(math, ams, rel, "\u21E2", "\\dashrightarrow", true);
  defineSymbol(math, ams, rel, "\u21E0", "\\dashleftarrow", true);
  defineSymbol(math, ams, rel, "\u21C7", "\\leftleftarrows", true);
  defineSymbol(math, ams, rel, "\u21C6", "\\leftrightarrows", true);
  defineSymbol(math, ams, rel, "\u21DA", "\\Lleftarrow", true);
  defineSymbol(math, ams, rel, "\u219E", "\\twoheadleftarrow", true);
  defineSymbol(math, ams, rel, "\u21A2", "\\leftarrowtail", true);
  defineSymbol(math, ams, rel, "\u21AB", "\\looparrowleft", true);
  defineSymbol(math, ams, rel, "\u21CB", "\\leftrightharpoons", true);
  defineSymbol(math, ams, rel, "\u21B6", "\\curvearrowleft", true);
  defineSymbol(math, ams, rel, "\u21BA", "\\circlearrowleft", true);
  defineSymbol(math, ams, rel, "\u21B0", "\\Lsh", true);
  defineSymbol(math, ams, rel, "\u21C8", "\\upuparrows", true);
  defineSymbol(math, ams, rel, "\u21BF", "\\upharpoonleft", true);
  defineSymbol(math, ams, rel, "\u21C3", "\\downharpoonleft", true);
  defineSymbol(math, main, rel, "\u22B6", "\\origof", true);
  defineSymbol(math, main, rel, "\u22B7", "\\imageof", true);
  defineSymbol(math, ams, rel, "\u22B8", "\\multimap", true);
  defineSymbol(math, ams, rel, "\u21AD", "\\leftrightsquigarrow", true);
  defineSymbol(math, ams, rel, "\u21C9", "\\rightrightarrows", true);
  defineSymbol(math, ams, rel, "\u21C4", "\\rightleftarrows", true);
  defineSymbol(math, ams, rel, "\u21A0", "\\twoheadrightarrow", true);
  defineSymbol(math, ams, rel, "\u21A3", "\\rightarrowtail", true);
  defineSymbol(math, ams, rel, "\u21AC", "\\looparrowright", true);
  defineSymbol(math, ams, rel, "\u21B7", "\\curvearrowright", true);
  defineSymbol(math, ams, rel, "\u21BB", "\\circlearrowright", true);
  defineSymbol(math, ams, rel, "\u21B1", "\\Rsh", true);
  defineSymbol(math, ams, rel, "\u21CA", "\\downdownarrows", true);
  defineSymbol(math, ams, rel, "\u21BE", "\\upharpoonright", true);
  defineSymbol(math, ams, rel, "\u21C2", "\\downharpoonright", true);
  defineSymbol(math, ams, rel, "\u21DD", "\\rightsquigarrow", true);
  defineSymbol(math, ams, rel, "\u21DD", "\\leadsto");
  defineSymbol(math, ams, rel, "\u21DB", "\\Rrightarrow", true);
  defineSymbol(math, ams, rel, "\u21BE", "\\restriction");
  defineSymbol(math, main, textord, "\u2018", "`");
  defineSymbol(math, main, textord, "$", "\\$");
  defineSymbol(text, main, textord, "$", "\\$");
  defineSymbol(text, main, textord, "$", "\\textdollar");
  defineSymbol(math, main, textord, "%", "\\%");
  defineSymbol(text, main, textord, "%", "\\%");
  defineSymbol(math, main, textord, "_", "\\_");
  defineSymbol(text, main, textord, "_", "\\_");
  defineSymbol(text, main, textord, "_", "\\textunderscore");
  defineSymbol(math, main, textord, "\u2220", "\\angle", true);
  defineSymbol(math, main, textord, "\u221E", "\\infty", true);
  defineSymbol(math, main, textord, "\u2032", "\\prime");
  defineSymbol(math, main, textord, "\u25B3", "\\triangle");
  defineSymbol(math, main, textord, "\u0393", "\\Gamma", true);
  defineSymbol(math, main, textord, "\u0394", "\\Delta", true);
  defineSymbol(math, main, textord, "\u0398", "\\Theta", true);
  defineSymbol(math, main, textord, "\u039B", "\\Lambda", true);
  defineSymbol(math, main, textord, "\u039E", "\\Xi", true);
  defineSymbol(math, main, textord, "\u03A0", "\\Pi", true);
  defineSymbol(math, main, textord, "\u03A3", "\\Sigma", true);
  defineSymbol(math, main, textord, "\u03A5", "\\Upsilon", true);
  defineSymbol(math, main, textord, "\u03A6", "\\Phi", true);
  defineSymbol(math, main, textord, "\u03A8", "\\Psi", true);
  defineSymbol(math, main, textord, "\u03A9", "\\Omega", true);
  defineSymbol(math, main, textord, "A", "\u0391");
  defineSymbol(math, main, textord, "B", "\u0392");
  defineSymbol(math, main, textord, "E", "\u0395");
  defineSymbol(math, main, textord, "Z", "\u0396");
  defineSymbol(math, main, textord, "H", "\u0397");
  defineSymbol(math, main, textord, "I", "\u0399");
  defineSymbol(math, main, textord, "K", "\u039A");
  defineSymbol(math, main, textord, "M", "\u039C");
  defineSymbol(math, main, textord, "N", "\u039D");
  defineSymbol(math, main, textord, "O", "\u039F");
  defineSymbol(math, main, textord, "P", "\u03A1");
  defineSymbol(math, main, textord, "T", "\u03A4");
  defineSymbol(math, main, textord, "X", "\u03A7");
  defineSymbol(math, main, textord, "\xAC", "\\neg", true);
  defineSymbol(math, main, textord, "\xAC", "\\lnot");
  defineSymbol(math, main, textord, "\u22A4", "\\top");
  defineSymbol(math, main, textord, "\u22A5", "\\bot");
  defineSymbol(math, main, textord, "\u2205", "\\emptyset");
  defineSymbol(math, ams, textord, "\u2205", "\\varnothing");
  defineSymbol(math, main, mathord, "\u03B1", "\\alpha", true);
  defineSymbol(math, main, mathord, "\u03B2", "\\beta", true);
  defineSymbol(math, main, mathord, "\u03B3", "\\gamma", true);
  defineSymbol(math, main, mathord, "\u03B4", "\\delta", true);
  defineSymbol(math, main, mathord, "\u03F5", "\\epsilon", true);
  defineSymbol(math, main, mathord, "\u03B6", "\\zeta", true);
  defineSymbol(math, main, mathord, "\u03B7", "\\eta", true);
  defineSymbol(math, main, mathord, "\u03B8", "\\theta", true);
  defineSymbol(math, main, mathord, "\u03B9", "\\iota", true);
  defineSymbol(math, main, mathord, "\u03BA", "\\kappa", true);
  defineSymbol(math, main, mathord, "\u03BB", "\\lambda", true);
  defineSymbol(math, main, mathord, "\u03BC", "\\mu", true);
  defineSymbol(math, main, mathord, "\u03BD", "\\nu", true);
  defineSymbol(math, main, mathord, "\u03BE", "\\xi", true);
  defineSymbol(math, main, mathord, "\u03BF", "\\omicron", true);
  defineSymbol(math, main, mathord, "\u03C0", "\\pi", true);
  defineSymbol(math, main, mathord, "\u03C1", "\\rho", true);
  defineSymbol(math, main, mathord, "\u03C3", "\\sigma", true);
  defineSymbol(math, main, mathord, "\u03C4", "\\tau", true);
  defineSymbol(math, main, mathord, "\u03C5", "\\upsilon", true);
  defineSymbol(math, main, mathord, "\u03D5", "\\phi", true);
  defineSymbol(math, main, mathord, "\u03C7", "\\chi", true);
  defineSymbol(math, main, mathord, "\u03C8", "\\psi", true);
  defineSymbol(math, main, mathord, "\u03C9", "\\omega", true);
  defineSymbol(math, main, mathord, "\u03B5", "\\varepsilon", true);
  defineSymbol(math, main, mathord, "\u03D1", "\\vartheta", true);
  defineSymbol(math, main, mathord, "\u03D6", "\\varpi", true);
  defineSymbol(math, main, mathord, "\u03F1", "\\varrho", true);
  defineSymbol(math, main, mathord, "\u03C2", "\\varsigma", true);
  defineSymbol(math, main, mathord, "\u03C6", "\\varphi", true);
  defineSymbol(math, main, bin, "\u2217", "*", true);
  defineSymbol(math, main, bin, "+", "+");
  defineSymbol(math, main, bin, "\u2212", "-", true);
  defineSymbol(math, main, bin, "\u22C5", "\\cdot", true);
  defineSymbol(math, main, bin, "\u2218", "\\circ", true);
  defineSymbol(math, main, bin, "\xF7", "\\div", true);
  defineSymbol(math, main, bin, "\xB1", "\\pm", true);
  defineSymbol(math, main, bin, "\xD7", "\\times", true);
  defineSymbol(math, main, bin, "\u2229", "\\cap", true);
  defineSymbol(math, main, bin, "\u222A", "\\cup", true);
  defineSymbol(math, main, bin, "\u2216", "\\setminus", true);
  defineSymbol(math, main, bin, "\u2227", "\\land");
  defineSymbol(math, main, bin, "\u2228", "\\lor");
  defineSymbol(math, main, bin, "\u2227", "\\wedge", true);
  defineSymbol(math, main, bin, "\u2228", "\\vee", true);
  defineSymbol(math, main, textord, "\u221A", "\\surd");
  defineSymbol(math, main, open, "\u27E8", "\\langle", true);
  defineSymbol(math, main, open, "\u2223", "\\lvert");
  defineSymbol(math, main, open, "\u2225", "\\lVert");
  defineSymbol(math, main, close, "?", "?");
  defineSymbol(math, main, close, "!", "!");
  defineSymbol(math, main, close, "\u27E9", "\\rangle", true);
  defineSymbol(math, main, close, "\u2223", "\\rvert");
  defineSymbol(math, main, close, "\u2225", "\\rVert");
  defineSymbol(math, main, rel, "=", "=");
  defineSymbol(math, main, rel, ":", ":");
  defineSymbol(math, main, rel, "\u2248", "\\approx", true);
  defineSymbol(math, main, rel, "\u2245", "\\cong", true);
  defineSymbol(math, main, rel, "\u2265", "\\ge");
  defineSymbol(math, main, rel, "\u2265", "\\geq", true);
  defineSymbol(math, main, rel, "\u2190", "\\gets");
  defineSymbol(math, main, rel, ">", "\\gt", true);
  defineSymbol(math, main, rel, "\u2208", "\\in", true);
  defineSymbol(math, main, rel, "\uE020", "\\@not");
  defineSymbol(math, main, rel, "\u2282", "\\subset", true);
  defineSymbol(math, main, rel, "\u2283", "\\supset", true);
  defineSymbol(math, main, rel, "\u2286", "\\subseteq", true);
  defineSymbol(math, main, rel, "\u2287", "\\supseteq", true);
  defineSymbol(math, ams, rel, "\u2288", "\\nsubseteq", true);
  defineSymbol(math, ams, rel, "\u2289", "\\nsupseteq", true);
  defineSymbol(math, main, rel, "\u22A8", "\\models");
  defineSymbol(math, main, rel, "\u2190", "\\leftarrow", true);
  defineSymbol(math, main, rel, "\u2264", "\\le");
  defineSymbol(math, main, rel, "\u2264", "\\leq", true);
  defineSymbol(math, main, rel, "<", "\\lt", true);
  defineSymbol(math, main, rel, "\u2192", "\\rightarrow", true);
  defineSymbol(math, main, rel, "\u2192", "\\to");
  defineSymbol(math, ams, rel, "\u2271", "\\ngeq", true);
  defineSymbol(math, ams, rel, "\u2270", "\\nleq", true);
  defineSymbol(math, main, spacing, "\xA0", "\\ ");
  defineSymbol(math, main, spacing, "\xA0", "\\space");
  defineSymbol(math, main, spacing, "\xA0", "\\nobreakspace");
  defineSymbol(text, main, spacing, "\xA0", "\\ ");
  defineSymbol(text, main, spacing, "\xA0", " ");
  defineSymbol(text, main, spacing, "\xA0", "\\space");
  defineSymbol(text, main, spacing, "\xA0", "\\nobreakspace");
  defineSymbol(math, main, spacing, null, "\\nobreak");
  defineSymbol(math, main, spacing, null, "\\allowbreak");
  defineSymbol(math, main, punct, ",", ",");
  defineSymbol(math, main, punct, ";", ";");
  defineSymbol(math, ams, bin, "\u22BC", "\\barwedge", true);
  defineSymbol(math, ams, bin, "\u22BB", "\\veebar", true);
  defineSymbol(math, main, bin, "\u2299", "\\odot", true);
  defineSymbol(math, main, bin, "\u2295", "\\oplus", true);
  defineSymbol(math, main, bin, "\u2297", "\\otimes", true);
  defineSymbol(math, main, textord, "\u2202", "\\partial", true);
  defineSymbol(math, main, bin, "\u2298", "\\oslash", true);
  defineSymbol(math, ams, bin, "\u229A", "\\circledcirc", true);
  defineSymbol(math, ams, bin, "\u22A1", "\\boxdot", true);
  defineSymbol(math, main, bin, "\u25B3", "\\bigtriangleup");
  defineSymbol(math, main, bin, "\u25BD", "\\bigtriangledown");
  defineSymbol(math, main, bin, "\u2020", "\\dagger");
  defineSymbol(math, main, bin, "\u22C4", "\\diamond");
  defineSymbol(math, main, bin, "\u22C6", "\\star");
  defineSymbol(math, main, bin, "\u25C3", "\\triangleleft");
  defineSymbol(math, main, bin, "\u25B9", "\\triangleright");
  defineSymbol(math, main, open, "{", "\\{");
  defineSymbol(text, main, textord, "{", "\\{");
  defineSymbol(text, main, textord, "{", "\\textbraceleft");
  defineSymbol(math, main, close, "}", "\\}");
  defineSymbol(text, main, textord, "}", "\\}");
  defineSymbol(text, main, textord, "}", "\\textbraceright");
  defineSymbol(math, main, open, "{", "\\lbrace");
  defineSymbol(math, main, close, "}", "\\rbrace");
  defineSymbol(math, main, open, "[", "\\lbrack", true);
  defineSymbol(text, main, textord, "[", "\\lbrack", true);
  defineSymbol(math, main, close, "]", "\\rbrack", true);
  defineSymbol(text, main, textord, "]", "\\rbrack", true);
  defineSymbol(math, main, open, "(", "\\lparen", true);
  defineSymbol(math, main, close, ")", "\\rparen", true);
  defineSymbol(text, main, textord, "<", "\\textless", true);
  defineSymbol(text, main, textord, ">", "\\textgreater", true);
  defineSymbol(math, main, open, "\u230A", "\\lfloor", true);
  defineSymbol(math, main, close, "\u230B", "\\rfloor", true);
  defineSymbol(math, main, open, "\u2308", "\\lceil", true);
  defineSymbol(math, main, close, "\u2309", "\\rceil", true);
  defineSymbol(math, main, textord, "\\", "\\backslash");
  defineSymbol(math, main, textord, "\u2223", "|");
  defineSymbol(math, main, textord, "\u2223", "\\vert");
  defineSymbol(text, main, textord, "|", "\\textbar", true);
  defineSymbol(math, main, textord, "\u2225", "\\|");
  defineSymbol(math, main, textord, "\u2225", "\\Vert");
  defineSymbol(text, main, textord, "\u2225", "\\textbardbl");
  defineSymbol(text, main, textord, "~", "\\textasciitilde");
  defineSymbol(text, main, textord, "\\", "\\textbackslash");
  defineSymbol(text, main, textord, "^", "\\textasciicircum");
  defineSymbol(math, main, rel, "\u2191", "\\uparrow", true);
  defineSymbol(math, main, rel, "\u21D1", "\\Uparrow", true);
  defineSymbol(math, main, rel, "\u2193", "\\downarrow", true);
  defineSymbol(math, main, rel, "\u21D3", "\\Downarrow", true);
  defineSymbol(math, main, rel, "\u2195", "\\updownarrow", true);
  defineSymbol(math, main, rel, "\u21D5", "\\Updownarrow", true);
  defineSymbol(math, main, op, "\u2210", "\\coprod");
  defineSymbol(math, main, op, "\u22C1", "\\bigvee");
  defineSymbol(math, main, op, "\u22C0", "\\bigwedge");
  defineSymbol(math, main, op, "\u2A04", "\\biguplus");
  defineSymbol(math, main, op, "\u22C2", "\\bigcap");
  defineSymbol(math, main, op, "\u22C3", "\\bigcup");
  defineSymbol(math, main, op, "\u222B", "\\int");
  defineSymbol(math, main, op, "\u222B", "\\intop");
  defineSymbol(math, main, op, "\u222C", "\\iint");
  defineSymbol(math, main, op, "\u222D", "\\iiint");
  defineSymbol(math, main, op, "\u220F", "\\prod");
  defineSymbol(math, main, op, "\u2211", "\\sum");
  defineSymbol(math, main, op, "\u2A02", "\\bigotimes");
  defineSymbol(math, main, op, "\u2A01", "\\bigoplus");
  defineSymbol(math, main, op, "\u2A00", "\\bigodot");
  defineSymbol(math, main, op, "\u222E", "\\oint");
  defineSymbol(math, main, op, "\u222F", "\\oiint");
  defineSymbol(math, main, op, "\u2230", "\\oiiint");
  defineSymbol(math, main, op, "\u2A06", "\\bigsqcup");
  defineSymbol(math, main, op, "\u222B", "\\smallint");
  defineSymbol(text, main, inner, "\u2026", "\\textellipsis");
  defineSymbol(math, main, inner, "\u2026", "\\mathellipsis");
  defineSymbol(text, main, inner, "\u2026", "\\ldots", true);
  defineSymbol(math, main, inner, "\u2026", "\\ldots", true);
  defineSymbol(math, main, inner, "\u22EF", "\\@cdots", true);
  defineSymbol(math, main, inner, "\u22F1", "\\ddots", true);
  defineSymbol(math, main, textord, "\u22EE", "\\varvdots");
  defineSymbol(text, main, textord, "\u22EE", "\\varvdots");
  defineSymbol(math, main, accent, "\u02CA", "\\acute");
  defineSymbol(math, main, accent, "\u02CB", "\\grave");
  defineSymbol(math, main, accent, "\xA8", "\\ddot");
  defineSymbol(math, main, accent, "~", "\\tilde");
  defineSymbol(math, main, accent, "\u02C9", "\\bar");
  defineSymbol(math, main, accent, "\u02D8", "\\breve");
  defineSymbol(math, main, accent, "\u02C7", "\\check");
  defineSymbol(math, main, accent, "^", "\\hat");
  defineSymbol(math, main, accent, "\u20D7", "\\vec");
  defineSymbol(math, main, accent, "\u02D9", "\\dot");
  defineSymbol(math, main, accent, "\u02DA", "\\mathring");
  defineSymbol(math, main, mathord, "\uE131", "\\@imath");
  defineSymbol(math, main, mathord, "\uE237", "\\@jmath");
  defineSymbol(math, main, textord, "\u0131", "\u0131");
  defineSymbol(math, main, textord, "\u0237", "\u0237");
  defineSymbol(text, main, textord, "\u0131", "\\i", true);
  defineSymbol(text, main, textord, "\u0237", "\\j", true);
  defineSymbol(text, main, textord, "\xDF", "\\ss", true);
  defineSymbol(text, main, textord, "\xE6", "\\ae", true);
  defineSymbol(text, main, textord, "\u0153", "\\oe", true);
  defineSymbol(text, main, textord, "\xF8", "\\o", true);
  defineSymbol(text, main, textord, "\xC6", "\\AE", true);
  defineSymbol(text, main, textord, "\u0152", "\\OE", true);
  defineSymbol(text, main, textord, "\xD8", "\\O", true);
  defineSymbol(text, main, accent, "\u02CA", "\\'");
  defineSymbol(text, main, accent, "\u02CB", "\\`");
  defineSymbol(text, main, accent, "\u02C6", "\\^");
  defineSymbol(text, main, accent, "\u02DC", "\\~");
  defineSymbol(text, main, accent, "\u02C9", "\\=");
  defineSymbol(text, main, accent, "\u02D8", "\\u");
  defineSymbol(text, main, accent, "\u02D9", "\\.");
  defineSymbol(text, main, accent, "\xB8", "\\c");
  defineSymbol(text, main, accent, "\u02DA", "\\r");
  defineSymbol(text, main, accent, "\u02C7", "\\v");
  defineSymbol(text, main, accent, "\xA8", '\\"');
  defineSymbol(text, main, accent, "\u02DD", "\\H");
  defineSymbol(text, main, accent, "\u25EF", "\\textcircled");
  var ligatures = {
    "--": true,
    "---": true,
    "``": true,
    "''": true
  };
  defineSymbol(text, main, textord, "\u2013", "--", true);
  defineSymbol(text, main, textord, "\u2013", "\\textendash");
  defineSymbol(text, main, textord, "\u2014", "---", true);
  defineSymbol(text, main, textord, "\u2014", "\\textemdash");
  defineSymbol(text, main, textord, "\u2018", "`", true);
  defineSymbol(text, main, textord, "\u2018", "\\textquoteleft");
  defineSymbol(text, main, textord, "\u2019", "'", true);
  defineSymbol(text, main, textord, "\u2019", "\\textquoteright");
  defineSymbol(text, main, textord, "\u201C", "``", true);
  defineSymbol(text, main, textord, "\u201C", "\\textquotedblleft");
  defineSymbol(text, main, textord, "\u201D", "''", true);
  defineSymbol(text, main, textord, "\u201D", "\\textquotedblright");
  defineSymbol(math, main, textord, "\xB0", "\\degree", true);
  defineSymbol(text, main, textord, "\xB0", "\\degree");
  defineSymbol(text, main, textord, "\xB0", "\\textdegree", true);
  defineSymbol(math, main, textord, "\xA3", "\\pounds");
  defineSymbol(math, main, textord, "\xA3", "\\mathsterling", true);
  defineSymbol(text, main, textord, "\xA3", "\\pounds");
  defineSymbol(text, main, textord, "\xA3", "\\textsterling", true);
  defineSymbol(math, ams, textord, "\u2720", "\\maltese");
  defineSymbol(text, ams, textord, "\u2720", "\\maltese");
  var mathTextSymbols = '0123456789/@."';
  for (i = 0; i < mathTextSymbols.length; i++) {
    ch = mathTextSymbols.charAt(i);
    defineSymbol(math, main, textord, ch, ch);
  }
  var ch;
  var i;
  var textSymbols = '0123456789!@*()-=+";:?/.,';
  for (_i = 0; _i < textSymbols.length; _i++) {
    _ch = textSymbols.charAt(_i);
    defineSymbol(text, main, textord, _ch, _ch);
  }
  var _ch;
  var _i;
  var letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  for (_i2 = 0; _i2 < letters.length; _i2++) {
    _ch2 = letters.charAt(_i2);
    defineSymbol(math, main, mathord, _ch2, _ch2);
    defineSymbol(text, main, textord, _ch2, _ch2);
  }
  var _ch2;
  var _i2;
  defineSymbol(math, ams, textord, "C", "\u2102");
  defineSymbol(text, ams, textord, "C", "\u2102");
  defineSymbol(math, ams, textord, "H", "\u210D");
  defineSymbol(text, ams, textord, "H", "\u210D");
  defineSymbol(math, ams, textord, "N", "\u2115");
  defineSymbol(text, ams, textord, "N", "\u2115");
  defineSymbol(math, ams, textord, "P", "\u2119");
  defineSymbol(text, ams, textord, "P", "\u2119");
  defineSymbol(math, ams, textord, "Q", "\u211A");
  defineSymbol(text, ams, textord, "Q", "\u211A");
  defineSymbol(math, ams, textord, "R", "\u211D");
  defineSymbol(text, ams, textord, "R", "\u211D");
  defineSymbol(math, ams, textord, "Z", "\u2124");
  defineSymbol(text, ams, textord, "Z", "\u2124");
  defineSymbol(math, main, mathord, "h", "\u210E");
  defineSymbol(text, main, mathord, "h", "\u210E");
  var wideChar = "";
  for (_i3 = 0; _i3 < letters.length; _i3++) {
    _ch3 = letters.charAt(_i3);
    wideChar = String.fromCharCode(55349, 56320 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56372 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56424 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56580 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56684 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56736 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56788 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56840 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    wideChar = String.fromCharCode(55349, 56944 + _i3);
    defineSymbol(math, main, mathord, _ch3, wideChar);
    defineSymbol(text, main, textord, _ch3, wideChar);
    if (_i3 < 26) {
      wideChar = String.fromCharCode(55349, 56632 + _i3);
      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
      wideChar = String.fromCharCode(55349, 56476 + _i3);
      defineSymbol(math, main, mathord, _ch3, wideChar);
      defineSymbol(text, main, textord, _ch3, wideChar);
    }
  }
  var _ch3;
  var _i3;
  wideChar = String.fromCharCode(55349, 56668);
  defineSymbol(math, main, mathord, "k", wideChar);
  defineSymbol(text, main, textord, "k", wideChar);
  for (_i4 = 0; _i4 < 10; _i4++) {
    _ch4 = _i4.toString();
    wideChar = String.fromCharCode(55349, 57294 + _i4);
    defineSymbol(math, main, mathord, _ch4, wideChar);
    defineSymbol(text, main, textord, _ch4, wideChar);
    wideChar = String.fromCharCode(55349, 57314 + _i4);
    defineSymbol(math, main, mathord, _ch4, wideChar);
    defineSymbol(text, main, textord, _ch4, wideChar);
    wideChar = String.fromCharCode(55349, 57324 + _i4);
    defineSymbol(math, main, mathord, _ch4, wideChar);
    defineSymbol(text, main, textord, _ch4, wideChar);
    wideChar = String.fromCharCode(55349, 57334 + _i4);
    defineSymbol(math, main, mathord, _ch4, wideChar);
    defineSymbol(text, main, textord, _ch4, wideChar);
  }
  var _ch4;
  var _i4;
  var extraLatin = "\xD0\xDE\xFE";
  for (_i5 = 0; _i5 < extraLatin.length; _i5++) {
    _ch5 = extraLatin.charAt(_i5);
    defineSymbol(math, main, mathord, _ch5, _ch5);
    defineSymbol(text, main, textord, _ch5, _ch5);
  }
  var _ch5;
  var _i5;
  var wideLatinLetterData = [
    ["mathbf", "textbf", "Main-Bold"],
    // A-Z bold upright
    ["mathbf", "textbf", "Main-Bold"],
    // a-z bold upright
    ["mathnormal", "textit", "Math-Italic"],
    // A-Z italic
    ["mathnormal", "textit", "Math-Italic"],
    // a-z italic
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
    // A-Z bold italic
    ["boldsymbol", "boldsymbol", "Main-BoldItalic"],
    // a-z bold italic
    // Map fancy A-Z letters to script, not calligraphic.
    // This aligns with unicode-math and math fonts (except Cambria Math).
    ["mathscr", "textscr", "Script-Regular"],
    // A-Z script
    ["", "", ""],
    // a-z script.  No font
    ["", "", ""],
    // A-Z bold script. No font
    ["", "", ""],
    // a-z bold script. No font
    ["mathfrak", "textfrak", "Fraktur-Regular"],
    // A-Z Fraktur
    ["mathfrak", "textfrak", "Fraktur-Regular"],
    // a-z Fraktur
    ["mathbb", "textbb", "AMS-Regular"],
    // A-Z double-struck
    ["mathbb", "textbb", "AMS-Regular"],
    // k double-struck
    // Note that we are using a bold font, but font metrics for regular Fraktur.
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
    // A-Z bold Fraktur
    ["mathboldfrak", "textboldfrak", "Fraktur-Regular"],
    // a-z bold Fraktur
    ["mathsf", "textsf", "SansSerif-Regular"],
    // A-Z sans-serif
    ["mathsf", "textsf", "SansSerif-Regular"],
    // a-z sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    // A-Z bold sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    // a-z bold sans-serif
    ["mathitsf", "textitsf", "SansSerif-Italic"],
    // A-Z italic sans-serif
    ["mathitsf", "textitsf", "SansSerif-Italic"],
    // a-z italic sans-serif
    ["", "", ""],
    // A-Z bold italic sans. No font
    ["", "", ""],
    // a-z bold italic sans. No font
    ["mathtt", "texttt", "Typewriter-Regular"],
    // A-Z monospace
    ["mathtt", "texttt", "Typewriter-Regular"]
    // a-z monospace
  ];
  var wideNumeralData = [
    ["mathbf", "textbf", "Main-Bold"],
    // 0-9 bold
    ["", "", ""],
    // 0-9 double-struck. No KaTeX font.
    ["mathsf", "textsf", "SansSerif-Regular"],
    // 0-9 sans-serif
    ["mathboldsf", "textboldsf", "SansSerif-Bold"],
    // 0-9 bold sans-serif
    ["mathtt", "texttt", "Typewriter-Regular"]
    // 0-9 monospace
  ];
  var wideCharacterFont = function wideCharacterFont2(wideChar2, mode) {
    var H = wideChar2.charCodeAt(0);
    var L = wideChar2.charCodeAt(1);
    var codePoint = (H - 55296) * 1024 + (L - 56320) + 65536;
    var j = mode === "math" ? 0 : 1;
    if (119808 <= codePoint && codePoint < 120484) {
      var i2 = Math.floor((codePoint - 119808) / 26);
      return [wideLatinLetterData[i2][2], wideLatinLetterData[i2][j]];
    } else if (120782 <= codePoint && codePoint <= 120831) {
      var _i6 = Math.floor((codePoint - 120782) / 10);
      return [wideNumeralData[_i6][2], wideNumeralData[_i6][j]];
    } else if (codePoint === 120485 || codePoint === 120486) {
      return [wideLatinLetterData[0][2], wideLatinLetterData[0][j]];
    } else if (120486 < codePoint && codePoint < 120782) {
      return ["", ""];
    } else {
      throw new ParseError("Unsupported character: " + wideChar2);
    }
  };
  var lookupSymbol = function lookupSymbol2(value, fontName, mode) {
    if (symbols[mode][value] && symbols[mode][value].replace) {
      value = symbols[mode][value].replace;
    }
    return {
      value,
      metrics: getCharacterMetrics(value, fontName, mode)
    };
  };
  var makeSymbol = function makeSymbol2(value, fontName, mode, options, classes) {
    var lookup = lookupSymbol(value, fontName, mode);
    var metrics = lookup.metrics;
    value = lookup.value;
    var symbolNode;
    if (metrics) {
      var italic = metrics.italic;
      if (mode === "text" || options && options.font === "mathit") {
        italic = 0;
      }
      symbolNode = new SymbolNode(value, metrics.height, metrics.depth, italic, metrics.skew, metrics.width, classes);
    } else {
      typeof console !== "undefined" && console.warn("No character metrics " + ("for '" + value + "' in style '" + fontName + "' and mode '" + mode + "'"));
      symbolNode = new SymbolNode(value, 0, 0, 0, 0, 0, classes);
    }
    if (options) {
      symbolNode.maxFontSize = options.sizeMultiplier;
      if (options.style.isTight()) {
        symbolNode.classes.push("mtight");
      }
      var color = options.getColor();
      if (color) {
        symbolNode.style.color = color;
      }
    }
    return symbolNode;
  };
  var mathsym = function mathsym2(value, mode, options, classes) {
    if (classes === void 0) {
      classes = [];
    }
    if (options.font === "boldsymbol" && lookupSymbol(value, "Main-Bold", mode).metrics) {
      return makeSymbol(value, "Main-Bold", mode, options, classes.concat(["mathbf"]));
    } else if (value === "\\" || symbols[mode][value].font === "main") {
      return makeSymbol(value, "Main-Regular", mode, options, classes);
    } else {
      return makeSymbol(value, "AMS-Regular", mode, options, classes.concat(["amsrm"]));
    }
  };
  var boldsymbol = function boldsymbol2(value, mode, options, classes, type) {
    if (type !== "textord" && lookupSymbol(value, "Math-BoldItalic", mode).metrics) {
      return {
        fontName: "Math-BoldItalic",
        fontClass: "boldsymbol"
      };
    } else {
      return {
        fontName: "Main-Bold",
        fontClass: "mathbf"
      };
    }
  };
  var makeOrd = function makeOrd2(group, options, type) {
    var mode = group.mode;
    var text2 = group.text;
    var classes = ["mord"];
    var isFont = mode === "math" || mode === "text" && options.font;
    var fontOrFamily = isFont ? options.font : options.fontFamily;
    var wideFontName = "";
    var wideFontClass = "";
    if (text2.charCodeAt(0) === 55349) {
      [wideFontName, wideFontClass] = wideCharacterFont(text2, mode);
    }
    if (wideFontName.length > 0) {
      return makeSymbol(text2, wideFontName, mode, options, classes.concat(wideFontClass));
    } else if (fontOrFamily) {
      var fontName;
      var fontClasses;
      if (fontOrFamily === "boldsymbol") {
        var fontData = boldsymbol(text2, mode, options, classes, type);
        fontName = fontData.fontName;
        fontClasses = [fontData.fontClass];
      } else if (isFont) {
        fontName = fontMap[fontOrFamily].fontName;
        fontClasses = [fontOrFamily];
      } else {
        fontName = retrieveTextFontName(fontOrFamily, options.fontWeight, options.fontShape);
        fontClasses = [fontOrFamily, options.fontWeight, options.fontShape];
      }
      if (lookupSymbol(text2, fontName, mode).metrics) {
        return makeSymbol(text2, fontName, mode, options, classes.concat(fontClasses));
      } else if (ligatures.hasOwnProperty(text2) && fontName.slice(0, 10) === "Typewriter") {
        var parts = [];
        for (var i2 = 0; i2 < text2.length; i2++) {
          parts.push(makeSymbol(text2[i2], fontName, mode, options, classes.concat(fontClasses)));
        }
        return makeFragment(parts);
      }
    }
    if (type === "mathord") {
      return makeSymbol(text2, "Math-Italic", mode, options, classes.concat(["mathnormal"]));
    } else if (type === "textord") {
      var font = symbols[mode][text2] && symbols[mode][text2].font;
      if (font === "ams") {
        var _fontName = retrieveTextFontName("amsrm", options.fontWeight, options.fontShape);
        return makeSymbol(text2, _fontName, mode, options, classes.concat("amsrm", options.fontWeight, options.fontShape));
      } else if (font === "main" || !font) {
        var _fontName2 = retrieveTextFontName("textrm", options.fontWeight, options.fontShape);
        return makeSymbol(text2, _fontName2, mode, options, classes.concat(options.fontWeight, options.fontShape));
      } else {
        var _fontName3 = retrieveTextFontName(font, options.fontWeight, options.fontShape);
        return makeSymbol(text2, _fontName3, mode, options, classes.concat(_fontName3, options.fontWeight, options.fontShape));
      }
    } else {
      throw new Error("unexpected type: " + type + " in makeOrd");
    }
  };
  var canCombine = (prev, next) => {
    if (createClass(prev.classes) !== createClass(next.classes) || prev.skew !== next.skew || prev.maxFontSize !== next.maxFontSize) {
      return false;
    }
    if (prev.classes.length === 1) {
      var cls = prev.classes[0];
      if (cls === "mbin" || cls === "mord") {
        return false;
      }
    }
    for (var style in prev.style) {
      if (prev.style.hasOwnProperty(style) && prev.style[style] !== next.style[style]) {
        return false;
      }
    }
    for (var _style in next.style) {
      if (next.style.hasOwnProperty(_style) && prev.style[_style] !== next.style[_style]) {
        return false;
      }
    }
    return true;
  };
  var tryCombineChars = (chars) => {
    for (var i2 = 0; i2 < chars.length - 1; i2++) {
      var prev = chars[i2];
      var next = chars[i2 + 1];
      if (prev instanceof SymbolNode && next instanceof SymbolNode && canCombine(prev, next)) {
        prev.text += next.text;
        prev.height = Math.max(prev.height, next.height);
        prev.depth = Math.max(prev.depth, next.depth);
        prev.italic = next.italic;
        chars.splice(i2 + 1, 1);
        i2--;
      }
    }
    return chars;
  };
  var sizeElementFromChildren = function sizeElementFromChildren2(elem) {
    var height = 0;
    var depth = 0;
    var maxFontSize = 0;
    for (var i2 = 0; i2 < elem.children.length; i2++) {
      var child = elem.children[i2];
      if (child.height > height) {
        height = child.height;
      }
      if (child.depth > depth) {
        depth = child.depth;
      }
      if (child.maxFontSize > maxFontSize) {
        maxFontSize = child.maxFontSize;
      }
    }
    elem.height = height;
    elem.depth = depth;
    elem.maxFontSize = maxFontSize;
  };
  var makeSpan$2 = function makeSpan(classes, children, options, style) {
    var span = new Span(classes, children, options, style);
    sizeElementFromChildren(span);
    return span;
  };
  var makeSvgSpan = (classes, children, options, style) => new Span(classes, children, options, style);
  var makeLineSpan = function makeLineSpan2(className, options, thickness) {
    var line = makeSpan$2([className], [], options);
    line.height = Math.max(thickness || options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
    line.style.borderBottomWidth = makeEm(line.height);
    line.maxFontSize = 1;
    return line;
  };
  var makeAnchor = function makeAnchor2(href, classes, children, options) {
    var anchor = new Anchor(href, classes, children, options);
    sizeElementFromChildren(anchor);
    return anchor;
  };
  var makeFragment = function makeFragment2(children) {
    var fragment = new DocumentFragment(children);
    sizeElementFromChildren(fragment);
    return fragment;
  };
  var wrapFragment = function wrapFragment2(group, options) {
    if (group instanceof DocumentFragment) {
      return makeSpan$2([], [group], options);
    }
    return group;
  };
  var getVListChildrenAndDepth = function getVListChildrenAndDepth2(params) {
    if (params.positionType === "individualShift") {
      var oldChildren = params.children;
      var children = [oldChildren[0]];
      var _depth = -oldChildren[0].shift - oldChildren[0].elem.depth;
      var currPos = _depth;
      for (var i2 = 1; i2 < oldChildren.length; i2++) {
        var diff = -oldChildren[i2].shift - currPos - oldChildren[i2].elem.depth;
        var size = diff - (oldChildren[i2 - 1].elem.height + oldChildren[i2 - 1].elem.depth);
        currPos = currPos + diff;
        children.push({
          type: "kern",
          size
        });
        children.push(oldChildren[i2]);
      }
      return {
        children,
        depth: _depth
      };
    }
    var depth;
    if (params.positionType === "top") {
      var bottom = params.positionData;
      for (var _i6 = 0; _i6 < params.children.length; _i6++) {
        var child = params.children[_i6];
        bottom -= child.type === "kern" ? child.size : child.elem.height + child.elem.depth;
      }
      depth = bottom;
    } else if (params.positionType === "bottom") {
      depth = -params.positionData;
    } else {
      var firstChild = params.children[0];
      if (firstChild.type !== "elem") {
        throw new Error('First child must have type "elem".');
      }
      if (params.positionType === "shift") {
        depth = -firstChild.elem.depth - params.positionData;
      } else if (params.positionType === "firstBaseline") {
        depth = -firstChild.elem.depth;
      } else {
        throw new Error("Invalid positionType " + params.positionType + ".");
      }
    }
    return {
      children: params.children,
      depth
    };
  };
  var makeVList = function makeVList2(params, options) {
    var {
      children,
      depth
    } = getVListChildrenAndDepth(params);
    var pstrutSize = 0;
    for (var i2 = 0; i2 < children.length; i2++) {
      var child = children[i2];
      if (child.type === "elem") {
        var elem = child.elem;
        pstrutSize = Math.max(pstrutSize, elem.maxFontSize, elem.height);
      }
    }
    pstrutSize += 2;
    var pstrut = makeSpan$2(["pstrut"], []);
    pstrut.style.height = makeEm(pstrutSize);
    var realChildren = [];
    var minPos = depth;
    var maxPos = depth;
    var currPos = depth;
    for (var _i22 = 0; _i22 < children.length; _i22++) {
      var _child = children[_i22];
      if (_child.type === "kern") {
        currPos += _child.size;
      } else {
        var _elem = _child.elem;
        var classes = _child.wrapperClasses || [];
        var style = _child.wrapperStyle || {};
        var childWrap = makeSpan$2(classes, [pstrut, _elem], void 0, style);
        childWrap.style.top = makeEm(-pstrutSize - currPos - _elem.depth);
        if (_child.marginLeft) {
          childWrap.style.marginLeft = _child.marginLeft;
        }
        if (_child.marginRight) {
          childWrap.style.marginRight = _child.marginRight;
        }
        realChildren.push(childWrap);
        currPos += _elem.height + _elem.depth;
      }
      minPos = Math.min(minPos, currPos);
      maxPos = Math.max(maxPos, currPos);
    }
    var vlist = makeSpan$2(["vlist"], realChildren);
    vlist.style.height = makeEm(maxPos);
    var rows;
    if (minPos < 0) {
      var emptySpan = makeSpan$2([], []);
      var depthStrut = makeSpan$2(["vlist"], [emptySpan]);
      depthStrut.style.height = makeEm(-minPos);
      var topStrut = makeSpan$2(["vlist-s"], [new SymbolNode("\u200B")]);
      rows = [makeSpan$2(["vlist-r"], [vlist, topStrut]), makeSpan$2(["vlist-r"], [depthStrut])];
    } else {
      rows = [makeSpan$2(["vlist-r"], [vlist])];
    }
    var vtable = makeSpan$2(["vlist-t"], rows);
    if (rows.length === 2) {
      vtable.classes.push("vlist-t2");
    }
    vtable.height = maxPos;
    vtable.depth = -minPos;
    return vtable;
  };
  var makeGlue = (measurement, options) => {
    var rule = makeSpan$2(["mspace"], [], options);
    var size = calculateSize(measurement, options);
    rule.style.marginRight = makeEm(size);
    return rule;
  };
  var retrieveTextFontName = function retrieveTextFontName2(fontFamily, fontWeight, fontShape) {
    var baseFontName = "";
    switch (fontFamily) {
      case "amsrm":
        baseFontName = "AMS";
        break;
      case "textrm":
        baseFontName = "Main";
        break;
      case "textsf":
        baseFontName = "SansSerif";
        break;
      case "texttt":
        baseFontName = "Typewriter";
        break;
      default:
        baseFontName = fontFamily;
    }
    var fontStylesName;
    if (fontWeight === "textbf" && fontShape === "textit") {
      fontStylesName = "BoldItalic";
    } else if (fontWeight === "textbf") {
      fontStylesName = "Bold";
    } else if (fontWeight === "textit") {
      fontStylesName = "Italic";
    } else {
      fontStylesName = "Regular";
    }
    return baseFontName + "-" + fontStylesName;
  };
  var fontMap = {
    // styles
    "mathbf": {
      variant: "bold",
      fontName: "Main-Bold"
    },
    "mathrm": {
      variant: "normal",
      fontName: "Main-Regular"
    },
    "textit": {
      variant: "italic",
      fontName: "Main-Italic"
    },
    "mathit": {
      variant: "italic",
      fontName: "Main-Italic"
    },
    "mathnormal": {
      variant: "italic",
      fontName: "Math-Italic"
    },
    "mathsfit": {
      variant: "sans-serif-italic",
      fontName: "SansSerif-Italic"
    },
    // "boldsymbol" is missing because they require the use of multiple fonts:
    // Math-BoldItalic and Main-Bold.  This is handled by a special case in
    // makeOrd which ends up calling boldsymbol.
    // families
    "mathbb": {
      variant: "double-struck",
      fontName: "AMS-Regular"
    },
    "mathcal": {
      variant: "script",
      fontName: "Caligraphic-Regular"
    },
    "mathfrak": {
      variant: "fraktur",
      fontName: "Fraktur-Regular"
    },
    "mathscr": {
      variant: "script",
      fontName: "Script-Regular"
    },
    "mathsf": {
      variant: "sans-serif",
      fontName: "SansSerif-Regular"
    },
    "mathtt": {
      variant: "monospace",
      fontName: "Typewriter-Regular"
    }
  };
  var svgData = {
    //   path, width, height
    vec: ["vec", 0.471, 0.714],
    // values from the font glyph
    oiintSize1: ["oiintSize1", 0.957, 0.499],
    // oval to overlay the integrand
    oiintSize2: ["oiintSize2", 1.472, 0.659],
    oiiintSize1: ["oiiintSize1", 1.304, 0.499],
    oiiintSize2: ["oiiintSize2", 1.98, 0.659]
  };
  var staticSvg = function staticSvg2(value, options) {
    var [pathName, width, height] = svgData[value];
    var path2 = new PathNode(pathName);
    var svgNode = new SvgNode([path2], {
      "width": makeEm(width),
      "height": makeEm(height),
      // Override CSS rule `.katex svg { width: 100% }`
      "style": "width:" + makeEm(width),
      "viewBox": "0 0 " + 1e3 * width + " " + 1e3 * height,
      "preserveAspectRatio": "xMinYMin"
    });
    var span = makeSvgSpan(["overlay"], [svgNode], options);
    span.height = height;
    span.style.height = makeEm(height);
    span.style.width = makeEm(width);
    return span;
  };
  var buildCommon = {
    fontMap,
    makeSymbol,
    mathsym,
    makeSpan: makeSpan$2,
    makeSvgSpan,
    makeLineSpan,
    makeAnchor,
    makeFragment,
    wrapFragment,
    makeVList,
    makeOrd,
    makeGlue,
    staticSvg,
    svgData,
    tryCombineChars
  };
  var thinspace = {
    number: 3,
    unit: "mu"
  };
  var mediumspace = {
    number: 4,
    unit: "mu"
  };
  var thickspace = {
    number: 5,
    unit: "mu"
  };
  var spacings = {
    mord: {
      mop: thinspace,
      mbin: mediumspace,
      mrel: thickspace,
      minner: thinspace
    },
    mop: {
      mord: thinspace,
      mop: thinspace,
      mrel: thickspace,
      minner: thinspace
    },
    mbin: {
      mord: mediumspace,
      mop: mediumspace,
      mopen: mediumspace,
      minner: mediumspace
    },
    mrel: {
      mord: thickspace,
      mop: thickspace,
      mopen: thickspace,
      minner: thickspace
    },
    mopen: {},
    mclose: {
      mop: thinspace,
      mbin: mediumspace,
      mrel: thickspace,
      minner: thinspace
    },
    mpunct: {
      mord: thinspace,
      mop: thinspace,
      mrel: thickspace,
      mopen: thinspace,
      mclose: thinspace,
      mpunct: thinspace,
      minner: thinspace
    },
    minner: {
      mord: thinspace,
      mop: thinspace,
      mbin: mediumspace,
      mrel: thickspace,
      mopen: thinspace,
      mpunct: thinspace,
      minner: thinspace
    }
  };
  var tightSpacings = {
    mord: {
      mop: thinspace
    },
    mop: {
      mord: thinspace,
      mop: thinspace
    },
    mbin: {},
    mrel: {},
    mopen: {},
    mclose: {
      mop: thinspace
    },
    mpunct: {},
    minner: {
      mop: thinspace
    }
  };
  var _functions = {};
  var _htmlGroupBuilders = {};
  var _mathmlGroupBuilders = {};
  function defineFunction(_ref) {
    var {
      type,
      names,
      props,
      handler,
      htmlBuilder: htmlBuilder3,
      mathmlBuilder: mathmlBuilder3
    } = _ref;
    var data = {
      type,
      numArgs: props.numArgs,
      argTypes: props.argTypes,
      allowedInArgument: !!props.allowedInArgument,
      allowedInText: !!props.allowedInText,
      allowedInMath: props.allowedInMath === void 0 ? true : props.allowedInMath,
      numOptionalArgs: props.numOptionalArgs || 0,
      infix: !!props.infix,
      primitive: !!props.primitive,
      handler
    };
    for (var i2 = 0; i2 < names.length; ++i2) {
      _functions[names[i2]] = data;
    }
    if (type) {
      if (htmlBuilder3) {
        _htmlGroupBuilders[type] = htmlBuilder3;
      }
      if (mathmlBuilder3) {
        _mathmlGroupBuilders[type] = mathmlBuilder3;
      }
    }
  }
  function defineFunctionBuilders(_ref2) {
    var {
      type,
      htmlBuilder: htmlBuilder3,
      mathmlBuilder: mathmlBuilder3
    } = _ref2;
    defineFunction({
      type,
      names: [],
      props: {
        numArgs: 0
      },
      handler() {
        throw new Error("Should never be called.");
      },
      htmlBuilder: htmlBuilder3,
      mathmlBuilder: mathmlBuilder3
    });
  }
  var normalizeArgument = function normalizeArgument2(arg) {
    return arg.type === "ordgroup" && arg.body.length === 1 ? arg.body[0] : arg;
  };
  var ordargument = function ordargument2(arg) {
    return arg.type === "ordgroup" ? arg.body : [arg];
  };
  var makeSpan$1 = buildCommon.makeSpan;
  var binLeftCanceller = ["leftmost", "mbin", "mopen", "mrel", "mop", "mpunct"];
  var binRightCanceller = ["rightmost", "mrel", "mclose", "mpunct"];
  var styleMap$1 = {
    "display": Style$1.DISPLAY,
    "text": Style$1.TEXT,
    "script": Style$1.SCRIPT,
    "scriptscript": Style$1.SCRIPTSCRIPT
  };
  var DomEnum = {
    mord: "mord",
    mop: "mop",
    mbin: "mbin",
    mrel: "mrel",
    mopen: "mopen",
    mclose: "mclose",
    mpunct: "mpunct",
    minner: "minner"
  };
  var buildExpression$1 = function buildExpression(expression, options, isRealGroup, surrounding) {
    if (surrounding === void 0) {
      surrounding = [null, null];
    }
    var groups = [];
    for (var i2 = 0; i2 < expression.length; i2++) {
      var output = buildGroup$1(expression[i2], options);
      if (output instanceof DocumentFragment) {
        var children = output.children;
        groups.push(...children);
      } else {
        groups.push(output);
      }
    }
    buildCommon.tryCombineChars(groups);
    if (!isRealGroup) {
      return groups;
    }
    var glueOptions = options;
    if (expression.length === 1) {
      var node = expression[0];
      if (node.type === "sizing") {
        glueOptions = options.havingSize(node.size);
      } else if (node.type === "styling") {
        glueOptions = options.havingStyle(styleMap$1[node.style]);
      }
    }
    var dummyPrev = makeSpan$1([surrounding[0] || "leftmost"], [], options);
    var dummyNext = makeSpan$1([surrounding[1] || "rightmost"], [], options);
    var isRoot = isRealGroup === "root";
    traverseNonSpaceNodes(groups, (node2, prev) => {
      var prevType = prev.classes[0];
      var type = node2.classes[0];
      if (prevType === "mbin" && binRightCanceller.includes(type)) {
        prev.classes[0] = "mord";
      } else if (type === "mbin" && binLeftCanceller.includes(prevType)) {
        node2.classes[0] = "mord";
      }
    }, {
      node: dummyPrev
    }, dummyNext, isRoot);
    traverseNonSpaceNodes(groups, (node2, prev) => {
      var prevType = getTypeOfDomTree(prev);
      var type = getTypeOfDomTree(node2);
      var space = prevType && type ? node2.hasClass("mtight") ? tightSpacings[prevType][type] : spacings[prevType][type] : null;
      if (space) {
        return buildCommon.makeGlue(space, glueOptions);
      }
    }, {
      node: dummyPrev
    }, dummyNext, isRoot);
    return groups;
  };
  var traverseNonSpaceNodes = function traverseNonSpaceNodes2(nodes, callback, prev, next, isRoot) {
    if (next) {
      nodes.push(next);
    }
    var i2 = 0;
    for (; i2 < nodes.length; i2++) {
      var node = nodes[i2];
      var partialGroup = checkPartialGroup(node);
      if (partialGroup) {
        traverseNonSpaceNodes2(partialGroup.children, callback, prev, null, isRoot);
        continue;
      }
      var nonspace = !node.hasClass("mspace");
      if (nonspace) {
        var result = callback(node, prev.node);
        if (result) {
          if (prev.insertAfter) {
            prev.insertAfter(result);
          } else {
            nodes.unshift(result);
            i2++;
          }
        }
      }
      if (nonspace) {
        prev.node = node;
      } else if (isRoot && node.hasClass("newline")) {
        prev.node = makeSpan$1(["leftmost"]);
      }
      prev.insertAfter = /* @__PURE__ */ ((index) => (n) => {
        nodes.splice(index + 1, 0, n);
        i2++;
      })(i2);
    }
    if (next) {
      nodes.pop();
    }
  };
  var checkPartialGroup = function checkPartialGroup2(node) {
    if (node instanceof DocumentFragment || node instanceof Anchor || node instanceof Span && node.hasClass("enclosing")) {
      return node;
    }
    return null;
  };
  var getOutermostNode = function getOutermostNode2(node, side) {
    var partialGroup = checkPartialGroup(node);
    if (partialGroup) {
      var children = partialGroup.children;
      if (children.length) {
        if (side === "right") {
          return getOutermostNode2(children[children.length - 1], "right");
        } else if (side === "left") {
          return getOutermostNode2(children[0], "left");
        }
      }
    }
    return node;
  };
  var getTypeOfDomTree = function getTypeOfDomTree2(node, side) {
    if (!node) {
      return null;
    }
    if (side) {
      node = getOutermostNode(node, side);
    }
    return DomEnum[node.classes[0]] || null;
  };
  var makeNullDelimiter = function makeNullDelimiter2(options, classes) {
    var moreClasses = ["nulldelimiter"].concat(options.baseSizingClasses());
    return makeSpan$1(classes.concat(moreClasses));
  };
  var buildGroup$1 = function buildGroup(group, options, baseOptions) {
    if (!group) {
      return makeSpan$1();
    }
    if (_htmlGroupBuilders[group.type]) {
      var groupNode = _htmlGroupBuilders[group.type](group, options);
      if (baseOptions && options.size !== baseOptions.size) {
        groupNode = makeSpan$1(options.sizingClasses(baseOptions), [groupNode], options);
        var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
        groupNode.height *= multiplier;
        groupNode.depth *= multiplier;
      }
      return groupNode;
    } else {
      throw new ParseError("Got group of unknown type: '" + group.type + "'");
    }
  };
  function buildHTMLUnbreakable(children, options) {
    var body = makeSpan$1(["base"], children, options);
    var strut = makeSpan$1(["strut"]);
    strut.style.height = makeEm(body.height + body.depth);
    if (body.depth) {
      strut.style.verticalAlign = makeEm(-body.depth);
    }
    body.children.unshift(strut);
    return body;
  }
  function buildHTML(tree, options) {
    var tag = null;
    if (tree.length === 1 && tree[0].type === "tag") {
      tag = tree[0].tag;
      tree = tree[0].body;
    }
    var expression = buildExpression$1(tree, options, "root");
    var eqnNum;
    if (expression.length === 2 && expression[1].hasClass("tag")) {
      eqnNum = expression.pop();
    }
    var children = [];
    var parts = [];
    for (var i2 = 0; i2 < expression.length; i2++) {
      parts.push(expression[i2]);
      if (expression[i2].hasClass("mbin") || expression[i2].hasClass("mrel") || expression[i2].hasClass("allowbreak")) {
        var nobreak = false;
        while (i2 < expression.length - 1 && expression[i2 + 1].hasClass("mspace") && !expression[i2 + 1].hasClass("newline")) {
          i2++;
          parts.push(expression[i2]);
          if (expression[i2].hasClass("nobreak")) {
            nobreak = true;
          }
        }
        if (!nobreak) {
          children.push(buildHTMLUnbreakable(parts, options));
          parts = [];
        }
      } else if (expression[i2].hasClass("newline")) {
        parts.pop();
        if (parts.length > 0) {
          children.push(buildHTMLUnbreakable(parts, options));
          parts = [];
        }
        children.push(expression[i2]);
      }
    }
    if (parts.length > 0) {
      children.push(buildHTMLUnbreakable(parts, options));
    }
    var tagChild;
    if (tag) {
      tagChild = buildHTMLUnbreakable(buildExpression$1(tag, options, true));
      tagChild.classes = ["tag"];
      children.push(tagChild);
    } else if (eqnNum) {
      children.push(eqnNum);
    }
    var htmlNode = makeSpan$1(["katex-html"], children);
    htmlNode.setAttribute("aria-hidden", "true");
    if (tagChild) {
      var strut = tagChild.children[0];
      strut.style.height = makeEm(htmlNode.height + htmlNode.depth);
      if (htmlNode.depth) {
        strut.style.verticalAlign = makeEm(-htmlNode.depth);
      }
    }
    return htmlNode;
  }
  function newDocumentFragment(children) {
    return new DocumentFragment(children);
  }
  var MathNode = class {
    constructor(type, children, classes) {
      this.type = void 0;
      this.attributes = void 0;
      this.children = void 0;
      this.classes = void 0;
      this.type = type;
      this.attributes = {};
      this.children = children || [];
      this.classes = classes || [];
    }
    /**
     * Sets an attribute on a MathML node. MathML depends on attributes to convey a
     * semantic content, so this is used heavily.
     */
    setAttribute(name, value) {
      this.attributes[name] = value;
    }
    /**
     * Gets an attribute on a MathML node.
     */
    getAttribute(name) {
      return this.attributes[name];
    }
    /**
     * Converts the math node into a MathML-namespaced DOM element.
     */
    toNode() {
      var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", this.type);
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          node.setAttribute(attr, this.attributes[attr]);
        }
      }
      if (this.classes.length > 0) {
        node.className = createClass(this.classes);
      }
      for (var i2 = 0; i2 < this.children.length; i2++) {
        if (this.children[i2] instanceof TextNode && this.children[i2 + 1] instanceof TextNode) {
          var text2 = this.children[i2].toText() + this.children[++i2].toText();
          while (this.children[i2 + 1] instanceof TextNode) {
            text2 += this.children[++i2].toText();
          }
          node.appendChild(new TextNode(text2).toNode());
        } else {
          node.appendChild(this.children[i2].toNode());
        }
      }
      return node;
    }
    /**
     * Converts the math node into an HTML markup string.
     */
    toMarkup() {
      var markup = "<" + this.type;
      for (var attr in this.attributes) {
        if (Object.prototype.hasOwnProperty.call(this.attributes, attr)) {
          markup += " " + attr + '="';
          markup += utils.escape(this.attributes[attr]);
          markup += '"';
        }
      }
      if (this.classes.length > 0) {
        markup += ' class ="' + utils.escape(createClass(this.classes)) + '"';
      }
      markup += ">";
      for (var i2 = 0; i2 < this.children.length; i2++) {
        markup += this.children[i2].toMarkup();
      }
      markup += "</" + this.type + ">";
      return markup;
    }
    /**
     * Converts the math node into a string, similar to innerText, but escaped.
     */
    toText() {
      return this.children.map((child) => child.toText()).join("");
    }
  };
  var TextNode = class {
    constructor(text2) {
      this.text = void 0;
      this.text = text2;
    }
    /**
     * Converts the text node into a DOM text node.
     */
    toNode() {
      return document.createTextNode(this.text);
    }
    /**
     * Converts the text node into escaped HTML markup
     * (representing the text itself).
     */
    toMarkup() {
      return utils.escape(this.toText());
    }
    /**
     * Converts the text node into a string
     * (representing the text itself).
     */
    toText() {
      return this.text;
    }
  };
  var SpaceNode = class {
    /**
     * Create a Space node with width given in CSS ems.
     */
    constructor(width) {
      this.width = void 0;
      this.character = void 0;
      this.width = width;
      if (width >= 0.05555 && width <= 0.05556) {
        this.character = "\u200A";
      } else if (width >= 0.1666 && width <= 0.1667) {
        this.character = "\u2009";
      } else if (width >= 0.2222 && width <= 0.2223) {
        this.character = "\u2005";
      } else if (width >= 0.2777 && width <= 0.2778) {
        this.character = "\u2005\u200A";
      } else if (width >= -0.05556 && width <= -0.05555) {
        this.character = "\u200A\u2063";
      } else if (width >= -0.1667 && width <= -0.1666) {
        this.character = "\u2009\u2063";
      } else if (width >= -0.2223 && width <= -0.2222) {
        this.character = "\u205F\u2063";
      } else if (width >= -0.2778 && width <= -0.2777) {
        this.character = "\u2005\u2063";
      } else {
        this.character = null;
      }
    }
    /**
     * Converts the math node into a MathML-namespaced DOM element.
     */
    toNode() {
      if (this.character) {
        return document.createTextNode(this.character);
      } else {
        var node = document.createElementNS("http://www.w3.org/1998/Math/MathML", "mspace");
        node.setAttribute("width", makeEm(this.width));
        return node;
      }
    }
    /**
     * Converts the math node into an HTML markup string.
     */
    toMarkup() {
      if (this.character) {
        return "<mtext>" + this.character + "</mtext>";
      } else {
        return '<mspace width="' + makeEm(this.width) + '"/>';
      }
    }
    /**
     * Converts the math node into a string, similar to innerText.
     */
    toText() {
      if (this.character) {
        return this.character;
      } else {
        return " ";
      }
    }
  };
  var mathMLTree = {
    MathNode,
    TextNode,
    SpaceNode,
    newDocumentFragment
  };
  var makeText = function makeText2(text2, mode, options) {
    if (symbols[mode][text2] && symbols[mode][text2].replace && text2.charCodeAt(0) !== 55349 && !(ligatures.hasOwnProperty(text2) && options && (options.fontFamily && options.fontFamily.slice(4, 6) === "tt" || options.font && options.font.slice(4, 6) === "tt"))) {
      text2 = symbols[mode][text2].replace;
    }
    return new mathMLTree.TextNode(text2);
  };
  var makeRow = function makeRow2(body) {
    if (body.length === 1) {
      return body[0];
    } else {
      return new mathMLTree.MathNode("mrow", body);
    }
  };
  var getVariant = function getVariant2(group, options) {
    if (options.fontFamily === "texttt") {
      return "monospace";
    } else if (options.fontFamily === "textsf") {
      if (options.fontShape === "textit" && options.fontWeight === "textbf") {
        return "sans-serif-bold-italic";
      } else if (options.fontShape === "textit") {
        return "sans-serif-italic";
      } else if (options.fontWeight === "textbf") {
        return "bold-sans-serif";
      } else {
        return "sans-serif";
      }
    } else if (options.fontShape === "textit" && options.fontWeight === "textbf") {
      return "bold-italic";
    } else if (options.fontShape === "textit") {
      return "italic";
    } else if (options.fontWeight === "textbf") {
      return "bold";
    }
    var font = options.font;
    if (!font || font === "mathnormal") {
      return null;
    }
    var mode = group.mode;
    if (font === "mathit") {
      return "italic";
    } else if (font === "boldsymbol") {
      return group.type === "textord" ? "bold" : "bold-italic";
    } else if (font === "mathbf") {
      return "bold";
    } else if (font === "mathbb") {
      return "double-struck";
    } else if (font === "mathsfit") {
      return "sans-serif-italic";
    } else if (font === "mathfrak") {
      return "fraktur";
    } else if (font === "mathscr" || font === "mathcal") {
      return "script";
    } else if (font === "mathsf") {
      return "sans-serif";
    } else if (font === "mathtt") {
      return "monospace";
    }
    var text2 = group.text;
    if (["\\imath", "\\jmath"].includes(text2)) {
      return null;
    }
    if (symbols[mode][text2] && symbols[mode][text2].replace) {
      text2 = symbols[mode][text2].replace;
    }
    var fontName = buildCommon.fontMap[font].fontName;
    if (getCharacterMetrics(text2, fontName, mode)) {
      return buildCommon.fontMap[font].variant;
    }
    return null;
  };
  function isNumberPunctuation(group) {
    if (!group) {
      return false;
    }
    if (group.type === "mi" && group.children.length === 1) {
      var child = group.children[0];
      return child instanceof TextNode && child.text === ".";
    } else if (group.type === "mo" && group.children.length === 1 && group.getAttribute("separator") === "true" && group.getAttribute("lspace") === "0em" && group.getAttribute("rspace") === "0em") {
      var _child = group.children[0];
      return _child instanceof TextNode && _child.text === ",";
    } else {
      return false;
    }
  }
  var buildExpression2 = function buildExpression3(expression, options, isOrdgroup) {
    if (expression.length === 1) {
      var group = buildGroup2(expression[0], options);
      if (isOrdgroup && group instanceof MathNode && group.type === "mo") {
        group.setAttribute("lspace", "0em");
        group.setAttribute("rspace", "0em");
      }
      return [group];
    }
    var groups = [];
    var lastGroup;
    for (var i2 = 0; i2 < expression.length; i2++) {
      var _group = buildGroup2(expression[i2], options);
      if (_group instanceof MathNode && lastGroup instanceof MathNode) {
        if (_group.type === "mtext" && lastGroup.type === "mtext" && _group.getAttribute("mathvariant") === lastGroup.getAttribute("mathvariant")) {
          lastGroup.children.push(..._group.children);
          continue;
        } else if (_group.type === "mn" && lastGroup.type === "mn") {
          lastGroup.children.push(..._group.children);
          continue;
        } else if (isNumberPunctuation(_group) && lastGroup.type === "mn") {
          lastGroup.children.push(..._group.children);
          continue;
        } else if (_group.type === "mn" && isNumberPunctuation(lastGroup)) {
          _group.children = [...lastGroup.children, ..._group.children];
          groups.pop();
        } else if ((_group.type === "msup" || _group.type === "msub") && _group.children.length >= 1 && (lastGroup.type === "mn" || isNumberPunctuation(lastGroup))) {
          var base = _group.children[0];
          if (base instanceof MathNode && base.type === "mn") {
            base.children = [...lastGroup.children, ...base.children];
            groups.pop();
          }
        } else if (lastGroup.type === "mi" && lastGroup.children.length === 1) {
          var lastChild = lastGroup.children[0];
          if (lastChild instanceof TextNode && lastChild.text === "\u0338" && (_group.type === "mo" || _group.type === "mi" || _group.type === "mn")) {
            var child = _group.children[0];
            if (child instanceof TextNode && child.text.length > 0) {
              child.text = child.text.slice(0, 1) + "\u0338" + child.text.slice(1);
              groups.pop();
            }
          }
        }
      }
      groups.push(_group);
      lastGroup = _group;
    }
    return groups;
  };
  var buildExpressionRow = function buildExpressionRow2(expression, options, isOrdgroup) {
    return makeRow(buildExpression2(expression, options, isOrdgroup));
  };
  var buildGroup2 = function buildGroup3(group, options) {
    if (!group) {
      return new mathMLTree.MathNode("mrow");
    }
    if (_mathmlGroupBuilders[group.type]) {
      var result = _mathmlGroupBuilders[group.type](group, options);
      return result;
    } else {
      throw new ParseError("Got group of unknown type: '" + group.type + "'");
    }
  };
  function buildMathML(tree, texExpression, options, isDisplayMode, forMathmlOnly) {
    var expression = buildExpression2(tree, options);
    var wrapper;
    if (expression.length === 1 && expression[0] instanceof MathNode && ["mrow", "mtable"].includes(expression[0].type)) {
      wrapper = expression[0];
    } else {
      wrapper = new mathMLTree.MathNode("mrow", expression);
    }
    var annotation = new mathMLTree.MathNode("annotation", [new mathMLTree.TextNode(texExpression)]);
    annotation.setAttribute("encoding", "application/x-tex");
    var semantics = new mathMLTree.MathNode("semantics", [wrapper, annotation]);
    var math2 = new mathMLTree.MathNode("math", [semantics]);
    math2.setAttribute("xmlns", "http://www.w3.org/1998/Math/MathML");
    if (isDisplayMode) {
      math2.setAttribute("display", "block");
    }
    var wrapperClass = forMathmlOnly ? "katex" : "katex-mathml";
    return buildCommon.makeSpan([wrapperClass], [math2]);
  }
  var optionsFromSettings = function optionsFromSettings2(settings) {
    return new Options({
      style: settings.displayMode ? Style$1.DISPLAY : Style$1.TEXT,
      maxSize: settings.maxSize,
      minRuleThickness: settings.minRuleThickness
    });
  };
  var displayWrap = function displayWrap2(node, settings) {
    if (settings.displayMode) {
      var classes = ["katex-display"];
      if (settings.leqno) {
        classes.push("leqno");
      }
      if (settings.fleqn) {
        classes.push("fleqn");
      }
      node = buildCommon.makeSpan(classes, [node]);
    }
    return node;
  };
  var buildTree = function buildTree2(tree, expression, settings) {
    var options = optionsFromSettings(settings);
    var katexNode;
    if (settings.output === "mathml") {
      return buildMathML(tree, expression, options, settings.displayMode, true);
    } else if (settings.output === "html") {
      var htmlNode = buildHTML(tree, options);
      katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
    } else {
      var mathMLNode = buildMathML(tree, expression, options, settings.displayMode, false);
      var _htmlNode = buildHTML(tree, options);
      katexNode = buildCommon.makeSpan(["katex"], [mathMLNode, _htmlNode]);
    }
    return displayWrap(katexNode, settings);
  };
  var buildHTMLTree = function buildHTMLTree2(tree, expression, settings) {
    var options = optionsFromSettings(settings);
    var htmlNode = buildHTML(tree, options);
    var katexNode = buildCommon.makeSpan(["katex"], [htmlNode]);
    return displayWrap(katexNode, settings);
  };
  var stretchyCodePoint = {
    widehat: "^",
    widecheck: "\u02C7",
    widetilde: "~",
    utilde: "~",
    overleftarrow: "\u2190",
    underleftarrow: "\u2190",
    xleftarrow: "\u2190",
    overrightarrow: "\u2192",
    underrightarrow: "\u2192",
    xrightarrow: "\u2192",
    underbrace: "\u23DF",
    overbrace: "\u23DE",
    overgroup: "\u23E0",
    undergroup: "\u23E1",
    overleftrightarrow: "\u2194",
    underleftrightarrow: "\u2194",
    xleftrightarrow: "\u2194",
    Overrightarrow: "\u21D2",
    xRightarrow: "\u21D2",
    overleftharpoon: "\u21BC",
    xleftharpoonup: "\u21BC",
    overrightharpoon: "\u21C0",
    xrightharpoonup: "\u21C0",
    xLeftarrow: "\u21D0",
    xLeftrightarrow: "\u21D4",
    xhookleftarrow: "\u21A9",
    xhookrightarrow: "\u21AA",
    xmapsto: "\u21A6",
    xrightharpoondown: "\u21C1",
    xleftharpoondown: "\u21BD",
    xrightleftharpoons: "\u21CC",
    xleftrightharpoons: "\u21CB",
    xtwoheadleftarrow: "\u219E",
    xtwoheadrightarrow: "\u21A0",
    xlongequal: "=",
    xtofrom: "\u21C4",
    xrightleftarrows: "\u21C4",
    xrightequilibrium: "\u21CC",
    // Not a perfect match.
    xleftequilibrium: "\u21CB",
    // None better available.
    "\\cdrightarrow": "\u2192",
    "\\cdleftarrow": "\u2190",
    "\\cdlongequal": "="
  };
  var mathMLnode = function mathMLnode2(label) {
    var node = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(stretchyCodePoint[label.replace(/^\\/, "")])]);
    node.setAttribute("stretchy", "true");
    return node;
  };
  var katexImagesData = {
    //   path(s), minWidth, height, align
    overrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    overleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    underrightarrow: [["rightarrow"], 0.888, 522, "xMaxYMin"],
    underleftarrow: [["leftarrow"], 0.888, 522, "xMinYMin"],
    xrightarrow: [["rightarrow"], 1.469, 522, "xMaxYMin"],
    "\\cdrightarrow": [["rightarrow"], 3, 522, "xMaxYMin"],
    // CD minwwidth2.5pc
    xleftarrow: [["leftarrow"], 1.469, 522, "xMinYMin"],
    "\\cdleftarrow": [["leftarrow"], 3, 522, "xMinYMin"],
    Overrightarrow: [["doublerightarrow"], 0.888, 560, "xMaxYMin"],
    xRightarrow: [["doublerightarrow"], 1.526, 560, "xMaxYMin"],
    xLeftarrow: [["doubleleftarrow"], 1.526, 560, "xMinYMin"],
    overleftharpoon: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoonup: [["leftharpoon"], 0.888, 522, "xMinYMin"],
    xleftharpoondown: [["leftharpoondown"], 0.888, 522, "xMinYMin"],
    overrightharpoon: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoonup: [["rightharpoon"], 0.888, 522, "xMaxYMin"],
    xrightharpoondown: [["rightharpoondown"], 0.888, 522, "xMaxYMin"],
    xlongequal: [["longequal"], 0.888, 334, "xMinYMin"],
    "\\cdlongequal": [["longequal"], 3, 334, "xMinYMin"],
    xtwoheadleftarrow: [["twoheadleftarrow"], 0.888, 334, "xMinYMin"],
    xtwoheadrightarrow: [["twoheadrightarrow"], 0.888, 334, "xMaxYMin"],
    overleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    overbrace: [["leftbrace", "midbrace", "rightbrace"], 1.6, 548],
    underbrace: [["leftbraceunder", "midbraceunder", "rightbraceunder"], 1.6, 548],
    underleftrightarrow: [["leftarrow", "rightarrow"], 0.888, 522],
    xleftrightarrow: [["leftarrow", "rightarrow"], 1.75, 522],
    xLeftrightarrow: [["doubleleftarrow", "doublerightarrow"], 1.75, 560],
    xrightleftharpoons: [["leftharpoondownplus", "rightharpoonplus"], 1.75, 716],
    xleftrightharpoons: [["leftharpoonplus", "rightharpoondownplus"], 1.75, 716],
    xhookleftarrow: [["leftarrow", "righthook"], 1.08, 522],
    xhookrightarrow: [["lefthook", "rightarrow"], 1.08, 522],
    overlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    underlinesegment: [["leftlinesegment", "rightlinesegment"], 0.888, 522],
    overgroup: [["leftgroup", "rightgroup"], 0.888, 342],
    undergroup: [["leftgroupunder", "rightgroupunder"], 0.888, 342],
    xmapsto: [["leftmapsto", "rightarrow"], 1.5, 522],
    xtofrom: [["leftToFrom", "rightToFrom"], 1.75, 528],
    // The next three arrows are from the mhchem package.
    // In mhchem.sty, min-length is 2.0em. But these arrows might appear in the
    // document as \xrightarrow or \xrightleftharpoons. Those have
    // min-length = 1.75em, so we set min-length on these next three to match.
    xrightleftarrows: [["baraboveleftarrow", "rightarrowabovebar"], 1.75, 901],
    xrightequilibrium: [["baraboveshortleftharpoon", "rightharpoonaboveshortbar"], 1.75, 716],
    xleftequilibrium: [["shortbaraboveleftharpoon", "shortrightharpoonabovebar"], 1.75, 716]
  };
  var groupLength = function groupLength2(arg) {
    if (arg.type === "ordgroup") {
      return arg.body.length;
    } else {
      return 1;
    }
  };
  var svgSpan = function svgSpan2(group, options) {
    function buildSvgSpan_() {
      var viewBoxWidth = 4e5;
      var label = group.label.slice(1);
      if (["widehat", "widecheck", "widetilde", "utilde"].includes(label)) {
        var grp = group;
        var numChars = groupLength(grp.base);
        var viewBoxHeight;
        var pathName;
        var _height;
        if (numChars > 5) {
          if (label === "widehat" || label === "widecheck") {
            viewBoxHeight = 420;
            viewBoxWidth = 2364;
            _height = 0.42;
            pathName = label + "4";
          } else {
            viewBoxHeight = 312;
            viewBoxWidth = 2340;
            _height = 0.34;
            pathName = "tilde4";
          }
        } else {
          var imgIndex = [1, 1, 2, 2, 3, 3][numChars];
          if (label === "widehat" || label === "widecheck") {
            viewBoxWidth = [0, 1062, 2364, 2364, 2364][imgIndex];
            viewBoxHeight = [0, 239, 300, 360, 420][imgIndex];
            _height = [0, 0.24, 0.3, 0.3, 0.36, 0.42][imgIndex];
            pathName = label + imgIndex;
          } else {
            viewBoxWidth = [0, 600, 1033, 2339, 2340][imgIndex];
            viewBoxHeight = [0, 260, 286, 306, 312][imgIndex];
            _height = [0, 0.26, 0.286, 0.3, 0.306, 0.34][imgIndex];
            pathName = "tilde" + imgIndex;
          }
        }
        var path2 = new PathNode(pathName);
        var svgNode = new SvgNode([path2], {
          "width": "100%",
          "height": makeEm(_height),
          "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight,
          "preserveAspectRatio": "none"
        });
        return {
          span: buildCommon.makeSvgSpan([], [svgNode], options),
          minWidth: 0,
          height: _height
        };
      } else {
        var spans = [];
        var data = katexImagesData[label];
        var [paths, _minWidth, _viewBoxHeight] = data;
        var _height2 = _viewBoxHeight / 1e3;
        var numSvgChildren = paths.length;
        var widthClasses;
        var aligns;
        if (numSvgChildren === 1) {
          var align1 = data[3];
          widthClasses = ["hide-tail"];
          aligns = [align1];
        } else if (numSvgChildren === 2) {
          widthClasses = ["halfarrow-left", "halfarrow-right"];
          aligns = ["xMinYMin", "xMaxYMin"];
        } else if (numSvgChildren === 3) {
          widthClasses = ["brace-left", "brace-center", "brace-right"];
          aligns = ["xMinYMin", "xMidYMin", "xMaxYMin"];
        } else {
          throw new Error("Correct katexImagesData or update code here to support\n                    " + numSvgChildren + " children.");
        }
        for (var i2 = 0; i2 < numSvgChildren; i2++) {
          var _path = new PathNode(paths[i2]);
          var _svgNode = new SvgNode([_path], {
            "width": "400em",
            "height": makeEm(_height2),
            "viewBox": "0 0 " + viewBoxWidth + " " + _viewBoxHeight,
            "preserveAspectRatio": aligns[i2] + " slice"
          });
          var _span = buildCommon.makeSvgSpan([widthClasses[i2]], [_svgNode], options);
          if (numSvgChildren === 1) {
            return {
              span: _span,
              minWidth: _minWidth,
              height: _height2
            };
          } else {
            _span.style.height = makeEm(_height2);
            spans.push(_span);
          }
        }
        return {
          span: buildCommon.makeSpan(["stretchy"], spans, options),
          minWidth: _minWidth,
          height: _height2
        };
      }
    }
    var {
      span,
      minWidth,
      height
    } = buildSvgSpan_();
    span.height = height;
    span.style.height = makeEm(height);
    if (minWidth > 0) {
      span.style.minWidth = makeEm(minWidth);
    }
    return span;
  };
  var encloseSpan = function encloseSpan2(inner2, label, topPad, bottomPad, options) {
    var img;
    var totalHeight = inner2.height + inner2.depth + topPad + bottomPad;
    if (/fbox|color|angl/.test(label)) {
      img = buildCommon.makeSpan(["stretchy", label], [], options);
      if (label === "fbox") {
        var color = options.color && options.getColor();
        if (color) {
          img.style.borderColor = color;
        }
      }
    } else {
      var lines = [];
      if (/^[bx]cancel$/.test(label)) {
        lines.push(new LineNode({
          "x1": "0",
          "y1": "0",
          "x2": "100%",
          "y2": "100%",
          "stroke-width": "0.046em"
        }));
      }
      if (/^x?cancel$/.test(label)) {
        lines.push(new LineNode({
          "x1": "0",
          "y1": "100%",
          "x2": "100%",
          "y2": "0",
          "stroke-width": "0.046em"
        }));
      }
      var svgNode = new SvgNode(lines, {
        "width": "100%",
        "height": makeEm(totalHeight)
      });
      img = buildCommon.makeSvgSpan([], [svgNode], options);
    }
    img.height = totalHeight;
    img.style.height = makeEm(totalHeight);
    return img;
  };
  var stretchy = {
    encloseSpan,
    mathMLnode,
    svgSpan
  };
  function assertNodeType(node, type) {
    if (!node || node.type !== type) {
      throw new Error("Expected node of type " + type + ", but got " + (node ? "node of type " + node.type : String(node)));
    }
    return node;
  }
  function assertSymbolNodeType(node) {
    var typedNode = checkSymbolNodeType(node);
    if (!typedNode) {
      throw new Error("Expected node of symbol group type, but got " + (node ? "node of type " + node.type : String(node)));
    }
    return typedNode;
  }
  function checkSymbolNodeType(node) {
    if (node && (node.type === "atom" || NON_ATOMS.hasOwnProperty(node.type))) {
      return node;
    }
    return null;
  }
  var htmlBuilder$a = (grp, options) => {
    var base;
    var group;
    var supSubGroup;
    if (grp && grp.type === "supsub") {
      group = assertNodeType(grp.base, "accent");
      base = group.base;
      grp.base = base;
      supSubGroup = assertSpan(buildGroup$1(grp, options));
      grp.base = group;
    } else {
      group = assertNodeType(grp, "accent");
      base = group.base;
    }
    var body = buildGroup$1(base, options.havingCrampedStyle());
    var mustShift = group.isShifty && utils.isCharacterBox(base);
    var skew = 0;
    if (mustShift) {
      var baseChar = utils.getBaseElem(base);
      var baseGroup = buildGroup$1(baseChar, options.havingCrampedStyle());
      skew = assertSymbolDomNode(baseGroup).skew;
    }
    var accentBelow = group.label === "\\c";
    var clearance = accentBelow ? body.height + body.depth : Math.min(body.height, options.fontMetrics().xHeight);
    var accentBody;
    if (!group.isStretchy) {
      var accent2;
      var width;
      if (group.label === "\\vec") {
        accent2 = buildCommon.staticSvg("vec", options);
        width = buildCommon.svgData.vec[1];
      } else {
        accent2 = buildCommon.makeOrd({
          mode: group.mode,
          text: group.label
        }, options, "textord");
        accent2 = assertSymbolDomNode(accent2);
        accent2.italic = 0;
        width = accent2.width;
        if (accentBelow) {
          clearance += accent2.depth;
        }
      }
      accentBody = buildCommon.makeSpan(["accent-body"], [accent2]);
      var accentFull = group.label === "\\textcircled";
      if (accentFull) {
        accentBody.classes.push("accent-full");
        clearance = body.height;
      }
      var left = skew;
      if (!accentFull) {
        left -= width / 2;
      }
      accentBody.style.left = makeEm(left);
      if (group.label === "\\textcircled") {
        accentBody.style.top = ".2em";
      }
      accentBody = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: body
        }, {
          type: "kern",
          size: -clearance
        }, {
          type: "elem",
          elem: accentBody
        }]
      }, options);
    } else {
      accentBody = stretchy.svgSpan(group, options);
      accentBody = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: body
        }, {
          type: "elem",
          elem: accentBody,
          wrapperClasses: ["svg-align"],
          wrapperStyle: skew > 0 ? {
            width: "calc(100% - " + makeEm(2 * skew) + ")",
            marginLeft: makeEm(2 * skew)
          } : void 0
        }]
      }, options);
    }
    var accentWrap = buildCommon.makeSpan(["mord", "accent"], [accentBody], options);
    if (supSubGroup) {
      supSubGroup.children[0] = accentWrap;
      supSubGroup.height = Math.max(accentWrap.height, supSubGroup.height);
      supSubGroup.classes[0] = "mord";
      return supSubGroup;
    } else {
      return accentWrap;
    }
  };
  var mathmlBuilder$9 = (group, options) => {
    var accentNode = group.isStretchy ? stretchy.mathMLnode(group.label) : new mathMLTree.MathNode("mo", [makeText(group.label, group.mode)]);
    var node = new mathMLTree.MathNode("mover", [buildGroup2(group.base, options), accentNode]);
    node.setAttribute("accent", "true");
    return node;
  };
  var NON_STRETCHY_ACCENT_REGEX = new RegExp(["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring"].map((accent2) => "\\" + accent2).join("|"));
  defineFunction({
    type: "accent",
    names: ["\\acute", "\\grave", "\\ddot", "\\tilde", "\\bar", "\\breve", "\\check", "\\hat", "\\vec", "\\dot", "\\mathring", "\\widecheck", "\\widehat", "\\widetilde", "\\overrightarrow", "\\overleftarrow", "\\Overrightarrow", "\\overleftrightarrow", "\\overgroup", "\\overlinesegment", "\\overleftharpoon", "\\overrightharpoon"],
    props: {
      numArgs: 1
    },
    handler: (context, args) => {
      var base = normalizeArgument(args[0]);
      var isStretchy = !NON_STRETCHY_ACCENT_REGEX.test(context.funcName);
      var isShifty = !isStretchy || context.funcName === "\\widehat" || context.funcName === "\\widetilde" || context.funcName === "\\widecheck";
      return {
        type: "accent",
        mode: context.parser.mode,
        label: context.funcName,
        isStretchy,
        isShifty,
        base
      };
    },
    htmlBuilder: htmlBuilder$a,
    mathmlBuilder: mathmlBuilder$9
  });
  defineFunction({
    type: "accent",
    names: ["\\'", "\\`", "\\^", "\\~", "\\=", "\\u", "\\.", '\\"', "\\c", "\\r", "\\H", "\\v", "\\textcircled"],
    props: {
      numArgs: 1,
      allowedInText: true,
      allowedInMath: true,
      // unless in strict mode
      argTypes: ["primitive"]
    },
    handler: (context, args) => {
      var base = args[0];
      var mode = context.parser.mode;
      if (mode === "math") {
        context.parser.settings.reportNonstrict("mathVsTextAccents", "LaTeX's accent " + context.funcName + " works only in text mode");
        mode = "text";
      }
      return {
        type: "accent",
        mode,
        label: context.funcName,
        isStretchy: false,
        isShifty: true,
        base
      };
    },
    htmlBuilder: htmlBuilder$a,
    mathmlBuilder: mathmlBuilder$9
  });
  defineFunction({
    type: "accentUnder",
    names: ["\\underleftarrow", "\\underrightarrow", "\\underleftrightarrow", "\\undergroup", "\\underlinesegment", "\\utilde"],
    props: {
      numArgs: 1
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var base = args[0];
      return {
        type: "accentUnder",
        mode: parser.mode,
        label: funcName,
        base
      };
    },
    htmlBuilder: (group, options) => {
      var innerGroup = buildGroup$1(group.base, options);
      var accentBody = stretchy.svgSpan(group, options);
      var kern = group.label === "\\utilde" ? 0.12 : 0;
      var vlist = buildCommon.makeVList({
        positionType: "top",
        positionData: innerGroup.height,
        children: [{
          type: "elem",
          elem: accentBody,
          wrapperClasses: ["svg-align"]
        }, {
          type: "kern",
          size: kern
        }, {
          type: "elem",
          elem: innerGroup
        }]
      }, options);
      return buildCommon.makeSpan(["mord", "accentunder"], [vlist], options);
    },
    mathmlBuilder: (group, options) => {
      var accentNode = stretchy.mathMLnode(group.label);
      var node = new mathMLTree.MathNode("munder", [buildGroup2(group.base, options), accentNode]);
      node.setAttribute("accentunder", "true");
      return node;
    }
  });
  var paddedNode = (group) => {
    var node = new mathMLTree.MathNode("mpadded", group ? [group] : []);
    node.setAttribute("width", "+0.6em");
    node.setAttribute("lspace", "0.3em");
    return node;
  };
  defineFunction({
    type: "xArrow",
    names: [
      "\\xleftarrow",
      "\\xrightarrow",
      "\\xLeftarrow",
      "\\xRightarrow",
      "\\xleftrightarrow",
      "\\xLeftrightarrow",
      "\\xhookleftarrow",
      "\\xhookrightarrow",
      "\\xmapsto",
      "\\xrightharpoondown",
      "\\xrightharpoonup",
      "\\xleftharpoondown",
      "\\xleftharpoonup",
      "\\xrightleftharpoons",
      "\\xleftrightharpoons",
      "\\xlongequal",
      "\\xtwoheadrightarrow",
      "\\xtwoheadleftarrow",
      "\\xtofrom",
      // The next 3 functions are here to support the mhchem extension.
      // Direct use of these functions is discouraged and may break someday.
      "\\xrightleftarrows",
      "\\xrightequilibrium",
      "\\xleftequilibrium",
      // The next 3 functions are here only to support the {CD} environment.
      "\\\\cdrightarrow",
      "\\\\cdleftarrow",
      "\\\\cdlongequal"
    ],
    props: {
      numArgs: 1,
      numOptionalArgs: 1
    },
    handler(_ref, args, optArgs) {
      var {
        parser,
        funcName
      } = _ref;
      return {
        type: "xArrow",
        mode: parser.mode,
        label: funcName,
        body: args[0],
        below: optArgs[0]
      };
    },
    // Flow is unable to correctly infer the type of `group`, even though it's
    // unambiguously determined from the passed-in `type` above.
    htmlBuilder(group, options) {
      var style = options.style;
      var newOptions = options.havingStyle(style.sup());
      var upperGroup = buildCommon.wrapFragment(buildGroup$1(group.body, newOptions, options), options);
      var arrowPrefix = group.label.slice(0, 2) === "\\x" ? "x" : "cd";
      upperGroup.classes.push(arrowPrefix + "-arrow-pad");
      var lowerGroup;
      if (group.below) {
        newOptions = options.havingStyle(style.sub());
        lowerGroup = buildCommon.wrapFragment(buildGroup$1(group.below, newOptions, options), options);
        lowerGroup.classes.push(arrowPrefix + "-arrow-pad");
      }
      var arrowBody = stretchy.svgSpan(group, options);
      var arrowShift = -options.fontMetrics().axisHeight + 0.5 * arrowBody.height;
      var upperShift = -options.fontMetrics().axisHeight - 0.5 * arrowBody.height - 0.111;
      if (upperGroup.depth > 0.25 || group.label === "\\xleftequilibrium") {
        upperShift -= upperGroup.depth;
      }
      var vlist;
      if (lowerGroup) {
        var lowerShift = -options.fontMetrics().axisHeight + lowerGroup.height + 0.5 * arrowBody.height + 0.111;
        vlist = buildCommon.makeVList({
          positionType: "individualShift",
          children: [{
            type: "elem",
            elem: upperGroup,
            shift: upperShift
          }, {
            type: "elem",
            elem: arrowBody,
            shift: arrowShift
          }, {
            type: "elem",
            elem: lowerGroup,
            shift: lowerShift
          }]
        }, options);
      } else {
        vlist = buildCommon.makeVList({
          positionType: "individualShift",
          children: [{
            type: "elem",
            elem: upperGroup,
            shift: upperShift
          }, {
            type: "elem",
            elem: arrowBody,
            shift: arrowShift
          }]
        }, options);
      }
      vlist.children[0].children[0].children[1].classes.push("svg-align");
      return buildCommon.makeSpan(["mrel", "x-arrow"], [vlist], options);
    },
    mathmlBuilder(group, options) {
      var arrowNode = stretchy.mathMLnode(group.label);
      arrowNode.setAttribute("minsize", group.label.charAt(0) === "x" ? "1.75em" : "3.0em");
      var node;
      if (group.body) {
        var upperNode = paddedNode(buildGroup2(group.body, options));
        if (group.below) {
          var lowerNode = paddedNode(buildGroup2(group.below, options));
          node = new mathMLTree.MathNode("munderover", [arrowNode, lowerNode, upperNode]);
        } else {
          node = new mathMLTree.MathNode("mover", [arrowNode, upperNode]);
        }
      } else if (group.below) {
        var _lowerNode = paddedNode(buildGroup2(group.below, options));
        node = new mathMLTree.MathNode("munder", [arrowNode, _lowerNode]);
      } else {
        node = paddedNode();
        node = new mathMLTree.MathNode("mover", [arrowNode, node]);
      }
      return node;
    }
  });
  var makeSpan2 = buildCommon.makeSpan;
  function htmlBuilder$9(group, options) {
    var elements = buildExpression$1(group.body, options, true);
    return makeSpan2([group.mclass], elements, options);
  }
  function mathmlBuilder$8(group, options) {
    var node;
    var inner2 = buildExpression2(group.body, options);
    if (group.mclass === "minner") {
      node = new mathMLTree.MathNode("mpadded", inner2);
    } else if (group.mclass === "mord") {
      if (group.isCharacterBox) {
        node = inner2[0];
        node.type = "mi";
      } else {
        node = new mathMLTree.MathNode("mi", inner2);
      }
    } else {
      if (group.isCharacterBox) {
        node = inner2[0];
        node.type = "mo";
      } else {
        node = new mathMLTree.MathNode("mo", inner2);
      }
      if (group.mclass === "mbin") {
        node.attributes.lspace = "0.22em";
        node.attributes.rspace = "0.22em";
      } else if (group.mclass === "mpunct") {
        node.attributes.lspace = "0em";
        node.attributes.rspace = "0.17em";
      } else if (group.mclass === "mopen" || group.mclass === "mclose") {
        node.attributes.lspace = "0em";
        node.attributes.rspace = "0em";
      } else if (group.mclass === "minner") {
        node.attributes.lspace = "0.0556em";
        node.attributes.width = "+0.1111em";
      }
    }
    return node;
  }
  defineFunction({
    type: "mclass",
    names: ["\\mathord", "\\mathbin", "\\mathrel", "\\mathopen", "\\mathclose", "\\mathpunct", "\\mathinner"],
    props: {
      numArgs: 1,
      primitive: true
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      var body = args[0];
      return {
        type: "mclass",
        mode: parser.mode,
        mclass: "m" + funcName.slice(5),
        // TODO(kevinb): don't prefix with 'm'
        body: ordargument(body),
        isCharacterBox: utils.isCharacterBox(body)
      };
    },
    htmlBuilder: htmlBuilder$9,
    mathmlBuilder: mathmlBuilder$8
  });
  var binrelClass = (arg) => {
    var atom = arg.type === "ordgroup" && arg.body.length ? arg.body[0] : arg;
    if (atom.type === "atom" && (atom.family === "bin" || atom.family === "rel")) {
      return "m" + atom.family;
    } else {
      return "mord";
    }
  };
  defineFunction({
    type: "mclass",
    names: ["\\@binrel"],
    props: {
      numArgs: 2
    },
    handler(_ref2, args) {
      var {
        parser
      } = _ref2;
      return {
        type: "mclass",
        mode: parser.mode,
        mclass: binrelClass(args[0]),
        body: ordargument(args[1]),
        isCharacterBox: utils.isCharacterBox(args[1])
      };
    }
  });
  defineFunction({
    type: "mclass",
    names: ["\\stackrel", "\\overset", "\\underset"],
    props: {
      numArgs: 2
    },
    handler(_ref3, args) {
      var {
        parser,
        funcName
      } = _ref3;
      var baseArg = args[1];
      var shiftedArg = args[0];
      var mclass;
      if (funcName !== "\\stackrel") {
        mclass = binrelClass(baseArg);
      } else {
        mclass = "mrel";
      }
      var baseOp = {
        type: "op",
        mode: baseArg.mode,
        limits: true,
        alwaysHandleSupSub: true,
        parentIsSupSub: false,
        symbol: false,
        suppressBaseShift: funcName !== "\\stackrel",
        body: ordargument(baseArg)
      };
      var supsub = {
        type: "supsub",
        mode: shiftedArg.mode,
        base: baseOp,
        sup: funcName === "\\underset" ? null : shiftedArg,
        sub: funcName === "\\underset" ? shiftedArg : null
      };
      return {
        type: "mclass",
        mode: parser.mode,
        mclass,
        body: [supsub],
        isCharacterBox: utils.isCharacterBox(supsub)
      };
    },
    htmlBuilder: htmlBuilder$9,
    mathmlBuilder: mathmlBuilder$8
  });
  defineFunction({
    type: "pmb",
    names: ["\\pmb"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      return {
        type: "pmb",
        mode: parser.mode,
        mclass: binrelClass(args[0]),
        body: ordargument(args[0])
      };
    },
    htmlBuilder(group, options) {
      var elements = buildExpression$1(group.body, options, true);
      var node = buildCommon.makeSpan([group.mclass], elements, options);
      node.style.textShadow = "0.02em 0.01em 0.04px";
      return node;
    },
    mathmlBuilder(group, style) {
      var inner2 = buildExpression2(group.body, style);
      var node = new mathMLTree.MathNode("mstyle", inner2);
      node.setAttribute("style", "text-shadow: 0.02em 0.01em 0.04px");
      return node;
    }
  });
  var cdArrowFunctionName = {
    ">": "\\\\cdrightarrow",
    "<": "\\\\cdleftarrow",
    "=": "\\\\cdlongequal",
    "A": "\\uparrow",
    "V": "\\downarrow",
    "|": "\\Vert",
    ".": "no arrow"
  };
  var newCell = () => {
    return {
      type: "styling",
      body: [],
      mode: "math",
      style: "display"
    };
  };
  var isStartOfArrow = (node) => {
    return node.type === "textord" && node.text === "@";
  };
  var isLabelEnd = (node, endChar) => {
    return (node.type === "mathord" || node.type === "atom") && node.text === endChar;
  };
  function cdArrow(arrowChar, labels, parser) {
    var funcName = cdArrowFunctionName[arrowChar];
    switch (funcName) {
      case "\\\\cdrightarrow":
      case "\\\\cdleftarrow":
        return parser.callFunction(funcName, [labels[0]], [labels[1]]);
      case "\\uparrow":
      case "\\downarrow": {
        var leftLabel = parser.callFunction("\\\\cdleft", [labels[0]], []);
        var bareArrow = {
          type: "atom",
          text: funcName,
          mode: "math",
          family: "rel"
        };
        var sizedArrow = parser.callFunction("\\Big", [bareArrow], []);
        var rightLabel = parser.callFunction("\\\\cdright", [labels[1]], []);
        var arrowGroup = {
          type: "ordgroup",
          mode: "math",
          body: [leftLabel, sizedArrow, rightLabel]
        };
        return parser.callFunction("\\\\cdparent", [arrowGroup], []);
      }
      case "\\\\cdlongequal":
        return parser.callFunction("\\\\cdlongequal", [], []);
      case "\\Vert": {
        var arrow = {
          type: "textord",
          text: "\\Vert",
          mode: "math"
        };
        return parser.callFunction("\\Big", [arrow], []);
      }
      default:
        return {
          type: "textord",
          text: " ",
          mode: "math"
        };
    }
  }
  function parseCD(parser) {
    var parsedRows = [];
    parser.gullet.beginGroup();
    parser.gullet.macros.set("\\cr", "\\\\\\relax");
    parser.gullet.beginGroup();
    while (true) {
      parsedRows.push(parser.parseExpression(false, "\\\\"));
      parser.gullet.endGroup();
      parser.gullet.beginGroup();
      var next = parser.fetch().text;
      if (next === "&" || next === "\\\\") {
        parser.consume();
      } else if (next === "\\end") {
        if (parsedRows[parsedRows.length - 1].length === 0) {
          parsedRows.pop();
        }
        break;
      } else {
        throw new ParseError("Expected \\\\ or \\cr or \\end", parser.nextToken);
      }
    }
    var row = [];
    var body = [row];
    for (var i2 = 0; i2 < parsedRows.length; i2++) {
      var rowNodes = parsedRows[i2];
      var cell = newCell();
      for (var j = 0; j < rowNodes.length; j++) {
        if (!isStartOfArrow(rowNodes[j])) {
          cell.body.push(rowNodes[j]);
        } else {
          row.push(cell);
          j += 1;
          var arrowChar = assertSymbolNodeType(rowNodes[j]).text;
          var labels = new Array(2);
          labels[0] = {
            type: "ordgroup",
            mode: "math",
            body: []
          };
          labels[1] = {
            type: "ordgroup",
            mode: "math",
            body: []
          };
          if ("=|.".indexOf(arrowChar) > -1) ;
          else if ("<>AV".indexOf(arrowChar) > -1) {
            for (var labelNum = 0; labelNum < 2; labelNum++) {
              var inLabel = true;
              for (var k = j + 1; k < rowNodes.length; k++) {
                if (isLabelEnd(rowNodes[k], arrowChar)) {
                  inLabel = false;
                  j = k;
                  break;
                }
                if (isStartOfArrow(rowNodes[k])) {
                  throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[k]);
                }
                labels[labelNum].body.push(rowNodes[k]);
              }
              if (inLabel) {
                throw new ParseError("Missing a " + arrowChar + " character to complete a CD arrow.", rowNodes[j]);
              }
            }
          } else {
            throw new ParseError('Expected one of "<>AV=|." after @', rowNodes[j]);
          }
          var arrow = cdArrow(arrowChar, labels, parser);
          var wrappedArrow = {
            type: "styling",
            body: [arrow],
            mode: "math",
            style: "display"
            // CD is always displaystyle.
          };
          row.push(wrappedArrow);
          cell = newCell();
        }
      }
      if (i2 % 2 === 0) {
        row.push(cell);
      } else {
        row.shift();
      }
      row = [];
      body.push(row);
    }
    parser.gullet.endGroup();
    parser.gullet.endGroup();
    var cols = new Array(body[0].length).fill({
      type: "align",
      align: "c",
      pregap: 0.25,
      // CD package sets \enskip between columns.
      postgap: 0.25
      // So pre and post each get half an \enskip, i.e. 0.25em.
    });
    return {
      type: "array",
      mode: "math",
      body,
      arraystretch: 1,
      addJot: true,
      rowGaps: [null],
      cols,
      colSeparationType: "CD",
      hLinesBeforeRow: new Array(body.length + 1).fill([])
    };
  }
  defineFunction({
    type: "cdlabel",
    names: ["\\\\cdleft", "\\\\cdright"],
    props: {
      numArgs: 1
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      return {
        type: "cdlabel",
        mode: parser.mode,
        side: funcName.slice(4),
        label: args[0]
      };
    },
    htmlBuilder(group, options) {
      var newOptions = options.havingStyle(options.style.sup());
      var label = buildCommon.wrapFragment(buildGroup$1(group.label, newOptions, options), options);
      label.classes.push("cd-label-" + group.side);
      label.style.bottom = makeEm(0.8 - label.depth);
      label.height = 0;
      label.depth = 0;
      return label;
    },
    mathmlBuilder(group, options) {
      var label = new mathMLTree.MathNode("mrow", [buildGroup2(group.label, options)]);
      label = new mathMLTree.MathNode("mpadded", [label]);
      label.setAttribute("width", "0");
      if (group.side === "left") {
        label.setAttribute("lspace", "-1width");
      }
      label.setAttribute("voffset", "0.7em");
      label = new mathMLTree.MathNode("mstyle", [label]);
      label.setAttribute("displaystyle", "false");
      label.setAttribute("scriptlevel", "1");
      return label;
    }
  });
  defineFunction({
    type: "cdlabelparent",
    names: ["\\\\cdparent"],
    props: {
      numArgs: 1
    },
    handler(_ref2, args) {
      var {
        parser
      } = _ref2;
      return {
        type: "cdlabelparent",
        mode: parser.mode,
        fragment: args[0]
      };
    },
    htmlBuilder(group, options) {
      var parent = buildCommon.wrapFragment(buildGroup$1(group.fragment, options), options);
      parent.classes.push("cd-vert-arrow");
      return parent;
    },
    mathmlBuilder(group, options) {
      return new mathMLTree.MathNode("mrow", [buildGroup2(group.fragment, options)]);
    }
  });
  defineFunction({
    type: "textord",
    names: ["\\@char"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      var arg = assertNodeType(args[0], "ordgroup");
      var group = arg.body;
      var number = "";
      for (var i2 = 0; i2 < group.length; i2++) {
        var node = assertNodeType(group[i2], "textord");
        number += node.text;
      }
      var code = parseInt(number);
      var text2;
      if (isNaN(code)) {
        throw new ParseError("\\@char has non-numeric argument " + number);
      } else if (code < 0 || code >= 1114111) {
        throw new ParseError("\\@char with invalid code point " + number);
      } else if (code <= 65535) {
        text2 = String.fromCharCode(code);
      } else {
        code -= 65536;
        text2 = String.fromCharCode((code >> 10) + 55296, (code & 1023) + 56320);
      }
      return {
        type: "textord",
        mode: parser.mode,
        text: text2
      };
    }
  });
  var htmlBuilder$8 = (group, options) => {
    var elements = buildExpression$1(group.body, options.withColor(group.color), false);
    return buildCommon.makeFragment(elements);
  };
  var mathmlBuilder$7 = (group, options) => {
    var inner2 = buildExpression2(group.body, options.withColor(group.color));
    var node = new mathMLTree.MathNode("mstyle", inner2);
    node.setAttribute("mathcolor", group.color);
    return node;
  };
  defineFunction({
    type: "color",
    names: ["\\textcolor"],
    props: {
      numArgs: 2,
      allowedInText: true,
      argTypes: ["color", "original"]
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      var color = assertNodeType(args[0], "color-token").color;
      var body = args[1];
      return {
        type: "color",
        mode: parser.mode,
        color,
        body: ordargument(body)
      };
    },
    htmlBuilder: htmlBuilder$8,
    mathmlBuilder: mathmlBuilder$7
  });
  defineFunction({
    type: "color",
    names: ["\\color"],
    props: {
      numArgs: 1,
      allowedInText: true,
      argTypes: ["color"]
    },
    handler(_ref2, args) {
      var {
        parser,
        breakOnTokenText
      } = _ref2;
      var color = assertNodeType(args[0], "color-token").color;
      parser.gullet.macros.set("\\current@color", color);
      var body = parser.parseExpression(true, breakOnTokenText);
      return {
        type: "color",
        mode: parser.mode,
        color,
        body
      };
    },
    htmlBuilder: htmlBuilder$8,
    mathmlBuilder: mathmlBuilder$7
  });
  defineFunction({
    type: "cr",
    names: ["\\\\"],
    props: {
      numArgs: 0,
      numOptionalArgs: 0,
      allowedInText: true
    },
    handler(_ref, args, optArgs) {
      var {
        parser
      } = _ref;
      var size = parser.gullet.future().text === "[" ? parser.parseSizeGroup(true) : null;
      var newLine = !parser.settings.displayMode || !parser.settings.useStrictBehavior("newLineInDisplayMode", "In LaTeX, \\\\ or \\newline does nothing in display mode");
      return {
        type: "cr",
        mode: parser.mode,
        newLine,
        size: size && assertNodeType(size, "size").value
      };
    },
    // The following builders are called only at the top level,
    // not within tabular/array environments.
    htmlBuilder(group, options) {
      var span = buildCommon.makeSpan(["mspace"], [], options);
      if (group.newLine) {
        span.classes.push("newline");
        if (group.size) {
          span.style.marginTop = makeEm(calculateSize(group.size, options));
        }
      }
      return span;
    },
    mathmlBuilder(group, options) {
      var node = new mathMLTree.MathNode("mspace");
      if (group.newLine) {
        node.setAttribute("linebreak", "newline");
        if (group.size) {
          node.setAttribute("height", makeEm(calculateSize(group.size, options)));
        }
      }
      return node;
    }
  });
  var globalMap = {
    "\\global": "\\global",
    "\\long": "\\\\globallong",
    "\\\\globallong": "\\\\globallong",
    "\\def": "\\gdef",
    "\\gdef": "\\gdef",
    "\\edef": "\\xdef",
    "\\xdef": "\\xdef",
    "\\let": "\\\\globallet",
    "\\futurelet": "\\\\globalfuture"
  };
  var checkControlSequence = (tok) => {
    var name = tok.text;
    if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
      throw new ParseError("Expected a control sequence", tok);
    }
    return name;
  };
  var getRHS = (parser) => {
    var tok = parser.gullet.popToken();
    if (tok.text === "=") {
      tok = parser.gullet.popToken();
      if (tok.text === " ") {
        tok = parser.gullet.popToken();
      }
    }
    return tok;
  };
  var letCommand = (parser, name, tok, global) => {
    var macro = parser.gullet.macros.get(tok.text);
    if (macro == null) {
      tok.noexpand = true;
      macro = {
        tokens: [tok],
        numArgs: 0,
        // reproduce the same behavior in expansion
        unexpandable: !parser.gullet.isExpandable(tok.text)
      };
    }
    parser.gullet.macros.set(name, macro, global);
  };
  defineFunction({
    type: "internal",
    names: [
      "\\global",
      "\\long",
      "\\\\globallong"
      // can’t be entered directly
    ],
    props: {
      numArgs: 0,
      allowedInText: true
    },
    handler(_ref) {
      var {
        parser,
        funcName
      } = _ref;
      parser.consumeSpaces();
      var token = parser.fetch();
      if (globalMap[token.text]) {
        if (funcName === "\\global" || funcName === "\\\\globallong") {
          token.text = globalMap[token.text];
        }
        return assertNodeType(parser.parseFunction(), "internal");
      }
      throw new ParseError("Invalid token after macro prefix", token);
    }
  });
  defineFunction({
    type: "internal",
    names: ["\\def", "\\gdef", "\\edef", "\\xdef"],
    props: {
      numArgs: 0,
      allowedInText: true,
      primitive: true
    },
    handler(_ref2) {
      var {
        parser,
        funcName
      } = _ref2;
      var tok = parser.gullet.popToken();
      var name = tok.text;
      if (/^(?:[\\{}$&#^_]|EOF)$/.test(name)) {
        throw new ParseError("Expected a control sequence", tok);
      }
      var numArgs = 0;
      var insert;
      var delimiters2 = [[]];
      while (parser.gullet.future().text !== "{") {
        tok = parser.gullet.popToken();
        if (tok.text === "#") {
          if (parser.gullet.future().text === "{") {
            insert = parser.gullet.future();
            delimiters2[numArgs].push("{");
            break;
          }
          tok = parser.gullet.popToken();
          if (!/^[1-9]$/.test(tok.text)) {
            throw new ParseError('Invalid argument number "' + tok.text + '"');
          }
          if (parseInt(tok.text) !== numArgs + 1) {
            throw new ParseError('Argument number "' + tok.text + '" out of order');
          }
          numArgs++;
          delimiters2.push([]);
        } else if (tok.text === "EOF") {
          throw new ParseError("Expected a macro definition");
        } else {
          delimiters2[numArgs].push(tok.text);
        }
      }
      var {
        tokens
      } = parser.gullet.consumeArg();
      if (insert) {
        tokens.unshift(insert);
      }
      if (funcName === "\\edef" || funcName === "\\xdef") {
        tokens = parser.gullet.expandTokens(tokens);
        tokens.reverse();
      }
      parser.gullet.macros.set(name, {
        tokens,
        numArgs,
        delimiters: delimiters2
      }, funcName === globalMap[funcName]);
      return {
        type: "internal",
        mode: parser.mode
      };
    }
  });
  defineFunction({
    type: "internal",
    names: [
      "\\let",
      "\\\\globallet"
      // can’t be entered directly
    ],
    props: {
      numArgs: 0,
      allowedInText: true,
      primitive: true
    },
    handler(_ref3) {
      var {
        parser,
        funcName
      } = _ref3;
      var name = checkControlSequence(parser.gullet.popToken());
      parser.gullet.consumeSpaces();
      var tok = getRHS(parser);
      letCommand(parser, name, tok, funcName === "\\\\globallet");
      return {
        type: "internal",
        mode: parser.mode
      };
    }
  });
  defineFunction({
    type: "internal",
    names: [
      "\\futurelet",
      "\\\\globalfuture"
      // can’t be entered directly
    ],
    props: {
      numArgs: 0,
      allowedInText: true,
      primitive: true
    },
    handler(_ref4) {
      var {
        parser,
        funcName
      } = _ref4;
      var name = checkControlSequence(parser.gullet.popToken());
      var middle = parser.gullet.popToken();
      var tok = parser.gullet.popToken();
      letCommand(parser, name, tok, funcName === "\\\\globalfuture");
      parser.gullet.pushToken(tok);
      parser.gullet.pushToken(middle);
      return {
        type: "internal",
        mode: parser.mode
      };
    }
  });
  var getMetrics = function getMetrics2(symbol, font, mode) {
    var replace = symbols.math[symbol] && symbols.math[symbol].replace;
    var metrics = getCharacterMetrics(replace || symbol, font, mode);
    if (!metrics) {
      throw new Error("Unsupported symbol " + symbol + " and font size " + font + ".");
    }
    return metrics;
  };
  var styleWrap = function styleWrap2(delim, toStyle, options, classes) {
    var newOptions = options.havingBaseStyle(toStyle);
    var span = buildCommon.makeSpan(classes.concat(newOptions.sizingClasses(options)), [delim], options);
    var delimSizeMultiplier = newOptions.sizeMultiplier / options.sizeMultiplier;
    span.height *= delimSizeMultiplier;
    span.depth *= delimSizeMultiplier;
    span.maxFontSize = newOptions.sizeMultiplier;
    return span;
  };
  var centerSpan = function centerSpan2(span, options, style) {
    var newOptions = options.havingBaseStyle(style);
    var shift = (1 - options.sizeMultiplier / newOptions.sizeMultiplier) * options.fontMetrics().axisHeight;
    span.classes.push("delimcenter");
    span.style.top = makeEm(shift);
    span.height -= shift;
    span.depth += shift;
  };
  var makeSmallDelim = function makeSmallDelim2(delim, style, center, options, mode, classes) {
    var text2 = buildCommon.makeSymbol(delim, "Main-Regular", mode, options);
    var span = styleWrap(text2, style, options, classes);
    if (center) {
      centerSpan(span, options, style);
    }
    return span;
  };
  var mathrmSize = function mathrmSize2(value, size, mode, options) {
    return buildCommon.makeSymbol(value, "Size" + size + "-Regular", mode, options);
  };
  var makeLargeDelim = function makeLargeDelim2(delim, size, center, options, mode, classes) {
    var inner2 = mathrmSize(delim, size, mode, options);
    var span = styleWrap(buildCommon.makeSpan(["delimsizing", "size" + size], [inner2], options), Style$1.TEXT, options, classes);
    if (center) {
      centerSpan(span, options, Style$1.TEXT);
    }
    return span;
  };
  var makeGlyphSpan = function makeGlyphSpan2(symbol, font, mode) {
    var sizeClass;
    if (font === "Size1-Regular") {
      sizeClass = "delim-size1";
    } else {
      sizeClass = "delim-size4";
    }
    var corner = buildCommon.makeSpan(["delimsizinginner", sizeClass], [buildCommon.makeSpan([], [buildCommon.makeSymbol(symbol, font, mode)])]);
    return {
      type: "elem",
      elem: corner
    };
  };
  var makeInner = function makeInner2(ch2, height, options) {
    var width = fontMetricsData["Size4-Regular"][ch2.charCodeAt(0)] ? fontMetricsData["Size4-Regular"][ch2.charCodeAt(0)][4] : fontMetricsData["Size1-Regular"][ch2.charCodeAt(0)][4];
    var path2 = new PathNode("inner", innerPath(ch2, Math.round(1e3 * height)));
    var svgNode = new SvgNode([path2], {
      "width": makeEm(width),
      "height": makeEm(height),
      // Override CSS rule `.katex svg { width: 100% }`
      "style": "width:" + makeEm(width),
      "viewBox": "0 0 " + 1e3 * width + " " + Math.round(1e3 * height),
      "preserveAspectRatio": "xMinYMin"
    });
    var span = buildCommon.makeSvgSpan([], [svgNode], options);
    span.height = height;
    span.style.height = makeEm(height);
    span.style.width = makeEm(width);
    return {
      type: "elem",
      elem: span
    };
  };
  var lapInEms = 8e-3;
  var lap = {
    type: "kern",
    size: -1 * lapInEms
  };
  var verts = ["|", "\\lvert", "\\rvert", "\\vert"];
  var doubleVerts = ["\\|", "\\lVert", "\\rVert", "\\Vert"];
  var makeStackedDelim = function makeStackedDelim2(delim, heightTotal, center, options, mode, classes) {
    var top;
    var middle;
    var repeat;
    var bottom;
    var svgLabel = "";
    var viewBoxWidth = 0;
    top = repeat = bottom = delim;
    middle = null;
    var font = "Size1-Regular";
    if (delim === "\\uparrow") {
      repeat = bottom = "\u23D0";
    } else if (delim === "\\Uparrow") {
      repeat = bottom = "\u2016";
    } else if (delim === "\\downarrow") {
      top = repeat = "\u23D0";
    } else if (delim === "\\Downarrow") {
      top = repeat = "\u2016";
    } else if (delim === "\\updownarrow") {
      top = "\\uparrow";
      repeat = "\u23D0";
      bottom = "\\downarrow";
    } else if (delim === "\\Updownarrow") {
      top = "\\Uparrow";
      repeat = "\u2016";
      bottom = "\\Downarrow";
    } else if (verts.includes(delim)) {
      repeat = "\u2223";
      svgLabel = "vert";
      viewBoxWidth = 333;
    } else if (doubleVerts.includes(delim)) {
      repeat = "\u2225";
      svgLabel = "doublevert";
      viewBoxWidth = 556;
    } else if (delim === "[" || delim === "\\lbrack") {
      top = "\u23A1";
      repeat = "\u23A2";
      bottom = "\u23A3";
      font = "Size4-Regular";
      svgLabel = "lbrack";
      viewBoxWidth = 667;
    } else if (delim === "]" || delim === "\\rbrack") {
      top = "\u23A4";
      repeat = "\u23A5";
      bottom = "\u23A6";
      font = "Size4-Regular";
      svgLabel = "rbrack";
      viewBoxWidth = 667;
    } else if (delim === "\\lfloor" || delim === "\u230A") {
      repeat = top = "\u23A2";
      bottom = "\u23A3";
      font = "Size4-Regular";
      svgLabel = "lfloor";
      viewBoxWidth = 667;
    } else if (delim === "\\lceil" || delim === "\u2308") {
      top = "\u23A1";
      repeat = bottom = "\u23A2";
      font = "Size4-Regular";
      svgLabel = "lceil";
      viewBoxWidth = 667;
    } else if (delim === "\\rfloor" || delim === "\u230B") {
      repeat = top = "\u23A5";
      bottom = "\u23A6";
      font = "Size4-Regular";
      svgLabel = "rfloor";
      viewBoxWidth = 667;
    } else if (delim === "\\rceil" || delim === "\u2309") {
      top = "\u23A4";
      repeat = bottom = "\u23A5";
      font = "Size4-Regular";
      svgLabel = "rceil";
      viewBoxWidth = 667;
    } else if (delim === "(" || delim === "\\lparen") {
      top = "\u239B";
      repeat = "\u239C";
      bottom = "\u239D";
      font = "Size4-Regular";
      svgLabel = "lparen";
      viewBoxWidth = 875;
    } else if (delim === ")" || delim === "\\rparen") {
      top = "\u239E";
      repeat = "\u239F";
      bottom = "\u23A0";
      font = "Size4-Regular";
      svgLabel = "rparen";
      viewBoxWidth = 875;
    } else if (delim === "\\{" || delim === "\\lbrace") {
      top = "\u23A7";
      middle = "\u23A8";
      bottom = "\u23A9";
      repeat = "\u23AA";
      font = "Size4-Regular";
    } else if (delim === "\\}" || delim === "\\rbrace") {
      top = "\u23AB";
      middle = "\u23AC";
      bottom = "\u23AD";
      repeat = "\u23AA";
      font = "Size4-Regular";
    } else if (delim === "\\lgroup" || delim === "\u27EE") {
      top = "\u23A7";
      bottom = "\u23A9";
      repeat = "\u23AA";
      font = "Size4-Regular";
    } else if (delim === "\\rgroup" || delim === "\u27EF") {
      top = "\u23AB";
      bottom = "\u23AD";
      repeat = "\u23AA";
      font = "Size4-Regular";
    } else if (delim === "\\lmoustache" || delim === "\u23B0") {
      top = "\u23A7";
      bottom = "\u23AD";
      repeat = "\u23AA";
      font = "Size4-Regular";
    } else if (delim === "\\rmoustache" || delim === "\u23B1") {
      top = "\u23AB";
      bottom = "\u23A9";
      repeat = "\u23AA";
      font = "Size4-Regular";
    }
    var topMetrics = getMetrics(top, font, mode);
    var topHeightTotal = topMetrics.height + topMetrics.depth;
    var repeatMetrics = getMetrics(repeat, font, mode);
    var repeatHeightTotal = repeatMetrics.height + repeatMetrics.depth;
    var bottomMetrics = getMetrics(bottom, font, mode);
    var bottomHeightTotal = bottomMetrics.height + bottomMetrics.depth;
    var middleHeightTotal = 0;
    var middleFactor = 1;
    if (middle !== null) {
      var middleMetrics = getMetrics(middle, font, mode);
      middleHeightTotal = middleMetrics.height + middleMetrics.depth;
      middleFactor = 2;
    }
    var minHeight = topHeightTotal + bottomHeightTotal + middleHeightTotal;
    var repeatCount = Math.max(0, Math.ceil((heightTotal - minHeight) / (middleFactor * repeatHeightTotal)));
    var realHeightTotal = minHeight + repeatCount * middleFactor * repeatHeightTotal;
    var axisHeight = options.fontMetrics().axisHeight;
    if (center) {
      axisHeight *= options.sizeMultiplier;
    }
    var depth = realHeightTotal / 2 - axisHeight;
    var stack = [];
    if (svgLabel.length > 0) {
      var midHeight = realHeightTotal - topHeightTotal - bottomHeightTotal;
      var viewBoxHeight = Math.round(realHeightTotal * 1e3);
      var pathStr = tallDelim(svgLabel, Math.round(midHeight * 1e3));
      var path2 = new PathNode(svgLabel, pathStr);
      var width = (viewBoxWidth / 1e3).toFixed(3) + "em";
      var height = (viewBoxHeight / 1e3).toFixed(3) + "em";
      var svg = new SvgNode([path2], {
        "width": width,
        "height": height,
        "viewBox": "0 0 " + viewBoxWidth + " " + viewBoxHeight
      });
      var wrapper = buildCommon.makeSvgSpan([], [svg], options);
      wrapper.height = viewBoxHeight / 1e3;
      wrapper.style.width = width;
      wrapper.style.height = height;
      stack.push({
        type: "elem",
        elem: wrapper
      });
    } else {
      stack.push(makeGlyphSpan(bottom, font, mode));
      stack.push(lap);
      if (middle === null) {
        var innerHeight = realHeightTotal - topHeightTotal - bottomHeightTotal + 2 * lapInEms;
        stack.push(makeInner(repeat, innerHeight, options));
      } else {
        var _innerHeight = (realHeightTotal - topHeightTotal - bottomHeightTotal - middleHeightTotal) / 2 + 2 * lapInEms;
        stack.push(makeInner(repeat, _innerHeight, options));
        stack.push(lap);
        stack.push(makeGlyphSpan(middle, font, mode));
        stack.push(lap);
        stack.push(makeInner(repeat, _innerHeight, options));
      }
      stack.push(lap);
      stack.push(makeGlyphSpan(top, font, mode));
    }
    var newOptions = options.havingBaseStyle(Style$1.TEXT);
    var inner2 = buildCommon.makeVList({
      positionType: "bottom",
      positionData: depth,
      children: stack
    }, newOptions);
    return styleWrap(buildCommon.makeSpan(["delimsizing", "mult"], [inner2], newOptions), Style$1.TEXT, options, classes);
  };
  var vbPad = 80;
  var emPad = 0.08;
  var sqrtSvg = function sqrtSvg2(sqrtName, height, viewBoxHeight, extraVinculum, options) {
    var path2 = sqrtPath(sqrtName, extraVinculum, viewBoxHeight);
    var pathNode = new PathNode(sqrtName, path2);
    var svg = new SvgNode([pathNode], {
      // Note: 1000:1 ratio of viewBox to document em width.
      "width": "400em",
      "height": makeEm(height),
      "viewBox": "0 0 400000 " + viewBoxHeight,
      "preserveAspectRatio": "xMinYMin slice"
    });
    return buildCommon.makeSvgSpan(["hide-tail"], [svg], options);
  };
  var makeSqrtImage = function makeSqrtImage2(height, options) {
    var newOptions = options.havingBaseSizing();
    var delim = traverseSequence("\\surd", height * newOptions.sizeMultiplier, stackLargeDelimiterSequence, newOptions);
    var sizeMultiplier = newOptions.sizeMultiplier;
    var extraVinculum = Math.max(0, options.minRuleThickness - options.fontMetrics().sqrtRuleThickness);
    var span;
    var spanHeight = 0;
    var texHeight = 0;
    var viewBoxHeight = 0;
    var advanceWidth;
    if (delim.type === "small") {
      viewBoxHeight = 1e3 + 1e3 * extraVinculum + vbPad;
      if (height < 1) {
        sizeMultiplier = 1;
      } else if (height < 1.4) {
        sizeMultiplier = 0.7;
      }
      spanHeight = (1 + extraVinculum + emPad) / sizeMultiplier;
      texHeight = (1 + extraVinculum) / sizeMultiplier;
      span = sqrtSvg("sqrtMain", spanHeight, viewBoxHeight, extraVinculum, options);
      span.style.minWidth = "0.853em";
      advanceWidth = 0.833 / sizeMultiplier;
    } else if (delim.type === "large") {
      viewBoxHeight = (1e3 + vbPad) * sizeToMaxHeight[delim.size];
      texHeight = (sizeToMaxHeight[delim.size] + extraVinculum) / sizeMultiplier;
      spanHeight = (sizeToMaxHeight[delim.size] + extraVinculum + emPad) / sizeMultiplier;
      span = sqrtSvg("sqrtSize" + delim.size, spanHeight, viewBoxHeight, extraVinculum, options);
      span.style.minWidth = "1.02em";
      advanceWidth = 1 / sizeMultiplier;
    } else {
      spanHeight = height + extraVinculum + emPad;
      texHeight = height + extraVinculum;
      viewBoxHeight = Math.floor(1e3 * height + extraVinculum) + vbPad;
      span = sqrtSvg("sqrtTall", spanHeight, viewBoxHeight, extraVinculum, options);
      span.style.minWidth = "0.742em";
      advanceWidth = 1.056;
    }
    span.height = texHeight;
    span.style.height = makeEm(spanHeight);
    return {
      span,
      advanceWidth,
      // Calculate the actual line width.
      // This actually should depend on the chosen font -- e.g. \boldmath
      // should use the thicker surd symbols from e.g. KaTeX_Main-Bold, and
      // have thicker rules.
      ruleWidth: (options.fontMetrics().sqrtRuleThickness + extraVinculum) * sizeMultiplier
    };
  };
  var stackLargeDelimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "\\surd"];
  var stackAlwaysDelimiters = ["\\uparrow", "\\downarrow", "\\updownarrow", "\\Uparrow", "\\Downarrow", "\\Updownarrow", "|", "\\|", "\\vert", "\\Vert", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1"];
  var stackNeverDelimiters = ["<", ">", "\\langle", "\\rangle", "/", "\\backslash", "\\lt", "\\gt"];
  var sizeToMaxHeight = [0, 1.2, 1.8, 2.4, 3];
  var makeSizedDelim = function makeSizedDelim2(delim, size, options, mode, classes) {
    if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
      delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
      delim = "\\rangle";
    }
    if (stackLargeDelimiters.includes(delim) || stackNeverDelimiters.includes(delim)) {
      return makeLargeDelim(delim, size, false, options, mode, classes);
    } else if (stackAlwaysDelimiters.includes(delim)) {
      return makeStackedDelim(delim, sizeToMaxHeight[size], false, options, mode, classes);
    } else {
      throw new ParseError("Illegal delimiter: '" + delim + "'");
    }
  };
  var stackNeverDelimiterSequence = [{
    type: "small",
    style: Style$1.SCRIPTSCRIPT
  }, {
    type: "small",
    style: Style$1.SCRIPT
  }, {
    type: "small",
    style: Style$1.TEXT
  }, {
    type: "large",
    size: 1
  }, {
    type: "large",
    size: 2
  }, {
    type: "large",
    size: 3
  }, {
    type: "large",
    size: 4
  }];
  var stackAlwaysDelimiterSequence = [{
    type: "small",
    style: Style$1.SCRIPTSCRIPT
  }, {
    type: "small",
    style: Style$1.SCRIPT
  }, {
    type: "small",
    style: Style$1.TEXT
  }, {
    type: "stack"
  }];
  var stackLargeDelimiterSequence = [{
    type: "small",
    style: Style$1.SCRIPTSCRIPT
  }, {
    type: "small",
    style: Style$1.SCRIPT
  }, {
    type: "small",
    style: Style$1.TEXT
  }, {
    type: "large",
    size: 1
  }, {
    type: "large",
    size: 2
  }, {
    type: "large",
    size: 3
  }, {
    type: "large",
    size: 4
  }, {
    type: "stack"
  }];
  var delimTypeToFont = function delimTypeToFont2(type) {
    if (type.type === "small") {
      return "Main-Regular";
    } else if (type.type === "large") {
      return "Size" + type.size + "-Regular";
    } else if (type.type === "stack") {
      return "Size4-Regular";
    } else {
      throw new Error("Add support for delim type '" + type.type + "' here.");
    }
  };
  var traverseSequence = function traverseSequence2(delim, height, sequence, options) {
    var start = Math.min(2, 3 - options.style.size);
    for (var i2 = start; i2 < sequence.length; i2++) {
      if (sequence[i2].type === "stack") {
        break;
      }
      var metrics = getMetrics(delim, delimTypeToFont(sequence[i2]), "math");
      var heightDepth = metrics.height + metrics.depth;
      if (sequence[i2].type === "small") {
        var newOptions = options.havingBaseStyle(sequence[i2].style);
        heightDepth *= newOptions.sizeMultiplier;
      }
      if (heightDepth > height) {
        return sequence[i2];
      }
    }
    return sequence[sequence.length - 1];
  };
  var makeCustomSizedDelim = function makeCustomSizedDelim2(delim, height, center, options, mode, classes) {
    if (delim === "<" || delim === "\\lt" || delim === "\u27E8") {
      delim = "\\langle";
    } else if (delim === ">" || delim === "\\gt" || delim === "\u27E9") {
      delim = "\\rangle";
    }
    var sequence;
    if (stackNeverDelimiters.includes(delim)) {
      sequence = stackNeverDelimiterSequence;
    } else if (stackLargeDelimiters.includes(delim)) {
      sequence = stackLargeDelimiterSequence;
    } else {
      sequence = stackAlwaysDelimiterSequence;
    }
    var delimType = traverseSequence(delim, height, sequence, options);
    if (delimType.type === "small") {
      return makeSmallDelim(delim, delimType.style, center, options, mode, classes);
    } else if (delimType.type === "large") {
      return makeLargeDelim(delim, delimType.size, center, options, mode, classes);
    } else {
      return makeStackedDelim(delim, height, center, options, mode, classes);
    }
  };
  var makeLeftRightDelim = function makeLeftRightDelim2(delim, height, depth, options, mode, classes) {
    var axisHeight = options.fontMetrics().axisHeight * options.sizeMultiplier;
    var delimiterFactor = 901;
    var delimiterExtend = 5 / options.fontMetrics().ptPerEm;
    var maxDistFromAxis = Math.max(height - axisHeight, depth + axisHeight);
    var totalHeight = Math.max(
      // In real TeX, calculations are done using integral values which are
      // 65536 per pt, or 655360 per em. So, the division here truncates in
      // TeX but doesn't here, producing different results. If we wanted to
      // exactly match TeX's calculation, we could do
      //   Math.floor(655360 * maxDistFromAxis / 500) *
      //    delimiterFactor / 655360
      // (To see the difference, compare
      //    x^{x^{\left(\rule{0.1em}{0.68em}\right)}}
      // in TeX and KaTeX)
      maxDistFromAxis / 500 * delimiterFactor,
      2 * maxDistFromAxis - delimiterExtend
    );
    return makeCustomSizedDelim(delim, totalHeight, true, options, mode, classes);
  };
  var delimiter = {
    sqrtImage: makeSqrtImage,
    sizedDelim: makeSizedDelim,
    sizeToMaxHeight,
    customSizedDelim: makeCustomSizedDelim,
    leftRightDelim: makeLeftRightDelim
  };
  var delimiterSizes = {
    "\\bigl": {
      mclass: "mopen",
      size: 1
    },
    "\\Bigl": {
      mclass: "mopen",
      size: 2
    },
    "\\biggl": {
      mclass: "mopen",
      size: 3
    },
    "\\Biggl": {
      mclass: "mopen",
      size: 4
    },
    "\\bigr": {
      mclass: "mclose",
      size: 1
    },
    "\\Bigr": {
      mclass: "mclose",
      size: 2
    },
    "\\biggr": {
      mclass: "mclose",
      size: 3
    },
    "\\Biggr": {
      mclass: "mclose",
      size: 4
    },
    "\\bigm": {
      mclass: "mrel",
      size: 1
    },
    "\\Bigm": {
      mclass: "mrel",
      size: 2
    },
    "\\biggm": {
      mclass: "mrel",
      size: 3
    },
    "\\Biggm": {
      mclass: "mrel",
      size: 4
    },
    "\\big": {
      mclass: "mord",
      size: 1
    },
    "\\Big": {
      mclass: "mord",
      size: 2
    },
    "\\bigg": {
      mclass: "mord",
      size: 3
    },
    "\\Bigg": {
      mclass: "mord",
      size: 4
    }
  };
  var delimiters = ["(", "\\lparen", ")", "\\rparen", "[", "\\lbrack", "]", "\\rbrack", "\\{", "\\lbrace", "\\}", "\\rbrace", "\\lfloor", "\\rfloor", "\u230A", "\u230B", "\\lceil", "\\rceil", "\u2308", "\u2309", "<", ">", "\\langle", "\u27E8", "\\rangle", "\u27E9", "\\lt", "\\gt", "\\lvert", "\\rvert", "\\lVert", "\\rVert", "\\lgroup", "\\rgroup", "\u27EE", "\u27EF", "\\lmoustache", "\\rmoustache", "\u23B0", "\u23B1", "/", "\\backslash", "|", "\\vert", "\\|", "\\Vert", "\\uparrow", "\\Uparrow", "\\downarrow", "\\Downarrow", "\\updownarrow", "\\Updownarrow", "."];
  function checkDelimiter(delim, context) {
    var symDelim = checkSymbolNodeType(delim);
    if (symDelim && delimiters.includes(symDelim.text)) {
      return symDelim;
    } else if (symDelim) {
      throw new ParseError("Invalid delimiter '" + symDelim.text + "' after '" + context.funcName + "'", delim);
    } else {
      throw new ParseError("Invalid delimiter type '" + delim.type + "'", delim);
    }
  }
  defineFunction({
    type: "delimsizing",
    names: ["\\bigl", "\\Bigl", "\\biggl", "\\Biggl", "\\bigr", "\\Bigr", "\\biggr", "\\Biggr", "\\bigm", "\\Bigm", "\\biggm", "\\Biggm", "\\big", "\\Big", "\\bigg", "\\Bigg"],
    props: {
      numArgs: 1,
      argTypes: ["primitive"]
    },
    handler: (context, args) => {
      var delim = checkDelimiter(args[0], context);
      return {
        type: "delimsizing",
        mode: context.parser.mode,
        size: delimiterSizes[context.funcName].size,
        mclass: delimiterSizes[context.funcName].mclass,
        delim: delim.text
      };
    },
    htmlBuilder: (group, options) => {
      if (group.delim === ".") {
        return buildCommon.makeSpan([group.mclass]);
      }
      return delimiter.sizedDelim(group.delim, group.size, options, group.mode, [group.mclass]);
    },
    mathmlBuilder: (group) => {
      var children = [];
      if (group.delim !== ".") {
        children.push(makeText(group.delim, group.mode));
      }
      var node = new mathMLTree.MathNode("mo", children);
      if (group.mclass === "mopen" || group.mclass === "mclose") {
        node.setAttribute("fence", "true");
      } else {
        node.setAttribute("fence", "false");
      }
      node.setAttribute("stretchy", "true");
      var size = makeEm(delimiter.sizeToMaxHeight[group.size]);
      node.setAttribute("minsize", size);
      node.setAttribute("maxsize", size);
      return node;
    }
  });
  function assertParsed(group) {
    if (!group.body) {
      throw new Error("Bug: The leftright ParseNode wasn't fully parsed.");
    }
  }
  defineFunction({
    type: "leftright-right",
    names: ["\\right"],
    props: {
      numArgs: 1,
      primitive: true
    },
    handler: (context, args) => {
      var color = context.parser.gullet.macros.get("\\current@color");
      if (color && typeof color !== "string") {
        throw new ParseError("\\current@color set to non-string in \\right");
      }
      return {
        type: "leftright-right",
        mode: context.parser.mode,
        delim: checkDelimiter(args[0], context).text,
        color
        // undefined if not set via \color
      };
    }
  });
  defineFunction({
    type: "leftright",
    names: ["\\left"],
    props: {
      numArgs: 1,
      primitive: true
    },
    handler: (context, args) => {
      var delim = checkDelimiter(args[0], context);
      var parser = context.parser;
      ++parser.leftrightDepth;
      var body = parser.parseExpression(false);
      --parser.leftrightDepth;
      parser.expect("\\right", false);
      var right = assertNodeType(parser.parseFunction(), "leftright-right");
      return {
        type: "leftright",
        mode: parser.mode,
        body,
        left: delim.text,
        right: right.delim,
        rightColor: right.color
      };
    },
    htmlBuilder: (group, options) => {
      assertParsed(group);
      var inner2 = buildExpression$1(group.body, options, true, ["mopen", "mclose"]);
      var innerHeight = 0;
      var innerDepth = 0;
      var hadMiddle = false;
      for (var i2 = 0; i2 < inner2.length; i2++) {
        if (inner2[i2].isMiddle) {
          hadMiddle = true;
        } else {
          innerHeight = Math.max(inner2[i2].height, innerHeight);
          innerDepth = Math.max(inner2[i2].depth, innerDepth);
        }
      }
      innerHeight *= options.sizeMultiplier;
      innerDepth *= options.sizeMultiplier;
      var leftDelim;
      if (group.left === ".") {
        leftDelim = makeNullDelimiter(options, ["mopen"]);
      } else {
        leftDelim = delimiter.leftRightDelim(group.left, innerHeight, innerDepth, options, group.mode, ["mopen"]);
      }
      inner2.unshift(leftDelim);
      if (hadMiddle) {
        for (var _i6 = 1; _i6 < inner2.length; _i6++) {
          var middleDelim = inner2[_i6];
          var isMiddle = middleDelim.isMiddle;
          if (isMiddle) {
            inner2[_i6] = delimiter.leftRightDelim(isMiddle.delim, innerHeight, innerDepth, isMiddle.options, group.mode, []);
          }
        }
      }
      var rightDelim;
      if (group.right === ".") {
        rightDelim = makeNullDelimiter(options, ["mclose"]);
      } else {
        var colorOptions = group.rightColor ? options.withColor(group.rightColor) : options;
        rightDelim = delimiter.leftRightDelim(group.right, innerHeight, innerDepth, colorOptions, group.mode, ["mclose"]);
      }
      inner2.push(rightDelim);
      return buildCommon.makeSpan(["minner"], inner2, options);
    },
    mathmlBuilder: (group, options) => {
      assertParsed(group);
      var inner2 = buildExpression2(group.body, options);
      if (group.left !== ".") {
        var leftNode = new mathMLTree.MathNode("mo", [makeText(group.left, group.mode)]);
        leftNode.setAttribute("fence", "true");
        inner2.unshift(leftNode);
      }
      if (group.right !== ".") {
        var rightNode = new mathMLTree.MathNode("mo", [makeText(group.right, group.mode)]);
        rightNode.setAttribute("fence", "true");
        if (group.rightColor) {
          rightNode.setAttribute("mathcolor", group.rightColor);
        }
        inner2.push(rightNode);
      }
      return makeRow(inner2);
    }
  });
  defineFunction({
    type: "middle",
    names: ["\\middle"],
    props: {
      numArgs: 1,
      primitive: true
    },
    handler: (context, args) => {
      var delim = checkDelimiter(args[0], context);
      if (!context.parser.leftrightDepth) {
        throw new ParseError("\\middle without preceding \\left", delim);
      }
      return {
        type: "middle",
        mode: context.parser.mode,
        delim: delim.text
      };
    },
    htmlBuilder: (group, options) => {
      var middleDelim;
      if (group.delim === ".") {
        middleDelim = makeNullDelimiter(options, []);
      } else {
        middleDelim = delimiter.sizedDelim(group.delim, 1, options, group.mode, []);
        var isMiddle = {
          delim: group.delim,
          options
        };
        middleDelim.isMiddle = isMiddle;
      }
      return middleDelim;
    },
    mathmlBuilder: (group, options) => {
      var textNode = group.delim === "\\vert" || group.delim === "|" ? makeText("|", "text") : makeText(group.delim, group.mode);
      var middleNode = new mathMLTree.MathNode("mo", [textNode]);
      middleNode.setAttribute("fence", "true");
      middleNode.setAttribute("lspace", "0.05em");
      middleNode.setAttribute("rspace", "0.05em");
      return middleNode;
    }
  });
  var htmlBuilder$7 = (group, options) => {
    var inner2 = buildCommon.wrapFragment(buildGroup$1(group.body, options), options);
    var label = group.label.slice(1);
    var scale = options.sizeMultiplier;
    var img;
    var imgShift = 0;
    var isSingleChar = utils.isCharacterBox(group.body);
    if (label === "sout") {
      img = buildCommon.makeSpan(["stretchy", "sout"]);
      img.height = options.fontMetrics().defaultRuleThickness / scale;
      imgShift = -0.5 * options.fontMetrics().xHeight;
    } else if (label === "phase") {
      var lineWeight = calculateSize({
        number: 0.6,
        unit: "pt"
      }, options);
      var clearance = calculateSize({
        number: 0.35,
        unit: "ex"
      }, options);
      var newOptions = options.havingBaseSizing();
      scale = scale / newOptions.sizeMultiplier;
      var angleHeight = inner2.height + inner2.depth + lineWeight + clearance;
      inner2.style.paddingLeft = makeEm(angleHeight / 2 + lineWeight);
      var viewBoxHeight = Math.floor(1e3 * angleHeight * scale);
      var path2 = phasePath(viewBoxHeight);
      var svgNode = new SvgNode([new PathNode("phase", path2)], {
        "width": "400em",
        "height": makeEm(viewBoxHeight / 1e3),
        "viewBox": "0 0 400000 " + viewBoxHeight,
        "preserveAspectRatio": "xMinYMin slice"
      });
      img = buildCommon.makeSvgSpan(["hide-tail"], [svgNode], options);
      img.style.height = makeEm(angleHeight);
      imgShift = inner2.depth + lineWeight + clearance;
    } else {
      if (/cancel/.test(label)) {
        if (!isSingleChar) {
          inner2.classes.push("cancel-pad");
        }
      } else if (label === "angl") {
        inner2.classes.push("anglpad");
      } else {
        inner2.classes.push("boxpad");
      }
      var topPad = 0;
      var bottomPad = 0;
      var ruleThickness = 0;
      if (/box/.test(label)) {
        ruleThickness = Math.max(
          options.fontMetrics().fboxrule,
          // default
          options.minRuleThickness
          // User override.
        );
        topPad = options.fontMetrics().fboxsep + (label === "colorbox" ? 0 : ruleThickness);
        bottomPad = topPad;
      } else if (label === "angl") {
        ruleThickness = Math.max(options.fontMetrics().defaultRuleThickness, options.minRuleThickness);
        topPad = 4 * ruleThickness;
        bottomPad = Math.max(0, 0.25 - inner2.depth);
      } else {
        topPad = isSingleChar ? 0.2 : 0;
        bottomPad = topPad;
      }
      img = stretchy.encloseSpan(inner2, label, topPad, bottomPad, options);
      if (/fbox|boxed|fcolorbox/.test(label)) {
        img.style.borderStyle = "solid";
        img.style.borderWidth = makeEm(ruleThickness);
      } else if (label === "angl" && ruleThickness !== 0.049) {
        img.style.borderTopWidth = makeEm(ruleThickness);
        img.style.borderRightWidth = makeEm(ruleThickness);
      }
      imgShift = inner2.depth + bottomPad;
      if (group.backgroundColor) {
        img.style.backgroundColor = group.backgroundColor;
        if (group.borderColor) {
          img.style.borderColor = group.borderColor;
        }
      }
    }
    var vlist;
    if (group.backgroundColor) {
      vlist = buildCommon.makeVList({
        positionType: "individualShift",
        children: [
          // Put the color background behind inner;
          {
            type: "elem",
            elem: img,
            shift: imgShift
          },
          {
            type: "elem",
            elem: inner2,
            shift: 0
          }
        ]
      }, options);
    } else {
      var classes = /cancel|phase/.test(label) ? ["svg-align"] : [];
      vlist = buildCommon.makeVList({
        positionType: "individualShift",
        children: [
          // Write the \cancel stroke on top of inner.
          {
            type: "elem",
            elem: inner2,
            shift: 0
          },
          {
            type: "elem",
            elem: img,
            shift: imgShift,
            wrapperClasses: classes
          }
        ]
      }, options);
    }
    if (/cancel/.test(label)) {
      vlist.height = inner2.height;
      vlist.depth = inner2.depth;
    }
    if (/cancel/.test(label) && !isSingleChar) {
      return buildCommon.makeSpan(["mord", "cancel-lap"], [vlist], options);
    } else {
      return buildCommon.makeSpan(["mord"], [vlist], options);
    }
  };
  var mathmlBuilder$6 = (group, options) => {
    var fboxsep = 0;
    var node = new mathMLTree.MathNode(group.label.indexOf("colorbox") > -1 ? "mpadded" : "menclose", [buildGroup2(group.body, options)]);
    switch (group.label) {
      case "\\cancel":
        node.setAttribute("notation", "updiagonalstrike");
        break;
      case "\\bcancel":
        node.setAttribute("notation", "downdiagonalstrike");
        break;
      case "\\phase":
        node.setAttribute("notation", "phasorangle");
        break;
      case "\\sout":
        node.setAttribute("notation", "horizontalstrike");
        break;
      case "\\fbox":
        node.setAttribute("notation", "box");
        break;
      case "\\angl":
        node.setAttribute("notation", "actuarial");
        break;
      case "\\fcolorbox":
      case "\\colorbox":
        fboxsep = options.fontMetrics().fboxsep * options.fontMetrics().ptPerEm;
        node.setAttribute("width", "+" + 2 * fboxsep + "pt");
        node.setAttribute("height", "+" + 2 * fboxsep + "pt");
        node.setAttribute("lspace", fboxsep + "pt");
        node.setAttribute("voffset", fboxsep + "pt");
        if (group.label === "\\fcolorbox") {
          var thk = Math.max(
            options.fontMetrics().fboxrule,
            // default
            options.minRuleThickness
            // user override
          );
          node.setAttribute("style", "border: " + thk + "em solid " + String(group.borderColor));
        }
        break;
      case "\\xcancel":
        node.setAttribute("notation", "updiagonalstrike downdiagonalstrike");
        break;
    }
    if (group.backgroundColor) {
      node.setAttribute("mathbackground", group.backgroundColor);
    }
    return node;
  };
  defineFunction({
    type: "enclose",
    names: ["\\colorbox"],
    props: {
      numArgs: 2,
      allowedInText: true,
      argTypes: ["color", "text"]
    },
    handler(_ref, args, optArgs) {
      var {
        parser,
        funcName
      } = _ref;
      var color = assertNodeType(args[0], "color-token").color;
      var body = args[1];
      return {
        type: "enclose",
        mode: parser.mode,
        label: funcName,
        backgroundColor: color,
        body
      };
    },
    htmlBuilder: htmlBuilder$7,
    mathmlBuilder: mathmlBuilder$6
  });
  defineFunction({
    type: "enclose",
    names: ["\\fcolorbox"],
    props: {
      numArgs: 3,
      allowedInText: true,
      argTypes: ["color", "color", "text"]
    },
    handler(_ref2, args, optArgs) {
      var {
        parser,
        funcName
      } = _ref2;
      var borderColor = assertNodeType(args[0], "color-token").color;
      var backgroundColor = assertNodeType(args[1], "color-token").color;
      var body = args[2];
      return {
        type: "enclose",
        mode: parser.mode,
        label: funcName,
        backgroundColor,
        borderColor,
        body
      };
    },
    htmlBuilder: htmlBuilder$7,
    mathmlBuilder: mathmlBuilder$6
  });
  defineFunction({
    type: "enclose",
    names: ["\\fbox"],
    props: {
      numArgs: 1,
      argTypes: ["hbox"],
      allowedInText: true
    },
    handler(_ref3, args) {
      var {
        parser
      } = _ref3;
      return {
        type: "enclose",
        mode: parser.mode,
        label: "\\fbox",
        body: args[0]
      };
    }
  });
  defineFunction({
    type: "enclose",
    names: ["\\cancel", "\\bcancel", "\\xcancel", "\\sout", "\\phase"],
    props: {
      numArgs: 1
    },
    handler(_ref4, args) {
      var {
        parser,
        funcName
      } = _ref4;
      var body = args[0];
      return {
        type: "enclose",
        mode: parser.mode,
        label: funcName,
        body
      };
    },
    htmlBuilder: htmlBuilder$7,
    mathmlBuilder: mathmlBuilder$6
  });
  defineFunction({
    type: "enclose",
    names: ["\\angl"],
    props: {
      numArgs: 1,
      argTypes: ["hbox"],
      allowedInText: false
    },
    handler(_ref5, args) {
      var {
        parser
      } = _ref5;
      return {
        type: "enclose",
        mode: parser.mode,
        label: "\\angl",
        body: args[0]
      };
    }
  });
  var _environments = {};
  function defineEnvironment(_ref) {
    var {
      type,
      names,
      props,
      handler,
      htmlBuilder: htmlBuilder3,
      mathmlBuilder: mathmlBuilder3
    } = _ref;
    var data = {
      type,
      numArgs: props.numArgs || 0,
      allowedInText: false,
      numOptionalArgs: 0,
      handler
    };
    for (var i2 = 0; i2 < names.length; ++i2) {
      _environments[names[i2]] = data;
    }
    if (htmlBuilder3) {
      _htmlGroupBuilders[type] = htmlBuilder3;
    }
    if (mathmlBuilder3) {
      _mathmlGroupBuilders[type] = mathmlBuilder3;
    }
  }
  var _macros = {};
  function defineMacro(name, body) {
    _macros[name] = body;
  }
  function getHLines(parser) {
    var hlineInfo = [];
    parser.consumeSpaces();
    var nxt = parser.fetch().text;
    if (nxt === "\\relax") {
      parser.consume();
      parser.consumeSpaces();
      nxt = parser.fetch().text;
    }
    while (nxt === "\\hline" || nxt === "\\hdashline") {
      parser.consume();
      hlineInfo.push(nxt === "\\hdashline");
      parser.consumeSpaces();
      nxt = parser.fetch().text;
    }
    return hlineInfo;
  }
  var validateAmsEnvironmentContext = (context) => {
    var settings = context.parser.settings;
    if (!settings.displayMode) {
      throw new ParseError("{" + context.envName + "} can be used only in display mode.");
    }
  };
  function getAutoTag(name) {
    if (name.indexOf("ed") === -1) {
      return name.indexOf("*") === -1;
    }
  }
  function parseArray(parser, _ref, style) {
    var {
      hskipBeforeAndAfter,
      addJot,
      cols,
      arraystretch,
      colSeparationType,
      autoTag,
      singleRow,
      emptySingleRow,
      maxNumCols,
      leqno
    } = _ref;
    parser.gullet.beginGroup();
    if (!singleRow) {
      parser.gullet.macros.set("\\cr", "\\\\\\relax");
    }
    if (!arraystretch) {
      var stretch = parser.gullet.expandMacroAsText("\\arraystretch");
      if (stretch == null) {
        arraystretch = 1;
      } else {
        arraystretch = parseFloat(stretch);
        if (!arraystretch || arraystretch < 0) {
          throw new ParseError("Invalid \\arraystretch: " + stretch);
        }
      }
    }
    parser.gullet.beginGroup();
    var row = [];
    var body = [row];
    var rowGaps = [];
    var hLinesBeforeRow = [];
    var tags = autoTag != null ? [] : void 0;
    function beginRow() {
      if (autoTag) {
        parser.gullet.macros.set("\\@eqnsw", "1", true);
      }
    }
    function endRow() {
      if (tags) {
        if (parser.gullet.macros.get("\\df@tag")) {
          tags.push(parser.subparse([new Token("\\df@tag")]));
          parser.gullet.macros.set("\\df@tag", void 0, true);
        } else {
          tags.push(Boolean(autoTag) && parser.gullet.macros.get("\\@eqnsw") === "1");
        }
      }
    }
    beginRow();
    hLinesBeforeRow.push(getHLines(parser));
    while (true) {
      var cell = parser.parseExpression(false, singleRow ? "\\end" : "\\\\");
      parser.gullet.endGroup();
      parser.gullet.beginGroup();
      cell = {
        type: "ordgroup",
        mode: parser.mode,
        body: cell
      };
      if (style) {
        cell = {
          type: "styling",
          mode: parser.mode,
          style,
          body: [cell]
        };
      }
      row.push(cell);
      var next = parser.fetch().text;
      if (next === "&") {
        if (maxNumCols && row.length === maxNumCols) {
          if (singleRow || colSeparationType) {
            throw new ParseError("Too many tab characters: &", parser.nextToken);
          } else {
            parser.settings.reportNonstrict("textEnv", "Too few columns specified in the {array} column argument.");
          }
        }
        parser.consume();
      } else if (next === "\\end") {
        endRow();
        if (row.length === 1 && cell.type === "styling" && cell.body[0].body.length === 0 && (body.length > 1 || !emptySingleRow)) {
          body.pop();
        }
        if (hLinesBeforeRow.length < body.length + 1) {
          hLinesBeforeRow.push([]);
        }
        break;
      } else if (next === "\\\\") {
        parser.consume();
        var size = void 0;
        if (parser.gullet.future().text !== " ") {
          size = parser.parseSizeGroup(true);
        }
        rowGaps.push(size ? size.value : null);
        endRow();
        hLinesBeforeRow.push(getHLines(parser));
        row = [];
        body.push(row);
        beginRow();
      } else {
        throw new ParseError("Expected & or \\\\ or \\cr or \\end", parser.nextToken);
      }
    }
    parser.gullet.endGroup();
    parser.gullet.endGroup();
    return {
      type: "array",
      mode: parser.mode,
      addJot,
      arraystretch,
      body,
      cols,
      rowGaps,
      hskipBeforeAndAfter,
      hLinesBeforeRow,
      colSeparationType,
      tags,
      leqno
    };
  }
  function dCellStyle(envName) {
    if (envName.slice(0, 1) === "d") {
      return "display";
    } else {
      return "text";
    }
  }
  var htmlBuilder$6 = function htmlBuilder(group, options) {
    var r;
    var c;
    var nr = group.body.length;
    var hLinesBeforeRow = group.hLinesBeforeRow;
    var nc = 0;
    var body = new Array(nr);
    var hlines = [];
    var ruleThickness = Math.max(
      // From LaTeX \showthe\arrayrulewidth. Equals 0.04 em.
      options.fontMetrics().arrayRuleWidth,
      options.minRuleThickness
      // User override.
    );
    var pt = 1 / options.fontMetrics().ptPerEm;
    var arraycolsep = 5 * pt;
    if (group.colSeparationType && group.colSeparationType === "small") {
      var localMultiplier = options.havingStyle(Style$1.SCRIPT).sizeMultiplier;
      arraycolsep = 0.2778 * (localMultiplier / options.sizeMultiplier);
    }
    var baselineskip = group.colSeparationType === "CD" ? calculateSize({
      number: 3,
      unit: "ex"
    }, options) : 12 * pt;
    var jot = 3 * pt;
    var arrayskip = group.arraystretch * baselineskip;
    var arstrutHeight = 0.7 * arrayskip;
    var arstrutDepth = 0.3 * arrayskip;
    var totalHeight = 0;
    function setHLinePos(hlinesInGap) {
      for (var i2 = 0; i2 < hlinesInGap.length; ++i2) {
        if (i2 > 0) {
          totalHeight += 0.25;
        }
        hlines.push({
          pos: totalHeight,
          isDashed: hlinesInGap[i2]
        });
      }
    }
    setHLinePos(hLinesBeforeRow[0]);
    for (r = 0; r < group.body.length; ++r) {
      var inrow = group.body[r];
      var height = arstrutHeight;
      var depth = arstrutDepth;
      if (nc < inrow.length) {
        nc = inrow.length;
      }
      var outrow = new Array(inrow.length);
      for (c = 0; c < inrow.length; ++c) {
        var elt = buildGroup$1(inrow[c], options);
        if (depth < elt.depth) {
          depth = elt.depth;
        }
        if (height < elt.height) {
          height = elt.height;
        }
        outrow[c] = elt;
      }
      var rowGap = group.rowGaps[r];
      var gap = 0;
      if (rowGap) {
        gap = calculateSize(rowGap, options);
        if (gap > 0) {
          gap += arstrutDepth;
          if (depth < gap) {
            depth = gap;
          }
          gap = 0;
        }
      }
      if (group.addJot) {
        depth += jot;
      }
      outrow.height = height;
      outrow.depth = depth;
      totalHeight += height;
      outrow.pos = totalHeight;
      totalHeight += depth + gap;
      body[r] = outrow;
      setHLinePos(hLinesBeforeRow[r + 1]);
    }
    var offset = totalHeight / 2 + options.fontMetrics().axisHeight;
    var colDescriptions = group.cols || [];
    var cols = [];
    var colSep;
    var colDescrNum;
    var tagSpans = [];
    if (group.tags && group.tags.some((tag2) => tag2)) {
      for (r = 0; r < nr; ++r) {
        var rw = body[r];
        var shift = rw.pos - offset;
        var tag = group.tags[r];
        var tagSpan = void 0;
        if (tag === true) {
          tagSpan = buildCommon.makeSpan(["eqn-num"], [], options);
        } else if (tag === false) {
          tagSpan = buildCommon.makeSpan([], [], options);
        } else {
          tagSpan = buildCommon.makeSpan([], buildExpression$1(tag, options, true), options);
        }
        tagSpan.depth = rw.depth;
        tagSpan.height = rw.height;
        tagSpans.push({
          type: "elem",
          elem: tagSpan,
          shift
        });
      }
    }
    for (
      c = 0, colDescrNum = 0;
      // Continue while either there are more columns or more column
      // descriptions, so trailing separators don't get lost.
      c < nc || colDescrNum < colDescriptions.length;
      ++c, ++colDescrNum
    ) {
      var colDescr = colDescriptions[colDescrNum] || {};
      var firstSeparator = true;
      while (colDescr.type === "separator") {
        if (!firstSeparator) {
          colSep = buildCommon.makeSpan(["arraycolsep"], []);
          colSep.style.width = makeEm(options.fontMetrics().doubleRuleSep);
          cols.push(colSep);
        }
        if (colDescr.separator === "|" || colDescr.separator === ":") {
          var lineType = colDescr.separator === "|" ? "solid" : "dashed";
          var separator = buildCommon.makeSpan(["vertical-separator"], [], options);
          separator.style.height = makeEm(totalHeight);
          separator.style.borderRightWidth = makeEm(ruleThickness);
          separator.style.borderRightStyle = lineType;
          separator.style.margin = "0 " + makeEm(-ruleThickness / 2);
          var _shift = totalHeight - offset;
          if (_shift) {
            separator.style.verticalAlign = makeEm(-_shift);
          }
          cols.push(separator);
        } else {
          throw new ParseError("Invalid separator type: " + colDescr.separator);
        }
        colDescrNum++;
        colDescr = colDescriptions[colDescrNum] || {};
        firstSeparator = false;
      }
      if (c >= nc) {
        continue;
      }
      var sepwidth = void 0;
      if (c > 0 || group.hskipBeforeAndAfter) {
        sepwidth = utils.deflt(colDescr.pregap, arraycolsep);
        if (sepwidth !== 0) {
          colSep = buildCommon.makeSpan(["arraycolsep"], []);
          colSep.style.width = makeEm(sepwidth);
          cols.push(colSep);
        }
      }
      var col = [];
      for (r = 0; r < nr; ++r) {
        var row = body[r];
        var elem = row[c];
        if (!elem) {
          continue;
        }
        var _shift2 = row.pos - offset;
        elem.depth = row.depth;
        elem.height = row.height;
        col.push({
          type: "elem",
          elem,
          shift: _shift2
        });
      }
      col = buildCommon.makeVList({
        positionType: "individualShift",
        children: col
      }, options);
      col = buildCommon.makeSpan(["col-align-" + (colDescr.align || "c")], [col]);
      cols.push(col);
      if (c < nc - 1 || group.hskipBeforeAndAfter) {
        sepwidth = utils.deflt(colDescr.postgap, arraycolsep);
        if (sepwidth !== 0) {
          colSep = buildCommon.makeSpan(["arraycolsep"], []);
          colSep.style.width = makeEm(sepwidth);
          cols.push(colSep);
        }
      }
    }
    body = buildCommon.makeSpan(["mtable"], cols);
    if (hlines.length > 0) {
      var line = buildCommon.makeLineSpan("hline", options, ruleThickness);
      var dashes = buildCommon.makeLineSpan("hdashline", options, ruleThickness);
      var vListElems = [{
        type: "elem",
        elem: body,
        shift: 0
      }];
      while (hlines.length > 0) {
        var hline = hlines.pop();
        var lineShift = hline.pos - offset;
        if (hline.isDashed) {
          vListElems.push({
            type: "elem",
            elem: dashes,
            shift: lineShift
          });
        } else {
          vListElems.push({
            type: "elem",
            elem: line,
            shift: lineShift
          });
        }
      }
      body = buildCommon.makeVList({
        positionType: "individualShift",
        children: vListElems
      }, options);
    }
    if (tagSpans.length === 0) {
      return buildCommon.makeSpan(["mord"], [body], options);
    } else {
      var eqnNumCol = buildCommon.makeVList({
        positionType: "individualShift",
        children: tagSpans
      }, options);
      eqnNumCol = buildCommon.makeSpan(["tag"], [eqnNumCol], options);
      return buildCommon.makeFragment([body, eqnNumCol]);
    }
  };
  var alignMap = {
    c: "center ",
    l: "left ",
    r: "right "
  };
  var mathmlBuilder$5 = function mathmlBuilder(group, options) {
    var tbl = [];
    var glue = new mathMLTree.MathNode("mtd", [], ["mtr-glue"]);
    var tag = new mathMLTree.MathNode("mtd", [], ["mml-eqn-num"]);
    for (var i2 = 0; i2 < group.body.length; i2++) {
      var rw = group.body[i2];
      var row = [];
      for (var j = 0; j < rw.length; j++) {
        row.push(new mathMLTree.MathNode("mtd", [buildGroup2(rw[j], options)]));
      }
      if (group.tags && group.tags[i2]) {
        row.unshift(glue);
        row.push(glue);
        if (group.leqno) {
          row.unshift(tag);
        } else {
          row.push(tag);
        }
      }
      tbl.push(new mathMLTree.MathNode("mtr", row));
    }
    var table = new mathMLTree.MathNode("mtable", tbl);
    var gap = group.arraystretch === 0.5 ? 0.1 : 0.16 + group.arraystretch - 1 + (group.addJot ? 0.09 : 0);
    table.setAttribute("rowspacing", makeEm(gap));
    var menclose = "";
    var align = "";
    if (group.cols && group.cols.length > 0) {
      var cols = group.cols;
      var columnLines = "";
      var prevTypeWasAlign = false;
      var iStart = 0;
      var iEnd = cols.length;
      if (cols[0].type === "separator") {
        menclose += "top ";
        iStart = 1;
      }
      if (cols[cols.length - 1].type === "separator") {
        menclose += "bottom ";
        iEnd -= 1;
      }
      for (var _i6 = iStart; _i6 < iEnd; _i6++) {
        if (cols[_i6].type === "align") {
          align += alignMap[cols[_i6].align];
          if (prevTypeWasAlign) {
            columnLines += "none ";
          }
          prevTypeWasAlign = true;
        } else if (cols[_i6].type === "separator") {
          if (prevTypeWasAlign) {
            columnLines += cols[_i6].separator === "|" ? "solid " : "dashed ";
            prevTypeWasAlign = false;
          }
        }
      }
      table.setAttribute("columnalign", align.trim());
      if (/[sd]/.test(columnLines)) {
        table.setAttribute("columnlines", columnLines.trim());
      }
    }
    if (group.colSeparationType === "align") {
      var _cols = group.cols || [];
      var spacing2 = "";
      for (var _i22 = 1; _i22 < _cols.length; _i22++) {
        spacing2 += _i22 % 2 ? "0em " : "1em ";
      }
      table.setAttribute("columnspacing", spacing2.trim());
    } else if (group.colSeparationType === "alignat" || group.colSeparationType === "gather") {
      table.setAttribute("columnspacing", "0em");
    } else if (group.colSeparationType === "small") {
      table.setAttribute("columnspacing", "0.2778em");
    } else if (group.colSeparationType === "CD") {
      table.setAttribute("columnspacing", "0.5em");
    } else {
      table.setAttribute("columnspacing", "1em");
    }
    var rowLines = "";
    var hlines = group.hLinesBeforeRow;
    menclose += hlines[0].length > 0 ? "left " : "";
    menclose += hlines[hlines.length - 1].length > 0 ? "right " : "";
    for (var _i32 = 1; _i32 < hlines.length - 1; _i32++) {
      rowLines += hlines[_i32].length === 0 ? "none " : hlines[_i32][0] ? "dashed " : "solid ";
    }
    if (/[sd]/.test(rowLines)) {
      table.setAttribute("rowlines", rowLines.trim());
    }
    if (menclose !== "") {
      table = new mathMLTree.MathNode("menclose", [table]);
      table.setAttribute("notation", menclose.trim());
    }
    if (group.arraystretch && group.arraystretch < 1) {
      table = new mathMLTree.MathNode("mstyle", [table]);
      table.setAttribute("scriptlevel", "1");
    }
    return table;
  };
  var alignedHandler = function alignedHandler2(context, args) {
    if (context.envName.indexOf("ed") === -1) {
      validateAmsEnvironmentContext(context);
    }
    var cols = [];
    var separationType = context.envName.indexOf("at") > -1 ? "alignat" : "align";
    var isSplit = context.envName === "split";
    var res = parseArray(context.parser, {
      cols,
      addJot: true,
      autoTag: isSplit ? void 0 : getAutoTag(context.envName),
      emptySingleRow: true,
      colSeparationType: separationType,
      maxNumCols: isSplit ? 2 : void 0,
      leqno: context.parser.settings.leqno
    }, "display");
    var numMaths;
    var numCols = 0;
    var emptyGroup = {
      type: "ordgroup",
      mode: context.mode,
      body: []
    };
    if (args[0] && args[0].type === "ordgroup") {
      var arg0 = "";
      for (var i2 = 0; i2 < args[0].body.length; i2++) {
        var textord2 = assertNodeType(args[0].body[i2], "textord");
        arg0 += textord2.text;
      }
      numMaths = Number(arg0);
      numCols = numMaths * 2;
    }
    var isAligned = !numCols;
    res.body.forEach(function(row) {
      for (var _i42 = 1; _i42 < row.length; _i42 += 2) {
        var styling = assertNodeType(row[_i42], "styling");
        var ordgroup = assertNodeType(styling.body[0], "ordgroup");
        ordgroup.body.unshift(emptyGroup);
      }
      if (!isAligned) {
        var curMaths = row.length / 2;
        if (numMaths < curMaths) {
          throw new ParseError("Too many math in a row: " + ("expected " + numMaths + ", but got " + curMaths), row[0]);
        }
      } else if (numCols < row.length) {
        numCols = row.length;
      }
    });
    for (var _i52 = 0; _i52 < numCols; ++_i52) {
      var align = "r";
      var pregap = 0;
      if (_i52 % 2 === 1) {
        align = "l";
      } else if (_i52 > 0 && isAligned) {
        pregap = 1;
      }
      cols[_i52] = {
        type: "align",
        align,
        pregap,
        postgap: 0
      };
    }
    res.colSeparationType = isAligned ? "align" : "alignat";
    return res;
  };
  defineEnvironment({
    type: "array",
    names: ["array", "darray"],
    props: {
      numArgs: 1
    },
    handler(context, args) {
      var symNode = checkSymbolNodeType(args[0]);
      var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
      var cols = colalign.map(function(nde) {
        var node = assertSymbolNodeType(nde);
        var ca = node.text;
        if ("lcr".indexOf(ca) !== -1) {
          return {
            type: "align",
            align: ca
          };
        } else if (ca === "|") {
          return {
            type: "separator",
            separator: "|"
          };
        } else if (ca === ":") {
          return {
            type: "separator",
            separator: ":"
          };
        }
        throw new ParseError("Unknown column alignment: " + ca, nde);
      });
      var res = {
        cols,
        hskipBeforeAndAfter: true,
        // \@preamble in lttab.dtx
        maxNumCols: cols.length
      };
      return parseArray(context.parser, res, dCellStyle(context.envName));
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["matrix", "pmatrix", "bmatrix", "Bmatrix", "vmatrix", "Vmatrix", "matrix*", "pmatrix*", "bmatrix*", "Bmatrix*", "vmatrix*", "Vmatrix*"],
    props: {
      numArgs: 0
    },
    handler(context) {
      var delimiters2 = {
        "matrix": null,
        "pmatrix": ["(", ")"],
        "bmatrix": ["[", "]"],
        "Bmatrix": ["\\{", "\\}"],
        "vmatrix": ["|", "|"],
        "Vmatrix": ["\\Vert", "\\Vert"]
      }[context.envName.replace("*", "")];
      var colAlign = "c";
      var payload = {
        hskipBeforeAndAfter: false,
        cols: [{
          type: "align",
          align: colAlign
        }]
      };
      if (context.envName.charAt(context.envName.length - 1) === "*") {
        var parser = context.parser;
        parser.consumeSpaces();
        if (parser.fetch().text === "[") {
          parser.consume();
          parser.consumeSpaces();
          colAlign = parser.fetch().text;
          if ("lcr".indexOf(colAlign) === -1) {
            throw new ParseError("Expected l or c or r", parser.nextToken);
          }
          parser.consume();
          parser.consumeSpaces();
          parser.expect("]");
          parser.consume();
          payload.cols = [{
            type: "align",
            align: colAlign
          }];
        }
      }
      var res = parseArray(context.parser, payload, dCellStyle(context.envName));
      var numCols = Math.max(0, ...res.body.map((row) => row.length));
      res.cols = new Array(numCols).fill({
        type: "align",
        align: colAlign
      });
      return delimiters2 ? {
        type: "leftright",
        mode: context.mode,
        body: [res],
        left: delimiters2[0],
        right: delimiters2[1],
        rightColor: void 0
        // \right uninfluenced by \color in array
      } : res;
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["smallmatrix"],
    props: {
      numArgs: 0
    },
    handler(context) {
      var payload = {
        arraystretch: 0.5
      };
      var res = parseArray(context.parser, payload, "script");
      res.colSeparationType = "small";
      return res;
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["subarray"],
    props: {
      numArgs: 1
    },
    handler(context, args) {
      var symNode = checkSymbolNodeType(args[0]);
      var colalign = symNode ? [args[0]] : assertNodeType(args[0], "ordgroup").body;
      var cols = colalign.map(function(nde) {
        var node = assertSymbolNodeType(nde);
        var ca = node.text;
        if ("lc".indexOf(ca) !== -1) {
          return {
            type: "align",
            align: ca
          };
        }
        throw new ParseError("Unknown column alignment: " + ca, nde);
      });
      if (cols.length > 1) {
        throw new ParseError("{subarray} can contain only one column");
      }
      var res = {
        cols,
        hskipBeforeAndAfter: false,
        arraystretch: 0.5
      };
      res = parseArray(context.parser, res, "script");
      if (res.body.length > 0 && res.body[0].length > 1) {
        throw new ParseError("{subarray} can contain only one column");
      }
      return res;
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["cases", "dcases", "rcases", "drcases"],
    props: {
      numArgs: 0
    },
    handler(context) {
      var payload = {
        arraystretch: 1.2,
        cols: [{
          type: "align",
          align: "l",
          pregap: 0,
          // TODO(kevinb) get the current style.
          // For now we use the metrics for TEXT style which is what we were
          // doing before.  Before attempting to get the current style we
          // should look at TeX's behavior especially for \over and matrices.
          postgap: 1
          /* 1em quad */
        }, {
          type: "align",
          align: "l",
          pregap: 0,
          postgap: 0
        }]
      };
      var res = parseArray(context.parser, payload, dCellStyle(context.envName));
      return {
        type: "leftright",
        mode: context.mode,
        body: [res],
        left: context.envName.indexOf("r") > -1 ? "." : "\\{",
        right: context.envName.indexOf("r") > -1 ? "\\}" : ".",
        rightColor: void 0
      };
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["align", "align*", "aligned", "split"],
    props: {
      numArgs: 0
    },
    handler: alignedHandler,
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["gathered", "gather", "gather*"],
    props: {
      numArgs: 0
    },
    handler(context) {
      if (["gather", "gather*"].includes(context.envName)) {
        validateAmsEnvironmentContext(context);
      }
      var res = {
        cols: [{
          type: "align",
          align: "c"
        }],
        addJot: true,
        colSeparationType: "gather",
        autoTag: getAutoTag(context.envName),
        emptySingleRow: true,
        leqno: context.parser.settings.leqno
      };
      return parseArray(context.parser, res, "display");
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["alignat", "alignat*", "alignedat"],
    props: {
      numArgs: 1
    },
    handler: alignedHandler,
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["equation", "equation*"],
    props: {
      numArgs: 0
    },
    handler(context) {
      validateAmsEnvironmentContext(context);
      var res = {
        autoTag: getAutoTag(context.envName),
        emptySingleRow: true,
        singleRow: true,
        maxNumCols: 1,
        leqno: context.parser.settings.leqno
      };
      return parseArray(context.parser, res, "display");
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineEnvironment({
    type: "array",
    names: ["CD"],
    props: {
      numArgs: 0
    },
    handler(context) {
      validateAmsEnvironmentContext(context);
      return parseCD(context.parser);
    },
    htmlBuilder: htmlBuilder$6,
    mathmlBuilder: mathmlBuilder$5
  });
  defineMacro("\\nonumber", "\\gdef\\@eqnsw{0}");
  defineMacro("\\notag", "\\nonumber");
  defineFunction({
    type: "text",
    // Doesn't matter what this is.
    names: ["\\hline", "\\hdashline"],
    props: {
      numArgs: 0,
      allowedInText: true,
      allowedInMath: true
    },
    handler(context, args) {
      throw new ParseError(context.funcName + " valid only within array environment");
    }
  });
  var environments = _environments;
  defineFunction({
    type: "environment",
    names: ["\\begin", "\\end"],
    props: {
      numArgs: 1,
      argTypes: ["text"]
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      var nameGroup = args[0];
      if (nameGroup.type !== "ordgroup") {
        throw new ParseError("Invalid environment name", nameGroup);
      }
      var envName = "";
      for (var i2 = 0; i2 < nameGroup.body.length; ++i2) {
        envName += assertNodeType(nameGroup.body[i2], "textord").text;
      }
      if (funcName === "\\begin") {
        if (!environments.hasOwnProperty(envName)) {
          throw new ParseError("No such environment: " + envName, nameGroup);
        }
        var env = environments[envName];
        var {
          args: _args,
          optArgs
        } = parser.parseArguments("\\begin{" + envName + "}", env);
        var context = {
          mode: parser.mode,
          envName,
          parser
        };
        var result = env.handler(context, _args, optArgs);
        parser.expect("\\end", false);
        var endNameToken = parser.nextToken;
        var end = assertNodeType(parser.parseFunction(), "environment");
        if (end.name !== envName) {
          throw new ParseError("Mismatch: \\begin{" + envName + "} matched by \\end{" + end.name + "}", endNameToken);
        }
        return result;
      }
      return {
        type: "environment",
        mode: parser.mode,
        name: envName,
        nameGroup
      };
    }
  });
  var htmlBuilder$5 = (group, options) => {
    var font = group.font;
    var newOptions = options.withFont(font);
    return buildGroup$1(group.body, newOptions);
  };
  var mathmlBuilder$4 = (group, options) => {
    var font = group.font;
    var newOptions = options.withFont(font);
    return buildGroup2(group.body, newOptions);
  };
  var fontAliases = {
    "\\Bbb": "\\mathbb",
    "\\bold": "\\mathbf",
    "\\frak": "\\mathfrak",
    "\\bm": "\\boldsymbol"
  };
  defineFunction({
    type: "font",
    names: [
      // styles, except \boldsymbol defined below
      "\\mathrm",
      "\\mathit",
      "\\mathbf",
      "\\mathnormal",
      "\\mathsfit",
      // families
      "\\mathbb",
      "\\mathcal",
      "\\mathfrak",
      "\\mathscr",
      "\\mathsf",
      "\\mathtt",
      // aliases, except \bm defined below
      "\\Bbb",
      "\\bold",
      "\\frak"
    ],
    props: {
      numArgs: 1,
      allowedInArgument: true
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var body = normalizeArgument(args[0]);
      var func = funcName;
      if (func in fontAliases) {
        func = fontAliases[func];
      }
      return {
        type: "font",
        mode: parser.mode,
        font: func.slice(1),
        body
      };
    },
    htmlBuilder: htmlBuilder$5,
    mathmlBuilder: mathmlBuilder$4
  });
  defineFunction({
    type: "mclass",
    names: ["\\boldsymbol", "\\bm"],
    props: {
      numArgs: 1
    },
    handler: (_ref2, args) => {
      var {
        parser
      } = _ref2;
      var body = args[0];
      var isCharacterBox3 = utils.isCharacterBox(body);
      return {
        type: "mclass",
        mode: parser.mode,
        mclass: binrelClass(body),
        body: [{
          type: "font",
          mode: parser.mode,
          font: "boldsymbol",
          body
        }],
        isCharacterBox: isCharacterBox3
      };
    }
  });
  defineFunction({
    type: "font",
    names: ["\\rm", "\\sf", "\\tt", "\\bf", "\\it", "\\cal"],
    props: {
      numArgs: 0,
      allowedInText: true
    },
    handler: (_ref3, args) => {
      var {
        parser,
        funcName,
        breakOnTokenText
      } = _ref3;
      var {
        mode
      } = parser;
      var body = parser.parseExpression(true, breakOnTokenText);
      var style = "math" + funcName.slice(1);
      return {
        type: "font",
        mode,
        font: style,
        body: {
          type: "ordgroup",
          mode: parser.mode,
          body
        }
      };
    },
    htmlBuilder: htmlBuilder$5,
    mathmlBuilder: mathmlBuilder$4
  });
  var adjustStyle = (size, originalStyle) => {
    var style = originalStyle;
    if (size === "display") {
      style = style.id >= Style$1.SCRIPT.id ? style.text() : Style$1.DISPLAY;
    } else if (size === "text" && style.size === Style$1.DISPLAY.size) {
      style = Style$1.TEXT;
    } else if (size === "script") {
      style = Style$1.SCRIPT;
    } else if (size === "scriptscript") {
      style = Style$1.SCRIPTSCRIPT;
    }
    return style;
  };
  var htmlBuilder$4 = (group, options) => {
    var style = adjustStyle(group.size, options.style);
    var nstyle = style.fracNum();
    var dstyle = style.fracDen();
    var newOptions;
    newOptions = options.havingStyle(nstyle);
    var numerm = buildGroup$1(group.numer, newOptions, options);
    if (group.continued) {
      var hStrut = 8.5 / options.fontMetrics().ptPerEm;
      var dStrut = 3.5 / options.fontMetrics().ptPerEm;
      numerm.height = numerm.height < hStrut ? hStrut : numerm.height;
      numerm.depth = numerm.depth < dStrut ? dStrut : numerm.depth;
    }
    newOptions = options.havingStyle(dstyle);
    var denomm = buildGroup$1(group.denom, newOptions, options);
    var rule;
    var ruleWidth;
    var ruleSpacing;
    if (group.hasBarLine) {
      if (group.barSize) {
        ruleWidth = calculateSize(group.barSize, options);
        rule = buildCommon.makeLineSpan("frac-line", options, ruleWidth);
      } else {
        rule = buildCommon.makeLineSpan("frac-line", options);
      }
      ruleWidth = rule.height;
      ruleSpacing = rule.height;
    } else {
      rule = null;
      ruleWidth = 0;
      ruleSpacing = options.fontMetrics().defaultRuleThickness;
    }
    var numShift;
    var clearance;
    var denomShift;
    if (style.size === Style$1.DISPLAY.size || group.size === "display") {
      numShift = options.fontMetrics().num1;
      if (ruleWidth > 0) {
        clearance = 3 * ruleSpacing;
      } else {
        clearance = 7 * ruleSpacing;
      }
      denomShift = options.fontMetrics().denom1;
    } else {
      if (ruleWidth > 0) {
        numShift = options.fontMetrics().num2;
        clearance = ruleSpacing;
      } else {
        numShift = options.fontMetrics().num3;
        clearance = 3 * ruleSpacing;
      }
      denomShift = options.fontMetrics().denom2;
    }
    var frac;
    if (!rule) {
      var candidateClearance = numShift - numerm.depth - (denomm.height - denomShift);
      if (candidateClearance < clearance) {
        numShift += 0.5 * (clearance - candidateClearance);
        denomShift += 0.5 * (clearance - candidateClearance);
      }
      frac = buildCommon.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: denomm,
          shift: denomShift
        }, {
          type: "elem",
          elem: numerm,
          shift: -numShift
        }]
      }, options);
    } else {
      var axisHeight = options.fontMetrics().axisHeight;
      if (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth) < clearance) {
        numShift += clearance - (numShift - numerm.depth - (axisHeight + 0.5 * ruleWidth));
      }
      if (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift) < clearance) {
        denomShift += clearance - (axisHeight - 0.5 * ruleWidth - (denomm.height - denomShift));
      }
      var midShift = -(axisHeight - 0.5 * ruleWidth);
      frac = buildCommon.makeVList({
        positionType: "individualShift",
        children: [{
          type: "elem",
          elem: denomm,
          shift: denomShift
        }, {
          type: "elem",
          elem: rule,
          shift: midShift
        }, {
          type: "elem",
          elem: numerm,
          shift: -numShift
        }]
      }, options);
    }
    newOptions = options.havingStyle(style);
    frac.height *= newOptions.sizeMultiplier / options.sizeMultiplier;
    frac.depth *= newOptions.sizeMultiplier / options.sizeMultiplier;
    var delimSize;
    if (style.size === Style$1.DISPLAY.size) {
      delimSize = options.fontMetrics().delim1;
    } else if (style.size === Style$1.SCRIPTSCRIPT.size) {
      delimSize = options.havingStyle(Style$1.SCRIPT).fontMetrics().delim2;
    } else {
      delimSize = options.fontMetrics().delim2;
    }
    var leftDelim;
    var rightDelim;
    if (group.leftDelim == null) {
      leftDelim = makeNullDelimiter(options, ["mopen"]);
    } else {
      leftDelim = delimiter.customSizedDelim(group.leftDelim, delimSize, true, options.havingStyle(style), group.mode, ["mopen"]);
    }
    if (group.continued) {
      rightDelim = buildCommon.makeSpan([]);
    } else if (group.rightDelim == null) {
      rightDelim = makeNullDelimiter(options, ["mclose"]);
    } else {
      rightDelim = delimiter.customSizedDelim(group.rightDelim, delimSize, true, options.havingStyle(style), group.mode, ["mclose"]);
    }
    return buildCommon.makeSpan(["mord"].concat(newOptions.sizingClasses(options)), [leftDelim, buildCommon.makeSpan(["mfrac"], [frac]), rightDelim], options);
  };
  var mathmlBuilder$3 = (group, options) => {
    var node = new mathMLTree.MathNode("mfrac", [buildGroup2(group.numer, options), buildGroup2(group.denom, options)]);
    if (!group.hasBarLine) {
      node.setAttribute("linethickness", "0px");
    } else if (group.barSize) {
      var ruleWidth = calculateSize(group.barSize, options);
      node.setAttribute("linethickness", makeEm(ruleWidth));
    }
    var style = adjustStyle(group.size, options.style);
    if (style.size !== options.style.size) {
      node = new mathMLTree.MathNode("mstyle", [node]);
      var isDisplay = style.size === Style$1.DISPLAY.size ? "true" : "false";
      node.setAttribute("displaystyle", isDisplay);
      node.setAttribute("scriptlevel", "0");
    }
    if (group.leftDelim != null || group.rightDelim != null) {
      var withDelims = [];
      if (group.leftDelim != null) {
        var leftOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.leftDelim.replace("\\", ""))]);
        leftOp.setAttribute("fence", "true");
        withDelims.push(leftOp);
      }
      withDelims.push(node);
      if (group.rightDelim != null) {
        var rightOp = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode(group.rightDelim.replace("\\", ""))]);
        rightOp.setAttribute("fence", "true");
        withDelims.push(rightOp);
      }
      return makeRow(withDelims);
    }
    return node;
  };
  defineFunction({
    type: "genfrac",
    names: [
      "\\dfrac",
      "\\frac",
      "\\tfrac",
      "\\dbinom",
      "\\binom",
      "\\tbinom",
      "\\\\atopfrac",
      // can’t be entered directly
      "\\\\bracefrac",
      "\\\\brackfrac"
      // ditto
    ],
    props: {
      numArgs: 2,
      allowedInArgument: true
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var numer = args[0];
      var denom = args[1];
      var hasBarLine;
      var leftDelim = null;
      var rightDelim = null;
      var size = "auto";
      switch (funcName) {
        case "\\dfrac":
        case "\\frac":
        case "\\tfrac":
          hasBarLine = true;
          break;
        case "\\\\atopfrac":
          hasBarLine = false;
          break;
        case "\\dbinom":
        case "\\binom":
        case "\\tbinom":
          hasBarLine = false;
          leftDelim = "(";
          rightDelim = ")";
          break;
        case "\\\\bracefrac":
          hasBarLine = false;
          leftDelim = "\\{";
          rightDelim = "\\}";
          break;
        case "\\\\brackfrac":
          hasBarLine = false;
          leftDelim = "[";
          rightDelim = "]";
          break;
        default:
          throw new Error("Unrecognized genfrac command");
      }
      switch (funcName) {
        case "\\dfrac":
        case "\\dbinom":
          size = "display";
          break;
        case "\\tfrac":
        case "\\tbinom":
          size = "text";
          break;
      }
      return {
        type: "genfrac",
        mode: parser.mode,
        continued: false,
        numer,
        denom,
        hasBarLine,
        leftDelim,
        rightDelim,
        size,
        barSize: null
      };
    },
    htmlBuilder: htmlBuilder$4,
    mathmlBuilder: mathmlBuilder$3
  });
  defineFunction({
    type: "genfrac",
    names: ["\\cfrac"],
    props: {
      numArgs: 2
    },
    handler: (_ref2, args) => {
      var {
        parser,
        funcName
      } = _ref2;
      var numer = args[0];
      var denom = args[1];
      return {
        type: "genfrac",
        mode: parser.mode,
        continued: true,
        numer,
        denom,
        hasBarLine: true,
        leftDelim: null,
        rightDelim: null,
        size: "display",
        barSize: null
      };
    }
  });
  defineFunction({
    type: "infix",
    names: ["\\over", "\\choose", "\\atop", "\\brace", "\\brack"],
    props: {
      numArgs: 0,
      infix: true
    },
    handler(_ref3) {
      var {
        parser,
        funcName,
        token
      } = _ref3;
      var replaceWith;
      switch (funcName) {
        case "\\over":
          replaceWith = "\\frac";
          break;
        case "\\choose":
          replaceWith = "\\binom";
          break;
        case "\\atop":
          replaceWith = "\\\\atopfrac";
          break;
        case "\\brace":
          replaceWith = "\\\\bracefrac";
          break;
        case "\\brack":
          replaceWith = "\\\\brackfrac";
          break;
        default:
          throw new Error("Unrecognized infix genfrac command");
      }
      return {
        type: "infix",
        mode: parser.mode,
        replaceWith,
        token
      };
    }
  });
  var stylArray = ["display", "text", "script", "scriptscript"];
  var delimFromValue = function delimFromValue2(delimString) {
    var delim = null;
    if (delimString.length > 0) {
      delim = delimString;
      delim = delim === "." ? null : delim;
    }
    return delim;
  };
  defineFunction({
    type: "genfrac",
    names: ["\\genfrac"],
    props: {
      numArgs: 6,
      allowedInArgument: true,
      argTypes: ["math", "math", "size", "text", "math", "math"]
    },
    handler(_ref4, args) {
      var {
        parser
      } = _ref4;
      var numer = args[4];
      var denom = args[5];
      var leftNode = normalizeArgument(args[0]);
      var leftDelim = leftNode.type === "atom" && leftNode.family === "open" ? delimFromValue(leftNode.text) : null;
      var rightNode = normalizeArgument(args[1]);
      var rightDelim = rightNode.type === "atom" && rightNode.family === "close" ? delimFromValue(rightNode.text) : null;
      var barNode = assertNodeType(args[2], "size");
      var hasBarLine;
      var barSize = null;
      if (barNode.isBlank) {
        hasBarLine = true;
      } else {
        barSize = barNode.value;
        hasBarLine = barSize.number > 0;
      }
      var size = "auto";
      var styl = args[3];
      if (styl.type === "ordgroup") {
        if (styl.body.length > 0) {
          var textOrd = assertNodeType(styl.body[0], "textord");
          size = stylArray[Number(textOrd.text)];
        }
      } else {
        styl = assertNodeType(styl, "textord");
        size = stylArray[Number(styl.text)];
      }
      return {
        type: "genfrac",
        mode: parser.mode,
        numer,
        denom,
        continued: false,
        hasBarLine,
        barSize,
        leftDelim,
        rightDelim,
        size
      };
    },
    htmlBuilder: htmlBuilder$4,
    mathmlBuilder: mathmlBuilder$3
  });
  defineFunction({
    type: "infix",
    names: ["\\above"],
    props: {
      numArgs: 1,
      argTypes: ["size"],
      infix: true
    },
    handler(_ref5, args) {
      var {
        parser,
        funcName,
        token
      } = _ref5;
      return {
        type: "infix",
        mode: parser.mode,
        replaceWith: "\\\\abovefrac",
        size: assertNodeType(args[0], "size").value,
        token
      };
    }
  });
  defineFunction({
    type: "genfrac",
    names: ["\\\\abovefrac"],
    props: {
      numArgs: 3,
      argTypes: ["math", "size", "math"]
    },
    handler: (_ref6, args) => {
      var {
        parser,
        funcName
      } = _ref6;
      var numer = args[0];
      var barSize = assert(assertNodeType(args[1], "infix").size);
      var denom = args[2];
      var hasBarLine = barSize.number > 0;
      return {
        type: "genfrac",
        mode: parser.mode,
        numer,
        denom,
        continued: false,
        hasBarLine,
        barSize,
        leftDelim: null,
        rightDelim: null,
        size: "auto"
      };
    },
    htmlBuilder: htmlBuilder$4,
    mathmlBuilder: mathmlBuilder$3
  });
  var htmlBuilder$3 = (grp, options) => {
    var style = options.style;
    var supSubGroup;
    var group;
    if (grp.type === "supsub") {
      supSubGroup = grp.sup ? buildGroup$1(grp.sup, options.havingStyle(style.sup()), options) : buildGroup$1(grp.sub, options.havingStyle(style.sub()), options);
      group = assertNodeType(grp.base, "horizBrace");
    } else {
      group = assertNodeType(grp, "horizBrace");
    }
    var body = buildGroup$1(group.base, options.havingBaseStyle(Style$1.DISPLAY));
    var braceBody = stretchy.svgSpan(group, options);
    var vlist;
    if (group.isOver) {
      vlist = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: body
        }, {
          type: "kern",
          size: 0.1
        }, {
          type: "elem",
          elem: braceBody
        }]
      }, options);
      vlist.children[0].children[0].children[1].classes.push("svg-align");
    } else {
      vlist = buildCommon.makeVList({
        positionType: "bottom",
        positionData: body.depth + 0.1 + braceBody.height,
        children: [{
          type: "elem",
          elem: braceBody
        }, {
          type: "kern",
          size: 0.1
        }, {
          type: "elem",
          elem: body
        }]
      }, options);
      vlist.children[0].children[0].children[0].classes.push("svg-align");
    }
    if (supSubGroup) {
      var vSpan = buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
      if (group.isOver) {
        vlist = buildCommon.makeVList({
          positionType: "firstBaseline",
          children: [{
            type: "elem",
            elem: vSpan
          }, {
            type: "kern",
            size: 0.2
          }, {
            type: "elem",
            elem: supSubGroup
          }]
        }, options);
      } else {
        vlist = buildCommon.makeVList({
          positionType: "bottom",
          positionData: vSpan.depth + 0.2 + supSubGroup.height + supSubGroup.depth,
          children: [{
            type: "elem",
            elem: supSubGroup
          }, {
            type: "kern",
            size: 0.2
          }, {
            type: "elem",
            elem: vSpan
          }]
        }, options);
      }
    }
    return buildCommon.makeSpan(["mord", group.isOver ? "mover" : "munder"], [vlist], options);
  };
  var mathmlBuilder$2 = (group, options) => {
    var accentNode = stretchy.mathMLnode(group.label);
    return new mathMLTree.MathNode(group.isOver ? "mover" : "munder", [buildGroup2(group.base, options), accentNode]);
  };
  defineFunction({
    type: "horizBrace",
    names: ["\\overbrace", "\\underbrace"],
    props: {
      numArgs: 1
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      return {
        type: "horizBrace",
        mode: parser.mode,
        label: funcName,
        isOver: /^\\over/.test(funcName),
        base: args[0]
      };
    },
    htmlBuilder: htmlBuilder$3,
    mathmlBuilder: mathmlBuilder$2
  });
  defineFunction({
    type: "href",
    names: ["\\href"],
    props: {
      numArgs: 2,
      argTypes: ["url", "original"],
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        parser
      } = _ref;
      var body = args[1];
      var href = assertNodeType(args[0], "url").url;
      if (!parser.settings.isTrusted({
        command: "\\href",
        url: href
      })) {
        return parser.formatUnsupportedCmd("\\href");
      }
      return {
        type: "href",
        mode: parser.mode,
        href,
        body: ordargument(body)
      };
    },
    htmlBuilder: (group, options) => {
      var elements = buildExpression$1(group.body, options, false);
      return buildCommon.makeAnchor(group.href, [], elements, options);
    },
    mathmlBuilder: (group, options) => {
      var math2 = buildExpressionRow(group.body, options);
      if (!(math2 instanceof MathNode)) {
        math2 = new MathNode("mrow", [math2]);
      }
      math2.setAttribute("href", group.href);
      return math2;
    }
  });
  defineFunction({
    type: "href",
    names: ["\\url"],
    props: {
      numArgs: 1,
      argTypes: ["url"],
      allowedInText: true
    },
    handler: (_ref2, args) => {
      var {
        parser
      } = _ref2;
      var href = assertNodeType(args[0], "url").url;
      if (!parser.settings.isTrusted({
        command: "\\url",
        url: href
      })) {
        return parser.formatUnsupportedCmd("\\url");
      }
      var chars = [];
      for (var i2 = 0; i2 < href.length; i2++) {
        var c = href[i2];
        if (c === "~") {
          c = "\\textasciitilde";
        }
        chars.push({
          type: "textord",
          mode: "text",
          text: c
        });
      }
      var body = {
        type: "text",
        mode: parser.mode,
        font: "\\texttt",
        body: chars
      };
      return {
        type: "href",
        mode: parser.mode,
        href,
        body: ordargument(body)
      };
    }
  });
  defineFunction({
    type: "hbox",
    names: ["\\hbox"],
    props: {
      numArgs: 1,
      argTypes: ["text"],
      allowedInText: true,
      primitive: true
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      return {
        type: "hbox",
        mode: parser.mode,
        body: ordargument(args[0])
      };
    },
    htmlBuilder(group, options) {
      var elements = buildExpression$1(group.body, options, false);
      return buildCommon.makeFragment(elements);
    },
    mathmlBuilder(group, options) {
      return new mathMLTree.MathNode("mrow", buildExpression2(group.body, options));
    }
  });
  defineFunction({
    type: "html",
    names: ["\\htmlClass", "\\htmlId", "\\htmlStyle", "\\htmlData"],
    props: {
      numArgs: 2,
      argTypes: ["raw", "original"],
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName,
        token
      } = _ref;
      var value = assertNodeType(args[0], "raw").string;
      var body = args[1];
      if (parser.settings.strict) {
        parser.settings.reportNonstrict("htmlExtension", "HTML extension is disabled on strict mode");
      }
      var trustContext;
      var attributes = {};
      switch (funcName) {
        case "\\htmlClass":
          attributes.class = value;
          trustContext = {
            command: "\\htmlClass",
            class: value
          };
          break;
        case "\\htmlId":
          attributes.id = value;
          trustContext = {
            command: "\\htmlId",
            id: value
          };
          break;
        case "\\htmlStyle":
          attributes.style = value;
          trustContext = {
            command: "\\htmlStyle",
            style: value
          };
          break;
        case "\\htmlData": {
          var data = value.split(",");
          for (var i2 = 0; i2 < data.length; i2++) {
            var keyVal = data[i2].split("=");
            if (keyVal.length !== 2) {
              throw new ParseError("Error parsing key-value for \\htmlData");
            }
            attributes["data-" + keyVal[0].trim()] = keyVal[1].trim();
          }
          trustContext = {
            command: "\\htmlData",
            attributes
          };
          break;
        }
        default:
          throw new Error("Unrecognized html command");
      }
      if (!parser.settings.isTrusted(trustContext)) {
        return parser.formatUnsupportedCmd(funcName);
      }
      return {
        type: "html",
        mode: parser.mode,
        attributes,
        body: ordargument(body)
      };
    },
    htmlBuilder: (group, options) => {
      var elements = buildExpression$1(group.body, options, false);
      var classes = ["enclosing"];
      if (group.attributes.class) {
        classes.push(...group.attributes.class.trim().split(/\s+/));
      }
      var span = buildCommon.makeSpan(classes, elements, options);
      for (var attr in group.attributes) {
        if (attr !== "class" && group.attributes.hasOwnProperty(attr)) {
          span.setAttribute(attr, group.attributes[attr]);
        }
      }
      return span;
    },
    mathmlBuilder: (group, options) => {
      return buildExpressionRow(group.body, options);
    }
  });
  defineFunction({
    type: "htmlmathml",
    names: ["\\html@mathml"],
    props: {
      numArgs: 2,
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        parser
      } = _ref;
      return {
        type: "htmlmathml",
        mode: parser.mode,
        html: ordargument(args[0]),
        mathml: ordargument(args[1])
      };
    },
    htmlBuilder: (group, options) => {
      var elements = buildExpression$1(group.html, options, false);
      return buildCommon.makeFragment(elements);
    },
    mathmlBuilder: (group, options) => {
      return buildExpressionRow(group.mathml, options);
    }
  });
  var sizeData = function sizeData2(str) {
    if (/^[-+]? *(\d+(\.\d*)?|\.\d+)$/.test(str)) {
      return {
        number: +str,
        unit: "bp"
      };
    } else {
      var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(str);
      if (!match) {
        throw new ParseError("Invalid size: '" + str + "' in \\includegraphics");
      }
      var data = {
        number: +(match[1] + match[2]),
        // sign + magnitude, cast to number
        unit: match[3]
      };
      if (!validUnit(data)) {
        throw new ParseError("Invalid unit: '" + data.unit + "' in \\includegraphics.");
      }
      return data;
    }
  };
  defineFunction({
    type: "includegraphics",
    names: ["\\includegraphics"],
    props: {
      numArgs: 1,
      numOptionalArgs: 1,
      argTypes: ["raw", "url"],
      allowedInText: false
    },
    handler: (_ref, args, optArgs) => {
      var {
        parser
      } = _ref;
      var width = {
        number: 0,
        unit: "em"
      };
      var height = {
        number: 0.9,
        unit: "em"
      };
      var totalheight = {
        number: 0,
        unit: "em"
      };
      var alt = "";
      if (optArgs[0]) {
        var attributeStr = assertNodeType(optArgs[0], "raw").string;
        var attributes = attributeStr.split(",");
        for (var i2 = 0; i2 < attributes.length; i2++) {
          var keyVal = attributes[i2].split("=");
          if (keyVal.length === 2) {
            var str = keyVal[1].trim();
            switch (keyVal[0].trim()) {
              case "alt":
                alt = str;
                break;
              case "width":
                width = sizeData(str);
                break;
              case "height":
                height = sizeData(str);
                break;
              case "totalheight":
                totalheight = sizeData(str);
                break;
              default:
                throw new ParseError("Invalid key: '" + keyVal[0] + "' in \\includegraphics.");
            }
          }
        }
      }
      var src = assertNodeType(args[0], "url").url;
      if (alt === "") {
        alt = src;
        alt = alt.replace(/^.*[\\/]/, "");
        alt = alt.substring(0, alt.lastIndexOf("."));
      }
      if (!parser.settings.isTrusted({
        command: "\\includegraphics",
        url: src
      })) {
        return parser.formatUnsupportedCmd("\\includegraphics");
      }
      return {
        type: "includegraphics",
        mode: parser.mode,
        alt,
        width,
        height,
        totalheight,
        src
      };
    },
    htmlBuilder: (group, options) => {
      var height = calculateSize(group.height, options);
      var depth = 0;
      if (group.totalheight.number > 0) {
        depth = calculateSize(group.totalheight, options) - height;
      }
      var width = 0;
      if (group.width.number > 0) {
        width = calculateSize(group.width, options);
      }
      var style = {
        height: makeEm(height + depth)
      };
      if (width > 0) {
        style.width = makeEm(width);
      }
      if (depth > 0) {
        style.verticalAlign = makeEm(-depth);
      }
      var node = new Img(group.src, group.alt, style);
      node.height = height;
      node.depth = depth;
      return node;
    },
    mathmlBuilder: (group, options) => {
      var node = new mathMLTree.MathNode("mglyph", []);
      node.setAttribute("alt", group.alt);
      var height = calculateSize(group.height, options);
      var depth = 0;
      if (group.totalheight.number > 0) {
        depth = calculateSize(group.totalheight, options) - height;
        node.setAttribute("valign", makeEm(-depth));
      }
      node.setAttribute("height", makeEm(height + depth));
      if (group.width.number > 0) {
        var width = calculateSize(group.width, options);
        node.setAttribute("width", makeEm(width));
      }
      node.setAttribute("src", group.src);
      return node;
    }
  });
  defineFunction({
    type: "kern",
    names: ["\\kern", "\\mkern", "\\hskip", "\\mskip"],
    props: {
      numArgs: 1,
      argTypes: ["size"],
      primitive: true,
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      var size = assertNodeType(args[0], "size");
      if (parser.settings.strict) {
        var mathFunction = funcName[1] === "m";
        var muUnit = size.value.unit === "mu";
        if (mathFunction) {
          if (!muUnit) {
            parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " supports only mu units, " + ("not " + size.value.unit + " units"));
          }
          if (parser.mode !== "math") {
            parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " works only in math mode");
          }
        } else {
          if (muUnit) {
            parser.settings.reportNonstrict("mathVsTextUnits", "LaTeX's " + funcName + " doesn't support mu units");
          }
        }
      }
      return {
        type: "kern",
        mode: parser.mode,
        dimension: size.value
      };
    },
    htmlBuilder(group, options) {
      return buildCommon.makeGlue(group.dimension, options);
    },
    mathmlBuilder(group, options) {
      var dimension = calculateSize(group.dimension, options);
      return new mathMLTree.SpaceNode(dimension);
    }
  });
  defineFunction({
    type: "lap",
    names: ["\\mathllap", "\\mathrlap", "\\mathclap"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var body = args[0];
      return {
        type: "lap",
        mode: parser.mode,
        alignment: funcName.slice(5),
        body
      };
    },
    htmlBuilder: (group, options) => {
      var inner2;
      if (group.alignment === "clap") {
        inner2 = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]);
        inner2 = buildCommon.makeSpan(["inner"], [inner2], options);
      } else {
        inner2 = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options)]);
      }
      var fix = buildCommon.makeSpan(["fix"], []);
      var node = buildCommon.makeSpan([group.alignment], [inner2, fix], options);
      var strut = buildCommon.makeSpan(["strut"]);
      strut.style.height = makeEm(node.height + node.depth);
      if (node.depth) {
        strut.style.verticalAlign = makeEm(-node.depth);
      }
      node.children.unshift(strut);
      node = buildCommon.makeSpan(["thinbox"], [node], options);
      return buildCommon.makeSpan(["mord", "vbox"], [node], options);
    },
    mathmlBuilder: (group, options) => {
      var node = new mathMLTree.MathNode("mpadded", [buildGroup2(group.body, options)]);
      if (group.alignment !== "rlap") {
        var offset = group.alignment === "llap" ? "-1" : "-0.5";
        node.setAttribute("lspace", offset + "width");
      }
      node.setAttribute("width", "0px");
      return node;
    }
  });
  defineFunction({
    type: "styling",
    names: ["\\(", "$"],
    props: {
      numArgs: 0,
      allowedInText: true,
      allowedInMath: false
    },
    handler(_ref, args) {
      var {
        funcName,
        parser
      } = _ref;
      var outerMode = parser.mode;
      parser.switchMode("math");
      var close2 = funcName === "\\(" ? "\\)" : "$";
      var body = parser.parseExpression(false, close2);
      parser.expect(close2);
      parser.switchMode(outerMode);
      return {
        type: "styling",
        mode: parser.mode,
        style: "text",
        body
      };
    }
  });
  defineFunction({
    type: "text",
    // Doesn't matter what this is.
    names: ["\\)", "\\]"],
    props: {
      numArgs: 0,
      allowedInText: true,
      allowedInMath: false
    },
    handler(context, args) {
      throw new ParseError("Mismatched " + context.funcName);
    }
  });
  var chooseMathStyle = (group, options) => {
    switch (options.style.size) {
      case Style$1.DISPLAY.size:
        return group.display;
      case Style$1.TEXT.size:
        return group.text;
      case Style$1.SCRIPT.size:
        return group.script;
      case Style$1.SCRIPTSCRIPT.size:
        return group.scriptscript;
      default:
        return group.text;
    }
  };
  defineFunction({
    type: "mathchoice",
    names: ["\\mathchoice"],
    props: {
      numArgs: 4,
      primitive: true
    },
    handler: (_ref, args) => {
      var {
        parser
      } = _ref;
      return {
        type: "mathchoice",
        mode: parser.mode,
        display: ordargument(args[0]),
        text: ordargument(args[1]),
        script: ordargument(args[2]),
        scriptscript: ordargument(args[3])
      };
    },
    htmlBuilder: (group, options) => {
      var body = chooseMathStyle(group, options);
      var elements = buildExpression$1(body, options, false);
      return buildCommon.makeFragment(elements);
    },
    mathmlBuilder: (group, options) => {
      var body = chooseMathStyle(group, options);
      return buildExpressionRow(body, options);
    }
  });
  var assembleSupSub = (base, supGroup, subGroup, options, style, slant, baseShift) => {
    base = buildCommon.makeSpan([], [base]);
    var subIsSingleCharacter = subGroup && utils.isCharacterBox(subGroup);
    var sub2;
    var sup2;
    if (supGroup) {
      var elem = buildGroup$1(supGroup, options.havingStyle(style.sup()), options);
      sup2 = {
        elem,
        kern: Math.max(options.fontMetrics().bigOpSpacing1, options.fontMetrics().bigOpSpacing3 - elem.depth)
      };
    }
    if (subGroup) {
      var _elem = buildGroup$1(subGroup, options.havingStyle(style.sub()), options);
      sub2 = {
        elem: _elem,
        kern: Math.max(options.fontMetrics().bigOpSpacing2, options.fontMetrics().bigOpSpacing4 - _elem.height)
      };
    }
    var finalGroup;
    if (sup2 && sub2) {
      var bottom = options.fontMetrics().bigOpSpacing5 + sub2.elem.height + sub2.elem.depth + sub2.kern + base.depth + baseShift;
      finalGroup = buildCommon.makeVList({
        positionType: "bottom",
        positionData: bottom,
        children: [{
          type: "kern",
          size: options.fontMetrics().bigOpSpacing5
        }, {
          type: "elem",
          elem: sub2.elem,
          marginLeft: makeEm(-slant)
        }, {
          type: "kern",
          size: sub2.kern
        }, {
          type: "elem",
          elem: base
        }, {
          type: "kern",
          size: sup2.kern
        }, {
          type: "elem",
          elem: sup2.elem,
          marginLeft: makeEm(slant)
        }, {
          type: "kern",
          size: options.fontMetrics().bigOpSpacing5
        }]
      }, options);
    } else if (sub2) {
      var top = base.height - baseShift;
      finalGroup = buildCommon.makeVList({
        positionType: "top",
        positionData: top,
        children: [{
          type: "kern",
          size: options.fontMetrics().bigOpSpacing5
        }, {
          type: "elem",
          elem: sub2.elem,
          marginLeft: makeEm(-slant)
        }, {
          type: "kern",
          size: sub2.kern
        }, {
          type: "elem",
          elem: base
        }]
      }, options);
    } else if (sup2) {
      var _bottom = base.depth + baseShift;
      finalGroup = buildCommon.makeVList({
        positionType: "bottom",
        positionData: _bottom,
        children: [{
          type: "elem",
          elem: base
        }, {
          type: "kern",
          size: sup2.kern
        }, {
          type: "elem",
          elem: sup2.elem,
          marginLeft: makeEm(slant)
        }, {
          type: "kern",
          size: options.fontMetrics().bigOpSpacing5
        }]
      }, options);
    } else {
      return base;
    }
    var parts = [finalGroup];
    if (sub2 && slant !== 0 && !subIsSingleCharacter) {
      var spacer = buildCommon.makeSpan(["mspace"], [], options);
      spacer.style.marginRight = makeEm(slant);
      parts.unshift(spacer);
    }
    return buildCommon.makeSpan(["mop", "op-limits"], parts, options);
  };
  var noSuccessor = ["\\smallint"];
  var htmlBuilder$2 = (grp, options) => {
    var supGroup;
    var subGroup;
    var hasLimits = false;
    var group;
    if (grp.type === "supsub") {
      supGroup = grp.sup;
      subGroup = grp.sub;
      group = assertNodeType(grp.base, "op");
      hasLimits = true;
    } else {
      group = assertNodeType(grp, "op");
    }
    var style = options.style;
    var large = false;
    if (style.size === Style$1.DISPLAY.size && group.symbol && !noSuccessor.includes(group.name)) {
      large = true;
    }
    var base;
    if (group.symbol) {
      var fontName = large ? "Size2-Regular" : "Size1-Regular";
      var stash = "";
      if (group.name === "\\oiint" || group.name === "\\oiiint") {
        stash = group.name.slice(1);
        group.name = stash === "oiint" ? "\\iint" : "\\iiint";
      }
      base = buildCommon.makeSymbol(group.name, fontName, "math", options, ["mop", "op-symbol", large ? "large-op" : "small-op"]);
      if (stash.length > 0) {
        var italic = base.italic;
        var oval = buildCommon.staticSvg(stash + "Size" + (large ? "2" : "1"), options);
        base = buildCommon.makeVList({
          positionType: "individualShift",
          children: [{
            type: "elem",
            elem: base,
            shift: 0
          }, {
            type: "elem",
            elem: oval,
            shift: large ? 0.08 : 0
          }]
        }, options);
        group.name = "\\" + stash;
        base.classes.unshift("mop");
        base.italic = italic;
      }
    } else if (group.body) {
      var inner2 = buildExpression$1(group.body, options, true);
      if (inner2.length === 1 && inner2[0] instanceof SymbolNode) {
        base = inner2[0];
        base.classes[0] = "mop";
      } else {
        base = buildCommon.makeSpan(["mop"], inner2, options);
      }
    } else {
      var output = [];
      for (var i2 = 1; i2 < group.name.length; i2++) {
        output.push(buildCommon.mathsym(group.name[i2], group.mode, options));
      }
      base = buildCommon.makeSpan(["mop"], output, options);
    }
    var baseShift = 0;
    var slant = 0;
    if ((base instanceof SymbolNode || group.name === "\\oiint" || group.name === "\\oiiint") && !group.suppressBaseShift) {
      baseShift = (base.height - base.depth) / 2 - options.fontMetrics().axisHeight;
      slant = base.italic;
    }
    if (hasLimits) {
      return assembleSupSub(base, supGroup, subGroup, options, style, slant, baseShift);
    } else {
      if (baseShift) {
        base.style.position = "relative";
        base.style.top = makeEm(baseShift);
      }
      return base;
    }
  };
  var mathmlBuilder$1 = (group, options) => {
    var node;
    if (group.symbol) {
      node = new MathNode("mo", [makeText(group.name, group.mode)]);
      if (noSuccessor.includes(group.name)) {
        node.setAttribute("largeop", "false");
      }
    } else if (group.body) {
      node = new MathNode("mo", buildExpression2(group.body, options));
    } else {
      node = new MathNode("mi", [new TextNode(group.name.slice(1))]);
      var operator = new MathNode("mo", [makeText("\u2061", "text")]);
      if (group.parentIsSupSub) {
        node = new MathNode("mrow", [node, operator]);
      } else {
        node = newDocumentFragment([node, operator]);
      }
    }
    return node;
  };
  var singleCharBigOps = {
    "\u220F": "\\prod",
    "\u2210": "\\coprod",
    "\u2211": "\\sum",
    "\u22C0": "\\bigwedge",
    "\u22C1": "\\bigvee",
    "\u22C2": "\\bigcap",
    "\u22C3": "\\bigcup",
    "\u2A00": "\\bigodot",
    "\u2A01": "\\bigoplus",
    "\u2A02": "\\bigotimes",
    "\u2A04": "\\biguplus",
    "\u2A06": "\\bigsqcup"
  };
  defineFunction({
    type: "op",
    names: ["\\coprod", "\\bigvee", "\\bigwedge", "\\biguplus", "\\bigcap", "\\bigcup", "\\intop", "\\prod", "\\sum", "\\bigotimes", "\\bigoplus", "\\bigodot", "\\bigsqcup", "\\smallint", "\u220F", "\u2210", "\u2211", "\u22C0", "\u22C1", "\u22C2", "\u22C3", "\u2A00", "\u2A01", "\u2A02", "\u2A04", "\u2A06"],
    props: {
      numArgs: 0
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var fName = funcName;
      if (fName.length === 1) {
        fName = singleCharBigOps[fName];
      }
      return {
        type: "op",
        mode: parser.mode,
        limits: true,
        parentIsSupSub: false,
        symbol: true,
        name: fName
      };
    },
    htmlBuilder: htmlBuilder$2,
    mathmlBuilder: mathmlBuilder$1
  });
  defineFunction({
    type: "op",
    names: ["\\mathop"],
    props: {
      numArgs: 1,
      primitive: true
    },
    handler: (_ref2, args) => {
      var {
        parser
      } = _ref2;
      var body = args[0];
      return {
        type: "op",
        mode: parser.mode,
        limits: false,
        parentIsSupSub: false,
        symbol: false,
        body: ordargument(body)
      };
    },
    htmlBuilder: htmlBuilder$2,
    mathmlBuilder: mathmlBuilder$1
  });
  var singleCharIntegrals = {
    "\u222B": "\\int",
    "\u222C": "\\iint",
    "\u222D": "\\iiint",
    "\u222E": "\\oint",
    "\u222F": "\\oiint",
    "\u2230": "\\oiiint"
  };
  defineFunction({
    type: "op",
    names: ["\\arcsin", "\\arccos", "\\arctan", "\\arctg", "\\arcctg", "\\arg", "\\ch", "\\cos", "\\cosec", "\\cosh", "\\cot", "\\cotg", "\\coth", "\\csc", "\\ctg", "\\cth", "\\deg", "\\dim", "\\exp", "\\hom", "\\ker", "\\lg", "\\ln", "\\log", "\\sec", "\\sin", "\\sinh", "\\sh", "\\tan", "\\tanh", "\\tg", "\\th"],
    props: {
      numArgs: 0
    },
    handler(_ref3) {
      var {
        parser,
        funcName
      } = _ref3;
      return {
        type: "op",
        mode: parser.mode,
        limits: false,
        parentIsSupSub: false,
        symbol: false,
        name: funcName
      };
    },
    htmlBuilder: htmlBuilder$2,
    mathmlBuilder: mathmlBuilder$1
  });
  defineFunction({
    type: "op",
    names: ["\\det", "\\gcd", "\\inf", "\\lim", "\\max", "\\min", "\\Pr", "\\sup"],
    props: {
      numArgs: 0
    },
    handler(_ref4) {
      var {
        parser,
        funcName
      } = _ref4;
      return {
        type: "op",
        mode: parser.mode,
        limits: true,
        parentIsSupSub: false,
        symbol: false,
        name: funcName
      };
    },
    htmlBuilder: htmlBuilder$2,
    mathmlBuilder: mathmlBuilder$1
  });
  defineFunction({
    type: "op",
    names: ["\\int", "\\iint", "\\iiint", "\\oint", "\\oiint", "\\oiiint", "\u222B", "\u222C", "\u222D", "\u222E", "\u222F", "\u2230"],
    props: {
      numArgs: 0
    },
    handler(_ref5) {
      var {
        parser,
        funcName
      } = _ref5;
      var fName = funcName;
      if (fName.length === 1) {
        fName = singleCharIntegrals[fName];
      }
      return {
        type: "op",
        mode: parser.mode,
        limits: false,
        parentIsSupSub: false,
        symbol: true,
        name: fName
      };
    },
    htmlBuilder: htmlBuilder$2,
    mathmlBuilder: mathmlBuilder$1
  });
  var htmlBuilder$1 = (grp, options) => {
    var supGroup;
    var subGroup;
    var hasLimits = false;
    var group;
    if (grp.type === "supsub") {
      supGroup = grp.sup;
      subGroup = grp.sub;
      group = assertNodeType(grp.base, "operatorname");
      hasLimits = true;
    } else {
      group = assertNodeType(grp, "operatorname");
    }
    var base;
    if (group.body.length > 0) {
      var body = group.body.map((child2) => {
        var childText = child2.text;
        if (typeof childText === "string") {
          return {
            type: "textord",
            mode: child2.mode,
            text: childText
          };
        } else {
          return child2;
        }
      });
      var expression = buildExpression$1(body, options.withFont("mathrm"), true);
      for (var i2 = 0; i2 < expression.length; i2++) {
        var child = expression[i2];
        if (child instanceof SymbolNode) {
          child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
        }
      }
      base = buildCommon.makeSpan(["mop"], expression, options);
    } else {
      base = buildCommon.makeSpan(["mop"], [], options);
    }
    if (hasLimits) {
      return assembleSupSub(base, supGroup, subGroup, options, options.style, 0, 0);
    } else {
      return base;
    }
  };
  var mathmlBuilder2 = (group, options) => {
    var expression = buildExpression2(group.body, options.withFont("mathrm"));
    var isAllString = true;
    for (var i2 = 0; i2 < expression.length; i2++) {
      var node = expression[i2];
      if (node instanceof mathMLTree.SpaceNode) ;
      else if (node instanceof mathMLTree.MathNode) {
        switch (node.type) {
          case "mi":
          case "mn":
          case "ms":
          case "mspace":
          case "mtext":
            break;
          // Do nothing yet.
          case "mo": {
            var child = node.children[0];
            if (node.children.length === 1 && child instanceof mathMLTree.TextNode) {
              child.text = child.text.replace(/\u2212/, "-").replace(/\u2217/, "*");
            } else {
              isAllString = false;
            }
            break;
          }
          default:
            isAllString = false;
        }
      } else {
        isAllString = false;
      }
    }
    if (isAllString) {
      var word = expression.map((node2) => node2.toText()).join("");
      expression = [new mathMLTree.TextNode(word)];
    }
    var identifier = new mathMLTree.MathNode("mi", expression);
    identifier.setAttribute("mathvariant", "normal");
    var operator = new mathMLTree.MathNode("mo", [makeText("\u2061", "text")]);
    if (group.parentIsSupSub) {
      return new mathMLTree.MathNode("mrow", [identifier, operator]);
    } else {
      return mathMLTree.newDocumentFragment([identifier, operator]);
    }
  };
  defineFunction({
    type: "operatorname",
    names: ["\\operatorname@", "\\operatornamewithlimits"],
    props: {
      numArgs: 1
    },
    handler: (_ref, args) => {
      var {
        parser,
        funcName
      } = _ref;
      var body = args[0];
      return {
        type: "operatorname",
        mode: parser.mode,
        body: ordargument(body),
        alwaysHandleSupSub: funcName === "\\operatornamewithlimits",
        limits: false,
        parentIsSupSub: false
      };
    },
    htmlBuilder: htmlBuilder$1,
    mathmlBuilder: mathmlBuilder2
  });
  defineMacro("\\operatorname", "\\@ifstar\\operatornamewithlimits\\operatorname@");
  defineFunctionBuilders({
    type: "ordgroup",
    htmlBuilder(group, options) {
      if (group.semisimple) {
        return buildCommon.makeFragment(buildExpression$1(group.body, options, false));
      }
      return buildCommon.makeSpan(["mord"], buildExpression$1(group.body, options, true), options);
    },
    mathmlBuilder(group, options) {
      return buildExpressionRow(group.body, options, true);
    }
  });
  defineFunction({
    type: "overline",
    names: ["\\overline"],
    props: {
      numArgs: 1
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      var body = args[0];
      return {
        type: "overline",
        mode: parser.mode,
        body
      };
    },
    htmlBuilder(group, options) {
      var innerGroup = buildGroup$1(group.body, options.havingCrampedStyle());
      var line = buildCommon.makeLineSpan("overline-line", options);
      var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
      var vlist = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: innerGroup
        }, {
          type: "kern",
          size: 3 * defaultRuleThickness
        }, {
          type: "elem",
          elem: line
        }, {
          type: "kern",
          size: defaultRuleThickness
        }]
      }, options);
      return buildCommon.makeSpan(["mord", "overline"], [vlist], options);
    },
    mathmlBuilder(group, options) {
      var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
      operator.setAttribute("stretchy", "true");
      var node = new mathMLTree.MathNode("mover", [buildGroup2(group.body, options), operator]);
      node.setAttribute("accent", "true");
      return node;
    }
  });
  defineFunction({
    type: "phantom",
    names: ["\\phantom"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        parser
      } = _ref;
      var body = args[0];
      return {
        type: "phantom",
        mode: parser.mode,
        body: ordargument(body)
      };
    },
    htmlBuilder: (group, options) => {
      var elements = buildExpression$1(group.body, options.withPhantom(), false);
      return buildCommon.makeFragment(elements);
    },
    mathmlBuilder: (group, options) => {
      var inner2 = buildExpression2(group.body, options);
      return new mathMLTree.MathNode("mphantom", inner2);
    }
  });
  defineFunction({
    type: "hphantom",
    names: ["\\hphantom"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler: (_ref2, args) => {
      var {
        parser
      } = _ref2;
      var body = args[0];
      return {
        type: "hphantom",
        mode: parser.mode,
        body
      };
    },
    htmlBuilder: (group, options) => {
      var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options.withPhantom())]);
      node.height = 0;
      node.depth = 0;
      if (node.children) {
        for (var i2 = 0; i2 < node.children.length; i2++) {
          node.children[i2].height = 0;
          node.children[i2].depth = 0;
        }
      }
      node = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: node
        }]
      }, options);
      return buildCommon.makeSpan(["mord"], [node], options);
    },
    mathmlBuilder: (group, options) => {
      var inner2 = buildExpression2(ordargument(group.body), options);
      var phantom = new mathMLTree.MathNode("mphantom", inner2);
      var node = new mathMLTree.MathNode("mpadded", [phantom]);
      node.setAttribute("height", "0px");
      node.setAttribute("depth", "0px");
      return node;
    }
  });
  defineFunction({
    type: "vphantom",
    names: ["\\vphantom"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler: (_ref3, args) => {
      var {
        parser
      } = _ref3;
      var body = args[0];
      return {
        type: "vphantom",
        mode: parser.mode,
        body
      };
    },
    htmlBuilder: (group, options) => {
      var inner2 = buildCommon.makeSpan(["inner"], [buildGroup$1(group.body, options.withPhantom())]);
      var fix = buildCommon.makeSpan(["fix"], []);
      return buildCommon.makeSpan(["mord", "rlap"], [inner2, fix], options);
    },
    mathmlBuilder: (group, options) => {
      var inner2 = buildExpression2(ordargument(group.body), options);
      var phantom = new mathMLTree.MathNode("mphantom", inner2);
      var node = new mathMLTree.MathNode("mpadded", [phantom]);
      node.setAttribute("width", "0px");
      return node;
    }
  });
  defineFunction({
    type: "raisebox",
    names: ["\\raisebox"],
    props: {
      numArgs: 2,
      argTypes: ["size", "hbox"],
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      var amount = assertNodeType(args[0], "size").value;
      var body = args[1];
      return {
        type: "raisebox",
        mode: parser.mode,
        dy: amount,
        body
      };
    },
    htmlBuilder(group, options) {
      var body = buildGroup$1(group.body, options);
      var dy = calculateSize(group.dy, options);
      return buildCommon.makeVList({
        positionType: "shift",
        positionData: -dy,
        children: [{
          type: "elem",
          elem: body
        }]
      }, options);
    },
    mathmlBuilder(group, options) {
      var node = new mathMLTree.MathNode("mpadded", [buildGroup2(group.body, options)]);
      var dy = group.dy.number + group.dy.unit;
      node.setAttribute("voffset", dy);
      return node;
    }
  });
  defineFunction({
    type: "internal",
    names: ["\\relax"],
    props: {
      numArgs: 0,
      allowedInText: true,
      allowedInArgument: true
    },
    handler(_ref) {
      var {
        parser
      } = _ref;
      return {
        type: "internal",
        mode: parser.mode
      };
    }
  });
  defineFunction({
    type: "rule",
    names: ["\\rule"],
    props: {
      numArgs: 2,
      numOptionalArgs: 1,
      allowedInText: true,
      allowedInMath: true,
      argTypes: ["size", "size", "size"]
    },
    handler(_ref, args, optArgs) {
      var {
        parser
      } = _ref;
      var shift = optArgs[0];
      var width = assertNodeType(args[0], "size");
      var height = assertNodeType(args[1], "size");
      return {
        type: "rule",
        mode: parser.mode,
        shift: shift && assertNodeType(shift, "size").value,
        width: width.value,
        height: height.value
      };
    },
    htmlBuilder(group, options) {
      var rule = buildCommon.makeSpan(["mord", "rule"], [], options);
      var width = calculateSize(group.width, options);
      var height = calculateSize(group.height, options);
      var shift = group.shift ? calculateSize(group.shift, options) : 0;
      rule.style.borderRightWidth = makeEm(width);
      rule.style.borderTopWidth = makeEm(height);
      rule.style.bottom = makeEm(shift);
      rule.width = width;
      rule.height = height + shift;
      rule.depth = -shift;
      rule.maxFontSize = height * 1.125 * options.sizeMultiplier;
      return rule;
    },
    mathmlBuilder(group, options) {
      var width = calculateSize(group.width, options);
      var height = calculateSize(group.height, options);
      var shift = group.shift ? calculateSize(group.shift, options) : 0;
      var color = options.color && options.getColor() || "black";
      var rule = new mathMLTree.MathNode("mspace");
      rule.setAttribute("mathbackground", color);
      rule.setAttribute("width", makeEm(width));
      rule.setAttribute("height", makeEm(height));
      var wrapper = new mathMLTree.MathNode("mpadded", [rule]);
      if (shift >= 0) {
        wrapper.setAttribute("height", makeEm(shift));
      } else {
        wrapper.setAttribute("height", makeEm(shift));
        wrapper.setAttribute("depth", makeEm(-shift));
      }
      wrapper.setAttribute("voffset", makeEm(shift));
      return wrapper;
    }
  });
  function sizingGroup(value, options, baseOptions) {
    var inner2 = buildExpression$1(value, options, false);
    var multiplier = options.sizeMultiplier / baseOptions.sizeMultiplier;
    for (var i2 = 0; i2 < inner2.length; i2++) {
      var pos = inner2[i2].classes.indexOf("sizing");
      if (pos < 0) {
        Array.prototype.push.apply(inner2[i2].classes, options.sizingClasses(baseOptions));
      } else if (inner2[i2].classes[pos + 1] === "reset-size" + options.size) {
        inner2[i2].classes[pos + 1] = "reset-size" + baseOptions.size;
      }
      inner2[i2].height *= multiplier;
      inner2[i2].depth *= multiplier;
    }
    return buildCommon.makeFragment(inner2);
  }
  var sizeFuncs = ["\\tiny", "\\sixptsize", "\\scriptsize", "\\footnotesize", "\\small", "\\normalsize", "\\large", "\\Large", "\\LARGE", "\\huge", "\\Huge"];
  var htmlBuilder2 = (group, options) => {
    var newOptions = options.havingSize(group.size);
    return sizingGroup(group.body, newOptions, options);
  };
  defineFunction({
    type: "sizing",
    names: sizeFuncs,
    props: {
      numArgs: 0,
      allowedInText: true
    },
    handler: (_ref, args) => {
      var {
        breakOnTokenText,
        funcName,
        parser
      } = _ref;
      var body = parser.parseExpression(false, breakOnTokenText);
      return {
        type: "sizing",
        mode: parser.mode,
        // Figure out what size to use based on the list of functions above
        size: sizeFuncs.indexOf(funcName) + 1,
        body
      };
    },
    htmlBuilder: htmlBuilder2,
    mathmlBuilder: (group, options) => {
      var newOptions = options.havingSize(group.size);
      var inner2 = buildExpression2(group.body, newOptions);
      var node = new mathMLTree.MathNode("mstyle", inner2);
      node.setAttribute("mathsize", makeEm(newOptions.sizeMultiplier));
      return node;
    }
  });
  defineFunction({
    type: "smash",
    names: ["\\smash"],
    props: {
      numArgs: 1,
      numOptionalArgs: 1,
      allowedInText: true
    },
    handler: (_ref, args, optArgs) => {
      var {
        parser
      } = _ref;
      var smashHeight = false;
      var smashDepth = false;
      var tbArg = optArgs[0] && assertNodeType(optArgs[0], "ordgroup");
      if (tbArg) {
        var letter = "";
        for (var i2 = 0; i2 < tbArg.body.length; ++i2) {
          var node = tbArg.body[i2];
          letter = node.text;
          if (letter === "t") {
            smashHeight = true;
          } else if (letter === "b") {
            smashDepth = true;
          } else {
            smashHeight = false;
            smashDepth = false;
            break;
          }
        }
      } else {
        smashHeight = true;
        smashDepth = true;
      }
      var body = args[0];
      return {
        type: "smash",
        mode: parser.mode,
        body,
        smashHeight,
        smashDepth
      };
    },
    htmlBuilder: (group, options) => {
      var node = buildCommon.makeSpan([], [buildGroup$1(group.body, options)]);
      if (!group.smashHeight && !group.smashDepth) {
        return node;
      }
      if (group.smashHeight) {
        node.height = 0;
        if (node.children) {
          for (var i2 = 0; i2 < node.children.length; i2++) {
            node.children[i2].height = 0;
          }
        }
      }
      if (group.smashDepth) {
        node.depth = 0;
        if (node.children) {
          for (var _i6 = 0; _i6 < node.children.length; _i6++) {
            node.children[_i6].depth = 0;
          }
        }
      }
      var smashedNode = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: node
        }]
      }, options);
      return buildCommon.makeSpan(["mord"], [smashedNode], options);
    },
    mathmlBuilder: (group, options) => {
      var node = new mathMLTree.MathNode("mpadded", [buildGroup2(group.body, options)]);
      if (group.smashHeight) {
        node.setAttribute("height", "0px");
      }
      if (group.smashDepth) {
        node.setAttribute("depth", "0px");
      }
      return node;
    }
  });
  defineFunction({
    type: "sqrt",
    names: ["\\sqrt"],
    props: {
      numArgs: 1,
      numOptionalArgs: 1
    },
    handler(_ref, args, optArgs) {
      var {
        parser
      } = _ref;
      var index = optArgs[0];
      var body = args[0];
      return {
        type: "sqrt",
        mode: parser.mode,
        body,
        index
      };
    },
    htmlBuilder(group, options) {
      var inner2 = buildGroup$1(group.body, options.havingCrampedStyle());
      if (inner2.height === 0) {
        inner2.height = options.fontMetrics().xHeight;
      }
      inner2 = buildCommon.wrapFragment(inner2, options);
      var metrics = options.fontMetrics();
      var theta = metrics.defaultRuleThickness;
      var phi = theta;
      if (options.style.id < Style$1.TEXT.id) {
        phi = options.fontMetrics().xHeight;
      }
      var lineClearance = theta + phi / 4;
      var minDelimiterHeight = inner2.height + inner2.depth + lineClearance + theta;
      var {
        span: img,
        ruleWidth,
        advanceWidth
      } = delimiter.sqrtImage(minDelimiterHeight, options);
      var delimDepth = img.height - ruleWidth;
      if (delimDepth > inner2.height + inner2.depth + lineClearance) {
        lineClearance = (lineClearance + delimDepth - inner2.height - inner2.depth) / 2;
      }
      var imgShift = img.height - inner2.height - lineClearance - ruleWidth;
      inner2.style.paddingLeft = makeEm(advanceWidth);
      var body = buildCommon.makeVList({
        positionType: "firstBaseline",
        children: [{
          type: "elem",
          elem: inner2,
          wrapperClasses: ["svg-align"]
        }, {
          type: "kern",
          size: -(inner2.height + imgShift)
        }, {
          type: "elem",
          elem: img
        }, {
          type: "kern",
          size: ruleWidth
        }]
      }, options);
      if (!group.index) {
        return buildCommon.makeSpan(["mord", "sqrt"], [body], options);
      } else {
        var newOptions = options.havingStyle(Style$1.SCRIPTSCRIPT);
        var rootm = buildGroup$1(group.index, newOptions, options);
        var toShift = 0.6 * (body.height - body.depth);
        var rootVList = buildCommon.makeVList({
          positionType: "shift",
          positionData: -toShift,
          children: [{
            type: "elem",
            elem: rootm
          }]
        }, options);
        var rootVListWrap = buildCommon.makeSpan(["root"], [rootVList]);
        return buildCommon.makeSpan(["mord", "sqrt"], [rootVListWrap, body], options);
      }
    },
    mathmlBuilder(group, options) {
      var {
        body,
        index
      } = group;
      return index ? new mathMLTree.MathNode("mroot", [buildGroup2(body, options), buildGroup2(index, options)]) : new mathMLTree.MathNode("msqrt", [buildGroup2(body, options)]);
    }
  });
  var styleMap = {
    "display": Style$1.DISPLAY,
    "text": Style$1.TEXT,
    "script": Style$1.SCRIPT,
    "scriptscript": Style$1.SCRIPTSCRIPT
  };
  defineFunction({
    type: "styling",
    names: ["\\displaystyle", "\\textstyle", "\\scriptstyle", "\\scriptscriptstyle"],
    props: {
      numArgs: 0,
      allowedInText: true,
      primitive: true
    },
    handler(_ref, args) {
      var {
        breakOnTokenText,
        funcName,
        parser
      } = _ref;
      var body = parser.parseExpression(true, breakOnTokenText);
      var style = funcName.slice(1, funcName.length - 5);
      return {
        type: "styling",
        mode: parser.mode,
        // Figure out what style to use by pulling out the style from
        // the function name
        style,
        body
      };
    },
    htmlBuilder(group, options) {
      var newStyle = styleMap[group.style];
      var newOptions = options.havingStyle(newStyle).withFont("");
      return sizingGroup(group.body, newOptions, options);
    },
    mathmlBuilder(group, options) {
      var newStyle = styleMap[group.style];
      var newOptions = options.havingStyle(newStyle);
      var inner2 = buildExpression2(group.body, newOptions);
      var node = new mathMLTree.MathNode("mstyle", inner2);
      var styleAttributes = {
        "display": ["0", "true"],
        "text": ["0", "false"],
        "script": ["1", "false"],
        "scriptscript": ["2", "false"]
      };
      var attr = styleAttributes[group.style];
      node.setAttribute("scriptlevel", attr[0]);
      node.setAttribute("displaystyle", attr[1]);
      return node;
    }
  });
  var htmlBuilderDelegate = function htmlBuilderDelegate2(group, options) {
    var base = group.base;
    if (!base) {
      return null;
    } else if (base.type === "op") {
      var delegate = base.limits && (options.style.size === Style$1.DISPLAY.size || base.alwaysHandleSupSub);
      return delegate ? htmlBuilder$2 : null;
    } else if (base.type === "operatorname") {
      var _delegate = base.alwaysHandleSupSub && (options.style.size === Style$1.DISPLAY.size || base.limits);
      return _delegate ? htmlBuilder$1 : null;
    } else if (base.type === "accent") {
      return utils.isCharacterBox(base.base) ? htmlBuilder$a : null;
    } else if (base.type === "horizBrace") {
      var isSup = !group.sub;
      return isSup === base.isOver ? htmlBuilder$3 : null;
    } else {
      return null;
    }
  };
  defineFunctionBuilders({
    type: "supsub",
    htmlBuilder(group, options) {
      var builderDelegate = htmlBuilderDelegate(group, options);
      if (builderDelegate) {
        return builderDelegate(group, options);
      }
      var {
        base: valueBase,
        sup: valueSup,
        sub: valueSub
      } = group;
      var base = buildGroup$1(valueBase, options);
      var supm;
      var subm;
      var metrics = options.fontMetrics();
      var supShift = 0;
      var subShift = 0;
      var isCharacterBox3 = valueBase && utils.isCharacterBox(valueBase);
      if (valueSup) {
        var newOptions = options.havingStyle(options.style.sup());
        supm = buildGroup$1(valueSup, newOptions, options);
        if (!isCharacterBox3) {
          supShift = base.height - newOptions.fontMetrics().supDrop * newOptions.sizeMultiplier / options.sizeMultiplier;
        }
      }
      if (valueSub) {
        var _newOptions = options.havingStyle(options.style.sub());
        subm = buildGroup$1(valueSub, _newOptions, options);
        if (!isCharacterBox3) {
          subShift = base.depth + _newOptions.fontMetrics().subDrop * _newOptions.sizeMultiplier / options.sizeMultiplier;
        }
      }
      var minSupShift;
      if (options.style === Style$1.DISPLAY) {
        minSupShift = metrics.sup1;
      } else if (options.style.cramped) {
        minSupShift = metrics.sup3;
      } else {
        minSupShift = metrics.sup2;
      }
      var multiplier = options.sizeMultiplier;
      var marginRight = makeEm(0.5 / metrics.ptPerEm / multiplier);
      var marginLeft = null;
      if (subm) {
        var isOiint = group.base && group.base.type === "op" && group.base.name && (group.base.name === "\\oiint" || group.base.name === "\\oiiint");
        if (base instanceof SymbolNode || isOiint) {
          marginLeft = makeEm(-base.italic);
        }
      }
      var supsub;
      if (supm && subm) {
        supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
        subShift = Math.max(subShift, metrics.sub2);
        var ruleWidth = metrics.defaultRuleThickness;
        var maxWidth = 4 * ruleWidth;
        if (supShift - supm.depth - (subm.height - subShift) < maxWidth) {
          subShift = maxWidth - (supShift - supm.depth) + subm.height;
          var psi = 0.8 * metrics.xHeight - (supShift - supm.depth);
          if (psi > 0) {
            supShift += psi;
            subShift -= psi;
          }
        }
        var vlistElem = [{
          type: "elem",
          elem: subm,
          shift: subShift,
          marginRight,
          marginLeft
        }, {
          type: "elem",
          elem: supm,
          shift: -supShift,
          marginRight
        }];
        supsub = buildCommon.makeVList({
          positionType: "individualShift",
          children: vlistElem
        }, options);
      } else if (subm) {
        subShift = Math.max(subShift, metrics.sub1, subm.height - 0.8 * metrics.xHeight);
        var _vlistElem = [{
          type: "elem",
          elem: subm,
          marginLeft,
          marginRight
        }];
        supsub = buildCommon.makeVList({
          positionType: "shift",
          positionData: subShift,
          children: _vlistElem
        }, options);
      } else if (supm) {
        supShift = Math.max(supShift, minSupShift, supm.depth + 0.25 * metrics.xHeight);
        supsub = buildCommon.makeVList({
          positionType: "shift",
          positionData: -supShift,
          children: [{
            type: "elem",
            elem: supm,
            marginRight
          }]
        }, options);
      } else {
        throw new Error("supsub must have either sup or sub.");
      }
      var mclass = getTypeOfDomTree(base, "right") || "mord";
      return buildCommon.makeSpan([mclass], [base, buildCommon.makeSpan(["msupsub"], [supsub])], options);
    },
    mathmlBuilder(group, options) {
      var isBrace = false;
      var isOver;
      var isSup;
      if (group.base && group.base.type === "horizBrace") {
        isSup = !!group.sup;
        if (isSup === group.base.isOver) {
          isBrace = true;
          isOver = group.base.isOver;
        }
      }
      if (group.base && (group.base.type === "op" || group.base.type === "operatorname")) {
        group.base.parentIsSupSub = true;
      }
      var children = [buildGroup2(group.base, options)];
      if (group.sub) {
        children.push(buildGroup2(group.sub, options));
      }
      if (group.sup) {
        children.push(buildGroup2(group.sup, options));
      }
      var nodeType;
      if (isBrace) {
        nodeType = isOver ? "mover" : "munder";
      } else if (!group.sub) {
        var base = group.base;
        if (base && base.type === "op" && base.limits && (options.style === Style$1.DISPLAY || base.alwaysHandleSupSub)) {
          nodeType = "mover";
        } else if (base && base.type === "operatorname" && base.alwaysHandleSupSub && (base.limits || options.style === Style$1.DISPLAY)) {
          nodeType = "mover";
        } else {
          nodeType = "msup";
        }
      } else if (!group.sup) {
        var _base = group.base;
        if (_base && _base.type === "op" && _base.limits && (options.style === Style$1.DISPLAY || _base.alwaysHandleSupSub)) {
          nodeType = "munder";
        } else if (_base && _base.type === "operatorname" && _base.alwaysHandleSupSub && (_base.limits || options.style === Style$1.DISPLAY)) {
          nodeType = "munder";
        } else {
          nodeType = "msub";
        }
      } else {
        var _base2 = group.base;
        if (_base2 && _base2.type === "op" && _base2.limits && options.style === Style$1.DISPLAY) {
          nodeType = "munderover";
        } else if (_base2 && _base2.type === "operatorname" && _base2.alwaysHandleSupSub && (options.style === Style$1.DISPLAY || _base2.limits)) {
          nodeType = "munderover";
        } else {
          nodeType = "msubsup";
        }
      }
      return new mathMLTree.MathNode(nodeType, children);
    }
  });
  defineFunctionBuilders({
    type: "atom",
    htmlBuilder(group, options) {
      return buildCommon.mathsym(group.text, group.mode, options, ["m" + group.family]);
    },
    mathmlBuilder(group, options) {
      var node = new mathMLTree.MathNode("mo", [makeText(group.text, group.mode)]);
      if (group.family === "bin") {
        var variant = getVariant(group, options);
        if (variant === "bold-italic") {
          node.setAttribute("mathvariant", variant);
        }
      } else if (group.family === "punct") {
        node.setAttribute("separator", "true");
      } else if (group.family === "open" || group.family === "close") {
        node.setAttribute("stretchy", "false");
      }
      return node;
    }
  });
  var defaultVariant = {
    "mi": "italic",
    "mn": "normal",
    "mtext": "normal"
  };
  defineFunctionBuilders({
    type: "mathord",
    htmlBuilder(group, options) {
      return buildCommon.makeOrd(group, options, "mathord");
    },
    mathmlBuilder(group, options) {
      var node = new mathMLTree.MathNode("mi", [makeText(group.text, group.mode, options)]);
      var variant = getVariant(group, options) || "italic";
      if (variant !== defaultVariant[node.type]) {
        node.setAttribute("mathvariant", variant);
      }
      return node;
    }
  });
  defineFunctionBuilders({
    type: "textord",
    htmlBuilder(group, options) {
      return buildCommon.makeOrd(group, options, "textord");
    },
    mathmlBuilder(group, options) {
      var text2 = makeText(group.text, group.mode, options);
      var variant = getVariant(group, options) || "normal";
      var node;
      if (group.mode === "text") {
        node = new mathMLTree.MathNode("mtext", [text2]);
      } else if (/[0-9]/.test(group.text)) {
        node = new mathMLTree.MathNode("mn", [text2]);
      } else if (group.text === "\\prime") {
        node = new mathMLTree.MathNode("mo", [text2]);
      } else {
        node = new mathMLTree.MathNode("mi", [text2]);
      }
      if (variant !== defaultVariant[node.type]) {
        node.setAttribute("mathvariant", variant);
      }
      return node;
    }
  });
  var cssSpace = {
    "\\nobreak": "nobreak",
    "\\allowbreak": "allowbreak"
  };
  var regularSpace = {
    " ": {},
    "\\ ": {},
    "~": {
      className: "nobreak"
    },
    "\\space": {},
    "\\nobreakspace": {
      className: "nobreak"
    }
  };
  defineFunctionBuilders({
    type: "spacing",
    htmlBuilder(group, options) {
      if (regularSpace.hasOwnProperty(group.text)) {
        var className = regularSpace[group.text].className || "";
        if (group.mode === "text") {
          var ord = buildCommon.makeOrd(group, options, "textord");
          ord.classes.push(className);
          return ord;
        } else {
          return buildCommon.makeSpan(["mspace", className], [buildCommon.mathsym(group.text, group.mode, options)], options);
        }
      } else if (cssSpace.hasOwnProperty(group.text)) {
        return buildCommon.makeSpan(["mspace", cssSpace[group.text]], [], options);
      } else {
        throw new ParseError('Unknown type of space "' + group.text + '"');
      }
    },
    mathmlBuilder(group, options) {
      var node;
      if (regularSpace.hasOwnProperty(group.text)) {
        node = new mathMLTree.MathNode("mtext", [new mathMLTree.TextNode("\xA0")]);
      } else if (cssSpace.hasOwnProperty(group.text)) {
        return new mathMLTree.MathNode("mspace");
      } else {
        throw new ParseError('Unknown type of space "' + group.text + '"');
      }
      return node;
    }
  });
  var pad = () => {
    var padNode = new mathMLTree.MathNode("mtd", []);
    padNode.setAttribute("width", "50%");
    return padNode;
  };
  defineFunctionBuilders({
    type: "tag",
    mathmlBuilder(group, options) {
      var table = new mathMLTree.MathNode("mtable", [new mathMLTree.MathNode("mtr", [pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.body, options)]), pad(), new mathMLTree.MathNode("mtd", [buildExpressionRow(group.tag, options)])])]);
      table.setAttribute("width", "100%");
      return table;
    }
  });
  var textFontFamilies = {
    "\\text": void 0,
    "\\textrm": "textrm",
    "\\textsf": "textsf",
    "\\texttt": "texttt",
    "\\textnormal": "textrm"
  };
  var textFontWeights = {
    "\\textbf": "textbf",
    "\\textmd": "textmd"
  };
  var textFontShapes = {
    "\\textit": "textit",
    "\\textup": "textup"
  };
  var optionsWithFont = (group, options) => {
    var font = group.font;
    if (!font) {
      return options;
    } else if (textFontFamilies[font]) {
      return options.withTextFontFamily(textFontFamilies[font]);
    } else if (textFontWeights[font]) {
      return options.withTextFontWeight(textFontWeights[font]);
    } else if (font === "\\emph") {
      return options.fontShape === "textit" ? options.withTextFontShape("textup") : options.withTextFontShape("textit");
    }
    return options.withTextFontShape(textFontShapes[font]);
  };
  defineFunction({
    type: "text",
    names: [
      // Font families
      "\\text",
      "\\textrm",
      "\\textsf",
      "\\texttt",
      "\\textnormal",
      // Font weights
      "\\textbf",
      "\\textmd",
      // Font Shapes
      "\\textit",
      "\\textup",
      "\\emph"
    ],
    props: {
      numArgs: 1,
      argTypes: ["text"],
      allowedInArgument: true,
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser,
        funcName
      } = _ref;
      var body = args[0];
      return {
        type: "text",
        mode: parser.mode,
        body: ordargument(body),
        font: funcName
      };
    },
    htmlBuilder(group, options) {
      var newOptions = optionsWithFont(group, options);
      var inner2 = buildExpression$1(group.body, newOptions, true);
      return buildCommon.makeSpan(["mord", "text"], inner2, newOptions);
    },
    mathmlBuilder(group, options) {
      var newOptions = optionsWithFont(group, options);
      return buildExpressionRow(group.body, newOptions);
    }
  });
  defineFunction({
    type: "underline",
    names: ["\\underline"],
    props: {
      numArgs: 1,
      allowedInText: true
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      return {
        type: "underline",
        mode: parser.mode,
        body: args[0]
      };
    },
    htmlBuilder(group, options) {
      var innerGroup = buildGroup$1(group.body, options);
      var line = buildCommon.makeLineSpan("underline-line", options);
      var defaultRuleThickness = options.fontMetrics().defaultRuleThickness;
      var vlist = buildCommon.makeVList({
        positionType: "top",
        positionData: innerGroup.height,
        children: [{
          type: "kern",
          size: defaultRuleThickness
        }, {
          type: "elem",
          elem: line
        }, {
          type: "kern",
          size: 3 * defaultRuleThickness
        }, {
          type: "elem",
          elem: innerGroup
        }]
      }, options);
      return buildCommon.makeSpan(["mord", "underline"], [vlist], options);
    },
    mathmlBuilder(group, options) {
      var operator = new mathMLTree.MathNode("mo", [new mathMLTree.TextNode("\u203E")]);
      operator.setAttribute("stretchy", "true");
      var node = new mathMLTree.MathNode("munder", [buildGroup2(group.body, options), operator]);
      node.setAttribute("accentunder", "true");
      return node;
    }
  });
  defineFunction({
    type: "vcenter",
    names: ["\\vcenter"],
    props: {
      numArgs: 1,
      argTypes: ["original"],
      // In LaTeX, \vcenter can act only on a box.
      allowedInText: false
    },
    handler(_ref, args) {
      var {
        parser
      } = _ref;
      return {
        type: "vcenter",
        mode: parser.mode,
        body: args[0]
      };
    },
    htmlBuilder(group, options) {
      var body = buildGroup$1(group.body, options);
      var axisHeight = options.fontMetrics().axisHeight;
      var dy = 0.5 * (body.height - axisHeight - (body.depth + axisHeight));
      return buildCommon.makeVList({
        positionType: "shift",
        positionData: dy,
        children: [{
          type: "elem",
          elem: body
        }]
      }, options);
    },
    mathmlBuilder(group, options) {
      return new mathMLTree.MathNode("mpadded", [buildGroup2(group.body, options)], ["vcenter"]);
    }
  });
  defineFunction({
    type: "verb",
    names: ["\\verb"],
    props: {
      numArgs: 0,
      allowedInText: true
    },
    handler(context, args, optArgs) {
      throw new ParseError("\\verb ended by end of line instead of matching delimiter");
    },
    htmlBuilder(group, options) {
      var text2 = makeVerb(group);
      var body = [];
      var newOptions = options.havingStyle(options.style.text());
      for (var i2 = 0; i2 < text2.length; i2++) {
        var c = text2[i2];
        if (c === "~") {
          c = "\\textasciitilde";
        }
        body.push(buildCommon.makeSymbol(c, "Typewriter-Regular", group.mode, newOptions, ["mord", "texttt"]));
      }
      return buildCommon.makeSpan(["mord", "text"].concat(newOptions.sizingClasses(options)), buildCommon.tryCombineChars(body), newOptions);
    },
    mathmlBuilder(group, options) {
      var text2 = new mathMLTree.TextNode(makeVerb(group));
      var node = new mathMLTree.MathNode("mtext", [text2]);
      node.setAttribute("mathvariant", "monospace");
      return node;
    }
  });
  var makeVerb = (group) => group.body.replace(/ /g, group.star ? "\u2423" : "\xA0");
  var functions = _functions;
  var spaceRegexString = "[ \r\n	]";
  var controlWordRegexString = "\\\\[a-zA-Z@]+";
  var controlSymbolRegexString = "\\\\[^\uD800-\uDFFF]";
  var controlWordWhitespaceRegexString = "(" + controlWordRegexString + ")" + spaceRegexString + "*";
  var controlSpaceRegexString = "\\\\(\n|[ \r	]+\n?)[ \r	]*";
  var combiningDiacriticalMarkString = "[\u0300-\u036F]";
  var combiningDiacriticalMarksEndRegex = new RegExp(combiningDiacriticalMarkString + "+$");
  var tokenRegexString = "(" + spaceRegexString + "+)|" + // whitespace
  (controlSpaceRegexString + "|") + // \whitespace
  "([!-\\[\\]-\u2027\u202A-\uD7FF\uF900-\uFFFF]" + // single codepoint
  (combiningDiacriticalMarkString + "*") + // ...plus accents
  "|[\uD800-\uDBFF][\uDC00-\uDFFF]" + // surrogate pair
  (combiningDiacriticalMarkString + "*") + // ...plus accents
  "|\\\\verb\\*([^]).*?\\4|\\\\verb([^*a-zA-Z]).*?\\5" + // \verb unstarred
  ("|" + controlWordWhitespaceRegexString) + // \macroName + spaces
  ("|" + controlSymbolRegexString + ")");
  var Lexer = class {
    // Category codes. The lexer only supports comment characters (14) for now.
    // MacroExpander additionally distinguishes active (13).
    constructor(input, settings) {
      this.input = void 0;
      this.settings = void 0;
      this.tokenRegex = void 0;
      this.catcodes = void 0;
      this.input = input;
      this.settings = settings;
      this.tokenRegex = new RegExp(tokenRegexString, "g");
      this.catcodes = {
        "%": 14,
        // comment character
        "~": 13
        // active character
      };
    }
    setCatcode(char, code) {
      this.catcodes[char] = code;
    }
    /**
     * This function lexes a single token.
     */
    lex() {
      var input = this.input;
      var pos = this.tokenRegex.lastIndex;
      if (pos === input.length) {
        return new Token("EOF", new SourceLocation(this, pos, pos));
      }
      var match = this.tokenRegex.exec(input);
      if (match === null || match.index !== pos) {
        throw new ParseError("Unexpected character: '" + input[pos] + "'", new Token(input[pos], new SourceLocation(this, pos, pos + 1)));
      }
      var text2 = match[6] || match[3] || (match[2] ? "\\ " : " ");
      if (this.catcodes[text2] === 14) {
        var nlIndex = input.indexOf("\n", this.tokenRegex.lastIndex);
        if (nlIndex === -1) {
          this.tokenRegex.lastIndex = input.length;
          this.settings.reportNonstrict("commentAtEnd", "% comment has no terminating newline; LaTeX would fail because of commenting the end of math mode (e.g. $)");
        } else {
          this.tokenRegex.lastIndex = nlIndex + 1;
        }
        return this.lex();
      }
      return new Token(text2, new SourceLocation(this, pos, this.tokenRegex.lastIndex));
    }
  };
  var Namespace = class {
    /**
     * Both arguments are optional.  The first argument is an object of
     * built-in mappings which never change.  The second argument is an object
     * of initial (global-level) mappings, which will constantly change
     * according to any global/top-level `set`s done.
     */
    constructor(builtins, globalMacros) {
      if (builtins === void 0) {
        builtins = {};
      }
      if (globalMacros === void 0) {
        globalMacros = {};
      }
      this.current = void 0;
      this.builtins = void 0;
      this.undefStack = void 0;
      this.current = globalMacros;
      this.builtins = builtins;
      this.undefStack = [];
    }
    /**
     * Start a new nested group, affecting future local `set`s.
     */
    beginGroup() {
      this.undefStack.push({});
    }
    /**
     * End current nested group, restoring values before the group began.
     */
    endGroup() {
      if (this.undefStack.length === 0) {
        throw new ParseError("Unbalanced namespace destruction: attempt to pop global namespace; please report this as a bug");
      }
      var undefs = this.undefStack.pop();
      for (var undef in undefs) {
        if (undefs.hasOwnProperty(undef)) {
          if (undefs[undef] == null) {
            delete this.current[undef];
          } else {
            this.current[undef] = undefs[undef];
          }
        }
      }
    }
    /**
     * Ends all currently nested groups (if any), restoring values before the
     * groups began.  Useful in case of an error in the middle of parsing.
     */
    endGroups() {
      while (this.undefStack.length > 0) {
        this.endGroup();
      }
    }
    /**
     * Detect whether `name` has a definition.  Equivalent to
     * `get(name) != null`.
     */
    has(name) {
      return this.current.hasOwnProperty(name) || this.builtins.hasOwnProperty(name);
    }
    /**
     * Get the current value of a name, or `undefined` if there is no value.
     *
     * Note: Do not use `if (namespace.get(...))` to detect whether a macro
     * is defined, as the definition may be the empty string which evaluates
     * to `false` in JavaScript.  Use `if (namespace.get(...) != null)` or
     * `if (namespace.has(...))`.
     */
    get(name) {
      if (this.current.hasOwnProperty(name)) {
        return this.current[name];
      } else {
        return this.builtins[name];
      }
    }
    /**
     * Set the current value of a name, and optionally set it globally too.
     * Local set() sets the current value and (when appropriate) adds an undo
     * operation to the undo stack.  Global set() may change the undo
     * operation at every level, so takes time linear in their number.
     * A value of undefined means to delete existing definitions.
     */
    set(name, value, global) {
      if (global === void 0) {
        global = false;
      }
      if (global) {
        for (var i2 = 0; i2 < this.undefStack.length; i2++) {
          delete this.undefStack[i2][name];
        }
        if (this.undefStack.length > 0) {
          this.undefStack[this.undefStack.length - 1][name] = value;
        }
      } else {
        var top = this.undefStack[this.undefStack.length - 1];
        if (top && !top.hasOwnProperty(name)) {
          top[name] = this.current[name];
        }
      }
      if (value == null) {
        delete this.current[name];
      } else {
        this.current[name] = value;
      }
    }
  };
  var macros = _macros;
  defineMacro("\\noexpand", function(context) {
    var t = context.popToken();
    if (context.isExpandable(t.text)) {
      t.noexpand = true;
      t.treatAsRelax = true;
    }
    return {
      tokens: [t],
      numArgs: 0
    };
  });
  defineMacro("\\expandafter", function(context) {
    var t = context.popToken();
    context.expandOnce(true);
    return {
      tokens: [t],
      numArgs: 0
    };
  });
  defineMacro("\\@firstoftwo", function(context) {
    var args = context.consumeArgs(2);
    return {
      tokens: args[0],
      numArgs: 0
    };
  });
  defineMacro("\\@secondoftwo", function(context) {
    var args = context.consumeArgs(2);
    return {
      tokens: args[1],
      numArgs: 0
    };
  });
  defineMacro("\\@ifnextchar", function(context) {
    var args = context.consumeArgs(3);
    context.consumeSpaces();
    var nextToken = context.future();
    if (args[0].length === 1 && args[0][0].text === nextToken.text) {
      return {
        tokens: args[1],
        numArgs: 0
      };
    } else {
      return {
        tokens: args[2],
        numArgs: 0
      };
    }
  });
  defineMacro("\\@ifstar", "\\@ifnextchar *{\\@firstoftwo{#1}}");
  defineMacro("\\TextOrMath", function(context) {
    var args = context.consumeArgs(2);
    if (context.mode === "text") {
      return {
        tokens: args[0],
        numArgs: 0
      };
    } else {
      return {
        tokens: args[1],
        numArgs: 0
      };
    }
  });
  var digitToNumber = {
    "0": 0,
    "1": 1,
    "2": 2,
    "3": 3,
    "4": 4,
    "5": 5,
    "6": 6,
    "7": 7,
    "8": 8,
    "9": 9,
    "a": 10,
    "A": 10,
    "b": 11,
    "B": 11,
    "c": 12,
    "C": 12,
    "d": 13,
    "D": 13,
    "e": 14,
    "E": 14,
    "f": 15,
    "F": 15
  };
  defineMacro("\\char", function(context) {
    var token = context.popToken();
    var base;
    var number = "";
    if (token.text === "'") {
      base = 8;
      token = context.popToken();
    } else if (token.text === '"') {
      base = 16;
      token = context.popToken();
    } else if (token.text === "`") {
      token = context.popToken();
      if (token.text[0] === "\\") {
        number = token.text.charCodeAt(1);
      } else if (token.text === "EOF") {
        throw new ParseError("\\char` missing argument");
      } else {
        number = token.text.charCodeAt(0);
      }
    } else {
      base = 10;
    }
    if (base) {
      number = digitToNumber[token.text];
      if (number == null || number >= base) {
        throw new ParseError("Invalid base-" + base + " digit " + token.text);
      }
      var digit;
      while ((digit = digitToNumber[context.future().text]) != null && digit < base) {
        number *= base;
        number += digit;
        context.popToken();
      }
    }
    return "\\@char{" + number + "}";
  });
  var newcommand = (context, existsOK, nonexistsOK, skipIfExists) => {
    var arg = context.consumeArg().tokens;
    if (arg.length !== 1) {
      throw new ParseError("\\newcommand's first argument must be a macro name");
    }
    var name = arg[0].text;
    var exists = context.isDefined(name);
    if (exists && !existsOK) {
      throw new ParseError("\\newcommand{" + name + "} attempting to redefine " + (name + "; use \\renewcommand"));
    }
    if (!exists && !nonexistsOK) {
      throw new ParseError("\\renewcommand{" + name + "} when command " + name + " does not yet exist; use \\newcommand");
    }
    var numArgs = 0;
    arg = context.consumeArg().tokens;
    if (arg.length === 1 && arg[0].text === "[") {
      var argText = "";
      var token = context.expandNextToken();
      while (token.text !== "]" && token.text !== "EOF") {
        argText += token.text;
        token = context.expandNextToken();
      }
      if (!argText.match(/^\s*[0-9]+\s*$/)) {
        throw new ParseError("Invalid number of arguments: " + argText);
      }
      numArgs = parseInt(argText);
      arg = context.consumeArg().tokens;
    }
    if (!(exists && skipIfExists)) {
      context.macros.set(name, {
        tokens: arg,
        numArgs
      });
    }
    return "";
  };
  defineMacro("\\newcommand", (context) => newcommand(context, false, true, false));
  defineMacro("\\renewcommand", (context) => newcommand(context, true, false, false));
  defineMacro("\\providecommand", (context) => newcommand(context, true, true, true));
  defineMacro("\\message", (context) => {
    var arg = context.consumeArgs(1)[0];
    console.log(arg.reverse().map((token) => token.text).join(""));
    return "";
  });
  defineMacro("\\errmessage", (context) => {
    var arg = context.consumeArgs(1)[0];
    console.error(arg.reverse().map((token) => token.text).join(""));
    return "";
  });
  defineMacro("\\show", (context) => {
    var tok = context.popToken();
    var name = tok.text;
    console.log(tok, context.macros.get(name), functions[name], symbols.math[name], symbols.text[name]);
    return "";
  });
  defineMacro("\\bgroup", "{");
  defineMacro("\\egroup", "}");
  defineMacro("~", "\\nobreakspace");
  defineMacro("\\lq", "`");
  defineMacro("\\rq", "'");
  defineMacro("\\aa", "\\r a");
  defineMacro("\\AA", "\\r A");
  defineMacro("\\textcopyright", "\\html@mathml{\\textcircled{c}}{\\char`\xA9}");
  defineMacro("\\copyright", "\\TextOrMath{\\textcopyright}{\\text{\\textcopyright}}");
  defineMacro("\\textregistered", "\\html@mathml{\\textcircled{\\scriptsize R}}{\\char`\xAE}");
  defineMacro("\u212C", "\\mathscr{B}");
  defineMacro("\u2130", "\\mathscr{E}");
  defineMacro("\u2131", "\\mathscr{F}");
  defineMacro("\u210B", "\\mathscr{H}");
  defineMacro("\u2110", "\\mathscr{I}");
  defineMacro("\u2112", "\\mathscr{L}");
  defineMacro("\u2133", "\\mathscr{M}");
  defineMacro("\u211B", "\\mathscr{R}");
  defineMacro("\u212D", "\\mathfrak{C}");
  defineMacro("\u210C", "\\mathfrak{H}");
  defineMacro("\u2128", "\\mathfrak{Z}");
  defineMacro("\\Bbbk", "\\Bbb{k}");
  defineMacro("\xB7", "\\cdotp");
  defineMacro("\\llap", "\\mathllap{\\textrm{#1}}");
  defineMacro("\\rlap", "\\mathrlap{\\textrm{#1}}");
  defineMacro("\\clap", "\\mathclap{\\textrm{#1}}");
  defineMacro("\\mathstrut", "\\vphantom{(}");
  defineMacro("\\underbar", "\\underline{\\text{#1}}");
  defineMacro("\\not", '\\html@mathml{\\mathrel{\\mathrlap\\@not}}{\\char"338}');
  defineMacro("\\neq", "\\html@mathml{\\mathrel{\\not=}}{\\mathrel{\\char`\u2260}}");
  defineMacro("\\ne", "\\neq");
  defineMacro("\u2260", "\\neq");
  defineMacro("\\notin", "\\html@mathml{\\mathrel{{\\in}\\mathllap{/\\mskip1mu}}}{\\mathrel{\\char`\u2209}}");
  defineMacro("\u2209", "\\notin");
  defineMacro("\u2258", "\\html@mathml{\\mathrel{=\\kern{-1em}\\raisebox{0.4em}{$\\scriptsize\\frown$}}}{\\mathrel{\\char`\u2258}}");
  defineMacro("\u2259", "\\html@mathml{\\stackrel{\\tiny\\wedge}{=}}{\\mathrel{\\char`\u2258}}");
  defineMacro("\u225A", "\\html@mathml{\\stackrel{\\tiny\\vee}{=}}{\\mathrel{\\char`\u225A}}");
  defineMacro("\u225B", "\\html@mathml{\\stackrel{\\scriptsize\\star}{=}}{\\mathrel{\\char`\u225B}}");
  defineMacro("\u225D", "\\html@mathml{\\stackrel{\\tiny\\mathrm{def}}{=}}{\\mathrel{\\char`\u225D}}");
  defineMacro("\u225E", "\\html@mathml{\\stackrel{\\tiny\\mathrm{m}}{=}}{\\mathrel{\\char`\u225E}}");
  defineMacro("\u225F", "\\html@mathml{\\stackrel{\\tiny?}{=}}{\\mathrel{\\char`\u225F}}");
  defineMacro("\u27C2", "\\perp");
  defineMacro("\u203C", "\\mathclose{!\\mkern-0.8mu!}");
  defineMacro("\u220C", "\\notni");
  defineMacro("\u231C", "\\ulcorner");
  defineMacro("\u231D", "\\urcorner");
  defineMacro("\u231E", "\\llcorner");
  defineMacro("\u231F", "\\lrcorner");
  defineMacro("\xA9", "\\copyright");
  defineMacro("\xAE", "\\textregistered");
  defineMacro("\uFE0F", "\\textregistered");
  defineMacro("\\ulcorner", '\\html@mathml{\\@ulcorner}{\\mathop{\\char"231c}}');
  defineMacro("\\urcorner", '\\html@mathml{\\@urcorner}{\\mathop{\\char"231d}}');
  defineMacro("\\llcorner", '\\html@mathml{\\@llcorner}{\\mathop{\\char"231e}}');
  defineMacro("\\lrcorner", '\\html@mathml{\\@lrcorner}{\\mathop{\\char"231f}}');
  defineMacro("\\vdots", "{\\varvdots\\rule{0pt}{15pt}}");
  defineMacro("\u22EE", "\\vdots");
  defineMacro("\\varGamma", "\\mathit{\\Gamma}");
  defineMacro("\\varDelta", "\\mathit{\\Delta}");
  defineMacro("\\varTheta", "\\mathit{\\Theta}");
  defineMacro("\\varLambda", "\\mathit{\\Lambda}");
  defineMacro("\\varXi", "\\mathit{\\Xi}");
  defineMacro("\\varPi", "\\mathit{\\Pi}");
  defineMacro("\\varSigma", "\\mathit{\\Sigma}");
  defineMacro("\\varUpsilon", "\\mathit{\\Upsilon}");
  defineMacro("\\varPhi", "\\mathit{\\Phi}");
  defineMacro("\\varPsi", "\\mathit{\\Psi}");
  defineMacro("\\varOmega", "\\mathit{\\Omega}");
  defineMacro("\\substack", "\\begin{subarray}{c}#1\\end{subarray}");
  defineMacro("\\colon", "\\nobreak\\mskip2mu\\mathpunct{}\\mathchoice{\\mkern-3mu}{\\mkern-3mu}{}{}{:}\\mskip6mu\\relax");
  defineMacro("\\boxed", "\\fbox{$\\displaystyle{#1}$}");
  defineMacro("\\iff", "\\DOTSB\\;\\Longleftrightarrow\\;");
  defineMacro("\\implies", "\\DOTSB\\;\\Longrightarrow\\;");
  defineMacro("\\impliedby", "\\DOTSB\\;\\Longleftarrow\\;");
  defineMacro("\\dddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ...}}{#1}}");
  defineMacro("\\ddddot", "{\\overset{\\raisebox{-0.1ex}{\\normalsize ....}}{#1}}");
  var dotsByToken = {
    ",": "\\dotsc",
    "\\not": "\\dotsb",
    // \keybin@ checks for the following:
    "+": "\\dotsb",
    "=": "\\dotsb",
    "<": "\\dotsb",
    ">": "\\dotsb",
    "-": "\\dotsb",
    "*": "\\dotsb",
    ":": "\\dotsb",
    // Symbols whose definition starts with \DOTSB:
    "\\DOTSB": "\\dotsb",
    "\\coprod": "\\dotsb",
    "\\bigvee": "\\dotsb",
    "\\bigwedge": "\\dotsb",
    "\\biguplus": "\\dotsb",
    "\\bigcap": "\\dotsb",
    "\\bigcup": "\\dotsb",
    "\\prod": "\\dotsb",
    "\\sum": "\\dotsb",
    "\\bigotimes": "\\dotsb",
    "\\bigoplus": "\\dotsb",
    "\\bigodot": "\\dotsb",
    "\\bigsqcup": "\\dotsb",
    "\\And": "\\dotsb",
    "\\longrightarrow": "\\dotsb",
    "\\Longrightarrow": "\\dotsb",
    "\\longleftarrow": "\\dotsb",
    "\\Longleftarrow": "\\dotsb",
    "\\longleftrightarrow": "\\dotsb",
    "\\Longleftrightarrow": "\\dotsb",
    "\\mapsto": "\\dotsb",
    "\\longmapsto": "\\dotsb",
    "\\hookrightarrow": "\\dotsb",
    "\\doteq": "\\dotsb",
    // Symbols whose definition starts with \mathbin:
    "\\mathbin": "\\dotsb",
    // Symbols whose definition starts with \mathrel:
    "\\mathrel": "\\dotsb",
    "\\relbar": "\\dotsb",
    "\\Relbar": "\\dotsb",
    "\\xrightarrow": "\\dotsb",
    "\\xleftarrow": "\\dotsb",
    // Symbols whose definition starts with \DOTSI:
    "\\DOTSI": "\\dotsi",
    "\\int": "\\dotsi",
    "\\oint": "\\dotsi",
    "\\iint": "\\dotsi",
    "\\iiint": "\\dotsi",
    "\\iiiint": "\\dotsi",
    "\\idotsint": "\\dotsi",
    // Symbols whose definition starts with \DOTSX:
    "\\DOTSX": "\\dotsx"
  };
  defineMacro("\\dots", function(context) {
    var thedots = "\\dotso";
    var next = context.expandAfterFuture().text;
    if (next in dotsByToken) {
      thedots = dotsByToken[next];
    } else if (next.slice(0, 4) === "\\not") {
      thedots = "\\dotsb";
    } else if (next in symbols.math) {
      if (["bin", "rel"].includes(symbols.math[next].group)) {
        thedots = "\\dotsb";
      }
    }
    return thedots;
  });
  var spaceAfterDots = {
    // \rightdelim@ checks for the following:
    ")": true,
    "]": true,
    "\\rbrack": true,
    "\\}": true,
    "\\rbrace": true,
    "\\rangle": true,
    "\\rceil": true,
    "\\rfloor": true,
    "\\rgroup": true,
    "\\rmoustache": true,
    "\\right": true,
    "\\bigr": true,
    "\\biggr": true,
    "\\Bigr": true,
    "\\Biggr": true,
    // \extra@ also tests for the following:
    "$": true,
    // \extrap@ checks for the following:
    ";": true,
    ".": true,
    ",": true
  };
  defineMacro("\\dotso", function(context) {
    var next = context.future().text;
    if (next in spaceAfterDots) {
      return "\\ldots\\,";
    } else {
      return "\\ldots";
    }
  });
  defineMacro("\\dotsc", function(context) {
    var next = context.future().text;
    if (next in spaceAfterDots && next !== ",") {
      return "\\ldots\\,";
    } else {
      return "\\ldots";
    }
  });
  defineMacro("\\cdots", function(context) {
    var next = context.future().text;
    if (next in spaceAfterDots) {
      return "\\@cdots\\,";
    } else {
      return "\\@cdots";
    }
  });
  defineMacro("\\dotsb", "\\cdots");
  defineMacro("\\dotsm", "\\cdots");
  defineMacro("\\dotsi", "\\!\\cdots");
  defineMacro("\\dotsx", "\\ldots\\,");
  defineMacro("\\DOTSI", "\\relax");
  defineMacro("\\DOTSB", "\\relax");
  defineMacro("\\DOTSX", "\\relax");
  defineMacro("\\tmspace", "\\TextOrMath{\\kern#1#3}{\\mskip#1#2}\\relax");
  defineMacro("\\,", "\\tmspace+{3mu}{.1667em}");
  defineMacro("\\thinspace", "\\,");
  defineMacro("\\>", "\\mskip{4mu}");
  defineMacro("\\:", "\\tmspace+{4mu}{.2222em}");
  defineMacro("\\medspace", "\\:");
  defineMacro("\\;", "\\tmspace+{5mu}{.2777em}");
  defineMacro("\\thickspace", "\\;");
  defineMacro("\\!", "\\tmspace-{3mu}{.1667em}");
  defineMacro("\\negthinspace", "\\!");
  defineMacro("\\negmedspace", "\\tmspace-{4mu}{.2222em}");
  defineMacro("\\negthickspace", "\\tmspace-{5mu}{.277em}");
  defineMacro("\\enspace", "\\kern.5em ");
  defineMacro("\\enskip", "\\hskip.5em\\relax");
  defineMacro("\\quad", "\\hskip1em\\relax");
  defineMacro("\\qquad", "\\hskip2em\\relax");
  defineMacro("\\tag", "\\@ifstar\\tag@literal\\tag@paren");
  defineMacro("\\tag@paren", "\\tag@literal{({#1})}");
  defineMacro("\\tag@literal", (context) => {
    if (context.macros.get("\\df@tag")) {
      throw new ParseError("Multiple \\tag");
    }
    return "\\gdef\\df@tag{\\text{#1}}";
  });
  defineMacro("\\bmod", "\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}\\mathbin{\\rm mod}\\mathchoice{\\mskip1mu}{\\mskip1mu}{\\mskip5mu}{\\mskip5mu}");
  defineMacro("\\pod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern8mu}{\\mkern8mu}{\\mkern8mu}(#1)");
  defineMacro("\\pmod", "\\pod{{\\rm mod}\\mkern6mu#1}");
  defineMacro("\\mod", "\\allowbreak\\mathchoice{\\mkern18mu}{\\mkern12mu}{\\mkern12mu}{\\mkern12mu}{\\rm mod}\\,\\,#1");
  defineMacro("\\newline", "\\\\\\relax");
  defineMacro("\\TeX", "\\textrm{\\html@mathml{T\\kern-.1667em\\raisebox{-.5ex}{E}\\kern-.125emX}{TeX}}");
  var latexRaiseA = makeEm(fontMetricsData["Main-Regular"]["T".charCodeAt(0)][1] - 0.7 * fontMetricsData["Main-Regular"]["A".charCodeAt(0)][1]);
  defineMacro("\\LaTeX", "\\textrm{\\html@mathml{" + ("L\\kern-.36em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{LaTeX}}");
  defineMacro("\\KaTeX", "\\textrm{\\html@mathml{" + ("K\\kern-.17em\\raisebox{" + latexRaiseA + "}{\\scriptstyle A}") + "\\kern-.15em\\TeX}{KaTeX}}");
  defineMacro("\\hspace", "\\@ifstar\\@hspacer\\@hspace");
  defineMacro("\\@hspace", "\\hskip #1\\relax");
  defineMacro("\\@hspacer", "\\rule{0pt}{0pt}\\hskip #1\\relax");
  defineMacro("\\ordinarycolon", ":");
  defineMacro("\\vcentcolon", "\\mathrel{\\mathop\\ordinarycolon}");
  defineMacro("\\dblcolon", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-.9mu}\\vcentcolon}}{\\mathop{\\char"2237}}');
  defineMacro("\\coloneqq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2254}}');
  defineMacro("\\Coloneqq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}=}}{\\mathop{\\char"2237\\char"3d}}');
  defineMacro("\\coloneq", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"3a\\char"2212}}');
  defineMacro("\\Coloneq", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\mathrel{-}}}{\\mathop{\\char"2237\\char"2212}}');
  defineMacro("\\eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2255}}');
  defineMacro("\\Eqqcolon", '\\html@mathml{\\mathrel{=\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"3d\\char"2237}}');
  defineMacro("\\eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\vcentcolon}}{\\mathop{\\char"2239}}');
  defineMacro("\\Eqcolon", '\\html@mathml{\\mathrel{\\mathrel{-}\\mathrel{\\mkern-1.2mu}\\dblcolon}}{\\mathop{\\char"2212\\char"2237}}');
  defineMacro("\\colonapprox", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"3a\\char"2248}}');
  defineMacro("\\Colonapprox", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\approx}}{\\mathop{\\char"2237\\char"2248}}');
  defineMacro("\\colonsim", '\\html@mathml{\\mathrel{\\vcentcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"3a\\char"223c}}');
  defineMacro("\\Colonsim", '\\html@mathml{\\mathrel{\\dblcolon\\mathrel{\\mkern-1.2mu}\\sim}}{\\mathop{\\char"2237\\char"223c}}');
  defineMacro("\u2237", "\\dblcolon");
  defineMacro("\u2239", "\\eqcolon");
  defineMacro("\u2254", "\\coloneqq");
  defineMacro("\u2255", "\\eqqcolon");
  defineMacro("\u2A74", "\\Coloneqq");
  defineMacro("\\ratio", "\\vcentcolon");
  defineMacro("\\coloncolon", "\\dblcolon");
  defineMacro("\\colonequals", "\\coloneqq");
  defineMacro("\\coloncolonequals", "\\Coloneqq");
  defineMacro("\\equalscolon", "\\eqqcolon");
  defineMacro("\\equalscoloncolon", "\\Eqqcolon");
  defineMacro("\\colonminus", "\\coloneq");
  defineMacro("\\coloncolonminus", "\\Coloneq");
  defineMacro("\\minuscolon", "\\eqcolon");
  defineMacro("\\minuscoloncolon", "\\Eqcolon");
  defineMacro("\\coloncolonapprox", "\\Colonapprox");
  defineMacro("\\coloncolonsim", "\\Colonsim");
  defineMacro("\\simcolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
  defineMacro("\\simcoloncolon", "\\mathrel{\\sim\\mathrel{\\mkern-1.2mu}\\dblcolon}");
  defineMacro("\\approxcolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\vcentcolon}");
  defineMacro("\\approxcoloncolon", "\\mathrel{\\approx\\mathrel{\\mkern-1.2mu}\\dblcolon}");
  defineMacro("\\notni", "\\html@mathml{\\not\\ni}{\\mathrel{\\char`\u220C}}");
  defineMacro("\\limsup", "\\DOTSB\\operatorname*{lim\\,sup}");
  defineMacro("\\liminf", "\\DOTSB\\operatorname*{lim\\,inf}");
  defineMacro("\\injlim", "\\DOTSB\\operatorname*{inj\\,lim}");
  defineMacro("\\projlim", "\\DOTSB\\operatorname*{proj\\,lim}");
  defineMacro("\\varlimsup", "\\DOTSB\\operatorname*{\\overline{lim}}");
  defineMacro("\\varliminf", "\\DOTSB\\operatorname*{\\underline{lim}}");
  defineMacro("\\varinjlim", "\\DOTSB\\operatorname*{\\underrightarrow{lim}}");
  defineMacro("\\varprojlim", "\\DOTSB\\operatorname*{\\underleftarrow{lim}}");
  defineMacro("\\gvertneqq", "\\html@mathml{\\@gvertneqq}{\u2269}");
  defineMacro("\\lvertneqq", "\\html@mathml{\\@lvertneqq}{\u2268}");
  defineMacro("\\ngeqq", "\\html@mathml{\\@ngeqq}{\u2271}");
  defineMacro("\\ngeqslant", "\\html@mathml{\\@ngeqslant}{\u2271}");
  defineMacro("\\nleqq", "\\html@mathml{\\@nleqq}{\u2270}");
  defineMacro("\\nleqslant", "\\html@mathml{\\@nleqslant}{\u2270}");
  defineMacro("\\nshortmid", "\\html@mathml{\\@nshortmid}{\u2224}");
  defineMacro("\\nshortparallel", "\\html@mathml{\\@nshortparallel}{\u2226}");
  defineMacro("\\nsubseteqq", "\\html@mathml{\\@nsubseteqq}{\u2288}");
  defineMacro("\\nsupseteqq", "\\html@mathml{\\@nsupseteqq}{\u2289}");
  defineMacro("\\varsubsetneq", "\\html@mathml{\\@varsubsetneq}{\u228A}");
  defineMacro("\\varsubsetneqq", "\\html@mathml{\\@varsubsetneqq}{\u2ACB}");
  defineMacro("\\varsupsetneq", "\\html@mathml{\\@varsupsetneq}{\u228B}");
  defineMacro("\\varsupsetneqq", "\\html@mathml{\\@varsupsetneqq}{\u2ACC}");
  defineMacro("\\imath", "\\html@mathml{\\@imath}{\u0131}");
  defineMacro("\\jmath", "\\html@mathml{\\@jmath}{\u0237}");
  defineMacro("\\llbracket", "\\html@mathml{\\mathopen{[\\mkern-3.2mu[}}{\\mathopen{\\char`\u27E6}}");
  defineMacro("\\rrbracket", "\\html@mathml{\\mathclose{]\\mkern-3.2mu]}}{\\mathclose{\\char`\u27E7}}");
  defineMacro("\u27E6", "\\llbracket");
  defineMacro("\u27E7", "\\rrbracket");
  defineMacro("\\lBrace", "\\html@mathml{\\mathopen{\\{\\mkern-3.2mu[}}{\\mathopen{\\char`\u2983}}");
  defineMacro("\\rBrace", "\\html@mathml{\\mathclose{]\\mkern-3.2mu\\}}}{\\mathclose{\\char`\u2984}}");
  defineMacro("\u2983", "\\lBrace");
  defineMacro("\u2984", "\\rBrace");
  defineMacro("\\minuso", "\\mathbin{\\html@mathml{{\\mathrlap{\\mathchoice{\\kern{0.145em}}{\\kern{0.145em}}{\\kern{0.1015em}}{\\kern{0.0725em}}\\circ}{-}}}{\\char`\u29B5}}");
  defineMacro("\u29B5", "\\minuso");
  defineMacro("\\darr", "\\downarrow");
  defineMacro("\\dArr", "\\Downarrow");
  defineMacro("\\Darr", "\\Downarrow");
  defineMacro("\\lang", "\\langle");
  defineMacro("\\rang", "\\rangle");
  defineMacro("\\uarr", "\\uparrow");
  defineMacro("\\uArr", "\\Uparrow");
  defineMacro("\\Uarr", "\\Uparrow");
  defineMacro("\\N", "\\mathbb{N}");
  defineMacro("\\R", "\\mathbb{R}");
  defineMacro("\\Z", "\\mathbb{Z}");
  defineMacro("\\alef", "\\aleph");
  defineMacro("\\alefsym", "\\aleph");
  defineMacro("\\Alpha", "\\mathrm{A}");
  defineMacro("\\Beta", "\\mathrm{B}");
  defineMacro("\\bull", "\\bullet");
  defineMacro("\\Chi", "\\mathrm{X}");
  defineMacro("\\clubs", "\\clubsuit");
  defineMacro("\\cnums", "\\mathbb{C}");
  defineMacro("\\Complex", "\\mathbb{C}");
  defineMacro("\\Dagger", "\\ddagger");
  defineMacro("\\diamonds", "\\diamondsuit");
  defineMacro("\\empty", "\\emptyset");
  defineMacro("\\Epsilon", "\\mathrm{E}");
  defineMacro("\\Eta", "\\mathrm{H}");
  defineMacro("\\exist", "\\exists");
  defineMacro("\\harr", "\\leftrightarrow");
  defineMacro("\\hArr", "\\Leftrightarrow");
  defineMacro("\\Harr", "\\Leftrightarrow");
  defineMacro("\\hearts", "\\heartsuit");
  defineMacro("\\image", "\\Im");
  defineMacro("\\infin", "\\infty");
  defineMacro("\\Iota", "\\mathrm{I}");
  defineMacro("\\isin", "\\in");
  defineMacro("\\Kappa", "\\mathrm{K}");
  defineMacro("\\larr", "\\leftarrow");
  defineMacro("\\lArr", "\\Leftarrow");
  defineMacro("\\Larr", "\\Leftarrow");
  defineMacro("\\lrarr", "\\leftrightarrow");
  defineMacro("\\lrArr", "\\Leftrightarrow");
  defineMacro("\\Lrarr", "\\Leftrightarrow");
  defineMacro("\\Mu", "\\mathrm{M}");
  defineMacro("\\natnums", "\\mathbb{N}");
  defineMacro("\\Nu", "\\mathrm{N}");
  defineMacro("\\Omicron", "\\mathrm{O}");
  defineMacro("\\plusmn", "\\pm");
  defineMacro("\\rarr", "\\rightarrow");
  defineMacro("\\rArr", "\\Rightarrow");
  defineMacro("\\Rarr", "\\Rightarrow");
  defineMacro("\\real", "\\Re");
  defineMacro("\\reals", "\\mathbb{R}");
  defineMacro("\\Reals", "\\mathbb{R}");
  defineMacro("\\Rho", "\\mathrm{P}");
  defineMacro("\\sdot", "\\cdot");
  defineMacro("\\sect", "\\S");
  defineMacro("\\spades", "\\spadesuit");
  defineMacro("\\sub", "\\subset");
  defineMacro("\\sube", "\\subseteq");
  defineMacro("\\supe", "\\supseteq");
  defineMacro("\\Tau", "\\mathrm{T}");
  defineMacro("\\thetasym", "\\vartheta");
  defineMacro("\\weierp", "\\wp");
  defineMacro("\\Zeta", "\\mathrm{Z}");
  defineMacro("\\argmin", "\\DOTSB\\operatorname*{arg\\,min}");
  defineMacro("\\argmax", "\\DOTSB\\operatorname*{arg\\,max}");
  defineMacro("\\plim", "\\DOTSB\\mathop{\\operatorname{plim}}\\limits");
  defineMacro("\\bra", "\\mathinner{\\langle{#1}|}");
  defineMacro("\\ket", "\\mathinner{|{#1}\\rangle}");
  defineMacro("\\braket", "\\mathinner{\\langle{#1}\\rangle}");
  defineMacro("\\Bra", "\\left\\langle#1\\right|");
  defineMacro("\\Ket", "\\left|#1\\right\\rangle");
  var braketHelper = (one) => (context) => {
    var left = context.consumeArg().tokens;
    var middle = context.consumeArg().tokens;
    var middleDouble = context.consumeArg().tokens;
    var right = context.consumeArg().tokens;
    var oldMiddle = context.macros.get("|");
    var oldMiddleDouble = context.macros.get("\\|");
    context.macros.beginGroup();
    var midMacro = (double) => (context2) => {
      if (one) {
        context2.macros.set("|", oldMiddle);
        if (middleDouble.length) {
          context2.macros.set("\\|", oldMiddleDouble);
        }
      }
      var doubled = double;
      if (!double && middleDouble.length) {
        var nextToken = context2.future();
        if (nextToken.text === "|") {
          context2.popToken();
          doubled = true;
        }
      }
      return {
        tokens: doubled ? middleDouble : middle,
        numArgs: 0
      };
    };
    context.macros.set("|", midMacro(false));
    if (middleDouble.length) {
      context.macros.set("\\|", midMacro(true));
    }
    var arg = context.consumeArg().tokens;
    var expanded = context.expandTokens([
      ...right,
      ...arg,
      ...left
      // reversed
    ]);
    context.macros.endGroup();
    return {
      tokens: expanded.reverse(),
      numArgs: 0
    };
  };
  defineMacro("\\bra@ket", braketHelper(false));
  defineMacro("\\bra@set", braketHelper(true));
  defineMacro("\\Braket", "\\bra@ket{\\left\\langle}{\\,\\middle\\vert\\,}{\\,\\middle\\vert\\,}{\\right\\rangle}");
  defineMacro("\\Set", "\\bra@set{\\left\\{\\:}{\\;\\middle\\vert\\;}{\\;\\middle\\Vert\\;}{\\:\\right\\}}");
  defineMacro("\\set", "\\bra@set{\\{\\,}{\\mid}{}{\\,\\}}");
  defineMacro("\\angln", "{\\angl n}");
  defineMacro("\\blue", "\\textcolor{##6495ed}{#1}");
  defineMacro("\\orange", "\\textcolor{##ffa500}{#1}");
  defineMacro("\\pink", "\\textcolor{##ff00af}{#1}");
  defineMacro("\\red", "\\textcolor{##df0030}{#1}");
  defineMacro("\\green", "\\textcolor{##28ae7b}{#1}");
  defineMacro("\\gray", "\\textcolor{gray}{#1}");
  defineMacro("\\purple", "\\textcolor{##9d38bd}{#1}");
  defineMacro("\\blueA", "\\textcolor{##ccfaff}{#1}");
  defineMacro("\\blueB", "\\textcolor{##80f6ff}{#1}");
  defineMacro("\\blueC", "\\textcolor{##63d9ea}{#1}");
  defineMacro("\\blueD", "\\textcolor{##11accd}{#1}");
  defineMacro("\\blueE", "\\textcolor{##0c7f99}{#1}");
  defineMacro("\\tealA", "\\textcolor{##94fff5}{#1}");
  defineMacro("\\tealB", "\\textcolor{##26edd5}{#1}");
  defineMacro("\\tealC", "\\textcolor{##01d1c1}{#1}");
  defineMacro("\\tealD", "\\textcolor{##01a995}{#1}");
  defineMacro("\\tealE", "\\textcolor{##208170}{#1}");
  defineMacro("\\greenA", "\\textcolor{##b6ffb0}{#1}");
  defineMacro("\\greenB", "\\textcolor{##8af281}{#1}");
  defineMacro("\\greenC", "\\textcolor{##74cf70}{#1}");
  defineMacro("\\greenD", "\\textcolor{##1fab54}{#1}");
  defineMacro("\\greenE", "\\textcolor{##0d923f}{#1}");
  defineMacro("\\goldA", "\\textcolor{##ffd0a9}{#1}");
  defineMacro("\\goldB", "\\textcolor{##ffbb71}{#1}");
  defineMacro("\\goldC", "\\textcolor{##ff9c39}{#1}");
  defineMacro("\\goldD", "\\textcolor{##e07d10}{#1}");
  defineMacro("\\goldE", "\\textcolor{##a75a05}{#1}");
  defineMacro("\\redA", "\\textcolor{##fca9a9}{#1}");
  defineMacro("\\redB", "\\textcolor{##ff8482}{#1}");
  defineMacro("\\redC", "\\textcolor{##f9685d}{#1}");
  defineMacro("\\redD", "\\textcolor{##e84d39}{#1}");
  defineMacro("\\redE", "\\textcolor{##bc2612}{#1}");
  defineMacro("\\maroonA", "\\textcolor{##ffbde0}{#1}");
  defineMacro("\\maroonB", "\\textcolor{##ff92c6}{#1}");
  defineMacro("\\maroonC", "\\textcolor{##ed5fa6}{#1}");
  defineMacro("\\maroonD", "\\textcolor{##ca337c}{#1}");
  defineMacro("\\maroonE", "\\textcolor{##9e034e}{#1}");
  defineMacro("\\purpleA", "\\textcolor{##ddd7ff}{#1}");
  defineMacro("\\purpleB", "\\textcolor{##c6b9fc}{#1}");
  defineMacro("\\purpleC", "\\textcolor{##aa87ff}{#1}");
  defineMacro("\\purpleD", "\\textcolor{##7854ab}{#1}");
  defineMacro("\\purpleE", "\\textcolor{##543b78}{#1}");
  defineMacro("\\mintA", "\\textcolor{##f5f9e8}{#1}");
  defineMacro("\\mintB", "\\textcolor{##edf2df}{#1}");
  defineMacro("\\mintC", "\\textcolor{##e0e5cc}{#1}");
  defineMacro("\\grayA", "\\textcolor{##f6f7f7}{#1}");
  defineMacro("\\grayB", "\\textcolor{##f0f1f2}{#1}");
  defineMacro("\\grayC", "\\textcolor{##e3e5e6}{#1}");
  defineMacro("\\grayD", "\\textcolor{##d6d8da}{#1}");
  defineMacro("\\grayE", "\\textcolor{##babec2}{#1}");
  defineMacro("\\grayF", "\\textcolor{##888d93}{#1}");
  defineMacro("\\grayG", "\\textcolor{##626569}{#1}");
  defineMacro("\\grayH", "\\textcolor{##3b3e40}{#1}");
  defineMacro("\\grayI", "\\textcolor{##21242c}{#1}");
  defineMacro("\\kaBlue", "\\textcolor{##314453}{#1}");
  defineMacro("\\kaGreen", "\\textcolor{##71B307}{#1}");
  var implicitCommands = {
    "^": true,
    // Parser.js
    "_": true,
    // Parser.js
    "\\limits": true,
    // Parser.js
    "\\nolimits": true
    // Parser.js
  };
  var MacroExpander = class {
    constructor(input, settings, mode) {
      this.settings = void 0;
      this.expansionCount = void 0;
      this.lexer = void 0;
      this.macros = void 0;
      this.stack = void 0;
      this.mode = void 0;
      this.settings = settings;
      this.expansionCount = 0;
      this.feed(input);
      this.macros = new Namespace(macros, settings.macros);
      this.mode = mode;
      this.stack = [];
    }
    /**
     * Feed a new input string to the same MacroExpander
     * (with existing macros etc.).
     */
    feed(input) {
      this.lexer = new Lexer(input, this.settings);
    }
    /**
     * Switches between "text" and "math" modes.
     */
    switchMode(newMode) {
      this.mode = newMode;
    }
    /**
     * Start a new group nesting within all namespaces.
     */
    beginGroup() {
      this.macros.beginGroup();
    }
    /**
     * End current group nesting within all namespaces.
     */
    endGroup() {
      this.macros.endGroup();
    }
    /**
     * Ends all currently nested groups (if any), restoring values before the
     * groups began.  Useful in case of an error in the middle of parsing.
     */
    endGroups() {
      this.macros.endGroups();
    }
    /**
     * Returns the topmost token on the stack, without expanding it.
     * Similar in behavior to TeX's `\futurelet`.
     */
    future() {
      if (this.stack.length === 0) {
        this.pushToken(this.lexer.lex());
      }
      return this.stack[this.stack.length - 1];
    }
    /**
     * Remove and return the next unexpanded token.
     */
    popToken() {
      this.future();
      return this.stack.pop();
    }
    /**
     * Add a given token to the token stack.  In particular, this get be used
     * to put back a token returned from one of the other methods.
     */
    pushToken(token) {
      this.stack.push(token);
    }
    /**
     * Append an array of tokens to the token stack.
     */
    pushTokens(tokens) {
      this.stack.push(...tokens);
    }
    /**
     * Find an macro argument without expanding tokens and append the array of
     * tokens to the token stack. Uses Token as a container for the result.
     */
    scanArgument(isOptional) {
      var start;
      var end;
      var tokens;
      if (isOptional) {
        this.consumeSpaces();
        if (this.future().text !== "[") {
          return null;
        }
        start = this.popToken();
        ({
          tokens,
          end
        } = this.consumeArg(["]"]));
      } else {
        ({
          tokens,
          start,
          end
        } = this.consumeArg());
      }
      this.pushToken(new Token("EOF", end.loc));
      this.pushTokens(tokens);
      return new Token("", SourceLocation.range(start, end));
    }
    /**
     * Consume all following space tokens, without expansion.
     */
    consumeSpaces() {
      for (; ; ) {
        var token = this.future();
        if (token.text === " ") {
          this.stack.pop();
        } else {
          break;
        }
      }
    }
    /**
     * Consume an argument from the token stream, and return the resulting array
     * of tokens and start/end token.
     */
    consumeArg(delims) {
      var tokens = [];
      var isDelimited = delims && delims.length > 0;
      if (!isDelimited) {
        this.consumeSpaces();
      }
      var start = this.future();
      var tok;
      var depth = 0;
      var match = 0;
      do {
        tok = this.popToken();
        tokens.push(tok);
        if (tok.text === "{") {
          ++depth;
        } else if (tok.text === "}") {
          --depth;
          if (depth === -1) {
            throw new ParseError("Extra }", tok);
          }
        } else if (tok.text === "EOF") {
          throw new ParseError("Unexpected end of input in a macro argument, expected '" + (delims && isDelimited ? delims[match] : "}") + "'", tok);
        }
        if (delims && isDelimited) {
          if ((depth === 0 || depth === 1 && delims[match] === "{") && tok.text === delims[match]) {
            ++match;
            if (match === delims.length) {
              tokens.splice(-match, match);
              break;
            }
          } else {
            match = 0;
          }
        }
      } while (depth !== 0 || isDelimited);
      if (start.text === "{" && tokens[tokens.length - 1].text === "}") {
        tokens.pop();
        tokens.shift();
      }
      tokens.reverse();
      return {
        tokens,
        start,
        end: tok
      };
    }
    /**
     * Consume the specified number of (delimited) arguments from the token
     * stream and return the resulting array of arguments.
     */
    consumeArgs(numArgs, delimiters2) {
      if (delimiters2) {
        if (delimiters2.length !== numArgs + 1) {
          throw new ParseError("The length of delimiters doesn't match the number of args!");
        }
        var delims = delimiters2[0];
        for (var i2 = 0; i2 < delims.length; i2++) {
          var tok = this.popToken();
          if (delims[i2] !== tok.text) {
            throw new ParseError("Use of the macro doesn't match its definition", tok);
          }
        }
      }
      var args = [];
      for (var _i6 = 0; _i6 < numArgs; _i6++) {
        args.push(this.consumeArg(delimiters2 && delimiters2[_i6 + 1]).tokens);
      }
      return args;
    }
    /**
     * Increment `expansionCount` by the specified amount.
     * Throw an error if it exceeds `maxExpand`.
     */
    countExpansion(amount) {
      this.expansionCount += amount;
      if (this.expansionCount > this.settings.maxExpand) {
        throw new ParseError("Too many expansions: infinite loop or need to increase maxExpand setting");
      }
    }
    /**
     * Expand the next token only once if possible.
     *
     * If the token is expanded, the resulting tokens will be pushed onto
     * the stack in reverse order, and the number of such tokens will be
     * returned.  This number might be zero or positive.
     *
     * If not, the return value is `false`, and the next token remains at the
     * top of the stack.
     *
     * In either case, the next token will be on the top of the stack,
     * or the stack will be empty (in case of empty expansion
     * and no other tokens).
     *
     * Used to implement `expandAfterFuture` and `expandNextToken`.
     *
     * If expandableOnly, only expandable tokens are expanded and
     * an undefined control sequence results in an error.
     */
    expandOnce(expandableOnly) {
      var topToken = this.popToken();
      var name = topToken.text;
      var expansion = !topToken.noexpand ? this._getExpansion(name) : null;
      if (expansion == null || expandableOnly && expansion.unexpandable) {
        if (expandableOnly && expansion == null && name[0] === "\\" && !this.isDefined(name)) {
          throw new ParseError("Undefined control sequence: " + name);
        }
        this.pushToken(topToken);
        return false;
      }
      this.countExpansion(1);
      var tokens = expansion.tokens;
      var args = this.consumeArgs(expansion.numArgs, expansion.delimiters);
      if (expansion.numArgs) {
        tokens = tokens.slice();
        for (var i2 = tokens.length - 1; i2 >= 0; --i2) {
          var tok = tokens[i2];
          if (tok.text === "#") {
            if (i2 === 0) {
              throw new ParseError("Incomplete placeholder at end of macro body", tok);
            }
            tok = tokens[--i2];
            if (tok.text === "#") {
              tokens.splice(i2 + 1, 1);
            } else if (/^[1-9]$/.test(tok.text)) {
              tokens.splice(i2, 2, ...args[+tok.text - 1]);
            } else {
              throw new ParseError("Not a valid argument number", tok);
            }
          }
        }
      }
      this.pushTokens(tokens);
      return tokens.length;
    }
    /**
     * Expand the next token only once (if possible), and return the resulting
     * top token on the stack (without removing anything from the stack).
     * Similar in behavior to TeX's `\expandafter\futurelet`.
     * Equivalent to expandOnce() followed by future().
     */
    expandAfterFuture() {
      this.expandOnce();
      return this.future();
    }
    /**
     * Recursively expand first token, then return first non-expandable token.
     */
    expandNextToken() {
      for (; ; ) {
        if (this.expandOnce() === false) {
          var token = this.stack.pop();
          if (token.treatAsRelax) {
            token.text = "\\relax";
          }
          return token;
        }
      }
      throw new Error();
    }
    /**
     * Fully expand the given macro name and return the resulting list of
     * tokens, or return `undefined` if no such macro is defined.
     */
    expandMacro(name) {
      return this.macros.has(name) ? this.expandTokens([new Token(name)]) : void 0;
    }
    /**
     * Fully expand the given token stream and return the resulting list of
     * tokens.  Note that the input tokens are in reverse order, but the
     * output tokens are in forward order.
     */
    expandTokens(tokens) {
      var output = [];
      var oldStackLength = this.stack.length;
      this.pushTokens(tokens);
      while (this.stack.length > oldStackLength) {
        if (this.expandOnce(true) === false) {
          var token = this.stack.pop();
          if (token.treatAsRelax) {
            token.noexpand = false;
            token.treatAsRelax = false;
          }
          output.push(token);
        }
      }
      this.countExpansion(output.length);
      return output;
    }
    /**
     * Fully expand the given macro name and return the result as a string,
     * or return `undefined` if no such macro is defined.
     */
    expandMacroAsText(name) {
      var tokens = this.expandMacro(name);
      if (tokens) {
        return tokens.map((token) => token.text).join("");
      } else {
        return tokens;
      }
    }
    /**
     * Returns the expanded macro as a reversed array of tokens and a macro
     * argument count.  Or returns `null` if no such macro.
     */
    _getExpansion(name) {
      var definition = this.macros.get(name);
      if (definition == null) {
        return definition;
      }
      if (name.length === 1) {
        var catcode = this.lexer.catcodes[name];
        if (catcode != null && catcode !== 13) {
          return;
        }
      }
      var expansion = typeof definition === "function" ? definition(this) : definition;
      if (typeof expansion === "string") {
        var numArgs = 0;
        if (expansion.indexOf("#") !== -1) {
          var stripped = expansion.replace(/##/g, "");
          while (stripped.indexOf("#" + (numArgs + 1)) !== -1) {
            ++numArgs;
          }
        }
        var bodyLexer = new Lexer(expansion, this.settings);
        var tokens = [];
        var tok = bodyLexer.lex();
        while (tok.text !== "EOF") {
          tokens.push(tok);
          tok = bodyLexer.lex();
        }
        tokens.reverse();
        var expanded = {
          tokens,
          numArgs
        };
        return expanded;
      }
      return expansion;
    }
    /**
     * Determine whether a command is currently "defined" (has some
     * functionality), meaning that it's a macro (in the current group),
     * a function, a symbol, or one of the special commands listed in
     * `implicitCommands`.
     */
    isDefined(name) {
      return this.macros.has(name) || functions.hasOwnProperty(name) || symbols.math.hasOwnProperty(name) || symbols.text.hasOwnProperty(name) || implicitCommands.hasOwnProperty(name);
    }
    /**
     * Determine whether a command is expandable.
     */
    isExpandable(name) {
      var macro = this.macros.get(name);
      return macro != null ? typeof macro === "string" || typeof macro === "function" || !macro.unexpandable : functions.hasOwnProperty(name) && !functions[name].primitive;
    }
  };
  var unicodeSubRegEx = /^[₊₋₌₍₎₀₁₂₃₄₅₆₇₈₉ₐₑₕᵢⱼₖₗₘₙₒₚᵣₛₜᵤᵥₓᵦᵧᵨᵩᵪ]/;
  var uSubsAndSups = Object.freeze({
    "\u208A": "+",
    "\u208B": "-",
    "\u208C": "=",
    "\u208D": "(",
    "\u208E": ")",
    "\u2080": "0",
    "\u2081": "1",
    "\u2082": "2",
    "\u2083": "3",
    "\u2084": "4",
    "\u2085": "5",
    "\u2086": "6",
    "\u2087": "7",
    "\u2088": "8",
    "\u2089": "9",
    "\u2090": "a",
    "\u2091": "e",
    "\u2095": "h",
    "\u1D62": "i",
    "\u2C7C": "j",
    "\u2096": "k",
    "\u2097": "l",
    "\u2098": "m",
    "\u2099": "n",
    "\u2092": "o",
    "\u209A": "p",
    "\u1D63": "r",
    "\u209B": "s",
    "\u209C": "t",
    "\u1D64": "u",
    "\u1D65": "v",
    "\u2093": "x",
    "\u1D66": "\u03B2",
    "\u1D67": "\u03B3",
    "\u1D68": "\u03C1",
    "\u1D69": "\u03D5",
    "\u1D6A": "\u03C7",
    "\u207A": "+",
    "\u207B": "-",
    "\u207C": "=",
    "\u207D": "(",
    "\u207E": ")",
    "\u2070": "0",
    "\xB9": "1",
    "\xB2": "2",
    "\xB3": "3",
    "\u2074": "4",
    "\u2075": "5",
    "\u2076": "6",
    "\u2077": "7",
    "\u2078": "8",
    "\u2079": "9",
    "\u1D2C": "A",
    "\u1D2E": "B",
    "\u1D30": "D",
    "\u1D31": "E",
    "\u1D33": "G",
    "\u1D34": "H",
    "\u1D35": "I",
    "\u1D36": "J",
    "\u1D37": "K",
    "\u1D38": "L",
    "\u1D39": "M",
    "\u1D3A": "N",
    "\u1D3C": "O",
    "\u1D3E": "P",
    "\u1D3F": "R",
    "\u1D40": "T",
    "\u1D41": "U",
    "\u2C7D": "V",
    "\u1D42": "W",
    "\u1D43": "a",
    "\u1D47": "b",
    "\u1D9C": "c",
    "\u1D48": "d",
    "\u1D49": "e",
    "\u1DA0": "f",
    "\u1D4D": "g",
    "\u02B0": "h",
    "\u2071": "i",
    "\u02B2": "j",
    "\u1D4F": "k",
    "\u02E1": "l",
    "\u1D50": "m",
    "\u207F": "n",
    "\u1D52": "o",
    "\u1D56": "p",
    "\u02B3": "r",
    "\u02E2": "s",
    "\u1D57": "t",
    "\u1D58": "u",
    "\u1D5B": "v",
    "\u02B7": "w",
    "\u02E3": "x",
    "\u02B8": "y",
    "\u1DBB": "z",
    "\u1D5D": "\u03B2",
    "\u1D5E": "\u03B3",
    "\u1D5F": "\u03B4",
    "\u1D60": "\u03D5",
    "\u1D61": "\u03C7",
    "\u1DBF": "\u03B8"
  });
  var unicodeAccents = {
    "\u0301": {
      "text": "\\'",
      "math": "\\acute"
    },
    "\u0300": {
      "text": "\\`",
      "math": "\\grave"
    },
    "\u0308": {
      "text": '\\"',
      "math": "\\ddot"
    },
    "\u0303": {
      "text": "\\~",
      "math": "\\tilde"
    },
    "\u0304": {
      "text": "\\=",
      "math": "\\bar"
    },
    "\u0306": {
      "text": "\\u",
      "math": "\\breve"
    },
    "\u030C": {
      "text": "\\v",
      "math": "\\check"
    },
    "\u0302": {
      "text": "\\^",
      "math": "\\hat"
    },
    "\u0307": {
      "text": "\\.",
      "math": "\\dot"
    },
    "\u030A": {
      "text": "\\r",
      "math": "\\mathring"
    },
    "\u030B": {
      "text": "\\H"
    },
    "\u0327": {
      "text": "\\c"
    }
  };
  var unicodeSymbols = {
    "\xE1": "a\u0301",
    "\xE0": "a\u0300",
    "\xE4": "a\u0308",
    "\u01DF": "a\u0308\u0304",
    "\xE3": "a\u0303",
    "\u0101": "a\u0304",
    "\u0103": "a\u0306",
    "\u1EAF": "a\u0306\u0301",
    "\u1EB1": "a\u0306\u0300",
    "\u1EB5": "a\u0306\u0303",
    "\u01CE": "a\u030C",
    "\xE2": "a\u0302",
    "\u1EA5": "a\u0302\u0301",
    "\u1EA7": "a\u0302\u0300",
    "\u1EAB": "a\u0302\u0303",
    "\u0227": "a\u0307",
    "\u01E1": "a\u0307\u0304",
    "\xE5": "a\u030A",
    "\u01FB": "a\u030A\u0301",
    "\u1E03": "b\u0307",
    "\u0107": "c\u0301",
    "\u1E09": "c\u0327\u0301",
    "\u010D": "c\u030C",
    "\u0109": "c\u0302",
    "\u010B": "c\u0307",
    "\xE7": "c\u0327",
    "\u010F": "d\u030C",
    "\u1E0B": "d\u0307",
    "\u1E11": "d\u0327",
    "\xE9": "e\u0301",
    "\xE8": "e\u0300",
    "\xEB": "e\u0308",
    "\u1EBD": "e\u0303",
    "\u0113": "e\u0304",
    "\u1E17": "e\u0304\u0301",
    "\u1E15": "e\u0304\u0300",
    "\u0115": "e\u0306",
    "\u1E1D": "e\u0327\u0306",
    "\u011B": "e\u030C",
    "\xEA": "e\u0302",
    "\u1EBF": "e\u0302\u0301",
    "\u1EC1": "e\u0302\u0300",
    "\u1EC5": "e\u0302\u0303",
    "\u0117": "e\u0307",
    "\u0229": "e\u0327",
    "\u1E1F": "f\u0307",
    "\u01F5": "g\u0301",
    "\u1E21": "g\u0304",
    "\u011F": "g\u0306",
    "\u01E7": "g\u030C",
    "\u011D": "g\u0302",
    "\u0121": "g\u0307",
    "\u0123": "g\u0327",
    "\u1E27": "h\u0308",
    "\u021F": "h\u030C",
    "\u0125": "h\u0302",
    "\u1E23": "h\u0307",
    "\u1E29": "h\u0327",
    "\xED": "i\u0301",
    "\xEC": "i\u0300",
    "\xEF": "i\u0308",
    "\u1E2F": "i\u0308\u0301",
    "\u0129": "i\u0303",
    "\u012B": "i\u0304",
    "\u012D": "i\u0306",
    "\u01D0": "i\u030C",
    "\xEE": "i\u0302",
    "\u01F0": "j\u030C",
    "\u0135": "j\u0302",
    "\u1E31": "k\u0301",
    "\u01E9": "k\u030C",
    "\u0137": "k\u0327",
    "\u013A": "l\u0301",
    "\u013E": "l\u030C",
    "\u013C": "l\u0327",
    "\u1E3F": "m\u0301",
    "\u1E41": "m\u0307",
    "\u0144": "n\u0301",
    "\u01F9": "n\u0300",
    "\xF1": "n\u0303",
    "\u0148": "n\u030C",
    "\u1E45": "n\u0307",
    "\u0146": "n\u0327",
    "\xF3": "o\u0301",
    "\xF2": "o\u0300",
    "\xF6": "o\u0308",
    "\u022B": "o\u0308\u0304",
    "\xF5": "o\u0303",
    "\u1E4D": "o\u0303\u0301",
    "\u1E4F": "o\u0303\u0308",
    "\u022D": "o\u0303\u0304",
    "\u014D": "o\u0304",
    "\u1E53": "o\u0304\u0301",
    "\u1E51": "o\u0304\u0300",
    "\u014F": "o\u0306",
    "\u01D2": "o\u030C",
    "\xF4": "o\u0302",
    "\u1ED1": "o\u0302\u0301",
    "\u1ED3": "o\u0302\u0300",
    "\u1ED7": "o\u0302\u0303",
    "\u022F": "o\u0307",
    "\u0231": "o\u0307\u0304",
    "\u0151": "o\u030B",
    "\u1E55": "p\u0301",
    "\u1E57": "p\u0307",
    "\u0155": "r\u0301",
    "\u0159": "r\u030C",
    "\u1E59": "r\u0307",
    "\u0157": "r\u0327",
    "\u015B": "s\u0301",
    "\u1E65": "s\u0301\u0307",
    "\u0161": "s\u030C",
    "\u1E67": "s\u030C\u0307",
    "\u015D": "s\u0302",
    "\u1E61": "s\u0307",
    "\u015F": "s\u0327",
    "\u1E97": "t\u0308",
    "\u0165": "t\u030C",
    "\u1E6B": "t\u0307",
    "\u0163": "t\u0327",
    "\xFA": "u\u0301",
    "\xF9": "u\u0300",
    "\xFC": "u\u0308",
    "\u01D8": "u\u0308\u0301",
    "\u01DC": "u\u0308\u0300",
    "\u01D6": "u\u0308\u0304",
    "\u01DA": "u\u0308\u030C",
    "\u0169": "u\u0303",
    "\u1E79": "u\u0303\u0301",
    "\u016B": "u\u0304",
    "\u1E7B": "u\u0304\u0308",
    "\u016D": "u\u0306",
    "\u01D4": "u\u030C",
    "\xFB": "u\u0302",
    "\u016F": "u\u030A",
    "\u0171": "u\u030B",
    "\u1E7D": "v\u0303",
    "\u1E83": "w\u0301",
    "\u1E81": "w\u0300",
    "\u1E85": "w\u0308",
    "\u0175": "w\u0302",
    "\u1E87": "w\u0307",
    "\u1E98": "w\u030A",
    "\u1E8D": "x\u0308",
    "\u1E8B": "x\u0307",
    "\xFD": "y\u0301",
    "\u1EF3": "y\u0300",
    "\xFF": "y\u0308",
    "\u1EF9": "y\u0303",
    "\u0233": "y\u0304",
    "\u0177": "y\u0302",
    "\u1E8F": "y\u0307",
    "\u1E99": "y\u030A",
    "\u017A": "z\u0301",
    "\u017E": "z\u030C",
    "\u1E91": "z\u0302",
    "\u017C": "z\u0307",
    "\xC1": "A\u0301",
    "\xC0": "A\u0300",
    "\xC4": "A\u0308",
    "\u01DE": "A\u0308\u0304",
    "\xC3": "A\u0303",
    "\u0100": "A\u0304",
    "\u0102": "A\u0306",
    "\u1EAE": "A\u0306\u0301",
    "\u1EB0": "A\u0306\u0300",
    "\u1EB4": "A\u0306\u0303",
    "\u01CD": "A\u030C",
    "\xC2": "A\u0302",
    "\u1EA4": "A\u0302\u0301",
    "\u1EA6": "A\u0302\u0300",
    "\u1EAA": "A\u0302\u0303",
    "\u0226": "A\u0307",
    "\u01E0": "A\u0307\u0304",
    "\xC5": "A\u030A",
    "\u01FA": "A\u030A\u0301",
    "\u1E02": "B\u0307",
    "\u0106": "C\u0301",
    "\u1E08": "C\u0327\u0301",
    "\u010C": "C\u030C",
    "\u0108": "C\u0302",
    "\u010A": "C\u0307",
    "\xC7": "C\u0327",
    "\u010E": "D\u030C",
    "\u1E0A": "D\u0307",
    "\u1E10": "D\u0327",
    "\xC9": "E\u0301",
    "\xC8": "E\u0300",
    "\xCB": "E\u0308",
    "\u1EBC": "E\u0303",
    "\u0112": "E\u0304",
    "\u1E16": "E\u0304\u0301",
    "\u1E14": "E\u0304\u0300",
    "\u0114": "E\u0306",
    "\u1E1C": "E\u0327\u0306",
    "\u011A": "E\u030C",
    "\xCA": "E\u0302",
    "\u1EBE": "E\u0302\u0301",
    "\u1EC0": "E\u0302\u0300",
    "\u1EC4": "E\u0302\u0303",
    "\u0116": "E\u0307",
    "\u0228": "E\u0327",
    "\u1E1E": "F\u0307",
    "\u01F4": "G\u0301",
    "\u1E20": "G\u0304",
    "\u011E": "G\u0306",
    "\u01E6": "G\u030C",
    "\u011C": "G\u0302",
    "\u0120": "G\u0307",
    "\u0122": "G\u0327",
    "\u1E26": "H\u0308",
    "\u021E": "H\u030C",
    "\u0124": "H\u0302",
    "\u1E22": "H\u0307",
    "\u1E28": "H\u0327",
    "\xCD": "I\u0301",
    "\xCC": "I\u0300",
    "\xCF": "I\u0308",
    "\u1E2E": "I\u0308\u0301",
    "\u0128": "I\u0303",
    "\u012A": "I\u0304",
    "\u012C": "I\u0306",
    "\u01CF": "I\u030C",
    "\xCE": "I\u0302",
    "\u0130": "I\u0307",
    "\u0134": "J\u0302",
    "\u1E30": "K\u0301",
    "\u01E8": "K\u030C",
    "\u0136": "K\u0327",
    "\u0139": "L\u0301",
    "\u013D": "L\u030C",
    "\u013B": "L\u0327",
    "\u1E3E": "M\u0301",
    "\u1E40": "M\u0307",
    "\u0143": "N\u0301",
    "\u01F8": "N\u0300",
    "\xD1": "N\u0303",
    "\u0147": "N\u030C",
    "\u1E44": "N\u0307",
    "\u0145": "N\u0327",
    "\xD3": "O\u0301",
    "\xD2": "O\u0300",
    "\xD6": "O\u0308",
    "\u022A": "O\u0308\u0304",
    "\xD5": "O\u0303",
    "\u1E4C": "O\u0303\u0301",
    "\u1E4E": "O\u0303\u0308",
    "\u022C": "O\u0303\u0304",
    "\u014C": "O\u0304",
    "\u1E52": "O\u0304\u0301",
    "\u1E50": "O\u0304\u0300",
    "\u014E": "O\u0306",
    "\u01D1": "O\u030C",
    "\xD4": "O\u0302",
    "\u1ED0": "O\u0302\u0301",
    "\u1ED2": "O\u0302\u0300",
    "\u1ED6": "O\u0302\u0303",
    "\u022E": "O\u0307",
    "\u0230": "O\u0307\u0304",
    "\u0150": "O\u030B",
    "\u1E54": "P\u0301",
    "\u1E56": "P\u0307",
    "\u0154": "R\u0301",
    "\u0158": "R\u030C",
    "\u1E58": "R\u0307",
    "\u0156": "R\u0327",
    "\u015A": "S\u0301",
    "\u1E64": "S\u0301\u0307",
    "\u0160": "S\u030C",
    "\u1E66": "S\u030C\u0307",
    "\u015C": "S\u0302",
    "\u1E60": "S\u0307",
    "\u015E": "S\u0327",
    "\u0164": "T\u030C",
    "\u1E6A": "T\u0307",
    "\u0162": "T\u0327",
    "\xDA": "U\u0301",
    "\xD9": "U\u0300",
    "\xDC": "U\u0308",
    "\u01D7": "U\u0308\u0301",
    "\u01DB": "U\u0308\u0300",
    "\u01D5": "U\u0308\u0304",
    "\u01D9": "U\u0308\u030C",
    "\u0168": "U\u0303",
    "\u1E78": "U\u0303\u0301",
    "\u016A": "U\u0304",
    "\u1E7A": "U\u0304\u0308",
    "\u016C": "U\u0306",
    "\u01D3": "U\u030C",
    "\xDB": "U\u0302",
    "\u016E": "U\u030A",
    "\u0170": "U\u030B",
    "\u1E7C": "V\u0303",
    "\u1E82": "W\u0301",
    "\u1E80": "W\u0300",
    "\u1E84": "W\u0308",
    "\u0174": "W\u0302",
    "\u1E86": "W\u0307",
    "\u1E8C": "X\u0308",
    "\u1E8A": "X\u0307",
    "\xDD": "Y\u0301",
    "\u1EF2": "Y\u0300",
    "\u0178": "Y\u0308",
    "\u1EF8": "Y\u0303",
    "\u0232": "Y\u0304",
    "\u0176": "Y\u0302",
    "\u1E8E": "Y\u0307",
    "\u0179": "Z\u0301",
    "\u017D": "Z\u030C",
    "\u1E90": "Z\u0302",
    "\u017B": "Z\u0307",
    "\u03AC": "\u03B1\u0301",
    "\u1F70": "\u03B1\u0300",
    "\u1FB1": "\u03B1\u0304",
    "\u1FB0": "\u03B1\u0306",
    "\u03AD": "\u03B5\u0301",
    "\u1F72": "\u03B5\u0300",
    "\u03AE": "\u03B7\u0301",
    "\u1F74": "\u03B7\u0300",
    "\u03AF": "\u03B9\u0301",
    "\u1F76": "\u03B9\u0300",
    "\u03CA": "\u03B9\u0308",
    "\u0390": "\u03B9\u0308\u0301",
    "\u1FD2": "\u03B9\u0308\u0300",
    "\u1FD1": "\u03B9\u0304",
    "\u1FD0": "\u03B9\u0306",
    "\u03CC": "\u03BF\u0301",
    "\u1F78": "\u03BF\u0300",
    "\u03CD": "\u03C5\u0301",
    "\u1F7A": "\u03C5\u0300",
    "\u03CB": "\u03C5\u0308",
    "\u03B0": "\u03C5\u0308\u0301",
    "\u1FE2": "\u03C5\u0308\u0300",
    "\u1FE1": "\u03C5\u0304",
    "\u1FE0": "\u03C5\u0306",
    "\u03CE": "\u03C9\u0301",
    "\u1F7C": "\u03C9\u0300",
    "\u038E": "\u03A5\u0301",
    "\u1FEA": "\u03A5\u0300",
    "\u03AB": "\u03A5\u0308",
    "\u1FE9": "\u03A5\u0304",
    "\u1FE8": "\u03A5\u0306",
    "\u038F": "\u03A9\u0301",
    "\u1FFA": "\u03A9\u0300"
  };
  var Parser = class _Parser {
    constructor(input, settings) {
      this.mode = void 0;
      this.gullet = void 0;
      this.settings = void 0;
      this.leftrightDepth = void 0;
      this.nextToken = void 0;
      this.mode = "math";
      this.gullet = new MacroExpander(input, settings, this.mode);
      this.settings = settings;
      this.leftrightDepth = 0;
    }
    /**
     * Checks a result to make sure it has the right type, and throws an
     * appropriate error otherwise.
     */
    expect(text2, consume) {
      if (consume === void 0) {
        consume = true;
      }
      if (this.fetch().text !== text2) {
        throw new ParseError("Expected '" + text2 + "', got '" + this.fetch().text + "'", this.fetch());
      }
      if (consume) {
        this.consume();
      }
    }
    /**
     * Discards the current lookahead token, considering it consumed.
     */
    consume() {
      this.nextToken = null;
    }
    /**
     * Return the current lookahead token, or if there isn't one (at the
     * beginning, or if the previous lookahead token was consume()d),
     * fetch the next token as the new lookahead token and return it.
     */
    fetch() {
      if (this.nextToken == null) {
        this.nextToken = this.gullet.expandNextToken();
      }
      return this.nextToken;
    }
    /**
     * Switches between "text" and "math" modes.
     */
    switchMode(newMode) {
      this.mode = newMode;
      this.gullet.switchMode(newMode);
    }
    /**
     * Main parsing function, which parses an entire input.
     */
    parse() {
      if (!this.settings.globalGroup) {
        this.gullet.beginGroup();
      }
      if (this.settings.colorIsTextColor) {
        this.gullet.macros.set("\\color", "\\textcolor");
      }
      try {
        var parse = this.parseExpression(false);
        this.expect("EOF");
        if (!this.settings.globalGroup) {
          this.gullet.endGroup();
        }
        return parse;
      } finally {
        this.gullet.endGroups();
      }
    }
    /**
     * Fully parse a separate sequence of tokens as a separate job.
     * Tokens should be specified in reverse order, as in a MacroDefinition.
     */
    subparse(tokens) {
      var oldToken = this.nextToken;
      this.consume();
      this.gullet.pushToken(new Token("}"));
      this.gullet.pushTokens(tokens);
      var parse = this.parseExpression(false);
      this.expect("}");
      this.nextToken = oldToken;
      return parse;
    }
    /**
     * Parses an "expression", which is a list of atoms.
     *
     * `breakOnInfix`: Should the parsing stop when we hit infix nodes? This
     *                 happens when functions have higher precedence han infix
     *                 nodes in implicit parses.
     *
     * `breakOnTokenText`: The text of the token that the expression should end
     *                     with, or `null` if something else should end the
     *                     expression.
     */
    parseExpression(breakOnInfix, breakOnTokenText) {
      var body = [];
      while (true) {
        if (this.mode === "math") {
          this.consumeSpaces();
        }
        var lex = this.fetch();
        if (_Parser.endOfExpression.indexOf(lex.text) !== -1) {
          break;
        }
        if (breakOnTokenText && lex.text === breakOnTokenText) {
          break;
        }
        if (breakOnInfix && functions[lex.text] && functions[lex.text].infix) {
          break;
        }
        var atom = this.parseAtom(breakOnTokenText);
        if (!atom) {
          break;
        } else if (atom.type === "internal") {
          continue;
        }
        body.push(atom);
      }
      if (this.mode === "text") {
        this.formLigatures(body);
      }
      return this.handleInfixNodes(body);
    }
    /**
     * Rewrites infix operators such as \over with corresponding commands such
     * as \frac.
     *
     * There can only be one infix operator per group.  If there's more than one
     * then the expression is ambiguous.  This can be resolved by adding {}.
     */
    handleInfixNodes(body) {
      var overIndex = -1;
      var funcName;
      for (var i2 = 0; i2 < body.length; i2++) {
        if (body[i2].type === "infix") {
          if (overIndex !== -1) {
            throw new ParseError("only one infix operator per group", body[i2].token);
          }
          overIndex = i2;
          funcName = body[i2].replaceWith;
        }
      }
      if (overIndex !== -1 && funcName) {
        var numerNode;
        var denomNode;
        var numerBody = body.slice(0, overIndex);
        var denomBody = body.slice(overIndex + 1);
        if (numerBody.length === 1 && numerBody[0].type === "ordgroup") {
          numerNode = numerBody[0];
        } else {
          numerNode = {
            type: "ordgroup",
            mode: this.mode,
            body: numerBody
          };
        }
        if (denomBody.length === 1 && denomBody[0].type === "ordgroup") {
          denomNode = denomBody[0];
        } else {
          denomNode = {
            type: "ordgroup",
            mode: this.mode,
            body: denomBody
          };
        }
        var node;
        if (funcName === "\\\\abovefrac") {
          node = this.callFunction(funcName, [numerNode, body[overIndex], denomNode], []);
        } else {
          node = this.callFunction(funcName, [numerNode, denomNode], []);
        }
        return [node];
      } else {
        return body;
      }
    }
    /**
     * Handle a subscript or superscript with nice errors.
     */
    handleSupSubscript(name) {
      var symbolToken = this.fetch();
      var symbol = symbolToken.text;
      this.consume();
      this.consumeSpaces();
      var group;
      do {
        var _group;
        group = this.parseGroup(name);
      } while (((_group = group) == null ? void 0 : _group.type) === "internal");
      if (!group) {
        throw new ParseError("Expected group after '" + symbol + "'", symbolToken);
      }
      return group;
    }
    /**
     * Converts the textual input of an unsupported command into a text node
     * contained within a color node whose color is determined by errorColor
     */
    formatUnsupportedCmd(text2) {
      var textordArray = [];
      for (var i2 = 0; i2 < text2.length; i2++) {
        textordArray.push({
          type: "textord",
          mode: "text",
          text: text2[i2]
        });
      }
      var textNode = {
        type: "text",
        mode: this.mode,
        body: textordArray
      };
      var colorNode = {
        type: "color",
        mode: this.mode,
        color: this.settings.errorColor,
        body: [textNode]
      };
      return colorNode;
    }
    /**
     * Parses a group with optional super/subscripts.
     */
    parseAtom(breakOnTokenText) {
      var base = this.parseGroup("atom", breakOnTokenText);
      if ((base == null ? void 0 : base.type) === "internal") {
        return base;
      }
      if (this.mode === "text") {
        return base;
      }
      var superscript;
      var subscript;
      while (true) {
        this.consumeSpaces();
        var lex = this.fetch();
        if (lex.text === "\\limits" || lex.text === "\\nolimits") {
          if (base && base.type === "op") {
            var limits = lex.text === "\\limits";
            base.limits = limits;
            base.alwaysHandleSupSub = true;
          } else if (base && base.type === "operatorname") {
            if (base.alwaysHandleSupSub) {
              base.limits = lex.text === "\\limits";
            }
          } else {
            throw new ParseError("Limit controls must follow a math operator", lex);
          }
          this.consume();
        } else if (lex.text === "^") {
          if (superscript) {
            throw new ParseError("Double superscript", lex);
          }
          superscript = this.handleSupSubscript("superscript");
        } else if (lex.text === "_") {
          if (subscript) {
            throw new ParseError("Double subscript", lex);
          }
          subscript = this.handleSupSubscript("subscript");
        } else if (lex.text === "'") {
          if (superscript) {
            throw new ParseError("Double superscript", lex);
          }
          var prime = {
            type: "textord",
            mode: this.mode,
            text: "\\prime"
          };
          var primes = [prime];
          this.consume();
          while (this.fetch().text === "'") {
            primes.push(prime);
            this.consume();
          }
          if (this.fetch().text === "^") {
            primes.push(this.handleSupSubscript("superscript"));
          }
          superscript = {
            type: "ordgroup",
            mode: this.mode,
            body: primes
          };
        } else if (uSubsAndSups[lex.text]) {
          var isSub = unicodeSubRegEx.test(lex.text);
          var subsupTokens = [];
          subsupTokens.push(new Token(uSubsAndSups[lex.text]));
          this.consume();
          while (true) {
            var token = this.fetch().text;
            if (!uSubsAndSups[token]) {
              break;
            }
            if (unicodeSubRegEx.test(token) !== isSub) {
              break;
            }
            subsupTokens.unshift(new Token(uSubsAndSups[token]));
            this.consume();
          }
          var body = this.subparse(subsupTokens);
          if (isSub) {
            subscript = {
              type: "ordgroup",
              mode: "math",
              body
            };
          } else {
            superscript = {
              type: "ordgroup",
              mode: "math",
              body
            };
          }
        } else {
          break;
        }
      }
      if (superscript || subscript) {
        return {
          type: "supsub",
          mode: this.mode,
          base,
          sup: superscript,
          sub: subscript
        };
      } else {
        return base;
      }
    }
    /**
     * Parses an entire function, including its base and all of its arguments.
     */
    parseFunction(breakOnTokenText, name) {
      var token = this.fetch();
      var func = token.text;
      var funcData = functions[func];
      if (!funcData) {
        return null;
      }
      this.consume();
      if (name && name !== "atom" && !funcData.allowedInArgument) {
        throw new ParseError("Got function '" + func + "' with no arguments" + (name ? " as " + name : ""), token);
      } else if (this.mode === "text" && !funcData.allowedInText) {
        throw new ParseError("Can't use function '" + func + "' in text mode", token);
      } else if (this.mode === "math" && funcData.allowedInMath === false) {
        throw new ParseError("Can't use function '" + func + "' in math mode", token);
      }
      var {
        args,
        optArgs
      } = this.parseArguments(func, funcData);
      return this.callFunction(func, args, optArgs, token, breakOnTokenText);
    }
    /**
     * Call a function handler with a suitable context and arguments.
     */
    callFunction(name, args, optArgs, token, breakOnTokenText) {
      var context = {
        funcName: name,
        parser: this,
        token,
        breakOnTokenText
      };
      var func = functions[name];
      if (func && func.handler) {
        return func.handler(context, args, optArgs);
      } else {
        throw new ParseError("No function handler for " + name);
      }
    }
    /**
     * Parses the arguments of a function or environment
     */
    parseArguments(func, funcData) {
      var totalArgs = funcData.numArgs + funcData.numOptionalArgs;
      if (totalArgs === 0) {
        return {
          args: [],
          optArgs: []
        };
      }
      var args = [];
      var optArgs = [];
      for (var i2 = 0; i2 < totalArgs; i2++) {
        var argType = funcData.argTypes && funcData.argTypes[i2];
        var isOptional = i2 < funcData.numOptionalArgs;
        if (funcData.primitive && argType == null || // \sqrt expands into primitive if optional argument doesn't exist
        funcData.type === "sqrt" && i2 === 1 && optArgs[0] == null) {
          argType = "primitive";
        }
        var arg = this.parseGroupOfType("argument to '" + func + "'", argType, isOptional);
        if (isOptional) {
          optArgs.push(arg);
        } else if (arg != null) {
          args.push(arg);
        } else {
          throw new ParseError("Null argument, please report this as a bug");
        }
      }
      return {
        args,
        optArgs
      };
    }
    /**
     * Parses a group when the mode is changing.
     */
    parseGroupOfType(name, type, optional) {
      switch (type) {
        case "color":
          return this.parseColorGroup(optional);
        case "size":
          return this.parseSizeGroup(optional);
        case "url":
          return this.parseUrlGroup(optional);
        case "math":
        case "text":
          return this.parseArgumentGroup(optional, type);
        case "hbox": {
          var group = this.parseArgumentGroup(optional, "text");
          return group != null ? {
            type: "styling",
            mode: group.mode,
            body: [group],
            style: "text"
            // simulate \textstyle
          } : null;
        }
        case "raw": {
          var token = this.parseStringGroup("raw", optional);
          return token != null ? {
            type: "raw",
            mode: "text",
            string: token.text
          } : null;
        }
        case "primitive": {
          if (optional) {
            throw new ParseError("A primitive argument cannot be optional");
          }
          var _group2 = this.parseGroup(name);
          if (_group2 == null) {
            throw new ParseError("Expected group as " + name, this.fetch());
          }
          return _group2;
        }
        case "original":
        case null:
        case void 0:
          return this.parseArgumentGroup(optional);
        default:
          throw new ParseError("Unknown group type as " + name, this.fetch());
      }
    }
    /**
     * Discard any space tokens, fetching the next non-space token.
     */
    consumeSpaces() {
      while (this.fetch().text === " ") {
        this.consume();
      }
    }
    /**
     * Parses a group, essentially returning the string formed by the
     * brace-enclosed tokens plus some position information.
     */
    parseStringGroup(modeName, optional) {
      var argToken = this.gullet.scanArgument(optional);
      if (argToken == null) {
        return null;
      }
      var str = "";
      var nextToken;
      while ((nextToken = this.fetch()).text !== "EOF") {
        str += nextToken.text;
        this.consume();
      }
      this.consume();
      argToken.text = str;
      return argToken;
    }
    /**
     * Parses a regex-delimited group: the largest sequence of tokens
     * whose concatenated strings match `regex`. Returns the string
     * formed by the tokens plus some position information.
     */
    parseRegexGroup(regex, modeName) {
      var firstToken = this.fetch();
      var lastToken = firstToken;
      var str = "";
      var nextToken;
      while ((nextToken = this.fetch()).text !== "EOF" && regex.test(str + nextToken.text)) {
        lastToken = nextToken;
        str += lastToken.text;
        this.consume();
      }
      if (str === "") {
        throw new ParseError("Invalid " + modeName + ": '" + firstToken.text + "'", firstToken);
      }
      return firstToken.range(lastToken, str);
    }
    /**
     * Parses a color description.
     */
    parseColorGroup(optional) {
      var res = this.parseStringGroup("color", optional);
      if (res == null) {
        return null;
      }
      var match = /^(#[a-f0-9]{3,4}|#[a-f0-9]{6}|#[a-f0-9]{8}|[a-f0-9]{6}|[a-z]+)$/i.exec(res.text);
      if (!match) {
        throw new ParseError("Invalid color: '" + res.text + "'", res);
      }
      var color = match[0];
      if (/^[0-9a-f]{6}$/i.test(color)) {
        color = "#" + color;
      }
      return {
        type: "color-token",
        mode: this.mode,
        color
      };
    }
    /**
     * Parses a size specification, consisting of magnitude and unit.
     */
    parseSizeGroup(optional) {
      var res;
      var isBlank = false;
      this.gullet.consumeSpaces();
      if (!optional && this.gullet.future().text !== "{") {
        res = this.parseRegexGroup(/^[-+]? *(?:$|\d+|\d+\.\d*|\.\d*) *[a-z]{0,2} *$/, "size");
      } else {
        res = this.parseStringGroup("size", optional);
      }
      if (!res) {
        return null;
      }
      if (!optional && res.text.length === 0) {
        res.text = "0pt";
        isBlank = true;
      }
      var match = /([-+]?) *(\d+(?:\.\d*)?|\.\d+) *([a-z]{2})/.exec(res.text);
      if (!match) {
        throw new ParseError("Invalid size: '" + res.text + "'", res);
      }
      var data = {
        number: +(match[1] + match[2]),
        // sign + magnitude, cast to number
        unit: match[3]
      };
      if (!validUnit(data)) {
        throw new ParseError("Invalid unit: '" + data.unit + "'", res);
      }
      return {
        type: "size",
        mode: this.mode,
        value: data,
        isBlank
      };
    }
    /**
     * Parses an URL, checking escaped letters and allowed protocols,
     * and setting the catcode of % as an active character (as in \hyperref).
     */
    parseUrlGroup(optional) {
      this.gullet.lexer.setCatcode("%", 13);
      this.gullet.lexer.setCatcode("~", 12);
      var res = this.parseStringGroup("url", optional);
      this.gullet.lexer.setCatcode("%", 14);
      this.gullet.lexer.setCatcode("~", 13);
      if (res == null) {
        return null;
      }
      var url = res.text.replace(/\\([#$%&~_^{}])/g, "$1");
      return {
        type: "url",
        mode: this.mode,
        url
      };
    }
    /**
     * Parses an argument with the mode specified.
     */
    parseArgumentGroup(optional, mode) {
      var argToken = this.gullet.scanArgument(optional);
      if (argToken == null) {
        return null;
      }
      var outerMode = this.mode;
      if (mode) {
        this.switchMode(mode);
      }
      this.gullet.beginGroup();
      var expression = this.parseExpression(false, "EOF");
      this.expect("EOF");
      this.gullet.endGroup();
      var result = {
        type: "ordgroup",
        mode: this.mode,
        loc: argToken.loc,
        body: expression
      };
      if (mode) {
        this.switchMode(outerMode);
      }
      return result;
    }
    /**
     * Parses an ordinary group, which is either a single nucleus (like "x")
     * or an expression in braces (like "{x+y}") or an implicit group, a group
     * that starts at the current position, and ends right before a higher explicit
     * group ends, or at EOF.
     */
    parseGroup(name, breakOnTokenText) {
      var firstToken = this.fetch();
      var text2 = firstToken.text;
      var result;
      if (text2 === "{" || text2 === "\\begingroup") {
        this.consume();
        var groupEnd = text2 === "{" ? "}" : "\\endgroup";
        this.gullet.beginGroup();
        var expression = this.parseExpression(false, groupEnd);
        var lastToken = this.fetch();
        this.expect(groupEnd);
        this.gullet.endGroup();
        result = {
          type: "ordgroup",
          mode: this.mode,
          loc: SourceLocation.range(firstToken, lastToken),
          body: expression,
          // A group formed by \begingroup...\endgroup is a semi-simple group
          // which doesn't affect spacing in math mode, i.e., is transparent.
          // https://tex.stackexchange.com/questions/1930/when-should-one-
          // use-begingroup-instead-of-bgroup
          semisimple: text2 === "\\begingroup" || void 0
        };
      } else {
        result = this.parseFunction(breakOnTokenText, name) || this.parseSymbol();
        if (result == null && text2[0] === "\\" && !implicitCommands.hasOwnProperty(text2)) {
          if (this.settings.throwOnError) {
            throw new ParseError("Undefined control sequence: " + text2, firstToken);
          }
          result = this.formatUnsupportedCmd(text2);
          this.consume();
        }
      }
      return result;
    }
    /**
     * Form ligature-like combinations of characters for text mode.
     * This includes inputs like "--", "---", "``" and "''".
     * The result will simply replace multiple textord nodes with a single
     * character in each value by a single textord node having multiple
     * characters in its value.  The representation is still ASCII source.
     * The group will be modified in place.
     */
    formLigatures(group) {
      var n = group.length - 1;
      for (var i2 = 0; i2 < n; ++i2) {
        var a = group[i2];
        var v = a.text;
        if (v === "-" && group[i2 + 1].text === "-") {
          if (i2 + 1 < n && group[i2 + 2].text === "-") {
            group.splice(i2, 3, {
              type: "textord",
              mode: "text",
              loc: SourceLocation.range(a, group[i2 + 2]),
              text: "---"
            });
            n -= 2;
          } else {
            group.splice(i2, 2, {
              type: "textord",
              mode: "text",
              loc: SourceLocation.range(a, group[i2 + 1]),
              text: "--"
            });
            n -= 1;
          }
        }
        if ((v === "'" || v === "`") && group[i2 + 1].text === v) {
          group.splice(i2, 2, {
            type: "textord",
            mode: "text",
            loc: SourceLocation.range(a, group[i2 + 1]),
            text: v + v
          });
          n -= 1;
        }
      }
    }
    /**
     * Parse a single symbol out of the string. Here, we handle single character
     * symbols and special functions like \verb.
     */
    parseSymbol() {
      var nucleus = this.fetch();
      var text2 = nucleus.text;
      if (/^\\verb[^a-zA-Z]/.test(text2)) {
        this.consume();
        var arg = text2.slice(5);
        var star = arg.charAt(0) === "*";
        if (star) {
          arg = arg.slice(1);
        }
        if (arg.length < 2 || arg.charAt(0) !== arg.slice(-1)) {
          throw new ParseError("\\verb assertion failed --\n                    please report what input caused this bug");
        }
        arg = arg.slice(1, -1);
        return {
          type: "verb",
          mode: "text",
          body: arg,
          star
        };
      }
      if (unicodeSymbols.hasOwnProperty(text2[0]) && !symbols[this.mode][text2[0]]) {
        if (this.settings.strict && this.mode === "math") {
          this.settings.reportNonstrict("unicodeTextInMathMode", 'Accented Unicode text character "' + text2[0] + '" used in math mode', nucleus);
        }
        text2 = unicodeSymbols[text2[0]] + text2.slice(1);
      }
      var match = combiningDiacriticalMarksEndRegex.exec(text2);
      if (match) {
        text2 = text2.substring(0, match.index);
        if (text2 === "i") {
          text2 = "\u0131";
        } else if (text2 === "j") {
          text2 = "\u0237";
        }
      }
      var symbol;
      if (symbols[this.mode][text2]) {
        if (this.settings.strict && this.mode === "math" && extraLatin.indexOf(text2) >= 0) {
          this.settings.reportNonstrict("unicodeTextInMathMode", 'Latin-1/Unicode text character "' + text2[0] + '" used in math mode', nucleus);
        }
        var group = symbols[this.mode][text2].group;
        var loc = SourceLocation.range(nucleus);
        var s;
        if (ATOMS.hasOwnProperty(group)) {
          var family = group;
          s = {
            type: "atom",
            mode: this.mode,
            family,
            loc,
            text: text2
          };
        } else {
          s = {
            type: group,
            mode: this.mode,
            loc,
            text: text2
          };
        }
        symbol = s;
      } else if (text2.charCodeAt(0) >= 128) {
        if (this.settings.strict) {
          if (!supportedCodepoint(text2.charCodeAt(0))) {
            this.settings.reportNonstrict("unknownSymbol", 'Unrecognized Unicode character "' + text2[0] + '"' + (" (" + text2.charCodeAt(0) + ")"), nucleus);
          } else if (this.mode === "math") {
            this.settings.reportNonstrict("unicodeTextInMathMode", 'Unicode text character "' + text2[0] + '" used in math mode', nucleus);
          }
        }
        symbol = {
          type: "textord",
          mode: "text",
          loc: SourceLocation.range(nucleus),
          text: text2
        };
      } else {
        return null;
      }
      this.consume();
      if (match) {
        for (var i2 = 0; i2 < match[0].length; i2++) {
          var accent2 = match[0][i2];
          if (!unicodeAccents[accent2]) {
            throw new ParseError("Unknown accent ' " + accent2 + "'", nucleus);
          }
          var command = unicodeAccents[accent2][this.mode] || unicodeAccents[accent2].text;
          if (!command) {
            throw new ParseError("Accent " + accent2 + " unsupported in " + this.mode + " mode", nucleus);
          }
          symbol = {
            type: "accent",
            mode: this.mode,
            loc: SourceLocation.range(nucleus),
            label: command,
            isStretchy: false,
            isShifty: true,
            // $FlowFixMe
            base: symbol
          };
        }
      }
      return symbol;
    }
  };
  Parser.endOfExpression = ["}", "\\endgroup", "\\end", "\\right", "&"];
  var parseTree = function parseTree2(toParse, settings) {
    if (!(typeof toParse === "string" || toParse instanceof String)) {
      throw new TypeError("KaTeX can only parse string typed expression");
    }
    var parser = new Parser(toParse, settings);
    delete parser.gullet.macros.current["\\df@tag"];
    var tree = parser.parse();
    delete parser.gullet.macros.current["\\current@color"];
    delete parser.gullet.macros.current["\\color"];
    if (parser.gullet.macros.get("\\df@tag")) {
      if (!settings.displayMode) {
        throw new ParseError("\\tag works only in display equations");
      }
      tree = [{
        type: "tag",
        mode: "text",
        body: tree,
        tag: parser.subparse([new Token("\\df@tag")])
      }];
    }
    return tree;
  };
  var render = function render2(expression, baseNode, options) {
    baseNode.textContent = "";
    var node = renderToDomTree(expression, options).toNode();
    baseNode.appendChild(node);
  };
  if (typeof document !== "undefined") {
    if (document.compatMode !== "CSS1Compat") {
      typeof console !== "undefined" && console.warn("Warning: KaTeX doesn't work in quirks mode. Make sure your website has a suitable doctype.");
      render = function render3() {
        throw new ParseError("KaTeX doesn't work in quirks mode.");
      };
    }
  }
  var renderToString = function renderToString2(expression, options) {
    var markup = renderToDomTree(expression, options).toMarkup();
    return markup;
  };
  var generateParseTree = function generateParseTree2(expression, options) {
    var settings = new Settings(options);
    return parseTree(expression, settings);
  };
  var renderError = function renderError2(error, expression, options) {
    if (options.throwOnError || !(error instanceof ParseError)) {
      throw error;
    }
    var node = buildCommon.makeSpan(["katex-error"], [new SymbolNode(expression)]);
    node.setAttribute("title", error.toString());
    node.setAttribute("style", "color:" + options.errorColor);
    return node;
  };
  var renderToDomTree = function renderToDomTree2(expression, options) {
    var settings = new Settings(options);
    try {
      var tree = parseTree(expression, settings);
      return buildTree(tree, expression, settings);
    } catch (error) {
      return renderError(error, expression, settings);
    }
  };
  var renderToHTMLTree = function renderToHTMLTree2(expression, options) {
    var settings = new Settings(options);
    try {
      var tree = parseTree(expression, settings);
      return buildHTMLTree(tree, expression, settings);
    } catch (error) {
      return renderError(error, expression, settings);
    }
  };
  var version = "0.16.25";
  var __domTree = {
    Span,
    Anchor,
    SymbolNode,
    SvgNode,
    PathNode,
    LineNode
  };
  var katex = {
    /**
     * Current KaTeX version
     */
    version,
    /**
     * Renders the given LaTeX into an HTML+MathML combination, and adds
     * it as a child to the specified DOM node.
     */
    render,
    /**
     * Renders the given LaTeX into an HTML+MathML combination string,
     * for sending to the client.
     */
    renderToString,
    /**
     * KaTeX error, usually during parsing.
     */
    ParseError,
    /**
     * The schema of Settings
     */
    SETTINGS_SCHEMA,
    /**
     * Parses the given LaTeX into KaTeX's internal parse tree structure,
     * without rendering to HTML or MathML.
     *
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __parse: generateParseTree,
    /**
     * Renders the given LaTeX into an HTML+MathML internal DOM tree
     * representation, without flattening that representation to a string.
     *
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __renderToDomTree: renderToDomTree,
    /**
     * Renders the given LaTeX into an HTML internal DOM tree representation,
     * without MathML and without flattening that representation to a string.
     *
     * NOTE: This method is not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __renderToHTMLTree: renderToHTMLTree,
    /**
     * extends internal font metrics object with a new object
     * each key in the new object represents a font name
    */
    __setFontMetrics: setFontMetrics,
    /**
     * adds a new symbol to builtin symbols table
     */
    __defineSymbol: defineSymbol,
    /**
     * adds a new function to builtin function list,
     * which directly produce parse tree elements
     * and have their own html/mathml builders
     */
    __defineFunction: defineFunction,
    /**
     * adds a new macro to builtin macro list
     */
    __defineMacro: defineMacro,
    /**
     * Expose the dom tree node types, which can be useful for type checking nodes.
     *
     * NOTE: These methods are not currently recommended for public use.
     * The internal tree representation is unstable and is very likely
     * to change. Use at your own risk.
     */
    __domTree
  };

  // src/Markdown.tsx
  function renderMath(tex, displayMode) {
    try {
      return katex.renderToString(tex, {
        displayMode,
        throwOnError: false,
        strict: false,
        output: "html"
      });
    } catch {
      return "";
    }
  }
  function Markdown({
    content,
    highlightTerms,
    streaming,
    localFileLinks
  }) {
    const blocks = useIncrementalBlocks(content, streaming);
    const caret = streaming ? /* @__PURE__ */ jsx(StreamingCaret, {}) : null;
    return /* @__PURE__ */ jsxs("div", { className: "text-sm text-foreground leading-relaxed space-y-2", children: [
      blocks.map((block, i2) => /* @__PURE__ */ jsx(
        Block,
        {
          block,
          highlightTerms,
          localFileLinks,
          caret: caret && i2 === blocks.length - 1 ? caret : null
        },
        i2
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
  function parseBlockSpans(text2) {
    const lines = text2.split("\n");
    const lineStarts = new Array(lines.length);
    let offset = 0;
    for (let k = 0; k < lines.length; k++) {
      lineStarts[k] = offset;
      offset += lines[k].length + 1;
    }
    const spans = [];
    let i2 = 0;
    while (i2 < lines.length) {
      const line = lines[i2];
      const fenceMatch = line.match(/^```(\w*)/);
      if (fenceMatch) {
        const start2 = lineStarts[i2];
        const lang = fenceMatch[1] || "";
        const codeLines = [];
        i2++;
        while (i2 < lines.length && !lines[i2].startsWith("```")) {
          codeLines.push(lines[i2]);
          i2++;
        }
        i2++;
        spans.push({
          start: start2,
          node: { type: "code", lang, content: codeLines.join("\n") }
        });
        continue;
      }
      const mathFence = line.match(/^(\$\$|\\\[)(.*)$/);
      if (mathFence) {
        const start2 = lineStarts[i2];
        const closing = mathFence[1] === "$$" ? "$$" : "\\]";
        const body = [];
        const rest = mathFence[2];
        i2++;
        const inlineClose = rest.indexOf(closing);
        if (inlineClose >= 0) {
          body.push(rest.slice(0, inlineClose));
        } else {
          if (rest.trim() !== "") body.push(rest);
          while (i2 < lines.length) {
            const c = lines[i2].indexOf(closing);
            if (c >= 0) {
              if (lines[i2].slice(0, c).trim() !== "") body.push(lines[i2].slice(0, c));
              i2++;
              break;
            }
            body.push(lines[i2]);
            i2++;
          }
        }
        spans.push({
          start: start2,
          node: { type: "math", content: body.join("\n").trim() }
        });
        continue;
      }
      const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
      if (headingMatch) {
        spans.push({
          start: lineStarts[i2],
          node: {
            type: "heading",
            level: headingMatch[1].length,
            content: headingMatch[2]
          }
        });
        i2++;
        continue;
      }
      if (/^[-*_]{3,}\s*$/.test(line)) {
        spans.push({ start: lineStarts[i2], node: { type: "hr" } });
        i2++;
        continue;
      }
      if (/^[-*+]\s/.test(line)) {
        const start2 = lineStarts[i2];
        const items = [];
        while (i2 < lines.length && /^[-*+]\s/.test(lines[i2])) {
          items.push(lines[i2].replace(/^[-*+]\s/, ""));
          i2++;
        }
        spans.push({ start: start2, node: { type: "list", ordered: false, items } });
        continue;
      }
      if (/^\d+[.)]\s/.test(line)) {
        const start2 = lineStarts[i2];
        const items = [];
        while (i2 < lines.length && /^\d+[.)]\s/.test(lines[i2])) {
          items.push(lines[i2].replace(/^\d+[.)]\s/, ""));
          i2++;
        }
        spans.push({ start: start2, node: { type: "list", ordered: true, items } });
        continue;
      }
      if (line.trim() === "") {
        i2++;
        continue;
      }
      const start = lineStarts[i2];
      const paraLines = [];
      while (i2 < lines.length && lines[i2].trim() !== "" && !lines[i2].match(/^```/) && !lines[i2].match(/^#{1,4}\s/) && !lines[i2].match(/^[-*+]\s/) && !lines[i2].match(/^\d+[.)]\s/) && !lines[i2].match(/^(\$\$|\\\[)/) && !lines[i2].match(/^[-*_]{3,}\s*$/)) {
        paraLines.push(lines[i2]);
        i2++;
      }
      if (paraLines.length > 0) {
        spans.push({
          start,
          node: { type: "paragraph", content: paraLines.join("\n") }
        });
      } else {
        spans.push({ start, node: { type: "paragraph", content: line } });
        i2++;
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
  function hasBlankLineBefore(text2, start) {
    if (start < 1 || text2[start - 1] !== "\n") return false;
    return start === 1 || text2[start - 2] === "\n";
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
      case "math": {
        const html = renderMath(block.content, true);
        return /* @__PURE__ */ jsxs(Fragment2, { children: [
          html ? /* @__PURE__ */ jsx(
            "div",
            {
              className: "overflow-x-auto py-1",
              dangerouslySetInnerHTML: { __html: html }
            }
          ) : /* @__PURE__ */ jsx("pre", { className: "bg-secondary/60 border border-border px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto", children: /* @__PURE__ */ jsx("code", { children: block.content }) }),
          caret
        ] });
      }
      case "list": {
        const Tag = block.ordered ? "ol" : "ul";
        const last = block.items.length - 1;
        return /* @__PURE__ */ jsx(
          Tag,
          {
            className: `space-y-0.5 ${block.ordered ? "list-decimal" : "list-disc"} pl-5 text-sm`,
            children: block.items.map((item, i2) => /* @__PURE__ */ jsxs("li", { children: [
              /* @__PURE__ */ jsx(
                InlineContent,
                {
                  text: item,
                  highlightTerms,
                  localFileLinks
                }
              ),
              i2 === last ? caret : null
            ] }, i2))
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
  function parseInline(text2) {
    const nodes = [];
    const pattern = /(`[^`]+`)|(\$\$[^$]+?\$\$|\\\[[^\n]+?\\\]|\\\([^\n]+?\\\)|\$[^\s$](?:[^$\n]*[^\s$])?\$(?!\d))|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\bhttps?:\/\/[^\s<>)\]]+)|(\n)/g;
    let lastIndex = 0;
    let match;
    while ((match = pattern.exec(text2)) !== null) {
      if (match.index > lastIndex) {
        nodes.push({ type: "text", content: text2.slice(lastIndex, match.index) });
      }
      if (match[1]) {
        nodes.push({ type: "code", content: match[1].slice(1, -1) });
      } else if (match[2]) {
        const raw = match[2];
        if (raw.startsWith("$$") || raw.startsWith("\\[")) {
          nodes.push({ type: "math", content: raw.slice(2, -2), display: true });
        } else if (raw.startsWith("\\(")) {
          nodes.push({ type: "math", content: raw.slice(2, -2), display: false });
        } else {
          nodes.push({ type: "math", content: raw.slice(1, -1), display: false });
        }
      } else if (match[3]) {
        nodes.push({ type: "link", text: match[4], href: match[5] });
      } else if (match[6]) {
        nodes.push({ type: "bold", content: match[7] });
      } else if (match[8]) {
        nodes.push({ type: "italic", content: match[9] });
      } else if (match[10]) {
        nodes.push({ type: "link", text: match[10], href: match[10] });
      } else if (match[11]) {
        nodes.push({ type: "br" });
      }
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text2.length) {
      nodes.push({ type: "text", content: text2.slice(lastIndex) });
    }
    return nodes;
  }
  function InlineContent({
    text: text2,
    highlightTerms,
    localFileLinks
  }) {
    const nodes = useMemo(() => parseInline(text2), [text2]);
    return /* @__PURE__ */ jsx(Fragment2, { children: nodes.map((node, i2) => {
      switch (node.type) {
        case "text":
          return /* @__PURE__ */ jsx(
            HighlightedText,
            {
              text: node.content,
              terms: highlightTerms
            },
            i2
          );
        case "code":
          return /* @__PURE__ */ jsx(
            "code",
            {
              className: "bg-secondary/60 px-1.5 py-0.5 text-xs font-mono text-primary/90",
              children: node.content
            },
            i2
          );
        case "bold":
          return /* @__PURE__ */ jsx("strong", { className: "font-semibold", children: /* @__PURE__ */ jsx(HighlightedText, { text: node.content, terms: highlightTerms }) }, i2);
        case "italic":
          return /* @__PURE__ */ jsx("em", { children: /* @__PURE__ */ jsx(HighlightedText, { text: node.content, terms: highlightTerms }) }, i2);
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
              i2
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
              i2
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
            i2
          );
        }
        case "math": {
          const html = renderMath(node.content, node.display);
          if (!html) {
            return /* @__PURE__ */ jsx(
              "code",
              {
                className: "bg-secondary/60 px-1.5 py-0.5 text-xs font-mono text-primary/90",
                children: node.content
              },
              i2
            );
          }
          return node.display ? /* @__PURE__ */ jsx(
            "span",
            {
              className: "block overflow-x-auto py-1",
              dangerouslySetInnerHTML: { __html: html }
            },
            i2
          ) : /* @__PURE__ */ jsx("span", { dangerouslySetInnerHTML: { __html: html } }, i2);
        }
        case "br":
          return /* @__PURE__ */ jsx("br", {}, i2);
      }
    }) });
  }
  function HighlightedText({ text: text2, terms }) {
    if (!terms || terms.length === 0) return /* @__PURE__ */ jsx(Fragment2, { children: text2 });
    const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
    const regex = new RegExp(`(${escaped.join("|")})`, "gi");
    const parts = text2.split(regex);
    return /* @__PURE__ */ jsx(Fragment2, { children: parts.map(
      (part, i2) => regex.test(part) ? /* @__PURE__ */ jsx("mark", { className: "bg-warning/30 text-warning px-0.5", children: part }, i2) : /* @__PURE__ */ jsx("span", { children: part }, i2)
    ) });
  }

  // src/chat/MediaInline.tsx
  function fileName(path2) {
    return path2.split("/").filter(Boolean).pop() ?? path2;
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
  function fileName2(path2) {
    return path2.split("/").filter(Boolean).pop() ?? path2;
  }
  function extOf(path2) {
    const name = fileName2(path2);
    const dot = name.lastIndexOf(".");
    return dot > 0 ? name.slice(dot + 1).toLowerCase() : "";
  }
  function dataUrlToText(dataUrl) {
    const comma = dataUrl.indexOf(",");
    const b64 = comma >= 0 ? dataUrl.slice(comma + 1) : dataUrl;
    const bin2 = atob(b64);
    const bytes = new Uint8Array(bin2.length);
    for (let i2 = 0; i2 < bin2.length; i2++) bytes[i2] = bin2.charCodeAt(i2);
    return new TextDecoder("utf-8").decode(bytes);
  }
  function PreviewModal({
    path: path2,
    text: text2,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u9884\u89C8 ${fileName2(path2)}`,
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
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path2) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path2 })
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
              /* @__PURE__ */ jsx("pre", { className: "min-h-0 flex-1 overflow-auto px-4 py-3 font-mono-ui text-xs leading-relaxed whitespace-pre-wrap wrap-break-word text-text-secondary", children: text2 })
            ]
          }
        )
      }
    );
  }
  function PdfPreviewModal({
    src,
    path: path2,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u9884\u89C8 ${fileName2(path2)}`,
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
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path2) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path2 })
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
                  title: fileName2(path2),
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
    path: path2,
    onClose
  }) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        role: "dialog",
        "aria-label": `\u64AD\u653E ${fileName2(path2)}`,
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
                  /* @__PURE__ */ jsx("div", { className: "truncate text-sm font-medium", children: fileName2(path2) }),
                  /* @__PURE__ */ jsx("div", { className: "truncate text-[0.625rem] text-text-tertiary", children: path2 })
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
    const open2 = useCallback(async (path2) => {
      const name = fileName2(path2);
      const mediaKind = mediaKindForPath(path2);
      if (mediaKind === "image") {
        const src = await resolveImageUrl(path2);
        setImagePreview({ src, alt: name });
        return;
      }
      if (extOf(path2) === "pdf") {
        const src = await fetchFileBlobUrl(path2);
        setPdfPreview({ src, path: path2 });
        return;
      }
      if (mediaKind === "audio") {
        const src = await fetchFileBlobUrl(path2);
        setAudioPreview({ src, path: path2 });
        return;
      }
      if (TEXT_EXTS.has(extOf(path2))) {
        const res = await api.readFile(path2);
        if (res.size > PREVIEW_MAX_BYTES) {
          await downloadFile(path2, name);
          return;
        }
        setTextPreview({ path: path2, text: dataUrlToText(res.data_url) });
        return;
      }
      try {
        await openInSystemApp(path2);
      } catch {
        await downloadFile(path2, name);
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
    return { open: open2, modal };
  }
  function FileChip2({ path: path2 }) {
    const [missing, setMissing] = useState(false);
    const [busy, setBusy] = useState(false);
    const { open: open2, modal } = useFileOpener();
    const name = fileName2(path2);
    const mediaKind = mediaKindForPath(path2);
    const isImage = mediaKind === "image";
    const isAudio = mediaKind === "audio";
    const previewable = isImage || isAudio || extOf(path2) === "pdf" || TEXT_EXTS.has(extOf(path2));
    const handleClick = () => {
      if (missing || busy) return;
      setBusy(true);
      open2(path2).catch(() => setMissing(true)).finally(() => setBusy(false));
    };
    const Icon2 = isImage ? Image : isAudio ? Music : previewable ? FileText : File2;
    return /* @__PURE__ */ jsxs(Fragment2, { children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: handleClick,
          disabled: missing,
          title: missing ? "\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u65E0\u6CD5\u8BBF\u95EE" : path2,
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
    text: text2,
    streaming
  }) {
    const [open2, setOpen] = useState(false);
    const bodyRef = useRef(null);
    useEffect(() => {
      const el = bodyRef.current;
      if (el && streaming && open2) el.scrollTop = el.scrollHeight;
    }, [text2, streaming, open2]);
    if (!text2.trim()) return null;
    return /* @__PURE__ */ jsxs("div", { className: "rounded-md border border-current/10 bg-muted/40 text-xs", children: [
      /* @__PURE__ */ jsxs(
        "button",
        {
          type: "button",
          onClick: () => setOpen(!open2),
          "aria-expanded": open2,
          className: cn(
            "flex w-full items-center gap-1.5 px-2.5 py-1.5",
            "text-text-tertiary hover:text-text-secondary",
            "cursor-pointer transition-colors"
          ),
          children: [
            open2 ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0" }),
            /* @__PURE__ */ jsx("span", { children: streaming ? "\u6B63\u5728\u601D\u8003\u2026" : "\u601D\u8003\u8FC7\u7A0B" }),
            streaming && /* @__PURE__ */ jsx("span", { className: "ml-1 inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-text-tertiary" })
          ]
        }
      ),
      open2 && /* @__PURE__ */ jsx(
        "div",
        {
          ref: bodyRef,
          className: "max-h-64 overflow-y-auto border-t border-current/10 px-2.5 py-2 whitespace-pre-wrap text-text-secondary",
          children: text2
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
  function Truncated({ text: text2, label }) {
    const [expanded, setExpanded] = useState(false);
    const long = text2.length > TRUNCATE_AT;
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
          children: expanded || !long ? text2 : `${text2.slice(0, TRUNCATE_AT)}\u2026`
        }
      ),
      long && /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          onClick: () => setExpanded((e) => !e),
          className: "mt-0.5 cursor-pointer text-[0.625rem] text-primary hover:underline",
          children: expanded ? "\u6536\u8D77" : `\u5C55\u5F00\u5168\u90E8\uFF08${text2.length} \u5B57\u7B26\uFF09`
        }
      )
    ] });
  }
  function ToolCard({ msg, nested = false }) {
    const [open2, setOpen] = useState(false);
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
      // gap 0.5rem); dropped on narrow screens where space is scarce, and in
      // nested mode (inside ToolRunGroup) where the group owns the alignment.
      /* @__PURE__ */ jsx("div", { className: cn("flex justify-start", !nested && "px-2 sm:ml-10"), children: /* @__PURE__ */ jsxs(
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
                  hasBody ? open2 ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx("span", { className: "w-3 shrink-0" }),
                  /* @__PURE__ */ jsx(Wrench, { className: "h-3.5 w-3.5 shrink-0 text-warning" }),
                  /* @__PURE__ */ jsx("span", { className: "shrink-0 font-medium text-primary", children: msg.toolName ?? "tool" }),
                  msg.toolContext && /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-text-tertiary", children: msg.toolContext }),
                  /* @__PURE__ */ jsx("span", { className: "ml-auto shrink-0", children: status })
                ]
              }
            ),
            open2 && hasBody && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-2 border-t border-current/10 px-2.5 py-2", children: [
              argsText && /* @__PURE__ */ jsx(Truncated, { text: argsText, label: "\u53C2\u6570" }),
              resultText && /* @__PURE__ */ jsx(Truncated, { text: resultText, label: "\u7ED3\u679C" }),
              media.map((m, i2) => /* @__PURE__ */ jsx(MediaInline, { media: m }, i2)),
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

  // src/chat/SubagentBlock.tsx
  var SUMMARY_TRUNCATE_AT = 500;
  function statusOf(msg) {
    if (msg.subagentRunning) {
      const n = msg.subagentToolCount;
      return { kind: "running", label: n ? `\u6267\u884C\u4E2D \xB7 ${n} \u6B21\u5DE5\u5177` : "\u6267\u884C\u4E2D" };
    }
    const s = (msg.subagentStatus ?? "").toLowerCase();
    const dur = msg.subagentDuration != null ? ` ${formatDuration(msg.subagentDuration)}` : "";
    if (/error|fail|exception/.test(s)) return { kind: "error", label: `\u51FA\u9519${dur}` };
    if (/interrupt|cancel|abort|timeout/.test(s))
      return { kind: "interrupted", label: `\u4E2D\u65AD${dur}` };
    return { kind: "done", label: `\u5B8C\u6210${dur}` };
  }
  function SubagentBlock({ msg }) {
    const [expanded, setExpanded] = useState(false);
    const [fullSummary, setFullSummary] = useState(false);
    const feedRef = useRef(null);
    const activity = useMemo(() => msg.subagentActivity ?? [], [msg.subagentActivity]);
    const status = statusOf(msg);
    const running = status.kind === "running";
    const showFeed = running || expanded;
    useEffect(() => {
      const el = feedRef.current;
      if (showFeed && el) el.scrollTop = el.scrollHeight;
    }, [showFeed, activity.length, msg.subagentThinking]);
    const summary = msg.subagentSummary ?? "";
    const summaryLong = summary.length > SUMMARY_TRUNCATE_AT;
    return /* @__PURE__ */ jsx("div", { className: "flex justify-start px-2 sm:ml-10", children: /* @__PURE__ */ jsxs(
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
              onClick: () => setExpanded((e) => !e),
              className: "flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5 text-left",
              children: [
                expanded ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0 text-text-tertiary" }),
                /* @__PURE__ */ jsx(Bot, { className: "h-3.5 w-3.5 shrink-0 text-primary" }),
                /* @__PURE__ */ jsx("span", { className: "shrink-0 font-medium text-primary", children: "\u5B50\u4EE3\u7406" }),
                msg.subagentGoal && /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-text-tertiary", children: msg.subagentGoal }),
                /* @__PURE__ */ jsxs(
                  "span",
                  {
                    className: cn(
                      "ml-auto flex shrink-0 items-center gap-1",
                      status.kind === "running" && "text-warning",
                      status.kind === "error" && "text-destructive",
                      status.kind === "interrupted" && "text-text-tertiary",
                      status.kind === "done" && "text-success"
                    ),
                    children: [
                      status.kind === "running" && /* @__PURE__ */ jsx(Spinner, {}),
                      status.kind === "error" && /* @__PURE__ */ jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
                      status.kind === "interrupted" && /* @__PURE__ */ jsx(CircleOff, { className: "h-3.5 w-3.5" }),
                      status.kind === "done" && /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
                      status.label
                    ]
                  }
                )
              ]
            }
          ),
          showFeed && /* @__PURE__ */ jsxs(
            "div",
            {
              ref: feedRef,
              className: cn(
                "max-h-36 overflow-y-auto border-t border-current/10 px-2.5 py-1.5",
                "flex flex-col gap-0.5 font-mono-ui text-[0.6875rem] leading-relaxed"
              ),
              children: [
                activity.length === 0 && !msg.subagentThinking && /* @__PURE__ */ jsx("span", { className: "text-text-tertiary", children: "\u542F\u52A8\u4E2D\u2026" }),
                activity.map(
                  (item, i2) => item.kind === "tool" ? /* @__PURE__ */ jsxs("span", { className: "flex items-baseline gap-1.5 text-text-secondary", children: [
                    /* @__PURE__ */ jsx(Wrench, { className: "h-2.5 w-2.5 shrink-0 translate-y-px text-warning" }),
                    /* @__PURE__ */ jsx("span", { className: "min-w-0 truncate", children: item.text })
                  ] }, i2) : /* @__PURE__ */ jsx("span", { className: "truncate text-text-tertiary italic", children: item.text }, i2)
                ),
                msg.subagentThinking && /* @__PURE__ */ jsxs("span", { className: "truncate text-text-tertiary", children: [
                  "\u{1F4AD} ",
                  msg.subagentThinking
                ] })
              ]
            }
          ),
          !running && summary && /* @__PURE__ */ jsxs("div", { className: "border-t border-current/10 px-2.5 py-1.5", children: [
            /* @__PURE__ */ jsx("div", { className: "text-xs leading-relaxed whitespace-pre-wrap wrap-break-word text-text-secondary", children: fullSummary || !summaryLong ? summary : `${summary.slice(0, SUMMARY_TRUNCATE_AT)}\u2026` }),
            summaryLong && /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                onClick: () => setFullSummary((e) => !e),
                className: "mt-0.5 cursor-pointer text-[0.625rem] text-primary hover:underline",
                children: fullSummary ? "\u6536\u8D77" : `\u5C55\u5F00\u5168\u90E8\uFF08${summary.length} \u5B57\u7B26\uFF09`
              }
            )
          ] })
        ]
      }
    ) });
  }

  // src/chat/MessageBubble.tsx
  var actionButtonClass = cn(
    "shrink-0 cursor-pointer self-end rounded p-1",
    "text-text-tertiary hover:text-text-secondary hover:bg-midground/10",
    "opacity-0 transition-opacity group-hover/bubble:opacity-100",
    "focus-visible:opacity-100 focus-visible:outline-none"
  );
  function CopyButton({ text: text2 }) {
    const [copied, setCopied] = useState(false);
    if (!text2) return null;
    const copy = () => {
      navigator.clipboard.writeText(text2).then(() => {
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
    const { text: text2, media } = useMemo(() => extractMediaFromText(msg.text), [msg.text]);
    const filePaths = useMemo(() => extractFilePaths(text2), [text2]);
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
    if (msg.role === "subagent") {
      return /* @__PURE__ */ jsx(SubagentBlock, { msg });
    }
    const isUser = msg.role === "user";
    const allMedia = historyImages.concat(media);
    const mediaPaths = [
      ...new Set(allMedia.map((m) => m.path).filter((p) => Boolean(p)))
    ];
    const chipPaths = mediaPaths.concat(filePaths);
    const showText = text2.length > 0 || msg.streaming === true;
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
                    children: isUser ? /* @__PURE__ */ jsx("div", { className: "text-sm leading-relaxed whitespace-pre-wrap wrap-break-word", children: text2 }) : /* @__PURE__ */ jsx(Markdown, { content: text2, streaming: msg.streaming, localFileLinks: true })
                  }
                ),
                !isUser && msg.reasoning && /* @__PURE__ */ jsx(ReasoningBlock, { text: msg.reasoning, streaming: msg.streaming }),
                allMedia.map((m, i2) => /* @__PURE__ */ jsx(MediaInline, { media: m }, m.path ?? `img-${i2}`)),
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

  // src/chat/ToolRunGroup.tsx
  var MAX_NAMES = 3;
  function ToolRunGroup({ msgs }) {
    const [open2, setOpen] = useState(false);
    const summary = useMemo(() => {
      const counts = /* @__PURE__ */ new Map();
      let duration = 0;
      let hasDuration = false;
      let errors = 0;
      let running = null;
      for (const m of msgs) {
        const name = m.toolName ?? "tool";
        counts.set(name, (counts.get(name) ?? 0) + 1);
        if (m.toolDuration != null) {
          duration += m.toolDuration;
          hasDuration = true;
        }
        if (m.toolError) errors += 1;
        if (m.toolRunning) running = m;
      }
      return { counts, duration, hasDuration, errors, running };
    }, [msgs]);
    const namesText = useMemo(() => {
      const parts = [...summary.counts.entries()].map(
        ([name, n]) => n > 1 ? `${name}\xD7${n}` : name
      );
      if (parts.length <= MAX_NAMES) return parts.join(" \xB7 ");
      const head = parts.slice(0, MAX_NAMES).join(" \xB7 ");
      return `${head} \xB7 \u7B49 ${summary.counts.size} \u79CD`;
    }, [summary.counts]);
    const status = summary.running ? /* @__PURE__ */ jsxs("span", { className: "flex min-w-0 items-center gap-1 text-warning", children: [
      /* @__PURE__ */ jsx(Spinner, {}),
      /* @__PURE__ */ jsxs("span", { className: "truncate", children: [
        "\u6267\u884C\u4E2D ",
        summary.running.toolName ?? "tool",
        summary.running.toolContext ? ` ${summary.running.toolContext}` : "",
        "\u2026"
      ] })
    ] }) : summary.errors > 0 ? /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-1 text-destructive", children: [
      /* @__PURE__ */ jsx(CircleAlert, { className: "h-3.5 w-3.5" }),
      summary.errors,
      " \u51FA\u9519"
    ] }) : /* @__PURE__ */ jsxs("span", { className: "flex shrink-0 items-center gap-1 text-success", children: [
      /* @__PURE__ */ jsx(Check, { className: "h-3.5 w-3.5" }),
      "\u5B8C\u6210",
      summary.hasDuration ? ` ${formatDuration(summary.duration)}` : ""
    ] });
    return (
      // Same outer alignment as a standalone ToolCard (it owns the ml itself,
      // so expanded children render nested without re-indenting).
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
                onClick: () => setOpen((o) => !o),
                className: "flex w-full cursor-pointer items-center gap-2 px-2.5 py-1.5 text-left",
                children: [
                  open2 ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0 text-text-tertiary" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0 text-text-tertiary" }),
                  /* @__PURE__ */ jsx(Wrench, { className: "h-3.5 w-3.5 shrink-0 text-warning" }),
                  /* @__PURE__ */ jsxs("span", { className: "shrink-0 font-medium text-primary", children: [
                    msgs.length,
                    " \u6B21\u5DE5\u5177\u8C03\u7528"
                  ] }),
                  /* @__PURE__ */ jsx("span", { className: "min-w-0 flex-1 truncate text-text-tertiary", children: namesText }),
                  /* @__PURE__ */ jsx("span", { className: "ml-auto flex min-w-0 shrink-0", children: status })
                ]
              }
            ),
            open2 && /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-1.5 border-t border-current/10 px-1.5 py-1.5", children: msgs.map((m) => /* @__PURE__ */ jsx(ToolCard, { msg: m, nested: true }, m.id)) })
          ]
        }
      ) })
    );
  }

  // src/chat/MessageList.tsx
  var AT_BOTTOM_THRESHOLD = 80;
  var RENDER_WINDOW = 50;
  function groupToolRuns(messages) {
    const out = [];
    let run = [];
    const flush = () => {
      if (run.length === 0) return;
      if (run.length === 1) out.push({ kind: "msg", msg: run[0] });
      else out.push({ kind: "tools", key: run[0].id, msgs: run });
      run = [];
    };
    for (const m of messages) {
      if (m.role === "tool") {
        run.push(m);
      } else {
        flush();
        out.push({ kind: "msg", msg: m });
      }
    }
    flush();
    return out;
  }
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
      for (let i2 = messages.length - 1; i2 >= 0; i2--) {
        if (messages[i2].role === "assistant") return messages[i2].id;
      }
      return null;
    }, [messages]);
    const [windowSize, setWindowSize] = useState(RENDER_WINDOW);
    const hiddenCount = Math.max(0, messages.length - windowSize);
    const visibleMessages = hiddenCount > 0 ? messages.slice(hiddenCount) : messages;
    const entries = useMemo(() => groupToolRuns(visibleMessages), [visibleMessages]);
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
            entries.map(
              (entry) => entry.kind === "tools" ? /* @__PURE__ */ jsx(ToolRunGroup, { msgs: entry.msgs }, entry.key) : /* @__PURE__ */ jsx(
                MessageBubble,
                {
                  msg: entry.msg,
                  agentAvatarUrl,
                  onRetry: onRetry && (entry.msg.role === "user" || entry.msg.id === lastAssistantId) ? onRetry : void 0,
                  onEdit: onEdit && entry.msg.role === "user" ? onEdit : void 0
                },
                entry.msg.id
              )
            )
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
      const text2 = custom.trim();
      if (!text2 || busy) return;
      onClarify(text2);
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
    const [open2, setOpen] = useState(false);
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
              "aria-expanded": open2,
              className: cn(
                "flex w-full cursor-pointer items-center gap-1.5 px-2.5 py-1.5",
                "text-text-tertiary hover:text-text-secondary transition-colors"
              ),
              children: [
                open2 ? /* @__PURE__ */ jsx(ChevronDown, { className: "h-3 w-3 shrink-0" }) : /* @__PURE__ */ jsx(ChevronRight, { className: "h-3 w-3 shrink-0" }),
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
          open2 && /* @__PURE__ */ jsx("ul", { className: "max-h-40 space-y-1 overflow-y-auto border-t border-current/10 px-2.5 py-2", children: sorted.map((t) => /* @__PURE__ */ jsxs("li", { className: "flex items-start gap-1.5", children: [
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
    cron: "\u23F0",
    call_role: "\u{1F4DE}"
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
    const [tab, setTab] = useState("chat");
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
        manageable ? tab === "cron" ? { source: "cron" } : tab === "callRole" ? { source: "call_role" } : { excludeSources: "cron,call_role" } : void 0
      ).then((res) => {
        if (reqRef.current !== myReq) return;
        setSessions(res.sessions);
      }).catch((e) => {
        if (reqRef.current !== myReq) return;
        setError(e.message || "failed to load sessions");
      }).finally(() => {
        if (reqRef.current === myReq) setLoading(false);
      });
    }, [scopeKey, manageable, tab]);
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
        (r) => tab === "cron" ? r.source === "cron" : tab === "callRole" ? r.source === "call_role" : r.source !== "cron" && r.source !== "call_role"
      );
    }, [manageable, searchResults, tab]);
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
        return /* @__PURE__ */ jsx("div", { className: "flex flex-col gap-0.5", children: visibleSearchResults.map((r, i2) => /* @__PURE__ */ jsxs(
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
          `${r.session_id}-${i2}`
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
                { key: "chat", label: "\u5BF9\u8BDD", icon: MessageSquare },
                { key: "cron", label: "\u5B9A\u65F6", icon: Timer },
                { key: "callRole", label: "\u8C03\u7528", icon: PhoneCall }
              ].map(({ key, label, icon: Icon2 }) => /* @__PURE__ */ jsxs(
                "button",
                {
                  type: "button",
                  role: "tab",
                  "aria-selected": tab === key,
                  onClick: () => {
                    if (tab === key) return;
                    exitSelectMode();
                    setTab(key);
                  },
                  className: cn(
                    "flex flex-1 cursor-pointer items-center justify-center gap-1 py-1.5",
                    "first:rounded-l-[0.45rem] last:rounded-r-[0.45rem]",
                    tab === key ? "bg-primary/10 text-foreground" : "text-text-secondary hover:bg-midground/5 hover:text-foreground"
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
        const open2 = openName === f.name;
        return /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onClick: () => toggle(f.name),
              "aria-expanded": open2,
              className: "flex w-full cursor-pointer items-center gap-1.5 rounded px-1 py-1 text-xs text-text-secondary hover:text-foreground",
              children: [
                /* @__PURE__ */ jsx(
                  ChevronDown,
                  {
                    className: cn(
                      "h-3 w-3 shrink-0 transition-transform",
                      !open2 && "-rotate-90"
                    )
                  }
                ),
                /* @__PURE__ */ jsx("span", { className: "font-mono", children: f.name }),
                !f.exists && /* @__PURE__ */ jsx("span", { className: "rounded bg-midground/10 px-1 py-px text-[0.625rem] text-text-tertiary", children: "\u672A\u521B\u5EFA" })
              ]
            }
          ),
          open2 && editor && editor.name === f.name && /* @__PURE__ */ jsxs("div", { className: "flex flex-col gap-1.5 px-1 pb-1.5", children: [
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
    open: open2,
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
            "aria-expanded": open2,
            className: "flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 rounded px-1 py-0.5 text-xs font-medium text-text-secondary hover:text-foreground",
            children: [
              /* @__PURE__ */ jsx(
                ChevronDown,
                {
                  className: cn(
                    "h-3 w-3 shrink-0 transition-transform",
                    !open2 && "-rotate-90"
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
      open2 && /* @__PURE__ */ jsx("div", { className: "pt-1.5", children })
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
      const open2 = !promptOpen;
      setPromptOpen(open2);
      if (open2 && !promptLoadedRef.current) {
        promptLoadedRef.current = true;
        fetchRolePrompt(role).then((res) => setPrompt({ text: res.content, dirty: false })).catch((e) => setPromptError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
      }
    }, [promptOpen, role]);
    const toggleSkills = useCallback(() => {
      const open2 = !skillsOpen;
      setSkillsOpen(open2);
      if (open2 && !skillsLoadedRef.current) {
        skillsLoadedRef.current = true;
        fetchRoleSkills(role).then((payload) => {
          setSkills(payload);
          setSkillsText(payload.content ?? payload.enabled.join("\n"));
          setSkillsUnmatched(payload.unmatched ?? []);
        }).catch((e) => setSkillsError(e.message || "\u8BFB\u53D6\u5931\u8D25"));
      }
    }, [skillsOpen, role]);
    const toggleMemory = useCallback(() => {
      const open2 = !memoryOpen;
      setMemoryOpen(open2);
      if (open2 && !memoryLoadedRef.current) {
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
      bubbleChatStore.getModelOptions(profileId).then((payload) => {
        if (live && payload) setModelOptions(payload);
      });
      return () => {
        live = false;
      };
    }, [profileId]);
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
              bubbleChatStore.getModelOptions(profileId).then((p) => p && setModelOptions(p));
            }
          },
          "aria-label": "\u65B0\u5BF9\u8BDD\u6A21\u578B",
          title: "\u65B0\u5BF9\u8BDD\u4F7F\u7528\u7684\u6A21\u578B\uFF08\u9ED8\u8BA4 = \u5F53\u524D\u914D\u7F6E\uFF09",
          className: cn(
            "w-full rounded-lg border border-current/15 bg-background-base",
            "px-2.5 py-1.5 text-xs text-text-secondary focus:border-current/30 focus:outline-none"
          ),
          children: [
            /* @__PURE__ */ jsxs("option", { value: "", children: [
              "\u6A21\u578B\uFF1A\u9ED8\u8BA4\uFF08",
              info?.model || modelOptions?.model || "\u5F53\u524D\u914D\u7F6E",
              "\uFF09"
            ] }),
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
      (text2, images) => bubbleChatStore.send(text2, images, { onNew: startNewChat, onPrefill }),
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
            /* @__PURE__ */ jsxs("span", { className: "ml-auto flex items-center gap-1", children: [
              /* @__PURE__ */ jsx(ChatModelBadge, {}),
              /* @__PURE__ */ jsx(ChatBackgroundPicker, { bg: chatBg, profile: scopedProfile, avatar: agentAvatar })
            ] })
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
lucide-react/dist/esm/icons/circle-off.js:
lucide-react/dist/esm/icons/circle-question-mark.js:
lucide-react/dist/esm/icons/circle-slash.js:
lucide-react/dist/esm/icons/circle.js:
lucide-react/dist/esm/icons/copy.js:
lucide-react/dist/esm/icons/cpu.js:
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
lucide-react/dist/esm/icons/phone-call.js:
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
