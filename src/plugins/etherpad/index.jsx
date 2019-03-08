import { StateType } from "@edtr-io/core"

import Etherpad from "./Etherpad"
export const etherpadState = StateType.object({
    id: StateType.string(),
    title: StateType.string("My Etherpad"),
    description: StateType.string("This is the first Etherpad plugin"),
})

const etherpadPlugin = {
    Component: Etherpad,
    state: etherpadState,
}

export default etherpadPlugin
