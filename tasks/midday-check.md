# midday check - 2026-04-30

## open PR status

| PR     | title                                                                     | comments | last updated         | status                                               |
| ------ | ------------------------------------------------------------------------- | -------- | -------------------- | ---------------------------------------------------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 5        | 2026-04-29 07:15 UTC | open; PR comment reads blocked by MCP scope          |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant              | 7        | 2026-04-29 07:50 UTC | open; PR comment reads blocked by MCP scope          |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 5        | 2026-04-25           | open, no new activity since last check               |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 5        | 2026-04-25           | open, no new activity since last check               |

## actions this run

- fork sync: upstream remote unreachable via proxy; synced to origin/main (50927de)
- PR feedback: MCP scope restricted to suboss87/openclaw; PR comments on
  openclaw/openclaw are not retrievable - manual eyeball needed for #73162 and #66225
- bug hunt: 10 fresh issues from today (2026-04-30) reviewed; none qualified

  breakdown:
  - #74896 (gateway never binds with tools.web.fetch) - clean regression with repro;
    two competing PRs (#74921, #74924) filed within 50 min of the issue
  - #74917 (tool-result guard uses wrong context budget) - clear fix; PR #74934 up
  - #74741 (Signal SSE consumer 10s timeout) - PR #74744 filed same hour
  - #74743 (cron job responses not persisted to dest session) - zero competing PRs;
    skipped - thin evidence (no logs, reporter just says "mine had no memory"), scope
    unclear (likely requires understanding how cron dispatch vs dest session history works)
  - #74903 (Feishu group_topic uses action=send not thread-reply) - zero competing PRs;
    skipped - issue quality too low to confirm root cause: Steps/Expected/Actual are all
    copy-paste of the root cause section; reporter quotes compiled .js filenames that
    don't match current source; the system prompt text they quote doesn't match
    buildGroupChatContext() in groups.ts on current main
  - #74958, #74953, #74879, #74848, #74760 - deployment-specific, vague, or no clear
    code path
- no fix opened this run

## escalations

- #73162 and #66225 still need manual review of comments - MCP access is restricted so
  this session cannot read them
- #74743 (cron dest session persistence) - zero PRs; area to look at is how
  `openclaw cron run` dispatches vs. the channel session that handles subsequent user
  messages - they may be separate session contexts with no shared history write-back
