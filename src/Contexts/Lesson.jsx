import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"
import { combineReducers } from "redux"
import { sectionReducer } from "./Sections"
import { viewReducer } from "./View"
import { notificationReducer } from "./Notifications"


export const initialState = {
    loading: true,
    error: "",
    lesson: {},
    course: {},
    studentView: !!q.student_view,

    bootstrapFinished: false,
    sectionOverviewExpanded: false,
    showSectionSettings: false,
}
function reducer(state = lessonReducer, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            // switch between editing and view mode
            if (state.studentView) return state
            return {
                ...state,
                editing: payload,
            }

        case "SET_COURSE":
            return {
                ...state,
                course: payload,
            }

        case "TOGGLE_SECTION_OVERVIEW":
            return {
                ...state,
                sectionOverviewExpanded:
                    payload !== undefined
                        ? payload
                        : !state.sectionOverviewExpanded,
            }

        case "TOGGLE_SECTION_SETTINGS":
            return {
                ...state,
                showSectionSettings:
                    payload !== undefined
                        ? payload
                        : !state.showSectionSettings,
            }

        case "BOOTSTRAP": {
            const newState = {
                ...state,
                loading: false,
                error: "",
                lesson: {
                    ...payload,
                    changed: new Set(),
                    sections: payload.sections.map(section => {
                        const sectionData = { ...section, changed: new Set() }
                        if (section.new) {
                            sectionData.new = undefined
                            sectionData.changed.add("")
                        }
                        return sectionData
                    }),
                },
                activeSectionId: payload.sections[0].id,
            }

            return newState
        }
        case "BOOTSTRAP_FINISH":
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "",
            }

        case "SET_ACTIVE_SECTION":
            return {
                ...state,
                activeSectionId: payload.id,
                saveStatus: "",
            }

        case "LESSON_UPDATED":
            return {
                ...state,
                saveStatus: "Aktuallisiert",
                lesson: {
                    ...state.lesson,
                    ...payload,
                }
            }
        case "LESSON_TITLE_CHANGE":
            state.lesson.changed.add("title")
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    title: payload,
                },
            }

        case "LESSON_SAVED":
            state.lesson.changed.clear()
            return state


        case "RESET":
            return initialState

        default:
            return state
    }
}

const lessonReducer = combineReducers({
    lesson: reducer,
    sections: sectionReducer,
    view: viewReducer,
    notifications: notificationReducer
})

const LessonContext = React.createContext()

export function LessonContextProvider({ children}) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch: createDispatch(dispatch, state, thunkMiddleware()) }

    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}

export default LessonContext
