# PR Monitor Report

**Date:** 2026-04-01
**Contributor:** suboss87
**Upstream repo:** openclaw/openclaw

---

## PR Status Summary

### #45911 — fix/telegram-approval-callback-fallback
**Status: MERGED** (confirmed, no change since 2026-03-31)

- Merged 2026-03-29T05:15:58Z by @obviyus.
- Merge commit: `14fd49c` (`fix: keep telegram plugin fallback explicit (#45911) (thanks @suboss87)`).
- Fork branch `fix/telegram-approval-callback-fallback` is stale and can be deleted.
- No action required.

---

### #45584 — feat/cron-fresh-session-option
**Status: OPEN** (no new commits since last check)

- URL: https://github.com/openclaw/openclaw/pull/45584
- Last upstream activity: 2026-03-27T15:29:48Z (as of last report).
- Branch tip: `55edd32` (2026-03-25) — no new commits this run.
- No merge conflicts detected against fork main.
- **Changes:** adds `freshSession` boolean to cron job types, service, and runner;
  wires through schema and gateway; 3 new tests in
  `src/cron/isolated-agent/run.skill-filter.test.ts` and
  `src/cron/isolated-agent/session.test.ts`.

**Needs human attention:**
- Review threads and CI details are unavailable — GitHub MCP/`gh` not accessible from this environment.
- PR has been quiet for ~5 days. Check https://github.com/openclaw/openclaw/pull/45584 for review comments or CI status.

---

### #54363 — fix/chat-send-button-contrast
**Status: CLOSED (not merged)** (no change since 2026-03-31)

- Closed 2026-03-27T14:12:49Z without merging.
- Fork branch `fix/chat-send-button-contrast` tip: `76c2ea4` — unchanged.
- No action required unless decision is to reopen/resubmit.

**Needs human attention:**
- Confirm reason for closure at https://github.com/openclaw/openclaw/pull/54363 (superseded, rejected, duplicate, etc.).
- If the WCAG AA contrast fix is still wanted, the branch is available to reopen.

---

### #54730 — fix/subagent-identity-fallback
**Status: OPEN** (no new commits since last check)

- URL: https://github.com/openclaw/openclaw/pull/54730
- Last upstream activity: 2026-03-29T01:14:10Z (as of last report).
- Branch tip: `bf6f12d` (2026-03-26) — no new commits this run.
- No merge conflicts detected against fork main.
- **Changes (2 commits):**
  - `11cc40e` — `fix(ui): prefer per-agent identity for subagents over global ui.assistant`
    (fixes #54714; changes priority order for non-default agents in
    `src/gateway/assistant-identity.ts`)
  - `bf6f12d` — `refactor: hoist resolveDefaultAgentId to avoid redundant call`
    (review feedback cleanup)

**Needs human attention:**
- Review threads and CI details are unavailable — GitHub MCP/`gh` not accessible from this environment.
- PR last active 2026-03-29 (~3 days). Check https://github.com/openclaw/openclaw/pull/54730 for review comments or CI status.

---

## Actions Taken

None. No code changes, rebases, force-pushes, or PR comments were made this run.

**Reason:** GitHub API (`gh` CLI and MCP tools) is not accessible from this environment
(proxy scoped to `suboss87/openclaw` only; `gh` binary not installed). Branch-level
analysis was performed via local git (fetch + merge-tree). No new commits, no merge
conflicts, and no actionable automated changes were identified.

---

## PRs Needing Human Attention

| PR | Status | Reason |
|----|--------|--------|
| openclaw/openclaw#45584 | Open | Quiet ~5 days; review comments/CI status unknown |
| openclaw/openclaw#54363 | Closed (unmerged) | Investigate closure reason; reopen if still needed |
| openclaw/openclaw#54730 | Open | Quiet ~3 days; review comments/CI status unknown |

---

## Notes

- **Persistent blocker:** `gh` CLI is not installed and GitHub MCP tools are unavailable.
  To get full review thread and CI details, either install `gh` in this environment or
  grant the MCP session access to `openclaw/openclaw`.
- **#45911** fork branch `fix/telegram-approval-callback-fallback` is safe to delete.
- **#54363** fork branch `fix/chat-send-button-contrast` is stale (PR closed unmerged) — safe to delete.
- Both open PRs (#45584, #54730) merge cleanly against fork main with no conflicts.

---

## Previous Reports

- 2026-03-31: `chore/pr-monitor-report-20260331`
