# Developer Build & Run Notes

This file documents the recommended local development and production build workflow for this project.

1) Install dependencies

```bash
npm install
```

2) Development (fast iteration)

- Uses `tsx` to run TypeScript directly with file watching.

```bash
npm run dev
```

3) Codegen & Prisma (run before building)

This project depends on generated code from two tools:
- Prisma client (`prisma generate`)
- GraphQL codegen (`graphql-codegen`) if you use the codegen config

Run both via the `prebuild` script (this is invoked by `build:prod`):

```bash
npm run prebuild
```

4) Production build

```bash
npm run build:prod
npm run start:prod
```

Notes & recommendations
- Keep generated artifacts out of source control. Ensure `node_modules/.prisma` and generated folders from `graphql-codegen` are gitignored.
- If you use ESM runtime, change `tsconfig.build.json` module to `esnext` and set `"type": "module"` in `package.json`.
- CI should run `npm ci && npm run build:prod` to ensure a fresh, reproducible build.

Troubleshooting
- If TypeScript complains about missing generated types, ensure `npm run prebuild` succeeded or run `prisma generate` and GraphQL codegen manually.
