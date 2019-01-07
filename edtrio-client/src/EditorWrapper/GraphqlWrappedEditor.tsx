import gql from "graphql-tag";
import React from "react";
import { Value } from "slate";

import { ApolloProvider, Query, Subscription } from "react-apollo";

import Editor, { IEditorUserProps } from "../Editor";
import { IUserType } from "../types";
import { apolloClient } from "./apolloClient";

interface IGraphqlWrappedEditorProps extends IEditorUserProps {
  documentId: string;
  updateCurrentUser: (newUser: IUserType) => void;
  updateUserList: (users: IUserType[]) => void;
}

// get to document value
const DOCUMENT_QUERY = gql`
  query document($documentId: String!) {
    document(documentId: $documentId) {
      value
      users {
        id
        name
        isTeacher
      }
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
          // load initial data from the server
          if (data && data.document) {
            // update userlist, if necessary
            if (props.users !== data.document.users) {
              props.updateUserList(data.document.users);
              props.updateCurrentUser(data.document.users[0]);
            }
            return (
              <Subscription
                subscription={VALUE_SUBSCRIPTION}
                variables={{ documentId: props.documentId }}
              >
                {({ data: subscriptionData }) => {
                  // get the latest changes
                  if (data && data.document) {
                    const value =
                      subscriptionData && subscriptionData.valueChanged
                        ? Value.fromJSON(subscriptionData.valueChanged.value)
                        : Value.fromJSON(data.document.value);

                    let controlledProps;
                    if (!props.currentUser.isTeacher) {
                      // if the user is a pupil, that means the editor value is controlled by the server
                      controlledProps = { value };
                    }
                    return (
                      <Editor
                        initialValue={value}
                        {...props}
                        apolloClient={apolloClient}
                        {...controlledProps}
                      />
                    );
                  }
                  return null;
                }}
              </Subscription>
            );
          }
          return null;
        }}
      </Query>
    </ApolloProvider>
  );
}
