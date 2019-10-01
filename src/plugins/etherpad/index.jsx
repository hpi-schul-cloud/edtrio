import React from "react"
import { object, string } from "@edtr-io/plugin"

import Etherpad from "./Etherpad"
export const etherpadState = object({
    id: string(),
    title: string(),
    description: string(),
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
