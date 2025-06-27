import gql from 'graphql-tag';

export const mutations = gql`
  # Mutations
  type Mutation {
    createProject(input: CreateProjectInput!): Project! @auth

    createTeam(input: CreateTeamInput!): Team! @auth

    createIssue(input: CreateIssueInput!): Issue! @auth

    createSprint(input: CreateSprintInput!): Sprint! @auth

    updateIssueStatus(
      projectId: ID!
      issueId: ID!
      status: IssueStatus!
    ): ResponseMessage! @auth

    assineIssue(input: AssignIssueInput!): ResponseMessage! @auth

    signup(input: SignupInput!): AuthData!

    login(input: LoginInput!): AuthData!

    removeProject(projectId: ID!): ResponseMessage @auth

    removeIssue(issueId: ID!, projectId: ID!): ResponseMessage @auth

    removeSprint(sprintId: ID!, projectId: ID!): ResponseMessage @auth

    removeAssineeOfIssue(issueId: ID!): Issue! @auth

    removeTeam(teamId: ID!): ResponseMessage @auth

    addTeamMember(memberId: ID!, teamId: ID!, role: String!): Team! @auth

    logout: Boolean! @auth

    removeTeamMember(memberId: ID!, teamId: ID!): Team! @auth

    refreshToken(refreshToken: String): ExtendSession!

    addIssueInSprint(input: addIssueInput): ResponseMessage @auth
  }
`;
