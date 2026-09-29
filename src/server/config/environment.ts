import { z } from "zod";

const serverEnvironmentSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  DATABASE_URL: z.string().min(1).optional(),
  AI_PROVIDER: z.string().min(1).optional(),
  AI_API_KEY: z.string().min(1).optional(),
  AI_MODEL: z.string().min(1).optional(),
});

export type ServerEnvironment = z.infer<typeof serverEnvironmentSchema>;

let cachedEnvironment: ServerEnvironment | undefined;

export function getServerEnvironment(): ServerEnvironment {
  if (cachedEnvironment) return cachedEnvironment;

  const result = serverEnvironmentSchema.safeParse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    AI_PROVIDER: process.env.AI_PROVIDER,
    AI_API_KEY: process.env.AI_API_KEY,
    AI_MODEL: process.env.AI_MODEL,
  });

  if (!result.success) {
    const invalidFields = result.error.issues
      .map((issue) => issue.path.join("."))
      .filter(Boolean)
      .join(", ");
    throw new Error(`Invalid server configuration${invalidFields ? `: ${invalidFields}` : ""}`);
  }

  cachedEnvironment = result.data;
  return cachedEnvironment;
}

export function getBackendCapabilityStatus() {
  const environment = getServerEnvironment();
  const aiConfigured = Boolean(
    environment.AI_PROVIDER && environment.AI_API_KEY && environment.AI_MODEL,
  );

  return {
    authentication: "on-hold" as const,
    persistence: environment.DATABASE_URL ? "configured-not-connected" as const : "local-browser-only" as const,
    aiChat: aiConfigured ? "configured-not-exposed" as const : "foundation-only" as const,
    wordpressIdentity: "on-hold" as const,
  };
}
