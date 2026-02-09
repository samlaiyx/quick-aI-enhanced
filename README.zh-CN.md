# Quick AI

为 VS Code 提供 Warp 终端、Claude CLI 和 Opencode CLI 的快速访问。

[English](./README.md) | 简体中文

## 功能特性

- **状态栏图标**: 从状态栏快速访问 Warp、Claude 和 Opencode
- **快速 Claude 命令**: 立即执行 `claude --dangerously-skip-permissions`
- **快速 Opencode 命令**: 立即执行 `opencode`
- **自定义命令**: 通过设置配置你自己的命令
- **高度可配置**: 选择显示哪些图标、图标样式和终端位置

## 状态栏

点击状态栏中的任何图标即可执行相应的命令：

| 图标 | 命令 | 描述 |
|------|---------|-------------|
| ⌘ Warp | 在 Warp 中打开 | 在 Warp 终端中打开当前目录 |
| 🤖 Claude | 快速 Claude | 在新终端中执行 Claude CLI |
| 💻 Opencode | 快速 Opencode | 在新终端中执行 Opencode CLI |

## 系统要求

- **macOS**: 此扩展使用 macOS 特定命令
- **Warp**（可选）: 用于 Warp 状态栏功能
- **Claude CLI**（可选）: 用于快速 Claude 功能
- **Opencode CLI**（可选）: 用于快速 Opencode 功能

## 使用方法

### 状态栏图标

点击 VS Code 状态栏（右侧）中的任何图标即可执行相应命令。

### 键盘快捷键

| 快捷键 | 命令 | 描述 |
|----------|---------|-------------|
| `Cmd+Shift+C` | 快速 Claude | 执行 Claude CLI |
| `Cmd+Shift+O` | 快速 Opencode | 执行 Opencode CLI |

**注意**: 快捷键仅在编辑器获得焦点时有效。你可以在 VS Code 键盘设置中自定义它们。

### 命令面板

你也可以使用命令面板（`Cmd+Shift+P`）：

- 搜索 "Quick AI: Open in Warp"
- 搜索 "Quick AI: Quick Claude"
- 搜索 "Quick AI: Quick Opencode"

## 扩展设置

### 状态栏可见性

控制状态栏中显示哪些图标：

| 设置 | 类型 | 默认值 | 描述 |
|---------|------|---------|-------------|
| `quickAI.showWarpIcon` | boolean | true | 在状态栏显示 Warp 图标 |
| `quickAI.showClaudeIcon` | boolean | true | 在状态栏显示 Claude 图标 |
| `quickAI.showOpencodeIcon` | boolean | true | 在状态栏显示 Opencode 图标 |

**示例**: 隐藏 Opencode 图标
```json
{
  "quickAI.showOpencodeIcon": false
}
```

### 图标样式

选择图标的显示方式：

| 设置 | 类型 | 默认值 | 选项 |
|---------|------|---------|---------|
| `quickAI.iconStyle` | string | "icon+text" | `"icon"` 或 `"icon+text"` |

**示例**: 仅显示图标（不显示文字）
```json
{
  "quickAI.iconStyle": "icon"
}
```

### 终端位置

选择执行命令时终端的打开位置：

| 设置 | 类型 | 默认值 | 选项 |
|---------|------|---------|---------|
| `quickAI.terminalLocation` | string | "editor" | `"panel"`（底部）或 `"editor"`（作为标签页） |

**示例**: 在底部面板中打开终端
```json
{
  "quickAI.terminalLocation": "panel"
}
```

### 自定义命令

你可以通过配置 `quickAI.customCommands` 添加自定义命令：

#### 配置示例

```json
{
  "quickAI.customCommands": [
    {
      "name": "我的命令",
      "command": "my-command --args",
      "icon": "$(star)"
    },
    {
      "name": "运行测试",
      "command": "npm test",
      "icon": "$(beaker)"
    }
  ]
}
```

#### 配置架构

| 属性 | 类型 | 必填 | 描述 |
|----------|------|----------|-------------|
| `name` | string | 是 | 命令的显示名称 |
| `command` | string | 是 | 要执行的命令 |
| `icon` | string | 否 | 状态栏图标（VS Code Codicon，例如 `$(robot)`） |
| `keybinding` | string | 否 | 可选的键盘快捷键 |

添加或修改自定义命令后，重新加载 VS Code 窗口（`Cmd+Shift+P` → "重新加载窗口"）。

**注意**: 自定义命令是未来版本计划实现的功能。

## 完整设置示例

```json
{
  // 仅显示 Warp 和 Claude 图标
  "quickAI.showWarpIcon": true,
  "quickAI.showClaudeIcon": true,
  "quickAI.showOpencodeIcon": false,

  // 仅显示图标，不显示文字
  "quickAI.iconStyle": "icon",

  // 在编辑器标签页中打开终端
  "quickAI.terminalLocation": "editor"
}
```

## 已知问题

- 仅支持 macOS：此扩展使用 macOS 特定命令
- CLI 工具必须已安装并在 PATH 中，相应功能才能正常工作
- 配置更改立即生效（支持热重载）

## 发布说明

### 0.0.1

初始发布版本：
- Warp、Claude 和 Opencode 的状态栏图标
- 快速访问的键盘快捷键
- 可配置的图标可见性
- 可配置的图标样式（仅图标或图标+文字）
- 可配置的终端位置（面板或编辑器标签页）

## 开发

```bash
# 安装依赖
pnpm install

# 编译
pnpm run compile

# 监听文件变化
pnpm run watch

# 运行测试
pnpm run test
```

## 许可证

MIT

---

**祝你使用愉快！**
