import { FatalError } from "workflow";
import { updateAuditRecord } from "@/lib/kv";

export type AuditPipelineInput = {
  auditId: string;
  workflow: string;
  description: string;
};

export async function runAuditPipeline(input: AuditPipelineInput) {
  "use workflow";

  await markProcessing(input.auditId);
  const analysis = await analyzeWorkflow(input);
  const report = await generateReport(analysis);
  await persistReport(input.auditId, report);

  return { auditId: input.auditId, status: "complete" as const, report };
}

async function markProcessing(auditId: string) {
  "use step";

  await updateAuditRecord(auditId, { status: "processing" });
}

async function analyzeWorkflow(input: AuditPipelineInput) {
  "use step";

  const desc = input.description.toLowerCase();
  let wasteScore = 35;

  if (desc.includes("pdf") || desc.includes("document")) wasteScore += 12;
  if (desc.includes("transcript") || desc.includes("meeting")) wasteScore += 10;
  if (desc.includes("rag") || desc.includes("chunk")) wasteScore += 8;
  if (desc.includes("mcp") || desc.includes("trace")) wasteScore += 7;

  wasteScore = Math.min(92, wasteScore);

  return {
    wasteScore,
    workflow: input.workflow,
    patterns: [
      "Repeated context across sessions",
      "Full-document retrieval instead of evidence packs",
      "Cloud-first path for tasks suitable for local preprocessing",
    ],
  };
}

async function generateReport(analysis: {
  wasteScore: number;
  workflow: string;
  patterns: string[];
}) {
  "use step";

  const estimatedSavingsPct = Math.round(analysis.wasteScore * 0.85);

  return {
    wasteScore: analysis.wasteScore,
    estimatedSavingsPct,
    routingPlan: [
      "Local: transcription, chunking, embeddings, classification",
      "Compress: map-reduce summaries and hybrid retrieval",
      `Cloud: evidence-pack synthesis for ${analysis.workflow}`,
    ],
    qualityRisks: [
      "Verify citation coverage stays ≥95% after compression",
      "Monitor fallback rate when local confidence < 0.7",
      ...analysis.patterns.slice(0, 2),
    ],
  };
}

async function persistReport(
  auditId: string,
  report: {
    wasteScore: number;
    estimatedSavingsPct: number;
    routingPlan: string[];
    qualityRisks: string[];
  },
) {
  "use step";

  const updated = await updateAuditRecord(auditId, {
    status: "complete",
    report,
  });

  if (!updated) {
    throw new FatalError(`Audit record not found: ${auditId}`);
  }

  return updated;
}
