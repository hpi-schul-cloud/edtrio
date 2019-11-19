export const ERROR = 'ERROR'

export const newError = (message) => ({
	type: ERROR,
	message
})