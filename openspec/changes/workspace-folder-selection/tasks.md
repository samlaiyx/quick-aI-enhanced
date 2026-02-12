# 工作区文件夹选择功能 - 实施任务

本文档列出了实施工作区文件夹选择功能的具体任务清单。

## 1. 核心功能实现

- [x] 1.1 创建 `getWorkspaceFolder()` 辅助函数
  - 检查 `vscode.workspace.workspaceFolders` 是否存在
  - 无工作区时显示警告消息并返回 `undefined`
  - 单文件夹场景直接返回该文件夹
  - 多文件夹场景显示 Quick Pick 选择界面
  - 返回用户选择的文件夹或 `undefined`（用户取消）

- [x] 1.2 修改 `openWarpTerminal()` 函数
  - 将函数改为 `async`
  - 使用 `getWorkspaceFolder()` 获取工作区文件夹
  - 处理 `undefined` 返回值（用户取消或无工作区）
  - 使用 `folder.uri.fsPath` 替代 `rootPath`

- [x] 1.3 修改 `createTerminal()` 函数
  - 将函数改为 `async`
  - 使用 `getWorkspaceFolder()` 获取工作区文件夹
  - 处理 `undefined` 返回值
  - 使用 `folder.uri.fsPath` 作为终端 `cwd`

- [x] 1.4 修改 `executeQuickClaude()` 函数
  - 将函数改为 `async`
  - 处理 `createTerminal()` 的异步调用

- [x] 1.5 修改 `executeQuickOpencode()` 函数
  - 将函数改为 `async`
  - 处理 `createTerminal()` 的异步调用

## 2. 代码清理

- [x] 2.1 验证废弃 API 完全移除
  - 确认代码中不再使用 `vscode.workspace.rootPath`
  - 全局搜索 `rootPath` 确保无遗漏

## 3. 测试验证

- [ ] 3.1 测试单文件夹工作区场景
  - 打开单文件夹工作区
  - 点击 Warp 图标 → 应直接打开终端，不显示选择界面
  - 点击 Claude 图标 → 应直接创建终端
  - 点击 Opencode 图标 → 应直接创建终端

- [ ] 3.2 测试多文件夹工作区场景
  - 打开多文件夹工作区
  - 点击任意终端图标 → 应显示 Quick Pick 选择界面
  - 选择文件夹后验证终端在正确路径下打开
  - 取消选择应中止操作

- [ ] 3.3 测试无工作区场景
  - 关闭所有工作区
  - 点击任意终端图标 → 应显示警告消息
  - 验证不会创建终端或抛出错误

- [ ] 3.4 测试同名文件夹场景
  - 创建包含同名子文件夹的多根工作区
  - 验证 Quick Pick 显示的描述字段能区分同名文件夹

## 4. 发布准备

- [ ] 4.1 更新版本号
  - 在 `package.json` 中更新版本号
  - 添加 CHANGELOG 条目

- [ ] 4.2 打包扩展
  - 运行 `vsce package` 生成 `.vsix` 文件

- [ ] 4.3 本地安装测试
  - 卸载当前版本
  - 安装新打包的 `.vsix` 文件
  - 执行完整测试流程
