# evening report - 2026-04-27

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-30 tracker)

| stat | value |
|------|-------|
| merged PRs (suboss87, lifetime) | 5 |
| gap to 46 | **41** |
| last known merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new merges confirmed today. upstream MCP still restricted to fork.
#71636 and #71633 dropped from midday snapshot - likely merged or closed since 2026-04-26.

---

## open PR state (upstream openclaw/openclaw)

| # | title | comments | CI | age | flag |
|---|-------|----------|----|-----|------|
| #72570 | fix(agents): stop duplicating subagent task in system prompt | 3 | unknown | <1d | 3 comments within 30 min of opening - check manually |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant | 7 (+2 today) | unknown | 14d | **2 new comments 07:38 UTC - urgent, may be a change request** |
| #68446 | fix(whatsapp): DM allowFrom fallback group policy bypass | 5 | unknown | 10d | no new activity since 2026-04-25 |
| #66544 | fix(gateway): exclude heartbeat sender ID from session name | 5 | unknown | 14d | no new activity since 2026-04-25 |

note: upstream PR comment content unreadable this run (MCP scope limited to fork).
#69685 was closed not-merged on 2026-04-25.

---

## fork staging PRs (suboss87/openclaw)

| # | branch | CI | age |
|---|--------|----|-----|
| #5 | fix/bonjour-ciao-probing-cancelled | skipped | 1d |
| #4 | fix/windows-openurl-exit-code | skipped | 2d |
| #3 | fix/configure-preserves-custom-primary-model | skipped | 3d |
| #2 | fix/discord-thread-slash-command-partial-channel | skipped | 4d |
| #1 | fix/mcp-nested-run-cleanup | **security-fast FAIL** | 4d |

CI on fork skips most checks (secrets not configured). PR #1's failure is pre-existing and
stale-base related - rebase needed before ping.

---

## maintainer pings sent this run

**none** - blocked again. upstream openclaw/openclaw outside MCP scope.
pings overdue for: #66544 (14d, gateway), #66225 (14d, agents), #68446 (10d, whatsapp/channels).

pending from yesterday's queue still not sent:
- #66544 + #66225: @steipete or @jacobtomlinson
- #68446: @obviyus or @vincentkoc

---

## unanswered comments

PR #4 (fork): community comment from `xinhanliu0216-droid` (2026-04-25T14:19Z, NONE association)
promoting their own fork. not a maintainer, outside 12h window. no reply sent.

#66225 and #72570 had new activity today but content unreadable. check manually before tomorrow morning run.

---

## rebases needed tomorrow (morning run)

- **PR #1** (fix/mcp-nested-run-cleanup) - rebase onto current main, verify security-fast, then ping

---

## top priority bug for tomorrow morning autopilot

**#66225 comment content** - 2 fresh comments today on a 14-day-old agents PR could be a
change request or merge signal. read them first before hunting new bugs. if it's a change request,
address it immediately - this is the oldest open PR.

secondary: Discord thread slash command crash (#70447, fork PR #2) - still highest-confidence
unsubmitted fix ready to go upstream.
