import { defineConfig } from "vitest/config";
import { resolve } from "path";

export default defineConfig({
  test: {
    globals: true,
    environment: "node",

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"],
      exclude: [
        "src/**/*.test.ts",
        "src/**/__tests__/**",
        "src/types/generatedGraphQLTypes.ts",
        "node_modules/**",
        "dist/**",
      ],
      thresholds: {
        lines: 75,
        functions: 75,
        branches: 70,
        statements: 75,
      },
    },

    include: ["src/**/__tests__/**/*.test.ts", "src/**/*.test.ts", "**/*.test.ts"],
    exclude: ["node_modules", "dist", "build"],

    setupFiles: ["./tests/setup.ts"],

    testTimeout: 15000,
    hookTimeout: 15000,

    pool: "forks",

    reporters: ["verbose"],
    watch: true,
  },

  resolve: {
    alias: {
      "@": resolve(process.cwd(), "./src"),
    },
  },
});
