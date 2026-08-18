import { describe, expect, it } from "vitest";

import {
  decodeMessageContent,
  decodeMessageContentParts,
} from "@/components/chat/types";

describe("decodeMessageContentParts", () => {
  it("passes plain strings through", () => {
    expect(decodeMessageContentParts("你好")).toEqual({
      text: "你好",
      images: [],
    });
  });

  it("decodes the sentinel-prefixed JSON string form", () => {
    const content = `\x00json:${JSON.stringify([
      { type: "text", text: "看图" },
      { type: "image_url", image_url: { url: "data:image/png;base64,AA==" } },
    ])}`;
    expect(decodeMessageContentParts(content)).toEqual({
      text: "看图",
      images: ["data:image/png;base64,AA=="],
    });
  });

  it("accepts an already-parsed parts array (session 20260725 regression)", () => {
    const content = [
      { type: "text", text: "工作邮箱是什么意思" },
      { type: "text", text: "[Attached image — stripped after compression]" },
    ];
    expect(decodeMessageContentParts(content)).toEqual({
      text: "工作邮箱是什么意思\n[Attached image — stripped after compression]",
      images: [],
    });
  });

  it("collects image refs from array-form content", () => {
    const content = [
      { type: "text", text: "截图" },
      { type: "image_url", image_url: { url: "data:image/png;base64,BB==" } },
    ];
    expect(decodeMessageContentParts(content).images).toEqual([
      "data:image/png;base64,BB==",
    ]);
  });

  it("never throws on non-string scalars", () => {
    expect(decodeMessageContentParts(42 as unknown as string).text).toBe("42");
    expect(decodeMessageContentParts(null)).toEqual({ text: "", images: [] });
  });
});

describe("decodeMessageContent", () => {
  it("renders image parts as placeholders", () => {
    const content = [
      { type: "text", text: "看" },
      { type: "image_url", image_url: { url: "data:image/png;base64,AA==" } },
    ];
    expect(decodeMessageContent(content as unknown as string)).toBe(
      "看\n[图片]",
    );
  });
});
