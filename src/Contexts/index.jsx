import React from "react"
import { ThemeContextProvider } from "./Theme"
import { LessonContextProvider } from "./Lesson"
import { UserContextProvider } from "./User"
import { GroupsContextProvider } from "./Groups"

const Contexts = ({ children }) => {
    return (
        <ThemeContextProvider>
            <UserContextProvider>
                <LessonContextProvider>
                    <GroupsContextProvider>{children}</GroupsContextProvider>
                </LessonContextProvider>
            </UserContextProvider>
        </ThemeContextProvider>
    )
}

export default Contexts
