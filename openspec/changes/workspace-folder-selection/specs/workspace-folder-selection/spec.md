# 工作区文件夹选择功能规范

本文档定义了工作区文件夹选择功能的规范要求。

## ADDED Requirements

### Requirement: 多文件夹工作区检测

系统 MUST 检测当前 VS Code 工作区是否包含多个文件夹。

#### Scenario: 检测到多文件夹工作区
- **WHEN** 用户打开包含多个文件夹的工作区
- **THEN** 系统 SHALL 将 `vscode.workspace.workspaceFolders` 数组长度识别为大于 1

#### Scenario: 检测到单文件夹工作区
- **WHEN** 用户打开仅包含一个文件夹的工作区
- **THEN** 系统 SHALL 直接使用该文件夹，无需显示选择界面

### Requirement: 工作区文件夹选择界面

当检测到多文件夹工作区时，系统 MUST 提供一个 Quick Pick 选择界面供用户选择目标文件夹。

#### Scenario: 显示文件夹选择界面
- **WHEN** 用户触发需要工作区文件夹的操作（如打开终端）
- **AND** 当前工作区包含多个文件夹
- **THEN** 系统 SHALL 显示 Quick Pick 界面
- **AND** 界面 SHALL 包含所有可用文件夹的名称和路径

#### Scenario: 用户选择文件夹
- **WHEN** 用户从 Quick Pick 界面中选择一个文件夹
- **THEN** 系统 SHALL 使用所选文件夹执行后续操作
- **AND** 系统 SHALL 记住用户的选择以便下次使用（可选）

### Requirement: 单文件夹工作区兼容性

对于单文件夹工作区，系统 MUST 保持现有行为，不显示选择界面。

#### Scenario: 单文件夹直接使用
- **WHEN** 工作区仅包含一个文件夹
- **THEN** 系统 SHALL 直接使用该文件夹
- **AND** 系统 SHALL 不显示任何选择界面
- **AND** 用户 SHALL 体验与之前版本一致

### Requirement: 废弃 API 替换

系统 MUST 使用 `vscode.workspace.workspaceFolders` API 替代已废弃的 `vscode.workspace.rootPath` API。

#### Scenario: 获取工作区文件夹列表
- **WHEN** 系统需要访问工作区文件夹
- **THEN** 系统 SHALL 使用 `vscode.workspace.workspaceFolders` API
- **AND** 系统 SHALL 不再使用 `vscode.workspace.rootPath` API

### Requirement: 无工作区处理

当没有打开任何工作区时，系统 MUST 优雅处理错误情况。

#### Scenario: 无工作区打开
- **WHEN** 用户在无工作区打开的情况下触发操作
- **THEN** 系统 SHALL 显示友好的错误提示
- **AND** 提示 SHALL 引导用户打开一个工作区

### Requirement: Warp 终端集成

Warp 终端打开功能 MUST 支持所选的工作区文件夹。

#### Scenario: Warp 使用所选文件夹
- **WHEN** 用户选择特定工作区文件夹后打开 Warp 终端
- **THEN** Warp 终端 SHALL 在所选文件夹路径下打开

### Requirement: VS Code 集成终端集成

VS Code 集成终端创建功能 MUST 支持所选的工作区文件夹。

#### Scenario: 集成终端使用所选文件夹
- **WHEN** 用户选择特定工作区文件夹后创建集成终端
- **THEN** 集成终端 SHALL 将所选文件夹设为当前工作目录 (cwd)
