import React, { Component } from "react";
import styled, { ThemeProvider } from "styled-components";

import { theme } from "./config/theme";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "bulma-tooltip/dist/css/bulma-tooltip.min.css";
import "bulma/css/bulma.css";
import "../node_modules/material-icons/iconfont/material-icons.css";
import "./App.css";
import {
  LastSavedProvider,
  LastSavedContext,
} from "./context/lastSavedContext";
import Editor from "./Editor";

const AppWrapper = styled.div`
  margin: 0;
  padding: 0;
  font-family: sans-serif;
`;

class App extends Component {
  public render() {
    return (
      <ThemeProvider theme={theme}>
        <LastSavedProvider>
          <AppWrapper>
            <div className="App">
              <LastSavedContext.Consumer>
                {({ updateLastSaved }) => (
                  <Editor updateLastSaved={updateLastSaved} />
                )}
              </LastSavedContext.Consumer>
            </div>
          </AppWrapper>
        </LastSavedProvider>
      </ThemeProvider>
    );
  }
}

export default App;
