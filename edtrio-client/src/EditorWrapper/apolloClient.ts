import { InMemoryCache } from "apollo-cache-inmemory";
import ApolloClient from "apollo-client";
import { split } from "apollo-link";
import { HttpLink } from "apollo-link-http";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

import { OperationDefinitionNode } from "graphql";
import { graphqlHttpUrl, graphqlWSUrl } from "../config/urls";

const wsLink = new WebSocketLink({
  uri: graphqlWSUrl,
  options: {
    reconnect: true,
  },
});

const httpLink = new HttpLink({ uri: graphqlHttpUrl });

// using the ability to split links, you can send data to each link
// depending on what kind of operation is being sent
const link = split(
  // split based on operation type
  ({ query }) => {
    const { kind, operation } = getMainDefinition(
      query,
    ) as OperationDefinitionNode;
    return kind === "OperationDefinition" && operation === "subscription";
  },
  wsLink,
  httpLink,
);

const cache = new InMemoryCache();

// Finally, create your ApolloClient instance with the modified network interface
export const apolloClient = new ApolloClient({
  link,
  cache,
});
