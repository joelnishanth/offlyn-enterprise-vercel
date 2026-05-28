"use client";

import { useCompletion } from "@ai-sdk/react";
import { useState } from "react";

export function EstimateStream() {
  const [workflow, setWorkflow] = useState("Agent traces");
  const [description, setDescription] = useState("");

  const { completion, complete, isLoading, error } = useCompletion({
    api: "/api/audit/estimate",
    streamProtocol: "text",
    body: { workflow, description },
  });

  return (
    <div className="space-y-4 rounded-xl border border-border bg-card p-6">
      <h3 className="text-lg font-semibold">Live Token Estimate (AI SDK stream)</h3>
      <p className="text-sm text-muted-foreground">
        Streams via Fluid Compute. Mock provider by default; flip{" "}
        <code className="rounded bg-muted px-1">useLiveAI</code> in Edge Config for real
        AI Gateway.
      </p>

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={4}
        placeholder="Describe your workflow and repeated-context patterns..."
        className="w-full rounded-lg border border-border bg-muted px-3 py-2"
      />

      <button
        type="button"
        disabled={isLoading || description.length < 10}
        onClick={() => complete(description)}
        className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isLoading ? "Analyzing…" : "Run estimate"}
      </button>

      {error && <p className="text-sm text-red-400">{error.message}</p>}

      {completion && (
        <div className="prose prose-invert max-w-none rounded-lg border border-border bg-muted/30 p-4 text-sm">
          <pre className="whitespace-pre-wrap font-sans text-foreground">
            {completion}
          </pre>
        </div>
      )}
    </div>
  );
}
