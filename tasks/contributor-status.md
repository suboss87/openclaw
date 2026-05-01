# OpenClaw Contributor Status - 2026-05-01

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

## Open Upstream PRs: 4

| #      | Title                                                                     | Age | Comments |
| ------ | ------------------------------------------------------------------------- | --- | -------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 3d  | 5        |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 13d | 5        |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 17d | 5        |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 17d | 7        |

## Fix Branches Ready (need upstream PR creation)

### fix/74635-agent-params-paperclip

- Fix: add `paperclip: Type.Optional(Type.Unknown())` to `AgentParamsSchema`
- Root cause: Paperclip injects a `paperclip` field in gateway agent payloads;
  `additionalProperties: false` rejected every invocation with
  "unexpected property 'paperclip'"
- Files: `src/gateway/protocol/schema/agent.ts` (+1 line),
  `src/gateway/protocol/index.test.ts` (+2 regression tests)
- Target issue: #74635
- Status: branch pushed, upstream PR blocked by session MCP restriction.
  User must open PR at:
  https://github.com/suboss87/openclaw/compare/main...fix/74635-agent-params-paperclip

### fix/75357-openai-completions-stream-usage

- Fix: inject `stream_options.include_usage=true` into `openai-completions` streaming payloads
- Root cause: Most OpenAI-compatible endpoints (llama.cpp, vLLM, LM Studio) omit usage
  from streaming responses unless `stream_options.include_usage=true` is present. The
  `applyExtraParamsToAgent` chain never set this field, so all completions-API sessions
  recorded zero tokens.
- Files: `src/agents/pi-embedded-runner/openai-stream-wrappers.ts` (new wrapper),
  `src/agents/pi-embedded-runner/extra-params.ts` (chain wrapper),
  `src/agents/pi-embedded-runner/extra-params.openai-completions-stream-usage.test.ts` (7 tests)
- Target issue: #75357
- Fork PR: https://github.com/suboss87/openclaw/pull/16
- Status: fork PR open. User must open upstream PR at:
  https://github.com/suboss87/openclaw/compare/main...fix/75357-openai-completions-stream-usage

## Session Constraints (2026-05-01)

- MCP write access restricted to suboss87/openclaw
- Cannot create PRs in openclaw/openclaw directly
- Cannot read PR comments from upstream PRs
- All previous upstream PRs created in sessions with broader MCP access

## Actions This Run

1. Continued from prior session - fix for #75357 was already implemented
2. Wrote 7-case unit test suite for `createOpenAICompletionsStreamUsageWrapper`
3. Ran `pnpm test` - all 7 tests pass
4. Ran `pnpm check` - lint/format clean
5. Created branch `fix/75357-openai-completions-stream-usage` off upstream/main
6. Committed 3 files via `scripts/committer`
7. Pushed branch to fork origin
8. Created fork PR https://github.com/suboss87/openclaw/pull/16
