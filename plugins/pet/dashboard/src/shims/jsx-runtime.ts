/**
 * Build-time shim for the automatic JSX runtime (esbuild ``jsx: automatic``
 * emits ``react/jsx-runtime`` imports). Delegates to the host React's
 * createElement — ``key`` arrives as the third argument and is folded into
 * the config object, which createElement extracts as usual.
 */
const React = (window as any).__HERMES_PLUGIN_SDK__?.React;

export const Fragment = React.Fragment;

export function jsx(type: any, props: any, key?: unknown) {
  return key === undefined || key === null
    ? React.createElement(type, props)
    : React.createElement(type, { ...props, key });
}

export const jsxs = jsx;
