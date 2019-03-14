import React, { useContext } from "react"
import styled from "styled-components"

import { ThemeContext, theme as defaultTheme } from "~/Contexts/Theme"

export { default as Toggle } from "./Toggle"

const StyledButton = styled.button`
    position: relative;
    display: ${props => (props.block ? "block" : "inline-block")};
    cursor: pointer;

    font-size: 16px;
    font-weight: 400;

    width: ${props => props.full && "100%"};
    padding: 10px 20px;
    margin: ${props => {
        if (props.full && !props.noMargin) return "5px 0"
        return props.noMargin ? "0px" : "5px"
    }};
    white-space: nowrap;

    background-color: ${props => {
        if (props.secondary) return "#fff"
        return props.primaryColor
    }};
    color: ${props => (props.secondary ? props.primaryColor : "#fff")};
    border: 1px solid ${props => props.primaryColor};
    border-radius: 3px;
    outline: none;

    transition: 200ms all ease-in-out;

    &:hover {
        background-color: ${props =>
            !props.secondary && props.tintedPrimaryColor};
    }

    &:active {
        background-color: ${props =>
            !props.secondary && props.darkPrimaryColor};
    }
`

const Button = ({ children, ...props }) => {
    const context = useContext(ThemeContext)
    const theme = context && context.theme ? context.theme : defaultTheme

    const primaryColor = theme.colors.red
    const tintedPrimaryColor = theme.colors.darkRed
    const darkPrimaryColor = theme.colors.deepDarkRed

    return (
        <StyledButton
            {...props}
            primaryColor={primaryColor}
            tintedPrimaryColor={tintedPrimaryColor}
            darkPrimaryColor={darkPrimaryColor}>
            {children}
        </StyledButton>
    )
}

export default Button
