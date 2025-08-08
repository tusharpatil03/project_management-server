import gql from 'graphql-tag';

export const queries = gql`
  # Queries
  type Query {
    getUser(userId: ID, email:String): User! @auth
    checkAuth: User @auth

    getTeamById(teamId: ID!): Team! @auth
    getAllTeams(name: String!): [Team] @auth
    getAllUserTeams: [UserTeam]! @auth
    getProjectTeamsMembers(projectId: ID!): [User]  @auth @role(requires:Contributor)


    getIssueById(issueId: ID!): Issue! @auth
    getAllIssues(projectId: ID!, sprintId:String): [Issue] @auth

    getAllSprints(projectId: ID!): [Sprint] @auth
    getActiveSprint(projectId: ID!): Sprint @auth
    getSprintById(id: ID!, projectId: ID!): Sprint! @auth


    getRecentProject: Project @auth
    getAllProjects: [Project] @auth
    getProject(projectKey: String , projectId: String): Project @auth
  }
`;
