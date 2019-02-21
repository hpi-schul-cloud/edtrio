import { GraphQLClient } from "graphql-request"
import config from "~/config"

export const client = new GraphQLClient(config.GRAPHQL_HTTP_URL, {
    headers: {},
})

export default function request(query, variables) {
    return client.request(query, variables)
}
