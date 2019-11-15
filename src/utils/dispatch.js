export const createDispatch = (middlewares = [], dispatch, state) => {
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

export const thunkMiddleware = () => {
	return ({state, dispatch}) => (next) => action => {
		if(typeof action === 'function'){
			return action({state, dispatch})
		}

		return next(action)
	}
}