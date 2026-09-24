import type { Metadata } from "next";
import { ApplicationDimensionDesignModule } from "@/components/learning/application-dimension-design-module";

export const metadata: Metadata = {
  title: "Application & Dimension Design",
  description: "A guided Oracle Planning application, dimension, hierarchy, member-property, plan-type, and valid-intersection design module.",
};

export default function ApplicationDimensionDesignPage() {
  return <ApplicationDimensionDesignModule />;
}
