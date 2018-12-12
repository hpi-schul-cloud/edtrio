import gql from "graphql-tag";
import React from "react";
import { Value } from "slate";
import styled, { ThemeProvider } from "styled-components";

import ApolloClient from "apollo-boost";
import { ApolloProvider, Query } from "react-apollo";

import { theme } from "./config/theme";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "bulma-tooltip/dist/css/bulma-tooltip.min.css";
import "bulma/css/bulma.css";
import "material-icons/iconfont/material-icons.css";
import "./App.css";
import {
  EditorStateContext,
  EditorStateProvider,
} from "./context/EditorStateContext";
import {
  LastSavedContext,
  LastSavedProvider,
} from "./context/lastSavedContext";
import Editor from "./Editor";

import { testUsers } from "./dev-helpers/StateController";

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

const apolloClient = new ApolloClient({
  uri: "http://localhost:4000",
});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <ApolloProvider client={apolloClient}>
        <LastSavedProvider>
          <EditorStateProvider
            initialUserList={testUsers.users}
            initialUser={testUsers.currentUser}
          >
            <Query
              query={gql`
                {
                  document(documentId: "cjpcys08y002607989geb9ttk") {
                    id
                    value
                  }
                }
              `}
            >
              {({ loading, error, data }) => {
                return data.document ? (
                  <AppWrapper>
                    <div className="App">
                      <EditorStateContext.Consumer>
                        {({
                          updateIsEditable,
                          isEditable,
                          updateCurrentUser,
                          currentUser,
                          users,
                        }) => (
                          <LastSavedContext.Consumer>
                            {({ updateLastSaved }) => (
                              <Editor
                                updateLastSaved={updateLastSaved}
                                isEditable={isEditable}
                                updateIsEditable={updateIsEditable}
                                users={users}
                                currentUser={currentUser}
                                updateCurrentUser={updateCurrentUser}
                                apolloClient={apolloClient}
                                initialValue={Value.fromJSON(
                                  JSON.parse(data.document.value),
                                )}
                              />
                            )}
                          </LastSavedContext.Consumer>
                        )}
                      </EditorStateContext.Consumer>
                    </div>
                  </AppWrapper>
                ) : null;
              }}
            </Query>
          </EditorStateProvider>
        </LastSavedProvider>
      </ApolloProvider>
    </ThemeProvider>
  );
}
