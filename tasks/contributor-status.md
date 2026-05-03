# OpenClaw Contributor Status - 2026-05-03

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

## Open Upstream PRs: 4

| #      | Title                                                                     | Age | Comments | Status                            |
| ------ | ------------------------------------------------------------------------- | --- | -------- | --------------------------------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 5d  | 7        | quasi-approved, awaiting merge    |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 15d | 6        | bots flagging; desc/code mismatch |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 19d | 6        | green CI, bumped Apr 25           |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 19d | 7        | green CI, bumped Apr 23           |

## Fix Branch Ready (needs upstream PR)

### fix/76289-cron-cli-session-watchdog-cap

- Issue: #76289 - cron `timeoutSeconds` silently capped at 180s in isolated runs
- Root cause: `run-executor.ts:127-129` passed stored CLI session ID for non-new sessions,
  activating `CLI_RESUME_WATCHDOG_DEFAULTS` (`maxMs: 180s`) regardless of configured timeout
- Fix: always pass `cliSessionId = undefined` in isolated cron runs (fresh watchdog profile,
  `maxMs: 600s`)
- Files: `src/cron/isolated-agent/run-executor.ts` (+7/-4),
  `src/cron/isolated-agent/run.skill-filter.test.ts` (+7/-6)
- Tests: all 16 pass; lint clean
- Branch: https://github.com/suboss87/openclaw/tree/fix/76289-cron-cli-session-watchdog-cap
- PR URL to open: https://github.com/suboss87/openclaw/compare/fix/76289-cron-cli-session-watchdog-cap

### fix/74635-agent-params-paperclip (prior run)

- Branch: pushed, upstream PR blocked by session MCP restriction
- PR URL to open: https://github.com/suboss87/openclaw/compare/main...fix/74635-agent-params-paperclip

### fix/75357-openai-completions-stream-usage (prior run)

- Branch: pushed
- PR URL to open: https://github.com/suboss87/openclaw/compare/main...fix/75357-openai-completions-stream-usage

## Session Constraints (2026-05-03)

- MCP write access restricted to suboss87/openclaw; cannot create upstream PRs
- Cannot read PR comments from upstream via MCP (search tools work read-only)

## Actions This Run (2026-05-03)

1. Git identity confirmed: suboss87@gmail.com
2. Checked 4 open upstream PRs - no human comments requiring response
3. PR #73162 (slack): martingarramon quasi-approved Apr 30; awaiting maintainer merge
4. PR #68446 (whatsapp): bots flagging security concerns; PR description says inbound-policy.ts
   but actual diff is in group-activation.ts - flagged for owner review
5. PR #66544, #66225: green CI, no new human comments; no action needed
6. Investigated #76289 (cron 180s watchdog cap) - no competing PRs
7. Fixed: always pass `cliSessionId=undefined` in isolated cron runs to use fresh watchdog profile
8. Branch fix/76289-cron-cli-session-watchdog-cap pushed to fork; upstream PR needs manual creation
