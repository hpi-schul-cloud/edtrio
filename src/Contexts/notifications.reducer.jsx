
import { SAVING_LESSON , LESSON_SAVED } from "./lesson.actions"
import { DELETING_SECTION_FAILED } from "./section.actions"
import { SAVE_STATUS } from "./notifications.actions"



export const notificationInitialState = {
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

		case SAVE_STATUS:
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