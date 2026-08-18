/**
 * Hermes Library (资料馆) — dashboard plugin entry.
 *
 * Bundled to dist/index.js (IIFE) by build.mjs. React and the fetch/api
 * helpers come from the host via window.__HERMES_PLUGIN_SDK__ (react and
 * the JSX runtime reach the sources through esbuild aliases to src/shims/).
 */
import LibraryPage from "./LibraryPage";

const registry = window.__HERMES_PLUGINS__;
if (!registry) {
  console.warn("[library] plugin registry is not available — not registering");
} else {
  registry.register("library", LibraryPage);
}
