# 自定义命令实现任务清单

## 1. 类型定义

- [x] 1.1 定义 `CustomCommand` 接口（name, command, icon?）

## 2. 代码实现

- [x] 2.1 添加 `customStatusBarItems` 数组存储自定义状态栏项
- [x] 2.2 实现 `createCustomStatusBarItems()` 函数
- [x] 2.3 实现 `disposeCustomStatusBarItems()` 函数
- [x] 2.4 在 `activate` 中调用自定义命令注册
- [x] 2.5 在配置变更监听器中处理自定义命令更新

## 3. 测试验证

- [x] 3.1 验证自定义命令状态栏图标显示
- [x] 3.2 验证点击图标执行正确命令
- [x] 3.3 验证配置变更后图标更新
