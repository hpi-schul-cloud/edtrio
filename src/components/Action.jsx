import React, { useContext } from "react"
import styled, { css } from "styled-components"
import color from "color"

import theme from "~/theme"
const baseStyles = css`
    font-size: ${props => {
        if (props.size) return props.size
        return "16px"
    }};

    color: ${props => {
        if (props.secondary) return theme.colors.secondary
        if (props.disabled) return theme.colors.disabledBackground
        if (props.success) return theme.colors.success
        if (props.danger) return theme.colors.danger
        if (props.tertiary) return theme.colors.tertiary
        return theme.colors.primary
    }};

    transition: all 100ms ease-in-out;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};
    text-decoration: none;

    &:hover {
        color: ${props => {
            if (props.secondary)
                return color(theme.colors.secondary)
                    .darken(0.25)
                    .rgb()
                    .string()
            if (props.disabled) return theme.colors.disabledBackground
            if (props.success)
                return color(theme.colors.success)
                    .darken(0.25)
                    .rgb()
                    .string()
            if (props.danger)
                return color(theme.colors.danger)
                    .darken(0.25)
                    .rgb()
                    .string()
            if (props.tertiary)
                return color(theme.colors.tertiary)
                    .darken(0.25)
                    .rgb()
                    .string()
            return color(theme.colors.primary)
                .darken(0.25)
                .rgb()
                .string()
        }};
        text-decoration: ${props => !props.disabled && "underline"};
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
    onClick = () => {},
    ...props
}) => {
    if (props.disabled) {
        onClick = () => {}
        to = ""
    }

    if (clickable) {
        return (
            <StyledClickable
                theme={theme}
                style={{ display: block ? "block" : "inline", ...style }}
                onClick={onClick}
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
            <StyledContent {...props} onclick={onClick} theme={theme}>
                {children}
            </StyledContent>
        </StyledAnchor>
    )
}
export default Action
