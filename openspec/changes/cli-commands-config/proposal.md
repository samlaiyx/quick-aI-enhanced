# CLI 命令配置功能提案

## Why

当前 `claude` 和 `opencode` 命令在代码中硬编码，用户无法自定义命令内容或替换为其他 CLI 工具。不同用户可能需要：
- 传递不同的命令行参数（如 `--model`、`--config` 等）
- 使用其他兼容的 AI CLI 工具
- 根据项目需求定制启动命令

此变更将提供配置能力，让用户可以完全自定义这些命令。

## What Changes

- 新增 `quickAI.claudeCommand` 配置项，允许自定义 Claude 命令字符串
- 新增 `quickAI.opencodeCommand` 配置项，允许自定义 Opencode 命令字符串
- 修改 `executeQuickClaude` 和 `executeQuickOpencode` 函数，从配置读取命令
- 保留默认值，确保无配置时行为不变

## Capabilities

### New Capabilities

- `cli-commands-config`: CLI 命令配置能力，允许用户自定义 Claude 和 Opencode 的执行命令

### Modified Capabilities

无。这是新增配置能力，不修改现有规范的行为定义。

## Impact

- **代码**: `src/extension.ts` 中的 `executeQuickClaude` 和 `executeQuickOpencode` 函数
- **配置**: `package.json` 中的 `contributes.configuration` 部分
- **向后兼容**: 完全兼容，默认值保持现有行为
