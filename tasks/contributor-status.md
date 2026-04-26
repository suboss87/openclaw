# OpenClaw Contributor Status - 2026-04-26

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

## Open Upstream PRs (openclaw/openclaw): 5

| #      | Title                                                                     | Age | Status                                           |
| ------ | ------------------------------------------------------------------------- | --- | ------------------------------------------------ |
| #71636 | fix(config): make ModelProviderSchema.models optional                     | 1d  | Awaiting review                                  |
| #71633 | fix(bonjour): suppress Windows arp-poll console flash                     | 1d  | Awaiting review (pnpm patch - may need approval) |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 8d  | Awaiting review                                  |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 12d | Awaiting review                                  |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 12d | Awaiting review                                  |

## Actions Taken This Run (2026-04-26)

### New fix: bonjour CIAO PROBING CANCELLED crash (closes #71869)

Filed today (2026-04-26). Gateway crashes on startup with unhandled rejection for CIAO PROBING
CANCELLED. Root cause: `ignoreCiaoCancellationRejection` in `src/infra/bonjour-ciao.ts` only
matched `CIAO ANNOUNCEMENT CANCELLED`. The ciao library also emits PROBING CANCELLED during the
mDNS probing phase; missing check let it exit the process.

Fix: extend the filter to cover both variants. 9/9 new regression tests pass.
Branch `fix/bonjour-ciao-probing-cancelled` pushed to fork. Upstream PR blocked this session
(MCP restricted to suboss87/openclaw). Needs to be opened via next session or manually.

## Tool constraints (persistent)

MCP tools are restricted to `suboss87/openclaw`. Cannot create PRs or read comments in
`openclaw/openclaw`. `gh` CLI not installed. No direct GitHub API access.

## Pending upstream PR opens

Branches on fork ready for upstream PRs:

- `fix/bonjour-ciao-probing-cancelled` - closes #71869 (crash, filed today - highest priority)
- `fix/windows-openurl-exit-code` - closes #71098
- `fix/configure-preserves-custom-primary-model` - closes #70696
- `fix/mcp-nested-run-cleanup` - closes #70364
- `fix/discord-thread-slash-command-partial-channel` - closes #70447
