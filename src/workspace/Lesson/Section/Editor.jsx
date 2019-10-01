import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import {
    Editor as Edtr,
    EditorContext,
    useScopedSelector,
    getPendingChanges,
} from "@edtr-io/core"

import { serializeRootDocument } from "@edtr-io/store"

import { CustomTheme, ThemeProvider } from "@edtr-io/ui"

import theme from "~/theme"
import plugins from "./plugins"
export { default as plugins } from "./plugins"

export const EditorWrapper = styled.div`
    min-height: 50px;
    font-size: 20px;
    line-height: 1.4;

    @media (max-width: 991px) {
        font-size: 18px;
    }

    @media (max-width: 768px) {
        font-size: 18px;
    }

    @media (max-width: 575px) {
        font-size: 16px;
    }
`

export const editorTheme = {
    editor: {
        primary: {
            background: theme.colors.primary,
        },
    },
    plugins: {
        rows: {
            menu: {
                highlightColor: theme.colors.primary,
                dropzone: {
                    highlightColor: theme.colors.primary,
                },
            },
        },
        text: {
            hoverColor: "#B6B6B6",
        },
    },
}

export default class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.docValue =
            this.props.docValue && Object.keys(this.props.docValue).length
                ? this.props.docValue
                : {
                      plugin: "rows",
                  }

        this.onChange = this.onChange.bind(this)
    }

    onChange({changed, getDocument}){
        this.props.dispatchChange(getDocument())
    }

    render() {
        return (
            <EditorWrapper>
                <Edtr
                    theme={editorTheme}
                    plugins={plugins}
                    defaultPlugin={"text"}
                    editable={this.props.editing}
                    omitDragDropContext
                    initialState={this.docValue}
                    onChange={this.onChange}>
                </Edtr>
            </EditorWrapper>
        )
    }
}
