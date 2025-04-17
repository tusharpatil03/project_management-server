import gql from 'graphql-tag'

export const inputs = gql`
  # Inputs for Mutations
  input AuthInput {
    email: String!
    password: String!
    role: Role!
  }
  input CreateProjectInput {
    name: String!
    description: String!
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
    assigneeId: ID
    projectId: ID!
    dueDate: DateTime
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
    id: ID!
    assignee: ID!
  }
`
