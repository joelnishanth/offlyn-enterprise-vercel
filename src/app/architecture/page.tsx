import type { Metadata } from "next";
import { ArchitectureView } from "@/components/architecture/architecture-view";

export const metadata: Metadata = {
  title: "Vercel Architecture | Offlyn Enterprise",
  description:
    "Architecture map of every page and component to Vercel platform layers.",
};

export default function ArchitecturePage() {
  return <ArchitectureView />;
}
