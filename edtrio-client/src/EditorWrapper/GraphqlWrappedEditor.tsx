import React from "react";
import { Value } from "slate";

import { ApolloProvider } from "react-apollo";

import Editor, { IEditorUserProps } from "../Editor";
import {
  DOCUMENT_QUERY,
  DocumentQuery,
  VALUE_SUBSCRIPTION,
  ValueSubscription,
} from "../graphqlOperations";
import { IUserType } from "../types";
import { apolloClient } from "./apolloClient";

interface IGraphqlWrappedEditorProps extends IEditorUserProps {
  documentId: string;
  updateCurrentUser: (newUser: IUserType) => void;
  updateUserList: (users: IUserType[]) => void;
}

export default function GraphqlWrappedEditor(
  props: IGraphqlWrappedEditorProps,
) {
  return (
    <ApolloProvider client={apolloClient}>
      <DocumentQuery
        query={DOCUMENT_QUERY}
        variables={{ documentId: props.documentId }}
      >
        {({ loading, error, data }) => {
          // load initial data from the server
          if (data && data.document) {
            // update userlist, if necessary
            if (data.document.users && props.users !== data.document.users) {
            }
            return (
              <ValueSubscription
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
              </ValueSubscription>
            );
          }
          return null;
        }}
      </DocumentQuery>
    </ApolloProvider>
  );
}
