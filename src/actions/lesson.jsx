import { editor } from "~/utils/socket"
import { useContext } from 'react';
import { serverApi } from "~/utils/api"
import { useContext } from "react"
import LessonContext from "~/Contexts/Lesson"
import uuid from "uuid/v4"

const { store, dispatch } = useContext(LessonContext)

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
	const section = (courseId, lessonId) => await editor.emit('delete', `lesson/${lessonId}/sections`)
	return section
}

export const createFolder = async (name, owner, parent, permissions) => {
	const { lesson } = store;
	try {
		const folderId = await serverApi.post('/fileStorage/directories', {
			name,
			owner,
			parent,
			permissions,
		})

		try {
			await editor.emit('patch', `course/${lesson.courseId}/lessons/${lesson.id}`, {
				folderId
			});

			dispatch({
				type: LESSON_UPDATED,
				payload: { folderId },
			})

			return folderId;
		} catch (err) {
			// roleback
			await serverApi.delete(`/fileStorage/directories/${folderId}`)
			await editor.emit('patch', `course/${courseId}/lessons/${lessonId}`, {
				folderId: undefined
			});
			throw err
		}

	} catch (err){
		dispatch({
			type: 'ERROR',
			payload: 'Es ist ein fehler beim erstellen des Ordners aufgtretten'
		})
	}

}

export const renameFolder = async (folderId, name) => {
	try {
		await serverApi.post('/fileStorage/directories/rename', {
			id: folderId,
			newName: name,
		})
	} catch (err){
		throw new Error('Es ist ein Fehler beim Umbennen des Themen Ordners aufgetretten, möglichweise trägt diese noch den alten namen');
	}
}