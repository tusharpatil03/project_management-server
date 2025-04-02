import gql from "graphql-tag";

export const queries = gql`
  # Queries
  type Query {
    getUserById(id: ID!): User
    getProjectById(id: ID!): Project
    getTeamById(id: ID!): Team
    getTaskById(id: ID!): Task
    getSprintById(id: ID!): Sprint
    listProjects: [Project]
    listTeams: [Team]
    listTasks: [Task]
    listSprints: [Sprint]
  }
`;
