import type { Metadata } from "next";
import { CutoverModule } from "@/components/learning/cutover-module";

export const metadata: Metadata = {
  title: "Cutover",
  description: "Plan, rehearse, execute, reconcile, recover, and authorize the ApexPlan Oracle Planning production cutover.",
};

export default function CutoverPage() {
  return <CutoverModule />;
}
