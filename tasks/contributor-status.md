# Contributor Status - suboss87

Updated: 2026-05-08

## Goal

Reach top-30 contributor on openclaw/openclaw. Threshold: 46 merged commits.
Gap: approximately 42 more merged commits needed.

## Hard Blocker (Persistent)

PR creation to openclaw/openclaw is not possible from this automated session.
MCP tools are restricted to suboss87/openclaw only, no gh CLI, no GitHub token.
All PRs must be opened manually via the GitHub web UI by suboss87.

## Open PRs on upstream (openclaw/openclaw)

| #     | Title                                                         | Last Updated | Status |
| ----- | ------------------------------------------------------------- | ------------ | ------ |
| 73162 | fix(slack): remove socket reconnect attempt cap               | 2026-05-03   | open   |
| 68446 | fix(whatsapp): stop DM allowFrom fallback into group bypass   | 2026-05-01   | open   |
| 66544 | fix(gateway): exclude heartbeat sender from session display   | 2026-05-03   | open   |
| 66225 | fix(agents): align final tag regexes for self-closing variant | 2026-05-01   | open   |

No new human comments on any PR in the last 24h. No rebases needed (no CONFLICTING state confirmed).

## Ready Branch (Needs Manual PR)

Branch: `suboss87:fix/doctor-fix-preserves-unknown-config-keys`

Open PR at: https://github.com/suboss87/openclaw/compare/fix/doctor-fix-preserves-unknown-config-keys

Bug fixed: `doctor --fix` silently stripped any config key not in the Zod schema

- affected: `mcp` server definitions, top-level `defaultModel`, per-agent `description`
- root cause: `applyUnknownConfigKeyStep` set `cfg = protectedAuth.config` (stripped) in repair mode
- fix: in repair mode, apply auth profile repairs to the original `cfg` (unknown keys preserved);
  only set `pendingChanges=true` when auth repairs actually happened
- test: added regression test for mcp/defaultModel/description preservation; 188 doctor tests pass

Fixes upstream issue #78858.

## Previous Ready Branch (Still Needs PR)

Branch: `suboss87:fix/tlon-group-join-race`
Open PR at: https://github.com/suboss87/openclaw/compare/fix/tlon-group-join-race

## Actions This Run (2026-05-08)

1. Set git identity to suboss87@gmail.com / Subash.
2. Upstream remote not accessible via proxy; used fork origin for git ops.
3. Found 4 open PRs on upstream; no new human comments in last 24h.
4. Scanned 20 recent bug issues; selected #78858 (doctor --fix data loss, unclaimed).
5. Traced `applyUnknownConfigKeyStep` in `src/commands/doctor/shared/config-flow-steps.ts`.
6. Fixed: repair mode now preserves unknown keys; auth repairs still apply to original cfg.
7. Added regression test; ran 188 doctor tests - all pass.
8. Committed `0da2f5e2` on branch `fix/doctor-fix-preserves-unknown-config-keys`, pushed to fork.
9. PR creation to upstream blocked - manual open required.
