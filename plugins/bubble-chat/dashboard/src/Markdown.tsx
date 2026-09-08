import { memo, useMemo, useRef, type ReactNode } from "react";

import { isLocalFileRef } from "./chat/content";

/**
 * Lightweight markdown renderer for LLM output.
 * Handles: code blocks, inline code, bold, italic, headers, links, lists, horizontal rules.
 * NOT a full CommonMark parser — optimized for typical assistant message patterns.
 *
 * `streaming` renders a blinking caret at the tail of the last block so it
 * appears to hug the final character instead of wrapping onto a new line
 * after a block element (paragraph/list/code/…).
 *
 * Streaming 期间走增量解析（useIncrementalBlocks）：已闭合的块跨帧复用
 * 解析结果与渲染（Block 是 memo 组件），每帧只重解析/重渲染最后一个
 * 可能未闭合的块，避免 O(n²) 的全量重解析。
 */
export function Markdown({
  content,
  highlightTerms,
  streaming,
  localFileLinks,
}: {
  content: string;
  highlightTerms?: string[];
  streaming?: boolean;
  /**
   * Opt-in: render `[text](/abs/path)` / `[text](~/…)` links as anchors
   * instead of plain text (legacy loopback `/files/…` URLs count too — see
   * normalizeLocalPath in chat/content). The host is expected to intercept
   * their clicks (see MessageBubble) — a raw navigation would 404.
   */
  localFileLinks?: boolean;
}) {
  const blocks = useIncrementalBlocks(content, streaming);
  const caret = streaming ? <StreamingCaret /> : null;

  return (
    <div className="text-sm text-foreground leading-relaxed space-y-2">
      {blocks.map((block, i) => (
        <Block
          key={i}
          block={block}
          highlightTerms={highlightTerms}
          localFileLinks={localFileLinks}
          caret={caret && i === blocks.length - 1 ? caret : null}
        />
      ))}
      {blocks.length === 0 && caret}
    </div>
  );
}

