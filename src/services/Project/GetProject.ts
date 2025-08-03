import { Prisma, SprintStatus } from "@prisma/client";
import { client } from "../../db";

class ProjectQueryBuilder {
    private query: Prisma.ProjectFindManyArgs = {};

    includeCreator(withProfile = false, withStats = false) {
        const creatorInclude: any = {};

        if (withProfile) {
            creatorInclude.profile = {
                select: {
                    id: true,
                    avatar: true,
                    bio: true
                }
            };
        }

        if (withStats) {
            creatorInclude._count = {
                select: {
                    projects: true,
                    issues: true
                }
            };
        }

        if (!this.query.include) {
            this.query.include = {};
        }


        this.query.include.creator = Object.keys(creatorInclude).length > 0
            ? { ...creatorInclude }
            : true;

        return this;
    }

    includeSprints(options: {
        active?: boolean;
        completed?: boolean;
        withIssues?: boolean;
        limit?: number;
    } = {},
        select?: Prisma.SprintSelect) {
        if (!this.query.include) {
            this.query.include = {};
        }

        const sprintQuery: any = {
            select: {
                id: true,
                title: true,
                key: true,
                status: true,
                ...select
            }
        };

        const whereClause: Prisma.SprintWhereInput = {};
        if (options.active) {
            whereClause.status = SprintStatus.ACTIVE
        }

        if (Object.keys(whereClause).length > 0) {
            sprintQuery.where = whereClause;
        }

        if (options.withIssues) {
            sprintQuery.include = {
                ...(sprintQuery.include || {}),
                issues: true
            };
        }

        if (options.limit) {
            sprintQuery.take = options.limit;
        }

        sprintQuery.orderBy = { createdAt: 'desc' };

        this.query.include.sprints = sprintQuery;

        return this;
    }

    getActiveSprint(withIssues = true, select?: Prisma.SprintSelect) {
        const sprintInclude: any = {
            select: {
                id: true,
                title: true,
                key: true,
                status: true,
                ...select
            },
            include: {}
        };

        if (withIssues) {
            sprintInclude.include = {
                issues: true
            };
        }

        if (!this.query.include) {
            return this.query.include = {}
        }

        this.query.include.sprints = sprintInclude;

        return this;
    }


    build(): Prisma.ProjectFindManyArgs {
        return this.query;
    }
}


// const printProject = async () => {
//     const builder = new ProjectQueryBuilder()

//     const query = builder.build();
//     const project = await client.project.findFirst(query)
//     console.log(project);
// }

// printProject();