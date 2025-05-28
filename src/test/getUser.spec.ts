import authDirectiveTransformer from '../directives/directiveTransformers/authDirectiveTransformer';
import { roleDirectiveTransformer } from '../directives/directiveTransformers/roleDirectiveTransformer';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServer } from '@apollo/server';
import { describe, it } from 'node:test';
import { createTestUser, TestUserType } from "./helpers/user"
import gql from 'graphql-tag';
import { nanoid } from 'nanoid/non-secure'
import { InterfaceCreateUser } from './helpers/user';

import { MockContext, Context, createMockContext } from './helpers/db/context'

let mockCtx: MockContext
let ctx: Context

beforeEach(() => {
    mockCtx = createMockContext()
    ctx = mockCtx as unknown as Context
})

let testUser: TestUserType;
const CreateUser: InterfaceCreateUser = {
    email: `email${nanoid().toLowerCase()}@gmail.com`,
    username: `user${nanoid()}`,
    password: `pass${nanoid().toLowerCase()}`,
    salt: 'salt',
    profile: {
        id: "",
        firstName: "Tushar",
        lastName: "Patil",
    }
}

const typeDef = gql`
  directive @auth on FIELD_DEFINITION

  type Query{
    hello: String @auth
  }
`

const resolvers = {
    Query: {
        hello: (): string => "hi"
    }
}

beforeAll(async () => {
    createTestUser(CreateUser, ctx)
});


const authenticatedContext = {
    expired: true,
};

describe('getUser query', () => {
    it('should return the requested user', async () => {
        let schema = makeExecutableSchema({
            typeDefs: typeDef,
            resolvers: resolvers,
        });

        schema = authDirectiveTransformer(schema, 'auth');
        schema = roleDirectiveTransformer(schema, 'role');

        const server = new ApolloServer({
            schema
        })

        const query = `
           query: {
              hello
            }
        `

        try {
            const result = await server.executeOperation({
                query,
                variables: {},
            },
                {
                    contextValue: authenticatedContext,
                },
            );

        }
        catch (e) {
            if (e instanceof Error) {
                expect(e.message).toBe("UnAuthorized")
            }
        }

    });
});