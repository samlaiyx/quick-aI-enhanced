## Context

这是一个全新的 VS Code 扩展项目，用于简化开发者的日常工作流。项目已初始化，当前版本支持多个 AI 编程工具的快速访问。

**技术栈：**
- TypeScript
- VS Code Extension API
- Node.js

**约束条件：**
- Mac 平台特定功能（`open -a "Warp" .` 命令）
- 学习项目，目标是简洁实用

## Goals / Non-Goals

**Goals:**
- 提供快速打开 Warp 终端的功能
- 提供一键执行多个 AI CLI 的功能（Claude、Opencode 等）
- 支持用户自定义命令配置
- 简洁的实现，易于理解和维护
- 良好的用户体验（响应快速、行为一致）

**Non-Goals:**
- 跨平台支持（仅 Mac）
- 复杂的命令链或管道
- 与所有终端应用的深度集成
- 自动检测 CLI 是否安装

## Decisions

### 决策 1: 状态栏图标实现方式

**选择：** 使用 `vscode.window.createStatusBarItem`

**理由：**
- VS Code 官方 API，稳定可靠
- 可以精确定位在状态栏右侧
- 支持自定义图标和 tooltip
- 点击事件处理简单直接

**替代方案考虑：**
- 使用 `vscode.createTerminal` + shell 命令：会创建不必要的终端窗口

### 决策 2: 打开 Warp 的方式

**选择：** 使用 Node.js `child_process.exec` 执行 `open` 命令

**理由：**
- 直接执行系统命令，不创建可见终端
- 执行速度快，用户体验好
- 错误处理简单直接

**替代方案考虑：**
- 使用 VS Code 终端 API：会创建可见终端窗口

### 决策 3: CLI 命令执行方式

**选择：** 每次创建新的独立终端

**理由：**
- 避免干扰用户正在使用的终端
- 确保命令执行环境干净
- 符合用户期望（"快速启动新对话"）

**实现细节：**
```typescript
const terminal = vscode.window.createTerminal({
  name: 'Quick Claude',
  cwd: vscode.workspace.rootPath
});
terminal.sendText('claude --dangerously-skip-permissions\n');
terminal.show();
```

### 决策 4: 多状态栏图标布局

**选择：** 每个命令对应独立的状态栏项

**理由：**
- 清晰直观，用户一眼能看到所有可用功能
- 点击即可触发，无需打开命令面板
- 独立管理，代码结构清晰

**布局顺序（从左到右）：**
1. Warp 图标
2. Claude 图标
3. Opencode 图标
4. 自定义命令图标（按配置顺序）

### 决策 5: 可配置命令系统

**选择：** 使用 VS Code configuration API

**理由：**
- 符合 VS Code 扩展的配置惯例
- 用户可以在 settings.json 或 UI 中配置
- 支持配置热重载（窗口重新加载后生效）

**配置格式：**
```json
{
  "quickAI.customCommands": [
    {
      "name": "My Command",
      "command": "my-command --args",
      "icon": "$(icon-name)",
      "keybinding": "cmd+shift+m"
    }
  ]
}
```

### 决策 6: 项目初始化工具

**选择：** 使用官方 Yeoman generator

**理由：**
- VS Code 官方推荐
- 自动生成标准项目结构
- 包含必要的配置文件（tsconfig.json, package.json）
- 开箱即用的调试配置

### 决策 7: 图标资源

**选择：** 使用 VS Code Codicons

**理由：**
- 内置图标，无需管理资源文件
- 风格统一，与 VS Code 一致
- 可通过 `$(icon-name)` 语法使用

## Risks / Trade-offs

### 风险 1: CLI 未安装
**影响：** 终端会显示 "command not found" 错误
**缓解措施：** 在 README 中明确说明前置条件

### 风险 2: 命令执行时机
**影响：** 终端可能还未完全初始化就发送命令
**缓解措施：** VS Code 终端 API 会自动排队处理 sendText

### 风险 3: Mac 依赖
**影响：** 插件无法在 Windows/Linux 上使用
**权衡：** 当前目标是满足个人需求，跨平台支持是非目标

### 风险 4: 状态栏过于拥挤
**影响：** 多个图标可能占用状态栏空间
**缓解措施：**
- 使用简洁的图标 + 短文字
- 控制默认图标数量
- 用户可以禁用不需要的功能

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    扩展架构 (更新版)                      │
├─────────────────────────────────────────────────────────┤
│                                                         │
│  extension.ts (入口)                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ activate()                                        │  │
│  │  ├─ 读取用户配置                                  │  │
│  │  ├─ 注册状态栏图标（Warp, Claude, Opencode）     │  │
│  │  ├─ 动态注册自定义命令                           │  │
│  │  └─ 设置点击事件处理器                            │  │
│  └──────────────────────────────────────────────────┘  │
│           │                    │                         │
│           ▼                    ▼                         │
│  ┌──────────────┐    ┌──────────────┐                   │
│  │ Status Bar   │    │ Commands     │                   │
│  │              │    │              │                   │
│  │ Warp Icon    │    │ quickClaude  │                   │
│  │ Claude Icon  │    │ quickOpencode│                   │
│  │ Opencode Icon│    │ customCmds   │                   │
│  │ Custom Icons │    │              │                   │
│  └──────────────┘    └──────────────┘                   │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

## Open Questions

1. **配置验证时机**：是在扩展激活时验证，还是在命令执行时验证？
   - 倾向：激活时验证，避免运行时错误

2. **状态栏图标位置**：多个图标如何排序？
   - 决定：按功能重要性排序（Warp > Claude > Opencode > 自定义）

3. **快捷键冲突处理**：如何处理用户配置的快捷键与系统冲突？
   - 决定：由 VS Code 自动处理冲突提示
