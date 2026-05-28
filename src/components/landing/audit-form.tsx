"use client";

import { useActionState } from "react";
import { submitAudit, type SubmitAuditState } from "@/app/actions/submit-audit";
import { workflowOptions } from "@/data/landing";

const initialState: SubmitAuditState = { ok: false, message: "" };

export function AuditForm({ showWaitlist }: { showWaitlist: boolean }) {
  const [state, action, pending] = useActionState(submitAudit, initialState);

  if (state.ok && state.auditId) {
    return (
      <div className="glow-border rounded-xl border border-border bg-card p-8 text-center">
        <h3 className="text-xl font-semibold text-foreground">Request received</h3>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
        <p className="mt-4 text-sm text-muted-foreground">
          Track your audit:{" "}
          <a href={`/audit/${state.auditId}`} className="text-accent underline">
            /audit/{state.auditId.slice(0, 8)}…
          </a>
        </p>
      </div>
    );
  }

  return (
    <form
      id="request-audit"
      action={action}
      className="glow-border space-y-4 rounded-xl border border-border bg-card p-6 md:p-8"
    >
      <h3 className="text-xl font-semibold">Request Token Savings Audit</h3>
      {!state.ok && state.message && (
        <p className="text-sm text-red-400">{state.message}</p>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Name" name="name" error={state.errors?.name} />
        <Field label="Work email" name="email" type="email" error={state.errors?.email} />
        <Field label="Company" name="company" error={state.errors?.company} className="md:col-span-2" />
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Workflow to audit</label>
        <select
          name="workflow"
          required
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
        >
          <option value="">Select a workflow</option>
          {workflowOptions.map((w) => (
            <option key={w} value={w}>
              {w}
            </option>
          ))}
        </select>
        {state.errors?.workflow && (
          <p className="mt-1 text-sm text-red-400">{state.errors.workflow[0]}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">Use-case description</label>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Describe your repeated-context workflow, RAG setup, or agent traces..."
          className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
        />
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-400">{state.errors.description[0]}</p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Attachment (PDF/transcript, optional)
        </label>
        <input
          type="file"
          name="attachment"
          accept=".pdf,.txt,.md,.json"
          className="w-full text-sm text-muted-foreground"
        />
      </div>

      {showWaitlist && (
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="notifyMcp" className="rounded" />
          Also notify me when Token Audit MCP early access opens
        </label>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full rounded-lg bg-primary py-3 font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Submitting…" : "Request Token Savings Audit"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  error,
  className = "",
}: {
  label: string;
  name: string;
  type?: string;
  error?: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1 block text-sm font-medium">{label}</label>
      <input
        name={name}
        type={type}
        required
        className="w-full rounded-lg border border-border bg-muted px-3 py-2 text-foreground"
      />
      {error && <p className="mt-1 text-sm text-red-400">{error[0]}</p>}
    </div>
  );
}
