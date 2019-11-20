import React, { useReducer, useEffect } from "react"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"
import { combineReducers } from "redux"
import { sectionReducer , sectionInitialState } from "./section.reducer"
import { viewReducer , viewInitialState } from "./view.reducer"
import { notificationReducer , notificationInitialState } from "./notifications.reducer"
import { courseReducer , courseInitialState } from "./course.reducer"
import { lessonReducer , lessonInitialState } from './lesson.reducer'







const combinedReducer = combineReducers({
    lesson: lessonReducer,
    sections: sectionReducer,
    view: viewReducer,
    notifications: notificationReducer,
    course: courseReducer
})

const combinedInitalState = {
    lesson: lessonInitialState,
    sections: sectionInitialState,
    view: viewInitialState,
    notifications: notificationInitialState,
    course: courseInitialState
}


const LessonContext = React.createContext()

export function LessonContextProvider({ children}) {
    const [state, dispatch] = useReducer(combinedReducer, combinedInitalState)
    // needed for initial of all default states, should not match any case
    const value = { store: state, dispatch: createDispatch(dispatch, state, thunkMiddleware()) }
    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}

export default LessonContext
