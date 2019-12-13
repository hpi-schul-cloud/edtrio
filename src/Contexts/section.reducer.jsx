import { mergeDiff } from "~/utils/diff"
import { SWITCH_SECTION_VISIBILTY, SET_SECTIONS , ADD_SECTION , REPLACE_ADDED_SECTION_ID , PREPARE_DELETE_SECTION , DELETE_SECTION , DELETING_SECTION_FAILED , UPDATE_SECTION , SECTION_DOCVALUE_CHANGE , SECTION_SAVED , DOCVALUE_SAVED } from "./section.actions"

export const sectionInitialState = []

/**
 * Most important part for the Edtior, handles all Section data and the Editor state itself
 * State is an Array of sections
 * 
 * @param {*} state - state of lesson
 * @param {Object} param1 - object with the parameters type and payload
 */
export function sectionReducer(state = sectionInitialState, { type, payload }) {
	switch (type) {
	case SET_SECTIONS:
		return payload.map((section) => ({
			...section,
			changed: new Set()
		}))

	case ADD_SECTION:
		return [...state].splice(payload.position, 0, payload)

	case REPLACE_ADDED_SECTION_ID: {
		return state.map(section =>
			section._id === payload.tempId
				? {...section, _id: payload.backendId}
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

	case UPDATE_SECTION:
		return state.map(section => {
			if(section._id === payload._id){
				// section.changed.add(Object.keys(payload))
				return {...section, ...payload}
			}
			return section
		})

		/* case "SECTION_TITLE_CHANGE":
            return state.map(section => {
                    if (section._id !== payload.sectionId) return section

                    section.changed.add("title")
                    return { ...section, title: payload.title }
                }) */
        
	case SECTION_DOCVALUE_CHANGE:
		return state.map(section => {
			if(section._id !== payload._id) return section
			section.changed.add("docValue")
			return {
				...section,
				docValue: payload.docValue
			}
		})

	case SECTION_SAVED:
		return state.map(section => {
			if (section._id === payload){
				section = {
					...section,
					savedDocValue: section.docValue
				}
				section.changed.clear()
			}
			return section
		})

	case "RESET":
		return sectionInitialState

	default:
		return state
	}
}
