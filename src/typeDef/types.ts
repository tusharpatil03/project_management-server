import gql from "graphql-tag";

export const types = gql`
  # Auth Data
  type AuthData {
    user: User!
    profile: profile
    accessToken: String!
    refreshToken: String!
  }

  type ExtendSession {
    accessToken: String
    refreshToken: String
  }

  # User Type
  type User {
    id: ID!
    email: EmailAddress
    firstName: String
    lastName: String
    isVerified: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    projects: [Project]
    sprints: [Sprint]
    teams: [Team]
    createdTeams: [Team]
    createdIssues: [Issue]
    assignedIssues: [Issue]
    profile: profile
  }

  type profile {
    id: ID!
    gender: Gender
    phone: String
    avatar: String
    social: Social
    createdAt: DateTime
    updatedAt: DateTime
    userId: ID
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
    issues: [Issue]
    sprints: [Sprint]
    status: ProjectStatus
    creatorId: String!
  }

  type ProjectTeam {
    id: ID!
    projectId: ID
    teamId: ID
    project: Project
    team: Team
    joinedAt: DateTime
  }

  type UserTeam {
    id: ID!
    userId: ID
    teamId: ID
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
    users: [UserTeam]
    projects: [Project]
    createdAt: DateTime
    updatedAt: DateTime
  }

  # Issue Type
  type Issue {
    id: String
    title: String!
    key: String!
    description: String
    type: IssueType
    status: IssueStatus
    dueDate: DateTime!
    createdAt: DateTime
    updatedAt: DateTime
    projectId: String
    creatorId: String
    creator: IssueCreator
    assignee: IssueAssignee
    sprintId: String
    parentId: String
    parent: Issue
    childrens: [Issue]
  }

  type IssueCreator {
    id: ID!
    firstName: String
    lastName: String
    email: String
    profile: profile
  }

  type IssueAssignee {
    id: ID!
    firstName: String
    lastName: String
    email: String
    profile: profile
    createdAt: DateTime
    updatedAt: DateTime
  }

  # Sprint Type
  type Sprint {
    id: ID!
    title: String!
    key: String!
    description: String
    status: SprintStatus
    createdAt: DateTime
    updatedAt: DateTime
    dueDate: DateTime!
    creator: User
    project: Project
    projectId: String
    creatorId: String
    issues: [Issue]
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
    createdAt: DateTime
    updatedAt: DateTime
    firstName: String
    lastName: String
    phone: String
  }
`;
