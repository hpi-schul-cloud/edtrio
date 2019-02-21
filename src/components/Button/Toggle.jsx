import React, { useContext } from "react"
import styled, { css } from "styled-components"

import { ThemeContext, theme as defaultTheme } from "~/contexts/Theme"

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
    flex-shrink: 0;

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
    display: inline-block;
    max-width: 150px;
    width: auto;
    text-align: center;
    transition: 125ms all ease-in-out;
    flex-shrink: 0;
    ${props =>
        props.active &&
        css`
            color: ${props => props.active && props.primaryColor};
        `}
`

const Toggle = ({
    caption = "Toggle me",
    activeCaption,
    active,
    children,
    onChange,
    onClick,
    ...props
}) => {
    const context = useContext(ThemeContext)
    const theme = context && context.theme ? context.theme : defaultTheme

    const primaryColor = theme.colors.red

    const hasActiveCaption = activeCaption && activeCaption.length

    return (
        <Wrapper
            noWrap
            alignCenter={!props.alignStart}
            column={!hasActiveCaption}
            row={hasActiveCaption}
            onClick={evt => {
                if (onClick) onClick(evt)
                if (onChange) onChange(!active)
            }}
            {...props}>
            <Caption
                noMargin
                primaryColor={primaryColor}
                active={!hasActiveCaption && active}>
                {caption}
            </Caption>
            <StyledToggle
                primaryColor={primaryColor}
                active={active}
                style={{ order: !hasActiveCaption ? -1 : undefined }}
            />
            {hasActiveCaption && (
                <Caption noMargin primaryColor={primaryColor} active={active}>
                    {activeCaption}
                </Caption>
            )}
            {children}
        </Wrapper>
    )
}

export default Toggle
