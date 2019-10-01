import React from "react"
import { object, string, scalar } from "@edtr-io/plugin"

import Notes from "./Notes"
import PrimarySettings from "./PrimarySettings"
import ExtendedSettings from "./ExtendedSettings"
export const notesState = object({
    text: string(),
    extendedSettings: object({
        extraFunky: scalar(false),
    }),
    primarySettings: object({
        funky: scalar(false),
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
