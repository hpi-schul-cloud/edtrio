import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledControls = styled.div`
    position: absolute;
    top: 0;
    right: 11px;
    transform-origin: center top;
    transform: translateX(100%) scaleY(0);
    width: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 3px 3px 0;
    z-index: ${props => 100 - props.index};
    transition: 250ms all ease-in-out;
    background-color: #fff;

    ${props =>
        props.expanded &&
        css`
            transform: translateX(100%) scaleY(1);
        `}

    &::after {
        transition: 250ms all ease-in-out;
        position: absolute;
        pointer-events: none;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        height: 100%;
        width: 100%;
        background-color: #fff;

        ${props =>
            props.expanded &&
            css`
                opacity: 0;
            `}
    }
`

const StyledIcon = styled.img`
    width: 24px;
    margin-bottom: 15px;

    ${props =>
        props.disabled
            ? css`
                  opacity: 0.2;
                  cursor: not-allowed;
              `
            : css`
                  cursor: pointer;
                  opacity: 0.8;
              `}

    &:hover {
        opacity: ${props => !props.disabled && 1};
    }
`

const DragIcon = styled(StyledIcon)`
    margin-bottom: 5px;
    margin-top: -10px;

    cursor: grab;
    user-select: none;

    &:active {
        cursor: grabbing;
    }
`

const MoveUp = ({ rows, index, row, ...props }) => (
    <StyledIcon
        disabled={index === 0}
        src={require("../assets/angle-up.svg")}
        onClick={() => {
            if (index === 0) return
            rows.move(index, index - 1)
        }}
    />
)

const MoveDown = ({ rows, index, row, ...props }) => (
    <StyledIcon
        disabled={index + 1 >= rows.items.length}
        src={require("../assets/angle-down.svg")}
        onClick={() => {
            index + 1 < rows.items.length && rows.move(index, index + 1)
        }}
    />
)

const Drag = ({ rows, index, row, dragRef, connectDragSource, ...props }) =>
    connectDragSource(
        <div>
            <DragIcon
                draggable="false"
                disabled={rows.items.length === 1}
                src={require("../assets/drag-handle.svg")}
                // onClick={() => {
                //     index + 1 < rows.items.length && rows.move(index, index + 1)
                // }}
            />
        </div>,
    )

const Controls = ({ index, rows, row, expanded, connectDragSource }) => {
    return (
        <StyledControls index={index} expanded={expanded}>
            <MoveUp rows={rows} index={index} row={row} />
            <Drag
                rows={rows}
                index={index}
                row={row}
                connectDragSource={connectDragSource}
            />
            <MoveDown rows={rows} index={index} row={row} />
        </StyledControls>
    )
}

export default Controls
