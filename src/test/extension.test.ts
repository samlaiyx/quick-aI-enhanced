import * as assert from 'assert';
import { DEFAULT_CODEX_COMMAND, normalizeCodexCommand } from '../codexCommand';

suite('Extension Test Suite', () => {
	test('normalizes legacy plain Codex command to the new default', () => {
		assert.strictEqual(normalizeCodexCommand('codex'), DEFAULT_CODEX_COMMAND);
		assert.strictEqual(normalizeCodexCommand(' codex '), DEFAULT_CODEX_COMMAND);
	});

	test('preserves customized Codex commands', () => {
		const customCommand = 'codex --model gpt-5';
		assert.strictEqual(normalizeCodexCommand(customCommand), customCommand);
	});

	test('uses the new default when codex command is missing', () => {
		assert.strictEqual(normalizeCodexCommand(undefined), DEFAULT_CODEX_COMMAND);
	});
});
