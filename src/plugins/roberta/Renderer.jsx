import React, { useState, useEffect, useContext } from "react"
import Editor from "./Editor"
import Roberta from "./Roberta"

function Renderer(props) {
    if (props.editable) {
        return <Editor {...props} />
    } else {
        return <Roberta {...props} />
    }
}

export default Renderer
