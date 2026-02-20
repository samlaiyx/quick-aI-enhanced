# CLI 命令配置功能规范

本文档定义了 CLI 命令配置功能的规范要求。

## ADDED Requirements

### Requirement: Claude 命令配置

系统 MUST 允许用户通过 VS Code 配置自定义 Claude CLI 命令。

#### Scenario: 使用默认命令
- **WHEN** 用户未配置 `quickAI.claudeCommand`
- **THEN** 系统 SHALL 使用默认值 `claude --dangerously-skip-permissions`

#### Scenario: 使用自定义命令
- **WHEN** 用户配置 `quickAI.claudeCommand` 为 `claude --model opus`
- **THEN** 系统 SHALL 在终端执行 `claude --model opus`

#### Scenario: 配置为空时使用默认值
- **WHEN** 用户配置 `quickAI.claudeCommand` 为空字符串
- **THEN** 系统 SHALL 使用默认值 `claude --dangerously-skip-permissions`

### Requirement: Opencode 命令配置

系统 MUST 允许用户通过 VS Code 配置自定义 Opencode CLI 命令。

#### Scenario: 使用默认命令
- **WHEN** 用户未配置 `quickAI.opencodeCommand`
- **THEN** 系统 SHALL 使用默认值 `opencode`

#### Scenario: 使用自定义命令
- **WHEN** 用户配置 `quickAI.opencodeCommand` 为 `opencode --config ~/custom.json`
- **THEN** 系统 SHALL 在终端执行 `opencode --config ~/custom.json`

#### Scenario: 配置为空时使用默认值
- **WHEN** 用户配置 `quickAI.opencodeCommand` 为空字符串
- **THEN** 系统 SHALL 使用默认值 `opencode`

### Requirement: 配置实时生效

配置变更后 MUST 在下次执行命令时生效。

#### Scenario: 修改配置后立即生效
- **WHEN** 用户修改 `quickAI.claudeCommand` 配置
- **AND** 用户触发 Quick Claude 命令
- **THEN** 系统 SHALL 使用新的配置值执行命令

### Requirement: 替换为其他 CLI 工具

系统 MUST 支持用户将命令替换为其他兼容的 CLI 工具。

#### Scenario: 替换 Claude 为其他工具
- **WHEN** 用户配置 `quickAI.claudeCommand` 为 `aider --model claude`
- **THEN** 系统 SHALL 执行 `aider --model claude`
- **AND** 状态栏 Claude 图标仍然触发此命令
