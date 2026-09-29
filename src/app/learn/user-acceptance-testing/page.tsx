import type { Metadata } from "next";
import { UserAcceptanceTestingModule } from "@/components/learning/user-acceptance-testing-module";

export const metadata: Metadata = {
  title: "User Acceptance Testing",
  description: "Plan, execute, govern, and sign off business-led user acceptance testing for the ApexPlan Oracle Planning solution.",
};

export default function UserAcceptanceTestingPage() {
  return <UserAcceptanceTestingModule />;
}
