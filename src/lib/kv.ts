import { Redis } from "@upstash/redis";

type AuditRecord = {
  id: string;
  name: string;
  email: string;
  company: string;
  workflow: string;
  description: string;
  notifyMcp: boolean;
  createdAt: string;
  status: "pending" | "processing" | "complete";
  report?: {
    wasteScore: number;
    estimatedSavingsPct: number;
    routingPlan: string[];
    qualityRisks: string[];
  };
};

const memoryStore = new Map<string, AuditRecord>();
const memoryRateLimit = new Map<string, { count: number; resetAt: number }>();

function getRedis(): Redis | null {
  const url = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return null;
  return new Redis({ url, token });
}

export async function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 60_000,
): Promise<{ allowed: boolean; remaining: number }> {
  const redis = getRedis();
  const now = Date.now();

  if (redis) {
    const bucket = `ratelimit:${key}:${Math.floor(now / windowMs)}`;
    const count = await redis.incr(bucket);
    if (count === 1) {
      await redis.expire(bucket, Math.ceil(windowMs / 1000));
    }
    return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
  }

  const entry = memoryRateLimit.get(key);
  if (!entry || entry.resetAt < now) {
    memoryRateLimit.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  entry.count += 1;
  return { allowed: entry.count <= limit, remaining: Math.max(0, limit - entry.count) };
}

export async function saveAuditRecord(record: AuditRecord): Promise<void> {
  const redis = getRedis();
  if (redis) {
    await redis.set(`audit:${record.id}`, record, { ex: 60 * 60 * 24 * 30 });
    await redis.lpush("audit:ids", record.id);
    return;
  }
  memoryStore.set(record.id, record);
}

export async function getAuditRecord(id: string): Promise<AuditRecord | null> {
  const redis = getRedis();
  if (redis) {
    return (await redis.get<AuditRecord>(`audit:${id}`)) ?? null;
  }
  return memoryStore.get(id) ?? null;
}

export async function updateAuditRecord(
  id: string,
  patch: Partial<AuditRecord>,
): Promise<AuditRecord | null> {
  const existing = await getAuditRecord(id);
  if (!existing) return null;
  const updated = { ...existing, ...patch };
  await saveAuditRecord(updated);
  return updated;
}

export type { AuditRecord };
