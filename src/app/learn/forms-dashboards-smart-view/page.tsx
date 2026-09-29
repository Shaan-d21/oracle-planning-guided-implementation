import type { Metadata } from "next";
import { FormsDashboardsSmartViewModule } from "@/components/learning/forms-dashboards-smart-view-module";

export const metadata: Metadata = {
  title: "Forms, Dashboards & Smart View",
  description: "Design and validate the ApexPlan role-based forms, decision dashboards, and governed Smart View experience.",
};

export default function FormsDashboardsSmartViewPage() {
  return <FormsDashboardsSmartViewModule />;
}
