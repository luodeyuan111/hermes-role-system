/**
 * Build script for the library dashboard plugin.
 *
 *   node build.mjs        (or ./build.sh)
 *
 * No npm install: everything resolves from the repo's existing node_modules
 * (esbuild at the repo root, tailwindcss v4 under web/). Outputs:
 *   dist/index.js   IIFE bundle; `react` / `react/jsx-runtime` are aliased
 *                   to shims that delegate to window.__HERMES_PLUGIN_SDK__,
 *                   lucide-react is bundled from the repo's node_modules.
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
    },
    logLevel: "info",
  });
}

/**
 * Scope every emitted rule under the plugin root class so the plugin's
 * utilities can NEVER style host chrome. This is load-bearing, not cosmetic:
 * the compiled utilities are unlayered CSS, and the plugin <link> is injected
 * after the host stylesheet — unlayered rules outrank the host's entire
 * `@layer utilities` cascade, so a bare `.fixed` from the plugin flattens the
 * host sidebar's `lg:sticky` back to `fixed`, sliding the whole content
 * column under the navigation bar. Scoping to the plugin root eliminates the
 * collision class entirely (and, by raising specificity to (0,2,0), keeps
 * className overrides on host DS components winning inside the plugin).
 *
 * `keepGlobal` selectors stay untouched on purpose: :root/:host theme
 * aliases, keyframes, and the deliberate host-layout rule in styles.css
 * (`main:has(.hermes-library) …`, which PROMOTES the route-outlet wrapper —
 * it targets host elements by design and must keep winning).
 */
const PLUGIN_SCOPE = ".hermes-library";
const KEEP_GLOBAL = [/^:root\b/, /^:host\b/, /^main\b/];

async function scopeCss(css) {
  const postcss = (
    await import(pathToFileURL(repoRequire.resolve("postcss")).href)
  ).default;
  const root = postcss.parse(css);
  root.walkRules((rule) => {
    // Leave @keyframes frames (from/to/%) alone.
    for (let p = rule.parent; p; p = p.parent) {
      if (p.type === "atrule" && /keyframes$/.test(p.name)) return;
    }
    rule.selectors = rule.selectors.map((s) => {
      const sel = s.trim();
      if (KEEP_GLOBAL.some((re) => re.test(sel))) return sel;
      return `${PLUGIN_SCOPE} ${sel}`;
    });
  });
  return root.toString();
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
  const css = await scopeCss(compiler.build(candidates));
  await writeFile(path.join(DIST, "style.css"), css, "utf8");
  console.log(`dist/style.css  ${(css.length / 1024).toFixed(1)} KiB (${candidates.length} candidates)`);
}

await mkdir(DIST, { recursive: true });
await buildJs();
await buildCss();
