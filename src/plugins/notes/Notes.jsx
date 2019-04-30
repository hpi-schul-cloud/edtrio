import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import Editor from "./Editor"
import Renderer from "./Renderer"

const Notes = ({ focused, state, editable, expanded }) => {
    if (editable) {
        return <Editor state={state} expanded={expanded} />
    } else {
        return <Renderer state={state} />
    }
}

export default Notes
