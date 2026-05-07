# Midday Check - 2026-05-07

## Open PR status (suboss87/openclaw)

20 PRs open, all from April 23 - May 6. No human reviewers have left unresolved
comments in the last 6 hours. Bot-only reviews (Devin) on PRs 16-20; khaney64's
comment on PR #16 (test name suggestion) was already addressed in commit 1cc0f6b
on 2026-05-02.

| # | title | last human activity |
|---|-------|---------------------|
| 20 | fix(tlon): prevent duplicate group-join pokes | none |
| 19 | fix(discord): clear stale isConnecting state | none |
| 18 | fix(plugins): skip channel config update on plugin toggle | none |
| 17 | fix(mcp): include full data in conversations_list | none |
| 16 | fix(agents): inject stream_options.include_usage | khaney64 addressed 2026-05-02 |

## Actions this run

- git identity verified: suboss87@gmail.com
- upstream remote not reachable via proxy (only suboss87/openclaw accessible)
- local main reset to origin/main tip (661fbdb)
- checked PRs 16-20 for human feedback - none pending
- no fresh bugs hunted: upstream issue list (openclaw/openclaw) not accessible
  via MCP (restricted to suboss87/openclaw) and git fetch upstream fails

## Escalations

- upstream/openclaw git remote and MCP access are both blocked in this env
- can't verify competing PRs against upstream, so bug-hunt step skipped per
  workflow rules (need to confirm no competing PR before opening one)
- to unblock: grant MCP access to openclaw/openclaw or configure upstream remote
