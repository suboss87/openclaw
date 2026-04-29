# midday check - 2026-04-29

## open PR status

| PR     | title                                                                      | comments | last updated         | status                                                        |
| ------ | -------------------------------------------------------------------------- | -------- | -------------------- | ------------------------------------------------------------- |
| #73162 | fix(slack): remove socket reconnect attempt cap                            | 5        | 2026-04-29 07:15 UTC | updated today; comments unreadable (MCP scope), needs eyeball |
| #66225 | fix(agents): align final tag regexes for `<final/>` variant               | 7        | 2026-04-29 07:50 UTC | updated today; comments unreadable (MCP scope), needs eyeball |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass  | 5        | 2026-04-25           | open, no new activity                                         |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name        | 5        | 2026-04-25           | open, no new activity                                         |

## actions this run

- fork sync: upstream remote unreachable via proxy; pulled origin/main (was 7 commits
  behind); local main now at 28512771cf
- PR feedback: #73162 and #66225 both had activity today but PR comment reads on
  openclaw/openclaw are blocked by MCP scope restriction - content not retrievable
- bug hunt: 22 fresh issues reviewed from 2026-04-28 to 2026-04-29; every viable
  candidate was claimed within hours of filing. summary:
  - #74066 (cron invalid expr leaks UNAVAILABLE) - 2 competing PRs (#74068, #74193)
  - #74123 (media:// URI invalid path) - PR #74186
  - #73876 (moonshot vs moonshotai provider name) - PR #74162
  - #73956 (control UI duplicate assistant replies) - PR #73962
  - #74032 (/status inconsistent in Telegram topic) - PR #73583
  - #74014 (Telegram HTTP_PROXY ignored) - PR #74151
  - #74019 (lobster llm-task no callable tools) - PR #74139
  - #73875 (ACP sends unsupported config) - PR #74048
  - #73910 (Codex ACP missing auth bridge) - PR #73943
  - #74086 (Telegram Windows regression) - listed in maintainer tracker PR #74163
  - #74138 (feishu createScopedPairingAccess not a function, beta blocker) - zero PRs;
    investigated but root cause requires post-2026.4.22 diffs not in fork; blocked
  - #74212 (openai-codex SSH device code shows placeholder not real code) - zero PRs;
    requires @mariozechner/pi-ai/oauth internals; node_modules not installed; blocked
  - remaining issues: platform-specific (arm64 Discord CPU wedge, Windows/WSL timing
    issues) or too vague to fix without repro
- no fix opened this run

## escalations

- #73162 and #66225 have human activity today but PR comment reads are MCP-blocked;
  these need a manual check for any reviewer questions
- #74138 (feishu beta blocker): zero competing PRs; if someone wants to claim it, the
  error is `createScopedPairingAccess is not a function` in feishu/src/bot.ts at the
  dispatch path - the export is present in current main but was likely dropped or
  re-arranged in the 2026.4.24-4.26 window; checking the built dist/plugin-sdk/feishu.js
  in the 2026.4.26 npm tarball would confirm
- #74212 (codex SSH device code): zero PRs; the fix is in src/commands/oauth-flow.ts or
  openai-codex-oauth.ts - when isRemote=true and the pi-ai device-code onPrompt fires,
  the code should be printed to stdout directly rather than passed as placeholder text
