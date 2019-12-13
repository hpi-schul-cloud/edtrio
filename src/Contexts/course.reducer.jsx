import { SET_COURSE } from "./course.actions"

export const courseInitialState = {}
/**
 * Contains all data to a course, should be nearly the same data as in the database
 *
 * @param {*} state - state of lesson
 * @param {Object} param1 - object with the parameters type and payload
 */
export function courseReducer(state = courseInitialState, { type, payload }) {
    switch (type) {
		case SET_COURSE:
            return {
                ...state,
                ...payload,
            }
		default:
			return state
    }
}