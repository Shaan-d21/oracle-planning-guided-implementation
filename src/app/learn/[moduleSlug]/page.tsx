import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlannedPhasePreview } from "@/components/learning/planned-phase-preview";
import { TESTING_UNLOCK_ALL_PHASES } from "@/config/learning-mode";
import { getModuleBySlug, implementationModules } from "@/content/course-catalog";

export const metadata: Metadata = {
  title: "Phase Curriculum Outline",
  description: "Learning scope, deliverable, and exit gate for an implementation phase.",
};

export function generateStaticParams() {
  const plannedModules = implementationModules
    .filter((module) => module.status === "planned")
    .map((module) => ({ moduleSlug: module.slug }));

  // Static export requires at least one generated parameter. This sentinel
  // resolves through the existing not-found guard and never appears in navigation.
  return plannedModules.length > 0 ? plannedModules : [{ moduleSlug: "_no-planned-phases" }];
}

export default async function PlannedPhasePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  if (!TESTING_UNLOCK_ALL_PHASES) notFound();

  const { moduleSlug } = await params;
  const phaseModule = getModuleBySlug(moduleSlug);
  if (!phaseModule || phaseModule.trackId !== "implementation" || phaseModule.status !== "planned") notFound();

  const index = implementationModules.findIndex((item) => item.id === phaseModule.id);
  return <PlannedPhasePreview module={phaseModule} previous={implementationModules[index - 1]} next={implementationModules[index + 1]} />;
}
