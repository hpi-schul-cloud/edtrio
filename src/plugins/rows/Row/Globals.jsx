import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledGlobals = styled.div`
    display: flex;
    align-items: center;
`

const StyledIcon = styled.img`
    height: 24px;
    margin: 0;
    margin-left: 5px;

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

const Copy = ({ duplicateRow, close, ...props }) => {
    return (
        <StyledIcon
            src={require("../assets/duplicate.svg")}
            onClick={() => {
                duplicateRow()
                close()
            }}
        />
    )
}

const Remove = ({ rows, index, close, ...props }) => {
    return (
        <StyledIcon
            disabled={rows.items.length === 1}
            src={require("../assets/remove.svg")}
            onClick={() => {
                if (rows.items.length === 1) return
                rows.remove(index)
                close()
            }}
        />
    )
}

const Globals = ({ index, rows, row, expanded, close, duplicateRow }) => {
    return (
        <StyledGlobals index={index}>
            <Copy duplicateRow={duplicateRow} close={close} />
            <Remove rows={rows} index={index} close={close} />
        </StyledGlobals>
    )
}

export default Globals
