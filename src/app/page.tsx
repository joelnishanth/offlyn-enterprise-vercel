import { Suspense } from "react";
import { getFeatureFlags } from "@/lib/edge-config";
import { AuditForm } from "@/components/landing/audit-form";
import { HeroBanner } from "@/components/landing/hero-banner";
import {
  AudiencesSection,
  AuditOfferingSection,
  ComparisonSection,
  CompetitorSection,
  PainSection,
  ProcessSection,
  RoutingSection,
} from "@/components/landing/sections";
import { PlatformLayers } from "@/components/platform-layers";

async function AuditFormSection() {
  const flags = await getFeatureFlags();
  return <AuditForm showWaitlist={flags.enableWaitlist} />;
}

export default function HomePage() {
  return (
    <main>
      <Suspense fallback={<HeroSkeleton />}>
        <HeroBanner />
      </Suspense>

      <AudiencesSection />
      <PainSection />
      <ProcessSection />
      <AuditOfferingSection />
      <RoutingSection />
      <ComparisonSection />
      <CompetitorSection />

      <section className="border-t border-border/60 px-4 py-16 md:px-6">
        <div className="mx-auto max-w-4xl space-y-8">
          <h2 className="text-2xl font-bold md:text-3xl">
            Find your repeated-context waste.
          </h2>
          <p className="text-muted-foreground">
            Send us one workflow — PDFs, meetings, support logs, RAG chunks, MCP tool
            calls, or agent traces.
          </p>
          <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-muted" />}>
            <AuditFormSection />
          </Suspense>
          <PlatformLayers />
        </div>
      </section>
    </main>
  );
}

function HeroSkeleton() {
  return (
    <div className="px-4 py-24 md:px-6">
      <div className="mx-auto h-32 max-w-4xl animate-pulse rounded-xl bg-muted" />
    </div>
  );
}
