"use server";

import { z } from "zod";
import { start } from "workflow/api";
import { uploadAuditAttachment } from "@/lib/blob";
import { buildAuditReport } from "@/lib/audit-report";
import {
  checkRateLimit,
  saveAuditRecord,
  updateAuditRecord,
  type AuditRecord,
} from "@/lib/kv";
import { runAuditPipeline } from "@/workflows/audit-pipeline";

const auditSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  company: z.string().min(2).max(100),
  workflow: z.string().min(1),
  description: z.string().min(20).max(5000),
  notifyMcp: z.coerce.boolean().optional().default(false),
});

export type SubmitAuditState = {
  ok: boolean;
  message: string;
  auditId?: string;
  errors?: Record<string, string[]>;
};

export async function submitAudit(
  _prev: SubmitAuditState,
  formData: FormData,
): Promise<SubmitAuditState> {
  const raw = {
    name: formData.get("name"),
    email: formData.get("email"),
    company: formData.get("company"),
    workflow: formData.get("workflow"),
    description: formData.get("description"),
    notifyMcp: formData.get("notifyMcp") === "on",
  };

  const parsed = auditSchema.safeParse(raw);
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please fix the errors below.",
      errors: parsed.error.flatten().fieldErrors,
    };
  }

  const email = parsed.data.email.toLowerCase();
  const { allowed, remaining } = await checkRateLimit(`audit:${email}`);
  if (!allowed) {
    return {
      ok: false,
      message: `Rate limit exceeded. Try again in a minute. (${remaining} remaining)`,
    };
  }

  const auditId = crypto.randomUUID();
  const record: AuditRecord = {
    id: auditId,
    ...parsed.data,
    notifyMcp: parsed.data.notifyMcp ?? false,
    createdAt: new Date().toISOString(),
    status: "pending",
  };

  const attachment = formData.get("attachment");
  if (attachment instanceof File && attachment.size > 0) {
    await uploadAuditAttachment(attachment, auditId);
  }

  await saveAuditRecord(record);

  // Complete report immediately so the audit page works without Workflow + Redis.
  // Workflow still runs in the background when the runtime is available (durable replay demo).
  const report = buildAuditReport(parsed.data.workflow, parsed.data.description);
  await updateAuditRecord(auditId, { status: "complete", report });

  try {
    await start(runAuditPipeline, [
      {
        auditId,
        workflow: parsed.data.workflow,
        description: parsed.data.description,
      },
    ]);
  } catch (error) {
    console.warn("[submitAudit] Workflow start skipped:", error);
  }

  return {
    ok: true,
    message: "Request received. We'll reach out to schedule your token savings audit.",
    auditId,
  };
}
