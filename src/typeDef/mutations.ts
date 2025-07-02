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
    ): ResponseMessage! @auth @role(requires: Admin)

    assineIssue(input: AssignIssueInput!): ResponseMessage! @auth

    signup(input: SignupInput!): AuthData!

    login(input: LoginInput!): AuthData!

    removeProject(projectId: ID!): ResponseMessage @auth

    removeIssue(input: removeIssueInput!): ResponseMessage @auth

    removeSprint(input: removeSprintInput!): ResponseMessage @auth

    removeAssineeOfIssue(issueId: ID!): ResponseMessage @auth

    removeTeam(teamId: ID!): ResponseMessage @auth

    addTeamMember(input: addTeamMemberInput!): Team! @auth @role(requires: Admin)

    logout: Boolean! @auth

    removeTeamMember(input: removeTeamMemberInput!): Team! @auth

    refreshToken(refreshToken: String!): ExtendSession!

    addIssueInSprint(input: addIssueInput!): ResponseMessage @auth

    addProjectTeam(input: addProjectTeamInput!): ResponseMessage @auth
  }
`;
