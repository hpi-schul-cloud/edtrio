import React, { useContext, useEffect } from "react"
import * as core from "@edtr-io/core"
import { CustomTheme, ThemeProvider } from "@edtr-io/ui"

import theme from "~/theme"
import plugins from "./plugins"
export { default as plugins } from "./plugins"

export const editorTheme = {
    editor: {
        primary: {
            background: theme.primaryColor,
        },
    },
    plugins: {
        rows: {
            menu: {
                highlightColor: theme.primaryColor,
                dropzone: {
                    highlightColor: theme.primaryColor,
                },
            },
        },
        text: {},
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
    }

    render() {
        return (
            <div
                style={{
                    minHeight: "50px",
                    fontSize: "20px",
                    lineHeight: 1.42,
                    display: this.props.visible ? "block" : "none",
                }}>
                <core.Document
                    onChange={this.props.dispatchChange}
                    scope={this.props.id}
                    theme={editorTheme}
                    plugins={plugins}
                    defaultPlugin={"text"}
                    editable={this.props.editing}
                    initialState={this.docValue}
                />
            </div>
        )
    }
}

// function ChangeListener({ dispatchChange }) {
//     const { store, dispatch } = useContext(core.EditorContext)
//     const editorState = store.getState()
//     useEffect(() => {
//         dispatchChange(core.selectors.serializeRootDocument(editorState))
//     }, [editorState])
//     return null
// }
