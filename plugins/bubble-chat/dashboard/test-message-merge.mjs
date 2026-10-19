/* Node test harness for chat/messageMerge.ts. Run: node test-message-merge.mjs */
import { createRequire } from "node:module";
import { writeFile, rm } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const dashboardDir = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(dashboardDir, "..", "..", "..");
const repoRequire = createRequire(path.join(repoRoot, "package.json"));
const entry = `export { mergeCompletedText } from ${JSON.stringify(path.join(dashboardDir, "src", "chat", "messageMerge.ts"))};`;
const entryPath = path.join(dashboardDir, ".test-merge-entry.mjs");
const outPath = path.join(dashboardDir, ".test-merge-bundle.mjs");
await writeFile(entryPath, entry, "utf8");

const esbuild = await import(pathToFileURL(repoRequire.resolve("esbuild/lib/main.js")).href);
await esbuild.build({
  entryPoints: [entryPath],
  outfile: outPath,
  bundle: true,
  format: "esm",
  platform: "node",
  target: "es2022",
  logLevel: "silent",
});

const { mergeCompletedText } = await import(pathToFileURL(outPath).href);
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

check(
  "complete keeps interim narration when final text is the streamed suffix",
  mergeCompletedText("先查一下。\n\n最终答案。", "最终答案。") === "先查一下。\n\n最终答案。"
);
check(
  "whitespace drift still counts as the same suffix",
  mergeCompletedText("过程\n最终答案", "  最终答案\n") === "过程\n最终答案"
);
check(
  "different complete payload replaces accumulated text",
  mergeCompletedText("旧内容", "权威回答") === "权威回答"
);
check("empty complete keeps accumulated text", mergeCompletedText("已有内容", "") === "已有内容");

process.exit(failures ? 1 : 0);
