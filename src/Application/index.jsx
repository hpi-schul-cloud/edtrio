import React from "react"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"
import config from "~/config"
import Contexts from "~/Contexts"
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
