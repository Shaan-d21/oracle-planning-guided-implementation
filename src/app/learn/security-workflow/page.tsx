import type { Metadata } from "next";
import { SecurityWorkflowModule } from "@/components/learning/security-workflow-module";

export const metadata: Metadata = {
  title: "Security & Workflow",
  description: "Implement and validate least-privilege Oracle Planning security, Planning Approvals, and Task Manager workflow for ApexPlan.",
};

export default function SecurityWorkflowPage() {
  return <SecurityWorkflowModule />;
}
