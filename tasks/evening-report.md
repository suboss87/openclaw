# evening report - 2026-04-28

generated: IST evening / EU EOD / US mid-morning

---

## commit count (upstream main, top-46 tracker)

| stat | value |
|------|-------|
| merged PRs (lifetime) | 5 |
| gap to 46 | **41** |
| last merge | #70413 - fix(agents): route /btw (2026-04-23) |

no new merges since April 23. 8 PRs closed without merge since April 22.

---

## open PR state (upstream openclaw/openclaw)

| # | title | age | last activity | notes |
|---|-------|-----|---------------|-------|
| [#73162](https://github.com/openclaw/openclaw/pull/73162) | fix(slack): remove socket reconnect attempt cap | 0d | today | fresh, CI pending |
| [#68446](https://github.com/openclaw/openclaw/pull/68446) | fix(whatsapp): stop DM allowFrom fallback | 10d | Apr 25 | 5 comments, no review |
| [#66544](https://github.com/openclaw/openclaw/pull/66544) | fix(gateway): exclude heartbeat sender ID | 14d | Apr 25 | 5 comments, no review |
| [#66225](https://github.com/openclaw/openclaw/pull/66225) | fix(agents): align final tag regexes | 14d | **Apr 27** | 7 comments, activity yesterday |

CI unknown - MCP check-run access restricted to suboss87/openclaw. #72570 closed Apr 27 (was open this morning).

---

## notable closures without merge (since Apr 22)

- #72570 agents: stop subagent task duplication (closed Apr 27, 4 comments)
- #71633 bonjour: windowsHide patch ciao@1.3.6 (closed Apr 27, 4 comments)
- #71636 config: ModelProviderSchema.models optional (closed Apr 26, 3 comments)
- #69685 agents: strip final tags from persisted message (closed Apr 25, 5 comments)
- #71512 control-ui: avatar auth blob URL (closed Apr 25, 4 comments)
- #71515 config: models optional v2 (closed Apr 25, 2 comments)
- #71505 bonjour: windowsHide patch ciao@1.3.5 (closed Apr 25, 3 comments)
- #70480 gateway: MCP cohort teardown on nested run (closed Apr 23, 2 comments)

comment bodies blocked by MCP scope. pnpm patch PRs (#71505, #71633) both closed quickly.
read threads manually via GitHub web before refiling anything.

---

## maintainer pings

needed but can't send - MCP write restricted to fork only:

- #68446 (10d, whatsapp): @obviyus or @vincentkoc
- #66544 (14d, gateway): @steipete or @jacobtomlinson
- #66225 (14d, agents): @steipete or @jacobtomlinson (check thread first - activity Apr 27)

post manually via GitHub web, or extend MCP scope to openclaw/openclaw to unblock.

---

## rebases needed tomorrow

- #66225 and #66544: 14d on base, drift likely - rebase before pinging
- #68446: 10d on base - verify
- #73162: filed today, no rebase needed

---

## top priority for tomorrow morning autopilot

#66225 had 2 new comments yesterday (Apr 27, updated 10:51 UTC) - likely a change request.
read thread via GitHub web first. #69685 (companion) was closed Apr 25 - may have the same
feedback. address any change request on #66225 before hunting new bugs.
