import React, { useReducer, createContext } from 'react'
import test from 'ava'
import renderer from 'react-test-renderer'

import {createDispatch, thunkMiddleware} from './dispatch'
import { async, reject } from 'q'

const middleware = () => {
	return ({state, dispatch}) => {
		return next => {
			return action => {
				if(action.type === 'TEST'){
					return dispatch({
						type: 'MIDDLEWARE',
						payload: 'success'
					})
				}
				return next(action)
			}
		}
	}
}

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
			return {
				...state,
				test: payload.test
			}
		default:
			return state
	}
}



test('add dispatch middleware and execute', t => {
	const Context = createContext()

	function TestComponent(){
		return (
			<div></div>
		)
	}
	function Provider(){
		const [state, reactDispatch] = useReducer(reducer, initState)
		const dispatch = createDispatch(reactDispatch, state, middleware())
		return (
				<Context.Provider value={{state, dispatch}}>
					<TestComponent dispatch={dispatch} state={state}/>
				</Context.Provider>
			)
	}

	const rendered = renderer.create(<Provider />)
	const renderedInstance = rendered.root

	const comp = renderedInstance.findByType(TestComponent)

	comp.props.dispatch({type: 'TEST'})
	t.is(comp.props.state.test, 'success')
	comp.props.dispatch({type: 'SOME_OTHER', payload: 'haha'})
	t.is(comp.props.state.test, 'haha')


})

test('test thunkMiddleware', async t => {
	const Context = createContext()

	const asyncFu = (test) => async ({dispatch, state}) => {
		await dispatch({
			type: 'SWITCH',
			payload:{
				switch: !state.switch,
				test
			}
		})
	}

	function TestComponent(){
		return (
			<div></div>
		)
	}
	function Provider(){
		const [state, reactDispatch] = useReducer(reducer, initState)
		const dispatch = createDispatch(reactDispatch, state, thunkMiddleware())
		return (
				<Context.Provider value={{state, dispatch}}>
					<TestComponent dispatch={dispatch} state={state}/>
				</Context.Provider>
			)
	}

	const rendered = renderer.create(<Provider />)
	const renderedInstance = rendered.root

	const comp = renderedInstance.findByType(TestComponent)
	const {state, dispatch} = comp.props

	const switchState = state.switch
	dispatch(asyncFu('Affenmesserkampf!'))
	// dispatch do not run synchronously, so timeout close this gap
	setTimeout(() => {
		t.is(comp.props.state.switch, !switchState)
		t.is(comp.props.state.test, 'Affenmesserkampf!')
	}, 10)

})