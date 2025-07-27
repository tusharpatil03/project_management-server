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
        select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
            createdAt: true,
            updatedAt: true,
            profile: {
                select: {
                    id: true,
                    avatar: true,
                    gender: true,
                    phone: true,
                    social: true
                }

            }
        }
    }) as UserWithProfile
}

export const CreateUser = async (user: User) => {
    return Prisma.validator<Prisma.UserCreateInput>()({
        email: user.email,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        salt: user.salt,
        profile: {
            connect: {
                id: user.id
            }
        }
    })
}
