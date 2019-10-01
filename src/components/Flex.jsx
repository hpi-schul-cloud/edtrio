import React from "react"
import styled from "styled-components"

const Flex = styled.div`
    display: ${props => (props.inline ? "inline-flex" : "flex")};
    flex-direction: ${props => {
        if (props.columnReverse) return "column-reverse"
        if (props.rowReverse) return "row-reverse"
        if (props.column) return "column"
        return "row"
    }};
    flex-wrap: ${props => {
        if (props.wrapReverse) return "wrap-reverse"
        else if (props.noWrap) return "nowrap"
        return "wrap"
    }};
    justify-content: ${props => {
        if (props.justifyCenter) return "center"
        else if (props.justifyAround) return "space-around"
        else if (props.justifyBetween) return "space-between"
        else if (props.justifyEvenly) return "space-evenly"
        else if (props.justifyEnd) return "flex-end"
        return "flex-start"
    }};
    align-items: ${props => {
        if (props.alignStretch) return "stretch"
        else if (props.alignEnd) return "flex-end"
        else if (props.alignCenter) return "center"
        else if (props.alignBaseline) return "baseline"
        return "flex-start"
    }};
    align-content: ${props => {
        if (props.contentStart) return "flex-start"
        else if (props.contentEnd) return "flex-end"
        else if (props.contentCenter) return "center"
        else if (props.contentBetween) return "space-between"
        else if (props.contentAround) return "contentAround"
        return "stretch"
    }};
`

export const Column = styled.div`
    width: ${props => {
        if (props.three) return "33%"
        if (props.four) return "25%"
        return "50%"
    }};
    padding: 15px;
    position: relative;
    flex-grow: 1;
    flex-shrink: 1;

    @media (max-width: 600px) {
        width: 100%;
    }
`

export default Flex