function StreamingCaret() {
  return (
    <span
      aria-hidden
      className="inline-block w-[0.5em] h-[1em] ml-0.5 align-[-0.15em] bg-foreground/50 animate-pulse"
    />
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type BlockNode =
  | { type: "code"; lang: string; content: string }
  | { type: "heading"; level: number; content: string }
  | { type: "hr" }
  | { type: "list"; ordered: boolean; items: string[] }
  | { type: "paragraph"; content: string };

/* ------------------------------------------------------------------ */
/*  Block parser                                                       */
/* ------------------------------------------------------------------ */

interface BlockSpan {
  node: BlockNode;
  /** 块首行在源文本中的字符偏移——增量缓存据此切出「稳定前缀」。 */
  start: number;
}

function parseBlockSpans(text: string): BlockSpan[] {
  const lines = text.split("\n");
  // 每行的起始字符偏移（按 +1 计入换行符）。
  const lineStarts = new Array<number>(lines.length);
  let offset = 0;
  for (let k = 0; k < lines.length; k++) {
    lineStarts[k] = offset;
    offset += lines[k].length + 1;
  }
  const spans: BlockSpan[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Fenced code block
    const fenceMatch = line.match(/^```(\w*)/);
    if (fenceMatch) {
      const start = lineStarts[i];
      const lang = fenceMatch[1] || "";
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      spans.push({
        start,
        node: { type: "code", lang, content: codeLines.join("\n") },
      });
      continue;
    }

    // Heading
    const headingMatch = line.match(/^(#{1,4})\s+(.+)/);
    if (headingMatch) {
      spans.push({
        start: lineStarts[i],
        node: {
          type: "heading",
          level: headingMatch[1].length,
          content: headingMatch[2],
        },
      });
      i++;
      continue;
    }

    // Horizontal rule
    if (/^[-*_]{3,}\s*$/.test(line)) {
      spans.push({ start: lineStarts[i], node: { type: "hr" } });
      i++;
      continue;
    }

    // Unordered list
    if (/^[-*+]\s/.test(line)) {
      const start = lineStarts[i];
      const items: string[] = [];
      while (i < lines.length && /^[-*+]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^[-*+]\s/, ""));
        i++;
      }
      spans.push({ start, node: { type: "list", ordered: false, items } });
      continue;
    }

    // Ordered list
    if (/^\d+[.)]\s/.test(line)) {
      const start = lineStarts[i];
      const items: string[] = [];
      while (i < lines.length && /^\d+[.)]\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+[.)]\s/, ""));
        i++;
      }
      spans.push({ start, node: { type: "list", ordered: true, items } });
      continue;
    }

    // Empty line
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Paragraph — collect consecutive non-empty, non-special lines
    const start = lineStarts[i];
    const paraLines: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() !== "" &&
      !lines[i].match(/^```/) &&
      !lines[i].match(/^#{1,4}\s/) &&
      !lines[i].match(/^[-*+]\s/) &&
      !lines[i].match(/^\d+[.)]\s/) &&
      !lines[i].match(/^[-*_]{3,}\s*$/)
    ) {
      paraLines.push(lines[i]);
      i++;
    }
    if (paraLines.length > 0) {
      spans.push({
        start,
        node: { type: "paragraph", content: paraLines.join("\n") },
      });
    } else {
      // 守卫：heading 分支要求 # 后非空（`(.+)`），但段落守卫只看
      // `^#{1,4}\s`——streaming 中途的 "# "（井号+空格、内容未到达）两边
      // 都不认领，不兜底的话 i 不前进，解析死循环、页面卡死。按纯文本收下。
      spans.push({ start, node: { type: "paragraph", content: line } });
      i++;
    }
  }

  return spans;
}

/**
 * Streaming 增量解析：streaming 气泡的内容只会追加，已稳定的块跨帧复用
 * 解析结果，每帧只重解析尾部——把 streaming 期 O(n²) 的全量重解析降到
 * 接近 O(n)。
 *
 * 「稳定」的判定比「非最后一块」更严格：列表/段落会在连续非空行之间合
 * 并（"- 项目一" 缓存后，下一行 "- 项目二" 到达时全量解析会把它俩并为
 * 一块），所以只有空行分隔的块边界才可以入缓存；最后一块永远重解析
 * （未闭合的 ``` 围栏、增长中的段落都天然落在它上面）。
 *
 * 消息结束（streaming=false）或内容不是纯追加（message.complete 的权威
 * 文本覆盖了累积 delta）时回退为一次性全量解析，且不保留缓存。
 */
function useIncrementalBlocks(content: string, streaming?: boolean): BlockNode[] {
  const cacheRef = useRef<{ prefix: string; blocks: BlockNode[] }>({
    prefix: "",
    blocks: [],
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
      // 最靠后的空行分隔边界（tailSpans[k] 之前的 k 块入缓存）。
      let stable = 0;
      for (let k = 1; k < tailSpans.length; k++) {
        if (hasBlankLineBefore(tail, tailSpans[k].start)) stable = k;
      }
      cacheRef.current =
        stable > 0
          ? {
              prefix: cache.prefix + tail.slice(0, tailSpans[stable].start),
              blocks: cache.blocks.concat(
                tailSpans.slice(0, stable).map((s) => s.node),
              ),
            }
          : cache;
    } else {
      cacheRef.current = streaming ? cache : { prefix: "", blocks: [] };
    }
    return blocks;
  }, [content, streaming]);
}

/** start 处块边界的前一行是否空行——空行两侧的块不可能再被追加合并。 */
function hasBlankLineBefore(text: string, start: number): boolean {
  if (start < 1 || text[start - 1] !== "\n") return false;
  return start === 1 || text[start - 2] === "\n";
}

/* ------------------------------------------------------------------ */
/*  Block renderer                                                     */
/* ------------------------------------------------------------------ */

// Memoized: streaming 期间稳定块（useIncrementalBlocks 复用的解析结果）
// 保持对象引用不变，配合 memo 直接跳过重渲染——每帧只有最后一个未闭合
// 的块真正重跑 InlineContent。
const Block = memo(function Block({
  block,
  highlightTerms,
  localFileLinks,
  caret,
}: {
  block: BlockNode;
  highlightTerms?: string[];
  localFileLinks?: boolean;
  caret?: ReactNode;
}) {
  switch (block.type) {
    case "code":
      return (
        <pre className="bg-secondary/60 border border-border px-3 py-2.5 text-xs font-mono leading-relaxed overflow-x-auto">
          <code>
            {block.content}
            {caret}
          </code>
        </pre>
      );

    case "heading": {
      const Tag = `h${Math.min(block.level, 4)}` as "h1" | "h2" | "h3" | "h4";
      const sizes: Record<string, string> = {
        h1: "text-base font-bold",
        h2: "text-sm font-bold",
        h3: "text-sm font-semibold",
        h4: "text-sm font-medium",
      };
      return (
        <Tag className={sizes[Tag]}>
          <InlineContent
            text={block.content}
            highlightTerms={highlightTerms}
            localFileLinks={localFileLinks}
          />
          {caret}
        </Tag>
      );
    }

    case "hr":
      return (
        <>
          <hr className="border-border" />
          {caret}
        </>
      );

    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      const last = block.items.length - 1;
      return (
        <Tag
          className={`space-y-0.5 ${block.ordered ? "list-decimal" : "list-disc"} pl-5 text-sm`}
        >
          {block.items.map((item, i) => (
            <li key={i}>
              <InlineContent
                text={item}
                highlightTerms={highlightTerms}
                localFileLinks={localFileLinks}
              />
              {i === last ? caret : null}
            </li>
          ))}
        </Tag>
      );
    }

    case "paragraph":
      return (
        <p>
          <InlineContent
            text={block.content}
            highlightTerms={highlightTerms}
            localFileLinks={localFileLinks}
          />
          {caret}
        </p>
      );
  }
});

