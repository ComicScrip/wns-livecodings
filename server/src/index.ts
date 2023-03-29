import "reflect-metadata";
import db from "./db";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "./env";
import User from "./entity/User";
import cors from "cors";
import http from "http";
import cookie from "cookie";
import { SkillResolver } from "./resolver/SkillResolver";
import { WilderResolver } from "./resolver/WilderResolver";
import { GradeResolver } from "./resolver/GradeResolver";
import { UserResolver } from "./resolver/UserResolver";

export interface ContextType {
  req: any;
  res: any;
  currentUser?: User;
}

async function start(): Promise<void> {
  console.log({ env });
  await db.initialize();
  const app = express();
  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [SkillResolver, WilderResolver, GradeResolver, UserResolver],
    authChecker: async ({ context }: { context: ContextType }, roles = []) => {
      const { req } = context;
      const tokenInAuthHeaders = req.headers.authorization?.split(" ")[1];
      const tokenInCookie = cookie.parse(req.headers.cookie ?? "").token;
      const token = tokenInAuthHeaders ?? tokenInCookie;

      if (typeof token !== "string") return false;

      const decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
      if (typeof decoded !== "object") return false;

      const id = decoded.userId;
      const currentUser = await db.getRepository(User).findOneBy({ id });
      if (currentUser === null) return false;

      context.currentUser = currentUser;
      return roles.length === 0 || roles.includes(currentUser.role);
    },
  });

  const server = new ApolloServer<ContextType>({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();

  app.use(
    ["/", "/graphql"],
    cors<cors.CorsRequest>({
      origin: env.CORS_ALLOWED_ORIGINS.split(","),
      credentials: true,
    }),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({ req, res }),
    })
  );

  const port = env.SERVER_PORT ?? 4000;
  httpServer.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );
}

start().catch(console.error);
