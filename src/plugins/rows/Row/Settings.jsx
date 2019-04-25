import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledControls = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    transform: translateX(calc(-100% - 10px));
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 10px;
    border-radius: 0 3px 3px 0;
    opacity: 0;
    z-index: ${props => 100 - props.index};
    transition: 250ms all ease-in-out;
`

const StyledIcon = styled.img`
    width: 30px;
    margin-bottom: 10px;

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

const SettingsIcon = ({ rows, index, row, ...props }) => (
    <StyledIcon
        disabled={index === 0}
        src={require("../assets/settings.svg")}
        onClick={() => {
            console.log("open settings")
        }}
    />
)

const Settings = ({ index, pluginName }) => {
    return (
        <StyledControls index={index} className="row-controls">
            <SettingsIcon />
            <Name>{pluginName}</Name>
        </StyledControls>
    )
}

export default Settings
