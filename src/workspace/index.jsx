import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"
import Dashboard from "./Dashboard"
import Lesson from "./Lesson"

const Workspace = () => {
    return (
        <React.Fragment>
            <Switch>
                <Route path="/lesson/:lessonId" component={Lesson} />
                <Route exact path="/" component={Dashboard} />
                <Redirect to="/" />
            </Switch>
        </React.Fragment>
    )
}

export default Workspace
