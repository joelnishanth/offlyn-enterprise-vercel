import type { Metadata } from "next";
import Link from "next/link";
import { BenchmarkDashboard } from "@/components/benchmarks/benchmark-dashboard";

export const metadata: Metadata = {
  title: "Benchmarks | Offlyn Clipper",
  description:
    "On-device MLX library benchmarks: LLM inference, embeddings, prompt chains, and Whisper STT.",
};

export default function BenchmarksPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10 md:px-8">
      <Link
        href="/"
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        ← Home
      </Link>

      <div className="mt-6">
        <p className="text-xs font-medium uppercase tracking-widest text-accent">
          On-device performance
        </p>
        <h1 className="mt-2 text-2xl font-bold md:text-3xl">
          <span className="gradient-text">Clipper</span> library benchmarks
        </h1>
        <p className="mt-3 max-w-2xl text-sm text-muted-foreground">
          Real measurements from Offlyn Clipper&apos;s custom MLX libraries running
          on Apple Silicon. These power the Phase 2 on-device SLM —
          the same models that replace cloud inference for repeated tasks.
        </p>
      </div>

      <div className="mt-8">
        <BenchmarkDashboard />
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-3">
        <Link
          href="/workflow"
          className="rounded-full bg-primary px-5 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          See workflow
        </Link>
        <Link
          href="/architecture"
          className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-muted"
        >
          Platform map
        </Link>
      </div>
    </main>
  );
}
