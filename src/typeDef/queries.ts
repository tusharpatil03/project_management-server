import gql from 'graphql-tag';

export const queries = gql`
  # Queries
  type Query {
    getUserById(id: ID!): UserProfile! @auth
    getProjectById(id: ID!): Project! @auth
    getTeamById(id: ID!): Team! @auth
    getTaskById(id: ID!): Task! @auth
    getSprintById(id: ID!, projectId: ID!): Sprint! @auth
    getAllProjects: [Project] @auth
    getAllTasks(projectId: ID!): [Task]! @auth
    getAllSprints(projectId: ID!): [Sprint]! @auth
  }
`;
