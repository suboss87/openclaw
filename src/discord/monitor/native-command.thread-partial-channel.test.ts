import { ChannelType } from "discord-api-types/v10";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { NativeCommandSpec } from "../../auto-reply/commands-registry.js";
import * as dispatcherModule from "../../auto-reply/reply/provider-dispatcher.js";
import type { OpenClawConfig } from "../../config/config.js";
import * as pluginCommandsModule from "../../plugins/commands.js";
import * as messageUtilsModule from "./message-utils.js";
import { createDiscordNativeCommand } from "./native-command.js";
import { createNoopThreadBindingManager } from "./thread-bindings.js";

// Simulates a Carbon GuildThreadChannel object that is "partial":
// the `parentId` property exists (passes the `"parentId" in channel` guard)
// but throws when accessed, exactly as @buape/carbon does for unfetched channels.
function createPartialThreadChannel(channelId: string) {
  const channel = {
    type: ChannelType.PublicThread,
    id: channelId,
    name: "help-thread",
  };
  Object.defineProperty(channel, "parentId", {
    enumerable: true,
    get() {
      throw new Error("Cannot access rawData on partial Channel. Use fetch() to populate data.");
    },
  });
  return channel;
}

function createThreadInteraction(params: { channelId: string; userId: string; guildId: string }) {
  const { channelId, userId, guildId } = params;
  const channel = createPartialThreadChannel(channelId);
  return {
    user: { id: userId, username: "tester", globalName: "Tester" },
    channel,
    guild: { id: guildId, name: "Test Guild" },
    rawData: { id: "interaction-1", member: { roles: [] } },
    options: {
      getString: vi.fn().mockReturnValue(null),
      getNumber: vi.fn().mockReturnValue(null),
      getBoolean: vi.fn().mockReturnValue(null),
    },
    reply: vi.fn().mockResolvedValue({ ok: true }),
    followUp: vi.fn().mockResolvedValue({ ok: true }),
    client: {},
  };
}

function createStatusCommand(cfg: OpenClawConfig) {
  const commandSpec: NativeCommandSpec = {
    name: "status",
    description: "Status",
    acceptsArgs: false,
  };
  return createDiscordNativeCommand({
    command: commandSpec,
    cfg,
    discordConfig: cfg.channels?.discord ?? {},
    accountId: "default",
    sessionPrefix: "discord:slash",
    ephemeralDefault: true,
    threadBindings: createNoopThreadBindingManager("default"),
  });
}

describe("Discord native slash commands in thread channels with partial channel objects", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    // Prevent real HTTP calls from resolveDiscordChannelInfo / resolveDiscordThreadParentInfo.
    vi.spyOn(messageUtilsModule, "resolveDiscordChannelInfo").mockResolvedValue(null);
    vi.spyOn(pluginCommandsModule, "matchPluginCommand").mockReturnValue(null);
  });

  it("does not throw when channel.parentId accessor throws (partial Carbon channel)", async () => {
    const cfg: OpenClawConfig = {
      commands: {
        allowFrom: {
          discord: ["user:owner-user-id"],
        },
      },
      channels: {
        discord: {
          groupPolicy: "open",
        },
      },
    } as OpenClawConfig;
    const command = createStatusCommand(cfg);
    const interaction = createThreadInteraction({
      channelId: "thread-channel-id",
      userId: "owner-user-id",
      guildId: "guild-id",
    });

    vi.spyOn(dispatcherModule, "dispatchReplyWithDispatcher").mockResolvedValue({
      counts: { final: 1, block: 0, tool: 0 },
    } as never);

    // Before the fix this threw: Cannot access rawData on partial Channel.
    await expect(
      (command as { run: (i: unknown) => Promise<void> }).run(interaction as unknown),
    ).resolves.not.toThrow();
    // The dispatch was reached - command completed normally.
    expect(dispatcherModule.dispatchReplyWithDispatcher).toHaveBeenCalledTimes(1);
  });
});
