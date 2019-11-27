import "@babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import { bindAllSettledToPromise } from '~/utils/promise'

function renderApp() {
    const Application = require("~/Application/index").default
    ReactDOM.render(<Application />, document.getElementById("editor"))
}

// implement Promise.allSettled if not supported by browser
bindAllSettledToPromise()

renderApp()

if (module.hot) {
    module.hot.accept(renderApp)
}
