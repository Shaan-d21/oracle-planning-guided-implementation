import type { Metadata } from "next";
import { MonthlyPlanningCapstone } from "@/components/learning/monthly-planning-capstone";

export const metadata: Metadata = {
  title: "Monthly Planning Capstone",
  description: "Run the implemented ApexPlan solution through one complete, controlled, and reconciled monthly planning cycle.",
};

export default function MonthlyPlanningCapstonePage() {
  return <MonthlyPlanningCapstone />;
}
