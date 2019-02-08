import { createGlobalStyle } from "styled-components";
import React from "react";

const GS = createGlobalStyle`
  body {
    color: ${props => (props.whiteColor ? "white" : "black")};
  }
`;

const GlobalStyle = () => {
  // TODO make distinction for schul-cloud
  return <GS />;
};

export default GlobalStyle;
