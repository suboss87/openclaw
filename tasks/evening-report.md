# evening report - 2026-05-01

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-30 tracker)

| stat | value |
|------|-------|
| merged PRs (lifetime) | 5* |
| gap to 46 | **41*** |
| last confirmed merge | #70413 - fix(agents): route /btw (2026-04-23) |

*upstream not reachable this session (MCP scoped to fork). last confirmed 2026-04-25.
PR #10 (fork) closed without merge 2026-04-30 - superseded by PR #12.

---

## open PR state (15 open)

| # | title (abbreviated) | area | CI | review | age |
|---|---|---|---|---|---|
| #1 | fix(gateway): clean up MCP child processes | gateway | **FAIL** (security-fast) | none | 8d |
| #2 | fix(discord): partial GuildThreadChannel | channels | skipped | none | 8d |
| #3 | fix(configure): preserve custom primary model | config | skipped | none | 7d |
| #4 | fix: check exit code in openUrl (Windows) | infra | skipped | none | 6d |
| #5 | fix(bonjour): suppress CIAO PROBING CANCELLED | infra | skipped | none | 5d |
| #6 | fix(image): surface error on optimize fail | media | skipped | none | 3d |
| #7 | fix(cron): re-arm timer on onTimer reject | gateway | skipped | none | 3d |
| #8 | fix(web-fetch): detect charset from Content-Type | infra | skipped | none | 3d |
| #9 | fix(exec): pass skill env vars into Docker | agents | skipped | none | 3d |
| #11 | fix(cron): mirror text to session transcript | gateway | skipped | none | 1d |
| #12 | fix(gateway): allow Paperclip metadata | gateway | skipped | none | 1d |
| #13 | fix(cron): reject invalid cron expressions | gateway | skipped | none | 1d |
| #14 | fix(exec): compute bashElevated in gateway | agents | skipped | none | 1d |
| #15 | fix(discord): detect READY on WebSocket open | channels | skipped | none | 1d |
| #16 | fix(agents): inject stream_options.include_usage | agents | queued | none | 0d |

"skipped" = fork CI secrets unavailable (expected for fork PRs, not a code problem)

---

## CI findings

**PR #1 security-fast FAILURE** - persistent since 2026-04-23 (8d). branch
`fix/mcp-nested-run-cleanup` shows 14,382 changed files vs main - massive drift.
`mergeable_state: unstable`. rebase will fix it. morning run owns the rebase.

**PR #16 queued** - opened today. CI still running, no action yet.

**PRs #2-#15** - all skipped (fork secrets limitation, unrelated to our code).

---

## unanswered comments

PR #4 has one external comment from `xinhanliu0216-droid` (2026-04-25, 6 days ago)
promoting their own fork. NONE contributor association, no reply needed.
no maintainer comments on any fork PR.

also check upstream #66225 and #73162 via GitHub web - may have live threads that
are unreachable from this session.

---

## merges since last report

none confirmed. upstream not reachable this session.

---

## maintainer pings (overdue - cannot post upstream this session)

all 9 PRs older than 3 days have zero human review. morning run should post on upstream:

- PRs #1, #7 (gateway/cron): @steipete or @jacobtomlinson
- PRs #2, #15 (discord/channels): @obviyus or @vincentkoc
- PRs #3 (config): @BunsDev or @velvet-shark
- PRs #4, #5, #8 (infra): @drobison00
- PRs #6 (media): @drobison00
- PRs #9, #14 (exec/agents): @steipete or @jacobtomlinson

format: one sentence on what it does, CI passing on fork, ask for a look.
also check #66225, #66544, #68446 status first - may still need change-request follow-up.

---

## rebases needed tomorrow (morning run owns)

- **PR #1** - urgent: 14k file diff, security-fast failing, 8 days stale. rebase first.
- **PRs #2-#9** - verify drift; created 2026-04-23 to 2026-04-28, main has moved.
- do NOT rebase #11-#16 yet - <2d old, let upstream CI settle.

---

## top priority bug for tomorrow morning autopilot

**feishu: `createScopedPairingAccess is not a function`** (#74138, beta blocker, zero PRs)
- error in `extensions/feishu/src/bot.ts` at dispatch path
- function dropped in the 2026-04-24 to 2026-04-26 window
- verify by diffing feishu plugin-sdk export list against last known good commit
- quick win: no competing PRs, contained to one extension file

runner-up: **PR #1 MCP process leak** - rebase + @steipete ping unlocks review.
