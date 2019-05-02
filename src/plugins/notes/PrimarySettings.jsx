import React from "react"

import { Toggle } from "~/components/Button"

const PrimarySettings = ({ state }) => {
    return (
        <Toggle
            small
            caption="Normal"
            activeCaption="Funky"
            active={state.primarySettings.funky.value}
            onChange={newValue => state.primarySettings.funky.set(newValue)}
        />
    )
}

export default PrimarySettings
