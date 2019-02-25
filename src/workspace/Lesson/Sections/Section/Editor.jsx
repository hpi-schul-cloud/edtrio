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
            <div
                style={{
                    outline: focused ? "1px solid blue" : "none",
                }}>
                {state.value}
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

// const ChangeListener = state => {
//     console.log("state :", state)
//     const

//     return (
//         <EditorContext.Consumer>
//             {store => {}}
//         <EditorContext.Consumer>
//     )
// }

// function useInit(docValue) {
//     useEffect(() => {

//     }, )
// }

const Editor = ({ docValue }) => {
    const state = createDocument(docValue ? JSON.parse(docValue) : {})
    const { store: lessonStore } = useContext(LessonContext)

    return (
        <div
            style={{
                minHeight: "500px",
                backgroundColor: lessonStore.editing
                    ? "rgb(245, 245, 245)"
                    : "#fff",
                transition: "250ms background-color ease-in-out",
            }}>
            <Edtr plugins={plugins} defaultPlugin="counter" state={state}>
                <LogState state={state} />
                {/* <ChangeListener></ChangeListener> */}
            </Edtr>
        </div>
    )
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
