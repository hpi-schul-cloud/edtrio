import React, { Component, useState, useEffect, useMemo } from "react"
import styled, { css } from "styled-components"
import { useDrag, useDrop } from "react-dnd"
import { isTouchDevice } from "~/utils/device"

import Editor from "./Editor"
import { setActiveSection } from "~/Contexts/view.actions"

function collect(monitor) {
	return {
		sourceOffset: monitor.getSourceClientOffset(),
	}
}


const Outer = styled.div`
	/* padding: 3px; */
	border: 10px solid
		${props => (props.active ? "rgba(163, 163, 163, 1.00)" : "transparent")};
	border-radius: 3px;
	background: ${props =>
		props.expanded ? "rgba(163, 163, 163, 1)" : "transparent"};

	transition: 250ms all ease-in-out;
	width: 100%;

	${props =>
		!props.active
			? css`
					border-color: transparent;
					background: transparent;
			  `
			: css``}
	${props =>
		!props.expanded &&
		css`
			border: none;
			border-radius: 15px;
		`}
`

const Wrapper = styled.div`
    overflow: hidden;
    cursor: pointer;
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.4);
    transition: 250ms all ease-in-out;
    position: relative;
    font-size: 20px;
    line-height: 1.42;
    height: 100%;
	margin: 15px auto;
	width: 200px;
	height: 160px;

    ${props =>
		props.expanded
			? css`
					margin: 8px 10px;
					border-radius: 3px;
					background-color: #fff;
					border: 3px solid rgba(68, 68, 68, 1);
					${props =>
		!props.active &&
						css`
							border-color: #fff;
						`}
			  `
			: css`
					border: 3px solid transparent;
					background-color: rgba(170, 170, 170, 1);
					width: 18px;
					height: 18px;
					border-radius: 9px;
					box-shadow: none !important;
					transform: scale(0.5);
					transform-origin: center center;

					${props =>
		props.active &&
						css`
							transform: scale(1);
						`}

					&:hover {
						transform: scale(1);
					}
			  `}

    &:hover {
        box-shadow: 0 3px 10px 0 rgba(0, 0, 0, 0.6);
    }

    ${({ visible }) => {
		return (
			!visible &&
			css`
				opacity: 0.7;
			`
		)
	}}

    display: ${({ hidden }) => hidden && "none"};

`

const Preview = ({
	store,
	active,
	section,
	expanded,
	index,
	activeSectionIndex,
	dispatch,
	wrapperRef,
	sourceOffset,
	k,
	getSectionIndex,
	moveSection
}) => {

	// reduzing the time a preview is rendered, added for performance reasosns
	const [docValue, setDocValue] = useState(section.docValue)
	useEffect(() => {
		setDocValue(section.docValue)
	}, [section.changed.size])

	const currentIndex = getSectionIndex(section._id)
	const [{ isDragging }, drag] = useDrag({
		item: { type: 'Preview', _id: section._id, originalIndex: currentIndex },
		collect: monitor => ({
			isDragging: monitor.isDragging(),
		}),
		end: (dropResult, monitor) => {
			const { _id, originalIndex } = monitor.getItem()
			const didDrop = monitor.didDrop()
			if (!didDrop) {
		        moveSection(getSectionIndex(_id), originalIndex)
			}
		},
	})

	const [, drop] = useDrop({
		accept: 'Preview',
		canDrop: () => false,
		hover({ _id: draggedId }) {
			if (draggedId !== section._id) {
				const overIndex = getSectionIndex(section._id)
				moveSection(getSectionIndex(draggedId), overIndex)
			}
		},
	})

	const dragStyles = {
		opacity: isDragging ? 0 : 1,
		cursor: isDragging ? 'auto' : 'move',
	}
	return (
		<Outer
			ref={node => drag(drop(node))}
			active={store.view.activeSectionId === section._id}
			expanded={expanded}
			editing={store.view.editing}
			style={{opacity}}>
			<Wrapper
				active={active}
				visible={section.visible}
				hidden={!section.visible && !store.view.editing}
				expanded={expanded}
				isDone={index <= activeSectionIndex}
				onClick={() => {
					dispatch(setActiveSection(section._id))
				}}>
				{expanded && (
					<Editor
						key={k}
						expanded={expanded}
						editing={store.view.editing}
						docValue={docValue}
					/>
				)}
			</Wrapper>
		</Outer>
	)
}

export default Preview
