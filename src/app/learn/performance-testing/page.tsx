import type { Metadata } from "next";
import { PerformanceTestingModule } from "@/components/learning/performance-testing-module";

export const metadata: Metadata = {
  title: "Performance Testing",
  description: "Measure, diagnose, optimize, and approve the performance and capacity of the ApexPlan Oracle Planning solution.",
};

export default function PerformanceTestingPage() {
  return <PerformanceTestingModule />;
}
