# Midday Check - 2026-05-06

## PRs checked

Step 1 blocked - MCP access restricted to fork only, cannot read PR comments from upstream openclaw/openclaw.

## Bug fixed

**Issue #77960** - `ReplyRunAlreadyActiveError` fires repeatedly on sequential `chat.send` calls

**Root cause**: `scheduleFollowupDrain` waits 500 ms (`debounceMs`) after the session guard clears before processing queued items. A new `chat.send` arriving in that window occupies the guard first. When the drain calls `effectiveRunFollowup` -> `createReplyOperation`, it throws `ReplyRunAlreadyActiveError`. The outer catch logged the error, reset `lastEnqueuedAt`, and rescheduled, producing an error cycle on every alternating run (16 errors across 10 calls in the reporter's trace).

**Fix**: Added inner try/catch in `scheduleFollowupDrain`'s while loop body (`src/auto-reply/reply/queue/drain.ts`). On `ReplyRunAlreadyActiveError`, calls `replyRunRegistry.waitForIdle(key, 15_000)` then `continue`. `drainNextQueueItem` only shifts after a successful run, so the item stays at `queue.items[0]` and is retried cleanly. Outer catch handles all other errors unchanged.

**Files**: `src/auto-reply/reply/queue/drain.ts`, `src/auto-reply/reply/queue/drain.test.ts` (new, 2 regression cases)

**Tests**: 1,435 auto-reply tests pass.

**Branch**: `suboss87:fix/followup-drain-retry-on-active-guard`
PR target: `https://github.com/openclaw/openclaw/compare/main...suboss87:fix/followup-drain-retry-on-active-guard`
