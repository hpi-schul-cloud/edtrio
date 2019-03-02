import React, { useContext, useEffect } from "react"
import {
    createDocument,
    Editor as Edtr,
    EditorContext,
    serializeDocument,
    StateType,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/ui"
import { anchorPlugin } from "@edtr-io/plugin-anchor"
import { blockquotePlugin } from "@edtr-io/plugin-blockquote"
// import { highlightPlugin } from "@edtr-io/plugin-highlight"
// import { spoilerPlugin } from "@edtr-io/plugin-spoiler"
import { textPlugin } from "@edtr-io/plugin-text"

const counterState = StateType.number(0)

const counterPlugin = {
    // eslint-disable-next-line react/display-name
    Component: ({ focused, state }) => {
        return (
            <div>
                {state.value}
                <button
                    onClick={() => {
                        state.set(value => value - 1)
                    }}>
                    -
                </button>
                <button
                    onClick={() => {
                        state.set(value => value + 1)
                    }}>
                    +
                </button>
            </div>
        )
    },
    state: counterState,
}

const plugins = {
    rows: rowsPlugin,
    anchor: anchorPlugin,
    counter: counterPlugin,
    blockquote: blockquotePlugin,
    // highlight: highlightPlugin,
    // spoiler: spoilerPlugin,
    text: textPlugin,
}

class Editor extends React.Component {
    constructor(props) {
        super(props)
        this.editorState = createDocument(props.docValue || {})
    }

    render() {
        return (
            <div
                style={{
                    minHeight: "500px",
                }}>
                <Edtr
                    plugins={plugins}
                    defaultPlugin="counter"
                    state={this.editorState}>
                    <ChangeListener
                        state={this.editorState}
                        dispatchChange={this.props.dispatchChange}
                    />
                </Edtr>
            </div>
        )
    }
}

function ChangeListener({ state, dispatchChange }) {
    const store = useContext(EditorContext)
    useEffect(() => {
        const docValue = serializeDocument(store.state, state.id)
        dispatchChange(docValue)
    }, [store.state])
    return null
}

export default Editor
