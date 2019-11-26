import { mergeDiff } from "~/utils/diff"
import { SWITCH_SECTION_VISIBILTY, SET_SECTIONS , ADD_SECTION , REPLACE_ADDED_SECTION_ID , PREPARE_DELETE_SECTION , DELETE_SECTION , DELETING_SECTION_FAILED } from "./section.actions"





export const sectionInitialState = []
export function sectionReducer(state = sectionInitialState, { type, payload }) {
    switch (type) {
        case SET_SECTIONS:
            return payload.map((section) => ({
                ...section,
                changed: new Set()
            }))

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
                section._id === payload.tempId
                ? {...section, id: payload.backendId}
                : section
            )
        }

        case SWITCH_SECTION_VISIBILTY:
            return state.map(section => {
                if (section._id === payload) {
                    section.changed.add("visible")
                    return { ...section, visible: !section.visible }
                }
                return section
            })

        case PREPARE_DELETE_SECTION:
            return state.map(section => {
                    if (section._id === payload)
                        return { ...section, delete: true }
                    return section
                })

        case DELETE_SECTION:
            return state.filter(
                section => section._id !== payload,
            )

        case DELETING_SECTION_FAILED:
            return state.map(section => {
                if (section._id === payload){
                    return { ...section, delete: false}
                }
            })


        case "SECTION_TITLE_CHANGE":
            return [
                ...state.map(section => {
                    if (section._id !== payload.sectionId) return section

                    section.changed.add("title")
                    return { ...section, title: payload.title }
                }),
            ]

        case "SECTION_DOCVALUE_DIFF":
            return [
                ...state.map(section => {
                    if (section._id !== payload.sectionId) return section
                        return {
                            ...section,
                            docValue: mergeDiff(section.docValue, payload.diff)
                        }
                    }),
            ]

        case "SECTION_DOCVALUE_CHANGE":
                if (!state.view.editing) return state
                return state.section.map(section => {
                    if(section._id !== payload.sectionId) return section
                    section.changed.add("docValue")
                    return {
                        ...section,
                        docValue: payload.docValue
                    }
                })

        case "SECTION_SAVED":
            state.forEach(section => {
                if (section._id === payload) section.changed.clear()
            })
            return state.map(section => {
                if (section._id !== payload) return section
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
