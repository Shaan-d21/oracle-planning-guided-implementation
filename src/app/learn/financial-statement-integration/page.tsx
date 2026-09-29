import type { Metadata } from "next";
import { FinancialStatementIntegrationModule } from "@/components/learning/financial-statement-integration-module";

export const metadata: Metadata = {
  title: "Financial Statement Integration",
  description: "Build and reconcile the ApexPlan management P&L, working capital, indirect cash flow, balance sheet, reporting movement, and financial handoff.",
};

export default function FinancialStatementIntegrationPage() {
  return <FinancialStatementIntegrationModule />;
}
