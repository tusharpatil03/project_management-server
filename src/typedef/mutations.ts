import gql from "graphql-tag";

export const mutations = gql`
  # Mutations
  type Mutation {
    createProject(input: CreateProjectInput!): Project
    createTeam(input: CreateTeamInput!): Team
    createTask(input: CreateTaskInput!): Task
    createSprint(input: CreateSprintInput!): Sprint
    updateTaskStatus(taskId: ID!, status: TaskStatus!): ResponseMessage
    assineTask(tasksId: ID!, assignee: ID!): ResponseMessage
  }
`;
