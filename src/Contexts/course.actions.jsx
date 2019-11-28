import { serverApi } from "~/utils/api"

import { newError } from './notifications.actions'
export const SET_COURSE = 'SET_COURSE'



export const fetchCourse = (courseId) => async ({dispatch}) => {
	try {
		const course = await serverApi.get(`/courses/${courseId}`)
		dispatch({ type: SET_COURSE, payload: course })
	} catch (err) {
		dispatch(newError('Daten zum Kurs konnten nicht geladen werden.'))
	}
}