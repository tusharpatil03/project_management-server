import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: ["./src/typedef/**/*.ts"],

  generates: {
    "./src/types/generatedGraphqlTypes.ts": {
      plugins: ["typescript", "typescript-resolvers"],

      config: {
        enumsAsTypes: true,

        // Makes the info argument passed to the resolver functions optional.
        optionalInfoArgument: true,

        // Makes the resolver function callable.
        makeResolverTypeCallable: true,

        // Adds suffix "Model" to the end of generated database model types.
        mapperTypeSuffix: "Model",

        useTypeImports: true,
      },
    },
  },
};

export default config;
