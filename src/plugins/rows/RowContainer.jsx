import React from "react"
import styled, { css } from "styled-components"

const RowContainer = styled.div`
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
    border-left: 2px solid transparent;
    transition: 250ms all ease-in-out;
    padding-left: 25px;
    padding-right: 25px;

    ${props =>
        props.expanded &&
        css`
            border-color: #333333;
            padding-top: 0;
            padding-bottom: 0;
        `}
`

export default RowContainer
