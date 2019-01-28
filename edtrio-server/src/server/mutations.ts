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
      // TODO: update document with answers
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
        },
      );

      const submissions = await context.prisma
        .multipleChoiceAnswer({ id: args.answerId })
        .multipleChoiceSubmissions();
      submissions.push(newSubmission);

      await context.prisma.updateMultipleChoiceAnswer({
        where: { id: args.answerId },
        data: {
          multipleChoiceSubmissions: {
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
        .multipleChoiceSubmissions();
      await submissions.forEach(submission =>
        context.prisma.deleteManyMultipleChoiceSubmissions({
          id: submission.id,
        }),
      );
      const answers = await context.prisma.deleteMultipleChoiceAnswer({
        id: args.answerId,
      });
      return answers;
    },
    createPoll(root: any, args: any, context: IContextType) {
      return context.prisma.createPoll({
        votingAllowed: args.votingAllowed,
        displayResults: args.displayResults,
      });
    },
    deletePoll(root: any, args: any, context: IContextType) {
      context.prisma.deleteManyPollAnswers({ poll: args.pollId });
      return context.prisma.deletePoll({ id: args.pollId });
    },
    updatePoll(root: any, args: any, context: IContextType) {
      context.pollChangedPubSub.publish(`POLL_CHANGED_${args.pollId}`, {
        pollChanged: args,
      });

      return context.prisma.updatePoll({
        where: { id: args.pollId },
        data: {
          votingAllowed: args.votingAllowed,
          displayResults: args.displayResults,
        },
      });
    },
    async createPollAnswer(root: any, args: any, context: IContextType) {
      const newAnswer = await context.prisma.createPollAnswer({
        poll: {
          connect: { id: args.pollId },
        },
      });
      const pollAnswers = await context.prisma
        .poll({ id: args.pollId })
        .answers();
      pollAnswers.push(newAnswer);

      return context.prisma.updatePoll({
        where: { id: args.pollId },
        data: {
          answers: {
            connect: pollAnswers.map(answer => ({ id: answer.id })),
          },
        },
      });
    },
    deletePollAnswer(root: any, args: any, context: IContextType) {
      return context.prisma.deletePoll({ id: args.pollAnswerId });
    },
    async addSubmissionToPollAnswer(
      root: any,
      args: any,
      context: IContextType,
    ) {
      const users = await context.prisma
        .pollAnswer({ id: args.pollAnswerId })
        .votes();
      const userIds = users.map(user => ({ id: user.id }));
      userIds.push({ id: args.userId });

      context.pollChangedPubSub.publish(`POLL_CHANGED_${args.pollId}`, {
        pollChanged: args,
      });

      return context.prisma.updatePollAnswer({
        where: { id: args.pollAnswerId },
        data: {
          votes: {
            connect: userIds,
          },
        },
      });
    },
  },
};
