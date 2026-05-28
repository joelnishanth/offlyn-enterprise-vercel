# Offlyn Enterprise — Vercel Platform Demo

Interview-ready rebuild of [offlyn.ai/enterprise](https://www.offlyn.ai/enterprise/) demonstrating every Vercel platform layer.

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy

```bash
npx vercel link
npx vercel env pull
npx vercel --prod
```

Or connect the GitHub repo in the Vercel dashboard for automatic preview deployments.

## Mock AI (default)

No API keys required. Token estimates stream from a mock provider. Flip `useLiveAI` in Edge Config to use AI Gateway + OpenAI/Anthropic.

## Vercel layers

See [docs/VERCEL_LAYERS.md](docs/VERCEL_LAYERS.md) for the full map.

## Routes

| Route | Description |
|-------|-------------|
| `/` | Enterprise landing + audit request form |
| `/audit` | Interactive token estimate + sandbox analyzer |
| `/audit/[id]` | Workflow-generated audit report |

## Environment

Copy `.env.example` to `.env.local`. Optional: Edge Config, Upstash Redis, Blob, AI keys.
