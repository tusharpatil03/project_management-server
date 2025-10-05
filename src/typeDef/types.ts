import gql from "graphql-tag";

export const types = gql`
  # Auth Data
  type AuthData {
    user: User!
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
    email: EmailAddress!
    firstName: String!
    lastName: String!
    isVerified: Boolean
    createdAt: DateTime
    updatedAt: DateTime
    projects: [Project]
    teams: [UserTeam]
    createdTeams: [Team]
    createdIssues: [Issue]
    assignedIssues: [Issue]
    profile: profile
    activities: [Activity]
    comments: [Comment]
  }

  type Activity {
    id: ID!
    action: ActivityAction!
    entityType: EntityType!
    entityId: String
    entityName: String
    description: String
    user: User
    project: Project
    sprint: Sprint
    issue: Issue
    team: Team
    createdAt: DateTime
  }

  type profile {
    id: ID!
    gender: Gender
    phone: String
    avatar: String
    bio: String
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
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Project {
    id: ID!
    key: String!
    name: String!
    description: String
    starred: Boolean
    creator: User
    status: ProjectStatus
    createdAt: DateTime
    updatedAt: DateTime
    teams: [ProjectTeam]
    sprints: [Sprint]
    issues: [Issue]
    activities: [Activity]
  }

  type Team {
    id: ID!
    name: String
    creator: User
    createdAt: DateTime
    updatedAt: DateTime
    projects: [ProjectTeam]
    users: [UserTeam]
    activities: [Activity]
  }

  type UserTeam {
    id: ID!
    user: User
    team: Team
    role: MemberRole
    joinedAt: DateTime
  }

  type ProjectTeam {
    id: ID!
    project: Project
    team: Team
    joinedAt: DateTime
  }

  # Issue Type
  type Issue {
    id: ID!
    key: String!
    title: String!
    description: String
    status: IssueStatus
    priority: IssuePriority
    createdAt: DateTime
    updatedAt: DateTime
    dueDate: DateTime
    type: IssueType
    creator: User
    assignee: User
    project: Project
    sprint: Sprint
    comments: [Comment]
    activities: [Activity]
  }

  type Comment {
    id: ID!
    content: String!
    issue: Issue
    author: User
    createdAt: DateTime
    updatedAt: DateTime
  }

  type Sprint {
    id: ID!
    key: String!
    startDate: DateTime
    dueDate: DateTime
    title: String
    description: String
    status: SprintStatus
    createdAt: DateTime
    updatedAt: DateTime
    project: Project
    issues: [Issue]
    activities: [Activity]
  }

  type ResponseMessage {
    success: Boolean!
    status: Int
    message: String
  }


  type activeSprintStat {
    totalIssues: Int
    openIssues: Int
    closedIssues: Int
    inProgressIssues: Int
  }

  type ProjectStat {
    totalIssues: Int
    openIssues: Int
    closedIssues: Int
    inProgressIssues: Int
    totalSprints: Int
    activeSprintStat: activeSprintStat
  }
`;
