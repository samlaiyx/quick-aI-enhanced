# 工作区文件夹选择功能技术设计

## Context

### 当前状态

扩展当前使用已废弃的 `vscode.workspace.rootPath` API，该 API 仅返回第一个工作区文件夹。在多根工作区场景下，用户无法选择要使用的文件夹。

### 受影响的代码

- `src/extension.ts` 第 153-166 行：`openWarpTerminal()` 函数
- `src/extension.ts` 第 171-189 行：`createTerminal()` 函数

### 约束条件

- 必须保持向后兼容单文件夹工作区的体验
- 不引入新的外部依赖
- 不改变扩展的公开 API
- 变更应对现有用户透明（单文件夹场景下）

## Goals / Non-Goals

**Goals:**

1. 支持多根工作区文件夹选择
2. 替换废弃的 `vscode.workspace.rootPath` API
3. 在多文件夹场景下提供直观的选择界面
4. 保持单文件夹场景的现有行为不变

**Non-Goals:**

1. 持久化用户的文件夹选择（可在未来版本添加）
2. 支持选择"无文件夹"的场景
3. 修改终端命令的执行逻辑（仅修改 cwd）

## Decisions

### Decision 1: 使用 `vscode.workspace.workspaceFolders` API

**选择：** 使用 `vscode.workspace.workspaceFolders` 替代 `vscode.workspace.rootPath`

**理由：**
- `vscode.workspace.rootPath` 已废弃且仅支持单文件夹
- `workspaceFolders` 返回 `readonly WorkspaceFolder[]`，支持多文件夹场景
- VS Code 官方推荐使用此 API

**替代方案（未采用）：**
- 使用 `vscode.workspace.workspaceFolders[0]`：无法解决多文件夹选择问题

### Decision 2: Quick Pick UI 选择机制

**选择：** 使用 `vscode.window.showQuickPick()` 显示文件夹选择界面

**理由：**
- VS Code 原生 UI 组件，用户体验一致
- 支持键盘快捷操作
- 可自定义显示项的标签和描述

**实现方式：**

```typescript
interface WorkspaceFolderItem extends vscode.QuickPickItem {
  folder: vscode.WorkspaceFolder;
}

const items = workspaceFolders.map(folder => ({
  label: folder.name,
  description: folder.uri.fsPath,
  folder: folder
}));

const selected = await vscode.window.showQuickPick(items);
```

**替代方案（未采用）：**
- 使用输入框输入路径：用户体验差，容易出错
- 使用自定义 Webview：过度设计，增加复杂度

### Decision 3: 单文件夹直接使用，不显示选择界面

**选择：** 当 `workspaceFolders.length === 1` 时，直接使用该文件夹

**理由：**
- 保持向后兼容，不改变单文件夹用户的现有体验
- 避免不必要的 UI 操作

### Decision 4: 创建统一的文件夹获取函数

**选择：** 创建 `getWorkspaceFolder()` 辅助函数

**理由：**
- 统一处理文件夹选择逻辑
- 避免代码重复
- 便于后续维护和测试

**函数签名：**

```typescript
async function getWorkspaceFolder(): Promise<vscode.WorkspaceFolder | undefined>
```

**返回值处理：**
- `undefined`：用户取消选择或无工作区
- `WorkspaceFolder`：选中的文件夹

### Decision 5: 无工作区场景的错误处理

**选择：** 在 `getWorkspaceFolder()` 中统一处理无工作区情况

**理由：**
- 提供统一的错误提示
- 避免在多个地方重复检查

**实现：**

```typescript
if (!vscode.workspace.workspaceFolders || vscode.workspace.workspaceFolders.length === 0) {
  vscode.window.showWarningMessage('请先打开一个工作区文件夹');
  return undefined;
}
```

## Risks / Trade-offs

### Risk 1: 用户每次操作都需要选择文件夹

**风险：** 在多文件夹工作区中，用户每次打开终端都需要选择文件夹

**缓解措施：**
- 当前版本：接受此行为，优先确保功能正确性
- 未来改进：可添加配置项"记住上次选择的文件夹"

### Risk 2: 废弃 API 替换的兼容性

**风险：** 旧版本 VS Code 可能不支持 `workspaceFolders` API

**缓解措施：**
- `workspaceFolders` API 在 VS Code 1.17+ 版本可用（2017年发布）
- 现代用户很少使用更早版本，风险可接受

### Trade-off: 同步 vs 异步选择

**权衡：**
- 原代码是同步的
- Quick Pick 是异步的，需要将调用函数改为 `async`

**决策：** 接受异步改造

**理由：**
- Quick Pick API 本质是异步的
- VS Code 扩展的命令函数支持 async/await
- 用户体验影响极小

## Migration Plan

### 部署步骤

1. 创建 `getWorkspaceFolder()` 辅助函数
2. 修改 `openWarpTerminal()` 为异步函数
3. 修改 `createTerminal()` 为异步函数
4. 修改 `executeQuickClaude()` 和 `executeQuickOpencode()` 为异步函数
5. 本地测试单文件夹和多文件夹场景
6. 发布新版本

### 回滚策略

- 保留 Git 历史，可随时回滚到之前版本
- 变更不涉及数据迁移，回滚无副作用

## Open Questions

**Q1: 是否需要持久化用户的选择？**

- 当前版本：否
- 未来考虑：可作为配置项添加

**Q2: 文件夹名称相同时如何处理？**

- 当前方案：在 Quick Pick 中显示完整路径作为描述字段
- 用户可通过描述字段区分同名文件夹
