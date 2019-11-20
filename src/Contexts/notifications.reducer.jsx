
import { BOOTSTRAP, BOOTSTRAP_FINSIHED } from "./lesson.actions"

export const notificationInitialState = {
    loading: true,
    error: "",
    saveStatus: "",
}
export function notificationReducer(state = notificationInitialState, { type, payload }) {
    switch (type) {
        case "ERROR":
            return {
                ...state,
                error:
                    payload === undefined
                        ? "Ein Fehler ist aufgetreten..."
                        : payload,
            }

        case BOOTSTRAP:
            return {
                ...state,
                loading: true
            }

        case BOOTSTRAP_FINSIHED:
            return {
                ...state,
                loading: false
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
            return notificationInitialState

        default:
            return state
    }
}