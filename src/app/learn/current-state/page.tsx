import type { Metadata } from "next";
import { CurrentStateModule } from "@/components/learning/current-state-module";

export const metadata: Metadata = {
  title: "Current-State Assessment",
  description: "A guided AS-IS process, system, evidence, and baseline assessment module.",
};

export default function CurrentStateModulePage() {
  return <CurrentStateModule />;
}
