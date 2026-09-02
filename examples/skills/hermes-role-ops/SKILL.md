---
name: hermes-role-ops
category: software-development
description: Hermes 分角色体系的架构说明与运维手册：角色/提示词/记忆/技能四层结构、文件位置速查、新建角色与日常自我维护规程。交接给新会话、新建/调整角色、或不确定"某个东西该放哪、该改哪"时必读。
triggers:
  - 新会话交接：了解 Hermes 当前的分角色架构与文件位置
  - 新建、调整或维护角色（profile）
  - 不确定配置/提示词/技能/记忆应该写到哪里
  - 角色行为异常需要自查注入链路
version: 1.0.0
author: Kimi Code（用户验收）
---

# Hermes 角色体系运维手册

> 单一事实来源是项目文档：`docs/role-architecture.md`（含 10 条已踩实的坑）。本 skill 是速查 + 操作规程；详细源码锚点见 skill `hermes-context-architecture` 及其 references。

## 架构一句话

所有角色都是 Hermes 内核，只是职能不同。**共享底座一份 + 角色层叠加**：

| 层 | 文件 | 作用域 | 何时生效 |
|---|---|---|---|
| 人格底座 | `~/.hermes/SOUL.md`（+ AGENTS.md/USER.md） | 所有角色共享（命名 profile 也读根目录这份） | 改一处全角色生效；dashboard 角色列表第一个「Velya · 全局底座」里可直接编辑这三个底座文件 |
| 角色提示词 | `profiles/<角色>/ROLE.md` | 单角色 | 注入 stable 层，该角色所有小对话 |
| 记忆 | `profiles/<角色>/memories/MEMORY.md`（default 是 `~/.hermes/memories/`） | 单角色，**不共享** | volatile 层，agent 对话中也会自己写 |
| 技能 | 见下"技能四层" | 共享池 + **角色白名单** | stable 层索引 |

## 角色清单（2026-09-02 体检实测，whitelist→索引全部一致）

| 角色 | profile | 职能 | 启用技能数 |
|---|---|---|---|
| 默认（Velya · 全局底座） | `~/.hermes` | 共享底座（SOUL/AGENTS/USER 全角色生效）+ 元角色：技能/流程建设、全局设定、角色上岗配置 | 全局池 37 个 |
| 码农 | `coder` | 编程、调试、技术方案 | 5 |
| 笔杆子 | `writer` | 撰稿、改稿、笔记整理 | 6 |
| 技能匠 | `skillsmith` | 技能 authoring | 20 |
| 学伴 | `scholar` | 陪学/出题/review代码/讲解概念 | 12 |
| 文献研究员 | `researcher` | 论文主线：检索/读/翻/理/归档学术文献 | 7（含大库提拔 arxiv） |
| 任务助理 | `task-assistant` | 任务拆解与跟进 | 7 |

各角色具体名单见 `profiles/<角色>/skills.whitelist`。改启用集：dashboard 角色界面的"技能列表"文本块，或直接编辑该文件（每行一个名，`#` 注释）。

## 技能四层（解析优先级从高到低）

1. **角色本地** `profiles/<角色>/skills/` — 只放私有/覆盖 skill，同名压全局
2. **共享全局池** `~/.hermes/skills/`（36 个，已声明于 default config `skills.pools.common`）— 唯一一份，所有角色按引用可见
3. **external_dirs**（config 声明的外挂目录）
4. **大库池 library_dirs** = 仓库 `hermes-agent/skills/`(72) + `optional-skills/`(102) — 索引不出现，`skill_view(名字)` 显式加载。已配进各角色 config；**default 家故意不配**（与本地 36 个撞名会让 skill_view 报歧义拒绝）

**白名单模式（2026-09-02 起）**：角色的索引由 `profiles/<角色>/skills.whitelist` 决定——纯文本、每行一个技能名（frontmatter name 或目录名）、支持 `#` 注释。**只有名单里的技能进索引**（从本地→共享→external→大库 全目录解析；**写大库技能名会被"提拔"进该角色索引**，如 researcher 的 arxiv）。名单外的全局新 skill 不会漏进来；`skill_view` 显式加载名单外技能不受限。这是普通文本文件，**agent 对话中可以直接改自己的**（config.yaml 有护栏改不了，这正是白名单落文件的原因）。文件不存在则回退旧黑名单行为（`skills.disabled`）；**空文件 = 权威空索引，别误建**。default 家不用白名单文件（本地目录即名单）。

