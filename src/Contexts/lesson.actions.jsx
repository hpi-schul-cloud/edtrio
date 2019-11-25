import { editorWS } from '~/utils/socket'
import { setSections , addSection } from './section.actions'
import { ERROR } from './notifications.actions'


export const BOOTSTRAP = 'BOOTSTRAP'
export const BOOTSTRAP_FINISHED = 'BOOTSTRAP_FINISHED'
export const SET_LESSON = 'SET_LESSON'


export const fetchLessonFromCache = () => {

}

export const fetchLesson = (lessonId, courseId, params) => async ({dispatch}) => {
	console.log('I am connected')
	console.log('Socket is Connected', editorWS.isConnected)
	try{
		const lesson = await editorWS.emit(
			'get',
			`course/${courseId}/lessons`,
			lessonId,
			params
		)
		dispatch({
			type: SET_LESSON,
			lesson
		})

		return lesson
	}catch(error){
		dispatch({type: ERROR})
	}

}

export const fetchLessonWithSections = (lessonId, courseId, params) => async ({dispatch, state}) => {

	try {
		// const lesson = await dispatch(fetchLesson(lessonId, courseId, {...params, all: 'true'}))
		let lesson = await editorWS.emit(
			'get',
			`course/${courseId}/lessons`,
			lessonId,
			{all: 'true'}
		)
		let {sections, ...rest} = lesson
		lesson = rest

		await dispatch({
			type: SET_LESSON,
			payload: lesson
		})

		if(sections.length === 0){
			dispatch(addSection(0))
		} else {
			sections = sections.map(section => ({
				...section,
				id: section._id,
				docValue: section.state,
				savedDocValue: section.state,
				notes: section.note,
				visible: section.visible || true, // TODO: remove should be set by server and blur mode should removed
			}))
			dispatch(setSections(sections))
		}
	} catch (err) {
		dispatch({ type: "ERROR", payload: "Es konnten keine Daten vom Server oder aus dem Speicher geladen werden" })
		dispatch({
			type: SET_LESSON,
			payload: {
				_id: new Date().getTime(),
			}
		})

		dispatch(setSections([{
			_id: new Date().getTime() +
					"" +
					Math.floor(Math.random() * 100),
			docValue: null,
			visible: true,
		}]))
	}
}