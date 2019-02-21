import React from "react"
import { BrowserRouter } from "react-router-dom"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"
import config from "~/config"
import Contexts from "~/contexts"

const Application = () => {
    return (
        <BrowserRouter
            basename={
                config.IS_EMBED ? `${window.location.pathname}` : undefined
            }>
            <Contexts>
                <GlobalStyle />
                <Workspace />
            </Contexts>
        </BrowserRouter>
    )
}

export default Application