界面显示"未匹配" = 名单里的名字在全部可见目录（本地/共享/大库）都解析不到——打错字、技能已归档或改名；修正或删除该行即可。

**技能寻找实操（2026-09-02 踩坑沉淀）**：
- `skills_list` 只返回**白名单内**的 skill，不显示池子里还有什么。
- 找候选 skill 的正确顺序：
  1. `search_files(pattern="SKILL.md", path="~/.hermes/skills", target="files")` 看本地共享池（36 个）
  2. `search_files(pattern="SKILL.md", path="~/.hermes/hermes-agent/skills", target="files")` 看官方池（72 个）
  3. `search_files(pattern="SKILL.md", path="~/.hermes/hermes-agent/optional-skills", target="files")` 看 optional 池（100+ 个）
  4. 对候选名字 `skill_view(name)` 确认内容是否匹配场景
- **不要只搜 `~/.hermes/skills/`**——那只是本地共享池，官方池和 optional 池才是大头。
- 挑 skill 时按角色职能筛选，别一次全加；加完更新 `skills.whitelist` 和 `ROLE.md` 的 skill 列表。

改角色启用集：dashboard 角色界面"技能列表"块（就是这个文件），或直接编辑文件。

冷归档：外置盘 `外部归档目录/`（70 个，可捞回）。

## 文件位置速查

- 项目文档与坑清单：`docs/role-architecture.md`
- 角色一键搭建脚本：同目录 `setup_roles.sh`（幂等）
- 从对话沉淀为新角色模板：`references/session-to-role-template.md`
- 技能配单（kanban/cron 用）：`~/.hermes/skill-bundles/*.yaml`
- 核心源码：`~/.hermes/hermes-agent/`（注入 `agent/system_prompt.py`、技能解析 `agent/skill_utils.py`、dashboard RPC `tui_gateway/server.py`）
- 前端插件：`~/.hermes/hermes-agent/plugins/bubble-chat/dashboard/`（改完跑 `build.sh`，重启 `hermes-dashboard` 生效）
- 每个角色的家：`~/.hermes/profiles/<角色>/`（ROLE.md / config.yaml / memories/ / skills/ / sessions）

## 操作规程

**新建角色**（二选一）：
- dashboard 聊天页 → 角色列表 →「新建角色」：填名称/描述/提示词即可（自动免种子，从空本地池+共享池开始）
- 或跑 `setup_roles.sh` 照 coder/writer 的样子加一段

**从一段对话沉淀成角色（无 dashboard，手搭）**：
1. `mkdir -p ~/.hermes/profiles/<名>/{memories,sessions,skills,cron,workspace,plans,logs,cache,audio_cache,image_cache}`；`touch .no-bundled-skills`（免种子）
2. 写 4 个文件（content 用 `write_file`）：
   - `profile.yaml`：`description` + `description_auto: false`
   - `config.yaml`：`model.{default,provider,base_url}` + `skills.pools.library_dirs`（照 coder/writer 抄）。**API key 不用复制**，kanban worker 继承 dispatcher 环境
   - `ROLE.md`：从对话总结的职能规则 + 挂哪个技能
   - `skills.whitelist`：纯文本，每行一个技能名（默认一行够；更多再加行）
   - `SOUL.md` **不复制**——命名 profile 的 SOUL 底座共享根目录一份
3. 验证链路（配好就能确认，不必先起对话）：
   - `hermes profile list` 应看到新角色 + 正确 model
   - **⚠️ `HERMES_HOME=<角色> hermes skills list` 不是有效验证**（2026-09-02 researcher 踩坑）：CLI 显示层**不走白名单**，无论 whitelist 写啥，`skills list`/`skills list -p <角色>` 都会把本地池全部技能列 enabled（如显示 197 个全 enabled 是正常现象，不是白名单失效；coder 只有 5 个名单也照样显示全池）。白名单**只在系统提示技能索引注入层生效**（源码 `agent/prompt_builder.py::_index_allowed`——有 whitelist 时只让名单内技能进 stable 索引，`skills.disabled` 被旁路）。正确确认姿势：①源码逻辑已核（文件放对 + config.library_dirs 指向对的官方/optional 池 + 参照 scholar 同构配置即为 OK）；②真正端到端是 dashboard 角色会话里查 system_prompt 落库的技能索引（见「角色行为异常自查」），或让用户进一次对话验收
   - **`pool show` 显示 `common pool 0 declared` 是正常现象**——命名 profile 的 config 不声明 common，白名单模式直接扫本地→共享→external 目录解析；`pool show` 的 common 显示 0 不代表白名单失效，别被误导
