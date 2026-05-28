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

      {record.status === "pending" || record.status === "processing" ? (
        <div className="mt-8 rounded-xl border border-border bg-card p-8 text-center">
          <p className="text-muted-foreground">
            Workflow pipeline is running. Refresh in a few seconds.
          </p>
          <p className="mt-2 text-xs text-muted-foreground">
            Powered by Workflow SDK durable execution
          </p>
        </div>
      ) : record.report ? (
        <div className="mt-8 space-y-6">
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
        <p className="mt-8 text-muted-foreground">No report available yet.</p>
      )}
    </main>
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
