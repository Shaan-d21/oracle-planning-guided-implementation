import type { Metadata } from "next";
import { SolutionArchitectureModule } from "@/components/learning/solution-architecture-module";

export const metadata: Metadata = {
  title: "Solution Architecture",
  description: "A guided Oracle Planning system context, component, integration, environment, security, and NFR architecture module.",
};

export default function SolutionArchitecturePage() {
  return <SolutionArchitectureModule />;
}
