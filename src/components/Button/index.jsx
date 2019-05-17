import React, { useContext } from "react"
import styled from "styled-components"

import theme from "~/theme"

export { default as Toggle } from "./Toggle"

const StyledButton = styled.button`
    position: relative;
    display: ${props => (props.block ? "block" : "inline-block")};
    font-family: "PT Sans", sans-serif;
    cursor: pointer;

    font-size: 16px;
    line-height: 16px;
    font-weight: 400;

    width: ${props => props.full && "100%"};
    padding: ${props => (props.small ? "5px 10px 3px" : "10px 20px 8px")};
    margin: ${props => {
        if (props.full && !props.noMargin) return "5px 0"
        return props.noMargin ? "0px" : "5px"
    }};
    white-space: nowrap;

    background-color: ${props => {
        if (props.secondary) return theme.colorWhite
        return theme.primaryColor
    }};
    color: ${props =>
        props.secondary ? theme.primaryColor : theme.colorWhite};
    border: 1px solid ${props => theme.primaryColor};
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
    return <StyledButton {...props}>{children}</StyledButton>
}

export default Button
