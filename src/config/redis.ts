import { createClient, RedisClientType } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

export const redisClient: RedisClientType = createClient({ url: REDIS_URL });

// Connection helpers
export async function connectRedis(): Promise<void> {
    if (!redisClient.isOpen) {
        try {
            await redisClient.connect();
            console.info('connected to Redis');
        } catch (err) {
            console.error('Redis connect error:', (err as any)?.message || err);
            // allow caller to handle retry logic
            throw err;
        }
    }
}

export async function disconnectRedis(): Promise<void> {
    try {
        if (redisClient.isOpen) {
            await redisClient.quit();
            console.info('Redis disconnected');
        }
    } catch (err) {
        console.error('Redis disconnect error:', (err as any)?.message || err);
    }
}

// JSON helpers: set/get objects safely
export async function setJSON(key: string, value: unknown, ttlSeconds?: number) {
    const stringified = JSON.stringify(value);
    if (ttlSeconds && ttlSeconds > 0) {
        await redisClient.set(key, stringified, { EX: ttlSeconds });
    } else {
        await redisClient.set(key, stringified);
    }
}

export async function getJSON<T = any>(key: string): Promise<T | null> {
    const raw = await redisClient.get(key);
    if (!raw) return null;
    try {
        return JSON.parse(raw) as T;
    } catch (err) {
        console.warn('Failed to parse JSON from Redis for key', key, err);
        return null;
    }
}

// Pub/Sub helpers
export function createRedisSubscriber(): RedisClientType {
    const sub = createClient({ url: REDIS_URL });
    sub.on('error', (err) => console.error('Redis subscriber error:', (err as any)?.message || err));
    return sub as RedisClientType;
}

export async function publish(channel: string, message: string) {
    try {
        await redisClient.publish(channel, message);
    } catch (err) {
        console.error('Redis publish error:', (err as any)?.message || err);
    }
}

// Backwards-compatible default connect() used elsewhere in the project
export async function ensureRedisConnected(): Promise<void> {
    // attempt to connect but don't throw if already connected
    try {
        await connectRedis();
    } catch (err) {
        console.warn('ensureRedisConnected: could not connect to Redis', (err as any)?.message || err);
    }
}
