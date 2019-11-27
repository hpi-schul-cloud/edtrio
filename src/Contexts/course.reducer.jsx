import { SET_COURSE } from "./course.actions"

export const courseInitialState = {}
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