import React, { useContext, useEffect } from "react"
import {
    createDocument,
    DocumentIdentifier,
    Editor as Edtr,
    EditorContext,
    Plugin,
    serializeDocument,
    StatefulPlugin,
    StateType,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/ui"

import { LessonContext } from "~/contexts/Lesson"

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
    counter: counterPlugin,
    rows: rowsPlugin,
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
                    <LogState state={this.editorState} />
                </Edtr>
            </div>
        )
    }
}

export function LogState({ state }) {
    const store = useContext(EditorContext)

    return (
        <button
            onClick={() => {
                const serialized = serializeDocument(store.state, state.id)
                // eslint-disable-next-line no-console
                console.log(serialized)
            }}>
            Log State
        </button>
    )
}

export default Editor
