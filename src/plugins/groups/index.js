import React from "react"
import { StateType } from "@edtr-io/core"

import { GroupEditor } from "./GroupEditor/index"
import { AdvancedGroupEditor } from "./AdvancedGroupEditor/index"
import { QuickGroupEditor } from "./QuickGroupEditor/index"

const groupState = StateType.object({
    workingPackages: StateType.list(StateType.child("text"), 0),
    groupId: StateType.string(),
})

const simpleGroupState = StateType.object({
    workingPackage: StateType.child("counter"),
    groupId: StateType.string(),
})

export const groupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <GroupEditor {...props} />
    },
    state: groupState,
}
export const advancedGroupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <AdvancedGroupEditor {...props} />
    },
    state: groupState,
}

export const quickGroupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <QuickGroupEditor {...props} />
    },
    state: simpleGroupState,
}
