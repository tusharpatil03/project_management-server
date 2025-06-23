import { MemberRole, Prisma } from '@prisma/client';
import { MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db';

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
  try {

    const AdminUserTeam = await context.client.userTeam.findFirst({
      where: {
        teamId: args.teamId,
        userId: context.userId,
      },
      select: TeamAdminSelect
    });
    if (AdminUserTeam?.role !== MemberRole.Admin) {
      throw new Error('Unauthorized access');
    }

    const team = await context.client.team.findUnique({
      where: { id: args.teamId },
      include: {
        users: {
          select: { userId: true },
        },
      },
    });

    if (!team) {
      throw new Error(`No Team Found with id: ${args.teamId}`);
    }

    const member = await context.client.user.findUnique({
      where: { id: args.memberId },
    });

    if (!member) {
      throw new Error(`User Not Found with id: ${args.memberId}`);
    }

    const isAlreadyMember = team.users.some(
      (team) => team.userId === args.memberId
    );

    if (isAlreadyMember) {
      throw new Error('User is already a member of the team');
    }

    const userTeam = await context.client.userTeam.create({
      data: createUserTeam(
        args.memberId, args.teamId, args.role as MemberRole
      )
    });

    await context.client.user.update({
      where: { id: args.memberId },
      data: {
        teams: {
          connect: {
            id: userTeam.id,
          },
        },
      },
    });

    const updatedTeam = await context.client.team.findUnique({
      where: { id: args.teamId },
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
  } catch (error: any) {
    console.error('Failed to add team member:', error);
    throw new Error(`Failed to add team member: ${error.message || error}`);
  }
};
