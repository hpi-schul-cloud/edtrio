import React from "react"
import { BrowserRouter } from "react-router-dom"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"
import config from "~/config"
import Contexts from "~/contexts"
import Error from "./Error"

const Application = () => {
    return (
        <Contexts>
            <Error />
            <GlobalStyle />
            <Workspace />
        </Contexts>
    )
}

export default Application
