export type FlowStep = {
  id: string;
  title: string;
  subtitle: string;
  detail: string;
  vercel?: string;
  demoLink?: { href: string; label: string };
};

export type WorkflowPhase = {
  id: "audit-layer" | "device-slm";
  title: string;
  tagline: string;
  summary: string;
  savingsLabel: string;
  savingsValue: string;
  steps: FlowStep[];
};

export const workflowPhases: WorkflowPhase[] = [
  {
    id: "audit-layer",
    title: "Phase 1 — Token Savings Audit Layer",
    tagline: "Sit between your app and cloud inference",
    summary:
      "Every LLM request passes through Offlyn's audit layer before it reaches OpenAI, Anthropic, or your GPU cluster. The layer captures prompts, traces, RAG chunks, and tool outputs—finds repeated context—and recommends what should stay local vs. what deserves cloud reasoning.",
    savingsLabel: "Typical cloud token reduction",
    savingsValue: "38–52%",
    steps: [
      {
        id: "ingress",
        title: "Enterprise apps send inference traffic",
        subtitle: "Copilots, agents, RAG, MCP tools",
        detail:
          "Meeting copilots, support agents, and document Q&A resend full transcripts, PDFs, and log dumps on every turn.",
      },
      {
        id: "intercept",
        title: "Offlyn audit layer intercepts",
        subtitle: "Context optimization before the model",
        detail:
          "Not a gateway replacement—Offlyn decides what context should reach the model at all. Deduplicate, chunk, score relevance, build evidence packs.",
        vercel: "Edge Middleware · Fluid Compute · AI SDK stream",
        demoLink: { href: "/audit", label: "Try live estimate" },
      },
      {
        id: "analyze",
        title: "Analyze & score waste",
        subtitle: "Repeated-context scorecard",
        detail:
          "Token waste score, routing plan (local / compress / cloud), and quality guardrails—citation coverage, fallback risk, token budget.",
        vercel: "Workflow SDK · KV · Server Actions",
        demoLink: { href: "/audit", label: "Run sandbox analyzer" },
      },
      {
        id: "route",
        title: "Route to cloud or hold back",
        subtitle: "Smaller, source-grounded payloads",
        detail:
          "Cloud models receive only compact evidence packs for synthesis—not the full 300-page PDF or entire trace history every time.",
        vercel: "AI Gateway · Fluid Compute",
      },
      {
        id: "report",
        title: "Savings report to enterprise",
        subtitle: "ROI your platform team trusts",
        detail:
          "Executive-ready metrics: tokens avoided, $/month estimate, quality risks, and a pilot routing plan for one workflow.",
        vercel: "PPR · Speed Insights",
        demoLink: { href: "/#request-audit", label: "Request audit" },
      },
    ],
  },
  {
    id: "device-slm",
    title: "Phase 2 — On-Device SLM from audit data",
    tagline: "Turn repeat patterns into local models",
    summary:
      "Audit data reveals which prompts and tasks repeat across your org. Offlyn uses that signal to fine-tune a small language model (SLM) for basic tasks—classification, chunking, first-pass summaries—deployed on user devices via MLX. Cloud stays for high-stakes reasoning only.",
    savingsLabel: "Additional savings on repeat tasks",
    savingsValue: "+25–40%",
    steps: [
      {
        id: "patterns",
        title: "Extract repeat patterns from audits",
        subtitle: "Sample data → training corpus",
        detail:
          "Aggregated prompts, traces, and routing decisions become a curated dataset: what users ask again and again, and what local preprocessing already handled well.",
        vercel: "Blob · KV · Workflow",
      },
      {
        id: "train",
        title: "Train / adapt a small language model",
        subtitle: "MLX · on-device footprint",
        detail:
          "Fine-tune or distill an SLM for your top repeat workflows—meeting triage, log clustering, doc chunk labels—not frontier reasoning.",
      },
      {
        id: "deploy",
        title: "Deploy to enterprise devices",
        subtitle: "Clipper · TerraGuide · field apps",
        detail:
          "Ship the SLM to Mac/iOS devices in your fleet. Sensitive context stays on-device; cloud is escalated only when confidence is low.",
      },
      {
        id: "hybrid",
        title: "Hybrid routing in production",
        subtitle: "Local when possible, cloud when quality needs it",
        detail:
          "Same quality gate as Phase 1: citation coverage, privacy, latency, token budget. Device SLM handles the bulk; cloud handles synthesis.",
      },
      {
        id: "measure",
        title: "Measure combined savings",
        subtitle: "Audit layer + device SLM",
        detail:
          "Example: 45% fewer cloud tokens from context optimization, plus 30% of remaining basic tasks on-device—compound savings without sacrificing answer quality.",
        vercel: "Observability · Drains",
        demoLink: { href: "/architecture", label: "See Vercel map" },
      },
    ],
  },
];

export const combinedMetrics = [
  { label: "Cloud tokens avoided (audit layer)", value: "38–52%" },
  { label: "Repeat tasks moved on-device (SLM)", value: "25–40%" },
  { label: "Compound scenario (illustrative)", value: "up to ~60%" },
  { label: "Quality guardrail", value: "≥95% citation target" },
];
