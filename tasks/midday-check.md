# midday check - 2026-05-04

## open PR state (last known from morning context)

| # | title | status |
|---|-------|--------|
| [#73162](https://github.com/openclaw/openclaw/pull/73162) | fix(slack): remove socket reconnect cap | open, martingarramon LGTM, changelog added |
| [#68446](https://github.com/openclaw/openclaw/pull/68446) | fix(whatsapp): DM allowFrom group bypass | open, CI green, no review |
| [#66544](https://github.com/openclaw/openclaw/pull/66544) | fix(gateway): exclude heartbeat session label | open, CI green, no review |
| [#66225](https://github.com/openclaw/openclaw/pull/66225) | fix(agents): final tag regex self-closing | open, unclear CI |
| [suboss87#17](https://github.com/suboss87/openclaw/pull/17) | fix(mcp): full data in conversations_list/messages_read | fork-internal, no comments, pending upstream PR |

## actions this run

- git identity set and verified (suboss87@gmail.com)
- fixed suboss87/openclaw#17 PR body - removed claude.ai URL and session reference that violated hard rules
- upstream sync blocked: `openclaw/openclaw` returns 502 through local git proxy

## blockers

- gh CLI not installed - can't query upstream PRs/issues via CLI
- MCP tools restricted to suboss87/openclaw - can't read comments on upstream #73162, #66544, #66225, #68446
- upstream remote returns 502 - can't rebase branches or create upstream PR for suboss87#17
- bug hunt skipped - upstream issue tracker unreachable via available tooling

## escalations

- suboss87/openclaw#17 needs a corresponding PR against openclaw/openclaw - requires a session where gh CLI or upstream API access is available
- manual comments still needed on #68446 (vincentkoc) and #66544 (jacobtomlinson) per evening-report notes
