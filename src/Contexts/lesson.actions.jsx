import { editorWS } from '~/utils/socket'
import { setSections , createSection } from './section.actions'
import { ERROR } from './notifications.actions'
import { generateHash } from '~/utils/crypto'
import { saveLessonData } from '~/utils/cache'
import { startLoading , finishLoading } from './view.actions'



export const BOOTSTRAP = 'BOOTSTRAP'
export const BOOTSTRAP_FINISHED = 'BOOTSTRAP_FINISHED'
export const SET_LESSON = 'SET_LESSON'
export const UPDATE_LESSON = 'UPDATE_LESSON'
export const LESSON_UPDATED = 'LESSON_UPDATED' // triggered by server
export const CHANGE_LESSON_TITLE = 'CHANGE_LESSON_TITLE'
export const SAVING_LESSON = 'SAVING_LESSON'
export const LESSON_SAVED = 'LESSON_SAVED'
export const SAVING_LESSON_FAILED = 'SAVING_LESSON_FAILED'
export const SWAP_SECTIONS = 'SWAP_SECTIONS'


/**
 * Set lesson if not exist and overwrite if already setted
 * 
 * @param {Object} lesson 
 */
export const setLesson = (lesson) => ({
	type: SET_LESSON,
	payload: lesson
})

/**
 * Triggers a Lesson update, should only use, if changes already save by server
 * Will merged with existing data
 *
 * @param {Object} lesson - a lesson object, with updated data
 */
export const lessonWasUpdated = (lesson) => ({
	type: LESSON_UPDATED,
	payload: lesson
})

/**
 * Sets title to lesson state and markes it as changed for later save
 * 
 * @param {string} title - new lesson title
 */
export const changeLessonTitle = (title) => ({
	type: CHANGE_LESSON_TITLE,
	payload: title
})

/**
 * Saves all changed (in changed marked) parameters to the server
 */
export const saveLesson = () => async ({state, dispatch}) => {

	// keep care of adding or removing something, ...lesson is to generate hash and it should include
	// everything witch is part of lesson, compared to database
	const {lesson: {changed, hash, timestamp, ...lesson}, course}  = state

	if (changed.size === 0) return

	const changes = {}

	dispatch({
		type: SAVING_LESSON
	})

	try{

		changed.forEach(key => {
			if(Object.prototype.hasOwnProperty.call(lesson, key)){
				changes[key] = lesson[key]
			}
		})

		const prom = editorWS.emit(
			'patch',
			`course/${course._id}/lessons`,
			lesson._id,
			changes
		)

		const newHash = generateHash(lesson)

		const message = await prom

		const payload = {
			hash: newHash,
			timestamp: message.updatedAt || message.insertedAt
		}

		dispatch({
			type: LESSON_SAVED,
			payload
		})

		saveLessonData({
			...lesson,
			...payload,
			savedToBackend: true
		})

	} catch (err) {
		dispatch({
			type: SAVING_LESSON_FAILED
		})

		saveLessonData({
			...state.lesson,
			savedToBackend: false
		})
	}

}

/**
 * Fetch lesson data from server and overwrite current lesson
 * 
 * @param {string} lessonId - ID of lesson
 * @param {string} courseId - ID of course, lesson belong to
 * @param {Object} params - query params for request
 */
export const fetchLesson = (lessonId, courseId, params) => async ({dispatch}) => {
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

/**
 * Fetch lesson and section data from server and overwrite current lesson and sections.
 * The funktion is used to bootstrap the edtior or load a other lesson with all needed data
 * 
 * @param {string} lessonId - ID of lesson
 * @param {string} courseId - ID of course, lesson belong to
 * @param {Object} params - query params for request
 */
export const fetchLessonWithSections = (lessonId, courseId, params) => async ({dispatch, state}) => {

	dispatch(startLoading())

	try {
		// const lesson = await dispatch(fetchLesson(lessonId, courseId, {...params, all: 'true'}))
		let {sections, ...lesson} = await editorWS.emit(
			'get',
			`course/${courseId}/lessons`,
			lessonId,
			{all: 'true'}
		)

		lesson.sections = []

		// lesson.id = lesson._id // needed for old version, please use _id instead

		dispatch({
			type: SET_LESSON,
			payload: lesson
		})

		if(sections.length === 0){
			dispatch(createSection(0))
		} else {
			sections = sections.map(section => {
				lesson.sections.push(section._id)
				return {
					...section,
					id: section._id, // needed for old version, please use _id instead
					docValue: section.state,
					savedDocValue: section.state,
					notes: section.note,
					visible: section.visible || true, // TODO: remove should be set by server and blur mode should removed
				}
			})
			dispatch(setSections(sections))
			dispatch({
				type: UPDATE_LESSON,
				payload: {
					sections: lesson.sections
				}
			})
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

	dispatch(finishLoading())

}