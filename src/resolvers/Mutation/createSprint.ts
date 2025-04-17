import { MutationResolvers } from '../../types/generatedGraphQLTypes'

export const createSprint: MutationResolvers['createSprint'] = async (
  _,
  args,
  context
) => {
  const { input } = args
  try {
    const sprint = context.prisma.sprint.create({
      data: {
        title: input.title,
        description: input.description,
        dueDate: input.dueDate,
        creator: {
          connect: {
            id: context.authData.userId,
          },
        },
        tasks: input.tasks,
        projectId: input.projectId,
      },
    })

    return sprint
  } catch (e) {
    console.log('Error in Creating Sprint: ', e)
    throw new Error('unable to create Sprint')
  }
}
