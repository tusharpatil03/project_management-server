import { Prisma } from "@prisma/client";
import { client } from "../../db";

export class IssuesQuery {
	public query: { select: Prisma.IssueSelect };

	constructor(...attributes: (keyof Prisma.IssueSelect)[]) {
		if (attributes.length !== 0) {
			this.query = {
				select: attributes.reduce((acc, attr) => {
					acc[attr] = true;
					return acc;
				}, { id: true } as Prisma.IssueSelect)
			};
		}
		else {
			this.query = {
				select: {
					id: true,
					title: true,
					type: true,
					dueDate: true,
					status: true,
					description: true,
					assigneeId: true,
					creatorId: true,
					projectId: true,
					sprintId: true,
					depth: true,
					priority: true,
					createdAt: true,
					updatedAt: true,
					parentId: true,
				}
			}
		}
		return this
	}

	public includeAssignee(
		userFields: (keyof Prisma.UserSelect)[],
		profileFields?: (keyof Prisma.UserProfileSelect)[]
	) {
		if (userFields.length !== 0) {
			const userSelect: any = userFields.reduce((acc, attr) => {
				acc[attr] = true;
				return acc;
			}, { id: true } as any);

			if (profileFields && profileFields.length > 0) {
				userSelect.profile = {
					select: profileFields.reduce((acc, field) => {
						acc[field] = true;
						return acc;
					}, { id: true } as Prisma.UserProfileSelect)
				};
			}

			this.query.select.assignee = { select: userSelect };
		}
		return this;
	}

	public includeCreator(
		userFields: (keyof Prisma.UserSelect)[],
		profileFields?: (keyof Prisma.UserProfileSelect)[]
	) {
		if (userFields.length !== 0) {
			const userSelect: any = userFields.reduce((acc, attr) => {
				acc[attr] = true;
				return acc;
			}, { id: true } as any);

			if (profileFields && profileFields.length > 0) {
				userSelect.profile = {
					select: profileFields.reduce((acc, field) => {
						acc[field] = true;
						return acc;
					}, { id: true } as Prisma.UserProfileSelect)
				};
			}

			this.query.select.creator = { select: userSelect };
		}
		return this;
	}

}


async function getIssue(id: string) {
	const issueQuery = new IssuesQuery("id").includeAssignee(["id", "_count"], ["id"]).includeCreator(["id"], ["id"]);
	const issue = await client.issue.findFirst({
		where: {
			id: id
		},
		...issueQuery.query

	});
	console.log(issue);

}

// getIssue("cmdvvdzhp0000mgea26bsnhno");