import { Prisma, User } from "@prisma/client";


const userWihtPorfile = Prisma.validator<Prisma.UserDefaultArgs>()({
    include: {
        profile: true,
        activities: true,
        projects: true,
    }
})

export type UserWithProfile = Prisma.UserGetPayload<typeof userWihtPorfile>

export class UserQuery {
    public query: { select: Prisma.UserSelect } = { select: { id: true } };

    constructor(...attributes: (keyof Prisma.UserSelect)[]) {
        this.query = {
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                createdAt: true,
                updatedAt: true,
            }
        }
        if (attributes.length !== 0) {
            this.query = {
                select: attributes.reduce((acc, attr) => {
                    acc[attr] = true;
                    return acc;
                }, { id: true } as Prisma.UserSelect)
            };
        }

        return this
    }

    public includeProfile(...attributes: (keyof Prisma.UserProfileSelect)[]) {
        this.query.select.profile = {
            select: {
                id: true,
                avatar: true,
            }
        }

        if (attributes.length !== 0) {
            this.query.select.profile = {
                select: attributes.reduce((acc, attr) => {
                    acc[attr] = true;
                    return acc;
                }, { id: true } as Prisma.UserProfileSelect)
            }
        }
        else {
            this.query.select.profile = {
                select: {
                    id: true,
                    avatar: true,
                }
            }
        }
        return this
    }


    public includeProjects(...attributes: (keyof Prisma.ProjectSelect)[]) {
        this.query.select.projects = {
            select: {
                id: true,
                name: true,
                key: true,
            }
        }

        if (attributes.length !== 0) {
            this.query.select.profile = {
                select: attributes.reduce((acc, attr) => {
                    acc[attr] = true;
                    return acc;
                }, { id: true } as Prisma.ProjectSelect)
            }
        }
        return this
    }


    public includeTeams(...attributes: (keyof Prisma.UserTeamSelect)[]) {
        this.query.select.teams = {
            select: {
                id: true,
            }
        }
        if (attributes.length !== 0) {
            this.query.select.teams = {
                select: attributes.reduce((acc, attr) => {
                    acc[attr] = true;
                    return acc;
                }, { id: true } as Prisma.UserTeamSelect)
            }
        }
        return this
    }

    public includeActivities(...attributes: (keyof Prisma.ActivitySelect)[]) {
        this.query.select.activities = {
            select: {
                id: true,
                action: true,
                createdAt: true,
            }
        }
        if (attributes.length !== 0) {
            this.query.select.activities = {
                select: attributes.reduce((acc, attr) => {
                    acc[attr] = true;
                    return acc;
                }, { id: true } as Prisma.ActivitySelect)
            }
        }
        return this
    }
}


// const getUser = async () => {
//     const userQuery = new UserQuery('password', 'salt')
//         .includeProfile('social')
//         .includeProjects()
//         .includeTeams('role', 'joinedAt', 'userId');


//     return await client.user.findUnique({
//         where: {
//             id: "cme2re4pq0000mgciemimnyrs",
//         },
//         ...userQuery.query
//     });
// }

// getUser().then(res => console.log(res))