import { IContextType } from "../index";

export const typeResolvers = {
  // based on StackOverflow thread:
  // https://stackoverflow.com/questions/52710372/include-relationship-when-querying-node-using-prisma-generated-wrapper

  MultipleChoiceAnswer: {
    multipleChoiceSubmissions(root: any, args: any, context: IContextType) {
      return context.prisma
        .multipleChoiceAnswer({
          id: root.id,
        })
        .multipleChoiceSubmissions();
    },
  },

  Poll: {
    answers(root: any, args: any, context: IContextType) {
      return context.prisma
        .poll({
          id: root.id,
        })
        .answers();
    },
  },

  PollAnswer: {
    poll(root: any, args: any, context: IContextType) {
      return context.prisma
        .pollAnswer({
          id: root.id,
        })
        .poll();
    },
    votes(root: any, args: any, context: IContextType) {
      return context.prisma
        .pollAnswer({
          id: root.id,
        })
        .votes();
    },
  },
};
