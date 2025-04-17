import { MapperKind, getDirective, mapSchema } from '@graphql-tools/utils'
import { defaultFieldResolver } from 'graphql'
import type { GraphQLSchema } from 'graphql/type/schema'

function authDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
): GraphQLSchema {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      // Check whether this field has the specified directive
      const authDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0]

      if (authDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig

        fieldConfig.resolve = (root, args, context, info): string => {
          // Check if the user is authenticated and the session is not expired
          if (context.authData.expired || !context.authData.isAuth) {
            throw String(new Error('UnAuthorized'))
          }

          // Call the original resolver with the context
          return resolve(root, args, context, info) as string
        }

        return fieldConfig
      }
    },
  })
}

export default authDirectiveTransformer
