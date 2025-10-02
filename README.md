# 🚀 Agile Project Management Platform - Server

This is the **backend service** for the **Agile Project Management Platform** — a comprehensive, Agile-native project management tool designed to help modern software teams build better products, faster.  

The server is built with **Node.js**, **GraphQL (Apollo Server)**, **PostgreSQL (Prisma ORM)**, and **Redis**, providing real-time collaboration, role-based access control (RBAC), and high performance.  

---

## ✨ Features

- **GraphQL API** with Apollo Server (queries, mutations, subscriptions)  
- **Database with Prisma ORM** (PostgreSQL)  
- **Caching with Redis** for faster navigation and dashboards  
- **Authentication & Authorization** with JWT  
- **Role-Based Access Control (RBAC)** via GraphQL middleware  

---

## 🛠️ Tech Stack

- **Runtime:** Node.js (TypeScript)  
- **API:** GraphQL with Apollo Server  
- **Database:** PostgreSQL with Prisma  
- **Cache:** Redis  
- **Auth:** JWT + RBAC  
- **Tooling:** ESLint, Prettier, Husky (pre-commit hooks), Jest (testing)  

---

## 📂 Project Structure
server/
│── prisma/ # Prisma schema & migrations
│── src/
│ ├── typeDef/  #GraphQl type definitions
│ ├── middlewares/ # RBAC, auth, logging
| ├── resolvers/  #Query and Mutation resolvers
| ├── services/  #db services ...still in building phase(future microservices architecture)
| ├── type/  #codegen generated graphql types
│ ├── utils/ # Helpers (JWT, cache, etc.)
│ ├── index.ts # Entry point
│── .env.example # Example environment variables
|── codegen.ts # for generate types
│── package.json
│── tsconfig.json
│── README.md

