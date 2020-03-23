import { editorWS } from '~/utils/socket'
import { setSections , createSection , fetchSection , removeSection , sortSections , addSection } from './section.actions'
import { newError } from './notifications.actions'
import { generateLessonHash } from '~/utils/crypto'
import { loadLessonCache, saveLessonCache } from '~/utils/cache'
import { startLoading , finishLoading , setActiveSection } from './view.actions'
import { mapSection } from '~/utils/reducer'
import { isFocused } from '@edtr-io/store'






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

		const newHash = generateLessonHash(lesson)
		changes.hash = newHash

		const message = await editorWS.emit(
			'patch',
			`course/${course._id}/lessons`,
			lesson._id,
			changes
		)

		const payload = {
			hash: newHash,
			timestamp: message.updatedAt || message.createdAt
		}

		dispatch({
			type: LESSON_SAVED,
			payload
		})

		saveLessonCache({
			...lesson,
			...payload,
			savedToBackend: true
		})

	} catch (err) {
		dispatch({
			type: SAVING_LESSON_FAILED
		})

		saveLessonCache({
			...state.lesson,
			timestamp: Date.now(),
			changed: Array.from(changed),
			savedHash: hash,
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
export const fetchLesson = (lessonId, courseId, bootstrap) => async ({dispatch}) => {

	dispatch(startLoading())

	try {

		const cached = loadLessonCache(lessonId) || {};
		let sectionIds = [];
		let cachedDataExist = false;

		if(Object.keys(cached).length !== 0){
			cachedDataExist = true;

			dispatch({
				type: SET_LESSON,
				payload: cached
			})

			sectionIds = cached.sections
			dispatch(fetchSection(...sectionIds))
		}

		const lesson = await editorWS.emit(
			'get',
			`course/${courseId}/lessons`,
			lessonId
		)

		if(!lesson.hash){
			lesson.hash = generateLessonHash(lesson)
		}

		if(lesson.hash !== cached.hash){
		// lesson.sections = lesson.sections || 

			// remove sections that are in cached lesson but not on server array
			sectionIds.forEach(s => {
				if(!lesson.sections.includes(s)) {
					dispatch(removeSection(s))
				}
			})

			dispatch({
				type: cachedDataExist ? UPDATE_LESSON : SET_LESSON,
				payload: lesson
			})

			saveLessonCache(lesson);

			// load lessons not already loaded
			dispatch(
				fetchSection(...lesson.sections.filter(s => !sectionIds.includes(s)))
			)

			try {
			// TODO: check if active section was already setted
				dispatch(setActiveSection(lesson.sections[0]))
			} catch (e) {
				console.warn(e)
				if(lesson.sections === undefined || lesson.sections.length === 0){
					dispatch(createSection())
				}
			}

			dispatch(sortSections(lesson.sections))

		}
	} catch (err) {
		console.error(err)
		dispatch(newError("Es konnten keine Daten vom Server oder aus dem Speicher geladen werden"))
	}

	dispatch(finishLoading())
	if(bootstrap === true) dispatch({ type: BOOTSTRAP_FINISHED })
}

/**
 * Fetch lesson and section data from server and overwrite current lesson and sections.
 * The funktion is used to bootstrap the edtior or load a other lesson with all needed data
 *
 * @param {string} lessonId - ID of lesson
 * @param {string} courseId - ID of course, lesson belong to
 * @param {boolean} bootstrap - dispatch bootstrap finished if true
 */
export const fetchLessonWithSections = (lessonId, courseId, bootstrap = false) => async ({dispatch, state}) => {

	dispatch(startLoading())

	try {
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
				return mapSection(section)
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
		dispatch(newError("Es konnten keine Daten vom Server oder aus dem Speicher geladen werden"))
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
	if(bootstrap === true) dispatch({ type: BOOTSTRAP_FINISHED })

}