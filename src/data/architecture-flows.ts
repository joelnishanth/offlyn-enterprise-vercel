import type { PipelineNode } from "@/components/architecture/flow-pipeline";

export type ArchPhaseId = "edge" | "render" | "ai" | "data";

export type ArchPhaseFlow = {
  id: ArchPhaseId;
  label: string;
  tagline: string;
  hub: PipelineNode;
  sources: PipelineNode[];
  destinations: PipelineNode[];
  pipeline: PipelineNode[];
};

export const masterPipeline: PipelineNode[] = [
  { id: "client", label: "Client", sub: "browser" },
  {
    id: "edge",
    label: "Edge",
    sub: "middleware",
    vercel: ["Middleware", "Edge Config"],
    highlight: true,
  },
  {
    id: "render",
    label: "Render",
    sub: "PPR · RSC",
    vercel: ["Cache Components"],
    highlight: true,
  },
  {
    id: "compute",
    label: "Compute",
    sub: "functions",
    vercel: ["Fluid", "AI SDK"],
    highlight: true,
  },
  {
    id: "storage",
    label: "Storage",
    sub: "KV · Blob",
    vercel: ["Workflow"],
    highlight: true,
  },
];

export const phaseFlows: ArchPhaseFlow[] = [
  {
    id: "edge",
    label: "Edge",
    tagline: "Before compute",
    sources: [
      { id: "b", label: "Browser" },
      { id: "api", label: "API" },
      { id: "cron", label: "Cron" },
      { id: "wf", label: "Workflow" },
    ],
    hub: {
      id: "hub",
      label: "Edge Network",
      sub: "<50ms",
      vercel: ["Middleware", "Edge Config"],
    },
    destinations: [
      { id: "geo", label: "Geo", sub: "headers", vercel: ["Middleware"] },
      {
        id: "ab",
        label: "A/B",
        sub: "hero",
        vercel: ["Middleware"],
        highlight: true,
      },
      {
        id: "flags",
        label: "Flags",
        sub: "useLiveAI",
        vercel: ["Edge Config"],
        href: "/audit",
      },
    ],
    pipeline: [
      { id: "1", label: "Request", vercel: ["Edge"] },
      { id: "2", label: "middleware.ts", vercel: ["Middleware"], href: "/" },
      { id: "3", label: "edge-config", vercel: ["Edge Config"] },
      { id: "4", label: "Route", sub: "page · fn · workflow" },
    ],
  },
  {
    id: "render",
    label: "Render",
    tagline: "PPR + islands",
    sources: [
      { id: "r1", label: "/", href: "/" },
      { id: "r2", label: "/audit", href: "/audit" },
      { id: "r3", label: "/workflow", href: "/workflow" },
      { id: "r4", label: "/architecture" },
    ],
    hub: {
      id: "hub",
      label: "Next.js",
      sub: "6 routes",
      vercel: ["PPR", "RSC", "Suspense"],
    },
    destinations: [
      {
        id: "ppr",
        label: "Static shell",
        vercel: ["PPR"],
        highlight: true,
      },
      { id: "stream", label: "Suspense", sub: "forms" },
      { id: "insights", label: "Analytics", vercel: ["Speed Insights"] },
    ],
    pipeline: [
      { id: "1", label: "PPR shell", vercel: ["PPR"], href: "/" },
      { id: "2", label: "RSC", vercel: ["RSC"] },
      { id: "3", label: "Client island", sub: "stream", href: "/audit" },
      { id: "4", label: "Report", sub: "/audit/[id]" },
    ],
  },
  {
    id: "ai",
    label: "AI",
    tagline: "Fluid + models",
    sources: [
      { id: "form", label: "AuditForm" },
      { id: "est", label: "Estimate" },
      { id: "sand", label: "Sandbox" },
    ],
    hub: {
      id: "hub",
      label: "Fluid Compute",
      sub: "3 APIs",
      vercel: ["Server Actions", "AI SDK"],
    },
    destinations: [
      {
        id: "stream",
        label: "streamText",
        sub: "/estimate",
        vercel: ["AI SDK"],
        href: "/audit",
        highlight: true,
      },
      {
        id: "gw",
        label: "Gateway",
        sub: "mock · live",
        vercel: ["AI Gateway"],
      },
      {
        id: "vm",
        label: "Sandbox",
        sub: "microVM",
        vercel: ["Sandbox"],
        href: "/audit",
      },
    ],
    pipeline: [
      {
        id: "1",
        label: "Server Action",
        vercel: ["Actions"],
        href: "/#request-audit",
      },
      { id: "2", label: "/estimate", vercel: ["AI SDK"], href: "/audit" },
      { id: "3", label: "Gateway", vercel: ["Gateway"] },
      { id: "4", label: "Workflow", vercel: ["Workflow SDK"] },
    ],
  },
  {
    id: "data",
    label: "Storage",
    tagline: "Persist + cron",
    sources: [
      { id: "action", label: "Action" },
      { id: "pipe", label: "Pipeline" },
    ],
    hub: {
      id: "hub",
      label: "Vercel Storage",
      sub: "KV + Blob",
      vercel: ["KV", "Blob"],
    },
    destinations: [
      {
        id: "kv",
        label: "KV",
        sub: "audits",
        vercel: ["Redis"],
        highlight: true,
      },
      { id: "blob", label: "Blob", sub: "uploads", vercel: ["Blob"] },
      { id: "cron", label: "Cron", vercel: ["Cron"] },
    ],
    pipeline: [
      { id: "1", label: "submitAudit", vercel: ["KV", "Blob"] },
      { id: "2", label: "audit/[id]", sub: "read" },
      { id: "3", label: "Cron", vercel: ["Cron"] },
      { id: "4", label: "Firewall", sub: "dashboard", vercel: ["Firewall"] },
    ],
  },
];

