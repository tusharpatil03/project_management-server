import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver } from 'graphql';
import type { GraphQLSchema } from 'graphql/type/schema';
import { UnAuthenticatedError } from '../../libraries/errors/unAuthenticatedError';
import { UNAUTHENTICATED_ERROR } from '../../globals';

function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = (root, args, context, info): string => {
          //check user is authenticated
          if (context.expired || !context.isAuth) {
            console.log("Context userId:", context.userId)
            throw new UnAuthenticatedError(
              UNAUTHENTICATED_ERROR.MESSAGE, UNAUTHENTICATED_ERROR.CODE
            )
          }

          // Call the original resolver with the context
          return resolve(root, args, context, info) as string;
        };
      }
      return fieldConfig;
    },
  });
}

export default authDirectiveTransformer;
