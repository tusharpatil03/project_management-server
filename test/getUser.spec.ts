// import authDirectiveTransformer from '../src/directives/directiveTransformers/authDirectiveTransformer';
// import { roleDirectiveTransformer } from '../src/directives/directiveTransformers/roleDirectiveTransformer';
// import { makeExecutableSchema } from '@graphql-tools/schema';
// import { ApolloServer } from '@apollo/server';
// import { describe, it } from 'node:test';
// import gql from 'graphql-tag';
// import { nanoid } from 'nanoid/non-secure'


// const CreateUser = {
//     email: `email${nanoid().toLowerCase()}@gmail.com`,
//     username: `user${nanoid()}`,
//     password: `pass${nanoid().toLowerCase()}`,
//     salt: 'salt',
//     profile: {
//         id: "",
//         firstName: "Tushar",
//         lastName: "Patil",
//     }
// }

// const typeDef = gql`
//   directive @auth on FIELD_DEFINITION

//   type Query{
//     hello: String @auth
//   }
// `

// const resolvers = {
//     Query: {
//         hello: (): string => "hi"
//     }
// }


// const authenticatedContext = {
//     expired: true,
// };

// describe('getUser query', () => {
//     it('should return the requested user', async () => {
//         let schema = makeExecutableSchema({
//             typeDefs: typeDef,
//             resolvers: resolvers,
//         });

//         schema = authDirectiveTransformer(schema, 'auth');
//         schema = roleDirectiveTransformer(schema, 'role');

//         const server = new ApolloServer({
//             schema
//         })

//         const query = `
//            query: {
//               hello
//             }
//         `

//         try {
//             const result = await server.executeOperation({
//                 query,
//                 variables: {},
//             },
//                 {
//                     contextValue: authenticatedContext,
//                 },
//             );

//         }
//         catch(e){
//             console.log(e);
//         }

//     });
// });

import { describe, it, expect } from 'vitest'
import {createAccessToken, InterfaceCreateAccessToken} from "../src/utility/auth"

const jwtPayload:InterfaceCreateAccessToken = {
    userId: "user103",
    email: "tushar@gmail.com",
}

describe('greet()', () => {
  it('should return jwt token', () => {
    const token = createAccessToken(jwtPayload);
    console.log(token);
    expect(token).toBeDefined()
  })
})