/**
 * Build script for the bubble-chat dashboard plugin.
 *
 *   node build.mjs        (or ./build.sh)
 *
 * No npm install: everything resolves from the repo's existing node_modules
 * (esbuild at the repo root, tailwindcss v4 under web/). Outputs:
 *   dist/index.js   IIFE bundle; `react` / `react/jsx-runtime` are aliased
 *                   to shims that delegate to window.__HERMES_PLUGIN_SDK__,
 *                   lucide-react and @hermes/shared are bundled from the
 *                   repo's node_modules.
 *   dist/style.css  Tailwind v4 utilities for the classes used in src/.
 */
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dashboardDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dashboardDir, "..", "..", "..");
const repoRequire = createRequire(path.join(repoRoot, "package.json"));
const webRequire = createRequire(path.join(repoRoot, "web", "package.json"));

const SRC = path.join(dashboardDir, "src");
const DIST = path.join(dashboardDir, "dist");

async function buildJs() {
  const esbuild = await import(
    pathToFileURL(repoRequire.resolve("esbuild/lib/main.js")).href
  );
  await esbuild.build({
    entryPoints: [path.join(SRC, "index.tsx")],
    outfile: path.join(DIST, "index.js"),
    bundle: true,
    format: "iife",
    platform: "browser",
    target: "es2022",
    jsx: "automatic",
    // Not minified — matches the readable style of the kanban plugin bundle
    // and keeps plugin load errors debuggable in the browser console.
    minify: false,
    alias: {
      react: path.join(SRC, "shims", "react.ts"),
      "react/jsx-runtime": path.join(SRC, "shims", "jsx-runtime.ts"),
      "lucide-react": repoRequire.resolve("lucide-react/dist/esm/lucide-react.js"),
      // The gateway client speaks the shared JSON-RPC dialect; the package
      // ships TS source (exports → src/index.ts), which esbuild compiles.
      "@hermes/shared": repoRequire.resolve("@hermes/shared"),
    },
    logLevel: "info",
  });
}

async function buildCss() {
  const { compile } = await import(
    pathToFileURL(webRequire.resolve("@tailwindcss/node")).href
  );
  const oxide = await import(
    pathToFileURL(webRequire.resolve("@tailwindcss/oxide")).href
  );
  const Scanner = oxide.Scanner ?? oxide.default?.Scanner;

  const input = await readFile(path.join(SRC, "styles.css"), "utf8");
  const compiler = await compile(input, {
    base: dashboardDir,
    onDependency: () => {},
    // tailwindcss itself lives under web/node_modules, not on the plugin's
    // own resolution path — resolve stylesheet imports from there.
    customCssResolver: async (id) => {
      try {
        return webRequire.resolve(id);
      } catch {
        return undefined;
      }
    },
  });

  const scanner = new Scanner({
    sources: [{ base: SRC, pattern: "**/*.{ts,tsx,css}", negated: false }],
  });
  const candidates = scanner.scan();
  const css = compiler.build(candidates);
  await writeFile(path.join(DIST, "style.css"), css, "utf8");
  console.log(`dist/style.css  ${(css.length / 1024).toFixed(1)} KiB (${candidates.length} candidates)`);
}

await mkdir(DIST, { recursive: true });
await buildJs();
await buildCss();
