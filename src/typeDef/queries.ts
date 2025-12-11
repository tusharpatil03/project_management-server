import gql from 'graphql-tag';

export const queries = gql`
  # Queries
  type Query {
    getUserById(userId: ID!): User @auth
    getUserInfo: User @auth
    checkAuth: User @auth
    getUsersBySearch(search: String!): [User]! @auth

    getTeamById(teamId: ID!): Team! @auth
    getAllTeams: [Team] @auth
    getAllUserTeams: [UserTeam]! @auth
    getProjectTeamsMembers(projectId: ID!): [User]  @auth @role(requires:[Contributor, Admin, Viewer])


    getIssueById(issueId: ID!, projectId: ID!): Issue! @auth @role(requires:[Contributor, Admin, Viewer])
    getAllIssues(projectId: ID!, sprintId:String, page: Int!, pageSize:Int!): [Issue] @auth @role(requires:[Contributor, Admin, Viewer])

    getAllSprints(projectId: ID!): [Sprint] @auth
    getActiveSprint(projectId: ID!): Sprint @auth @role(requires:[Contributor, Admin, Viewer])
    getSprintById(id: ID!, projectId: ID!): Sprint! @auth @role(requires:[Contributor, Admin, Viewer])


    getRecentProject: Project @auth
    getAllProjects: [Project] @auth
    getProject(projectKey: String , projectId: String): Project @auth @role(requires:[Contributor, Admin, Viewer])
    getProjectStat(projectId: ID!): ProjectStat @auth @role(requires:[Contributor, Admin, Viewer])
  }
`;
