import { BaseContext } from '@apollo/server';
import { MemberRole, PrismaClient } from '@prisma/client';
import { InterfaceAuthData } from '../middlewares/isAuth';
import PrismaManager from '../utility/dbConnectivity';

export const client = new PrismaClient();
export type PrismaClientType = PrismaClient;

export interface MyContext extends InterfaceAuthData, BaseContext {
  client: PrismaClientType
  userRole: MemberRole | undefined | null
}

export type TransactionClient = Parameters<Parameters<PrismaClient['$transaction']>[0]>[0];


export async function initializePrisma(): Promise<PrismaClient> {
  let prismaManager: PrismaManager | null = null
  if (!prismaManager) {
    prismaManager = PrismaManager.getInstance()
  }

  return await prismaManager.initilize();
}