export const routeFlows: {
  route: string;
  nodes: PipelineNode[];
  href?: string;
}[] = [
  {
    route: "/",
    href: "/",
    nodes: [
      { id: "1", label: "PPR" },
      { id: "2", label: "Middleware", vercel: ["Edge"] },
      { id: "3", label: "Form", vercel: ["Suspense"] },
      { id: "4", label: "Action", vercel: ["KV", "Blob"] },
    ],
  },
  {
    route: "/audit",
    href: "/audit",
    nodes: [
      { id: "1", label: "RSC" },
      { id: "2", label: "Estimate", vercel: ["AI SDK"] },
      { id: "3", label: "Gateway" },
      { id: "4", label: "Sandbox", vercel: ["Sandbox"] },
    ],
  },
  {
    route: "/audit/[id]",
    nodes: [
      { id: "1", label: "Suspense" },
      { id: "2", label: "KV", vercel: ["KV"] },
      { id: "3", label: "Report" },
    ],
  },
];

export const vercelStack: { layer: string; used: string; desc: string }[] = [
  { layer: "Edge Middleware", used: "Geo · A/B", desc: "Runs code at the edge before your page loads. Rewrites, redirects, geo-personalization, A/B tests — all at CDN speed with no cold start." },
  { layer: "Edge Config", used: "useLiveAI", desc: "Ultra-low-latency key-value store read at the edge. Flip feature flags instantly without redeploying." },
  { layer: "Cache Components", used: "PPR", desc: "Partial Prerendering (PPR) — serves a static HTML shell from the CDN instantly, then streams dynamic content into Suspense holes. Static speed + dynamic data in one route." },
  { layer: "Fluid Compute", used: "APIs · Actions", desc: "Serverless functions that scale to zero but keep warm connections alive. Reuses execution context across requests for near-zero cold starts." },
  { layer: "AI SDK", used: "streamText", desc: "Vercel's TypeScript toolkit for LLM integration. streamText streams tokens to the UI in real time; supports tool calling, structured output, and multiple providers." },
  { layer: "AI Gateway", used: "Models", desc: "Unified API layer in front of multiple LLM providers. Handles routing, failover, rate limits, cost tracking, and caching between your app and the model." },
  { layer: "Workflow SDK", used: "Audit pipe", desc: "Durable, multi-step background jobs. Each step is retryable and crash-safe — survives deploys, timeouts, and function restarts." },
  { layer: "KV · Blob", used: "Persistence", desc: "KV: Redis-compatible key-value store for fast reads/writes. Blob: object storage for large files (PDFs, images) with global CDN delivery." },
  { layer: "Sandbox", used: "Tokens", desc: "Isolated Firecracker microVMs for running untrusted code safely. Execute user-submitted prompts or scripts without risking your app." },
];
