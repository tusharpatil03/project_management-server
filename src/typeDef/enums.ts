import gql from 'graphql-tag';

export const enums = gql`
  enum Role {
    Admin
    User
  }
  enum TaskStatus {
    TODO
    IN_PROGRESS
    DONE
  }
  enum SprintStatus {
    Planned
    Active
    Completed
    Cancelled
  }

  enum ProjectStatus {
    Active
    OnHold
    Completed
    Cancelled
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
`;
