import gql from 'graphql-tag';

export const inputs = gql`
  # Inputs for Mutations
  input LoginInput {
    email: EmailAddress!
    password: String!
  }
  input SignupInput {
    email: EmailAddress!
    username: String!
    password: String!
    firstName: String!
    lastName: String!
  }
  input CreateProjectInput {
    name: String!
    key: String!
    description: String
  }

  input CreateTeamInput {
    name: String!
  }

  input CreateTaskInput {
    title: String!
    description: String
    assigneeId: ID
    projectId: ID!
    dueDate: DateTime!
    status: TaskStatus
    sprintId: ID
  }

  input CreateSprintInput {
    title: String!
    description: String
    projectId: ID!
    dueDate: DateTime!
    status: SprintStatus
    tasks: [CreateTaskInput!]
  }

  input AssignTaskInput {
    taskId: ID!
    assigneeId: ID!
    projectId: ID!
  }
`;
