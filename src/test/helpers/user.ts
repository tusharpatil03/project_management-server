import { InterfaceUser } from "../../resolvers/Mutation/login";
import { Context } from "./db/context";
import { nanoid } from 'nanoid'

export interface InterfaceCreateUser {
    username: string
    email: string
    password: string
    salt: string
    profile: {
        id: string,
        firstName: string,
        lastName: string
    }
}

export type TestUserType = (InterfaceUser) | null

export const createTestUser = async (user: InterfaceCreateUser, ctx: Context): Promise<TestUserType> => {
    const profile = await ctx.prisma.userProfile.create({
        data: {
            firstName: "Tushar",
            lastName: "Patil",
        },
        select: {
            id: true
        }
    });

    return await ctx.prisma.user.create({
        data:
        {
            email: `email${nanoid().toLowerCase()}@gmail.com`,
            username: `user${nanoid()}`,
            password: `pass${nanoid().toLowerCase()}`,
            salt: 'salt',
            profile: {
                connect: {
                    id: profile.id
                }
            }
        },
        select: {
            id: true,
            username: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            projects: {
                select: {
                    id: true,
                    key: true,
                }
            },
            teams: true,
            assignedTasks: true,
            profile: true,
            profileId: true
        }
    });
}