# OpenSpec 使用指南

> OpenSpec 是一种规范驱动的软件开发工作流，通过"先定义，后实现"的理念提高开发可预测性和质量。

## 目录

- [快速开始](#快速开始)
- [核心概念](#核心概念)
- [完整工作流程](#完整工作流程)
- [常用命令](#常用命令)
- [Claude Skills 集成](#claude-skills-集成)
- [实战示例](#实战示例)
- [进阶用法](#进阶用法)
- [常见问题](#常见问题)

---

## 快速开始

### 1. 安装 OpenSpec CLI

```bash
npm install -g openspec

# 验证安装
openspec --version
```

### 2. 初始化项目

```bash
# 在项目根目录运行
openspec init
```

这会创建以下目录结构：

```
openspec/
├── config.yaml       # 项目配置
├── specs/            # 主规范目录
└── changes/          # 变更目录
    └── archive/      # 已归档的变更
```

### 3. 配置项目

编辑 `openspec/config.yaml`：

```yaml
schema: spec-driven

# 项目上下文（可选）
# context: |
#   Tech stack: TypeScript, React, Node.js
#   使用 conventional commits
#   领域: AI 辅助开发工具
```

### 4. 第一个变更

```bash
# 使用 Claude Code
/opsx:new

# 或使用 CLI
openspec new change "my-first-feature"
```

---

## 核心概念

### 什么是 Change（变更）？

**Change** 是一个功能、修复或改进的完整工作单元。每个变更包含：

- **提案（Proposal）**：为什么要做
- **规范（Specs）**：具体要做什么
- **设计（Design）**：技术上怎么做
- **任务（Tasks）**：具体实施步骤

### 什么是 Artifact（制品）？

**Artifact** 是变更过程中产生的文档，按照特定顺序创建：

```
proposal → specs → design → tasks
```

| 制品 | 作用 | 回答的问题 |
|------|------|-----------|
| **proposal** | 描述动机和目标 | Why？为什么做？ |
| **specs** | 详细功能规范 | What？做什么？ |
| **design** | 技术设计方案 | How？怎么实现？ |
| **tasks** | 实施任务清单 | Steps？具体步骤？ |

### 什么是 Schema（工作流模式）？

**Schema** 定义了制品的创建顺序和依赖关系。默认的 `spec-driven` 工作流：

```
proposal (ready)
    ↓
specs (requires proposal)
    ↓
design (requires proposal)
    ↓
tasks (requires specs + design)
```

你可以通过 `openspec schema fork` 或 `openspec schema init` 创建自定义工作流。

---

## 完整工作流程

OpenSpec 的完整工作流包含 7 个阶段：

```
┌─────────────────────────────────────────────────────────────┐
│                    1. 探索阶段 (/opsx:explore)               │
│   思考需求、调研问题、澄清目标                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    2. 创建变更 (/opsx:new)                   │
│   创建变更目录，选择工作流模式                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    3. 创建 Proposal                         │
│   描述"为什么"要做这个变更                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    4. 创建 Specs                            │
│   详细描述"做什么"功能规范                                    │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    5. 创建 Design                           │
│   技术设计方案，架构和实现方式                                │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    6. 创建 Tasks                            │
│   分解实施任务清单                                          │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    7. 实施与验证 (/opsx:apply)               │
│   按照 tasks 实施代码，验证功能                              │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    8. 归档变更 (/opsx:archive)              │
│   完成后归档，同步增量规范到主规范                            │
└─────────────────────────────────────────────────────────────┘
```

### 快捷方式

- `/opsx:ff` - 快速创建所有制品（跳过逐步创建）
- `/opsx:onboard` - 引导式入门教程

---

## 常用命令

### 变更管理

```bash
# 创建新变更
openspec new change "<change-name>"

# 查看变更列表
openspec list

# 查看变更状态
openspec status --change "<change-name>"

# 查看变更详情
openspec show change "<change-name>"
```

### 制品创建

```bash
# 获取制品创建指导
openspec instructions <artifact-id> --change "<change-name>"

# 例如：
openspec instructions proposal --change "my-feature"
openspec instructions specs --change "my-feature"
```

### 规范管理

```bash
# 查看规范列表
openspec list --specs

# 查看规范详情
openspec show spec "<spec-name>"

# 同步增量规范到主规范
openspec archive --sync "<change-name>"
```

### 其他命令

```bash
# 验证变更或规范
openspec validate change "<change-name>"
openspec validate spec "<spec-name>"

# 查看工作流模式
openspec schemas

# 交互式仪表盘
openspec view
```

---

## Claude Skills 集成

OpenSpec 提供了 Claude Code 技能集成，让你通过对话方式完成工作流。

### 可用命令

| 命令 | 用途 | 时机 |
|------|------|------|
| `/opsx:explore` | 进入探索模式 | 需求不明确时 |
| `/opsx:new` | 创建新变更 | 开始新功能时 |
| `/opsx:continue` | 创建下一个制品 | 逐步推进变更时 |
| `/opsx:ff` | 快速创建所有制品 | 想跳过逐步创建时 |
| `/opsx:apply` | 实施变更 | 开始编码时 |
| `/opsx:verify` | 验证实现 | 完成编码后 |
| `/opsx:archive` | 归档变更 | 完成所有任务后 |
| `/opsx:sync` | 同步规范 | 更新主规范时 |
| `/opsx:onboard` | 引导式教程 | 第一次使用时 |

### 使用示例

```
你: /opsx:new

Claude: What change do you want to work on?

你: 我想添加用户登录功能

Claude: 创建变更目录 "add-user-auth"...
       变更位置: openspec/changes/add-user-auth/
       当前进度: 0/4 artifacts complete

       第一个制品是 proposal，模板如下：
       [显示 proposal 模板]

       Ready to create the first artifact?
```

---

## 实战示例

让我们通过一个完整的示例来理解 OpenSpec 的工作流。

### 场景：为 VS Code 添加状态栏图标

#### 1. 创建变更

```bash
/opsx:new
```

```
What change do you want to work on?
> 添加一个状态栏图标，点击后打开 Warp 终端
```

创建的变更名：`warp-status-bar-icon`

#### 2. 创建 Proposal

文件：`openspec/changes/warp-status-bar-icon/proposal.md`

```markdown
## Why

开发者需要频繁在 VS Code 和终端之间切换，手动打开 Warp 终端是重复操作。

## What Changes

创建 VS Code 状态栏图标功能：
- 在状态栏显示 Warp 图标
- 点击图标后在 Warp 中打开当前工作目录

## Capabilities

### New Capabilities
- `warp-status-bar-icon`: 状态栏图标，点击打开 Warp 终端

### Modified Capabilities
(无)

## Impact

- 使用 VS Code Extension API
- Mac 平台特定功能
```

#### 3. 创建 Specs

文件：`openspec/changes/warp-status-bar-icon/specs/warp-status-bar-icon/spec.md`

```markdown
## ADDED Requirements

### Requirement: Status bar icon display
The extension SHALL display a Warp icon in the VS Code status bar.

#### Scenario: Icon appears on activation
- **WHEN** the extension is activated
- **THEN** a status bar item with Warp icon appears

### Requirement: Open Warp on click
The extension SHALL open the current workspace directory in Warp when the icon is clicked.

#### Scenario: Successful Warp launch
- **WHEN** user clicks the status bar icon
- **THEN** Warp terminal opens with current workspace directory
```

#### 4. 创建 Design

文件：`openspec/changes/warp-status-bar-icon/design.md`

```markdown
## Architecture

使用 VS Code Extension API 的 `window.createStatusBarItem` 创建状态栏项。

## Implementation

1. **Extension Entry Point**
   - 在 `extension.ts` 中注册状态栏项
   - 使用 `StatusBarAlignment.Right` 定位

2. **Command Handler**
   - 注册命令 `warp.openWorkspace`
   - 使用 Node.js `child_process` 执行 `open -a "Warp" .`

3. **Icon Resource**
   - 使用内置 Warp 图标或自定义 SVG

## API Contracts

```typescript
interface WarpStatusBarConfig {
  alignment: StatusBarAlignment;
  priority: number;
  command: string;
  text: string;
  tooltip: string;
}
```

## Dependencies

- `@types/vscode`: VS Code API 类型定义
```

#### 5. 创建 Tasks

文件：`openspec/changes/warp-status-bar-icon/tasks.md`

```markdown
## Implementation Tasks

- [x] 创建 VS Code 扩展项目结构
- [ ] 实现 `extension.ts` 入口文件
- [ ] 创建状态栏图标组件
- [ ] 实现点击打开 Warp 的命令
- [ ] 添加图标资源
- [ ] 编写单元测试
- [ ] 手动测试功能

## Validation Criteria

- [ ] 状态栏图标正确显示
- [ ] 点击图标能打开 Warp
- [ ] 在正确的工作目录打开
- [ ] 没有控制台错误
```

#### 6. 实施变更

```bash
/opsx:apply warp-status-bar-icon
```

Claude 会按照 tasks.md 逐步实施代码。

#### 7. 归档变更

```bash
/opsx:archive warp-status-bar-icon
```

变更会被移动到 `openspec/changes/archive/YYYY-MM-DD-warp-status-bar-icon/`

---

## 进阶用法

### 自定义工作流模式

如果你觉得默认的 4 步工作流太复杂，可以创建简化版：

```bash
# 复制默认工作流
openspec schema fork spec-driven simple

# 或创建全新的工作流
openspec schema init minimal
```

编辑生成的工作流文件，调整制品顺序和依赖关系。

### 批量归档

完成多个变更后，可以批量归档：

```bash
/opsx:bulk-archive
```

### 验证实现

在归档前验证实现是否符合规范：

```bash
/opsx:verify
```

---

## 常见问题

### Q: 必须按照 proposal → specs → design → tasks 的顺序吗？

A: 默认的 `spec-driven` 工作流是这个顺序，但你可以通过自定义 schema 来改变顺序和内容。

### Q: 可以跳过某个制品吗？

A: 不建议。每个制品都有其目的，跳过可能导致后续实施不清晰。如果觉得某个制品不重要，可以考虑自定义工作流。

### Q: 实施过程中发现设计有问题怎么办？

A: OpenSpec 支持灵活工作流。你可以随时回到之前的制品进行修改，然后继续实施。

### Q: 变更归档后还能修改吗？

A: 归档的变更不建议修改。如果需要修正，应该创建新的变更。

### Q: specs 和 proposal 的区别是什么？

A:
- **proposal**: 高层次的动机和目标，面向决策者
- **specs**: 详细的功能规范，面向开发者，包含可测试的场景

### Q: 如何处理多个相关变更？

A: 可以：
1. 创建一个大的变更包含所有功能
2. 创建多个小变更，通过依赖关系管理
3. 使用 `/opsx:bulk-archive` 批量处理

---

## 项目结构参考

```
your-project/
├── openspec/
│   ├── config.yaml           # 项目配置
│   ├── specs/                # 主规范
│   │   ├── user-auth/        # 按能力组织的规范
│   │   │   └── spec.md
│   │   └── data-export/
│   │       └── spec.md
│   └── changes/              # 进行中的变更
│       ├── archive/          # 已归档的变更
│       │   ├── 2024-01-15-add-login/
│       │   └── 2024-01-20-fix-bug/
│       └── current-feature/  # 当前变更
│           ├── .openspec.yaml
│           ├── proposal.md
│           ├── specs/
│           ├── design.md
│           └── tasks.md
├── .claude/
│   ├── skills/              # Claude Skills 定义
│   │   ├── openspec-new-change/
│   │   ├── openspec-continue-change/
│   │   └── ...
│   └── commands/            # 命令快捷方式
│       └── opsx/
│           ├── new.md
│           ├── apply.md
│           └── ...
└── src/                     # 你的代码
```

---

## 下一步

- 查看 `/opsx:onboard` 获取交互式教程
- 阅读现有变更文件作为参考
- 尝试创建你的第一个变更

---

## 参考资源

- OpenSpec 官方文档: https://openspec.dev
- OpenSpec GitHub: https://github.com/openspec-dev/openspec
