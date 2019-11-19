import React, { useReducer } from "react"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"
import { combineReducers } from "redux"
import { sectionReducer } from "./section.reducer"
import { viewReducer } from "./view.reducer"
import { notificationReducer } from "./notifications.reducer"
import { courseReducer } from "./course.reducer"
import { lessonReducer } from './lesson.reducer'


const combinedReducer = combineReducers({
    lesson: lessonReducer,
    sections: sectionReducer,
    view: viewReducer,
    notifications: notificationReducer,
    course: courseReducer
})

const LessonContext = React.createContext()

export function LessonContextProvider({ children}) {
    const [state, dispatch] = useReducer(combinedReducer)

    const value = { store: state, dispatch: createDispatch(dispatch, state, thunkMiddleware()) }

    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}

export default LessonContext
