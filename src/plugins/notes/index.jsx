import React from "react"
import { StateType } from "@edtr-io/core"

import Notes from "./Notes"
import PrimarySettings from "./PrimarySettings"
import ExtendedSettings from "./ExtendedSettings"
export const notesState = StateType.object({
    text: StateType.string(),
    extendedSettings: StateType.object({
        extraFunky: StateType.scalar(false),
    }),
    primarySettings: StateType.object({
        funky: StateType.scalar(false),
    }),
})

const notesPlugin = {
    Component: Notes,
    state: notesState,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "Notizen",
    description: "Erstelle Notizen, sodass du nichts vergisst!",
}

export default notesPlugin
