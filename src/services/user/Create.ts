import { Prisma, User } from "@prisma/client"

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
