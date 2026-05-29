import type { Metadata } from "next";
import Link from "next/link";
import { EnterpriseWorkflow } from "@/components/workflow/enterprise-workflow";

export const metadata: Metadata = {
  title: "Enterprise Workflow | Offlyn.ai",
  description:
    "Two-phase workflow: token savings audit layer between apps and cloud inference, then on-device SLM from repeat patterns.",
};

export default function WorkflowPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Home
      </Link>

      <p className="mt-6 text-sm font-medium uppercase tracking-widest text-accent">
        End-to-end story
      </p>
      <h1 className="mt-2 text-3xl font-bold md:text-4xl">
        <span className="gradient-text">Audit layer</span>
        {" → "}
        <span className="gradient-text">Device SLM</span>
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted-foreground">
        Offlyn sits between your enterprise and cloud inference—catches every
        request, finds repeated context, shows savings—then uses that signal to
        deploy small models on user devices for the work that repeats.
      </p>

      <EnterpriseWorkflow />

      <div className="mt-12 flex flex-wrap gap-4">
        <Link
          href="/audit"
          className="rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Try audit tools
        </Link>
        <Link
          href="/#request-audit"
          className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium hover:bg-muted"
        >
          Request enterprise audit
        </Link>
      </div>
    </main>
  );
}
