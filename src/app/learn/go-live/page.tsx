import type { Metadata } from "next";
import { GoLiveModule } from "@/components/learning/go-live-module";

export const metadata: Metadata = {
  title: "Go-Live",
  description: "Activate the authorized ApexPlan production scope, prove the first live planning cycle, reconcile outputs, control incidents, and hand off to Hypercare.",
};

export default function GoLivePage() {
  return <GoLiveModule />;
}
