import { EditorProvider } from "@edtr-io/core"
import React from "react"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"

import { isTouchDevice } from "~/utils/device"

import { LessonContextProvider } from "./Lesson"
import { UserContextProvider } from "./User"

const Contexts = ({ children }) => {
    return (
        <DragDropContextProvider
            backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <UserContextProvider>
                <LessonContextProvider>
                    <EditorProvider omitDragDropContext>
                        {children}
                    </EditorProvider>
                </LessonContextProvider>
            </UserContextProvider>
        </DragDropContextProvider>
    )
}

export default Contexts
