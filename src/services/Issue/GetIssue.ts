import { Prisma } from "@prisma/client";
import { client } from "../../config/db";

const issueQuery = Prisma.validator<Prisma.IssueDefaultArgs>()({
    include: {
        assignee: {
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profile: {
                    select: {
                        id: true,
                        avatar: true
                    }
                }
            }
        },
        creator: {
            select: {
                id: true,
                email: true,
                firstName: true,
                lastName: true,
                profile: {
                    select: {
                        id: true,
                        avatar: true
                    }
                }
            }
        }
    }
});

export type Issue = Prisma.IssueGetPayload<typeof issueQuery>;

export async function GetIssueById(issueId: string): Promise<Issue | null> {
    return client.issue.findUnique({
        where: { id: issueId },
        ...issueQuery
    });
}

export async function GetIssueByKey(key: string): Promise<Issue | null> {
    return client.issue.findFirst({
        where: { key },
        ...issueQuery
    });
}


export async function GetAllIssuesByProjectId(projectId: string): Promise<Issue[]> {
    return client.issue.findMany({
        where: { projectId },
        ...issueQuery
    });
}

export async function GetAllIssuesBySprintId(sprintId: string): Promise<Issue[]> {
    return client.issue.findMany({
        where: { sprintId },
        ...issueQuery
    });
}
export async function GetAllIssuesByAssigneeId(assigneeId: string): Promise<Issue[]> {
    return client.issue.findMany({
        where: { assigneeId },
        ...issueQuery
    });
}

export async function GetAllIssuesByCreatorId(creatorId: string): Promise<Issue[]> {
    return client.issue.findMany({
        where: { creatorId },
        ...issueQuery
    });
}