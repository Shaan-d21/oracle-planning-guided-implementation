import type { Metadata } from "next";
import { SystemIntegrationTestingModule } from "@/components/learning/system-integration-testing-module";

export const metadata: Metadata = {
  title: "System Integration Testing",
  description: "Execute and govern end-to-end system integration testing for the ApexPlan Oracle Planning solution.",
};

export default function SystemIntegrationTestingPage() {
  return <SystemIntegrationTestingModule />;
}
