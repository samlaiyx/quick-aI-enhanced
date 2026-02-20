# 自定义命令实现提案

## Why

`quickAI.customCommands` 配置项已在 `package.json` 中定义，但代码中未实现。用户配置后无法生效。

## What Changes

- 读取 `customCommands` 配置
- 为每个自定义命令动态创建状态栏图标
- 动态注册命令（不支持快捷键，VS Code 限制）

## Capabilities

### New Capabilities

- `custom-commands`: 自定义命令动态注册能力

### Modified Capabilities

无。

## Impact

- **代码**: `src/extension.ts` 中的 `activate` 和 `createStatusBarItems` 函数
- **向后兼容**: 完全兼容
