import { describe, it, expect, beforeEach, vi } from 'vitest';
import { PrismaClient } from '@prisma/client';
import { mockDeep, mockReset, DeepMockProxy } from "vitest-mock-extended";

vi.mock('@prisma/client', () => ({
    PrismaClient: vi.fn(),
}));

describe('test environment sanity', () => {
    it('vitest runs and PrismaClient is mocked', () => {
        // PrismaClient should be a mock constructor
        expect(PrismaClient).toBeDefined();
        // instantiate to ensure it doesn't throw
        // @ts-ignore - mocked by vi.mock
        const instance = new (PrismaClient as any)();
        expect(instance).toBeDefined();
    });
});
