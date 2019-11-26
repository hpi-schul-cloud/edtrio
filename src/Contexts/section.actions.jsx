import {editorWS} from "~/utils/socket"
import uuid from "uuid/v4"

export const SET_SECTIONS = 'SET_SECTIONS'
export const ADD_SECTION = 'ADD_SECTION'
export const REPLACE_ADDED_SECTION_ID = "REPLACE_ADDED_SECTION_ID"
export const SWITCH_SECTION_VISIBILTY = 'SWITCH_SECTION_VISIBILTY'
export const PREPARE_DELETE_SECTION = 'PREPARE_DELETE_SECTION'
export const DELETE_SECTION = 'DELETE_SECTION'
export const DELETING_SECTION_FAILED = 'DELETING_SECTION_FAILED'

export const switchSectionVisibility = (sectionId) => ({state}) => ({
	type: SWITCH_SECTION_VISIBILTY,
	payload: sectionId
})

export const setSections = (sections) => ({
	type: SET_SECTIONS,
	payload: sections
})


/**
 * Creates a new Sections and persist it on the backend
 *
 * @param {int} position - positon of section
 */
export const createSection = (position) => async ({dispatch, state}) => {
	const tempId = uuid()
	const {lesson} = state
	position = position || state.sections.length
	dispatch({
		type: ADD_SECTION,
		payload: {
			tempId,
			position
		},
	})

	const section = await editorWS.emit('create', `lesson/${lesson._id}/sections`, {position})

	dispatch({
		type: REPLACE_ADDED_SECTION_ID,
		payload: {
			tempId,
			backendId: section._id,
		},
	})


}

/**
 * Removes a section from lesson. Lesson will be soft deleted from backend
 *
 * @param {string} sectionId - MongoId of Section
 */
export const removeSection = (sectionId) => async ({state, dispatch}) => {
	dispatch({
		type: PREPARE_DELETE_SECTION,
		payload: sectionId,
	})
	try{

		const section = await editorWS.emit('delete', `lesson/${state.lesson._id}/sections/${sectionId}`)

		dispatch({
			type: DELETE_SECTION,
			payload: sectionId,
		})
	} catch (err){
		// TODO: check if connection to sever exist
		dispatch({
			type: DELETING_SECTION_FAILED,
			payload: sectionId
		})
	}
}