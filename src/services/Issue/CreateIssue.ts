import { ActivityAction, EntityType, IssueStatus, IssueType, Prisma } from "@prisma/client";
import { client, TransactionClient } from "../../db/db";
import { buildActivityData, CreateActivityInput } from "../Activity/Create";

//this interface defines the input for create Issue
export interface IssueCreateInput {
    title: string;
    key: string;
    description?: string | null;
    type?: IssueType;
    dueDate: Date | string;
    creatorId: string;
    projectId: string;
    sprintId?: string | null;
    assigneeId?: string | null;
}


// builder function to create issue data
const buildIssueData = ({
    title,
    key,
    description,
    type = IssueType.TASK,
    dueDate,
    creatorId,
    projectId,
    sprintId,
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

    // only add sprint connection if sprintId is provided and not null
    if (sprintId) {
        issueData = {
            ...issueData,
            sprint: {
                connect: { id: sprintId }
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
    try {
        const existingIssue = await client.issue.findUnique({
            where: {
                projectId_key: {
                    projectId: input.projectId,
                    key: input.key,
                }
            },
            select: {
                id: true,
            },
        });
        if (existingIssue) {
            console.log(`An issue with the title "${input.title}" already exists in this project.`)
            throw new Error(`An issue with the title "${input.title}" already exists in this project.`);
        }

        client.$transaction(async (prisma: TransactionClient) => {

            const issue = await prisma.issue.create({
                data: buildIssueData(input)
            });

            //create activity
            const createActivityInput: CreateActivityInput = {
                action: ActivityAction.ISSUE_CREATED,
                entityType: EntityType.ISSUE,
                entityId: issue.key,
                entityName: issue.key,
                description: `issue created ${issue.key}`,
                userId: input.creatorId,
                issueId: issue.id,
                projectId: input.projectId,
            }
            await prisma.activity.create({
                data: buildActivityData(createActivityInput)
            });
            return issue;
        })
    } catch (e) {
        console.log(e);
        throw new Error("Failed to create new Issue");
    }
}