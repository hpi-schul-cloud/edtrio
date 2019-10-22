import React from "react"
import { object, string } from "@edtr-io/plugin"

import Lichtblick from "./Lichtblick"
export const lichtblickState = object({
    id: string(),
    title: string(),
    description: string(),
})

const lichtblickPlugin = {
    Component: Lichtblick,
    state: lichtblickState,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ height: 50 }} alt="" />
    ),
    title: "Lichtblick",
    description: "Medienanalyse 2.0.",
}

export default lichtblickPlugin
