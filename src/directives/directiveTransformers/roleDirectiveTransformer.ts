import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';

export function roleDirectiveTransformer(
  schema: GraphQLSchema,
  directiveName: string
) {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: (fieldConfig) => {
      const roleDirective = getDirective(
        schema,
        fieldConfig,
        directiveName
      )?.[0];

      if (roleDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;

        fieldConfig.resolve = async (
          root,
          args,
          context,
          info
        ): Promise<string> => {
          // Fetch the current user from the database using the userId from the context
          const currentUser = await context.client.user.findUnique({
            where: {
              id: context.userId,
            },
          });

          if (!currentUser) {
            throw new Error('User not found');
          }

          // Add the current user to the context for use in the resolver
          context.user = currentUser;

          // Call the original resolver with the updated context
          return resolve(root, args, context, info) as string;
        };
        return fieldConfig;
      }
    },
  });
}
