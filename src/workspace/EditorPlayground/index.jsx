import * as React from "react"
import {
    createDocument,
    DocumentIdentifier,
    Editor,
    EditorContext,
    Plugin,
    serializeDocument,
    StatefulPlugin,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/ui"

const counterPlugin = {
    // eslint-disable-next-line react/display-name
    Component: ({ focused, onChange, state }) => {
        return (
            <div
                style={{
                    outline: focused ? "1px solid blue" : "none",
                }}>
                {state.value}
                <button
                    onClick={() => {
                        onChange({ value: state.value + 1 })
                    }}>
                    +
                </button>
            </div>
        )
    },
    createInitialState: () => {
        return { value: 0 }
    },
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const plugins = {
    counter: counterPlugin,
    rows: rowsPlugin,
    stateless: {
        Component: () => null,
    },
    stateful: {
        Component: () => null,
        createInitialState: () => {
            return { counter: 0 }
        },
    },
}

const EditorPlayground = () => {
    const state = createDocument({
        plugin: "counter",
    })

    return (
        <Editor plugins={plugins} defaultPlugin="counter" state={state}>
            {/* <LogState state={state} /> */}
        </Editor>
    )
}

export default EditorPlayground

function LogState({ state }) {
    return (
        <EditorContext.Consumer>
            {store => {
                return (
                    <button
                        onClick={() => {
                            const serialized = serializeDocument(
                                store.state,
                                state.id,
                            )
                            const stringified = JSON.stringify({
                                state: JSON.stringify(serialized),
                            })
                            // eslint-disable-next-line no-console
                            console.log(
                                stringified.substr(
                                    9,
                                    stringified.length - 9 - 1,
                                ),
                            )
                        }}>
                        Log State
                    </button>
                )
            }}
        </EditorContext.Consumer>
    )
}
