
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
 * @param {string|function} [identifier] - identifier to get the spezific dispatcher and state, have to be unic and is set to default if no value is given
 * @param  {...function} middlewares - inspieret by redux middleware, for example take a lock at thunkMiddleware
 */

const knownMiddelwares = {}

export const createDispatch = (rdispatch, state, identifier, ...middlewares) => {
	let dispatch;

	if(typeof identifier === 'function'){
		middlewares.unshift(identifier)
		identifier = 'default'
	}

	if(!knownMiddelwares[identifier]){
		if(middlewares.length === 0){
			return rdispatch
		} else {
			dispatch = () => {
				throw new Error(
					'Dispatching while constructing your middleware is not allowed. ' +
					'Other middleware would not be applied to this dispatch.'
				)
			}

			knownMiddelwares[identifier] = {
				state: state,
				getState: function(){return knownMiddelwares[identifier].state},
				dispatch: (action) => dispatch(action)
			}

			dispatch = middlewares
				// maps state and dispatch to every Middleware
				// this is important to give every middleware the new dispatcher and not the old one
				.map((a) => a(knownMiddelwares[identifier] ))
				// returns a function where each calls a(b(...args)), when called the chian will build and
				// the last function get the argument, the function is called with... here it is the original dispatcher
				.reduce((a,b) => (...args) => a(b(...args)))(rdispatch)
		}
	}
	knownMiddelwares[identifier].state = state
	// dispatch = prepared(rdispatch)
	// middlewareAPI.dispatch = (action) => dispatch(action)
	return knownMiddelwares[identifier].dispatch
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
export const thunkMiddleware = ({getState, dispatch}) => (next) => action => {
		if(typeof action === 'function'){
			return action({state: getState(), dispatch})
		}
		return next(action)
	}
