import { ActivityAction, EntityType, MemberRole, Prisma } from '@prisma/client';
import { AddTeamMemberInput, MutationResolvers } from '../../types/generatedGraphQLTypes';
import { client } from '../../db/db';
import { notFoundError } from '../../libraries/errors/notFoundError';
import { ALREADY_MEMBER_OF_TEAM, MEMEBER_NOT_FOUND_ERROR, TEAM_NOT_FOUND } from '../../globals';
import { conflictError } from '../../libraries/errors/conflictError';
import { CreateActivity, CreateActivityInput } from '../../services/Activity/Create';

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


// this resolver will add the user into a team by creating a UserTeam instance
//input: teamId, memberId
export const addTeamMember: MutationResolvers['addTeamMember'] = async (
  _,
  args,
  context
) => {
  const input: AddTeamMemberInput = args.input;

  //this DB query will fetch team created by this user (user who called this mutation)
  const adminUserTeam = await context.client.userTeam.findFirst({
    where: {
      AND: [
        { teamId: input.teamId },
        { userId: context.userId }
      ]
    },
    select: TeamAdminSelect
  });

  if(!adminUserTeam){
    throw new Error("User Team Not found");
  }

  //check for role of user === Admin
  if (adminUserTeam?.role !== MemberRole.Admin) {
    throw new Error('Unauthorized access');
  }

  //find team to check is exist or not
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
    select: {
      id: true, //lightweight fetch
    }
  });

  if (!member) {
    throw new notFoundError(MEMEBER_NOT_FOUND_ERROR.MESSAGE, MEMEBER_NOT_FOUND_ERROR.CODE);
  }

  //check user is already member of the team
  const isAlreadyMember = team.users.some(
    (team) => team.userId === input.memberId
  );

  if (isAlreadyMember) {
    throw new conflictError(ALREADY_MEMBER_OF_TEAM.MESSAGE, ALREADY_MEMBER_OF_TEAM.CODE)
  }

  // create the user_team and update the user with new user_team
  try {
    const userTeam = await context.client.userTeam.create({
      data: createUserTeam(
        input.memberId, input.teamId, input.role as MemberRole
      )
    });

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
    console.log(e);
    throw new Error("Failed to create user team")
  }

  // fetch the update team
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

  //create activity: issues added in sprint
  const createActivityInput: CreateActivityInput = {
    action: ActivityAction.TEAM_MEMBER_ADDED,
    entityType: EntityType.TEAM,
    entityId: team.id,
    entityName: team.name,
    description: `member added to team ${team.name}`,
    userId: context.userId,
    teamId: team.id,
  }
  try {
    await CreateActivity(createActivityInput, context.client);
  } catch (e) {
    console.log("Failed to create activity", e);
  }

  return {
    id: updatedTeam.id,
    name: updatedTeam.name,
    userTeams: updatedTeam.users.map((ut) => ut),
    updatedAt: updatedTeam.updatedAt,
  };
};
