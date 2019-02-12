import * as React from "react"

import {
    createDocumentIdentifier,
    Document,
    EditorProvider,
    Plugin,
    StatefulPlugin,
} from "@edtr-io/core"
import { rowsPlugin } from "@edtr-io/ui"

import Container from "~/components/Container"
import Heading from "~/components/Heading"
import Action from "~/components/Action"

const counterPlugin = {
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
    const state = createDocumentIdentifier({
        plugin: "counter",
    })

    return (
        <Container>
            <Heading>Sample Editor</Heading>
            <Container small>
                <EditorProvider plugins={plugins} defaultPlugin="stateless">
                    <Document state={state} />
                </EditorProvider>
            </Container>
            <Action to="/">Go back to dashboard</Action>
        </Container>
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
