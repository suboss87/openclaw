# midday check - 2026-04-26

## fork PR state (live)

| # | title | base age | CI | notes |
|---|-------|----------|----|-------|
| #5 | fix(bonjour): suppress CIAO PROBING CANCELLED | 0d (fresh) | queued | opened overnight |
| #4 | fix: check exit code in openUrl (Windows) | 1d | all skipped (no fork secrets) | clean |
| #3 | fix(configure): preserve custom primary model | 2d | all skipped | clean |
| #2 | fix(discord): handle partial GuildThreadChannel | 3d | all skipped | needs upstream PR |
| #1 | fix(gateway): clean up MCP child processes | 3d | stale base | needs rebase before ping |

no human review comments retrieved this run - MCP read/write restricted to suboss87/openclaw only.

## upstream PR state (from yesterday's snapshot)

| # | title | age | status |
|---|-------|-----|--------|
| #71636 | fix(config): make ModelProviderSchema.models optional | 2d | awaiting review |
| #71633 | fix(bonjour): suppress Windows arp-poll console flash | 2d | awaiting review |
| #68446 | fix(whatsapp): stop DM allowFrom fallback group policy bypass | 9d | awaiting review |
| #66544 | fix(gateway): exclude heartbeat sender from session display name | 13d | awaiting review |
| #66225 | fix(agents): align final tag regexes for self-closing final | 13d | awaiting review |

cannot fetch live upstream state - MCP tools restricted to fork, upstream git remote returns 502.

## bug hunt

skipped - upstream git remote unreachable (502 from local proxy), MCP tools restricted to
suboss87/openclaw, gh CLI not installed. no way to query openclaw/openclaw issues this run.

## actions this run

- confirmed all 5 fork PRs still open, no new comments
- PR #5 CI queued (normal for a PR opened <1hr before this run)
- PR #1 still on stale base - morning run should rebase before pinging maintainers
- no fresh upstream issues reachable - bug hunt skipped

## escalations

- PR #1 is 3 days old, stale base, CI red - needs rebase + maintainer ping at next run
- PR #66544 + #66225 are 13 days old with no review - consider pinging @steipete or @jacobtomlinson
- persistent tool constraint: upstream git + MCP write access needed for full workflow
