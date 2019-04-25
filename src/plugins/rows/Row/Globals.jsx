import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledGlobals = styled.div`
    height: ${props => (props.hover ? 50 : 0)}px;
    overflow: hidden;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    transition: 250ms all ease-in-out;
`

const StyledIcon = styled.img`
    height: 30px;
    margin-left: 15px;

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

const Globals = ({ index, rows, row, hover, duplicateRow }) => {
    return (
        <StyledGlobals index={index} hover={hover}>
            <Copy duplicateRow={duplicateRow} />
            <Remove rows={rows} index={index} />
        </StyledGlobals>
    )
}

export default Globals
