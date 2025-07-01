import gql from "graphql-tag";

export const enums = gql`
  enum IssueStatus {
    TODO
    IN_PROGRESS
    DONE
  }
  enum SprintStatus {
    TODO
    IN_PROGRESS
    DONE
  }

  enum ProjectStatus {
    TODO
    IN_PROGRESS
    DONE
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
