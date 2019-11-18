import React, { useReducer, createContext, useEffect } from 'react'
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
			const newState = {
				...state,
				...payload
			}
			return newState
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

		const payload = await new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve({
					test,
					switch: !state.switch,
				})
			}, 1000)
		})

		dispatch({
			type: 'SWITCH',
			payload
		})

		return payload
	}

	function TestComponent({state}){

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
	const data = await dispatch(asyncFu('Affenmesserkampf!'))
	t.is(data.switch, !switchState)
	t.is(data.test, 'Affenmesserkampf!')
	t.is(comp.props.state.switch, !switchState)
	t.is(comp.props.state.test, 'Affenmesserkampf!')

})