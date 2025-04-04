import gql from "graphql-tag";

export const inputs = gql`
  # Inputs for Mutations
  input UserRegisterInput {
    email: String!
    password: String!
    role: Role!
  }
  input CreateProjectInput {
    name: String!
    description: String!
    creatorId: ID!
    goal: String
    plan: String
  }

  input CreateTeamInput {
    name: String!
    creatorId: ID!
    memberIds: [ID!]
  }

  input CreateTaskInput {
    title: String!
    description: String
    creatorId: ID!
    assigneeId: ID
    projectId: ID!
    sprintId: ID
    status: TaskStatus
    dueDate: DateTime
  }

  input CreateSprintInput {
    title: String!
    description: String
    creatorId: ID!
    projectId: ID!
    dueDate: DateTime!
    status: SprintStatus
    tasks: [Task]
  }

  input AssignTaskInput {
    id: ID!
    assignee: ID!
  }
`;
