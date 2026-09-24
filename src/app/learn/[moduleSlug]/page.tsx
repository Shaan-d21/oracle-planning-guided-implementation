import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PlannedPhasePreview } from "@/components/learning/planned-phase-preview";
import { TESTING_UNLOCK_ALL_PHASES } from "@/config/learning-mode";
import { getModuleBySlug, implementationModules } from "@/content/course-catalog";

export const metadata: Metadata = {
  title: "Phase Testing Preview",
  description: "An unlocked navigation preview for a planned implementation phase.",
};

export function generateStaticParams() {
  return implementationModules.filter((module) => module.status === "planned").map((module) => ({ moduleSlug: module.slug }));
}

export default async function PlannedPhasePage({ params }: { params: Promise<{ moduleSlug: string }> }) {
  if (!TESTING_UNLOCK_ALL_PHASES) notFound();

  const { moduleSlug } = await params;
  const phaseModule = getModuleBySlug(moduleSlug);
  if (!phaseModule || phaseModule.trackId !== "implementation" || phaseModule.status !== "planned") notFound();

  const index = implementationModules.findIndex((item) => item.id === phaseModule.id);
  return <PlannedPhasePreview module={phaseModule} previous={implementationModules[index - 1]} next={implementationModules[index + 1]} />;
}
