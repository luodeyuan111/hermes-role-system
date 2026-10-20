# Knowledge Banks

按 profile 配置的命名知识库工具。当前用于 researcher 的独立论文库，不要求启用 `memory.provider`，也不会把每轮对话自动写入知识库。

## 配置

在 `$HERMES_HOME/knowledge-banks.json` 注册后端和库别名：

```json
{
  "backend": "hindsight",
  "api_url": "http://127.0.0.1:9100",
  "libraries": {
    "papers": {
      "bank_id": "researcher-papers",
      "read": true,
      "write": true,
      "recall_budget": "low",
      "recall_max_tokens": 2500,
      "recall_types": ["observation", "world", "experience"]
    }
  }
}
```

- 模型只能使用注册表里的 `library` 别名，不能直接指定任意 bank ID。
- `read` 默认 true，`write` 默认 false；没有配置文件时，工具 schema 不对模型开放。
- 本地 `127.0.0.1` / `localhost` 请求绕过代理。远端如需认证，可设 `api_key_env`，其值为已有密钥的环境变量名，不直接在 JSON 里存 key。

## 工具

- `knowledge_query(library, query, limit?, include_source_facts?)`：语义/关键词混合检索，返回文本、document_id、metadata、tags 等证据信息。
- `knowledge_record(library, content, metadata?, document_id?, update_mode?, entities?, ...)`：异步写入整理后的笔记。默认 `append`，追加前会合并该文档已有 metadata，避免标题、作者、原文链接被最新一条空元数据覆盖。只有明确重建文档时才用 `replace`。`entities` 可显式写入实体/别名（例如 `[{"text":"张伟"},{"text":"Zhang Wei"},{"text":"zhangwei"}]`），会按字面保留以补足中文专名的检索入口。
- `knowledge_list(library, query?, fact_type?, limit?, offset?)`：直接查看库内容和总数。

论文笔记建议在 metadata 中填写 `paper_id`、`title`、`authors`、`year`、`source`（DOI/arXiv/本地路径）、`locator`（页码/章节）。同一论文使用稳定的 `document_id`，例如 `paper:arxiv:2301.04104`。中文人名/课程名/项目名建议同时给 `entities` 写入中文原名、拼音和英文别名；正文不要翻译成英文。
