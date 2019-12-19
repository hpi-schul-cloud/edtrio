import { serverApi } from "~/utils/api"

import { newError } from './notifications.actions'
export const SET_COURSE = 'SET_COURSE'


/**
 * Fetch course from Schul-Cloud server and dispatch it to store
 * 
 * @param {string} courseId - ID of course, have to be the course the lesson belong to
 */
export const fetchCourse = (courseId) => async ({dispatch}) => {
	try {
		const course = await serverApi.get(`/courses/${courseId}`)
		dispatch({ type: SET_COURSE, payload: course })
	} catch (err) {
		dispatch(newError('Daten zum Kurs konnten nicht geladen werden.'))
	}
}