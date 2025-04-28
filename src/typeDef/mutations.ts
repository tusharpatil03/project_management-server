import gql from 'graphql-tag';

export const mutations = gql`
  # Mutations
  type Mutation {
    createProject(input: CreateProjectInput!): Project! @auth

    createTeam(input: CreateTeamInput!): Team! @auth

    createTask(input: CreateTaskInput!): Task! @auth

    createSprint(input: CreateSprintInput!): Sprint! @auth

    updateTaskStatus(taskId: ID!, status: TaskStatus!): ResponseMessage! @auth

    assineTask(input: AssignTaskInput!): ResponseMessage! @auth

    signup(input: SignupInput!): AuthData!

    login(input: LoginInput!): AuthData!

    removeProject(projectId: ID!): ResponseMessage @auth

    removeTask(taskId: ID!, projectId: ID!): ResponseMessage @auth

    removeSprint(sprintId: ID!, projectId: ID!): ResponseMessage @auth

    removeAssineeOfTask(taskId: ID!): Task! @auth

    addTeamMember(teamId: ID!, memberId: ID!, role: String): Team! @auth

    logout: Boolean! @auth
  }
`;
