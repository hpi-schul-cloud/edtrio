//import react components and edtr.io state classes
import React from "react"
import { StateType } from "@edtr-io/core"
import Renderer from "./Renderer"
export const robertaState = StateType.object({
    link: StateType.string(), 
    random: StateType.scalar()
})

//import the renderer for this plugin


const openRobertaPlugin = {
    Component: Renderer,
    state: robertaState,
    icon: () => (
        <img src={require("./assets/logo.svg")} style={{ width: 100 }} alt="openRoberta Logo" />
    ),
    title: "OpenRoberta",
    description: "Graphical robot programming",
    onPaste(clipboardData) {
        const value = clipboardData.getData('text')

        const regex = /^(https?:\/\/)lab\.open-roberta\.org/
        if (regex.test(value)) {
            return { state: { link: value } }
        }
    }
}

export default openRobertaPlugin