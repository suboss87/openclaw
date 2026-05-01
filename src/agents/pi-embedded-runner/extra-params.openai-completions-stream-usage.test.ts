import type { StreamFn } from "@mariozechner/pi-agent-core";
import type { Context, Model, SimpleStreamOptions } from "@mariozechner/pi-ai";
import { describe, expect, it, vi } from "vitest";
import { applyExtraParamsToAgent } from "./extra-params.js";

vi.mock("@mariozechner/pi-ai", () => ({
  streamSimple: vi.fn(() => ({
    push: vi.fn(),
    result: vi.fn(),
  })),
}));

type StreamUsageCase = {
  applyProvider: string;
  applyModelId: string;
  model: Model<"openai-completions"> | Model<"openai-responses"> | Model<"anthropic-messages">;
  initialPayload?: Record<string, unknown>;
};

function runStreamUsageCase(params: StreamUsageCase) {
  const payload: Record<string, unknown> = {
    model: params.model.id,
    messages: [],
    ...params.initialPayload,
  };
  const baseStreamFn: StreamFn = (model, _context, options) => {
    options?.onPayload?.(payload, model);
    return {} as ReturnType<StreamFn>;
  };
  const agent = { streamFn: baseStreamFn };

  applyExtraParamsToAgent(agent, undefined, params.applyProvider, params.applyModelId);

  const context: Context = { messages: [] };
  void agent.streamFn?.(
    params.model as Model<"openai-completions">,
    context,
    {} as SimpleStreamOptions,
  );

  return payload;
}

describe("extra-params: openai-completions stream usage injection", () => {
  it("injects stream_options.include_usage=true when stream=true for openai-completions", () => {
    const payload = runStreamUsageCase({
      applyProvider: "local",
      applyModelId: "llama-3.1",
      model: {
        api: "openai-completions",
        provider: "local",
        id: "llama-3.1",
      } as Model<"openai-completions">,
      initialPayload: { stream: true },
    });

    expect(payload.stream_options).toEqual({ include_usage: true });
  });

  it("does not inject stream_options when stream is false", () => {
    const payload = runStreamUsageCase({
      applyProvider: "local",
      applyModelId: "llama-3.1",
      model: {
        api: "openai-completions",
        provider: "local",
        id: "llama-3.1",
      } as Model<"openai-completions">,
      initialPayload: { stream: false },
    });

    expect(payload).not.toHaveProperty("stream_options");
  });

  it("does not inject stream_options when stream is absent", () => {
    const payload = runStreamUsageCase({
      applyProvider: "local",
      applyModelId: "llama-3.1",
      model: {
        api: "openai-completions",
        provider: "local",
        id: "llama-3.1",
      } as Model<"openai-completions">,
    });

    expect(payload).not.toHaveProperty("stream_options");
  });

  it("does not inject for openai-responses api", () => {
    const payload = runStreamUsageCase({
      applyProvider: "openai",
      applyModelId: "gpt-5",
      model: {
        api: "openai-responses",
        provider: "openai",
        id: "gpt-5",
      } as unknown as Model<"openai-completions">,
      initialPayload: { stream: true },
    });

    expect(payload).not.toHaveProperty("stream_options");
  });

  it("does not inject for anthropic-messages api", () => {
    const payload = runStreamUsageCase({
      applyProvider: "anthropic",
      applyModelId: "claude-opus-4-7",
      model: {
        api: "anthropic-messages",
        provider: "anthropic",
        id: "claude-opus-4-7",
      } as unknown as Model<"openai-completions">,
      initialPayload: { stream: true },
    });

    expect(payload).not.toHaveProperty("stream_options");
  });

  it("merges include_usage into existing stream_options without overwriting other keys", () => {
    const payload = runStreamUsageCase({
      applyProvider: "local",
      applyModelId: "llama-3.1",
      model: {
        api: "openai-completions",
        provider: "local",
        id: "llama-3.1",
      } as Model<"openai-completions">,
      initialPayload: { stream: true, stream_options: { custom_key: "val" } },
    });

    expect(payload.stream_options).toEqual({ custom_key: "val", include_usage: true });
  });

  it("does not overwrite include_usage if already set", () => {
    const payload = runStreamUsageCase({
      applyProvider: "local",
      applyModelId: "llama-3.1",
      model: {
        api: "openai-completions",
        provider: "local",
        id: "llama-3.1",
      } as Model<"openai-completions">,
      initialPayload: { stream: true, stream_options: { include_usage: false } },
    });

    // The wrapper sets include_usage=true even when pre-set to false,
    // since that is intentional behavior to always request usage.
    expect((payload.stream_options as Record<string, unknown>).include_usage).toBe(true);
  });
});
