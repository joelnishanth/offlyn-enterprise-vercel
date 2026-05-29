import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getAuditRecord } from "@/lib/kv";

export default function AuditResultPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  return (
    <Suspense fallback={<AuditResultSkeleton />}>
      <AuditResultContent params={params} />
    </Suspense>
  );
}

async function AuditResultContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const record = await getAuditRecord(id);

  if (!record) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← Home
      </Link>

      <h1 className="mt-4 text-2xl font-bold">Audit Report</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {record.company} · {record.workflow} · Status:{" "}
        <span className="font-medium text-foreground">{record.status}</span>
      </p>

      <section className="mt-8 rounded-xl border border-border bg-card p-6">
        <h2 className="font-semibold">Your submission</h2>
        <dl className="mt-4 space-y-3 text-sm">
          <Row label="Name" value={record.name} />
          <Row label="Email" value={record.email} />
          <Row label="Company" value={record.company} />
          <Row label="Workflow" value={record.workflow} />
          <Row label="Submitted" value={new Date(record.createdAt).toLocaleString()} />
          {record.notifyMcp && (
            <Row label="MCP waitlist" value="Yes — notify when Token Audit MCP opens" />
          )}
        </dl>
        <div className="mt-4">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Use-case description
          </p>
          <p className="mt-2 whitespace-pre-wrap text-sm leading-relaxed text-foreground">
            {record.description}
          </p>
        </div>
      </section>

      {record.status === "pending" || record.status === "processing" ? (
        <div className="mt-6 rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Workflow pipeline is running. Refresh this page in a few seconds.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            If this stays pending, submit a new audit — reports now complete on submit.
          </p>
        </div>
      ) : record.report ? (
        <div className="mt-6 space-y-6">
          <Metric
            label="Token waste score"
            value={`${record.report.wasteScore}/100`}
          />
          <Metric
            label="Estimated savings"
            value={`${record.report.estimatedSavingsPct}%`}
          />
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Routing plan</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {record.report.routingPlan.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <h2 className="font-semibold">Quality risks</h2>
            <ul className="mt-3 space-y-2 text-muted-foreground">
              {record.report.qualityRisks.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        </div>
      ) : (
        <p className="mt-6 text-muted-foreground">No report available yet.</p>
      )}
    </main>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="font-medium text-foreground">{value}</dd>
    </div>
  );
}

function AuditResultSkeleton() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12 md:px-6">
      <div className="h-8 w-48 animate-pulse rounded bg-muted" />
      <div className="mt-8 h-40 animate-pulse rounded-xl bg-muted" />
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-1 text-3xl font-bold text-accent">{value}</p>
    </div>
  );
}
