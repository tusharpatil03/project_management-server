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
`;
