import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

import ExtendedSettings from "./ExtendedSettings"

const StyledSettings = styled.div`
    position: absolute;
    top: 0;
    left: -10px;
    transition: 250ms all ease-in-out;
    transform-origin: center top;
    transform: translateX(-100%);
    opacity: 0;
    pointer-events: none;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    border-radius: 0 3px 3px 0;
    z-index: ${props => 100 - props.index};
    background-color: #fff;
    padding-bottom: 10px;

    ${props =>
        props.expanded &&
        css`
            opacity: 1;
            pointer-events: all;
        `}
`

const StyledIcon = styled.img`
    width: 24px;

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

const Name = styled.p`
    font-size: 16px;
    opacity: 0.6;
`

const SettingsIcon = ({ rows, index, row, open, ...props }) => (
    <StyledIcon
        disabled={index === 0}
        src={require("../assets/settings.svg")}
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
            {children}
            <SettingsIcon open={() => setShowExtendedSettings(true)} />
        </StyledSettings>
    )
}

export default Settings
