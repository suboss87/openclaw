# Midday Check - 2026-05-08

## Open PR status (suboss87/openclaw)

4 PRs open, all from January–March 2026. No human reviewer activity in last 6 hours.

| PR | title | last human activity |
|----|-------|---------------------|
| #73162 | fix(slack): cap reconnect attempts with backoff | none |
| #68446 | fix(whatsapp): enforce allowFrom per-contact | none |
| #66544 | fix(heartbeat): include session label in log | none |
| #66225 | fix(config): accept final tag with trailing content | none |

## Actions this run

- git identity verified: suboss87@gmail.com / Subash
- upstream sync skipped: git fetch upstream blocked by proxy 502; MCP scoped to fork only
- checked all 4 open PRs for fresh human feedback - none found
- hunted fresh regression/crash-class bugs on openclaw/openclaw (via public API):
  - #78881 (node.list TypeError) → competing PR #78980 already open
  - #79209 (hardlink nlink>1 crash) → competing PR #79215 already open
  - #79264 (update-sentinel sync race) → competing PR #79276 already open
  - #78858 (doctor --fix removes whole agent blocks): partial root cause found -
    `description` field missing from `AgentEntrySchema` in
    `src/config/zod-schema.agent-runtime.ts`; full-agent removal still unexplained,
    not confident enough to open a PR
  - #79254 (Telegram requireMention ignored after 2026.5.6): traced to
    `activationOverride` from session store overriding config in
    `extensions/telegram/src/bot-message-context.ts:430`; no clean <30-line fix,
    no competing PR, but root cause needs more verification before opening

## Escalations

- no clean fresh bug found today meeting all criteria (regression/crash, <30 lines,
  zero competing PR, verified root cause)
- #78858 worth revisiting: add `description: z.string().optional()` to AgentEntrySchema
  and AgentConfig if a test can reproduce full-agent doctor-strip from description-only config
- #79254 worth revisiting: confirm whether session store `groupActivation=mention` is
  persisted from a prior /activate call and why 2026.5.6 changed the behavior
