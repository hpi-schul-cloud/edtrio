import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"

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
        case "SET_EDITING":
            // switch between editing and view mode
            if (state.studentView) return state
            return {
                ...state,
                editing: payload,
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

        case "RESET":
            return viewInitialState

        default:
            return state
    }
}
