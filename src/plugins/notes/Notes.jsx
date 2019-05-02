import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import Editor from "./Editor"
import Renderer from "./Renderer"

const Notes = ({
    focused,
    state,
    editable,
    attachSettings,
    expanded,
    PrimarySettingsWrapper,
    ExtendedSettingsWrapper,
    primarySettingsVisible,
    extendedSettingsVisible,
    hideExtendedSettings,
}) => {
    if (editable) {
        return (
            <Editor
                state={state}
                expanded={expanded}
                attachSettings={attachSettings}
                PrimarySettingsWrapper={PrimarySettingsWrapper}
                ExtendedSettingsWrapper={ExtendedSettingsWrapper}
                primarySettingsVisible={primarySettingsVisible}
                extendedSettingsVisible={extendedSettingsVisible}
                hideExtendedSettings={hideExtendedSettings}
            />
        )
    } else {
        return <Renderer state={state} />
    }
}

export default Notes
