import http from "http";
import app from "./app";
import { SEVER_PORT } from "./globals";
import { makeExecutableSchema } from "@graphql-tools/schema";
import { typeDef } from "./typeDef";
import { resolvers } from "./resolvers";
import { ApolloServer, BaseContext } from "@apollo/server";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { ApolloServerPluginLandingPageLocalDefault } from "@apollo/server/plugin/landingPage/default";
import depthLimit from "graphql-depth-limit";
import type { GraphQLFormattedError } from "graphql";
import { expressMiddleware } from "@apollo/server/express4";
import { Prisma } from "@prisma/client";
import { client } from "./db";

const httpServer = http.createServer(app);


let schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolvers,
});

const server = new ApolloServer({
  schema,
  csrfPrevention: true,
  introspection: true, // Ensure introspection is enabled
  cache: "bounded",
  plugins: [
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ApolloServerPluginDrainHttpServer({ httpServer }),
  ],
});


let serverHost = "localhost";

async function startServer() {
  await server.start();
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => {
        serverHost = req.get("host") || "localhost";
        return {
          client,
          req,
          res,
          apiRootUrl: `${req.protocol}://${serverHost}/`,
        };
      },
    }
    ),
  );

  const PORT = parseInt(SEVER_PORT || "4000", 10);
  if (Number.isNaN(PORT) || PORT < 0 || PORT > 65535) {
    throw new Error(
      `Invalid SERVER_PORT: ${process.env.SERVER_PORT}. Please ensure it is a numeric value between 0 and 65535.`,
    );
  }
  await new Promise<void>((resolve) =>
    httpServer.listen({ port: PORT }, resolve),
  );
}

startServer().then(() =>
  console.log(
    `🚀 Server ready at http://${serverHost}:${process.env.PORT}/graphql`,
  ),
);
