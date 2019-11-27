import qs from "qs"

import { ADD_SECTION , REPLACE_ADDED_SECTION_ID , SET_SECTIONS , PREPARE_DELETE_SECTION } from "./section.actions"
import { TOGGLE_SECTION_SETTINGS, TOGGLE_SECTION_OVERVIEW, SET_ACTIVE_SECTION , SET_EDITING , SET_LOADING } from "./view.actions"



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

        case SET_LOADING:
            return {
                ...state,
                loading: payload
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

        case PREPARE_DELETE_SECTION:
            // TODO: move part to view
            let activeSectionId = state.activeSectionId
            if (activeSectionId === payload) {
                const deleteIndex = state.findIndex(
                    el => el._id === payload,
                )
                const newIndex =
                    deleteIndex === 0 ? deleteIndex + 1 : deleteIndex - 1
                activeSectionId = state[newIndex]._id
            }

            return {
                ...state,
                activeSectionId
            }

        case "RESET":
            return viewInitialState

        default:
            return state
    }
}
