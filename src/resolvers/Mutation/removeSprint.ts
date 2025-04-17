import { ProjectStatus } from '@prisma/client'
import { client } from '../../db'
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError'
import { MutationResolvers } from '../../types/generatedGraphQLTypes'

export const removeSprint: MutationResolvers['removeSprint'] = async (
  _,
  args,
  context
) => {
  const project = await client.project.findUnique({
    where: {
      id: args.projectId,
    },
    include: { sprints: true },
  })

  if (!project) {
    throw new Error('Project Does not Exist')
  }

  const sprintId = project.sprints.map((s) => s.id == args.sprintId)

  if (!sprintId) {
    throw new Error('Sprint is not part of this Project')
  }
  const sprint = await client.sprint.findUnique({
    where: { id: args.sprintId },
    include: { tasks: true },
  })
  if (!sprint) {
    throw new Error('Sprint Not Found')
  }
  if (context.authData.userId === sprint?.creatorId) {
    throw new UnauthorizedError('You are not Creator of this Sprint', '403')
  }

  let operations = []
  if (sprint) {
    operations.push(client.sprint.deleteMany({ where: { id: args.sprintId } }))
  }
  if (sprint.tasks.length > 0) {
    operations.push(client.sprint.deleteMany({ where: { id: args.sprintId } }))
  }

  try {
    return {
      success: true,
      status: 200,
    }
  } catch (e) {
    console.log('Delete Sprint Failed')
    throw new Error('tarnsaction Failed')
  }
}
