import Link from "next/link";
import { headers } from "next/headers";
import { hero } from "@/data/landing";

export async function HeroBanner() {
  const hdrs = await headers();
  const variant = hdrs.get("x-offlyn-hero-variant") ?? "default";
  const geo = hdrs.get("x-offlyn-geo") ?? "US";

  const title =
    variant === "enterprise"
      ? "Enterprise AI teams: cut token spend, keep answer quality."
      : hero.title;

  return (
    <section className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(59,130,246,0.15),_transparent_60%)]" />
      <div className="relative mx-auto max-w-4xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
          {hero.eyebrow}
          {geo !== "US" && (
            <span className="ml-2 text-muted-foreground">· {geo}</span>
          )}
        </p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
          <span className="gradient-text">{title}</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          {hero.subtitle}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#request-audit"
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white transition-opacity hover:opacity-90"
          >
            {hero.primaryCta}
          </a>
          <Link
            href="/workflow"
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            See the workflow
          </Link>
          <Link
            href="/audit"
            className="rounded-lg border border-border px-6 py-3 font-medium transition-colors hover:bg-muted"
          >
            {hero.secondaryCta}
          </Link>
        </div>
        <p className="mt-8 text-sm text-muted-foreground">{hero.footnote}</p>
      </div>
    </section>
  );
}
