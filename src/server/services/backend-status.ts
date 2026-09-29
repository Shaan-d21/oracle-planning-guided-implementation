import { getBackendCapabilityStatus } from "@/server/config/environment";

export function getBackendStatus() {
  return {
    status: "ok" as const,
    service: "bisp-production-sales-planning",
    runtime: "nextjs-route-handlers" as const,
    capabilities: getBackendCapabilityStatus(),
  };
}
