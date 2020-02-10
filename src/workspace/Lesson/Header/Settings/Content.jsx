import React, { useEffect, useState, useContext } from "react"
import styled, { css } from "styled-components"
import qs from "qs"

import Action from "~/components/Action"
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
    z-index: 2;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1), 0 3px 6px rgba(0, 0, 0, 0.18);

    border-radius: 5px 0px 0px 5px;
`

const ActionWrapper = styled.div`
    margin-bottom: 10px;

    &:last-child {
        margin: 0;
    }
`

const StyledAction = styled(Action)`
    display: flex;
    align-items: center;
`

const StyledIcon = styled.img`
    width: 24px;
    cursor: pointer;
    margin-left: 10px;
`

const Settings = ({ store, visible }) => {
    const q = qs.parse(window.location.search, { ignoreQueryPrefix: true })

    const studentQuery = qs.stringify({ ...q, student_view: true })

    return (
        <Wrapper column visible={visible} alignEnd>
            {!store.studentView && (
                <ActionWrapper>
                    <StyledAction
                        to={`${window.location.pathname}?${studentQuery}`}>
                        Schüleransicht
                        <StyledIcon src={require("~/assets/eye-red.svg")} />
                    </StyledAction>
                </ActionWrapper>
            )}
        </Wrapper>
    )
    // code that is uses later
    /*
    return (
        <Wrapper column visible={visible} alignEnd>
            <ActionWrapper>
                <StyledAction>
                    Teilen
                    <StyledIcon src={require("~/assets/share-red.svg")} />
                </StyledAction>
            </ActionWrapper>
            {!store.view.studentView && (
                <ActionWrapper>
                    <StyledAction
                        to={`${window.location.pathname}?${studentQuery}`}>
                        Schüleransicht
                        <StyledIcon src={require("~/assets/eye-red.svg")} />
                    </StyledAction>
                </ActionWrapper>
            )}
        </Wrapper>
    )
    */
}

export default Settings
