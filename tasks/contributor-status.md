# Contributor Status - suboss87

Updated: 2026-05-09

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

No new human comments on any PR in the last 24h. No rebases needed.

## Ready Branches (Need Manual PR)

### Branch: fix/session-defaults-agent-model (NEW - 2026-05-09)

Open PR at: https://github.com/suboss87/openclaw/compare/fix/session-defaults-agent-model
Fixes #79592 - Agent-level model config ignored at session initialization (filed today, 0 comments, no competing PR)

Root cause: `getSessionDefaults` in `session-utils.ts` called `resolveConfiguredModelRef`
directly without forwarding `opts.agentId`, so `sessions.list` defaults always showed
`agents.defaults.model.primary` even when the session was scoped to an agent with its own model.

Fix: 3-line signature change + 10-line injection logic. Both list functions now pass `opts.agentId`.
85 tests pass. Regression test added.

### Branch: fix/doctor-fix-preserves-unknown-config-keys

Open PR at: https://github.com/suboss87/openclaw/compare/fix/doctor-fix-preserves-unknown-config-keys
Fixes #78858 - doctor --fix silently strips unknown config keys (mcp definitions, etc.)

### Branch: fix/tlon-group-join-race

Open PR at: https://github.com/suboss87/openclaw/compare/fix/tlon-group-join-race

## Actions This Run (2026-05-09)

1. Set git identity to suboss87@gmail.com / Subash - confirmed.
2. Synced: upstream remote inaccessible via proxy; used fork origin.
3. Checked 4 open PRs - no new human comments (all last updated May 1-3).
4. Scanned 20 recent bug issues; most claimed. Selected #79592 (unclaimed, filed today).
5. Traced `getSessionDefaults` -> sessions.list defaults ignoring per-agent model config.
6. Fixed: agentId now forwarded through getSessionDefaults options; per-agent model injected
   into effectiveCfg before resolveConfiguredModelRef runs; thinking default also per-agent.
7. Merged with upstream's concurrent change (allowPluginNormalization option + pagination fields).
8. Ran 85 session-utils tests - all pass including new regression test.
9. Committed on branch fix/session-defaults-agent-model, pushed to fork.
10. PR creation to upstream blocked - manual open required via GitHub web UI.
