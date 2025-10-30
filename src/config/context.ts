import { BaseContext } from "@apollo/server";
import { InterfaceAuthData, isAuth } from "../middlewares/isAuth";
import { getPrismaClient, PrismaClientType } from "./db";
import { Request } from "express";


export interface MyContext extends InterfaceAuthData, BaseContext {
    client: PrismaClientType
}


export function createGraphQLContext(req: Request): MyContext {
    const auth = isAuth(req);
    const client = getPrismaClient();

    return {
        ...auth,
        client
    };
}

