import gql from 'graphql-tag';

export const queries = gql`
  # Queries
  type Query {
    getUserById(userId: ID!): User! @auth

    getProjectById(projectId: ID!): Project! @auth

    getTeamById(teamId: ID!): Team! @auth

    getIssueById(issueId: ID!): Issue! @auth

    getSprintById(id: ID!, projectId: ID!): Sprint! @auth

    getAllProjects: [Project] @auth

    getAllIssues(projectId: ID!): [Issue] @auth

    getAllSprints(projectId: ID!): [Sprint] @auth

    getAllUserTeams: [UserTeam]! @auth

    getRecentProject: Project @auth

    getUserByEmail(email: String!): User!  @auth

    getProjectTeamsMembers(projectId: ID!): [User]  @auth @role(requires:Contributor)
    
    checkAuth: User @auth

    getActiveSprint(projectId: ID!): Sprint @auth
  }
`;
