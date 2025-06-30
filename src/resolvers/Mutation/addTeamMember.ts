import { MemberRole, Prisma } from '@prisma/client';
import { AddTeamMemberInput, MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';
import { notFoundError } from '../../libraries/errors/notFoundError';
import { ALREADY_MEMBER_OF_TEAM, MEMEBER_NOT_FOUND_ERROR, TEAM_NOT_FOUND } from '../../globals';
import { conflictError } from '../../libraries/errors/conflictError';

//select team scalors method with validator returns defined feild object
export const TeamAdminSelect = Prisma.validator(
  client,
  "userTeam",
  "findFirst",
  "select"
)({
  id: true,
  role: true
});

//a function that take filds as input and validate it with UserTeamCreateInput returns a object that have defined fields
//example use in userteam create query defined in addTeamMember resolver, here i passed a function call with parameters that willl return data
const createUserTeam = (
  userId: string,
  teamId: string,
  role: MemberRole
) => {
  return Prisma.validator<Prisma.UserTeamCreateInput>()({
    role,
    user: {
      connect: { id: userId },
    },
    team: {
      connect: { id: teamId },
    }
  })
}

//a more cleaner appraoch to creating types , provides flexibility
const userWithTeams = Prisma.validator<Prisma.UserDefaultArgs>()({
  include: {
    teams: true
  }
})
type UserWithTeams = Prisma.UserGetPayload<typeof userWithTeams>

// type ThenArg<T> = T extends PromiseLike<infer U> ? U : T
// type UserWithTeams = ThenArg<ReturnType<typeof >>

export const addTeamMember: MutationResolvers['addTeamMember'] = async (
  _,
  args,
  context
) => {
  const input: AddTeamMemberInput = args.input;
  const AdminUserTeam = await context.client.userTeam.findFirst({
    where: {
      teamId: input.teamId,
      userId: context.userId,
    },
    select: TeamAdminSelect
  });
  if (AdminUserTeam?.role !== MemberRole.Admin) {
    throw new Error('Unauthorized access');
  }

  const team = await context.client.team.findUnique({
    where: { id: input.teamId },
    include: {
      users: {
        select: { userId: true },
      },
    },
  });

  if (!team) {
    throw new notFoundError(TEAM_NOT_FOUND.MESSAGE, TEAM_NOT_FOUND.CODE);
  }

  const member = await context.client.user.findUnique({
    where: { id: input.memberId },
  });

  if (!member) {
    throw new notFoundError(MEMEBER_NOT_FOUND_ERROR.MESSAGE, MEMEBER_NOT_FOUND_ERROR.CODE);
  }

  const isAlreadyMember = team.users.some(
    (team) => team.userId === input.memberId
  );

  if (isAlreadyMember) {
    throw new conflictError(ALREADY_MEMBER_OF_TEAM.MESSAGE, ALREADY_MEMBER_OF_TEAM.CODE)
  }

  const userTeam = await context.client.userTeam.create({
    data: createUserTeam(
      input.memberId, input.teamId, input.role as MemberRole
    )
  });

  try {
    await context.client.user.update({
      where: { id: input.memberId },
      data: {
        teams: {
          connect: {
            id: userTeam.id,
          },
        },
      },
    });
  }
  catch (e) {
    throw new Error("Failed to update user")
  }

  const updatedTeam = await context.client.team.findUnique({
    where: { id: input.teamId },
    select: {
      id: true,
      name: true,
      users: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true,
              email: true,
              teams: true,
            },
          },
          role: true,
        },
      },
      updatedAt: true,
    },
  });

  if (!updatedTeam) {
    throw new Error('Failed to fetch updated team after adding member');
  }

  return {
    id: updatedTeam.id,
    name: updatedTeam.name,
    userTeams: updatedTeam.users.map((ut) => ut),
    updatedAt: updatedTeam.updatedAt,
  };
};
