import React, { useContext } from "react"
import styled, { css } from "styled-components"

import theme from "~/theme"

const baseStyles = css`
    font-size: ${props => {
        if (props.size) return props.size
        return "16px"
    }};

    color: ${theme.primaryColor};

    transition: all 100ms ease-in-out;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        color: ${theme.tintedPrimaryColor};
        text-decoration: underline;
    }
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
 *     noMargin: Boolean, only applies if block element
 *     size: Integer
 * }
 */

const Action = ({
    clickable,
    a,
    block,
    to,
    children,
    style,
    target,
    ...props
}) => {
    if (clickable) {
        return (
            <StyledClickable
                theme={theme}
                style={{ display: block ? "block" : "inline", ...style }}
                {...props}>
                {children}
            </StyledClickable>
        )
    }
    return (
        <StyledAnchor
            theme={theme}
            style={{ display: block ? "block" : "inline", ...style }}
            href={to}
            target={target || "_blank"}>
            <StyledContent {...props} theme={theme}>
                {children}
            </StyledContent>
        </StyledAnchor>
    )
}
export default Action
