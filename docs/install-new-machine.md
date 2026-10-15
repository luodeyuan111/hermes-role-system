# 新机器装机指南（从零到可用的分角色 Hermes）

> 适用场景：一台没有 Hermes 的新电脑，目标是装完能对话、并且直接用上本仓库自带的全部前端插件（气泡聊天、资料馆、资产总览、桌宠配置）和角色化后端。
> **不需要**单独安装 [hermes-dashboard-plugins](https://github.com/luodeyuan111/hermes-dashboard-plugins)——那个仓库是给「已经在用原生上游 hermes-agent、只想加装前端」的人准备的。本仓库是分角色 fork，插件和角色系统都在仓库里。

## 为什么 clone 下来就什么都有

- **角色化后端**在 fork 的核心代码里（提示词分层注入、技能四层解析与白名单、tui_gateway profile 作用域修复等），不是插件，跟着仓库走。
- **前端插件**（bubble-chat / library / asset-view / pet …）以 bundled 形态放在仓库 `plugins/` 目录。dashboard 启动时自动扫描 bundled 插件并挂载前端与后端 API——区别于 `~/.hermes/plugins/` 下的用户插件（那类才需要在 `config.yaml` 的 `plugins.enabled` 里显式启用），bundled 插件**零配置启用**。
- **前端构建产物已随仓库发布**：主前端 `hermes_cli/web_dist/` 和各插件的 `dist/` 都在 git 里，clone 即可跑，**不需要 node/npm 工具链**（只有改前端源码才需要重新构建，见文末）。

## 装机步骤

```bash
# 0. 前置：git + Python 3.11+（setup 脚本会自动安装 uv）

# 1. 克隆（位置任意，约定放这里）
mkdir -p ~/.hermes
git clone https://github.com/luodeyuan111/hermes-role-system.git ~/.hermes/hermes-agent
cd ~/.hermes/hermes-agent

# 2. 安装：建 venv、装依赖、把 hermes 命令链接到 ~/.local/bin、可选跑设置向导
./setup-hermes.sh

# 3. 配模型（能对话的关键一步）：按向导选 provider、填 API key
hermes setup            # 或只配模型：hermes setup model

# 4. 验证对话
hermes chat

# 5. 启动 dashboard（端口 9119）
hermes dashboard
```

浏览器打开 `http://127.0.0.1:9119`：

| 页面 | 说明 |
|---|---|
| `/chat` | 气泡聊天（bubble-chat 接管）：两级角色会话栏、流式渲染、思考块、工具卡片、KaTeX 公式 |
| 角色列表 | 在 `/chat` 左侧——「新建角色」即建一个分身（也可以 `hermes profile create <名> --no-skills`） |
| `/library` | 资料馆：文件三栏浏览 + 全格式预览 + 信息源聚合 |
| 资产总览 | asset-view：按角色看 cron / workflow / skills / tools |

资料馆首次运行在数据目录（默认 `~/.hermes/library`）生成 `library.yaml`，把 `roots` 改成想纳入管理的目录。**Office 预览**需要系统装 LibreOffice（`soffice`），不装则该预览不可用，其余功能不受影响。

## 角色上手

```bash
hermes profile create coder --no-skills      # 建角色
$EDITOR ~/.hermes/profiles/coder/ROLE.md     # 写角色提示词（首行 # 标题 = 显示名）
printf 'plan\nsystematic-debugging\n' > ~/.hermes/profiles/coder/skills.whitelist   # 技能白名单
```

`examples/setup_roles.sh` 是一键建 coder/writer 示例角色的参考脚本（幂等，可反复跑）。角色机制的完整设计见 [docs/role-architecture.md](role-architecture.md)。

## 可选：开机自启 dashboard

```bash
# 参考 systemd 用户单元（按实际 hermes 路径调整 ExecStart）
systemctl --user enable --now hermes-dashboard.service
```

## 只有要改前端源码才需要

```bash
cd web && npm install --ignore-scripts && npm run build   # 主前端 → hermes_cli/web_dist
cd plugins/bubble-chat/dashboard && node build.mjs        # 气泡聊天插件 → 自身 dist/
```

构建产物改动后需随源码一起提交（web_dist 与插件 dist 都在 git 里），否则新机器 clone 到的是旧界面。
