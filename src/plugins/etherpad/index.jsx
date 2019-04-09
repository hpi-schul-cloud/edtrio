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
}

export default etherpadPlugin
