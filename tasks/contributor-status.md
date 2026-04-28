# OpenClaw Contributor Status - 2026-04-28

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

## Actions Taken This Run (2026-04-28)

### New fix: image optimization surfaces underlying error (closes #73148)

Bug: `optimizeImageToJpeg` in `src/web/media.ts` and `optimizeImageToPng` in
`src/media/image-ops.ts` silently swallowed all resize errors via empty `catch {}`
blocks and threw a generic `"Failed to optimize image"` string. When `sharp` is
missing (common on Linux global installs / slim Docker), users got no diagnostic.
Fix: capture `lastResizeErr` in both loops; include its `.message` and set `.cause`
on the final throw. Added 3 regression tests in `src/web/media.test.ts`; all 27
tests pass.
Branch: `fix/image-optimize-surface-underlying-error` pushed to fork.
Fork PR: https://github.com/suboss87/openclaw/pull/6 (needs upstream PR to openclaw/openclaw)

## Actions Taken This Run (2026-04-28, continued)

### New fix: cron timer re-arms after unexpected onTimer rejection (closes #73166)

Bug: `armTimer` wrapped `onTimer(state)` in `void onTimer(state)` with no `.catch()`.
When `onTimer` rejected unexpectedly (e.g., an error thrown inside its `finally` block's
`armTimer` call), the rejection was silently dropped and `state.timer` remained `null`,
permanently stopping the cron scheduler.
Fix: added `.catch((err) => { log.error(...); armTimer(state); })` so unexpected rejections
are logged and the timer chain is re-armed. Added regression test in
`src/cron/service.armtimer-tight-loop.test.ts` ("re-arms the timer via .catch() when
onTimer rejects unexpectedly").
Branch: `fix/cron-timer-rearm-on-catch` pushed to fork.
Fork PR: https://github.com/suboss87/openclaw/pull/7

### New fix: web_fetch decodes non-UTF-8 response bodies as mojibake (closes #72916)

Bug: `readResponseText()` in `src/agents/tools/web-shared.ts` used `new TextDecoder()`
(UTF-8) in the streaming path and `res.text()` (also UTF-8 per WHATWG spec) in the
non-streaming fallback. Pages with legacy charsets (Shift_JIS, Big5, GBK, ISO-8859-1)
were decoded as mojibake.
Fix: collect raw bytes before decoding; resolve charset from Content-Type `charset=`
parameter; if absent and HTML, scan first 4 KB for `<meta charset>` or http-equiv
declaration; decode with `TextDecoder(detectedCharset)`. Added 7 regression tests in
`src/agents/tools/web-shared.charset.test.ts`.
Branch: `fix/web-fetch-charset-detection` pushed to fork.
Fork PR: https://github.com/suboss87/openclaw/pull/8

### New fix: sandbox exec does not inherit skill env vars (closes #31583)

Bug: `buildSandboxEnv` in `src/agents/bash-tools.shared.ts` built the Docker container
env from only `DEFAULT_PATH`, `sandbox.env`, and agent-provided `params.env`. Skill env
vars injected into `process.env` by `applySkillEnvOverrides` (e.g., `OPENAI_API_KEY` set
via `skills.entries.*.env`) were invisible to the container subprocess. Gateway/node hosts
worked correctly because they read `process.env` via `coerceEnv`; only Docker sandbox was
affected.
Fix: added `skillEnv` param to `buildSandboxEnv`; in `createExecTool`, collect active
skill env keys via `getActiveSkillEnvKeys()` and pass their `process.env` values at lower
priority than `sandboxEnv`/`paramsEnv`. Added 5 regression tests in
`src/agents/bash-tools.build-sandbox-env.test.ts`.
Branch: `fix/sandbox-exec-inherit-skill-env` pushed to fork.

## Pending upstream PR opens (branches on fork)

- `fix/sandbox-exec-inherit-skill-env` - closes #31583 (skill env vars missing from sandbox)
- `fix/web-fetch-charset-detection` - closes #72916 (mojibake for non-UTF-8 pages)
- `fix/cron-timer-rearm-on-catch` - closes #73166 (scheduler stops permanently on unexpected rejection)
- `fix/image-optimize-surface-underlying-error` - closes #73148 (opaque error, filed 2026-04-28)
- `fix/bonjour-use-system-hostname` - closes #72355 (crash loop, filed 2026-04-26)
- `fix/fs-safe-surface-spawn-enoent` - closes #72362 (misleading Docker error, filed 2026-04-26)
- `fix/bonjour-ciao-probing-cancelled` - closes #71869 (crash, filed 2026-04-26)
- `fix/windows-openurl-exit-code` - closes #71098
- `fix/configure-preserves-custom-primary-model` - closes #70696
- `fix/mcp-nested-run-cleanup` - closes #70364
- `fix/discord-thread-slash-command-partial-channel` - closes #70447
