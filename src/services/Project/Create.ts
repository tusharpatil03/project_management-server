import { Prisma, ProjectStatus } from "@prisma/client";
import { client } from "../../config/db";

export interface CreateProjectInput {
    name: string;
    key: string;
    description: string;
    creatorId: string;
    status?: ProjectStatus | null;
}

const buildProjectData = (input: CreateProjectInput): Prisma.ProjectCreateInput => {
    const projectData: Prisma.ProjectCreateInput = {
        ...input,
        creator: {
            connect: {
                id: input.creatorId
            }
        },
        status: input.status || ProjectStatus.ACTIVE
    };

    return projectData;
}

export const CreateProject = async (input:CreateProjectInput):Promise<void>=> {
    await client.project.create({
        data: buildProjectData(input)
    });
}