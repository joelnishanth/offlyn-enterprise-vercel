import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Follow-up automation hook — integrate with email provider in production
  console.info("[cron/followup] Audit follow-up job executed", {
    at: new Date().toISOString(),
  });

  return NextResponse.json({
    ok: true,
    message: "Follow-up cron executed",
    processed: 0,
  });
}
