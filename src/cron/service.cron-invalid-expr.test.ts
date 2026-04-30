/**
 * Regression tests for invalid cron expression persistence on disabled jobs.
 *
 * Bug: `cron edit <id> --cron "invalid"` on a disabled job silently persisted
 * the invalid expression because ops.update only called computeJobNextRunAtMs
 * for enabled jobs. A subsequent `cron edit --enable` then threw AFTER
 * applyJobPatch already set job.enabled=true in memory, leaving the in-memory
 * state corrupted (enabled=true) while the disk state was never updated.
 *
 * Fix: validateCronScheduleExpr() is called in ops.update before applyJobPatch
 * so invalid expressions are rejected without touching in-memory or on-disk state.
 */

import { describe, expect, it } from "vitest";
import {
  makeStorePath,
  setupCronIssueRegressionFixtures,
  startCronForStore,
} from "./service.issue-regressions.test-helpers.js";

describe("cron update — invalid cron expression rejected", () => {
  setupCronIssueRegressionFixtures();

  it("rejects invalid cron expression on a disabled job before mutating in-memory state", async () => {
    const store = makeStorePath();
    const cron = await startCronForStore({
      storePath: store.storePath,
      cronEnabled: false,
    });

    try {
      const job = await cron.add({
        name: "probe",
        enabled: false,
        schedule: { kind: "cron", expr: "0 * * * *" },
        sessionTarget: "main",
        wakeMode: "next-heartbeat",
        payload: { kind: "systemEvent", text: "tick" },
      });

      expect(job.enabled).toBe(false);

      // Attempting to set an invalid cron expression must be rejected.
      await expect(
        cron.update(job.id, {
          schedule: { kind: "cron", expr: "invalid expression that should fail" },
        }),
      ).rejects.toThrow(/invalid cron expression/i);

      // The job's schedule and enabled state must be unchanged after the failed update.
      const jobs = await cron.list({ includeDisabled: true });
      const reloaded = jobs.find((j) => j.id === job.id);
      expect(reloaded).toBeDefined();
      expect(reloaded?.schedule).toEqual(job.schedule);
      expect(reloaded?.enabled).toBe(false);
    } finally {
      cron.stop();
    }
  });

  it("rejects invalid cron expression when trying to enable a job with the bad schedule", async () => {
    const store = makeStorePath();
    const cron = await startCronForStore({
      storePath: store.storePath,
      cronEnabled: false,
    });

    try {
      const job = await cron.add({
        name: "probe2",
        enabled: false,
        schedule: { kind: "cron", expr: "0 * * * *" },
        sessionTarget: "main",
        wakeMode: "next-heartbeat",
        payload: { kind: "systemEvent", text: "tick" },
      });

      // The guard prevents persisting an invalid expression at all, so the
      // "enable with corrupt expr" path is now impossible via cron.update.
      // Verify the rejection before any expression mutation:
      await expect(
        cron.update(job.id, {
          schedule: { kind: "cron", expr: "not valid *** *** ***" },
        }),
      ).rejects.toThrow(/invalid cron expression/i);

      // Job must still be disabled with the original valid schedule.
      const jobs = await cron.list({ includeDisabled: true });
      const reloaded = jobs.find((j) => j.id === job.id);
      expect(reloaded?.enabled).toBe(false);
      if (reloaded?.schedule.kind === "cron") {
        expect(reloaded.schedule.expr).toBe("0 * * * *");
      } else {
        throw new Error("unexpected schedule kind after failed update");
      }
    } finally {
      cron.stop();
    }
  });

  it("accepts valid cron expression change on a disabled job", async () => {
    const store = makeStorePath();
    const cron = await startCronForStore({
      storePath: store.storePath,
      cronEnabled: false,
    });

    try {
      const job = await cron.add({
        name: "probe3",
        enabled: false,
        schedule: { kind: "cron", expr: "0 * * * *" },
        sessionTarget: "main",
        wakeMode: "next-heartbeat",
        payload: { kind: "systemEvent", text: "tick" },
      });

      // Updating a disabled job to a different valid expression must succeed.
      const updated = await cron.update(job.id, {
        schedule: { kind: "cron", expr: "30 6 * * *" },
      });

      expect(updated.enabled).toBe(false);
      if (updated.schedule.kind === "cron") {
        expect(updated.schedule.expr).toBe("30 6 * * *");
      } else {
        throw new Error("unexpected schedule kind after update");
      }
    } finally {
      cron.stop();
    }
  });
});
