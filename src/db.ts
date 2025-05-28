import { PrismaClient } from '@prisma/client';

export const client = new PrismaClient();
export type PrismaClientType = PrismaClient; 