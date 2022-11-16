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
  currentUser: User | null;
}

const start = async (): Promise<void> => {
  await datasource.initialize();

  const app = express();
  const httpServer = http.createServer(app);
  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");

  // https://www.npmjs.com/package/cors#configuring-cors-w-dynamic-origin
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
      if (!context.currentUser) return false;
      return roles.length === 0 || roles.includes(context.currentUser.role);
    },
  });

  // https://www.apollographql.com/docs/apollo-server/v3/integrations/middleware#apollo-server-express
  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageLocalDefault({ embed: true }),
    ],
    // https://www.apollographql.com/docs/apollo-server/v3/security/authentication/#putting-authenticated-user-info-on-the-context
    context: async ({ req, res }): Promise<ContextType> => {
      const tokenInCookies: string | undefined = req.cookies?.["token"];
      const tokenInHeaders = req.headers.authorization?.split("Bearer ")?.[1];
      const token = tokenInCookies ?? tokenInHeaders;
      let currentUser = null;

      // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      const verifyToken = (t: string) => jwt.verify(t, env.JWT_PRIVATE_KEY);
      try {
        const decodedToken = token ? verifyToken(token) : null;
        if (decodedToken)
          currentUser = await datasource.getRepository(User).findOneOrFail({
            where: { id: (decodedToken as any).userId },
          });
      } catch (err) {}
      return { req, res, currentUser };
    },
  });

  await server.start();
  server.applyMiddleware({ app, cors: false, path: "/" });
  httpServer.listen({ port: env.SERVER_PORT }, () =>
    console.log(
      `🚀 Server ready at ${env.SERVER_HOST}:${env.SERVER_PORT}${server.graphqlPath}`
    )
  );
};

void start();
