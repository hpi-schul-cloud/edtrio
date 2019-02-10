export const helloWorldResolvers = {
    // The official recommendation is to organize resolvers per feature, so having Queries,
    // Mutations and Subscriptions for one feature in one file and later merging them together via
    // loadash merge or something similar
    Query: {
        HelloWorld: (root, args, context, info) => {
            return {
                message: `${args.firstMessagePart} and hello World!`,
                // relevant for caching. You should always set this
                // (for client resolvers only, the server sets this automatically)
                __typename: "HelloWorldMessage",
            }
        },
    },
}
