# OpenClaw Contributor Status - 2026-05-02

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

## Open Upstream PRs: 4

| #      | Title                                                                     | Age | Comments |
| ------ | ------------------------------------------------------------------------- | --- | -------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 4d  | 5        |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 14d | 5        |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 18d | 5        |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 18d | 7        |

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

### fix/75814-auth-profile-stale-secret-ref-startup (NEW - 2026-05-02)

- Fix: treat auth-profile SecretRef failures as non-fatal at gateway startup
- Root cause: `prepareSecretsRuntimeSnapshot()` batched ALL SecretRef resolution
  (config + auth-profile) in one call. Any failure - including a stale provider
  name in a non-default auth profile - threw `SecretProviderResolutionError`,
  which `activateRuntimeSecrets(reason: "startup")` converted to a fatal abort.
- Change: config-level refs remain fatal; auth-profile refs now soft-fail with
  an `AUTH_PROFILE_SECRET_REF_UNRESOLVED` warning, preserving the plaintext
  credential if available.
- Files:
  - `src/secrets/runtime-shared.ts`: add `AUTH_PROFILE_SECRET_REF_UNRESOLVED` warning code
  - `src/secrets/runtime.ts`: split resolution into config (fatal) + auth-profile (soft-fail)
  - `src/secrets/runtime.test.ts`: 2 new regression tests
  - `src/gateway/server.reload.test.ts`: update integration test to expect startup success
- Commit: 593da6a
- Target issue: #75814
- Branch: fix/75814-auth-profile-stale-secret-ref-startup (pushed to fork)
- Status: branch pushed. User must open upstream PR:
  https://github.com/suboss87/openclaw/compare/main...fix/75814-auth-profile-stale-secret-ref-startup

## Session Constraints (ongoing)

- MCP write access restricted to suboss87/openclaw
- Cannot create PRs in openclaw/openclaw directly
- Cannot read PR comments from upstream PRs
- All previous upstream PRs created in sessions with broader MCP access

## Actions This Run (2026-05-02)

1. Resumed investigation of #75814 (gateway startup aborts on stale auth-profile SecretRef)
2. Located fatal check: `server.impl.ts:391` inside `activateRuntimeSecrets(reason: "startup")`
3. Traced root cause through `prepareSecretsRuntimeSnapshot` → `resolveSecretRefValues`
4. Implemented fix in `src/secrets/runtime.ts`:
   - Added `resolveAuthProfileAssignmentsSoftFail()` helper (batch-first, per-item fallback)
   - Split `context.assignments` at `configAssignmentBoundary` to separate config vs auth-profile refs
   - Auth-profile failures emit `AUTH_PROFILE_SECRET_REF_UNRESOLVED` warning, not throw
5. Added new warning code to `src/secrets/runtime-shared.ts`
6. Added 2 regression tests to `src/secrets/runtime.test.ts`
7. Updated `src/gateway/server.reload.test.ts` integration test to match new behavior
8. Ran `pnpm test src/secrets/` → 201/201 pass
9. Ran `pnpm test src/gateway/server.reload.test.ts` → 11/12 pass (1 pre-existing env failure)
10. Committed and pushed branch `fix/75814-auth-profile-stale-secret-ref-startup`
