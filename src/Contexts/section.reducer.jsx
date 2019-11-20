import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"
import { SET_SECTIONS , ADD_SECTION , REPLACE_ADDED_SECTION_ID } from "./section.actions"



const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const sectionInitialState = []
export function sectionReducer(state = sectionInitialState, { type, payload }) {
    switch (type) {

        case SET_SECTIONS:
            return payload

        case "SET_ACTIVE_SECTION":
            return {
                ...state,
                activeSectionId: payload.id,
                saveStatus: "",
            }


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

        case ADD_SECTION:
            /* const newSection = {
                title: "",
                id: payload.tempId,
                visible: true,
                docValue: {},
                changed: new Set(),
            }
            const newSections = []
            if (payload.position === -1) newSections.push(newSection)

            state.sections.forEach((section, index) => {
                newSections.push(section)
                if (index === payload.position) newSections.push(newSection)
            }) */

            return {
                ...state.splice(payload, 0, {
                    title: "",
                    id: payload.tempId,
                    visible: true,
                    docValue: {},
                    changed: new Set(),
                })
            }

        case REPLACE_ADDED_SECTION_ID: {
            return state.sections.map(section =>
                section.id === payload.tempId
                ? {...section, id: payload.backendId}
                : section
            )
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

        case "RESET":
            return sectionInitialState

        default:
            return state
    }
}
