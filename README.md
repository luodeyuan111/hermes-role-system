# Hermes Role System

给 AI 助手装上"角色分身"——基于 [Hermes Agent](https://github.com/NousResearch/hermes-agent) 的 CherryStudio 式分角色对话架构。

一个 AI 助手只有一个大脑，但你让它写代码、改稿子、查文献、当学伴——全挤在一个对话里：人格设定越写越长、技能越装越多、每个对话都在为所有职能付费，上下文很快爆炸。本项目把单助手改造成**共享底座 + 多个职能角色 + 角色独立小对话**的形态。

## 特性

- **角色即分身**：每个角色是独立小助手，有自己的提示词（ROLE.md）、记忆（MEMORY.md）和技能清单，会话/记忆按角色隔离
- **共享底座只有一份**：人格设定（SOUL.md）所有角色共用，改一处全生效；角色差异通过 ROLE.md 叠加注入
- **技能白名单**：每个角色一个纯文本清单（`skills.whitelist`），索引只注入列出的技能（从几十个砍到个位数）；另有"大库池"可放上百个备选技能，随用随取不占上下文。清单是普通文本，**agent 自己也能改**——自我维护
- **小对话治上下文爆炸**：每个角色下开多个独立小对话，不再一个长对话撑到底
- **看板组团干活**：kanban 按角色派活，各角色用自己的技能包独立执行并回写结果
- **气泡聊天 UI**：两级会话栏——角色列表 → 角色视图（提示词/记忆/技能直接编辑）→ 小对话；默认角色即全局底座，底座文件可视化编辑

## 架构速览

| 层 | 文件 | 作用域 |
|---|---|---|
| 人格底座 | `~/.hermes/SOUL.md` | 所有角色共享 |
| 角色提示词 | `~/.hermes/profiles/<角色>/ROLE.md` | 单角色，stable 层注入 |
| 记忆 | `~/.hermes/profiles/<角色>/memories/MEMORY.md` | 单角色 |
| 技能 | 角色本地 → 共享全局 → 大库（`skills.whitelist` 白名单裁剪） | 共享 + 角色裁剪 |

角色 = Hermes 原生 profile 机制，未发明新框架；核心改动是提示词分层注入、技能四层解析与白名单过滤、以及 dashboard 的两级角色 UI。

**详细设计文档（中文）：[docs/role-architecture.md](docs/role-architecture.md)** —— 含四层技能解析、白名单语义、核心改动清单、快速上手。

## 快速上手

```bash
# 建角色（dashboard 角色列表里点"新建角色"也行）
hermes profile create coder --no-skills
# 写角色提示词（首行 # 标题 = 显示名，首段 = 描述）
$EDITOR ~/.hermes/profiles/coder/ROLE.md
# 配技能白名单
printf 'plan\nsystematic-debugging\n' > ~/.hermes/profiles/coder/skills.whitelist
# 验证
hermes skills pool show
```

`examples/` 里有运维手册 skill 快照和一键搭建脚本 `setup_roles.sh`。

## 相关仓库

- [hermes-dashboard-plugins](https://github.com/luodeyuan111/hermes-dashboard-plugins) —— dashboard 插件独立分发（气泡聊天、资料馆、桌宠配置），bubble-chat 的角色 UI 与本仓库同步

## 与上游的关系

本仓库是 [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent)（MIT）的快照式 fork，上游 README 见 [README.upstream.md](README.upstream.md)。核心改动相对上游：`pre_api_request` hook 可改写、ROLE.md 角色层与共享 SOUL 底座、技能三层池与白名单、tui_gateway profile 作用域修复、bubble-chat 两级角色会话栏（详见设计文档的改动清单）。
