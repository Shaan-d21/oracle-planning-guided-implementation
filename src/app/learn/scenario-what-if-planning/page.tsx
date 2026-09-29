import type { Metadata } from "next";
import { ScenarioWhatIfPlanningModule } from "@/components/learning/scenario-what-if-planning-module";

export const metadata: Metadata = {
  title: "Scenario & What-If Planning",
  description: "Build and govern ApexPlan Upside and Downside versions from an approved Forecast baseline.",
};

export default function ScenarioWhatIfPlanningPage() {
  return <ScenarioWhatIfPlanningModule />;
}
