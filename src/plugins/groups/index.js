import React from "react"
import { StateType } from "@edtr-io/core"

import { GroupEditor } from "./GroupEditor/index"
import { AdvancedGroupEditor } from "./AdvancedGroupEditor/index"
import { QuickGroupEditor } from "./QuickGroupEditor/index"
import { GroupsOverview } from "./GroupsOverview/index"
import { PluginIcon } from "./PluginIcon"

const groupState = StateType.object({
    workingPackages: StateType.list(StateType.child("text"), 0),
    startValues: StateType.scalar(null),
    setId: StateType.string(),
    StudentsChooseGroup: StateType.scalar(false),
})

const advancedGroupState = StateType.object({
    groupState,
    fixedGroupId: StateType.string(),
})

const groupOverviewState = StateType.object({
    children: StateType.list(StateType.child("text"), 0),
})

export const groupsOverviewPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <GroupsOverview {...props} />
    },
    state: groupOverviewState,
    title: "Gruppenarbeit",
    description:
        "Erlaubt die Umsetzung von verschiedenen Arten von Gruppenarbeiten.",
    icon: () => <PluginIcon />,
}

export const groupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <GroupEditor {...props} />
    },
    state: groupState,
    dontIncludeInMenu: true,
}
export const advancedGroupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <AdvancedGroupEditor {...props} />
    },
    state: advancedGroupState,
    dontIncludeInMenu: true,
}

export const quickGroupPlugin = {
    // eslint-disable-next-line react/display-name
    Component: props => {
        return <QuickGroupEditor {...props} />
    },
    state: groupState,
    dontIncludeInMenu: true,
}
