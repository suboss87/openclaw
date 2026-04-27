# midday check - 2026-04-27

## open PR status

| PR     | title                                                                      | comments | last updated       | status                        |
| ------ | -------------------------------------------------------------------------- | -------- | ------------------ | ----------------------------- |
| #72570 | fix(agents): stop duplicating subagent task in system prompt               | 3        | 2026-04-27 04:13   | open - comment content unreadable (MCP scope) |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant               | 7        | 2026-04-27 07:38   | open - 2 new comments today, content unreadable |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass  | 5        | 2026-04-25         | open - no new activity        |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name        | 5        | 2026-04-25         | open - no new activity        |

#69685 (fix(agents): strip final tags from persisted message) closed 2026-04-25, not merged.
companion #66225 still open - likely waiting for that to land first.

## actions this run

- fork sync skipped: upstream remote unreachable via local proxy (502 on git fetch); origin/main
  already reflects last known good state from prior runs
- PR feedback check: #66225 picked up 2 new comments today (5 -> 7, updated 07:38 UTC) and
  #72570 has 3 comments within 30 min of creation - both active, content unreadable due to MCP
  scope restriction (suboss87/openclaw only); no actionable human text retrieved
- bug hunt: 4 fresh bugs filed in the last 12 hours, all already have competing PRs
  - #72536 (webchat duplicate sends) -> competing PR #72605
  - #72547 (WhatsApp QR proxy bypass) -> competing PR #72692
  - #72697 (sticky failover override) -> competing PR #64656
  - #72450 (web UI logs empty) -> no competing PR but repro too thin (screenshot only) - skip
- no fix opened this run

## escalations

- MCP scope still limits comment reads to suboss87/openclaw; can't confirm if #66225's
  2 new comments include a change request or a merge signal - check manually
- #72570 had 3 comments within 30 min of opening - worth a manual check for early feedback
