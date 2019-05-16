import React from "React"
import styled, { css } from "styled-components"

const createPrimarySettingsWrapper = ({ expanded, ...props }) => {
    const PrimarySettingsWrapper = styled.div`
        transition: 250ms all ease-in-out;
        margin-top: 15px;

        ${!expanded &&
            css`
                display: none;
            `}
    `

    return PrimarySettingsWrapper
}

export default createPrimarySettingsWrapper
