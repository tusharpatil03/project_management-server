import gql from 'graphql-tag'

export const mutations = gql`
  # Mutations
  type Mutation {
    createProject(input: CreateProjectInput!): Project!
    createTeam(input: CreateTeamInput!): Team!
    createTask(input: CreateTaskInput!): Task!
    createSprint(input: CreateSprintInput!): Sprint!
    updateTaskStatus(taskId: ID!, status: TaskStatus!): ResponseMessage!
    assineTask(input: AssignTaskInput!): ResponseMessage!
    signup(input: AuthInput!): AuthData!
    signin(input: AuthInput!): AuthData!

    removeProject(projectId: ID!): ResponseMessage
    removeTask(taskId: ID!, projectId: ID!): ResponseMessage
    removeSprint(sprintId: ID!, projectId: ID!): ResponseMessage
  }
`
