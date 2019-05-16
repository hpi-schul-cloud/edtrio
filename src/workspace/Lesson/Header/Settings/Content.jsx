import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"

import Flex from "~/components/Flex"

const Wrapper = styled(Flex)`
    padding: 15px;
    right: 0;
    position: fixed;
    top: 150px;
    overflow: hidden;
    transform: ${props => (props.visible ? 0 : "translateX(100%)")};
    opacity: ${props => (props.visible ? 1 : 0)};
    transition: 250ms all ease-in-out;
    background-color: #fff;
    z-index: 100;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);

    border-radius: 5px 0px 0px 5px;
`

const StyledIcon = styled.img`
    width: 24px;
    margin-bottom: 10px;
    cursor: pointer;

    &:last-child {
        margin-bottom: 0;
    }
`

const Settings = ({ visible }) => {
    return (
        <Wrapper column visible={visible}>
            <StyledIcon src={require("~/assets/share-red.svg")} />
            <StyledIcon src={require("~/assets/eye-red.svg")} />
        </Wrapper>
    )
}

export default Settings
