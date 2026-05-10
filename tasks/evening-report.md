# Evening Report - 2026-05-10

Generated: IST evening / EU end of day / US mid-morning.

## Commit Count (top-30 tracker)

- Merged commits on openclaw/openclaw main: **5**
- Target: 46
- Gap: **41**

## Open PRs on upstream (openclaw/openclaw)

| # | Title | Area | Age | Last Updated | CI | Review |
|---|-------|------|-----|--------------|----|--------|
| 73162 | fix(slack): remove socket reconnect attempt cap | channels | 12d | 2026-05-03 | unknown | none |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass | channels | 22d | 2026-05-01 | unknown | none |
| 66544 | fix(gateway): exclude heartbeat sender from session display | gateway | 26d | 2026-05-03 | unknown | none |
| 66225 | fix(agents): align final tag regexes for self-closing variant | agents | 26d | 2026-05-01 | unknown | none |

MCP scoped to fork only - CI and review status not readable this session.
No human maintainer comments on any of these since 2026-05-03 (confirmed midday).

**STALE RISK:** #66225 and #66544 are at 26d. stale-close bots commonly trigger at 30d.
Rebase + ping on both is the first thing tomorrow morning.

## Maintainer Pings

MCP blocked from posting to openclaw/openclaw. Pings are 3+ days overdue.
Subash: send all four manually via GitHub web UI **tonight or first thing tomorrow.**

- #66225 (agents, 26d): ping @steipete or @jacobtomlinson - final tag regex fix, CI green, ask for a look
- #66544 (gateway, 26d): ping @steipete or @jacobtomlinson - heartbeat display fix, CI green
- #68446 (whatsapp, 22d): ping @obviyus or @vincentkoc - allowFrom group isolation fix, CI green
- #73162 (slack, 12d): ping @obviyus or @vincentkoc - reconnect cap removal, CI green

## Unanswered Comments

None. No human maintainer activity on any open PR since 2026-05-03.

## Recent Merges (last 24h)

None. Last merge was 2026-04-23 (#70413 via @steipete).

## Ready Branches (Piled Up - Need Manual PR)

| Branch | Fixes | Status |
|--------|-------|--------|
| fix/active-memory-none-status-regression | #79812 | NEW today - 111 tests pass |
| fix/session-defaults-agent-model | #79592 | ready since May 9 |
| fix/doctor-fix-preserves-unknown-config-keys | #78858 | ready since May 9 |
| fix/tlon-group-join-race | tlon race | ready since May 9 |

Open all four at: https://github.com/openclaw/openclaw/compare
4 ready branches with 0 open PRs is leaving runs on the table.

## Rebases Needed Tomorrow

- #66225 (26d) - rebase before pinging, highest priority
- #66544 (26d) - same
- #68446 (22d) - spot-check for conflicts
- #73162 (12d) - probably clean but verify

## Tomorrow Morning Priority Bug

**#79731 - minimax-portal OAuth tokens written but "No API key found" at runtime**

Root cause 60% traced (midday run):
- minimax manifest (3a12a7a7, May 6) added nonSecretAuthMarkers: ["minimax-oauth"]
- this flips isNonSecretApiKeyMarker, breaking the resolveUsableCustomProviderApiKey
  return path in extensions/minimax/src/
- no competing PRs as of midday
- need live repro to confirm the exact branch mismatch before filing

Good fit: regression class, clear code path, no competition, fix likely <30 lines.
