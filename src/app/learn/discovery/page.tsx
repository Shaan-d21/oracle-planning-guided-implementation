import type { Metadata } from "next";
import { DiscoveryModule } from "@/components/learning/discovery-module";

export const metadata: Metadata = {
  title: "Discovery & Requirement Gathering",
  description: "The first guided module in the BISP Production and Sales Planning learning journey.",
};

export default function DiscoveryModulePage() {
  return <DiscoveryModule />;
}
