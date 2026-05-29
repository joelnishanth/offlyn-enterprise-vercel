import type { Metadata } from "next";
import { ArchitectureView } from "@/components/architecture/architecture-view";

export const metadata: Metadata = {
  title: "Vercel Architecture | Offlyn.ai",
  description:
    "Phased flow map: Edge → Render → AI & Compute → Storage. Every demo route highlighted with Vercel platform layers.",
};

export default function ArchitecturePage() {
  return <ArchitectureView />;
}
