import {editor} from "~/utils/socket"
import { useContext } from "react"
import LessonContext from "~/Contexts/Lesson"
import uuid from "uuid/v4"

export const createSection = (dispatch) => async (lessonId, position) => {
	const tempId = uuid()
	dispatch({
		type: "ADD_SECTION",
		payload: {
			tempId,
			position
		},
	})

	const section = await editor.emit('create', `lesson/${lessonId}/sections`, {})

	dispatch({
		type: "REPLACE_ADDED_SECTION_ID",
		payload: {
			tempId,
			backendId: section._id,
		},
	})


}

export const removeSection = async (lessonId, sectionId) => {
	const section = await editor.emit('delete', `lesson/${lessonId}/sections`)
	return section
}