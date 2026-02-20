# Quick AI

Quick access to Warp terminal, Claude CLI, and Opencode CLI for VS Code.

English | [简体中文](./README.zh-CN.md)

## Features

- **Status Bar Icons**: Quick access to Warp, Claude, and Opencode from the status bar
- **Quick Claude Command**: Execute `claude --dangerously-skip-permissions` instantly
- **Quick Opencode Command**: Execute `opencode` instantly
- **Custom Commands**: Configure your own commands via settings
- **Configurable**: Choose which icons to show, icon style, and terminal location

## Status Bar

Click any icon in the status bar to execute the corresponding command:

| Icon | Command | Description |
|------|---------|-------------|
| ⌘ Warp | Open in Warp | Opens current directory in Warp terminal |
| 🤖 Claude | Quick Claude | Executes Claude CLI in a new terminal |
| 💻 Opencode | Quick Opencode | Executes Opencode CLI in a new terminal |

## Requirements

- **macOS**: This extension uses macOS-specific commands
- **Warp** (optional): For the Warp status bar feature
- **Claude CLI** (optional): For the Quick Claude feature
- **Opencode CLI** (optional): For the Quick Opencode feature

## Usage

### Status Bar Icons

Click any icon in the VS Code status bar (right side) to execute the corresponding command.

### Keyboard Shortcuts

| Shortcut | Command | Description |
|----------|---------|-------------|
| `Cmd+Shift+C` | Quick Claude | Execute Claude CLI |
| `Cmd+Shift+O` | Quick Opencode | Execute Opencode CLI |

**Note**: Shortcuts work when the editor has focus. You can customize them in VS Code Keyboard Settings.

### Command Palette

You can also use the Command Palette (`Cmd+Shift+P`):

- Search for "Quick AI: Open in Warp"
- Search for "Quick AI: Quick Claude"
- Search for "Quick AI: Quick Opencode"

## Extension Settings

### Status Bar Visibility

Control which icons appear in the status bar:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `quickAI.showWarpIcon` | boolean | true | Show Warp icon in status bar |
| `quickAI.showClaudeIcon` | boolean | true | Show Claude icon in status bar |
| `quickAI.showOpencodeIcon` | boolean | true | Show Opencode icon in status bar |

**Example**: Hide Opencode icon
```json
{
  "quickAI.showOpencodeIcon": false
}
```

### Icon Style

Choose how icons are displayed:

| Setting | Type | Default | Options |
|---------|------|---------|---------|
| `quickAI.iconStyle` | string | "icon+text" | `"icon"` or `"icon+text"` |

**Example**: Show only icons (no text)
```json
{
  "quickAI.iconStyle": "icon"
}
```

### Terminal Location

Choose where terminals open when executing commands:

| Setting | Type | Default | Options |
|---------|------|---------|---------|
| `quickAI.terminalLocation` | string | "panel" | `"panel"` (bottom) or `"editor"` (as tab) |

**Example**: Open terminals as editor tabs
```json
{
  "quickAI.terminalLocation": "editor"
}
```

### CLI Commands

Customize the commands executed by the Claude and Opencode status bar icons:

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `quickAI.claudeCommand` | string | `claude --dangerously-skip-permissions` | Command to execute when clicking Claude icon |
| `quickAI.opencodeCommand` | string | `opencode` | Command to execute when clicking Opencode icon |

**Example**: Use Claude with a specific model
```json
{
  "quickAI.claudeCommand": "claude --model opus"
}
```

**Example**: Use a different AI CLI tool
```json
{
  "quickAI.claudeCommand": "aider --model claude-3-opus"
}
```

### Custom Commands

Add your own commands to the status bar by configuring `quickAI.customCommands`:

#### Example Configuration

```json
{
  "quickAI.customCommands": [
    {
      "name": "Aider",
      "command": "aider --model claude",
      "icon": "$(sparkle)"
    },
    {
      "name": "Gemini",
      "command": "gemini-cli",
      "icon": "$(debug-start)"
    },
    {
      "name": "Run Tests",
      "command": "npm test",
      "icon": "$(beaker)"
    },
    {
      "name": "Git Status",
      "command": "git status",
      "icon": "$(source-control)"
    }
  ]
}
```

#### Configuration Schema

| Property | Type | Required | Description |
|----------|------|----------|-------------|
| `name` | string | Yes | Display name shown in status bar |
| `command` | string | Yes | The terminal command to execute |
| `icon` | string | No | Status bar icon (VS Code Codicon format, e.g., `$(robot)`) |

#### Available Icons

You can use any [VS Code Codicon](https://code.visualstudio.com/api/references/icons-in-labels). Popular choices:

| Icon | Codicon |
|------|---------|
| 🤖 Robot | `$(robot)` |
| ✨ Sparkle | `$(sparkle)` |
| ▶️ Play | `$(debug-start)` |
| 🔀 Source Control | `$(source-control)` |
| ⚗️ Beaker | `$(beaker)` |
| ⚙️ Gear | `$(gear)` |
| 💻 Code | `$(code)` |
| 🖥️ Terminal | `$(terminal)` |

**Note**: After adding or modifying custom commands, reload the VS Code window (`Cmd+Shift+P` → "Reload Window").

## Complete Settings Example

```json
{
  // Status bar visibility
  "quickAI.showWarpIcon": true,
  "quickAI.showClaudeIcon": true,
  "quickAI.showOpencodeIcon": true,

  // Show only icons, no text
  "quickAI.iconStyle": "icon",

  // Open terminals as editor tabs
  "quickAI.terminalLocation": "editor",

  // Custom CLI commands
  "quickAI.claudeCommand": "claude --model opus",
  "quickAI.opencodeCommand": "opencode --config ~/.opencode.json",

  // Custom commands
  "quickAI.customCommands": [
    {
      "name": "Aider",
      "command": "aider --model claude",
      "icon": "$(sparkle)"
    }
  ]
}
```

## Known Issues

- macOS only: The extension uses macOS-specific commands
- CLI tools must be installed and in your PATH for respective features to work
- Configuration changes take effect immediately (hot reload supported)

## Release Notes

### 0.0.1

Initial release:
- Status bar icons for Warp, Claude, and Opencode
- Keyboard shortcuts for quick access
- Configurable icon visibility
- Configurable icon style (icon or icon+text)
- Configurable terminal location (panel or editor tab)

## Development

```bash
# Install dependencies
pnpm install

# Compile
pnpm run compile

# Watch for changes
pnpm run watch

# Run tests
pnpm run test
```

## License

MIT

---

**Enjoy!**
