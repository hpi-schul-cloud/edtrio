import React, { useImperativeHandle, useRef } from "react"
import { DragSource, DropTarget } from "react-dnd"
import styled, { css } from "styled-components"
import {
    getDocument,
    EditorContext,
    ActionType,
    getPlugins,
} from "@edtr-io/core"

import Menu from "./Menu"
import Controls from "./Controls"
import Globals from "./Globals"
import Settings from "./Settings"
import Separator, { Add } from "./Separator"
import render from "./render"

export const RowContainer = styled.div`
    margin-left: 25px;
    margin-right: 25px;

    ${props =>
        !props.noHeight &&
        css`
            min-height: 10px;
            margin: 25px;
            margin-top: ${props => (props.isFirst ? 25 : 0)}px;
        `}
    position: relative;
    border-left: 5px solid transparent;
    transition: 250ms all ease-in-out;
    padding-left: 25px;
    padding-right: 25px;

    &:hover {
        ${props =>
            props.editable &&
            css`
                border-color: #000;
                padding-top: 25px;
                box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12),
                    0 1px 2px rgba(0, 0, 0, 0.24);
            `}
    }

    &:hover .row-controls {
        opacity: 1;
    }
`

export const Row = React.forwardRef(
    (
        {
            isDragging,
            connectDragSource,
            connectDropTarget,
            connectDragPreview,
            doc,
            store,
            ...props
        },
        ref,
    ) => {
        const [hover, setHover] = React.useState(false)
        const [menu, setMenu] = React.useState(undefined)
        const rows = props.state
        const index = props.index
        const row = rows()[index]
        const plugins = getPlugins(store.state)

        const matchingPlugin = plugins[doc.plugin]

        function openMenu(insertIndex, replaceIndex) {
            setMenu({
                index: insertIndex,
                onClose: pluginState => {
                    rows.insert(insertIndex, pluginState)
                    setMenu(undefined)
                    if (typeof replaceIndex === "number") {
                        rows.remove(replaceIndex)
                    }
                },
            })
        }

        function duplicateRow() {
            rows.insert(index, doc)
        }

        // DnD
        const rowRef = useRef(null)
        if (connectDragSource) {
            connectDragPreview(rowRef)
            connectDropTarget(rowRef)
            // const opacity = isDragging ? 0 : 1
            useImperativeHandle(ref, () => ({
                getNode: () => rowRef.current,
            }))
        }

        return (
            <RowContainer
                ref={rowRef}
                noHeight={doc.plugin === "notes" && !props.editable}
                editable={props.editable}
                isFirst={index === 0}
                hover={hover}
                onMouseEnter={() => {
                    setHover(true)
                }}
                onMouseLeave={() => setHover(false)}>
                {index === 0 && (
                    <Separator isFirst={true} onClick={() => openMenu(index)} />
                )}

                {render({ row, rows, index, store, getDocument })}
                <Separator onClick={() => openMenu(index + 1)} />
                {props.editable && (
                    <React.Fragment>
                        <Controls
                            hover={hover}
                            index={index}
                            rows={rows}
                            row={row}
                            connectDragSource={connectDragSource}
                        />
                        <Settings
                            index={index}
                            pluginName={matchingPlugin.title || doc.plugin}
                        />
                        <Globals
                            hover={hover}
                            index={index}
                            rows={rows}
                            duplicateRow={duplicateRow}
                            row={row}
                        />
                    </React.Fragment>
                )}
                <Menu
                    visible={!!menu}
                    menu={menu}
                    setMenu={setMenu}
                    store={store}
                    name={props.name}
                />
            </RowContainer>
        )
    },
)

export default DropTarget(
    "row",
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

            props.moveRow(dragIndex, hoverIndex)
            monitor.getItem().index = hoverIndex
        },
    },
    connect => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        "row",
        {
            beginDrag: props => ({
                id: props.id,
                index: props.index,
            }),
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            connectDragPreview: connect.dragPreview(),
            isDragging: monitor.isDragging(),
        }),
    )(Row),
)
