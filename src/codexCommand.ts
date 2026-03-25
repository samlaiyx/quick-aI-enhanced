export const DEFAULT_CODEX_COMMAND = 'codex --dangerously-bypass-approvals-and-sandbox';
export const LEGACY_CODEX_COMMAND = 'codex';

export function normalizeCodexCommand(command: string | undefined): string {
	if (!command) {
		return DEFAULT_CODEX_COMMAND;
	}

	if (command.trim() === LEGACY_CODEX_COMMAND) {
		return DEFAULT_CODEX_COMMAND;
	}

	return command;
}
