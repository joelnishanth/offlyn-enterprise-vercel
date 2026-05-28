export type SandboxAnalysis = {
  tokenEstimate: number;
  repeatedContextPct: number;
  recommendations: string[];
  mode: "sandbox" | "local-fallback";
};

function estimateTokens(text: string): number {
  return Math.ceil(text.length / 4);
}

function detectRepeatedContext(text: string): number {
  const lines = text.split("\n").filter((l) => l.trim().length > 20);
  if (lines.length < 2) return 0;

  const seen = new Map<string, number>();
  let repeats = 0;

  for (const line of lines) {
    const key = line.trim().slice(0, 80);
    const count = (seen.get(key) ?? 0) + 1;
    seen.set(key, count);
    if (count > 1) repeats += 1;
  }

  return Math.min(95, Math.round((repeats / lines.length) * 100));
}

/**
 * Analyzes pasted prompt/trace text. Uses Vercel Sandbox when credentials exist,
 * otherwise runs a local isolated analysis (interview-safe fallback).
 */
export async function analyzePromptInSandbox(
  prompt: string,
): Promise<SandboxAnalysis> {
  const tokenEstimate = estimateTokens(prompt);
  const repeatedContextPct = detectRepeatedContext(prompt);

  const hasSandbox =
    process.env.VERCEL_OIDC_TOKEN ||
    (process.env.VERCEL_TOKEN && process.env.VERCEL_TEAM_ID);

  if (hasSandbox) {
    try {
      const { Sandbox } = await import("@vercel/sandbox");
      const sandbox = await Sandbox.create({
        runtime: "node22",
        timeout: 30_000,
      });

      const script = `
        const text = ${JSON.stringify(prompt.slice(0, 8000))};
        const tokens = Math.ceil(text.length / 4);
        const lines = text.split("\\n").filter(l => l.trim().length > 20);
        let repeats = 0;
        const seen = new Map();
        for (const line of lines) {
          const key = line.trim().slice(0, 80);
          seen.set(key, (seen.get(key) || 0) + 1);
          if (seen.get(key) > 1) repeats++;
        }
        const pct = lines.length ? Math.min(95, Math.round((repeats / lines.length) * 100)) : 0;
        console.log(JSON.stringify({ tokens, pct }));
      `;

      const result = await sandbox.runCommand("node", ["-e", script]);
      const stdout = await result.stdout();

      await sandbox.stop();

      if (result.exitCode === 0 && stdout) {
        const parsed = JSON.parse(stdout.trim()) as {
          tokens: number;
          pct: number;
        };
        return {
          tokenEstimate: parsed.tokens,
          repeatedContextPct: parsed.pct,
          recommendations: buildRecommendations(parsed.pct),
          mode: "sandbox",
        };
      }
    } catch {
      // fall through to local analysis
    }
  }

  return {
    tokenEstimate,
    repeatedContextPct,
    recommendations: buildRecommendations(repeatedContextPct),
    mode: "local-fallback",
  };
}

function buildRecommendations(repeatedPct: number): string[] {
  const recs = [
    "Deduplicate repeated transcript/document blocks before cloud inference",
    "Route chunking and embeddings to local path; escalate only evidence packs",
  ];
  if (repeatedPct > 30) {
    recs.push(
      `High repeated-context signal (${repeatedPct}%): enable map-reduce summarization locally`,
    );
  }
  if (repeatedPct > 50) {
    recs.push("Consider Workflow-backed audit pipeline for durable multi-step analysis");
  }
  return recs;
}
