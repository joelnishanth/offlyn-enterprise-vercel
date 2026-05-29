"use client";

import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";

const layerGlossary: Record<string, string> = {
  Middleware: "Runs at the edge before your page loads — geo, A/B, rewrites at CDN speed.",
  "Edge Config": "Ultra-low-latency KV store. Flip flags instantly, no redeploy.",
  "Edge Middleware": "Runs at the edge before your page loads — geo, A/B, rewrites at CDN speed.",
  PPR: "Partial Prerendering — static shell from CDN, dynamic content streams into Suspense holes.",
  RSC: "React Server Components — render on the server, send zero JS to the client for that tree.",
  Suspense: "Marks boundaries where dynamic data streams in after the static shell loads.",
  "Cache Components": "Next.js PPR — instant static shell + streamed dynamic parts.",
  Fluid: "Functions that stay warm across requests. Near-zero cold starts.",
  "Fluid Compute": "Functions that stay warm across requests. Near-zero cold starts.",
  "AI SDK": "TypeScript toolkit for LLMs. streamText, tool calling, structured output.",
  "AI Gateway": "Unified layer for multiple LLM providers — routing, failover, cost tracking.",
  Gateway: "Unified layer for multiple LLM providers — routing, failover, cost tracking.",
  "Workflow SDK": "Durable multi-step background jobs. Retryable, crash-safe across deploys.",
  Workflow: "Durable multi-step background jobs. Retryable, crash-safe across deploys.",
  KV: "Redis-compatible key-value store for fast reads/writes.",
  Blob: "Object storage for large files with global CDN delivery.",
  Redis: "Redis-compatible key-value store for fast reads/writes.",
  Sandbox: "Isolated Firecracker microVMs for running untrusted code safely.",
  "Server Actions": "Server-side functions called directly from client components — no API route needed.",
  Actions: "Server-side functions called directly from client components — no API route needed.",
  "Speed Insights": "Real User Monitoring — Core Web Vitals per route, per deploy.",
  "Web Analytics": "Privacy-friendly page view and visitor analytics.",
  Edge: "Vercel's global edge network — code runs in 30+ regions, closest to users.",
  Routing: "Vercel routes requests to the right compute surface automatically.",
  Cron: "Scheduled function invocations via vercel.json config.",
  Firewall: "Block, challenge, or rate-limit traffic at the edge before it reaches your app.",
  "Dynamic Routes": "File-system routes with [params] for dynamic content.",
};

export type PipelineNode = {
  id: string;
  label: string;
  sub?: string;
  vercel?: string[];
  href?: string;
  highlight?: boolean;
};

function FlowArrow({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center px-1 text-muted-foreground/60 md:px-2",
        className,
      )}
      aria-hidden
    >
      <svg width="28" height="12" viewBox="0 0 28 12" fill="none">
        <path
          d="M0 6h20M20 6l-5-4M20 6l-5 4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function FlowArrowDown() {
  return (
    <div className="flex justify-center py-2 text-muted-foreground/50" aria-hidden>
      <svg width="12" height="24" viewBox="0 0 12 24" fill="none">
        <path
          d="M6 0v16M6 16l-4-4M6 16l4-4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}

function VercelBadge({ name }: { name: string }) {
  const [open, setOpen] = useState(false);
  const desc = layerGlossary[name];

  return (
    <span className="relative inline-block">
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(!open);
        }}
        className="rounded-full bg-accent/20 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wide text-accent transition-colors hover:bg-accent/40 md:text-[10px]"
      >
        {name}
      </button>
      {open && desc && (
        <span className="absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border border-accent/30 bg-card p-3 text-left text-xs font-normal normal-case leading-relaxed tracking-normal text-foreground/90 shadow-lg">
          <span className="mb-1 block text-[10px] font-bold uppercase text-accent">
            {name}
          </span>
          {desc}
        </span>
      )}
    </span>
  );
}

