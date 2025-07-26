import { IssueStatus, IssueType, Prisma } from "@prisma/client";
import { client } from "../../db";

// // the base structure for issue creation
// export const IssueCreateSchema = Prisma.validator<Prisma.IssueCreateInput>()({
//     title: '',
//     description: '',
//     type: IssueType.TASK,
//     status: IssueStatus.TODO,
//     dueDate: new Date(),
//     creatorId: '',
//     project: {
//         connect: { id: '' }
//     },
//     sprint: {
//         connect: { id: '' }
//     },
//     parent: {
//         connect: { id: '' }
//     }
// });

// // can be used as input validation
// export type IssueCreateInput = typeof IssueCreateSchema;

//create input
export interface IssueCreateInput {
    title: string;
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
        description,
        type,
        status: IssueStatus.TODO,
        dueDate,
        creatorId: creatorId,
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
    const issue = await client.issue.create({
        data: buildIssueData(input)
    });

    return issue;
}