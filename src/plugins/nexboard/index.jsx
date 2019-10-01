import React from "react"
import { object, string } from "@edtr-io/plugin"

import Nexboard from "./Nexboard"
export const nexboardState = object({
    id: string(),
})

const nexboardPlugin = {
    Component: Nexboard,
    state: nexboardState,
    icon: () => (
        <img
            src={require("./assets/logo.png")}
            style={{ width: "100%" }}
            alt=""
        />
    ),
    title: "Nexboard",
    description:
        "Benutze das digitale Nexboard, um all deine Ideen festzuhalten!",
}

export default nexboardPlugin
