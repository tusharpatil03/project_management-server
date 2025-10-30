import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  schema: ['./src/typeDef/**/*.ts'],
  generates: {
    './src/types/generatedGraphQLTypes.ts': {
      plugins: ['typescript', 'typescript-resolvers'],
      config: {
        // Now pointing to a single, clear context type
        contextType: '../config/context#MyContext',

        // Generate enums as TypeScript union types
        enumsAsTypes: true,

        // Make info argument optional
        optionalInfoArgument: true,

        // Make resolvers callable
        makeResolverTypeCallable: true,

        // Use type imports instead of value imports
        useTypeImports: true,

        // Ensure all types are non-nullable by default
        defaultMapper: 'Partial<{T}>',
      },
    },
  },
};

export default config;