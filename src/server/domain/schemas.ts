import { z } from "zod";

const identifier = z.string().trim().min(1).max(160);

export const learnerIdentityReferenceSchema = z.object({
  provider: identifier,
  subject: identifier,
});

export const progressUpdateSchema = z.object({
  courseId: identifier,
  trackId: z.enum(["implementation", "planning-cycle"]),
  activeModuleId: identifier.optional(),
  activeLessonId: identifier.optional(),
  completedLessonIds: z.array(identifier).max(1_000),
  clientUpdatedAt: z.iso.datetime().optional(),
});

export const submissionDraftSchema = z.object({
  courseId: identifier,
  moduleId: identifier,
  lessonId: identifier,
  assignmentId: identifier,
  response: z.string().trim().min(1).max(20_000),
  evidenceReferences: z.array(z.string().trim().min(1).max(500)).max(20).default([]),
});

export const chatRequestSchema = z.object({
  message: z.string().trim().min(1).max(4_000),
  conversationId: z.uuid().optional(),
  currentModuleSlug: identifier.optional(),
  currentLessonId: identifier.optional(),
});

export type LearnerIdentityReference = z.infer<typeof learnerIdentityReferenceSchema>;
export type ProgressUpdate = z.infer<typeof progressUpdateSchema>;
export type SubmissionDraft = z.infer<typeof submissionDraftSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
