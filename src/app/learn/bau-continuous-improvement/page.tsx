import type { Metadata } from "next";
import { BauContinuousImprovementModule } from "@/components/learning/bau-continuous-improvement-module";

export const metadata: Metadata = {
  title: "BAU & Continuous Improvement",
  description: "Operate ApexPlan as a governed service, protect releases, prioritize improvements, maintain regression and knowledge, and measure adoption and realized value.",
};

export default function BauContinuousImprovementPage() {
  return <BauContinuousImprovementModule />;
}
