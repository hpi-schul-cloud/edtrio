import { editorWS } from '~/utils/socket'

export const BOOTSTRAP = 'BOOTSTRAP'
export const BOOTSTRAP_FINISHED = 'BOOTSTRAP_FINISHED'
export const SET_LESSON = 'SET_LESSON'


export const fetchLessonFromCache = () => {

}

export const fetchLesson = (lessonId, courseId, params) => async ({dispatch}) => {
	const lesson = await editorWS.emit(
		'get',
		`course/${courseId}/lessons`,
		lessonId,
		params
	)
	lesson.id = lesson._id

	dispatch({
		type: SET_LESSON,
		lesson
	})

	return lesson
}

export const fetchLessonWithSections = (lessonId, courseId, params) => async ({dispatch}) => {

	try {
		const lesson = await dispatch(fetchLesson(lessonId, courseId, {...params, all: 'true'}))

		if(lesson.sections.length === 0){
			const section = await editorWS.emit('create', `lesson/${lessonId}/sections`, {})
			lesson.sections.push(section)
		}
		lesson.sections = lesson.sections.map(section => ({
			...section,
			id: section._id,
			docValue: section.state,
			savedDocValue: section.state,
			notes: section.note,
			visible: section.visible || true, // TODO: remove should be set by server and blur mode should removed
		}))

		// dispatch({ type: "BOOTSTRAP", payload: lesson })
	} catch (err) {
		dispatch({ type: "ERROR" })
		/* dispatch({
			type: "BOOTSTRAP",
			payload: {
				id: new Date().getTime(),
				sections: [
					{
						id:
							new Date().getTime() +
							"" +
							Math.floor(Math.random() * 100),
						docValue: null,
						visible: true,
					},
				],
				changed: new Set(),
			},
		}) */
	}
}