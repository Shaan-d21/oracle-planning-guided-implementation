import type { Metadata } from "next";
import { BusinessRulesGroovyModule } from "@/components/learning/business-rules-groovy-module";

export const metadata: Metadata = {
  title: "Business Rules & Groovy",
  description: "Design, validate, deploy, test, and operate governed ApexPlan Calculation Manager and Groovy rules.",
};

export default function BusinessRulesGroovyPage() {
  return <BusinessRulesGroovyModule />;
}
