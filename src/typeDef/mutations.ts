import gql from 'graphql-tag';

export const mutations = gql`
  # Mutations
  type Mutation {
    createProject(input: CreateProjectInput!): ResponseMessage! @auth

    createTeam(input: CreateTeamInput!): Team! @auth

    createIssue(input: CreateIssueInput!): ResponseMessage! @auth @role(requires: [Admin, Contributor])

    createSprint(input: CreateSprintInput!): ResponseMessage! @auth @role(requires: [Admin, Contributor])

    updateIssueStatus(
      projectId: ID!
      issueId: ID!
      status: IssueStatus!
    ): ResponseMessage! @auth @role(requires: [Admin, Contributor])

    assineIssue(input: AssignIssueInput!): ResponseMessage! @auth @role(requires: [Admin, Contributor])

    signup(input: SignupInput!): ResponseMessage!

    login(input: LoginInput!): AuthData!

    removeProject(projectId: ID!): ResponseMessage @auth @role(requires: [Admin])

    removeIssue(input: removeIssueInput!): ResponseMessage @auth @role(requires: [Admin, Contributor])

    removeSprint(input: removeSprintInput!): ResponseMessage @auth @role(requires: [Admin, Contributor])

    removeAssineeOfIssue(issueId: ID!): ResponseMessage @auth @role(requires: [Admin, Contributor])

    removeTeam(teamId: ID!): ResponseMessage @auth @role(requires: [Admin])

    addTeamMember(input: addTeamMemberInput!): UserTeam! @auth @role(requires: [Admin])

    logout: Boolean! @auth

    removeTeamMember(input: removeTeamMemberInput!): Team! @auth @role(requires: [Admin])

    refreshToken(refreshToken: String!): ExtendSession!

    addIssueInSprint(input: addIssueInput!): ResponseMessage @auth @role(requires: [Admin, Contributor])

    addProjectTeam(input: addProjectTeamInput!): ResponseMessage @auth @role(requires: [Admin])

    sendVerificationLink(email:String!): ResponseMessage

    verifyUser(token:String!): AuthData!

    updateUserProfile(input: UpdateProfileInput!): ResponseMessage! @auth
  }
`;
