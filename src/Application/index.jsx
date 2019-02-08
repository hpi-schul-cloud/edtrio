import React from "react"
import { BrowserRouter } from "react-router-dom"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"
import config from "~/config"

const Application = () => {
    return (
        <BrowserRouter
            basename={config.IS_EMBED && `${window.location.pathname}`}>
            <div>
                <GlobalStyle />
                <Workspace />
            </div>
        </BrowserRouter>
    )
}

export default Application
