import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"
import { SET_SECTIONS , ADD_SECTION , REPLACE_ADDED_SECTION_ID } from "./section.actions"



const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const sectionInitialState = []
export function sectionReducer(state = sectionInitialState, { type, payload }) {
    console.log(state)
    switch (type) {
        case SET_SECTIONS:
            return payload.map((section) => ({
                ...section,
                changed: new Set()
            }))

        case "SWAP_SECTIONS":
            return state.map(
                (section, index, sections) => {
                    if (index === payload[0]){
                        section.changed.add('order')
                        return sections[payload[1]]
                    }
                    if (index === payload[1]){
                        section.changed.add('order')
                        return sections[payload[0]]
                    }
                    return section
                },
            )

        case ADD_SECTION:
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
            return state.map(section =>
                section.id === payload.tempId
                ? {...section, id: payload.backendId}
                : section
            )
        }

        case "SECTION_VISIBILITY":
            return state.map(section => {
                if (section.id === payload) {
                    section.changed.add("visible")
                    return { ...section, visible: !section.visible }
                }
                return section
            })

        case "PREPARE_DELETE_SECTION":
            let activeSectionId = state.view.activeSectionId
            if (activeSectionId === payload) {
                const deleteIndex = state.findIndex(
                    el => el.id === payload,
                )
                const newIndex =
                    deleteIndex === 0 ? deleteIndex + 1 : deleteIndex - 1
                activeSectionId = state[newIndex].id
            }

            return [
                ...state.map(section => {
                    if (section.id === payload)
                        return { ...section, delete: true }
                    return section
                }),
            ]

        case "DELETE_SECTION":
            return state.filter(
                section => section.id !== payload,
            )

        case "SECTION_TITLE_CHANGE":
            return [
                ...state.map(section => {
                    if (section.id !== payload.sectionId) return section

                    section.changed.add("title")
                    return { ...section, title: payload.title }
                }),
            ]

        case "SECTION_DOCVALUE_DIFF":
            return [
                ...state.map(section => {
                    if (section.id !== payload.sectionId) return section
                        return {
                            ...section,
                            docValue: mergeDiff(section.docValue, payload.diff)
                        }
                    }),
            ]

        case "SECTION_DOCVALUE_CHANGE":
                if (!state.editing) return state
                return state.section.map(section => {
                    if(section.id !== payload.sectionId) return section
                    section.changed.add("docValue")
                    return {
                        ...section,
                        docValue: payload.docValue
                    }
                })

        case "SECTION_SAVED":
            state.forEach(section => {
                if (section.id === payload) section.changed.clear()
            })
            return state.map(section => {
                if (section.id !== payload) return section
                return {
                    ...section,
                    savedDocValue: section.docValue,
                }
            })

        case "RESET":
            return sectionInitialState

        default:
            return state
    }
}
