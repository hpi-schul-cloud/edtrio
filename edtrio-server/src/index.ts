import { GraphQLServer, PubSub } from "graphql-yoga";

import { prisma, Prisma } from "./database/generated/prisma-client/index.js";

interface IContextType {
  prisma: Prisma;
  valueChangedPubSub: PubSub;
}

const resolvers = {
  Query: {
    documents(root: any, args: {}, context: IContextType) {
      return context.prisma.documents({});
    },
    user(root: any, args: any, context: IContextType) {
      return context.prisma.user({ id: args.userId });
    },
    document(root: any, args: any, context: IContextType) {
      return context.prisma.document({ id: args.documentId });
    },
    users(root: any, args: any, context: IContextType) {
      return context.prisma.users();
    },
    multipleChoiceAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.multipleChoiceAnswer({ id: args.answerId });
    },
  },
  Mutation: {
    createUser(root: any, args: any, context: IContextType) {
      return context.prisma.createUser({
        name: args.name,
        isTeacher: args.isTeacher,
      });
    },
    createDocument(root: any, args: any, context: IContextType) {
      return context.prisma.createDocument({
        value: args.value,
        users: {
          connect: args.userIds.map((id: string) => {
            return { id };
          }),
        },
      });
    },
    createMultipleChoiceAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.createMultipleChoiceAnswer({
        isCorrect: args.isCorrect,
      });
    },
    updateDocument(root: any, args: any, context: IContextType) {
      context.valueChangedPubSub.publish("VALUE_CHANGED" + args.documentId, {
        valueChanged: args,
      });
      return context.prisma.updateDocument({
        where: { id: args.documentId },
        data: {
          users: {
            connect: args.userIds.map((id: string) => {
              return { id };
            }),
          },
          value: args.value,
        },
      });
    },
    updateMultipleChoiceAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.updateMultipleChoiceAnswer({
        where: { id: args.answerId },
        data: {
          isCorrect: args.isCorrect,
        },
      });
    },
  },
  Subscription: {
    valueChanged: {
      subscribe: (parent: any, args: any, context: IContextType, info: any) => {
        const channel = "VALUE_CHANGED" + args.documentId;
        return context.valueChangedPubSub.asyncIterator(channel);
      },
    },
  },

  Document: {
    users(root: { id: string }, args: {}, context: IContextType) {
      return context.prisma
        .document({
          id: root.id,
        })
        .users();
    },
  },
};

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
