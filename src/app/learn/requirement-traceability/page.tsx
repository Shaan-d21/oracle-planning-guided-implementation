import type { Metadata } from "next";
import { RequirementTraceabilityModule } from "@/components/learning/requirement-traceability-module";

export const metadata: Metadata = {
  title: "Requirement Traceability",
  description: "A guided requirement quality, RTM mapping, coverage, and change-control module.",
};

export default function RequirementTraceabilityPage() {
  return <RequirementTraceabilityModule />;
}
