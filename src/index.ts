import http from "http";
import app from "./app";
import { SEVER_PORT } from "./globals";

const httpServer = http.createServer(app);

async function startServer() {
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

startServer();