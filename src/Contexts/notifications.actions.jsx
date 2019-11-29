export const ERROR = 'ERROR'
export const SAVE_STATUS = 'SAVE_STATUS'


/**
 * adds a message to the nofification pannel for noticing the user
 * 
 * @param {string} message - message that should show to the user
 */
export const newError = (message) => ({
	type: ERROR,
	message
})

/**
 * set status message to unsaved changes
 */
export const unsavedChanges = () => ({
	type: SAVE_STATUS,
	payload: 'Ungesicherte Änderungen'
})