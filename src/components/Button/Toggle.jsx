import React, { useContext } from "react"
import styled, { css } from "styled-components"

import { ThemeContext, theme as defaultTheme } from "~/Contexts/Theme"

import Flex from "~/components/Flex"
import Text from "~/components/Text"

const Wrapper = styled(Flex)`
    display: inline-flex;
    cursor: pointer;
    position: relative;
`

const StyledToggle = styled.span`
    border-radius: 5px;
    background-color: #505050;
    cursor: pointer;
    color: #fff;
    font-weight: 500;
    font-size: 16px;
    width: 60px;
    height: 30px;
    position: relative;
    transition: 125ms all ease-in-out;

    &::after {
        position: absolute;
        top: 3px;
        left: 3px;
        border-radius: 4px;
        background-color: #fff;
        transition: 125ms all ease-in-out;
        width: 24px;
        height: 24px;
        display: block;
        content: "";
    }

    ${props =>
        props.active &&
        css`
            background-color: ${props => props.primaryColor};
            &::after {
                left: 32px;
            }
        `}
`

const Caption = styled(Text)`
    margin: 5px;
    color: #505050;
    transition: 125ms all ease-in-out;
    ${props =>
        props.active &&
        css`
            color: ${props => props.active && props.primaryColor};
        `}
`

const Toggle = ({
    caption = "Toggle me",
    active,
    children,
    onChange,
    onClick,
    ...props
}) => {
    const context = useContext(ThemeContext)
    const theme = context && context.theme ? context.theme : defaultTheme

    const primaryColor = theme.colors.red

    return (
        <Wrapper
            noWrap
            alignCenter={!props.alignStart}
            column
            onClick={evt => {
                if (onClick) onClick(evt)
                if (onChange) onChange(!active)
            }}
            {...props}>
            <StyledToggle primaryColor={primaryColor} active={active} />
            <Caption noMargin primaryColor={primaryColor} active={active}>
                {caption}
            </Caption>
            {children}
        </Wrapper>
    )
}

export default Toggle
