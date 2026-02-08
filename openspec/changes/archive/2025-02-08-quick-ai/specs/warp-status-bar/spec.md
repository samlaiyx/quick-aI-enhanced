## ADDED Requirements

### Requirement: 状态栏显示 Warp 图标
插件必须在 VS Code 状态栏中显示一个可点击的图标。

#### Scenario: 图标显示
- **WHEN** 插件被激活
- **THEN** 状态栏右侧显示 Warp 图标
- **AND** 图标具有描述性的 tooltip 文本

### Requirement: 点击图标在 Warp 中打开当前目录
当用户点击状态栏图标时，系统必须在 Warp 终端中打开当前工作目录。

#### Scenario: 成功打开 Warp
- **WHEN** 用户点击状态栏上的 Warp 图标
- **THEN** 系统执行 `open -a "Warp" .` 命令
- **AND** Warp 终端打开并显示当前工作目录

#### Scenario: Warp 未安装
- **WHEN** 用户点击状态栏图标但 Warp 未安装
- **THEN** 系统 macOS 显示默认错误提示
