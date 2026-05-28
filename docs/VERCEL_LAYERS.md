# Vercel Layers Map

| Layer | Implementation | Interview talking point |
|-------|----------------|------------------------|
| Cache Components | `cacheComponents: true` in next.config | Static shell prerenders; form streams via Suspense |
| Edge Middleware | `src/middleware.ts` | Geo personalization, A/B hero, bot hints |
| Edge Config | `src/lib/edge-config.ts` | Flip `useLiveAI` without redeploy |
| Server Actions | `src/app/actions/submit-audit.ts` | Zod validation, triggers Workflow |
| Fluid Compute | `maxDuration` on API routes | Active CPU billing during LLM I/O wait |
| AI SDK | `src/app/api/audit/estimate/route.ts` | `streamText` with mock or live model |
| AI Gateway | `src/lib/ai/gateway.ts` | Unified endpoint + Anthropic fallback |
| Workflow SDK | `src/workflows/audit-pipeline.ts` | Durable audit: intake → analyze → report |
| Blob | `src/lib/blob.ts` | PDF/transcript uploads |
| KV (Upstash) | `src/lib/kv.ts` | Rate limiting + audit state |
| Sandbox | `src/lib/sandbox/analyze.ts` | Isolated token analysis |
| Cron | `src/app/api/cron/followup/route.ts` | Weekly follow-up hook |
| Speed Insights | `src/app/layout.tsx` | Core Web Vitals tracking |
| Analytics | `src/app/layout.tsx` | Page view analytics |
| Firewall / BotID | `docs/FIREWALL.md` | Dashboard configuration |
| Rolling Releases | `docs/ROLLING_RELEASES.md` | Canary traffic split |
