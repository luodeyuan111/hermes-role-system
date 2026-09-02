#!/usr/bin/env bash
# =============================================================================
# setup_roles.sh — Hermes 角色 profile + 技能包一键初始化（幂等，可反复执行）
#
# 用途：
#   1. 创建 coder / writer 两个角色 profile（已存在则跳过，不会覆盖已有数据），
#      新建一律 --no-skills：角色按引用共享默认家 ~/.hermes/skills/ 的全局
#      技能池，不再复制 72 个内置技能；
#   2. 为每个角色写入最小 config.yaml（只固定模型段，沿用默认 profile 的模型）；
#   3. 写入 <profile_home>/ROLE.md（会话启动时注入系统提示词 stable tier，
#      首行 `# 显示名` 会被 bubble-chat 角色选择器用作显示名）；
#   4. 给 coder / writer / skillsmith 补 .no-bundled-skills opt-out 标记
#      （幂等：已存在的只补标记，不删它们已有的技能文件）；
#   5. 安装 ~/.hermes/skill-bundles/{coder,writer}.yaml 技能包。
#
# 用法：
#   bash setup_roles.sh            # 幂等执行，已存在的文件会被重写为脚本内版本
#   想改角色定义：直接改本脚本里的 heredoc 再重跑即可。
#
# 注意：
#   - profile 的 API Key 不在本脚本管理范围内。profile 的 .env 为空时会
#     回落到 shell 环境变量；kanban worker 继承 dispatcher 进程的环境，
#     因此在 dispatch 前 `set -a; . ~/.hermes/.env; set +a` 即可让 worker
#     拿到 GLM_API_KEY。
#   - 不会删除任何东西；`hermes profile create` 对已存在的 profile 直接跳过。
# =============================================================================
set -euo pipefail

HERMES_ROOT="${HERMES_ROOT:-$HOME/.hermes}"
PROFILES_ROOT="$HERMES_ROOT/profiles"
BUNDLES_DIR="$HERMES_ROOT/skill-bundles"

# 模型段与默认 profile (~/.hermes/config.yaml) 保持一致
read -r -d '' MIN_CONFIG <<'EOF' || true
# 最小配置：只固定模型/提供商，其余全部走内置默认值。
# 模型段与默认 profile (~/.hermes/config.yaml) 保持一致。
model:
  default: glm-5.3-flash
  provider: zai
  base_url: https://api.z.ai/api/paas/v4
skills:
  disabled: []
EOF

read -r -d '' CODER_ROLE <<'EOF' || true
# 码农（Coder）

编程助手：负责写代码、调试、重构和给出技术方案，回答以可运行的代码和清晰的解释为优先。

## 角色规则

- 优先给出可直接运行的代码，代码风格贴合所在项目现有约定。
- 改动遵循最小化原则：不顺手重构无关代码，不引入未要求的依赖。
- 遇到 bug 先定位根因再修，说明原因而不是只贴补丁。
- 不确定的 API、命令、库版本不要臆造，明确标注假设。
- 回答简洁：代码为主，解释点到为止，不写客套话。
- 涉及破坏性操作（删文件、改线上状态）必须先说明并等待确认。
EOF

read -r -d '' WRITER_ROLE <<'EOF' || true
# 笔杆子（Writer）

写作与改稿助手：负责撰稿、润色、改写和笔记整理，默认使用自然流畅的中文书面表达。

## 角色规则

- 动笔前先确认目标读者、文体和篇幅；信息不足时先给一版草稿并标注假设。
- 改稿保留原作者的核心观点和语气，改动处说明理由。
- 语言自然、具体，避免空话套话和过度堆砌形容词。
- 结构清晰：长文先给提纲再展开，段落之间有过渡。
- 引用事实、数据、文献时不臆造，拿不准的明确标注待核实。
- 输出直接给成稿，修改建议用简短批注附在文后。
EOF

read -r -d '' CODER_BUNDLE <<'EOF' || true
# 编程角色技能包：配合 coder profile / kanban --skill coder-bundle 使用
name: coder-bundle
description: 编程助手常用技能：规划、系统化调试、代码清理与工作区迁移
skills:
  - plan
  - systematic-debugging
  - agent-system-cleanup
  - workspace-migration
instruction: 你是编程角色。改动最小化、先定位根因再修；动手前用 plan 技能规划，遇到 bug 用 systematic-debugging 流程。
EOF

read -r -d '' WRITER_BUNDLE <<'EOF' || true
# 写作角色技能包：配合 writer profile / kanban --skill writer-bundle 使用
name: writer-bundle
description: 写作助手常用技能：笔记、知识库、文献阅读与学术翻译
skills:
  - obsidian
  - vault
  - literature-reading-note
  - academic-paper-translation
instruction: 你是写作角色。默认中文书面表达；改稿保留原作者语气，引用事实不臆造，拿不准的标注待核实。
EOF

ensure_profile() {
  local name="$1" desc="$2"
  if [ -d "$PROFILES_ROOT/$name" ]; then
    echo "[skip] profile '$name' 已存在"
  else
    # --no-skills：角色按引用共享默认家 ~/.hermes/skills/ 的全局技能池，
    # 不再为每个角色复制 72 个内置技能；create 会写入 .no-bundled-skills
    # 标记，hermes update 的全量同步也会跳过该 profile。
    hermes profile create "$name" --description "$desc" --no-skills
  fi
  printf '%s\n' "$MIN_CONFIG" > "$PROFILES_ROOT/$name/config.yaml"
  echo "[ok]   $name/config.yaml 已写入（最小模型配置）"
}

# 已存在的 profile 只补 .no-bundled-skills opt-out 标记（幂等）——
# 不删除它们已有的技能文件（本地技能清理由另一线程负责）。
ensure_opt_out_marker() {
  local name="$1" dir="$PROFILES_ROOT/$1"
  if [ ! -d "$dir" ]; then
    echo "[skip] profile '$name' 不存在，跳过标记"
    return
  fi
  if [ -f "$dir/.no-bundled-skills" ]; then
    echo "[skip] $name/.no-bundled-skills 已存在"
  else
    printf '%s\n' \
      "This profile opted out of bundled-skill seeding (setup_roles.sh)." \
      "Delete this file to re-enable sync on the next \`hermes update\`." \
      > "$dir/.no-bundled-skills"
    echo "[ok]   $name/.no-bundled-skills 已写入（已有技能文件保留）"
  fi
}

ensure_profile coder  "编程助手角色：写代码、调试、重构、技术方案"
ensure_profile writer "写作助手角色：撰稿、改稿、润色、笔记整理"

ensure_opt_out_marker coder
ensure_opt_out_marker writer
ensure_opt_out_marker skillsmith

printf '%s\n' "$CODER_ROLE"  > "$PROFILES_ROOT/coder/ROLE.md"
printf '%s\n' "$WRITER_ROLE" > "$PROFILES_ROOT/writer/ROLE.md"
echo "[ok]   ROLE.md 已写入 coder / writer"

mkdir -p "$BUNDLES_DIR"
printf '%s\n' "$CODER_BUNDLE"  > "$BUNDLES_DIR/coder.yaml"
printf '%s\n' "$WRITER_BUNDLE" > "$BUNDLES_DIR/writer.yaml"
echo "[ok]   技能包已安装到 $BUNDLES_DIR/{coder,writer}.yaml"

echo "完成。可用 'hermes kanban create <标题> --assignee coder --skill coder-bundle' 派发任务验证。"
