# Hermes 分角色架构（Role-based Conversations）

> 本 fork 在 [Hermes Agent](https://github.com/NousResearch/hermes-agent) 之上实现了一套 CherryStudio 式的分角色对话系统：全局共享底座 + 多个职能角色 + 每个角色开独立小对话，解决"单助手上下文膨胀"和"人格/技能混杂"两个问题。

## 设计一句话

所有角色都是同一个 Hermes 内核，只是职能不同。**共享底座只有一份，角色差异全部按层叠加**：

| 层 | 文件 | 作用域 |
|---|---|---|
| 人格底座 | `<HERMES_HOME>/SOUL.md`（+ AGENTS.md / USER.md） | 所有角色共享（命名 profile 也读根目录这份，不用创建时的副本） |
| 角色提示词 | `profiles/<角色>/ROLE.md` | 单角色，注入 system prompt stable 层 |
| 记忆 | `profiles/<角色>/memories/MEMORY.md` | 单角色，互不共享 |
| 技能 | 见下"技能四层 + 白名单" | 共享池按引用 + 角色白名单裁剪 |

角色 = Hermes 原生 profile（`~/.hermes/profiles/<name>/`，独立 HERMES_HOME），机制零新增，新增的是分层注入与 UI。

## 技能：四层解析 + 白名单

解析优先级（同名高优先级赢）：

1. **角色本地** `profiles/<角色>/skills/` — 只放私有/覆盖 skill
2. **共享全局池** `~/.hermes/skills/` — 唯一一份，所有角色按引用可见
3. **external_dirs** — config 声明的外挂目录
4. **大库池 library_dirs** — 索引中隐藏，`skill_view(名字)` 显式加载（适合放几百个备选 skill）

**白名单模式**：角色索引只注入 `profiles/<角色>/skills.whitelist` 列出的技能（纯文本、每行一个名、`#` 注释）。文件不存在则回退黑名单（`skills.disabled`）。三个关键性质：

- 普通文本文件，**agent 对话中可以自己维护**（config.yaml 通常有安全护栏改不了，这是落文件的核心原因）
- 名单里的**大库技能会被"提拔"进该角色索引**——白名单是权威
- 全局池新增 skill 不会漏进任何角色的索引（黑名单模式下会漏）

显式加载（`skill_view` / `--skills` / cron `skills:`）永远不受名单限制。

## 角色资产归位（skill 归角色，memory 不存清单）

角色资产的「正确家」（2026-09-08 起生效，机制经 `tests/tools/test_skill_profile_homing.py` 固化）：

- **角色私有 skill 落 `profiles/<角色>/skills/`**——`skill_manage create` 在命名 profile 下天然落本地目录，不会漏进共享池根目录；与共享池同名即覆盖（本地赢），这是角色定制全局 skill 的正规途径
- **memory 只放角色偏好/事实**，不存「skill 资产台账」这类静态清单——清单会腐化且挤占 memory 上限
- **查资产走实时接口**：`skills_list` / dashboard 资产视图，不查 memory 台账

## Skill 治理模式（default profile，2026-09-08 起）

QQ 渠道（default profile）skill 生成失控的治理组合，均为 per-profile config 开关（`~/.hermes/config.yaml` 的 `skills:` 段）：

- `write_approval: true` — skill 写入（create/edit/patch/delete/write_file/remove_file）一律先暂存待批，落 `pending/skills/<id>.json`；模型收到一句可操作提示，洛用 `/skills pending` / `/skills approve <id>` 放行（gateway/CLI 同 handler）
- `create_staging: true` — 新建 skill 落 `~/.hermes/skills/staging/<name>/` 隔离区（excluded discovery root，不进 offer 索引/skills_list/skill_view），curation 评审后人工 promote 进分类目录；staging 中的 skill 仍可 edit/patch/write_file/delete（继续创作或拒绝）；staged create 自动标记 `created_by=agent` 供 curator 管理
- skillsmith 等技能创作角色**保持两开关关闭**（白名单放行），日常建 skill 不受阻

## Dashboard UI（bubble-chat 插件）

CherryStudio 式两级会话栏：

- 一级：**角色列表**（可新建角色：名称/描述/提示词 → 自动建 profile + ROLE.md，免种子不复制内置技能）
- 二级：**角色视图** — 提示词（ROLE.md）/ 记忆（MEMORY.md）/ 技能列表（skills.whitelist）三个文本块直接编辑；下方是该角色的小对话列表
- 默认角色特殊化为**全局底座**：直接编辑 SOUL.md / AGENTS.md / USER.md 三个共享文件
- 角色/模型选择只在**建会话时**生效（会话中途切换会失效 prompt 前缀缓存，这是红线）

插件后端端点在 `plugins/bubble-chat/dashboard/plugin_api.py`（`/api/plugins/bubble-chat/roles*`），前端 `src/RoleSidebar.tsx`。

## 核心改动清单（相对上游）

| 改动 | 位置 |
|---|---|
| `pre_api_request` hook 从只读改为可改写 messages（`{"messages":...}` / `{"append_system":...}`） | `agent/conversation_loop.py`、`hermes_cli/plugins.py` |
| ROLE.md 角色层 + 命名 profile 共享根目录 SOUL 底座 | `agent/system_prompt.py` |
| 技能四层解析（共享池按引用）+ 白名单过滤 + 共享池写护栏 | `agent/skill_utils.py`、`agent/prompt_builder.py`、`tools/` |
| skill 治理：write_approval 门控 + create_staging 隔离区 | `tools/write_approval.py`、`tools/skill_manager_tool.py`、`agent/skill_utils.py` |
| `hermes skills pool show/check/apply` 三层池 CLI | `hermes_cli/skills_pool.py` |
| tui_gateway 进程内 profile 作用域修复（重建型入口绑 scope） | `tui_gateway/server.py` |
| 两级角色会话栏 + 角色管理端点 | `plugins/bubble-chat/dashboard/`、`web/src/App.tsx` |

## 快速上手

```bash
# 1. 建角色（UI 或脚本，examples/setup_roles.sh 是幂等示例）
hermes profile create coder --no-skills
# 2. 写角色提示词（首行 # 标题 = 显示名，首段 = 描述）
$EDITOR ~/.hermes/profiles/coder/ROLE.md
# 3. 配技能白名单
printf 'plan\nsystematic-debugging\n' > ~/.hermes/profiles/coder/skills.whitelist
# 4. 配大库池（可选）：该角色 config.yaml 加
#    skills: {pools: {library_dirs: [/path/to/hermes-agent/skills]}}
# 5. 验证
hermes skills pool show && hermes skills pool check
```

kanban 可按角色派活：`hermes kanban create "任务" --assignee coder`（dispatcher 会拉起 `hermes -p coder` 子进程执行）。

## 示例与维护

- `examples/`：`hermes-role-ops` 运维手册 skill（快照）、`setup_roles.sh` 角色搭建脚本
- 本仓库是分享快照；使用方的**活文档**应放在 agent 环境内的 skill（如 examples 里的 role-ops），由 agent 日常自维护，仓库文档不追踪后续演进
