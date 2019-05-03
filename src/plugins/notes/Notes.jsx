import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import Editor from "./Editor"
import Renderer from "./Renderer"

const Notes = ({ focused, state, editable, rowProps }) => {
    if (editable) {
        return <Editor state={state} rowProps={rowProps} />
    } else {
        return <Renderer state={state} />
    }
}

export default Notes
