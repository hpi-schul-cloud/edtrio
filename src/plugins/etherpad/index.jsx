import React from "react"
import { StateType } from "@edtr-io/core"

import Etherpad from "./Etherpad"
export const etherpadState = StateType.object({
    id: StateType.string(),
    title: StateType.string(),
    description: StateType.string(),
})

const etherpadPlugin = {
    Component: Etherpad,
    state: etherpadState,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "Etherpad",
    description: "Real time collaboration.",
}

export default etherpadPlugin