4. 真正端到端对话留给用户从 dashboard 角色选择器进一次确认，再沉淀记忆。

**沉淀记忆时（跨 profile 写会撞软护栏）**：若你在 **default（Velya）语境内**给某角色（如 scholar）的 `profiles/<角色>/memories/MEMORY.md` 写学习上下文/进度，`patch`/`write_file` 会先被 **跨 profile 软护栏拦**（报 \"belongs to profile 'scholar', but agent runs under 'default'\"）。用户明确说了写哪个角色、内容是什么 → 属 explicit user direction，重试加 `cross_profile=True` 即可。这是隔离设计非安全边界（terminal 仍可达；隔离了 memory 工具的默认 target=当前角色）。反之某角色在**自己**语境内写自己 memory 不会被拦。写完用 tempfile 校验脚本核对条目数与关键点落盘。

**环境陷阱**：当前会话的 `HERMES_HOME` 可能指向某个命名 profile（如 `~/.hermes/profiles/skillsmith` / `~/.hermes/profiles/scholar`），但新建角色文件**务必放根 `~/.hermes/profiles/<名>/`**（与其他角色平级），不要在 `$HERMES_HOME/profiles/` 下建。用 `ls ~/.hermes/profiles/` 确认落位。

**改全局技能必须回 default 对话（2026-09-02 学伴沉淀踩坑）**：只有 **default（Velya 元角色）对话能改全局共享 skill**（`~/.hermes/skills/` 下的主 skill，含本手册自身）。在**新建/调试某角色**（如 scholar）的操作里想 patch 全局 skill，会被 `skill_manage` 护栏拦——因为那个上下文挂在命名 profile 下。所以「从一段对话沉淀成角色」时，**搭角色文件可以在任何会话做，但需要改全局 skill（补文档/补清单）时必须切回 default 对话再 patch**。判断当前是不是 default：看系统提示的 "Active profile"，或 `hermes profile list` 里 `<名>` 有没有 mark，别只看 `$HERMES_HOME`。**skill_manage patch 主 skill 若走通了、但操作目标是别处既有规则/文档，说明当前可能就是 default；反之被拦就要老实切 default**。

**新建 skill**：
1. 先查池内现成的（全局 36 + 大库池），有就 patch 不新建（防蔓延铁律）
2. 确要新建：放 `~/.hermes/skills/<类目>/<名>/SKILL.md`（全局池）
3. 把名字追加进 default `config.yaml` 的 `skills.pools.common`，跑 `hermes skills pool check` 应绿
4. 白名单模式下新全局 skill **不会**漏进各角色索引；要给某角色用，把名字加进它的 `skills.whitelist`（角色自己也能加）

**改共享底座/共享池**：default profile 下直接改文件。命名 profile 会话里改共享池会被 skill_manage 护栏拦（设计如此）。

**角色行为异常自查**：
1. 该角色会话的 system prompt 落库在 `profiles/<角色>/state.db` 的 sessions.system_prompt，直接翻内容确认 ROLE 块/技能索引对不对
2. 坏 prompt 不会自愈：清掉该行 system_prompt 字段，下条消息重建
3. dashboard/tui_gateway 进程内凡是"重建型"操作（/new、/model、/compress）都必须绑 profile scope——疑似 scope 丢失看项目 README 坑 #10

**验证命令**：
```bash
hermes skills pool show    # 三层归属总览
hermes skills pool check   # 声明 vs 磁盘，绿 = 一致
```

## 服务管理

- dashboard（9119，聊天 UI）= `hermes-dashboard.service`；gateway（QQ bot 等）= `hermes-gateway.service`，**两个独立进程**
- 改插件/前端/web_server → 重启 dashboard；改 gateway 路由 → 重启 gateway；CLI（kanban worker 等）每次起新进程自动用新代码
- QQ bot 目前只跑 default 角色（按会话切角色未做，方案在项目 README 讨论区）
