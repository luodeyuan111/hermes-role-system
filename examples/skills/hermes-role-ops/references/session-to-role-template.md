# 从一段对话沉淀为新角色：最小模板

> 当用户说"把当前对话沉淀成一个角色"时使用。按此模板创建角色目录、ROLE.md、config.yaml、profile.yaml、skills.whitelist 和初始 MEMORY.md。

## 操作步骤

1. **确定角色名**：用一个简短、职能明确的英文 profile 名（如 `club-reporter`、`task-assistant`）。
2. **创建目录结构**：
   ```bash
   mkdir -p ~/.hermes/profiles/<name>/{memories,sessions,skills,cron,workspace,plans,logs,cache,audio_cache,image_cache}
   touch ~/.hermes/profiles/<name>/.no-bundled-skills
   ```
3. **写 4 个核心文件**（内容见下方模板）。
4. **写初始 MEMORY.md**（可选但推荐）：把用户偏好、输出路径、固定格式、工具链写入 `memories/MEMORY.md`。
5. **验证**：
   ```bash
   hermes profile list
   HERMES_HOME=~/.hermes/profiles/<name> hermes skills list
   ```
6. **让用户从 dashboard 角色选择器进入一次**，确认角色行为正常。

## 文件模板

### profile.yaml

```yaml
description: "<角色名>：一句话职能描述"
description_auto: false
```

### config.yaml

```yaml
model:
  default: k3-256k
  provider: kimi
  base_url: https://api.kimi.com/coding/v1
skills:
  pools:
    library_dirs:
    - /home/velya/.hermes/hermes-agent/skills
    - /home/velya/.hermes/hermes-agent/optional-skills
```

### ROLE.md

```markdown
# <角色名>

一句话职能定位。

## 角色规则

1. **主要职责**：...
2. **交互习惯**：...
3. **输出风格**：...
4. **工具使用**：...
5. **记忆管理**：...
```

### skills.whitelist

```text
vault
plan
# 其他与本角色相关的技能名，每行一个
```

### MEMORY.md（初始）

```markdown
# <角色名> 记忆

## 用户偏好
- 汇报形式：...
- 输出路径：...
- 默认结构：...
- 关键工具链：...

## 重要文件位置
- Vault：...
- 输出目录：...
```

## 注意事项

- 命名 profile 的 SOUL.md 继承根目录 `~/.hermes/SOUL.md`，不要复制。
- 写其他 profile 的 memory 文件时，如果当前不是 default profile 会话，需在 `write_file` 中设置 `cross_profile=True`。
- 创建角色文件可以在任意会话完成，但修改全局共享 skill 必须切回 default 会话。
