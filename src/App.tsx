import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./config/theme";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "bulma-tooltip/dist/css/bulma-tooltip.min.css";
import "bulma/css/bulma.css";
import "../node_modules/material-icons/iconfont/material-icons.css";
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

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LastSavedProvider>
        <EditorStateProvider
          initialUserList={testUsers.users}
          initialUser={testUsers.currentUser}
        >
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
                      />
                    )}
                  </LastSavedContext.Consumer>
                )}
              </EditorStateContext.Consumer>
            </div>
          </AppWrapper>
        </EditorStateProvider>
      </LastSavedProvider>
    </ThemeProvider>
  );
}
