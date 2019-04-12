import React from "react"
import { StateType } from "@edtr-io/core"

import Nexboard from "./Nexboard"
export const nexboardState = StateType.object({
    id: StateType.string(),
})

const nexboardPlugin = {
    Component: Nexboard,
    state: nexboardState,
    icon: () => <img src={require("./assets/logo.png")} alt="" />,
    title: "Nexboard",
    description:
        "Benutze das digitale Nexboard, um all deine Ideen festzuhalten!",
}

export default nexboardPlugin
