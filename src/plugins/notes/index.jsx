import React from "react"
import { StateType } from "@edtr-io/core"

import Notes from "./Notes"
export const notesState = StateType.object({
    text: StateType.string(),
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
