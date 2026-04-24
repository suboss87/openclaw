import type { OpenClawConfig } from "../config/config.js";
import { resolveAgentModelPrimaryValue } from "../config/model-input.js";
import type { WizardPrompter } from "../wizard/prompts.js";
import { ensureModelAllowlistEntry } from "./model-allowlist.js";

export async function applyDefaultModelChoice(params: {
  config: OpenClawConfig;
  setDefaultModel: boolean;
  defaultModel: string;
  applyDefaultConfig: (config: OpenClawConfig) => OpenClawConfig;
  applyProviderConfig: (config: OpenClawConfig) => OpenClawConfig;
  noteDefault?: string;
  noteAgentModel: (model: string) => Promise<void>;
  prompter: WizardPrompter;
}): Promise<{ config: OpenClawConfig; agentModelOverride?: string }> {
  if (params.setDefaultModel) {
    // If the user already has a custom primary model, use applyProviderConfig (which
    // sets up auth/allowlist only) so we don't overwrite their intentional choice.
    // applyDefaultConfig unconditionally calls applyAgentDefaultModelPrimary, which
    // resets primary to the provider default - correct on first run but wrong on
    // reconfigure when the user has already changed their primary via CLI or a prior
    // configure run. (#70696)
    const existingPrimary = resolveAgentModelPrimaryValue(params.config.agents?.defaults?.model);
    if (existingPrimary) {
      const next = params.applyProviderConfig(params.config);
      return { config: next };
    }
    const next = params.applyDefaultConfig(params.config);
    if (params.noteDefault) {
      await params.prompter.note(`Default model set to ${params.noteDefault}`, "Model configured");
    }
    return { config: next };
  }

  const next = params.applyProviderConfig(params.config);
  const nextWithModel = ensureModelAllowlistEntry({
    cfg: next,
    modelRef: params.defaultModel,
  });
  await params.noteAgentModel(params.defaultModel);
  return { config: nextWithModel, agentModelOverride: params.defaultModel };
}
