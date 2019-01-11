import { IContextType } from "../index";

export const queries = {
  Query: {
    documents(root: any, args: {}, context: IContextType) {
      return context.prisma.documents({});
    },
    user(root: any, args: any, context: IContextType) {
      return context.prisma.user({ id: args.userId });
    },
    async userByOpenHpiEmail(root: any, args: any, context: IContextType) {
      const user = await context.prisma.users({
        where: { openHpiEmail: args.openHpiEmail },
      });
      return user[0];
    },
    document(root: any, args: any, context: IContextType) {
      return context.prisma.document({ id: args.documentId });
    },
    users(root: any, args: any, context: IContextType) {
      return context.prisma.users();
    },
    async multipleChoiceAnswer(root: any, args: any, context: IContextType) {
      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .submissions();

      const answer = await context.prisma.multipleChoiceAnswer({
        id: args.answerId,
      });
      // TODO: investigate. This extra submission handling should not be necessary
      return { ...answer, submissions };
    },
    submissions(root: any, args: any, context: IContextType) {
      return context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .submissions();
    },
    submission(root: any, args: any, context: IContextType) {
      return context.prisma.multipleChoiceSubmission({ id: args.submissionId });
    },
    async submissionByUser(root: any, args: any, context: IContextType) {
      const user = await context.prisma.user({ id: args.userId });
      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .submissions({
          where: {
            author: user,
          },
        });
      if (submissions.length === 0) {
        return null;
      }
      return submissions[0];
    },
  },
};
