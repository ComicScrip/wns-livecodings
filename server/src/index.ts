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
  jwtPayload?: jwt.JwtPayload;
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
    // https://typegraphql.com/docs/authorization.html
    authChecker: async ({ context }: { context: ContextType }, roles) => {
      // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback

      const tokenInHeaders = context.req.headers.authorization?.split(" ")[1];
      const tokenInCookie = context.req.cookies?.["token"];
      const token = tokenInHeaders || tokenInCookie;

      console.log(tokenInCookie);

      // invalid token - synchronous

      let decoded;

      try {
        if (token) decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
        if (typeof decoded === "object") context.jwtPayload = decoded;
      } catch (err) {}

      let user;
      if (context.jwtPayload)
        user = await datasource
          .getRepository(User)
          .findOne({ where: { id: context.jwtPayload.userId } });

      if (user !== null) context.currentUser = user;

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
    context: ({ req, res }) => {
      return { req, res };
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
