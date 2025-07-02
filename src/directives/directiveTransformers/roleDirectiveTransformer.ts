import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLSchema } from 'graphql';
import { InterfaceUserRole, isUserPartOfProject } from '../../resolvers/Query/allSprints';

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

        //const { require } = roleDirective;

        fieldConfig.resolve = async (
          root,
          args,
          context,
          info
        ): Promise<string> => {

          if (args.projectId || args.input.projectId) {
            try {
              const projectId = args.projectId || args.input.projectId;
              const userRole = await isUserPartOfProject(context.userId, projectId, context.client);
              context.userRole = userRole.role;
            }
            catch (e) {
              console.log(e);
              if (e instanceof Error) {
                throw new Error(e.message)
              }
            }
          }

          // Call the original resolver with the updated context
          return resolve(root, args, context, info) as string;
        };
        return fieldConfig;
      }
    },
  });
}
