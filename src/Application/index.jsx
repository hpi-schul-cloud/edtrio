import React from "react"
import { hot } from "react-hot-loader"

import Workspace from "~/workspace"
import GlobalStyle from "./GlobalStyle"
import config from "~/config"
import Contexts from "~/Contexts"
import Error from "./Error"
import ErrorBoundary from "~/components/ErrorBoundary"

const Application = () => {
    return (
        <ErrorBoundary>
            <Contexts>
                <Error />
                <GlobalStyle />
                <Workspace />
            </Contexts>
        </ErrorBoundary>
    )
}

export default hot(module)(Application)
