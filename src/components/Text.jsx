import React, { useContext } from "react"
import styled, { css } from "styled-components"

import theme from "~/theme"

const baseStyles = css`
    max-width: 100%;

    font-size: ${props => {
        if (props.size) return `${props.size}px`
        return "16px"
    }};

    color: ${props => {
        if (props.primary) return theme.primaryColor
        return theme.textColor
    }};

    font-weight: ${props => {
        if (props.bold) return 700
        return 400
    }};

    width: ${props => {
        if (props.width) return props.width
        return "100%"
    }};

    margin-bottom: ${props => {
        if (props.noMargin) return 0
        return "10px"
    }};
    margin-top: 0px;

    text-align: ${props => {
        if (props.center) return "center"
        if (props.right) return "right"
        return "left"
    }};
`

const StyledParagraph = styled.p`
    ${baseStyles};
`

const StyledSpan = styled.span`
    ${baseStyles};
`

/**
 * props: {
 *     inline: Boolean, returns either a span or p element
 *     right: aligns the text to the right
 *     center: aligns the text to the center
 *     size: Integer, sets font-size
 *     noMargin: Boolean, defines whether the element has a bottom margin (only applies for non-inline)
 *     bold: Boolean, defines the font-weight
 *     width: String, e.g. 25%
 *     primary: Boolean, displays red text
 * }
 */

const Text = ({ inline, ...props }) => {
    if (inline) return <StyledSpan {...props} />
    return <StyledParagraph {...props} />
}

export default Text
