# VS Code 插件开发学习计划

> 使用 OpenSpec 工作流开发 VS Code 插件的渐进式学习路径

创建日期：2026-02-08

---

## 📋 总览

本项目通过实践 OpenSpec 规范驱动开发理念，从零开始开发一个 VS Code 插件。

**目标：**
- 掌握 OpenSpec 工作流（探索 → 规范 → 设计 → 实施 → 验证 → 归档）
- 学习 VS Code 插件开发基础
- 完成一个可用的插件功能

---

## 🎯 学习路径

### 阶段一：学习与规划

#### 任务 1: 了解 VS Code 插件开发基础
- [x] 学习项目结构
- [x] 理解 package.json 和 extension.ts
- [x] 了解插件生命周期
- [x] 熟悉常见功能类型

**核心概念：**

```
项目结构
├── src/
│   └── extension.ts      # 插件的入口文件
├── package.json          # 插件配置清单
├── tsconfig.json         # TypeScript 配置
└── README.md             # 说明文档
```

**插件生命周期：**
```
用户操作触发 → activate() → 执行功能 → deactivate()
```

**常见功能类型：**
| 类型 | 说明 | 示例 |
|------|------|------|
| 命令 | 用户手动触发 | 右键菜单、快捷键 |
| 语言特性 | 代码辅助 | 自动补全、诊断 |
| 工作区操作 | 文件/文件夹操作 | 创建模板、批量处理 |
| UI 显示 | 界面元素 | 状态栏、侧边栏 |

#### 任务 2: 确定插件核心功能
- [ ] 使用 `/opsx:explore` 探索模式
- [ ] 明确要解决的问题
- [ ] 定义核心功能
- [ ] 确定目标用户
- [ ] 控制功能范围（小而聚焦）

**提示：** 建议从简单的功能开始，如：
- 右键菜单命令
- 快捷键触发功能
- 简单的状态栏显示

#### 任务 3: 初始化插件项目
- [ ] 安装 Node.js 和 npm
- [ ] 安装 Yeoman 和 VS Code 扩展生成器
- [ ] 运行 `yo code` 生成项目
- [ ] 配置 TypeScript
- [ ] 测试运行基础项目

**初始化命令：**
```bash
npm install -g yo generator-code
yo code
```

---

### 阶段二：OpenSpec 规范

#### 任务 4: 创建 OpenSpec 变更
- [ ] 使用 `/opsx:new` 创建变更
- [ ] 编写 **Proposal**（为什么要做）
- [ ] 定义问题和背景
- [ ] 描述变更内容

**Proposal 包含：**
- Why: 为什么要做这个插件
- What Changes: 将要改变什么
- Capabilities: 新增/修改的能力
- Impact: 影响范围

#### 任务 5: 编写 Specs（规范）
- [ ] 定义功能需求
- [ ] 使用 WHEN/THEN/AND 格式
- [ ] 确保需求可测试

**Specs 格式示例：**
```markdown
## ADDED Requirements

### Requirement: 用户可以通过命令执行功能

#### Scenario: 用户触发命令

- **WHEN** 用户按下快捷键或点击菜单
- **THEN** 插件执行相应功能
- **AND** 显示成功/失败反馈
```

#### 任务 6: 编写 Design（设计）
- [ ] 分析当前状态
- [ ] 定义目标和非目标
- [ ] 记录技术决策
- [ ] 说明实现方案

**Design 包含：**
- Context: 当前背景
- Goals / Non-Goals: 目标范围
- Decisions: 关键技术决策

#### 任务 7: 编写 Tasks（任务清单）
- [ ] 分解为小任务
- [ ] 按逻辑顺序排列
- [ ] 每个任务清晰可执行

**Tasks 示例：**
```markdown
## 1. 基础设置

- [ ] 1.1 配置 package.json
- [ ] 1.2 创建基础命令

## 2. 核心功能

- [ ] 2.1 实现命令处理逻辑
- [ ] 2.2 添加用户反馈
```

---

### 阶段三：实施与验证

#### 任务 8: 实施核心功能
- [ ] 使用 `/opsx:apply` 实施变更
- [ ] 按任务清单逐步实现
- [ ] 编写代码并测试
- [ ] 完成后勾选任务

#### 任务 9: 本地测试和调试
- [ ] 按 F5 启动调试
- [ ] 在新窗口中测试功能
- [ ] 修复发现的问题
- [ ] 确保功能稳定

#### 任务 10: 验证实现
- [ ] 使用 `/opsx:verify` 验证
- [ ] 检查实现与规范一致性
- [ ] 确认所有需求满足
- [ ] 记录任何偏差

#### 任务 11: 归档变更
- [ ] 使用 `/opsx:archive` 归档
- [ ] 变更移至 archive 目录
- [ ] 保留决策历史
- [ ] 总结学习经验

---

## 📚 参考资料

### VS Code 扩展开发
- [VS Code 扩展 API](https://code.visualstudio.com/api)
- [Your First Extension](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Extension Capabilities](https://code.visualstudio.com/api/extension-capabilities/overview)

### OpenSpec
- [OpenSpec 官方网站](https://openspec.dev/)
- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)

### 开发工具
- [Yeoman](https://yeoman.io/)
- [generator-code](https://github.com/microsoft/vscode-generator-code)

---

## 📝 学习笔记

> 在这里记录你的学习心得和遇到的问题

### 日期：
- 学习内容：
- 遇到的问题：
- 解决方案：

---

## ✅ 进度追踪

- [ ] 任务 1: 了解 VS Code 插件开发基础
- [ ] 任务 2: 确定插件核心功能
- [ ] 任务 3: 初始化插件项目
- [ ] 任务 4: 创建 OpenSpec 变更
- [ ] 任务 5: 编写 Specs（规范）
- [ ] 任务 6: 编写 Design（设计）
- [ ] 任务 7: 编写 Tasks（任务清单）
- [ ] 任务 8: 实施核心功能
- [ ] 任务 9: 本地测试和调试
- [ ] 任务 10: 验证实现
- [ ] 任务 11: 归档变更

---

*最后更新：2026-02-08*
