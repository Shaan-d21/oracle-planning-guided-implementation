import { apiSuccess } from "@/server/http/api-response";
import { getCourseCatalogSnapshot } from "@/server/services/course-knowledge";

export const dynamic = "force-static";

export function GET() {
  return apiSuccess(getCourseCatalogSnapshot());
}
