import { useEffect, useState } from "react"
import { fetchCourse } from "~/Contexts/course.actions"
import { fetchLessonWithSections, lessonWasUpdated, saveLesson, setLesson , fetchLesson } from "~/Contexts/lesson.actions"
import { unsavedChanges , newError } from '~/Contexts/notifications.actions'
import { saveSections, sectionWasUpdated, setSections, fetchSection , mergeEditorDiff } from '~/Contexts/section.actions'
import { serverApi } from "~/utils/api"
import { loadLessonCache, loadSectionCache } from "~/utils/cache"
import { editorWS } from "~/utils/socket"


export function useBootstrap(id, courseId, dispatch, dispatchUserAction) {
	async function bootstrap() {
		if (courseId) {
			try {
				const user = await serverApi.get("/me")
				dispatchUserAction({ type: "BOOTSTRAP_USER", payload: user })
			} catch (err) {
				dispatch(newError('Es konnten nicht alle Daten geladen werden, eventuell kommt es zu einschränkungen'))
			}
		} else {
			console.warn('TODO: Set fake user with permissions.');
		}

		dispatch(fetchLesson(id, courseId, true))

	}

	async function registerHandler(){

		const dispatchLessonUpdate = (lesson) =>
			dispatch(lessonWasUpdated(lesson))

		editorWS.on('course/:courseId/lessons patched', dispatchLessonUpdate)
		editorWS.on('course/:courseId/lessons updated', dispatchLessonUpdate)

		const dispatchSectionUpdate = (data) => {
			const { stateDiff, _id, ...section } = data
			if(stateDiff){
				dispatch(mergeEditorDiff(_id, stateDiff))
			}
			if(section){
				dispatch(sectionWasUpdated(_id, section))
			}
		}

		editorWS.on('lesson/:lessonId/sections patched', dispatchSectionUpdate)
		editorWS.on('lesson/:lessonId/sections updated', dispatchSectionUpdate)
	}

	useEffect(() => {
		dispatch(fetchCourse(courseId))
		bootstrap()
		registerHandler()
	}, [])
}

export function useChangeListener(store, dispatch) {
	const [timeout, setTimeoutState] = useState(null)
	useEffect(() => {
		if (!store.view.bootstrapFinished) return
		// dispatch({ type: "SAVE_STATUS", payload: "Ungesicherte Änderungen" })

		if (timeout) {
			clearTimeout(timeout);
		} else {
			dispatch(unsavedChanges());
		}

		setTimeoutState(setTimeout(() => {
			setTimeoutState(null)
			dispatch(saveLesson())
			dispatch(saveSections())
		}, 1000)
		)
	}, [store.lesson, store.sections])
}

export function useFullScreenListener(store, dispatch) {
	return true
}
