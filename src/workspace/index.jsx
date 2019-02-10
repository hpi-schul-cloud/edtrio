import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Lesson from "./Lesson"
import { ApolloProvider } from "react-apollo"
// Note: These are not official Apollo Hooks. However, several of the Apollo Maintainers are contributing to this project
// so Apollo Hooks will probably look similar https://github.com/trojanowski/react-apollo-hooks/issues/40
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks"

import { apolloClient } from "../apollo"
import ApolloPlayground from "./ApolloPlayground"

const Workspace = () => {
    return (
        <ApolloProvider client={apolloClient}>
            <ApolloHooksProvider client={apolloClient}>
                <Switch>
                    <Route path="/lesson/:lessonId" component={Lesson} />
                    <Route
                        path="/Apollo/:ApolloId"
                        component={ApolloPlayground}
                    />
                    <Route exact path="/" component={Dashboard} />
                    <Redirect to="/" />
                </Switch>
            </ApolloHooksProvider>
        </ApolloProvider>
    )
}

export default Workspace
