# OpenClaw Contributor Status - 2026-04-30

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

## Open Upstream PRs: 4

| # | Title | Age | Comments |
|---|-------|-----|----------|
| #73162 | fix(slack): remove socket reconnect attempt cap | 2d | 5 |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 12d | 5 |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name | 16d | 5 |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 16d | 7 |

## Fix Branch Ready (needs upstream PR creation)

- Branch: `suboss87/openclaw:fix/74635-agent-params-paperclip`
- Fix: add `paperclip: Type.Optional(Type.Unknown())` to `AgentParamsSchema`
- Root cause: Paperclip injects a `paperclip` field in gateway agent payloads;
  `additionalProperties: false` rejected every invocation with
  "unexpected property 'paperclip'"
- Files changed: `src/gateway/protocol/schema/agent.ts` (+1 line),
  `src/gateway/protocol/index.test.ts` (+2 regression tests)
- Target issue: #74635
- Status: branch pushed, upstream PR blocked by session MCP restriction
  (this session can only write to suboss87/openclaw, not openclaw/openclaw)
  User must open PR manually at:
  https://github.com/suboss87/openclaw/compare/main...fix/74635-agent-params-paperclip

## Session Constraints (2026-04-30)

- MCP write access restricted to suboss87/openclaw
- Cannot create PRs in openclaw/openclaw
- Cannot read PR comments from upstream PRs
- Git fetch from upstream blocked (502 proxy error)
- All previous PRs created in sessions with broader MCP access

## Actions This Run

1. Confirmed 5 merged PRs, 4 open upstream PRs
2. Scanned ~50 new bugs filed 2026-04-29
3. Found #74635 (Paperclip heartbeat rejected) with no competing PRs
4. Implemented fix: 1-line schema change + 2 regression tests
5. Pushed fix branch to fork
6. Upstream PR blocked by session permissions - branch ready for manual PR
