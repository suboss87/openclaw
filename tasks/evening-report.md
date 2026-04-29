# evening report - 2026-04-29

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-46 tracker)

| stat | value |
|------|-------|
| merged PRs (lifetime) | 5 |
| gap to 46 | **41** |
| last merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new merges today. upstream read blocked (MCP scoped to fork only; no gh CLI).

---

## open PR state (upstream openclaw/openclaw)

| # | title | age | last activity | notes |
|---|-------|-----|---------------|-------|
| [#73162](https://github.com/openclaw/openclaw/pull/73162) | fix(slack): remove socket reconnect attempt cap | 1d | today 07:15 UTC | 5 comments - **MCP-blocked, read manually** |
| [#66225](https://github.com/openclaw/openclaw/pull/66225) | fix(agents): align final tag regexes | 14d | today 07:50 UTC | 7 comments - **MCP-blocked, read manually** |
| [#68446](https://github.com/openclaw/openclaw/pull/68446) | fix(whatsapp): stop DM allowFrom fallback | 10d | Apr 25 | 5 comments, no new activity |
| [#66544](https://github.com/openclaw/openclaw/pull/66544) | fix(gateway): exclude heartbeat sender ID | 14d | Apr 25 | 5 comments, no new activity |

---

## CI health

- fork PR #1 (`fix/mcp-nested-run-cleanup`): `security-fast` FAILURE - persistent since
  Apr 23. base is `2e8a0b2` (6d stale). all other 208 checks pass. rebase will fix.
- fork PRs #2-#9: fork lacks CI secrets; only labeling workflows fire (skipped/cancelled).
  not caused by our code.

---

## maintainer pings

upstream write blocked (MCP locked to fork). overdue pings for manual send via GitHub web:

- #66225 (14d, agents) + #73162 (1d, slack): check threads first - both had activity today.
  if no change request is pending, ping @steipete or @jacobtomlinson on #66225.
- #68446 (10d, whatsapp): @obviyus or @vincentkoc - no activity since Apr 25, safe to ping.
- #66544 (14d, gateway): @steipete or @jacobtomlinson - no activity since Apr 25, safe to ping.

---

## unanswered human comments

#73162 and #66225 both updated today but comment bodies are unreadable (MCP scope).
**check both via GitHub web before morning run.** change requests likely on #66225 (14d, 7 comments).

---

## merges in last 24h

none. last merge was 6 days ago (#70413, Apr 23).

---

## rebases needed tomorrow (morning run)

| fork PR | branch | base age | priority |
|---------|--------|----------|----------|
| #1 | fix/mcp-nested-run-cleanup | 6d | high - security-fast CI blocked |
| #2 | fix/discord-thread-slash-command-partial-channel | 6d | high - real user regression |
| #3 | fix/configure-preserves-custom-primary-model | 5d | medium |
| #4 | fix/windows-openurl-exit-code | 4d | medium |
| #5 | fix/bonjour-ciao-probing-cancelled | 3d | low |

upstream PRs #66225 + #66544 also need rebase (14d drift) - do after reading threads.

---

## top priority bug for tomorrow morning autopilot

**#74138 - feishu: `createScopedPairingAccess is not a function`** (beta blocker, zero PRs)
- error is in `extensions/feishu/src/bot.ts` at the dispatch path
- function was present in current main but likely dropped in the 2026.4.24-4.26 window
- verify by diffing the feishu plugin-sdk export list against the last known good commit
- quick win: no competing PRs, clear error, mid-size extension file
