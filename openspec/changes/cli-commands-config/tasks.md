# CLI 命令配置功能任务清单

## 1. 配置项添加

- [x] 1.1 在 `package.json` 中添加 `quickAI.claudeCommand` 配置项（类型：string，默认值：`claude --dangerously-skip-permissions`）
- [x] 1.2 在 `package.json` 中添加 `quickAI.opencodeCommand` 配置项（类型：string，默认值：`opencode`）

## 2. 代码实现

- [x] 2.1 修改 `getConfig()` 函数，添加读取 `claudeCommand` 和 `opencodeCommand` 配置
- [x] 2.2 修改 `executeQuickClaude()` 函数，使用配置中的命令替代硬编码值
- [x] 2.3 修改 `executeQuickOpencode()` 函数，使用配置中的命令替代硬编码值

## 3. 测试验证

- [x] 3.1 验证默认配置行为与之前一致
- [x] 3.2 验证自定义命令能够正确执行
- [x] 3.3 验证配置变更后重新执行命令使用新值
