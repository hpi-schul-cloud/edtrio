import React, { useEffect } from "react"
import Lesson from "./Lesson"
import Feedback from "./Feedback"

const Workspace = () => {
    return (
        <React.Fragment>
            <Feedback />
            <Lesson />
        </React.Fragment>
    )
}

export default Workspace
