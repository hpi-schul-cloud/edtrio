export const lessonResolvers = {
    // The official recommendation is to organize resolvers per feature, so having Queries,
    // Mutations and Subscriptions for one feature in one file and later merging them together via
    // loadash merge or something similar
    Query: {
        lesson: async (root, args, context, info) => {
            await new Promise(resolve => setTimeout(resolve, 1000))
            return {
                id: args.id,
                title: `Sample lesson`,
                sections: [
                    {
                        id: 124124,
                        notes: "",
                        title: "Sample Section",
                        docValue: null,
                    },
                    {
                        id: 1235551,
                        notes: "",
                        title: "Second Sample Section",
                        docValue: null,
                    },
                ],
                // relevant for caching. You should always set this
                // (for client resolvers only, the server sets this automatically)
                __typename: "BootstrapLesson",
            }
        },
    },
}
