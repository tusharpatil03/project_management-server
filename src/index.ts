import http from 'http';
import app from './app';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { typeDef } from './typeDef';
import { resolvers } from './resolvers';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import depthLimit from 'graphql-depth-limit';
import type { GraphQLFormattedError } from 'graphql';
import { expressMiddleware } from '@apollo/server/express4';
import { disconnectPrisma} from './config/db';
import { createGraphQLContext } from './config/context';
import 'dotenv/config';
import authDirectiveTransformer from './directives/directiveTransformers/authDirectiveTransformer';
import { roleDirectiveTransformer } from './directives/directiveTransformers/roleDirectiveTransformer';
import { connectRedis, disconnectRedis } from './config/redis';


const PORT = parseInt(process.env.SERVER_PORT || '4000', 10);
const NODE_ENV = process.env.NODE_ENV || 'development';


if (Number.isNaN(PORT) || PORT < 0 || PORT > 65535) {
  throw new Error(
    `Invalid SERVER_PORT: ${process.env.SERVER_PORT}. Must be between 0 and 65535.`
  );
}

// create a http server
const httpServer = http.createServer(app);

// Schema Construction
let schema = makeExecutableSchema({
  typeDefs: typeDef,
  resolvers: resolvers,
});

// schema transformer
schema = authDirectiveTransformer(schema, 'auth');
schema = roleDirectiveTransformer(schema, 'role');

// apollo server configurations
const server = new ApolloServer({
  schema,

  // Format errors consistently
  formatError: (formattedError: GraphQLFormattedError) => {
    const message = formattedError.message || 'An error occurred';
    const extensions = formattedError.extensions || {};
    const code = extensions.code || 'INTERNAL_SERVER_ERROR';

    // Log errors in development
    if (NODE_ENV === 'development') {
      console.error('GraphQL Error:', {
        message,
        code,
        extensions,
        locations: formattedError.locations,
        path: formattedError.path,
      });
    }

    // Don't expose internal errors in production
    if (NODE_ENV === 'production' && code === 'INTERNAL_SERVER_ERROR') {
      return {
        message: 'An internal error occurred',
        extensions: { code: 'INTERNAL_SERVER_ERROR' },
      };
    }

    return {
      message,
      extensions: {
        code,
        ...extensions,
      },
    };
  },

  // Security and performance
  validationRules: [depthLimit(7)],
  csrfPrevention: true,
  introspection: NODE_ENV === 'development',
  cache: 'bounded',

  // Plugins
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    ApolloServerPluginLandingPageLocalDefault({
      embed: true,
      includeCookies: true,
    }),
  ],
});


// Startup function
async function startServer() {
  try {
    //connect to redis
    await connectRedis();

    await server.start();

    // Apply GraphQL middleware
    app.use(
      '/graphql',
      expressMiddleware(server, {
        context: async ({ req }) => createGraphQLContext(req),
      })
    );

    // Start HTTP server
    await new Promise<void>((resolve) => {
      httpServer.listen({ port: PORT }, resolve);
    });

    const serverUrl = `${process.env.SERVER_PROTOCOL || 'http'}://${process.env.SERVER_HOST || 'localhost'}:${PORT}`;

    console.log(`🚀 Server ready at ${serverUrl}/graphql`);
    console.log(`📊 Health check at ${serverUrl}/health`);

    if (NODE_ENV === 'development') {
      console.log(`🔍 GraphQL Playground at ${serverUrl}/graphql`);
    }
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}


// Graceful shutdown
async function shutdown() {
  console.log('\n Shutting down gracefully...');

  try {
    await server.stop();
    console.log('Apollo Server stopped');

    await disconnectPrisma();
    await disconnectRedis();
    console.log('Database disconnected');

    httpServer.close(() => {
      console.log('HTTP server closed');
      process.exit(0);
    });

    // Force exit after 10 seconds
    setTimeout(() => {
      console.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } catch (error) {
    console.error('Error during shutdown:', error);
    process.exit(1);
  }
}

// Handle shutdown signals
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);


// Handle uncaught errors
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
  shutdown();
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  shutdown();
});


startServer();