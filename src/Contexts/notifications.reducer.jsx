
import { SAVING_LESSON , LESSON_SAVED } from "./lesson.actions"
import { DELETING_SECTION_FAILED } from "./section.actions"
import { SAVE_STATUS, ADD_SECTION_STATE_CONFLICT, SECTION_STATE_CONFLICTS_RESOLVED } from "./notifications.actions"



export const notificationInitialState = {
	error: "",
	saveStatus: "",
	isSaving: 0,
	sectionStateConflicts: []
}

/**
 * Notifications state contains all notifications visible to the user, like errors and saveState
 * 
 * @param {*} state - state of lesson
 * @param {Object} param1 - object with the parameters type and payload
 */
export function notificationReducer(state = notificationInitialState, { type, payload, ...data }) {
	switch (type) {
	case "ERROR":
		return {
			...state,
			error:
                    data.message === undefined
                    	? "Ein Fehler ist aufgetreten..."
                    	: data.message,
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

	case ADD_SECTION_STATE_CONFLICT:
		return {
			...state,
			sectionStateConflicts: [
				...state.sectionStateConflicts,
				data
			]
		}

	case SECTION_STATE_CONFLICTS_RESOLVED:
		return {
			...state,
			sectionStateConflicts: []
		}

	case "RESET":
		return notificationInitialState
	default:
		return state
	}
}