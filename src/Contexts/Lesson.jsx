import React, { useReducer } from "react"

export const initialState = {
    loading: true,
    error: "",
    lesson: {},
    editing: false,
    bootstrapFinished: false,
    saveStatus: "",
    showSectionOverview: false,
    showNotes: false,
    isFullScreen: false,
}
function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            return {
                ...state,
                editing: payload,
            }

        case "FULL_SCREEN": {
            return { ...state, isFullScreen: payload }
        }

        case "TOGGLE_SECTION_OVERVIEW":
            return {
                ...state,
                showSectionOverview:
                    payload !== undefined
                        ? payload
                        : !state.showSectionOverview,
            }

        case "TOGGLE_NOTES":
            return {
                ...state,
                showNotes: payload !== undefined ? payload : !state.showNotes,
            }

        case "BOOTSTRAP":
            const newState = {
                ...state,
                loading: false,
                error: "",
                lesson: {
                    ...payload,
                    changed: new Set(),
                    sections: payload.sections.map(section => {
                        return { ...section, changed: new Set() }
                    }),
                },
            }

            return newState

        case "BOOTSTRAP_FINISH":
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "",
            }

        case "SAVE_STATUS":
            return {
                ...state,
                saveStatus: payload,
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

        case "SWAP_SECTIONS":
            state.lesson.changed.add("order")
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(
                        (section, index, sections) => {
                            if (index === payload[0])
                                return sections[payload[1]]
                            if (index === payload[1])
                                return sections[payload[0]]
                            return section
                        },
                    ),
                },
            }

        case "ADD_SECTION":
            const newSection = {
                title: "",
                id: payload.tempId,
                notes: "",
                visible: true,
                docValue: null,
                changed: new Set(),
            }
            const newSections = []
            if (payload.position === -1) newSections.push(newSection)

            state.lesson.sections.forEach((section, index) => {
                newSections.push(section)
                if (index === payload.position) newSections.push(newSection)
            })

            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: newSections,
                },
            }

        case "REPLACE_ADDED_SECTION_ID": {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id === payload.tempId) {
                            return { ...section, id: payload.backendId }
                        }
                        return section
                    }),
                },
            }
        }

        case "SECTION_VISIBILITY":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id === payload) {
                            section.changed.add("visible")
                            return { ...section, visible: !section.visible }
                        }
                        return section
                    }),
                },
            }

        case "PREPARE_DELETE_SECTION":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id === payload)
                            return { ...section, delete: true }
                        return section
                    }),
                },
            }

        case "DELETE_SECTION":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.filter(
                        section => section.id !== payload,
                    ),
                },
            }

        case "NOTES":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload.sectionId) return section

                        section.changed.add("notes")
                        return { ...section, notes: payload.newValue }
                    }),
                },
            }

        case "SECTION_TITLE_CHANGE":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload.sectionId) return section

                        section.changed.add("title")
                        return { ...section, title: payload.title }
                    }),
                },
            }

        case "SECTION_DOCVALUE_CHANGE":
            if (!state.editing) return state
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload.sectionId) return section
                        section.changed.add("docValue")
                        return {
                            ...section,
                            collectDocValue: payload.collectDocValue,
                        }
                    }),
                },
            }

        case "SECTION_SAVED":
            state.lesson.sections.forEach(section => {
                if (section.id === payload) section.changed.clear()
            })
            return state

        case "ERROR":
            return {
                ...state,
                error:
                    payload === undefined
                        ? "Ein Fehler ist aufgetreten..."
                        : payload,
            }

        case "LOADING":
            return {
                ...state,
                loading: !!payload,
            }

        case "RESET":
            return initialState

        default:
            return state
    }
}

const LessonContext = React.createContext()

export function LessonContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch }

    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}

export default LessonContext
