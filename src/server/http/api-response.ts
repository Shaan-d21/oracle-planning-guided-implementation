import { ZodError, type ZodType } from "zod";

export const API_VERSION = "v1" as const;

type ApiSuccessBody<T> = {
  data: T;
  meta: { apiVersion: typeof API_VERSION };
};

type ApiFailureBody = {
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  meta: { apiVersion: typeof API_VERSION };
};

export class ApiError extends Error {
  constructor(
    public readonly status: number,
    public readonly code: string,
    message: string,
    public readonly details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function apiSuccess<T>(data: T, status = 200) {
  return Response.json(
    { data, meta: { apiVersion: API_VERSION } } satisfies ApiSuccessBody<T>,
    { status },
  );
}

export function apiFailure(
  status: number,
  code: string,
  message: string,
  details?: unknown,
) {
  return Response.json(
    {
      error: {
        code,
        message,
        ...(details === undefined ? {} : { details }),
      },
      meta: { apiVersion: API_VERSION },
    } satisfies ApiFailureBody,
    { status },
  );
}

export async function parseJsonBody<T>(
  request: Request,
  schema: ZodType<T>,
  maximumBytes = 32_000,
): Promise<T> {
  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    throw new ApiError(415, "UNSUPPORTED_MEDIA_TYPE", "Expected an application/json request body.");
  }

  const declaredLength = Number(request.headers.get("content-length") ?? 0);
  if (Number.isFinite(declaredLength) && declaredLength > maximumBytes) {
    throw new ApiError(413, "PAYLOAD_TOO_LARGE", "The request body exceeds the allowed size.");
  }

  const rawBody = await request.text();
  if (new TextEncoder().encode(rawBody).byteLength > maximumBytes) {
    throw new ApiError(413, "PAYLOAD_TOO_LARGE", "The request body exceeds the allowed size.");
  }

  let value: unknown;
  try {
    value = JSON.parse(rawBody);
  } catch {
    throw new ApiError(400, "INVALID_JSON", "The request body is not valid JSON.");
  }

  try {
    return schema.parse(value);
  } catch (error) {
    if (error instanceof ZodError) {
      throw new ApiError(
        400,
        "VALIDATION_ERROR",
        "The request body did not pass validation.",
        error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message,
        })),
      );
    }
    throw error;
  }
}

export function apiErrorResponse(error: unknown) {
  if (error instanceof ApiError) {
    return apiFailure(error.status, error.code, error.message, error.details);
  }

  console.error("Unhandled API error", error);
  return apiFailure(500, "INTERNAL_ERROR", "The server could not complete the request.");
}
