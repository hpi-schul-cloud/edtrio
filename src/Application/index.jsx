import React from "react"
import { BrowserRouter } from "react-router-dom"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"

const Application = () => {
    return (
        // TODO set base url for schul-cloud integration
        <BrowserRouter>
            <div>
                <GlobalStyle />
                <Workspace />
            </div>
        </BrowserRouter>
    )
}

export default Application
