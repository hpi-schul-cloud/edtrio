import { Document } from "@edtr-io/core"
import React from "react"
import styled from "styled-components"

import etherpadPluginPreview from "~/plugins/etherpad/Preview"
import nexboardPluginPreview from "~/plugins/nexboard/Preview"
import { plugins } from "~/workspace/Lesson/Section/Editor"

const EditorWrapper = styled.div`
    width: 850px;
    transform-origin: left top;
    transform: ${props =>
        props.expanded && props.editing ? "scale(0.22)" : "scale(0.235)"};
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
                <Document
                    scope={this.props.id}
                    plugins={{
                        ...plugins,
                        etherpad: etherpadPluginPreview,
                        nexboard: nexboardPluginPreview,
                    }}
                    defaultPlugin={"text"}
                    initialState={this.docValue}
                    mirror
                />
            </EditorWrapper>
        )
    }
}
