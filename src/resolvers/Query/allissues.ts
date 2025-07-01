import { QueryResolvers } from '../../types/generatedGraphQLTypes';
import { InterfaceIssue } from '../Mutation/createIssue';
import { InterfaceUserRole } from './allSprints';
import { isUserPartOfProject } from './allSprints';

export const getAllIssues: QueryResolvers['getAllIssues'] = async (
  _,
  args,
  context
) => {

  const project = await context.client.project.findUnique({
    where: { id: args.projectId },
    select: { creatorId: true },
  });

  if (!project) {
    throw new Error("Project Not Found")
  }

  const isPartOfProject: InterfaceUserRole = await isUserPartOfProject(context.userId, args.projectId, context.client);

  if (project?.creatorId !== context.userId) {
    if (!isPartOfProject) {
      throw new Error("You Are Authorized person to view this project")
    }
  }
  // Fetch the project and its issues with proper includes and pagination
  const issues = await context.client.issue.findMany({
    where: { projectId: args.projectId },
    select: {
      id: true,
      title: true,
      type: true,
      status: true,
      dueDate: true,
      sprintId: true,
      projectId: true,
      parentId: true,
    }
  });


  if (!issues) {
    throw new Error('issues not found');
  }

  return issues;
};
