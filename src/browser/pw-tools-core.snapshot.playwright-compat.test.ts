import { describe, expect, it, vi } from "vitest";
import {
  installPwToolsCoreTestHooks,
  setPwToolsCoreCurrentPage,
} from "./pw-tools-core.test-harness.js";

installPwToolsCoreTestHooks();
const mod = await import("./pw-tools-core.snapshot.js");

const AI_SNAPSHOT_TEXT = '- button "Submit" [ref=e1]\n- textbox "Name" [ref=e2]';

function makeLocatorWithAiMode(text = AI_SNAPSHOT_TEXT) {
  return { ariaSnapshot: vi.fn(async () => text) };
}

describe("snapshotAiViaPlaywright - Playwright version compat", () => {
  it("uses _snapshotForAI when available (Playwright < 1.59.1)", async () => {
    const snapshotForAI = vi.fn(async () => ({ full: AI_SNAPSHOT_TEXT }));
    setPwToolsCoreCurrentPage({
      _snapshotForAI: snapshotForAI,
      locator: vi.fn(),
    });

    const result = await mod.snapshotAiViaPlaywright({
      cdpUrl: "http://127.0.0.1:18792",
    });

    expect(snapshotForAI).toHaveBeenCalledOnce();
    expect(result.snapshot).toContain("Submit");
  });

  it("falls back to ariaSnapshot({mode:'ai'}) when _snapshotForAI is absent (Playwright 1.59.1+)", async () => {
    const locatorObj = makeLocatorWithAiMode();
    setPwToolsCoreCurrentPage({
      locator: vi.fn(() => locatorObj),
    });

    const result = await mod.snapshotAiViaPlaywright({
      cdpUrl: "http://127.0.0.1:18792",
    });

    expect(locatorObj.ariaSnapshot).toHaveBeenCalledOnce();
    expect(locatorObj.ariaSnapshot).toHaveBeenCalledWith(expect.objectContaining({ mode: "ai" }));
    expect(result.snapshot).toContain("Submit");
  });

  it("passes timeout through to the public ariaSnapshot fallback", async () => {
    const locatorObj = makeLocatorWithAiMode();
    setPwToolsCoreCurrentPage({ locator: vi.fn(() => locatorObj) });

    await mod.snapshotAiViaPlaywright({
      cdpUrl: "http://127.0.0.1:18792",
      timeoutMs: 8000,
    });

    expect(locatorObj.ariaSnapshot).toHaveBeenCalledWith(
      expect.objectContaining({ timeout: 8000 }),
    );
  });
});

describe("snapshotRoleViaPlaywright refs=aria - Playwright version compat", () => {
  it("uses _snapshotForAI when available (Playwright < 1.59.1)", async () => {
    const snapshotForAI = vi.fn(async () => ({ full: AI_SNAPSHOT_TEXT }));
    setPwToolsCoreCurrentPage({
      _snapshotForAI: snapshotForAI,
      locator: vi.fn(),
    });

    const result = await mod.snapshotRoleViaPlaywright({
      cdpUrl: "http://127.0.0.1:18792",
      refsMode: "aria",
    });

    expect(snapshotForAI).toHaveBeenCalledOnce();
    expect(result.snapshot).toBeTruthy();
  });

  it("falls back to ariaSnapshot({mode:'ai'}) when _snapshotForAI is absent (Playwright 1.59.1+)", async () => {
    const locatorObj = makeLocatorWithAiMode();
    setPwToolsCoreCurrentPage({
      locator: vi.fn(() => locatorObj),
    });

    const result = await mod.snapshotRoleViaPlaywright({
      cdpUrl: "http://127.0.0.1:18792",
      refsMode: "aria",
    });

    expect(locatorObj.ariaSnapshot).toHaveBeenCalledOnce();
    expect(locatorObj.ariaSnapshot).toHaveBeenCalledWith(expect.objectContaining({ mode: "ai" }));
    expect(result.snapshot).toBeTruthy();
  });
});
