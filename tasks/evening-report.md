# evening report - 2026-04-26

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-30 tracker)

| stat | value |
|------|-------|
| merged PRs (suboss87, lifetime) | 5 |
| gap to 46 | **41** |
| last merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new merges since yesterday. upstream MCP still restricted to fork - stat sourced from midday snapshot.

---

## open PR state

| # | title | CI | review | age |
|---|-------|----|--------|-----|
| #5 | fix(bonjour): suppress CIAO PROBING CANCELLED | queued | none | <1d |
| #4 | fix: check exit code in openUrl (Windows) | all skipped | none | ~1.5d |
| #3 | fix(configure): preserve custom primary model | all skipped | none | ~2d |
| #2 | fix(discord): handle partial GuildThreadChannel | all skipped | none | **3.3d** |
| #1 | fix(gateway): clean up MCP child processes | **security-fast FAIL** | none | **3.5d** |

all PRs are fork-side (suboss87/openclaw). upstream PR state unavailable - MCP restricted to fork.

---

## CI findings

**PR #1 security-fast FAILURE** - unchanged from yesterday. root cause: stale base
(`2e8a0b29`, 2026-04-23). diff now covers 300+ files due to base drift. actual fix is
3 lines in `src/gateway/server-methods/agent.ts`. needs a rebase before pinging.

**PRs #2-#4 skipped** - fork lacks CI secrets for the full check suite. not caused by our changes.

**PR #5 queued** - opened overnight 2026-04-26T01:47Z, some jobs still pending. no failures visible.

---

## unanswered comments

PR #4 has a comment from `xinhanliu0216-droid` (2026-04-25T14:19Z, author_association: NONE)
promoting their own cross-platform fork as an alternative. not a maintainer. no reply sent.
worth closing as duplicate if it escalates.

---

## maintainer pings sent this run

**none** - blocked. PRs #1 and #2 both cross the 3-day threshold today but upstream
openclaw/openclaw is outside MCP scope and git remote returns 502. the corresponding
upstream PRs (#66544, #66225, #68446, #71633, #71636) can't be reached for comment history
check or ping.

if upstream access is restored, send:
- gateway/agents PRs: @steipete or @jacobtomlinson
- discord/channels PRs: @obviyus or @vincentkoc

---

## rebases needed tomorrow (morning run)

- **PR #1** priority - rebase `fix/mcp-nested-run-cleanup` onto current main, push to fork,
  verify security-fast passes, then ping gateway maintainer
- **PR #2** check base drift - 3.3d old, 1 commit, verify no conflicts before ping

---

## top priority bug for tomorrow morning autopilot

**PR #2 discord thread slash command crash** (issue #70447) - real user-facing regression.
any Discord slash command inside a thread hits `Cannot access rawData on partial Channel`
and kills the interaction. fix is targeted (3 call sites, try/catch), regression test in place,
CI should be green after rebase. highest merge probability if upstream access is available.
