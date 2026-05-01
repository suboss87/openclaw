# midday check - 2026-05-01

## open PR status (upstream openclaw/openclaw)

| PR     | title                                                                     | comments | last updated         | status                                                 |
| ------ | ------------------------------------------------------------------------- | -------- | -------------------- | ------------------------------------------------------ |
| #73162 | fix(slack): remove socket reconnect attempt cap                           | 7        | 2026-04-30 23:41 UTC | open; PR comment reads blocked by MCP scope            |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 6        | 2026-04-30 18:26 UTC | open; PR comment reads blocked by MCP scope            |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant              | 7        | 2026-04-30 20:36 UTC | open; PR comment reads blocked by MCP scope            |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 5        | 2026-04-25           | open, no new activity since last check                 |

all 4 PRs updated at least once in the last 48h but PR comments on openclaw/openclaw
remain unreadable - MCP tools restricted to suboss87/openclaw. manual review needed.

## fork PRs (suboss87/openclaw) awaiting upstream submission

16 open fork PRs, none merged. most recent that need upstream PRs opened by hand:

- fork PR #16 - fix/75357-openai-completions-stream-usage (closes #75357, filed today)
- fork PR #15 - fix/74617-discord-gateway-ready-race
- fork PR #14 - fix/74646-elevated-exec-followup-missing-bash-elevated
- fork PR #13 - fix/74459-cron-edit-invalid-cron-expr
- fork PR #12 - fix/74635-agent-params-paperclip

user must open the upstream PR from each fork branch at:
https://github.com/suboss87/openclaw/compare/main...<branch-name>
then retarget base to openclaw/openclaw:main.

## actions this run

- fork sync: upstream proxy still blocked; origin/main already at HEAD (local main
  is ahead of origin/main with task commits, upstream unreachable)
- PR feedback: upstream PR comment threads unreadable (MCP restricted); comment
  counts on #73162 (+2), #68446 (+1), #66225 (same) changed since yesterday - human
  eyeball recommended
- bug hunt: 19 fresh bugs filed today (2026-05-01) reviewed
  - #75491 (dreaming block duplication, regex g flag missing) - PR #75495 already up
    by ottodeng, clean fix
  - #75362 (openai MCP tool schema properties:undefined) - PR #75401 up by SymbolStar
  - #75433 (SecretRef crash in embedded reply) - PR #75445 up by lonexreb
  - #75394 (WhatsApp QR missing qrcode package) - PR #75425 up by lonexreb
  - #75358 (PDF canvas fallback) - PR #75370 up by mgustimz
  - #75405 (Telegram group slash commands silently dropped in non-main bindings,
    0 competing PRs) - disqualified: regression is v2026.4.27; local repo is v2026.3.12,
    code structure has drifted - any fix would be based on wrong version
  - #75357 (openai-completions zero token usage) - fixed by morning session (fork PR
    #16); skipped to avoid duplicate
  - remaining 12 issues: vague repro, deployment-specific, or version-mismatch
- no new fix opened this run

## escalations

- all 4 upstream PRs need human comment-thread review (MCP scope blocks this session)
- 16 fork PRs waiting; user must open upstream PRs manually from fork branches
- #75405 (Telegram group slash commands in non-main bindings, 2026.4.27 regression)
  remains uncontested - genuine bug worth picking up once local repo syncs to current
  upstream
- upstream git access via proxy still blocked on every run; fork sync step is a no-op
  until proxy allows openclaw/openclaw
