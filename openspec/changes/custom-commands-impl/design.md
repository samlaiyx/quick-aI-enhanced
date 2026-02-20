# 自定义命令实现设计

## Context

用户在 `package.json` 中配置 `customCommands`，需要扩展在运行时动态注册这些命令。

## Goals / Non-Goals

**Goals:**
- 读取 `customCommands` 配置并验证
- 为每个有效命令创建状态栏图标
- 动态注册 VS Code 命令
- 配置变更后自动更新

**Non-Goals:**
- 不支持动态快捷键（VS Code API 限制，需要 package.json 预定义）

## Decisions

### 1. 命令注册策略

**决定**: 在 `activate` 时遍历配置，为每个命令调用 `vscode.commands.registerCommand`

**实现**:
```typescript
const customCommands = config.get<CustomCommand[]>('customCommands', []);
customCommands.forEach(cmd => {
  const commandId = `quickAI.custom.${sanitize(cmd.name)}`;
  const disposable = vscode.commands.registerCommand(commandId, () => {
    // 执行命令
  });
  context.subscriptions.push(disposable);
});
```

### 2. 状态栏图标

**决定**: 为每个自定义命令创建状态栏项，按配置顺序排列（priority 递减）

## Risks / Trade-offs

| 风险 | 缓解措施 |
|------|----------|
| 命令名称冲突 | 使用前缀 `quickAI.custom.` |
| 配置格式无效 | 验证必填字段，跳过无效项 |
