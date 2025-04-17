import { MutationResolvers } from '../../types/generatedGraphQLTypes'

export const createTeam: MutationResolvers['createTeam'] = async (
  _,
  args,
  context
) => {
  const { input } = args
  const sprint = context.prisma.sprint.create({
    data: {
      name: input.name,
      creatorId: input.creatorId,
      members: input.memberIds,
    },
  })

  return sprint
}
