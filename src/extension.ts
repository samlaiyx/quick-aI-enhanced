// VS Code Extension API
import * as vscode from 'vscode';

// 自定义命令接口
interface CustomCommand {
	name: string;
	command: string;
	icon?: string;
	keybinding?: string;
}

// 状态栏项引用
let claudeStatusBarItem: vscode.StatusBarItem | undefined;
let codexStatusBarItem: vscode.StatusBarItem | undefined;
let customStatusBarItems: vscode.StatusBarItem[] = [];
let customCommandDisposables: vscode.Disposable[] = [];

// 配置变更监听器
let configChangeListener: vscode.Disposable | undefined;

/**
 * 激活扩展时调用
 */
export function activate(context: vscode.ExtensionContext) {
	console.log('Quick AI extension is now active!');

	// 注册 Quick Claude 命令
	const quickClaudeCommand = vscode.commands.registerCommand(
		'quickClaudeCommand',
		executeQuickClaude
	);
	context.subscriptions.push(quickClaudeCommand);

	// 注册 Quick Codex 命令
	const quickCodexCommand = vscode.commands.registerCommand(
		'quickCodexCommand',
		executeQuickCodex
	);
	context.subscriptions.push(quickCodexCommand);

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
		showClaudeIcon: config.get<boolean>('showClaudeIcon', true),
		showCodexIcon: config.get<boolean>('showCodexIcon', true),
		iconStyle: config.get<string>('iconStyle', 'icon+text'),
		terminalLocation: config.get<string>('terminalLocation', 'panel') as 'panel' | 'editor',
		claudeCommand: config.get<string>('claudeCommand', 'claude --dangerously-skip-permissions'),
		codexCommand: config.get<string>('codexCommand', 'codex --dangerously-bypass-approvals-and-sandbox'),
		customCommands: config.get<CustomCommand[]>('customCommands', [])
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

	// 1. Claude 状态栏图标
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

	// 2. Codex 状态栏图标
	if (config.showCodexIcon) {
		codexStatusBarItem = vscode.window.createStatusBarItem(
			'quickAI.codexStatusBar',
			vscode.StatusBarAlignment.Right,
			99
		);
		codexStatusBarItem.text = getStatusBarText('sparkle', 'Codex');
		codexStatusBarItem.tooltip = 'Quick Codex CLI';
		codexStatusBarItem.command = 'quickCodexCommand';
		codexStatusBarItem.show();
		context.subscriptions.push(codexStatusBarItem);
	}

	console.log('状态栏图标已创建，配置:', config);

	// 3. 创建自定义命令状态栏图标
	createCustomStatusBarItems(context, config.customCommands);
}

/**
 * 创建自定义命令状态栏图标
 */
function createCustomStatusBarItems(context: vscode.ExtensionContext, customCommands: CustomCommand[]): void {
	// 清理旧的自定义命令
	disposeCustomStatusBarItems();

	// 为每个自定义命令创建状态栏图标
	customCommands.forEach((cmd, index) => {
		// 验证必填字段
		if (!cmd.name || !cmd.command) {
			console.warn('跳过无效的自定义命令配置:', cmd);
			return;
		}

		// 生成命令 ID（使用名称作为标识符，移除特殊字符）
		const commandId = `quickAI.custom.${cmd.name.replace(/[^a-zA-Z0-9]/g, '_')}`;

		// 注册命令
		const disposable = vscode.commands.registerCommand(commandId, async () => {
			const folder = await getWorkspaceFolder();
			if (!folder) {
				return;
			}

			// 获取路径
			const folderPath = typeof folder === 'string' ? folder : folder.uri.fsPath;

			const terminal = vscode.window.createTerminal({
				name: cmd.name,
				cwd: folderPath,
				location: getConfig().terminalLocation === 'editor'
					? { viewColumn: vscode.ViewColumn.Two }
					: undefined
			});

			terminal.sendText(cmd.command + '\n');
			terminal.show();
		});

		context.subscriptions.push(disposable);
		customCommandDisposables.push(disposable);

		// 创建状态栏图标
		const icon = cmd.icon || 'circle-large-outline';
		const priority = 90 - index; // 自定义命令排在后面
		const statusBarItem = vscode.window.createStatusBarItem(
			`quickAI.custom.${cmd.name}`,
			vscode.StatusBarAlignment.Right,
			priority
		);
		statusBarItem.text = getStatusBarText(icon.replace(/^\$\(/, '').replace(/\)$/, ''), cmd.name);
		statusBarItem.tooltip = cmd.command;
		statusBarItem.command = commandId;
		statusBarItem.show();

		context.subscriptions.push(statusBarItem);
		customStatusBarItems.push(statusBarItem);
	});

	console.log(`创建了 ${customStatusBarItems.length} 个自定义命令状态栏图标`);
}

/**
 * 清理自定义命令状态栏项
 */
function disposeCustomStatusBarItems(): void {
	customStatusBarItems.forEach(item => item.dispose());
	customStatusBarItems = [];

	customCommandDisposables.forEach(d => d.dispose());
	customCommandDisposables = [];
}

