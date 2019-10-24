import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"

const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const initialState = {
    loading: true,
    error: "",
    lesson: {},
    course: {},
    studentView: !!q.student_view,
    editing: !q.student_view,
    activeSectionId: "",
    bootstrapFinished: false,
    saveStatus: "",
    sectionOverviewExpanded: false,
    showSectionSettings: false,
}
function reducer(state, { type, payload }) {
    
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

        case "BOOTSTRAP":
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

        case "SAVE_STATUS":
            return {
                ...state,
                saveStatus: payload,
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
                visible: true,
                docValue: {},
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
                activeSectionId: payload.tempId,
                lesson: {
                    ...state.lesson,
                    sections: newSections,
                },
            }

        case "REPLACE_ADDED_SECTION_ID": {
            return {
                ...state,
                activeSectionId:
                    state.activeSectionId === payload.tempId
                        ? payload.backendId
                        : state.activeSectionId,
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
            let activeSectionId = state.activeSectionId
            if (activeSectionId === payload) {
                const deleteIndex = state.lesson.sections.findIndex(
                    el => el.id === payload,
                )
                const newIndex =
                    deleteIndex === 0 ? deleteIndex + 1 : deleteIndex - 1
                activeSectionId = state.lesson.sections[newIndex].id
            }

            return {
                ...state,
                activeSectionId,
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

        case "SECTION_DOCVALUE_DIFF":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload.sectionId) return section
                        return {
                            ...section,
                            docValue: mergeDiff(section.docValue, payload.diff)
                        }
                    }),
                }
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
                            docValue: payload.docValue,
                        }
                    }),
                },
            }
/*
        case "SECTION_SAVED_DOCVALUE":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload) return section
                        return {
                            ...section,
                            savedDocValue: section.docValue,
                        }
                    }),
                },
            }

        case "SECTION_SAVE_DOCVALUE_FAILED":
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload.id) return section
                        return {
                            ...section,
                            savedDocValue: payload.lastSavedDocValue,
                        }
                    }),
                },
            }
*/
        case "SECTION_SAVED":
            state.lesson.sections.forEach(section => {
                if (section.id === payload) section.changed.clear()
            })
            return {
                ...state,
                lesson: {
                    ...state.lesson,
                    sections: state.lesson.sections.map(section => {
                        if (section.id !== payload) return section
                        return {
                            ...section,
                            savedDocValue: section.docValue,
                        }
                    }),
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
