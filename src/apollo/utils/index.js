export function getDataOrThrow(graphqlResult) {
    if (graphqlResult.loading || graphqlResult.error) {
        throw new Error("Error getting data")
    }

    return graphqlResult.data
}
