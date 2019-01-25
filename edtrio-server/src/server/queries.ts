import { IContextType } from "../index";

export const queries = {
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
      return context.prisma.multipleChoiceAnswer({
        id: args.answerId,
      });
    },
    multipleChoiceSubmissions(root: any, args: any, context: IContextType) {
      return context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .multipleChoiceSubmissions();
    },
    multipleChoiceSubmission(root: any, args: any, context: IContextType) {
      return context.prisma.multipleChoiceSubmission({ id: args.submissionId });
    },
    async submissionByUser(root: any, args: any, context: IContextType) {
      const user = await context.prisma.user({ id: args.userId });
      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .multipleChoiceSubmissions({
          where: {
            author: user,
          },
        });
      if (submissions.length === 0) {
        return null;
      }
      return submissions[0];
    },
    poll(root: any, args: any, context: IContextType) {
      return context.prisma.poll({ id: args.pollId });
    },
    pollAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.pollAnswer({ id: args.pollAnswerId });
    },
  },
};
