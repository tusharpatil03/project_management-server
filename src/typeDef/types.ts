import gql from 'graphql-tag';

export const types = gql`
  # Auth Data
  type AuthData {
    user: User!
    userProfile: UserProfile!
    accessToken: String!
  }

  type ExtendSession {
    accessToken: String
    refreshToken: String
  }

  # User Type
  type User {
    id: ID!
    email: EmailAddress!
    username: String!
    role: Role
    createdAt: DateTime
    updatedAt: DateTime
    projects: [Project]
    sprints: [Sprint]
    teams: [Team]
    createdTeams: [Team]
    createdTasks: [Task]
    assignedTasks: [Task]
    firstName: String
    lastName: String
    phone: String
    gender: String
    avatar: String
    social: Social
    userProfile: UserProfile
  }

  type UserProfile {
    id: ID!
    firstName: String!
    lastName: String!
    avatar: String
    phone: String
    gender: Gender
    social: Social
    createdAt: DateTime
    updatedAt: DateTime
    user: User
  }

  type Social {
    id: ID!
    github: String
    facebook: String
    twitter: String
    linkedin: String
    createdAt: DateTime!
    updatedAt: DateTime!
  }
  
  type Project {
    id: ID!
    key: String!
    name: String
    description: String
    createdAt: DateTime
    updatedAt: DateTime
    tasks: [Task]
    status: ProjectStatus
    creatorId: String!
  }

  type ProjectTeam {
    id: ID!
    projectId: ID!
    teamId: ID!
    project: Project
    team: Team
    joinedAt: DateTime
  }

  type UserTeam {
    id: ID!
    userId: ID!
    teamId: ID!
    role: MemberRole
    joinedAt: DateTime
    user: User
    team: Team
  }

  # Team Type
  type Team {
    id: ID!
    name: String
    creatorId: String
    members: [User]
    projects: [Project]
    createdAt: DateTime
    updatedAt: DateTime
  }

  # Task Type
  type Task {
    id: String!
    title: String!
    description: String
    creator: TaskCreator
    assignee: TaskAssignee
    projectId: String
    sprintId: String
    createdAt: Date
    updatedAt: Date
    status: TaskStatus
    dueDate: Date!
  }

  type TaskCreator {
    id: ID!
    firstName: String
    lastName: String
    email: String
  }

  type TaskAssignee {
    id: ID!
    firstName: String
    lastName: String
    username: String
    email: String
    avatar: String
    createdAt: DateTime
    updatedAt: DateTime
    role: Role
  }

  # Sprint Type
  type Sprint {
    id: ID!
    title: String!
    description: String
    status: SprintStatus!
    createdAt: DateTime
    updatedAt: DateTime
    dueDate: DateTime!
    creator: User
    project: Project
    projectId: String
    creatorId: String
    tasks: [Task]!
  }

  type ResponseMessage {
    success: Boolean!
    status: Int
    message: String
  }

  # Auth Type
  type Auth {
    user: User
    token: String
    accessToken: String
    expiresIn: Int
    tokenType: String
    scope: String
    idToken: String
    authData: AuthData
    userId: String
    email: String
    role: Role
    createdAt: DateTime
    updatedAt: DateTime
    firstName: String
    lastName: String
    phone: String
  }
`;
