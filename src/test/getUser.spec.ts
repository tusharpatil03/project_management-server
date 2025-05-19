import { typeDef } from '../typeDef';
import { resolvers } from '../resolvers';
import authDirectiveTransformer from '../directives/directiveTransformers/authDirectiveTransformer';
import { roleDirectiveTransformer } from '../directives/directiveTransformers/roleDirectiveTransformer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';

let schema = makeExecutableSchema({
    typeDefs: typeDef,
    resolvers: resolvers,
});

schema = authDirectiveTransformer(schema, 'auth');
schema = roleDirectiveTransformer(schema, 'role');

export function createTestServer() {
    return new ApolloServer({
        schema,
    });
}


describe('getUser query', () => {
    it('should return the requested user', async () => {
        const server = createTestServer();
        await server.start();

        const query = `query GetUserById($id: ID!) {
            getUserById(id: $id) {
              id
            }
          }`

        const variables = {
            id: 'cmamq6mah0001mg92oimr42gl',
        };

        const result = await server.executeOperation({
            query: query,
            variables: variables,
        });

        if (result.body.kind === 'single' && result.body.singleResult.data) {
            expect(result.body.singleResult.data).toBeDefined()
            expect(result.body.singleResult.data.id).toBe("cmamq6mah0001mg92oimr42gl")
        } else {
            throw new Error('Expected single result, but got incremental.');
        }
    });
});