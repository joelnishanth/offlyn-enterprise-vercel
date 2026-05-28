import type { LanguageModelV2 } from "@ai-sdk/provider";

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Mock model for interview demos — streams realistic token-audit analysis */
export function createMockAuditModel(): LanguageModelV2 {
  const modelId = "offlyn-mock-audit";

  return {
    specificationVersion: "v2",
    provider: "offlyn",
    modelId,
    supportedUrls: {},

    async doGenerate() {
      throw new Error("Use doStream for mock audit model");
    },

    async doStream() {
      const chunks = [
        "## Token Waste Analysis\n\n",
        "Based on your workflow description, I estimate **38–52%** of cloud tokens are spent on repeated context.\n\n",
        "### Primary waste patterns\n",
        "- Full transcript re-sent on every follow-up turn\n",
        "- RAG retrieving 12+ chunks when 3–4 would suffice\n",
        "- Tool outputs included verbatim instead of summarized evidence\n\n",
        "### Recommended routing\n",
        "1. **Local**: transcription, chunking, embeddings, first-pass classification\n",
        "2. **Compress**: map-reduce summaries before cloud escalation\n",
        "3. **Cloud**: final synthesis only with source-grounded evidence pack\n\n",
        "### Quality guardrails\n",
        "- Citation coverage target: ≥95%\n",
        "- Fallback to cloud when local confidence < 0.7\n",
        "- Token budget cap per request: 8K evidence + 2K synthesis\n",
      ];

      const textStream = new ReadableStream({
        async start(controller) {
          for (const chunk of chunks) {
            await delay(120 + Math.random() * 80);
            controller.enqueue({
              type: "text-delta" as const,
              id: "mock-1",
              delta: chunk,
            });
          }
          controller.enqueue({
            type: "finish" as const,
            finishReason: "stop",
            usage: { inputTokens: 420, outputTokens: 280, totalTokens: 700 },
          });
          controller.close();
        },
      });

      return {
        stream: textStream,
        rawCall: { rawPrompt: null, rawSettings: {} },
      };
    },
  };
}
