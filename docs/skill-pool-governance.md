# Skill 池归位与周检机制

> 2026-09-14 ~ 09-20 两轮实战沉淀。规则、执行序列、教训三件事。
> 配套：`hermes-role-ops/references/weekly-skill-pool-maintenance.md`（周检作业手册，周检 cron 每轮必读）；本文是机制说明与规则记录。

---

## 一、归位总则（洛 2026-09-14 定稿）

同名遮蔽（角色本地与共享池同名）发现时，**并集方向按 skill 性质决定**，不默认往共享池塞：

| 性质 | 处置 | 共享池 |
|---|---|---|
| 角色职能强相关（只有这一个角色用、内容绑定该角色场景） | 差集并集进本地版 | 那份归档（不留） |
| 通用型（多角色会用） | 并集进共享池 | 本地那份删除 |

**洛原话：「这些既有本地版又有共享版的都应该只留下一个版本，而且这种与角色功能强相关的都应该只留下本地版，共享池里面根本就不应该有。」**

## 二、同源第二类：只在共享池、却只有一个角色用

这类**没有本地副本，shadow 检查抓不到**——审计脚本只看「本地与共享同名」，单实例在共享池里不会报。

**判据**（两条同时满足）：
1. 该名在全部 `profiles/*/skills.whitelist` 里只出现一次
2. 内容绑定该角色场景（不是通用工具）

**洛的裁决（2026-09-14）：「搬过去，别留」**——整目录搬进该角色本地池，共享池不留副本、也不留指针。

**动手序列**（已实测）：
```
tar 备份 → mv ~/.hermes/skills/<类目>/<名> profiles/<角色>/skills/<类目>/<名>
→ rmdir 空掉的类目目录 → 从 pools.common 摘名（脚本改块状 YAML，别用 config set）
→ 扫 fallout（13 处，见下）→ 跑审计验证
```

**Fallout 必扫清单**（2026-09-14 personal-quant-system 案实测 13 处）：
1. 该角色 `ROLE.md` 场景表里的「共享池总纲」字样
2. 该角色 `memories/MEMORY.md` 里「共享池只读、改动走申请」类条目
3. 该角色其他本地 skill 里指向它的「（共享池，只读）」指针（⚠️ **语义要改**：从「只读」改成「本地池总纲，可直接改」，否则该角色会继续以为改不了而绕路）
4. 被搬 skill 自己 SKILL.md 里「共享池 N 个」的规模数字
5. 底座 `AGENTS.md` 角色家族段的路由指引
6. `memories/USER.md` 里提到该 skill 的条目
7. 别的共享 skill 的 references 里指向它脚本的绝对路径
8. 池规模数字在 `hermes-skill-resolution` / `hermes-role-ops` / `hermes-context-architecture` / 周检参考文档里的出现处

**检测命令**（周检第 6 步每轮跑，只读秒出）：
```bash
cd ~/.hermes && for n in $(find skills -name SKILL.md -not -path '*/.archive/*' -not -path '*/staging/*' -exec dirname {} \; | xargs -n1 basename | sort -u); do
  hits=$(grep -lx "$n" profiles/*/skills.whitelist 2>/dev/null | wc -l); [ "$hits" -eq 1 ] && echo "单角色: $n -> $(grep -lx "$n" profiles/*/skills.whitelist | cut -d/ -f2)"
done
```
**⚠️ 命中列表天然含噪**：default（Velya）没有白名单文件，底座自用的共享 skill 一律不计入 → 命中的常是 skillsmith 白名单里那批 `hermes-*` 元技能（底座也在用）、或两三个角色共用但只有一处显式列名的。**先判性质再动。**

## 三、周检 cron 的报告红线（2026-09-20 20:06 教训）

**final response 就是交付物本身。** 洛在手机上只看得到 agent 最后交的那段话。

2026-09-20 那趟的实际事故：agent 干了 4 件机械修复（漂移 20→17），但 final response 交的是「已在上一轮完成验证、没有新改动」式的验证摘要——洛什么列表都没收到，追问了三轮才查清。

**硬性规矩**（已写进 cron prompt + 周检参考文档）：
- 必须按模板逐区块写全，一个都不能省；零漂移也要发一句话简报
- **漂移明细必须原样出现在报告里**（脚本段扫出的完整列表，逐条照抄或一行一条压缩，不许只写「漂移 N 项」四个字）
- 自动修过的机械项逐条列「改了哪个文件、改成了什么、备份路径」
- 禁止只交「验证摘要 / 已完成 / 无新改动」式流水账——那不算报告
- 第 4 步重跑验证必须真跑，报告里写重跑后的漂移数

**根因认知**：整个周检链条里脚本、调度、投递全是确定性的，唯一不可靠的一环是「无人值守的 agent 自觉遵守 prompt 里的报告格式」。所以报告格式不能是软建议，得是带教训引用的硬约束。

## 四、shadow 的并集归并规程（双向 diff 不可省）

1. **双向 diff（含 `references/` 逐文件，别只比 SKILL.md）** → 差集并进归位目标
2. tar 备份 + `hermes curator backup`
3. **删共享副本用 `hermes curator archive`，别 `rm -rf`**（删除护栏会超时变未授权；archive 可 `hermes curator restore` 回滚）
4. 从 `config.yaml` 的 `skills.pools.common` 摘名（脚本改块状 YAML；`config set` 会把列表写成字符串炸掉 pool check）
5. **扫 fallout**：别的角色白名单若也列了该名 → 立刻变 `whitelist-dangling`，要注释掉并写明原因；其它 skill 的 Related 指针补「已归本地」标注
6. 重跑审计验证漂移数下降、无新类别

## 五、首例执行记录

| 日期 | 案 | 方向 | 结果 |
|---|---|---|---|
| 2026-09-14 | `learning-companion`（scholar 本地 vs 共享池） | 角色职能强相关 → 只留本地 | 共享版 3 条独有坑并回本地，共享池归档 |
| 2026-09-14 | `velya-rp-qq-ops`（velya-rp 本地 vs 共享池） | 角色职能强相关 → 只留本地 | 本地是严格超集，共享池归档 |
| 2026-09-14 | `personal-quant-system`（仅共享池，单角色专属） | 同源第二类 → 整目录搬进 yangzhang 本地 | 共享池不留副本不留指针，13 处 fallout 全扫 |
| 2026-09-20 | 周检 cron 报告缺列表 | 机制加固 | prompt + 参考文档加报告红线 |

---

*维护：Velya（default）。规则变更需洛点头。*
