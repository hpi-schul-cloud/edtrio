export const ERROR = 'ERROR'
export const SAVE_STATUS = 'SAVE_STATUS'

export const newError = (message) => ({
	type: ERROR,
	message
})

export const unsavedChanges = () => ({
	type: SAVE_STATUS,
	payload: 'Ungesicherte Änderungen'
})