import React, { useContext, useEffect } from "react"
import styled from "styled-components"
import {
    createDocument,
    Editor as Edtr,
    EditorContext,
    selectors,
    StateType,
} from "@edtr-io/core"
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
                    initialState={this.docValue}>
                    <ChangeListener
                        dispatchChange={this.props.dispatchChange}
                    />
                </Edtr>
            </EditorWrapper>
        )
    }
}

function ChangeListener({ dispatchChange }) {
    const store = useContext(EditorContext)
    useEffect(() => {
        dispatchChange(selectors.serializeDocument(store.state))
    }, [store.state])
    return null
}
