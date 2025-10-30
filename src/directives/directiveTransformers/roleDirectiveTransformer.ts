import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { isUserPartOfProject } from '../../resolvers/Query/allSprints';

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

        const { requires } = roleDirective;
        const requiredRoles = Array.isArray(requires) ? requires : [requires];

        fieldConfig.resolve = async (
          root,
          args,
          context,
          info
        ): Promise<any> => {
          let userRole = null;
          const projectId = args.projectId || args.input?.projectId;
          if (projectId) {
            try {
              console.log("ProjectId:", projectId)
              const roleInfo = await isUserPartOfProject(context.userId, projectId, context.client);
              userRole = roleInfo.role;
              console.log("User's actual role:", userRole);
            } catch (e) {
              console.log(e);
              throw new GraphQLError("You are not a member of this project.", {
                extensions: { code: 'FORBIDDEN' },
              });
            }
          }
          else {
            throw new GraphQLError("A projectId must be provided to perform this action.", {
              extensions: { code: 'BAD_REQUEST' },
            });
          }
          if (!userRole || !requiredRoles.includes(userRole)) {
            throw new GraphQLError("You are not authorized to perform this action.", {
              extensions: { code: 'FORBIDDEN' },
            });
          }

          return resolve(root, args, context, info);
        }
      }
      return fieldConfig;
    }
  });
}
