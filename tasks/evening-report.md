# evening report - 2026-05-04

## commit count (top-30 tracker)

- merged PRs to upstream main: **5**
- gap to 46: **41**
- no merges by suboss87 in the last 24h

## open PR state

| # | title | branch | CI | review | age |
|---|-------|--------|----|--------|-----|
| [#73162](https://github.com/openclaw/openclaw/pull/73162) | fix(slack): remove socket reconnect cap | `fix/slack-socket-reconnect-no-cap` | flaky unrelated (core-fast) | martingarramon LGTM Apr 30 | 6d |
| [#68446](https://github.com/openclaw/openclaw/pull/68446) | fix(whatsapp): DM allowFrom group bypass | `fix/whatsapp-group-allowfrom-bypass-v2` | green | none | 16d |
| [#66544](https://github.com/openclaw/openclaw/pull/66544) | fix(gateway): webchat heartbeat session label | `fix/webchat-heartbeat-session-label` | green | none | 20d |
| [#66225](https://github.com/openclaw/openclaw/pull/66225) | fix(agents): final tag self-closing strip | `fix/final-tag-self-closing-strip` | unclear | none | 20d |

## actions taken this run

- no CI failures from our changes; no branch pushes needed
- all four PR branch tips verified: suboss87 is last committer on each, no unexpected drift
- #73162 changelog commit (`7de350a`, May 3) confirmed on branch - requirement should be satisfied

## pings to post manually

MCP is scoped to fork only; post these directly on the upstream PR.

**#73162** - martingarramon LGTM'd Apr 30, changelog added May 3, CI flake is unrelated core-fast. verify if the May 3 landing ping was posted. if not:
> @steipete this looks ready to land - martingarramon reviewed and the changelog entry is in. the CI flake is the same unrelated core-fast issue hitting other PRs. happy to rebase if needed.

**#68446** - 16d open, no review. verify if the May 3 @vincentkoc ping was posted. if not:
> @vincentkoc hey, bumping this - 16 days now. the fix disables the groupAllowFrom DM fallback in `resolveWhatsAppCommandAuthorized` so group policy can't be bypassed via DM allowFrom. CI green. quick look when you get a chance would be great.

**#66544** - 20d open, no review. verify if the May 3 @jacobtomlinson ping was posted. if not:
> @jacobtomlinson bumping - 20 days open. CI green. it's a 2-line fix stopping the internal heartbeat sender ID from leaking into the webchat session dropdown label, plus the named constant replacing the magic string you flagged in review. happy to rebase.

(#66225 skip - @steipete pinged Apr 29, 5 days ago - under 7-day threshold)

## rebase candidates for tomorrow morning

- #66225 - 20d, highest drift risk (agents core, active area)
- #66544 - 20d, check for conflicts in webchat session label path
- #68446 - 16d, spot-check `inbound-policy.ts` for upstream drift

## top priority bug for tomorrow morning autopilot

**#68446 security guard audit** - the Apr 24 commit (`43a11c2`) claims to close the DM-allowFrom group bypass. pull `fix/whatsapp-group-allowfrom-bypass-v2`, read `inbound-policy.ts` and `resolveWhatsAppCommandAuthorized`, and confirm `groupAllowFromFallbackToAllowFrom: false` covers every group command auth path - not just the main entry point. if any fallback path can still reach the DM allowFrom list for group messages, that is a real security hole that needs a targeted fix before this lands.
