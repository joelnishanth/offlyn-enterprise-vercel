import Link from "next/link";
import {
  apiRoutes,
  components,
  libs,
  pageFlows,
  pages,
  systemFlow,
} from "@/data/architecture";

function FlowList({ steps }: { steps: readonly string[] }) {
  return (
    <ol className="space-y-2">
      {steps.map((step, i) => (
        <li key={step} className="flex items-start gap-3 text-sm">
          <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-xs font-medium text-accent">
            {i + 1}
          </span>
          <span className="text-muted-foreground">{step}</span>
        </li>
      ))}
    </ol>
  );
}

function ArchTable({ rows }: { rows: { name: string; file: string; vercel: string; flow?: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/40 text-muted-foreground">
            <th className="px-4 py-3 font-medium">Name</th>
            <th className="px-4 py-3 font-medium">File</th>
            <th className="px-4 py-3 font-medium">Vercel layer</th>
            <th className="px-4 py-3 font-medium">Flow</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name + row.file} className="border-b border-border/60 last:border-0">
              <td className="px-4 py-3 font-medium text-foreground">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                {row.file}
              </td>
              <td className="px-4 py-3 text-accent">{row.vercel}</td>
              <td className="px-4 py-3 text-muted-foreground">{row.flow ?? "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SystemOverview() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {systemFlow.map((edge) => (
        <div
          key={edge.from + edge.to}
          className="rounded-lg border border-border bg-card p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {edge.layer}
          </p>
          <p className="mt-2 text-sm font-medium text-foreground">{edge.from}</p>
          <p className="text-muted-foreground">↓</p>
          <p className="text-sm text-accent">{edge.to}</p>
        </div>
      ))}
    </div>
  );
}

export function ArchitectureView() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12 md:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Home
      </Link>

      <h1 className="mt-4 text-3xl font-bold">Vercel Architecture</h1>
      <p className="mt-2 max-w-2xl text-muted-foreground">
        Every page and component mapped to the Vercel platform layer it demonstrates.
        Use this as an interview walkthrough for the Offlyn Enterprise demo.
      </p>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">System overview</h2>
        <SystemOverview />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Pages</h2>
        <ArchTable rows={pages} />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">API & server</h2>
        <ArchTable rows={apiRoutes} />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Components</h2>
        <ArchTable rows={components} />
      </section>

      <section className="mt-10 space-y-4">
        <h2 className="text-xl font-semibold">Lib modules</h2>
        <ArchTable rows={libs} />
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-accent">/ (landing)</h3>
          <div className="mt-4">
            <FlowList steps={pageFlows.home} />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-accent">/audit</h3>
          <div className="mt-4">
            <FlowList steps={pageFlows.audit} />
          </div>
        </div>
        <div className="rounded-xl border border-border bg-card p-5">
          <h3 className="font-semibold text-accent">/audit/[id]</h3>
          <div className="mt-4">
            <FlowList steps={pageFlows.auditId} />
          </div>
        </div>
      </section>

      <section className="mt-10 rounded-xl border border-dashed border-border bg-muted/20 p-6 text-sm text-muted-foreground">
        <p>
          <span className="font-medium text-foreground">Dashboard-only layers:</span>{" "}
          Firewall, BotID, Rolling Releases, Vercel Agent — see{" "}
          <code className="rounded bg-muted px-1">docs/FIREWALL.md</code> and{" "}
          <code className="rounded bg-muted px-1">docs/ROLLING_RELEASES.md</code>
        </p>
      </section>
    </main>
  );
}
