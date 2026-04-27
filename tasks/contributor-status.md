# OpenClaw Contributor Status - 2026-04-27

## Merged PRs: 5 (gap to 46: ~41)

- 2026-04-23: #70413 fix(agents): route /btw through provider stream fn for correct URLs
- 2026-04-19: #55787 fix: strip orphaned OpenAI reasoning blocks before responses API call
- 2026-04-16: #67457 fix(ollama): strip provider prefix from model ID in chat requests
- 2026-04-14: #64735 fix(hooks): pass workspaceDir in gateway session reset internal hook context
- 2026-03-29: #45911 fix(telegram): accept approval callbacks from forwarding target recipients

Note: #71636 (fix(config): make ModelProviderSchema.models optional) was closed without merging
on 2026-04-26.

## Open Upstream PRs (openclaw/openclaw): 4

| #      | Title                                                                     | Age | Status          |
| ------ | ------------------------------------------------------------------------- | --- | --------------- |
| #71633 | fix(bonjour): suppress Windows arp-poll console flash via windowsHide     | 2d  | Awaiting review |
| #68446 | fix(whatsapp): stop DM allowFrom fallback into group policy sender bypass | 9d  | Awaiting review |
| #66544 | fix(gateway): exclude heartbeat sender ID from session display name       | 13d | Awaiting review |
| #66225 | fix(agents): align final tag regexes to handle self-closing final variant | 13d | Awaiting review |

## Actions Taken This Run (2026-04-27)

### New fix: bonjour uses hardcoded "openclaw" hostname (closes #72355)

Bug: `src/infra/bonjour.ts` fell back to the string `"openclaw"` when neither
`OPENCLAW_MDNS_HOSTNAME` nor `CLAWDBOT_MDNS_HOSTNAME` is set. On any machine whose
hostname is not "openclaw", mDNS probing collides and produces CIAO PROBING CANCELLED
crash loops. Fix: use `os.hostname()` as the fallback, matching the pattern already used
in `widearea-dns.ts`. Updated the test that was asserting the buggy behavior.
Branch: `fix/bonjour-use-system-hostname` pushed to fork. PR creation blocked by MCP
restrictions.

### New fix: fs-safe surfaces spawn ENOENT instead of misleading path error (closes #72362)

Bug: `normalizePinnedWriteError` in `src/infra/fs-safe.ts` wrapped all non-SafeOpenError
failures as "path is not a regular file under root", including spawn ENOENT when python3
is missing from PATH (common in slim Docker images). Users spent hours debugging a path
error that was actually a missing interpreter. Fix: detect `code === ENOENT` + `syscall`
starting with `"spawn "` and surface the actual command name with "not found in PATH".
Added regression test `fs-safe.spawn-error.test.ts` (2/2 pass).
Branch: `fix/fs-safe-surface-spawn-enoent` pushed to fork. PR creation blocked by MCP
restrictions.

## Tool constraints (persistent)

MCP tools are restricted to `suboss87/openclaw`. Cannot create PRs or read PR comments
on `openclaw/openclaw`. `gh` CLI not installed. No direct GitHub API access.
`git fetch upstream` blocked (proxy auth). Must open upstream PRs manually.

## Pending upstream PR opens (branches on fork)

- `fix/bonjour-use-system-hostname` - closes #72355 (crash loop, filed 2026-04-26)
- `fix/fs-safe-surface-spawn-enoent` - closes #72362 (misleading Docker error, filed 2026-04-26)
- `fix/bonjour-ciao-probing-cancelled` - closes #71869 (crash, filed 2026-04-26)
- `fix/windows-openurl-exit-code` - closes #71098
- `fix/configure-preserves-custom-primary-model` - closes #70696
- `fix/mcp-nested-run-cleanup` - closes #70364
- `fix/discord-thread-slash-command-partial-channel` - closes #70447
