import React from "react"
import { DragDropContextProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"

import { ThemeContextProvider } from "./Theme"
import { LessonContextProvider } from "./Lesson"
import { UserContextProvider } from "./User"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <DragDropContextProvider backend={HTML5Backend}>
                <UserContextProvider>
                    <LessonContextProvider>{children}</LessonContextProvider>
                </UserContextProvider>
            </DragDropContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
