# midday check - 2026-05-05

## open PRs (suboss87)

| PR     | title                                                                     | last updated | status           |
| ------ | ------------------------------------------------------------------------- | ------------ | ---------------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 2026-05-03   | open, 7 comments |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 2026-05-01   | open, 6 comments |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 2026-05-03   | open, 6 comments |
| #66225 | fix(agents): align final tag regexes for self-closing `<final/>`          | 2026-05-01   | open, 7 comments |

none updated in the last 6 hours - no human feedback to respond to this run.

note: PR comment reads are blocked via MCP (restricted to suboss87/openclaw only).

## this run

**bug fixed: #77733 - bare `/new` and `/reset` dropped persona greeting in 2026.5.3**

regression class, no competing PR, clear repro, under 10 lines changed.

root cause: `src/auto-reply/reply/commands-reset.ts:169` - a short-circuit added in 5.3 returned
`{ shouldContinue: false }` with canned text for bare `/new`/`/reset` instead of `null`. returning
`null` is what lets the request fall through to the agent for a greeting turn.

fix: only stop early when a hook plugin already routed a reply (`hookResult.routedReply: true`).
when no hook replied and there's no tail text, return `null` so the agent runs its greeting.

branch: `suboss87:fix/reset-bare-command-persona-greeting` - pushed, ready for PR.

tests: 12/12 pass on `commands-reset-hooks.test.ts`, 2/2 on `commands-reset-mode.test.ts`.
formatting clean. PR creation blocked by MCP tool scope - needs manual open against upstream.

## bugs evaluated, skipped

- #77734 bonjour crash - competing PR #74778 already open
- #77676 web_search provider unavailable - competing PR #76984 touches the same path
- others: unclear scope, docs-only, or not clean regression/crash class

## escalations

- fork sync blocked - upstream remote returns 502 through local proxy; fork may drift if not synced externally
- MCP tools scoped to suboss87/openclaw only - can't create PRs against openclaw/openclaw or read PR comments
