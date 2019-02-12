import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Lesson from "./Lesson"

import ApolloPlayground from "./ApolloPlayground"
import EditorPlayground from "./EditorPlayground"

const Workspace = () => {
    return (
        <Switch>
            <Route path="/lesson/:lessonId" component={Lesson} />
            <Route path="/Apollo/:ApolloId" component={ApolloPlayground} />
            <Route path="/editor" component={EditorPlayground} />
            <Route exact path="/" component={Dashboard} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Workspace
