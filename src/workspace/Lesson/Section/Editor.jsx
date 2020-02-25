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
import { createTheme } from "./createTheme"

import { plugins } from "~/plugins"

export const EdtrWrapper = styled.div`
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

/**
 * props
 * @param section
 * @param editing
 * @param onChange
 * https://github.com/edtr-io/edtr-io/blob/master/api/core.api.md
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
		// if the user not in write mode, the edtr is updating
		if(!props.editing){
			setInitialState(props.section.docValue)
		}
	}, [props.section.docValue])

	// TODO: onError pass to Edtr 
	
	const editable = props.section.scopePermission === 'write' && props.editing;
	return (
		<EdtrWrapper>
			<Edtr
				theme={createTheme(theme)}
				plugins={plugins}
				editable={editable}
				omitDragDropContext
				initialState={initialState}
				onChange={props.onChange}
			>
				{children}
			</Edtr>
		</EdtrWrapper>
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
