import React from "react"
import styled from "styled-components"
import { Editor as Edtr } from "@edtr-io/core"

import { plugins } from "~/workspace/Lesson/Section/Editor"

const EditorWrapper = styled.div`
    width: 850px;
    transform-origin: left top;
    transform: scale(0.25);
    overflow: hidden;
    user-select: none;
    * {
        outline: none !important;
    }
`

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.docValue =
            this.props.docValue && Object.keys(this.props.docValue).length
                ? this.props.docValue
                : {
                      plugin: "rows",
                  }
    }

    render() {
        return (
            <EditorWrapper>
                <Edtr
                    plugins={plugins}
                    defaultPlugin={"text"}
                    editable={false}
                    initialState={this.docValue}
                />
            </EditorWrapper>
        )
    }
}
