import React, { useState, useEffect } from "react"
import styled, { css } from "styled-components"

const StyledControls = styled.div`
    position: absolute;
    top: 0;
    left: 12px;
    transition: 250ms all ease-in-out;
    transform-origin: center top;
    transform: translateX(-100%) scaleY(0);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding-top: 10px;
    border-radius: 0 3px 3px 0;
    z-index: ${props => 100 - props.index};
    background-color: #fff;
    padding-bottom: 10px;

    ${props =>
        props.expanded &&
        css`
            transform: translateX(-100%) scaleY(1);
        `}

    &::after {
        transition: 250ms all ease-in-out;
        position: absolute;
        top: 0;
        left: 0;
        content: "";
        opacity: 1;
        height: 100%;
        width: 100%;
        background-color: #fff;
        pointer-events: none;

        ${props =>
            props.expanded &&
            css`
                opacity: 0;
            `}
    }
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

const SettingsIcon = ({ rows, index, row, ...props }) => (
    <StyledIcon
        disabled={index === 0}
        src={require("../assets/settings.svg")}
        onClick={() => {
            console.log("open settings")
        }}
    />
)

const Settings = ({ index, pluginName, expanded }) => {
    return (
        <StyledControls
            index={index}
            expanded={expanded}
            className="row-controls">
            <Name>{pluginName}</Name>
            <SettingsIcon />
        </StyledControls>
    )
}

export default Settings
