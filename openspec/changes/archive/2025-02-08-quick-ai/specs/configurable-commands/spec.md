## ADDED Requirements

### Requirement: 自定义命令配置
插件必须支持用户通过 VS Code 配置来自定义命令和参数。

#### Scenario: 配置自定义命令
- **WHEN** 用户在 VS Code 设置中配置 `quickAI.customCommands`
- **THEN** 系统读取用户自定义的命令列表
- **AND** 为每个自定义命令创建对应的命令和状态栏图标

#### Scenario: 自定义命令格式
- **WHEN** 用户配置自定义命令
- **THEN** 每个命令包含 `name`（显示名称）、`command`（执行的命令）、`icon`（状态栏图标）、`keybinding`（可选快捷键）

### Requirement: 配置验证
插件必须验证用户配置的命令格式。

#### Scenario: 无效配置
- **WHEN** 用户配置的命令格式无效
- **THEN** 系统显示错误提示
- **AND** 不加载无效的命令

#### Scenario: 缺少配置
- **WHEN** 用户没有配置自定义命令
- **THEN** 系统正常运行默认功能（Claude、Opencode）

### Requirement: 动态命令注册
插件必须根据配置动态注册命令和状态栏图标。

#### Scenario: 配置变更后重新加载
- **WHEN** 用户修改配置并重新加载窗口
- **THEN** 系统重新读取配置
- **AND** 重新注册所有命令和状态栏图标
