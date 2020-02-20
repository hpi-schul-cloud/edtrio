import React from "react"
import { DragSource, DropTarget } from "react-dnd"

export default comp =>
	DropTarget(
		"preview",
		{
			hover(props, monitor, component) {
				if (!component) {
					return null
				}
				const node = component.getNode()
				if (!node) {
					return null
				}
				const dragIndex = monitor.getItem().index
				const hoverIndex = props.index
				if (dragIndex === hoverIndex) {
					return
				}
				const hoverBoundingRect = node.getBoundingClientRect()
				const hoverMiddleY =
					(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
				const clientOffset = monitor.getClientOffset()
				const hoverClientY = clientOffset.y - hoverBoundingRect.top

				if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
					return
				}
				if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
					return
				}

				props.moveSection(dragIndex, hoverIndex)
				monitor.getItem().index = hoverIndex
			},
		},
		connect => ({
			connectDropTarget: connect.dropTarget(),
		}),
	)(
		DragSource(
			"preview",
			{
				beginDrag: props => ({
					id: props._id,
					index: props.index,
				}),
			},
			(connect, monitor) => ({
				connectDragSource: connect.dragSource(),
				connectDragPreview: connect.dragPreview(),
				isDragging: monitor.isDragging(),
			}),
		)(comp),
	)
