import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledSettings = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform-origin: center top;
    transform: translateX(-100%);
    pointer-events: none;

    ${props =>
        props.expanded &&
        css`
            pointer-events: all;
        `}

    &::before {
        position: absolute;
        pointer-events: none;
        top: 0;
        right: 0;
        content: "";
        opacity: 1;
        height: 100%;
        width: 2px;
        background-color: #fff;
        z-index: 15;
    }
`

const StyledIcon = styled.img`
    height: 24px;

    ${props =>
        props.disabled
            ? css`
                  opacity: 0.2;
                  cursor: not-allowed;
              `
            : css`
                  cursor: pointer;
                  opacity: 0.8;
              `}

    &:hover {
        opacity: ${props => !props.disabled && 1};
    }
`

const Content = styled.div`
    background-color: #fff;
    padding-bottom: 10px;
    border-right: 2px solid #333333;
    padding-right: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    opacity: 0;
    z-index: 16;
    position: relative;
    transition: 250ms all ease-in-out;

    ${props =>
        props.expanded &&
        css`
            opacity: 1;
            pointer-events: all;
        `}
`

const SettingsIcon = ({ rows, index, row, open, ...props }) => (
    <StyledIcon
        disabled={index === 0}
        src={require("../../assets/settings.svg")}
        onClick={open}
    />
)

const Settings = ({
    index,
    pluginName,
    children,
    expanded,
    setShowExtendedSettings,
}) => {
    return (
        <StyledSettings
            index={index}
            expanded={expanded}
            className="row-controls">
            <Content expanded={expanded}>
                {children}
                <SettingsIcon open={() => setShowExtendedSettings(true)} />
            </Content>
        </StyledSettings>
    )
}

export default Settings
