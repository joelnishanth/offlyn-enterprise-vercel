import Link from "next/link";
import { EnterpriseArchitecture } from "@/components/architecture/enterprise-architecture";

export function ArchitectureView() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:px-8">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Home
      </Link>

      <h1 className="mt-6 text-2xl font-bold md:text-3xl">
        <span className="gradient-text">Vercel</span> platform map
      </h1>

      <EnterpriseArchitecture />

      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/workflow"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          Workflow
        </Link>
        <Link
          href="/audit"
          className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Live demo
        </Link>
      </div>
    </main>
  );
}
