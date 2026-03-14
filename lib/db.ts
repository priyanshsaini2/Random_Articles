import { Redis } from '@upstash/redis';

// Determine if we are in a build environment or missing credentials.
// For Next.js to build, we should handle missing UPSTASH env vars gracefully if not provided.
const redisUrl = process.env.UPSTASH_REDIS_REST_URL || 'https://example.upstash.io';
const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || 'example_token';

export const redis = new Redis({
  url: redisUrl,
  token: redisToken,
});

export interface ExternalArticle {
  title: string;
  source: string;
  url: string;
  excerpt: string;
  category?: string;
  publishDate: string;
}

export interface DayData {
  date: string; // YYYY-MM-DD
  articles: ExternalArticle[];
}

export async function getTodayData(dateString: string): Promise<DayData | null> {
  if (redisToken === 'example_token') return null; // Safe fallback for local/missing env
  try {
    const result = await redis.get<DayData>(`history:${dateString}`);
    return result;
  } catch (e) {
    console.error("Redis getTodayData error:", e);
    return null;
  }
}

export async function saveTodayData(data: DayData): Promise<void> {
  if (redisToken === 'example_token') return;
  try {
    await redis.set(`history:${data.date}`, data);
    
    // Maintain a list of dates to fetch history efficiently.
    // Lrem first to prevent duplicates if function runs twice.
    await redis.lrem('all-dates-list', 0, data.date);
    await redis.lpush('all-dates-list', data.date);
  } catch (e) {
    console.error("Redis saveTodayData error:", e);
  }
}

export async function getHistory(limit: number = 30): Promise<DayData[]> {
  if (redisToken === 'example_token') return [];
  try {
    const dates = await redis.lrange<string>('all-dates-list', 0, limit - 1);
    if (!dates || dates.length === 0) return [];
    
    const keys = dates.map((date: string) => `history:${date}`);
    // If we only have one key, mget behavior in @upstash/redis might return array of 1
    const data = await redis.mget<DayData[]>(...keys);
    
    return data.filter(Boolean) as DayData[];
  } catch (e) {
    console.error("Redis getHistory error:", e);
    return [];
  }
}
