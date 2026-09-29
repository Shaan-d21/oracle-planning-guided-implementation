import type { Metadata } from "next";
import { WorkforceCapexDependenciesModule } from "@/components/learning/workforce-capex-dependencies-module";

export const metadata: Metadata = {
  title: "Workforce & CapEx Dependencies",
  description: "Build and reconcile the ApexPlan workforce, asset-capacity, CapEx, cash-flow, depreciation, scenario, and financial handoff dependencies.",
};

export default function WorkforceCapexDependenciesPage() {
  return <WorkforceCapexDependenciesModule />;
}
