# evening report - 2026-05-12

generated: IST evening / EU end of day / US mid-morning

## commit count (top-30 tracker)

- merged commits on openclaw/openclaw: **5**
- target: 46
- gap: **41**
- no new merges in last 24h (last: #70413, 2026-04-23)

## open PR state (suboss87/openclaw fork - 19 PRs staging for upstream)

| #  | title (short)                              | area      | age  | CI                          | pinged        |
|----|--------------------------------------------|-----------|------|-----------------------------|---------------|
| 1  | fix(gateway): mcp nested run cleanup       | gateway   | 18d  | green (sec-fast infra only) | 2026-05-11    |
| 2  | fix(discord): partial GuildThreadChannel   | channels  | 18d  | green (sec-fast infra only) | 2026-05-11    |
| 3  | fix(configure): preserve custom model      | core      | 17d  | stale CI                    | 2026-05-11    |
| 4  | fix: openUrl exit code on Windows          | core      | 16d  | stale CI                    | 2026-05-11    |
| 5  | fix(bonjour): suppress CIAO CANCELLED      | infra     | 15d  | stale CI                    | 2026-05-11    |
| 6  | fix(image): surface optimize error         | media     | 13d  | stale CI                    | **2026-05-12** |
| 7  | fix(cron): re-arm timer on catch           | cron      | 13d  | stale CI                    | **2026-05-12** |
| 8  | fix(web-fetch): charset detection          | infra     | 13d  | stale CI                    | **2026-05-12** |
| 9  | fix(exec): skill env in Docker sandbox     | exec      | 13d  | stale CI                    | **2026-05-12** |
| 11 | fix(cron): mirror text to transcript       | cron      | 11d  | stale CI                    | **2026-05-12** |
| 12 | fix(gateway): Paperclip metadata passthru  | gateway   | 11d  | stale CI                    | **2026-05-12** |
| 13 | fix(cron): validate disabled cron exprs    | cron      | 11d  | stale CI                    | **2026-05-12** |
| 14 | fix(exec): bashElevated in gateway path    | exec      | 11d  | stale CI                    | **2026-05-12** |
| 15 | fix(discord): READY before listener reg    | channels  | 11d  | stale CI                    | **2026-05-12** |
| 16 | fix(agents): stream_options.include_usage  | agents    | 10d  | stale CI                    | **2026-05-12** |
| 17 | fix(mcp): full data in channel tools       | gateway   | 7d   | green (sec-fast infra only) | **2026-05-12** |
| 18 | fix(plugins): skip chan config on toggle   | plugins   | 6d   | green (sec-fast infra only) | **2026-05-12** |
| 19 | fix(discord): clear stale isConnecting     | channels  | 5d   | green (sec-fast infra only) | **2026-05-12** |
| 20 | fix(tlon): dedup group-join pokes          | tlon      | 5d   | checks-node-core FAIL, DIRTY| **2026-05-12** |

## CI notes

- `security-fast` failure on all PRs is fork-infra only (no upstream secrets in forks) - not our code
- PR #20 has a real `checks-node-core` failure but the change is tlon-extension-only; failure is
  almost certainly upstream drift - branch is also `dirty` (needs rebase)
- PRs #3-#16 have stale/skipped CI from older workflow versions - need rebase to get fresh runs

## pings sent this run

- 14 pings posted on PRs #6-#20 (first pings for all 14)
- PRs #1-#5 covered by yesterday's run (2026-05-11)
- all 19 PRs now have at least one ping within the last 7 days

## no upstream access this session

- gh CLI not installed, MCP restricted to suboss87/openclaw
- upstream PRs (#66225, #66544, #68446, #73162) status unknown - check manually
- stale risk: #66225 and #66544 were at 26d as of 2026-05-10 - now 28d, close to 30d bot limit

## rebases needed tomorrow morning

- PR #20 - confirmed dirty, must rebase before upstream PR can open
- PRs #1-#5 (15-18d) - highest drift risk, all need fresh CI runs
- PRs #6-#16 (11-13d) - stale CI, batch rebase pass after #1-#5

## top priority bug for tomorrow autopilot

**#79731 - minimax-portal OAuth tokens written but "No API key found" at runtime**

from 2026-05-10 evening report: root cause 60% traced, no competing PRs. minimax manifest
`nonSecretAuthMarkers: ["minimax-oauth"]` flips `isNonSecretApiKeyMarker`, breaking the
`resolveUsableCustomProviderApiKey` return path. fix likely under 30 lines. start here.
