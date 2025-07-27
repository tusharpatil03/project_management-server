import { IssueStatus, IssueType, Prisma } from "@prisma/client";
import { client } from "../../db";


export interface IssueCreateInput {
    title: string;
    key: string;
    description?: string | null;
    type?: IssueType;
    dueDate: Date | string;
    creatorId: string;
    projectId: string;
    sprintId?: string | null;
    parentId?: string | null;
    assigneeId?: string | null;
}


// builder function to create issue data
export const buildIssueData = ({
    title,
    key,
    description,
    type = IssueType.TASK,
    dueDate,
    creatorId,
    projectId,
    sprintId,
    parentId,
    assigneeId,
}: IssueCreateInput): Prisma.IssueCreateInput => {
    let issueData: Prisma.IssueCreateInput = {
        title,
        key,
        description,
        type,
        status: IssueStatus.TODO,
        dueDate,
        creator: {
            connect: { id: creatorId }
        },
        project: {
            connect: { id: projectId }
        }
    };

    // Only add sprint connection if sprintId is provided and not null
    if (sprintId) {
        issueData = {
            ...issueData,
            sprint: {
                connect: { id: sprintId }
            }
        };
    }

    // Only add parent connection if parentId is provided and not null
    if (parentId) {
        issueData = {
            ...issueData,
            parent: {
                connect: { id: parentId }
            }
        };
    }

    if (assigneeId) {
        issueData = {
            ...issueData,
            assignee: {
                connect: { id: assigneeId }
            }
        };
    }

    return issueData;
};

export async function createNewIssue(input: IssueCreateInput) {
    const existingIssue = await client.issue.findFirst({
        where: {
            title: input.title,
            projectId: input.projectId,
            parentId: input.parentId || undefined, // Handle null parentId
        },
        select: {
            id: true,
        },
    });
    if (existingIssue) {
        throw new Error(`An issue with the title "${input.title}" already exists in this project.`);
    }
    const issue = await client.issue.create({
        data: buildIssueData(input)
    });

    return issue;
}