/**
 * 清理状态栏项
 */
function disposeStatusBarItems(): void {
	if (claudeStatusBarItem) {
		claudeStatusBarItem.dispose();
		claudeStatusBarItem = undefined;
	}
	if (codexStatusBarItem) {
		codexStatusBarItem.dispose();
		codexStatusBarItem = undefined;
	}
	// 清理自定义命令状态栏项
	disposeCustomStatusBarItems();
}

/**
 * 获取工作区文件夹
 * - 优先使用当前工作区第一个目录
 * - 提供"使用当前目录"和"更改目录"选项
 */
async function getWorkspaceFolder(): Promise<vscode.WorkspaceFolder | string | undefined> {
	const workspaceFolders = vscode.workspace.workspaceFolders;

	// 如果有工作区，默认使用第一个，但提供更改选项
	if (workspaceFolders && workspaceFolders.length > 0) {
		const defaultFolder = workspaceFolders[0];

		// 构建选项列表
		interface FolderPickItem extends vscode.QuickPickItem {
			action: 'default' | 'change';
		}

		const items: FolderPickItem[] = [
			{
				label: `$(check) 使用当前目录`,
				description: defaultFolder.uri.fsPath,
				detail: '直接在此目录执行命令',
				action: 'default'
			},
			{
				label: `$(folder-opened) 更改目录...`,
				description: '选择其他工作区或浏览文件夹',
				action: 'change'
			}
		];

		const selected = await vscode.window.showQuickPick(items, {
			placeHolder: '选择工作目录'
		});

		if (!selected) {
			return undefined;
		}

		// 如果选择默认目录
		if (selected.action === 'default') {
			return defaultFolder;
		}

		// 如果选择更改目录，显示所有工作区和浏览选项
		return await showAllFoldersAndBrowse(workspaceFolders);
	}

	// 没有工作区，直接显示浏览对话框
	const folderUri = await vscode.window.showOpenDialog({
		canSelectFiles: false,
		canSelectFolders: true,
		canSelectMany: false,
		openLabel: '选择目录',
		title: '选择 Codex 工作目录'
	});

	if (folderUri && folderUri[0]) {
		return folderUri[0].fsPath;
	}
	return undefined;
}

/**
 * 显示所有工作区文件夹和浏览选项
 */
async function showAllFoldersAndBrowse(workspaceFolders: readonly vscode.WorkspaceFolder[]): Promise<vscode.WorkspaceFolder | string | undefined> {
	interface FolderPickItem extends vscode.QuickPickItem {
		action: 'workspace' | 'browse';
		folder?: vscode.WorkspaceFolder;
	}

	const items: FolderPickItem[] = [];

	// 添加所有工作区选项
	workspaceFolders.forEach(folder => {
		items.push({
			label: `$(folder) ${folder.name}`,
			description: folder.uri.fsPath,
			action: 'workspace',
			folder: folder
		});
	});

	// 添加浏览其他目录选项
	items.push({
		label: '$(file-directory) 浏览其他目录...',
		description: '打开文件夹选择器',
		action: 'browse'
	});

	const selected = await vscode.window.showQuickPick(items, {
		placeHolder: '选择工作区或浏览其他目录'
	});

	if (!selected) {
		return undefined;
	}

	// 如果选择浏览其他目录
	if (selected.action === 'browse') {
		const folderUri = await vscode.window.showOpenDialog({
			canSelectFiles: false,
			canSelectFolders: true,
			canSelectMany: false,
			openLabel: '选择目录',
			title: '选择 Codex 工作目录'
		});

		if (folderUri && folderUri[0]) {
			return folderUri[0].fsPath;
		}
		return undefined;
	}

	// 返回选中的工作区
	return selected.folder;
}

/**
 * 创建终端并返回
 */
async function createTerminal(name: string): Promise<vscode.Terminal | undefined> {
	const config = getConfig();

	// 获取工作区文件夹
	const folder = await getWorkspaceFolder();
	if (!folder) {
		return undefined; // 用户取消
	}

	// 获取路径
	const folderPath = typeof folder === 'string' ? folder : folder.uri.fsPath;

	// 根据配置选择终端位置
	const terminalOptions: vscode.TerminalOptions = {
		name,
		cwd: folderPath
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
async function executeQuickClaude(): Promise<void> {
	const config = getConfig();

	// 创建新的终端
	const terminal = await createTerminal('Quick Claude');
	if (!terminal) {
		return; // 用户取消
	}

	// 发送 Claude CLI 命令（包含换行符自动执行）
	terminal.sendText(config.claudeCommand + '\n');

	// 显示并聚焦终端
	terminal.show();
}

/**
 * 执行 Quick Codex 命令
 */
async function executeQuickCodex(): Promise<void> {
	const config = getConfig();

	// 创建新的终端
	const terminal = await createTerminal('Quick Codex');
	if (!terminal) {
		return; // 用户取消或无工作区
	}

	// 发送 Codex 命令（包含换行符自动执行）
	terminal.sendText(config.codexCommand + '\n');

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
