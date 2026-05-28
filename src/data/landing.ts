export const hero = {
  eyebrow: "For Enterprise",
  title: "Reduce cloud AI token spend without reducing answer quality.",
  subtitle:
    "Offlyn helps AI teams audit repeated-context workflows, route work between local device models and cloud models, and send cloud models only compact, source-grounded evidence.",
  primaryCta: "Run a Token Savings Audit",
  secondaryCta: "See how Offlyn works",
  footnote:
    "Built from Offlyn's local AI products: Clipper, TerraGuide, Apply, and MLX optimization work.",
};

export const audiences = [
  {
    title: "AI SaaS teams",
    description:
      "Meeting copilots, support agents, research assistants, document Q&A, sales intelligence.",
  },
  {
    title: "Agent infrastructure teams",
    description:
      "Teams using RAG, traces, MCP tools, gateways, observability, and model routing.",
  },
  {
    title: "Enterprise AI teams",
    description:
      "Teams working with private documents, transcripts, logs, manuals, and internal knowledge.",
  },
  {
    title: "Remote-industry teams",
    description:
      "Agriculture, mining, energy, utilities, field service, and disaster response teams with limited connectivity.",
  },
];

export const painPoints = [
  {
    title: "Repeated context",
    description:
      "The same transcripts, documents, logs, and chunks get resent across sessions.",
  },
  {
    title: "Long-context bloat",
    description: "Large PDFs and manuals overflow practical context budgets.",
  },
  {
    title: "Retrieval noise",
    description: "RAG systems often send too many low-relevance chunks.",
  },
  {
    title: "No quality guardrail",
    description:
      "Teams cut tokens but cannot prove citations, recall, or answer quality stayed intact.",
  },
];

export const processSteps = [
  {
    step: "1",
    title: "Audit",
    description:
      "Analyze prompts, traces, retrieved chunks, documents, transcripts, logs, and tool outputs.",
  },
  {
    step: "2",
    title: "Route",
    description:
      "Decide what runs locally, what gets compressed, and what needs cloud reasoning.",
  },
  {
    step: "3",
    title: "Optimize locally",
    description:
      "Local transcription, chunking, summarization, embeddings, hybrid retrieval, first-pass classification.",
  },
  {
    step: "4",
    title: "Escalate with evidence",
    description:
      "Send cloud models only the smallest source-grounded evidence pack needed for the answer.",
  },
  {
    step: "5",
    title: "Measure quality",
    description:
      "Compare tokens, latency, citation coverage, retrieval precision, answer quality, and fallback risk.",
  },
];

export const auditOffering = {
  title: "Start with a paid Token Savings Audit.",
  subtitle:
    "A focused engagement that identifies repeated-context waste and prototypes a quality-preserving local/cloud routing path for one workflow.",
  reviewItems: [
    "Prompts and traces",
    "RAG chunks and retrieval patterns",
    "Meeting transcripts and PDFs",
    "Support logs and MCP tool calls",
    "Cloud model usage patterns",
  ],
  deliverables: [
    "Token waste scorecard",
    "Local/cloud routing plan",
    "Evidence-pack prototype",
    "Quality-risk report",
    "Integration roadmap + optional MCP early access",
  ],
};

export const routingPaths = [
  {
    title: "Local device path",
    items: [
      "MLX Whisper transcription",
      "Local SLM classification",
      "Local embeddings",
      "Sensitive-context checks",
    ],
  },
  {
    title: "Local optimization path",
    items: [
      "Chunking",
      "Map-reduce summaries",
      "Hybrid retrieval",
      "Evidence-pack creation",
    ],
  },
  {
    title: "Cloud escalation path",
    items: [
      "Frontier reasoning",
      "High-stakes synthesis",
      "Low-confidence fallback",
      "Final polished response",
    ],
  },
];

export const comparisonRows = [
  {
    workflow: "300-page PDF Q&A",
    current: "Send or retrieve too much document context.",
    offlyn: "Chunk locally, retrieve relevant sections, send evidence pack.",
  },
  {
    workflow: "Meeting copilot",
    current: "Cloud transcription and repeated cloud summaries.",
    offlyn: "Local transcription/search, cloud only for final synthesis.",
  },
  {
    workflow: "Support log triage",
    current: "Paste full logs into LLMs.",
    offlyn: "Local extraction, clustering, compact root-cause evidence.",
  },
];

export const competitorTable = [
  {
    category: "LLM gateways",
    theyOptimize: "Route model calls",
    offlynAdds: "Smaller, cleaner context before routing",
  },
  {
    category: "Observability",
    theyOptimize: "Track cost and traces",
    offlynAdds: "Recommendations to reduce context waste",
  },
  {
    category: "RAG / vector DBs",
    theyOptimize: "Retrieve chunks",
    offlynAdds: "Quality-aware evidence packing",
  },
  {
    category: "Local runtimes",
    theyOptimize: "Run local models",
    offlynAdds: "Workflow routing between local and cloud",
  },
];

export const workflowOptions = [
  "300-page PDFs / long documents",
  "Meeting transcripts",
  "Support logs",
  "Agent traces",
  "Retrieved RAG chunks",
  "MCP tool calls",
  "Field manuals / remote operations docs",
  "Other",
] as const;
