import { IContextType } from "../index";

export const mutations = {
  Mutation: {
    createUser(root: any, args: any, context: IContextType) {
      return context.prisma.createUser({
        name: args.name,
        isTeacher: args.isTeacher,
        openHpiEmail: args.openHpiEmail,
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
    async createMultipleChoiceSubmission(
      root: any,
      args: any,
      context: IContextType,
    ) {
      const newSubmission = await context.prisma.createMultipleChoiceSubmission(
        {
          isChecked: args.isChecked,
          author: {
            connect: { id: args.userId },
          },
          answer: {
            connect: { id: args.answerId },
          },
        },
      );
      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .submissions();
      submissions.push(newSubmission);
      await context.prisma.updateMultipleChoiceAnswer({
        where: { id: args.answerId },
        data: {
          submissions: {
            connect: submissions.map(submission => {
              return { id: submission.id };
            }),
          },
        },
      });

      return newSubmission;
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
      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .submissions();
      await submissions.forEach(submission =>
        context.prisma.deleteManyMultipleChoiceSubmissions({
          id: submission.id,
        }),
      );
      // TODO: Check, why not all submissions are deleted before trying to delete the answer
      const answers = await context.prisma.deleteMultipleChoiceAnswer({
        id: args.answerId,
      });
      return answers;
    },
  },
};
