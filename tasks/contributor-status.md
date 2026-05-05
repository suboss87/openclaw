# Contributor Status - suboss87

**Run date:** 2026-05-05
**Goal:** top 30 contributors on openclaw/openclaw (threshold: 46 merged commits)

## Commit Count

- Merged PRs confirmed: 5
- Estimated merged commits: ~5
- Gap to 46: ~41 remaining

## Merged PRs

| PR | Merged | Title |
|----|--------|-------|
| #45911 | 2026-03-29 | fix(telegram): accept approval callbacks from forwarding target recipients |
| #55787 | 2026-04-19 | fix: strip orphaned OpenAI reasoning blocks before responses API call |
| #64735 | 2026-04-14 | fix(hooks): pass workspaceDir in gateway session reset internal hook context |
| #67457 | 2026-04-16 | fix(ollama): strip provider prefix from model ID in chat requests |
| #70413 | 2026-04-23 | fix(agents): route /btw through provider stream fn for correct URLs |

## Open PRs (suboss87/openclaw fork staging)

| PR | Branch | Title | Status |
|----|--------|-------|--------|
| #18 | fix/plugins-chat-toggle-skip-channel-config | fix(plugins): skip channel config update when toggling plugins via chat commands | open, new this run |
| #17 | fix/mcp-channel-tools-content-data | fix(mcp): include full data in conversations_list and messages_read content field | open |
| #16 | fix/75357-openai-completions-stream-usage | fix(agents): inject stream_options.include_usage for openai-completions streaming | open, human review addressed |
| #15 | fix/74617-discord-gateway-ready-race | fix(discord): detect READY when WebSocket opened before lifecycle debug listener registered | open |
| #14 | fix/74646-elevated-exec-followup | fix(exec): compute bashElevated in gateway agent path | open |
| #13 | fix/74459-cron-edit-invalid-cron-expr | fix(cron): reject invalid cron expressions on disabled jobs | open |
| #12 | fix/74635-agent-params-paperclip | fix(gateway): allow Paperclip integration metadata through AgentParams validator | open |
| #11 | fix/74743-cron-mirror-session-transcript | fix(cron): mirror synthesized text back to session transcript on direct delivery | open |
| #9 | fix/sandbox-exec-inherit-skill-env | fix(exec): pass skill env vars into Docker sandbox container | open |
| #8 | fix/web-fetch-charset-detection | fix(web-fetch): detect response charset from Content-Type and HTML meta | open |
| #7 | fix/cron-timer-rearm-on-catch | fix(cron): re-arm timer when onTimer rejects unexpectedly | open |
| #6 | fix/image-optimize-surface-underlying-error | fix(image): surface underlying error when image optimization fails | open |
| #5 | fix/bonjour-ciao-probing-cancelled | fix(bonjour): also suppress CIAO PROBING CANCELLED in rejection handler | open |
| #4 | fix/windows-openurl-exit-code | fix: check exit code in openUrl to avoid false positive on Windows | open |
| #3 | fix/configure-preserves-custom-primary-model | fix(configure): preserve custom primary model when reconfiguring auth | open |
| #2 | fix/discord-thread-slash-command-partial-channel | fix(discord): handle partial GuildThreadChannel in thread slash command parentId access | open |
| #1 | fix/mcp-nested-run-cleanup | fix(gateway): clean up MCP child processes after nested lane runs end | open |

## This Run (2026-05-05)

### New work
- Branch `fix/plugins-chat-toggle-skip-channel-config` pushed to origin (suboss87/openclaw)
- PR #18 created in fork
- Fix: `/plugins enable` and `/plugins disable` chat commands now pass `{ updateChannelConfig: false }` to `setPluginEnabledInConfig`, same as the CLI fix in upstream #76525
- Root cause: CLI was fixed but auto-reply handler was missed; toggling a channel plugin via chat created an empty channel config section that failed required-field validation during lifecycle probes
- Regression test added asserting the fourth argument is `{ updateChannelConfig: false }`

### Blockers
- MCP session restricted to suboss87/openclaw only - cannot create PRs against openclaw/openclaw
- git fetch upstream fails with 502 (proxy restriction) - branching from last known real upstream commit
- All 17 fork PRs are staged and ready but need upstream submission

## Next Run Priorities

1. Check comments on fork PRs, especially #16 (human reviewer khaney64 was active)
2. Scan for new uncontested bugs
3. Attempt upstream PR submission if proxy allows
