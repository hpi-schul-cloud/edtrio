import {editorWS} from "~/utils/socket"
import uuid from "uuid/v4"

export const createSection = (position) => async ({dispatch, state}) => {
	const tempId = uuid()
	const {lesson} = state
	dispatch({
		type: "ADD_SECTION",
		payload: {
			tempId,
			position
		},
	})

	const section = await editor.emit('create', `lesson/${lesson.id}/sections`, {position})

	dispatch({
		type: "REPLACE_ADDED_SECTION_ID",
		payload: {
			tempId,
			backendId: section._id,
		},
	})


}

export const removeSection = (sectionId) => async ({state}) => {
	const section = await editor.emit('delete', `lesson/${state.lesson.id}/sections/${sectionId}`)
	return section
}