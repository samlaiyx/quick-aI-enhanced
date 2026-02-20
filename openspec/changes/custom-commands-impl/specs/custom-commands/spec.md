# 自定义命令功能规范

## ADDED Requirements

### Requirement: 读取自定义命令配置

系统 MUST 读取 `quickAI.customCommands` 配置并验证格式。

#### Scenario: 读取有效配置
- **WHEN** 用户配置了有效的 `customCommands` 数组
- **THEN** 系统 SHALL 解析每个命令对象
- **AND** 验证 `name` 和 `command` 字段存在

#### Scenario: 跳过无效配置
- **WHEN** 配置项缺少 `name` 或 `command` 字段
- **THEN** 系统 SHALL 跳过该配置项
- **AND** 继续处理其他有效配置

### Requirement: 动态注册命令

系统 MUST 为每个有效配置动态注册 VS Code 命令。

#### Scenario: 注册自定义命令
- **WHEN** 用户配置了 `{ "name": "Aider", "command": "aider" }`
- **THEN** 系统 SHALL 注册命令 `quickAI.custom.Aider`
- **AND** 执行时在终端运行 `aider`

### Requirement: 创建状态栏图标

系统 MUST 为每个自定义命令创建状态栏图标。

#### Scenario: 显示自定义图标
- **WHEN** 用户配置了 `icon` 字段
- **THEN** 系统 SHALL 使用指定的图标

#### Scenario: 默认图标
- **WHEN** 用户未配置 `icon` 字段
- **THEN** 系统 SHALL 使用默认图标 `$(circle-large-outline)`

### Requirement: 配置变更响应

配置变更后 MUST 重新加载自定义命令。

#### Scenario: 修改配置后更新
- **WHEN** 用户修改 `customCommands` 配置
- **THEN** 系统 SHALL 清除旧的自定义状态栏图标
- **AND** 重新创建新的状态栏图标
