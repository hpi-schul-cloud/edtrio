import { StateType } from "@edtr-io/core"

import Nexboard from "./Nexboard"
export const nexboardState = StateType.object()

const nexboardPlugin = {
    Component: Nexboard,
    state: nexboardState,
}

export default nexboardPlugin
