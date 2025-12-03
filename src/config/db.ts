import { PrismaClient } from '@prisma/client';
import PrismaManager from '../utility/dbConnectivity';

export const client = new PrismaClient();
export type PrismaClientType = PrismaClient;
export type TransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];

export async function initializePrisma(): Promise<PrismaClient> {
  let prismaManager: PrismaManager | null = null
  if (!prismaManager) {
    prismaManager = PrismaManager.getInstance()
  }

  return await prismaManager.initilize();
}

let prismaClient: PrismaClient | null = null;

export function getPrismaClient(): PrismaClient {
  if (!prismaClient) {
    prismaClient = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    }
    );
  }
  return prismaClient;
}

export async function disconnectPrisma(): Promise<void> {
  if (prismaClient) {
    await prismaClient.$disconnect();
    prismaClient = null;
  }
}