/* ------------------------------------------------------------------ */
/*  Inline parser + renderer                                           */
/* ------------------------------------------------------------------ */

type InlineNode =
  | { type: "text"; content: string }
  | { type: "code"; content: string }
  | { type: "bold"; content: string }
  | { type: "italic"; content: string }
  | { type: "link"; text: string; href: string }
  | { type: "br" };

function parseInline(text: string): InlineNode[] {
  const nodes: InlineNode[] = [];
  // Pattern priority: code > link > bold > italic > bare URL > line break
  const pattern =
    /(`[^`]+`)|(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)|(\bhttps?:\/\/[^\s<>)\]]+)|(\n)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push({ type: "text", content: text.slice(lastIndex, match.index) });
    }

    if (match[1]) {
      // Inline code
      nodes.push({ type: "code", content: match[1].slice(1, -1) });
    } else if (match[2]) {
      // [text](url) link
      nodes.push({ type: "link", text: match[3], href: match[4] });
    } else if (match[5]) {
      // **bold**
      nodes.push({ type: "bold", content: match[6] });
    } else if (match[7]) {
      // *italic*
      nodes.push({ type: "italic", content: match[8] });
    } else if (match[9]) {
      // Bare URL
      nodes.push({ type: "link", text: match[9], href: match[9] });
    } else if (match[10]) {
      // Line break within paragraph
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
  localFileLinks,
}: {
  text: string;
  highlightTerms?: string[];
  localFileLinks?: boolean;
}) {
  const nodes = useMemo(() => parseInline(text), [text]);

  return (
    <>
      {nodes.map((node, i) => {
        switch (node.type) {
          case "text":
            return (
              <HighlightedText
                key={i}
                text={node.content}
                terms={highlightTerms}
              />
            );
          case "code":
            return (
              <code
                key={i}
                className="bg-secondary/60 px-1.5 py-0.5 text-xs font-mono text-primary/90"
              >
                {node.content}
              </code>
            );
          case "bold":
            return (
              <strong key={i} className="font-semibold">
                <HighlightedText text={node.content} terms={highlightTerms} />
              </strong>
            );
          case "italic":
            return (
              <em key={i}>
                <HighlightedText text={node.content} terms={highlightTerms} />
              </em>
            );
          case "link": {
            // Security: only render http(s)/mailto links — plus, when the
            // host opts in via `localFileLinks`, gateway-local file paths
            // (`/abs/…`, `~/…`), whose clicks the host intercepts. Other
            // schemes (javascript:, data:, vbscript:) are dropped to plain
            // text so a crafted link in agent/message content can't execute
            // on click.
            const href = node.href.trim();
            const isLocalFile =
              localFileLinks === true && isLocalFileRef(href);
            if (!/^(https?:|mailto:)/i.test(href) && !isLocalFile) {
              return (
                <HighlightedText
                  key={i}
                  text={node.text}
                  terms={highlightTerms}
                />
              );
            }
            if (isLocalFile) {
              return (
                <a
                  key={i}
                  href={href}
                  className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-colors"
                >
                  {node.text}
                </a>
              );
            }
            return (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline underline-offset-2 decoration-primary/30 hover:decoration-primary/60 transition-colors"
              >
                {node.text}
              </a>
            );
          }
          case "br":
            return <br key={i} />;
        }
      })}
    </>
  );
}

/** Highlight search terms within a plain text string. */
function HighlightedText({ text, terms }: { text: string; terms?: string[] }) {
  if (!terms || terms.length === 0) return <>{text}</>;

  // Build a regex that matches any of the search terms (case-insensitive)
  const escaped = terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"));
  const regex = new RegExp(`(${escaped.join("|")})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-warning/30 text-warning px-0.5">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
