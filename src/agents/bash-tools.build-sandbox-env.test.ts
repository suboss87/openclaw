import { describe, expect, it } from "vitest";
import { buildSandboxEnv } from "./bash-tools.shared.js";

describe("buildSandboxEnv - skillEnv", () => {
  it("includes skill env vars in the container env", () => {
    const env = buildSandboxEnv({
      defaultPath: "/usr/bin",
      containerWorkdir: "/workspace",
      skillEnv: { MY_API_KEY: "secret123", SKILL_MODEL: "gpt-4o" },
    });

    expect(env.MY_API_KEY).toBe("secret123");
    expect(env.SKILL_MODEL).toBe("gpt-4o");
  });

  it("skill env vars are overridden by sandboxEnv", () => {
    const env = buildSandboxEnv({
      defaultPath: "/usr/bin",
      containerWorkdir: "/workspace",
      skillEnv: { OPENAI_API_KEY: "skill-key" },
      sandboxEnv: { OPENAI_API_KEY: "sandbox-key" },
    });

    expect(env.OPENAI_API_KEY).toBe("sandbox-key");
  });

  it("skill env vars are overridden by paramsEnv", () => {
    const env = buildSandboxEnv({
      defaultPath: "/usr/bin",
      containerWorkdir: "/workspace",
      skillEnv: { MY_TOKEN: "skill-token" },
      paramsEnv: { MY_TOKEN: "caller-token" },
    });

    expect(env.MY_TOKEN).toBe("caller-token");
  });

  it("sandboxEnv overrides skillEnv but paramsEnv overrides both", () => {
    const env = buildSandboxEnv({
      defaultPath: "/usr/bin",
      containerWorkdir: "/workspace",
      skillEnv: { KEY: "from-skill" },
      sandboxEnv: { KEY: "from-sandbox" },
      paramsEnv: { KEY: "from-params" },
    });

    expect(env.KEY).toBe("from-params");
  });

  it("works with no skillEnv (backward compat)", () => {
    const env = buildSandboxEnv({
      defaultPath: "/usr/bin",
      containerWorkdir: "/workspace",
      sandboxEnv: { FOO: "bar" },
    });

    expect(env.FOO).toBe("bar");
    expect(env.PATH).toBe("/usr/bin");
    expect(env.HOME).toBe("/workspace");
  });
});
