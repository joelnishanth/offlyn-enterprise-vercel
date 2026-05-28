# Firewall and BotID Setup

Configure in the Vercel Dashboard for the `offlyn-enterprise-vercel` project:

## Firewall (WAF)

1. Project → **Security** → **Firewall**
2. Enable managed rulesets (OWASP Top 10)
3. Add custom rule for `/api/*` POST routes:
   - Challenge or block suspicious traffic
   - Rate limit by IP on `/api/audit/estimate` and Server Action paths

## BotID

1. Project → **Security** → **Bot Management** → **BotID**
2. Protect routes:
   - `POST /api/audit/estimate`
   - Form submission (Server Action)
3. Middleware sets `x-offlyn-bot-detected` for observability

## Application-level rate limiting

`src/lib/kv.ts` provides Redis-backed rate limits (5 requests/min per email) as defense in depth.
