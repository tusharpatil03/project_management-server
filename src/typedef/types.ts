import gql from "graphql-tag";

export const types = gql`

type AuthData {
    user: User!
    appUserProfile: AppUserProfile!
    accessToken: String!
    refreshToken: String!
  }
  type User {
    _id: ID!
    identifier: Int!
    appUserProfileId: AppUserProfile
    createdAt: DateTime
    email: EmailAddress!
    updatedAt: DateTime
    projects: [Project]
    teams: [Team]
    createdTeams: [Team]
    createdTasks: [Task]
    assignedTasks: [Task]
    sprints: [Sprint]
  }

  type Project {
    _id: ID!
    name: string
    description: string
    creatorId: string
    updatedAt: DateTime
    teams: [Team]
    tasks: [Task]
    sprints: [Sprint]
    status: ProjectStatus
  }

  type Team {
    _id: ID!
    creatorId: string
    members: [User]
    projects: [Project]
    updatedAt: string
    createdAt: string
  }

  type Task {
    _id: ID!
    creatorId: string
    createdAt: DateTime
    updatedAt: DateTime
    status: TaskStatus
    assigneeId: string
    projectId: string
    sprintId: string
  }

  type Spint {
    _id: ID!
    creatorId: string
    updatedAt: DateTime
    createdAt: DateTime
    dueDate: DateTime
    tasks: [Taks]
    projectId: Project
    status: SprintStatus
  }

`;
