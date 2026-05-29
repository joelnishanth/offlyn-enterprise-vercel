"use client";

import Link from "next/link";
import { useState } from "react";
import {
  HorizontalPipeline,
  HubFlow,
  PhaseStrip,
} from "@/components/architecture/flow-pipeline";
import {
  masterPipeline,
  phaseFlows,
  routeFlows,
  vercelStack,
  type ArchPhaseId,
} from "@/data/architecture-flows";
import { cn } from "@/lib/utils";

const phaseStrip = phaseFlows.map((p) => ({
  id: p.id,
  label: p.label,
  vercel: p.tagline,
}));

function LayerCard({
  item,
  isOpen,
  onToggle,
}: {
  item: (typeof vercelStack)[number];
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        "rounded-xl border px-3 py-3 text-center transition-all",
        isOpen
          ? "col-span-full border-accent/40 bg-accent/10 md:col-span-3"
          : "border-accent/15 bg-accent/5 hover:border-accent/30 hover:bg-accent/10",
      )}
    >
      <p className="text-[10px] font-bold leading-tight text-accent md:text-xs">
        {item.layer}
      </p>
      <p className="mt-1 text-[10px] text-muted-foreground">{item.used}</p>
      {isOpen && (
        <p className="mt-3 text-left text-xs leading-relaxed text-foreground/80">
          {item.desc}
        </p>
      )}
    </button>
  );
}

export function EnterpriseArchitecture() {
  const [active, setActive] = useState<ArchPhaseId>("edge");
  const [openLayer, setOpenLayer] = useState<string | null>(null);
  const phase = phaseFlows.find((p) => p.id === active)!;

  return (
    <div className="space-y-10">
      {/* Full-stack pipeline */}
      <section>
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Full stack
        </p>
        <div className="rounded-2xl border border-border/50 bg-gradient-to-b from-card/80 to-transparent p-2 md:p-4">
          <HorizontalPipeline nodes={masterPipeline} />
        </div>
      </section>

      {/* Phase selector + detail */}
      <section>
        <PhaseStrip
          phases={phaseStrip}
          active={active}
          onSelect={(id) => setActive(id as ArchPhaseId)}
        />

        <div className="mt-6">
          <HubFlow
            sources={phase.sources}
            hub={phase.hub}
            destinations={phase.destinations}
          />
        </div>

        <p className="mt-4 text-center text-xs text-muted-foreground">
          {phase.label} path
        </p>
        <HorizontalPipeline nodes={phase.pipeline} />
      </section>

      {/* Per-route mini flows */}
      <section>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Routes
        </p>
        <div className="grid gap-4 md:grid-cols-3">
          {routeFlows.map((rf) => (
            <div
              key={rf.route}
              className="rounded-2xl border border-border/50 bg-card/40 p-4 backdrop-blur"
            >
              {rf.href ? (
                <Link
                  href={rf.href}
                  className="mb-3 block font-mono text-sm font-bold text-accent hover:underline"
                >
                  {rf.route} →
                </Link>
              ) : (
                <p className="mb-3 font-mono text-sm font-bold text-foreground">
                  {rf.route}
                </p>
              )}
              <HorizontalPipeline nodes={rf.nodes} />
            </div>
          ))}
        </div>
      </section>

      {/* Vercel layer grid — clickable with descriptions */}
      <section>
        <p className="mb-2 text-xs font-medium uppercase tracking-widest text-muted-foreground">
          Vercel layers
        </p>
        <p className="mb-4 text-[11px] text-muted-foreground/70">
          Click any layer for a brief explanation
        </p>
        <div className="grid grid-cols-3 gap-2 md:grid-cols-3 lg:grid-cols-3">
          {vercelStack.map((item) => (
            <LayerCard
              key={item.layer}
              item={item}
              isOpen={openLayer === item.layer}
              onToggle={() =>
                setOpenLayer(openLayer === item.layer ? null : item.layer)
              }
            />
          ))}
        </div>
      </section>

      {/* Demo path — one line */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-muted-foreground">
        <Link
          href="/workflow"
          className="rounded-full border border-border px-3 py-1.5 hover:border-accent/40 hover:text-accent"
        >
          workflow
        </Link>
        <span>→</span>
        <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1.5 text-accent">
          architecture
        </span>
        <span>→</span>
        <Link
          href="/audit"
          className="rounded-full border border-border px-3 py-1.5 hover:border-accent/40 hover:text-accent"
        >
          audit
        </Link>
        <span>→</span>
        <Link
          href="/#request-audit"
          className="rounded-full border border-border px-3 py-1.5 hover:border-accent/40 hover:text-accent"
        >
          form
        </Link>
      </div>
    </div>
  );
}
