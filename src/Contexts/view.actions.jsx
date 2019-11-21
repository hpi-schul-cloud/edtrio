export const SET_ACTIVE_SECTION = "SET_ACTIVE_SECTION"
export const SET_EDITING = "SET_EDITING"

/**
 *
 *
 * @param {boolean} editing - activate or deactivate editing mode
 */
export const setEditing = (editing) => ({
	type: SET_EDITING,
	payload: editing
})