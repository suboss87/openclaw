# PR Monitor Report

**Date:** 2026-03-30
**Time:** (UTC, automated run)
**Contributor:** suboss87

---

## Environment Constraints

This run encountered the same blockers as the previous report:

1. **GitHub MCP tools restricted to `suboss87/openclaw` (fork only).**
   PRs #45911, #45584, #54363, and #54730 all target `openclaw/openclaw`. The MCP server for this session is scoped to `suboss87/openclaw` and returns `Access denied` for any upstream repo calls.

2. **`gh` CLI not installed.**
   `gh` is not in `$PATH` (`command not found`), so no direct GitHub API access.

3. **No `upstream` remote configured.**
   The local repo only has `origin → suboss87/openclaw`. Without an `upstream` remote pointing to `openclaw/openclaw`, merge-conflict checks against the upstream `main` branch are not possible.

As a result, the following cannot be determined:
- Whether each PR is still **open**, merged, or closed on the upstream
- Any **review comments** or change requests from maintainers
- **CI status** (check runs on the upstream PR)
- **Merge conflicts** with upstream `main`

---

## PRs Checked

All four branches exist on the fork (`suboss87/openclaw`) and were fetched successfully.
The common merge base for all four branches is `ca0159569` (`refactor: split tool display exec parsing`).

---

### PR #45911 — `fix/telegram-approval-callback-fallback`

| Field | Value |
|-------|-------|
| Branch tip | `59527baee` |
| Commits (unique) | 1 |
| Files changed | 4 (+135 / -13) |
| Status on upstream | **UNKNOWN** — cannot access `openclaw/openclaw` |
| CI | **UNKNOWN** |
| Review comments | **UNKNOWN** |
| Merge conflicts | **UNKNOWN** (no upstream remote) |

**Commit:** `fix(telegram): accept approval callbacks from forwarding target recipients`

**Files:**
- `extensions/telegram/src/bot-handlers.runtime.ts`
- `extensions/telegram/src/exec-approvals.test.ts`
- `extensions/telegram/src/exec-approvals.ts`
- `src/auto-reply/reply/commands-approve.ts`

**Actions taken:** None.

---

### PR #45584 — `feat/cron-fresh-session-option`

| Field | Value |
|-------|-------|
| Branch tip | `55edd323f` |
| Commits (unique) | 1 |
| Files changed | 6 (+55 / -2) |
| Status on upstream | **UNKNOWN** — cannot access `openclaw/openclaw` |
| CI | **UNKNOWN** |
| Review comments | **UNKNOWN** |
| Merge conflicts | **UNKNOWN** (no upstream remote) |

**Commit:** `feat(cron): add freshSession option to control session reuse per job`

**Files:**
- `src/cron/isolated-agent/session.test.ts`
- `src/cron/service/jobs.ts`
- `src/cron/types-shared.ts`
- `src/gateway/protocol/schema/cron.ts`

**Actions taken:** None.

---

### PR #54363 — `fix/chat-send-button-contrast`

| Field | Value |
|-------|-------|
| Branch tip | `76c2ea44d` |
| Commits (unique) | 1 |
| Files changed | 1 (+3 / -1) |
| Fixes | #54348 |
| Status on upstream | **UNKNOWN** — cannot access `openclaw/openclaw` |
| CI | **UNKNOWN** |
| Review comments | **UNKNOWN** |
| Merge conflicts | **UNKNOWN** (no upstream remote) |

**Commit:** `fix(ui): improve chat send button icon contrast in light theme`

**Files:**
- `ui/src/styles/chat/layout.css`

**Actions taken:** None.

---

### PR #54730 — `fix/subagent-identity-fallback`

| Field | Value |
|-------|-------|
| Branch tip | `898560847` |
| Commits (unique) | 2 |
| Files changed | 3 files total (+92 / -9) |
| Fixes | #54714 |
| Status on upstream | **UNKNOWN** — cannot access `openclaw/openclaw` |
| CI | **UNKNOWN** |
| Review comments | **UNKNOWN** |
| Merge conflicts | **UNKNOWN** (no upstream remote) |

**Commits (oldest → newest):**
1. `73fc36860` — `fix(ui): prefer per-agent identity for subagents over global ui.assistant` (fixes #54714)
   - `src/gateway/assistant-identity.test.ts` (+70)
   - `src/gateway/assistant-identity.ts` (+26/-7)
2. `898560847` — `refactor: hoist resolveDefaultAgentId to avoid redundant call`
   - `src/gateway/assistant-identity.ts` (+3/-2)

**Actions taken:** None.

---

## Summary Table

| PR | Branch | Branch exists | Commits | Status | Actions |
|----|--------|:---:|---------|--------|---------|
| #45911 | fix/telegram-approval-callback-fallback | ✓ | 1 | UNKNOWN | None |
| #45584 | feat/cron-fresh-session-option | ✓ | 1 | UNKNOWN | None |
| #54363 | fix/chat-send-button-contrast | ✓ | 1 | UNKNOWN | None |
| #54730 | fix/subagent-identity-fallback | ✓ | 2 | UNKNOWN | None |

---

## PRs Requiring Human Attention

All four PRs require human attention because their upstream status, CI, and review comments cannot be checked with the current environment constraints.

---

## Recommended Next Steps

To unblock future monitoring runs, one of the following is required:

1. **Grant MCP access to `openclaw/openclaw`** in the session's GitHub MCP server configuration.
2. **Install `gh` CLI** and authenticate (`gh auth login`).
3. **Add an `upstream` remote** for local rebase/conflict checks at minimum:
   ```
   git remote add upstream https://github.com/openclaw/openclaw
   git fetch upstream main
   ```
