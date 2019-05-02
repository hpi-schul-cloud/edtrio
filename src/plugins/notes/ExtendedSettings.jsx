import React from "react"

import { Toggle } from "~/components/Button"

const ExtendedSettings = ({ state }) => {
    return (
        <Toggle
            small
            caption="Normal"
            activeCaption="Extra Funky"
            active={state.extendedSettings.extraFunky.value}
            onChange={newValue =>
                state.extendedSettings.extraFunky.set(newValue)
            }
        />
    )
}

export default ExtendedSettings
