import React from "react"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"

import { isTouchDevice } from "~/utils/device"

import { LessonContextProvider } from "./Lesson"
import { UserContextProvider } from "./User"
import { SectionsContextProvider } from './Sections'
import { NoficatonsContextProvider , NotificationsContextProvider } from './Notifications'
import { ViewContextProvider } from './View'


const Contexts = ({ children }) => {
    return (
        <DndProvider
            backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
            <ViewContextProvider>
                <UserContextProvider>
                    <LessonContextProvider>
                        <SectionsContextProvider>
                            {children}
                        </SectionsContextProvider>
                    </LessonContextProvider>
                </UserContextProvider>
            </ViewContextProvider>
        </DndProvider>
    )
}

export default Contexts
