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
`;
