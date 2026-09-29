import { implementationModules, planningCycleModules } from "@/content/course-catalog";
import { productionSalesPlanningCourse } from "@/content/production-sales-planning";

export type KnowledgeDocument = {
  id: string;
  title: string;
  content: string;
  href: string;
  trackId: "implementation" | "planning-cycle";
  moduleId?: string;
  lessonId?: string;
};

export type KnowledgeSearchResult = KnowledgeDocument & { score: number };

const modules = [...implementationModules, ...planningCycleModules];

export function getCourseCatalogSnapshot() {
  return {
    id: productionSalesPlanningCourse.id,
    title: productionSalesPlanningCourse.title,
    subtitle: productionSalesPlanningCourse.subtitle,
    company: productionSalesPlanningCourse.company,
    durationDays: productionSalesPlanningCourse.durationDays,
    tracks: productionSalesPlanningCourse.tracks.map((track) => {
      const trackModules = modules.filter((module) => module.trackId === track.id);
      return {
        ...track,
        status: trackModules.some((module) => module.status === "available") ? "available" as const : "planned" as const,
        moduleCount: trackModules.length,
        availableModuleCount: trackModules.filter((module) => module.status === "available").length,
      };
    }),
    modules: modules.map((module) => ({
      id: module.id,
      slug: module.slug,
      trackId: module.trackId,
      sequence: module.sequence,
      phase: module.phase,
      title: module.title,
      stage: module.stage,
      description: module.description,
      duration: module.duration,
      deliverable: module.deliverable,
      exitGate: module.exitGate,
      status: module.status,
      prerequisiteModuleId: module.prerequisiteModuleId,
      lessons: module.lessons,
    })),
  };
}

export function buildCourseKnowledgeIndex(): KnowledgeDocument[] {
  return modules.flatMap((module) => {
    const moduleDocument: KnowledgeDocument = {
      id: module.id,
      title: module.title,
      content: [module.stage, module.description, module.deliverable, module.exitGate].join(" "),
      href: `/learn/${module.slug}`,
      trackId: module.trackId,
      moduleId: module.id,
    };

    const lessonDocuments = module.lessons.map((lesson) => ({
      id: `${module.id}:${lesson.id}`,
      title: `${module.title}: ${lesson.title}`,
      content: [module.description, lesson.title, lesson.type, lesson.duration].join(" "),
      href: `/learn/${module.slug}`,
      trackId: module.trackId,
      moduleId: module.id,
      lessonId: lesson.id,
    } satisfies KnowledgeDocument));

    return [moduleDocument, ...lessonDocuments];
  });
}

export function searchCourseKnowledge(query: string, limit = 6): KnowledgeSearchResult[] {
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0 || limit <= 0) return [];

  return buildCourseKnowledgeIndex()
    .map((document) => ({ ...document, score: scoreDocument(document, queryTokens) }))
    .filter((document) => document.score > 0)
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, Math.min(limit, 20));
}

function scoreDocument(document: KnowledgeDocument, queryTokens: string[]) {
  const titleTokens = new Set(tokenize(document.title));
  const contentTokens = new Set(tokenize(document.content));

  return queryTokens.reduce((score, token) => {
    if (titleTokens.has(token)) return score + 4;
    if (contentTokens.has(token)) return score + 1;
    return score;
  }, 0);
}

function tokenize(value: string) {
  return [...new Set(
    value
      .toLocaleLowerCase("en")
      .replace(/[^a-z0-9]+/g, " ")
      .trim()
      .split(/\s+/)
      .filter((token) => token.length > 1),
  )];
}
