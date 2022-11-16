import "reflect-metadata";
import { ApolloServer } from "apollo-server-express";
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import datasource from "./db";
import { WilderResolver } from "./resolver/WilderResolver";
import { SkillResolver } from "./resolver/SkillResolver";
import { GradeResolver } from "./resolver/GradeResolver";
import { UserResolver } from "./resolver/UserResolver";
import { env } from "./environment";
import jwt from "jsonwebtoken";
import User from "./entity/User";
import cors from "cors";
import express from "express";
import http from "http";
import cookieParser from "cookie-parser";

export interface ContextType {
  req: express.Request;
  res: express.Response;
  currentUser?: User;
}

const start = async (): Promise<void> => {
  await datasource.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");
  app.use(
    cors({
      credentials: true,
      origin: (origin, callback) => {
        if (typeof origin === "undefined" || allowedOrigins.includes(origin))
          return callback(null, true);
        callback(new Error("Not allowed by CORS"));
      },
    })
  );

  app.use(cookieParser());

  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, GradeResolver, UserResolver],
    authChecker: ({ context }: { context: ContextType }, roles) => {
      return (
        context.currentUser !== null &&
        typeof context.currentUser !== "undefined" &&
        (roles.length === 0 || roles.includes(context.currentUser.role))
      );
    },
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    context: async ({ req, res }) => {
      try {
        const tokenInCookies: string | undefined =
          typeof req.cookies !== "undefined" ? req.cookies["token"] : undefined;
        const tokenInHeaders = req.headers.authorization?.split("Bearer ")?.[1];
        const token = tokenInCookies ?? tokenInHeaders;
        const decodedToken =
          token !== null && typeof token !== "undefined"
            ? jwt.verify(token, env.JWT_PRIVATE_KEY)
            : null;

        const currentUser =
          decodedToken !== null
            ? await datasource.getRepository(User).findOneOrFail({
                where: { id: (decodedToken as { userId: number }).userId },
              })
            : null;

        return { req, res, currentUser };
      } catch (err) {
        console.log(err);
      }
    },
  });

  await server.start();

  server.applyMiddleware({ app, cors: false, path: "/" });

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: 4000 }, resolve)
  );
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
};

void start();
