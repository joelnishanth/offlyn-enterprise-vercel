import {
  audiences,
  auditOffering,
  comparisonRows,
  competitorTable,
  painPoints,
  processSteps,
  routingPaths,
} from "@/data/landing";

export function AudiencesSection() {
  return (
    <Section title="Built for AI teams with repeated-context costs.">
      <div className="grid gap-4 md:grid-cols-2">
        {audiences.map((a) => (
          <Card key={a.title} title={a.title} description={a.description} />
        ))}
      </div>
    </Section>
  );
}

export function PainSection() {
  return (
    <Section title="AI products waste tokens by sending the same context again and again.">
      <p className="mb-6 text-muted-foreground">
        Cloud models often receive full transcripts, long PDFs, support logs, web pages,
        tool outputs, or too many RAG chunks — even when most of that context is repeated,
        low relevance, or better processed locally first.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {painPoints.map((p) => (
          <Card key={p.title} title={p.title} description={p.description} />
        ))}
      </div>
    </Section>
  );
}

export function ProcessSection() {
  return (
    <Section title="Audit. Route. Evidence-pack. Measure.">
      <ol className="space-y-6">
        {processSteps.map((s) => (
          <li key={s.step} className="flex gap-4">
            <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-primary/20 text-sm font-bold text-accent">
              {s.step}
            </span>
            <div>
              <h3 className="font-semibold">{s.title}</h3>
              <p className="mt-1 text-muted-foreground">{s.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function AuditOfferingSection() {
  return (
    <Section title={auditOffering.title}>
      <p className="mb-8 text-muted-foreground">{auditOffering.subtitle}</p>
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h3 className="mb-3 font-semibold">What we review</h3>
          <ul className="space-y-2 text-muted-foreground">
            {auditOffering.reviewItems.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-3 font-semibold">What you get</h3>
          <ul className="space-y-2 text-muted-foreground">
            {auditOffering.deliverables.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-accent">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}

export function RoutingSection() {
  return (
    <Section title="Local when possible. Cloud when it improves quality.">
      <p className="mb-8 text-muted-foreground">
        Offlyn does not force every task offline. It routes each step based on context
        size, privacy, latency, local model availability, token budget, and answer-quality
        risk.
      </p>
      <div className="grid gap-6 md:grid-cols-3">
        {routingPaths.map((path) => (
          <div
            key={path.title}
            className="rounded-xl border border-border bg-card p-6"
          >
            <h3 className="font-semibold text-accent">{path.title}</h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {path.items.map((item) => (
                <li key={item}>• {item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <p className="mt-8 rounded-lg border border-border bg-muted/50 p-4 text-center text-sm">
        <span className="font-medium text-foreground">Quality Gate:</span> Citation
        coverage · Confidence · Privacy · Latency · Token budget · Fallback risk
      </p>
      <p className="mt-4 text-center text-muted-foreground">
        Offlyn does not replace your LLM gateway. It improves what reaches the gateway.
      </p>
    </Section>
  );
}

export function ComparisonSection() {
  return (
    <Section title="Where customers feel the pain first.">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-3 pr-4">Workflow</th>
              <th className="py-3 pr-4">Current pattern</th>
              <th className="py-3">Offlyn pattern</th>
            </tr>
          </thead>
          <tbody>
            {comparisonRows.map((row) => (
              <tr key={row.workflow} className="border-b border-border/60">
                <td className="py-4 pr-4 font-medium">{row.workflow}</td>
                <td className="py-4 pr-4 text-muted-foreground">{row.current}</td>
                <td className="py-4 text-muted-foreground">{row.offlyn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

export function CompetitorSection() {
  return (
    <Section title="Not a gateway. Not a memory layer. Context optimization before inference.">
      <p className="mb-8 text-muted-foreground">
        Gateways route model calls. Observability tools show what happened. Vector stores
        retrieve chunks. Offlyn helps decide what context should reach the model at all.
      </p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="py-3 pr-4">Category</th>
              <th className="py-3 pr-4">They optimize</th>
              <th className="py-3">Offlyn adds</th>
            </tr>
          </thead>
          <tbody>
            {competitorTable.map((row) => (
              <tr key={row.category} className="border-b border-border/60">
                <td className="py-4 pr-4 font-medium">{row.category}</td>
                <td className="py-4 pr-4 text-muted-foreground">{row.theyOptimize}</td>
                <td className="py-4 text-muted-foreground">{row.offlynAdds}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Section>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="border-t border-border/60 px-4 py-16 md:px-6">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold md:text-3xl">{title}</h2>
        {children}
      </div>
    </section>
  );
}

function Card({ title, description }: { title: string; description: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <h3 className="font-semibold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
    </div>
  );
}
