import express, { Express } from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef } from '../../src/typeDef';
import { resolvers } from '../../src/resolvers';
import { createGraphQLContext } from '../../src/config/context';
import authDirectiveTransformer  from '../../src/directives/directiveTransformers/authDirectiveTransformer';
import { roleDirectiveTransformer } from '../../src/directives/directiveTransformers/roleDirectiveTransformer';

let testApp: Express | null = null;
let testServer: ApolloServer | null = null;

export async function createTestServer(): Promise<Express> {
    if (testApp && testServer) {
        return testApp;
    }

    const app = express();
    app.use(express.json());

    let schema = makeExecutableSchema({
        typeDefs: typeDef,
        resolvers,
    });

    schema = authDirectiveTransformer(schema, 'auth');
    schema = roleDirectiveTransformer(schema, 'role');

    const server = new ApolloServer({
        schema,
        includeStacktraceInErrorResponses: true,
    });

    await server.start();

    app.use(
        '/graphql',
        expressMiddleware(server, {
            context: async ({ req }) => createGraphQLContext(req),
        })
    );

    testApp = app;
    testServer = server;

    return app;
}

export async function closeTestServer() {
    if (testServer) {
        await testServer.stop();
        testServer = null;
        testApp = null;
    }
}