# Rolling Releases and Vercel Agent

## Rolling Releases

1. Vercel Dashboard → Project → **Settings** → **Deployment Protection**
2. Enable **Rolling Releases**
3. Configure canary: 10% traffic to new deployment for 30 minutes
4. Compare Speed Insights metrics between canary and current

Use for: new audit form UX, AI estimate prompt changes.

## Vercel Agent

1. Project → **Agent** tab
2. Enable **Code Review** on pull requests
3. Enable **Investigation** for production anomalies

Demo flow: open a PR → preview deploy URL → Agent reviews diff → merge with Rolling Release canary.
