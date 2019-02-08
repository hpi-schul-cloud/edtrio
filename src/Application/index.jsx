import React from "react";
import { BrowserRouter } from "react-router-dom";

import Workspace from "~/workspace";
import GlobalStyle from "./GlobalStyle";

const Application = () => {
  return (
    <BrowserRouter>
      <div>
        <GlobalStyle />
        <Workspace />
      </div>
    </BrowserRouter>
  );
};

export default Application;
