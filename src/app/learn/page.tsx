import type { Metadata } from "next";
import { LearnerDashboard } from "@/components/learning/learner-dashboard";

export const metadata: Metadata = {
  title: "Learner Dashboard",
  description: "Continue the guided Production and Sales Planning learning journey.",
};

export default function LearnDashboardPage() {
  return <LearnerDashboard />;
}
