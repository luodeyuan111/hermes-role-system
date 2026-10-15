/* Node test harness for Markdown.tsx parsing/rendering.
 * Bundles the TSX with the same shims as build.mjs, then runs assertions.
 * Run: node test-math.mjs
 */
import { createRequire } from "node:module";
import { writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dashboardDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dashboardDir, "..", "..", "..");
const repoRequire = createRequire(path.join(repoRoot, "package.json"));
const SRC = path.join(dashboardDir, "src");

const entry = `
export { parseBlockSpans, parseInline, renderMath } from ${JSON.stringify(path.join(SRC, "Markdown.tsx"))};
`;
const entryPath = path.join(dashboardDir, ".test-entry.mjs");
const outPath = path.join(dashboardDir, ".test-bundle.mjs");
await writeFile(entryPath, entry, "utf8");

const esbuild = await import(
  pathToFileURL(repoRequire.resolve("esbuild/lib/main.js")).href
);
await esbuild.build({
  entryPoints: [entryPath],
  outfile: outPath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2022",
  jsx: "automatic",
  alias: {
    // Node harness: use the repo's real React (module-level memo() call in
    // Markdown.tsx needs it); the browser build aliases to the SDK shim.
    react: repoRequire.resolve("react"),
    "react/jsx-runtime": repoRequire.resolve("react/jsx-runtime"),
  },
  logLevel: "silent",
});

const { parseBlockSpans, parseInline, renderMath } = await import(
  pathToFileURL(outPath).href
);
await rm(entryPath);
await rm(outPath);

let failures = 0;
function check(name, cond) {
  if (cond) console.log(`ok   ${name}`);
  else {
    failures++;
    console.log(`FAIL ${name}`);
  }
}

const BAYES = "$$\\underbrace{p(x \\mid z)}_{\\text{后验}} = \\frac{\\overbrace{p(z \\mid x)}^{\\text{似然}} \\cdot \\overbrace{p(x)}^{\\text{先验}}}{p(z)}$$";

// 1. User's single-line $$...$$ block
let spans = parseBlockSpans(`前文一段。\n\n${BAYES}\n\n后文。`);
check("single-line $$..$$ block", spans.length === 3 && spans[1].node.type === "math");
check("math content strips $$", spans[1].node.content.startsWith("\\underbrace"));

// 2. Multiline $$ fence
spans = parseBlockSpans("$$\nE = mc^2\n$$\n\nnext");
check("multiline $$ fence", spans[0].node.type === "math" && spans[0].node.content === "E = mc^2" && spans[1].node.type === "paragraph");

// 3. \[...\] fence
spans = parseBlockSpans("\\[\n\\int_0^1 x\\,dx\n\\]");
check("\\[..\\] fence", spans[0].node.type === "math" && spans[0].node.content.includes("\\int"));

// 4. Unclosed $$ (streaming) collects to EOF
spans = parseBlockSpans("$$\nE = mc");
check("unclosed $$ collects to EOF", spans[0].node.type === "math" && spans[0].node.content === "E = mc");

// 5. Inline $..$
let nodes = parseInline("由 $p(x)$ 可知");
check("inline $..$", nodes.some((n) => n.type === "math" && n.content === "p(x)" && !n.display));

// 6. Inline \(..\)
nodes = parseInline("由 \\(p(x)\\) 可知");
check("inline \\(..\\)", nodes.some((n) => n.type === "math" && n.content === "p(x)"));

// 7. Currency stays text
nodes = parseInline("花费 $5 和 $10 美元");
check("currency not math", !nodes.some((n) => n.type === "math"));

// 8. Math inside code span is not parsed
nodes = parseInline("`$x$` 结束");
check("code span beats math", nodes[0].type === "code" && !nodes.some((n) => n.type === "math"));

// 9. Bold/link groups still work after renumbering
nodes = parseInline("**加粗** 和 [链接](https://example.com) 和 *斜体*");
check("bold ok", nodes.some((n) => n.type === "bold" && n.content === "加粗"));
check("link ok", nodes.some((n) => n.type === "link" && n.href === "https://example.com"));
check("italic ok", nodes.some((n) => n.type === "italic" && n.content === "斜体"));

// 10. KaTeX actually renders the user's formula (CJK \\text included)
const html = renderMath(spans ? "\\underbrace{p(x \\mid z)}_{\\text{后验}} = \\frac{\\overbrace{p(z \\mid x)}^{\\text{似然}} \\cdot \\overbrace{p(x)}^{\\text{先验}}}{p(z)}" : "", true);
check("katex renders bayes formula", html.includes("katex") && html.includes("后验") && html.includes("似然") && html.includes("先验"));

// 11. Invalid tex degrades, never throws
const bad = renderMath("\\notacommand{", true);
check("invalid tex no-throw", typeof bad === "string" && bad.length > 0);

process.exit(failures ? 1 : 0);
