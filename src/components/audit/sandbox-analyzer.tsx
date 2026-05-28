"use client";

import { useState } from "react";

type Analysis = {
  tokenEstimate: number;
  repeatedContextPct: number;
  recommendations: string[];
  mode: string;
};

export function SandboxAnalyzer() {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function analyze() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/sandbox/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Analysis failed");
      }
      setResult(await res.json());
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Sandbox Prompt Analyzer</h3>
      <p className="text-sm text-muted-foreground">
        Paste a prompt or trace. Runs in Vercel Sandbox microVM when deployed; local
        fallback in dev.
      </p>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={6}
        placeholder="Paste prompt, trace, or log excerpt..."
        className="w-full rounded-lg border border-border bg-muted px-3 py-2 font-mono text-sm"
      />

      <button
        type="button"
        onClick={analyze}
        disabled={loading || prompt.length < 20}
        className="rounded-lg border border-border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted disabled:opacity-50"
      >
        {loading ? "Running in sandbox…" : "Analyze tokens"}
      </button>

      {error && <p className="text-sm text-red-400">{error}</p>}

      {result && (
        <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <p>
            <span className="font-medium">Mode:</span> {result.mode}
          </p>
          <p>
            <span className="font-medium">Est. tokens:</span> {result.tokenEstimate}
          </p>
          <p>
            <span className="font-medium">Repeated context:</span>{" "}
            {result.repeatedContextPct}%
          </p>
          <ul className="list-disc pl-5 text-muted-foreground">
            {result.recommendations.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
