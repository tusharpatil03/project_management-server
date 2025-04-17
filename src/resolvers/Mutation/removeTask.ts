import { MutationResolvers } from '../../types/generatedGraphQLTypes'
import { client } from '../../db'
import { UnauthorizedError } from '../../libraries/errors/unAuthorizedError'

export const removeTask: MutationResolvers['removeTask'] = async (
  _,
  args,
  context
) => {
  const { taskId, projectId } = args

  try {
    const task = await client.task.findUnique({
      where: { id: taskId },
      include: { project: true },
    })

    if (!task || task.projectId !== projectId) {
      throw new Error('Task is not part of this project')
    }

    // Only allow project creator to delete
    const project = await client.project.findUnique({
      where: { id: projectId },
    })

    let operations = []

    if (!project) {
      throw new Error('Project does not exists')
    } else {
      operations.push(
        client.project.update({ where: { id: projectId }, data: {} })
      )
    }

    if (task.creatorId !== context.authData.userId) {
      if (project.creatorId !== context.authData.userId) {
        throw new UnauthorizedError('You are not creator of this project')
      } else {
        throw new UnauthorizedError('You are not creator of this task')
      }
    } else {
      operations.push(client.task.delete({ where: { id: args.taskId } }))
    }

    await client.$transaction(operations)

    return {
      success: true,
      message: 'Task removed successfully.',
      status: 200,
    }
  } catch (error) {
    console.error('Error removing task:', error)
   throw new Error("Unable to Delete Taks")
  }
}
