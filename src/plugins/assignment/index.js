import React from "react"
import { StateType } from "@edtr-io/core"

import { Assignment } from "./Assignment"

export const assignmentState = StateType.object({})

const assignmentPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <Assignment {...props} />
    },
    state: assignmentState,
}

export default assignmentPlugin
