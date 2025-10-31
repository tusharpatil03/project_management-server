import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils';
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from 'graphql';
import { isUserPartOfProject } from '../../resolvers/Query/allSprints';
import { getJSON, setJSON } from '../../config/redis';

const DEFAULT_ROLE_TTL = parseInt('3000', 10); // seconds

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
          const projectId = args.projectId || args.input?.projectId;

          if (!projectId) {
            throw new GraphQLError('A projectId must be provided to perform this action.', {
              extensions: { code: 'BAD_REQUEST' },
            });
          }

          const userId = (context as any).userId;
          if (!userId) {
            throw new GraphQLError('Unauthorized: missing userId in context', {
              extensions: { code: 'UNAUTHENTICATED' },
            });
          }

          // Check cache first
          const cacheKey = `userRole:${userId}:${projectId}`;
          try {
            const cached = await getJSON<{ role?: string }>(cacheKey);
            if (cached && cached.role) {
              const cachedRole = cached.role as string;
              if (!requiredRoles.includes(cachedRole)) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                  extensions: { code: 'FORBIDDEN' },
                });
              }
              // cached role allowed
              return resolve(root, args, context, info);
            }
          } catch (err) {
            // if cache read fails, log and continue to DB lookup
            console.warn('Redis cache read failed for role lookup:', (err as any)?.message || err);
          }

          // Not in cache: fetch from DB
          try {
            const roleInfo = await isUserPartOfProject((context as any).userId, projectId, (context as any).client);
            const role = roleInfo?.role;
            if (!role) {
              throw new GraphQLError('You are not a member of this project.', {
                extensions: { code: 'FORBIDDEN' },
              });
            }

            // cache the role for subsequent checks
            try {
              await setJSON(cacheKey, { role }, DEFAULT_ROLE_TTL);
            } catch (err) {
              console.warn('Redis cache write failed for role lookup:', (err as any)?.message || err);
            }

            if (!requiredRoles.includes(role)) {
              throw new GraphQLError('You are not authorized to perform this action.', {
                extensions: { code: 'FORBIDDEN' },
              });
            }

            return resolve(root, args, context, info);
          } catch (e) {
            // if DB lookup failed or user not part of project
            if (e instanceof GraphQLError) throw e;
            console.error('Error during role lookup:', (e as any)?.message || e);
            throw new GraphQLError('You are not authorized to perform this action.', {
              extensions: { code: 'FORBIDDEN' },
            });
          }
        };
      }

      return fieldConfig;
    },
  });
}
