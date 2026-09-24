import type { Metadata } from "next";
import { FutureStateModule } from "@/components/learning/future-state-module";

export const metadata: Metadata = {
  title: "Future-State Design",
  description: "A guided future-state process, governance, planning grain, and design handoff module.",
};

export default function FutureStateModulePage() {
  return <FutureStateModule />;
}
