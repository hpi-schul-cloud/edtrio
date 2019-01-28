import { IContextType } from "../index";

export const subscriptions = {
  Subscription: {
    valueChanged: {
      subscribe: (parent: any, args: any, context: IContextType, info: any) => {
        const channel = "VALUE_CHANGED" + args.documentId;
        return context.valueChangedPubSub.asyncIterator(channel);
      },
    },
    pollChanged: {
      subscribe: (parent: any, args: any, context: IContextType, info: any) => {
        const channel = `POLL_CHANGED_${args.pollId}`;
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
