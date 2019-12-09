import "@babel/polyfill"
import React from "react"
import ReactDOM from "react-dom"
import * as Sentry from '@sentry/browser'
import { bindAllSettledToPromise } from '~/utils/promise'
import { version } from '~/../package.json';

function renderApp() {

    if(process.env.SENTRY_DSN){
        Sentry.init({
            dsn: process.env.SENTRY_DSN,
            environment: process.env.ENVIRONMENT,
            release: version,
            integrations: [
                new Sentry.Integrations.Breadcrumbs({ console: true })
            ],
        })
    }

    const Application = require("~/Application/index").default
    ReactDOM.render(<Application />, document.getElementById("editor"))
}

// implement Promise.allSettled if not supported by browser
bindAllSettledToPromise()

renderApp()

if (module.hot) {
    module.hot.accept(renderApp)
}
