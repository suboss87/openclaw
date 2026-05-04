# Contributor Status - suboss87

**Run date:** 2026-05-04
**Goal:** top 30 contributors on openclaw/openclaw (threshold: 46 merged commits)

## Commit Count

- Merged PRs confirmed: 5
- Estimated merged commits: ~5
- Gap to 46: ~41 remaining

## Merged PRs

| PR | Merged | Title |
|----|--------|-------|
| #45911 | 2026-03-29 | fix(telegram): accept approval callbacks from forwarding target recipients |
| #55787 | 2026-04-19 | fix: strip orphaned OpenAI reasoning blocks before responses API call |
| #64735 | 2026-04-14 | fix(hooks): pass workspaceDir in gateway session reset internal hook context |
| #67457 | 2026-04-16 | fix(ollama): strip provider prefix from model ID in chat requests |
| #70413 | 2026-04-23 | fix(agents): route /btw through provider stream fn for correct URLs |

## Open PRs (openclaw/openclaw)

| PR | Updated | Title | Status |
|----|---------|-------|--------|
| #73162 | 2026-05-03 | fix(slack): remove socket reconnect attempt cap | 7 comments, open |
| #66544 | 2026-05-03 | fix(gateway): exclude heartbeat sender ID from session display name | 6 comments, open |
| #66225 | 2026-05-01 | fix(agents): align final tag regexes for self-closing variant | 7 comments, open |
| #68446 | 2026-05-01 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 6 comments, open |

## This Run

### New work
- Branch `fix/mcp-channel-tools-content-data` pushed to origin (suboss87/openclaw)
- Fix: `conversations_list` and `messages_read` MCP tools now serialize full data as JSON
  in the primary `content` field instead of count-only summary (closes #77024)
- Regression tests added in `channel-server.test.ts`

### Blockers
- MCP session restricted to suboss87/openclaw only - cannot create PR against openclaw/openclaw
- Fork-internal PR suboss87/openclaw#17 exists as proxy; needs upstream PR in next run
- git fetch upstream fails with 502 (proxy restriction) - using local main as branch base
- node_modules not installed locally - targeted tests not runnable; fix verified by code review

## Next Run Priorities

1. Create PR against openclaw/openclaw for fix/mcp-channel-tools-content-data (if session allows)
2. Check comments on #73162 and #66544 (updated within 24h last run)
3. Scan for new uncontested bugs (priority: regression + no competing PR + <30 lines)
