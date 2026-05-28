import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import type { LanguageModel } from "ai";
import { getFeatureFlags } from "@/lib/edge-config";
import { createMockAuditModel } from "@/lib/ai/mock-provider";

/**
 * Returns the audit model based on Edge Config `useLiveAI`.
 * Live mode uses AI Gateway env (AI_GATEWAY_API_KEY) with OpenAI primary,
 * Anthropic fallback via model string routing.
 */
export async function getAuditModel(): Promise<LanguageModel> {
  const flags = await getFeatureFlags();

  if (!flags.useLiveAI) {
    return createMockAuditModel() as unknown as LanguageModel;
  }

  const gatewayKey = process.env.AI_GATEWAY_API_KEY;
  const openaiKey = process.env.OPENAI_API_KEY;

  if (gatewayKey || openaiKey) {
    const openai = createOpenAI({
      apiKey: gatewayKey ?? openaiKey,
      baseURL: gatewayKey
        ? "https://ai-gateway.vercel.sh/v1"
        : undefined,
    });
    return openai("gpt-4o-mini") as LanguageModel;
  }

  const anthropicKey = process.env.ANTHROPIC_API_KEY;
  if (anthropicKey) {
    const anthropic = createAnthropic({ apiKey: anthropicKey });
    return anthropic("claude-3-5-haiku-latest") as LanguageModel;
  }

  return createMockAuditModel() as unknown as LanguageModel;
}

export const GATEWAY_CONFIG = {
  primary: "openai/gpt-4o-mini",
  fallback: "anthropic/claude-3-5-haiku",
  gatewayUrl: "https://ai-gateway.vercel.sh/v1",
} as const;
