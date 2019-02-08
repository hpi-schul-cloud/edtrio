import React from "react"
import styled, { css } from "styled-components"
import { Link } from "react-router-dom"

const baseStyles = css`
    font-size: ${props => {
        if (props.size) return props.size
        return "16px"
    }};

    color: ${props => {
        if (props.black) return "#000"
        return "red" // TODO change to theme color
    }};

    transition: all 200ms ease-in-out;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`

const StyledLink = styled(Link)`
    text-decoration: none;
    margin-bottom: ${props => {
        if (props.noMargin) return 0
        return "5px"
    }};
`

const StyledAnchor = styled.a`
    text-decoration: none;
    margin-bottom: ${props => {
        if (props.noMargin) return 0
        return "5px"
    }};
`

const StyledContent = styled.span`
    ${baseStyles};
`

const StyledClickable = styled.span`
    ${baseStyles};
    margin-bottom: ${props => {
        if (props.noMargin) return 0
        return "5px"
    }};
`

/**
 * props: {
 *     block: Boolean, display: block or not
 *     white: Boolean,
 *     secondary: Boolean,
 *     noMargin: Boolean, only applies if block element
 *     size: Integer
 * }
 */

const Action = ({ clickable, a, block, to, children, style, ...props }) => {
    if (clickable) {
        return (
            <StyledClickable
                style={{ display: block ? "block" : "inline", ...style }}
                {...props}>
                {children}
            </StyledClickable>
        )
    } else if (a) {
        return (
            <StyledAnchor
                style={{ display: block ? "block" : "inline", ...style }}
                href={to}
                target="_blank">
                <StyledContent {...props}>{children}</StyledContent>
            </StyledAnchor>
        )
    }

    return (
        <StyledLink
            style={{ display: block ? "block" : "inline", ...style }}
            to={to}>
            <StyledContent {...props}>{children}</StyledContent>
        </StyledLink>
    )
}

export default Action
