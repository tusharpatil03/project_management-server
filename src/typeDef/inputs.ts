import gql from 'graphql-tag';

export const inputs = gql`
  # Inputs for Mutations
  input LoginInput {
    email: EmailAddress!
    password: Password!
  }
  input SignupInput {
    email: EmailAddress!
    username: String!
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
    id: ID!,
    sprintId: ID!
  }

  input IssueInput {
    id: ID,
    type: IssueType,
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
  }

  input removeTeamMemberInput {
    memberId: ID!
    teamId: ID!
  }

  input addProjectTeamInput {
    projectId: ID!
    teamId: ID!
  }
`;
