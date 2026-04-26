import { describe, expect, it, vi } from "vitest";

const logDebugMock = vi.fn();
vi.mock("../logger.js", () => ({ logDebug: logDebugMock }));

const { ignoreCiaoCancellationRejection } = await import("./bonjour-ciao.js");

describe("ignoreCiaoCancellationRejection", () => {
  it("suppresses CIAO ANNOUNCEMENT CANCELLED", () => {
    expect(ignoreCiaoCancellationRejection(new Error("CIAO ANNOUNCEMENT CANCELLED"))).toBe(true);
  });

  it("suppresses CIAO PROBING CANCELLED", () => {
    expect(ignoreCiaoCancellationRejection(new Error("CIAO PROBING CANCELLED"))).toBe(true);
  });

  it("suppresses lowercase ciao announcement cancelled", () => {
    expect(ignoreCiaoCancellationRejection(new Error("ciao announcement cancelled"))).toBe(true);
  });

  it("suppresses lowercase ciao probing cancelled", () => {
    expect(ignoreCiaoCancellationRejection(new Error("ciao probing cancelled"))).toBe(true);
  });

  it("does not suppress unrelated errors", () => {
    expect(ignoreCiaoCancellationRejection(new Error("connection refused"))).toBe(false);
  });

  it("does not suppress Error: prefix variants of unrelated errors", () => {
    expect(ignoreCiaoCancellationRejection(new Error("ECONNRESET"))).toBe(false);
  });

  it("does not suppress string rejections that are unrelated", () => {
    expect(ignoreCiaoCancellationRejection("something went wrong")).toBe(false);
  });

  it("logs a debug message when suppressing", () => {
    logDebugMock.mockClear();
    ignoreCiaoCancellationRejection(new Error("CIAO PROBING CANCELLED"));
    expect(logDebugMock).toHaveBeenCalledTimes(1);
    expect(logDebugMock.mock.calls[0]?.[0]).toContain("bonjour: ignoring unhandled ciao rejection");
  });

  it("does not log when not suppressing", () => {
    logDebugMock.mockClear();
    ignoreCiaoCancellationRejection(new Error("unrelated error"));
    expect(logDebugMock).not.toHaveBeenCalled();
  });
});
