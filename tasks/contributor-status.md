# Contributor Status - suboss87

Updated: 2026-05-10

## Goal

Reach top-30 contributor on openclaw/openclaw. Threshold: 46 merged commits.
Gap: approximately 41 more merged commits needed (5 merged so far).

## Hard Blocker (Persistent)

PR creation to openclaw/openclaw is not possible from this automated session.
MCP tools are restricted to suboss87/openclaw only, no gh CLI, no GitHub token.
All PRs must be opened manually via the GitHub web UI by suboss87.

## Merged PRs (5 total)

| PR    | Title                                                  | Merged     |
| ----- | ------------------------------------------------------ | ---------- |
| 70413 | fix(agents): route /btw through provider stream fn     | 2026-04-23 |
| 67457 | fix(ollama): strip provider prefix from model ID       | 2026-04-16 |
| 64735 | fix(hooks): pass workspaceDir in gateway session reset | 2026-04-14 |
| 55787 | fix: strip orphaned OpenAI reasoning blocks            | 2026-04-19 |
| 45911 | fix(telegram): accept approval callbacks from targets  | 2026-03-29 |

## Open PRs on upstream (openclaw/openclaw)

| #     | Title                                                         | Last Updated | Status |
| ----- | ------------------------------------------------------------- | ------------ | ------ |
| 73162 | fix(slack): remove socket reconnect attempt cap               | 2026-05-03   | open   |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass   | 2026-05-01   | open   |
| 66544 | fix(gateway): exclude heartbeat sender from session display   | 2026-05-03   | open   |
| 66225 | fix(agents): align final tag regexes for self-closing variant | 2026-05-01   | open   |

Note: MCP PR comment reads blocked (access denied). Last known: no human comments as of 2026-05-09.

## Ready Branches (Need Manual PR)

### Branch: fix/active-memory-none-status-regression (NEW - 2026-05-10)

Open PR at: https://github.com/suboss87/openclaw/compare/fix/active-memory-none-status-regression
Fixes #79812 - Active Memory reports status=empty for normal no-useful-memory results

Root cause: when the recall subagent ran successfully and the LLM responded with
"NONE" (no memory needed), the code collapsed that into status=empty - the same
status used for actual failures (missing tools, zero-hit search, no model).

Fix: add status=none for the successful-but-no-memory path. Mark the two
skipped-subagent paths (no modelRef, missing memory tools) with skipped=true
so they continue to emit status=empty. shouldCacheResult updated to also
cache status=none results.

111 tests pass including 2 new regression tests.
Format check and changed lanes (lint + import cycles) green.

### Branch: fix/session-defaults-agent-model (2026-05-09)

Open PR at: https://github.com/suboss87/openclaw/compare/fix/session-defaults-agent-model
Fixes #79592 - Agent-level model config ignored at session initialization

### Branch: fix/doctor-fix-preserves-unknown-config-keys (2026-05-09)

Open PR at: https://github.com/suboss87/openclaw/compare/fix/doctor-fix-preserves-unknown-config-keys
Fixes #78858 - doctor --fix silently strips unknown config keys

### Branch: fix/tlon-group-join-race (2026-05-09)

Open PR at: https://github.com/suboss87/openclaw/compare/fix/tlon-group-join-race

## Actions This Run (2026-05-10)

1. Set git identity to suboss87@gmail.com / Subash - confirmed.
2. upstream remote still inaccessible via proxy; fork used as reference.
3. Checked open PRs via search API - 4 still open, no new activity since 2026-05-03.
4. MCP PR comment reads blocked by access restriction to openclaw/openclaw.
5. Searched recent bug issues (filed 2026-05-08 to 05-10, no:assignee).
6. Selected #79812: Active Memory status=empty confusion - filed 2026-05-09, no competing PRs.
7. Traced root cause in extensions/active-memory/index.ts - normalizeNoRecallValue
   path in maybeResolveActiveRecall collapsed LLM "NONE" reply into status=empty.
8. Fixed with ~30 LOC: skipped=true flag on skipped paths, status=none for normal NONE.
9. Updated 3 existing tests + added 2 new tests (regression + shouldCacheResult).
10. 111 tests pass; format check green; changed lanes (lint + import cycles) green.
11. Committed and pushed branch fix/active-memory-none-status-regression to fork.
12. PR to upstream must be opened manually at the compare URL above.
