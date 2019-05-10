import React from "react"

import Settings from "./Settings"
import MoveControls from "./MoveControls"

export { default as createPrimarySettingsWrapper } from "./PrimarySettings"
export { default as createExtendedSettingsWrapper } from "./ExtendedSettings"

const Controls = ({
    index,
    expanded,
    setShowExtendedSettings,
    pluginName,
    rows,
    row,
    connectDragSource,
}) => {
    return (
        <React.Fragment>
            <Settings
                index={index}
                expanded={expanded}
                setShowExtendedSettings={setShowExtendedSettings}>
                <MoveControls
                    expanded={expanded}
                    index={index}
                    rows={rows}
                    row={row}
                    connectDragSource={connectDragSource}
                />
            </Settings>
        </React.Fragment>
    )
}

export default Controls
