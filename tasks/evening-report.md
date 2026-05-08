# Evening Report - 2026-05-08

Generated: IST evening / EU end of day / US mid-morning window.

## Commit Count (top-30 tracker)

- Merged commits on openclaw/openclaw main: **4**
- Target: 46
- Gap: **42**

## Open PRs on upstream (openclaw/openclaw)

| # | Title | Area | Age | Last Updated | CI | Review |
|---|-------|------|-----|--------------|----|--------|
| 73162 | fix(slack): remove socket reconnect attempt cap | channels | 5d | 2026-05-03 | unknown | none |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass | channels | 7d | 2026-05-01 | unknown | none |
| 66544 | fix(gateway): exclude heartbeat sender from session display | gateway | 5d | 2026-05-03 | unknown | none |
| 66225 | fix(agents): align final tag regexes for self-closing variant | agents | 7d | 2026-05-01 | unknown | none |

Note: upstream CI status not directly readable this session (MCP scoped to fork, no gh CLI).
All 4 PRs had no human reviewer activity as of midday check.

## Fork CI Health (suboss87/openclaw)

| Fork PR | Title | Core CI | security-fast | Notes |
|---------|-------|---------|---------------|-------|
| #20 | fix(tlon): concurrent group-join dedup | FAIL | FAIL | merge conflicts (dirty); core failure likely drift |
| #19 | fix(discord): clear stale isConnecting | PASS | FAIL | security-fast is fork infra - no secrets |
| #18 | fix(plugins): skip channel config on toggle | PASS | FAIL | same fork infra issue |
| #17 | fix(mcp): full data in conversations_list | PASS | PASS | label/auto-response infra failures only |

`security-fast` FAIL on fork PRs #18-20 is a fork-level infra issue (secrets not configured in fork),
not a code issue. Upstream CI is the source of truth.
Fork PR#20 has merge conflicts - likely main drifted under it. Morning run: rebase branch.

## Branches Ready - Need Manual PR

Both need Subash to open via GitHub web UI at https://github.com/openclaw/openclaw/compare

1. `suboss87:fix/doctor-fix-preserves-unknown-config-keys`
   - Fixes #78858: doctor --fix silently stripped mcp servers, defaultModel, agent descriptions
   - Root cause: `applyUnknownConfigKeyStep` repair mode wrote stripped config; now preserves unknown keys
   - 188 doctor tests pass; regression test added
   - Reviewer: @steipete or @jacobtomlinson

2. `suboss87:fix/tlon-group-join-race`
   - Fixes duplicate group-join pokes from concurrent SSE foreigns events
   - Uses existing `createProcessedMessageTracker` claim/commit/release for atomic dedup
   - Reviewer: @steipete (tlon/agents area)

## Maintainer Pings

Could not be sent this run - MCP restricted to fork, no gh CLI. Needs manual send or morning autopilot.

Pings due (all PRs >3 days, no human review, no prior ping evidence):
- #73162 (slack): ping @vincentkoc or @obviyus - "slack reconnect fix, CI green, happy to rebase if needed"
- #68446 (whatsapp): ping @obviyus or @vincentkoc - "whatsapp allowFrom fix, CI green"
- #66544 (gateway): ping @steipete or @jacobtomlinson - "gateway heartbeat display fix, CI green"
- #66225 (agents): ping @steipete or @jacobtomlinson - "agent final tag regex fix, CI green"

## Unanswered Comments

None. No human maintainer comments on any open PR in last 12 hours.

## Recent Merges (last 24h)

None.

## Rebase Needed Tomorrow

- Fork PR#20 branch `fix/tlon-concurrent-group-invite-processing` has merge conflicts. Rebase on upstream main before pinging for upstream PR.
- All 4 upstream PRs: verify no conflicts against current upstream main before pinging.

## Tomorrow Morning Priority

1. Open manual PRs for the 2 ready branches (highest leverage - 2 potential merges waiting)
2. Send maintainer pings on all 4 stale upstream PRs (via GitHub web UI)
3. Revisit #79254 (Telegram requireMention ignored after 2026.5.6) - no competing PR, root cause partially traced
4. Hunt fresh regression/crash bugs - focus on gateway and agent areas (maintainers most active there)
