import React from "react"
import { StateType } from "@edtr-io/core"

import { Jigsaw } from "./Jigsaw"

const jigsawState = StateType.object({
    children: StateType.list(StateType.child("Text"), 0),
})

export const jigsawPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <Jigsaw {...props} />
    },
    state: jigsawState,
    dontIncludeInMenu: true,
}
