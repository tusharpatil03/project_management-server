import gql from "graphql-tag";

export const types = gql`
  # Auth Data
  type AuthData {
    user: User!
    accessToken: String!
    refreshToken: String!
  }

  # User Type
  type User {
  id: ID!
  createdAt: DateTime
  email: EmailAddress
  updatedAt: DateTime
  projects: [Project]  # Always an array (even if empty)
  teams: [Team]
  createdTeams: [Team]
  createdTasks: [Task]
  assignedTasks: [Task]
  sprints: [Sprint]
}

  # Project Type
  type Project {
    _id: ID!
    name: String!
    description: String!
    creator: User!
    createdAt: DateTime
    updatedAt: DateTime
    teams: [Team]
    tasks: [Task]
    sprints: [Sprint]
    status: ProjectStatus
    goal: String
    plan: String
  }

  # Team Type
  type Team {
    _id: ID!
    name: String!
    creator: User!
    members: [User]
    projects: [Project]
    createdAt: DateTime
    updatedAt: DateTime
  }

  # Task Type
  type Task {
    _id: ID!
    title: String!
    description: String
    creator: User!
    assignee: User
    project: Project
    sprint: Sprint
    createdAt: DateTime
    updatedAt: DateTime
    status: TaskStatus
  }

  # Sprint Type
  type Sprint {
    _id: ID!
    name: String!
    creatorId: User!
    createdAt: DateTime
    updatedAt: DateTime
    dueDate: DateTime
    tasks: [Task]
    project: Project
    status: SprintStatus
  }

  type ResponseMessage {
    success: Boolean!
    message: String!
  }
`;
