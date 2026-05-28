import { streamText } from "ai";
import { getAuditModel } from "@/lib/ai/gateway";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = (await request.json()) as {
    prompt?: string;
    workflow?: string;
    description?: string;
  };

  const workflow = body.workflow ?? "General AI workflow";
  const description = body.description ?? body.prompt ?? "";

  if (description.length < 10) {
    return new Response("Description must be at least 10 characters", {
      status: 400,
    });
  }

  const model = await getAuditModel();

  const result = streamText({
    model,
    system: `You are Offlyn's token savings auditor. Analyze repeated-context waste and recommend local/cloud routing. Be concise and use markdown.`,
    prompt: `Workflow: ${workflow}\n\nDescription:\n${description}\n\nProvide token waste estimate, routing plan, and quality guardrails.`,
  });

  return result.toTextStreamResponse();
}
