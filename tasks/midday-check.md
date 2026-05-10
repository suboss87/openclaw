# midday check - 2026-05-10

## open PR status

| PR | title | last updated |
|----|-------|-------------|
| #73162 | fix(slack): remove socket reconnect attempt cap | 2026-05-03 |
| #68446 | fix(whatsapp): DM allowFrom fallback into group policy | 2026-05-01 |
| #66544 | fix(gateway): exclude heartbeat sender from session display | 2026-05-03 |
| #66225 | fix(agents): align final tag regexes for self-closing variant | 2026-05-01 |

note: MCP tools are scoped to suboss87/openclaw - PR comments on openclaw/openclaw not readable this session.

## actions this run

- git identity confirmed: suboss87@gmail.com / Subash
- upstream sync blocked: `git fetch upstream` returns 502 (proxy not routing openclaw/openclaw)
- PR comment check: could not read comments on the 4 open PRs (MCP restriction)
- scanned 30 fresh bugs (label:bug, no:assignee, created since 2026-04-28)

fresh bugs already covered by other contributors:
- #79428 contextWindow 4k < compaction floor 20k: 3 competing PRs (#79429, #79468, #79911)
- #79490 SPAWN_ALLOWLIST ignored in docker: 2 competing PRs (#79913, #79538)
- #79804 telegram tool progress leaks despite suppress flag: PR #79924 (updated this morning)
- #80010 discord /voice list returns no voices: PR #80070
- #79380 gateway CPU spin ARM64: PR #79418

bugs without competing PRs that were investigated:
- #79731 minimax-portal OAuth tokens written but "No API key found" at runtime. traced through provider-registration.ts, model-auth.ts, resolveUsableCustomProviderApiKey, and auth-profiles/oauth.ts. the minimax manifest (added 3a12a7a7 on may 6) introduced nonSecretAuthMarkers: ["minimax-oauth"] which changes isNonSecretApiKeyMarker behavior. before the manifest, resolveUsableCustomProviderApiKey returns the "minimax-oauth" marker at line 173 (since isNonSecretApiKeyMarker was false), then the line-612 guard in model-auth.ts is false so it falls through to profile lookup. after the manifest, resolveUsableCustomProviderApiKey returns null (isNonSecretApiKeyMarker is now true, skips line-173 branch, no other branch matches). in both cases the code should reach the profile lookup. couldn't confirm exact break without live repro.
- #79343 discord shows "not configured" after upgrade: vague report, no logs, no clear regression in recent discord commits. prior session also investigated this one - skip.
- #79983 SYSTEM_RUN_DISABLED despite security=full in exec policy: security label - needs owner review per CLAUDE.md.

no PR opened this run. no candidate met all five criteria (regression class, zero competing PR, <30 lines, clear repro, file paths verifiable on main).

## escalations

none.
