import { beforeAll, afterAll, afterEach, beforeEach } from 'vitest';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

// Ensure test environment
if (process.env.NODE_ENV !== 'test') {
    process.env.NODE_ENV = 'test';
}

// Test database URL (use separate test database)
if (!process.env.TEST_DATABASE_URL) {
    throw new Error('TEST_DATABASE_URL must be set for testing');
}

process.env.DATABASE_URL = process.env.TEST_DATABASE_URL;

let prisma: PrismaClient;

beforeAll(async () => {
    console.log('🧪 Initializing test environment...');

    prisma = new PrismaClient({
        datasources: {
            db: {
                url: process.env.TEST_DATABASE_URL,
            },
        },
    });

    // Connect to database
    await prisma.$connect();

    console.log('✅ Test database connected');
});

afterEach(async () => {
    // Clean up after each test
    if (prisma) {
        const tablenames = await prisma.$queryRaw
            `SELECT tablename FROM pg_tables WHERE schemaname='public'` as Array<{ tablename: string }>;

        for (const { tablename } of tablenames) {
            if (tablename !== '_prisma_migrations') {
                try {
                    await prisma.$executeRawUnsafe(
                        `TRUNCATE TABLE "public"."${tablename}" CASCADE;`
                    );
                } catch (error) {
                    console.error(`Error truncating ${tablename}:`, error);
                }
            }
        }
    }
});

afterAll(async () => {
    if (prisma) {
        await prisma.$disconnect();
        console.log('✅ Test database disconnected');
    }
});

// Export for use in tests
export { prisma };