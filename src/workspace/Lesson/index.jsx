import React from "react"
import { withRouter } from "react-router"

const Lesson = props => {
    return (
        <div>
            <h1>
                This is could be a page for lesson {props.match.params.lessonId}
            </h1>
        </div>
    )
}

export default withRouter(Lesson)
