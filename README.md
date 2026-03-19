# Quick AI Enhanced

Quick access to Claude and Codex CLI with smart directory picker for VS Code.

## 安装方式

### 方式一：VSIX 文件直接安装（推荐）

从 [Releases](https://github.com/samlaiyx/quick-ai-enhanced/releases) 下载最新的 `.vsix` 文件，然后三选一安装：

1. VS Code 扩展面板 → 右上角 `...` → "从 VSIX 安装..."
2. 命令行：
   ```bash
   code --install-extension quick-claude-codex-0.4.1.vsix
   ```
3. 直接将 `.vsix` 文件拖入 VS Code 扩展面板

### 方式二：从源码构建安装

```bash
git clone https://github.com/samlaiyx/quick-ai-enhanced.git
cd quick-ai-enhanced
pnpm install
pnpm run package:vsix
code --install-extension quick-claude-codex-0.4.1.vsix
```

## Features

- **Quick Launch**: One-click access to Claude and Codex CLI from the status bar
- **Smart Directory Picker**:
  - Default to current workspace directory
  - Easy switching between multiple workspaces
  - Browse any folder on your system
- **Keyboard Shortcuts**:
  - `Cmd+Shift+C` (Mac) / `Ctrl+Shift+C` (Windows) - Launch Claude
  - `Cmd+Shift+X` (Mac) / `Ctrl+Shift+X` (Windows) - Launch Codex
- **Customizable**: Configure commands and terminal location

## Usage

### Status Bar Buttons

Click the status bar icons (bottom right):
- 🤖 **Claude** - Launch Claude CLI
- ✨ **Codex** - Launch Codex CLI

### Directory Selection Flow

When you click a button:

1. **First prompt**: Choose quickly
   - ✓ Use current directory (default workspace)
   - 📁 Change directory...

2. **If you select "Change directory"**:
   - See all workspace folders
   - Or browse to any folder

This design makes it fast to use your current directory while still allowing easy switching.

## Configuration

Open VS Code settings (`Ctrl+,`) and search for "Quick AI":

```json
{
  // Show/hide status bar icons
  "quickAI.showClaudeIcon": true,
  "quickAI.showCodexIcon": true,

  // Icon display style
  "quickAI.iconStyle": "icon+text",  // or "icon"

  // Terminal location
  "quickAI.terminalLocation": "editor",  // or "panel"

  // Custom commands
  "quickAI.claudeCommand": "claude --dangerously-skip-permissions",
  "quickAI.codexCommand": "codex",

  // Custom commands (advanced)
  "quickAI.customCommands": [
    {
      "name": "Aider",
      "command": "aider --model claude",
      "icon": "$(sparkle)"
    }
  ]
}
```

## Requirements

- VS Code 1.105.0 or higher
- Claude CLI (optional) - Install from [Anthropic](https://docs.anthropic.com/claude/docs/cli)
- Codex CLI (optional)

## Changelog

### 0.3.0 (2026-03-18)

- Added smart directory picker with two-step selection
- Default to current workspace for faster workflow
- Support for browsing any folder
- Removed Warp and Opencode (focused on Claude and Codex)

### 0.2.0

- Removed Claude button (Codex only)
- Improved directory selection

### 0.1.0

- Initial release
- Fork from Quick AI by jackywjs
- Added directory picker for all commands

## Credits

Forked from [Quick AI](https://github.com/wangjs-jacky/quick-ai) by jackywjs.

## License

MIT
