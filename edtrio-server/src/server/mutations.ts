import { IContextType } from "../index";

export const mutations = {
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
      if (args.value) {
        context.valueChangedPubSub.publish("VALUE_CHANGED" + args.documentId, {
          valueChanged: args,
        });
      }
      let users;
      if (args.userIds) {
        users = {
          users: {
            connect: args.userIds.map((id: string) => {
              return { id };
            }),
          },
        };
      }
      return context.prisma.updateDocument({
        where: { id: args.documentId },
        data: {
          ...users,
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
    createMultipleChoiceSubmission(
      root: any,
      args: any,
      context: IContextType,
    ) {
      return context.prisma.createMultipleChoiceSubmission({
        isChecked: args.isChecked,
        author: {
          connect: args.userId,
        },
        answer: {
          connect: args.answerId,
        },
      });
    },
    updateMultipleChoiceSubmission(
      root: any,
      args: any,
      context: IContextType,
    ) {
      return context.prisma.updateMultipleChoiceSubmission({
        where: { id: args.submissionId },
        data: {
          isChecked: args.isChecked,
        },
      });
    },
    deleteMultipleChoiceSubmission(
      root: any,
      args: any,
      context: IContextType,
    ) {
      return context.prisma.deleteMultipleChoiceSubmission({
        id: args.submissionId,
      });
    },
    async deleteMultipleChoiceAnswer(
      root: any,
      args: any,
      context: IContextType,
    ) {
      // find and delete all related submissions
      // TODO: not sure if this is what we want here - maybe we want to store them for a while before deleting them
      const submissions = await context.prisma.multipleChoiceSubmissions({
        where: { id: args.answerId },
      });
      submissions.forEach(submission =>
        context.prisma.deleteManyMultipleChoiceSubmissions({
          id: submission.id,
        }),
      );
      return context.prisma.deleteMultipleChoiceAnswer({
        id: args.answerId,
      });
    },
  },
};
