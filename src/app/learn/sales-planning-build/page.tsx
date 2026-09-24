import type { Metadata } from "next";
import { SalesPlanningBuildModule } from "@/components/learning/sales-planning-build-module";

export const metadata: Metadata = {
  title: "Sales Planning Build",
  description: "A hands-on Oracle Planning sales model covering history, baseline, promotions, consensus, pricing, revenue, controls, and reconciliation.",
};

export default function SalesPlanningBuildPage() {
  return <SalesPlanningBuildModule />;
}

