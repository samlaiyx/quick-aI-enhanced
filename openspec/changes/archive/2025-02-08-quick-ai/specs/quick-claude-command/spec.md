## ADDED Requirements

### Requirement: 通过命令面板执行 Claude 命令
插件必须提供一个可以通过命令面板触发的命令，用于快速执行 Claude CLI。

#### Scenario: 从命令面板触发
- **WHEN** 用户打开命令面板 (Cmd+Shift+P) 并搜索 "Quick Claude" 命令
- **THEN** 系统显示可执行的命令选项
- **AND** 用户选择后在新终端中执行 Claude CLI

### Requirement: 创建新终端并执行命令
插件必须创建一个新的 VS Code 内置终端，并向其发送完整的 Claude CLI 命令。

#### Scenario: 执行完整命令
- **WHEN** 命令被触发
- **THEN** 系统创建一个新的 VS Code 内置终端
- **AND** 终端显示并获得焦点
- **AND** 系统向终端发送 `claude --dangerously-skip-permissions` 命令
- **AND** 命令自动执行（包含换行符）

#### Scenario: 终端已存在
- **WHEN** 命令被触发且已有其他终端存在
- **THEN** 系统创建一个新的独立终端（不复用现有终端）
- **AND** 新终端执行 Claude CLI 命令

### Requirement: 支持快捷键绑定
用户必须能够为该命令配置自定义快捷键。

#### Scenario: 默认快捷键
- **WHEN** 插件被安装
- **THEN** 系统提供推荐的快捷键配置（可选）
- **AND** 用户可以在 VS Code 键盘设置中自定义

### Requirement: 状态栏 Claude 图标
插件必须在状态栏显示一个可点击的 Claude 图标。

#### Scenario: 状态栏图标显示
- **WHEN** 插件被激活
- **THEN** 状态栏右侧显示 Claude 图标和文字
- **AND** 图标具有描述性的 tooltip 文本

#### Scenario: 点击状态栏图标
- **WHEN** 用户点击状态栏上的 Claude 图标
- **THEN** 系统执行 Claude CLI 命令
- **AND** 在新终端中显示并执行
