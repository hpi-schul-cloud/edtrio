import React from "react"
import { StateType } from "@edtr-io/core"

import { PluginMenu } from "./PluginMenu"

const menuState = StateType.object({
    text: StateType.child("text"),
    children: StateType.list(StateType.child(), 0),
})

export const menuPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <PluginMenu {...props} />
    },
    state: menuState,
}
