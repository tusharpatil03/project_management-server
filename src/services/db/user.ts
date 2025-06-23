import { Prisma, User } from "@prisma/client";
import { client } from "../../db"

const userWihtPorfile = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        profile: true
    }
})

export type UserWithProfile = Prisma.UserGetPayload<typeof userWihtPorfile>

export const getUserWithProfile = async (userId: string) => {
    return await client.user.findUnique({
        where: {
            id: userId
        },
        include: {
            profile: true
        }
    }) as UserWithProfile
}

export const CreateUser = async (user: User) => {
    return Prisma.validator<Prisma.UserCreateInput>()({
        email: user.email,
        username: user.email,
        password: user.password,
        salt: user.salt,
        profile: {
            connect: {
                id: user.id
            }
        }
    })
}
