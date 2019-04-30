import React from "react"

import { Toggle } from "~/components/Button"

const PrimarySettings = ({ state, expanded }) => {
    // if (!expanded) return null
    return (
        <div
            style={{
                height: expanded ? 24 : 0,
                marginTop: expanded && 15,
                transition: "250ms all ease-in-out",
                transform: expanded ? "scaleY(1)" : "scaleY(0)",
            }}>
            <Toggle
                small
                caption="Normal"
                activeCaption="Funky"
                active={state.primarySettings.funky.value}
                onChange={newValue => state.primarySettings.funky.set(newValue)}
            />
        </div>
    )
}

export default PrimarySettings
