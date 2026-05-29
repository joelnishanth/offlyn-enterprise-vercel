import { FatalError } from "workflow";
import { buildAuditReport } from "@/lib/audit-report";
import { updateAuditRecord } from "@/lib/kv";

export type AuditPipelineInput = {
  auditId: string;
  workflow: string;
  description: string;
};

export async function runAuditPipeline(input: AuditPipelineInput) {
  "use workflow";

  await markProcessing(input.auditId);
  const report = await analyzeWorkflow(input);
  await persistReport(input.auditId, report);

  return { auditId: input.auditId, status: "complete" as const, report };
}

async function markProcessing(auditId: string) {
  "use step";

  await updateAuditRecord(auditId, { status: "processing" });
}

async function analyzeWorkflow(input: AuditPipelineInput) {
  "use step";
  return buildAuditReport(input.workflow, input.description);
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
