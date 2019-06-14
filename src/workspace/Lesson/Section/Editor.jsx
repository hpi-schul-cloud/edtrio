import React, { useContext, useEffect } from "react"
import {
    createDocument,
    Editor as Edtr,
    EditorContext,
    serializeDocument,
    StateType,
} from "@edtr-io/core"
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
                }}>
                <Edtr
                    theme={editorTheme}
                    plugins={plugins}
                    defaultPlugin={"text"}
                    editable={this.props.editing}
                    omitDragDropContext
                    initialState={this.docValue}>
                    <ChangeListener
                        dispatchChange={this.props.dispatchChange}
                    />
                </Edtr>
            </div>
        )
    }
}

function ChangeListener({ dispatchChange }) {
    const store = useContext(EditorContext)
    useEffect(() => {
        dispatchChange(serializeDocument(store.state))
    }, [store.state])
    return null
}
