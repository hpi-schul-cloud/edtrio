import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledGlobals = styled.div`
    height: 24px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    /* transition: 250ms all ease-in-out; */
    position: absolute;
    bottom: 12px;
    right: 50px;
    transform: translateY(100%) scaleY(0);
    background-color: #fff;

    ${props =>
        props.expanded &&
        css`
            transform: translateY(100%) scaleY(1);
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
    height: 24px;
    margin: 0 7px;

    ${props =>
        props.disabled
            ? css`
                  opacity: 0.5;
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

const Copy = ({ duplicateRow, ...props }) => {
    return (
        <StyledIcon
            src={require("../assets/duplicate.svg")}
            style={{ marginTop: 5, marginBottom: 5, marginRight: -1 }}
            onClick={duplicateRow}
        />
    )
}

const Remove = ({ rows, index, ...props }) => {
    return (
        <StyledIcon
            disabled={rows.items.length === 1}
            src={require("../assets/remove.svg")}
            style={{ marginBottom: 3 }}
            onClick={() => {
                if (rows.items.length === 1) return
                rows.remove(index)
            }}
        />
    )
}

const Globals = ({ index, rows, row, expanded, duplicateRow }) => {
    return (
        <StyledGlobals index={index} expanded={expanded}>
            <Copy duplicateRow={duplicateRow} />
            <Remove rows={rows} index={index} />
        </StyledGlobals>
    )
}

export default Globals
