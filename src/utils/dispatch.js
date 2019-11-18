/**
 * allows to add Middleware, which exectuted before or instead the react dispatcher.
 * Middelwares get access to state and dispatch and called in order of declaration.
 *
 * Main structur of a Middleware has to be:
 * function myMiddelare (options){
 * 	return ({state, dispatch}) => next => action => {
 * 		//my action
 * 		next(action);
 * 	}
 * }
 *
 * As example take a look at thunkMiddleware
 *
 * @param {function} dispatch - react hook dispatcher function
 * @param {Object} state - react hook state
 * @param  {...function} middlewares - inspieret by redux middleware, for example take a lock at thunkMiddleware
 */

export const createDispatch = (dispatch, state, ...middlewares) => {
	if(middlewares.length === 0){
		return dispatch
	} else {
		middlewares.push((() => action => dispatch(action)))
		const chain = middlewares
			.map((a) => a({state, dispatch}))
			.reduce((a,b) => a(b))
		return (action) => {
			return chain(action)
		}
	}
}

/**
 * Allow to run async actions by returning a function witch accept {state, dispatch} as paramter
 * Could be added to dispatcher by createDispatch
 *
 * Funktions have to look like:
 * const myAction => (payload) => ({state, dispatch}){
 * 	// do somthing with payload and call dispatcher
 * }
 *
 *
 * The function is ispired by thunkMiddelware for redux
 * https://www.npmjs.com/package/redux-thunk
 */
export const thunkMiddleware = () => {
	return ({state, dispatch}) => (next) => action => {
		if(typeof action === 'function'){
			return action({state, dispatch})
		}
		return next(action)
	}
}