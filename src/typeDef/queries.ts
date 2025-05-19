import gql from 'graphql-tag';

export const queries = gql`
  # Queries
  type Query {
    getUserById(userId: ID!): User! @auth
    getProjectById(projectId: ID!): Project! @auth
    getTeamById(teamId: ID!): Team! @auth
    getTaskById(taskId: ID!): Task! @auth
    getSprintById(id: ID!, projectId: ID!): Sprint! @auth
    getAllProjects: [Project] @auth
    getAllTasks(projectId: ID!): [Task]! @auth
    getAllSprints(projectId: ID!): [Sprint]! @auth
    getAllUserTeams(userId: ID!): [Team]!
  }
`;
