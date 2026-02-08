## Why

开发者在使用 Claude Code 时需要频繁打开对话，而手动打开 Warp 终端并输入命令是重复且低效的操作。这个插件简化了日常开发工作流，支持多个 AI 编程工具的快速访问。

## What Changes

创建 `quick-ai` VS Code 插件，提供以下功能：

- **状态栏 Warp 图标**：点击后在 Warp 终端中打开当前工作目录
- **快捷 Claude 命令**：通过命令面板或快捷键在 VS Code 内置终端中执行 `claude --dangerously-skip-permissions`
- **状态栏 Claude 图标**：在状态栏显示图标，快速执行 Claude CLI
- **快捷 Opencode 命令**：支持快速执行 opencode 命令
- **可配置命令**：支持用户自定义命令参数

## Capabilities

### New Capabilities
- `warp-status-bar`: 在状态栏显示图标，点击后在 Warp 中打开当前工作目录
- `quick-claude-command`: 通过命令/快捷键快速在新终端执行 `claude --dangerously-skip-permissions`，包括状态栏图标
- `quick-opencode-command`: 通过命令/快捷键快速在新终端执行 `opencode`，包括状态栏图标
- `configurable-commands`: 支持用户自定义命令和参数

### Modified Capabilities
(无)

## Impact

- 新增 VS Code 扩展项目
- 使用 VS Code Extension API (window.createStatusBarItem, window.createTerminal)
- Mac 平台特定功能 (依赖 `open -a "Warp" .` 命令)
- 直接执行完整命令，不依赖用户 shell 配置
- 状态栏添加多个快速访问图标
- 支持扩展配置项
