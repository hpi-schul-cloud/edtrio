import { InMemoryCache } from "apollo-cache-inmemory"
import ApolloClient from "apollo-client"
import { split, ApolloLink } from "apollo-link"
import { HttpLink } from "apollo-link-http"
import { WebSocketLink } from "apollo-link-ws"
import { getMainDefinition } from "apollo-utilities"
import { withClientState } from "apollo-link-state"

import {
    GRAPHQL_HTTP_URL as graphqlHttpUrl,
    GRAPHQL_WS_URL as graphqlWSUrl,
} from "~/config"
import { createResolvers } from "./clientResolvers"
import typeDefs from "./schema.graphql"

// Create the cache
const cache = new InMemoryCache()

// Create links for the different connections
const wsLink = new WebSocketLink({
    uri: graphqlWSUrl,
    options: {
        reconnect: true,
    },
})
const httpLink = new HttpLink({ uri: graphqlHttpUrl })

// using the ability to split links, we can send data to each link
// depending on what kind of operation is being sent
const outgoingLink = split(
    // split based on operation type
    ({ query }) => {
        const { kind, operation } = getMainDefinition(query)
        return kind === "OperationDefinition" && operation === "subscription"
    },
    wsLink,
    httpLink,
)

// Use this to prepopulate the cache / client state
const defaults = {}

// add client side resolvers and support local state handling
const resolvers = createResolvers()
const localStateLink = withClientState({ cache, resolvers, typeDefs, defaults })

// Finally, create the ApolloClient instance with the modified network interface
export const apolloClient = new ApolloClient({
    link: ApolloLink.from([localStateLink, outgoingLink]),
    cache,
})
