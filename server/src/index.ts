import express from "express";
import cors from "cors";
import wildersController from "./controller/wilders";
import skillsController from "./controller/skills";
import { ApolloServer, gql } from "apollo-server";
import datasource from "./db";
import Wilder from "./entity/Wilder";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  type SkillOfWilder {
    id: Int
    name: String
    votes: Int
  }

  # This "Book" type defines the queryable fields for every book in our data source.
  type Wilder {
    id: Int
    name: String
    skills: [SkillOfWilder]
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    wilders: [Wilder]
  }

  type Mutation {
    createWilder(name: String!): Wilder
  }
`;

const resolvers = {
  Query: {
    wilders: async () => {
      const wilders = await datasource
        .getRepository(Wilder)
        .find({ relations: { grades: { skill: true } } });

      return wilders.map((w) => ({
        ...w,
        skills: w.grades.map((g) => ({
          id: g.skill.id,
          name: g.skill.name,
          votes: g.votes,
        })),
      }));
    },
  },
  Mutation: {
    async createWilder(_: any, args: any) {
      const { raw: id } = await datasource.getRepository(Wilder).insert(args);
      return { id };
    },
  },
};

const app = express();

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

app.post("/wilders", wildersController.create);
app.get("/wilders", wildersController.read);
app.get("/wilders/:id", wildersController.readOne);
app.patch("/wilders/:id", wildersController.update);
app.delete("/wilders/:id", wildersController.delete);
app.post("/wilders/:wilderId/skills", wildersController.addSkill);
app.delete("/wilders/:wilderId/skills/:skillId", wildersController.removeSkill);
app.patch("/wilders/:wilderId/skills/:skillId", wildersController.updateGrade);

app.post("/skills", skillsController.create);
app.get("/skills", skillsController.read);
app.patch("/skills/:id", skillsController.update);
app.delete("/skills/:id", skillsController.delete);

const start = async (): Promise<void> => {
  await datasource.initialize();

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: "bounded",
    plugins: [ApolloServerPluginLandingPageLocalDefault({ embed: true })],
  });

  await server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
  });

  app.listen(5001, () => {
    console.log("listening on port 5001");
  });
};

void start();
