import type { Metadata } from "next";
import { HypercareModule } from "@/components/learning/hypercare-module";

export const metadata: Metadata = {
  title: "Hypercare",
  description: "Stabilize ApexPlan after Go-Live through controlled support, monitoring, fixes, recurring-cause removal, knowledge transfer, and evidence-based BAU handoff.",
};

export default function HypercarePage() {
  return <HypercareModule />;
}
