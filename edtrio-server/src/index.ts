import { GraphQLServer, PubSub } from "graphql-yoga";

import { prisma, Prisma } from "./database/generated/prisma-client/index.js";
import { resolvers } from "./server";

export interface IContextType {
  prisma: Prisma;
  valueChangedPubSub: PubSub;
}

const valueChangedPubSub = new PubSub();

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers,
  context: {
    prisma,
    valueChangedPubSub,
  },
});

server.start(() => console.log(`Server is running on http://localhost:4000`));
