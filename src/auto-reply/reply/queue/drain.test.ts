import { afterEach, describe, expect, it, vi } from "vitest";
import {
  ReplyRunAlreadyActiveError,
  __testing as registryTesting,
  createReplyOperation,
} from "../reply-run-registry.js";
import { scheduleFollowupDrain } from "./drain.js";
import { clearFollowupQueue, getFollowupQueue } from "./state.js";
import type { FollowupRun } from "./types.js";

const QUEUE_KEY = "agent:main:dm:drain-retry-test";

afterEach(() => {
  clearFollowupQueue(QUEUE_KEY);
  registryTesting.resetReplyRunRegistry();
  vi.restoreAllMocks();
  delete process.env.OPENCLAW_TEST_FAST;
});

function makeFollowupRun(prompt = "hello"): FollowupRun {
  return {
    prompt,
    enqueuedAt: Date.now(),
    run: {
      agentId: "main",
      agentDir: "/tmp/agent",
      sessionId: "session-drain-test",
      sessionKey: QUEUE_KEY,
      sessionFile: "/tmp/session.jsonl",
      workspaceDir: "/tmp/workspace",
      config: {} as FollowupRun["run"]["config"],
      provider: "anthropic",
      model: "claude-sonnet-4-6",
      authProfileId: "profile-a",
      authProfileIdSource: "user",
      timeoutMs: 30_000,
      blockReplyBreak: "message_end",
    },
  };
}

describe("scheduleFollowupDrain retry on ReplyRunAlreadyActiveError", () => {
  it("retries the queued item after guard clears instead of logging drain failure", async () => {
    process.env.OPENCLAW_TEST_FAST = "1";

    const queue = getFollowupQueue(QUEUE_KEY, { mode: "queue", debounceMs: 0 });
    queue.items.push(makeFollowupRun("first"));

    let callCount = 0;
    let resolveBlocker!: () => void;
    const blockerDone = new Promise<void>((res) => {
      resolveBlocker = res;
    });

    // Create a real operation that blocks the guard.
    const blockingOp = createReplyOperation({
      sessionKey: QUEUE_KEY,
      sessionId: "session-blocking",
      resetTriggered: false,
    });

    const runFollowup = vi.fn(async (_run: FollowupRun) => {
      callCount += 1;
      if (callCount === 1) {
        throw new ReplyRunAlreadyActiveError(QUEUE_KEY);
      }
    });

    // Release the blocking operation asynchronously after a tick.
    void Promise.resolve().then(() => {
      blockingOp.complete();
      resolveBlocker();
    });

    scheduleFollowupDrain(QUEUE_KEY, runFollowup);

    // Wait for the blocker to release and drain to finish.
    await blockerDone;
    // Give the drain loop time to complete after the idle wait resolves.
    await new Promise<void>((res) => setTimeout(res, 50));

    expect(runFollowup).toHaveBeenCalledTimes(2);
    expect(queue.items).toHaveLength(0);
  });

  it("does not log drain failure when ReplyRunAlreadyActiveError is retried successfully", async () => {
    process.env.OPENCLAW_TEST_FAST = "1";

    const errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const queue = getFollowupQueue(QUEUE_KEY, { mode: "queue", debounceMs: 0 });
    queue.items.push(makeFollowupRun("second"));

    const blockingOp = createReplyOperation({
      sessionKey: QUEUE_KEY,
      sessionId: "session-blocking-2",
      resetTriggered: false,
    });

    let callCount = 0;
    const runFollowup = vi.fn(async (_run: FollowupRun) => {
      callCount += 1;
      if (callCount === 1) {
        throw new ReplyRunAlreadyActiveError(QUEUE_KEY);
      }
    });

    void Promise.resolve().then(() => blockingOp.complete());

    scheduleFollowupDrain(QUEUE_KEY, runFollowup);

    await new Promise<void>((res) => setTimeout(res, 80));

    expect(runFollowup).toHaveBeenCalledTimes(2);
    // The "drain failed" error path should not have been reached.
    const drainFailureCalls = errorSpy.mock.calls.filter(
      ([msg]) => typeof msg === "string" && msg.includes("followup queue drain failed"),
    );
    expect(drainFailureCalls).toHaveLength(0);
  });
});
