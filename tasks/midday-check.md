# Midday Check - 2026-05-09

## Open PR status (suboss87/openclaw)

4 PRs open, all from April 2026. No human reviewer activity in last 6 hours.

| PR    | Title                                                         | Last Updated |
| ----- | ------------------------------------------------------------- | ------------ |
| 73162 | fix(slack): remove socket reconnect attempt cap               | 2026-05-03   |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass   | 2026-05-01   |
| 66544 | fix(gateway): exclude heartbeat sender from session display   | 2026-05-03   |
| 66225 | fix(agents): align final tag regexes for self-closing variant | 2026-05-01   |

## Bug Hunt

Scanned 30 fresh bug issues (filed since 2026-04-27). Most hot regressions were
claimed within hours by other contributors:

- #79605 (Telegram streaming partial) - competing PR #79696
- #79490 (SPAWN_ALLOWLIST ignored) - competing PR #79538
- #79630 (contextEngine afterTurn replay) - competing PRs #79641, #79665
- #79613 (Control UI model display) - competing PRs #79627, #79628, #79665

Two unclaimed regressions investigated, both ruled out:

- #79676 (Slack buttons not continuing session): tests confirm enqueueSlackBlockActionEvent
  is the correct path for reply buttons; if/else-if structure is intentional. Root cause
  of session not waking up is unclear without live trace; not enough to fix blind.

- #79343 (Discord not configured after upgrade): schema looks valid for the reported
  config; token resolution path handles plaintext. DiscordAccountSchema uses .strict()
  so undisclosed legacy fields in user's actual config could silently fail, but can't
  determine which field changed without upstream git history. Not confident enough.

No clean candidate this run.

## Actions This Run

- git identity verified: suboss87@gmail.com / Subash
- upstream sync skipped: git fetch upstream blocked by proxy 502
- checked all 4 open PRs for fresh human feedback - none found
- scanned 30 fresh bug issues; 6 candidates investigated; all ruled out
- ready branches from morning run still need manual PR:
  - suboss87:fix/session-defaults-agent-model (fixes #79592)
  - suboss87:fix/doctor-fix-preserves-unknown-config-keys (fixes #78858)
  - suboss87:fix/tlon-group-join-race

## Escalations

- #79343: if user can share full unredacted channels.discord config, the
  DiscordAccountSchema/.strict() rejection hypothesis can be confirmed quickly
- #79676: needs live debug log from after enqueueSlackBlockActionEvent to trace
  session key resolution; static analysis alone is not enough
