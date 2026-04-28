# midday check - 2026-04-28

## open PR status

| PR     | title                                                                      | comments | last updated          | status                                           |
| ------ | -------------------------------------------------------------------------- | -------- | --------------------- | ------------------------------------------------ |
| #73162 | fix(slack): remove socket reconnect attempt cap                            | 3        | 2026-04-28 06:42 UTC  | opened today; 3 comments, content unreadable (MCP scope) |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant               | 7        | 2026-04-27 10:51 UTC  | open, no new activity today                      |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass  | 5        | 2026-04-25            | open, no new activity                            |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name        | 5        | 2026-04-25            | open, no new activity                            |

#72570 (fix(agents): stop duplicating subagent task in system prompt) no longer in open PR
list - likely merged or closed since yesterday's run.

## actions this run

- fork sync: upstream remote unreachable via local proxy (502 on git fetch); origin/main
  already at ec22905 (evening report 2026-04-27), no additional sync needed
- PR feedback check: #73162 has 3 comments as of 06:42 UTC today - content unreadable due
  to MCP scope restriction (suboss87/openclaw only); no actionable human text retrieved;
  manual check advised
- bug hunt: 7 fresh bugs reviewed from last 12 hours:
  - #73366 (ollama thinking always false) - strong regression but already taken by PR #73386
  - #73407 (libsignal GPLv3 concern) - legal/policy question, not a code fix
  - #73339 (docker cold start 3+ min) - too complex, root cause in bundled runtime mirror internals
  - #73323 (gateway runtime degradation Windows/Node 24) - too complex, multi-subsystem issue
  - #73254 (duplicate responses MiniMax) - already tagged r: support, skip
  - #73211 (mattermost streaming hardcoded) - feature/config gap, not a regression/crash
  - #73167 (teams inbound stopped 4.9->4.25) - regression class, no competing PR; but fork is
    a shallow clone and upstream proxy is unreachable so can't bisect the root cause; code reads
    cleanly with no obvious bug at the extension layer - skip (merge gate not satisfiable)
- no fix opened this run

## escalations

- MCP scope restriction still blocks reading PR comments on upstream repo; #73162 has 3
  comments from its opening hours - needs a manual eyeball for early reviewer feedback
- #73167 (teams inbound regression) is worth a deeper look when upstream git access is
  restored; likely caused by something in core between 4.9 and 4.25, not the extension
