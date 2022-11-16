import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import {
  ApolloServerPluginLandingPageLocalDefault,
  Context,
} from "apollo-server-core";
import { buildSchema } from "type-graphql";
import datasource from "./db";
import { WilderResolver } from "./resolver/WilderResolver";
import { SkillResolver } from "./resolver/SkillResolver";
import { GradeResolver } from "./resolver/GradeResolver";
import { UserResolver } from "./resolver/UserResolver";
import { env } from "./environment";
import jwt, { decode } from "jsonwebtoken";
import User from "./entity/User";

export interface ContextType {
  req: Express.Request;
  res: Express.Response;
  currentUser?: User;
}

const start = async (): Promise<void> => {
  await datasource.initialize();

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

  const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");

  console.log(allowedOrigins);

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
    context: async ({ req, res }) => {
      try {
        console.log({ cookies: req.cookies });
        const tokenInCookies: string | undefined =
          typeof req.cookies !== "undefined" ? req.cookies("token") : undefined;
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

    cors: {
      origin: (origin, callback) => {
        if (typeof origin === "undefined" || allowedOrigins.includes(origin)) {
          console.log("ok");

          callback(null, true);
        } else {
          console.log("no");

          callback(new Error("Not allowed by CORS"));
        }
      },
      credentials: true,
    },
  });

  await server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

void start();
