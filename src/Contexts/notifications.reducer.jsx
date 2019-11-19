import React, { useReducer } from "react"
import qs from "qs"
import { mergeDiff } from "~/utils/diff"
import { createDispatch, thunkMiddleware } from "~/utils/dispatch"

const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

export const initialState = {
    loading: true,
    error: "",
    saveStatus: "",
}
export function notificationReducer(state = initialState, { type, payload }) {
    switch (type) {
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

		case "SAVE_STATUS":
			return {
				...state,
				saveStatus: payload,
			}

        case "RESET":
            return initialState

        default:
            return state
    }
}