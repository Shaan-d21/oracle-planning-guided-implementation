import { apiSuccess } from "@/server/http/api-response";
import { getBackendStatus } from "@/server/services/backend-status";

export const dynamic = "force-static";

export function GET() {
  return apiSuccess(getBackendStatus());
}
