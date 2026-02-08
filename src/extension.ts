// VS Code Extension API
import * as vscode from 'vscode';
import { exec } from 'child_process';

// 状态栏项引用
let warpStatusBarItem: vscode.StatusBarItem | undefined;
let claudeStatusBarItem: vscode.StatusBarItem | undefined;
let opencodeStatusBarItem: vscode.StatusBarItem | undefined;

// 配置变更监听器
let configChangeListener: vscode.Disposable | undefined;

/**
 * 激活扩展时调用
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Quick AI extension is now active!');

	// 注册状态栏 Warp 命令
	const warpStatusBarCommand = vscode.commands.registerCommand(
		'warpStatusBar',
		openWarpTerminal
	);
	context.subscriptions.push(warpStatusBarCommand);

	// 注册 Quick Claude 命令
	const quickClaudeCommand = vscode.commands.registerCommand(
		'quickClaudeCommand',
		executeQuickClaude
	);
	context.subscriptions.push(quickClaudeCommand);

	// 注册 Quick Opencode 命令
	const quickOpencodeCommand = vscode.commands.registerCommand(
		'quickOpencodeCommand',
		executeQuickOpencode
	);
	context.subscriptions.push(quickOpencodeCommand);

	// 创建并显示状态栏图标
	createStatusBarItems(context);

	// 监听配置变更
	configChangeListener = vscode.workspace.onDidChangeConfiguration(event => {
		if (event.affectsConfiguration('quickAI')) {
			console.log('配置已变更，重新创建状态栏图标');
			// 清理旧的状态栏项
			disposeStatusBarItems();
			// 重新创建状态栏图标
			createStatusBarItems(context);
		}
	});
	context.subscriptions.push(configChangeListener!);
}

/**
 * 获取配置
 */
function getConfig() {
	const config = vscode.workspace.getConfiguration('quickAI');
	return {
		showWarpIcon: config.get<boolean>('showWarpIcon', true),
		showClaudeIcon: config.get<boolean>('showClaudeIcon', true),
		showOpencodeIcon: config.get<boolean>('showOpencodeIcon', true),
		iconStyle: config.get<string>('iconStyle', 'icon+text'),
		terminalLocation: config.get<string>('terminalLocation', 'panel') as 'panel' | 'editor'
	};
}

/**
 * 获取状态栏文本
 */
function getStatusBarText(icon: string, text: string): string {
	const config = getConfig();
	if (config.iconStyle === 'icon') {
		return `$(${icon})`;
	}
	return `$(${icon}) ${text}`;
}

/**
 * 创建状态栏图标
 */
function createStatusBarItems(context: vscode.ExtensionContext): void {
	const config = getConfig();

	// 1. Claude 状态栏图标 (最常用，放在最左边)
	if (config.showClaudeIcon) {
		claudeStatusBarItem = vscode.window.createStatusBarItem(
			'quickAI.claudeStatusBar',
			vscode.StatusBarAlignment.Right,
			100
		);
		claudeStatusBarItem.text = getStatusBarText('robot', 'Claude');
		claudeStatusBarItem.tooltip = 'Quick Claude CLI';
		claudeStatusBarItem.command = 'quickClaudeCommand';
		claudeStatusBarItem.show();
		context.subscriptions.push(claudeStatusBarItem);
	}

	// 2. Opencode 状态栏图标 (次常用，放在中间)
	if (config.showOpencodeIcon) {
		opencodeStatusBarItem = vscode.window.createStatusBarItem(
			'quickAI.opencodeStatusBar',
			vscode.StatusBarAlignment.Right,
			99
		);
		opencodeStatusBarItem.text = getStatusBarText('code', 'Opencode');
		opencodeStatusBarItem.tooltip = 'Quick Opencode CLI';
		opencodeStatusBarItem.command = 'quickOpencodeCommand';
		opencodeStatusBarItem.show();
		context.subscriptions.push(opencodeStatusBarItem);
	}

	// 3. Warp 状态栏图标 (偶尔用，放在最右边)
	if (config.showWarpIcon) {
		warpStatusBarItem = vscode.window.createStatusBarItem(
			'quickAI.warpStatusBar',
			vscode.StatusBarAlignment.Right,
			98
		);
		warpStatusBarItem.text = getStatusBarText('terminal', 'Warp');
		warpStatusBarItem.tooltip = 'Open in Warp Terminal';
		warpStatusBarItem.command = 'warpStatusBar';
		warpStatusBarItem.show();
		context.subscriptions.push(warpStatusBarItem);
	}

	console.log('状态栏图标已创建，配置:', config);
}

/**
 * 清理状态栏项
 */
function disposeStatusBarItems(): void {
	if (warpStatusBarItem) {
		warpStatusBarItem.dispose();
		warpStatusBarItem = undefined;
	}
	if (claudeStatusBarItem) {
		claudeStatusBarItem.dispose();
		claudeStatusBarItem = undefined;
	}
	if (opencodeStatusBarItem) {
		opencodeStatusBarItem.dispose();
		opencodeStatusBarItem = undefined;
	}
}

/**
 * 打开 Warp 终端
 */
function openWarpTerminal(): void {
	// 获取当前工作区根目录
	const workspaceRoot = vscode.workspace.rootPath || '.';

	// 使用 child_process 执行 open 命令
	exec(`open -a "Warp" "${workspaceRoot}"`, (error, stdout, stderr) => {
		if (error) {
			console.error(`打开 Warp 失败: ${error.message}`);
			vscode.window.showErrorMessage(`无法打开 Warp: ${error.message}`);
			return;
		}
		console.log('Warp 已打开');
	});
}

/**
 * 创建终端并返回
 */
function createTerminal(name: string): vscode.Terminal {
	const config = getConfig();
	const workspaceRoot = vscode.workspace.rootPath;

	// 根据配置选择终端位置
	const terminalOptions: vscode.TerminalOptions = {
		name,
		cwd: workspaceRoot || undefined
	};

	if (config.terminalLocation === 'editor') {
		// 作为 editor tab 打开，显示在右侧
		terminalOptions.location = {
			viewColumn: vscode.ViewColumn.Two
		};
	}

	return vscode.window.createTerminal(terminalOptions);
}

/**
 * 执行 Quick Claude 命令
 */
function executeQuickClaude(): void {
	// 创建新的终端
	const terminal = createTerminal('Quick Claude');

	// 发送 Claude CLI 命令（包含换行符自动执行）
	terminal.sendText('claude --dangerously-skip-permissions\n');

	// 显示并聚焦终端
	terminal.show();
}

/**
 * 执行 Quick Opencode 命令
 */
function executeQuickOpencode(): void {
	// 创建新的终端
	const terminal = createTerminal('Quick Opencode');

	// 发送 Opencode 命令（包含换行符自动执行）
	terminal.sendText('opencode\n');

	// 显示并聚焦终端
	terminal.show();
}

/**
 * 停用扩展时调用
 */
export function deactivate() {
	// 清理状态栏项
	disposeStatusBarItems();

	// 清理配置监听器
	if (configChangeListener) {
		configChangeListener.dispose();
	}
}
