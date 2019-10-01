import "@babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"

function renderApp() {
    const Application = require("~/Application/index").default
    ReactDOM.render(<Application />, document.getElementById("editor"))
}

renderApp()

if (module.hot) {
    module.hot.accept(renderApp)
}
