import React from "react"
import styled from "styled-components"
import { Editor as Edtr } from "@edtr-io/core"

import etherpadPluginPreview from "~/plugins/etherpad/Preview"
import nexboardPluginPreview from "~/plugins/nexboard/Preview"
import lichtblickPluginPreview from '~/plugins/lichtblick/Preview'
import { plugins } from "~/workspace/Lesson/Section/Editor"

const EditorWrapper = styled.div`
    width: 850px;
    transform-origin: left top;
    transform: ${props => props.expanded && "scale(0.15)"};
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
            <EditorWrapper
                expanded={this.props.expanded}
                editing={this.props.editing}>
                <Edtr
                    plugins={{
                        ...plugins,
                        etherpad: etherpadPluginPreview,
                        nexboard: nexboardPluginPreview,
                        lichtblick: lichtblickPluginPreview,
                    }}
                    defaultPlugin={"text"}
                    editable={false}
                    omitDragDropContext
                    initialState={this.docValue}
                />
            </EditorWrapper>
        )
    }
}
