import type { Metadata } from "next";
import { ProductionPlanningBuildModule } from "@/components/learning/production-planning-build-module";

export const metadata: Metadata = {
  title: "Production Planning Build",
  description: "Build and reconcile the ApexPlan production requirement, plant allocation, capacity, exception, and manufacturing handoff model.",
};

export default function ProductionPlanningBuildPage() {
  return <ProductionPlanningBuildModule />;
}
