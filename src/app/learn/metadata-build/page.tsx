import type { Metadata } from "next";
import { MetadataBuildModule } from "@/components/learning/metadata-build-module";

export const metadata: Metadata = {
  title: "Metadata Build",
  description: "A hands-on Oracle Planning metadata preparation, import, troubleshooting, refresh, reconciliation, and evidence module.",
};

export default function MetadataBuildPage() {
  return <MetadataBuildModule />;
}

