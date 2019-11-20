import {editorWS} from "~/utils/socket"
import uuid from "uuid/v4"

export const SET_SECTIONS = 'SET_SECTIONS'
export const ADD_SECTION = 'ADD_SECTION'
export const REPLACE_ADDED_SECTION_ID = "REPLACE_ADDED_SECTION_ID"


export const setSections = (sections) => ({
	type: SET_SECTIONS,
	payload: sections
})


/**
 * Creates a new Sections and persist it on the backend
 *
 * @param {int} position - positon of section
 */
export const addSection = (position) => async ({dispatch, state}) => {
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

	const section = await editorWS.emit('create', `lesson/${lesson.id}/sections`, {position})

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
export const removeSection = (sectionId) => async ({state}) => {
	// TODO: rewrite to remove sections via dispatch in the store
	const section = await editorWS.emit('delete', `lesson/${state.lesson.id}/sections/${sectionId}`)
	return section
}