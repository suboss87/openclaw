# midday check - 2026-05-02

## open PRs

| PR  | title                                                                              | last updated | status             |
| --- | ---------------------------------------------------------------------------------- | ------------ | ------------------ |
| #16 | fix(agents): inject stream_options.include_usage for openai-completions streaming  | 2026-05-01   | review in progress |
| #15 | fix(discord): detect READY when WebSocket opened before lifecycle debug listener   | 2026-04-30   | waiting for review |
| #14 | fix(exec): compute bashElevated in gateway agent path                              | 2026-04-30   | waiting for review |
| #13 | fix(cron): reject invalid cron expressions on disabled jobs before persisting      | 2026-04-30   | waiting for review |
| #12 | fix(gateway): allow Paperclip integration metadata through AgentParams validator   | 2026-04-30   | waiting for review |
| #11 | fix(cron): mirror synthesized text back to session transcript on direct delivery   | 2026-04-30   | waiting for review |
| #9  | fix(exec): pass skill env vars into Docker sandbox container                       | 2026-04-28   | waiting for review |
| #8  | fix(web-fetch): detect response charset from Content-Type and HTML meta            | 2026-04-30   | waiting for review |
| #7  | fix(cron): re-arm timer when onTimer rejects unexpectedly                          | 2026-04-30   | waiting for review |
| #6  | fix(image): surface underlying error when image optimization fails                 | 2026-04-28   | waiting for review |
| #5  | fix(bonjour): also suppress CIAO PROBING CANCELLED in rejection handler            | 2026-04-26   | waiting for review |
| #4  | fix: check exit code in openUrl to avoid false positive on Windows                 | 2026-04-25   | waiting for review |
| #3  | fix(configure): preserve custom primary model when reconfiguring auth              | 2026-04-24   | waiting for review |
| #2  | fix(discord): handle partial GuildThreadChannel in thread slash command parentId   | 2026-04-23   | waiting for review |
| #1  | fix(gateway): clean up MCP child processes after nested lane runs end              | 2026-04-23   | waiting for review |

## actions this run

- PR #16: khaney64 flagged test name "does not overwrite include_usage if already set" was backwards - test asserts the wrapper DOES override it. renamed to khaney64's suggestion "overrides include_usage=false to ensure streaming usage is returned". pushed 1cc0f6b, replied to thread.
- PR #8, #7: devin-ai-integration bot review threads - both resolved/outdated, skipped.
- fork sync: upstream remote blocked by proxy (restricted to suboss87/openclaw only).

## bug hunt

skipped - MCP restricted to suboss87/openclaw; can't query openclaw/openclaw issues. no gh CLI in this environment.

## escalations

- 15 fork PRs waiting on upstream review; user needs to track those in upstream repo directly.
- upstream git proxy still blocked on every run; fork sync is a no-op until proxy allows openclaw/openclaw.
