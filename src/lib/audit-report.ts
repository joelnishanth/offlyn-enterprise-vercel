export type AuditReport = {
  wasteScore: number;
  estimatedSavingsPct: number;
  routingPlan: string[];
  qualityRisks: string[];
};

export function buildAuditReport(
  workflow: string,
  description: string,
): AuditReport {
  const desc = description.toLowerCase();
  let wasteScore = 35;

  if (desc.includes("pdf") || desc.includes("document")) wasteScore += 12;
  if (desc.includes("transcript") || desc.includes("meeting")) wasteScore += 10;
  if (desc.includes("rag") || desc.includes("chunk")) wasteScore += 8;
  if (desc.includes("mcp") || desc.includes("trace")) wasteScore += 7;

  wasteScore = Math.min(92, wasteScore);

  const patterns = [
    "Repeated context across sessions",
    "Full-document retrieval instead of evidence packs",
    "Cloud-first path for tasks suitable for local preprocessing",
  ];

  return {
    wasteScore,
    estimatedSavingsPct: Math.round(wasteScore * 0.85),
    routingPlan: [
      "Local: transcription, chunking, embeddings, classification",
      "Compress: map-reduce summaries and hybrid retrieval",
      `Cloud: evidence-pack synthesis for ${workflow}`,
    ],
    qualityRisks: [
      "Verify citation coverage stays ≥95% after compression",
      "Monitor fallback rate when local confidence < 0.7",
      ...patterns.slice(0, 2),
    ],
  };
}
