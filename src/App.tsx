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
  IsEditableContext,
  IsEditableProvider,
} from "./context/isEditableContext";
import {
  LastSavedContext,
  LastSavedProvider,
} from "./context/lastSavedContext";
import Editor from "./Editor";

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LastSavedProvider>
        <IsEditableProvider>
          <AppWrapper>
            <div className="App">
              <IsEditableContext.Consumer>
                {({ updateIsEditable, isEditable }) => (
                  <LastSavedContext.Consumer>
                    {({ updateLastSaved }) => (
                      <Editor
                        updateLastSaved={updateLastSaved}
                        isEditable={isEditable}
                        updateIsEditable={updateIsEditable}
                      />
                    )}
                  </LastSavedContext.Consumer>
                )}
              </IsEditableContext.Consumer>
            </div>
          </AppWrapper>
        </IsEditableProvider>
      </LastSavedProvider>
    </ThemeProvider>
  );
}
