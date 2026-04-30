# evening report - 2026-04-30

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-46 tracker)

| stat | value |
|------|-------|
| merged PRs (lifetime) | 5 |
| gap to 46 | **41** |
| last merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new upstream merges today. upstream read blocked (MCP scoped to fork only).
**big output day: 5 new PRs filed today** (#11-#15). total open: 14.

---

## open PR state (fork proxy - upstream #s unknown, MCP blocked)

| fork # | title (short) | age | CI | review |
|--------|---------------|-----|----|--------|
| #1 | fix(gateway): MCP cleanup nested lane runs | 7d | FAIL (security-fast) | none |
| #2 | fix(discord): partial GuildThreadChannel parentId | 7d | skipped | none |
| #3 | fix(configure): preserve primary model on reconfig | 6d | skipped | none |
| #4 | fix: openUrl exit code Windows | 5d | skipped | none |
| #5 | fix(bonjour): PROBING CANCELLED suppression | 4d | skipped | none |
| #6 | fix(image): surface error on optimization fail | 2d | skipped | none |
| #7 | fix(cron): re-arm timer on unexpected rejection | 2d | skipped | none |
| #8 | fix(web-fetch): charset from Content-Type/meta | 2d | skipped | none |
| #9 | fix(exec): skill env vars into Docker sandbox | 2d | skipped | none |
| #11 | fix(cron): mirror synthesized text to transcript | 0d | queued | none |
| #12 | fix(gateway): Paperclip metadata through AJV | 0d | queued | none |
| #13 | fix(cron): reject invalid cron on disabled jobs | 0d | queued | none |
| #14 | fix(exec): bashElevated in gateway agent path | 0d | queued | none |
| #15 | fix(discord): READY race before lifecycle listener | 0d | queued | none |

---

## CI health

- **PR #1** `security-fast` FAILURE (7d persistent) - not caused by our 4-line fix.
  fork main is stale (missing all upstream code), so the diff spans 14,382 files.
  scanner swept the whole upstream codebase. rebase onto upstream will fix.
- **PRs #2-#9**: fork lacks CI secrets; only labeling workflows fire (skipped/cancelled). not our code.
- **PRs #11-#15**: checks queued (filed hours ago), no failures yet.

---

## maintainer pings

upstream write blocked (MCP locked to fork). overdue pings for manual send via GitHub web:

- **#66225** (now 15d, agents/hooks): ping @steipete or @jacobtomlinson - check for change requests first.
- **#66544** (now 15d, gateway): ping @steipete or @jacobtomlinson - no activity since Apr 25.
- **#68446** (now 11d, whatsapp): ping @obviyus or @vincentkoc - no activity since Apr 25.
- **#73162** (2d, slack): had activity yesterday - read thread via GitHub web before pinging.

fork PR #4 has 1 comment (xinhanliu0216-droid, NONE association, Apr 25) - self-promotion link to their repo. no reply needed.

---

## unanswered human comments

#73162 and #66225 both may have updated threads - unreadable from here.
check both via GitHub web before morning run. change request likely still pending on #66225.

---

## merges in last 24h

none. last merge was 7 days ago (#70413, Apr 23).

---

## rebases needed tomorrow (morning run)

| fork PR | area | age | priority |
|---------|------|-----|----------|
| #1 | gateway/MCP | 7d | HIGH - CI blocked, security-fast red |
| #2 | discord | 7d | HIGH - user regression |
| #3 | configure/auth | 6d | medium |
| #4 | onboard/Windows | 5d | medium |
| #5 | infra/bonjour | 4d | low |
| #6-#9 | image/cron/web/exec | 2d | low - approaching 3d threshold |

do NOT rebase #11-#15 yet - filed today, let CI finish first.

---

## top priority bug for tomorrow morning autopilot

**#74138 - feishu: `createScopedPairingAccess is not a function`** (beta blocker, still zero PRs)
- error in `extensions/feishu/src/bot.ts` at dispatch path
- function dropped sometime in the 2026.4.24-4.26 window
- verify by diffing feishu plugin-sdk export list against last known good commit
- quick win: no competing PRs, clear error, contained extension file
