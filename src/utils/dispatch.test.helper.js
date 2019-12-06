import React, { useReducer, createContext } from 'react'
import { prepareCreateDispatch } from '~/utils/dispatch'


const initState = {
	test: 'failed',
	switch: false
}

const reducer = (state, {type, payload}) => {
	switch(type){
		case 'MIDDLEWARE':
			return {
				...state,
				test: payload
			}
		case 'SOME_OTHER':
			return {
				...state,
				test: payload
			}
		case 'SWITCH':
			const newState = {
				...state,
				...payload
			}
			return newState
		default:
			return state
	}
}

export function TestComponent(props){
	return (
		<div></div>
	)
}

export const createProvider = (...middlewares) => {

	const Context = createContext()

	const middle = prepareCreateDispatch(...middlewares)

	return function Provider(){
		const [state, reactDispatch] = useReducer(reducer, initState)
		const dispatch = middle(reactDispatch, state)
		return (
				<Context.Provider value={{state, dispatch}}>
					<TestComponent dispatch={dispatch} state={state}/>
				</Context.Provider>
			)
	}
}