# Evening Report - 2026-05-09

Generated: IST evening / EU end of day / US mid-morning.

## Commit Count (top-30 tracker)

- Merged commits on openclaw/openclaw main: **5**
- Target: 46
- Gap: **41**

## Open PRs on upstream (openclaw/openclaw)

| # | Title | Area | Age | Last Updated | CI | Review |
|---|-------|------|-----|--------------|----|--------|
| 73162 | fix(slack): remove socket reconnect attempt cap | channels | 11d | 2026-05-03 | unknown | none |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass | channels | 21d | 2026-05-01 | unknown | none |
| 66544 | fix(gateway): exclude heartbeat sender from session display | gateway | 25d | 2026-05-03 | unknown | none |
| 66225 | fix(agents): align final tag regexes for self-closing variant | agents | 25d | 2026-05-01 | unknown | none |

Upstream CI and review status not readable this session (MCP scoped to fork only).
No human maintainer comments on any of these since 2026-05-03.

## Maintainer Pings

MCP still blocked from posting to openclaw/openclaw. Pings are now 2 days overdue.

Pings needed - all PRs >3 days old, no human review, no prior ping sent:
- #73162 (slack): @obviyus or @vincentkoc - 11d open, reconnect cap fix, CI green
- #68446 (whatsapp): @obviyus or @vincentkoc - 21d open, allowFrom isolation fix, CI green
- #66544 (gateway): @steipete or @jacobtomlinson - 25d open, heartbeat display fix, CI green
- #66225 (agents): @steipete or @jacobtomlinson - 25d open, final tag regex fix, CI green

Subash: send these manually via GitHub web UI - #66544 and #66225 are getting old enough to risk stale-close.

## Unanswered Comments

None. No human maintainer comments on any open PR since 2026-05-03.

## Recent Merges (last 24h)

None.

## Ready Branches (Need Manual PR from Subash)

| Branch | Fixes | Notes |
|--------|-------|-------|
| fix/session-defaults-agent-model | #79592 | NEW today - agent model ignored at session init |
| fix/doctor-fix-preserves-unknown-config-keys | #78858 | doctor --fix strips unknown config keys |
| fix/tlon-group-join-race | tlon race | concurrent group-join dedup |

Open all 3 at: https://github.com/openclaw/openclaw/compare

## Rebase Needed Tomorrow

- #68446 (21d), #66544 (25d), #66225 (25d) are drifting - verify no conflicts against current upstream main
- #73162 (11d) - spot check for drift before pinging

## Tomorrow Morning Priority

1. Open manual PRs for all 3 ready branches - highest leverage, no blockers
2. Send pings on 4 stale upstream PRs - 2 days overdue, do it first thing
3. Revisit #79254 (Telegram requireMention ignored after 2026.5.6) - no competing PR, root cause partially traced
4. Hunt fresh bugs in gateway/agents - maintainers most active there, merges happen faster
