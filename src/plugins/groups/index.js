import React from "react"
import { StateType } from "@edtr-io/core"

import { GroupEditor } from "./GroupEditor/index"

const groupState = StateType.object({
    studentIds: StateType.string("ids"),
})

export const groupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <GroupEditor {...props} />
    },
    state: groupState,
}
