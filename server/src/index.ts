import "reflect-metadata";
import { ApolloServer } from "apollo-server";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { buildSchema } from "type-graphql";
import datasource from "./db";
import { WilderResolver } from "./resolver/WilderResolver";
import { SkillResolver } from "./resolver/SkillResolver";
import { GradeResolver } from "./resolver/GradeResolver";
import { UserResolver } from "./resolver/UserResolver";

const start = async (): Promise<void> => {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, GradeResolver, UserResolver],
  });

  const server = new ApolloServer({
    schema,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });
};

void start();
