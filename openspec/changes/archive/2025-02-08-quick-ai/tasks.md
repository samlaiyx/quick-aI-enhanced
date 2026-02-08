## 1. 项目初始化

- [x] 1.1 安装 Yeoman 和 VS Code 扩展生成器 (`npm install -g yo generator-code`)
- [x] 1.2 运行 `yo code` 生成扩展项目
- [x] 1.3 配置项目信息（名称: quick-ai, 描述: Quick access to Warp terminal and Claude CLI）
- [x] 1.4 选择 TypeScript 作为开发语言
- [x] 1.5 选择 "New Extension" 作为基础模板

## 2. 项目配置

- [x] 2.1 更新 package.json 中的基本信息（名称、版本、描述）
- [x] 2.2 在 package.json 中注册 `warpStatusBar` 命令
- [x] 2.3 在 package.json 中注册 `quickClaudeCommand` 命令
- [x] 2.4 在 package.json 中配置状态栏图标（如果使用内置图标）
- [x] 2.5 在 package.json 中添加激活事件（`onCommand:warpStatusBar`, `onCommand:quickClaudeCommand`）
- [x] 2.6 添加可选的默认快捷键绑定（`Cmd+Shift+C` 建议值）

## 3. 状态栏 Warp 图标实现

- [x] 3.1 在 extension.ts 中导入 VS Code API
- [x] 3.2 创建状态栏项 (`vscode.window.createStatusBarItem`)
- [x] 3.3 设置状态栏图标（Unicode 字符或内置图标）
- [x] 3.4 设置 tooltip 文本
- [x] 3.5 注册点击事件处理器
- [x] 3.6 实现点击处理函数：创建终端并执行 `open -a "Warp" .`
- [x] 3.7 在 activate() 函数中显示状态栏项
- [x] 3.8 在 deactivate() 函数中清理状态栏项

## 4. Quick Claude 命令实现

- [x] 4.1 在 extension.ts 中注册 `quickClaudeCommand` 命令
- [x] 4.2 实现命令处理函数
- [x] 4.3 创建新的 VS Code 终端 (`vscode.window.createTerminal`)
- [x] 4.4 设置终端名称为 'Quick Claude'
- [x] 4.5 设置工作目录为当前工作区根目录
- [x] 4.6 发送 Claude 命令文本（包含换行符）
- [x] 4.7 显示终端并聚焦

## 5. 代码组织和优化

- [x] 5.1 将状态栏相关代码抽取为独立函数
- [x] 5.2 将 Claude 命令相关代码抽取为独立函数
- [x] 5.3 添加必要的错误处理
- [x] 5.4 添加代码注释

## 6. 文档

- [x] 6.1 更新 README.md，说明插件功能
- [x] 6.2 添加前置条件说明（Mac 平台、可选的 Claude CLI）
- [x] 6.3 添加使用说明（状态栏图标、命令面板触发）
- [x] 6.4 添加快捷键配置说明

## 7. 测试和验证

- [x] 7.1 按 F5 启动扩展开发主机
- [x] 7.2 验证状态栏图标是否正确显示
- [x] 7.3 测试点击状态栏图标是否打开 Warp
- [x] 7.4 测试命令面板是否能找到 Quick Claude 命令
- [x] 7.5 测试执行 Quick Claude 命令是否正确创建终端并执行
- [x] 7.6 测试快捷键绑定是否正常工作（如果配置了）
- [x] 7.7 验证多次触发命令是否每次都创建新终端

## 8. Quick Claude 状态栏图标

- [x] 8.1 创建 Claude 状态栏项
- [x] 8.2 设置图标和文字 (如 `$(robot) Claude`)
- [x] 8.3 设置 tooltip 和点击命令
- [x] 8.4 更新状态栏布局（多个图标排列）

## 9. Quick Opencode 功能

- [x] 9.1 在 package.json 中注册 `quickOpencodeCommand` 命令
- [x] 9.2 在 package.json 中添加激活事件
- [x] 9.3 添加快捷键绑定（建议 `Cmd+Shift+O`）
- [x] 9.4 在 extension.ts 中注册命令处理函数
- [x] 9.5 实现命令处理函数（创建终端，发送 `opencode`）
- [x] 9.6 创建 Opencode 状态栏图标
- [x] 9.7 设置图标和文字 (如 `$(code) Opencode`)

## 10. 可配置命令系统

- [x] 10.1 在 package.json 中定义 configuration schema
- [x] 10.2 定义 `quickAI.customCommands` 配置项
- [ ] 10.3 在 extension.ts 中读取用户配置
- [ ] 10.4 验证配置格式
- [ ] 10.5 动态注册自定义命令
- [ ] 10.6 动态创建自定义状态栏图标
- [ ] 10.7 处理配置错误情况

## 11. 更新文档

- [x] 11.1 更新 README.md，添加 Opencode 功能说明
- [x] 11.2 添加自定义命令配置示例
- [ ] 11.3 更新功能截图（如果需要）

## 12. 完整测试

- [ ] 12.1 测试所有状态栏图标是否正常显示
- [ ] 12.2 测试所有命令是否正常工作
- [ ] 12.3 测试自定义命令配置功能
- [ ] 12.4 测试快捷键是否正常工作
