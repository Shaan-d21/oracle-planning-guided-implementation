import type {
  ChatRequest,
  LearnerIdentityReference,
  ProgressUpdate,
  SubmissionDraft,
} from "@/server/domain/schemas";
import type { KnowledgeSearchResult } from "@/server/services/course-knowledge";

export type StoredProgress = ProgressUpdate & {
  id: string;
  learnerId: string;
  serverUpdatedAt: string;
};

export type StoredSubmission = SubmissionDraft & {
  id: string;
  learnerId: string;
  status: "draft" | "submitted" | "reviewed";
  createdAt: string;
  updatedAt: string;
};

export interface IdentityResolver {
  resolve(reference: LearnerIdentityReference): Promise<{ learnerId: string } | null>;
}

export interface ProgressRepository {
  findByLearnerAndTrack(learnerId: string, trackId: ProgressUpdate["trackId"]): Promise<StoredProgress | null>;
  save(learnerId: string, progress: ProgressUpdate): Promise<StoredProgress>;
}

export interface SubmissionRepository {
  findByLearner(learnerId: string): Promise<StoredSubmission[]>;
  saveDraft(learnerId: string, submission: SubmissionDraft): Promise<StoredSubmission>;
}

export type ChatAnswer = {
  message: string;
  citations: Array<Pick<KnowledgeSearchResult, "id" | "title" | "href">>;
};

export interface AiChatProvider {
  answer(request: ChatRequest, context: KnowledgeSearchResult[]): Promise<ChatAnswer>;
}
