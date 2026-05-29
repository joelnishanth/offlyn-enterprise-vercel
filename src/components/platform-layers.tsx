const layers = [
  { name: "Cache Components (PPR)", path: "/", status: "active" },
  { name: "Edge Middleware", path: "middleware.ts", status: "active" },
  { name: "Edge Config", path: "EDGE_CONFIG", status: "active" },
  { name: "Server Actions", path: "actions/submit-audit", status: "active" },
  { name: "Fluid Compute", path: "api/audit/estimate", status: "active" },
  { name: "AI SDK + Gateway", path: "lib/ai/gateway", status: "active" },
  { name: "Workflow SDK", path: "workflows/audit-pipeline", status: "active" },
  { name: "Blob + KV", path: "lib/blob, lib/kv", status: "active" },
  { name: "Sandbox", path: "api/sandbox/analyze", status: "active" },
  { name: "Cron", path: "api/cron/followup", status: "active" },
  { name: "Speed Insights", path: "@vercel/speed-insights", status: "active" },
  { name: "Firewall / BotID", path: "docs/FIREWALL.md", status: "configure" },
  { name: "Rolling Releases", path: "vercel.json", status: "configure" },
];

import Link from "next/link";

export function PlatformLayers() {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h3 className="text-lg font-semibold">Vercel layers in this demo</h3>
        <Link
          href="/architecture"
          className="text-sm text-accent hover:underline"
        >
          Full map →
        </Link>
      </div>
      <ul className="grid gap-2 text-sm sm:grid-cols-2">
        {layers.map((l) => (
          <li
            key={l.name}
            className="flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2"
          >
            <span>{l.name}</span>
            <span
              className={
                l.status === "active"
                  ? "text-emerald-400"
                  : "text-amber-400"
              }
            >
              {l.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
