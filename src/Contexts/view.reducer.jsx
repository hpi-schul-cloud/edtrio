import qs from "qs"

import { ADD_SECTION , REPLACE_ADDED_SECTION_ID , SET_SECTIONS } from "./section.actions"
import { TOGGLE_SECTION_SETTINGS, TOGGLE_SECTION_OVERVIEW, SET_ACTIVE_SECTION , SET_EDITING } from "./view.actions"

const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const viewInitialState = {
    loading: true,
    studentView: !!q.student_view,
    editing: !q.student_view,
    bootstrapFinished: false,
    sectionOverviewExpanded: false,
    showSectionSettings: false,
}
export function viewReducer(state = viewInitialState, { type, payload }) {
    switch (type) {
        case SET_EDITING:
            // switch between editing and view mode
            if (state.studentView) return state
            return {
                ...state,
                editing: payload,
            }

        case SET_SECTIONS:
            return {
                ...state,
                activeSectionId: payload[0]._id
            }
        case ADD_SECTION:
            return {
                ...state,
                activeSectionId: payload.tempId
            }

        case REPLACE_ADDED_SECTION_ID:
            return payload.tempId === state.activeSectionId
            ? { ...state, activeSectionId: payload.backendId }
            : state

        case TOGGLE_SECTION_OVERVIEW:
            return {
                ...state,
                sectionOverviewExpanded: payload
            }

        case TOGGLE_SECTION_SETTINGS:
            return {
                ...state,
                showSectionSettings: payload
            }


        case "BOOTSTRAP_FINISH":
            return {
                ...state,
                bootstrapFinished: true,
                saveStatus: "",
            }

        case SET_ACTIVE_SECTION:
            return {
                ...state,
                activeSectionId: payload,
            }

        case "RESET":
            return viewInitialState

        default:
            return state
    }
}
