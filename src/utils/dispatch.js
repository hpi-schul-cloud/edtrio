import { initialState } from "~/Contexts/User";
import { useReducer } from "react";

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
export const createDispatch = (...middlewares) => {

	const MiddlewareApi = {}

	return (rdispatch, state) => {

		let dispatch;

		if(!MiddlewareApi.dispatch){
			if(middlewares.length === 0){
				return rdispatch
			} else {
				dispatch = () => {
					throw new Error(
						'Dispatching while constructing your middleware is not allowed. ' +
						'Other middleware would not be applied to this dispatch.'
					)
				}

				// obeject given to the middleware functions, is needed to refence the current state object
				// if the middleware calls state as ({state, dispatch}) state is not referenced to the current object
				// and stays on the old value, for this and for compatibility with redux plugins the function getState
				// retruns allways the current state
				MiddlewareApi.state = state;
				MiddlewareApi.getState = function(){return MiddlewareApi.state};
				MiddlewareApi.dispatch = (action) => dispatch(action)

				dispatch = middlewares
					// maps state and dispatch to every Middleware
					// this is important to give every middleware the new dispatcher and not the old one
					.map((a) => a( MiddlewareApi ))
					// returns a function where each calls a(b(...args)), when called the chian will build and
					// the last function get the argument, the function is called with... here it is the original dispatcher
					.reduce((a,b) => (...args) => a(b(...args)))(rdispatch)
			}
		}

		// set state on all state changes and reflect it to the middleware functions
		MiddlewareApi.state = state
		return MiddlewareApi.dispatch
	}

}



export const applyMiddleware = (...middleware) => {

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
