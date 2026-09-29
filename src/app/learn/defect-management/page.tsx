import type { Metadata } from "next";
import { DefectManagementModule } from "@/components/learning/defect-management-module";

export const metadata: Metadata = {
  title: "Defect Management",
  description: "Classify, triage, fix, retest, reconcile, defer, close, and authorize release defects for the ApexPlan Oracle Planning solution.",
};

export default function DefectManagementPage() {
  return <DefectManagementModule />;
}
