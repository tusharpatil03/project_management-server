import gql from "graphql-tag";

export const inputs = gql`
  # Inputs for Mutations
  input LoginInput {
    email: EmailAddress!
    password: Password!
  }
  input SignupInput {
    email: EmailAddress!
    password: Password!
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

  input CreateIssueInput {
    title: String!
    description: String
    assigneeId: ID
    projectId: ID!
    type: IssueType!
    dueDate: DateTime!
    status: IssueStatus
    sprintId: ID
    parentId: ID
  }

  input addIssueInput {
    id: ID!
    sprintId: ID!
  }

  input IssueInput {
    id: ID
    type: IssueType
  }

  input CreateSprintInput {
    title: String!
    description: String
    projectId: ID!
    dueDate: DateTime!
    status: SprintStatus
    issues: [IssueInput]
  }

  input AssignIssueInput {
    issueId: ID!
    assigneeId: ID!
    projectId: ID!
  }

  input removeIssueInput {
    issueId: ID!
    projectId: ID!
  }

  input removeSprintInput {
    sprintId: ID!
    projectId: ID!
  }

  input addTeamMemberInput {
    memberId: ID!
    teamId: ID!
    role: String!
    projectId: ID!
  }

  input removeTeamMemberInput {
    memberId: ID!
    teamId: ID!
    projectId: ID!
  }

  input addProjectTeamInput {
    projectId: ID!
    teamId: ID!
  }

  input UpdateProfileInput {
    firstName: String
    lastName: String
    profile: ProfileInput
  }

  # A nested input type for the user's profile information.
  input ProfileInput {
    bio: String
    phone: String
    gender: String
    avatar: String # This would typically be a URL to the uploaded image.
    social: SocialInput
  }

  # A nested input type for social media links.
  input SocialInput {
    github: String
    linkedin: String
    twitter: String
    facebook: String
  }

  input UpdateIssueInput {
    issueId: String!
    projectId: String!
    title: String
    description: String
    status: IssueStatus
    priority: IssuePriority
    dueDate: DateTime
    type: IssueType
    assigneeId: String
  }
`;
