import { describe, expect, it, vi } from "vitest";
import type { OpenClawConfig } from "../config/config.js";
import type { WizardPrompter } from "../wizard/prompts.js";
import { applyDefaultModelChoice } from "./auth-choice.default-model.js";

function createPrompter(): { prompter: WizardPrompter; noteSpy: ReturnType<typeof vi.fn> } {
  const noteSpy = vi.fn(async () => undefined);
  const prompter = {
    confirm: vi.fn(async () => true),
    note: noteSpy,
    text: vi.fn(async () => ""),
  } as unknown as WizardPrompter;
  return { prompter, noteSpy };
}

function applyDefaultConfigFn(cfg: OpenClawConfig): OpenClawConfig {
  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: {
        ...cfg.agents?.defaults,
        model: { primary: "openrouter/auto" },
      },
    },
  };
}

function applyProviderConfigFn(cfg: OpenClawConfig): OpenClawConfig {
  return {
    ...cfg,
    agents: {
      ...cfg.agents,
      defaults: {
        ...cfg.agents?.defaults,
        models: { ...cfg.agents?.defaults?.models, "openrouter/auto": {} },
      },
    },
  };
}

describe("applyDefaultModelChoice", () => {
  it("sets provider default primary on first run (no existing primary)", async () => {
    const { prompter, noteSpy } = createPrompter();
    const config: OpenClawConfig = {};
    const result = await applyDefaultModelChoice({
      config,
      setDefaultModel: true,
      defaultModel: "openrouter/auto",
      applyDefaultConfig: applyDefaultConfigFn,
      applyProviderConfig: applyProviderConfigFn,
      noteDefault: "openrouter/auto",
      noteAgentModel: vi.fn(async () => undefined),
      prompter,
    });
    expect(result.config.agents?.defaults?.model).toMatchObject({ primary: "openrouter/auto" });
    expect(noteSpy).toHaveBeenCalledWith(
      expect.stringContaining("openrouter/auto"),
      "Model configured",
    );
  });

  it("preserves existing custom primary when reconfiguring (regression #70696)", async () => {
    const { prompter, noteSpy } = createPrompter();
    const config: OpenClawConfig = {
      agents: {
        defaults: {
          model: { primary: "anthropic/claude-opus-4-7" },
        },
      },
    };
    const applyDefault = vi.fn(applyDefaultConfigFn);
    const applyProvider = vi.fn(applyProviderConfigFn);
    const result = await applyDefaultModelChoice({
      config,
      setDefaultModel: true,
      defaultModel: "openrouter/auto",
      applyDefaultConfig: applyDefault,
      applyProviderConfig: applyProvider,
      noteDefault: "openrouter/auto",
      noteAgentModel: vi.fn(async () => undefined),
      prompter,
    });
    // applyDefaultConfig must NOT be called - it would overwrite primary
    expect(applyDefault).not.toHaveBeenCalled();
    // applyProviderConfig sets up auth/allowlist without touching primary
    expect(applyProvider).toHaveBeenCalled();
    // primary stays at the user's custom value
    expect(result.config.agents?.defaults?.model).toMatchObject({
      primary: "anthropic/claude-opus-4-7",
    });
    // no "Model configured" note since primary was not changed
    expect(noteSpy).not.toHaveBeenCalled();
  });

  it("preserves existing string-form primary when reconfiguring", async () => {
    const { prompter } = createPrompter();
    const config: OpenClawConfig = {
      agents: {
        defaults: {
          model:
            "anthropic/claude-sonnet-4-6" as unknown as OpenClawConfig["agents"]["defaults"]["model"],
        },
      },
    };
    const applyDefault = vi.fn(applyDefaultConfigFn);
    const result = await applyDefaultModelChoice({
      config,
      setDefaultModel: true,
      defaultModel: "openrouter/auto",
      applyDefaultConfig: applyDefault,
      applyProviderConfig: applyProviderConfigFn,
      noteDefault: "openrouter/auto",
      noteAgentModel: vi.fn(async () => undefined),
      prompter,
    });
    expect(applyDefault).not.toHaveBeenCalled();
    // primary not overwritten by applyProviderConfigFn (which only touches models, not model.primary)
    expect(result.config.agents?.defaults?.model).toBe("anthropic/claude-sonnet-4-6");
  });

  it("uses applyProviderConfig and agentModelOverride when setDefaultModel is false", async () => {
    const { prompter } = createPrompter();
    const config: OpenClawConfig = {};
    const noteAgentModel = vi.fn(async () => undefined);
    const result = await applyDefaultModelChoice({
      config,
      setDefaultModel: false,
      defaultModel: "openrouter/auto",
      applyDefaultConfig: applyDefaultConfigFn,
      applyProviderConfig: applyProviderConfigFn,
      noteDefault: "openrouter/auto",
      noteAgentModel,
      prompter,
    });
    expect(noteAgentModel).toHaveBeenCalledWith("openrouter/auto");
    expect(result.agentModelOverride).toBe("openrouter/auto");
    // model allowlist entry should include openrouter/auto
    expect(result.config.agents?.defaults?.models?.["openrouter/auto"]).toBeDefined();
  });
});
