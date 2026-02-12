# Change Log

All notable changes to the "quick-ai" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.

## [0.0.3] - 2025-02-12

### Added
- 多文件夹工作区支持：当工作区包含多个文件夹时，显示 Quick Pick 选择界面供用户选择目标文件夹
- 使用 `vscode.workspace.workspaceFolders` API 替代已废弃的 `vscode.workspace.rootPath`

### Changed
- 改进文件夹选择逻辑：单文件夹工作区保持原有行为，无需选择
- 所有终端相关函数改为异步以支持文件夹选择