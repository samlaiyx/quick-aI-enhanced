## Why

VS Code supports multi-root workspaces where users can open multiple folders simultaneously. The current extension always uses the first workspace folder via the deprecated `vscode.workspace.rootPath` API, giving users no control over which folder to use for terminal operations.

## What Changes

- Replace deprecated `vscode.workspace.rootPath` API with modern `vscode.workspace.workspaceFolders`
- Add workspace folder selection UI (Quick Pick) when multiple folders exist
- Update terminal creation logic to use user-selected folder
- Maintain backward compatibility for single-folder workspaces (no selection needed)

## Capabilities

### New Capabilities
- `workspace-folder-selection`: User-facing capability to select which workspace folder to use for terminal operations when multiple folders are present

### Modified Capabilities
- (None - no existing specs to modify)

## Impact

**Affected Code:**
- `src/extension.ts` (lines 153-189): Two functions need updates
  - `openWarpTerminal()`: Uses workspace root for Warp terminal
  - `createTerminal()`: Uses workspace root for VS Code integrated terminal

**API Changes:**
- None - this is an internal implementation change

**Dependencies:**
- None - uses existing VS Code APIs

**User Experience:**
- Single-folder workspaces: No change in behavior
- Multi-folder workspaces: New Quick Pick UI appears for folder selection
