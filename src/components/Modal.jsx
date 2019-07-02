import React from "react"
import styled from "styled-components"
import { Portal } from "react-portal"

import Flex from "~/components/Flex"

const Background = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    background-color: rgba(0, 0, 0, 0.4);
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ContentWrapper = styled.div`
    background-color: #fff;
    border-radius: 5px;
    max-width: 90vw;
    min-width: 250px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2), 0 3px 6px rgba(0, 0, 0, 0.36);
`

const TopBar = styled(Flex)`
    padding: 15px;
`

const CloseIcon = styled.img`
    cursor: pointer;
`

const Content = styled.div`
    padding: 0 25px 25px;
`

const Modal = ({ isOpen, setOpen, children, ...props }) => {
    if (!isOpen) return null

    return (
        <Portal>
            <Background>
                <ContentWrapper>
                    <TopBar justifyEnd>
                        <CloseIcon
                            onClick={() => setOpen(false)}
                            src={require("~/assets/close.svg")}
                            height="24px"
                        />
                    </TopBar>
                    <Content {...props}>{children}</Content>
                </ContentWrapper>
            </Background>
        </Portal>
    )
}

export default Modal
