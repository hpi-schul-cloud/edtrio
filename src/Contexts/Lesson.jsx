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
}

function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            return {
                ...state,
                editing: payload,
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
            return {
                ...state,
                loading: false,
                error: "",
                lesson: payload,
            }

        case "BOOTSTRAP_FINISH":
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "Gespeichert",
            }

        case "SAVE_STATUS":
            return {
                ...state,
                saveStatus: payload,
            }

        case "SWAP_SECTIONS":
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
                id: "new" + new Date().getTime(),
                notes: "",
                visible: true,
                docValue: null,
            }
            const newSections = []
            if (payload === -1) newSections.push(newSection)

            state.lesson.sections.forEach((section, index) => {
                newSections.push(section)
                if (index === payload) newSections.push(newSection)
            })

            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: newSections,
                },
            }

        case "SECTION_VISIBILITY":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id === payload)
                            return { ...section, visible: !section.visible }
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
                    sections: state.lesson.sections.map(section =>
                        section.id !== payload.sectionId
                            ? section
                            : { ...section, notes: payload.newValue },
                    ),
                },
            }

        case "SECTION_TITLE_CHANGE":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section =>
                        section.id !== payload.sectionId
                            ? section
                            : { ...section, title: payload.title },
                    ),
                },
            }

        case "LESSON_TITLE_CHANGE":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    title: payload,
                },
            }

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

export const LessonContext = React.createContext()

export default function LessonContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, initialState)

    const value = { store: state, dispatch }

    return (
        <LessonContext.Provider value={value}>
            {children}
        </LessonContext.Provider>
    )
}
