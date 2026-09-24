import type { LearningTrackId } from "@/types/course";

export const PROGRESS_STORAGE_KEY = "bisp-learning-progress-v2";
const LEGACY_PROGRESS_STORAGE_KEY = "bisp-learning-progress-v1";

export type TrackProgress = {
  completedLessons: string[];
  activeLesson?: string;
  activeModuleId?: string;
  lastVisited?: string;
};

export type LearningProgress = {
  version: 2;
  selectedTrack: LearningTrackId;
  tracks: Record<LearningTrackId, TrackProgress>;
};

export const emptyTrackProgress: TrackProgress = { completedLessons: [] };

export const emptyProgress: LearningProgress = {
  version: 2,
  selectedTrack: "implementation",
  tracks: {
    implementation: { completedLessons: [] },
    "planning-cycle": { completedLessons: [] },
  },
};

function sanitizeTrackProgress(value: unknown): TrackProgress {
  if (!value || typeof value !== "object") return { completedLessons: [] };
  const progress = value as Partial<TrackProgress>;
  return {
    completedLessons: Array.isArray(progress.completedLessons)
      ? progress.completedLessons.filter((item): item is string => typeof item === "string")
      : [],
    activeLesson: typeof progress.activeLesson === "string" ? progress.activeLesson : undefined,
    activeModuleId: typeof progress.activeModuleId === "string" ? progress.activeModuleId : undefined,
    lastVisited: typeof progress.lastVisited === "string" ? progress.lastVisited : undefined,
  };
}

function migrateLegacyProgress(): LearningProgress | null {
  const stored = window.localStorage.getItem(LEGACY_PROGRESS_STORAGE_KEY);
  if (!stored) return null;
  try {
    const legacy = JSON.parse(stored) as Partial<TrackProgress>;
    return {
      ...emptyProgress,
      tracks: {
        ...emptyProgress.tracks,
        implementation: sanitizeTrackProgress(legacy),
      },
    };
  } catch {
    return null;
  }
}

export function readLearningProgress(): LearningProgress {
  if (typeof window === "undefined") return emptyProgress;

  try {
    const stored = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (!stored) {
      const migrated = migrateLegacyProgress();
      if (migrated) window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(migrated));
      return migrated ?? emptyProgress;
    }
    const parsed = JSON.parse(stored) as Partial<LearningProgress>;
    const selectedTrack = parsed.selectedTrack === "planning-cycle" ? "planning-cycle" : "implementation";
    return {
      version: 2,
      selectedTrack,
      tracks: {
        implementation: sanitizeTrackProgress(parsed.tracks?.implementation),
        "planning-cycle": sanitizeTrackProgress(parsed.tracks?.["planning-cycle"]),
      },
    };
  } catch {
    return emptyProgress;
  }
}

export function readTrackProgress(trackId: LearningTrackId): TrackProgress {
  return readLearningProgress().tracks[trackId];
}

export function writeTrackProgress(trackId: LearningTrackId, progress: TrackProgress) {
  if (typeof window === "undefined") return;
  const current = readLearningProgress();
  const next: LearningProgress = {
    ...current,
    selectedTrack: trackId,
    tracks: { ...current.tracks, [trackId]: sanitizeTrackProgress(progress) },
  };
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent("bisp-learning-progress"));
}

export function writeSelectedTrack(trackId: LearningTrackId) {
  if (typeof window === "undefined") return;
  const current = readLearningProgress();
  window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify({ ...current, selectedTrack: trackId }));
  window.dispatchEvent(new CustomEvent("bisp-learning-progress"));
}
