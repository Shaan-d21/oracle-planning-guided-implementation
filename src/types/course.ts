export type LearningTrackId = "planning-cycle" | "implementation";

export type CourseModuleStatus = "available" | "planned";

export type LessonStepType =
  | "concept"
  | "guided-screenshot"
  | "wizard"
  | "simulation"
  | "assessment"
  | "evidence"
  | "exit-gate";

export interface LearningTrack {
  id: LearningTrackId;
  title: string;
  description: string;
  audience: string;
}

export interface LifecyclePhase {
  id: number;
  title: string;
  stage: "discover" | "design" | "build" | "validate" | "deploy" | "operate";
}

export interface LessonDefinition {
  id: string;
  number: string;
  title: string;
  duration: string;
  type: LessonStepType;
}

export interface CourseModuleDefinition {
  id: string;
  slug: string;
  trackId: LearningTrackId;
  sequence: number;
  phase?: number;
  title: string;
  stage: string;
  description: string;
  duration: string;
  deliverable: string;
  exitGate: string;
  status: CourseModuleStatus;
  prerequisiteModuleId?: string;
  lessons: readonly LessonDefinition[];
}

export interface CourseDefinition {
  id: string;
  title: string;
  subtitle: string;
  company: string;
  durationDays: number;
  tracks: LearningTrack[];
  phases: LifecyclePhase[];
}
