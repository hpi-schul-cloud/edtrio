import gql from "graphql-tag";
import React from "react";
import { Value } from "slate";

import { ApolloProvider, Query, Subscription } from "react-apollo";

import Editor, { IEditorUserProps } from "../Editor";
import { apolloClient } from "./apolloClient";

interface IGraphqlWrappedEditorProps extends IEditorUserProps {
  documentId: string;
}

// get to document value
const DOCUMENT_QUERY = gql`
  query document($documentId: String!) {
    document(documentId: $documentId) {
      value
    }
  }
`;

// establish a subscription to get the document value
const VALUE_SUBSCRIPTION = gql`
  subscription valueChanged($documentId: String!) {
    valueChanged(documentId: $documentId) {
      value
    }
  }
`;

export default function GraphqlWrappedEditor(
  props: IGraphqlWrappedEditorProps,
) {
  return (
    <ApolloProvider client={apolloClient}>
      <Query
        query={DOCUMENT_QUERY}
        variables={{ documentId: props.documentId }}
      >
        {({ loading, error, data }) => {
          if (props.currentUser.isTeacher) {
            return data && data.document ? (
              // if the user is a teacher and the grapqhl-server is in reach
              // load initial data from the server and let the editor handle it's own state
              <Editor
                initialValue={Value.fromJSON(JSON.parse(data.document.value))}
                {...props}
                apolloClient={apolloClient}
              />
            ) : (
              // if the user is a teacher but the grapqhl-server is not reachable
              // show a local editor working with localStorage
              <Editor {...props} />
            );
          } else {
            return data && data.document ? (
              <Subscription
                subscription={VALUE_SUBSCRIPTION}
                variables={{ documentId: props.documentId }}
              >
                {({ data: subscriptionData }) => {
                  return data && data.document ? (
                    // if the user is a pupil and the grapql-server is in reach
                    // show an editor in readOnly mode where the value is provided by the graphql
                    // subscription
                    <Editor
                      // TODO: there should be a way to save this as json instead of a string
                      initialValue={Value.fromJSON(
                        JSON.parse(data.document.value),
                      )}
                      {...props}
                      apolloClient={apolloClient}
                      value={
                        subscriptionData && subscriptionData.valueChanged
                          ? Value.fromJSON(
                              JSON.parse(subscriptionData.valueChanged.value),
                            )
                          : Value.fromJSON(JSON.parse(data.document.value))
                      }
                    />
                  ) : (
                    // if the user is a pupil but the grapqhl-server is not reachable
                    // show a local editor working with localStorage
                    <Editor {...props} />
                  );
                }}
              </Subscription>
            ) : (
              // if the user is a pupil but the grapqhl-server is not reachable
              // show a local editor working with localStorage
              <Editor {...props} />
            );
          }
        }}
      </Query>
    </ApolloProvider>
  );
}
