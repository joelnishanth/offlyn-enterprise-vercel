import Link from "next/link";
import { EstimateStream } from "@/components/audit/estimate-stream";
import { SandboxAnalyzer } from "@/components/audit/sandbox-analyzer";
import { PlatformLayers } from "@/components/platform-layers";

export default function AuditToolPage() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 md:px-6">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Back to enterprise
      </Link>
      <h1 className="mt-4 text-3xl font-bold">Token Savings Audit Tool</h1>
      <p className="mt-2 text-muted-foreground">
        Interactive demo of Offlyn&apos;s audit flow — AI SDK streaming, Sandbox analysis,
        and Workflow-backed reports.
      </p>

      <div className="mt-10 space-y-8">
        <EstimateStream />
        <SandboxAnalyzer />
        <PlatformLayers />
      </div>
    </main>
  );
}
