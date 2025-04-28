import { Query } from './Query';
import { Mutation } from './Mutation';
import { Resolvers } from '../types/generatedGraphQLTypes';
import {
  DateTimeResolver,
  EmailAddressResolver,
  JSONResolver,
} from 'graphql-scalars';

export const resolvers: Resolvers = {
  DateTime: DateTimeResolver,
  EmailAddress: EmailAddressResolver,
  Json: JSONResolver,
  Mutation,
  Query,
};
