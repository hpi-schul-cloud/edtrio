import React, { useEffect, useState } from "react"
import styled from "styled-components"
import {
	Editor as Edtr,
	useScopedDispatch,
//	useScopedSelector
} from "@edtr-io/core"

/*
import {
	 focusNext,
		focusPrevious,
		persist,
		redo,
		reset,
		undo, 
	hasPendingChanges as hasPendingChangesSelector
} from '@edtr-io/store'
*/
import theme from "~/theme"
import plugins from "./plugins"
import { createTheme } from "./createTheme"
export { default as plugins } from "./plugins"

export const EditorWrapper = styled.div`
	min-height: 50px;
	padding: 0 10px;
	font-size: 1.3rem;
	line-height: 1.4;

	.fa-4x{
		font-size: 3rem;
	}

	@media (max-width: 991px) {
		font-size: 1.2rem;
	}

	@media (max-width: 768px) {
		font-size: 1.2rem;
	}

	@media (max-width: 575px) {
		font-size: 1.1rem;
	}
`

const getInitialDocValue = (section) => {
	const { docValue } = section;
	// if error try catch
	return (docValue && Object.keys(docValue).length) ? docValue : { plugin: "rows" }
}

const canWrite = (section, props) => {
	// if section not exist or has no key, setError
	return section.scopePermission === 'write' && props.editing
}

/**
 * props
 * @param section
 * @param editing
 * @param onChange
 */
export const Editor = (props) => {
	const docValue = getInitialDocValue(props.section)
	const children = React.useCallback((document) => {
		return (
			<PlainEditorContainerInner
				docValue={docValue}>
				{document}
			</PlainEditorContainerInner>
		)
	})
	
	const [initialState, setInitialState] = useState(docValue)
	useEffect(() => {
		if(canWrite(props.section, props)){
			setInitialState(props.section.docValue)
		}
	}, [props.section.docValue])

	return (
		<EditorWrapper>
			<Edtr
				theme={createTheme(theme)}
				plugins={plugins}
				defaultPlugin={"text"}
				editable={canWrite(props.section, props)}
				omitDragDropContext
				initialState={initialState}
				onChange={props.onChange}>
				{children}
			</Edtr>
		</EditorWrapper>
	)
}
export default Editor

/**
 * props
 * @param docValue 
 */
function PlainEditorContainerInner(props) {
	const dispatch = useScopedDispatch()
	//	const hasPendingChanges = useScopedSelector(hasPendingChangesSelector())
	//	const [editable, setEditable] = React.useState(
	//		props.editable === undefined ? true : props.editable
	//	)
	useEffect(() => {
		if(props.docValue && props.docValue.state){
			dispatch((scope) => ({
				type: 'SetPartialState',
				scope,
				payload: props.docValue
			}))
		}
	}, [props.docValue])

	return (
		<React.Fragment>
			<div style={{ margin: '20px 0' }}>{props.children}</div>
			{/* <button
					onClick={() => {
						dispatch(undo())
					}}
				>
					Undo
				</button>
				<button
					onClick={() => {
						dispatch(redo())
					}}
				>
					Redo
				</button>
				<button
					onClick={() => {
						dispatch(persist())
					}}
					disabled={!hasPendingChanges}
				>
					Mark persisted
				</button>
				<button
					onClick={() => {
						dispatch(reset())
					}}
					disabled={!hasPendingChanges}
				>
					Reset
				</button> */}
		</React.Fragment>
	)
}
