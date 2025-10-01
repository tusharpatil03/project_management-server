import gql from 'graphql-tag';

export const directives = gql`
  directive @auth on FIELD_DEFINITION

  directive @role(requires: [MemberRole]!) on FIELD_DEFINITION
`;
