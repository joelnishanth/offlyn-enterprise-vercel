export type ArchRow = {
  name: string;
  file: string;
  vercel: string;
  flow?: string;
};

export type ArchStep = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  vercelLayers: string[];
  files?: string[];
  demoLink?: { href: string; label: string };
};

export type ArchitecturePhase = {
  id: "edge" | "render" | "ai" | "data";
  tabLabel: string;
  title: string;
  tagline: string;
  summary: string;
  hubTitle: string;
  hubSubtitle: string;
  hubMetric: string;
  hubMetricLabel: string;
  sourceLabels: string[];
  destBoxes: { title: string; sub: string; accent?: boolean }[];
  steps: ArchStep[];
};

export const architecturePhases: ArchitecturePhase[] = [
  {
    id: "edge",
    tabLabel: "Edge",
    title: "Edge — request path",
    tagline: "Intercept before compute",
    summary:
      "Every request hits Vercel's Edge Network first. Middleware personalizes geo and A/B variants; Edge Config flips feature flags without redeploying—`useLiveAI`, hero copy, and audit toggles.",
    hubTitle: "Edge Network",
    hubSubtitle: "Middleware · Edge Config",
    hubMetric: "<50ms",
    hubMetricLabel: "Typical edge personalization",
    sourceLabels: ["Browser", "API routes", "Cron invocations", "Workflow webhooks"],
    destBoxes: [
      { title: "Geo headers", sub: "x-vercel-ip-country" },
      { title: "A/B hero variant", sub: "x-offlyn-variant", accent: true },
      { title: "Feature flags", sub: "useLiveAI · toggles" },
    ],
    steps: [
      {
        id: "middleware",
        title: "Edge Middleware runs on every request",
        subtitle: "Geo · A/B · security headers",
        detail:
          "middleware.ts sets country/region headers for HeroBanner, assigns hero A/B variant, and excludes `/.well-known/workflow/` from middleware so durable workflows can callback.",
        vercelLayers: ["Edge Middleware"],
        files: ["middleware.ts"],
        demoLink: { href: "/", label: "See geo on homepage" },
      },
      {
        id: "edge-config",
        title: "Edge Config drives live flags",
        subtitle: "No redeploy for useLiveAI",
        detail:
          "lib/edge-config.ts reads boolean flags at the edge. Flip `useLiveAI` in the Vercel dashboard to switch mock → AI Gateway without shipping code.",
        vercelLayers: ["Edge Config"],
        files: ["lib/edge-config.ts"],
        demoLink: { href: "/audit", label: "Try live estimate" },
      },
      {
        id: "routing",
        title: "Request routes to the right surface",
        subtitle: "Pages · Functions · Workflow",
        detail:
          "Static and PPR pages stream from the CDN; API routes and Server Actions run on Fluid Compute; Workflow SDK registers durable steps at `/.well-known/workflow/`.",
        vercelLayers: ["Edge Network", "Routing"],
      },
    ],
  },
  {
    id: "render",
    tabLabel: "Render",
    title: "Render — pages & UI",
    tagline: "PPR shell + streamed islands",
    summary:
      "Next.js 16 Cache Components deliver a fast static shell with Suspense boundaries for dynamic work. Client islands handle forms and AI streaming without sacrificing RSC for marketing content.",
    hubTitle: "Next.js on Vercel",
    hubSubtitle: "Cache Components · RSC · Suspense",
    hubMetric: "6 routes",
    hubMetricLabel: "Demo pages mapped",
    sourceLabels: ["/", "/audit", "/audit/[id]", "/workflow", "/architecture"],
    destBoxes: [
      { title: "PPR static shell", sub: "cacheComponents: true" },
      { title: "Client islands", sub: "forms · streams", accent: true },
      { title: "Speed Insights", sub: "layout.tsx" },
    ],
    steps: [
      {
        id: "home",
        title: "Landing (/) — PPR + Suspense form",
        subtitle: "Cache Components + streamed audit intake",
        detail:
          "app/page.tsx ships a static marketing shell. HeroBanner reads middleware headers; AuditForm streams inside Suspense and posts via Server Action.",
        vercelLayers: ["Cache Components (PPR)", "RSC", "Suspense"],
        files: ["app/page.tsx", "components/landing/audit-form.tsx"],
        demoLink: { href: "/#request-audit", label: "Submit audit" },
      },
      {
        id: "audit-page",
        title: "/audit — AI tools page",
        subtitle: "RSC host + client streaming islands",
        detail:
          "EstimateStream uses AI SDK useCompletion against /api/audit/estimate. SandboxAnalyzer calls /api/sandbox/analyze for microVM token analysis.",
        vercelLayers: ["RSC", "Client Components"],
        files: ["app/audit/page.tsx", "components/audit/estimate-stream.tsx"],
        demoLink: { href: "/audit", label: "Open audit tools" },
      },
      {
        id: "report",
        title: "/audit/[id] — submission + report",
        subtitle: "Dynamic route + KV read",
        detail:
          "Suspense boundary loads audit record from KV and renders submission details plus generated savings report.",
        vercelLayers: ["PPR", "Suspense", "Dynamic Routes"],
        files: ["app/audit/[id]/page.tsx"],
      },
      {
        id: "story-pages",
        title: "/workflow & /architecture — narrative UI",
        subtitle: "Same flow pattern, different story",
        detail:
          "Workflow page tells audit → device SLM. Architecture page (this one) maps every demo path to Vercel layers with phased tabs and highlighted badges.",
        vercelLayers: ["RSC", "Client (tabs)"],
        files: ["app/workflow/page.tsx", "app/architecture/page.tsx"],
        demoLink: { href: "/workflow", label: "See workflow story" },
      },
      {
        id: "observability-ui",
        title: "Global shell — Analytics + Speed Insights",
        subtitle: "layout.tsx wraps all routes",
        detail:
          "Speed Insights and Vercel Web Analytics instrument every page load for demo observability.",
        vercelLayers: ["Speed Insights", "Web Analytics"],
        files: ["app/layout.tsx"],
      },
    ],
  },
  {
    id: "ai",
    tabLabel: "AI & Compute",
    title: "AI & Compute — inference path",
    tagline: "Fluid Compute + AI SDK + Sandbox",
    summary:
      "Server Actions and API routes run on Fluid Compute. AI SDK streamText powers live token estimates; AI Gateway (or mock) routes models; Sandbox runs untrusted prompt analysis in isolation.",
    hubTitle: "Fluid Compute",
    hubSubtitle: "Server Actions · API Routes · Workflow steps",
    hubMetric: "3 APIs",
    hubMetricLabel: "Estimate · Sandbox · Cron",
    sourceLabels: ["AuditForm", "EstimateStream", "SandboxAnalyzer", "Workflow trigger"],
    destBoxes: [
      { title: "AI SDK streamText", sub: "/api/audit/estimate", accent: true },
      { title: "AI Gateway / Mock", sub: "useLiveAI flag" },
      { title: "Sandbox microVM", sub: "token analysis" },
    ],
    steps: [
      {
        id: "server-action",
        title: "submitAudit Server Action",
        subtitle: "Zod validation → KV + Blob",
        detail:
          "app/actions/submit-audit.ts validates the enterprise form, stores uploads in Blob, writes audit record to KV, and optionally triggers Workflow when Redis is configured.",
        vercelLayers: ["Server Actions", "Fluid Compute", "Zod"],
        files: ["app/actions/submit-audit.ts"],
        demoLink: { href: "/#request-audit", label: "Run intake" },
      },
      {
        id: "estimate",
        title: "POST /api/audit/estimate — streaming estimate",
        subtitle: "AI SDK useCompletion",
        detail:
          "streamText from AI SDK with mock provider by default. Edge Config `useLiveAI` switches to AI Gateway when keys are set.",
        vercelLayers: ["Fluid Compute", "AI SDK", "AI Gateway"],
        files: ["app/api/audit/estimate/route.ts", "lib/ai/gateway.ts"],
        demoLink: { href: "/audit", label: "Live Token Estimate" },
      },
      {
        id: "sandbox",
        title: "POST /api/sandbox/analyze — isolated analysis",
        subtitle: "Vercel Sandbox microVM",
        detail:
          "Pasted prompts run in a Sandbox for token counting and waste heuristics without trusting client-side math.",
        vercelLayers: ["Fluid Compute", "Vercel Sandbox"],
        files: ["app/api/sandbox/analyze/route.ts", "lib/sandbox/analyze.ts"],
        demoLink: { href: "/audit", label: "Sandbox analyzer" },
      },
      {
        id: "workflow",
        title: "runAuditPipeline — durable steps",
        subtitle: "Workflow SDK use workflow / use step",
        detail:
          "workflows/audit-pipeline.ts orchestrates analyze → report → KV update. With Upstash Redis, steps survive retries; without Redis, Server Action completes inline.",
        vercelLayers: ["Workflow SDK", "Fluid Compute"],
        files: ["src/workflows/audit-pipeline.ts"],
      },
    ],
  },
  {
    id: "data",
    tabLabel: "Storage",
    title: "Storage & durability",
    tagline: "KV · Blob · Cron · dashboard ops",
    summary:
      "Audit submissions persist in KV (Upstash Redis or in-memory fallback). File uploads land in Vercel Blob. Cron can nudge follow-ups. Firewall, BotID, and Rolling Releases are configured in the Vercel dashboard.",
    hubTitle: "Vercel Storage",
    hubSubtitle: "KV · Blob · Cron",
    hubMetric: "2 stores",
    hubMetricLabel: "KV + Blob in demo",
    sourceLabels: ["Server Action", "Workflow steps", "Cron scheduler"],
    destBoxes: [
      { title: "KV audit records", sub: "lib/kv.ts", accent: true },
      { title: "Blob uploads", sub: "lib/blob.ts" },
      { title: "Cron follow-up", sub: "/api/cron/followup" },
    ],
    steps: [
      {
        id: "kv",
        title: "KV — audit records & rate limits",
        subtitle: "Upstash Redis or in-memory fallback",
        detail:
          "lib/kv.ts abstracts Redis. Production with Upstash enables Workflow callbacks; local dev falls back to in-memory so the demo still runs.",
        vercelLayers: ["KV (Upstash Redis)"],
        files: ["lib/kv.ts"],
      },
      {
        id: "blob",
        title: "Blob — enterprise file uploads",
        subtitle: "Optional attachments on audit form",
        detail:
          "Large context samples (logs, PDFs) upload to Vercel Blob from the Server Action before analysis.",
        vercelLayers: ["Vercel Blob"],
        files: ["lib/blob.ts"],
      },
      {
        id: "cron",
        title: "Cron — scheduled follow-up",
        subtitle: "GET /api/cron/followup",
        detail:
          "vercel.json cron invokes the follow-up route for nurture-style automation in a real deployment.",
        vercelLayers: ["Cron Jobs"],
        files: ["app/api/cron/followup/route.ts"],
      },
      {
        id: "dashboard",
        title: "Dashboard-only platform layers",
        subtitle: "Firewall · BotID · Rolling Releases · Agent",
        detail:
          "Documented in docs/FIREWALL.md and docs/ROLLING_RELEASES.md—configure in Vercel dashboard for production hardening and staged rollouts.",
        vercelLayers: ["Firewall", "BotID", "Rolling Releases", "Vercel Agent"],
        files: ["docs/FIREWALL.md", "docs/ROLLING_RELEASES.md"],
      },
    ],
  },
];

export const vercelLayerMetrics = [
  { label: "Edge Middleware", value: "Geo · A/B" },
  { label: "Edge Config", value: "useLiveAI flag" },
  { label: "Cache Components", value: "PPR shell" },
  { label: "Fluid Compute", value: "Actions · APIs" },
  { label: "AI SDK + Gateway", value: "streamText" },
  { label: "Workflow SDK", value: "Durable audit" },
  { label: "KV + Blob", value: "Audit persistence" },
  { label: "Sandbox", value: "Prompt analysis" },
] as const;

export const inventorySections = [
  { title: "Pages", rows: "pages" },
  { title: "API & server", rows: "apiRoutes" },
  { title: "Components", rows: "components" },
  { title: "Lib modules", rows: "libs" },
] as const;

// Reference tables (used by inventory grid)
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
    vercel: "RSC + Client",
    flow: "Phased Vercel layer map",
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
    name: "EnterpriseArchitecture",
    file: "components/architecture/enterprise-architecture.tsx",
    vercel: "Client (phase tabs)",
    flow: "/architecture — Vercel map",
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

export const inventoryByKey = {
  pages,
  apiRoutes,
  components,
  libs,
} as const;
