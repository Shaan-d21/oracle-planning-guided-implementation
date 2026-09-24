import type { Metadata } from "next";
import { LearnerDashboard } from "@/components/learning/learner-dashboard";

export const metadata: Metadata = {
  title: "Learner Dashboard",
  description: "Continue the guided Production and Sales Planning learning journey.",
};

export default async function LearnDashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ track?: string | string[] }>;
}) {
  const trackParam = (await searchParams).track;
  const initialTrack = trackParam === "planning-cycle" || trackParam === "implementation" ? trackParam : undefined;
  return <LearnerDashboard initialTrack={initialTrack} />;
}
