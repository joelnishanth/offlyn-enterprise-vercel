"use client";

import Link from "next/link";
import { useState } from "react";
import {
  combinedMetrics,
  workflowPhases,
  type WorkflowPhase,
} from "@/data/enterprise-workflow";
import { cn } from "@/lib/utils";

function FlowDiagram({ phase }: { phase: WorkflowPhase }) {
  const isAudit = phase.id === "audit-layer";

  return (
    <div className="relative mt-8">
      {/* Top: sources */}
      <div className="flex flex-wrap justify-center gap-3">
        {(isAudit
          ? ["Meeting copilot", "Support agent", "RAG / MCP", "Doc Q&A"]
          : ["Audit corpus", "Repeat prompts", "Trace logs", "Routing labels"]
        ).map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground"
          >
            {label}
          </span>
        ))}
      </div>

      <div className="mx-auto my-4 h-8 w-px bg-gradient-to-b from-border to-accent" />

      {/* Center hub */}
      <div className="glow-border mx-auto max-w-md rounded-2xl border border-accent/40 bg-card p-6 text-center">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          {isAudit ? "Offlyn Audit Layer" : "Offlyn Device SLM"}
        </p>
        <p className="mt-2 text-lg font-semibold">
          {isAudit
            ? "Catch · Analyze · Route"
            : "Train · Deploy · Route locally"}
        </p>
        <p className="mt-3 text-3xl font-bold text-emerald-400">
          {phase.savingsValue}
        </p>
        <p className="text-xs text-muted-foreground">{phase.savingsLabel}</p>
      </div>

      <div className="mx-auto my-4 flex justify-center gap-8">
        <div className="h-8 w-px bg-border" />
        <div className="h-8 w-px bg-border" />
      </div>

      {/* Bottom: destinations */}
      <div className="flex flex-wrap justify-center gap-4">
        {isAudit ? (
          <>
            <DestBox title="Local preprocess" sub="chunk · embed · classify" />
            <DestBox title="Compressed evidence" sub="map-reduce · hybrid RAG" accent />
            <DestBox title="Cloud inference" sub="OpenAI · Anthropic · GPU" />
          </>
        ) : (
          <>
            <DestBox title="User device (MLX)" sub="SLM on Mac / iOS" accent />
            <DestBox title="Offline / field" sub="TerraGuide · remote" />
            <DestBox title="Cloud fallback" sub="low confidence only" />
          </>
        )}
      </div>
    </div>
  );
}

function DestBox({
  title,
  sub,
  accent,
}: {
  title: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-xl border px-4 py-3 text-center",
        accent ? "border-accent/50 bg-accent/10" : "border-border bg-card",
      )}
    >
      <p className="text-sm font-medium">{title}</p>
      <p className="text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

function StepCard({
  step,
  index,
}: {
  step: WorkflowPhase["steps"][number];
  index: number;
}) {
  return (
    <div className="relative flex gap-4">
      <div className="flex flex-col items-center">
        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-accent">
          {index + 1}
        </span>
        <div className="mt-2 w-px flex-1 bg-border" />
      </div>
      <div className="mb-6 flex-1 rounded-xl border border-border bg-card p-5">
        <h4 className="font-semibold text-foreground">{step.title}</h4>
        <p className="text-sm text-accent">{step.subtitle}</p>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {step.detail}
        </p>
        {step.vercel && (
          <p className="mt-3 inline-block rounded-md bg-muted/60 px-2 py-1 font-mono text-xs text-muted-foreground">
            Vercel: {step.vercel}
          </p>
        )}
        {step.demoLink && (
          <Link
            href={step.demoLink.href}
            className="mt-3 inline-block text-sm text-accent hover:underline"
          >
            {step.demoLink.label} →
          </Link>
        )}
      </div>
    </div>
  );
}

export function EnterpriseWorkflow() {
  const [active, setActive] = useState<WorkflowPhase["id"]>("audit-layer");
  const phase = workflowPhases.find((p) => p.id === active)!;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {workflowPhases.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(p.id)}
            className={cn(
              "rounded-lg border px-4 py-2 text-sm font-medium transition-colors",
              active === p.id
                ? "border-accent bg-accent/15 text-foreground"
                : "border-border text-muted-foreground hover:border-accent/40",
            )}
          >
            {p.id === "audit-layer" ? "Phase 1: Audit layer" : "Phase 2: Device SLM"}
          </button>
        ))}
      </div>

      <section className="mt-8">
        <h2 className="text-2xl font-bold">{phase.title}</h2>
        <p className="mt-1 text-accent">{phase.tagline}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          {phase.summary}
        </p>
        <FlowDiagram phase={phase} />
        <div className="mt-10 space-y-0">
          {phase.steps.map((step, i) => (
            <StepCard key={step.id} step={step} index={i} />
          ))}
        </div>
      </section>

      <section className="mt-12 rounded-2xl border border-border bg-card/50 p-6 md:p-8">
        <h3 className="text-lg font-semibold">Combined savings story</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Phase 1 reduces what reaches the cloud. Phase 2 moves repeat work to
          devices. Together they compound—without replacing your LLM gateway.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {combinedMetrics.map((m) => (
            <div
              key={m.label}
              className="rounded-lg border border-border bg-muted/30 p-4"
            >
              <p className="text-2xl font-bold text-emerald-400">{m.value}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-dashed border-accent/30 bg-accent/5 p-6">
        <h3 className="font-semibold">How this demo maps to Vercel</h3>
        <p className="mt-2 text-sm text-muted-foreground">
          This page is the narrative.{" "}
          <Link href="/audit" className="text-accent hover:underline">
            /audit
          </Link>{" "}
          streams the audit analysis (AI SDK).{" "}
          <Link href="/architecture" className="text-accent hover:underline">
            /architecture
          </Link>{" "}
          lists every Vercel layer. The homepage form runs the full audit intake
          → report path.
        </p>
      </section>
    </div>
  );
}
