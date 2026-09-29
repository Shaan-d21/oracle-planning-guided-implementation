import type { Metadata } from "next";
import { ManufacturingCostCogsModule } from "@/components/learning/manufacturing-cost-cogs-module";

export const metadata: Metadata = {
  title: "Manufacturing Cost & COGS",
  description: "Build and reconcile the ApexPlan manufacturing unit cost, inventory valuation, COGS, gross margin, and reporting handoff.",
};

export default function ManufacturingCostCogsPage() {
  return <ManufacturingCostCogsModule />;
}
