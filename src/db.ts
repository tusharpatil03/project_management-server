import { BaseContext } from '@apollo/server';
import { PrismaClient } from '@prisma/client';
import { InterfaceAuthData } from './middlewares/isAuth';

export const client = new PrismaClient();
export type PrismaClientType = PrismaClient; 

export interface MyContext extends InterfaceAuthData, BaseContext {
  client: PrismaClientType
}