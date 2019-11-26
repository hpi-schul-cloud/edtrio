
import { BOOTSTRAP, BOOTSTRAP_FINSIHED , SAVING_LESSON , LESSON_SAVED } from "./lesson.actions"
import { DELETING_SECTION_FAILED } from "./section.actions"



export const notificationInitialState = {
    loading: true,
    error: "",
    saveStatus: "",
    isSaving: 0,
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
        case DELETING_SECTION_FAILED:
            return {
                ...state,
                error: 'Beim Löschen einer Section ist ein Fehler aufgetretten'
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

        case SAVING_LESSON:
            return {
                ...state,
                isSaving: state.isSaving + 1,
                saveStatus: 'Speichert...'
            }

        case LESSON_SAVED:
            if(state.isSaving > 1){
                return {
                    ...state,
                    isSaving: state.isSaving - 1
                }
            } else {
                return {
                    ...state,
                    isSaving: 0,
                    saveStatus: 'Gepspeichert'
                }
            }

        case "RESET":
            return notificationInitialState
        default:
            return state
    }
}