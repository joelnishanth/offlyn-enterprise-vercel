import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { get } from "@vercel/edge-config";

const WORKFLOW_PREFIX = "/.well-known/workflow";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith(WORKFLOW_PREFIX)) {
    return NextResponse.next();
  }

  const response = NextResponse.next();

  // Geo hint for personalization (demo)
  const country = request.headers.get("x-vercel-ip-country") ?? "US";
  response.headers.set("x-offlyn-geo", country);

  // A/B hero variant via cookie + Edge Config
  let heroVariant = request.cookies.get("offlyn_hero")?.value;
  if (!heroVariant) {
    try {
      if (process.env.EDGE_CONFIG) {
        heroVariant = (await get<string>("heroVariant")) ?? "default";
      } else {
        heroVariant = Math.random() < 0.5 ? "default" : "enterprise";
      }
    } catch {
      heroVariant = "default";
    }
    response.cookies.set("offlyn_hero", heroVariant, {
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });
  }
  response.headers.set("x-offlyn-hero-variant", heroVariant);

  // Bot check header for BotID integration (Firewall handles enforcement on Vercel)
  const ua = request.headers.get("user-agent") ?? "";
  if (/bot|crawl|spider/i.test(ua) && pathname.startsWith("/api/")) {
    response.headers.set("x-offlyn-bot-detected", "1");
  }

  return response;
}

export const config = {
  matcher: [
    {
      source:
        "/((?!_next/static|_next/image|favicon.ico|.well-known/workflow/|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
    },
  ],
};
