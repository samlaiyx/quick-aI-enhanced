# CLI 命令配置功能设计

## Context

当前 `executeQuickClaude` 和 `executeQuickOpencode` 函数中硬编码了命令字符串：

```typescript
terminal.sendText('claude --dangerously-skip-permissions\n');
terminal.sendText('opencode\n');
```

用户无法自定义这些命令，限制了灵活性。

## Goals / Non-Goals

**Goals:**
- 允许用户通过 VS Code 设置配置完整的 CLI 命令字符串
- 保持向后兼容，默认值与当前行为一致
- 配置变更后立即生效（通过现有的配置监听机制）

**Non-Goals:**
- 不提供命令参数的单独配置项（使用完整字符串更灵活）
- 不修改现有的 `customCommands` 功能
- 不提供命令验证功能

## Decisions

### 1. 配置项设计

**决定**: 使用字符串类型的配置项，存储完整命令（不含换行符）

**理由**:
- 简单直观，用户可以直接复制终端命令
- 比 JSON 对象更易于配置
- 比 JSON 对象更易于理解

**配置项定义**:
```json
{
  "quickAI.claudeCommand": {
    "type": "string",
    "default": "claude --dangerously-skip-permissions",
    "description": "Claude CLI 命令（不含换行符）"
  },
  "quickAI.opencodeCommand": {
    "type": "string",
    "default": "opencode",
    "description": "Opencode CLI 命令（不含换行符）"
  }
}
```

### 2. 代码修改策略

**决定**: 在 `getConfig()` 函数中读取新配置，在执行函数中使用

**修改点**:
1. `getConfig()` - 添加 `claudeCommand` 和 `opencodeCommand` 字段
2. `executeQuickClaude()` - 从配置读取命令
3. `executeQuickOpencode()` - 从配置读取命令

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| 用户配置无效命令 | 命令在终端执行，错误信息会直接显示 |
| 配置为空字符串 | 使用默认值兜底 |
