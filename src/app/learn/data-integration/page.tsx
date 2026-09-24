import type { Metadata } from "next";
import { DataIntegrationModule } from "@/components/learning/data-integration-module";

export const metadata: Metadata = {
  title: "Data Integration",
  description: "A hands-on Oracle Planning file-based integration, mapping, validation, execution, troubleshooting, and reconciliation module.",
};

export default function DataIntegrationPage() {
  return <DataIntegrationModule />;
}

