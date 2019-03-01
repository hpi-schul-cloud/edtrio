import React, { useEffect } from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Lesson from "./Lesson"

const Workspace = () => {
    return (
        <Switch>
            <Route path="/lesson/:lessonId" component={Lesson} />
            <Route exact path="/" component={Dashboard} />
            <Redirect to="/" />
        </Switch>
    )
}

export default Workspace
