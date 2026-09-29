import type { Metadata } from "next";
import { GoNoGoModule } from "@/components/learning/go-no-go-module";

export const metadata: Metadata = {
  title: "Go / No-Go",
  description: "Evaluate evidence, protect hard-stop gates, authorize residual risk, and record the ApexPlan production activation decision.",
};

export default function GoNoGoPage() {
  return <GoNoGoModule />;
}
