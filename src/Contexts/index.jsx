import React from "react"
import { ThemeContextProvider } from "./Theme"
import { LessonContextProvider } from "./Lesson"
import { UserContextProvider } from "./User"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <UserContextProvider>
                <LessonContextProvider>{children}</LessonContextProvider>
            </UserContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
