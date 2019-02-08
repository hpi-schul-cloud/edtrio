import React from "react"
import { Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import Lesson from "./Lesson"

const Workspace = () => {
    return (
        <React.Fragment>
            <h1>Hello World</h1>
            <Switch>
                <Route path="/:lessonId" component={Lesson} />
                <Route exact path="/" component={Dashboard} />
            </Switch>
        </React.Fragment>
    )
}

export default Workspace
