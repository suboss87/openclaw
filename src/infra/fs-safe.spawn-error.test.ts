import { afterEach, describe, expect, it, vi } from "vitest";
import { createTrackedTempDirs } from "../test-utils/tracked-temp-dirs.js";

const spawnEnoentError = Object.assign(new Error("spawn python3 ENOENT"), {
  code: "ENOENT",
  syscall: "spawn python3",
  path: "python3",
});

vi.mock("./fs-pinned-write-helper.js", () => ({
  runPinnedWriteHelper: vi.fn().mockRejectedValue(spawnEnoentError),
}));

const { writeFileWithinRoot } = await import("./fs-safe.js");

const tempDirs = createTrackedTempDirs();

afterEach(async () => {
  await tempDirs.cleanup();
});

describe("writeFileWithinRoot spawn-error surface", () => {
  it.runIf(process.platform !== "win32")(
    "surfaces helper command name instead of 'path is not a regular file under root' when spawn fails",
    async () => {
      const root = await tempDirs.make("openclaw-spawn-error-");
      await expect(
        writeFileWithinRoot({ rootDir: root, relativePath: "test.txt", data: "hello" }),
      ).rejects.toMatchObject({
        message: expect.stringContaining("python3"),
        code: "invalid-path",
      });
    },
  );

  it.runIf(process.platform !== "win32")(
    "includes 'not found in PATH' in the error message",
    async () => {
      const root = await tempDirs.make("openclaw-spawn-error-");
      await expect(
        writeFileWithinRoot({ rootDir: root, relativePath: "test.txt", data: "hello" }),
      ).rejects.toMatchObject({
        message: expect.stringContaining("not found in PATH"),
      });
    },
  );
});
