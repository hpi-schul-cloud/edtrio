import React, { useContext } from "react"
import color from "color"
import styled, { css } from "styled-components"

import theme from "~/theme"

export { default as Toggle } from "./Toggle"

const StyledButton = styled.button`
    position: relative;
    display: ${props => (props.block ? "block" : "inline-block")};
    font-family: "PT Sans", sans-serif;
    cursor: ${props => (props.disabled ? "not-allowed" : "pointer")};

    font-size: 18px;
    line-height: 21.6px;
    font-weight: 700;

    width: ${props => props.full && "100%"};
    padding: ${props => {
        if (props.small) return "4.5px 13.5px 2.25px"
        else if (props.large) return "13.5px"
        return "9px 13.5px 6.75px"
    }};

    margin: ${props => {
        if (props.full && !props.noMargin) return "5px 0"
        return props.noMargin ? "0px" : "5px"
    }};
    white-space: nowrap;

    background-color: ${props => {
        if (props.outline) return theme.colors.white
        if (props.primary) return theme.colors.primary
        if (props.secondary) return theme.colors.secondary
        if (props.disabled) return theme.colors.disabledBackground
        if (props.success) return theme.colors.success
        if (props.danger) return theme.colors.danger
        return theme.colors.tertiary
    }};
    color: ${props => {
        if (props.outline) {
            if (props.primary) return theme.colors.primary
            if (props.secondary) return theme.colors.secondary
            if (props.disabled) return theme.colors.disabledBackground
            if (props.success) return theme.colors.success
            if (props.danger) return theme.colors.danger
            return theme.colors.tertiary
        }
        if (props.disabled) return theme.colors.disabledForeground
        return theme.colors.white
    }};

    border-width: 2px;
    border-style: solid;
    border-color: ${props => {
        if (props.primary) return theme.colors.primary
        if (props.secondary) return theme.colors.secondary
        if (props.disabled) return theme.colors.disabledForeground
        if (props.success) return theme.colors.success
        if (props.danger) return theme.colors.danger
        return theme.colors.tertiary
    }};

    border-radius: 5px;
    outline: none;

    transition: 200ms all ease-in-out;

    &:hover {
        background-color: ${props => {
            if (props.outline) return theme.colors.white
            if (props.primary)
                return color(theme.colors.primary)
                    .darken(0.25)
                    .rgb()
                    .string()
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
            return color(theme.colors.tertiary)
                .darken(0.25)
                .rgb()
                .string()
        }};

        border-color: ${props => {
            if (props.primary)
                return color(theme.colors.primary)
                    .darken(0.25)
                    .rgb()
                    .string()
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
            return color(theme.colors.tertiary)
                .darken(0.25)
                .rgb()
                .string()
        }};

        ${props =>
            props.outline &&
            css`
                color: ${props => {
                    if (props.primary)
                        return color(theme.colors.primary)
                            .darken(0.25)
                            .rgb()
                            .string()
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
                    return color(theme.colors.tertiary)
                        .darken(0.25)
                        .rgb()
                        .string()
                }};
            `}
    }
`

const Button = ({ children, onClick = () => {}, ...props }) => {
    return (
        <StyledButton onClick={props.disabled ? () => {} : onClick} {...props}>
            {children}
        </StyledButton>
    )
}

export default Button
