# evening report - 2026-04-25

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-30 tracker)

| stat | value |
|------|-------|
| merged PRs (lifetime) | 5 |
| gap to 46 | **41** |
| last merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new merges since yesterday's report.

---

## open PR state

### fork PRs (suboss87/openclaw) - live data

| # | title | CI | review | age |
|---|-------|----|--------|-----|
| #4 | fix: check exit code in openUrl (Windows) | queued | none | <1d |
| #3 | fix(configure): preserve custom primary model | all skipped | none | ~1d |
| #2 | fix(discord): handle partial GuildThreadChannel | all skipped | none | ~2d |
| #1 | fix(gateway): clean up MCP child processes | **security-fast FAIL** | none | ~2d |

note: upstream MCP restricted to fork - upstream PR state unchanged from midday snapshot.

---

## CI findings

**PR #1 security-fast FAILURE** - still failing, same root cause as yesterday: branch
`fix/mcp-nested-run-cleanup` base is `2e8a0b29` (stale). Rebase tomorrow will fix it.
The 12-line fix in `src/gateway/server-methods/agent.ts` itself is clean.

**PR #3, #2 skipped** - fork lacks CI secrets; not caused by our changes.

**PR #4 queued** - opened today, checks still pending. base is `c7095d24` (today's main),
no drift concern. expect results overnight.

---

## notable activity

**PR #4 spam comment** - user `xinhanliu0216-droid` (no contributor association) left a
comment on PR #4 at 14:19 IST promoting their own fork repo as an "alternative solution".
not a maintainer comment, no reply needed. worth monitoring if it escalates.

---

## maintainer pings sent this run

none. PR #1 (~2d) and PR #2 (~2d) both cross the 3-day threshold tomorrow morning.
morning run should ping:
- PR #1 (gateway): @steipete or @jacobtomlinson
- PR #2 (discord/channels): @obviyus or @vincentkoc
also check comment history on upstream #66544 and #66225 (~10d, no review) if
upstream MCP is reachable tomorrow.

---

## rebases needed tomorrow (morning run)

- **PR #1** - rebase `fix/mcp-nested-run-cleanup` onto current main (priority - hits
  3-day ping threshold tomorrow, want CI green before pinging)
- **PR #2** - verify base drift; 1 commit, small diff, likely clean

---

## top priority bug for tomorrow morning autopilot

PR #2 discord thread crash (#70447) is a real user-facing regression - slash commands
crash for any user running them inside a Discord thread. small targeted fix, regression
test in place, CI should be green after rebase. good candidate to push upstream first.
