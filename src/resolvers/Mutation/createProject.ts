import { ActivityAction, EntityType } from '@prisma/client';
import { PrismaClientType, TransactionClient } from '../../db';
import { CreateActivity, CreateActivityInput } from '../../services/Activity/Create';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';

//this resolver create a new Project by provided input :projectKey: unique, projectName: string, description?: string
export const createProject: MutationResolvers['createProject'] = async (
  _,
  args,
  context
) => {

  // if (!context.userId) {
  //   throw new Error("you are not authorized");
  // }

  //check user creator exist or not
  const creator = await context.client.user.findUnique({
    where: {
      id: context.userId,
    },
  });

  if (!creator) {
    throw new Error('Unauthorized: Creator not found');
  }

  //check project with same key already exist
  const existingProject = await context.client.project.findFirst({
    where: {
      key: args.input.key
    }
  });

  if (existingProject) {
    throw new Error("project with key already exist")
  }


  //transaction to ensure that atomicity while creating a new issues 
  //it ensure that the one  operation is failed then all opearations are roll backed
  let projectId: string | null = "";
  let projectKey: string | null = "";

  try {
    await context.client.$transaction(async (prisma: TransactionClient) => {

      //fetch team to add as default working team on this project
      const team = await prisma.team.findFirst({
        where: {
          creatorId: context.userId
        }
      });

      //create aproject 
      const project = await prisma.project.create({
        data: {
          name: args.input.name,
          description: args.input.description,
          creator: {
            connect: {
              id: context.userId
            }
          },
          key: args.input.key,
        },
        select: {
          id: true,
          key: true
        },
      });

      projectId = project.id;
      projectKey = project.key

      //if project is created and team found, connect the project with team  by create a join table ProjectTeam
      if (team && project) {
        await prisma.projectTeam.create({
          data: {
            team: {
              connect: {
                id: team.id
              }
            },
            project: {
              connect: {
                id: project.id
              }
            }
          }
        })
      }

    });
  } catch (e) {
    console.log(e);
    return {
      message: "failed to create project",
      success: false
    }
  }

  //create activity
  const createActivityInput: CreateActivityInput = {
    action: ActivityAction.PROJECT_CREATED,
    entityType: EntityType.PROJECT,
    entityId: projectId,
    entityName: projectKey,
    description: "new project project created",
    userId: context.userId,
  }
  try {
    await CreateActivity(createActivityInput);
  } catch (e) {
    console.log("Failed to create activity", e);
  }


  // //fetch the project 
  // const project = await context.client.project.findFirst({
  //   where: {
  //     key: args.input.key,
  //   },
  //   select: {
  //     id: true,
  //     name: true,
  //     creatorId: true,
  //     key: true,
  //   },
  // });

  return {
    message: "Project Created Successfully",
    success: true,
  };
};
