import React, { useReducer } from "react"

export const initialState = {
    loading: true,
    error: "",
    lesson: {},
    editing: false,
    bootstrapFinished: false,
    saveStatus: "",
}

function reducer(state, { type, payload }) {
    switch (type) {
        case "SET_EDITING":
            return {
                ...state,
                editing: payload,
            }

        case "BOOTSTRAP": {
            return {
                ...state,
                loading: false,
                error: "",
                lesson: payload,
            }
        }
        case "BOOTSTRAP_FINISH": {
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "Gespeichert",
            }
        }
        case "SAVE_STATUS": {
            return {
                ...state,
                saveStatus: payload,
            }
        }
        case "SWAP_SECTIONS": {
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
        }
        case "ADD_SECTION": {
            const newSection = {
                title: "",
                id: "new" + new Date().getTime(),
                notes: "",
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
        }
        case "NOTES": {
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
        }
        case "SECTION_TITLE_CHANGE": {
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
        }
        case "LESSON_TITLE_CHANGE": {
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    title: payload,
                },
            }
        }
        case "ERROR": {
            return {
                ...state,
                error:
                    payload === undefined
                        ? "Ein Fehler ist aufgetreten..."
                        : payload,
            }
        }
        case "LOADING": {
            return {
                ...state,
                loading: !!payload,
            }
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
