# Hermes 模型配置与 Tools/Workflow 分角色修复报告

> 2026-09-15 · Kimi Code（skillsmith）执行，洛验收
> 来源：skillsmith 通过 QQ 渠道发给洛的两轮完成报告，Velya 整理成 docs。
> 关联：`role-architecture.md`（tools/workflow 机制已并入其「Tools / Workflow 分角色」节）

---

## 一、模型配置修复轮（上午）

### 洛反馈的三个显示问题（全部修复）

| # | 症状 | 根因 | 修法 |
|---|---|---|---|
| 1 | 切回对话后模型徽标变回「默认」 | resume 水合缺口：后端一直把会话模型信息放在返回值里，但前端整体丢弃，纯等一个热路径根本不会发的 session.info 事件 | 前端接入返回值里的模型信息，切走切回徽标保持该会话自己的模型 |
| 2 | 角色默认模型只显示「默认」二字 | 角色列表没带每个 profile 的真实 model/provider | `_role_entry` 带 model/provider；角色页下拉首项显示真实模型名；主前端 profile 卡片对继承默认的标「继承底座默认」 |
| 3 | 选模型建对话后「黏糊糊」——隐形黏到下一个新对话 | staged pick 未在 session.create 后清空 | 建会话后清空模型 pick；model.options 按会话/角色作用域解析（此前非默认角色拿到的是网关全局配置，是错的）；目录缓存按作用域分键并在切角色/切模型后失效 |

### 顺手修掉的配置层隐患

| # | 问题 | 修法 |
|---|---|---|
| 4 | CLI `/model --global` 持久化漏写 base_url——跨 provider 切换后旧 base_url 残留，重启即路由串线 | 对齐 gateway 语义修掉 |
| 5 | doctor 审计补盲：别名归一化（此前 6/8 个 profile 写 kimi 别名导致路由审计空转）+ fallback==primary 告警 | skillsmith 实例命中 fallback==primary |
| 6 | Anthropic 漂移悬案抓手：config.yaml 所有写路径现在都有留痕（logs/agent.log） | 下次再漂移能直接看到是谁改的 |

### 验证

测试 **273/273 通过**，两个前端构建通过，dashboard 已重启生效。界面实测（对话内切模型切走切回、角色页下拉、新建对话徽标）等洛回来过一遍。

---

## 二、Tools / Workflow 分角色（下午，需求单最后一块机制缺口）

### R2.1 tools 分角色

**新机制**：每个角色目录下的 `tools.disabled` 纯文本文件，每行一个 toolset 名，增量黑名单——和 `skills.whitelist` 同款思路，角色可以在会话内自己维护（config.yaml 有写护栏所以落纯文件）。

- 与 config.yaml 的 `agent.disabled_toolsets` 取并集后统一生效
- CLI / gateway / cron / dashboard 四条路全部自动继承
- asset-view 页零改动直接能看
- **核心保护**：`_HERMES_CORE_TOOLS` 交集不可被文件档禁用——防止角色把自己手脚砍了

### 验收实况（有一处和预想不同，如实报告）

需求单验收写的是「scholar 关 browser、coder 关 image_gen」，实测发现这两个都是核心工具集，会被保护规则拦下。按预案换项：

- **scholar 真实裁掉了 `shengsuan`**（胜算云生图/看图工具集）
- coder 的 `image_gen` 行留着当保护规则的活样例

探针实测：scholar 裁 shengsuan 生效、coder 的 image_gen 被保护拦截、其他角色互不影响，6 项断言全过。

### Workflow 分角色归属

不建新引擎，沿用现有范式：角色的 workflow = 它自己 `scripts/tools/` 里的脚本 + 它名下的 cron 任务。跨 profile 写护栏扩展到 scripts 目录：别的角色想动某个角色的脚本会收到警告和审批指引。

### 验证

新增 21 条测试全绿；回归面（tools_config 115 / file_safety 82 / skill_utils 29 / cron 693）全绿。无需重启服务，文件改完下次会话即生效。

---

## 三、待洛拍板 / 待办

1. **git 提交**：工作树有三批未提交改动（role-call P0 → 模型配置 → R2.1 tools/workflow），都验证过，分批提还是一起提？
2. **验收清单**（HANDOFF.md）：模型显示三件事 + asset-view 看 scholar 的 shengsuan 是否在「已停用」区
3. **下一块**：集群推进（role-call P1/P2）和模型配置数据侧遗留（GLM_BASE_URL 清退等）

---

*整理：Velya，2026-09-20。原始报告为 skillsmith 通过 QQ 发给洛的两条消息（2026-09-15 上午/下午各一）。*
