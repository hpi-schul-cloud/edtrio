import React from "react"
import { DndProvider } from "react-dnd"
import HTML5Backend from "react-dnd-html5-backend"
import TouchBackend from "react-dnd-touch-backend"

import { isTouchDevice } from "~/utils/device"

import { LessonContextProvider } from "./Lesson.context"
import { UserContextProvider } from "./User"


const Contexts = ({ children }) => {
	return (
		<DndProvider
			backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
			<UserContextProvider>
				<LessonContextProvider>{children}</LessonContextProvider>
			</UserContextProvider>
		</DndProvider>
	)
}

export default Contexts
