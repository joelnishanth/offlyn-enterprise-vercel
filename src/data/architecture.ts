export type ArchRow = {
  name: string;
  file: string;
  vercel: string;
  flow?: string;
};

export const systemFlow = [
  { from: "Edge Middleware", to: "Pages", layer: "Edge" },
  { from: "Edge Config", to: "Feature flags", layer: "Edge" },
  { from: "/", to: "Server Action", layer: "Fluid Compute" },
  { from: "Server Action", to: "KV + Blob + Workflow", layer: "Storage + Durable" },
  { from: "/audit", to: "AI SDK stream", layer: "Fluid Compute" },
  { from: "/audit", to: "Sandbox API", layer: "Sandbox" },
  { from: "/audit/[id]", to: "KV read", layer: "Storage" },
] as const;

export const pages: ArchRow[] = [
  {
    name: "/",
    file: "app/page.tsx",
    vercel: "Cache Components (PPR), RSC, Suspense",
    flow: "Static shell → streamed form (Edge Config flags)",
  },
  {
    name: "/audit",
    file: "app/audit/page.tsx",
    vercel: "RSC + Client islands",
    flow: "EstimateStream + SandboxAnalyzer",
  },
  {
    name: "/audit/[id]",
    file: "app/audit/[id]/page.tsx",
    vercel: "PPR + Suspense, dynamic",
    flow: "KV → submission + report UI",
  },
  {
    name: "/architecture",
    file: "app/architecture/page.tsx",
    vercel: "RSC (static)",
    flow: "Vercel layer reference",
  },
  {
    name: "/workflow",
    file: "app/workflow/page.tsx",
    vercel: "RSC + Client",
    flow: "Audit layer → device SLM story",
  },
  {
    name: "layout",
    file: "app/layout.tsx",
    vercel: "Speed Insights, Analytics",
    flow: "Global shell + fonts",
  },
];

export const apiRoutes: ArchRow[] = [
  {
    name: "submitAudit",
    file: "app/actions/submit-audit.ts",
    vercel: "Server Actions, Zod",
    flow: "Form → KV + Blob (+ Workflow if Redis)",
  },
  {
    name: "POST /api/audit/estimate",
    file: "app/api/audit/estimate/route.ts",
    vercel: "Fluid Compute, AI SDK streamText",
    flow: "useCompletion → mock or AI Gateway",
  },
  {
    name: "POST /api/sandbox/analyze",
    file: "app/api/sandbox/analyze/route.ts",
    vercel: "Fluid Compute, Sandbox",
    flow: "Pasted prompt → microVM analysis",
  },
  {
    name: "GET /api/cron/followup",
    file: "app/api/cron/followup/route.ts",
    vercel: "Cron Jobs",
    flow: "Scheduled follow-up hook",
  },
  {
    name: "runAuditPipeline",
    file: "workflows/audit-pipeline.ts",
    vercel: "Workflow SDK",
    flow: "use workflow / use step → KV",
  },
];

export const components: ArchRow[] = [
  {
    name: "SiteHeader",
    file: "components/site-header.tsx",
    vercel: "RSC",
    flow: "All pages",
  },
  {
    name: "HeroBanner",
    file: "components/landing/hero-banner.tsx",
    vercel: "RSC + Middleware headers",
    flow: "/ — geo, A/B variant",
  },
  {
    name: "sections.tsx",
    file: "components/landing/sections.tsx",
    vercel: "RSC (PPR shell)",
    flow: "/ — marketing blocks",
  },
  {
    name: "AuditForm",
    file: "components/landing/audit-form.tsx",
    vercel: "Client → Server Action",
    flow: "/ — KV, Blob, Workflow",
  },
  {
    name: "EstimateStream",
    file: "components/audit/estimate-stream.tsx",
    vercel: "Client, AI SDK useCompletion",
    flow: "/audit — streaming estimate",
  },
  {
    name: "SandboxAnalyzer",
    file: "components/audit/sandbox-analyzer.tsx",
    vercel: "Client → Sandbox API",
    flow: "/audit — token analysis",
  },
  {
    name: "ArchitecturePage",
    file: "components/architecture/architecture-view.tsx",
    vercel: "RSC",
    flow: "/architecture",
  },
  {
    name: "EnterpriseWorkflow",
    file: "components/workflow/enterprise-workflow.tsx",
    vercel: "Client (phase tabs)",
    flow: "/workflow — audit → SLM story",
  },
  {
    name: "PlatformLayers",
    file: "components/platform-layers.tsx",
    vercel: "RSC checklist",
    flow: "/, /audit",
  },
];

export const libs: ArchRow[] = [
  { name: "edge-config", file: "lib/edge-config.ts", vercel: "Edge Config" },
  { name: "kv", file: "lib/kv.ts", vercel: "Upstash Redis (KV)" },
  { name: "blob", file: "lib/blob.ts", vercel: "Vercel Blob" },
  { name: "gateway", file: "lib/ai/gateway.ts", vercel: "AI Gateway" },
  { name: "mock-provider", file: "lib/ai/mock-provider.ts", vercel: "AI SDK (mock)" },
  { name: "sandbox/analyze", file: "lib/sandbox/analyze.ts", vercel: "Vercel Sandbox" },
  { name: "audit-report", file: "lib/audit-report.ts", vercel: "Server (shared logic)" },
  { name: "middleware", file: "middleware.ts", vercel: "Edge Middleware" },
];

export const pageFlows = {
  home: [
    "PPR static shell",
    "HeroBanner ← Middleware (geo, A/B)",
    "sections.tsx",
    "Suspense → AuditForm",
    "Server Action → KV, Blob, Workflow",
  ],
  audit: [
    "audit/page (RSC)",
    "EstimateStream → /api/audit/estimate",
    "streamText → Gateway / Mock",
    "SandboxAnalyzer → /api/sandbox/analyze",
    "Sandbox microVM",
  ],
  auditId: ["audit/[id] + Suspense", "getAuditRecord (KV)", "Submission + Report UI"],
} as const;