export function FlowNode({
  label,
  sub,
  vercel,
  href,
  highlight,
  size = "md",
}: PipelineNode & { size?: "sm" | "md" | "lg" }) {
  const inner = (
    <div
      className={cn(
        "relative rounded-xl border text-center transition-all",
        size === "lg" && "min-w-[140px] px-5 py-4",
        size === "md" && "min-w-[100px] px-3 py-3",
        size === "sm" && "min-w-[72px] px-2 py-2",
        highlight
          ? "glow-border border-accent/50 bg-accent/10"
          : "border-border/80 bg-card/80 backdrop-blur-sm hover:border-accent/30",
        href && "cursor-pointer hover:bg-accent/5",
      )}
    >
      <p
        className={cn(
          "font-semibold text-foreground",
          size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs",
        )}
      >
        {label}
      </p>
      {sub && (
        <p className="mt-0.5 font-mono text-[10px] text-muted-foreground md:text-xs">
          {sub}
        </p>
      )}
      {vercel && vercel.length > 0 && (
        <div className="mt-2 flex flex-wrap justify-center gap-1">
          {vercel.map((v) => (
            <VercelBadge key={v} name={v} />
          ))}
        </div>
      )}
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block shrink-0">
        {inner}
      </Link>
    );
  }
  return <div className="shrink-0">{inner}</div>;
}

/** Horizontal left-to-right pipeline */
export function HorizontalPipeline({ nodes }: { nodes: PipelineNode[] }) {
  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex min-w-max items-center justify-center px-2 py-4 md:px-4">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center">
            <FlowNode {...node} />
            {i < nodes.length - 1 && <FlowArrow />}
          </div>
        ))}
      </div>
    </div>
  );
}

/** Hub diagram: sources → hub → fan-out destinations */
export function HubFlow({
  sources,
  hub,
  destinations,
}: {
  sources: PipelineNode[];
  hub: PipelineNode;
  destinations: PipelineNode[];
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-muted/20 p-4 md:p-6">
      <div className="flex flex-wrap justify-center gap-2 md:gap-3">
        {sources.map((s) => (
          <FlowNode key={s.id} {...s} size="sm" />
        ))}
      </div>
      <FlowArrowDown />
      <div className="flex justify-center">
        <FlowNode {...hub} size="lg" highlight />
      </div>
      <div className="relative mx-auto mt-2 flex max-w-lg justify-center">
        <div className="absolute left-1/4 right-1/4 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </div>
      <FlowArrowDown />
      <div className="flex flex-wrap justify-center gap-3">
        {destinations.map((d) => (
          <FlowNode key={d.id} {...d} size="md" highlight={d.highlight} />
        ))}
      </div>
    </div>
  );
}

/** Vertical stack with connectors */
export function VerticalPipeline({ nodes }: { nodes: PipelineNode[] }) {
  return (
    <div className="flex flex-col items-center gap-0">
      {nodes.map((node, i) => (
        <div key={node.id} className="flex flex-col items-center">
          <FlowNode {...node} size="md" highlight={node.highlight} />
          {i < nodes.length - 1 && <FlowArrowDown />}
        </div>
      ))}
    </div>
  );
}

/** Master phase strip — clickable segments */
export function PhaseStrip({
  phases,
  active,
  onSelect,
}: {
  phases: { id: string; label: string; vercel: string }[];
  active: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="overflow-x-auto">
      <div className="flex min-w-max items-stretch gap-1 rounded-2xl border border-border/60 bg-card/40 p-1.5 backdrop-blur md:gap-0 md:p-2">
        {phases.map((p, i) => (
          <div key={p.id} className="flex items-center">
            <button
              type="button"
              onClick={() => onSelect(p.id)}
              className={cn(
                "rounded-xl px-4 py-3 text-left transition-all md:min-w-[120px] md:px-6",
                active === p.id
                  ? "bg-accent/20 ring-1 ring-accent/40"
                  : "hover:bg-muted/50",
              )}
            >
              <p className="text-sm font-bold text-foreground">{p.label}</p>
              <p className="mt-0.5 text-[10px] font-medium uppercase tracking-wider text-accent">
                {p.vercel}
              </p>
            </button>
            {i < phases.length - 1 && (
              <FlowArrow className="hidden md:flex" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
