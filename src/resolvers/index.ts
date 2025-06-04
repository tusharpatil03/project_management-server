import { Query } from './Query';
import { Mutation } from './Mutation';
import { Resolvers } from '../types/generatedGraphQLTypes';
import {
  DateTimeResolver,
  EmailAddressResolver,
  JSONResolver,
  DateResolver,
} from 'graphql-scalars';
import { PasswordScalar } from '../utility/passwordScalar';

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Json: JSONResolver,
  Password: PasswordScalar,
  Mutation,
  Query,
};
