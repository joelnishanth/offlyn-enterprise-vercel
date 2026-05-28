import { NextResponse } from "next/server";
import { analyzePromptInSandbox } from "@/lib/sandbox/analyze";

export const maxDuration = 60;

export async function POST(request: Request) {
  const body = (await request.json()) as { prompt?: string };

  if (!body.prompt || body.prompt.length < 20) {
    return NextResponse.json(
      { error: "Prompt must be at least 20 characters" },
      { status: 400 },
    );
  }

  const analysis = await analyzePromptInSandbox(body.prompt);
  return NextResponse.json(analysis);
}
