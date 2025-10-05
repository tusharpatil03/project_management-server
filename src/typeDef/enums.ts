import gql from "graphql-tag";

export const enums = gql`
  enum IssueStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum SprintStatus {
    PLANNED
    ACTIVE
    COMPLETE
  }

  enum ProjectStatus {
    PLANNED
    ACTIVE
    COMPLETE
  }

  enum Gender {
    Male
    Female
    Other
  }

  enum MemberRole {
    Admin
    Contributor
    Viewer
  }

  enum IssueType {
    EPIC
    STORY
    TASK
    BUG
  }

  enum IssuePriority {
    LOW
    MEDIUM
    HIGH
    CRITICAL
  }

  enum ActivityAction {
    LOGGED_TIME
    SPRINT_CREATED
    SPRINT_STARTED
    SPRINT_COMPLETED
    SPRINT_UPDATED
    SPRINT_REMOVED
    ISSUE_ADDED_TO_SPRINT
    ISSUE_REMOVED_FROM_SPRINT
    ISSUE_CREATED
    ISSUE_UPDATED
    ISSUE_DELETED
    ISSUE_ASSIGNED
    ISSUE_UNASSIGNED
    ISSUE_STATUS_CHANGED
    ISSUE_PRIORITY_CHANGED
    PROJECT_CREATED
    PROJECT_UPDATED
    PROJECT_DELETED
    PROJECT_TEAM_ADDED
    PROJECT_TEAM_REMOVED
    TEAM_CREATED
    TEAM_UPDATED
    TEAM_MEMBER_ADDED
    TEAM_MEMBER_REMOVED
    TEAM_MEMBER_ROLE_CHANGED
    COMMENTED
    COMMENT_DELETED
  }

  enum EntityType {
    PROJECT
    TEAM
    SPRINT
    ISSUE
    COMMENT
    USER
  }
`;
