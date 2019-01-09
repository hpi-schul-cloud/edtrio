import React from "react";
import { ThemeProvider } from "styled-components";

import { theme } from "./config/theme";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import "bulma-tooltip/dist/css/bulma-tooltip.min.css";
import "bulma/css/bulma.css";
import "material-icons/iconfont/material-icons.css";
import "./App.css";
import { EditorStateProvider } from "./context/EditorStateContext";
import { LastSavedProvider } from "./context/lastSavedContext";
import EditorWrapper from "./EditorWrapper";

// TODO: Remove: import { testUsers } from "./dev-helpers/StateController";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <LastSavedProvider>
        <EditorStateProvider
          // TODO: Load this from the Backend as well
          initialUserList={null}
          initialUser={null}
        >
          <EditorWrapper
            // TODO: get this from the props (when included in schul-cloud client)
            documentId={"cjqm7lirq00sh0740clb48905"}
          />
        </EditorStateProvider>
        ); }}
      </LastSavedProvider>
    </ThemeProvider>
  );
}
