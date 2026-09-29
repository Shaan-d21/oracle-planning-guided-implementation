import type { Metadata } from "next";
import { InventoryPlanningModule } from "@/components/learning/inventory-planning-module";

export const metadata: Metadata = {
  title: "Inventory Planning",
  description: "Build and reconcile the ApexPlan inventory policy, target, projection, plant deployment, production rerun, and downstream handoff model.",
};

export default function InventoryPlanningPage() {
  return <InventoryPlanningModule />;
}
