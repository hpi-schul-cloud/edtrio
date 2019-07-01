import React, { useState, useEffect, useContext } from "react"
import Roberta from "./Roberta"
import Settings from "./PrimarySettings"
import { PrimarySettings } from "@edtr-io/editor-ui/"

function Editor(props) {
    let { PrimarySettingsWrapper } = props
    return (
        <React.Fragment>
            <Roberta {...props} />
            <PrimarySettings key="robertaEditor">
                <Settings {...props} />
            </PrimarySettings>
        </React.Fragment>
    )
}

export default Editor
