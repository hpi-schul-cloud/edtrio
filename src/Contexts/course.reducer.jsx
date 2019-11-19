
export const initialState = {}
export function courseReducer(state = initialState, { type, payload }) {
    switch (type) {
		case "SET_COURSE":
            return {
                ...state,
                ...payload,
            }
		default:
			return state
    }
}