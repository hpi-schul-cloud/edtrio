import React, { useEffect, useRef } from "react"
import styled from "styled-components"

import Editor from "./Editor"
import Renderer from "./Renderer"

const Notes = ({ state, editable, ...props }) => {
    if (editable) {
        return <Editor state={state} {...props} />
    } else {
        return <Renderer state={state} />
    }
}

export default Notes
